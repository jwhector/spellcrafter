# The Hollow: engine model

How a System B circle compiles into something the engine can run, and why that
is enough to work out any circle's result. This is the doc to build from. The
rules it implements are in [System B rules](system-b.md), and what a spell costs
is in the [budget model](budget-model.md).

All of it is Proposed unless marked otherwise. Working words are placeholders
except "property primitives" (Jared's), "inscription" and "global modification".

## Summary

Every circle compiles into one **effect record**: a fixed set of property
primitives (output, where, when, who, what, how much, traits). The center rune and
the inscriptions **set** those properties; ring runes may only **add**, **remove**,
**scale** or **shape** them. The "what" is a list of calls to the engine
primitives, and each primitive declares which parts of the board it reads and
changes. From that alone the engine can work out the result of any circle, which
runes can swap places, which cancel, and what the spell costs.

It is closed, not complete: any circle built from today's runes and inscriptions
has a defined result. Future mechanics extend it at named points, each with a
known cost ([Extending it](#extending-it)).

The forge compiles a circle into a fixed list of steps. Battles and the forge
preview run the same list, and the list is the recipe's identity. An event queue
runs triggers, gates and lingering terrain.

## Board state

Everything a spell can read or change:

| Part | Holds |
| --- | --- |
| Positions | Which unit or thing stands on which hex |
| Health | Each unit's and summon's health |
| Statuses | Burning, chilled, shielded, exposed, encased, hidden, and so on, with durations |
| Damage modifiers | The numbers that change incoming and outgoing damage and healing (from Protect, Expose, Amplification, Diminishing) |
| Terrain | What each hex is: burning, ice, rubble, rock, ground with traits, and the remains of fallen units |
| Things | Gates, links, summons and shields, each with its own traits |
| Spells in waiting | Enemy intents and prepared (trigger) spells, each a circle |
| Global rules | Active global modifications and their remaining rounds |
| Listeners | Triggers and traits waiting for an event |
| Clock | Round, phase, and the order within the phase |

## Engine primitives

The only ways anything changes. Thirteen cover every entry written so far.

| Primitive | Reads | Changes |
| --- | --- | --- |
| Damage | positions, damage modifiers, statuses, health | health |
| Heal | positions | health |
| Move (push, pull, teleport, slide) | positions, terrain | positions |
| Apply status | positions | statuses (and damage modifiers for Protect, Expose, Amplification, Diminishing) |
| Place terrain | positions | terrain |
| Create thing | positions | positions, things |
| Remove (statuses, terrain, things) | everything it removes | statuses, terrain, things |
| Link | positions | things |
| Alter spell (strip runes, move its area) | spells in waiting | spells in waiting |
| Add global rule | nothing | global rules |
| Listen | nothing | listeners |
| Wait | clock | nothing |
| Set aside | positions | positions, things (takes a unit off the board and returns it later) |

Damage reads health (for Wound's extra damage to units below half health). Turn
order reads statuses (Haste and Slow), and so does targeting (Invisibility).
Listen can wait for: hit, enters, moved, below half health, attacks, dies, would
drop to 0, steps onto, ends turn in, leaves, and a spell aimed into an area.

A new entry that can't be written with these is the signal for a new primitive.

## Property primitives

Every spell effect is one record with these seven property primitives (Jared's
name). Nothing else describes a spell.

| Property primitive | What it holds | Possible values |
| --- | --- | --- |
| **Output** | The kind of thing the spell produces; this picks the column | effect on a place, effect on a unit, link, gate, summon, shield, altered spell, global effect, ground |
| **Where** | Ordered points, the region at each point, the origin, the anchor, and how the region changes over time | points from the shape; anchors: a hex, a unit, the other unit in a trigger event; region shapes: grow, shrink, sweep, close in, anchor, follow a unit, steer, jump between zones |
| **When** | Start, duration, repeats | now, next round, on a trigger; instant or N rounds; once or each round |
| **Who** | Which units it touches, in what order, and what carries it | everyone, enemies only, allies only; weakest first with a health pool; carried by nothing, a unit, or a summon |
| **What** | The payload: a list of engine primitive calls | damage, heal, move, status, terrain, create, remove, link, alter spell, global rule, set aside |
| **How much** | A magnitude for each payload item | set by the power budget, then scaled |
| **Traits** | Only for things (summons, gates, links, shields, ground): small effect records attached to the thing, each with its own When | "on hit", "each round", "on pass-through", "along the link" |

Traits are effect records inside an effect record, which is how a burning,
teleporting summon is described: a summon whose traits are "burn neighbours each
round" and "teleport once per round". Minor Where inscriptions generalize traits
into **sub-effects**: small effect records anchored on the output. Traits on a
summon are sub-effects anchored on a summon. Nesting stops at one level.

## Write modes and compiling

Every rune and inscription is a small list of writes to property primitives:

| Write mode | Meaning | Who may use it |
| --- | --- | --- |
| **Set** | Replace a value outright | Center rune and inscriptions only |
| **Add** | Append to a list (a payload item, a status, a terrain, a trait) | Center and ring |
| **Remove** | Delete from a list (statuses, terrain, things, a spell's runes) | Center and ring |
| **Scale** | Multiply a magnitude or a duration (stronger, weaker, longer) | Center and ring |
| **Shape** | Transform Where or When (grow, shrink, sweep, close in, anchor, follow, repeat) | Center and ring |

"Ring runes modify the center's output" is exactly the rule that **ring runes never
use Set**. That's why Stone can feel like an inscription on a global effect: it
shapes Where and When (anchor, last longer), while an inscription sets them.

**Compiling a circle, in order:**

1. The center rune sets Output (from its thing, or from the target: a spell or the
   whole battlefield) and adds its base payload.
2. Inscriptions set Where (shape, extra point, range), When (delay, lingering,
   trigger) and Who (filter, order).
3. The output picks the column. Each ring rune's entry in that column is its list
   of writes.
4. Ring entries apply section by section, in clockwise order, after duplicates
   merge.
5. The forge sorts writes that can swap (below), scales magnitudes to the circle's
   budget, and hashes the result: the recipe id.

**Running it in battle:** at the start time, for each point in order, the payload
runs as primitive calls against the units Who and Where allow. Things persist and
register their traits as listeners. Global rules register with their duration.
Events go through a queue; each listener fires once per cause, and chains stop at
depth 3.

## The combination math

**When two neighbouring ring runes can swap.** Look at the writes each entry makes,
and at what its payload's primitives read and change:

- **Add with Add:** swap freely. Lists merge.
- **Scale with Scale:** swap freely. Multipliers multiply.
- **Shape with Shape on the same property:** they combine (an anchored region that
  closes in). Inverse shapes cancel: grow and shrink, sweep and close in, delay and
  repeat sooner.
- **Remove with anything that adds to the same list:** order matters (clear then
  ignite is not ignite then clear).
- **Payload calls:** two calls swap unless one changes something the other reads.
  A move changes positions, and damage reads positions, so a push then fire is not
  fire then a push. Expose changes damage modifiers, and fire reads them; Mend
  doesn't, so Expose and Mend swap. Damage modifiers add up, so Expose and Protect
  swap with each other (and cancel).

This replaces hand-declared "order matters" flags: the engine computes it from the
primitives an entry uses.

**Inverse adds cancel.** Fire and Frost statuses in the same bundle cancel, as do
Mend and Wound, Protect and Expose. The forge flags them as wasted. This only
applies where both entries in that column are true opposites on the same
recipients (Decided Nov 4: at a point, on a unit, through a gate).

**Duplicates scale.** A rune twice in a section becomes one write with its
magnitude scaled up. A ring rune that matches the center scales the center the
same way (Decided Nov 4).

**Cost** is the [budget model](budget-model.md): value from dimensions, measured on
the fixed test boards, and the forge scales magnitudes until the cost fits.

**Identity.** Two circles are the same spell when their compiled records are equal
after sorting the writes that can swap. That's the recipe id.

## Rune essences

Each rune has one essence that it expresses through whichever property
primitives the output leaves open. An entry is that essence applied to one output
kind, so new entries can be written consistently. Where an output has no use for a
rune's What (a global effect has no single target to burn), the essence lands on
Where or When instead.

| Rune | Essence | What (payload) | Where (shape) | When (shape) | Who / How much |
| --- | --- | --- | --- | --- | --- |
| Fire | burning | burn status, burning terrain | | | |
| Frost | cold, slowing | chill status, ice terrain | | goes off later | |
| Mend | restoring | heal | | | |
| Wound | harm | damage | | | |
| Protect | warding | shield status | | | scale down for allies |
| Expose | weakening | exposed status | | | scale up |
| Portal | elsewhere | teleport, alter spell area | add a point, jump between zones | | |
| Summon | embodiment | create a body | | repeat each round | carried by a summon |
| Dispel | undoing | remove, strip spell runes | | | |
| Stone | permanence | rubble terrain, encase | anchor | last longer | |
| Amplification | putting out more | outgoing damage and healing up | | | scale up |
| Diminishing | putting out less | outgoing damage and healing down | | | scale down |
| Haste | tempo | extra move or action | | goes off sooner, repeats | |
| Slow | lost time | lose next action (cancels a shown move) | | goes off a round later | |
| Invisibility | unseen | hidden status | | | single-target shapes can't pick it |
| Revelation | seen | removes hidden, blocks it a round | | | |

Push and Pull had the essences "away" and "toward"; they live on as the Push and
Pull inscriptions. Tether's "connection" lives in the four tether inscriptions.

**Proposed: what empty cells mean, and how a rune finds its meaning.** An empty cell
is not a gap. It means the rune never works through that property, and it never
needs filling, because a rune only needs one property that the output leaves open.
For each output, the forge tries these in order:

1. What, on the output's own recipients.
2. What, re-aimed at the nearest unit the output involves: the spell's caster, a
   gate's travelers, a summon's neighbours, a shield's attacker.
3. Where or When, if the rune has an entry there.
4. If nothing fits, the rune does nothing in that column, and the forge flags it as
   wasted rather than inventing a meaning.

With the current sixteen runes, step 2 always succeeds, because every rune has a
What that works on a unit. Step 4 only matters for a future rune with no What of
its own (a pure shaping rune, which may be what Blank becomes). That rune would
need its own entry in each column, or the forge would refuse it where it has none.

## Worked example: Stone, three ways

One essence (permanence), three outputs:

```
stone at center, burst          Output=effect on a place   What+=[rubble terrain]
fire center + stone ring        What+=[burn, burning terrain]; When: scale duration +1; What+=[rubble at edge]
fire center + whole battlefield + stone ring
                                Output=global effect  What+=[rule: burning lasts longer]
                                Where: shape anchor(one region); When: scale duration
```

## Extending it

**Closed, yes.** Every circle built from the current runes and inscriptions
compiles into one effect record, and every record runs through the thirteen
engine primitives. So the result of any circle is defined, with no improvising.

**Complete, no.** New mechanics extend the language at four points, ranked from
cheap to expensive:

| Extension | Example | What it costs |
| --- | --- | --- |
| New rune or inscription using existing pieces | a rune that deals damage and spreads like a chain | one row in each column |
| New engine primitive | swapping a unit's side (charm), rewinding a unit's last move | the engine, plus its reads and changes row; entries that use it |
| New output kind (column) | already added: altered spell, global effect, ground | one entry from every ring rune, or a fallback |
| New property primitive | height, visibility, line of sight | every shape that could write it, plus the cost formula |
| New write mode | "swap two values" | the combination math itself; avoid |

The test for any new idea: write it as writes to property primitives. If it fits,
it's content. If it needs one of the four extensions, decide whether it's worth
that cost.

## Tools (Proposed Nov 4)

Jared asked for two tools for working with the permutations.

- **Design audit tool (designer-facing).** Compile every circle up to a size into
  its effect record, deduplicated by recipe id. Score each on the fixed test
  boards: cost, units touched, damage, displacement, terrain left. Group circles
  with the same effect signature, then surface what's worth a look: unique
  signatures with no near neighbour, the best power per slot, circles that do
  nothing, cancels, and big jumps from adding one rune. Clicking a result shows its
  compiled record, the entries behind it and a board preview, and it can be marked
  fine, bug or design question. The first version is the
  [audit tool](README.md#the-tools).
- **Engine test sandbox (implementation-facing).** Automated tests in the game
  repo. Every circle in the sweep must compile, run on each test board, finish,
  and produce a render plan with no missing assets. A headless browser
  screenshots a sample to catch visual breaks. It runs both orders of every
  neighbouring pair and checks the result against the swap rules, so a wrong
  read and change declaration fails a test.

The archived [BG3 coverage audit](archive/bg3-coverage-audit.md) lists 176 spells
written as circles, a useful coverage test set.

## Open

- [ ] The exact reads and changes list per primitive (the table above is a first
      pass).
- [ ] The full list of region and timing shapes, and which pairs cancel.
- [ ] The price of each payload item and the test boards that measure units
      touched.
- [ ] Whether traits may ever nest deeper than one level (proposed: no).
- [ ] Names for the working words (effect record, write modes, essences).
