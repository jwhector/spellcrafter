/**
 * The System B inscriptions the crafter offers, from docs/design/system-b.md
 * ("Inscriptions"). The labels are the doc's own words; where the doc calls
 * a word a placeholder (the tether kinds, the triggers), so does `status`.
 * inscriptions.test.ts fails if a label stops appearing in the doc, so a
 * rename there is caught here.
 *
 * Slot costs: the doc gives single target (free), large area (2), whole
 * battlefield (3) and extra destination (1 each). Every other cost is not in
 * the docs; the crafter counts it as 1 slot and the page says so.
 */
import type { Status } from "../runes/reference";

export type InscriptionGroup = "shape" | "where" | "who" | "when" | "move" | "tether" | "trigger";

export interface Inscription {
  id: string;
  /** The doc's words for it. */
  label: string;
  group: InscriptionGroup;
  /** Sigil slots it takes. */
  slots: number;
  /** True when the slot cost above is the crafter's guess, not the doc's. */
  slotsGuessed: boolean;
  /** One plain sentence, from the doc. */
  note: string;
  status: Status;
  /** Shapes only: how many destinations it gives (0: the whole battlefield). */
  destinations?: number;
  /** Shapes only: "unit" shapes pick units, "area" shapes cover hexes, "move" shapes move the caster. */
  aims?: "unit" | "area" | "move" | "global" | "spell";
  /** Only one inscription of the same exclusive group fits a sigil. */
  exclusive?: string;
  /** Can attach to one minor rune: "whowhen" (minor Who or When) or "where" (minor Where). */
  minor?: "whowhen" | "where";
  /** How many times it can be added (default 1). */
  max?: number;
}

const shape = (
  id: string,
  label: string,
  aims: Inscription["aims"],
  destinations: number,
  note: string,
  opts: Partial<Inscription> = {},
): Inscription => ({
  id,
  label,
  group: "shape",
  slots: 1,
  slotsGuessed: true,
  note,
  status: "Proposed",
  destinations,
  aims,
  exclusive: "shape",
  ...opts,
});

const other = (id: string, label: string, group: InscriptionGroup, note: string, opts: Partial<Inscription> = {}) => ({
  id,
  label,
  group,
  slots: 1,
  slotsGuessed: true,
  note,
  status: "Proposed" as Status,
  ...opts,
});

export const INSCRIPTIONS: readonly Inscription[] = [
  shape(
    "single",
    "single target",
    "unit",
    1,
    "Hits a single target in range. The free default when no shape is chosen.",
    {
      slots: 0,
      slotsGuessed: false,
    },
  ),
  shape("self", "self", "unit", 1, "The spell lands on you."),
  shape("bolt", "bolt", "unit", 1, "Stops at the first unit it hits; a bolt that finds no unit does nothing.", {
    minor: "where",
  }),
  shape("burst", "burst", "area", 1, "A hex plus its 6 neighbours, at range.", { minor: "where" }),
  shape("line", "line", "area", 1, "3 hexes from you, hitting everything.", { minor: "where" }),
  shape("cone", "cone", "area", 1, "Rows of 1, 2 and 3 hexes in front of you.", { minor: "where" }),
  shape("ring", "ring", "area", 1, "The 6 hexes around a destination, not the destination itself.", { minor: "where" }),
  shape("wall", "wall", "area", 1, "3 hexes at range; it always leaves ground."),
  shape("dash", "dash", "move", 2, "Move up to 3 in a line; the start and the landing are its 2 destinations."),
  shape("leap", "leap", "move", 2, "Like dash, over units and obstacles; 2 destinations."),
  shape("chain", "chain", "unit", 3, "Jumps to the nearest other unit twice; 3 destinations."),
  shape("large", "large area", "area", 1, "Radius 2 around a destination.", { slots: 2, slotsGuessed: false }),
  shape(
    "global",
    "whole battlefield",
    "global",
    0,
    "A global modification: changes the rules of the whole battlefield for a few rounds, for everyone.",
    { slots: 3, slotsGuessed: false, status: "Decided" },
  ),
  shape(
    "spell",
    "a spell",
    "spell",
    1,
    "Aims at an enemy's shown move or an ally's prepared spell. Only a Dispel center can use it.",
    {
      status: "Decided",
    },
  ),

  other("extra", "extra destination", "where", "Adds one more destination; stacks up to 3.", {
    slotsGuessed: false,
    max: 3,
  }),
  other("range", "more range", "where", "The spell reaches further.", { minor: "where" }),
  other("follows", "follows the unit", "where", "An area anchored to a unit moves with it; on yourself, an aura."),
  other(
    "steerable",
    "steerable",
    "where",
    "Spend a bonus action each round to move it up to 3 hexes. Needs lingering.",
  ),
  other("enemies", "enemies only", "who", "Only enemies are affected. Filters don't work on ground.", {
    exclusive: "filter",
    minor: "whowhen",
  }),
  other("allies", "allies only", "who", "Only allies are affected. Filters don't work on ground.", {
    exclusive: "filter",
    minor: "whowhen",
  }),
  other("weakest", "weakest first", "who", "Touches units with the least health first, until its strength runs out."),
  other("delay", "delay", "when", "The spell goes off later.", { minor: "whowhen" }),
  other("lingering", "lingering", "when", "What the spell made lasts longer: on a place, it leaves ground.", {
    minor: "whowhen",
  }),
  other("push", "push", "move", "Shoves the units it hits away.", { status: "Decided", exclusive: "push-pull" }),
  other("pull", "pull", "move", "Draws the units it hits in.", { status: "Decided", exclusive: "push-pull" }),
  other(
    "copy",
    "copy",
    "tether",
    "Tether (placeholder name): gives the spell's payloads to both ends for 2 rounds, half strength at the far end.",
    {
      exclusive: "tether",
    },
  ),
  other(
    "redirect",
    "redirect",
    "tether",
    "Tether (placeholder name): sends the payloads to the other end instead, for 2 rounds.",
    {
      exclusive: "tether",
    },
  ),
  other(
    "transfer",
    "transfer",
    "tether",
    "Tether (placeholder name): damage dealt becomes healing at the other end; removed statuses move.",
    {
      exclusive: "tether",
    },
  ),
  other("leash", "leash", "tether", "Tether (placeholder name): keeps the first end within 2 hexes of the other.", {
    exclusive: "tether",
  }),
  other(
    "t-hit",
    "when it's hit",
    "trigger",
    "Waits through the next enemy phase and fires once when its target is hit.",
    {
      exclusive: "trigger",
      minor: "whowhen",
    },
  ),
  other("t-enters", "when something enters", "trigger", "Fires once when something enters.", {
    exclusive: "trigger",
    minor: "whowhen",
  }),
  other("t-moved", "when it's moved", "trigger", "Fires once when its target is moved.", {
    exclusive: "trigger",
    minor: "whowhen",
  }),
  other("t-half", "when it drops below half health", "trigger", "Fires once when its target drops below half health.", {
    exclusive: "trigger",
    minor: "whowhen",
  }),
  other("t-attacks", "when it attacks", "trigger", "Fires once when its target attacks.", {
    exclusive: "trigger",
    minor: "whowhen",
  }),
  other("t-dies", "when it dies", "trigger", "Fires once when its target dies.", {
    exclusive: "trigger",
    minor: "whowhen",
  }),
  other("t-zero", "when it would drop to 0", "trigger", "Fires once when its target would drop to 0 health.", {
    exclusive: "trigger",
    minor: "whowhen",
  }),
];

export const GROUP_LABELS: Record<InscriptionGroup, string> = {
  shape: "Shape (one per sigil)",
  where: "Where",
  who: "Who",
  when: "When",
  move: "Movement",
  tether: "Tether",
  trigger: "Trigger",
};

export function inscription(id: string): Inscription {
  const found = INSCRIPTIONS.find((i) => i.id === id);
  if (!found) throw new Error(`unknown inscription "${id}"`);
  return found;
}
