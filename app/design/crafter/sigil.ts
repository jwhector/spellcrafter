/**
 * A System B sigil as the crafter page holds it, the edits the page makes to
 * it, and the readout of what it makes. No React, so it is tested on its own.
 *
 * This is a design mock, not the engine: it reads the rune tables from the
 * rune reference doc and applies the System B rules in docs/design/system-b.md
 * that decide which table a minor rune reads. It computes no numbers (budget,
 * damage, cooldown); those wait for the engine port (seed spellcrafter-f26e).
 * Each rule below names its doc section and status, and the readout carries
 * that status to the page (CLAUDE.md golden rule 2).
 */
import type { Rune, RuneReference, RuneTable, Status } from "../runes/reference";
import { cellStatus, mainColumn } from "../runes/reference";
import { type Inscription, inscription } from "./inscriptions";

export const MIN_SIZE = 3;
export const MAX_SIZE = 8;
/** The size a new sigil starts at. Sigil size grows with Level, which is Open; this is the crafter's default. */
export const DEFAULT_SIZE = 6;

export interface Sigil {
  /** Slots around the center, shared by minor runes and inscriptions. */
  size: number;
  center: string | null;
  /** Minor runes by ring position, clockwise from the top. Its length is `size`. */
  ring: (string | null)[];
  /** Major inscriptions, by id. "extra" may appear up to three times. */
  inscriptions: string[];
  /** Minor inscriptions, by the ring position of the minor rune they attach to. */
  minor: Record<number, string[]>;
}

export function emptySigil(size = DEFAULT_SIZE): Sigil {
  return { size, center: null, ring: Array(size).fill(null), inscriptions: [], minor: {} };
}

// ---- Slots ----

export function minorRuneCount(s: Sigil): number {
  return s.ring.filter(Boolean).length;
}

/** Slots taken by inscriptions, major and minor (system-b.md "The parts of a sigil", Proposed). */
export function inscriptionSlots(s: Sigil): number {
  const minor = Object.values(s.minor).flat();
  return [...s.inscriptions, ...minor].reduce((n, id) => n + inscription(id).slots, 0);
}

export function freeSlots(s: Sigil): number {
  return s.size - minorRuneCount(s) - inscriptionSlots(s);
}

/** Empty ring positions the inscriptions take: the empty ones left over once the free slots are counted, from the top clockwise. */
export function sealedSlots(s: Sigil): Set<number> {
  let open = freeSlots(s);
  const sealed = new Set<number>();
  s.ring.forEach((slug, slot) => {
    if (slug) return;
    if (open > 0) open--;
    else sealed.add(slot);
  });
  return sealed;
}

// ---- Edits ----

/** Puts a rune in the center (slot "center") or at a ring position. Fails (returns the sigil unchanged) when no slot is free. */
export function placeRune(s: Sigil, slug: string, slot: "center" | number): Sigil {
  if (slot === "center") return { ...s, center: slug };
  if (s.ring[slot] === undefined) return s;
  if (s.ring[slot] === null && freeSlots(s) < 1) return s;
  const ring = [...s.ring];
  ring[slot] = slug;
  return { ...s, ring };
}

/** Where a rune goes when no slot is chosen: the center first, then the first empty ring position. */
export function nextSlot(s: Sigil): "center" | number | null {
  if (!s.center) return "center";
  if (freeSlots(s) < 1) return null;
  const i = s.ring.indexOf(null);
  return i === -1 ? null : i;
}

export function removeRune(s: Sigil, slot: "center" | number): Sigil {
  if (slot === "center") return { ...s, center: null };
  const ring = [...s.ring];
  ring[slot] = null;
  const minor = { ...s.minor };
  delete minor[slot];
  return { ...s, ring, minor };
}

/** Moves a minor rune one position clockwise (+1) or anticlockwise (-1), swapping with whatever is there. */
export function moveRune(s: Sigil, from: number, step: 1 | -1): { sigil: Sigil; to: number } {
  const to = (from + step + s.size) % s.size;
  const ring = [...s.ring];
  [ring[from], ring[to]] = [ring[to] ?? null, ring[from] ?? null];
  const minor: Record<number, string[]> = {};
  for (const [k, v] of Object.entries(s.minor)) {
    const i = Number(k);
    minor[i === from ? to : i === to ? from : i] = v;
  }
  return { sigil: { ...s, ring, minor }, to };
}

/** Swaps a minor rune with the major rune. */
export function swapWithCenter(s: Sigil, slot: number): Sigil {
  const ring = [...s.ring];
  const minorRune = ring[slot] ?? null;
  ring[slot] = s.center;
  const minor = { ...s.minor };
  if (!s.center) delete minor[slot];
  return { ...s, center: minorRune, ring };
}

/** Changes the sigil's size, keeping the minor runes in order. Fails when they would not fit. */
export function resize(s: Sigil, size: number): Sigil {
  const runes = s.ring.map((slug, i) => ({ slug, i })).filter((r) => r.slug);
  if (size < MIN_SIZE || size > MAX_SIZE || runes.length + inscriptionSlots(s) > size) return s;
  const keepPlaces = runes.every((r) => r.i < size);
  const ring: (string | null)[] = Array(size).fill(null);
  const minor: Record<number, string[]> = {};
  runes.forEach((r, n) => {
    const at = keepPlaces ? r.i : n;
    ring[at] = r.slug;
    const attached = s.minor[r.i];
    if (attached) minor[at] = attached;
  });
  return { ...s, size, ring, minor };
}

// ---- Inscriptions: what can be added ----

export function shapeOf(s: Sigil): Inscription {
  const id = s.inscriptions.find((i) => inscription(i).group === "shape");
  return inscription(id ?? "single");
}

/** Why a major inscription can't be added right now, or null when it can. */
export function blockedReason(s: Sigil, id: string): string | null {
  const ins = inscription(id);
  const count = s.inscriptions.filter((i) => i === id).length;
  const replacing = ins.exclusive ? s.inscriptions.find((i) => inscription(i).exclusive === ins.exclusive) : undefined;
  const freed = replacing ? inscription(replacing).slots : 0;
  if (count >= (ins.max ?? 1) && !(ins.max && ins.max > 1)) return null; // a toggle: clicking removes it
  if (count >= (ins.max ?? 1)) return `It stacks up to ${ins.max}.`;
  if (ins.slots > freeSlots(s) + freed) return "Not enough free slots in the sigil.";
  const shape = shapeOf(s);
  // system-b.md "Shapes": a spell as a target is only for a Dispel center (Decided Nov 5).
  if (id === "spell" && s.center !== "dispel") return "Only a Dispel center can target a spell (Decided Nov 5).";
  // system-b.md "Shapes": the whole battlefield can't take an extra destination, more range or a trigger (Decided Nov 4).
  if (shape.id === "global" && (id === "extra" || id === "range" || ins.group === "trigger")) {
    return "The whole battlefield can't take an extra destination, more range or a trigger (Decided Nov 4).";
  }
  if (
    id === "global" &&
    s.inscriptions.some((i) => i === "extra" || i === "range" || inscription(i).group === "trigger")
  ) {
    return "Remove extra destinations, more range and triggers first: the whole battlefield can't take them (Decided Nov 4).";
  }
  return null;
}

/** Adds a major inscription, replacing another of its exclusive group; adding one already there removes it (except stacking ones). */
export function toggleInscription(s: Sigil, id: string): Sigil {
  const ins = inscription(id);
  const has = s.inscriptions.includes(id);
  if (has && !(ins.max && ins.max > 1)) return { ...s, inscriptions: s.inscriptions.filter((i) => i !== id) };
  if (blockedReason(s, id)) return s;
  const kept = ins.exclusive
    ? s.inscriptions.filter((i) => inscription(i).exclusive !== ins.exclusive)
    : s.inscriptions;
  return { ...s, inscriptions: [...kept, id] };
}

/** Removes one copy of a stacking inscription (extra destination). */
export function removeOne(s: Sigil, id: string): Sigil {
  const i = s.inscriptions.lastIndexOf(id);
  if (i === -1) return s;
  return { ...s, inscriptions: s.inscriptions.filter((_, n) => n !== i) };
}

/** Why a minor inscription can't attach to the minor rune at `slot`, or null. */
export function minorBlockedReason(s: Sigil, slot: number, id: string): string | null {
  const ins = inscription(id);
  if (!ins.minor) return "This inscription can't attach to one minor rune.";
  if (!s.ring[slot]) return "Choose a minor rune first.";
  const attached = s.minor[slot] ?? [];
  if (attached.includes(id)) return null;
  if (ins.slots > freeSlots(s)) return "Not enough free slots in the sigil.";
  // system-b.md "Minor inscriptions", rule 1 (Proposed): minor Where needs an anchor with a position.
  const shape = shapeOf(s).id;
  if (ins.minor === "where" && (shape === "global" || shape === "spell")) {
    return "A minor Where needs an anchor with a position, so not on a global effect or an altered spell (Proposed).";
  }
  return null;
}

export function toggleMinor(s: Sigil, slot: number, id: string): Sigil {
  const attached = s.minor[slot] ?? [];
  if (attached.includes(id)) {
    const rest = attached.filter((i) => i !== id);
    const minor = { ...s.minor, [slot]: rest };
    if (rest.length === 0) delete minor[slot];
    return { ...s, minor };
  }
  if (minorBlockedReason(s, slot, id)) return s;
  const ins = inscription(id);
  const kept = ins.exclusive ? attached.filter((i) => inscription(i).exclusive !== ins.exclusive) : attached;
  return { ...s, minor: { ...s.minor, [slot]: [...kept, id] } };
}

// ---- Reading the sigil ----

/** The major output types (system-b.md "The major output types"), by the words their rune reference tables use. */
export type OutputKind =
  | "at a destination"
  | "on a unit"
  | "on a shield"
  | "on ground"
  | "along a tether"
  | "through a gate"
  | "on a summon"
  | "on a spell"
  | "global";

export interface Makes {
  kind: OutputKind;
  /** The rune reference table its minor runes read, if the doc has one. */
  table: RuneTable | null;
  /** Why this kind, in a sentence citing the rule. */
  why: string;
  status: Status;
}

function findTable(ref: RuneReference, words: string): RuneTable | null {
  return ref.minorEffects.find((t) => t.title.toLowerCase().includes(words)) ?? null;
}

export function destinations(s: Sigil): number {
  const extra = s.inscriptions.filter((i) => i === "extra").length;
  return (shapeOf(s).destinations ?? 1) + extra;
}

export function isLingering(s: Sigil): boolean {
  return s.inscriptions.includes("lingering");
}

export function hasTether(s: Sigil): string | null {
  return s.inscriptions.find((i) => inscription(i).group === "tether") ?? null;
}

/** Which major output type the minor runes read (system-b.md "What the center makes, and what the ring does"). */
export function makes(ref: RuneReference, s: Sigil): Makes {
  const shape = shapeOf(s);
  const center = s.center;
  const pick = (kind: OutputKind, words: string, why: string, status: Status): Makes => ({
    kind,
    table: findTable(ref, words),
    why,
    status,
  });
  if (shape.id === "spell") {
    return pick(
      "on a spell",
      "on a spell",
      "Only a Dispel center can target a spell; its minor runes decide what happens to it.",
      "Decided",
    );
  }
  if (shape.id === "global") {
    return pick("global", "global", "The whole battlefield shape makes a global modification.", "Decided");
  }
  if (center === "portal")
    return pick("through a gate", "through a gate", "A Portal center always makes its gate.", "Decided");
  if (center === "summon")
    return pick("on a summon", "on a summon", "A Summon center always makes its summon.", "Decided");
  if (center === "protect") {
    // A shield reads its own table once the doc has one; until then, "on a unit", firing when the shield is hit.
    const shield = findTable(ref, "on a shield");
    if (shield)
      return {
        kind: "on a shield",
        table: shield,
        why: "A Protect center always makes its shield.",
        status: "Decided",
      };
    return pick(
      "on a unit",
      "on a unit",
      'A Protect center always makes its shield, which reads "on a unit", each minor rune firing when the shield is hit.',
      "Decided",
    );
  }
  // The crafter's reading, not stated in the docs: a tether's ring is read "along a tether" only when the center makes a plain effect.
  if (hasTether(s)) {
    return pick(
      "along a tether",
      "along a tether",
      "A tether inscription joins two destinations; each minor rune sends something along it. (Which centers this applies to is the crafter's reading.)",
      "Proposed",
    );
  }
  if (shape.id === "wall" || (isLingering(s) && shape.aims === "area")) {
    return pick(
      "on ground",
      "on ground",
      shape.id === "wall" ? "A wall always leaves ground." : "A lingering effect on a place makes ground.",
      "Proposed",
    );
  }
  if (shape.aims === "area" || shape.aims === "move") {
    return pick("at a destination", "at a destination", "The center makes an effect on an area.", "Decided");
  }
  return pick("on a unit", "on a unit", "The center makes an effect on one unit.", "Decided");
}

/** Major output types where every minor rune is an aspect, so ring order never matters (system-b.md "Conflict and order rules", Proposed). */
export function orderFree(kind: OutputKind): boolean {
  return kind === "on a summon" || kind === "on ground" || kind === "on a shield" || kind === "global";
}

/** Where opposite minor runes cancel by amount (Decided Nov 4); on ground they cancel except Summon and Dispel (Proposed). */
function opposites(kind: OutputKind): "cancel" | "ground" | null {
  if (kind === "at a destination" || kind === "on a unit" || kind === "through a gate") return "cancel";
  if (kind === "on ground") return "ground";
  return null;
}

export interface RingLine {
  slot: number;
  rune: Rune;
  text: string;
  status: Status;
  extra: { label: string; text: string }[];
  minorInscriptions: { label: string; text: string; status: Status }[];
}

export interface Note {
  text: string;
  status: Status;
  warn: boolean;
}

export interface Readout {
  center: Rune | null;
  makes: Makes;
  /** The major output: what the center does. */
  majorOutput: { text: string; column: string; status: Status } | null;
  shape: Inscription;
  destinations: number;
  /** Ring positions, split into one section per destination (system-b.md "Reading a sigil"). */
  sections: { destination: number; lines: RingLine[] }[];
  orderFree: boolean;
  inscriptions: { ins: Inscription; count: number }[];
  notes: Note[];
}

/** The ring positions in each destination's section: the ring splits into equal arcs, clockwise from the top. */
export function sectionOf(s: Sigil, slot: number): number {
  const n = Math.max(1, destinations(s));
  return Math.min(n - 1, Math.floor((slot * n) / s.size));
}

export function readSigil(ref: RuneReference, s: Sigil): Readout {
  const byslug = new Map(ref.runes.map((r) => [r.slug, r]));
  const center = s.center ? (byslug.get(s.center) ?? null) : null;
  const m = makes(ref, s);
  const shape = shapeOf(s);
  const notes: Note[] = [];
  const note = (text: string, status: Status, warn = false) => notes.push({ text, status, warn });

  let majorOutput: Readout["majorOutput"] = null;
  if (center) {
    const row = ref.center.rows[center.slug] ?? {};
    const column = m.kind === "global" ? "Across the whole battlefield" : "Aimed at the board";
    const text = row[column] ?? "";
    majorOutput = { text, column, status: cellStatus(ref.center, text) };
  }

  const n = Math.max(1, destinations(s));
  const sections: Readout["sections"] = Array.from({ length: n }, (_, i) => ({ destination: i + 1, lines: [] }));
  const seen = new Map<string, number>();
  s.ring.forEach((slug, slot) => {
    if (!slug) return;
    const rune = byslug.get(slug);
    if (!rune) return;
    const row = m.table?.rows[slug];
    const main = m.table ? mainColumn(m.table) : "";
    let text: string;
    let status: Status;
    if (slug === s.center) {
      text = "Matches the center, so it adds strength to the center instead.";
      status = "Decided";
    } else if (!m.table) {
      text = `The rune reference has no table for ${m.kind} yet.`;
      status = "Open";
    } else if (!row) {
      text = `The ${m.table.title.toLowerCase()} table has no row for ${rune.name} yet.`;
      status = "Open";
    } else {
      text = row[main] ?? "";
      status = cellStatus(m.table, text);
    }
    const sec = sectionOf(s, slot);
    const key = `${sec}:${slug}`;
    seen.set(key, (seen.get(key) ?? 0) + 1);
    const extra =
      m.table && row
        ? m.table.columns.filter((c) => c !== main && row[c]).map((c) => ({ label: c, text: row[c] ?? "" }))
        : [];
    const minorInscriptions = (s.minor[slot] ?? []).map((id) => {
      const ins = inscription(id);
      return ins.minor === "where"
        ? {
            label: ins.label,
            text: `Becomes a small sub-effect anchored on the output: ${rune.name}'s own major output over its own ${ins.label}.`,
            status: "Proposed" as Status,
          }
        : { label: ins.label, text: minorSentence(ins), status: "Proposed" as Status };
    });
    sections[sec]?.lines.push({ slot, rune, text, status, extra, minorInscriptions });
  });

  // Duplicates and opposites, per section.
  for (const [key, count] of seen) {
    const slug = key.split(":")[1] ?? "";
    if (count > 1 && slug !== s.center) {
      note(
        `${byslug.get(slug)?.name} appears ${count} times in one section: a duplicate rune adds strength, never extra copies.`,
        "Proposed",
      );
    }
  }
  const opp = opposites(m.kind);
  if (opp) {
    for (const sec of sections) {
      // A minor rune that matches the center adds strength to the center, so it has no minor rune effect to cancel.
      const slugs = new Set(sec.lines.map((l) => l.rune.slug).filter((slug) => slug !== s.center));
      for (const r of ref.runes) {
        const other = ref.center.rows[r.slug]?.Opposite;
        const o = ref.runes.find((x) => x.name === other);
        if (!o || r.slug > o.slug || !slugs.has(r.slug) || !slugs.has(o.slug)) continue;
        if (opp === "cancel") note(`${r.name} and ${o.name} are opposites here, so they cancel by amount.`, "Decided");
        else if (r.slug !== "summon" && r.slug !== "dispel")
          note(`${r.name} and ${o.name} cancel on ground.`, "Proposed");
      }
    }
  }

  // Rules that flag a sigil.
  if (!center) note("Put a major rune in the center: it decides what the spell makes.", "Decided", true);
  if (center?.slug === "blank")
    note(
      "What the Blank rune does in the center is still Open; it is planned for spells that only move things.",
      "Open",
    );
  if (shape.id === "spell" && s.center !== "dispel")
    note("Only a Dispel center can target a spell (Decided Nov 5).", "Decided", true);
  if (m.kind === "on ground" && s.inscriptions.some((i) => i === "enemies" || i === "allies")) {
    note("Filters don't work on ground (Decided Nov 4), so the filter does nothing here.", "Decided", true);
  }
  if (s.inscriptions.includes("steerable") && !isLingering(s)) note("Steerable needs lingering.", "Proposed", true);
  if (shape.id === "self" && (s.center === "portal" || hasTether(s))) {
    if (s.center === "portal" && s.inscriptions.includes("extra")) {
      note("A self-cast portal with an extra destination moves you to that destination.", "Proposed");
    } else note("A self-cast portal or tether does nothing.", "Decided", true);
  }
  if (shape.id === "self" && s.center === "summon") note("A self-cast summon appears next to you.", "Decided");
  if ((s.center === "portal" || hasTether(s)) && n === 1 && shape.id !== "self" && shape.id !== "global") {
    note("It needs two destinations, so it uses you as the second one.", "Proposed");
  }
  if (shape.aims === "unit" && shape.id !== "self") note("A unit shape can't be aimed at an empty hex.", "Decided");
  if (n > 1)
    note(
      `The ring splits into ${n} sections, one per destination; minor runes act at their section's destination.`,
      "Proposed",
    );
  if (orderFree(m.kind) && minorRuneCount(s) > 1)
    note(`Every minor rune here is an aspect, so their order doesn't matter.`, "Proposed");
  else if (minorRuneCount(s) > 1) note("Minor runes act in clockwise order within their section.", "Proposed");

  const counts = new Map<string, number>();
  for (const id of s.inscriptions) counts.set(id, (counts.get(id) ?? 0) + 1);
  const inscriptions = [...counts].map(([id, count]) => ({ ins: inscription(id), count }));

  return {
    center,
    makes: m,
    majorOutput,
    shape,
    destinations: destinations(s),
    sections,
    orderFree: orderFree(m.kind),
    inscriptions,
    notes,
  };
}

/** What a minor Who or When inscription does to its minor rune (system-b.md "Minor inscriptions", Proposed). */
function minorSentence(ins: Inscription): string {
  if (ins.group === "who") return `It acts only on ${ins.label.replace(" only", "")}.`;
  if (ins.id === "delay") return "It acts after a delay.";
  if (ins.id === "lingering") return "It keeps acting while the spell lingers.";
  return `It acts only ${ins.label}.`;
}
