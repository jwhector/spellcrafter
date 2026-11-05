# How work flows in this repo

Installed on 2026-11-05 by the AIOS skill `scaffold-agentic-repo`, at Tier M
(decision 0001). The repo describes itself, so starting a session is "point
at the docs, name the task".

## The loop in one line

`plan → claim → build → verify → record → close → review-loop → push once`

- **plan**: larger work gets a plan from `docs/plans/TEMPLATE.md`, and Jared
  reviews it before building starts.
- **claim**: `sd ready`, pick one, `sd update <id> --status in_progress`.
- **build**: on a `claude/*` branch, committing as you go.
- **verify**: watch it work (the `verify` skill) and write a `Proof:`
  paragraph.
- **record**: `ml record …` then `ml sync`, if something surfaced.
- **close**: `sd close <id>` then `sd sync`; this unblocks the next seed.
- **review-loop**: the skill reviews the committed branch with a fresh
  reviewer, up to three rounds, and commits its summary last.
- **push once**: the pre-push loop gate checks the summary is last. The push
  opens the pull request; Jared reviews and merges.

## Two rhythms

- **Planning** is infrequent, led by Jared, and full of judgment: which
  design items to build, in what order, and what the design means. Game
  design is discussed in chat one item at a time (golden rule 3 in
  `CLAUDE.md`). Planning fills the backlog.
- **Execution** is frequent, agent-driven and rule-governed: take a ready
  seed, build it, prove it, loop, push. Execution drains the backlog.

Keep them separate. An agent that meets a design question mid-build stops
and asks (a decision card in a project thread, or a seed labelled
`needs-jared`), and keeps working only on what does not depend on the answer.

## The kickoff prompt

> Read CLAUDE.md and the docs it points to (in full for anything relevant to
> the task). Then: \<the task\>. Before non-trivial changes, write a short plan
> and let me review it. Follow the conventions and use the repo's skills.

## Model routing

- Mechanical, judgment-light steps (a sweep, a re-export of a doc, triage)
  can run on a low-cost model.
- The reviewer is pinned in `.claude/agents/reviewer.md`.
- This repo has no auth, credentials or money today. If it ever gains them
  (a Discord app secret, a server), changes there get a second review on a
  different model before merge, and disagreement between the two is a
  finding.

## Automatic, governed, manual

| Behaviour | How it holds |
| --- | --- |
| Formatting an agent's edits | Automatic: PostToolUse hook (`.claude/hooks/format.mjs`), best-effort |
| Format and lint of staged files | Automatic: `.githooks/pre-commit` |
| Typecheck, lint, tests, build | Automatic: CI on every push and pull request |
| Engine purity, one home for design links | Automatic: guard tests in `tests/guards/` |
| Review before a code push | Enforced: `.githooks/pre-push` runs the loop gate |
| Dependencies and git hooks in cloud sessions | Automatic: SessionStart hooks in `.claude/settings.json` |
| Proof that a change works | Governed: the review prompt flags a behaviour change without a `Proof:` paragraph |
| Decided, Proposed or Open on design items; no invented names | Governed: golden rules, checked by the reviewer |
| What to build, what a mechanic means and is called | Manual: Jared |

Passing the loop gate is an attestation, not proof. It reads a summary
commit the session writes, so it stops a forgotten loop and code committed
after it. It does not stop a faked summary, or a final round's fixes that the
three-round cap leaves unreviewed. Jared's review is the check on those.

A person pushing to a `claude/*` branch from a laptop meets the same gate,
because the SessionStart hook turns the hooks on. Use `git push --no-verify`
there, deliberately.

## Maintenance contract

- **A new ratified decision** about how the repo is built gets a decision
  record. Supersede an old one; never silently contradict it.
- **A new recurring task** becomes a skill in `.claude/skills/`, so the
  pattern repeats the same way.
- **A change of shape** (a new folder, a moved fact, a new kind of check)
  updates the docs that describe it **in the same change**. Stale context is
  worse than none; fix it when you notice it.
- **A weekly friction review.** Once a week, read the open backlog and recent
  failures (`ml search failure`, review-loop summaries), pick the single most
  recurrent friction, and turn it into one infrastructure item: a seed, a
  guard, a skill. One a week is the rate that compounds without taking over.
