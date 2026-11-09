# The Hollow: System C rules

System C is the crafting system that grew out of the Nov 7 and 8 discussions:
spells are discovered as combinations of runes, then crafted with minor runes.
"System C" is Jared's working name (Nov 8). How it sits beside
[System A](system-a.md) and [System B](system-b.md) in the playtest is Open.
Its runes are the ten below.

Everything here is Proposed unless marked otherwise, and working words are
placeholders unless marked as Jared's.

## The shape of it

**Decided (Jared, Nov 7 and 8).** Two layers, each with its own job:

- **Discovery.** A spell is a recipe of up to three runes, found in play. Each
  recipe is an authored spell, made by hand, with its own effect and look.
- **Crafting.** Minor runes change a spell the player already has. Crafting is
  the player's agency: a conscious, readable change to a spell they know.

**Decided (Jared, Nov 8): no centers.** A spell is no longer built around a
center rune whose major output the ring modifies, as in System B. The spell is
the discovered recipe, and minor runes modify it.

**Decided (Jared, Nov 8): discovery is discontinuous, crafting is
continuous.** A recipe can do something its runes alone would not suggest,
because each one is a unique spell. Crafting keeps a rhyme and reason, so once
you have a spell you can guess what a minor rune will do to it.

## The ten runes

**Decided (Jared, Nov 8): ten runes, in five opposed pairs:** Fire and Frost,
Life and Death, Stone and Air, Revelation and Illusion, Spatial and Temporal.
There is no Summon rune. Proposed: each rune does two jobs, as an ingredient
in recipes and as a minor rune with its own table.

Each rune takes in some of System B's 16, or in Air's case the job of
pushing and pulling (Decided, Jared Nov 8). Each minor idea below carries its
own marker where its row has been worked out; the rest are candidates carried
over from the 16-rune tables in the [rune reference](rune-reference.md)
(Proposed), and choosing one per rune is the audit still to come.

| Rune | Opposite | Takes in | Minor idea so far |
| --- | --- | --- | --- |
| Fire | Frost | Fire | Contagion: what the spell leaves on a unit passes from unit to unit (Decided, below) |
| Frost | Fire | Frost | Slick |
| Life | Death | Mend | Takes root: the spell grows while its caster stays put (Decided, below) |
| Death | Life | Wound | Siphons: drains a rune from the air and borrows its cell (Decided, below) |
| Stone | Air | Stone, and protection (Protect) | Raises stone you can climb (Decided, below) |
| Air | Stone | Pushing and pulling units | Pushes or pulls (Decided, below) |
| Revelation | Illusion | Revelation, Dispel and Expose: it shows what is true, so it strips what is false or hidden and lays weak points bare | Shows a weak side (Proposed, below) |
| Illusion | Revelation | Invisibility, Amplification and Diminishing: the school of buffs and debuffs | Hides what the spell is (Decided, below; stronger and shorter cooldown are stat dials now) |
| Spatial | Temporal | Portal | From elsewhere: a spell carries on from an ally (Decided, below) |
| Temporal | Spatial | Haste and Slow | Readied: the spell waits for a condition (Decided, below; quick cast is a stat dial now) |

## Recipes

**Decided (Jared, Nov 7 and 8): every recipe shape has a job,** and none is
ruled out, only different:

| Shape | Its job |
| --- | --- |
| One rune (A) | The basic spell of that rune |
| Two or three of one rune (AA, AAA) | The archetype of that rune's school, scaled up |
| Two runes (AB) | A spell of two schools |
| Two of one rune and one of another (AAB) | The AB spell, focused and scaled toward A |
| Three runes (ABC) | A unique mechanic, whose uniqueness is its power |

Every pair of runes has two of the AAB shape: AAB leans toward A and ABB leans
toward B (Jared, Nov 8). With ten runes, the shapes give 285 recipes: 10 of
A, 10 of AA, 10 of AAA, 45 of AB, 90 of AAB and 120 of ABC.

**Decided (Jared, Nov 8):** summons come from recipes, not from a rune of
their own.

**Decided (Jared, Nov 8): as far as possible, a recipe with more runes gives
more options, not more power.** A trio is stronger mostly in what it lets you
do, such as which rune it leaves in the air (below).

**Proposed (Nov 7): an authored spell has to be worth authoring.** It needs one
rule no other spell has, and it fails if it can be described as another spell
with other numbers, or reached by crafting a nearby spell.

## Outputs

**Decided (Jared, Nov 8): an authored spell exposes its outputs.** Each spell
shows which kinds of output it has, and those differ by spell. A burning wall,
for example, exposes its damage and the ground it leaves.

**Decided (Jared, Nov 8): when a spell exposes more than one output, the player
chooses which one each minor rune changes.** The choice is part of the agency
crafting gives.

**Proposed (Nov 8): the output kinds are System B's seven,** plus the two
below, without the
center: an effect at a destination or on a unit, through a gate, on a summon, on
a shield, on ground, on a spell, and across the whole battlefield. A new kind is
added only when an authored spell can't be described by one of these, since
each kind costs a cell for every minor rune.

**Decided (Jared, Nov 8): two more output kinds,** found when Fire's
contagion had nothing to spread on some spells:

- **Along the caster's path:** a spell that moves its own caster, such as a
  blink, a jump or a charge (candidate C5 in the spell survey).
- **On a link:** a lasting bond between two units, such as a life link, a
  taunt or a charm (candidate C6).

The rows worked out before these two get a second pass to fill them (Open).
Proposed (Nov 8): the survey's other candidates stay out. A spell aimed at
ground already on the board makes ground or an effect, so it uses those
columns, and a charge uses the cell of whatever it lands on.

## Minor runes

**Decided (Jared, Nov 8): each minor rune is a table,** with one effect for
every output kind. Every cell has to make sense for that output and be
interesting to play with.

**Decided (Jared, Nov 7): minor runes only transform, never add.** A minor rune
changes what the spell already does; it doesn't tack on a new effect, such as
healing or life steal.

**Decided (Jared, Nov 8): minor runes set up plays with the board.** Each minor
rune effect should open a small game that combines with other spells, other
players or the board, the way pushing a unit into a wall or into burning ground
does. Moving units for free is strong, but it feels correctly balanced.

**Decided (Jared, Nov 8): a minor rune's game stands on its own.**

- A minor rune is worth putting on any spell for the change it makes. Its game
  never needs particular runes in the recipe.
- An authored spell is complete without any minor rune. It is never designed
  so that one minor rune is the only way to get value from it, all the more
  since a roguelike run may never offer that rune.
- Some authored spells may touch a minor rune's game on purpose, as their own
  special mechanic. For example, a spell whose passed-on effect grows faster
  under Fire.

**Decided (Jared, Nov 8): stat dials are not minor runes.** Plain changes to a
number, such as casting as a bonus action, a shorter cooldown or a stronger
effect, move to a dial of their own (Open: where it lives). The Nov 8
spell survey found eleven, among them damage up or down,
range, cooldown, cost, maximum health, damage reduction and speed.

Randomness (except in accuracy) and charm or domination are allowed in minor
rune effects and spells, as in the whole game (Decided, Jared Nov 8; see the
[overview](overview.md#battles)).

### Empowered effects

**Decided (Jared, Nov 8): every minor rune also has an empowered effect,** a
stronger version a spell gets by spending that rune from the air. The idea
comes from Gloomhaven's elements (row MI0 of the spell survey). "In the air"
is a working phrase.

- **Decided (Jared, Nov 8): recipe runes fill the air, and minor runes spend
  it.** When a spell is cast, one of the runes in its recipe is left in the
  air across the battlefield. A later spell that carries the same rune as a
  minor rune can spend it for that minor rune's empowered effect.
- **Decided (Jared, Nov 8): a spell fills one rune,** chosen when it is cast,
  whatever the size of its recipe. A trio gives the air no more than a
  single; it gives the caster a choice of three.
- **Decided (Jared, Nov 8): the air is shared.** Enemies fill it and spend it
  too.
- **Decided (Jared, Nov 8): anyone can spend a rune,** including whoever
  filled it, and spending is always a choice.
- **Decided (Jared, Nov 8): each cell of a rune's row, empowered cells
  included, can be its own effect,** as long as it fits the rune and works on
  any spell with that output kind. Effects that differ by output kind but feel
  true to it give more emergence than one modifier tacked on everywhere. This
  replaces "one empowered rule per rune, to start" (earlier on Nov 8). An
  empowered cell often takes its base cell one step further, but it needn't.
- **Decided (Jared, Nov 8): an empowered cell is value in itself.** The base
  cell is the small game; spending a rune from the air is already the setup,
  so the empowered cell doesn't wait on a second trigger.
- **Decided (Jared, Nov 8): on an output that lasts** (ground, a summon, a
  shield, the whole battlefield), the empowered effect holds only for the
  round it is cast.
- Proposed (Nov 8): a rune stays in the air until the end of the next round,
  as in Gloomhaven (a preliminary number).
- Proposed (Nov 8, to playtest): filling a rune clears its opposite from the
  air, so filling Fire wipes out Frost.

### A charge

**Proposed (Jared, Nov 8): some authored spells hold a charge** (working
word). The spell stores its minor rune on another unit, and it acts on that
unit's next action as a minor rune would, using the cell for whatever that
action makes (a basic attack is an effect). If the action exposes more than
one output, that unit's player chooses which one it changes (Jared's lean). A
charge needs no column of its own.

### Air

**Decided (Jared, Nov 8): Air pushes or pulls,** chosen when you craft, and
the Push and Pull inscriptions are removed.

**Proposed (Nov 8): Air's cells.** Empowered, the push or pull carries on
until the unit hits something, and the board's edge counts as a wall. A pull
drags the unit all the way in, until it reaches the spot or something in the
way.

**Decided (Jared, Nov 8): Air keeps the slide on a spell** (its area slides
until it meets something) as its empowered cell, so Frost gets a different
cell on a spell. The cell's wording stays Proposed.

| Output | Air as a minor rune | Empowered |
| --- | --- | --- |
| At a destination or on a unit | Units hit are pushed (or pulled) 1 hex from where it landed | Carried until they hit a unit, a wall or the edge |
| Through a gate | Each arrival shoves units next to the exit 1 hex away (or draws them 1 hex in) | Shoved until they hit something |
| On a summon | Its attacks push or pull 1 hex | This round, its attacks carry the target until it hits something |
| On a shield | Units that hit it from next door are pushed 1 hex back (or pulled in) | This round, thrown back until they hit something |
| On ground | A current: units in it move 1 hex each round in the direction it was cast | This round, the current carries units until they hit something |
| On a spell | Its area is nudged 1 hex in a direction you choose | Its area slides until it meets something |
| Whole battlefield | A gale: every unit is moved 1 hex downwind each round | This round, every unit is blown until it hits something |

**Proposed (Nov 8): two board rules make pushing a game.** A unit pushed into
a wall or another unit takes damage, and so does the unit it hits. A unit
pushed into ground is affected by it at once.

### Illusion

**Decided (Jared, Nov 8): Illusion hides what a spell is, and can fake
people out.** The other side sees that a spell is an illusion, where it is and
what kind of output it is, since its footprint shows that, but not what it
does, until it is revealed. This replaces "unseen", which Jared turned down as a passive advantage with no
play in it.

**Decided (Jared, Nov 8, for now): when you cast, you choose whether the
illusion looks threatening or beneficial.** The look may lie or tell the
truth. An illusion over real Fire ground that looks like Fire ground is a
double bluff. Every cell wears that look; the default illusory look on an
effect and the random look on a summon are how it is drawn.

**Decided (Jared, Nov 8): empowered, the spell also shows a decoy,** a
second footprint with the same look. Only one is real.

**Proposed (Nov 8):**

- What reveals an illusion: Revelation, a unit walking into it or attacking
  it, or (for a summon) its first action. Units a spell lands on don't reveal
  it by being hit.
- A decoy does nothing and breaks when a unit touches it.
- Choosing the look at cast keeps a player's bluffs from becoming
  predictable. Because players learn enemy spells only as they're cast or
  shown ([overview](overview.md#battles)), the look is what keeps the doubt
  bounded: the other side judges one claim, not every spell in the game.

**Proposed (Nov 8): Illusion's cells.**

| Output | Illusion as a minor rune | Empowered |
| --- | --- | --- |
| At a destination or on a unit | It lands with a default illusory look, and what it did to the units hit stays hidden until revealed (Jared, Nov 8) | A decoy area looks hit as well |
| Through a gate | Where it leads is hidden until a unit goes through | A decoy gate |
| On a summon | It wears a random look, and what it is stays hidden until it acts or is revealed (Jared, Nov 8) | A decoy summon with the same look |
| On a shield | How strong it is and what it does stay hidden until it's hit | A decoy shield on a second unit |
| On ground | It shows as unknown ground with the chosen look | A decoy patch of ground |
| On a spell | The change it made is hidden: the spell shows its old look, marked as an illusion | A second spell looks changed too |
| Whole battlefield | The board shows that a modification is in force, but not what it is | Two modifications show, and only one is real |

### Spatial

**Decided (Jared, Nov 8): Spatial is about where a spell comes from.** Swapping
places was turned down as its core; it belongs on an authored spell.

**Decided (Jared, Nov 8): a spell that can reach an ally carries on from
them.** It passes through a portal at the ally and goes on as if cast from
their hex, with its range counted again from there, like a bounce.
Proposed: line of sight is counted from there too, since every spell needs it.

**Decided (Jared, Nov 8): empowered, the spell also opens a one-way spell
portal for the round,** with its entrance and exit placed on any hexes in
range. Any spell, from anyone, that can reach the entrance carries on from the
exit, with its range counted again from there.

**Decided (Jared, Nov 8): spells can't travel through a gate** unless a minor
rune lets them.

**Note for the art (Jared, Nov 8):** every spell and attack needs a version
that travels through a portal, since that is how gates and this rune show on
the board.

**Decided (Jared, Nov 8): Spatial's cells,** except the empowered cell on a
spell, which is Proposed.

| Output | Spatial as a minor rune | Empowered |
| --- | --- | --- |
| At a destination or on a unit | It carries on from an ally it can reach, as above | A one-way spell portal for the round, as above |
| Through a gate | Spells can travel through the gate this round | Spells can travel through it for as long as the gate lasts |
| On a summon | It is an exit for the next spell cast through it | It is an exit for everyone for the whole round, and it moves with the summon: the only exit that can move |
| On a shield | The first single-target hit on it this round goes into a portal and comes out at an exit you place; area effects are not caught | Every single-target hit this round |
| On ground | A unit in it can move to any hex of it as a single move, and the ground acts on it once for each hex crossed | This round, the free movement spreads to any ground touching this ground |
| On a spell | An enemy spell goes through a portal, and its origin moves to a hex you choose | Proposed: every spell that enemy casts this round comes out of the exit you placed |
| Whole battlefield | This round, every spell can carry on once from an ally | From any unit |

### Stone

**Decided (Jared, Nov 8): Stone raises stone you can climb,** a terrain
halfway to a wall. "Raised stone" is a working name; its name is Open. Walls
that block movement outright are kept for authored spells.

- It doesn't block movement: a unit can climb onto it as a normal move.
- It blocks line of sight through it, so it gives cover.
- It stops a shove: a unit pushed into it collides, as with a wall.
- A unit on top sees over it, and over other raised stone.
- A unit pushed off the top falls and takes the same damage as a collision
  (the collision rule under Air is still Proposed).

**Note for the art (Jared, Nov 8):** every summon needs a ridden animation,
since Stone lets allies ride one.

**Decided (Jared, Nov 8): Stone's cells,** except the cell on a spell, which
is Proposed and tentative.

| Output | Stone as a minor rune | Empowered |
| --- | --- | --- |
| At a destination or on a unit | Raised stone rises under the hexes it hit until the end of next round, and units there are lifted on top | It lasts the whole battle (Jared accepted this, Nov 8) |
| Through a gate | The exit rises as raised stone, so arrivals come out on high ground | It stays as long as the gate does |
| On a summon | Its body counts as raised stone: allies can climb on for high ground, and shoves collide with it | This round, allies on top ride it and move with it |
| On a shield | Raised stone rises on one side of the unit, which you choose | It rises on every side this round, which also blocks the unit's own sight out |
| On ground | Units in it can't be moved by Air or Spatial | This round, it also rises as raised stone: high ground nobody can be pushed off |
| On a spell | Proposed, tentative: against a single-target move that follows its target, raised stone rises between the caster and the target, and the move is lost only if the target is still behind it when the move goes off | It stays up through the next round |
| Whole battlefield | Each round, raised stone rises on a few random hexes | This round, units standing there are lifted on top |

### Revelation

**Proposed (Nov 8): Revelation shows a weak side.** A unit's weak side is the
side facing away from the Revelation spell's caster, and hits from that side go
through shields and cover. The team has to get behind the target, with Air,
with Spatial's bounce from an ally, or on foot. Jared likes the game it opens
and has set it aside to come back to (Nov 8).

| Output | Revelation as a minor rune | Empowered |
| --- | --- | --- |
| At a destination or on a unit | Units hit show their weak side until the end of next round | This round, every side is weak |
| Through a gate | Arrivals reveal hidden units and illusions next to the exit | They also show those units' weak sides |
| On a summon | Its attacks show the target's weak side | This round, it reveals every unit it can see |
| On a shield | Units that hit it show their weak side | Every unit that hits it this round does |
| On ground | Units in it can't hide or be disguised, and show their weak side | This round, so does anything touching the ground |
| On a spell | An enemy's shown move shows a weak point: a hit on its caster from the weak side cancels it | Any hit on the caster cancels it this round |
| Whole battlefield | Illusions and hidden units show everywhere | This round, every unit's weak side shows to everyone |

### Temporal

**Decided (Jared, Nov 8): the Time rune is renamed Temporal.**

**Decided (Jared, Nov 8): Temporal readies a spell** ("readied" is a working
word). The spell waits where it
was cast, shown to everyone, and goes off the first time its condition is met
during the enemy phase. If nothing sets it off, it goes off at the start of
the next round, so it is never wasted. The condition is chosen when you craft.
To start there are two: a unit enters the spell's area, or a unit in its area
starts a shown move.

Waiting on a condition is its own small crafting game. What keeps it in check:
everyone can see it, it waits through one enemy phase, and its condition is
fixed when you craft. A spell that only waits until next round was weighed as
the base and found too rarely worth more than casting now, so it is the
fallback instead.

**Decided (Jared, Nov 8): empowered, it stays ready through the next round's
enemy phase as well,** two chances instead of one. Proposed: if nothing sets it
off then, it goes off at the start of the round after.

**Decided (Jared, Nov 8): Temporal's cells,** except those marked Open. The cells
other than readied were worked out assuming enemies no longer show their next
move, which Jared is now weighing (Open, below).

| Output | Temporal as a minor rune | Empowered |
| --- | --- | --- |
| At a destination or on a unit | Readied, as above | It stays ready through the next round's enemy phase as well |
| Through a gate | It is open only in the players' phase, so units can go through and enemies can't follow | Open: it needs a more specific design |
| On a summon | It holds its action, and takes it on the first enemy that comes in reach or starts a move | This round it acts now and also holds a second action |
| On a shield | It waits on the caster and goes to the first ally that is attacked | This round, after each hit it moves on to the next ally attacked, keeping what is left of it |
| On ground | For its first round, it is active only in the players' phase or only in the enemy phase, chosen when you craft, so it can help allies or catch enemies | The limit lasts as long as the ground does, an exception Jared chose to the rule that empowered effects on lasting outputs hold only for the round they are cast |
| On a spell | The enemy's next spell is held where it was aimed and lands at the start of next round, shown to everyone, like "a half counter spell" (Jared, Nov 8) | Open |
| Whole battlefield | This round, each player can hold their bonus action and take it in the enemy phase | They can hold their action too |

Kept for authored spells rather than Temporal's minor rune (Jared, Nov 8):

- Tempo, where enemies' shown moves land a round late and your side acts
  early. It is too strong for a minor rune and belongs on an authored spell
  with a cooldown.
- Rewind, where a unit snaps back at the end of the round to where it was. It
  is noted as an idea for an authored spell.

### Fire

**Decided (Jared, Nov 8): Fire is contagion.** What a Fire spell leaves on a
unit passes from unit to unit. What passes depends on the recipe spell: each
spell's sheet names what it passes on.

**Decided (Jared, Nov 8): it is passed around, and passes only when its
carrier moves next to a unit or is pushed into one.** It leaves the carrier
when it passes, so the base effect is never duplicated and no spell has to be
balanced as if it might hit twice. Copying is proposed only for empowered
cells, below. It is a mechanic that triggers, not a way to power up
your own spells by passing them back and forth.

**Decided (Jared, Nov 8): it grows only under certain conditions,** and being
displaced (pushed or pulled) is one of them.

Proposed (Nov 8), to settle with the cells:

- Each growth is one step, capped at double (preliminary numbers).
- Stepping next to a unit yourself passes it at the same strength.
- It also grows when it passes from one side to the other. Stepping it
  between allies never grows it.
- When the carrier comes next to several units at once, the carrier's player
  chooses which one takes it.
- A plain hit with nothing lasting is held, and goes off on whoever holds it
  at the end of a holder's next turn (Jared's idea). Proposed on top of it:
  the time is that of the first holder, a player's turn ending with the
  players' phase and an enemy's with the enemy phase. The time is fixed
  when it is cast and passing never resets it, so it may return to a unit
  that held it: passing changes who it hits, never when.
- A spell at a destination that hits no unit leaves it on the hexes it hit,
  and the first unit to step on them carries it.
- Passing ignores sides, as friendly fire does.
- A Frost spell on the holder puts it out or shrinks it a step, from Fire's
  opposite.
- A passed push or pull goes away from, or toward, the unit it came from.
- Empowered, it copies for one step instead of moving: duplication is the
  payoff for spending Fire from the air.

**Decided (Jared, Nov 8): on ground, a unit pushed out of it drags the
ground along every hex it crosses until it lands.** This replaces an earlier
Nov 8 call, that the ground spreads 1 hex at the end of the round, which is now
the empowered cell: as a base it was mostly a bigger area. Proposed (Jared's
lean, Nov 8): the empowered spread reaches 2 hexes.

**Decided (Jared, Nov 8, for now): through a gate, it is a burst.** Whenever a
unit goes through, everything within 1 hex of it goes too. Empowered, the
burst reaches 2 hexes. Units carried along don't set off a burst of their
own, so it doesn't cascade through a whole group (Jared, Nov 8). An empowered
blast at the exit was turned down as only
useful against enemies, and placing arrivals felt like Spatial's job.

The other cells below were redrafted for passing (Nov 8) and are Proposed.

| Output | Fire as a minor rune | Empowered |
| --- | --- | --- |
| At a destination or on a unit | What it leaves on a unit passes, as above | It copies for one step instead of moving |
| Along the caster's path | The caster carries it, and passes it to the first unit it moves next to | It copies to every unit the caster passes next to |
| On a link | When a linked unit moves next to another unit, that unit takes its place in the link | A second link forms instead, and the first stays |
| Through a gate | A burst: whenever a unit goes through, everything within 1 hex of it goes too | The burst reaches 2 hexes |
| On a summon | At the end of the round, what its spell passes on goes to a unit next to it | This round, every unit next to it gets a copy |
| On a shield | The shield passes to the next ally the bearer moves next to | This round, that ally gets a copy and the bearer keeps the shield |
| On ground | A unit pushed out of it drags it along every hex it crosses until it lands | It also spreads in every direction at the end of the round (Proposed: 2 hexes) |
| On a spell | The enemy's next spell is held on its caster, and goes off at the end of its next turn on whoever holds it | Open |
| Whole battlefield | This round, every effect on a unit passes when its carrier moves or is pushed | Each pass copies instead of moving |

### Life

**Decided (Jared, Nov 8): Life takes root.** The spell grows while its caster
stays put. It is rooted in the caster, not the target, so a stun or a root
can't keep itself going, and it works the same on every output kind. The game
is the caster's choice between moving and letting the spell grow, and the
enemy's answer is to move the caster.

**Decided (Jared, Nov 8): what can't grow stronger grows longer.** A binary
effect, such as a stun, a charm or hiding, gains duration instead of
strength.

**Decided (Jared, Nov 8): Life's cells.** The numbers are preliminary: the
spell grows a step for each round its caster stays put, before or after
casting, up to double. Moving, or being moved, resets it.

| Output | Life as a minor rune | Empowered |
| --- | --- | --- |
| At a destination or on a unit | An instant hit is a step stronger for each round the caster stood still before casting; a lasting effect keeps growing after it lands | It starts fully grown |
| Along the caster's path | The path is a hex longer for each round the caster stood still first | Full length at once |
| On a link | It grows each round the caster stays put | It starts fully grown |
| Through a gate | It stays open a round longer for each round the caster stays put | It opens at full duration |
| On a summon | It grows a step each round its caster stays put | It arrives fully grown |
| On a shield | It thickens each round its caster stays put | It starts at full strength |
| On ground | It grows in strength, or lasts longer, each round its caster stays put | It starts fully grown |
| On a spell | The enemy's next spell is a step weaker for each round the caster has stood still, down to half | Half at once |
| Whole battlefield | This round, every spell grows with its caster's stillness, on both sides | Each round of stillness counts twice |

### Death

**Decided (Jared, Nov 8): Death siphons the air.** When the spell is cast, it
drains a rune of the caster's choice from the air and gets that rune's minor
rune cell for its own output kind, as if it carried that rune. So its row is
one rule in every cell. It works on any spell, since the air is global.

**Decided (Jared, Nov 8): empowered, it gets the drained rune's empowered cell
instead.** That spends two runes from the air, Death and the one it drains.

Jared wants it playtested (Nov 9). What keeps it from always being the best
pick: the rune it wants has to be in the air when it is cast; it gets the base
cell only, unless empowered; and draining denies the rune to allies as well as
enemies. Where it could still dominate: an air that usually holds several
runes with four players filling it, and a roguelike run that never offers the
rune you need. Levers if playtests show that (Proposed): the borrowed cell
lands at half strength, or the air holds fewer runes at once.

Proposed (Nov 8): with nothing in the air, Death does nothing; and it can't
drain Death itself.

Turned down for Death (Nov 8): spells that go off again from a fallen unit
(duplication), filling the air when units lose health (works only for
damage), and filling it when the spell ends (not a siphon).

## Open

- [ ] How System C sits beside System A and System B in the playtest.
- [ ] Frost's minor rune row. Frost was set aside earlier on Nov 8;
      Jared took it up again on Nov 9.
- [ ] Temporal's empowered cells on a gate and on a spell.
- [ ] How Life's empowered "starts fully grown" on anything that lasts (a
      lasting effect, a gate, a summon, a shield, ground) meets the rule that
      an empowered effect on a lasting output holds only for the round it is
      cast; whether "resets" drops a grown effect back to its base or only
      stops its growth; and whether the repeated "starts fully grown" cell
      needs another pass, given the per-cell rule.
- [ ] Which conditions a readied spell can wait for, beyond the first two.
- [ ] A pass over every rule here that leans on enemies showing their next
      move, once Jared settles whether they do (Open in the
      [overview](overview.md#battles)). Among them: Temporal's readied
      condition, and the cells on a spell for Revelation, Spatial and Stone.
- [ ] Revelation's row, which is Proposed and set aside to come back to, and
      whether Revelation and Illusion need more counterplay against each
      other (Jared, Nov 8).
- [ ] The name of Stone's raised stone.
- [ ] Where the stat dial lives, and how it is priced.
- [ ] The table of runes against board states, and whether it needs materials
      that aren't runes (water, oil). First rows from the survey: fire ignites
      oil, water conducts lightning, cold freezes water.
- [ ] A second pass over the rows worked out before the two new output
      kinds (Air, Illusion, Spatial, Stone, Revelation, Temporal), to fill
      their cells along the caster's path and on a link.
- [ ] Fire's cells other than on ground and through a gate, and the
      contagion rules above.
- [ ] Whether enemies always spend a rune from the air when their move can
      use it, as Gloomhaven's monsters do, so their shown move tells you.
- [ ] Spatial's empowered cell on a spell (an enemy would avoid an entrance,
      so it needs a rule that doesn't rest on their choice).
- [ ] Fire's empowered ground spreads ground, and Spatial's empowered ground
      spreads its free movement to touching ground: check they stay
      distinct.
- [ ] How enemy AI reads and uses illusions (Jared, Nov 8: it has to take
      them into account).
- [ ] Illusion's cell on a spell, the weakest of its row.
- [ ] Which of System B's rules carry over: inscriptions, triggers, tethers,
      linking, ground, and the conflict and order rules.
- [ ] How many minor runes a spell can hold, and how that grows.
- [ ] How several minor runes on one spell combine.
- [ ] Where the line falls between Frost and Temporal, which both slow (System
      B's Frost takes away the bonus move), and between Air and Spatial:
      Spatial's core is now where spells come from, but its ground cell still
      moves units. Frost's
      cell on a spell can't be System B's slide, which is now Air's empowered
      cell.
- [ ] Whether System C needs a Blank rune for spells that only move things,
      now that Air pushes and pulls and there are no centers (System B keeps
      its Blank row).
- [ ] Progression: Jared leans toward a roguelike where the number of runes in
      a recipe is the gate. His Nov 8 sketch: the game opens with one-rune
      spells, varied enough that crafting them is a game of its own and
      teaches the minor runes; then discovery begins, first with AA (your
      spell, but better), and then it opens the dozens of unique spells,
      which crafting then changes. Not decided.
- [ ] How the budget model prices an authored spell and its crafting.
