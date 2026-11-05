# The Hollow: rune reference

What every System B rune does in the center and in each major output type. The rules
that pick a major output type are in [System B rules](system-b.md#what-the-center-makes-and-what-the-ring-does);
what each meaning costs is in the [budget model](budget-model.md).

**Decided (Nov 5):** there are 16 runes, in opposite pairs: Fire and Frost, Mend
and Wound, Protect and Expose, Summon and Dispel, Amplification and Diminishing,
Haste and Slow, Invisibility and Revelation, plus Portal and Stone with no
opposite. Jared named the six added on Nov 4 (Amplification, Diminishing, Haste,
Slow, Invisibility, Revelation) on Nov 5. Push and Pull are inscriptions now
([System B rules](system-b.md#other-major-inscriptions)), and a Blank rune is
planned for spells that only move things (Decided Nov 5, mechanics Open).

**How to read the ring tables.** Each major output type is being settled in the ring
review, one major output type at a time (step 3 of the plan: grammar and linking, then what
the budget measures, then the ring review, then numbers in the audit tool, then
playtest). The major output types marked Decided are done. The rest still show the crafter's
v14 minor rune effects, which are Proposed and written before the Nov 5 rules that a rune's
major output stays unique to the center and that minor runes on a major output change the
output itself. A minor rune that matches the center adds strength to the center
instead of using its minor rune effect (Decided Nov 4).

## Center

The center decides what the spell makes: an effect, a gate (Portal), a summon
(Summon) or a shield (Protect). An effect that lingers on an area, or is cast as a
wall, becomes ground. All Proposed (crafter v14), except where marked.

A rune's row here is its major output: what it does in the center. "Makes"
is its major output type, the kind of thing it makes. Where the spell is aimed
then decides which row of the major output types table its minor runes read
(see [System B rules](system-b.md#the-major-output-types)).

| Rune | Role | Opposite | Makes | Aimed at the board | Across the whole battlefield |
| --- | --- | --- | --- | --- | --- |
| Fire | Plain effect | Frost | an effect | Burns the target now and next round | Burning lasts a round longer for everyone |
| Frost | Plain effect | Fire | an effect | Chills the target, which loses its bonus move | Every unit's bonus move is gone while it lasts |
| Mend | Plain effect | Wound | an effect | Heals the target | Everyone heals a little at the start of each round |
| Wound | Plain effect | Mend | an effect | Deals plain damage, more to units below half health | Everyone takes a little damage at the end of each round |
| Protect | Amplifier | Expose | a shield | Shields the target, which also heals a little more; the ring says what happens to anyone who hits it | The first hit on each unit each round is reduced |
| Expose | Amplifier | Protect | an effect | Makes the target take more damage and heal less | All damage is increased a little |
| Portal | Mover | none | a gate | Opens a gate that lasts the round; anyone can walk through. Cast on yourself with an extra destination, it moves you there | Each round, two random hexes become linked gates |
| Summon | Maker | Dispel | a summon | Creates a body at each destination; the ring says what it is made of. Aimed at a unit, the unit is set aside and the body takes its place until it dies or the spell ends | A weak neutral creature enters at the edge each round |
| Dispel | Remover | Summon | an effect | Clears statuses, terrain and summons | All statuses and lingering terrain clear, and new ones last only a round |
| Stone | Maker | none | an effect | Raises stone that blocks movement; units already standing there are encased | The edge hexes turn to rock, shrinking the battlefield |
| Amplification | Amplifier | Diminishing | an effect | Makes the target deal more damage and give more healing for a round | Everyone deals a little more |
| Diminishing | Amplifier | Amplification | an effect | Makes the target deal less damage and give less healing for a round | Everyone deals a little less |
| Haste | Plain effect | Slow | an effect | Gives the target an extra move next turn (an extra action with more strength) | Everyone gets an extra move each round |
| Slow | Plain effect | Haste | an effect | Makes the target lose its next action; on an enemy that cancels its shown move | Each unit can either act or move on its turn, not both |
| Invisibility | Plain effect | Revelation | an effect | Hides the target: single, bolt and chain spells can't pick it until it acts, and an enemy move aimed at it loses its target; areas still hit it | Units more than 3 hexes away can't be picked as single targets |
| Revelation | Plain effect | Invisibility | an effect | Removes hiding from the target and stops it hiding again for a round. On an enemy, it also shows that enemy's next move exactly (Proposed, Jared Nov 5, to playtest) | No one can hide |
| Blank (Jared's name, Decided Nov 5) | | none | an effect | Open: the center for a spell that only moves things, with the Push or Pull inscription | Open |

**Aimed at a spell.** Decided (Nov 5): only a Dispel center can target a spell,
and its minor runes decide what happens to the spell. Proposed (crafter v14): it
strips runes from the spell, up to the Dispel spell's power budget; you pick
which, and stripping its center cancels it (see [On a spell](#minor-rune-effect-on-a-spell)).

"Role" says what a rune does as a group (Jared's word, Nov 5); the five role
names are still placeholders (see the [glossary](system-b.md#glossary)).

## Minor rune effect: at a destination, or on a unit

**Decided (Nov 5, ring review).** Used when the center makes an effect on an area
(at a destination) or on one unit. The working labels are placeholders.

| Rune | Working label | Minor rune effect |
| --- | --- | --- |
| Fire | Spreads | Next round the effect hits again on units next to the ones it hit, at half strength |
| Frost | Slick | Units the effect hits slide 1 hex further from any push or pull this round; at a destination it also leaves ice |
| Mend | Spares allies | At a destination, allies take none of the effect's harm, and nobody is healed. On a unit, a weak heal (about a quarter of a Mend center's on the same budget) goes to the target if it's an ally, or to the caster if it's an enemy |
| Wound | Finishes | Units the effect leaves below a fifth of their health die |
| Protect | Capped guard | You gain one shield worth about a quarter of everything the effect did |
| Expose | Pierces | The effect ignores shields and cover |
| Portal | From elsewhere | The spell starts from an ally or your summon instead of you, for range and line of sight |
| Summon | Totem | A totem repeats the effect where it stands. It can't act, attack, move or block, and it can be destroyed or dispelled |
| Dispel | Can't be undone | The effect can't be stripped, cleansed or countered, and it lands through dispel ground |
| Stone | Anchors | At a destination, the effect lasts a round longer and leaves rubble at its edge. On a unit, the unit can't be pushed, pulled or teleported until next round |
| Amplification | Stronger | The effect is a third stronger (on a binary effect, one step instead: Open) |
| Diminishing | Cooldown only | The spell's cooldown is a round shorter, and the forge refits the spell to the smaller budget. Binary effects lose whole steps (a unit or a round) after minor runes drop to their minimum; if not even one step fits, the crafter blocks adding Diminishing and says why |
| Haste | Quick cast | The spell costs a bonus action instead of an action, and the forge takes roughly half the budget for it. On a linked spell, it costs an action instead of an action and a bonus action |
| Slow | Drawn out | The effect lands in pieces over this round and the next two. The later pieces are priced like delay, so the total comes out higher (about ×1.2, to tune). Binary effects start a round later and last a round longer. The delay inscription stays |
| Invisibility | Unseen | Enemies can't see the effect's area or read it, at any time (Jared, Nov 5). An enemy AI is blind to it too |
| Revelation | Seeking | The effect can pick hidden units, but they stay hidden; the center is what removes hiding |

**Open:** whether Wound's finish applies to bosses (immune, or a smaller
threshold). **To check:** how these read on a Protect center's shield, which uses
this major output type with each rune firing when the shield is hit.

## Minor rune effect: through a gate

**Decided (Nov 5, ring review).** Used with a Portal center. Minor runes change
what happens to the gate and the units that travel through it.

| Rune | Minor rune effect | Part of the gate it changes |
| --- | --- | --- |
| Fire | The entrance grows by 1 hex every round the gate stays open (Proposed: on a two-way gate, both ends grow) | Entrance, over time |
| Frost | Travelers keep their momentum and come out 1 hex further along the way they entered | Arrival spot |
| Mend | Only allies can pass through | Who can pass |
| Wound | Enemies that pass through take damage (Jared's call; the one minor rune effect on a gate that adds an effect) | Who can pass |
| Protect | A shield wall rings the exit. It has health, and enemies can't cross it until it's broken; allies pass freely | Exit placement |
| Expose | The exit doesn't need line of sight, so it can open past walls | Exit placement |
| Portal | Two-way: units can travel either direction through the gate | Direction |
| Summon | A totem at the entrance keeps the gate open until it's destroyed | How long it lasts |
| Dispel | The gate can't be closed, blocked or dispelled early | Durability |
| Stone | Anchored to a unit: the exit sits on an ally or your summon and moves with them | Exit placement |
| Amplification | The exit can be placed twice as far away | Reach |
| Diminishing | Cooldown a round shorter, and the gate closes sooner: at the end of your turn instead of the end of the round | Cost |
| Haste | Opening the gate costs a bonus action | Cost |
| Slow | The gate stays open this round and the next two, carrying fewer travelers each round | Timing |
| Invisibility | Enemies can't see the entrance or the exit | Visibility |
| Revelation | The exit can open next to a hidden unit you know about, and it stays hidden | Exit placement |

## Minor rune effect: on a summon

**Decided (Nov 5, ring review).** Used with a Summon center. Minor runes change
the body itself, and every one is an aspect of it, so order never matters. An
effect around the summon (a burning or healing aura) comes from a minor Where
inscription instead, as in the fire-breathing summon in
[System B rules](system-b.md#minor-inscriptions). The numbers are preliminary
values.

| Rune | Minor rune effect |
| --- | --- |
| Fire | Next round, a half-strength copy appears on a free hex next to it, once |
| Frost | It moves 1 extra hex each round, in straight lines only |
| Mend | Its attacks never hit allies, and allies can pass through its hex |
| Wound | It hits harder (a cheap addition, Jared) |
| Protect | It is tougher: a higher armor or toughness stat (stats are Open) |
| Expose | It draws enemy attacks |
| Portal | It can blink a short way (start: 2 hexes) once per round |
| Summon | A totem stands where it appeared. While the totem stands, the summon rises there once after dying, at half health, and its time left doesn't reset |
| Dispel | It can't be dispelled or sent away early, and conjured ground and terrain on every hex it stands on or moves through is cleared; natural terrain stays |
| Stone | It can't be pushed, pulled or teleported, and it lasts a round longer |
| Amplification | It feeds on friendly fire: allied spells that hit it don't hurt it, and it stores a third of what they would have done for its next attack (start: the store caps at its own attack strength, and it is lost if the summon dies) |
| Diminishing | Cooldown a round shorter; the forge refits it smaller, and it leaves a round sooner |
| Haste | Summoning it costs a bonus action |
| Slow | It arrives weak and grows to full strength over three rounds, totalling more |
| Invisibility | Enemies can't see it until it acts |
| Revelation | It can see and attack hidden units, and they stay hidden |

## Minor rune effect: on ground

**Proposed (crafter v14), to review.** Used for lingering area effects and walls.
Minor runes become the ground's aspects.

| Rune | Minor rune effect |
| --- | --- |
| Fire | Burns whoever stands in it at round end |
| Frost | Slippery: units slide 1 hex further |
| Mend | Heals allies standing in it at round end |
| Wound | Hurts each unit that steps onto a hex of it |
| Protect | Cover: units standing in it take less damage |
| Expose | Units standing in it are exposed |
| Portal | Its hexes are linked: step on one and come out at another |
| Summon | Spreads 1 hex each round |
| Dispel | Statuses can't land on units in it, and spells aimed into it lose minor runes up to its strength |
| Stone | Rough: crossing costs an extra move, and it lasts longer |
| Amplification | Units standing in it deal more |
| Diminishing | Units standing in it deal less |
| Haste | Units standing in it get an extra move |
| Slow | Units that end their turn in it lose their next action |
| Invisibility | Units standing in it are hidden |
| Revelation | Units standing in it can't hide |

Mend's "allies" here reads as a filter, and filters don't work on ground (Decided
Nov 4). The review should settle it.

## Minor rune effect: along a tether

**Proposed (crafter v14), to review.** Used with a tether inscription. The minor rune effect
says what each rune sends along the tether.

| Rune | Minor rune effect |
| --- | --- |
| Fire | Burning |
| Frost | Chill |
| Mend | Healing |
| Wound | Damage |
| Protect | Hits: damage from any source while the tether lasts |
| Expose | Exposure (taking more damage) |
| Portal | A unit at one end can travel the tether to the other end once |
| Summon | A body: one also appears at the far end |
| Dispel | Cleansing: statuses removed at one end |
| Stone | A low wall rises along the tether |
| Amplification | Strength (dealing more) |
| Diminishing | Weakness (dealing less) |
| Haste | Tempo (extra moves) |
| Slow | Lost time (lost actions) |
| Invisibility | Concealment |
| Revelation | Revealing |

## Minor rune effect: on a spell

**Proposed (crafter v14), to review.** Used only with a Dispel center aimed at a
spell (Decided Nov 5). Proposed with that decision: with an empty ring, the Dispel
center strips runes up to its power budget, and each minor rune spends part of that
budget doing its thing to the spell instead.

| Rune | Minor rune effect |
| --- | --- |
| Fire | When the spell is cast, its caster burns |
| Frost | The spell goes off last in its phase |
| Mend | Allies the spell hits are healed afterward |
| Wound | The spell's caster takes damage when it casts |
| Protect | Units the spell hits take less damage |
| Expose | The spell hits harder (good on an ally's spell, risky on an enemy's) |
| Portal | The spell's area moves to another destination you choose. With no extra destination it moves onto the caster (Decided Nov 4, and the forge warns about it) |
| Summon | A decoy appears that a single-target spell hits instead |
| Dispel | (matches the center: strips more) |
| Stone | A barrier rises in front of the spell; bolts and lines stop at it |
| Amplification | The spell's caster deals more for a round after casting it |
| Diminishing | The spell's caster deals less for a round after casting it |
| Haste | The spell goes off first in its phase |
| Slow | The spell goes off a round later |
| Invisibility | The spell can't pick single targets: aimed at one unit, it fizzles; areas still land |
| Revelation | You read the spell exactly: its area, pushes and side effects, without deciphering |

Proposed order rule: on a spell, minor runes are aspects, except that movers (they
shift its area) and Dispel (it strips runes) keep their place.

## Minor rune effect: global modification

**Proposed (crafter v14), to review.** Used with the whole-battlefield shape. The
center's global rule is in the center table; these minor rune effects say how a minor rune
shapes that global effect.

| Rune | Minor rune effect |
| --- | --- |
| Fire | The global effect also leaves scattered burning hexes |
| Frost | The global effect also takes away everyone's bonus move |
| Mend | Allies heal a little each round while the global effect lasts |
| Wound | The global effect also chips everyone for a little damage each round |
| Protect | The global effect is softer on your side |
| Expose | The global effect is stronger |
| Portal | The global effect jumps between two zones each round |
| Summon | Creatures carry the global effect; it only applies near them |
| Dispel | The global effect also clears statuses and terrain when it starts |
| Stone | The global effect is anchored: it lasts longer but stays in one region |
| Amplification | Units inside the global effect deal more while it lasts |
| Diminishing | Units inside the global effect deal less while it lasts |
| Haste | The global effect acts twice each round |
| Slow | The global effect acts every other round and lasts twice as long |
| Invisibility | Enemies see only a blank sigil for the global effect |
| Revelation | The global effect reveals every hidden unit in it |

## Open

- [ ] The ring review: on ground (next), along a tether, on a spell,
      global, and the check of minor runes on a Protect shield.
- [ ] What the Blank rune does in the center and in the ring.
- [ ] Wound's finish against bosses.
- [ ] Which runes ship first.
- [ ] The crafter and audit tool still show the old minor rune effects and list Push and
      Pull as runes; they get updated once the ring review is done.
