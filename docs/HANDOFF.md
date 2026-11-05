# The Hollow: handoff to a new project

Written 2026-11-05 by the thread "Design The Hollow deck-building RPG" (Glizzybot project), for a new Claude Code project and repo.

## What Jared wants next

1. Move all of The Hollow's design context into a new project with its own Claude Code session.
2. Create a repo that keeps all of this information.
3. Start prototyping and building views.

The design talk is paused mid-way through the ring review (see "In progress" below). Pick it up there when Jared is ready.

## How Jared works (follow these)

- **Jared names mechanics.** Use plain descriptions and placeholders. Never invent names for runes, inscriptions or mechanics. Names he has given: sigil, inscription, Global modification, property primitives, major and minor inscriptions, Amplification, Diminishing, Haste, Slow, Invisibility, Revelation, binary (effects), blank (rune), totem.
- **Mark every design item Decided, Proposed or Open.**
- **Discuss in chat, one item at a time.** Give options and a pick, let him answer, and update the docs once he decides. Don't put a decision only in a doc table.
- Plain, full sentences. Simple beats clever. Skimmable deliverables.
- Serious Slay the Spire tone in the game itself. No hot dog humor.

## Sources of truth (Claude Docs and artifacts)

| What | Link | Notes |
| --- | --- | --- |
| Master doc ("Glizzy Quest: deck-building RPG brainstorm", The Hollow's game design) | https://claude.ai/artifact/3dn6hFFKkYTwLjKffii1gL | Decided/Proposed/Open per section. The Nov 5 notes sit under the "Rune reference" part. |
| Spell model doc | https://claude.ai/artifact/4y6uFQU9JdJzypvaTp21Jk | Property primitives, 12 engine primitives, write modes, rune essences, center and ring reference tables, the ring-vs-center audit. |
| Effect flags checklist | https://claude.ai/artifact/9rXv5JzM92A2QwSakkonN3 | The live working doc: 16 flags every new effect declares, binary effects, fractional modifiers, budget model, primitives math, and the ring review tables with every decision. |
| BG3 spell coverage audit | https://claude.ai/artifact/5msD9Jxa5fejQTnw3kX8qW | 176 BG3 spells mapped onto the grammar. Data in `data/bg3-spells.py`. |
| Sigil brainstorm (System A) | https://claude.ai/artifact/AKGAvWsNPGhGMZ7h38Ycuf | 42 sigils. |
| Crafter "Spell Circle Grammar" (v14) | https://claude.ai/artifact/7E3zWYPihzodDzW2MsMznG | Copy in `tools/crafter.html`. Its JS holds the engine data (RUNES, SHAPES, TRIGGERS, TETHERS, HOOKS). |
| Audit tool "Hollow Spell Audit" (v4) | https://claude.ai/artifact/L8oTdLrYdmrxAoh95TM9tX | Copy in `tools/audit.html`. Sweeps every circle; Jared's marks are in its db collection "marks". |

The Claude Docs are the source of truth until the repo takes over. Export each one to Markdown into the repo's `docs/` folder early (the Docs connector can export a tab as Markdown), then decide with Jared whether the repo or the docs lead from then on.

**Out of date:** the crafter and audit tool still show the old ring entries and still list Push and Pull as runes. They were going to be updated once the ring review finished.

## The game in one screen (all Decided unless marked)

- Discord Activity, ~7x7 hex grid. Rounds work like Stolen Realm: all players act live, then all enemies. Each enemy shows its next move as a rune circle (deciphering it is optional). Action plus bonus action. Displacement and terrain matter a lot. Classic RPG feel, not a puzzle game.
- No classes: the runes you collect and trade define your role. Runes are never lost involuntarily, and they're consumed when you learn a spell. Levels unlock rune kinds.
- About 12 spells crafted between battles, on a hotbar with cooldowns. Wild runes form a shared party pool.
- Friendly fire is on. Units die (no downed state). Basic attacks exist. No accuracy rolls for now.
- **A/B fork:** System A uses fixed sigils plus runes. System B is a freeform circle: a center rune, ring runes, and inscriptions (learned, permanent, untradable). Jared will playtest both on one engine.
- **Prototype scope (Decided Nov 4):** a single-device browser prototype with crafting plus a 5-round hex battle, A and B on one engine. The game gets its own repo (this one).

## System B as of Nov 5

- **16 runes**, opposites in pairs: Fire/Frost, Mend/Wound, Protect/Expose, Summon/Dispel, Amplification/Diminishing, Haste/Slow, Invisibility/Revelation, plus Portal and Stone with no opposite. A **blank** rune is planned for spells that only move things (mechanics Open).
- **Push and Pull are inscriptions now (Decided Nov 5)**, available to everyone. Forced movement is paid from the budget by hexes moved times units moved.
- **The center makes a thing:** an effect, a gate (Portal), a summon (Summon) or a shield (Protect). Ground comes from lingering areas and walls.
- **Ring runes change the center's output.** Which column they use depends on what the center made: at a point, on a unit, on ground, along a tether, through a gate, on a summon, on a spell, or global modification.
- **Decided Nov 5:**
  - Center effects stay unique to the center, and ring runes always do something different. Combos such as a healing portal come from linking spells.
  - On a made thing (gate, summon, shield, ground), ring runes change the thing itself and don't add an effect. The one exception so far is Wound on a gate.
  - Every rune gets a meaning in every column.
  - Only a Dispel center can target a spell; its ring runes decide what happens to that spell.
- **Inscriptions:** one shape, extra points (up to 3), range, delay, lingering, filter, triggers, tethers (copy, redirect, transfer, leash), follows the unit, steerable, weakest first, and now push and pull.

## Budget rules (Decided Nov 5 unless marked)

- **Budget unit:** what a reference spell does: a Wound center, single target, 1-round cooldown. That counts as 1.
- **Cap:** one cast is worth at most about 2 (two turns' worth); the number is open to tinkering. Cooldown buys budget only up to about battle length.
- **Linked spells:** a linked spell is one spell with a more complex shape. Its budget is a single spell's times a link multiplier, about 1.5 to start. Casting it costs the action and the bonus action, or only the action with Haste's quick cast. The linked spell's own shape decides how many of the first spell's results it lands on: single 1, chain up to 3, area all.
- **Value model:** value = base value × strength × units × rounds × repeats × multipliers. A modifier costs the value with it minus the value without it, so relative boosts are handled automatically. Each ring idea is written as a recipe of primitives (delay ×0.8, trigger ×0.75, duplicate, fraction, neighbors, rounds, repeats, and so on).
- **Binary effects** (an extra action, a lost action, hidden, encased) change in whole steps (units or rounds), never by fractions. When the budget is short they reach fewer units.
- **Three-pass split:** ring runes keep at least half their share, the center gets whole units, and leftovers go back to the ring. The crafter should show the result, for example "Haste reaches 2 of 3".

## In progress: ring review (paused Nov 5)

This is step 3 of the plan Jared agreed:
1. Grammar and linking (done).
2. What the budget measures (done).
3. Settle every ring idea, column by column (in progress).
4. Put numbers into the audit tool.
5. Playtest.

**Done:**
- **At a point or on a unit.** All 18 rows were reviewed; Push and Pull have since become inscriptions. Highlights:
  - Mend spares allies from harm on areas, and gives a weak heal on a unit (to the caster if the target is an enemy).
  - Protect gives a capped guard.
  - Portal casts from an ally or summon.
  - Summon leaves a totem.
  - Diminishing shortens the cooldown only.
  - Haste gives quick cast.
  - Slow draws the effect out.
  - Revelation can pick hidden units.
  - Frost keeps slick.
- **Through a gate.** All 16 rows are settled in the checklist. Fire grows the entrance, Portal makes the gate two-way, Stone anchors the exit to a unit, and Protect puts a shield wall around the exit.

**Next:** on a summon, then on ground, along a tether, on a spell, and global, plus a check of ring runes on a Protect shield. Each one should be discussed with Jared in chat, one rune at a time.

## Open questions

- What the blank rune does, in the center and in the ring.
- Amplification and Diminishing on binary effects: one unit or one round?
- A cap on extra actions per unit per round.
- What the transfer tether does with a taken action.
- Stacking rules for statuses versus ground.
- The concentration-like limit (a separate conversation).
- The budget curve's actual numbers, and the expected-neighbors constant (about 1.5).
- Cooldown rule A/B test: per center or per rune.

## What's in this folder

- `HANDOFF.md`: this file.
- `tools/crafter.html`: Spell Circle Grammar v14, self-contained. It holds the current engine data and logic in plain JS.
- `tools/audit.html`: Hollow Spell Audit v4, self-contained. It reuses the crafter's engine block and has a price list value model.
- `tools/crafter-test.js` and `tools/audit-test.js`: Playwright smoke tests. Run them with `node tools/crafter-test.js <path to crafter.html>` and `node tools/audit-test.js`.
- `data/bg3-spells.py`: the BG3 coverage dataset, one row per spell: (level, name, circle, verdict E/A/X, gap letters, note).
- `memory/`: the Glizzybot project's memory notes about The Hollow, including how Jared likes to discuss design. Seed the new project's memory from these.

## Suggested first steps in the new project (Proposed, confirm with Jared)

1. **Repo skeleton:**
   - `docs/` for Markdown exports of the docs above, plus this handoff.
   - `reference/` for the two HTML tools and the BG3 data.
   - `engine/` for pure game logic with no UI: runes, circles, the budget model, the forge, battle rules.
   - `views/` for the crafter view, the budget readout and the hex battle board.
   - Tests.
2. **Port the engine first:** port the crafter's RUNES, SHAPES and HOOKS data and its reading logic into `engine/`, with tests, before building new views. That turns the design docs into checkable code.
3. **Implement the budget model and the three-pass split as engine functions,** then show them in a crafter view ("Haste reaches 2 of 3").
4. **Build a minimal hex battle view:** a 7x7 grid, a 5-round loop, enemies showing their next move.
5. **Ask Jared about the stack** before choosing. Glizzybot is TypeScript and the end target is a Discord Activity (a web page), so TypeScript and Vite would be a natural default.
