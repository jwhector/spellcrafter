---
name: review-loop
description: Review your own committed change with a fresh, independent reviewer, fix what it finds, and repeat until it is clean (at most three rounds), before you push. Use before pushing any code change, or when asked to "review and fix before pushing", "get this ready for review", or "run the review loop".
---

# Skill: review-loop

This repo's one machine review. A fresh, read-only `reviewer` subagent
(`.claude/agents/reviewer.md`) reviews the committed branch each round, with
one prompt (`.github/review-prompt.md`) and one layout of materials
(`.github/scripts/review-materials.mjs`). You fix what has one right answer,
leave a person's decisions for them, and repeat until clean or only nits, at
most three rounds. Nothing reviews the code again on GitHub, so what this
leaves is what Jared reads. The kit was copied from the AIOS on 2026-11-05
and is this repo's own (decision 0001).

Review keeps the change small, proved and argued: findings are graded by
what the change set out to do and fixed with the smallest change or disputed
with evidence, a findings ledger carries them from round to round, a pull
request has one round budget across its loops, and questions go where a
person sees them.

## Once, at the end, then push once

- **Accrue commits; do not push as you go.** Keep the work local until it is
  complete: built, tested, closed out. Then loop **once**, over the whole
  change, and push **once**.
- **Pushing is the signal "ready for a person".** The first push of a code
  branch is what opens its pull request. Every later push of new code needs
  a loop of its own.
- **The push gate enforces the order.** `.githooks/pre-push` runs
  `.github/scripts/loop-gate.mjs` and refuses to push code to a `claude/*`
  branch (any branch, in a cloud session) unless this loop's summary is the
  last commit. Only data commits (`.mulch/`, `.seeds/`, `docs/plans/`) and
  a clean merge of main may follow it. If it refuses you, you skipped the
  loop or committed code after it. Do not bypass it with `--no-verify`;
  that is for a person.
- **A change with no code** (only `.mulch/`, `.seeds/`, `docs/plans/`) owes
  no loop, and the gate lets it through.

## Before you start

- The work is **committed** on its branch. The reviewer reads committed
  history, not your working tree.
- `npm run check` passes (typecheck, lint, tests, script tests, build).
  Reviewing code that fails its own checks wastes a round.
- The commit messages say what was asked, what you decided, and what you
  left out. That is the intent the reviewer judges against, and the only
  briefing it gets.
- **Proof.** You watched the change work: ran it against realistic input and
  read what it did (for a view, opened the page; see the `verify` skill).
  Write that in a commit message as a `Proof:` paragraph: the command and
  what you saw. If nothing could show it working here, say so; that is a
  question for a person.
- Close-out commits come first: `ml record` and `ml sync`, `sd close` and
  `sd sync`. Nothing that commits code may follow the summary.
- `git fetch origin main`, so the base is current.
- **The budget.** `git log --no-merges --format=%s origin/main..HEAD | node .github/scripts/loop-gate.mjs --rounds`
  prints the rounds this branch's summaries have spent and the budget that
  applies: `guarded` when the change touches the gates, `usual` otherwise
  (`BUDGET` and `GUARDED` in `loop-gate.mjs` are the one home for both). When
  the rounds spent plus three pass the budget, ask Jared before round 1:
  more rounds, or the new work in its own pull request. Do not ask when he
  asked for this new work on the pull request himself.
- **Note the size:** `git diff --shortstat origin/main...HEAD`.

## The findings ledger

Keep one ledger per pull request, outside the repo (say `"$LOOP/ledger.md"`).
A later loop in a new session rebuilds it before round 1 from the branch's
`review-loop:` summaries, which list every finding by id. One line per
finding, added as you triage:

```
r1.3 [should] engine/budget.ts:41 a binary effect is split by a fraction. fixed in 1a2b3c4
r1.4 [nit] README.md:12 the example is stale. declined: nit
r2.1 [should] app/crafter.tsx:9 renders twice. disputed: the guard at crafter.ts:20 returns early
r2.2 [should] docs/decisions/0003.md the cap is marked Decided. left for Jared: asked on a card
```

The id is the round and the finding's number in that review. A later loop on
the branch puts its number first (`L2.r1.1`). The severity is yours after
re-grading. Pass the ledger (`--ledger`) to every round after the first, and
to round 1 of a later loop.

## Each round (at most three)

1. **Lay out the materials:**

   ```bash
   LOOP=<the loop's directory>   # round 1: run `mktemp -d` once and note the path
   DIR="$LOOP/review-r<N>"
   node .github/scripts/review-materials.mjs --base origin/main --head HEAD --dir "$DIR"
   ```

   Each Bash call is a new shell: write the path itself into every later
   round's command. After the first round, add `--ledger "$LOOP/ledger.md"`.

2. **Spawn a new `reviewer`** with exactly this message and nothing else:
   `Review directory: <DIR>. Branch: <branch>.` Do not explain the change,
   and do not point it at anything. Never continue an earlier round's
   reviewer.

3. **Clean up:** `git worktree remove --force "$DIR/head"`.

4. **Stop if the verdict is `clean`,** or if only nits remain. Fix a nit only
   when the fix is trivial and certain.

5. **Re-grade, then triage.** Grade every finding yourself by the prompt's
   rule, whatever label it came with. Then put each blocker and should into
   exactly one of:
   - **Fix.** One clear right answer within what the change set out to do.
     Fix it with the **smallest** change (delete or narrow before adding a
     lock, cache, helper or option), with one focused test that fails
     without the fix when the intent needs one. Rerun the checks and commit
     with the subject `review-loop r<N>: <what>`, mapping each finding's id
     to its fix in the body.
   - **Leave for a person.** It challenges a decision Jared made, needs a
     design judgment (a mechanic, a name, a number), or needs a decision
     record. Do not change the code to make it go away. Ask it now (see
     "Questions").
   - **Dispute.** The reviewer is wrong, or the finding is outside the
     change's intent. Say why in the ledger with the evidence (`file:line`,
     a test, a record id), and change nothing. **Never fix something to end
     the loop.** If a dispute stays open after the next round's ruling, it
     goes to Jared with each side in two or three lines.

   Decline each nit in one line in the ledger, unless its fix is trivial and
   certain; a nit worth doing later becomes a seed (`sd create`).

   If the review has a **Worth recording** command and your fix confirms it,
   run it before you commit the fix, and stage the `.mulch/` change with it.

6. **Stop if this round fixed nothing and disputed nothing.** Otherwise check
   the size: if review grew the insertions by more than about a quarter, cut
   what the intent did not need, and say so in the ledger. Then start the
   next round. A fix after round 3 that changes behaviour is **unreviewed**:
   the verdict cannot be `clean`, and the summary lists it. A fix to a
   comment, doc wording, formatting or a test alone needs no new round.

## After the loop

```bash
git commit --allow-empty -m "review-loop: <last verdict> after <N> rounds" -m "<summary>"
```

Keep that subject exact (`round` when N is 1), and make it the last commit
before the push.

**A small loop writes a short summary:** a loop of two rounds or fewer that
touches no gate lists the **Proof:** line, **Size**, **Budget**, each blocker
and should by id and outcome, every nit as its id and a one-word outcome on
one line ("nits: r1.2 fixed, r1.4 declined"), **Decided by default**, **Needs
you** and **Unreviewed**. Every other loop gives every finding its own line,
fixed (one line), declined (why) or disputed (both sides, and the ruling),
plus the same headings.

Then push, once. A blocker still open after three rounds means the work is
not done: stop and tell Jared. A blocker left for a person is fine to push;
deciding it is what his review is for.

## Questions

A question that lives only in a commit message is read last, if at all. Ask
each one where Jared sees it: in a project thread, a decision card with your
recommendation first; elsewhere, the harness's question tool; with nobody
there, a seed labelled `needs-jared`. Where the step can be undone, keep
working on your recommendation while you wait. Ask only what you cannot
decide; decide the rest and list it under "Decided by default".

## The hand-off

When the pull request is ready, post one message: the link, the head commit,
the verdict, the proof line, what is left for Jared. Merge main promptly when
it conflicts; a conflict you resolve by hand is new code and owes a loop.
Agents never merge.
