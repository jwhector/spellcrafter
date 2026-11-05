# The Hollow: BG3 spell coverage audit

Nov 4, 2026 · @Jared

**Archived 2026-11-05.** From the Claude Doc (frozen rev 24). The audit is finished:
every fix it proposed was put into the design on Nov 4, and its open questions
were answered. The fixes live in [System B rules](../system-b.md), the
[rune reference](../rune-reference.md) and the [engine model](../engine-model.md);
the terrain brainstorm became ground. The spell list is still a useful coverage
test, and its data is in `reference/bg3-spells.py`. Links below point at the
frozen Claude Docs.

Half of the BG3 spells that fit this game can be built today, and four additions would take that to about three quarters. I rebuilt 176 spells from levels 0 to 6 and skipped 37 that don't fit. 88 (50%) are an easy fit, 28 (16%) are an awkward fit, and 60 (34%) need an extension.

The four additions that unlock the most, in order. Everything here is Proposed.

1. **A rune pair that raises and lowers the damage a unit deals** (Bless, Bane, Magic Weapon, Ray of Enfeeblement: 15 spells). It's the cheapest, because the board already stores outgoing damage modifiers. No rune writes them yet.
2. **Losing or gaining actions** (Haste, Slow, Hold Person, Sleep, Hypnotic Pattern: 16 spells). This is a status that turn order reads.
3. **A trigger whose payload lands on the other unit in the event** (the smites, Hail of Thorns: 9 spells). This rides on the anchors already proposed for minor inscriptions.
4. **A status that stops a unit being picked as a target** (Invisibility, Darkness, Fog Cloud, Sanctuary: 10 spells). It replaces a full vision system.

With those four and two content fixes, coverage goes from 50% to 76%. All fourteen gaps together reach 95%.

**Update Nov 4:** Jared asked to build every proposed fix, plus a single-target bonus. All fourteen gaps now have a fix in the [spell model doc](https://claude.ai/artifact/4y6uFQU9JdJzypvaTp21Jk) (section "Nov 4 extensions from the BG3 coverage audit"), the [crafter](https://claude.ai/artifact/7E3zWYPihzodDzW2MsMznG) and the [audit tool](https://claude.ai/artifact/L8oTdLrYdmrxAoh95TM9tX). They're still Proposed, and the new inscription names are placeholders for Jared. He named the six new runes on Nov 5: amplification, diminishing, haste, slow, invisibility and revelation. "What was built" under the gap table says which fix covers each gap. The spell tables below still show the circles as first written.

The list comes from [bg3.wiki](https://bg3.wiki/wiki/List_of_all_spells). Cantrips are checked against the wiki. The pages for levels 1 to 6 came back cut short, so a few spells there may be missing. Circles are written as center · shape · inscriptions · ring. A bracketed center such as (outgoing up) is a rune that doesn't exist yet.

## Gaps, ranked by what they unlock

Fourteen gaps account for every spell that needs an extension. The letters match the Gap column in the spell tables. They are placeholders, not names. The rows are in the order I'd add them: cheap and wide first. "Coverage after" is cumulative and counts a spell once all of its gaps are closed.

| Gap | Spells blocked | Extension point | Cheapest form (Proposed) | Coverage after |
| --- | --- | --- | --- | --- |
| I. What a stone center does to units standing in its area | 3 (Entangle, Web, Black Tentacles) | None, content | Units already in a stone center's area are encased. | 52% |
| J. Teleporting yourself | 2 (Misty Step, Dimension Door) | None, content | A self-cast portal with a target point moves you there. Today it's flagged as doing nothing. | 53% |
| B. Raising or lowering the damage a unit deals | 15 (Bless, Bane, Guidance, Magic Weapon, Ray of Enfeeblement, Enlarge/Reduce, Vicious Mockery) | New rune using existing pieces | An inverse rune pair that writes outgoing damage modifiers, which the board already holds. Accuracy buffs become damage buffs. | 60% |
| A. Losing or gaining actions | 16 (Haste, Slow, Hold Person, Sleep, Hypnotic Pattern, Tasha's Hideous Laughter, Stinking Cloud) | New rune, plus turn order reads statuses | Statuses that remove or add an action or a move. Frost already removes the bonus move, so this widens an existing idea. | 67% |
| C. A payload that lands on the other unit in a trigger event | 9 (all six smites, Hail of Thorns, Lightning Arrow, Ensnaring Strike) | Property primitive value (a Where anchor) | A trigger's Where can anchor to the other party: whoever you hit, or whoever hit you. A shield center already does this for "when hit". | 71% |
| D. Units that can't be picked as targets | 10 (Invisibility, Greater Invisibility, Sanctuary, Darkness, Fog Cloud, Blindness) | New status that targeting reads | Single, bolt and chain shapes can't pick a hidden unit; areas still hit it. Darkness and fog are terrain that hides whoever stands in it. No vision system needed. | 76% |
| E. Steering or repeating a lasting effect | 7 (Moonbeam, Call Lightning, Cloudkill, Witch Bolt, Heat Metal, Sunbeam) | Property primitive value (a Where or When shape) | Let a lingering area be re-aimed each round for a bonus action. Let ring movers drift a lingering zone the way push and pull already sweep a global effect. | 80% |
| F. Several chosen targets, or a picking rule | 5 (Magic Missile, Scorching Ray, Eldritch Blast, Sleep, Colour Spray) | Property primitive value (Where and Who) | Let extra point stack, splitting the budget like area summons. Add a Who order: weakest first, up to a health pool. | 83% |
| H. Death and its edges | 7 (Revivify, Death Ward, Animate Dead, Create Undead, Bursting Sinew, Hex and Hunter's Mark moving on) | New trigger, plus board state | A trigger for "when it would drop to 0" or "when it dies". Fallen units leave remains as terrain that summon and wound can use. | 87% |
| N. Healing received up or down | 2 (Bone Chill, Beacon of Hope) | New rune, or extend gap B | The same modifier as B, applied to healing. | 88% |
| G. Changing a unit's side or choices | 6 (Dominate Person, Dominate Beast, Crown of Madness, Confusion, Planar Binding, Animal Friendship) | New engine primitive | Change a unit's side for a few rounds; enemy logic plays it. | 91% |
| L. Taking a unit off the board, or turning it into something else | 4 (Banishment, Polymorph, Blink, Banishing Smite) | New engine primitive | Remove a unit for N rounds and return it to its hex, or swap it for a weak body until that body dies. | 94% |
| M. Zones that stop spells | 2 (Silence, Globe of Invulnerability) | New trigger ("when a spell targets or enters") | An area that alters any spell aimed into it, using the spell column. | 95% |
| K. Strength that depends on the target's state | 1 (Toll the Dead) | Property primitive value (How much) | Magnitude scales if the target is hurt, burning or exposed. Small, but it opens up a lot of rune-vs-state play. | 95% |

**What was built (Nov 4).** Each gap and what now covers it:

- **I.** A stone center on an area encases units already standing there.
- **J.** A self-cast portal with an extra point teleports you there.
- **B.** An amplification / diminishing rune pair changes the damage and healing a unit gives.
- **A.** A haste / slow rune pair, which turn order reads. Slow on an enemy cancels its shown move.
- **C.** A trigger rule: on an event between two units, harmful runes land on the other unit and beneficial ones on the watched unit. A smite is self + "when it attacks" + the rider as the center.
- **D.** An invisibility / revelation rune pair, which targeting reads. Single, bolt and chain spells can't pick a hidden unit; areas still hit it. Darkness and fog are lingering invisibility ground.
- **E.** A steerable inscription (needs lingering) re-aims a lingering area each round. Push or pull on ground makes it drift. A follows-the-unit inscription covers auras.
- **F.** Extra points stack up to 3, and a weakest-first inscription orders unit picks by lowest health.
- **H.** New triggers for "when it dies" and "when it would drop to 0". Units that die leave remains, and a summon raised on remains is stronger.
- **N.** Protect and expose now change healing received as well as damage.
- **G.** Covered through the shown move, as Jared decided: slow cancels it, and portal on a spell turns it. Lingering on a spell keeps the change for the caster's next shown moves. Changing a unit's side stays out for now.
- **L.** A summon aimed at a unit sets that unit aside and puts the body in its place (Polymorph, Banishment). This is the new set-aside engine primitive. Blink stays out, since it's chance.
- **M.** Dispel ground: statuses can't land on units in it, and spells aimed into it lose ring runes up to its strength.
- **K.** Wound deals more to units below half health (Toll the Dead).

The single-target bonus (about 15% more for single, bolt and self) answers the worry that any spell made into a big area is strictly better. That number is a starting point to tune in the audit tool's value model.

The other 5% are awkward fits with no single gap: effects that worsen over time (Contagion, Flesh to Stone), terrain that hurts per hex walked (Spike Growth), slowing terrain (Plant Growth), and two-part hits that wait for minor inscriptions (Booming Blade, Ice Knife).

No gap needs a new output kind (hook column) or a new write mode. That's the strongest sign the grammar's skeleton holds.

## Room to innovate

The grammar already does things BG3 can't, mostly because enemies show their next move and ring runes compose freely. These are the places to lean in. All Proposed.

**Shown moves turn control into counterplay.** In BG3, Hold Person and Command matter because you can't see what the enemy will do. Here you can, so most enemy control can work through the on-a-spell column instead of new primitives. Compelled Duel is already portal aimed at the enemy's shown move, which pulls the attack onto you. Stun could be "cancel its shown move". Fear could be "push its area away". That shrinks gaps A and G to allies (Haste) and lasting effects, and it keeps the shown move at the center of play.

**One family replaces six spells.** Hellish Rebuke, Armour of Agathys and Fire Shield are three BG3 spells. Here they are one circle, protect on yourself, with fire, frost or wound in the ring. Warding Bond, Vampiric Touch, Glyph of Warding and Telekinesis are also existing presets or one-line circles. This is the grammar's selling point: a player who learns protect plus any ring has a dozen BG3 spells.

**Hiding from targeting works with shown moves.** With gap D, a unit that turns hidden makes any enemy move aimed at it lose its target. Invisibility becomes a strong answer to a shown attack, with no vision rules. Areas still hit hidden units, so it has clear counters.

**Lasting zones can move.** Push and pull already sweep and close in a global effect. Letting them do the same to any lingering area gives drifting clouds and closing traps for free. No new rune is needed, only the same shape write in another column.

**Trigger anchors make one rule out of many.** Smites, Hail of Thorns, retaliation and "jump the mark when the target dies" all need the same thing: the payload goes to the other unit in the event. Minor inscriptions already need anchors, so this is one more anchor choice, not a new system.

**Translate BG3's dice instead of copying them.** Accuracy becomes damage dealt (Bless, Bane). Chance becomes a fixed count (Mirror Image soaks N hits; Blink skips alternate rounds). Damage types become runes plus board states (acid is wound with expose, thunder is wound with push). Height is dropped. Each translation keeps the spell's role and stays deterministic, in line with the no-dice lean.

## Brainstorm: terrain as something runes shape (Nov 4)

Proposed: **a lingering effect on a place is terrain**, and ring runes give that ground its properties, the way they give a summon its traits. Terrain becomes a kind of thing like a gate, a summon or a shield: it sits on hexes and can't be attacked, and its traits fire when units enter, stand at round end, or leave. The engine already has what it needs (place terrain, listen), so no new primitive. The cost is one new hook column, 12 short entries, plus pricing terrain on the test boards.

Today, fire, frost and stone already leave ground (burning, ice, rubble), but nothing can change what that ground does. This would make terrain a first-class output, so a player can build a hazard, a tool or a trap on purpose.

### What each rune could do to ground

| Rune | The ground... | Covers |
| --- | --- | --- |
| Fire | burns whoever stands in it at round end | Burning ground (today), Wall of Fire |
| Frost | is slippery: units slide 1 hex further | Ice (today), Grease, Sleet Storm |
| Mend | heals allies standing in it | A healing spring |
| Wound | hurts each unit that walks onto a hex of it | Spike Growth, Cloud of Daggers |
| Protect | gives cover: less damage to units standing in it | Cover, barricades |
| Expose | leaves units standing in it exposed | Faerie Fire as a zone |
| Push | moves units 1 hex one way each round, like a current | Cloudkill drifting, rivers, conveyors |
| Pull | draws units to its center each round and makes leaving cost a move | Entangle, Black Tentacles, quicksand, whirlpools |
| Portal | links its hexes: step on one and come out at another | Teleport pads, Arcane Gate as ground |
| Summon | spreads 1 hex each round, or spawns a weak creature | Plant Growth, a nest |
| Dispel | stops statuses landing on anyone inside it | Silence, anti-magic ground |
| Stone | is rough: costs an extra move to cross, and lasts longer | Plant Growth, rubble (today) |

This closes or eases about 12 spells from the audit (Spike Growth, Plant Growth, Entangle, Web, Black Tentacles, Cloudkill, Silence, Grease and others). With the hiding status from gap D, it also covers Darkness and Fog Cloud as ground that hides whoever stands in it.

### Three ways a player could shape terrain

1. **Make it.** Any area spell with lingering leaves ground, and its ring sets the properties. Example: wound center, large area, lingering, with push in the ring, is a cloud of blades that drifts across the board.
2. **Change what's already there.** Aim a circle at existing ground and its runes react with it, using the rune-vs-state table that's already planned. Fire on ice clears it, push on burning ground spreads it 1 hex, and dispel removes it. This keeps a battlefield's own terrain (rivers, rubble) in play.
3. **Change it everywhere.** A global modification already rewrites terrain rules (stone turns the edges to rock). The same column could make all burning ground spread each round.

### Open for Jared

- **Lingering:** Jared wants inscriptions to act in intuitive, continuous ways. Proposed reading: lingering always means "what the spell made lasts longer". On a place that's the ground, on a unit its status, on a thing the thing. So lingering on an area making ground is the same rule, not an exception.
- **Filters on ground: no** (Jared, Nov 4). Open: the balance of filters in general.
- **Battlefields start with terrain players can reshape: yes** (Jared, Nov 4).
- **Future expansion:** a robust ground interaction system where some grounds stack, some replace each other, and some react in other ways.

**Proposed: the circle decides what a spell does, and the target only decides where.** Jared asked whether a spell should act differently when it's aimed at a unit or at an empty hex. Today it doesn't, because the shape inscription picks the hook column, not the target. Single, bolt, chain and self pick units. Burst, line, cone, ring, wall and large area pick hexes, hitting the units in them now and leaving ground if lingering. So fire on a single target is always a burning unit, and a fire burst is always units hit plus burning ground. The rule to keep: a unit shape can't be aimed at an empty hex, and a bolt that finds no unit does nothing. What's already on the board can still change the outcome, but only through the rune-vs-state table (fire meets ice), which works the same everywhere. If spells that change by target are ever wanted, they'd be designed as their own mechanic, not slipped in through terrain (Jared, Nov 4).

## Open questions for Jared

1. **Basic attacks: yes** (Jared, Nov 4: they're important). So gap C covers the smites as written, and Shillelagh, Flame Blade and Shadow Blade come back into scope.
2. **Down or dead: leaning dead** (Jared, Nov 4: maybe more balanced). Revivify stays out unless that changes; Death Ward's "would drop to 0" trigger still matters.
3. **Control: through the shown move first (Jared agreed Nov 4); direct control maybe later as a rare, expensive effect.** Explained in the thread: direct control (the unit switches sides, a new primitive) versus changing the enemy's shown move (redirect its attack onto its allies, cancel it), which mostly exists already.
4. **Concentration: wanted, needs to be robust.** It gets its own conversation.
5. **Accuracy: none for now.** Gap B stays as damage dealt. Subject to change with the broader mechanics.

## Cantrips

18 spells: 10 easy, 2 awkward, 6 need an extension.

| Spell | Circle | Verdict | Gap | Note |
| --- | --- | --- | --- | --- |
| Acid Splash | wound · burst · ring expose | Easy | — | Acid's armour damage reads as exposed. |
| Blade Ward | protect · self | Easy | — | — |
| Fire Bolt | fire · bolt | Easy | — | — |
| Poison Spray | wound · cone · lingering | Easy | — | Poison is damage over time; no separate type. |
| Produce Flame | fire · bolt | Easy | — | — |
| Ray of Frost | frost · bolt | Easy | — | Chill (lose bonus move) is the slow. |
| Resistance | protect · single · allies only | Easy | — | — |
| Sacred Flame | wound · single | Easy | — | — |
| Shocking Grasp | wound · single | Easy | — | No reactions to remove; dropped. |
| Thorn Whip | wound · single · ring pull | Easy | — | — |
| Booming Blade | wound · single · ring wound with a minor trigger (when it's moved) | Awkward | — | Works only with minor inscriptions (late unlock). The weapon part is dropped. |
| Eldritch Blast | wound · bolt · extra point · ring push | Awkward | F | Beams want several chosen targets; one extra point gives two. |
| Bone Chill | wound · single, and the target can't be healed for a round | Extension | N | — |
| Bursting Sinew | wound · burst at a corpse | Extension | H | Needs corpses on the board. |
| Guidance | (outgoing up) · single · allies only | Extension | B | Accuracy maps to damage dealt. |
| Toll the Dead | wound · single, stronger on a hurt target | Extension | K | — |
| True Strike | (outgoing up) · self | Extension | B | — |
| Vicious Mockery | wound · single · ring (outgoing down) | Extension | B | — |

## Level 1

45 spells: 19 easy, 8 awkward, 18 need an extension.

| Spell | Circle | Verdict | Gap | Note |
| --- | --- | --- | --- | --- |
| Armour of Agathys | protect · self · ring frost, wound | Easy | — | Shield ring hits the attacker (harmful to enemies first). |
| Arms of Hadar | wound · ring shape on you | Easy | — | Losing reactions dropped. |
| Burning Hands | fire · cone | Easy | — | — |
| Chromatic Orb | fire / frost / wound · bolt | Easy | — | Pick the element by picking the center. |
| Cure Wounds | mend · single | Easy | — | — |
| Dissonant Whispers | wound · single · ring push ×2 | Easy | — | Fleeing is a forced move away. |
| False Life | protect · self | Easy | — | Temporary health as a shield. |
| Find Familiar | summon · single | Easy | — | — |
| Grease | frost · burst | Easy | — | Ice already makes units slide. Grease burning when lit is the rune-vs-state table. |
| Guiding Bolt | wound · bolt · ring expose | Easy | — | — |
| Healing Word | mend · single · more range | Easy | — | — |
| Hellish Rebuke | protect · self · ring fire | Easy | — | A shield whose ring burns the attacker covers the reaction. |
| Heroism | protect · single · allies only · lingering | Easy | — | Shield renewed each round; fear immunity dropped. |
| Inflict Wounds | wound · single | Easy | — | — |
| Mage Armour | protect · self · lingering | Easy | — | — |
| Protection from Evil and Good | protect · single · allies only · lingering | Easy | — | Creature types dropped. |
| Shield | protect · self | Easy | — | Enemy moves are shown, so the reaction becomes a pre-emptive shield. |
| Shield of Faith | protect · single · allies only · lingering | Easy | — | — |
| Thunderwave | push · ring shape on you · ring wound | Easy | — | — |
| Command | pull (approach) or push (flee) · single; halt and grovel need lost actions | Awkward | A | Approach and flee fit; halt and grovel don't. |
| Compelled Duel | portal · a spell (enemy's shown move), no extra point | Awkward | — | Moves the enemy's shown attack onto you. Covers one move, not a lasting duel. |
| Entangle | stone · burst · lingering | Awkward | I | What a stone center does to units already standing in its area isn't defined. |
| Faerie Fire | expose · burst · lingering | Awkward | D | Exposure covers advantage; revealing hidden units needs visibility. |
| Hex | expose · single · lingering; moves to a new target on death | Awkward | H | Exposure helps the whole party, not only you. Jumping on death needs a death trigger. |
| Hunter's Mark | expose · single · lingering; moves on death | Awkward | H | Same as Hex. |
| Ice Knife | wound · bolt · ring frost with a minor burst | Awkward | — | Needs minor Where (late unlock), or a link. |
| Witch Bolt | wound · single · lingering, recast each round | Awkward | E | Lingering damage covers the repeat; re-aiming or breaking by distance doesn't fit. |
| Animal Friendship | — | Extension | G | Pacify a beast: control. |
| Bane | (outgoing down) · burst · enemies only | Extension | B | — |
| Bless | (outgoing up) · burst · allies only | Extension | B | — |
| Colour Spray | blind the weakest first, up to a health pool | Extension | D, F | — |
| Divine Favour | (outgoing up) · self · lingering | Extension | B | — |
| Ensnaring Strike | stone on the next unit you hit | Extension | C | — |
| Expeditious Retreat | extra move each round · self | Extension | A | — |
| Fog Cloud | an area that hides units in it | Extension | D | — |
| Hail of Thorns | burst at the next unit you hit | Extension | C | — |
| Longstrider | more movement · single | Extension | A | — |
| Magic Missile | wound · three chosen targets | Extension | F | Chain picks nearest units, not yours. |
| Ray of Sickness | wound · bolt · ring (outgoing down) | Extension | B | — |
| Sanctuary | enemies can't pick this ally as a target | Extension | D | — |
| Searing Smite | fire on the next unit you hit | Extension | C | — |
| Sleep | the weakest units first, up to a health pool, lose turns | Extension | A, F | — |
| Tasha's Hideous Laughter | target loses its turns | Extension | A | — |
| Thunderous Smite | push on the next unit you hit | Extension | C | — |
| Wrathful Smite | fear on the next unit you hit | Extension | C, A | — |

## Level 2

31 spells: 15 easy, 5 awkward, 11 need an extension.

| Spell | Circle | Verdict | Gap | Note |
| --- | --- | --- | --- | --- |
| Aid | protect · burst · allies only · lingering | Easy | — | Max health becomes a shield. |
| Barkskin | protect · single · lingering | Easy | — | — |
| Blur | protect · self · lingering | Easy | — | Chance to miss becomes damage reduction. |
| Calm Emotions | dispel · burst · allies only | Easy | — | — |
| Cloud of Daggers | wound · single hex · lingering | Easy | — | — |
| Flaming Sphere | summon · single · ring fire | Easy | — | A burning body you don't steer (summons move on their own). |
| Gust of Wind | push · line | Easy | — | — |
| Lesser Restoration | dispel · single · allies only | Easy | — | — |
| Melf's Acid Arrow | wound · bolt · lingering · ring expose | Easy | — | — |
| Mirror Image | protect · self (a shield that soaks a few hits) | Easy | — | Chance becomes a fixed number of hits. |
| Phantasmal Force | wound · single · lingering | Easy | — | — |
| Prayer of Healing | mend · burst · allies only | Easy | — | — |
| Shatter | wound · burst | Easy | — | — |
| Spiritual Weapon | summon · single · ring wound | Easy | — | — |
| Warding Bond | protect · single · redirect tether · allies only · lingering | Easy | — | The Damage sharing preset. |
| Heat Metal | fire · single, recast each round | Awkward | E | Lingering fire covers it; recasting doesn't. |
| Hold Person | stone · single (encase) | Awkward | A | Encase stops movement; losing actions needs the extension. |
| Misty Step | portal · self · a point | Awkward | J | A self-cast portal is flagged as doing nothing today. |
| Spike Growth | wound · large area · lingering | Awkward | — | Damage per hex walked needs terrain that reacts to each step. |
| Web | stone · burst · lingering · ring fire | Awkward | I | Same gap as Entangle; flammable webbing is the rune-vs-state table. |
| Blindness | expose + (outgoing down) · single · lingering | Extension | B, D | — |
| Branding Smite | expose on the next unit you hit | Extension | C | — |
| Crown of Madness | target attacks its own side | Extension | G | — |
| Darkness | an area that hides units in it | Extension | D | — |
| Enlarge/Reduce | (outgoing up / down) · single | Extension | B | Size and reach dropped. |
| Invisibility | ally can't be targeted until it acts | Extension | D | — |
| Magic Weapon | (outgoing up) · single · lingering | Extension | B | — |
| Moonbeam | wound · burst · lingering, moved each round | Extension | E | — |
| Ray of Enfeeblement | (outgoing down) · bolt · lingering | Extension | B | — |
| Scorching Ray | fire · three chosen targets | Extension | F | — |
| Silence | an area where spells can't be cast | Extension | M | — |

## Level 3

29 spells: 11 easy, 6 awkward, 12 need an extension.

| Spell | Circle | Verdict | Gap | Note |
| --- | --- | --- | --- | --- |
| Conjure Barrage | wound · cone | Easy | — | — |
| Counterspell | dispel · a spell | Easy | — | The Strip a spell preset. |
| Daylight | dispel · large area | Easy | — | Clears darkness once darkness exists. |
| Fireball | fire · burst | Easy | — | — |
| Glyph of Warding | fire / frost / wound · burst · trigger: when something enters | Easy | — | The Fire trap preset. The first-pass "stored spell" gap isn't needed for BG3. |
| Lightning Bolt | wound · line | Easy | — | — |
| Mass Healing Word | mend · large area · allies only | Easy | — | — |
| Protection from Energy | protect · single · lingering | Easy | — | — |
| Remove Curse | dispel · single · allies only | Easy | — | — |
| Sleet Storm | frost · large area · lingering | Easy | — | — |
| Vampiric Touch | wound · single · transfer tether | Easy | — | The Life drain preset; repeating it is a recast. |
| Animate Dead | summon · single (at a corpse) | Awkward | H | Works anywhere; corpses would make it a choice. |
| Bestow Curse | expose · single · lingering | Awkward | A, B | One curse option fits; the others need lost actions or outgoing down. |
| Fear | push · cone · lingering | Awkward | A | Fleeing fits; dropping weapons and freezing up don't. |
| Hunger of Hadar | frost + wound · large area · lingering, hides units | Awkward | D | Damage zone fits; darkness doesn't. |
| Plant Growth | stone · large area | Awkward | — | Rubble blocks; BG3's terrain only slows. No slowing terrain today. |
| Spirit Guardians | wound · burst on you, anchored to you · enemies only · lingering · ring frost | Awkward | — | Fits once the proposed anchor to a unit is in. |
| Beacon of Hope | more healing received · burst · allies only | Extension | N | — |
| Blinding Smite | blind the next unit you hit | Extension | C, D | — |
| Blink | portal · self, out and back each round | Extension | L | Chance removed; phasing out needs a way to take a unit off the board. |
| Call Lightning | wound · burst, re-aimed each round | Extension | E | — |
| Crusader's Mantle | (outgoing up) · burst on you, anchored to you · allies only | Extension | B | Also needs the proposed anchor to a unit. |
| Elemental Weapon | (outgoing up) · single · lingering | Extension | B | — |
| Haste | an extra action · single · allies only | Extension | A | — |
| Hypnotic Pattern | units in a burst lose turns | Extension | A | — |
| Lightning Arrow | burst at the next unit you hit | Extension | C | — |
| Revivify | bring back a downed ally | Extension | H | — |
| Slow | units lose actions · burst | Extension | A | — |
| Stinking Cloud | units lose actions · burst · lingering | Extension | A | — |

## Levels 4 to 6

53 spells: 33 easy, 7 awkward, 13 need an extension. Higher levels fit better: most big spells are bigger areas, walls and summons, which the grammar handles well.

| Lvl | Spell | Circle | Verdict | Gap | Note |
| --- | --- | --- | --- | --- | --- |
| 6 | Arcane Gate | portal · burst · extra point · lingering | Easy | — | — |
| 6 | Blade Barrier | wound · wall · lingering | Easy | — | — |
| 4 | Blight | wound · single | Easy | — | — |
| 6 | Chain Lightning | wound · chain | Easy | — | — |
| 6 | Circle of Death | wound · large area | Easy | — | — |
| 5 | Cone of Cold | frost · cone · ring wound | Easy | — | — |
| 5 | Conjure Elemental | summon · single · ring fire / frost / stone | Easy | — | — |
| 4 | Conjure Minor Elemental | summon · burst (several weak bodies) | Easy | — | — |
| 4 | Conjure Woodland Being | summon · single | Easy | — | — |
| 5 | Destructive Wave | wound · ring shape on you · ring push | Easy | — | — |
| 6 | Disintegrate | wound · bolt · ring dispel | Easy | — | Dispel clears things like walls. |
| 5 | Dispel Evil and Good | dispel · single | Easy | — | Dispel clears summons too. |
| 4 | Fire Shield | protect · self · lingering · ring fire (or frost) | Easy | — | — |
| 5 | Flame Strike | fire · burst · ring wound | Easy | — | — |
| 4 | Freedom of Movement | dispel · single · allies only · lingering | Easy | — | Lingering cleanse stands in for immunity. |
| 4 | Grasping Vine | pull · single · more range | Easy | — | — |
| 5 | Greater Restoration | dispel · single · allies only | Easy | — | — |
| 4 | Guardian of Faith | summon · single · ring wound, stone | Easy | — | — |
| 6 | Harm | wound · single | Easy | — | Lowering max health dropped. |
| 6 | Heal | mend · single · ring dispel | Easy | — | — |
| 4 | Ice Storm | frost · large area · ring wound | Easy | — | — |
| 5 | Insect Plague | wound · large area · lingering | Easy | — | — |
| 5 | Mass Cure Wounds | mend · large area · allies only | Easy | — | — |
| 6 | Otiluke's Freezing Sphere | frost · large area · ring wound | Easy | — | — |
| 4 | Otiluke's Resilient Sphere | stone · single · ring protect | Easy | — | Encased and protected; works on friend or foe. |
| 4 | Phantasmal Killer | wound · single · lingering | Easy | — | Fear part dropped. |
| 6 | Planar Ally | summon · single | Easy | — | — |
| 4 | Stoneskin | protect · single · lingering | Easy | — | — |
| 5 | Telekinesis | portal · single · extra point | Easy | — | Moves the unit to a chosen hex. |
| 4 | Wall of Fire | fire · wall | Easy | — | The Fire wall preset. |
| 6 | Wall of Ice | frost · wall · ring wound | Easy | — | — |
| 5 | Wall of Stone | stone · wall | Easy | — | — |
| 6 | Wall of Thorns | wound · wall · lingering | Easy | — | — |
| 5 | Cloudkill | wound · large area · lingering, drifts each round | Awkward | E | Drift exists only on global effects (push sweeps). |
| 5 | Contagion | wound · single · lingering, worsening | Awkward | — | No effect that grows over its duration. |
| 6 | Create Undead | summon at a corpse | Awkward | H | — |
| 4 | Dimension Door | portal · self · a point, bring an ally | Awkward | J | — |
| 4 | Evard's Black Tentacles | wound · large area · lingering · ring stone | Awkward | I | Hits and anchors; restraining units in it is the stone gap. |
| 6 | Flesh to Stone | stone · single · lingering, worsening | Awkward | — | Encase fits; turning to stone over rounds doesn't. |
| 6 | Sunbeam | wound · line, recast each round | Awkward | E | One cast fits; repeating doesn't. |
| 5 | Banishing Smite | banish the next unit you hit | Extension | C, L | — |
| 4 | Banishment | take a unit off the board for a few rounds | Extension | L | — |
| 4 | Confusion | units act at random | Extension | G | Would become a fixed rule (attack nearest). |
| 4 | Death Ward | trigger: when it would drop to 0 · protect · allies only | Extension | H | — |
| 4 | Dominate Beast | target joins your side | Extension | G | — |
| 5 | Dominate Person | target joins your side | Extension | G | — |
| 6 | Eyebite | lose turns / flee / outgoing down, recast each round | Extension | A, B, E | — |
| 6 | Globe of Invulnerability | an area spells can't enter | Extension | M | — |
| 4 | Greater Invisibility | ally can't be targeted, even while acting | Extension | D | — |
| 5 | Hold Monster | target loses its turns | Extension | A | — |
| 6 | Otto's Irresistible Dance | target loses its turns | Extension | A | — |
| 5 | Planar Binding | a summon stays on your side | Extension | G | — |
| 4 | Polymorph | turn a unit into a weak creature | Extension | L | — |

## Skipped spells

37 spells (plus variants) don't fit a tactical hex battle, so I left them out instead of forcing an equivalent.

| Spells | Why skipped |
| --- | --- |
| Dancing Lights, Light, Friends, Mage Hand, Thaumaturgy, Minor Illusion | Exploration or social; no combat effect to rebuild |
| Shillelagh, Flame Blade, Shadow Blade | They conjure or upgrade a weapon. Revisit if the game gets basic attacks (open question 1). |
| Charm Person, Disguise Self, Speak with Animals, Speak with Dead, Detect Thoughts, Enthrall, Seeming | Dialogue or social |
| Feather Fall, Enhance Leap, Grant Flight, Gaseous Form, Wind Walk | Height and flight; the hex grid has no height |
| Goodberry, Create or Destroy Water, Heroes' Feast | Items, BG3 surfaces, or rest effects outside a battle |
| Arcane Lock, Knock, Darkvision, See Invisibility, Pass Without Trace, Feign Death | Exploration and stealth |
| Bear's Endurance, Bull's Strength, Cat's Grace, Eagle's Splendour, Fox's Cunning, Owl's Wisdom, Enhance Ability | Ability scores; the game has none |
| Variants of Animate Dead, Conjure Elemental and Planar Ally | Duplicates of the base spell |

A few wiki entries looked like item or special-ability variants rather than class spells (for example Burning Age, Bolts of Doom and Dethrone). I left them out.
