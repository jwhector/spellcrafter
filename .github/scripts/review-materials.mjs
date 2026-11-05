#!/usr/bin/env node
/**
 * Lays out what a code reviewer reads, the same way everywhere it runs:
 *
 *   diff.patch     the change, base...head
 *   commits.txt    every commit base..head, full messages: the stated intent
 *   head/          the tree at head, a detached worktree, for context
 *   expertise.md   the Mulch records for the changed files, primed from BASE
 *   ledger.md      only with --ledger: the author's findings ledger, one
 *                  line per earlier finding with its id, severity and
 *                  outcome. The reviewer marks each id resolved or still
 *                  open, and rules on disputed ones.
 *
 * Called by the review-loop skill (.claude/skills/review-loop), once per
 * round, in the session that wrote the change, before it pushes. Every
 * round's fresh reviewer sees the same layout. Copied from the AIOS review
 * kit on 2026-11-05; this copy is this repo's own (decision 0001).
 *
 * Mulch is primed from the base's .mulch/, extracted with `git archive` into
 * a scratch directory, never from the working tree or head. A branch that edits
 * a record must not steer its own review. Mulch also resolves .mulch/
 * through git worktrees to the main checkout, so priming inside head/ would
 * silently read the wrong one. Priming is best-effort. Without `ml`, or
 * without a .mulch/ on the base, expertise.md says so and the review goes on.
 *
 * Usage:
 *   node .github/scripts/review-materials.mjs --base origin/main --head HEAD --dir <dir> [--ledger <file>]
 *
 * The caller removes head/ afterwards with `git worktree remove --force <dir>/head`.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const BIG = 256 * 1024 * 1024;

/**
 * @param {{ base: string, head: string, dir: string, ledger?: string, cwd?: string, ml?: string[], budget?: number }} opts
 *   `ml` is the command that runs Mulch, as an argv prefix (tests pass a fake).
 * @returns {{ files: string[], primed: boolean }}
 */
export function layOut({ base, head, dir, ledger, cwd = process.cwd(), ml = ["ml"], budget = 6000 }) {
  const git = (...args) => execFileSync("git", args, { cwd, encoding: "utf8", maxBuffer: BIG });
  const out = resolve(cwd, dir);
  mkdirSync(out, { recursive: true });

  // Before the worktree: a wrong --ledger path fails with nothing to clean up.
  if (ledger) copyFileSync(resolve(cwd, ledger), join(out, "ledger.md"));

  // core.longpaths: on Windows, deep paths under a temp dir pass 260
  // characters and the checkout fails ("Filename too long"). A no-op elsewhere.
  git("-c", "core.longpaths=true", "worktree", "add", "--detach", join(out, "head"), head);
  writeFileSync(join(out, "diff.patch"), git("diff", "--no-color", `${base}...${head}`));
  writeFileSync(join(out, "commits.txt"), git("log", "--no-color", "--format=commit %h%n%B", `${base}..${head}`));

  const files = git("diff", "--name-only", "--no-renames", `${base}...${head}`).split("\n").filter(Boolean);
  const expertise = primeFromBase({ cwd, base, files, ml, budget });
  writeFileSync(join(out, "expertise.md"), expertise.text);
  return { files, primed: expertise.primed };
}

function primeFromBase({ cwd, base, files, ml, budget }) {
  if (files.length === 0) return { primed: false, text: "(No changed files, so no Mulch records.)\n" };

  const scratch = mkdtempSync(join(tmpdir(), "review-mulch-"));
  try {
    try {
      const tar = execFileSync("git", ["archive", "--format=tar", base, ".mulch"], { cwd, maxBuffer: BIG });
      // cwd, not -C: GNU tar on Windows (Git's) reads "C:\..." as host:path.
      execFileSync("tar", ["-x"], { cwd: scratch, input: tar });
    } catch {
      return { primed: false, text: `(The base ${base} has no .mulch/, so no Mulch records.)\n` };
    }
    const [cmd, ...pre] = ml;
    try {
      const text = execFileSync(cmd, [...pre, "prime", "--files", ...files, "--budget", String(budget)], {
        cwd: scratch,
        encoding: "utf8",
        maxBuffer: BIG,
        stdio: ["ignore", "pipe", "pipe"],
      });
      return { primed: true, text };
    } catch {
      return {
        primed: false,
        text: "(Mulch is not available here, so this review runs without recorded expertise.)\n",
      };
    }
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

function arg(argv, name) {
  const i = argv.indexOf(name);
  return i === -1 ? undefined : argv[i + 1];
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const argv = process.argv.slice(2);
  const base = arg(argv, "--base");
  const head = arg(argv, "--head");
  const dir = arg(argv, "--dir");
  const ledger = arg(argv, "--ledger");
  if (!base || !head || !dir) {
    console.error("usage: review-materials.mjs --base <ref> --head <ref> --dir <dir> [--ledger <file>]");
    process.exit(2);
  }
  const { files, primed } = layOut({ base, head, dir, ledger });
  console.log(
    `Review materials in ${dir}: ${files.length} changed files; Mulch ${primed ? "primed from " + base : "not primed"}` +
      (ledger ? `; the findings ledger from ${ledger}.` : "."),
  );
}
