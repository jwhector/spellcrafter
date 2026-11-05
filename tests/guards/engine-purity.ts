/**
 * Golden rule: the engine is pure and deterministic game logic. It imports
 * nothing from app/ (the views) or the UI libraries (React, Next.js), never
 * touches the browser, and never reads the clock or an unseeded random
 * source, so the same rules give the same result in tests, in the crafter
 * preview and in battle.
 */
const BROWSER = /\b(document|window|localStorage|sessionStorage|HTMLElement|requestAnimationFrame)\b/;
const UNSEEDED = /\b(Math\.random|Date\.now|performance\.now)\b|\bnew Date\(\s*\)/;
// A module string, in any import form (`from "…"`, a side-effect `import "…"`, a dynamic `import("…")`
// or a `require("…")`), that reaches into app/ (or names the folder itself) or names a UI library.
const FROM_VIEWS = /(\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*)["'`][^"'`]*\bapp(?:\/|["'`])/;
const FROM_UI = /(\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*)["'`](react|react-dom|next)(?:\/[^"'`]*)?["'`]/;
/** The engine source files the rule covers. */
export const ENGINE_SOURCE = /^engine\/.*\.(ts|tsx|js|jsx|mjs|cjs|mts|cts)$/;

export interface Violation {
  path: string;
  line: number;
  text: string;
}

/** Lines in an engine source file that break the rule. Comments are skipped. */
export function engineViolations(path: string, source: string): Violation[] {
  const out: Violation[] = [];
  source.split("\n").forEach((text, i) => {
    const code = text.replace(/\/\/.*$/, "").trim();
    if (code.startsWith("*") || code.startsWith("/*")) return;
    if (BROWSER.test(code) || UNSEEDED.test(code) || FROM_VIEWS.test(code) || FROM_UI.test(code))
      out.push({ path, line: i + 1, text: text.trim() });
  });
  return out;
}
