#!/usr/bin/env node
/**
 * The loop gate: an agent's code reaches a pull request only after the
 * review-loop skill (.claude/skills/review-loop) has run over it.
 *
 * An agent's push is what puts work in front of a person, so "review before
 * the PR" means "review before the push". .githooks/pre-push runs this.
 *
 * The rules (decision 0001):
 *   - Code is any path outside DATA (.mulch/, .seeds/, docs/plans/). A push
 *     that changes no code owes no loop.
 *   - The loop ends with a summary commit whose subject is exactly
 *     `review-loop: <clean|concerns|blocking> after <N> round(s)`.
 *   - After the newest summary (by ancestry, not by date), only two kinds of
 *     commit may follow: a commit that touches only DATA, and a clean merge
 *     of main (its second parent is already on origin/main and its tree is
 *     what git's own merge produces, so no hand-made resolution hides in it).
 *     Anything else is new code nobody reviewed: `stale`.
 *   - `blocking` passes. The loop ran, and the open blocker is a person's
 *     decision to read on the PR.
 *
 * What it gates: pushes to claude/* branches, and in a cloud session
 * (CLAUDE_CODE_REMOTE=true) every branch. A person pushing their own branch
 * from a laptop is not gated.
 *
 * Passing is the session's attestation, not proof. The summary is a commit
 * the session writes itself, so the gate stops a forgotten loop and code
 * committed after it. It cannot stop a faked summary, or the last round's
 * fixes that the three-round cap leaves unreviewed. The person's review is
 * the check on those. A person can bypass it with `git push --no-verify`.
 *
 * Usage (git's pre-push contract: one line per ref on stdin,
 * "<local ref> <local sha> <remote ref> <remote sha>"):
 *   node .github/scripts/loop-gate.mjs < refs
 *   git log --no-merges --format=%s origin/main..HEAD | node .github/scripts/loop-gate.mjs --rounds
 * The first exits 1 and says why when a ref is refused. The second prints
 * the rounds this branch's summaries have spent, which budget applies to
 * the branch's change (from `git diff origin/main...HEAD`), and its size.
 */
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ZERO = /^0+$/;
const BASE = "origin/main";
export const DATA = /^(\.mulch|\.seeds|docs\/plans)\//;
export const SUMMARY = /^review-loop: (clean|concerns|blocking) after (\d+) rounds?$/;

/** Review rounds one pull request may spend across all its loops.
 *  `guarded` applies when the change touches the gates themselves (GUARDED);
 *  `usual` otherwise. This file is the one home for both. */
export const BUDGET = Object.freeze({ usual: 3, guarded: 5 });
export const GUARDED = /^(\.github\/|\.githooks\/|\.claude\/settings\.json$|tests\/guards\/)/;

/** Which budget a change gets, from the paths it touches. */
export const budgetFor = (paths) => (paths.some((p) => GUARDED.test(p)) ? "guarded" : "usual");

export const isCode = (path) => path !== "" && !DATA.test(path);

/** Does a push to this remote ref owe the loop check? */
export function gated(remoteRef, { remote = false } = {}) {
  if (!remoteRef.startsWith("refs/heads/")) return false;
  return remote || remoteRef.startsWith("refs/heads/claude/");
}

/** Parse git's pre-push stdin into the refs this gate must judge. */
export function refsToCheck(input, { remote = false } = {}) {
  return input
    .split("\n")
    .map((line) => line.trim().split(/\s+/))
    .filter((f) => f.length === 4)
    .map(([, localSha, remoteRef]) => ({ localSha, remoteRef }))
    .filter(({ localSha, remoteRef }) => !ZERO.test(localSha) && gated(remoteRef, { remote }));
}

/** The rounds the branch's summaries report, added up. */
export function roundsSpent(subjects) {
  let rounds = 0;
  for (const s of subjects) {
    const m = SUMMARY.exec(s.trim());
    if (m) rounds += Number(m[2]);
  }
  return rounds;
}

/**
 * The verdict, from facts about the branch.
 * @param {{ code: boolean, summary: string | null, after: { sha: string, ok: boolean }[] }} b
 *   summary: the newest summary's subject, or null; after: each commit
 *   after it, with ok = it is data-only or a clean merge of main.
 */
export function decide({ code, summary, after }) {
  if (!code) return { pass: true, verdict: "not-owed", description: "No code changed: the loop is not owed." };
  if (summary === null) {
    return { pass: false, verdict: "missing", description: "no review-loop summary: the loop never ran." };
  }
  const bad = after.filter((c) => !c.ok);
  if (bad.length > 0) {
    const list = bad.map((c) => c.sha.slice(0, 7)).join(", ");
    return {
      pass: false,
      verdict: "stale",
      description: `${bad.length} commit${bad.length === 1 ? "" : "s"} after the review-loop summary carry code nobody reviewed (${list}).`,
    };
  }
  const [, outcome] = SUMMARY.exec(summary);
  return { pass: true, verdict: outcome === "blocking" ? "blocking" : "reviewed", description: summary };
}

function git(args, cwd) {
  return execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}
const lines = (text) => text.split("\n").filter(Boolean);

/** Is this merge commit a clean merge of main? */
function cleanMergeOfMain(sha, parents, cwd) {
  if (parents.length !== 2) return false;
  try {
    git(["merge-base", "--is-ancestor", parents[1], BASE], cwd);
  } catch {
    return false;
  }
  let merged;
  try {
    merged = git(["merge-tree", "--write-tree", parents[0], parents[1]], cwd).split("\n")[0];
  } catch {
    return false; // a conflict: the resolution was made by hand
  }
  return merged === git(["rev-parse", `${sha}^{tree}`], cwd);
}

/** Gather the facts about one pushed head and judge it. */
export function check(sha, { cwd } = {}) {
  const code = lines(git(["diff", "--name-only", "--no-renames", `${BASE}...${sha}`], cwd)).some(isCode);
  const own = lines(git(["log", "--topo-order", "--format=%H %s", `${BASE}..${sha}`], cwd)).map((l) => {
    const i = l.indexOf(" ");
    return { sha: l.slice(0, i), subject: l.slice(i + 1) };
  });
  const found = own.find((c) => SUMMARY.test(c.subject));
  if (!found) return decide({ code, summary: null, after: [] });
  const after = lines(git(["rev-list", `${found.sha}..${sha}`, `^${BASE}`], cwd)).map((c) => {
    const parents = git(["rev-list", "--parents", "-n", "1", c], cwd).split(" ").slice(1);
    if (parents.length > 1) return { sha: c, ok: cleanMergeOfMain(c, parents, cwd) };
    const paths = lines(git(["diff-tree", "--no-commit-id", "--name-only", "-r", "--root", c], cwd));
    return { sha: c, ok: !paths.some(isCode) };
  });
  return decide({ code, summary: found.subject, after });
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  let input = "";
  process.stdin.setEncoding("utf8");
  for await (const chunk of process.stdin) input += chunk;

  if (process.argv.includes("--rounds")) {
    const applies = budgetFor(lines(git(["diff", "--name-only", "--no-renames", `${BASE}...HEAD`])));
    console.log(JSON.stringify({ spent: roundsSpent(input.split("\n")), applies, budget: BUDGET[applies] }));
    process.exit(0);
  }

  const refs = refsToCheck(input, { remote: process.env.CLAUDE_CODE_REMOTE === "true" });
  if (refs.length === 0) process.exit(0);
  try {
    git(["rev-parse", "--verify", "--quiet", `${BASE}^{commit}`]);
  } catch {
    console.error(
      `loop-gate: ${BASE} is missing, so the loop cannot be checked. Run \`git fetch origin main\` and push again.`,
    );
    process.exit(1);
  }

  let refused = 0;
  for (const { localSha, remoteRef } of refs) {
    const branch = remoteRef.replace("refs/heads/", "");
    let r;
    try {
      r = check(localSha);
    } catch {
      console.error(
        `loop-gate: cannot compare ${branch} with ${BASE}. Run \`git fetch origin main\` (unshallow if needed) and push again.`,
      );
      process.exit(1);
    }
    if (r.pass) continue;
    refused++;
    console.error(`loop-gate: refusing to push ${branch} (${localSha.slice(0, 7)}): ${r.description}`);
  }
  if (refused > 0) {
    console.error(
      [
        "loop-gate: code is pushed only after the review-loop skill (.claude/skills/review-loop).",
        "  Run it, fix what it finds, and make its `review-loop: <verdict> after <N> rounds` commit the last one.",
        "  Committed code after the loop? Run the loop again. Close-out commits (ml sync, sd sync) go before it.",
        "  A person may bypass deliberately with `git push --no-verify`.",
      ].join("\n"),
    );
    process.exit(1);
  }
}
