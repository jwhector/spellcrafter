# 0002. TypeScript and Next.js, one package

Status: ratified when it lands
Date: 2026-11-05

## Context

The prototype is a single-device browser build: crafting plus a 5-round hex
battle, System A and System B on one engine (Decided Nov 4, `docs/design/`).
The end target is a Discord Activity, which is a web page served from a
server. Glizzybot, the project The Hollow came from, is TypeScript. The
handoff asked that the stack be confirmed with Jared before committing to it.
The scaffold first went ahead on TypeScript and Vite as the default, and
Jared chose Next.js instead in the project thread on 2026-11-05.

## Decision

- **TypeScript** everywhere, strict, checked with `tsc --noEmit`.
- **Next.js** with the App Router builds the views. `app/` holds them; React
  is the UI library that comes with it. `npm run dev` serves them,
  `npm run build` builds them.
- **Vitest** runs the tests; the review kit's scripts use `node --test`.
- **Biome** formats and lints.
- **One package** at the repo root, with `engine/` and `app/` as folders.
  The engine stays pure (no DOM, no React or Next.js, no imports from
  `app/`), guarded by `tests/guards/engine-purity.test.ts`, so the same rules
  run in tests, in the crafter's preview and in battle, and the engine can
  become its own package if it ever needs to.
- **Node 22**, pinned in `.nvmrc`, which CI reads.
- **Next.js defaults otherwise.** No static export, no extra config. How the
  app is deployed as a Discord Activity is its own decision when that work
  starts.

## Why

Jared chose Next.js. What it gives the project: React components for the
crafter, the budget readout and the hex board, and a server side (route
handlers) in the same app, which a Discord Activity needs for its sign-in
token exchange. Types make the rune grammar and the budget model checkable.
Biome is one dependency for formatting and linting.

## Alternatives rejected

- **TypeScript and Vite, no UI framework** (the scaffold's first default).
  Smaller, but views by hand with the DOM, and no server for the Activity.
- **Plain JavaScript with no build step**, like the reference tools. Fastest
  to start, but no types, and harder to grow into a Discord Activity.
- **A workspace of packages (engine, app).** The ceremony of a monorepo for
  one deployable.
