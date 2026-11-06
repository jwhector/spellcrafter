/**
 * Reads the ground each major rune makes from docs/design/system-b.md (section "Ground",
 * the table headed "Major rune | The ground it makes", Decided Nov 5). The doc is the one
 * home for that table; this only parses it, and throws when the doc's shape changes so the
 * build fails instead of the page going quiet.
 */
import { slugify } from "../runes/reference";

const HEADER = /^\|\s*Major rune\s*\|\s*The ground it makes\s*\|\s*$/;

function cells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

/** Rune slug to the ground that rune makes as the major rune of a lingering or wall spell. */
export function parseGrounds(markdown: string): Record<string, string> {
  const lines = markdown.split("\n");
  const start = lines.findIndex((l) => HEADER.test(l));
  if (start < 0) throw new Error('system-b.md has no "Major rune | The ground it makes" table.');
  const out: Record<string, string> = {};
  for (const line of lines.slice(start + 2)) {
    if (!line.trim().startsWith("|")) break;
    const [rune, ground] = cells(line);
    if (rune && ground) out[slugify(rune)] = ground;
  }
  if (Object.keys(out).length === 0) throw new Error("The ground table in system-b.md has no rows.");
  return out;
}
