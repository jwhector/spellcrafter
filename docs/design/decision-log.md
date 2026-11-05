# The Hollow: decision log

What was decided, what it replaced, and where the rule lives now, newest first.
The docs show only the current design (Decided Nov 5); this log is where the
history goes. "Frozen" names the Claude Doc the old wording is in, at the
revision listed in the [README](README.md#where-the-docs-came-from); passages
that were cut word for word are also in the [archive](README.md#the-archive).

A rule that is still Proposed or Open is in the docs, not here. A row here is
something Jared decided.

## Nov 5

| Decision | What it replaced | Where it lives now |
| --- | --- | --- |
| Balance numbers are preliminary values: proposed and untested, even inside a decided rule. | Numbers listed as decided | [Budget model](budget-model.md), [README](README.md#changing-a-doc) |
| Whether units go down or die stays Open until playtesting. | The Nov 4 lean toward dying, listed among the decided items | [Overview](overview.md#battles) |
| Whether The Hollow keeps its own progression and currency or uses Glizzybot's is Open. | The master doc described the game as "inside the bot", with a table of hooks into it | [Overview](overview.md#glizzybot) |
| Each doc has one job: overview, System B rules, rune reference, budget model, engine model, flags checklist, System A, and this log. The docs show current state only; retired text moves to the archive. | Five docs with history written inline, and the rune tables copied in two of them | [README](README.md) |
| The repo's Markdown leads the design. The Claude Docs are frozen, and an Artifact mirrors the repo. | The Claude Docs led, and the repo held snapshots | [Decision 0003](../decisions/0003-repo-markdown-leads.md) |
| Through a gate, ring review: all 16 rows settled. Portal makes the gate two-way and Stone anchors the exit to a unit (Jared swapped the two). Wound is the one gate entry that adds an effect. | The crafter v14 gate entries (travelers get the rune's effect) | [Rune reference](rune-reference.md#through-a-gate); working tables in archive/ring-review-tables.md |
| On a made thing (gate, summon, shield, ground), ring runes change the thing itself rather than adding an effect. Every rune gets a meaning in every column. | Ring entries that added the rune's own effect to a thing | [System B rules](system-b.md#what-the-center-makes-and-what-the-ring-does) |
| At a point or on a unit, ring review: Fire spreads, Frost keeps slick, Mend spares allies (a weak heal on a unit), Wound finishes, Protect gives a capped guard, Expose pierces, Portal casts from elsewhere, Summon leaves a totem (Jared's name), Dispel can't be undone, Stone anchors, Amplification is a third stronger, Diminishing shortens the cooldown only, Haste gives quick cast, Slow draws the effect out (the delay inscription stays), Invisibility hides the effect, Revelation can pick hidden units. | The crafter v14 entries, most of which repeated the rune's center effect | [Rune reference](rune-reference.md#at-a-point-or-on-a-unit); options and picks in archive/ring-review-tables.md |
| Push and Pull stop being runes and become inscriptions, so any spell can move units. That leaves 16 runes. Forced movement is paid by hexes moved times units moved. A Blank rune (Jared's name) sits in the center of spells that only move things. | Push and Pull as an opposite pair of runes (18 runes); their ground and global entries (current, whirlpool, gale) | [System B rules](system-b.md#other-major-inscriptions), [rune reference](rune-reference.md), [budget model](budget-model.md) |
| Center effects stay unique to the center, ring runes always do something different, and combos come from linking. | The ring-vs-center audit's rules from earlier the same day: a ring entry may duplicate its center effect if weaker, and ground gets no exception | [System B rules](system-b.md#what-the-center-makes-and-what-the-ring-does); archive/ring-vs-center-audit.md |
| Only a Dispel center can target a spell, and its ring runes decide what happens to the spell. | Any center could target a spell, and a rune meant the same thing on a spell in the center or the ring (Nov 4) | [System B rules](system-b.md#shapes-one-per-circle), [rune reference](rune-reference.md#on-a-spell) |
| The budget: the unit is a Wound center, single target, 1-round cooldown. One cast is worth at most about 2. A linked spell is one spell with a more complex shape, budget ×1.5, costing the action and the bonus action. Value comes from dimensions, a modifier costs what it adds, every ring idea is a recipe of primitives, and ring runes keep at least half their share in the three-pass split (a starting number to tune). | Nov 3 proposals for linking: a linked spell has roughly double the power and always costs a full action | [Budget model](budget-model.md) |
| Names: Amplification, Diminishing, Haste, Slow, Invisibility, Revelation for the six runes added Nov 4; binary for all-or-nothing effects; totem; blank. | Placeholder descriptions | [Glossary](system-b.md#glossary) |

## Nov 4

| Decision | What it replaced | Where it lives now |
| --- | --- | --- |
| From the BG3 coverage audit: basic attacks are in; units lean toward dying; a concentration-like limit is wanted; no accuracy for now; battlefields have reshapeable terrain; filters don't work on ground; inscriptions act in intuitive, continuous ways; ground stacking is future expansion; control works through the shown move first; single-target spells get a bonus; a spell that acts differently by target would be its own mechanic. Jared then asked for every proposed fix to be built (about 95% coverage). | Gaps in the grammar the audit found | [Overview](overview.md#battles), [System B rules](system-b.md); the audit is in archive/bg3-coverage-audit.md |
| Tether is no longer a rune. The along-a-tether column stays, and each way of routing an effect along a tether is its own inscription (copy, redirect, transfer, and the proposed leash). | Tether as a rune (13 runes) | [System B rules](system-b.md#tethers) |
| A/B test two cooldown rules: spells with the same center rune share a cooldown, or cooldowns sit on runes. | Nothing stopped a duplicate spell dodging a cooldown | [System B rules](system-b.md#cooldowns-for-similar-spells) |
| Gates on area shapes: the shape is the footprint, and units come out at the other end in the same layout. | Undefined | [System B rules](system-b.md#gates-and-summons-on-area-shapes) |
| From the permutation sweep (about 250,000 circles): beneficial effects go to allies first and harmful to enemies first; targeting a spell is a shape; portal on a spell with no extra point moves it onto the caster; the whole battlefield takes no extra point, range or trigger; a shield's ring runes are order-free traits; a ring rune matching the center adds strength; gates and tethers with three or more points chain; self-cast portals and tethers do nothing, a self-cast summon appears next to you; opposites cancel only where their entries are true opposites. | Undefined combinations | [System B rules](system-b.md) |
| Ring runes modify the center's output. A column is a kind of center output, not a target. | Ring runes acting on their own, with columns as kinds of target | [System B rules](system-b.md#what-the-center-makes-and-what-the-ring-does) |
| Two new columns: on a spell, and global modification (Jared's name), reached through a "whole battlefield" shape. | Five columns | [System B rules](system-b.md#the-columns); first proposals in archive/superseded.md |
| Minor inscriptions unlock at a later Level, minor Who and When first, minor Where after. | Undefined | [System B rules](system-b.md#minor-inscriptions) |
| Summons on area shapes: one on every hex, budget split between them. | Undefined | [System B rules](system-b.md#gates-and-summons-on-area-shapes) |
| The first prototype: is crafting a spell and then using it in a 5-round hex battle fun? Single device, browser, 2 or 3 characters, Systems A and B on one engine. Friendly fire on by default. A grid that grows with player count, kept in mind. The game gets its own repository. | Open: the first slice to build | [Overview](overview.md#the-first-prototype) |
| The tanking ideas were rewritten for the shown enemy intent. | Tanking ideas that relied on the hidden move order | [Overview](overview.md#making-tanking-and-support-necessary-proposed) |

## Nov 3

| Decision | What it replaced | Where it lives now |
| --- | --- | --- |
| Each enemy shows only its next move, as its rune circle; deciphering it is optional. | The enemy showed its moves for 5 turns with the order hidden | [Overview](overview.md#battles) |
| Runes are consumed when used to learn a spell. | Upgrading by swapping runes freely inside the same sigil | [Overview](overview.md#crafting-between-battles-casting-in-battle), [System A](system-a.md) |
| Two crafting systems, A/B tested: System A (sigils plus runes) and System B (a freeform circle). Inverses are separate runes in both. | One crafting system | [Overview](overview.md#runes-and-spells) |
| Interesting rune pairs come from one entry per ring rune per column. | A curated pair table | [System B rules](system-b.md); archive/superseded.md |
| Sigils are geometry and runes are effects; movement runes work from the spell's starting point; dash and leap stay sigil-defined. The forge previews every spell; a spell's identity is its recipe; looks are commissioned in the forge. Linking is done by special high-level items, and cooldown alone can't balance powerful spells. | A vortex sigil (number 25 in the brainstorm) | [System A](system-a.md), [overview](overview.md#the-spell-forge), [System B rules](system-b.md#linking) |
| The configuration is called a sigil; sigils are learned by playing and never traded. | "Configuration" | [System A](system-a.md) |
| Craft between battles, cast in battle. About a dozen spells, on a hotbar with cooldowns that are small numbers. Wild runes are in, as a shared party pool, and never raise cooldowns. A spell's cooldown doesn't change on upgrade. There is a basic action with no cooldown. | Live spellcrafting from a drawn hand each round | [Overview](overview.md#crafting-between-battles-casting-in-battle); archive/superseded.md |

## Nov 2

| Decision | What it replaced | Where it lives now |
| --- | --- | --- |
| Battles run in single rounds: all players act, then all enemies. | Queuing a full 5 turns at once, which removed the ability to adapt | [Overview](overview.md#battles) |
| Battles are designed for a Discord Activity with a tactical grid; chat versions are playtesting proxies. | Undecided platform | [Overview](overview.md#platform) |
