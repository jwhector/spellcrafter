# Archive: ring review working tables

**Archived 2026-11-05.** From the effect flags checklist (frozen rev 88). These are
the working tables of the ring review's first two columns, with the options and
picks as they were discussed. The results are in the
[rune reference](../rune-reference.md), the binary-effect rules in the
[budget model](../budget-model.md), and the decisions in the
[decision log](../decision-log.md).

## Binary effects today

Seven runes are binary in the center (Stone and Portal only partly), and six of them carry it into their ring entries. These come from the crafter's v14 tables. The ring entries will change when we go through the new ring ideas, so this table gets redone then.

| Rune | Center | Binary ring entries | In steps |
| --- | --- | --- | --- |
| Haste | Binary: an extra move next turn | Every column: extra move, summon acts twice, spell goes first, global effect acts twice | None |
| Slow | Binary: loses its next action, or its shown move is cancelled | Every column: lost action, lost bonus action, spell a round later | None |
| Frost | Binary: loses its bonus move | Chilled (unit, gate, summon), spell goes last, no bonus moves (global) | Ice adds 1 hex of sliding |
| Invisibility | Binary: can't be picked by single, bolt or chain until it acts | Every column: hidden, single targets fizzle | None |
| Revelation | Binary: unhidden and can't hide for a round | Every column: revealed, can't hide | None |
| Stone | In steps (wall hexes), plus binary for units encased | Encased (unit) | Rubble, rough ground |
| Portal | Binary per traveler | None | Units moved and distance (cost grows with both, Proposed) |
| Dispel | In steps: statuses or runes stripped up to the budget | None | Statuses cleared |
| Summon | Smooth body strength, in steps for the number of bodies | None | Bodies |
| Push, Pull (inscriptions since Nov 5) | In steps: hexes moved | None | 1 hex in most columns |

Fire, Mend, Wound, Protect, Expose, Amplification and Diminishing are smooth in the center and in every ring entry.

## Fractional modifiers

Every rule that makes an effect a fraction stronger or weaker needs a second answer for binary effects, because half an extra action doesn't exist. The general proposal is that **a binary effect changes by whole steps instead: one more or one fewer unit reached, or one more or one fewer round, and never a second copy on the same unit.** Effects that move in steps use their own step, such as a hex.

| Modifier | Smooth effects | Binary effects | Status |
| --- | --- | --- | --- |
| Amplification (makes the target deal more) | A third more damage or healing | Its next binary effect reaches one more unit or lasts a round longer, never two extra actions on one unit | Open, for Jared |
| Diminishing (makes the target deal less) | A third less | One fewer unit or a round shorter; on a single target it still lands, so it is never fully negated | Open, for Jared |
| Budget spread over targets, points or area | Each gets a smaller share | Reaches fewer units | Decided Nov 5 |
| The three-pass split | Ring runes keep at least half their share | The center gets as many whole units as the rest pays for | Proposed (minimum level Open) |
| Single-target bonus (×1.15) | 15% stronger | The effect costs 15% less, and the savings go to ring runes | Proposed |
| A linked spell (one spell, a single spell's budget × about 1.5: Decided Nov 5) | Each part a bit weaker | Reaches fewer units | Proposed |
| Copy tether (half strength at the far end) | Half strength | Reaches the far end only if the budget pays for one more unit | Proposed |
| Transfer tether (half as much to the far end) | Half as much | Open: what does taking an action from one end give the other? | Open |
| Push ring spreads the effect out, a little weaker | Wider and weaker | Wider, then reaches fewer units if the budget runs short | Proposed |
| Pull ring collapses the effect, stronger | Narrower and stronger | Narrower; the strength bonus becomes a cheaper price, like the single-target bonus | Proposed |
| Weakest first (strength works as a health pool) | Pool runs out across units | Whole units in health order until the budget runs out | Proposed |
| Delay (×0.8 price), trigger (×0.75 price) | Price only | Price only, no change needed | Fine as is |
| Fire ring idea: spreads (next round it hits units next to the ones it hit, at half strength) | Half strength on the neighbors, a round later | Neighbors get the full effect a round later, allies first for helpful effects, as many as the budget pays for (nearest first). It spreads once, never again from the new units | Proposed (the ring idea itself is still for Jared to review) |

Some current wording would need to change, for example the single-target bonus note in the crafter. Those edits wait until the effects are settled.

## Step 3: ring review, at a point or on a unit

**Status: in progress, paused Nov 5.** Done: at a point or on a unit, and through a gate. Next: on a summon, then on ground, along a tether, on a spell, and global, plus a check of how ring runes read on a Protect shield (it uses the on-a-unit column). The crafter and audit tool still show the old ring entries and Push and Pull as runes; they get updated once every column is done.

These are the ring ideas from the spell model doc's shaping table, written as recipes of primitives. V is what the center's effect is worth on its own, so "+0.6 V" means the ring rune adds 60% to it. Costs are rough guesses from the primitives table and get tuned in step 4. Mark each rune in the last column.

| Rune | Ring idea | What it does | Recipe | Rough cost | Watch out for | Your call |
| --- | --- | --- | --- | --- | --- | --- |
| Fire | Spreads | Next round the effect hits units next to the ones it hit, at half strength | Delay × copies onto neighbors × half | +0.6 V | Binary centers: neighbors get the whole effect, so +1.2 V | Keep |
| Frost | Slick | Units the effect hits slide 1 hex further from any push or pull this round; at a point it also leaves ice | Position step, only if something moves them (trigger) | Cheap, about +0.1 per unit | Only pays off with a mover in the spell or from a teammate | Change |
| Mend | Spares allies | Allies the effect would harm are healed by that much instead | Removes the friendly fire cost, and converts harm on allies into healing | Up to +0.35 V on areas, 0 on a single target | Wasted on single targets and helpful centers; the crafter should warn | Discuss |
| Wound | Finishes | Units the effect leaves below a fifth of their health die | Trigger × binary kill | Normal, about +0.15 per unit hit | Bosses (Open: immune, or a smaller threshold?) | Keep |
| Protect | Guards you | You gain a small shield for each unit the effect hits | Copies a small shield onto you, once per unit hit | About +0.25 per unit hit | Grows fast on large areas | Change |
| Expose | Pierces | The effect ignores shields and cover | Only matters if the target has a shield or cover (trigger) | Cheap | None | Keep |
| Push | Carries further | At a point: the area grows by 1 hex, weaker. On a unit: the effect carries on to the next unit behind the target, at half strength | Point: wider area, same total. Unit: copy onto 1 unit × half × chance someone is behind | Point: about 0. Unit: +0.25 V | Point and unit costs differ a lot | Change |
| Pull | Concentrates | At a point: the area shrinks onto the center hex, stronger. On a unit: stronger for each other unit next to the target | Point: smaller area, same total. Unit: strength × neighbors | Point: about 0. Unit: about +0.4 V | Binary centers can't be stronger (Open) | Change |
| Portal | (current entry) | At a point: the effect also lands at a second point. On a unit: the effect also lands on the nearest other unit | A full copy at one more point or unit | +1 V | Does the same job as the extra point inscription and chain shape; probably needs a new idea | Change |
| Summon | (current entry) | At a point: a creature carries the effect and repeats it around itself each round. On a unit: a body appears next to it and repeats the effect next round | A body plus repeats | Expensive, +0.8 V or more | Making a body is the Summon center's job; does this count as a duplicate? | Discuss |
| Dispel | Can't be undone | The effect can't be stripped, cleansed or countered, and lands through dispel ground | Removes counterplay | Cheap | Takes away the enemy's answer; the counterplay flag | Keep |
| Stone | Anchors | At a point: the effect lasts a round longer and leaves rubble at its edge. On a unit: the unit can't be pushed, pulled or teleported until next round | Point: one more round. Unit: a binary status | Point: +1 V on a 1-round effect. Unit: cheap | Point and unit costs differ a lot | Keep |
| Amplification | Stronger | The effect is a third stronger | Strength ×1.33 | +0.33 V | Binary centers: one step instead (Open) | Keep |
| Diminishing | Lighter | The effect is a third weaker, and the spell's cooldown is a round shorter | Strength ×0.67, cooldown −1 | −0.33 V | Cooldown already sets the budget, so the cooldown part counts twice; maybe just free up budget | Discuss |
| Haste | Sooner | The effect goes off first in its phase, before any other spell or move | Timing | Cheap | Strong against shown enemy moves | Change |
| Slow | Later, stronger | The effect lands at the start of next round, half again as strong | Delay ×0.8, strength ×1.5 | +0.2 V | Binary centers can't be stronger (Open) | Discuss |
| Invisibility | Unseen | Enemies can't see the effect's area or read it until it lands | Information | Cheap | Only matters if enemies react to what they see | Keep |
| Revelation | Seeks | The effect can pick hidden units, and enemies it hits show their next two moves | Information and targeting | Cheap, about +0.1 per enemy hit | None | Discuss |

### Marked Change or Discuss (Nov 5)

Eleven runes, with two options each and my pick. Push and Pull are one row because they're an opposite pair and should be redone together. Several of the problems turned out to be the same one: the ring idea quietly does the center's job (Mend heals, Revelation unhides, Slow repeats the delay inscription). Pick in the last column.

| Rune | Mark | The problem | Option A | Option B | My pick | Your pick |
| --- | --- | --- | --- | --- | --- | --- |
| Push and Pull | Change | Closed: Decided Nov 5, Push and Pull become inscriptions that any spell can use, and a new blank rune (Jared's name, mechanics Open) sits in the center of spells that only move things | **Movement limits:** Push: units hit can't move closer to the point next round. Pull: units hit can't move farther from it. Recipe: a binary status for a round, per unit. Cheap to normal | **Moving effect:** Push: the effect rolls 1 hex away from you each round and hits again, weaker. Pull: it starts at the area's edge and closes in onto the middle next round. Recipe: repeat × delay × fraction. Normal | A: it controls space without moving anyone, and it's a clean opposite pair |  |
| Frost | Change | Closed: Decided Nov 5, keep "Slick". Now that any spell can push or pull, something will often move the unit | **Frozen until it moves:** the effect waits on the unit and goes off when the unit next moves or acts. Recipe: trigger ×0.75. A trap you place on someone | **Brittle ground:** at a point, the area turns to ice that breaks the first time a unit enters, and the effect hits again there. Recipe: ground × trigger | A: it works on any center and fits a freezing theme |  |
| Mend | Discuss | Closed: Decided Nov 5. At a point or on an area, allies take none of the effect's harm and nobody is healed. Cast on a unit, a weak heal (about a quarter of a Mend center's on the same budget) goes to the target if it's an ally, or to the caster if it's an enemy | **Just spares allies:** allies take none of the effect's harm, and nobody is healed. Recipe: removes the friendly fire cost | **Keep as is:** allies are healed by the harm they would have taken | A: no duplicate, and it's still useful on any harmful area |  |
| Protect | Change | Closed: Decided Nov 5, capped guard (Option A). You gain one shield worth about a quarter of everything the effect did | **Capped guard:** you gain a shield worth a quarter of what the effect did in total. Scales with the spell, not the area | **Guards the weakest ally:** the ally with the least health within 2 hexes of the area gets the shield | A, simplest. B if you want it to feel more like protecting someone |  |
| Portal | Change | Closed: Decided Nov 5, from elsewhere (Option A). The spell starts from an ally or your summon instead of you, for range and line of sight | **From elsewhere:** the spell starts from an ally or your summon instead of you, for range and line of sight. Recipe: a where change. Normal | **Swap back:** units the effect hits return to where they started the round. Recipe: a binary teleport per unit. Expensive | A: no overlap, and it fits Portal's "through space" theme |  |
| Summon | Discuss | Closed: Decided Nov 5, Option A, and Jared named the marker a totem. A totem can't act, attack, move or block; it only repeats the effect where it stands, and it can be destroyed or dispelled | **Carrier only:** keep the body, but it can't act, attack or block; it only repeats the effect where it stands. The center makes a real body, the ring only a marker | **Calls allies:** allies next to the units hit each make a free basic attack on them. Recipe: action economy per adjacent ally. Expensive | A: the carrier is about where the effect repeats, not a second unit |  |
| Diminishing | Discuss | Closed: Decided Nov 5, cooldown only (Option A). The cooldown is a round shorter and the forge refits the spell to the smaller budget. Binary effects lose whole steps (a unit or a round) after ring runes drop to their minimum; if not even one step fits, the crafter blocks adding Diminishing and says why | **Shorter cooldown only:** the spell's cooldown is a round shorter, and the forge lowers its strength to match the smaller budget | **Weaker only:** a third weaker, which frees budget for the other ring runes | A: one rule, and the budget curve does the math |  |
| Haste | Change | Closed: Decided Nov 5, quick cast (Option A). The spell costs a bonus action instead of an action, and the forge takes roughly half the budget for it. On a linked spell, quick cast makes it cost an action instead of an action and a bonus action | **Quick cast:** the spell costs a bonus action instead of an action, and the forge takes a share of the budget for it | **Keep "sooner"** | A: very on-theme for Haste. It's expensive, and the budget model handles it |  |
| Slow | Discuss | Closed: Decided Nov 5, drawn out (Option A), and the delay inscription stays. Slow is the stronger version of delay: the effect lands in pieces over this round and the next two, and since the later pieces are priced like delay, the total comes out higher (about ×1.2, to tune). Binary effects start a round later and last a round longer | **Drawn out:** the effect lands spread over this round and the next two, the same total in pieces. Binary effects start a round later and last a round longer | **Keep "later, stronger":** binary effects get one more round instead of more strength | A: no overlap with delay |  |
| Revelation | Discuss | Closed: Decided Nov 5, seeking only (Option B). The effect can pick hidden units, but they stay hidden; the center is what removes hiding | **Foresight only:** enemies the effect hits show their next two moves | **Seeking only:** the effect can pick hidden units | A: no duplicate, and it ties into shown moves |  |

### Through a gate (Nov 5, in review)

A Portal center makes a gate, and ring runes change what happens to the units that travel through it. Decided Nov 5 (Jared): on a made thing, ring runes change the thing itself and never add an effect to it; linking is how a gate gets an effect. Every rune gets a meaning in every column. This is the second draft, under review.

| Rune | Ring idea | Through a gate | Part of the gate it changes |
| --- | --- | --- | --- |
| Fire | Spreads | The entrance grows by 1 hex every round the gate stays open (Proposed: on a two-way gate, both ends grow) | Entrance, over time |
| Frost | Slick | Travelers keep their momentum and come out 1 hex further along the way they entered | Arrival spot |
| Mend | Spares allies | Only allies can pass through | Who can pass |
| Wound | Finishes | Enemies that pass through take damage (Jared's call; the one ring entry on a gate that adds an effect) | Who can pass |
| Protect | Capped guard | A shield wall rings the exit. It has health, and enemies can't cross it until it's broken; allies pass freely | Exit placement |
| Expose | Pierces | The exit doesn't need line of sight, so it can open past walls | Exit placement |
| Portal | From elsewhere | Two-way: units can travel either direction through the gate (swapped with Stone, Jared Nov 5) | Direction |
| Summon | Totem | A totem at the entrance keeps the gate open until it's destroyed | How long it lasts |
| Dispel | Can't be undone | The gate can't be closed, blocked or dispelled early | Durability |
| Stone | Anchors | Anchored to a unit: the exit sits on an ally or your summon and moves with them (swapped with Portal, Jared Nov 5) | Exit placement |
| Amplification | Stronger | The exit can be placed twice as far away | Reach |
| Diminishing | Cooldown only | Cooldown a round shorter, and the gate closes sooner: at the end of your turn instead of the end of the round | Cost |
| Haste | Quick cast | Opening the gate costs a bonus action | Cost |
| Slow | Drawn out | The gate stays open this round and the next two, carrying fewer travelers each round | Timing |
| Invisibility | Unseen | Enemies can't see the entrance or the exit | Visibility |
| Revelation | Seeking | The exit can open next to a hidden unit you know about, and it stays hidden | Exit placement |

Push and Pull are inscriptions now. On a gate, a push inscription shoves travelers out of the exit, and a pull inscription draws nearby units into the entrance.
