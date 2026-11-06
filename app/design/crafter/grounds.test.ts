import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseRuneReference } from "../runes/reference";
import { parseGrounds } from "./grounds";

const DOCS = join(process.cwd(), "docs/design");

describe("the ground table in system-b.md", () => {
  const grounds = parseGrounds(readFileSync(join(DOCS, "system-b.md"), "utf8"));
  const ref = parseRuneReference(readFileSync(join(DOCS, "rune-reference.md"), "utf8"));

  it("has a row for every rune the rune reference lists, except Blank", () => {
    const missing = ref.runes.filter((r) => r.slug !== "blank" && !grounds[r.slug]).map((r) => r.name);
    expect(missing).toEqual([]);
  });

  it("refuses a doc without the table", () => {
    expect(() => parseGrounds("# System B\n\nNo ground here.")).toThrow(/ground it makes/);
  });
});
