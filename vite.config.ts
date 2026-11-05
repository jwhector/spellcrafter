import { defineConfig } from "vitest/config";

// The views are the web page; the engine is plain TypeScript they import.
// Tests live beside the code (`*.test.ts`) and in tests/.
export default defineConfig({
  root: "views",
  build: { outDir: "../dist", emptyOutDir: true },
  test: {
    root: ".",
    include: ["engine/**/*.test.ts", "views/**/*.test.ts", "tests/**/*.test.ts"],
  },
});
