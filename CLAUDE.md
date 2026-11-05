# The Hollow

A deck-building hex RPG, built first as a single-device browser prototype:
crafting spells between battles, then a 5-round battle on a 7x7 hex grid,
with design System A (fixed sigils plus runes) and System B (a freeform rune
circle) on one engine so Jared can playtest both (prototype scope, Decided
Nov 4). The end target is a Discord Activity. Jared owns the design; agents do most of the building.

Where the project came from, and the state of the design when it moved here:
[docs/HANDOFF.md](docs/HANDOFF.md). The design itself:
[docs/design/README.md](docs/design/README.md).

## How the repo is organized

| Path | What lives there |
| --- | --- |
| `engine/` | Pure game logic: runes, circles, the budget model, the forge, battle rules. No UI. |
| `app/` | The views, as a Next.js app (App Router): the crafter view, the budget readout, the hex battle board. |
| `tests/` | Tests that span the repo, including the guards in `tests/guards/`. Unit tests sit beside their code as `*.test.ts`. |
| `docs/design/` | The design docs (they lead the design), and the one home for links to their sources. |
| `docs/decisions/` | Decision records: why the repo is built the way it is. |
| `docs/plans/` | Plans for larger work, from `TEMPLATE.md`. |
| `docs/agentic-workflow.md` | How work flows here: the loop, the kickoff prompt, the maintenance contract. |
| `reference/` | The design-phase HTML tools (crafter, audit) with their smoke tests, and the BG3 coverage data, as handed off. Not built, not edited. |
| `.seeds/` | The backlog (`sd`). |
| `.mulch/` | Engineering expertise (`ml`). |

The engine is separate from the views so the same rules run in tests, in the
crafter's preview and in battle.

## Golden rules

1. **Jared names mechanics.** Never invent a name for a rune, inscription,
   sigil or mechanic, in code, docs or UI text. Use the names he has given
   (the design docs list them) and plain descriptions for the rest. An
   identifier for an unnamed thing describes what it does, and its comment
   says the name is a placeholder.
2. **Every design statement is marked Decided, Proposed or Open.** Code that
   implements a Proposed or Open rule says so in a comment, with the doc and
   section it comes from. Never promote an item to Decided yourself.
3. **Design is discussed with Jared, one item at a time.** Give options and a
   pick, let him answer, and update the docs once he decides. A decision that
   exists only in code or a table is not a decision.
4. **The design docs in `docs/design/` lead**
   ([decision 0003](docs/decisions/0003-repo-markdown-leads.md)). Editing
   one changes the design, so it waits for Jared's decision (rule 3).
5. **The engine is pure and deterministic.** Nothing in `engine/` imports
   from `app/` or a UI library (React, Next.js), or touches the DOM (guarded by
   `tests/guards/engine-purity.test.ts`). Same input, same result, so a
   preview and a battle can never disagree.
6. **One fact, one home.** A fact more than one file needs lives in one place
   (the table below), and every other file links to it. A new kind of shared
   fact gets its home, its guard where a test can see it, and its row here in
   the same change.
7. **A ratified choice about how the repo is built gets a decision record**
   (`docs/decisions/`, numbering rules in its README). The rule lives here
   and links to the record.
8. **Tone.** The game is serious, in the spirit of Slay the Spire. No jokes in
   game text. Repo writing is plain, full sentences; simple beats clever.

## Where each fact lives

| Fact | Home | Guard |
| --- | --- | --- |
| Links to the design docs and tools | `docs/design/README.md` | `tests/guards/design-links.test.ts` |
| Which copy of the design leads | `docs/design/README.md` | none (one sentence, read by people) |
| Node version | `.nvmrc` (CI reads it with `node-version-file`) | none needed: nothing else states it |
| Stack and tool choices | `docs/decisions/0002-typescript-nextjs.md` | none |
| What counts as code for the push gate, the summary format, the round budget and when the larger one applies | `.github/scripts/loop-gate.mjs` | `.github/scripts/loop-gate.test.mjs` |
| The reviewer's model | `.claude/agents/reviewer.md` | none (one file) |

## Run, test, verify

```bash
npm ci              # once, and after the lockfile changes
npm run dev         # the views at http://localhost:3000
npm run check       # typecheck, lint, tests, script tests, build: what CI runs
npm run format      # Biome: format and fix lint
```

Next.js changes between versions faster than an agent's training. Before
writing Next.js code, read the guide for this version in
`node_modules/next/dist/docs/`. `next dev` writes that instruction into
`AGENTS.md`, which is committed so the tree stays clean; leave it as Next
writes it.

Checks prove consistency, not behaviour. Before calling a change done, watch
it work and write what you saw as a `Proof:` paragraph in a commit message:
the `verify` skill (`.claude/skills/verify/`) says how for each kind of
change.

## Backlog and expertise

- **Work** lives in seeds: `sd ready` shows what can start now, `sd show <id>`
  the detail, `sd close <id>` when done (it unblocks what depended on it).
  Something you find and cannot finish now becomes a seed, not a comment.
- **Engineering knowledge** lives in Mulch. Run `ml prime` at the start of a
  session, and `ml prime --files <path>` before editing a file. Before you
  finish, record what the next session should know
  (`ml record <engine|views|workflow> --type <convention|pattern|failure|decision|reference|guide> --description "…"`),
  then `ml sync`. Skip it when nothing surfaced.
- **Design knowledge** lives in the design docs, not in Mulch.

## In a cloud session (`CLAUDE_CODE_REMOTE=true`)

Cloud sessions use the shared `agentic-dev` environment, whose setup script
lives in the AIOS (`jwhector/AIOS`, `.claude/routines/agentic-dev-setup.sh`).
This repo's SessionStart hooks run `npm ci` and turn on the git hooks in
`.githooks/`.

- **Push only to a `claude/*` branch. Never push to `main`.**
- **Run `npm run check` before you push.**
- **Write the commit message for the reviewer:** what was asked, the
  acceptance criteria, what you decided, and what you left out.
- **Commit as you go; push once, when the work is complete.** Your first push
  of a code branch opens its pull request, which tells Jared it is ready.
  Never push work in progress: every push of new code owes a review loop.
- **Run the `review-loop` skill once, right before that push,** and make its
  summary commit the last one. So `ml record`, `ml sync`, `sd close` and
  `sd sync` come **before** the loop. The pre-push loop gate
  (`.github/scripts/loop-gate.mjs`) refuses the push otherwise. Never
  bypass it with `--no-verify`; that is for a person.

The whole flow, and the kickoff prompt for a new session:
[docs/agentic-workflow.md](docs/agentic-workflow.md).
