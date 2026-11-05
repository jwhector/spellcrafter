import { describe, expect, it } from "vitest";
import { misplacedDesignLinks } from "./design-links";
import { ROOT, read, walk } from "./scan";

// Built from parts so this file does not trip its own check.
const URL = ["https://claude.ai", "artifact", "abc"].join("/");

describe("design source links have one home", () => {
  it("flags a link outside docs/ and reference/", () => {
    const files = [
      { path: "docs/design/README.md", text: URL },
      { path: "reference/crafter.html", text: URL },
      { path: "CLAUDE.md", text: `see ${URL}` },
      { path: "engine/index.ts", text: "no link" },
    ];
    expect(misplacedDesignLinks(files)).toEqual(["CLAUDE.md"]);
  });

  it("holds for the repository", () => {
    const files = walk(ROOT)
      .filter((p) => /\.(md|ts|mjs|js|json|html|ya?ml|sh)$/.test(p) || !p.includes("."))
      .filter((p) => !p.startsWith(".mulch/") && !p.startsWith(".seeds/"))
      .map((path) => ({ path, text: read(ROOT, path) }));
    expect(misplacedDesignLinks(files)).toEqual([]);
  });
});
