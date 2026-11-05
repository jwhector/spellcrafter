# Design sources

The Hollow's design lives in the Markdown files in this folder. This file is
the one home for the links to where they came from (five Claude Docs) and to
the two HTML tools: everything else in the repo links here instead of
copying a URL (guarded by `tests/guards/design-links.test.ts`).

## Which copy leads

**Decided (Jared, 2026-11-05): the Markdown here leads.** Change the design
by editing these files in a pull request, and only once Jared has decided the
change. The Claude Docs are frozen at the revisions below and are no longer
edited. When Jared works in Claude, the changes are mirrored into an Artifact
for him to read (below); the mirror never leads. Why:
[decision 0003](../decisions/0003-repo-markdown-leads.md).

## The mirror

**The Hollow design**, https://claude.ai/artifact/PMHE4z5htwzBQgT4Jnmex2: one
read-only page with a tab per doc, built from these files by
`npm run design:mirror` (`.github/scripts/design-mirror.mjs`). The tab order
is the order of the docs table below. It says which commit it was built from.

## The docs

| Doc | Claude Doc (frozen) | File | Exported from | What it holds |
| --- | --- | --- | --- | --- |
| The Hollow: game design (master doc, titled "Glizzy Quest: deck-building RPG brainstorm") | https://claude.ai/artifact/3dn6hFFKkYTwLjKffii1gL | [game-design.md](game-design.md) | 2026-11-05, rev 167 | Decided, Proposed and Open per section. The Nov 5 notes sit under "Rune reference". |
| The Hollow: spell model | https://claude.ai/artifact/4y6uFQU9JdJzypvaTp21Jk | [spell-model.md](spell-model.md) | 2026-11-05, rev 48 | Property primitives, the 12 engine primitives, write modes, rune essences, center and ring reference tables, the ring-vs-center audit. |
| Effect flags checklist | https://claude.ai/artifact/9rXv5JzM92A2QwSakkonN3 | [effect-flags-checklist.md](effect-flags-checklist.md) | 2026-11-05, rev 88 | The live working doc: the 16 flags every new effect declares, binary effects, fractional modifiers, the budget model, primitives math, and the ring review tables with every decision. |
| The Hollow: BG3 spell coverage audit | https://claude.ai/artifact/5msD9Jxa5fejQTnw3kX8qW | [bg3-coverage-audit.md](bg3-coverage-audit.md) | 2026-11-05, rev 24 | 176 BG3 spells mapped onto the grammar. |
| Sigil brainstorm (System A) | https://claude.ai/artifact/AKGAvWsNPGhGMZ7h38Ycuf | [sigil-brainstorm.md](sigil-brainstorm.md) | 2026-11-05, rev 13 | 42 sigils. |

## The tools

| Tool | Link | Copy | Notes |
| --- | --- | --- | --- |
| Crafter, "Spell Circle Grammar" v14 | https://claude.ai/artifact/7E3zWYPihzodDzW2MsMznG | [reference/crafter.html](../../reference/crafter.html) | Its script holds the engine data (RUNES, SHAPES, TRIGGERS, TETHERS, HOOKS). |
| Audit tool, "Hollow Spell Audit" v4 | https://claude.ai/artifact/L8oTdLrYdmrxAoh95TM9tX | [reference/audit.html](../../reference/audit.html) | Sweeps every circle. Jared's marks live in its database collection "marks", which was empty on 2026-11-05. |

Both tools are out of date: see [reference/README.md](../../reference/README.md).

## Changing a doc

Edit the file here. Mark each statement Decided, Proposed or Open, and never
promote one to Decided without Jared. The "Exported from" column records the
Claude Doc revision each file started from; it does not change. Each Claude
Doc carries a note at the top, added 2026-11-05, saying it is frozen and
linking the mirror.

When the change comes out of a conversation with Jared in Claude, refresh the
mirror in the same session: run `npm run design:mirror`, then republish
`out/design-mirror.html` to the mirror's link above with the Artifact tool
(pass the link as `url`, so it keeps its address).
