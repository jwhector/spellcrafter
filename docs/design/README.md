# Design sources

The Hollow's design lives in the Markdown files in this folder. This file is
the one home for the links to where they came from (five Claude Docs), to the
mirror, and to the two HTML tools: everything else in the repo links here
instead of copying a URL (guarded by `tests/guards/design-links.test.ts`).

## Which copy leads

**Decided (Jared, 2026-11-05): the Markdown here leads.** Change the design
by editing these files in a pull request, and only once Jared has decided the
change. The Claude Docs are frozen and are no longer edited. When Jared works in
Claude, the changes are mirrored into an Artifact for him to read (below); the
mirror never leads. Why: [decision 0003](../decisions/0003-repo-markdown-leads.md).

## The docs

Each doc has one job (Decided Nov 5). The docs show only the current design;
what changed and why is in the decision log, and retired text is in the archive.

| Doc | File | What it holds |
| --- | --- | --- |
| Game overview | [overview.md](overview.md) | The pitch, goals, the first prototype, battles, crafting and the hotbar, the spell forge, rune economy, progression, platform. |
| System B rules | [system-b.md](system-b.md) | The freeform sigil: center, ring, major output types, inscriptions, tethers, triggers, minor inscriptions, linking, ground, conflict and order rules, and the glossary. |
| Rune reference | [rune-reference.md](rune-reference.md) | The ten runes decided on Nov 8, and what each of the 16 runes they replace does in the center and in each major output type, which stands until each new rune is written. |
| Budget model | [budget-model.md](budget-model.md) | The budget unit and cap, the value model, the primitives math, binary effects, and balancing area relocation. |
| Engine model | [engine-model.md](engine-model.md) | Board state, engine primitives, property primitives, write modes, compiling, the combination math, rune essences, extension points, and the audit and test tools. |
| Effect flags checklist | [effect-flags-checklist.md](effect-flags-checklist.md) | The 16 questions every new effect answers before it goes in. |
| System A | [system-a.md](system-a.md) | Sigils plus runes, and the 42-sigil brainstorm. |
| Decision log | [decision-log.md](decision-log.md) | What was decided, what it replaced, and where the rule lives now, newest first. |

## The archive

Retired text, kept word for word, each file with a note saying what replaced it
(Decided Nov 5). The mirror leaves these out.

| File | What it holds |
| --- | --- |
| [archive/superseded.md](archive/superseded.md) | Superseded passages from the master doc, the spell model and the sigil brainstorm. |
| [archive/ring-vs-center-audit.md](archive/ring-vs-center-audit.md) | The ring-vs-center audit and per-column review, retired Nov 5. |
| [archive/ring-review-tables.md](archive/ring-review-tables.md) | The ring review's working tables for its first two columns (now major output types), and the old binary-effect tables. |
| [archive/bg3-coverage-audit.md](archive/bg3-coverage-audit.md) | The finished BG3 coverage audit: 176 spells written as sigils. |

## The mirror

**The Hollow design**, https://claude.ai/artifact/PMHE4z5htwzBQgT4Jnmex2: one
read-only page with a tab per doc, built from these files by
`npm run design:mirror` (`.github/scripts/design-mirror.mjs`). The tab order
is the order of the docs table above, and this README is the last tab. The page
says which commit it was built from.

## Where the docs came from

The five Claude Docs the design was written in, frozen on 2026-11-05 at the
revisions below. Each carries a note at the top saying it is frozen and linking
the mirror.

| Claude Doc | Link | Frozen at | Its content now lives in |
| --- | --- | --- | --- |
| The Hollow: game design (titled "Glizzy Quest: deck-building RPG brainstorm") | https://claude.ai/artifact/3dn6hFFKkYTwLjKffii1gL | rev 167 | Overview, System B rules, rune reference, System A, decision log, archive |
| The Hollow: spell model | https://claude.ai/artifact/4y6uFQU9JdJzypvaTp21Jk | rev 48 | Engine model, System B rules, rune reference, archive |
| Effect flags checklist | https://claude.ai/artifact/9rXv5JzM92A2QwSakkonN3 | rev 88 | Effect flags checklist, budget model, rune reference, archive |
| The Hollow: BG3 spell coverage audit | https://claude.ai/artifact/5msD9Jxa5fejQTnw3kX8qW | rev 24 | Archive |
| Sigil brainstorm (System A) | https://claude.ai/artifact/AKGAvWsNPGhGMZ7h38Ycuf | rev 13 | System A |

## The tools

| Tool | Link | Copy | Notes |
| --- | --- | --- | --- |
| Crafter, "Spell Circle Grammar" v14 | https://claude.ai/artifact/7E3zWYPihzodDzW2MsMznG | [reference/crafter.html](../../reference/crafter.html) | Its script holds the engine data (RUNES, SHAPES, TRIGGERS, TETHERS, HOOKS). |
| Audit tool, "Hollow Spell Audit" v4 | https://claude.ai/artifact/L8oTdLrYdmrxAoh95TM9tX | [reference/audit.html](../../reference/audit.html) | Sweeps every sigil. Jared's marks live in its database collection "marks", which was empty on 2026-11-05. |

Both tools are out of date: see [reference/README.md](../../reference/README.md).

## Changing a doc

Edit the file here. Mark each statement Decided, Proposed or Open, and never
promote one to Decided without Jared. A balance number (a
multiplier, a cap, a share) is a preliminary value, proposed and untested, even
inside a decided rule (Jared, Nov 5). Keep only the current rule in the doc: when
a decision replaces something, add a row to the [decision log](decision-log.md),
and move any passage worth keeping word for word into the archive.

When the change comes out of a conversation with Jared in Claude, refresh the
mirror in the same session: run `npm run design:mirror`, then republish
`out/design-mirror.html` to the mirror's link above with the Artifact tool
(pass the link as `url`, so it keeps its address).
