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
Life and Death, Stone and Air, Revelation and Illusion, Space and Time. There
is no Summon rune. Proposed: each rune does two jobs, as an ingredient in
recipes and as a minor rune with its own table.

Each rune takes in some of System B's 16, or in Air's case the job of
pushing and pulling (Decided, Jared Nov 8). The minor
ideas below, other than Air's, are candidates carried over from the 16-rune
tables in the [rune reference](rune-reference.md) (Proposed); choosing one per
rune is the audit still to come.

| Rune | Opposite | Takes in | Minor idea so far |
| --- | --- | --- | --- |
| Fire | Frost | Fire | Spreads |
| Frost | Fire | Frost | Slick |
| Life | Death | Mend | Spares allies |
| Death | Life | Wound | Finishes |
| Stone | Air | Stone, and protection (Protect) | Anchors, or a shield from what the spell did |
| Air | Stone | Pushing and pulling units | Pushes or pulls (Decided, below) |
| Revelation | Illusion | Revelation, Dispel and Expose: it shows what is true, so it strips what is false or hidden and lays weak points bare | Pierces, can't be undone, or seeks hidden units |
| Illusion | Revelation | Invisibility, Amplification and Diminishing: the school of buffs and debuffs | Unseen (stronger and shorter cooldown are stat dials now) |
| Space | Time | Portal | From elsewhere |
| Time | Space | Haste and Slow | Drawn out (quick cast is a stat dial now) |

## Recipes

**Proposed (Jared, Nov 7, to confirm as Decided): every recipe shape has a
job,** and none is ruled out, only different:

| Shape | Its job |
| --- | --- |
| One rune (A) | The basic spell of that rune |
| Two or three of one rune (AA, AAA) | The archetype of that rune's school, scaled up |
| Two runes (AB) | A spell of two schools |
| Two of one rune and one of another (AAB) | The AB spell, focused and scaled toward A |
| Three runes (ABC) | A unique mechanic, whose uniqueness is its power |

**Decided (Jared, Nov 8):** summons come from recipes, not from a rune of
their own.

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

**Proposed (Nov 8): the output kinds are System B's seven,** without the
center: an effect at a destination or on a unit, through a gate, on a summon, on
a shield, on ground, on a spell, and across the whole battlefield. A new kind is
added only when an authored spell can't be described by one of these, since
each kind costs a cell for every minor rune.

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

**Decided (Jared, Nov 8): stat dials are not minor runes.** Plain changes to a
number, such as casting as a bonus action, a shorter cooldown or a stronger
effect, move to a dial of their own (Open: where it lives). The Nov 8
spell survey found eleven, among them damage up or down,
range, cooldown, cost, maximum health, damage reduction and speed.

Randomness (except in accuracy) and charm or domination are allowed in minor
rune effects and spells, as in the whole game (Decided, Jared Nov 8; see the
[overview](overview.md#battles)).

### Air

**Decided (Jared, Nov 8): Air pushes or pulls,** chosen when you craft, and
the Push and Pull inscriptions are removed.

**Proposed (Nov 8): Air's cells.**

| Output | Air as a minor rune |
| --- | --- |
| At a destination or on a unit | Units hit are pushed (or pulled) 1 hex from where it landed |
| Through a gate | Each arrival shoves units next to the exit 1 hex away (or draws them 1 hex in) |
| On a summon | Its attacks push or pull 1 hex |
| On a shield | Units that hit it from next door are pushed 1 hex back (or pulled in) |
| On ground | A current: units in it move 1 hex each round in the direction it was cast |
| On a spell | Its area is nudged 1 hex in a direction you choose |
| Whole battlefield | A gale: every unit is moved 1 hex downwind each round |

**Proposed (Nov 8): two board rules make pushing a game.** A unit pushed into
a wall or another unit takes damage, and so does the unit it hits. A unit
pushed into ground is affected by it at once.

## Open

- [ ] How System C sits beside System A and System B in the playtest.
- [ ] Each of the other nine runes' minor rune row, starting from the
      [16-rune tables](rune-reference.md) for the runes each one takes in.
- [ ] Where the stat dial lives, and how it is priced.
- [ ] The table of runes against board states, and whether it needs materials
      that aren't runes (water, oil). First rows from the survey: fire ignites
      oil, water conducts lightning, cold freezes water.
- [ ] Whether a spell aimed at ground already on the board (to transform,
      consume or swap it) becomes an eighth output kind.
- [ ] Which of System B's rules carry over: inscriptions, triggers, tethers,
      linking, ground, and the conflict and order rules.
- [ ] How many minor runes a spell can hold, and how that grows.
- [ ] How several minor runes on one spell combine.
- [ ] Where the line falls between Frost and Time, which both slow (System
      B's Frost takes away the bonus move), and between Air and Space, which
      both move units (Air pushes and pulls; Space was Portal).
- [ ] Whether System C needs a Blank rune for spells that only move things,
      now that Air pushes and pulls and there are no centers (System B keeps
      its Blank row).
- [ ] Progression: Jared leans toward a roguelike where the number of runes in
      a recipe is the gate (one-rune spells first, then pairs, then trios, with
      crafting between). Not decided.
- [ ] How the budget model prices an authored spell and its crafting.
