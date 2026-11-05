import { defineConfig } from "vitest/config";

// Tests live beside the code (`*.test.ts`) and in tests/. Next.js builds the
// views; Vitest only runs tests.
export default defineConfig({
  test: {
    include: ["engine/**/*.test.ts", "app/**/*.test.{ts,tsx}", "tests/**/*.test.ts"],
  },
});
