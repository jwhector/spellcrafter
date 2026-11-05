# The Hollow: game overview

A deck-building roguelike RPG for a Discord server. Players collect and trade
runes, build spells from them between battles, and fight in short battles on a
hex grid where all players act at once, then all enemies act. Each enemy shows
its next move as a rune circle. Each battle stands alone; runes, Levels and
shared server progress carry across sessions, so people can drop in for one
battle or play for an hour.

Working setting (names not final): the server is a Keep built over the Hollow,
a place monsters climb out of, and players are Wardens. The tone is serious and
self-contained, like Slay the Spire.

This doc is the game as a whole. The spell rules are in
[System B rules](system-b.md) and [System A](system-a.md), the runes in the
[rune reference](rune-reference.md), the numbers in the
[budget model](budget-model.md), and how it all runs in the
[engine model](engine-model.md). Why things changed is in the
[decision log](decision-log.md).

## Design goals

- Easy to pick up, with strategy that emerges from simple parts.
- Played on and off, at will, plus special events.
- Works with any number of people online, and scales with how much time someone has.
- Social: trading, support and coordination are central.
- Progression and rewards are rock solid, because this group is very reward-motivated.
- Mobile friendly.

## The first prototype

**Decided (Nov 4).** The first prototype answers one question: is crafting a
spell and then using it in a 5-round hex battle fun? It runs on a single device
in a browser, with 2 or 3 characters against one enemy group, and no Discord or
economy yet. System A and System B run on one engine so both can be playtested.

## Battles

**Decided**

- **Rounds (Nov 2).** Battles run in single rounds, inspired by Stolen Realm: all
  players act in the same phase, then all enemies act together.
- **Presence.** Everyone in a battle is expected to be present for planning. No
  late joiners. If someone leaves, a fallback plays their seat (details Open).
- **Enemy intent (Nov 3).** Each enemy shows only its next move, Slay the Spire
  style, drawn as its rune circle. Deciphering the circle is optional and gives an
  advantage; players who don't can still play.
- **Live actions.** Actions in the players' phase land the moment you take them.
- **Action economy.** Each round you get an action and a bonus action (like D&D).
  The bonus action is either a move or certain kinds of spells, so moving is a
  choice, not a given (like Gloomhaven). Standard movement is 1 hex, and the game
  is designed around that.
- **The limited resource (Nov 2 and 3)** that stops players defending every turn
  is the action and bonus action each round, plus spell cooldowns.
- **Positioning.** Battles happen on a hex grid of about 7 by 7 (size Open).
- **Grid size (Nov 4).** Experiment with a grid that grows with the number of
  players. Keep in mind for now.
- **Displacement and terrain** (moving units with spells, reshaping the ground)
  are major mechanics. The feel leans toward classic RPG combat rather than a pure
  puzzle like Into the Breach: borrow its ideas, not its puzzle focus.
- **Battlefields have terrain that players can reshape (Nov 4).**
- **Players can affect each other's actions** (support, combos between players).
- **Conditional (if/then) abilities** exist and are powerful.
- **Winning.** A battle is won by bringing the enemies' HP to zero. Bonus
  objectives can also exist (possibly tied to a skilling system Jared is
  considering; to discuss later).
- **Friendly fire is on by default (Nov 4).**
- **Basic attacks exist (Nov 4),** so smites and weapon buffs are in scope.
- **No accuracy rolls for now (Nov 4).**
- **Control works through the enemy's shown move first (Nov 4).** Direct control
  (a unit switching sides) may come later as a rare, expensive effect.

**Proposed**

- During the players' phase, teammates see each other's moves as they land and
  can build on them. The phase ends when everyone has pressed End turn, or after
  a timer (about 30 seconds).
- A battle is about 5 rounds, 2 to 3 minutes.
- Difficulty scales with headcount (more enemy moves and health). Some fights
  require specific capabilities, so scaling isn't perfect, by design.
- Next to each enemy circle, a plain hint (attack, defend, move, with its target)
  keeps the game playable without deciphering. Deciphering adds the exact area,
  push directions and side effects.
- Learning a rune yourself could help you read it in enemy circles, which rewards
  rune variety.
- Bosses blunt burst with phases or a per-round damage limit, so one huge hit
  can't skip a fight.

**Open**

- **Downed or dead,** Open until playtesting (Jared, Nov 5). The Nov 4 lean was
  toward dying; the support ideas below include rescuing a downed ally.
- Dice in battle. No dice was the lean while the enemy's move order was hidden;
  now that the next move is shown, it needs revisiting. Some uncertainty could
  stay by hiding which enemy acts first within the enemy phase. Dice stay for
  events.
- A concentration-like limit is wanted, and gets its own conversation (Nov 4).

### Making tanking and support necessary (Proposed)

The principle: build fights a team of pure damage can't win, and give
protectors and supporters tools that only work because of the grid, the shown
enemy intent and scarce movement.

**Tanking**

- **Readable enemy targeting.** Enemies choose targets by visible rules (nearest,
  lowest HP, whoever hit them last). A tank controls who gets hit by where they
  stand, or by forcing an enemy to target them.
- **Body blocking.** Units can't pass through each other, and stepping next to a
  sturdy unit can stop an enemy's movement. Terrain creates chokepoints for a
  tank to hold.
- **Line and cone attacks stop at the first unit,** so standing in front shields
  whoever is behind.
- **Spikes only a tank survives.** Some enemy moves would drop a fragile character
  in one hit. The enemy's shown intent warns the party, and a tank answers it by
  standing in the hit's path or forcing the enemy to target them.
- **Hard to move.** Tank builds can resist displacement, so they anchor the line.

**Support**

- **Granting movement.** Movement is scarce (1 hex), so pulling an ally out of a
  danger zone, swapping places, or giving someone an extra move is one of the
  strongest things a player can do.
- **Downed, not dead.** At 0 HP a player is downed and needs an adjacent ally to
  spend their action to bring them back. Reaching them is a positioning problem.
  (Whether units go down or die is Open: see above.)
- **Problems only allies can fix.** Some enemy effects can't be removed by the
  affected player, only by a teammate.
- **Information is support.** Deciphering an enemy's rune circle and telling the
  party its exact area, push directions and side effects helps everyone plan.
- **Setup.** Shaping terrain (cover, safe zones) and priming elements so a
  teammate's spell lands harder.

**Making it necessary, not just nice**

- **Encounter design:** enemies with attrition that outpaces a pure-damage team,
  big spikes, and effects that need an ally to clear.
- **The power budget helps:** because total power is capped, a team that spends
  it all on damage has nothing left for survival.
- **Rewards by contribution:** damage prevented, allies saved and healing count as
  much as damage dealt for drops and recognition. With a reward-motivated group,
  this matters most.

## Runes and spells

**Decided**

- **No fixed classes.** Players collect runes, and the runes you bring decide the
  role you play.
- **Schools.** Runes belong to schools (the set and names are Jared's to design).
  Elements are one kind: basic and easy to understand.
- **A spell is built from runes.** Its power comes from the quality of its runes
  and how many it has.
- **Fair power.** Each battle sets a power budget, normalized to who's in it.
  Veterans bring more options, not more raw power. (Jared wants something better
  than a hard power budget for normalization, ideally part of the crafting
  itself: see the [budget model](budget-model.md).)
- **Levels unlock new kinds of runes:** progressive disclosure of mechanics, not
  stronger runes.
- **Two crafting systems, A/B tested (Nov 3).** Jared will playtest both side by
  side instead of picking one now:
  - **System A**, fixed sigils plus runes. Sigils (learned by playing, never
    traded) set the shape, slot count, cooldown and timing; runes fill the slots.
    See [System A](system-a.md).
  - **System B**, a freeform circle inspired by Witch Hat Atelier: a center rune,
    ring runes, and inscriptions (learned by playing, permanent, never traded).
    See [System B rules](system-b.md).
- **Inverses are separate runes, not flipped faces (Nov 3),** in both systems, for
  wider loot and trading.
- **Runes affect each other through the board (Nov 3).** A rune leaves a visible
  state on a unit or hex (burning, frozen, rubble) and later runes react to it.
  Rules follow common sense so players can guess them (model: Breath of the
  Wild's chemistry rules), and they live as a table of runes against states, so
  adding a rune means adding one row. (The table itself is Open.)

### Crafting between battles, casting in battle

**Decided (Nov 3)**

- Spells are crafted from runes between battles, not during them.
- A player keeps roughly a dozen spells at most.
- Runes are consumed when used to learn a spell, which is a rune sink in itself.
- In battle, spells sit on a hotbar and have cooldowns. A spell's cooldown is
  calculated from its power (stronger spell, longer cooldown), and cooldowns are
  small numbers.
- A spell's cooldown doesn't change when it's upgraded; a completely different
  spell can have a different cooldown. Clear rules are needed for upgrade versus
  new spell.
- There is a basic action with no cooldown.
- Cooldown alone can't balance powerful spells: a strong enough spell only needs
  one use, and filling the hotbar with them would be broken.
- **Wild runes** are in: temporary runes, drafted at the start of each battle,
  that last only for that battle. They form a shared pool for the whole party
  that scales with group size, and the party decides together who uses which
  rune. Wild runes never raise cooldowns.

**Proposed**

- A learned spell is permanent and never traded. Upgrading means learning it
  again with better runes, which consumes them.
- The forge preview (plus a practice target) lets players test a spell before
  consuming anything.
- Rune quality is matched to the battle, invisibly: inside a fight, very
  high-quality runes are scaled to the fight's strength. Veterans keep more
  options and better combinations, not bigger numbers (like level sync in MMOs).
- Everyone has the same hotbar size, so total power is bounded by slots and
  cooldowns, not a points total.
- A complexity ladder for progressive disclosure: one sigil and one rune, then
  multi-slot sigils, then rune interactions, then linking.

**To playtest**

- **Spells start the battle charging:** each spell waits out its cooldown once
  before its first use, so big spells arrive late in the fight and one action per
  round limits how many fire.
- **One heavy slot on the hotbar:** only one high-cooldown or linked spell can be
  equipped at a time.

**Open**

- Hotbar size: how many crafted spells you bring into one battle.
- The cooldown formula. With about 5-round battles, cooldowns are 0 to 4 rounds,
  and the strongest spells are once per battle.
- Whether the per-battle power budget is still needed alongside cooldowns (the
  budget keeps veterans and newcomers fair; cooldown paces a single battle).
- Wild runes: how many appear per round, and how players claim them live.
- Randomness: with a hotbar there is no draw, so the deck-building lives in
  crafting and collecting, and wild runes supply the per-battle randomness. Is
  that enough?

### The spell forge

**Decided (Nov 3)**

- **The forge previews every spell** on a small grid (hexes hit, push and pull
  arrows, terrain left behind): complex to build, simple to read.
- **A spell's identity is its recipe** (in System A, the sigils plus which runes
  sit in which slots; in System B, the circle after sorting and merging). Players
  pick a look from ones others have made for that recipe, or commission a new
  one. A brand-new recipe is announced as new, the player proposes its look and
  feel, and the look incubates in the forge until ready. A new spell is playable
  right away with a default look, so visuals never hold up play. Goal: keep the
  incubation lag short with a good pipeline.

**Proposed:** the forge preview flags combinations that are legal but do
nothing.

## Rune economy

**Decided**

- Runes are never lost involuntarily. Consuming runes to learn a spell is a
  voluntary sink (Nov 3).
- Trading runes between players.
- **Fusing:** combining runes into a better one.
- **Offerings:** giving up runes for shared or server-wide rewards.
- Runes need enough churn that trading stays interesting.

**Proposed:** lending a rune to someone for one battle.

**Open:** overcharge (spend a rune for a one-time big effect), in or out.

## Progression and structure

- People come and go between battles; each battle is complete on its own.
- Levels unlock rune kinds (Decided, above). Proposed: level-ups also grant runes,
  and quests grant runes and unlock content.
- **Proposed** structure: dungeons the whole server pushes through together, where
  any victory counts toward progress; deeper fights check for capabilities;
  seasons reset the dungeons (the roguelike reset) while collections and Levels
  persist.
- **Proposed:** portals open in the server; anyone can join; the party votes on
  the path (a fight, a random event, or something else). Details deferred.
- **Proposed:** special events, big scheduled raids with mild stakes that never
  cost non-players anything.

## Platform

**Decided (Nov 2):** positioning matters, so battles are designed for the full
experience: a Discord Activity with a tactical grid. Chat-only and other cut-down
versions are playtesting proxies, built only as needed.

**Decided (Nov 4):** the game has its own repository, separate from the Discord
bot, because it's a large build with more to it than the bot.

**Proposed split:** battles live in the Activity; everything between battles
(portals, votes, trading, rune management, announcements) lives in chat, where it
works best async.

- **Chat (between battles, and as a proxy).** Discord's newer message layouts,
  rendered images, dropdowns, self-updating countdown timestamps, a thread per
  battle. In a chat proxy, one shared board message would update as actions land
  (batched to stay within Discord's edit limits). A 5 by 5 button grid for aiming
  was mocked up and rejected as unwieldy.
- **Discord Activity (battles).** A web app inside Discord (desktop, mobile, web),
  opened from a button, for animated replays and possibly 3D.
- **Player-requested spell visuals (later).** Claude turns a request into visual
  settings for an effects system; Blender with the MCP is an offline pipeline for
  bespoke models. Mechanics never come from a request, and visual spectacle scales
  with the spell's power.
- **Mobile.** Portrait first, tap-only planning, light 3D with a 2D fallback.

## Glizzybot

**Open (Jared, Nov 5):** whether The Hollow keeps its own progression and
currency or uses Glizzybot's. The game started inside the Glizzybot project, and
these hooks were sketched there:

| Glizzybot system | Hook that was sketched |
| --- | --- |
| Level (lifetime XP) | Unlocks rune kinds |
| XP budget | A new capped source for battles |
| Glizzys | Currency for trading, shop, visual commissions |
| Badges | Raid wins, discoveries, event badges |
| Profile card | A panel for your runes and spells |
| Trade | Rune trades in one transaction, same rules as glizzy trades |

## Open

- [ ] Exact spellcrafting rules: System A or System B, settled by A/B playtest.
- [ ] Names for rune kinds, schools and mechanics (Jared).
- [ ] Overcharge: in or out.
- [ ] Wild runes: how many per round and how players claim them.
- [ ] Dice in battle, or none.
- [ ] Whether a per-battle power budget is still needed alongside cooldowns.
- [ ] Players' phase: timer length.
- [ ] What contains progress: dungeons, seasons, portals.
- [ ] Fallback when someone leaves mid-battle.
- [ ] What a solo player faces.
- [ ] Visual identity for schools (deferred).
- [ ] Downed or dead, until playtesting.
- [ ] The rune-by-state interaction table.
- [ ] Hotbar size and the cooldown formula.
- [ ] The concentration-like limit (its own conversation).
- [ ] Glizzybot hooks (above).
