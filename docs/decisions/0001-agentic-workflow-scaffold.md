# 0001. Scaffold the agentic workflow into the repo

Status: ratified when it lands
Date: 2026-11-05

## Context

The Hollow moved from a Claude project's design thread into its own repo
(`docs/HANDOFF.md`). Jared asked for the repo to be scaffolded for
development with the AIOS skill `scaffold-agentic-repo`
(jwhector/AIOS, `.claude/skills/scaffold-agentic-repo/`). Work will be done
by agents in Claude Code, on Jared's machines and in cloud sessions, and
reviewed by Jared.

## Decision

Install the skill's **Tier M** scaffold: one deployable, one person.

- **Knowledge by temperature.** `CLAUDE.md` is warm (always loaded, short).
  These records are cold. Mulch (`.mulch/`) is hot, with one domain per
  concern (`engine`, `views`, `workflow`).
- **One fact, one home**, with a table in `CLAUDE.md` and a test per kind of
  shared fact where a test can see it.
- **Backlog in seeds** (`.seeds/`), because `sd` is in the shared cloud
  environment. Plans use `docs/plans/TEMPLATE.md`.
- **Guardrails.** A best-effort format hook after every agent edit, a fast
  pre-commit (Biome on staged files), and CI running the full check.
- **The review kit, simplest column**: one reviewer (`.claude/agents/reviewer.md`,
  model alias `opus`), up to three rounds, no tiers, a round budget of 3 per
  pull request (5 when the change touches the gates). Copied from the AIOS
  and now this repo's own.
- **The push gate judges by ancestry and allows a clean merge of main**
  after the summary, plus data commits (`.mulch/`, `.seeds/`, `docs/plans/`).
  This takes greenbank-ledger's merge handling, as the skill advises, rather
  than the AIOS's blind spot (the AIOS judges by commit date and ignores
  every merge). A merge passes only when its second parent is on
  `origin/main` and its tree equals git's own merge of its parents, so a
  hand-made conflict resolution is refused.
- **Cloud readiness.** Sessions use the shared `agentic-dev` environment
  (its setup script lives in the AIOS); this repo installs its own
  dependencies with a SessionStart hook and turns on its git hooks.

## Why

The repo describes itself, so a session needs only "read CLAUDE.md, then do
the task". Jared is not the first reviewer of an agent's code. Tier L
machinery (worktree isolation, per-package parallelism) would cost more than
a single-package prototype can repay.

## Alternatives rejected

- **Tier S (CLAUDE.md, backlog, a verify note only).** The repo will grow an
  engine, several views and a battle loop, with agents doing most of the
  work; it needs the review kit.
- **A CI reviewer.** A reviewer after the loop fixes nothing and repeats a
  loop that just ended clean (the AIOS removed one on 2026-10-06).
- **Copying the AIOS gate unchanged.** It ignores merges and orders by date,
  a blind spot the AIOS tracks as a task.

## Consequences

Every agent push of code first runs `review-loop`, which costs a few minutes
and tokens per change. A person pushing to a `claude/*` branch meets the gate
and uses `--no-verify` deliberately. Passing the gate is an attestation, not
proof: the summary commit is written by the session. The kit now drifts from
the AIOS's on its own; a lesson every repo should keep goes back to the
skill's `review-kit.md`.
