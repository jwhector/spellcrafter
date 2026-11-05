# Archive: the ring-vs-center audit and per-column review

**Archived 2026-11-05.** From the spell model doc (frozen rev 48). On Nov 5 Jared
decided that center effects stay unique to the center, ring runes always do
something different, and combos come from linking. That retired the rules below.
The ring ideas they proposed became the starting point of the ring review, whose
results are in the [rune reference](../rune-reference.md).

## Where the ring repeats the center (audit, Nov 5)

**Decided later Nov 5 (Jared):** center effects stay unique to the center, ring runes always do something different, and combos come from linking. That retires the per-column review below as rules; it stays here as a reference for how linked effects scale. Push and Pull are now inscriptions (see Rune reference). The ring ideas are being reviewed rune by rune, and the budget rules are in the [effect flags checklist](https://claude.ai/artifact/9rXv5JzM92A2QwSakkonN3).

Jared asked for every rune and every column where a ring entry does essentially what the same rune does as the center. **107 of the 144 ring cells do.** Most of them follow one pattern: the ring entry takes the rune's center effect and applies it to whatever the output touches. So a wound center with fire in the ring is the same as a fire center with wound in the ring, give or take which one is stronger.

**Where it happens**

| Column | Ring entries that repeat the center | How |
| --- | --- | --- |
| At a point | 12: fire, mend, wound, protect, expose, dispel, amplification, diminishing, haste, slow, invisibility, revelation | Applies the rune's center effect to every unit the effect touches. |
| On a unit | 16: every rune except portal and summon | The center effect lands on the unit as well. Push and pull move it 1 hex, which is a small push or pull center. Stone's encase is now also what a stone center does to units in its area. |
| Through a gate | 15: every rune except portal, summon and stone | The center effect lands on travelers. |
| On ground | All 18 | A lingering center leaves ground whose trait is that rune's ground entry, so the same rune in the ring adds an identical trait. |
| On a spell | All 18 | Decided Nov 4: a rune means the same thing on a spell in the center or the ring. That clashes with the other Nov 4 rule that swapping a rune between center and ring always makes a different spell. Dispel center with fire in the ring is the same spell as fire center with dispel in the ring. |
| Global modification | 7: frost and wound (word for word), mend (an allies-only copy), dispel, amplification, diminishing, revelation | The ring entry restates the rune's global center rule. |
| Along a tether | 13 payload runes | By design: the tether carries the rune's effect to the other end. |
| On a summon | 8: fire, frost, mend, dispel, amplification, diminishing, slow, revelation | The summon applies the center effect to its neighbours each round. That's a different delivery (an aura that repeats), so it's the weakest overlap. |

The entries that already differ show the way. Portal and summon never repeat their center. Push and pull at a point grow or shrink the area. Stone at a point anchors it. Frost at a point leaves ice instead of chilling. Each of them changes where or when the effect happens rather than adding a second effect.

**Superseded Nov 5 by the per-column review below: the center makes, the ring shapes.** In the ring, a rune changes how the center's output behaves, using its essence (where, when, who, how much, or how it's seen). It no longer adds its own center effect. The cost: a plain two-effect circle goes away. Wound with fire in the ring would deal damage that spreads, not damage plus burning. Two effects in one spell would come from linking spells or from minor inscriptions instead.

| Rune | Ring idea | At a point or on a unit | Through a gate | Global modification |
| --- | --- | --- | --- | --- |
| Fire | Spreads | Next round the effect hits again on units next to the ones it hit, at half strength | Next round it also hits units next to where travelers came out | Unchanged (scattered burning hexes) |
| Frost | Slick | Units the effect hits slide 1 hex further from any push or pull this round (at a point it still leaves ice) | Travelers slide 1 hex further on arrival | Every push and pull goes 1 hex further while it lasts |
| Mend | Spares allies | Allies the effect would harm are healed by that much instead | Allies passing through take none of the spell's harm | Allies are healed by whatever the global effect would do to them |
| Wound | Finishes | Units the effect leaves below a fifth of their health die | Enemy travelers below a fifth of their health die on arrival | At round end, units inside it below a fifth of their health die |
| Protect | Guards you | You gain a small shield for each unit the effect hits | You gain a small shield for each traveler | Unchanged (softer on your side) |
| Expose | Pierces | The effect ignores shields and cover | Travelers lose their shields | The global effect ignores shields and cover |
| Push | Carries further | At a point unchanged. On a unit, the effect carries on to the next unit behind the target at half strength | Travelers come out 1 hex further from the exit | Unchanged (sweeps) |
| Pull | Concentrates | At a point unchanged. On a unit, the effect is stronger for each other unit next to the target | Travelers come out next to you | Unchanged (closes in) |
| Portal | Unchanged | Unchanged | Unchanged | Unchanged |
| Summon | Unchanged | Unchanged | Unchanged | Unchanged |
| Dispel | Can't be undone | The effect can't be stripped, cleansed or countered, and it lands through dispel ground | The gate can't be closed or blocked | The global effect can't be stripped or ended early |
| Stone | Anchors | At a point unchanged. On a unit, the unit can't be moved by any push, pull or portal until next round (it isn't encased) | Unchanged (rubble rings the exit) | Unchanged |
| Amplification | Stronger | The effect is a third stronger | The gate also takes the hexes around its entrance | The global effect is a third stronger |
| Diminishing | Lighter | The effect is a third weaker, and the spell's cooldown is a round shorter | Same | Same |
| Haste | Sooner | The effect goes off first in its phase, before any other spell or move | Travelers can still act after arriving | Unchanged (acts twice each round) |
| Slow | Later, stronger | The effect lands at the start of next round, half again as strong | The gate opens next round and stays open a round longer | Unchanged |
| Invisibility | Unseen | Enemies can't see the effect's area or read it until it lands | The gate is invisible to enemies | Unchanged (blank circle) |
| Revelation | Seeks | The effect can pick hidden units, and enemies it hits show their next two moves | Travelers' next two moves are shown | Enemies inside show their next two moves |

Notes on the proposal:

- The ring ideas match each rune's essence and its existing spell entry: haste goes off first, slow goes off later, frost stays with ice, stone anchors.
- Slow in the ring is close to the delay inscription; the difference is the extra strength. If that's too close, slow could instead make the effect last a round longer at half strength.
- Expose moves from "stronger" to "pierces", and amplification takes "stronger", so the two amplifiers stop overlapping too.
- **On a spell (proposed fix):** the center alters the spell, and ring runes land their effect on the spell's caster as it casts. Push, pull, portal and dispel keep acting on the spell itself. That makes center and ring different again. The center spell entries for fire, wound, amplification and diminishing are about the caster today, so they'd need new spell-altering meanings.
- **Kept by design:** along a tether (carrying effects is its job), on a summon (a repeating aura is a different delivery), and on ground (ground traits add up, and the stack, replace and react system is future work). Ground could follow the same idea later: fire ground would spread, and summon ground would raise units that die on it as weak summons for you.

**Open for Jared:** whether to adopt "the center makes, the ring shapes" and give up plain two-effect circles; whether the three columns kept by design should stay; and the spell-column fix.

### Per-column review (Nov 5, second pass)

**Decided (Jared, Nov 5)**

- Ground gets no exception. It follows the same rules as every other column.
- A ring entry may duplicate its rune's center effect, but the duplicate must always be weaker than the same rune as the center.
- Only a dispel center can target a spell, and its ring runes decide what happens to the spell. Otherwise redirecting a spell or giving it a decoy would be strictly better than most other uses of a center.

**The line being drawn.** Some effects scale ~~smoothly~~: damage, healing, burning, shields, the percentage from expose, amplification and diminishing, the distance of a push. A weaker duplicate of these is just a smaller number, so a ring can keep them. Other effects are all-or-nothing: an extra action, a lost action (which cancels a shown move), being hidden, being encased. Half of a lost action is still a lost action. Those are where circumvention comes from, especially in columns that reach many units cheaply: a gate (everyone who walks through), ground (everyone standing in it, every round), a summon's aura (its neighbours, every round) and a tether (a second unit for free). A portal that heals travelers is fine. A portal that hastes the whole party is not.

**Proposed rules**

1. A ring duplicate of a scaling effect is at most half the strength of the same rune as the center (a starting number to tune).
2. An all-or-nothing effect never duplicates in full in the ring. It gets a smaller version (an extra move instead of an extra action, acting last instead of losing the action) or a meaning that shapes the spell instead.
3. A unit gets a given ring effect at most once per spell, however many times it walks through or stands in it.

Verdicts below: **Keep, weaker** means the entry stays but follows rule 1. **Keep** means it already does something different from the center. **Change** gives the new entry.

#### At a point (an effect on an area)

| Rune | Today | Verdict | Argument |
| --- | --- | --- | --- |
| Fire | Units touched burn; leaves burning ground | Keep, weaker | Burning scales. The area already pays for its reach through the shape slot. |
| Frost | Leaves ice; units slide further | Keep | It's ice, not the center's chill. |
| Mend | Allies inside are also healed | Keep, weaker | Healing scales. |
| Wound | Also deals damage | Keep, weaker | Damage scales. |
| Protect | Allies inside are shielded | Keep, weaker | Shields scale. |
| Expose | Units touched take more damage | Keep, weaker | A smaller percentage. |
| Push | Spreads 1 hex further, weaker | Keep | Shapes the area. |
| Pull | Collapses onto the center, stronger | Keep | Shapes the area. |
| Portal | Also lands at a second point | Keep | Shapes the area. Note it's the same as the extra-point inscription, for the same one slot. |
| Summon | A creature carries the effect and repeats it | Keep | Different delivery. The body's budget is split with the effect. |
| Dispel | Clears statuses and terrain where it lands | Keep, weaker | Clears one status per unit, not all. |
| Stone | Anchored: lasts longer, rubble at the edge | Keep | Shapes the area. |
| Amplification | Units touched deal more for a round | Keep, weaker | A smaller percentage. |
| Diminishing | Units touched deal less for a round | Keep, weaker | A smaller percentage. |
| Haste | Units touched get an extra move | Change | A mass extra move from one ring slot is the haste problem. New: the effect goes off first in its phase, before enemies move. |
| Slow | Units touched lose their next action | Change | A mass cancel of shown moves from one ring slot is too strong. New: units touched act last in their phase next round. Only the center cancels. |
| Invisibility | Units touched are hidden | Change | Mass hiding is all-or-nothing. New: enemies can't see the effect's area or read it until it lands. |
| Revelation | Units touched are revealed | Keep | Cheap, and it counters invisibility. |

#### On a unit (an effect on one unit)

| Rune | Today | Verdict | Argument |
| --- | --- | --- | --- |
| Fire, frost, mend, wound, protect, expose, amplification, diminishing, revelation | The center effect also lands on the unit | Keep, weaker | One unit, so there's no multiplier. Rule 1 keeps the combination below two full spells. |
| Push | Knocks the unit back 1 hex | Keep, weaker | Already shorter than a push center. |
| Pull | Drags the unit 1 hex toward you | Keep, weaker | Already shorter than a pull center. |
| Portal | Also lands on the nearest other unit | Keep | Different: it's a small chain. |
| Summon | A body appears next to the unit and repeats the effect | Keep | Different delivery. |
| Dispel | Strips the unit's statuses | Keep, weaker | Strips one status, not all. |
| Stone | Encases the unit | Change | Encasing is all-or-nothing, and it's now what a stone center does. New: the unit can't be pushed, pulled or moved by a portal until next round. |
| Haste | The unit gets an extra move | Keep, weaker | Only an extra move, never the center's extra action. One unit, so it's a fair rider. |
| Slow | The unit loses its next action | Change | On an enemy this cancels a shown move from a ring slot. New: its next action goes off last in its phase. |
| Invisibility | The unit is hidden after the effect | Keep, weaker | Hidden only until the end of the round, not until it acts. |

#### On ground (lingering areas and walls)

| Rune | Today | Verdict | Argument |
| --- | --- | --- | --- |
| Fire | Burns whoever stands in it | Keep, weaker | Half the burn of a fire center's ground. |
| Frost | Slippery | Keep | Sliding is small and positional. |
| Mend | Heals allies standing in it | Change | "Allies" is a filter, and filters don't work on ground. New: heals whoever stands in it, at half the strength of a mend center's ground. |
| Wound | Hurts units that step onto it | Keep, weaker | Damage scales. |
| Protect | Cover: units in it take less damage | Keep, weaker | Scales. |
| Expose | Units in it are exposed | Keep, weaker | Scales. |
| Push | Drifts 1 hex a round | Keep | Shapes the ground. |
| Pull | Draws units to its center; leaving costs a move | Keep | Positional, and it hits both sides. |
| Portal | Its hexes are linked | Keep | Shapes the ground. |
| Summon | Spreads 1 hex each round | Keep | Shapes the ground. |
| Dispel | Statuses can't land; spells aimed in lose ring runes | Keep, weaker | Strips fewer runes than a dispel center would. |
| Stone | Rough, and lasts longer | Keep | Shapes the ground. |
| Amplification, diminishing | Units in it deal more or less | Keep, weaker | A smaller percentage, and it hits both sides. |
| Haste | Units in it get an extra move | Change | An extra move every round for everyone standing there is the haste problem at its worst. New: units that start their turn in it move 1 hex further. |
| Slow | Units ending their turn in it lose their next action | Change | Action denial every round. New: units in it act last in their phase. |
| Invisibility | Units in it are hidden | Change | Everyone untargetable every round. New: units in it can't be picked from outside it (fog: bolts can't aim in, areas still land). |
| Revelation | Units in it can't hide | Keep | Counterplay. |

#### Along a tether

| Rune | Today | Verdict | Argument |
| --- | --- | --- | --- |
| Fire, frost, mend, wound, protect, expose, push, pull, dispel, amplification, diminishing, revelation | Carried to the other end | Keep | Copy already carries at half strength, and it's one extra unit. |
| Portal | A unit can travel the tether once | Keep | One unit, one hop. |
| Summon | A body also appears at the far end | Keep | Budget split. |
| Stone | A low wall rises along it | Keep | Shapes the tether. |
| Haste | Extra moves carried | Change | Copy can't halve an action, so it would hand out a full extra move. New: doesn't travel; the tether acts first each round. |
| Slow | Lost actions carried | Change | Same reason. New: doesn't travel; the tether lasts a round longer. |
| Invisibility | Concealment carried | Change | Same reason. New: doesn't travel; enemies can't see the tether. |

#### Through a gate (anyone who walks through this round)

| Rune | Today | Verdict | Argument |
| --- | --- | --- | --- |
| Fire, frost, wound, expose | Travelers get the effect | Keep, weaker | Enemies can use the gate too, so harm doubles as a trap. Rule 3: once per unit. |
| Mend | Travelers are healed | Keep, weaker | Your example: it makes sense, and healing scales. |
| Protect | Travelers are shielded | Keep, weaker | Scales. |
| Push | Travelers are shoved out of the exit | Keep | Positional. |
| Pull | Draws nearby units in | Keep, weaker | 1 hex of pull, weaker than a pull center. |
| Summon | A decoy where the first traveler stepped in | Keep | Different. |
| Dispel | Travelers are cleansed | Keep, weaker | One status each. |
| Stone | Rubble rings the exit | Keep | Shapes the gate. |
| Amplification, diminishing | Travelers deal more or less | Keep, weaker | A smaller percentage, once per unit. Watch it in playtests, because the whole party can walk through. |
| Haste | Travelers get an extra move | Change | Party-wide haste. New: the gate opens at once, before anyone else acts this phase. |
| Slow | Travelers lose their next action | Change | Nobody would use it, or enemies get mass-cancelled. New: the gate opens next round and stays open twice as long. |
| Invisibility | Travelers arrive hidden | Change | Party-wide hiding. New: enemies can't see the gate. |
| Revelation | Travelers are revealed | Keep | Cheap. |

#### On a summon (traits that repeat every round)

| Rune | Today | Verdict | Argument |
| --- | --- | --- | --- |
| Fire, frost, mend, wound | The summon applies it to units next to it | Keep, weaker | Per round, below the center. The summon's budget is split across its traits. |
| Protect, expose, push, pull, portal, stone | Tougher, draws attacks, knockback, drags, steps, sturdy | Keep | Traits of the body itself. |
| Dispel | Clears statuses next to it each round | Keep, weaker | One status per round. |
| Amplification, diminishing | Allies next to it deal more; enemies deal less | Keep, weaker | A small aura. |
| Haste | The summon acts twice each round | Keep | Only the summon, paid from its own budget. |
| Slow | Enemies next to it lose their bonus action | Change | Action denial every round. New: enemies next to it act last in their phase. |
| Invisibility | The summon is hidden until it acts | Keep | Only the summon. |
| Revelation | Reveals hidden units next to it | Keep | Counterplay. |

#### On a spell (only with a dispel center, decided Nov 5)

Proposed: with an empty ring, the dispel center strips runes up to its power budget, as before. Each ring rune spends part of that budget doing its thing to the spell instead. So redirecting or giving the spell a decoy now competes with stripping it, instead of being free.

| Rune | Today | Verdict | Argument |
| --- | --- | --- | --- |
| Fire, wound | Its caster burns or takes damage when it casts | Keep | Punishes the cast. |
| Frost | Goes off last in its phase | Keep | A small delay. |
| Mend | Allies it hits are healed afterward | Keep | Softens it. |
| Protect | Units it hits take less damage | Keep | Softens it. |
| Expose | It hits harder | Change | Amplification now does that. New: it ignores shields and cover (for an ally's spell). |
| Push, pull | Its area shifts 1 hex | Keep | Cheap redirection, paid from dispel's budget. |
| Portal | Its area moves to a point you choose | Keep | Full redirection, now paid from dispel's budget. |
| Summon | A decoy a single-target spell hits instead | Keep | Same, now paid from the budget. |
| Dispel | (same as the center) | Keep | Adds strength: strips more. |
| Stone | A barrier stops bolts and lines | Keep | Blocks some shapes only. |
| Amplification | Its caster deals more after casting | Change | New: the spell is stronger (on an ally's spell). |
| Diminishing | Its caster deals less after casting | Change | New: the spell is weaker (on an enemy's spell). |
| Haste | Goes off first in its phase | Keep | Timing. |
| Slow | Goes off a round later | Keep | A delay, weaker than a slow center's cancel on the unit. |
| Invisibility | Can't pick single targets: aimed at one unit, it fizzles | Keep, weaker | Fizzling is a full cancel for single-target spells. It costs most of dispel's budget. |
| Revelation | You read it exactly | Keep | Cheap. |

#### Global modification

| Rune | Today | Verdict | Argument |
| --- | --- | --- | --- |
| Fire | Leaves scattered burning hexes | Keep | Different from the center's longer burning. |
| Frost | Takes away everyone's bonus move | Change | Word for word the center rule. New: every push and pull goes 1 hex further (ice). |
| Mend | Allies heal a little each round | Change | Allies only makes it stronger than the center, which heals everyone. New: everyone heals a little each round, at half the center's amount. |
| Wound | Chips everyone each round | Keep, weaker | Word for word the center rule, so it becomes half the center's damage. |
| Protect | Softer on your side | Keep | A shaping meaning. Note it acts like a side filter. |
| Expose | The global effect is stronger | Change | Amplification takes "stronger". New: units inside take a little more damage, half the center's increase. |
| Push, pull, portal, summon, stone | Sweep, close in, jump, carried by creatures, anchored | Keep | Shape the global effect. |
| Dispel | Clears statuses and terrain when it starts | Keep, weaker | A one-time clear, weaker than the center's lasting rule. |
| Amplification | Units inside deal more | Change | Inside the whole battlefield means everyone, the center rule. New: the global effect is a third stronger. |
| Diminishing | Units inside deal less | Change | Same reason. New: the global effect is gentler and lasts a round longer. |
| Haste | Acts twice each round | Keep | Strong, so it should split the budget across the two ticks. |
| Slow | Acts every other round, lasts twice as long | Keep | Shapes it. |
| Invisibility | Enemies see only a blank circle | Keep | Shapes it. |
| Revelation | Reveals every hidden unit in it | Keep, weaker | A one-time reveal, weaker than the center's "no one can hide". |

**Totals:** 24 cells change, and the rest keep, most of them as weaker duplicates. The haste, slow and invisibility rows account for 14 of the changes, which matches the instinct about haste through a portal.
