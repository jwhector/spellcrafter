import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { INSCRIPTIONS } from "./inscriptions";

// Whitespace is collapsed, since the doc wraps lines mid-phrase.
const DOC = readFileSync(join(process.cwd(), "docs/design/system-b.md"), "utf8").toLowerCase().replace(/\s+/g, " ");

describe("the crafter's inscriptions", () => {
  it("use words that docs/design/system-b.md uses, so a rename there is caught here", () => {
    for (const i of INSCRIPTIONS) expect(DOC, i.label).toContain(i.label.toLowerCase());
  });

  it("have unique ids", () => {
    expect(new Set(INSCRIPTIONS.map((i) => i.id)).size).toBe(INSCRIPTIONS.length);
  });

  it("carry the slot costs the doc gives", () => {
    const cost = (id: string) => INSCRIPTIONS.find((i) => i.id === id)?.slots;
    expect(cost("single")).toBe(0);
    expect(cost("large")).toBe(2);
    expect(cost("global")).toBe(3);
    expect(cost("extra")).toBe(1);
  });
});
