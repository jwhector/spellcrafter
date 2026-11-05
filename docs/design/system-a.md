# The Hollow: System A

System A builds a spell from a fixed sigil plus runes. It is one of the two
crafting systems Jared will A/B test (Decided Nov 3); the other is
[System B](system-b.md). Linking, which both systems use, is in
[System B rules](system-b.md#linking).

## Sigils

**Decided (Nov 3)**

- The configuration a spell is built on is called a **sigil** (Jared's name).
- Sigils are learned by playing and can never be traded. Possibly learned by
  consuming an item (Open).
- **Sigils are geometry, runes are effects.** A sigil sets shape, slots, timing and
  where the spell starts (you, a target hex, an ally). Effects, including movement
  of units, come from runes.
- **Movement runes work relative to the spell's starting point:** a push sends units
  away from it, a pull drags them toward it. So a circle sigil with a push is an
  outward blast and with a pull is a vortex; no separate vortex sigil.
- **Exception:** sigils that move the caster (dash, leap) stay sigil-defined,
  because the caster's travel is part of the geometry.

**Decided (Jared, Nov 5), for now: System A keeps Push and Pull as runes,** even
though System B made them inscriptions the same day.

**Proposed: the sigil is the form, runes are the substance**

|  | Sigil | Rune |
| --- | --- | --- |
| What it decides | Slot count, cooldown, slot layout (how each slot channels a rune), area shape, range, what it can target, action or bonus action | Element, effect (damage, heal, shield, push, terrain), strength (quality) |
| How you get it | Learned by playing (bosses, quests, depth, discoveries) | Drops, trading, fusing |
| Owned how | Knowledge: permanent, personal, never traded | Items: collected, traded, fused, offered |
| Progression meaning | What you've *learned*: shows experience | What you *own*: shows collection and wealth |

- **Slots channel runes differently.** Example: the center slot applies a rune at
  full strength to the target, an outer slot applies it at half strength to the
  area around, another slot turns it into terrain. Same rune, different result
  depending on where it sits.
- **Slots can have constraints** ("only an element here"), which makes crafting a
  small puzzle between battles.
- **References:** Path of Exile (skill gems in linked item sockets) and Diablo 2
  runewords (runes in a socketed item form a named effect). Both separate the
  container from what goes in it.
- **The sigil sets the cooldown and the number of slots,** fixed when the spell is
  created. A small sigil (1 or 2 slots) comes back every round or two; a large
  one (5 slots) is once per battle.
- **Upgrade versus new spell:** changing the sigil makes a new spell with its own
  cooldown. Since runes are consumed when learning a spell (Decided Nov 3), an
  upgrade means learning the spell again with better runes.
- Modifiers (doubling, copying, extending) live on sigil slots, so runes stay pure
  effects.
- Around 8 runes at launch. Variety comes from runes × sigils × slot positions, not
  from a long rune list.

**Worked example (illustrative): a 2-slot line sigil.** Shape: a line 3 hexes out
from you. Action, cooldown 1. The *tip* slot applies its rune at full strength to
the first unit the line hits; the *trail* slot applies its rune to every hex along
the line as terrain.

- Fire at the tip, frost in the trail: burns the first enemy and leaves ice along
  the line.
- Push at the tip, fire in the trail: shoves the first enemy back along the line
  onto burning ground.
- Heal at the tip, shield in the trail: heals the first ally in line and protects
  the hexes leading to them.

**What a sigil can decide, with examples**

| Property | Example sigil |
| --- | --- |
| Shape | 3-slot triangle (a cone): front slot hits the nearest row at full strength, back slots hit the wider rows at half |
| Origin | 2-slot through-ally: cast onto a teammate; slot 1 affects the ally, slot 2 everything adjacent to them |
| Targets | 1-slot ring around you: applies its rune to all 6 neighbouring hexes (push everyone away, or heal adjacent allies) |
| Action cost | That same 1-slot ring is a bonus action, so it can be used instead of moving |
| Timing: delayed | 2-slot marked point: mark a hex 3 away; next round it erupts (slot 1 at the center, slot 2 in a ring). Telegraphed like enemy attacks |
| Timing: triggered | 1-slot reaction: fires when an enemy steps next to you during the enemy phase (the if/then idea) |
| Duration | 3-slot wall: a line of 3 hexes sideways in front of you, terrain lasting 2 rounds, middle slot stronger |
| Movement | 2-slot dash: move up to 2 hexes in a line (beyond the 1-hex rule) and apply the runes to whatever you pass |
| Slot rules | A slot that doubles the rune beside it, a slot that copies its rune to the next ally who acts, a slot that only takes elements |

**Proposed: every rune has three readings.** A rune always means the same thing, but
how it shows up depends on where the sigil sends it: onto a **unit**, onto the
**ground** (terrain), or onto **yourself**. Players learn one meaning per rune, and
the sigil does the translating. The runes here are illustrative.

| Rune (illustrative) | On a unit | On the ground | On yourself |
| --- | --- | --- | --- |
| Protect | A shield that absorbs damage | A barrier hex that blocks line attacks and movement | You take less damage this round |
| Fire | Damage now plus burning | Burning hexes that hurt whoever stands there | Your next spell deals extra fire damage |
| Frost | Slowed or frozen in place | Ice: units slide one extra hex when pushed or moving | You can't be pushed this round |
| Force | Pushed one hex away from the source | A hex that pushes whoever enters it | You move one extra hex |
| Mend | Heals | A healing zone for allies standing in it | Heal yourself |
| Stone | Stunned briefly | Raises an obstacle (blocks movement and line of sight) | Hard to move and harder to hurt |

Examples:

- **Dash sigil + protect:** you dash and gain a shield on the way in. If the dash's
  other slot puts protect on units passed, every ally you run past gets a shield
  too: a rescue run.
- **Wall sigil + protect:** the wall becomes a barrier that blocks enemy line
  attacks and blocks movement for 2 rounds. With fire instead, it's a burning line
  enemies won't want to cross; with frost, a slippery line that sends pushed
  enemies sliding.

## Brainstorm: 42 sigils (Nov 3)

A throw-everything-at-the-wall list. Labels are plain descriptions, not names.
Runes in examples (protect, fire, frost, force, mend, stone) are placeholders, each
read three ways: on a unit, on the ground, on yourself. Cooldowns are in rounds;
**A** = uses your action, **B** = uses your bonus action. Number 25 was superseded
on Nov 3 and is in the [archive](archive/superseded.md).

### Shapeshifter

| # | Sigil | Shape and slots | Cost | Example |
| --- | --- | --- | --- | --- |
| 1 | Point | One target up to 3 hexes away. 1 slot: on the unit | A, 0 | Fire: burn one enemy. A candidate for the basic action |
| 2 | Line | 3 hexes straight out. Tip slot: first unit hit. Trail slot: every hex along the line, as ground | A, 1 | Force tip + fire trail: shove the first enemy back onto burning ground |
| 3 | Cone | Widens in front of you. Front slot: nearest 1–2 hexes at full strength. Two back slots: the wider row at half | A, 2 | Frost front + force back: freeze the closest, scatter the rest |
| 4 | Ring | All 6 hexes around you. 1 slot: on units | B, 1 | Force: push everyone adjacent away. Mend: heal everyone adjacent |
| 5 | Burst | Target a hex up to 3 away. Center slot: the unit on it. Outer slot: the 6 hexes around it | A, 2 | Stone center + fire outer: stun the target, set its surroundings alight |
| 6 | Piercing line | 4 hexes straight out, hits every unit in it, not just the first. 1 slot | A, 2 | Frost: freeze a whole column of enemies |
| 7 | Sweep | The 3 hexes in an arc in front of you. Left slot and right slot can hold different runes | A, 1 | Protect left on an ally, fire right on an enemy, in one swing |
| 8 | Chain | Hits a target, then jumps to the nearest other unit within 2 hexes, ally or enemy. Slot 1: first target. Slot 2: the second | A, 2 | Fire then mend: hit an enemy, and the jump heals the ally beside it |

### Allies and support

| # | Sigil | Shape and slots | Cost | Example |
| --- | --- | --- | --- | --- |
| 9 | Through an ally | Target a teammate up to 3 away. Slot 1: on that ally. Slot 2: on every unit adjacent to them | A, 1 | Protect + force: shield your tank and knock back whatever's surrounding them |
| 10 | Tether | Links you and an ally for 2 rounds. Slot 1: on both of you at the start of each round. Slot 2: on any enemy that crosses the line between you | A, 3 | Mend + frost: steady healing for both, and enemies cutting between you get frozen |
| 11 | Swap | Trade places with any unit up to 3 away. 1 slot: on the unit you swapped with | B, 2 | Swap an ally out of a danger zone and shield them, or swap an enemy into one |
| 12 | Gift | An ally up to 3 away gets your rune's *on yourself* reading | B, 1 | Frost: your ally can't be pushed this round |
| 13 | Sanctuary | A 7-hex circle around a target hex for 2 rounds. Center slot: ground at the center. Ring slot: ground around it. Third slot: on allies who enter | A, 3 | Mend everywhere, protect for whoever steps in: a safe camp mid-fight |

### Timing

| # | Sigil | Shape and slots | Cost | Example |
| --- | --- | --- | --- | --- |
| 14 | Delayed mark | Mark a hex up to 4 away; it erupts at the start of next round. Center slot: the hex. Outer slot: the ring around it. Everyone can see the mark | A, 2 | Stone + fire: then push enemies onto the mark before it goes off |
| 15 | Reaction | Set it now; it fires during the enemy phase the first time an enemy steps next to you. 1 slot: on that enemy | B, 2 | Frost: whoever walks up to you gets frozen in place |
| 16 | Retaliation | For this round, every enemy that hits you gets the slot's rune | B, 2 | Fire: attackers catch fire. Force: attackers get knocked back |
| 17 | Charged | Takes your action this round and next. Fires at the end of next round at double strength. 3 slots. If you're pushed while charging, it fizzles | A (2 rounds), 3 | Three fire runes in a burst: a huge payoff if your team keeps you safe |
| 18 | Aura | Follows you for 3 rounds. 1 slot: at the end of each round, applies to the hex you stand on and adjacent units | A, 3 | Mend: a walking heal for whoever stays close to you |
| 19 | Foresight | Deciphers the enemy's shown move for the party: exact area, push directions and side effects. 1 slot: on everyone that move is about to hit | A, 3 | Protect: pre-shield exactly the allies about to be hit. Force: push them out of it |

### Movement and displacement

| # | Sigil | Shape and slots | Cost | Example |
| --- | --- | --- | --- | --- |
| 20 | Dash | Move up to 2 hexes in a straight line, past the 1-hex rule. Slot 1: on yourself. Slot 2: on every unit you pass | A, 1 | Protect + protect: shield yourself and every ally you run past |
| 21 | Leap | Jump to any hex up to 3 away, over obstacles. Slot 1: ground where you land. Slot 2: on units adjacent to the landing | A, 2 | Stone + force: land, raise rubble, knock everyone around you back |
| 22 | Pull | A line 4 hexes out. Drags the first unit hit to the hex next to you. Slot 1: on that unit. Slot 2: ground on the hexes it was dragged over | A, 1 | Pull a stranded ally to safety, or yank an enemy across burning ground |
| 23 | Shove | Hit an adjacent unit and push it 2 hexes. If it collides with something, the slot's rune hits both | A, 1 | Stone: push an enemy into another and stun them both |
| 24 | Escort | Move yourself and one adjacent ally 1 hex together. 1 slot: on both of you | B, 1 | Protect: walk your ally out of danger with a shield on both of you |

### Terrain and zones

| # | Sigil | Shape and slots | Cost | Example |
| --- | --- | --- | --- | --- |
| 26 | Wall | A line of 3 hexes sideways in front of you, lasting 2 rounds. Middle slot stronger, side slots weaker | A, 2 | Protect: a barrier against line attacks. Fire: a line enemies won't cross |
| 27 | Trail | For this round, every hex you move through becomes ground of the slot's rune, lasting 2 rounds. 1 slot | B, 1 | Frost: leave an icy path that sends chasing enemies sliding |
| 28 | Pillar | Summon a stationary object with its own HP on a hex up to 2 away; it blocks movement. Slot 1: what it gives off to adjacent units each round. Slot 2: what happens when it's destroyed | A, 3 | Mend + fire: heals allies beside it, explodes when enemies break it |
| 29 | Scatter | Choose 3 separate hexes up to 3 away; each gets one slot's rune as ground | A, 2 | Paint a route of protect hexes for allies, or ring an enemy with fire |
| 30 | Spreading ground | 1 slot on one hex; the ground spreads one hex in every direction each round for 3 rounds | A, 3 | Fire: a slow wildfire that herds enemies. Mend: a growing safe area |

### Party combos and wild runes

| # | Sigil | Shape and slots | Cost | Example |
| --- | --- | --- | --- | --- |
| 31 | Prime | Mark a unit up to 3 away. 1 slot: the next time any ally hits that unit with a spell, this rune goes off too | B, 1 | Frost prime, then a teammate's fire hits: both land at once |
| 32 | Convergence | Target a unit. If another player's spell also hits it this round, both spells land at double strength. 1 slot | A, 2 | Rewards calling the same target in chat |
| 33 | Open slot | 2 slots; one can only hold a wild rune from the shared party pool, and doubles it | A, 2 | Makes claiming wild runes a team decision: who gets to double one this round? |
| 34 | Mimic | No slots. Recast the last spell an ally cast this round, from your position, with their runes | A, 3 | Copy the healer's sanctuary on the other side of the board |
| 35 | Relay | Slot 1 applies to an ally now. Slot 2 is handed to that ally, who can fire it from their position before the round ends | A, 2 | You give the Dash user a free fire burst to drop wherever they land |

### Risky and strange

| # | Sigil | Shape and slots | Cost | Example |
| --- | --- | --- | --- | --- |
| 36 | Blood price | 3 slots, no cooldown, but casting costs you HP equal to the number of runes slotted | A, 0 | A fire burst every round, as long as your healer keeps up |
| 37 | Fork | Two separate point targets up to 3 away; each slot hits one | A, 1 | Fire one enemy and mend one ally in the same cast |
| 38 | Siphon | Slot 1 on an enemy; slot 2 lands on an ally, scaled by how much slot 1 did | A, 2 | Fire the enemy, the ally heals for part of the damage |
| 39 | Inversion | 1 slot. Flips the rune's reading: what would hit a unit hits the ground under it, and the reverse | B, 1 | Stone on a unit becomes an obstacle under their feet, trapping them |
| 40 | Last stand | Only castable below half HP. 4 slots, applies all of them to yourself and adjacent units | A, once per battle | A comeback button that rewards staying in the fight |
| 41 | Gamble | 2 slots. Which slot goes to the target and which goes to you is decided at random | A, 0 | Cheap and fast, sometimes hilarious |
| 42 | Anchor | 1 slot. Pins a unit up to 3 away: it can't move or be moved for 1 round | B, 2 | Lock an enemy inside a delayed mark, or keep an ally from being knocked off a ledge |

### Patterns worth noticing

- **Cooldown tracks slot count and reach:** 1 slot and short range tend toward 0–1, 3+ slots or board-wide effects toward 3 or once per battle.
- **Bonus-action sigils are small and reactive:** rings, swaps, gifts, reactions. They compete with your 1-hex move, which is the tension Jared wanted.
- **Several sigils only shine with a teammate** (Through an ally, Tether, Prime, Convergence, Relay, Mimic). That's the social layer built into crafting.
- **Candidates to cut first** if this is too much: Mimic, Relay, Gamble, Inversion. They're the hardest to read at a glance.

## Open

- [ ] Slot constraints: yes or no?
- [ ] How many sigils exist, and how many can one player know?
- [ ] If sigils are learned from an item, can that item be traded? A tradable item
      effectively makes sigils tradable.
- [ ] Can a player teach a sigil to another player (social, but not trading)?
