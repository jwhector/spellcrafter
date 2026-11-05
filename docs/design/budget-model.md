# The Hollow: budget model

How the forge works out what a spell is worth and fits it to its budget. The
forge works out a spell's cost from what the spell does, not from a fixed price
per rune. A modifier's cost is whatever it adds to the effect it changes, so its
relative impact is tracked automatically. The numbers come from the audit tool's
current price list and get tuned in step 4 of the plan (numbers in the audit
tool).

The rules that use these numbers are in [System B rules](system-b.md) and the
[rune reference](rune-reference.md). The questions every new effect answers
before it's priced are in the [effect flags checklist](effect-flags-checklist.md).

## Decided

**Decided (Nov 5, Jared)**

- **The budget unit** is what a reference spell does: a Wound center with no ring,
  single target, on a 1-round cooldown. Its damage counts as 1.
- **The cap:** one cast's maximum impact is about two turns' worth, so about 2. The
  number is a starting point to tinker with.
- **Linked spells:** a linked spell is one spell with a more complex shape. Its
  budget is a single spell's budget times a link multiplier, starting at 1.5 and
  tuned later. Casting it costs your action and your bonus action (only your
  action with Haste's quick cast in the ring). Its own shape decides how many of
  the first spell's results it lands on: single reaches 1, chain up to 3, an area
  all of them.
- **The value model** below: value comes from dimensions, and a modifier costs what
  it adds.
- **Every ring idea is broken down into primitives,** and each primitive has its
  own math (the table below).
- **Ring runes keep at least half their share in the three-pass split.**
- **Budget spread over targets, points or area:** each gets a smaller share, and a
  binary effect reaches fewer units.
- **Forced movement** (the Push and Pull inscriptions) is paid from the spell's
  budget by hexes moved times units moved.

**From the handoff only (Nov 5).** The handoff also records these as decided, but
no frozen doc states them; Jared to confirm:

- Cooldown buys budget only up to about battle length.
- The three-pass split works like this: ring runes keep at least half their share,
  the center gets whole units, and leftovers go back to the ring. The crafter
  shows the result, for example "Haste reaches 2 of 3".

## The value model

1. **Every effect is described by its dimensions:** strength, units reached, rounds
   it lasts, and times it repeats. A binary effect has its strength fixed at 1, so
   only its other dimensions can move.
2. **Value = base value × strength × units × rounds × repeats × the other
   multipliers** (single-target bonus, friendly fire, lingering, delay, trigger).
   The base value is the Base value flag, counted in standard turns. Haste starts
   high, about 1 standard turn per round, because an extra move roughly doubles
   what a unit does.
3. **Every modifier names the dimension it changes and by how much.** On smooth
   effects Amplification multiplies strength by 1.33. On binary effects it adds one
   step to rounds or units (Open).
4. **A modifier's cost = the spell's value with it minus the value without it.**
   Nothing is priced by hand per combination.
5. **The spell's total value must fit its budget.** If it doesn't, the forge trims
   dimensions in the three-pass order, and the crafter shows what got trimmed.

Example: Amplification adding one round to Haste on one ally.

| Haste lasts | Value without | Value with Amplification | Amplification costs | Relative boost |
| --- | --- | --- | --- | --- |
| 1 round | 1 | 2 | 1 | 100% |
| 2 rounds | 2 | 3 | 1 | 50% |
| 3 rounds | 3 | 4 | 1 | 33% |

On a binary effect, Amplification always costs the same, one round of Haste,
while its relative boost shrinks as the base grows. On a smooth effect it works
the other way round: the relative boost stays at a third, and the cost grows with
the effect. Either way the budget charges what the spell actually gains. The audit
tool's price list gets replaced by this model in step 4, so its sweep can check
every combination the same way.

## Primitives and their math (Proposed)

Every ring idea is written as a recipe of these primitives, so the forge can add
up its value.

| Primitive | Effect on value | On a binary effect | Used by |
| --- | --- | --- | --- |
| Delay (lands a round later) | ×0.8 | Same | Fire spreads, Slow drawn out |
| Duplicate onto more units | Adds one copy per unit reached | Each copy is a whole unit | Fire spreads, copy tether, chain |
| Fraction of strength | × the fraction | Becomes fewer units, in whole steps | Fire spreads (half), copy tether (half) |
| Units next to the ones hit | × expected neighbours (Open, about 1.5, measured on test boards) | Same | Fire spreads |
| Lasts more rounds | × rounds | Adds whole rounds | Haste, lingering |
| Repeats each round | × times it repeats | Same | Summon traits, ground |
| Trigger (only if something happens) | ×0.75 | Same | Dies and drop-to-0 triggers |
| Single target | ×1.15 | Becomes a cheaper price | Single, bolt, self |
| Steerable, follows the unit | ×1.2, ×1.15 | Same | Inscriptions |
| Friendly fire on an area | Minus 35% of what spreads | Same | Area shapes |
| Stronger or weaker | ×1.33 or ×0.67 | One step (Open) | Amplification |
| Forced movement (Decided Nov 5) | Adds hexes moved × units moved × a price per hex (Open) | Already in steps: fewer hexes or fewer units | Push and Pull inscriptions; ground currents and whirlpools; global gales |

Other price multipliers in use: summon traits and global rules ×2, lingering
×1.6.

**Fire spreads, as a recipe:** delay × duplicate onto neighbours × half strength. On
a Wound center worth 1 on one unit, it adds 1 × 0.5 × 1.5 neighbours × 0.8 = 0.6.
On a Haste center the half becomes whole units, so it adds 1 × 1.5 × 0.8 = 1.2, if
the budget pays for it.

## Binary effects

Binary effects (Jared's word) are all-or-nothing: an extra action, a lost action,
being hidden, being encased, a cancelled move. Half of a lost action is still a
lost action.

**Proposed: a binary effect changes by whole steps instead of fractions:** one more
or one fewer unit reached, or one more or one fewer round, and never a second copy
on the same unit. Effects that move in steps use their own step, such as a hex.

| Modifier | Smooth effects | Binary effects | Status |
| --- | --- | --- | --- |
| Amplification (stronger) | A third more | Its next binary effect reaches one more unit or lasts a round longer, never two extra actions on one unit | Open |
| Budget spread over targets, points or area | Each gets a smaller share | Reaches fewer units | Decided Nov 5 |
| The three-pass split | Ring runes keep at least half their share | The center gets as many whole units as the rest pays for | Decided Nov 5 (half); see Open |
| Single-target bonus (×1.15) | 15% stronger | The effect costs 15% less, and the savings go to ring runes | Proposed |
| A linked spell (× about 1.5) | Each part a bit weaker | Reaches fewer units | Proposed |
| Copy tether (half strength at the far end) | Half strength | Reaches the far end only if the budget pays for one more unit | Proposed |
| Transfer tether (half as much to the far end) | Half as much | What does taking an action from one end give the other? | Open |
| Weakest first (strength works as a health pool) | Pool runs out across units | Whole units in health order until the budget runs out | Proposed |
| Delay (×0.8), trigger (×0.75) | Price only | Price only, no change needed | Proposed |
| Fire spreads (next round, units next to the ones hit, at half strength) | Half strength on the neighbours, a round later | Neighbours get the full effect a round later, allies first for helpful effects, as many as the budget pays for (nearest first). It spreads once, never again from the new units | Proposed |

Diminishing's binary rule is in the [rune reference](rune-reference.md#at-a-point-or-on-a-unit)
(Decided Nov 5). Some current wording would need to change, for example the
single-target bonus note in the crafter. Those edits wait until the effects are
settled.

**Binary centers today (crafter v14).** Haste, Slow, Frost, Invisibility and
Revelation are binary in the center. Stone is in steps (wall hexes), plus binary
for units encased. Portal is binary per traveler, with cost growing with units
moved and distance. Dispel is in steps (statuses or runes stripped up to the
budget). Summon is smooth in body strength and in steps for the number of bodies.
Fire, Mend, Wound, Protect, Expose, Amplification and Diminishing are smooth.

## Balancing area relocation (Proposed)

- Cost grows with units moved and distance, so a bigger footprint means a shorter
  reach for the exit.
- Units come out only on free hexes; a unit with no free hex stays where it was.
- Tank builds and bosses resist being moved.
- The test boards price displacement by what it causes (hazard damage, broken
  formations), so dropping enemies into fire costs what it's worth.

## The test boards

**Proposed.** Expected units touched, expected neighbours and displacement come
from running each spell on fixed test boards. The audit tool also searches for the
strongest possible hotbar and checks it against the battle budget.

## Open

- [ ] Amplification on a binary effect: one unit more, one round more, or
      something else?
- [ ] The minimum ring runes keep in the three-pass split. The Nov 5 list says
      half is decided; the binary table and the old Open list called the minimum
      Open. Jared to confirm.
- [ ] Is there a cap on extra actions per unit per round, whatever the source?
- [ ] What does the transfer tether do with an action taken from one end?
- [ ] The budget curve's actual numbers, the price per hex of forced movement, and
      the expected-neighbours constant (about 1.5).
- [ ] Tuning the single-target bonus against the area shapes in the audit tool.
- [ ] The two handoff-only rules above.
