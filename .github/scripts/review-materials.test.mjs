import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { layOut } from "./review-materials.mjs";

/** A repo with a base commit on main and a feature commit on top. */
function fixture() {
  const root = mkdtempSync(join(tmpdir(), "review-materials-"));
  const repo = join(root, "repo");
  mkdirSync(repo);
  const git = (...a) => execFileSync("git", a, { cwd: repo, encoding: "utf8" });
  const put = (path, text) => {
    mkdirSync(join(repo, path, ".."), { recursive: true });
    writeFileSync(join(repo, path), text);
  };
  git("init", "-q", "-b", "main");
  git("config", "user.email", "t@example.com");
  git("config", "user.name", "t");
  git("config", "core.autocrlf", "false");
  put("src/a.ts", "export const a = 1;\n");
  put(".mulch/marker", "from-base\n");
  git("add", "-A");
  git("commit", "-q", "-m", "base");
  git("switch", "-q", "-c", "claude/work-x");
  put("src/a.ts", "export const a = 2;\n");
  put(".mulch/marker", "from-head\n");
  git("add", "-A");
  git("commit", "-q", "-m", "Change a\n\nThe task asked for 2.");
  return { root, repo, dir: join(root, "out") };
}

/** Stands in for `ml`: echoes the marker it can see and the args it got. */
function fakeMl(root) {
  const script = join(root, "fake-ml.mjs");
  writeFileSync(
    script,
    'import { readFileSync } from "node:fs";\n' +
      'console.log("marker=" + readFileSync(".mulch/marker", "utf8").trim());\n' +
      'console.log("args=" + process.argv.slice(2).join(" "));\n',
  );
  return [process.execPath, script];
}

test("lays out the diff, the commit messages and the head tree", (t) => {
  const f = fixture();
  t.after(() => rmSync(f.root, { recursive: true, force: true }));
  const { files } = layOut({ base: "main", head: "HEAD", dir: f.dir, cwd: f.repo, ml: fakeMl(f.root) });

  assert.deepEqual(files.sort(), [".mulch/marker", "src/a.ts"]);
  assert.match(readFileSync(join(f.dir, "diff.patch"), "utf8"), /^\+export const a = 2;$/m);
  const commits = readFileSync(join(f.dir, "commits.txt"), "utf8");
  assert.match(commits, /The task asked for 2\./);
  assert.doesNotMatch(commits, /^base$/m);
  assert.equal(readFileSync(join(f.dir, "head", "src", "a.ts"), "utf8"), "export const a = 2;\n");
});

test("primes Mulch from the base's records, never the branch's", (t) => {
  const f = fixture();
  t.after(() => rmSync(f.root, { recursive: true, force: true }));
  const { primed } = layOut({ base: "main", head: "HEAD", dir: f.dir, cwd: f.repo, ml: fakeMl(f.root), budget: 123 });

  const expertise = readFileSync(join(f.dir, "expertise.md"), "utf8");
  assert.equal(primed, true);
  assert.match(expertise, /^marker=from-base$/m);
  assert.match(expertise, /^args=prime --files .*src\/a\.ts.* --budget 123$/m);
});

test("without Mulch the materials are still laid out, and say so", (t) => {
  const f = fixture();
  t.after(() => rmSync(f.root, { recursive: true, force: true }));
  const { primed } = layOut({ base: "main", head: "HEAD", dir: f.dir, cwd: f.repo, ml: [join(f.root, "no-such-ml")] });

  assert.equal(primed, false);
  assert.match(readFileSync(join(f.dir, "expertise.md"), "utf8"), /not available/);
  assert.ok(existsSync(join(f.dir, "diff.patch")));
});

test("a base with no .mulch/ is reported, not an error", (t) => {
  const f = fixture();
  t.after(() => rmSync(f.root, { recursive: true, force: true }));
  execFileSync("git", ["rm", "-q", "-r", "--cached", ".mulch"], { cwd: f.repo });
  execFileSync("git", ["commit", "-q", "-m", "drop mulch"], { cwd: f.repo });
  const base = execFileSync("git", ["rev-parse", "HEAD"], { cwd: f.repo, encoding: "utf8" }).trim();
  execFileSync("git", ["commit", "-q", "--allow-empty", "-m", "next"], { cwd: f.repo });

  const { primed } = layOut({ base, head: "HEAD", dir: f.dir, cwd: f.repo, ml: fakeMl(f.root) });
  assert.equal(primed, false);
  assert.match(readFileSync(join(f.dir, "expertise.md"), "utf8"), /No changed files|has no \.mulch/);
});

test("--ledger copies the findings ledger in as ledger.md; without it there is none", (t) => {
  const f = fixture();
  t.after(() => rmSync(f.root, { recursive: true, force: true }));
  const ledger = join(f.root, "ledger.md");
  writeFileSync(ledger, "r1.1 [should] a.ts:1 a is wrong. fixed in abc123\n");
  layOut({ base: "main", head: "HEAD", dir: f.dir, ledger, cwd: f.repo, ml: fakeMl(f.root) });
  assert.equal(readFileSync(join(f.dir, "ledger.md"), "utf8"), readFileSync(ledger, "utf8"));

  const again = join(f.root, "out-2");
  layOut({ base: "main", head: "HEAD", dir: again, cwd: f.repo, ml: fakeMl(f.root) });
  assert.equal(existsSync(join(again, "ledger.md")), false);
});
