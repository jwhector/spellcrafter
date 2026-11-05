import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseRuneReference } from "../runes/reference";
import { parseGrounds } from "./grounds";
import {
  blockedReason,
  emptySigil,
  freeSlots,
  makes,
  moveRune,
  nextSlot,
  placeRune,
  readSigil,
  removeRune,
  resize,
  type Sigil,
  sealedSlots,
  sectionOf,
  swapWithCenter,
  toggleInscription,
  toggleMinor,
} from "./sigil";

const REF = parseRuneReference(readFileSync(join(process.cwd(), "docs/design/rune-reference.md"), "utf8"));

function build(center: string, ring: string[], inscriptions: string[] = [], size = 6): Sigil {
  let s = emptySigil(size);
  s = placeRune(s, center, "center");
  ring.forEach((slug, i) => {
    s = placeRune(s, slug, i);
  });
  for (const id of inscriptions) s = toggleInscription(s, id);
  return s;
}

describe("slots", () => {
  it("are shared by minor runes and inscriptions", () => {
    const s = build("fire", ["frost", "mend"], ["burst", "lingering"]);
    expect(freeSlots(s)).toBe(6 - 2 - 2);
  });

  it("show the inscriptions as the last empty positions", () => {
    const s = build("fire", ["frost", "mend"], ["burst", "lingering"]);
    expect([...sealedSlots(s)]).toEqual([4, 5]);
    expect(sealedSlots(toggleMinor(s, 0, "enemies"))).toEqual(new Set([3, 4, 5]));
  });

  it("refuse a minor rune when the sigil is full", () => {
    const s = build("fire", ["frost", "mend", "wound"], ["global"], 6);
    expect(freeSlots(s)).toBe(0);
    expect(placeRune(s, "stone", 4)).toBe(s);
    expect(nextSlot(s)).toBeNull();
  });

  it("fill the center first, then the first empty ring position", () => {
    let s = emptySigil();
    expect(nextSlot(s)).toBe("center");
    s = placeRune(s, "fire", "center");
    expect(nextSlot(s)).toBe(0);
  });

  it("follow a resize, keeping the minor runes in order", () => {
    const s = build("fire", ["frost", "mend"]);
    const moved = moveRune(s, 1, 1).sigil; // mend to position 2
    const small = resize(moved, 3);
    expect(small.ring).toEqual(["frost", null, "mend"]);
    expect(resize(build("fire", ["frost", "mend", "wound"], ["global"]), 5).size).toBe(6); // would not fit
  });
});

describe("moving runes", () => {
  it("moves a minor rune around the ring, wrapping, and carries its minor inscriptions", () => {
    let s = build("fire", ["frost"], ["burst"]);
    s = toggleMinor(s, 0, "allies");
    const { sigil, to } = moveRune(s, 0, -1);
    expect(to).toBe(5);
    expect(sigil.ring[5]).toBe("frost");
    expect(sigil.minor[5]).toEqual(["allies"]);
    expect(sigil.minor[0]).toBeUndefined();
  });

  it("swaps a minor rune with the major rune", () => {
    const s = swapWithCenter(build("fire", ["portal"]), 0);
    expect(s.center).toBe("portal");
    expect(s.ring[0]).toBe("fire");
    expect(removeRune(s, "center").center).toBeNull();
  });
});

describe("which major output type the ring reads (system-b.md)", () => {
  const kind = (s: Sigil) => makes(REF, s).kind;
  it("follows the center for Portal, Summon and Protect", () => {
    expect(kind(build("portal", [], ["burst"]))).toBe("through a gate");
    expect(kind(build("summon", []))).toBe("on a summon");
    expect(kind(build("protect", [], ["lingering", "burst"]))).toBe("on a shield");
  });

  it("reads a plain effect by its shape", () => {
    expect(kind(build("fire", []))).toBe("on a unit");
    expect(kind(build("fire", [], ["burst"]))).toBe("at a destination");
    expect(kind(build("fire", [], ["burst", "lingering"]))).toBe("on ground");
    expect(kind(build("fire", [], ["wall"]))).toBe("on ground");
    expect(kind(build("fire", [], ["global"]))).toBe("global");
    expect(kind(build("wound", [], ["transfer"]))).toBe("on a unit");
  });

  it("keeps minor Where off a global effect or an altered spell, whichever comes first", () => {
    const withCone = toggleMinor(build("dispel", ["fire"], ["bolt"]), 0, "cone");
    expect(withCone.minor[0]).toEqual(["cone"]);
    expect(blockedReason(withCone, "global")).toMatch(/minor Where/);
    expect(blockedReason(withCone, "spell")).toMatch(/minor Where/);
    expect(toggleMinor(build("fire", ["frost"], ["global"]), 0, "range").minor[0]).toBeUndefined();
  });

  it("swaps a minor shape for another on a full sigil", () => {
    const full = toggleMinor(build("fire", ["wound", "frost", "mend", "stone"], ["bolt"]), 0, "burst");
    expect(freeSlots(full)).toBe(0);
    expect(toggleMinor(full, 0, "cone").minor[0]).toEqual(["cone"]);
  });

  it("makes only shapes exclusive, as system-b.md says", () => {
    const s = build("wound", [], ["enemies", "allies", "push", "pull"]);
    expect(s.inscriptions).toEqual(["enemies", "allies", "push", "pull"]);
    expect(build("wound", [], ["bolt", "burst"]).inscriptions).toEqual(["burst"]);
  });

  it("refuses a tether on the whole battlefield, as the tools do for now", () => {
    expect(blockedReason(build("wound", [], ["global"]), "copy")).toMatch(/tether on the whole battlefield/);
    expect(blockedReason(build("wound", [], ["copy"]), "global")).toMatch(/tether on the whole battlefield/);
  });

  it("lets only a Dispel center target a spell", () => {
    expect(blockedReason(build("fire", []), "spell")).toMatch(/Only a Dispel center/);
    expect(kind(build("dispel", [], ["spell"]))).toBe("on a spell");
  });

  it("finds a rune reference table for every kind it picks", () => {
    for (const s of [
      build("portal", []),
      build("summon", []),
      build("fire", [], ["global"]),
      build("dispel", [], ["spell"]),
    ]) {
      expect(makes(REF, s).table).not.toBeNull();
    }
  });
});

describe("inscriptions", () => {
  it("keep one shape, replacing the old one", () => {
    const s = build("fire", [], ["burst", "cone"]);
    expect(s.inscriptions).toEqual(["cone"]);
  });

  it("refuse more range on the whole battlefield (Decided Nov 4)", () => {
    const s = build("fire", [], ["global"]);
    expect(blockedReason(s, "range")).toMatch(/whole battlefield/);
    expect(toggleInscription(s, "range")).toBe(s);
  });

  it("stack extra destinations up to 3, each splitting the ring into another section", () => {
    const s = build("fire", ["frost", "mend", "wound"], ["extra", "extra"], 8);
    expect(s.inscriptions.filter((i) => i === "extra")).toHaveLength(2);
    const r = readSigil(REF, s);
    expect(r.destinations).toBe(3);
    expect(r.sections).toHaveLength(3);
    expect([0, 3, 6].map((slot) => sectionOf(s, slot))).toEqual([0, 1, 2]);
  });

  it("attach a minor Where only where there is an anchor (Proposed)", () => {
    const s = build("fire", ["wound"], ["global"]);
    expect(toggleMinor(s, 0, "burst")).toBe(s);
    const chain = toggleMinor(build("fire", ["wound"], ["chain"]), 0, "burst");
    expect(chain.minor[0]).toEqual(["burst"]);
  });
});

describe("the readout", () => {
  it("gives the center's major output and each minor rune's effect from the doc", () => {
    const r = readSigil(REF, build("fire", ["frost", "fire"], ["burst"]));
    expect(r.majorOutput?.text).toBe(REF.center.rows.fire?.["Aimed at the board"]);
    const lines = r.sections[0]?.lines ?? [];
    const table = r.makes.table;
    expect(lines[0]?.text).toBe(table?.rows.frost?.["Minor rune effect"]);
    expect(lines[1]?.text).toMatch(/adds strength to the center/);
    expect(r.notes.some((n) => /Fire and Frost .*cancel by amount/.test(n.text))).toBe(false); // Fire is the center's match, not a minor opposite
  });

  it("notes opposites that cancel, and filters that do nothing on ground", () => {
    const r = readSigil(REF, build("wound", ["fire", "frost"], ["burst"]));
    expect(r.notes.some((n) => /Fire and Frost are opposites here/.test(n.text))).toBe(true);
    const ground = readSigil(REF, build("fire", ["mend"], ["burst", "lingering", "allies"]));
    expect(ground.notes.some((n) => n.warn && /Filters don't work on ground/.test(n.text))).toBe(true);
  });

  it("uses the battlefield line of the center table for a global modification", () => {
    const r = readSigil(REF, build("frost", [], ["global"]));
    expect(r.majorOutput?.column).toBe("Across the whole battlefield");
    expect(r.majorOutput?.text).toBe(REF.center.rows.frost?.["Across the whole battlefield"]);
  });

  it("uses the ground the major rune makes for ground, from system-b.md", () => {
    const grounds = parseGrounds(readFileSync(join(process.cwd(), "docs/design/system-b.md"), "utf8"));
    const r = readSigil(REF, build("frost", [], ["burst", "lingering"]), grounds);
    expect(r.majorOutput).toEqual({ text: grounds.frost, column: "The ground it makes", status: "Decided" });
  });

  it("reads a tether's minor runes on a unit at each end", () => {
    const r = readSigil(REF, build("wound", ["fire"], ["transfer"]));
    expect(r.makes.table?.title.toLowerCase()).toContain("on a unit");
    expect(r.notes.some((n) => /tether has no major output type/.test(n.text))).toBe(true);
  });

  it("asks for a center when there is none", () => {
    expect(readSigil(REF, emptySigil()).notes[0]?.text).toMatch(/major rune in the center/);
  });
});
