import { describe, expect, it } from "vitest";
import { engineViolations } from "./engine-purity";
import { ROOT, read, walk } from "./scan";

describe("engine purity", () => {
  it("flags a view import and a DOM call, and ignores comments", () => {
    const src = [
      'import { board } from "../views/board";',
      "// document is fine in a comment",
      " * so is window, in a doc comment",
      "const el = document.querySelector('x');",
      "export const n = 1;",
    ].join("\n");
    expect(engineViolations("engine/x.ts", src).map((v) => v.line)).toEqual([1, 4]);
  });

  it("holds for every engine source file", () => {
    const files = walk(ROOT).filter((p) => p.startsWith("engine/") && p.endsWith(".ts") && !p.endsWith(".test.ts"));
    expect(files.length).toBeGreaterThan(0);
    expect(files.flatMap((p) => engineViolations(p, read(ROOT, p)))).toEqual([]);
  });
});
