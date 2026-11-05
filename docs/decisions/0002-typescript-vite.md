# 0002. TypeScript and Vite, one package

Status: pending Jared on the stack (asked on a decision card, 2026-11-05)
Date: 2026-11-05

## Context

The prototype is a single-device browser build: crafting plus a 5-round hex
battle, System A and System B on one engine (Decided Nov 4, `docs/design/`).
The end target is a Discord Activity, which is a web page. Glizzybot, the
project The Hollow came from, is TypeScript. The handoff asked that the stack
be confirmed with Jared before committing to it; the scaffold went ahead on
the suggested default so the work is not blocked, and this record changes if
he picks otherwise.

## Decision

- **TypeScript** everywhere, strict, checked with `tsc --noEmit`.
- **Vite** builds the views (`views/` is its root, output in `dist/`).
- **Vitest** runs the tests; the review kit's scripts use `node --test`.
- **Biome** formats and lints.
- **No UI framework yet.** Views start as plain TypeScript and the DOM. A
  framework is its own decision when a view needs one.
- **One package** at the repo root, with `engine/` and `views/` as folders.
  The engine stays pure (no DOM, no imports from `views/`), guarded by
  `tests/guards/engine-purity.test.ts`, so it can become its own package if a
  server ever needs it.
- **Node 22**, pinned in `.nvmrc`, which CI reads.

## Why

Types make the rune grammar and the budget model checkable. Vite builds the
web page a Discord Activity needs, and its test runner shares the config.
Biome is one dependency for formatting and linting.

## Alternatives rejected

- **TypeScript, Vite and React.** More structure for UI, one more dependency
  to learn and keep. Not needed for a crafter and a 7x7 board yet.
- **Plain JavaScript with no build step**, like the reference tools. Fastest
  to start, but no types, and harder to grow into a Discord Activity.
- **A workspace of packages (engine, views).** The ceremony of a monorepo
  for one deployable.
