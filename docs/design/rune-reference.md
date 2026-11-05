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

**How to read the ring tables.** Every major output type was settled in the ring
review on Nov 5 (step 3 of the plan: grammar and linking, then what the budget
measures, then the ring review, then numbers in the audit tool, then playtest).
Each table is marked Decided, with any row still Open marked in the row. A minor
rune that matches the center adds strength to the center instead of using its
minor rune effect (Decided Nov 4).

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
| Fire | Plain effect | Frost | an effect | Burns the target now and next round | Every damaging hit leaves its hex burning for a round (Decided, Jared Nov 5) |
| Frost | Plain effect | Fire | an effect | Chills the target, which loses its bonus move | Every unit's bonus move is gone while it lasts (Decided, Jared Nov 5) |
| Mend | Plain effect | Wound | an effect | Heals the target | Every unit heals for part of the damage it deals, which rewards the side that hits harder (Decided, Jared Nov 5) |
| Wound | Plain effect | Mend | an effect | Deals plain damage, more to units below half health | Everyone takes a little damage at the end of each round (Decided, Jared Nov 5) |
| Protect | Amplifier | Expose | a shield | Shields the target, which also heals a little more; the ring changes the shield itself | No single hit can take more than a set share of a unit's health (bosses need care) (Decided, Jared Nov 5) |
| Expose | Amplifier | Protect | an effect | Makes the target take more damage and heal less | All damage is increased a little (Decided, Jared Nov 5) |
| Portal | Mover | none | a gate | Opens a gate that lasts the round; anyone can walk through. Cast on yourself with an extra destination, it moves you there | Units move by blinking: a move can pass walls and units, at the same distance. The old rule (two random hexes become linked gates each round) is now Portal's minor rune effect on a global modification (Decided, Jared Nov 5) |
| Summon | Maker | Dispel | a summon | Creates a body at each destination; the ring says what it is made of. Aimed at a unit, the unit is set aside and the body takes its place until it dies or the spell ends | A weak neutral creature enters at the edge each round (Decided, Jared Nov 5) |
| Dispel | Remover | Summon | an effect | Clears statuses, terrain and summons | All statuses and lingering terrain clear, and new ones last only a round (Decided, Jared Nov 5) |
| Stone | Maker | none | an effect | Raises stone that blocks movement; units already standing there are encased | The edge hexes turn to rock, shrinking the battlefield (Decided, Jared Nov 5) |
| Amplification | Amplifier | Diminishing | an effect | Makes the target deal more damage and give more healing for a round | A hit on a unit already hit this round deals more, which rewards focus fire (Decided, Jared Nov 5) |
| Diminishing | Amplifier | Amplification | an effect | Makes the target deal less damage and give less healing for a round | A hit on a unit already hit this round deals less, which rewards spreading damage (Decided, Jared Nov 5) |
| Haste | Plain effect | Slow | an effect | Gives the target an extra move next turn (an extra action with more strength) | Everyone gets an extra move each round (Decided, Jared Nov 5) |
| Slow | Plain effect | Haste | an effect | Makes the target lose its next action; on an enemy that cancels its shown move | Each unit can either act or move on its turn, not both (Decided, Jared Nov 5) |
| Invisibility | Plain effect | Revelation | an effect | Hides the target: single, bolt and chain spells can't pick it until it acts, and an enemy move aimed at it loses its target; areas still hit it | Units more than 3 hexes away can't be picked as single targets (Decided, Jared Nov 5) |
| Revelation | Plain effect | Invisibility | an effect | Removes hiding from the target and stops it hiding again for a round. On an enemy, it also shows that enemy's next move exactly (Proposed, Jared Nov 5, to playtest) | No one can hide (Decided, Jared Nov 5) |
| Blank (Jared's name, Decided Nov 5) | | none | an effect | Open: the center for a spell that only moves things, with the Push or Pull inscription | Open |

**Aimed at a spell.** Decided (Nov 5): only a Dispel center can target a spell,
and its minor runes decide what happens to the spell. Proposed (crafter v14): it
strips runes from the spell, up to the Dispel spell's power budget; you pick
which, and stripping its center cancels it (see [On a spell](#minor-rune-effect-on-a-spell)).

"Role" says what a rune does as a group (Jared's word, Nov 5); the five role
names are still placeholders (see the [glossary](system-b.md#glossary)).

## Minor rune effect: at a destination, or on a unit

**Decided (Nov 5, ring review).** Used when the center makes an effect on an area
(at a destination) or on one unit, and along a tether: the tether's kind decides
how the effect travels, and its minor runes read this table at each end (Jared,
Nov 5). The working labels are placeholders.

| Rune | Working label | Minor rune effect |
| --- | --- | --- |
| Fire | Spreads | Next round the effect hits again on units next to the ones it hit, at half strength. Only the major output repeats, without the minor runes (Jared, Nov 5) |
| Frost | Slick | Units the effect hits slide 1 hex further from any push or pull this round; at a destination it also leaves ice |
| Mend | Spares allies | At a destination, allies take none of the effect's harm, and nobody is healed. On a unit, a weak heal (about a quarter of a Mend center's on the same budget) goes to the target if it's an ally, or to the caster if it's an enemy |
| Wound | Finishes | Units the effect leaves at or below a fixed amount of health die, whatever their maximum health, so it is strong on weak units and does little to bosses (Jared, Nov 5; the amount is a preliminary value) |
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
| Fire | Next round, a half-strength copy appears on a free hex next to it, once. The copy has none of the minor runes' aspects (Jared, Nov 5) |
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

## Minor rune effect: on a shield

**Decided (Nov 5, ring review).** Used with a Protect center. Minor runes change
the shield itself, and every one is an aspect of it, so order never matters. This
replaces the Nov 4 rule that each minor rune fired when the shield was hit: those
reactions repeated each rune's major output, which belongs to the center, and
linking is how a spell gets two major outputs (Jared, Nov 5). The numbers are
preliminary values.

- **Decided (Jared, Nov 5): a shield fades on a timer** if nothing breaks it. The
  timer's length is a preliminary value, set in configuration.
- **Decided (Jared, Nov 5): shielding a hidden ally doesn't reveal them.**

| Rune | Minor rune effect |
| --- | --- |
| Fire | A half-strength copy of the shield also lands on each ally next to the bearer, without the minor runes' aspects |
| Frost | The bearer slides 1 hex further from any push or pull, and the shield takes no harm from collisions |
| Mend | While it holds, harmful area spells cast by your own side skip the bearer; helpful ones still land (Jared) |
| Wound | While any strength is left, it absorbs the whole of the hit that breaks it |
| Protect | Matches the center: adds strength |
| Expose | Attacks that ignore shields don't get through it |
| Portal | The spell starts from an ally or your summon instead of you, for range and line of sight |
| Summon | A totem stands next to the bearer. While the totem stands, the shield comes back once at half strength after it breaks (Jared) |
| Dispel | It can't be dispelled or stripped |
| Stone | The bearer can't be pushed, pulled or teleported while it holds, and it lasts a round longer |
| Amplification | Hits it absorbs charge it. When it breaks, the charge bursts on every unit next to the bearer, allies too (Jared). Start: the charge caps at the shield's own strength, and it is lost if the shield fades unbroken |
| Diminishing | Cooldown a round shorter; the forge refits it smaller |
| Haste | Casting it costs a bonus action |
| Slow | It starts weak and builds to full strength over three rounds, totalling more |
| Invisibility | Enemies can't see the shield or its strength, and an enemy AI leaves it out when choosing what to do |
| Revelation | Before enemies act each round, the shield moves to whichever ally within 3 hexes the first enemy move is aimed at (Jared). It depends on telegraphed enemy moves, which are Proposed, to playtest |

## Minor rune effect: on ground

**Decided (Nov 5, ring review).** Used for lingering area effects and walls. The
major rune sets what the ground does (the table is in
[System B rules](system-b.md#ground)); minor runes become the ground's aspects and
change the ground itself. The numbers are preliminary values.

| Rune | Minor rune effect |
| --- | --- |
| Fire | It grows 1 hex each round it lasts |
| Frost | Units crossing it slide 1 hex further |
| Mend | Allies are spared its harmful effects. This is the one filter that works on ground (Jared, Nov 5, to playtest) |
| Wound | Units it leaves at or below a fixed amount of health at round end die (the same fixed amount as at a destination) |
| Protect | Cover: units in it take less damage from attacks that come from outside it |
| Expose | Open sightlines: units in it can be targeted from anywhere within range, through walls, clouds and cover |
| Portal | Random pairs of its hexes are linked: step on one and come out at the other |
| Summon | A totem keeps the ground going: it refreshes while the totem stands |
| Dispel | It can't be removed, dispelled or replaced by other ground |
| Stone | It lasts a round longer, and units in it can't be pushed or pulled |
| Amplification | A power well: any spell that lands anywhere in its hexes, even on a unit, charges it, and the next spell cast from inside it releases the whole charge, once, by whoever casts first |
| Diminishing | Cooldown a round shorter, and it lasts a round less |
| Haste | Casting it costs a bonus action |
| Slow | It pulses: it acts every other round at double strength, and lasts twice as long |
| Invisibility | Enemies can't see it at any time |
| Revelation | It acts on hidden units, and they stay hidden |

## Minor rune effect: on a spell

**Decided (Nov 5, ring review).** Used only with a Dispel center aimed at a
spell (Decided Nov 5): an enemy's shown move, or an ally's prepared spell, aimed
during the players' phase. Proposed with that decision: with an empty ring, the
Dispel center strips runes up to its power budget, and each minor rune spends part
of that budget doing its thing to the spell instead, so a strong minor rune effect
strips fewer runes. The numbers are preliminary values.

| Rune | Minor rune effect |
| --- | --- |
| Fire | Next round, the same enemy's next move is stripped again at half strength. Only the stripping repeats, without the minor runes |
| Frost | The spell's area slides on ice: straight on, away from its caster, until it meets a wall, a unit or the board's edge. A single-target spell passes its target and hits the next unit in line |
| Mend | The spell can no longer harm your side |
| Wound | If it's stripped below half its runes, it fizzles |
| Protect | You gain a shield worth about a quarter of what you stripped |
| Expose | The change gets through a Dispel minor rune's "can't be undone" |
| Portal | The spell's area moves to another destination you choose. With no extra destination it moves onto the caster (Decided Nov 4, and the forge warns about it). The cost grows with units moved and distance ([budget model](budget-model.md#balancing-area-relocation-proposed)) |
| Summon | A totem repeats the change on the next enemy spell cast near it |
| Dispel | Matches the center: strips more |
| Stone | The change holds: the spell's next cast loses the same runes too. Only the stripping repeats, without the minor runes (Jared) |
| Amplification | What you strip charges your next spell |
| Diminishing | Cooldown a round shorter, and it strips less |
| Haste | Casting it costs a bonus action |
| Slow | The spell goes off a round late. Next round its caster casts it as well as its new move, and can aim it again; it is shown again as a new move. Priced high (Jared) |
| Invisibility | The changed spell can't pick single targets: aimed at one unit it fizzles, and areas still land (Jared) |
| Revelation | It can target a move you can't see (a hidden enemy's, or one whose area Invisibility hides), and it shows that move exactly |

Proposed order rule: on a spell, minor runes are aspects, except that movers (they
shift its area) and Dispel (it strips runes) keep their place.

## Minor rune effect: global modification

**Decided (Nov 5, ring review).** Used with the whole-battlefield shape. The
center's global rule is in the center table; minor runes change how that rule
behaves. The numbers are preliminary values.

| Rune | Minor rune effect |
| --- | --- |
| Fire | When it ends, it comes back once for a round at half strength. Only the major output repeats, without the minor runes |
| Frost | Units moving while it lasts slide 1 hex further |
| Mend | Your side is spared its harmful parts: the one filter on a global modification, as on ground |
| Wound | While it lasts, units at or below the fixed amount of health (as at a destination) die |
| Protect | Units in cover are spared it |
| Expose | Nothing can block it: it gets through dispel ground and "can't be undone" |
| Portal | Each round, two random hexes become linked gates (Jared: moved here from Portal's major output) |
| Summon | A totem keeps it going: it lasts while the totem stands |
| Dispel | It can't be ended early or replaced by another global modification |
| Stone | It lasts a round longer |
| Amplification | Every spell cast while it lasts, by either side, adds to a charge. In its last round it acts once with the charge added, up to double strength |
| Diminishing | Open (Jared, Nov 5): a round off a long cooldown means little. Waits on the Amplification and Diminishing review below |
| Haste | Casting it costs a bonus action |
| Slow | It acts every other round and lasts twice as long |
| Invisibility | Enemies can't see it or read it, and an enemy AI is blind to it |
| Revelation | While it lasts, your side can pick hidden units as single targets, and they stay hidden |

## Open

- [ ] Amplification and Diminishing: whether to swap their major outputs and
      minor rune ideas, reviewed across every major output type (Jared, Nov 5).
      Diminishing's minor rune is still a cooldown and size knob everywhere.
- [ ] What the Blank rune does in the center and in the ring.
- [ ] Which runes ship first.
- [ ] The crafter and audit tool still show the old minor rune effects and list Push and
      Pull as runes; they get updated once the ring review is done.
