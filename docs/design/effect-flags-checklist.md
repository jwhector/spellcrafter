# Effect flags checklist

Every new rune effect, inscription or modifier for The Hollow answers each
question below before it goes into the docs or the crafter. All of it is
Proposed unless marked Decided. The answers feed the
[budget model](budget-model.md) and the rules in [System B rules](system-b.md).

## The flags

Sixteen questions. The last column says which rules depend on the answer, so a new effect can't slip past them. Add a row here whenever a new rule starts depending on some property.

| Flag | Question | Options | Rules that read it |
| --- | --- | --- | --- |
| Scaling | Can the forge turn it up or down? | Smooth (damage, healing, shield, dealing more or less) · In steps (hexes moved, rounds lasted, units reached) · Binary (extra action, lost action, hidden, encased, cancelled move) | Budget split, the three-pass split, Amplification and Diminishing, the ring minimum, linking reach |
| Side | Who does it want to land on? | Helps · Harms · Either (forced movement, terrain) | Allies first or enemies first (Decided Nov 4), friendly fire cost, shield bearer or attacker |
| Lands on | What does it touch? | A unit · hexes · a summon · a gate's travelers · a spell (Dispel center only, Decided Nov 5) · the whole battlefield | Which central output type it sits in; whether filters work (not on ground, Decided Nov 4) |
| How long | When does it end? | Instant · this round · next turn · lingers for some rounds · until removed | Lingering, Dispel, delay, linked spells' timing |
| Status | Does it stick to a unit as a status? | Yes · No | What Dispel strips, the once per unit per spell rule, stacking |
| Stacking | What happens if it lands twice on one unit? | Adds up · refreshes · strongest wins · once only | Once per unit per spell; overlapping spells (Open) |
| Repeats | Does it fire more than once? | Once · each round · on a trigger | Price multipliers (summon aspects and global rules ×2, lingering ×1.6), triggers ×0.75 |
| Opposite | Which rune cancels it? | A rune · none | Cancelling pairs count as zero; what Dispel undoes |
| Actions | Does it change how many actions a unit gets, or whether a shown move happens? | Yes · No | Extra-action cap (Open), base value, portal plus Haste worry |
| Information | Does it change what units can see or pick, or what a shown move tells you? | Yes · No | Invisibility and Revelation, single-target picking, deciphering shown moves |
| Position | Does it move units or change the board? | Yes · No | Hazard combo bonus, gates, leash, walls |
| Center and ring | Is the ring meaning different from the center meaning? | Must be (Decided Nov 5: major rune effects stay unique to the center) | Duplicate check in the audit tool |
| Base value | What is it worth per unit per round, in standard turns? | A base value: a rough tier now (cheap, normal, expensive), a number in step 4 | The [budget model](budget-model.md) |
| As a linked spell | How does it reach through another spell's output? | Follows the reach rule; binary effects reach fewer units when the budget runs short | [Linking](system-b.md#linking) |
| Counterplay | What stops or removes it? | Dispel · Revelation · stepping off ground · killing the summon · other | Audit check that nothing is unanswerable |
| Concentration | Does it need the concentration-like limit? | Open | Concentration rules (separate conversation) |

## Open

- [ ] Should the Stacking options differ between statuses and ground?
- [ ] The Concentration flag waits for the concentration-like limit (its own
      conversation).
