# Archive: superseded design text

**Archived 2026-11-05.** These passages were replaced by later decisions. They are
kept word for word from the docs they came from, so the reasons behind a change
can be read in full. The current design is in the [docs](../README.md#the-docs),
and the [decision log](../decision-log.md) says what replaced each one.

## Live spellcrafting (from the master doc, Nov 3)

Replaced on Nov 3 by "craft between battles, cast during battles" (see the
[overview](../overview.md#crafting-between-battles-casting-in-battle)).

**Proposed:** wild runes, temporary runes drafted at the start of each battle that last only for that battle, to give every fight a roguelike feel. Decided Nov 3: they're in, as a shared pool for the party (below).

**Jared's idea (Nov 3): live spellcrafting (later simplified; see the update and the Nov 3 decisions below).** Each round you draw a set of runes. You place the runes you drew into a configuration, a layout of slots, to form spells. Where a rune sits decides how its power is channeled into the spell. Still a deck builder: what you draw comes from the runes you own. Spells will lean offensive, defensive or supportive, but roles come after the core mechanics.

**Open questions on it**

- Where configurations come from: a few fixed ones everyone knows, or collected and upgraded like runes (two collections: what you slot and what you slot into).
- What a slot can change about a rune: strength, area shape, range, element, timing.
- Is the drawn hand the per-round resource (no separate mana), and how does it map onto action and bonus action?
- Do unused runes carry over to the next round?
- How fast crafting stays with a \~30 second live phase on a phone: number of slots, tap-to-place, a quick-cast option.
- Can players hand runes to each other, or slot into a teammate's configuration?
- Idea to test: the configuration's layout is a small hex pattern, and the pattern you fill becomes the spell's shape on the battlefield.

**Update (Nov 3):** Jared thinks full live spellcrafting is probably too heavy; simplicity is key for a wide audience. Proposed simplification: **craft between battles, cast during battles.** You build spells from runes in chat with no timer; in battle you draw your built spells, and each round you may also draw one loose rune to attach to a spell with a single tap. The depth sits in preparation, the live round stays one or two quick decisions.

## The pair table (from the master doc, Nov 3)

Replaced on Nov 3 by one entry per ring rune per column.

- (Superseded Nov 3 by the hook table below: one entry per ring rune per column, no pair table.) Pairs with no designed meaning fall back to "both effects apply". Interesting pairs come from a fixed, curated table, drafted offline with Claude and chosen by Jared, so the game never improvises.

## Worked examples that used old runes (from the master doc, Nov 3 and 4)

Tether stopped being a rune on Nov 4, and Push and Pull became inscriptions on
Nov 5.

**Worked examples**

- Gather and scatter: portal at the center, pull in section 1, push in section 2, burst plus an extra point. Pull drags everyone at A into the gate, they come out at B, and push scatters them from B's center.
- Damage sharing (updated Nov 4): protect at the center, the redirect tether inscription, allies only, lingering. You take part of an ally's damage for a few rounds; the share comes from the protect rune's quality.
- Superseded Nov 4 (tether is no longer a rune; needs a new recipe). Rescue or taunt: tether at the center, portal then summon in the ring, burst. Everyone in the burst is linked to you, travels the link to stand next to you, and a decoy appears where they were.
- Superseded Nov 4 (open: snap-back needs a home). Round-trip door: portal at the center, tether then summon in the ring, burst. A gate joins area A and the hex next to you for the round. Anyone who walks through stays linked to where they entered and snaps back at round end; a decoy appears where the first traveler stepped in. Enemies can use it too.

## The two new columns as first proposed (from the master doc, Nov 4)

The columns stay. Replaced on Nov 5: a rune no longer means the same thing in the
center and the ring, and only a Dispel center can target a spell. The center and
ring entries now live in the [rune reference](../rune-reference.md).

**Decided Nov 4: two new columns**

- **On a spell.** Reached with a new "targets a spell" inscription. The point is an enemy's shown next move (its rune circle) or an ally's prepared spell, and every rune acts on that spell instead of on units. Proposed entries (the same meaning whether the rune is the center or in the ring): dispel strips runes from it up to the dispel spell's power budget (the caster picks which; stripping the center cancels it, so a full counter needs a big circle), portal moves its area to another point, push and pull shift its area 1 hex, the copy tether inscription makes its caster share whatever it does to its targets, expose makes it hit harder (good on an ally's spell, risky on an enemy's), fire and wound hurt its caster when it casts, frost makes it go off last, protect softens it, mend heals allies it hits, summon gives a single-target spell a decoy to hit, and stone puts up a barrier that stops bolts and lines.
- **Global modification** (Jared's name). Reached with a new "whole battlefield" shape that costs 3 slots. It changes the rules of the whole battlefield for a few rounds and affects everyone, your side included. Proposed center rules (what each rune does as the center of a global modification; ring entries shape it, see below): fire makes burning last longer, frost removes bonus moves, mend heals everyone each round, wound damages everyone each round, protect reduces each unit's first hit per round, expose raises all damage, push slides every unit one way at round end, pull slides every unit toward the middle, portal links two random hexes as gates each round, summon brings a weak neutral creature in each round, dispel clears statuses and terrain, and stone turns the edge to rock, shrinking the battlefield.
- Proposed order rules: on both columns, ring runes act as traits (order-free), except that on a spell, movers (they shift its area) and dispel (it strips runes) keep their place. A global modification can't also target a spell (both are shapes, so this follows from one shape per circle).
- Presets on the map page: Strip a spell, Redirect, Shrinking arena.

## The coverage audit to-do (from the master doc, Nov 4)

Done on Nov 4: see the archived [BG3 coverage audit](bg3-coverage-audit.md).

- **To do: a coverage audit of the gaps.** Jared uses Baldur's Gate 3 spells to test coverage: can the grammar build them? Write a broad set of BG3 combat spells as circles and tag each one as a fit, an awkward fit, or needing an extension. Then group the gaps by the four extension points (new primitive, output kind, property primitive, write mode) to find new primitives and see which ones buy the most coverage. A first guess puts coverage today at 70 to 80%. (Done Nov 4: of 176 BG3 spells that fit, 50% are an easy fit today, and four additions reach 76%. Ranked gaps and every spell are in the BG3 spell coverage audit doc: https://claude.ai/artifact/5msD9Jxa5fejQTnw3kX8qW . Later on Nov 4 every proposed fix was put in, which reaches about 95%; see the section below.) The gaps from a first pass:
  - action economy (Haste, Slow)
  - taking control of a unit (Command, Dominate)
  - unit stats (Polymorph, Enlarge/Reduce)
  - visibility (Invisibility, Darkness, Fog Cloud)
  - who picks targets (lowest health first; a mark that jumps on death)
  - steerable effects that are re-aimed each round (Moonbeam, Call Lightning)
  - a stored spell as a payload (Glyph of Warding, Contingency)
  - chance (Blink, Mirror Image), which would become deterministic

## Worked examples that used the Push rune (from the spell model, Nov 4)

Push and Pull became inscriptions on Nov 5.

**Spreading fire vs burning shove.** Same runes, swapped:

```
fire center + push ring, burst  What+=[burn, burning terrain]; Where: shape grow(+1); How much: scale down
push center + fire ring, burst  What+=[move away]; What+=[burn on moved units, burning terrain]
```

**Storm zone** (push center, whole battlefield, ring wound, dispel, stone, pull):

```
Output=global effect
What  += [rule: at round end every unit slides 1 hex one way]   (center)
What  += [rule: small damage each round]                          (wound)
What  += [remove statuses and terrain at start]                   (dispel)
Where: shape anchor(one region) + shape close-in                  (stone, pull: combine)
When : scale duration                                             (stone)
All ring writes swap freely -> 24 arrangements, one recipe.
```

**Global summons with push** (summon center, whole battlefield, push ring):

```
Output=summon   (a thing center keeps its own output wherever it's aimed)
What  += [create weak bodies at the edge each round]
Traits+= [on hit: push attacker 1 hex]
```

## The vortex sigil (from the sigil brainstorm, Nov 3)

Superseded on Nov 3: a vortex is a circle sigil with a pull rune, since movement
comes from runes.

| # | Sigil | Shape and slots | Cost | Example |
| --- | --- | --- | --- | --- |
| 25 | Vortex | (Superseded Nov 3: a vortex is now a circle sigil with a pull rune, since movement comes from runes.) Target a hex; every unit within 2 hexes is pulled 1 hex toward it. Slot 1: ground at the center. Slot 2: on every unit pulled | A, 3 | Fire center + frost on units: gather the enemies, freeze them on top of a fire |
