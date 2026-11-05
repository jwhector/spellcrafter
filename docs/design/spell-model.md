# The Hollow: spell model

Nov 4, 2026 · @Jared

## Summary

Every circle compiles into one **effect record**: a fixed set of property primitives (output, where, when, who, what, how much, traits). The center rune and the inscriptions **set** those properties; ring runes may only **add**, **remove**, **scale** or **shape** them. The "what" is a list of calls to about a dozen engine primitives, and each primitive declares which parts of the board it reads and changes. From that alone the engine can work out the result of any circle, which runes can swap places, which cancel, and what the spell costs.

It is closed, not complete: any circle built from today's runes and inscriptions has a defined result. Future mechanics extend it at four named points (a new engine primitive, a new output kind, a new property primitive, a new write mode), each with a known cost. Working words below are placeholders except "property primitives" (Jared's), "inscription" and "global modification".

## Rune reference (Nov 5)

**Decided later Nov 5 (Jared): Push and Pull become inscriptions, not runes.** Any spell can then shove units away or draw them in, and every player has access to it. That leaves 16 runes. Forced movement is paid from the budget by hexes moved times units moved. Their ground and global entries (current, whirlpool, gale) become these inscriptions on lingering ground or a global spell. Stone's "anchors" and Frost's "slick" ring ideas still work, since they react to any forced movement; Jared kept "slick" for that reason. A spell that only moves things will use a new **blank** rune (Jared's name) in the center, so a spell can be just a push or pull, with its mechanics still Open. The Push and Pull rows below stay until the ring review is done.

These are the same tables as in the [master doc](https://claude.ai/artifact/3dn6hFFKkYTwLjKffii1gL), repeated here for reference. Every rune can sit in the center or in the ring, and it does a different job in each. In the center it decides what the spell makes. In the ring it changes that output, and the column it uses depends on what the center made. These are the crafter's current entries. They're all Proposed, and the six runes added Nov 4 are amplification, diminishing, haste, slow, invisibility and revelation (Jared named them Nov 5).

**Center runes: what each one makes**

"Makes" says what the center outputs: an effect, a gate, a summon or a shield. An effect that lingers on an area, or is cast as a wall, becomes ground instead.

| Rune | Kind | Opposite | Makes | As the center, aimed at the board | As the center, across the whole battlefield | As the center, aimed at a spell |
| --- | --- | --- | --- | --- | --- | --- |
| Fire | Plain effect | Frost | an effect | Burns the target now and next round | Burning lasts a round longer for everyone | When the spell is cast, its caster burns |
| Frost | Plain effect | Fire | an effect | Chills the target, which loses its bonus move | Every unit's bonus move is gone while it lasts | The spell goes off last in its phase |
| Mend | Plain effect | Wound | an effect | Heals the target | Everyone heals a little at the start of each round | Allies the spell hits are healed afterward |
| Wound | Plain effect | Mend | an effect | Deals plain damage, more to units below half health | Everyone takes a little damage at the end of each round | The spell's caster takes damage when it casts |
| Protect | Amplifier | Expose | a shield | Shields the target, which also heals a little more; the ring says what happens to anyone who hits it | The first hit on each unit each round is reduced | Units the spell hits take less damage |
| Expose | Amplifier | Protect | an effect | Makes the target take more damage and heal less | All damage is increased a little | The spell hits harder (good on an ally's spell, risky on an enemy's) |
| Push | Mover | Pull | an effect | Shoves units away from the point | At round end, every unit slides 1 hex the same way, like a gale | The spell's area shifts 1 hex away from you |
| Pull | Mover | Push | an effect | Draws units toward the point | At round end, every unit slides 1 hex toward the middle | The spell's area shifts 1 hex toward you |
| Portal | Mover | none | a gate | Opens a gate that lasts the round; anyone can walk through | Each round, two random hexes become linked gates | The spell's area moves to another point you choose |
| Summon | Maker | Dispel | a summon | Creates a body at each point; the ring says what it is made of. Aimed at a unit, the unit is set aside and the body takes its place until it dies or the spell ends | A weak neutral creature enters at the edge each round | A decoy appears that a single-target spell hits instead |
| Dispel | Remover | Summon | an effect | Clears statuses, terrain and summons | All statuses and lingering terrain clear, and new ones last only a round | Strips runes from the spell, up to this spell's power budget; you pick which, and stripping its center cancels it |
| Stone | Maker | none | an effect | Raises stone that blocks movement; units already standing there are encased | The edge hexes turn to rock, shrinking the battlefield | A barrier rises in front of the spell; bolts and lines stop at it |
| Amplification | Amplifier | Diminishing | an effect | Makes the target deal more damage and give more healing for a round | Everyone deals a little more | The spell's caster deals more for a round after casting it |
| Diminishing | Amplifier | Amplification | an effect | Makes the target deal less damage and give less healing for a round | Everyone deals a little less | The spell's caster deals less for a round after casting it |
| Haste | Plain effect | Slow | an effect | Gives the target an extra move next turn (an extra action with more strength) | Everyone gets an extra move each round | The spell goes off first in its phase |
| Slow | Plain effect | Haste | an effect | Makes the target lose its next action; on an enemy that cancels its shown move | Each unit can either act or move on its turn, not both | The spell goes off a round later |
| Invisibility | Plain effect | Revelation | an effect | Hides the target: single, bolt and chain spells can't pick it until it acts; areas still hit it | Units more than 3 hexes away can't be picked as single targets | The spell can't pick single targets: aimed at one unit, it fizzles; areas still land |
| Revelation | Plain effect | Invisibility | an effect | Removes hiding from the target and stops it hiding again for a round | No one can hide | You read the spell exactly: its area, pushes and side effects, without deciphering |

**Ring runes: how each one changes the center's output**

Pick the column for what the center made. An effect on an area uses "At a point". An effect on one unit uses "On a unit". Lingering area effects and walls use "On ground". A tether inscription uses "Along a tether". A portal center uses "Through a gate", and a summon center uses "On a summon". A protect center's shield uses "On a unit", with each rune firing when the shield is hit. Any spell aimed at a spell uses "On a spell". The whole-battlefield shape uses "Global modification". If a ring rune matches the center, it adds strength to the center instead.

| Rune | At a point | On a unit | On ground | Along a tether | Through a gate | On a summon | On a spell | Global modification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Fire | The effect sets the units it touches burning and leaves burning ground behind | The unit is also set burning | Burns whoever stands in it at round end | Burning | Travelers catch fire | The summon burns units next to it | When the spell is cast, its caster burns | The global effect also leaves scattered burning hexes |
| Frost | The effect leaves ice behind; units slide 1 extra hex on it | The unit is also chilled | Slippery: units slide 1 hex further | Chill | Travelers arrive chilled | The summon chills units next to it | The spell goes off last in its phase | The global effect also takes away everyone's bonus move |
| Mend | Allies inside the effect are also healed | The unit is also healed | Heals allies standing in it at round end | Healing | Travelers are healed | The summon heals units next to it each round | Allies the spell hits are healed afterward | Allies heal a little each round while the global effect lasts |
| Wound | The effect also deals damage | The effect also deals damage | Hurts each unit that steps onto a hex of it | Damage | Travelers take damage | The summon hits harder | The spell's caster takes damage when it casts | The global effect also chips everyone for a little damage each round |
| Protect | Allies inside the effect are shielded | The unit is shielded after the effect | Cover: units standing in it take less damage | Hits: damage from any source while the tether lasts | Travelers are shielded | The summon is tougher | Units the spell hits take less damage | The global effect is softer on your side |
| Expose | Units the effect touches take more damage for a round | The unit takes more damage for a round | Units standing in it are exposed | Exposure (taking more damage) | Travelers are exposed | The summon draws enemy attacks | The spell hits harder (good on an ally's spell, risky on an enemy's) | The global effect is stronger |
| Push | The effect spreads 1 hex further out, a little weaker | The effect knocks the unit back 1 hex | Drifts 1 hex a round, carrying units with it like a current | Forced movement; the two ends are also pushed apart now | Travelers are shoved out of the exit | The summon knocks back units that hit it | The spell's area shifts 1 hex away from you | The global effect sweeps across the battlefield one row per round |
| Pull | The effect collapses onto the center hex, stronger | The effect drags the unit 1 hex toward you | Draws units to its center each round; leaving costs a move | Forced movement; the two ends are also drawn together now | The gate draws nearby units in | The summon drags enemies next to it | The spell's area shifts 1 hex toward you | The global effect starts at the edges and closes in toward the middle |
| Portal | The effect also lands at a second point (or next to you) | The effect also lands on the nearest other unit | Its hexes are linked: step on one and come out at another | A unit at one end can travel the tether to the other end once | (not used: falls back to on a unit) | The summon can step through space once per round | The spell's area moves to another point you choose | The global effect jumps between two zones each round |
| Summon | A creature carries the effect and repeats it around itself each round | A body appears next to the unit and repeats the effect next round | Spreads 1 hex each round | A body: one also appears at the far end | A decoy appears where the first traveler stepped in | (not used: falls back to on a unit) | A decoy appears that a single-target spell hits instead | Creatures carry the global effect; it only applies near them |
| Dispel | Clears statuses and terrain where the effect lands, at this point in the order | Strips the unit's statuses, at this point in the order | Statuses can't land on units in it, and spells aimed into it lose ring runes up to its strength | Cleansing: statuses removed at one end | Travelers are cleansed | The summon clears statuses next to it | Strips runes from the spell, up to this spell's power budget; you pick which, and stripping its center cancels it | The global effect also clears statuses and terrain when it starts |
| Stone | The effect is anchored: it lasts a round longer and leaves rubble at its edge | The effect encases the unit: it can't move and takes less damage | Rough: crossing costs an extra move, and it lasts longer | A low wall rises along the tether | Rubble rings the exit | The summon is made of stone: sturdy and blocking | A barrier rises in front of the spell; bolts and lines stop at it | The global effect is anchored: it lasts longer but stays in one region |
| Amplification | Units the effect touches deal more for a round | The unit deals more for a round | Units standing in it deal more | Strength (dealing more) | Travelers deal more for a round | Allies next to the summon deal more | The spell's caster deals more for a round after casting it | Units inside the global effect deal more while it lasts |
| Diminishing | Units the effect touches deal less for a round | The unit deals less for a round | Units standing in it deal less | Weakness (dealing less) | Travelers deal less for a round | Enemies next to the summon deal less | The spell's caster deals less for a round after casting it | Units inside the global effect deal less while it lasts |
| Haste | Units the effect touches get an extra move next turn | The unit gets an extra move next turn | Units standing in it get an extra move | Tempo (extra moves) | Travelers get an extra move on arrival | The summon acts twice each round | The spell goes off first in its phase | The global effect acts twice each round |
| Slow | Units the effect touches lose their next action | The unit loses its next action | Units that end their turn in it lose their next action | Lost time (lost actions) | Travelers arrive dazed and lose their next action | Enemies next to the summon lose their bonus action | The spell goes off a round later | The global effect acts every other round and lasts twice as long |
| Invisibility | Units the effect touches are hidden until they act | The unit is hidden after the effect | Units standing in it are hidden | Concealment | Travelers arrive hidden | The summon is hidden until it acts | The spell can't pick single targets: aimed at one unit, it fizzles; areas still land | Enemies see only a blank circle for the global effect |
| Revelation | Units the effect touches are revealed | The unit is revealed | Units standing in it can't hide | Revealing | Travelers are revealed | The summon reveals hidden units next to it | You read the spell exactly: its area, pushes and side effects, without deciphering | The global effect reveals every hidden unit in it |

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

## Nov 4 extensions from the BG3 coverage audit

Jared asked to implement every proposed fix from the [BG3 coverage audit](https://claude.ai/artifact/5msD9Jxa5fejQTnw3kX8qW). This section is the full list. The tables further down are updated to match. All of it is Proposed unless marked Decided, and Jared named the six new runes on Nov 5: amplification, diminishing, haste, slow, invisibility and revelation. With these, about 95% of the in-scope BG3 spells can be built.

**Decided Nov 4 (Jared):** basic attacks exist. Units die rather than go down (leaning). Battlefields start with terrain players can reshape. Filters don't work on ground. There's no accuracy for now. A concentration-like limit is wanted and gets its own conversation. Control of enemies works through their shown move first. A single-target bonus is in.

### Three new rune pairs

They use existing primitives (apply status, damage modifiers), so each one is one new row in the hook table.

| Name (Jared, Nov 5) | Inverse | Essence | As a center | Covers |
| --- | --- | --- | --- | --- |
| Amplification | Diminishing | what a unit puts out | The target deals more damage and gives more healing for a round (less, for the inverse). | Bless, Bane, Magic Weapon, Ray of Enfeeblement, Enlarge/Reduce, Vicious Mockery |
| Haste | Slow | tempo | The target gets an extra move next turn, or an extra action with more strength. The inverse makes it lose its next action; on an enemy, that cancels its shown move. | Haste, Slow, Hold Person, Hypnotic Pattern, Command (halt) |
| Invisibility | Revelation | being seen | Single, bolt and chain shapes can't pick the target until it acts, and areas still hit it. An enemy move aimed at it loses its target. The inverse removes hiding and stops it returning for a round. | Invisibility, Sanctuary, Darkness, Fog Cloud, Faerie Fire |

There are 18 runes in all. Protect and expose now also change healing received (protect: heals more, expose: heals less), which covers Bone Chill and Beacon of Hope without another rune.

### A new output: ground (the eighth hook column)

**A lingering effect on a place is ground**, and a wall always leaves ground. The center still hits whoever stands there when it's cast. The ring runes become the ground's traits (order-free, like a summon's). Ground can't be attacked. Its traits fire when a unit steps onto it, stands in it at round end, or leaves it.

| Rune | The ground... |
| --- | --- |
| Fire | burns whoever stands in it at round end |
| Frost | is slippery: units slide 1 hex further |
| Mend | heals allies standing in it at round end |
| Wound | hurts each unit that steps onto a hex of it |
| Protect | is cover: units in it take less damage |
| Expose | leaves units standing in it exposed |
| Push | drifts 1 hex a round, carrying units with it like a current |
| Pull | draws units to its center each round, and leaving it costs a move |
| Portal | links its hexes: step on one and come out at another |
| Summon | spreads 1 hex each round |
| Dispel | stops statuses landing on units in it, and spells aimed into it lose ring runes up to its strength |
| Stone | is rough: crossing costs an extra move, and it lasts longer |
| Amplification / Diminishing | makes units standing in it deal more / less |
| Haste / Slow | gives units an extra move / makes units that end their turn in it lose their next action |
| Invisibility / Revelation | hides units standing in it / stops anyone in it from hiding |

Opposite pairs cancel on ground, except summon and dispel. Units that die leave **remains**, a kind of ground. A summon raised on remains is stronger. Future expansion (Jared): a fuller ground system where some grounds stack, some replace each other and some react.

### Inscriptions

- **Lingering, one rule:** what the spell made lasts longer. On a place that's the ground. On a unit it's the status, on a thing it's the thing, and on a global effect it's the rules. On an enemy's spell, the change applies to its next shown moves for a few rounds, which is how lasting control works.
- **Extra point stacks:** up to 3, one slot each. The budget spreads across points through expected units touched (Magic Missile is single plus 2 extra points).
- **Follows a unit (new, Where anchor):** the area moves with the unit at its point. A burst on yourself that follows you is an aura (Spirit Guardians, Crusader's Mantle).
- **Steerable (new, needs lingering):** spend a bonus action each round to move the area up to 3 hexes, or move a unit-shape effect to a new target in range (Moonbeam, Call Lightning, Witch Bolt).
- **Weakest first (new, Who order):** the spell touches units with the least health first, until its strength runs out as a health pool (Sleep, Colour Spray).
- **Two new triggers:** when it dies, and when it would drop to 0 (Hunter's Mark moving on, Death Ward).
- **Filters** can't be used on ground (Decided). Filters in general are under review for balance.

### Rules

- **Choice of recipient on a trigger:** the Nov 4 rule (beneficial to allies, harmful to enemies, where there's a choice) extends to a trigger's event. On "when it attacks" or "when it's hit", a harmful payload lands on the other unit in the event and a beneficial one on the watched unit. So the smites are self, plus the trigger "when it attacks", plus the rider as the center.
- **The circle decides what a spell does, and the target only where:** unit shapes (single, self, bolt, chain) can't be aimed at an empty hex. A bolt that finds no unit does nothing. What's on the board changes the outcome only through the rune-vs-state table.
- **Stone center on an area:** units already standing there are encased.
- **Portal cast on yourself with an extra point** moves you to that point (Misty Step). It used to be flagged as doing nothing.
- **Summon aimed at a unit** sets that unit aside and puts a body made from the ring in its place. The unit returns when the body dies or the spell ends (Polymorph, and Banishment with a bare body).
- **Wound** deals more to units below half health (Toll the Dead).
- **Single-target bonus:** single target, bolt and self get about 15% more strength than a strict split, tuned on the test boards, so they're the efficient choice against one target.

### What changes underneath

- **Engine primitive 13, set aside:** takes a unit off the board and returns it later.
- **Damage reads health** (for wound). **Turn order reads statuses** (haste and slow). **Targeting reads statuses** (invisibility).
- **Listen gains events:** dies, would drop to 0, steps onto, ends turn in, leaves, and a spell aimed into an area.
- **Property primitives:** Output gains ground. Where gains anchors (a unit, the other unit in a trigger event) and steering. Who gains an order (weakest first, with a health pool).
- **Still no new write mode.**

## Board state and engine primitives

**What exists on the board** (everything a spell can read or change):

| Part | Holds |
| --- | --- |
| Positions | Which unit or thing stands on which hex |
| Health | Each unit's and summon's health |
| Statuses | Burning, chilled, shielded, exposed, encased, and so on, with durations |
| Damage modifiers | The numbers that change incoming and outgoing damage (from protect, expose) |
| Terrain | What each hex is: burning, ice, rubble, rock; since Nov 4, ground with traits and the remains of fallen units |
| Things | Gates, links, summons and shields, each with its own traits |
| Spells in waiting | Enemy intents and prepared (trigger) spells, each a circle |
| Global rules | Active global modifications and their remaining rounds |
| Listeners | Triggers and traits waiting for an event |
| Clock | Round, phase, and the order within the phase |

**Engine primitives** (the only ways anything changes), with what each reads and changes:

| Primitive | Reads | Changes |
| --- | --- | --- |
| Damage | positions, damage modifiers, statuses, health | health |
| Heal | positions | health |
| Move (push, pull, teleport, slide) | positions, terrain | positions |
| Apply status | positions | statuses (and damage modifiers for protect and expose) |
| Place terrain | positions | terrain |
| Create thing | positions | positions, things |
| Remove (statuses, terrain, things) | everything it removes | statuses, terrain, things |
| Link | positions | things |
| Alter spell (strip runes, move its area) | spells in waiting | spells in waiting |
| Add global rule | nothing | global rules |
| Listen | nothing | listeners |
| Wait | clock | nothing |
| Set aside (added Nov 4) | positions | positions, things (takes a unit off the board and returns it later) |

Thirteen primitives cover every hook entry written so far (set aside was added Nov 4). A new entry that can't be written with them is the signal for a new primitive (see the last section).

## Property primitives

Every spell effect is one record with these seven property primitives. Nothing else describes a spell.

| Property primitive | What it holds | Possible values |
| --- | --- | --- |
| **Output** | The kind of thing the spell produces; this picks the hook table column | effect on a place, effect on a unit, link, gate, summon, shield, altered spell, global effect, ground (added Nov 4) |
| **Where** | Ordered points, the region at each point, the origin, and how the region changes over time | points from the shape; region shapes: grow, shrink, sweep, close in, anchor, follow a unit, jump between zones |
| **When** | Start, duration, repeats | now, next round, on a trigger; instant or N rounds; once or each round |
| **Who** | Which units it touches, and what carries it | everyone, enemies only, allies only; carried by nothing, a unit, or a summon |
| **What** | The payload: a list of engine primitive calls | damage, heal, move, status, terrain, create, remove, link, alter spell, global rule |
| **How much** | A magnitude for each payload item | set by the power budget, then scaled |
| **Traits** | Only for things (summons, gates, links, shields): small effect records attached to the thing, each with its own When | "on hit", "each round", "on pass-through", "along the link" |

Traits are effect records inside an effect record, which is how a burning, teleporting summon is described: a summon whose traits are "burn neighbours each round" and "teleport once per round". Nesting stops at one level (a trait can't own things with traits). Decided Nov 4: where a payload item has a choice of recipient (a shield's bearer or its attacker, a summon's neighbours, a link's two ends), beneficial items go to allies first and harmful ones to enemies first.

## Write modes and how a circle compiles

Every rune and inscription is a small list of writes to property primitives. There are five ways to write:

| Write mode | Meaning | Who may use it |
| --- | --- | --- |
| **Set** | Replace a value outright | Center rune and inscriptions only |
| **Add** | Append to a list (a payload item, a status, a terrain, a trait) | Center and ring |
| **Remove** | Delete from a list (statuses, terrain, things, a spell's runes) | Center and ring |
| **Scale** | Multiply a magnitude or a duration (stronger, weaker, longer) | Center and ring |
| **Shape** | Transform Where or When (grow, shrink, sweep, close in, anchor, follow, repeat) | Center and ring |

"Ring runes modify the center's output" is exactly the rule that **ring runes never use Set**. That's why stone can feel like an inscription on a global effect: it **shapes** Where and When (anchor, last longer), while an inscription **sets** them. Both touch the same property primitives, with different powers.

**Compiling a circle, in order:**

1. The center rune sets Output (from its thing, or from the target: a spell or the whole battlefield) and adds its base payload.
2. Inscriptions set Where (shape, extra point, range), When (delay, lingering, trigger) and Who (filter). Targeting a spell is a shape (decided Nov 4).
3. The output picks the hook table column. Each ring rune's entry in that column is its list of writes.
4. Ring entries apply section by section, in clockwise order, after duplicates merge.
5. The forge sorts writes that can swap (next section), scales magnitudes to the circle's budget, and hashes the result: the recipe id.

**Running it in battle:** at the start time, for each point in order, the payload runs as primitive calls against the units Who and Where allow. Things persist and register their traits as listeners. Global rules register with their duration. Events go through a queue; each listener fires once per cause, and chains stop at depth 3.

## The combination math

**When two neighbouring ring runes can swap.** Look at the writes each entry makes, and at what its payload's primitives read and change (the table above):

- **Add with Add:** swap freely. Lists merge.
- **Scale with Scale:** swap freely. Multipliers multiply.
- **Shape with Shape on the same property:** they combine (an anchored region that closes in). Inverse shapes cancel: grow and shrink, sweep and close in, delay and repeat sooner.
- **Remove with anything that adds to the same list:** order matters (clear then ignite is not ignite then clear).
- **Payload calls:** two calls swap unless one changes something the other reads. A move changes positions, and damage reads positions, so push then fire is not fire then push. Expose changes damage modifiers, and fire reads them; mend doesn't, so expose and mend swap. Damage modifiers add up, so expose and protect swap with each other (and cancel).

This replaces hand-declared "order matters" flags: the engine computes it from the primitives an entry uses.

**Inverse adds cancel.** Fire and frost statuses in the same bundle cancel, as do mend and wound, protect and expose. The forge flags them as wasted. This only applies where both entries in that column are true opposites on the same recipients (at a point, on a unit, through a gate). On a summon, a link or a spell they are different traits, and both apply.

**Duplicates scale.** A rune twice in a section becomes one write with its magnitude scaled up. Proposed Nov 4: a ring rune that matches the center scales the center the same way.

**Cost.** Each payload item has a base price in one unit (damage-equivalent). An effect's cost is roughly: price × magnitude × expected units touched × duration × repeats, plus each thing's health and lifetime. Expected units touched comes from running the record on the fixed test boards. The circle size sets the budget, and the forge scales magnitudes until the cost fits it. On an area summon, the budget splits across the bodies.

**Identity.** Two circles are the same spell when their compiled records are equal after sorting the writes that can swap. That's the recipe id.

## Rune essences

Each rune has one essence that it expresses through whichever property primitives the output leaves open. A hook entry is that essence applied to one output kind, so new entries can be written consistently. Where an output has no use for a rune's What (a global effect has no single target to burn), the essence lands on Where or When instead. That's why stone and pull act like shaping inscriptions in the global column.

| Rune | Essence | What (payload) | Where (shape) | When (shape) | Who / How much |
| --- | --- | --- | --- | --- | --- |
| Fire | burning | burn status, burning terrain |  |  |  |
| Frost | cold, slowing | chill status, ice terrain |  | goes off later |  |
| Mend | restoring | heal |  |  |  |
| Wound | harm | damage |  |  |  |
| Protect | warding | shield status |  |  | scale down for allies |
| Expose | weakening | exposed status |  |  | scale up |
| Push | away | move away | grow, sweep |  | weaker when grown |
| Pull | toward | move toward | shrink, close in |  | stronger when shrunk |
| Portal | elsewhere | teleport, alter spell area | add a point, jump between zones |  |  |
| Summon | embodiment | create a body |  | repeat each round | carried by a summon |
| Dispel | undoing | remove, strip spell runes |  |  |  |
| Stone | permanence | rubble terrain, encase | anchor | last longer |  |
| Amplification (Nov 4, named Nov 5) | putting out more | outgoing damage and healing up |  |  | scale up |
| Diminishing (Nov 4, named Nov 5) | putting out less | outgoing damage and healing down |  |  | scale down |
| Haste (Nov 4, named Nov 5) | tempo | extra move or action |  | goes off sooner, repeats |  |
| Slow (Nov 4, named Nov 5) | lost time | lose next action (cancels a shown move) |  | goes off a round later |  |
| Invisibility (Nov 4, named Nov 5) | unseen | hidden status |  |  | single-target shapes can't pick it |
| Revelation (Nov 4, named Nov 5) | seen | removes hidden, blocks it a round |  |  |  |

Decided Nov 4: tether is no longer a rune, so it has no row here. Its "connection" essence lives in the four tether inscriptions (copy, redirect, transfer, leash), and its "follow a unit" meaning moves to an anchor choice under Where (proposed).

**Proposed: what empty cells mean, and how a rune finds its meaning.** An empty cell in this table is not a gap. It means the rune never works through that property, and it never needs filling, because a rune only needs one property that the output leaves open. For each output, the forge tries these in order:

1. What, on the output's own recipients.
2. What, re-aimed at the nearest unit the output involves: the spell's caster, a gate's travelers, a summon's neighbours, a shield's attacker. This is the old "on a unit" fallback.
3. Where or When, if the rune has an entry there.
4. If nothing fits, the rune does nothing in that column, and the forge flags it as wasted rather than inventing a meaning.

With the current twelve runes, step 2 always succeeds, because every rune has a What that works on a unit. Step 4 only matters for a future rune with no What of its own (a pure shaping rune). That rune would need its own entry in each column, or the forge would refuse it in columns where it has none. A ring rune that meets its own center still adds strength to the center instead (decided Nov 4).

## Worked examples

**Stone, three ways.** One essence (permanence), three outputs:

```
stone at center, burst          Output=effect on a place   What+=[rubble terrain]
fire center + stone ring        What+=[burn, burning terrain]; When: scale duration +1; What+=[rubble at edge]
fire center + whole battlefield + stone ring
                                Output=global effect  What+=[rule: burning lasts longer]
                                Where: shape anchor(one region); When: scale duration
```

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

## Minor inscriptions and linking (proposed Nov 4)

Jared's terms: a **major inscription** applies to the whole circle (what we have today); a **minor inscription** attaches to one ring rune.

**Two kinds of minor inscription, with different behaviour:**

- **Minor Who or When** (filter, delay, lingering, trigger): the ring rune still modifies the center's output, using its normal hook entry, but only for those units or at that time. Example: wound center, burst, enemies only; mend in the ring with a minor "allies only". Enemies are hit and allies are healed.
- **Minor Where** (a shape, more range): the ring rune becomes a small **sub-effect anchored on the output**. It uses its own center meaning, over its own region, positioned relative to the anchor (a point, a unit, or a thing). This is the new kind of interaction. It is still a modification of the output, because it can't exist without the anchor.

In the spell model this needs no new engine primitive. It needs two additions: Where gains an **anchor** (relative to a point, unit or thing), and the traits property primitive generalizes into **sub-effects**: small effect records anchored on the output. Traits on a summon are simply sub-effects anchored on a summon.

**Your examples in the language:**

```
Summon that breathes fire
  summon center, bolt (major)            Output=summon at the bolt's stop hex
  fire ring + minor cone                 Sub-effect: anchor=summon, Where=cone from the summon,
                                         When=each round, What=burn + burning terrain
                                         Aim: the summon's fixed targeting rule (nearest enemy)

Chain explosion
  fire center, chain (major)             Output=effect on a unit, 3 points (hops)
  wound ring + minor burst               Sub-effect at each hop: anchor=hop unit,
                                         Where=burst around it, What=damage

Twin bolt
  wound center, bolt + extra point       already possible: two points, budget split between them
```

**Rules that keep it from getting fiddly:**

1. Minor Where needs an anchor with a position. It isn't allowed when the output is a global effect or an altered spell.
2. Minor inscriptions can't set Output: no minor "targets a spell" or "whole battlefield".
3. Depth one: a sub-effect can't carry its own minor inscriptions.
4. Every write touches only its own record. Push shaping the main area ("spread 1 hex") doesn't grow a sub-effect's burst.
5. A unit is hit by the same sub-effect at most once per cast, so overlapping chain bursts don't stack.
6. Same slot cost as a major inscription, and the budget is shared: more sub-effects means weaker ones.
7. Things that carry sub-effects aim with a simple fixed rule (nearest enemy, or the caster's last target).
8. Ordering stays computed: a sub-effect reads positions at its anchor, so a mover before it changes where it lands.

**Minor inscriptions versus linking:**

|  | Minor inscriptions | Linking |
| --- | --- | --- |
| Job | Decorate one output: things that happen at, around or from it | Sequence two outputs: cast a second spell from where the first ends |
| Budget | One, shared (self-balancing) | Two (roughly double the power) |
| Grammar | Same circle, same record, sub-effects | Its own: a connection item that sets the trigger (end point, on hit, on kill) and carries direction |
| Cost to the player | A slot | A rare linking item, the full action, summed cooldowns |
| Example | Fire chain with a burst at each hop | A bolt that, where it lands, raises a wall |

Rule of thumb: if the second part needs its own center (a different kind of output, like a wall after a projectile), it's linking. If it decorates the first output with its own where, when or who, it's a minor inscription. Some results can be built both ways; the linked version is stronger and costs more.

**Complexity added:** small in the engine (anchors, sub-effects, the scoping rule), none in content (no new hook entries), large in the forge UI and in teaching. Decided Nov 4: minor inscriptions unlock at a later Level, minor Who and When first, minor Where after.

## Is it exhaustive?

**Closed, yes.** Every circle built from the current runes and inscriptions compiles into one effect record, and every record runs through the thirteen engine primitives. So the result of any circle is defined, with no improvising.

**Complete, no.** New mechanics extend the language at four points. Ranked from cheap to expensive:

| Extension | Example | What it costs |
| --- | --- | --- |
| New rune or inscription using existing pieces | a lightning rune (damage + chain-like spread) | one row in the hook table |
| New engine primitive | swapping a unit's side (charm), rewinding a unit's last move | the engine, plus its reads/changes row; entries that use it |
| New output kind (hook column) | already added: altered spell, global effect | one entry from every ring rune, or a fallback |
| New property primitive | height, visibility, line of sight | every shape that could write it, plus the cost formula |
| New write mode | "swap two values" | the combination math itself; avoid |

The test for any new idea: write it as writes to property primitives. If it fits, it's content. If it needs one of the four extensions, decide whether it's worth that cost.

**Open questions**

- The exact reads/changes list per primitive (the table above is a first pass).
- The full list of region and timing shapes, and which pairs cancel.
- The price of each payload item and the test boards that measure units touched.
- Whether traits may ever nest deeper than one level (proposed Nov 4: no, depth one; see minor inscriptions).
- Names for the working words (effect record, write modes, essences).
