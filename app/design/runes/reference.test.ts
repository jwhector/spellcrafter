import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cellStatus, inline, mainColumn, mentions, parseRuneReference } from "./reference";

const DOC = readFileSync(join(process.cwd(), "docs/design/rune-reference.md"), "utf8");

const FIXTURE = `# Runes

## Center

The center decides. All Proposed (crafter v14), except where marked.

| Rune | Role | Opposite |
| --- | --- | --- |
| Fire | Plain effect | Frost |
| Frost | Plain effect | Fire |
| Blank (Jared's name, Decided Nov 5) | | none |

**Aimed at a spell.** Only a Frost center can do it.

## Minor rune effect: through a gate

**Decided (Nov 5, ring review).** Used with a Portal center.

| Rune | Minor rune effect | Part of the gate it changes |
| --- | --- | --- |
| Fire | The entrance grows | Entrance |
| Frost | Open: not settled | Arrival spot |

**Open:** whether Fire grows on both ends.

## Open

- [ ] The ring review: on a summon,
      on ground.
- [ ] What the Blank rune does.
`;

describe("parseRuneReference on a fixture", () => {
  const ref = parseRuneReference(FIXTURE);

  it("reads the runes from the center table, with any note after the name", () => {
    expect(ref.runes).toEqual([
      { slug: "fire", name: "Fire", nameNote: null },
      { slug: "frost", name: "Frost", nameNote: null },
      { slug: "blank", name: "Blank", nameNote: "Jared's name, Decided Nov 5" },
    ]);
    expect(ref.center.columns).toEqual(["Role", "Opposite"]);
    expect(ref.center.rows.blank).toEqual({ Role: "", Opposite: "none" });
  });

  it("takes each table's status from the sentence or bold lead that states it", () => {
    expect(ref.center.status).toBe("Proposed");
    expect(ref.center.statusNote).toBe("All Proposed (crafter v14), except where marked.");
    const gate = ref.minorEffects[0];
    expect(gate?.title).toBe("Through a gate");
    expect(gate?.id).toBe("through-a-gate");
    expect(gate?.status).toBe("Decided");
    expect(gate?.statusNote).toBe("Decided (Nov 5, ring review).");
  });

  it("keeps the paragraphs after a table as its notes", () => {
    expect(ref.center.notes).toEqual(["**Aimed at a spell.** Only a Frost center can do it."]);
    expect(ref.minorEffects[0]?.notes).toEqual(["**Open:** whether Fire grows on both ends."]);
  });

  it("marks a cell that starts with Open as Open, whatever the table says", () => {
    const gate = ref.minorEffects[0];
    if (!gate) throw new Error("no gate table");
    expect(cellStatus(gate, gate.rows.frost?.["Minor rune effect"] ?? "")).toBe("Open");
    expect(cellStatus(gate, gate.rows.fire?.["Minor rune effect"] ?? "")).toBe("Decided");
    expect(mainColumn(gate)).toBe("Minor rune effect");
  });

  it("reads the Open list, joining wrapped lines", () => {
    expect(ref.openItems).toEqual(["The ring review: on a summon, on ground.", "What the Blank rune does."]);
  });

  it("refuses a table row for a rune the center table does not have", () => {
    const bad = FIXTURE.replace("| Frost | Open: not settled |", "| Ember | Open: not settled |");
    expect(() => parseRuneReference(bad)).toThrow(/"ember", which is not in the center table/);
  });

  it("refuses a row with the wrong number of cells", () => {
    const bad = FIXTURE.replace("| Fire | The entrance grows | Entrance |", "| Fire | The entrance grows |");
    expect(() => parseRuneReference(bad)).toThrow(/has 2 cells, expected 3/);
  });

  it("refuses a section with no status", () => {
    const bad = FIXTURE.replace("**Decided (Nov 5, ring review).** ", "");
    expect(() => parseRuneReference(bad)).toThrow(/states no status/);
  });
});

describe("parseRuneReference on docs/design/rune-reference.md", () => {
  const ref = parseRuneReference(DOC);

  it("reads every rune in the center table, Blank included", () => {
    expect(ref.runes.length).toBeGreaterThanOrEqual(17);
    expect(ref.runes.map((r) => r.slug)).toContain("blank");
    expect(new Set(ref.runes.map((r) => r.slug)).size).toBe(ref.runes.length);
  });

  it("reads a minor rune effect table for each major output type, each naming only known runes", () => {
    expect(ref.minorEffects.length).toBeGreaterThanOrEqual(7);
    for (const table of ref.minorEffects) {
      expect(Object.keys(table.rows).length, table.heading).toBeGreaterThanOrEqual(16);
      expect(table.columns, table.heading).toContain("Minor rune effect");
    }
  });

  it("gives the center table the columns the page shows", () => {
    expect(ref.center.columns).toEqual(
      expect.arrayContaining(["Role", "Opposite", "Makes", "Aimed at the board", "Across the whole battlefield"]),
    );
  });
});

describe("helpers", () => {
  it("matches a rune name as a capitalised word only", () => {
    const stone = { slug: "stone", name: "Stone", nameNote: null };
    expect(mentions("A Stone center", stone)).toBe(true);
    expect(mentions("Raises stone that blocks", stone)).toBe(false);
    expect(mentions("Stonework", stone)).toBe(false);
  });

  it("renders links as their text and keeps bold and code", () => {
    expect(inline("See [the rules](system-b.md#x) and **this** `code`.")).toEqual([
      { text: "See the rules and " },
      { text: "this", bold: true },
      { text: " " },
      { text: "code", code: true },
      { text: "." },
    ]);
  });
});
