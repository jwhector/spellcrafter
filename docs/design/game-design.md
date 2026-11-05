# The Hollow: game design

Nov 2, 2026 · @Jared

A deck-building roguelike RPG inside the bot. Players collect and trade runes, build spells from them, and fight in short battles where all players act at once, then all enemies act, against enemies whose next move is shown as a rune circle. Each battle stands alone; runes, Levels and shared server progress carry across sessions, so people can drop in for one battle or play for an hour.

Working setting (names not final): the server is a Keep built over the Hollow, a place monsters climb out of, and players are Wardens. The tone is serious and self-contained, like Slay the Spire, and kept separate from the bot's glizzy humor.

## Design goals

- Easy to pick up, with strategy that emerges from simple parts.
- Played on and off, at will, plus special events.
- Works with any number of people online, and scales with how much time someone has.
- Social: trading, support and coordination are central.
- Progression and rewards are rock solid, because this group is very reward-motivated.
- Mobile friendly.

## Battles

**Decided**

- Battles run in single rounds, inspired by Stolen Realm: all players act in the same phase, then all enemies act together. (Full 5-turn queuing was dropped on Nov 2: with everyone present, it removed the ability to adapt.)
- Everyone in a battle is expected to be present for planning. No late joiners. If someone leaves, a fallback plays their seat (details open).
- Decided (Nov 3): each enemy shows only its next move, Slay the Spire style, drawn as its rune circle. Deciphering the circle is optional and gives an advantage; players who don't can still play. (Was: the enemy shows its moves for 5 turns with the order hidden.)
- Players can affect each other's actions (support, combos between players).
- Conditional (if/then) abilities exist and are powerful.
- A limited resource stops players from simply defending every turn. Since Nov 2–3 that resource is the action and bonus action each round, plus spell cooldowns.
- Positioning is important: battles happen on a hex grid (around 7×7, size open). Actions in the players' phase are live: they land the moment you take them. The resource is per round. Each round you get an action and a bonus action (like D&D): the bonus action is either a move or certain kinds of spells, so moving is a choice, not a given (like Gloomhaven). Standard movement is 1 hex, and the game is designed around that.
- Displacement (moving units with spells) and terrain manipulation are major mechanics. The feel leans toward classic RPG combat rather than a pure puzzle like Into the Breach: borrow its ideas, not its puzzle focus.
- A battle is won by bringing the enemies' HP to zero. Bonus objectives can also exist (possibly tied to a skilling system Jared is considering; to discuss later).

**Proposed**

- During the players' phase, actions land live (decided above), so teammates see each other's moves and can build on them. The phase ends when everyone has pressed End turn, or after a timer (about 30 seconds).
- A battle is about 5 rounds, 2–3 minutes. In a chat proxy, one shared board message would update as actions land (batched to stay within Discord's edit limits).
- Difficulty scales with headcount (more enemy moves and health). Some fights require specific capabilities, so scaling isn't perfect, by design.
- No dice in battle (the uncertainty was the enemy's order; revisit now that the next move is shown); dice stay for events.

### Proposed: making tanking and support necessary

The principle: build fights a team of pure damage can't win, and give protectors and supporters tools that only work because of the grid, the shown enemy intent and scarce movement.

**Tanking**

- **Readable enemy targeting.** Enemies choose targets by visible rules (nearest, lowest HP, whoever hit them last). A tank controls who gets hit by where they stand, or by forcing an enemy to target them.
- **Body blocking.** Units can't pass through each other, and stepping next to a sturdy unit can stop an enemy's movement. Terrain creates chokepoints for a tank to hold.
- **Line and cone attacks stop at the first unit,** so standing in front shields whoever is behind.
- **Spikes only a tank survives.** Some enemy moves would drop a fragile character in one hit. *The enemy's shown intent warns the party, and a tank answers it by standing in the hit's path or forcing the enemy to target them. (Updated Nov 4: this used to rely on the hidden order.)*
- **Hard to move.** Tank builds can resist displacement, so they anchor the line.

**Support**

- **Granting movement.** Movement is scarce (1 hex), so pulling an ally out of a danger zone, swapping places, or giving someone an extra move is one of the strongest things a player can do.
- **Downed, not dead.** At 0 HP a player is downed and needs an adjacent ally to spend their action to bring them back. Reaching them is a positioning problem.
- **Problems only allies can fix.** Some enemy effects can't be removed by the affected player, only by a teammate.
- **Information is support.** Deciphering an enemy's rune circle and telling the party its exact area, push directions and side effects helps everyone plan.
- **Setup.** Shaping terrain (cover, safe zones) and priming elements so a teammate's spell lands harder.

**Making it necessary, not just nice**

- **Encounter design:** enemies with attrition that outpaces a pure-damage team, big spikes, and effects that need an ally to clear.
- **The power budget helps:** because total power is capped, a team that spends it all on damage has nothing left for survival.
- **Rewards by contribution:** damage prevented, allies saved and healing count as much as damage dealt for drops and recognition. With a reward-motivated group, this matters most.

## Runes and spells

**Decided**

- No fixed classes. Players collect runes, and the runes you bring decide the role you play.
- Runes belong to schools (the set and names are Jared's to design). Elements are one kind: basic and easy to understand.
- A spell is built from runes. Its power comes from the quality of its runes and how many it has.
- Each battle sets a power budget, normalized to who's in it. Veterans bring more options, not more raw power.
- Levels unlock new kinds of runes: progressive disclosure of mechanics, not stronger runes.

**Open:** the exact spellcrafting rules (Jared is designing them). Since Nov 3 there are two candidate systems to A/B test (System A and System B, below). They need to be simple enough that anyone is excited to use them, with emergent depth for strategic players.

**Proposed:** wild runes, temporary runes drafted at the start of each battle that last only for that battle, to give every fight a roguelike feel. Decided Nov 3: they're in, as a shared pool for the party (below).

**Jared's idea (Nov 3): live spellcrafting (later simplified; see the update and the Nov 3 decisions below).** Each round you draw a set of runes. You place the runes you drew into a configuration, a layout of slots, to form spells. Where a rune sits decides how its power is channeled into the spell. Still a deck builder: what you draw comes from the runes you own. Spells will lean offensive, defensive or supportive, but roles come after the core mechanics.

**Open questions on it**

- Where configurations come from: a few fixed ones everyone knows, or collected and upgraded like runes (two collections: what you slot and what you slot into).
- What a slot can change about a rune: strength, area shape, range, element, timing.
- Is the drawn hand the per-round resource (no separate mana), and how does it map onto action and bonus action?
- Do unused runes carry over to the next round?
- How fast crafting stays with a \~30 second live phase on a phone: number of slots, tap-to-place, a quick-cast option.
- Can players hand runes to each other, or slot into a teammate's configuration?
- Idea to test: the configuration's layout is a small hex pattern, and the pattern you fill becomes the spell's shape on the battlefield.

**Update (Nov 3):** Jared thinks full live spellcrafting is probably too heavy; simplicity is key for a wide audience. Proposed simplification: **craft between battles, cast during battles.** You build spells from runes in chat with no timer; in battle you draw your built spells, and each round you may also draw one loose rune to attach to a spell with a single tap. The depth sits in preparation, the live round stays one or two quick decisions.

**Decided (Nov 3)**

- Spells are crafted from runes between battles, not during them.
- A player keeps roughly a dozen spells at most.
- In battle, spells sit on a hotbar and have cooldowns. A spell's cooldown is calculated from its power (stronger spell, longer cooldown).
- Live crafting comes from wild runes: a shared pool for the whole party that scales with group size. The party decides together who uses which rune.

**Open**

- Hotbar size: how many of your crafted spells you bring into one battle.
- The cooldown formula. With \~5-round battles, cooldowns are small numbers (0–4 rounds), and the strongest spells are once per battle.
- Whether the per-battle power budget is still needed alongside cooldowns (budget keeps veterans and newcomers fair; cooldown paces a single battle).
- A basic always-available action (no cooldown), so nobody is ever stuck with everything recharging.
- Wild runes: how many appear per round, whether attaching one raises that spell's cooldown, and how players claim them live.
- Randomness: with a hotbar there is no draw, so the deck-building lives in crafting and collecting, and wild runes supply the per-battle randomness. Is that enough?

**Decided (Nov 3, later)**

- Cooldowns are small numbers.
- Wild runes never raise cooldowns.
- A spell's cooldown doesn't change when it's upgraded; a completely different spell can have a different cooldown. Clear rules are needed for upgrade vs new spell.
- There is a basic action with no cooldown.
- Jared wants something better than a hard power budget for normalization, ideally part of the crafting and slotting itself.

**Proposed: normalization built into the configuration**

- **The configuration sets the cooldown and the number of slots,** fixed when the spell is created. A small configuration (1–2 slots) comes back every round or two; a large one (5 slots) is once per battle.
- **Upgrade vs new spell:** swapping runes inside the same configuration is an upgrade, and the cooldown stays. Changing the configuration makes a new spell with its own cooldown. One clear rule, no hidden math. (Changed Nov 3: runes are consumed when learning a spell, so an upgrade means learning it again; see the System B section.)
- **Rune quality is matched to the battle,** invisibly: inside a fight, very high-quality runes are scaled to the fight's strength. Veterans keep more options and better combinations, not bigger numbers. (Like level sync in MMOs.)
- **Everyone has the same hotbar size,** so total power is bounded by slots and cooldowns, not a points total.

### Sigils and runes

**Decided (Nov 3):** the configuration is called a **sigil**. (This section describes System A; see the A/B fork below.) Sigils are learned by playing and can never be traded. Possibly learned by consuming an item (open).

**Proposed split: the sigil is the form, runes are the substance**

|  | Sigil | Rune |
| --- | --- | --- |
| What it decides | Slot count, cooldown, slot layout (how each slot channels a rune), area shape, range, what it can target, action or bonus action | Element, effect (damage, heal, shield, push, terrain), strength (quality) |
| How you get it | Learned by playing (bosses, quests, depth, discoveries) | Drops, trading, fusing |
| Owned how | Knowledge: permanent, personal, never traded | Items: collected, traded, fused, offered |
| Progression meaning | What you've *learned*: shows experience | What you *own*: shows collection and wealth |

- **Slots channel runes differently.** Example: the center slot applies a rune at full strength to the target, an outer slot applies it at half strength to the area around, another slot turns it into terrain. Same rune, different result depending on where it sits.
- **Slots can have constraints** ("only an element here"), which makes crafting a small puzzle between battles.
- **References:** Path of Exile (skill gems in linked item sockets) and Diablo 2 runewords (runes in a socketed item form a named effect). Both separate the container from what goes in it.

**Worked example (illustrative): a 2-slot line sigil.** Shape: a line 3 hexes out from you. Action, cooldown 1. The *tip* slot applies its rune at full strength to the first unit the line hits; the *trail* slot applies its rune to every hex along the line as terrain.

- Fire at the tip, frost in the trail: burns the first enemy and leaves ice along the line.
- Push at the tip, fire in the trail: shoves the first enemy back along the line onto burning ground.
- Heal at the tip, shield in the trail: heals the first ally in line and protects the hexes leading to them.

**What a sigil can decide, with examples**

| Property | Example sigil |
| --- | --- |
| Shape | 3-slot triangle (a cone): front slot hits the nearest row at full strength, back slots hit the wider rows at half |
| Origin | 2-slot through-ally: cast onto a teammate; slot 1 affects the ally, slot 2 everything adjacent to them |
| Targets | 1-slot ring around you: applies its rune to all 6 neighboring hexes (push everyone away, or heal adjacent allies) |
| Action cost | That same 1-slot ring is a bonus action, so it can be used instead of moving |
| Timing: delayed | 2-slot marked point: mark a hex 3 away; next round it erupts (slot 1 at the center, slot 2 in a ring). Telegraphed like enemy attacks |
| Timing: triggered | 1-slot reaction: fires when an enemy steps next to you during the enemy phase (the if/then idea) |
| Duration | 3-slot wall: a line of 3 hexes sideways in front of you, terrain lasting 2 rounds, middle slot stronger |
| Movement | 2-slot dash: move up to 2 hexes in a line (beyond the 1-hex rule) and apply the runes to whatever you pass |
| Slot rules | A slot that doubles the rune beside it, a slot that copies its rune to the next ally who acts, a slot that only takes elements |

**Proposed: every rune has three readings.** A rune always means the same thing, but how it shows up depends on where the sigil sends it: onto a **unit**, onto the **ground** (terrain), or onto **yourself**. Players learn one meaning per rune, and the sigil does the translating.

| Rune (illustrative) | On a unit | On the ground | On yourself |
| --- | --- | --- | --- |
| Protect | A shield that absorbs damage | A barrier hex that blocks line attacks and movement | You take less damage this round |
| Fire | Damage now plus burning | Burning hexes that hurt whoever stands there | Your next spell deals extra fire damage |
| Frost | Slowed or frozen in place | Ice: units slide one extra hex when pushed or moving | You can't be pushed this round |
| Force | Pushed one hex away from the source | A hex that pushes whoever enters it | You move one extra hex |
| Mend | Heals | A healing zone for allies standing in it | Heal yourself |
| Stone | Stunned briefly | Raises an obstacle (blocks movement and line of sight) | Hard to move and harder to hurt |

Examples with Jared's two questions:

- **Dash sigil + protect:** you dash and gain a shield on the way in. If the dash's other slot puts protect on units passed, every ally you run past gets a shield too: a rescue run.
- **Wall sigil + protect:** the wall becomes a barrier that blocks enemy line attacks and blocks movement for 2 rounds. With fire instead, it's a burning line enemies won't want to cross; with frost, a slippery line that sends pushed enemies sliding.

Keeping it simple: around 8 runes at launch (the System B map page uses 13 to test the grammar). Variety comes from runes × sigils × slot positions, not from a long rune list. Modifiers (doubling, copying, extending) live on sigil slots, so runes stay pure effects.

### Direction, rune interactions, linking and the forge (Nov 3)

**Decided**

- **Sigils are geometry, runes are effects.** A sigil sets shape, slots, timing and where the spell starts (you, a target hex, an ally). Effects, including movement of units, come from runes.
- **Movement runes work relative to the spell's starting point:** a push sends units away from it, a pull drags them toward it. So a circle with a push is an outward blast and a circle with a pull is a vortex; no separate vortex sigil.
- **Exception:** sigils that move the caster (dash, leap) stay sigil-defined, because the caster's travel is part of the geometry.
- **Runes affect each other in significant but subtle ways,** through the board: a rune leaves a visible state on a unit or hex (burning, frozen, rubble) and later runes react to it. Inside one spell, slots fire in order (in System B, order only matters where runes depend on each other; see the Nov 4 order rule). Rules follow common sense so players can guess them (model: Breath of the Wild's chemistry rules), and they live as a table of runes against states, so adding a rune means adding one row.
- **The forge previews every spell** on a small grid (hexes hit, push and pull arrows, terrain left behind): complex to build, simple to read.
- **The spell forge (Jared's idea).** A spell's identity is its recipe (sigils plus which runes sit in which slots; in System B, the circle after sorting and merging). Players pick a look from ones others have made for that recipe, or commission a new one. A brand-new recipe is announced as new, the player proposes its look and feel, and the look incubates in the forge until ready. A new spell is playable right away with a default look, so visuals never hold up play. Goal: keep the incubation lag short with a good pipeline.
- **Multimodal spells by linking sigils** (like Ars Nouveau or Oblivion: a projectile that raises a wall where it lands).
- **Linking is done by special high-level items,** separate from runes (name to be decided). They decide the trigger and how the sigils connect.
- **Cooldown alone can't balance powerful spells:** a strong enough spell only needs one use, and filling the hotbar with them would be broken.

**To playtest**

- **Spells start the battle charging:** each spell waits out its cooldown once before its first use, so big spells arrive late in the fight and one action per round limits how many fire.
- **One heavy slot on the hotbar:** only one high-cooldown or linked spell can be equipped at a time.

**Proposed**

- **Linking at the end point:** the second sigil casts from where the first ends (where a projectile lands, a dash stops, a mark erupts), and direction carries over (a wall forms across the projectile's path).
- A linked spell's cooldown is the sum of its parts, it always costs a full action, and chains are 2 sigils long (maybe 3 at high Level). The whole chain counts as one recipe in the forge.
- **Bosses blunt burst** with phases or a per-round damage limit, so one huge hit can't skip a fight.
- **A complexity ladder for progressive disclosure:** one sigil and one rune, then multi-slot sigils, then rune interactions, then linking.

**Open**

- [ ] Names for linking items and the set of trigger types
- [ ] Are linking items tradable like runes or bound like sigils?
- [ ] The rune-by-state interaction table

**Open**

- [x] Does the sigil or the rune decide area shape and targeting? Answered Nov 3: the sigil decides geometry, runes decide effects.
- [ ] Slot constraints: yes or no?
- [ ] How many sigils exist, and how many can one player know?
- [ ] If sigils are learned from an item, can that item be traded? A tradable item effectively makes sigils tradable.
- [ ] Can a player teach a sigil to another player (social, but not trading)?

### Two crafting systems to A/B test (Nov 3)

Decided: Jared wants to playtest two crafting systems side by side instead of picking one now.

- **System A: sigils plus runes.** Fixed sigils (learned by playing, never traded) set the shape, slot count, cooldown and timing. Runes fill the slots. Multimodal spells need linking items. The sections above describe this system.
- **System B: a freeform circle**, inspired by Witch Hat Atelier. A spell is a circle with:
  - a **center rune**: what the spell is (an item you can trade);
  - **surrounding runes**: what it adds (items you can trade);
  - **inscriptions** (Jared's name): shape, range, targeting, timing and movement. Inscriptions are learned by playing, permanent and never traded, so they take over the progression role sigils play in System A.

Decided for both systems: inverses are separate runes, not flipped faces (push and pull, fire and frost, summon and dispel, protect and expose, mend and wound, portal entry and exit, and so on), for wider loot and trading.

Proposed for System B:

- Circle size (the number of slots around the center) grows with Level. It is the power budget and keeps early choices small. Inscriptions use circle slots too, so they are never free power.
- Cooldown comes from circle size plus inscriptions, so swapping in a better rune never changes it. Adding a rune makes a new spell.
- One shape inscription per circle. Runes with geometry needs check them against it (a portal needs two points).
- Surrounding runes only add, never restrict. Dispel + fire clears an area and then sets it burning, not "dispels only fire". Order matters: fire + dispel is a fire attack that burns through shields.
- (Superseded Nov 3 by the hook table below: one entry per ring rune per column, no pair table.) Pairs with no designed meaning fall back to "both effects apply". Interesting pairs come from a fixed, curated table, drafted offline with Claude and chosen by Jared, so the game never improvises.
- Worked example: center portal, surrounding pull, plus inscriptions for an area at range and a second target point. Everyone in area A is pulled to its center, then moved through the portal to point B in the same formation (nearest free hex if one is taken). It fills 3 slots around the center, so it is a mid-level spell. It hits allies too, unless another inscription limits it to enemies. In System A the same spell needs a linking item, which makes it a good A/B test case.

Open: how circle size grows with Level; whether inscriptions can also drop as loot (more trading) or stay learned only (protects progression).

### Rune reference: what every rune does (Nov 5)

Every rune can sit in the center or in the ring, and it does a different job in each. In the center it decides what the spell makes. In the ring it changes that output, and the column it uses depends on what the center made. These are the crafter's current entries. They're all Proposed, and the six runes added Nov 4 are amplification, diminishing, haste, slow, invisibility and revelation (Jared named them Nov 5).

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

**Decided Nov 5 (Jared), from the ring vs center audit:** ground gets no exception; a ring entry may duplicate its rune's center effect only if it's always weaker than that rune as the center; and only a dispel center can target a spell, with its ring runes deciding what happens to the spell. **Proposed:** a ring duplicate of a scaling effect (damage, healing, shields, percentages, distance) is at most half the center's strength, and an all-or-nothing effect (an extra action, a lost action, hiding, encasing) never duplicates in full in the ring. That's what stops a portal with haste from hasting the whole party, while a portal that heals travelers stays. The per-column review, with an argument for every ring cell (24 change), is in the [spell model doc](https://claude.ai/artifact/4y6uFQU9JdJzypvaTp21Jk) under "Per-column review".

**Decided later Nov 5 (Jared):** Push and Pull stop being runes and become inscriptions, so every player can make any spell shove units away or draw them in. That leaves 16 runes; they were each other's opposites, so no other rune loses its opposite. Forced movement is paid from the spell's budget by hexes moved times units moved. Their old ground and global entries (current, whirlpool, gale) come back as these inscriptions on lingering ground or a global spell. A spell that only moves things will use a new **blank** rune (Jared's name) in the center, so a spell can be just a push or pull, with its mechanics still Open. Also decided: center effects stay unique to the center, ring runes always do something different, and combos come from linking. That retires the per-column review above. The budget rules and the ring review are in the [effect flags checklist](https://claude.ai/artifact/9rXv5JzM92A2QwSakkonN3). The rune tables in this doc and the crafter still list Push and Pull until the ring review is done.

**In progress (paused Nov 5): ring review.** Every ring idea is being reviewed column by column in the effect flags checklist. Done: at a point or on a unit, and through a gate. Next: on a summon, then on ground, along a tether, on a spell and global, plus a check of ring runes on a Protect shield. Also decided during the review: on a made thing (gate, summon, shield, ground), ring runes change the thing itself rather than adding an effect, and every rune gets a meaning in every column.

### System B: circle grammar and code model (Nov 3)

Everything here is Proposed unless marked otherwise. It builds on the section above.

**Reading a circle**

- With no shape inscription, a spell hits a single target in range. That default is free.
- Inscriptions decide the points, in order. A burst has 1, a dash or leap has 2 (start and landing), a chain has 3, and an extra-point inscription adds one.
- The ring splits into one section per point. Surrounding runes act at their section's point, in clockwise order, and direction is measured from that point (push away, pull toward). With one point, the ring is a single section, so new players never see the split.
- A rune or inscription that needs two points (portal, or a tether) uses the caster as its second point when the spell has only one.
- Each center rune defines how its ring is read. Summon: what the summon is made of. Protect: what happens to anyone who hits the shield. Portal: what happens to whoever goes through.

**Shape inscriptions** (one per circle)

- Starter: single target (the free default), self, bolt (stops at the first unit it hits), burst (a hex plus its 6 neighbors, at range).
- Learned: line (3 hexes, hits everything), cone (rows of 1, 2 and 3), ring (the 6 hexes around a point, not the point), wall (3 hexes at range, leaves terrain), dash (move up to 3 in a line; 2 points), leap (like dash, over units and obstacles; 2 points), chain (jumps to the nearest other unit twice; 3 points), large area (radius 2; costs 2 slots), whole battlefield (a global modification; costs 3 slots; added Nov 4), a spell (aims at an enemy's shown move or an ally's prepared spell; added Nov 4).
- Other inscriptions: extra point (stacks up to 3 since Nov 4), more range, delay, lingering, enemies only or allies only, triggers, and since Nov 4 follows the unit, steerable and weakest first. (Targeting a spell was added as an inscription on Nov 4 and became a shape the same day.) These are major inscriptions, for the whole circle; minor inscriptions attach to one ring rune (see the spell model doc).

**Triggers**

- Instead of one reaction inscription, there's a set of trigger inscriptions, each naming an event: when it's hit, when something enters, when it's moved, when it drops below half health, when it attacks, and since Nov 4 when it dies and when it would drop to 0.
- The spell's point decides whose event it watches.
- Proposed Nov 4: when the event involves two units (an attack, a hit), harmful runes land on the other unit and beneficial ones on the watched unit. So a smite is self + "when it attacks" + the rider as the center.
- A trigger spell waits through the next enemy phase, fires once, then goes on cooldown. Triggers let players answer an enemy's shown move before it lands.

**Conflict rules (from trying to break it)**

- One shape per circle is the only true exclusivity.
- Where order matters, runes fire in order: pull then push means drag in and launch. Runes that don't depend on each other swap freely (Nov 4 order rule below).
- Runes change targets, inscriptions change the spell (so a delay inscription and a hasten rune never collide).
- Every rune fires once per cast; nothing re-triggers, and chains stop at a fixed depth.
- Opposite effects on the same recipients cancel by amount (mend and wound, protect and expose, fire and frost). Opposite movers both happen, in ring order. Where a column turns the two into different traits (on a summon, along a tether or on a spell), both apply.
- A duplicate rune adds strength, never extra copies.
- A unit standing exactly on the point is pushed in the spell's direction of travel, or stays put on a self-cast.
- The forge preview flags combos that are legal but do nothing.
- Decided (Nov 4): friendly fire is on by default. The enemies-only and allies-only inscriptions narrow a spell when you want that.

**Code model** (Jared: makes sense)

- A center rune creates a thing (a gate, a summon, a shield, a hit) and exposes hooks. Ring runes are instant actions applied at those hooks. Inscriptions say where and when. For example, portal at the center makes a lasting gate anyone can walk through; portal in the ring is an instant move.
- Thirteen engine primitives build everything: damage, heal, move, apply status, place terrain, create thing, remove, link, alter spell, add global rule, listen, wait, and set aside (added Nov 4 for summon on a unit) (the spell model doc lists what each reads and changes).
- Each ring rune has one entry per hook type (eight since Nov 4: at a point, on a unit, on ground, along a tether, through a gate, on a summon, on a spell, global modification), stored as data. Proposed: a ring rune that matches the center adds strength to the center, which covers the only cells left empty today. That's roughly 140 short entries for 18 runes, not hundreds of pair rules.
- The forge compiles a circle into a fixed list of steps. Battles and the forge preview run the same list, and the list is the recipe's identity.
- An event queue runs triggers, gates and lingering terrain.
- Testing: compile every combination up to a given size and check that each one runs, ends, and does something.

**Worked examples**

- Gather and scatter: portal at the center, pull in section 1, push in section 2, burst plus an extra point. Pull drags everyone at A into the gate, they come out at B, and push scatters them from B's center.
- Damage sharing (updated Nov 4): protect at the center, the redirect tether inscription, allies only, lingering. You take part of an ally's damage for a few rounds; the share comes from the protect rune's quality.
- Superseded Nov 4 (tether is no longer a rune; needs a new recipe). Rescue or taunt: tether at the center, portal then summon in the ring, burst. Everyone in the burst is linked to you, travels the link to stand next to you, and a decoy appears where they were.
- Superseded Nov 4 (open: snap-back needs a home). Round-trip door: portal at the center, tether then summon in the ring, burst. A gate joins area A and the hex next to you for the round. Anyone who walks through stays linked to where they entered and snaps back at round end; a decoy appears where the first traveler stepped in. Enemies can use it too.

Open: which runes ship first, and the hook entries for each.

**To revisit while building: when ring order matters**

Order in the ring matters when a rune moves, connects or creates, or changes the numbers the next rune uses (expose, protect). Plain effects on the same targets (mend + protect) give the same result in either order. (Refined Nov 4 below: order is declared per hook entry and computed.) Proposed: the forge sorts runes whose order doesn't matter before computing the recipe, so both orders are one spell (same look and discovery credit), and draws interchangeable runes joined in the ring. Recheck which runes count as order-independent as the rune list and hook entries grow.

**Decided later on Nov 3**

- Runes are consumed when used to learn a spell. That's a rune sink in itself.
- Enemies show their next move as a rune circle (Slay the Spire intent). Deciphering it is an optional puzzle that gives an advantage. The old "show 5 moves, hide the order" idea is dropped.

Proposed with these:

- A learned spell is permanent and never traded. Upgrading means learning it again with better runes, which consumes them, so the old "swap runes freely" upgrade rule changes.
- The forge preview (plus a practice target) lets players test a circle before consuming anything.
- Next to each enemy circle, a plain hint (attack, defend, move, with its target) so the game stays playable without deciphering. Deciphering adds the exact area, push directions and side effects.
- Learning a rune yourself could help you read it in enemy circles, which rewards rune variety.
- To revisit: the tanking ideas and "no dice" leaned on the hidden order. The tanking ideas were updated on Nov 4 for the shown intent; dice are still open. Some uncertainty could stay by hiding which enemy acts first within the enemy phase.

**Decided Nov 4**

- The first prototype answers one question: is crafting a spell and then using it in a 5-round hex battle fun? Single device in a browser, 2–3 characters against one enemy group, no Discord or economy yet, Systems A and B on one engine.
- Friendly fire is on by default.
- Grid size: experiment with a grid that grows with the number of players. Keep in mind for now.
- The game will eventually move to its own repository, separate from the Discord bot, because it's a large build with more to it than the bot.

Interactive map of this grammar (circle builder, hook table, branching counts): [Spell Circle Grammar](https://claude.ai/artifact/7E3zWYPihzodDzW2MsMznG)

Formal spell model (property primitives, engine primitives, write modes, combination math): [The Hollow: spell model](https://claude.ai/artifact/4y6uFQU9JdJzypvaTp21Jk)

**Decided Nov 4 (summons):** on an area shape, a summon appears on every hex of the area, and the spell's power budget is split between them, so more summons means weaker summons. Every summon takes one hex.

**Proposed Nov 4 (order):** whether ring order matters is declared on each hook entry, not on the rune, because the same rune can be a step in one place and a trait in another. Each entry declares what it reads and what it changes (positions, damage modifiers, health, statuses, terrain, traits). Two neighbouring runes swap freely when neither changes something the other reads; health, statuses, terrain and traits simply add up. On a summon, every ring rune becomes a trait, so order never matters there.

**Decided Nov 4 (progression):** minor inscriptions (attached to one ring rune) unlock at a later Level, minor Who and When first, minor Where after. The rest of the minor inscription proposal is in the spell model doc.

### Vocabulary (working words, Jared to name)

The words in the last column are placeholders so we can talk about the parts. Jared's own words: sigil, inscription, global modification, property primitives, and major and minor inscription.

| Concept | Plain definition | Working word |
| --- | --- | --- |
| The whole spell layout | Center, ring and inscriptions together | circle |
| The center slot | The rune that decides what the spell makes | center rune |
| What the center makes | A hit, ground (since Nov 4), a gate, a summoned body or a shield | thing |
| The surrounding slots | Runes that act on the thing | ring runes |
| Where and when | Shape, extra point, range, timing, filter, trigger | inscriptions (Jared's) |
| A place the spell acts | Set by the shape; a burst has one, a dash two, a chain three | point |
| A part of the ring | The ring runes that act at one point | section |
| A column of the hook table | A kind of center output the ring modifies (eight since Nov 4) | hook type |
| One cell of the hook table | What a ring rune does to one kind of recipient | hook entry |
| A row group of the hook table | What a ring rune does: plain effect, amplifier, mover, maker, remover | (needs a word; "rune kind" is already used for what Levels unlock) |
| What an entry touches | Positions, damage modifiers, health, statuses, terrain, traits | channels |
| Runes that act together | Neighbours whose order doesn't matter | bundle |
| A lasting property | A ring rune that becomes part of a summon, ground or a tether | trait |
| Engine building blocks | The thirteen in the spell model doc: damage, heal, move, status, terrain, create, remove, link, alter spell, global rule, listen, wait, set aside | primitives |
| A spell's identity | The circle after sorting and merging; the same recipe is the same spell | recipe, recipe id |

**The columns are kinds of recipient (five at first, eight since Nov 4):** a place (a hex or area), a unit, a connection between two things, something passing through a gate, a summoned body, and since Nov 4 a spell, the whole battlefield and ground. Since the Nov 4 rule below, a column is the kind of output the center makes. A new mechanic adds a column only when it creates a recipient that can't be described as one of these. For example:

- An aura that follows a unit is still a place, so no new column.
- A projectile that stays on the board is a body, unless it can't be attacked, in which case it may need its own column.
- A counterspell or a reflect acts on an enemy's spell. That's a new kind of recipient, so a new column (added Nov 4 as the spell column).
- Battle-wide weather acts on the whole battle: a new column (added Nov 4 as global modification).

Every new column needs an entry from every ring rune (or a fallback), so new columns are the expensive kind of addition.

**Decided Nov 4: two new columns**

- **On a spell.** Reached with a new "targets a spell" inscription. The point is an enemy's shown next move (its rune circle) or an ally's prepared spell, and every rune acts on that spell instead of on units. Proposed entries (the same meaning whether the rune is the center or in the ring): dispel strips runes from it up to the dispel spell's power budget (the caster picks which; stripping the center cancels it, so a full counter needs a big circle), portal moves its area to another point, push and pull shift its area 1 hex, the copy tether inscription makes its caster share whatever it does to its targets, expose makes it hit harder (good on an ally's spell, risky on an enemy's), fire and wound hurt its caster when it casts, frost makes it go off last, protect softens it, mend heals allies it hits, summon gives a single-target spell a decoy to hit, and stone puts up a barrier that stops bolts and lines.
- **Global modification** (Jared's name). Reached with a new "whole battlefield" shape that costs 3 slots. It changes the rules of the whole battlefield for a few rounds and affects everyone, your side included. Proposed center rules (what each rune does as the center of a global modification; ring entries shape it, see below): fire makes burning last longer, frost removes bonus moves, mend heals everyone each round, wound damages everyone each round, protect reduces each unit's first hit per round, expose raises all damage, push slides every unit one way at round end, pull slides every unit toward the middle, portal links two random hexes as gates each round, summon brings a weak neutral creature in each round, dispel clears statuses and terrain, and stone turns the edge to rock, shrinking the battlefield.
- Proposed order rules: on both columns, ring runes act as traits (order-free), except that on a spell, movers (they shift its area) and dispel (it strips runes) keep their place. A global modification can't also target a spell (both are shapes, so this follows from one shape per circle).
- Presets on the map page: Strip a spell, Redirect, Shrinking arena.

**Decided Nov 4: ring runes modify the center's output**

Ring runes never act on their own. They modify what the center produces, so swapping a rune between the center and the ring always makes a different spell. The hook table column is chosen by the center's output:

- A summon, portal or protect center always outputs its thing (a summon, a gate, a shield) and uses that thing's column wherever it's aimed on the battlefield (a place, a unit, or the whole battlefield). A summon across the whole battlefield with push in the ring: creatures arrive each round and knock back whatever hits them.
- Any center aimed at a spell, thing centers included, outputs an altered spell, and the ring uses the spell column.
- A plain-effect center outputs an effect: on a place, on a unit, or (on the whole battlefield) a global effect. The ring shapes that effect. Fire center + push ring at a burst: the burning spreads 1 hex further out. Push center + fire ring: a shove that sets the pushed units burning. Fire center across the battlefield makes burning last longer; push in the ring makes the heat sweep across one row per round.

So each column now means a kind of center output, not a target. The global rules listed above are what a center rune does across the battlefield; ring entries in the global column describe how a rune shapes a global effect (sweep, close in, follow a unit, stay anchored). Still one entry per ring rune per column, so no pair table. The map page has the rewritten entries and contrast presets (Spreading fire, Burning shove, Global summons).

**Rune or inscription? Four tests**

1. Does it do something on its own (damage, move, create, change a unit)? Then it's a rune. Does it only change where, when, to whom or how often the runes act? Then it's an inscription.
2. Grammar: runes are the nouns and verbs. Inscriptions are the little words: at, when, after, only, twice.
3. Universality: an inscription has to make sense with every center rune. If a mechanic only makes sense with some, it's a rune.
4. Ownership: should players farm, trade and spend it? Rune. Unlock it once and keep it? Inscription.

Examples: casting again next round is an inscription (when). Invisibility is a rune (a status on a unit). Reflecting attacks is a rune whose thing is shield-like. An aura that follows the target is an inscription (where). A counterspell is a rune, and its recipient is the spell column (added Nov 4).

### Decided Nov 4: from the permutation sweep

A scripted sweep compiled every center, every shape, 9 inscription sets and every ring of 1 or 2 runes on the map page (about 250,000 circles). Jared's calls on what it found:

- [x] Beneficial effects go to allies first and harmful effects to enemies first, wherever a rune has a choice of recipient. Example: a shield with mend and wound in its ring heals the shield's bearer and hurts whoever hits it. Working reading: this decides who gets an effect when there's a choice (a shield's bearer or attacker, a summon's neighbours, a tether's two ends); an area still hits everyone standing in it, so friendly fire stays on.
- [x] Targeting a spell is a shape of its own: one spell per point, and an extra point adds a place (as in Redirect). Being a shape, it can't combine with the whole battlefield.
- [x] Portal on a spell with no extra point moves the spell onto the caster. Kept as an interesting interaction; the forge warns about it.
- [x] The whole battlefield shape can't take an extra point, more range or a trigger.
- [x] A shield's ring runes are order-free traits that fire when the shield is hit, following the beneficial and harmful rule above.
- [x] A ring rune that matches the center adds strength to the center, like a duplicate.
- [x] Gates and tethers with three or more points join each point to the next.
- [x] A self-cast portal or tether, and push or pull on yourself, are flagged as doing nothing. A self-cast summon appears next to you.
- [x] Opposite runes cancel only where their entries in that column are true opposites (at a point, on a unit, through a gate; sweep and close in on a global effect). Elsewhere both apply. Fire and frost count as opposites.
- [ ] Still open: can a filter (enemies only, allies only) narrow a global modification?

**Decided Nov 4 (gates on area shapes):** a gate's shape is its footprint. The area at the first point is the entrance, and units come out at the other end in the same layout, turned to face away from the entrance. Anyone in the area when it's cast goes through, and so does anyone who steps on those hexes that round. With no extra point the exit is you, so units in front of you come out behind you (the mirror). Relocating a whole area is powerful, so it needs the balance work below.

**Proposed: catching this kind of gap in general.** Each kind of thing (hit, gate, summon, shield) declares how it spreads over a shape: one per hex (summon, budget split), as a footprint (gate), one per unit in the area (shield), or as an area effect (hit). That's a small table of things by shapes (4 by 14), plus things by point count, and the sweep fails any cell with no rule. A new shape or a new kind of thing then can't ship with an undefined combination.

**Proposed: balancing area relocation.**

- Cost grows with units moved and distance, so a bigger footprint means a shorter reach for the exit.
- Units come out only on free hexes; a unit with no free hex stays where it was.
- Tank builds and bosses resist being moved (already a tanking idea).
- The test boards price displacement by what it causes (hazard damage, broken formations), so dropping enemies into fire costs what it's worth.

**Proposed: stopping duplicate spells from dodging cooldowns.**

- Decided Nov 4: A/B test two cooldown rules. Option 1: spells with the same center rune share a cooldown. Option 2: cooldowns sit on runes, not recipes. Casting a spell puts its center rune on cooldown for the spell's full cooldown and its ring runes for one round, and a spell can't be cast while any of its runes is cooling down. Option 1 is simpler but leaks: fire in the ring of a pull burst still burns, so it dodges a fire-center cooldown. Option 2 closes that but locks more of your hotbar after a big cast. Grouping spells by how similar their compiled effects are would be accurate but hard to predict.
- Runes are consumed when learning, so every copy costs runes.
- The audit tool searches for the strongest possible hotbar and checks it against the battle budget.

### Proposed Nov 4: design audit tool and engine test sandbox

Jared asked for two tools for working with the permutations.

**Design audit tool (designer-facing).** Compile every circle up to a size into its effect record, deduplicated by recipe id. Score each on the fixed test boards: cost, units touched, damage, displacement, terrain left. Group circles with the same effect signature, then surface what's worth a look: unique signatures with no near neighbour, the best power per slot, circles that do nothing, cancels, and big jumps from adding one rune. Clicking a result shows its compiled record, the hook entries behind it and a board preview, and it can be marked fine, bug or design question. Built on the map page's engine first.

**Engine test sandbox (implementation-facing).** Automated tests in the game repo. Every circle in the sweep must compile, run on each test board, finish, and produce a render plan with no missing assets. A headless browser screenshots a sample to catch visual breaks. It runs both orders of every neighbouring pair and checks the result against the swap rules, so a wrong read/change declaration fails a test.

### Decided Nov 4: kinds of tether, and a coverage audit

This came out of two questions: how to build a vampire wraith, and whether tether should be an inscription.

- **Decided Nov 4: the "along a link" column stays (now called "along a tether").** Anything that travels between two ends travels along a tether underneath, so the engine keeps one link and one column for it.
- **Decided Nov 4: each way of routing an effect along a tether is its own inscription.** There are three so far. Copy gives the effect to both ends (damage sharing). Redirect sends it to the other end instead (a curse that moves damage onto its target). Transfer takes it from one end and gives it to the other (the vampire wraith takes health from an enemy and gives it to you). They are the same tether underneath. In the UI they are separate inscriptions, and each one is balanced on its own numbers (cost, share, range, duration). These are plain descriptions; Jared names them.
- **Decided Nov 4: tether is no longer a rune.** It exists only as these inscriptions.
- **Proposed: follow becomes an anchor choice under Where.** A spell is anchored to a hex or to a unit, and an area anchored to a unit moves with it. The minor Where inscription already needs anchors, so this adds nothing new. Examples: a burst on yourself anchored to you is an aura (like Spirit Guardians), and a lingering fire zone anchored to an enemy burns around them as they move.
- **Proposed: snap-back becomes a lingering move.** Lingering statuses and terrain already end when they expire. Applied to movement, a lingering move undoes itself when it expires, and the unit returns to where it started. A lingering portal is the round-trip door; a lingering pull is a yank that lets go.
- **Proposed: the leash on summons becomes a fourth tether inscription that carries position** (stay within a few hexes of a point), next to copy, redirect and transfer. Or drop it if it isn't fun.
- **Done Nov 4 in the crafter and audit tool:** the tether rune is gone (12 runes), and tether is an inscription with four kinds. It joins the first point to the next point, or to you. The "along a tether" column now says what each rune sends along it: a payload for effects, protect (hits), expose, push, pull and dispel, and a tether-shaping meaning for portal, summon and stone. Copy and redirect carry the spell's payloads for 2 rounds (copy at half strength). Transfer turns damage the spell deals into healing at the other end and moves statuses it removes. Leash keeps the first end within 2 hexes of the other. New presets: damage sharing (protect + redirect), life drain (wound + transfer), vampire wraith (summon with wound + transfer), shared mend (mend + copy) and bodyguard (summon + leash). Tether on a spell keeps its old meaning as copy on a spell. **Still open:** what redirect, transfer and leash mean on a spell; whether a tether on the whole battlefield is refused (the tools refuse it for now, like the extra point); a new home for the old global tether entry (splash damage to neighbours); and the round-trip door, because lingering on a gate already means the gate stays open longer, which clashes with snap-back as a lingering move.
- **To do: a coverage audit of the gaps.** Jared uses Baldur's Gate 3 spells to test coverage: can the grammar build them? Write a broad set of BG3 combat spells as circles and tag each one as a fit, an awkward fit, or needing an extension. Then group the gaps by the four extension points (new primitive, output kind, property primitive, write mode) to find new primitives and see which ones buy the most coverage. A first guess puts coverage today at 70 to 80%. (Done Nov 4: of 176 BG3 spells that fit, 50% are an easy fit today, and four additions reach 76%. Ranked gaps and every spell are in the BG3 spell coverage audit doc: https://claude.ai/artifact/5msD9Jxa5fejQTnw3kX8qW . Later on Nov 4 every proposed fix was put in, which reaches about 95%; see the section below.) The gaps from a first pass:
  - action economy (Haste, Slow)
  - taking control of a unit (Command, Dominate)
  - unit stats (Polymorph, Enlarge/Reduce)
  - visibility (Invisibility, Darkness, Fog Cloud)
  - who picks targets (lowest health first; a mark that jumps on death)
  - steerable effects that are re-aimed each round (Moonbeam, Call Lightning)
  - a stored spell as a payload (Glyph of Warding, Contingency)
  - chance (Blink, Mirror Image), which would become deterministic

### Nov 4: extensions from the BG3 coverage audit

Jared went through the [coverage audit](https://claude.ai/artifact/5msD9Jxa5fejQTnw3kX8qW)'s open questions, then asked to put in the single-target bonus and every proposed fix. The full list, with the hook entries and engine changes, is in the [spell model doc](https://claude.ai/artifact/4y6uFQU9JdJzypvaTp21Jk) under "Nov 4 extensions from the BG3 coverage audit". The [crafter](https://claude.ai/artifact/7E3zWYPihzodDzW2MsMznG) and the [audit tool](https://claude.ai/artifact/L8oTdLrYdmrxAoh95TM9tX) both run it. Jared named the six new runes on Nov 5: amplification, diminishing, haste, slow, invisibility and revelation.

**Decided (Jared, Nov 4)**

- Basic attacks are in, so smites and weapon buffs are in scope.
- Units lean toward dying rather than going down.
- A concentration-like limit is wanted, in a separate conversation.
- No accuracy for now.
- Battlefields have terrain that players can reshape.
- Filters don't work on ground, and filter balance in general is in question.
- Inscriptions act in intuitive, continuous ways.
- How grounds stack, replace each other or react is future expansion.
- Control works through the enemy's shown move first.
- Single-target spells get a bonus, to answer "any spell made into a big area is strictly better".
- A spell that acts differently depending on its target would be its own designed mechanic. For now the circle decides what a spell does, and the target only decides where.

**Proposed and built into the tools**

- **Three new rune pairs** (18 runes in all). Amplification and diminishing change the damage and healing a unit gives. Haste and slow are plain effects that add or take away actions; slow on an enemy cancels its shown move. Invisibility and revelation: single, bolt and chain spells can't pick a hidden unit, but areas still hit it.
- **Protect and expose also change healing received**, not only damage.
- **A ground column.** A lingering hit on an area, or a wall, makes ground. The center sets its base trait and ring runes add traits, which don't depend on order. Opposite pairs cancel on ground, except summon and dispel. Units that die leave remains, and a summon raised on remains is stronger.
- **Lingering means one thing everywhere:** what the spell made lasts longer. On a place that's the ground, on a unit the status, on a thing the thing, on a global effect the rules, and on a spell the caster's next shown moves.
- **Extra points stack** up to 3.
- **New inscriptions:** follows the unit (an area anchored to a unit moves with it, like an aura), steerable (needs lingering; you move the area each round), and weakest first (unit picks go to the lowest health first).
- **New triggers:** when it dies, and when it would drop to 0.
- **Who a trigger hits:** on an event between two units, harmful runes land on the other unit and beneficial ones on the watched unit.
- **Targeting:** unit shapes (single, self, bolt, chain) can't aim at an empty hex, and a bolt that finds no unit does nothing.
- **New center readings:** stone on an area encases units already standing there. A self-cast portal with an extra point teleports you there. A summon aimed at a unit sets that unit aside and puts the body in its place (Polymorph, Banishment). Wound deals more to units below half health.
- **Single-target bonus:** about 15% more for single, bolt and self. That's a starting number to tune.
- **Underneath:** a thirteenth engine primitive (set aside); damage now reads health; turn order and targeting read statuses; listen has the new events.

**Still open:** names for the new inscriptions and triggers (the runes were named Nov 5); the concentration-like limit; the full ground stack, replace and react system; whether filters stay at all; and tuning the single-target bonus against the area shapes in the audit tool's value model.

## Rune economy

**Decided**

- Runes are never lost involuntarily. Decided (Nov 3): runes are consumed when you use them to learn a spell, which is a voluntary sink.
- Trading runes between players.
- **Fusing:** combining runes into a better one.
- **Offerings:** giving up runes for shared or server-wide rewards.
- Runes need enough churn that trading stays interesting.

**Pending:** overcharge (spend a rune for a one-time big effect).

**Proposed:** lending a rune to someone for one battle.

## Progression and structure

- People come and go between battles; each battle is complete on its own.
- The bot's existing Level (from lifetime XP) unlocks rune kinds. Proposed: level-ups also grant runes, and quests grant runes and unlock content.
- Proposed structure: dungeons the whole server pushes through together, where any victory counts toward progress; deeper fights check for capabilities; seasons reset the dungeons (the roguelike reset) while collections and Levels persist.
- Portals open in the server; anyone can join; the party votes on the path (a fight, a random event, or something else). Details deferred.
- Special events: big scheduled raids with mild stakes that never cost non-players anything.

## Platform

**Decided (Nov 2):** positioning matters, so battles are designed for the full experience: a Discord Activity with a tactical grid. Chat-only and other cut-down versions are playtesting proxies, built only as needed.

**Proposed split:** battles live in the Activity; everything between battles (portals, votes, trading, rune management, announcements) lives in chat, where it works best async.

- **Chat (between battles, and as a proxy).** Discord's newer message layouts, rendered images, dropdowns, self-updating countdown timestamps, a thread per battle. A 5×5 button grid for aiming was mocked up and rejected as unwieldy.
- **Discord Activity (battles).** A web app inside Discord (desktop, mobile, web), opened from a button, for animated replays and possibly 3D.
- **Player-requested spell visuals (later).** Claude turns a request into visual settings for an effects system; Blender with the MCP is an offline pipeline for bespoke models. Mechanics never come from a request, and visual spectacle scales with the spell's power.
- **Mobile.** Portrait first, tap-only planning, light 3D with a 2D fallback.

## Hooks into the bot

| Existing system | Hook |
| --- | --- |
| Level (lifetime XP) | Unlocks rune kinds |
| XP budget | A new capped source for battles, added to `XP_SOURCES` |
| Glizzys | Currency for trading, shop, visual commissions |
| Badges | Raid wins, discoveries, event badges |
| Profile card | A panel for your runes and spells |
| Trade | Rune trades in one transaction, same rules as glizzy trades |

## Open decisions

- [ ] Exact spellcrafting rules (Jared): System A (sigils) or System B (freeform circle), settled by A/B playtest
- [ ] Names for rune kinds, schools and mechanics (Jared)
- [ ] Overcharge: in or out
- [ ] Wild runes: how many per round and how players claim them (they're in, as a shared party pool)
- [ ] Dice in battle, or none
- [ ] The battle resource: action and bonus action per round plus cooldowns (Nov 2–3); open whether a per-battle power budget is still needed
- [ ] Players' phase: timer length (actions land live, decided above)
- [ ] What contains progress: dungeons, seasons, portals
- [ ] Fallback when someone leaves mid-battle
- [ ] What a solo player faces
- [ ] Visual identity for schools (deferred)
- [ ] First slice to build. Decided (Nov 4): a single-device browser prototype that answers "is crafting a spell and then using it in a 5-round hex battle fun?", with Systems A and B on one engine
