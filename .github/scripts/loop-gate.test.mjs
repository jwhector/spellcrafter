import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { budgetFor, check, decide, gated, isCode, refsToCheck, roundsSpent } from "./loop-gate.mjs";

const CLI = fileURLToPath(new URL("./loop-gate.mjs", import.meta.url));
const SHA = "a".repeat(40);
const ZERO = "0".repeat(40);

test("claude/* branches are gated everywhere; other branches only in a cloud session", () => {
  assert.equal(gated("refs/heads/claude/x"), true);
  assert.equal(gated("refs/heads/jared/x"), false);
  assert.equal(gated("refs/heads/jared/x", { remote: true }), true);
  assert.equal(gated("refs/tags/v1", { remote: true }), false);
});

test("refsToCheck skips deletions and ungated refs", () => {
  const input = [
    `refs/heads/a ${SHA} refs/heads/claude/a ${ZERO}`,
    `(delete) ${ZERO} refs/heads/claude/b ${SHA}`,
    `refs/heads/c ${SHA} refs/heads/jared/c ${ZERO}`,
  ].join("\n");
  assert.deepEqual(refsToCheck(input), [{ localSha: SHA, remoteRef: "refs/heads/claude/a" }]);
  assert.equal(refsToCheck(input, { remote: true }).length, 2);
});

test("data paths are .mulch/, .seeds/ and docs/plans/; everything else is code", () => {
  assert.deepEqual(
    [".mulch/x.jsonl", ".seeds/issues.jsonl", "docs/plans/a.md", "docs/decisions/0001.md", "engine/a.ts"].map(isCode),
    [false, false, false, true, true],
  );
});

test("decide: missing, stale, reviewed, blocking and not owed", () => {
  const S = "review-loop: clean after 2 rounds";
  assert.equal(decide({ code: true, summary: null, after: [] }).verdict, "missing");
  assert.equal(decide({ code: true, summary: S, after: [] }).verdict, "reviewed");
  assert.equal(decide({ code: true, summary: S, after: [{ sha: SHA, ok: true }] }).pass, true);
  const stale = decide({ code: true, summary: S, after: [{ sha: SHA, ok: false }] });
  assert.deepEqual([stale.pass, stale.verdict], [false, "stale"]);
  const blocking = decide({ code: true, summary: "review-loop: blocking after 3 rounds", after: [] });
  assert.deepEqual([blocking.pass, blocking.verdict], [true, "blocking"]);
  assert.equal(decide({ code: false, summary: null, after: [] }).verdict, "not-owed");
});

test("roundsSpent adds up every summary's rounds", () => {
  assert.equal(roundsSpent(["Add x", "review-loop: concerns after 3 rounds", "review-loop: clean after 1 round"]), 4);
  assert.equal(roundsSpent(["review-loop: clean after 1 round, then more"]), 0);
});

test("the guarded budget applies when a change touches a gate", () => {
  assert.equal(budgetFor(["engine/a.ts", "docs/design/x.md"]), "usual");
  for (const gate of [".github/scripts/x.mjs", ".githooks/pre-push", ".claude/settings.json", "tests/guards/scan.ts"]) {
    assert.equal(budgetFor(["engine/a.ts", gate]), "guarded", gate);
  }
  assert.equal(budgetFor([".claude/skills/verify/SKILL.md"]), "usual");
});

/** A repository with main pushed as origin/main and a branch on top. */
function repo(t) {
  const dir = mkdtempSync(join(tmpdir(), "loop-gate-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const g = (...args) => execFileSync("git", args, { cwd: dir, encoding: "utf8" }).trim();
  const put = (path, text) => {
    mkdirSync(join(dir, path, ".."), { recursive: true });
    writeFileSync(join(dir, path), text);
  };
  const commit = (msg) => {
    g("add", "-A");
    g("commit", "-q", "--allow-empty", "-m", msg);
    return g("rev-parse", "HEAD");
  };
  g("init", "-q", "-b", "main");
  g("config", "user.email", "t@example.com");
  g("config", "user.name", "t");
  g("config", "commit.gpgsign", "false");
  put("engine/a.ts", "export const a = 1;\n");
  commit("base");
  g("update-ref", "refs/remotes/origin/main", "HEAD");
  g("switch", "-q", "-c", "claude/x");
  return { dir, g, put, commit };
}

test("check judges by ancestry: data and a clean merge of main may follow the summary", (t) => {
  const r = repo(t);
  r.put("engine/b.ts", "export const b = 1;\n");
  r.commit("Add b");
  assert.equal(check("HEAD", { cwd: r.dir }).verdict, "missing");

  r.commit("review-loop: clean after 1 round");
  assert.equal(check("HEAD", { cwd: r.dir }).verdict, "reviewed");

  r.put(".mulch/expertise/engine.jsonl", "{}\n");
  r.commit("ml sync");
  assert.equal(check("HEAD", { cwd: r.dir }).verdict, "reviewed", "a data-only commit may follow");

  // main moves on; merging it in cleanly keeps the branch reviewed.
  r.g("switch", "-q", "main");
  r.put("views/v.ts", "export const v = 1;\n");
  r.commit("main moves");
  r.g("update-ref", "refs/remotes/origin/main", "HEAD");
  r.g("switch", "-q", "claude/x");
  r.g("merge", "-q", "--no-edit", "main");
  assert.equal(check("HEAD", { cwd: r.dir }).verdict, "reviewed", "a clean merge of main may follow");

  r.put("engine/b.ts", "export const b = 2;\n");
  const late = r.commit("Change b after the loop");
  const stale = check("HEAD", { cwd: r.dir });
  assert.equal(stale.verdict, "stale");
  assert.match(stale.description, new RegExp(late.slice(0, 7)));
});

test("check refuses a merge that changes code beyond git's own merge", (t) => {
  const r = repo(t);
  r.put("engine/b.ts", "export const b = 1;\n");
  r.commit("Add b");
  r.commit("review-loop: clean after 1 round");
  r.g("switch", "-q", "main");
  r.put("views/v.ts", "export const v = 1;\n");
  r.commit("main moves");
  r.g("update-ref", "refs/remotes/origin/main", "HEAD");
  r.g("switch", "-q", "claude/x");
  r.g("merge", "-q", "--no-commit", "main");
  r.put("engine/b.ts", "export const b = 3;\n"); // slipped into the merge
  r.g("add", "-A");
  r.g("commit", "-q", "--no-edit");
  assert.equal(check("HEAD", { cwd: r.dir }).verdict, "stale");
});

test("a branch with no code is not owed the loop", (t) => {
  const r = repo(t);
  r.put("docs/plans/p.md", "plan\n");
  r.commit("Plan");
  assert.equal(check("HEAD", { cwd: r.dir }).verdict, "not-owed");
});

test("the CLI refuses an unlooped code push and allows a looped one", (t) => {
  const r = repo(t);
  const push = (branch, env = {}) =>
    spawnSync(process.execPath, [CLI], {
      cwd: r.dir,
      input: `refs/heads/x ${r.g("rev-parse", "HEAD")} refs/heads/${branch} ${ZERO}\n`,
      encoding: "utf8",
      env: { ...process.env, CLAUDE_CODE_REMOTE: "", ...env },
    });
  r.put("engine/b.ts", "export const b = 1;\n");
  r.commit("Add b");
  const refused = push("claude/x");
  assert.equal(refused.status, 1);
  assert.match(refused.stderr, /refusing to push claude\/x/);
  assert.equal(push("jared/x").status, 0, "a person's own branch is not gated locally");
  assert.equal(push("jared/x", { CLAUDE_CODE_REMOTE: "true" }).status, 1, "but is in a cloud session");
  r.commit("review-loop: clean after 1 round");
  assert.equal(push("claude/x").status, 0);
});
