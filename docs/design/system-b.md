# The Hollow: System B rules

System B builds a spell as a freeform sigil, inspired by Witch Hat Atelier. It
is one of the two crafting systems Jared will A/B test (Decided Nov 3); the
other is [System A](system-a.md). What each rune does is in the
[rune reference](rune-reference.md), what a spell costs is in the
[budget model](budget-model.md), and how a sigil compiles and runs is in the
[engine model](engine-model.md).

Everything here is Proposed unless marked otherwise. Working words are
placeholders unless the [glossary](#glossary) marks them as Jared's.

**The runes are becoming ten (Decided, Jared Nov 8;** see the
[rune reference](rune-reference.md#the-ten-runes)). The rules here still name
the 16 runes they were written for. Where a rule belongs to a rune that folds
into another (Portal's gate, Protect's shield, Summon's summon and totem,
Dispel targeting a spell), which of the ten takes it over is Open.

## The parts of a sigil

**Decided (Nov 3).** A sigil has:

- a **major rune**: what the spell is (an item you can trade);
- **minor runes** around it: what it adds (items you can trade);
- **inscriptions** (Jared's name): shape, range, targeting, timing and movement.
  Inscriptions are learned by playing, permanent and never traded, so they take
  over the progression role sigils play in System A.

**Decided (Nov 4).** A major inscription applies to the whole sigil; a minor
inscription attaches to one minor rune (Jared's terms). Minor inscriptions unlock
at a later Level, minor Who and When first, minor Where after.

**Proposed (Nov 3)**

- Sigil size (the number of slots around the center) grows with Level. It is the
  power budget and keeps early choices small. Inscriptions use sigil slots too,
  so they are never free power.
- Cooldown comes from sigil size plus inscriptions, so swapping in a better rune
  never changes it. Adding a rune makes a new spell.
- Surrounding runes never narrow the center to particular runes or states: Dispel
  with Fire in the ring doesn't become "dispels only fire". Mend's minor rune,
  which spares allies, is the deliberate exception (Jared, Nov 6).

**Open:** how sigil size grows with Level; whether inscriptions can also drop as
loot (more trading) or stay learned only (protects progression).

## What the center makes, and what the ring does

**Decided (Nov 4): minor runes modify the major output.** Minor runes never act
on their own. They modify what the center produces, so swapping a rune between
the center and the ring always makes a different spell.

- A summon, portal or protect center always makes its summon, gate or shield,
  wherever it's aimed on the battlefield. **Decided (Jared, Nov 5 and 6):** the
  exception is lingering on a place, which makes that rune's ground instead:
  Portal ground, Summon's cloud and Protect's warded ground (see
  [Ground](#ground)). A gate, summon or shield that lasts longer comes from minor
  runes, such as Summon's totem or Stone.
- Any center aimed at a spell outputs an altered spell.
- A plain-effect center outputs an effect: on a place, on a unit, or (across the
  whole battlefield) a global effect.
- A lingering effect on a place makes ground (Decided, Jared Nov 6), and so does
  a wall (Proposed Nov 4); see [Ground](#ground).

**Decided (Nov 5)**

- A rune's major output stays unique to the center, and minor runes always do something
  different. Combos (such as a healing portal) come from [linking](#linking).
- On a major output (a gate, a summon, a shield, ground), minor runes change the
  output itself rather than adding an effect to it. This is a useful guide, not a
  hard rule (Jared, Nov 5): Wound on a gate and Dispel on a summon add effects.
- Every rune gets a meaning in every major output type.
- **The design philosophy (Jared, Nov 5).** The major output is the rune's core.
  Each rune has one ring idea that runs through every major output type (Fire
  spreads, Expose pierces), so a player can guess what a minor rune does somewhere
  new. Minor runes change mechanics rather than adding stats. Minor runes are
  cheaper, so a strong one is paid for in the spell's size and length.
- Only a Dispel center can target a spell, and its minor runes decide what
  happens to that spell.
- **Allowed for now (Jared, Nov 6):** a few minor rune effects still repeat
  their rune's major output: Mend's weak heal on a unit, Protect's shield at a
  destination and on a spell, and Frost's ice at a destination.
- When Fire repeats or copies something (a second hit, a summon's copy, a
  repeated strip), only the major output repeats, without the minor runes
  (Jared, Nov 5).

**Decided (Nov 4): a minor rune that matches the center adds strength to the
center,** like a duplicate.

### The major output types

Which major output type a minor rune reads depends on what the center made. There are eight:

| Major output type | Used when |
| --- | --- |
| At a destination | The center makes an effect on an area |
| On a unit | The center makes an effect on one unit; also each end of a tether (Decided Nov 5) |
| On ground | A lingering area effect, or a wall |
| Through a gate | A Portal center |
| On a summon | A Summon center |
| On a shield | A Protect center (Decided Nov 5: minor runes change the shield itself) |
| On a spell | A Dispel center aimed at a spell |
| Global modification | The whole-battlefield shape (Jared's name) |

A major output type is a kind of major output, not a target. A new mechanic adds a major output type
only when it creates a recipient that can't be described as one of these. Every
new major output type needs a minor rune effect from every minor rune, so new major output types are the expensive
kind of addition. For example, an aura that follows a unit is still a place, so
no new major output type; a projectile that stays on the board is a body, unless it can't
be attacked.

**Proposed: each kind of major output declares how it spreads over a shape:** one per
hex (summon, budget split), as a footprint (gate), one per unit in the area
(shield), or as an area effect (hit). That's a small table of major output types by shapes,
plus major output types by destination count, and the audit sweep fails any cell with no rule, so a
new shape or a new kind of major output can't ship with an undefined combination.

## Reading a sigil

- With no shape inscription, a spell hits a single target in range. That default
  is free.
- Inscriptions decide the destinations, in order. A burst has 1, a dash or leap has 2
  (start and landing), a chain has 3, and each extra-destination inscription adds one.
- The ring splits into one section per destination. Minor runes act at their section's
  destination, in clockwise order, and direction is measured from that destination. With one
  destination the ring is a single section, so new players never see the split.
- A rune or inscription that needs two destinations (a portal, a tether) uses the
  caster as its second destination when the spell has only one.
- Each major rune defines how its ring is read. Summon: what the summon is made
  of. Protect: how the shield behaves. Portal: what happens to
  whoever goes through.
- **Decided (Nov 4):** gates and tethers with three or more destinations join each destination
  to the next.
- **Decided (Nov 4):** unit shapes (single, self, bolt, chain) can't be aimed at an
  empty hex, and a bolt that finds no unit does nothing. The sigil decides what a
  spell does, and the target only decides where. What's on the board changes the
  outcome only through the rune-by-state table. A spell that acts differently
  depending on its target would be its own designed mechanic.

## Inscriptions

### Shapes (one per sigil)

One shape inscription per sigil is the only true exclusivity. Runes with
geometry needs check against it (a portal needs two destinations).

- **Starter:** single target (the free default), self, bolt (stops at the first
  unit it hits), burst (a hex plus its 6 neighbours, at range).
- **Learned:** line (3 hexes, pierces and hits everything along it: Decided,
  Jared Nov 6, so it stays distinct from a bolt), cone (rows of 1, 2 and 3), ring (the
  6 hexes around a destination, not the destination), wall (3 hexes at range, leaves ground),
  dash (move up to 3 in a line; 2 destinations), leap (like dash, over units and
  obstacles; 2 destinations), chain (jumps to the nearest other unit twice; 3 destinations),
  large area (radius 2; costs 2 slots).
- **Whole battlefield (Decided Nov 4),** a global modification. It costs 3 slots,
  changes the rules of the whole battlefield for a few rounds, and affects
  everyone, your side included. **Decided (Nov 4):** it can't take an extra destination,
  more range or a trigger.
- **A spell (Decided Nov 4: targeting a spell is a shape).** It aims at an enemy's
  shown move or an ally's prepared spell: one spell per destination, and an extra destination
  adds a place. Being a shape, it can't combine with the whole battlefield. Only a
  Dispel center can use it (Decided Nov 5).
- **Decided (Nov 4):** a self-cast portal or tether is flagged as doing nothing,
  except that a self-cast portal with an extra destination moves you to that destination
  (Proposed Nov 4). A self-cast summon appears next to you.
- **Single-target bonus (Decided Nov 4 that one exists; the number is Proposed):**
  single target, bolt and self get about 15% more strength than a strict split,
  so they're the efficient choice against one target. Tuned in the
  [budget model](budget-model.md).

### Other major inscriptions

- **Extra destination:** stacks up to 3, one slot each (Proposed Nov 4). The budget
  spreads across destinations through expected units touched (Magic Missile is single
  plus 2 extra destinations).
- **More range.**
- **Delay.**
- **Lingering makes ground (Decided, Jared Nov 6).** That is its one job: a spell
  with lingering leaves its ground on the place it acts (see [Ground](#ground)).
  Anything else that lasts longer (a status, a summon, a shield, a global
  modification, a change to an enemy's spell) gets it from a minor rune, mainly
  Stone. This replaces the Nov 4 proposal that lingering made whatever the spell
  made last longer. **Open:** what lingering does on a unit shape (single target,
  bolt, chain).
- **Filters:** enemies only, allies only. **Decided (Nov 4):** filters don't work on
  ground, and filter balance in general is in question.
- **Push and pull (Decided Nov 5).** Push and Pull are inscriptions, not runes, so
  every player can make any spell shove units away or draw them in. Forced
  movement is paid from the spell's budget by hexes moved times units moved. On
  lingering ground they make a current or a whirlpool, and on a global spell a
  gale. On a gate, push shoves travelers out of the exit and pull draws nearby
  units into the entrance. A spell that only moves things uses the Blank rune in
  the center (Jared's name; its mechanics are Open).
- **Follows the unit (Proposed Nov 4):** an area anchored to a unit moves with it.
  A burst on yourself that follows you is an aura (Spirit Guardians). Proposed: this
  becomes an anchor choice under Where (a spell is anchored to a hex or to a unit).
- **Steerable (Proposed Nov 4, needs lingering):** spend a bonus action each round
  to move the area up to 3 hexes, or move a unit-shape effect to a new target in
  range (Moonbeam, Call Lightning, Witch Bolt).
- **Weakest first (Proposed Nov 4):** the spell touches units with the least health
  first, until its strength runs out as a health pool (Sleep, Colour Spray).
- **Tethers** and **triggers**, below.

**Decided (Nov 4): inscriptions act in intuitive, continuous ways.**

### Tethers

**Decided (Nov 4)**

- Tether is no longer a rune. It exists only as inscriptions.
- Anything that travels between two ends travels along a tether underneath, so
  the engine keeps one link.
- **Decided (Nov 5): a tether has no major output type of its own.** Its kind
  (copy, redirect, transfer) decides how the effect travels, and its minor runes
  read the "on a unit" table at each end. This replaces the "along a tether"
  major output type.
- Each way of routing an effect along a tether is its own inscription. They are
  the same tether underneath; in the UI they are separate inscriptions, each
  balanced on its own numbers (cost, share, range, duration). The names below are
  plain descriptions; Jared names them.

**Proposed (built into the crafter Nov 4).** A tether joins the first destination to the
next destination, or to you. Four kinds:

| Kind (placeholder) | What it does |
| --- | --- |
| Copy | Gives the spell's payloads to both ends for 2 rounds, at half strength at the far end (damage sharing) |
| Redirect | Sends them to the other end instead, for 2 rounds (a curse that moves damage onto its target) |
| Transfer | Turns damage the spell deals into healing at the other end, and moves statuses it removes (the vampire wraith) |
| Leash | Keeps the first end within 2 hexes of the other (a fourth kind, or drop it if it isn't fun) |

Presets in the crafter: life drain (wound
with transfer), vampire wraith (summon with wound and transfer), shared mend (mend
with copy) and bodyguard (summon with leash). A tether on a spell keeps its old
meaning as copy on a spell.

**Open (Nov 6): snap-back needs a new home.** The Nov 4 proposal made it a
lingering move (a move that undoes itself when it expires, such as a yank that
lets go), but lingering now only makes ground.

**Open:** what redirect, transfer and leash mean on a spell; whether a tether on the
whole battlefield is refused (the tools refuse it for now); a new home for the old
global tether minor rune effect (splash damage to neighbours); what the transfer tether does
with an action taken from one end.

### Triggers

- A set of trigger inscriptions, each naming an event: when it's hit, when
  something enters, when it's moved, when it drops below half health, when it
  attacks, and (Proposed Nov 4) when it dies and when it would drop to 0.
- The spell's destination decides whose event it watches.
- A trigger spell waits through the next enemy phase, fires once, then goes on
  cooldown. Triggers let players answer an enemy's shown move before it lands.
- **Who a trigger hits (Proposed Nov 4):** on an event between two units (an attack,
  a hit), harmful runes land on the other unit and beneficial ones on the watched
  unit. So a smite is self, plus the trigger "when it attacks", plus the rider as
  the center.

### Minor inscriptions

A minor inscription attaches to one minor rune (Decided Nov 4, above). Proposed
Nov 4:

- **Minor Who or When** (filter, delay, lingering, trigger): the minor rune still
  modifies the major output, using its normal minor rune effect, but only for those units
  or at that time. Example: fire center, burst; wound in the ring with a minor
  "enemies only". Everyone in the burst burns, and only enemies are finished off
  at the fixed amount of health.
- **Minor Where** (a shape, more range): the minor rune becomes a small sub-effect
  anchored on the output. It uses its own major output, over its own region,
  positioned relative to the anchor (a destination, a unit, or a major output). It is still a
  modification of the output, because it can't exist without the anchor.

Examples: a summon that breathes fire (summon center, bolt; fire in the ring with
a minor cone: each round the summon breathes a cone of fire at the nearest
enemy), and a chain explosion (fire center, chain; wound in the ring with a minor
burst at each hop).

Rules that keep it from getting fiddly:

1. Minor Where needs an anchor with a position. It isn't allowed when the output is
   a global effect or an altered spell.
2. Minor inscriptions can't set the output: no minor "targets a spell" or "whole
   battlefield".
3. Depth one: a sub-effect can't carry its own minor inscriptions.
4. Every write touches only its own record. Shaping the main area doesn't grow a
   sub-effect's burst.
5. A unit is hit by the same sub-effect at most once per cast, so overlapping
   chain bursts don't stack.
6. Same slot cost as a major inscription, and the budget is shared: more
   sub-effects means weaker ones.
7. Things that carry sub-effects aim with a simple fixed rule (nearest enemy, or
   the caster's last target).
8. Ordering stays computed: a sub-effect reads positions at its anchor, so a mover
   before it changes where it lands.

What it adds: little in the engine (anchors, sub-effects, the scoping rule),
nothing in content (no new minor rune effects), and a lot in the forge UI and in teaching.

**Open:** names for the new inscriptions and triggers.

## Linking

**Decided (Nov 3)**

- Multimodal spells come from linking (like Ars Nouveau or Oblivion: a projectile
  that raises a wall where it lands).
- Linking is done by special high-level items, separate from runes (name to be
  decided). They decide the trigger and how the parts connect.

**Decided (Nov 5).** A linked spell is one spell with a more complex shape. Its
budget is a single spell's times a link multiplier, about 1.5 to start. Casting it
costs the action and the bonus action, or only the action with Haste's quick cast
in the ring. The linked spell's own shape decides how many of the first spell's
results it lands on: single 1, chain up to 3, an area all of them.

**Proposed**

- Linking at the last destination: the second part casts from where the first ends (where
  a projectile lands, a dash stops, a mark erupts), and direction carries over (a
  wall forms across the projectile's path).
- A linked spell's cooldown is the sum of its parts (Nov 3).
- Chains are 2 parts long (maybe 3 at high Level). The whole chain counts as one
  recipe in the forge.
- Minor inscriptions or linking: if the second part needs its own center (a
  different kind of output, like a wall after a projectile), it's linking. If it
  decorates the first output with its own where, when or who, it's a minor
  inscription. Some results can be built both ways; the linked version is
  stronger and costs more.

| | Minor inscriptions | Linking |
| --- | --- | --- |
| Job | Decorate one output: things that happen at, around or from it | Sequence two outputs: cast a second spell from where the first ends |
| Budget | One, shared (self-balancing) | A single spell's times the link multiplier |
| Grammar | Same sigil, same record, sub-effects | A linking item that sets the trigger (last destination, on hit, on kill) and carries direction |
| Cost to the player | A slot | A rare linking item, the action and the bonus action, and summed cooldowns |
| Example | Fire chain with a burst at each hop | A bolt that raises a wall where it lands |

**Open:** names for linking items and the set of trigger types; whether linking
items are tradable like runes or bound like inscriptions.

## Ground

**Decided (Jared, Nov 5 and 6).** A lingering effect on a place is ground. This
includes a lingering Portal, Summon or Protect on a place, which makes the ground
in the table below rather than a gate, summon or shield.

**Proposed (Nov 4).** A wall always leaves ground. Ground can't be attacked,
except Summon's cloud (below), which is a summon.

**Decided (Nov 5): the major rune sets what the ground does, and the minor runes
change it.** The ground is the major output, lasting: lingering Fire is burning
ground, and Fire's major output lands again on whoever is in it. The minor runes
become the ground's aspects, which don't depend on order, and change the ground
itself (it spreads, it's slick, it can't be seen). Proposed (Nov 4): the ground
acts when a unit steps onto it, stands in it at round end, or leaves it.

**Decided (Jared, Nov 5): the ground each major rune makes.** Filters don't work
on ground, so it acts on both sides. The budget spreads its strength over the
rounds it lasts, and a binary ground reaches only as many units as the budget pays
for, nearest first.

| Major rune | The ground it makes |
| --- | --- |
| Fire | Burning ground: units in it start burning |
| Frost | Ice: units in it lose their bonus move |
| Mend | Healing ground: it heals everyone in it, enemies included |
| Wound | Harmful ground: it damages everyone in it, more to units below half health |
| Protect | Warded ground: units in it at round end gain a small shield |
| Expose | Units in it take more damage and heal less |
| Portal | A unit in it can travel to any hex of it without spending movement |
| Summon | A cloud over the area that blocks line of sight through it. It is a summon, so any hit inside the area hits it, and it can be killed or dispelled |
| Dispel | Statuses can't stay on units in it, and spells aimed into it lose minor runes |
| Stone | Rock that blocks movement, crumbling to rubble (rough ground) when it ends |
| Amplification | Units in it deal more damage and give more healing |
| Diminishing | Units in it deal less damage and give less healing |
| Haste | Units that start their turn in it get an extra move, once per round each. Only the first one or two, as the budget pays: a balance point to watch in playtest |
| Slow | While a unit stands in it, it can't take actions, but it can still move |
| Invisibility | Units in it are hidden |
| Revelation | Units in it can't hide, and enemies in it show their next move exactly (area, pushes and side effects) without deciphering (to playtest) |

Keeping a ground going is the totem's job (Summon as a minor rune), so Summon's
own ground is the cloud rather than something that refreshes.

**Proposed (Nov 4):** units that die leave **remains**, a kind of ground, and a summon raised on remains
is stronger.

**Decided (Nov 4):** battlefields start with terrain players can reshape, and filters
don't work on ground. The one exception is Mend as a minor rune, which spares
allies from a ground's harmful effects (Jared, Nov 5, to playtest). How grounds stack, replace each other or react is future
expansion.

**Proposed (Nov 4): three ways a player shapes terrain.** Make it (any area spell
with lingering leaves ground; its major rune sets what the ground does and its
minor runes change it, Decided Nov 5). Change what's
already there (aim a sigil at existing ground and its runes react with it through
the rune-by-state table: fire on ice clears it, dispel removes it). Change it
everywhere (a global modification rewrites terrain rules).

## Gates and summons on area shapes

- **Decided (Nov 4): gates on area shapes.** A gate's shape is its footprint. The
  area at the first destination is the entrance, and units come out at the other end in
  the same layout, turned to face away from the entrance. Anyone in the area when
  it's cast goes through, and so does anyone who steps on those hexes that round.
  With no extra destination the exit is you, so units in front of you come out behind
  you (the mirror). Relocating a whole area is powerful, so it is balanced in the
  [budget model](budget-model.md).
- **Decided (Nov 4): summons on area shapes.** A summon appears on every hex of the
  area, and the spell's power budget is split between them, so more summons means
  weaker summons. Every summon takes one hex.
- **Proposed (Nov 4):** a summon aimed at a unit sets that unit aside and puts a
  body made from the ring in its place. The unit returns when the body dies or the
  spell ends (Polymorph, and Banishment with a bare body).

## Conflict and order rules

- Runes change targets, inscriptions change the spell (so a delay inscription and
  a hasten rune never collide).
- Every rune fires once per cast; nothing re-triggers, and chains stop at a fixed
  depth.
- A duplicate rune adds strength, never extra copies.
- A unit standing exactly on the destination is pushed in the spell's direction of
  travel, or stays put on a self-cast.
- **Decided (Nov 4): beneficial effects go to allies first and harmful effects to
  enemies first,** wherever a rune has a choice of recipient (a summon's
  neighbours, a tether's two ends). An area still hits everyone standing in it,
  so friendly fire stays on.
- **Decided (Nov 5): a shield's minor runes are order-free aspects that change the
  shield itself** (see the [rune reference](rune-reference.md#minor-rune-effect-on-a-shield)).
  This replaces the Nov 4 rule that they fired when the shield was hit.
- **Decided (Jared, Nov 6): opposite runes don't cancel.** After the ring review no
  pair of minor rune effects are true opposites, so two opposite runes in a sigil
  both apply. Opposite pairs still matter for the runes themselves (loot,
  trading, and what Dispel undoes).
- **Order (Proposed Nov 4).** Whether ring order matters is declared on each minor rune effect,
  not on the rune, because the same rune can be a step in one place and an aspect
  in another. Each minor rune effect declares what it reads and what it changes. Two
  neighbouring runes swap freely when neither changes something the other reads;
  health, statuses, terrain and aspects simply add up. On a summon, on ground, on
  a shield and on a global effect, every minor rune is an aspect, so order never
  matters there. The engine computes it (see the
  [engine model](engine-model.md)).
- **Proposed:** the forge sorts runes whose order doesn't matter before computing
  the recipe, so both orders are one spell (same look and discovery credit), and
  draws interchangeable runes joined in the ring.

**Open:** can a filter inscription (enemies only, allies only) narrow a global
modification? Mend's minor rune effect already spares your side from one (Decided
Nov 5, as on ground).

## Cooldowns for similar spells

**Decided (Nov 4): A/B test two cooldown rules,** to stop duplicate spells dodging
cooldowns.

- **Option 1:** spells with the same major rune share a cooldown. Simpler, but it
  leaks: fire in the ring of another spell still burns, so it dodges a
  fire-center cooldown.
- **Option 2:** cooldowns sit on runes, not recipes. Casting a spell puts its center
  rune on cooldown for the spell's full cooldown and its minor runes for one round,
  and a spell can't be cast while any of its runes is cooling down. It closes the
  leak but locks more of your hotbar after a big cast.

Grouping spells by how similar their compiled effects are would be accurate but
hard to predict. Runes are consumed when learning, so every copy of a spell costs
runes too, and the audit tool checks the strongest possible hotbar against the
battle budget.

## Rune or inscription? Four tests

1. Does it do something on its own (damage, move, create, change a unit)? Then it's
   a rune. Does it only change where, when, to whom or how often the runes act?
   Then it's an inscription.
2. Grammar: runes are the nouns and verbs. Inscriptions are the little words: at,
   when, after, only, twice.
3. Universality: an inscription has to make sense with every major rune. If a
   mechanic only makes sense with some, it's a rune.
4. Ownership: should players farm, trade and spend it? Rune. Unlock it once and
   keep it? Inscription.

Examples: casting again next round is an inscription (when). Invisibility is a
rune (a status on a unit). Reflecting attacks is a rune whose major output is
shield-like. An aura that follows the target is an inscription (where). A
counterspell is a rune, and its recipient is the "on a spell" major output type.

## Worked examples

- **Area portal (Nov 3).** Center portal, the pull inscription, and inscriptions for
  an area at range and a second destination. Everyone in area A is pulled to its center,
  then moved through the gate to destination B in the same formation (nearest free hex if
  one is taken). It hits allies too, unless a
  filter limits it. In System A the same spell needs a linking item, which makes
  it a good A/B test case.
- **Life drain.** Wound at the center, the transfer tether.

## Glossary

**Decided (Jared, Nov 5):** the names below marked Jared. A few working words
are still placeholders, so we can talk about the parts.

| Word | Meaning | Whose | Was called |
| --- | --- | --- | --- |
| sigil | In System B, the whole spell layout: center, ring and inscriptions. In System A a sigil is the form without its runes, so write "System A sigil" or "System B sigil" wherever both appear | Jared | circle |
| major rune | The rune in the center, which decides what the spell makes. Major and minor name the position, not a kind of rune: any rune can sit in either | Jared | center rune |
| minor runes | The runes in the ring around the center, which modify the major output | Jared | ring runes |
| center, ring | The two positions in a sigil: the center holds the major rune, the ring holds the minor runes | placeholder | |
| major output | The thing a major rune makes, itself: what that rune does in the center. Fire's is "burns the target now and next round"; Portal's is the gate it opens | Jared | thing, center meaning, central output |
| effect | The plain major output type: damage, healing or a status landing on units | Jared | |
| major output type | The kind of thing a major rune makes (Jared, Nov 5). The eight kinds a minor rune reads are in [the major output types](#the-major-output-types); the crafter's data calls them hook types | Jared | column, central output type |
| minor rune effect | What one minor rune does in one major output type | Jared | entry, hook entry |
| minor rune effect types | What a minor rune effect touches: positions, damage modifiers, health, statuses, terrain, aspects | Jared | channels |
| role | What a rune does as a group: plain effect, amplifier, mover, maker, remover | Jared | (had no word) |
| inscription | Shape, extra destination, range, timing, filter, trigger and so on | Jared | |
| major / minor inscription | For the whole sigil / attached to one minor rune | Jared | |
| destination | A place the spell acts; a burst has one, a dash two (start and landing), a chain three | Jared | point |
| section | The minor runes that act at one destination (an engine word) | Jared | |
| cohort | Neighbouring runes whose order doesn't matter | Jared | bundle |
| aspect | A minor rune that becomes a lasting property of a summon, ground or a shield | Jared | trait |
| primitives | The engine's building blocks (see the [engine model](engine-model.md)) | Jared | |
| property primitives | The seven properties every spell record has | Jared | |
| recipe, recipe id | A spell's identity: the sigil after sorting and merging | Jared | |
| global modification | A spell cast on the whole battlefield | Jared | |
| binary (effect) | An effect that is all or nothing, such as an extra action | Jared | |
| totem | The marker Summon leaves as a minor rune. It keeps a major output going or repeats it, as each minor rune table says. Summon is no longer a rune (Nov 8), so which rune leaves it is Open | Jared | |
| blank (rune) | The major rune for a spell that only moves things. Air takes over moving units (Nov 8); whether Blank stays is Open | Jared | |

The role names themselves (plain effect, amplifier, mover, maker, remover) are
placeholders.

## Open

- [ ] How sigil size grows with Level; whether inscriptions can drop as loot.
- [ ] Names for the new inscriptions and triggers, linking items and trigger types.
- [ ] Whether linking items are tradable.
- [ ] Tethers: redirect, transfer and leash on a spell; a tether on the whole
      battlefield; the old global tether minor rune effect; transfer and actions.
- [ ] Can a filter inscription narrow a global modification? Whether filters stay
      at all. (Mend's minor rune spares your side on ground and on a global
      modification, Nov 5.)
- [ ] How damage sharing is built (taking part of an ally's damage for a few
      rounds). The old example, a Protect center with the redirect tether, no
      longer works now that a Protect center makes a shield (Jared, Nov 6).
- [ ] What lingering does on a unit shape, and a new home for snap-back.
- [ ] Which of the ten runes takes over each rule written for Portal, Protect,
      Summon and Dispel, and whether the Blank rune is still needed now that
      Air takes over moving units (both listed in the
      [rune reference](rune-reference.md#open)).
- [ ] Names for the five roles (plain effect, amplifier, mover, maker, remover).
