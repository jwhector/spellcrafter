/**
 * Golden rule: the engine is pure game logic. It imports nothing from views/
 * and never touches the browser, so the same rules run in tests, in the
 * crafter preview and in battle.
 */
const BROWSER = /\b(document|window|localStorage|sessionStorage|HTMLElement|requestAnimationFrame)\b/;
const FROM_VIEWS = /from\s+["'][^"']*\bviews\//;

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
    if (BROWSER.test(code) || FROM_VIEWS.test(code)) out.push({ path, line: i + 1, text: text.trim() });
  });
  return out;
}
