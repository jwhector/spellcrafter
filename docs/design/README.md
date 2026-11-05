# Design sources

The Hollow's design lives in five Claude Docs and two HTML tools. This file is
the one home for their links: everything else in the repo links here instead
of copying a URL (guarded by `tests/guards/design-links.test.ts`).

## Which copy leads

**Open, for Jared:** whether the Claude Docs or these Markdown exports lead
from now on. Until he decides, **the Claude Docs are the source of truth**,
and the files here are snapshots. Do not edit a snapshot to change the
design; change the doc (or ask Jared to), then export it again. Seed
`spellcrafter-da21` tracks the question.

## The docs

| Doc | Link | Snapshot | Exported | What it holds |
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

## Re-exporting a doc

With the Claude Docs connector, export the doc's tab as Markdown and replace
the snapshot whole. Update the "Exported" column in the same commit, so the
table says which revision the file holds.
