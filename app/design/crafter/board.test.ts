import { describe, expect, it } from "vitest";
import { allHexes, CASTER, key, lineBetween, planBoard } from "./board";
import { emptySigil, placeRune, type Sigil, toggleInscription } from "./sigil";

function sigil(center: string, inscriptions: string[] = []): Sigil {
  let s = placeRune(emptySigil(8), center, "center");
  for (const id of inscriptions) s = toggleInscription(s, id);
  return s;
}
const touched = (s: Sigil) => planBoard(s).touched.length;

describe("planBoard follows the shape descriptions in system-b.md", () => {
  it("covers the right number of hexes", () => {
    expect(touched(sigil("fire"))).toBe(1); // single target
    expect(touched(sigil("fire", ["burst"]))).toBe(7); // a hex plus its 6 neighbours
    expect(touched(sigil("fire", ["ring"]))).toBe(6); // the 6 around, not the destination
    expect(touched(sigil("fire", ["line"]))).toBe(3);
    expect(touched(sigil("fire", ["cone"]))).toBe(6); // rows of 1, 2 and 3
    expect(touched(sigil("fire", ["wall"]))).toBe(3);
    expect(touched(sigil("fire", ["large"]))).toBe(19); // radius 2
    expect(touched(sigil("fire", ["global"]))).toBe(allHexes().length);
  });

  it("gives each shape its destinations, plus extra destinations", () => {
    expect(planBoard(sigil("fire", ["chain"])).destinations).toHaveLength(3);
    expect(planBoard(sigil("fire", ["dash"])).destinations).toHaveLength(2);
    expect(planBoard(sigil("fire", ["burst", "extra", "extra"])).destinations).toHaveLength(3);
    expect(planBoard(sigil("fire", ["global"])).destinations).toHaveLength(0);
  });

  it("lands a self-cast spell on the caster", () => {
    expect(planBoard(sigil("mend", ["self"])).touched.map(key)).toEqual([key(CASTER)]);
  });

  it("joins a gate with one destination to the caster", () => {
    const plan = planBoard(sigil("portal", ["burst"]));
    expect(plan.links).toHaveLength(1);
    expect(plan.links[0]?.[1]).toEqual(CASTER);
  });

  it("draws a straight line between hexes", () => {
    const line = lineBetween({ col: 3, row: 6 }, { col: 3, row: 2 });
    expect(line.map(key)).toEqual(["3,6", "3,5", "3,4", "3,3", "3,2"]);
  });
});
