import { describe, expect, it } from "vitest";
import { ENGINE_SOURCE, engineViolations } from "./engine-purity";
import { ROOT, read, walk } from "./scan";

describe("engine purity", () => {
  it("flags view and UI-library imports of every form, DOM calls and unseeded randomness, and ignores comments", () => {
    const src = [
      'import { board } from "../app/board";',
      "// document is fine in a comment",
      " * so is window, in a doc comment",
      "const el = document.querySelector('x');",
      "export const n = 1;",
      'import "../app/style";',
      'const m = await import("../app/board");',
      'const r = require("../app/board");',
      "const roll = Math.random();",
      "const t = Date.now();",
      'import { reviews } from "./reviews";',
      'import { a } from "../app";',
      'import { useState } from "react";',
      'import Link from "next/link";',
      'import { reactive } from "./reactive";',
    ].join("\n");
    expect(engineViolations("engine/x.ts", src).map((v) => v.line)).toEqual([1, 4, 6, 7, 8, 9, 10, 12, 13, 14]);
  });

  it("covers every script extension under engine/, but not tests", () => {
    expect(["engine/a.ts", "engine/b/c.tsx", "engine/d.mjs", "engine/e.js"].every((p) => ENGINE_SOURCE.test(p))).toBe(
      true,
    );
    expect(ENGINE_SOURCE.test("app/a.ts")).toBe(false);
  });

  it("holds for every engine source file", () => {
    const files = walk(ROOT).filter((p) => ENGINE_SOURCE.test(p) && !/\.test\.[a-z]+$/.test(p));
    expect(files.length).toBeGreaterThan(0);
    expect(files.flatMap((p) => engineViolations(p, read(ROOT, p)))).toEqual([]);
  });
});
