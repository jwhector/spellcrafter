/**
 * Reads the rune reference doc (docs/design/rune-reference.md) into typed
 * data for the rune overview page. The doc is the one home for what each
 * rune does (decision 0003: the repo's Markdown leads the design), so the
 * page parses it at build time instead of keeping a copy.
 *
 * This is not game logic, so it lives with the view, not in engine/. It takes
 * the doc's text and does no I/O; load.ts reads the file.
 *
 * The parser fails loudly (throws) when the doc's shape changes in a way it
 * cannot read, so a doc edit that would break the page fails the tests and
 * the build instead of showing half a table.
 */

export type Status = "Decided" | "Proposed" | "Open";

/** One table of the doc: the center, or one major output type's minor rune effects. */
export interface RuneTable {
  /** URL-safe id, from the heading. */
  id: string;
  /** The heading as written, e.g. "Minor rune effect: through a gate". */
  heading: string;
  /** A short title for the page, e.g. "Through a gate". */
  title: string;
  /** The status the section's lead paragraph gives the table. */
  status: Status;
  /** The text that states that status, e.g. "Decided (Nov 5, ring review)." */
  statusNote: string;
  /** Column headers after the first ("Rune") column. */
  columns: string[];
  /** Cells by rune slug, then by column header. */
  rows: Record<string, Record<string, string>>;
  /** Paragraphs after the table: rules, open points and checks for this table. */
  notes: string[];
}

export interface Rune {
  slug: string;
  name: string;
  /** Anything in brackets after the name in the center table, e.g. "Jared's name, Decided Nov 5". */
  nameNote: string | null;
}

export interface RuneReference {
  /** In the center table's order, which keeps opposite pairs together. */
  runes: Rune[];
  center: RuneTable;
  /** One per major output type, in the doc's order. */
  minorEffects: RuneTable[];
  /** The doc's closing Open list, one entry per item. */
  openItems: string[];
}

const CENTER_HEADING = "Center";
const MINOR_PREFIX = "Minor rune effect:";
const OPEN_HEADING = "Open";
const STATUS_WORD = /\b(Decided|Proposed|Open)\b/;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Splits the doc into its "## " sections: heading, then body lines. */
function sections(markdown: string): { heading: string; lines: string[] }[] {
  const out: { heading: string; lines: string[] }[] = [];
  for (const line of markdown.split(/\r?\n/)) {
    const h = /^## (.+)$/.exec(line);
    if (h?.[1]) out.push({ heading: h[1].trim(), lines: [] });
    else out.at(-1)?.lines.push(line);
  }
  return out;
}

function cells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

interface Blocks {
  before: string[];
  table: string[][] | null;
  after: string[];
}

/** Splits a section body into paragraphs before its first table, the table, and paragraphs after it. */
function blocks(lines: string[]): Blocks {
  const result: Blocks = { before: [], table: null, after: [] };
  let para: string[] = [];
  let tableLines: string[] = [];
  const flush = () => {
    if (para.length) (result.table ? result.after : result.before).push(para.join(" "));
    para = [];
  };
  for (const line of lines) {
    if (line.trim().startsWith("|") && !result.table) {
      flush();
      tableLines.push(line);
      continue;
    }
    if (tableLines.length) {
      // The separator row (| --- |) is the second line; drop it.
      result.table = tableLines.filter((_, i) => i !== 1).map(cells);
      tableLines = [];
    }
    if (line.trim() === "") flush();
    else para.push(line.trim());
  }
  if (tableLines.length) result.table = tableLines.filter((_, i) => i !== 1).map(cells);
  flush();
  return result;
}

/** The section's status, from the first paragraph that names one. */
function statusOf(heading: string, paragraphs: string[]): { status: Status; statusNote: string } {
  for (const p of paragraphs) {
    const word = STATUS_WORD.exec(p)?.[1] as Status | undefined;
    if (!word) continue;
    const bold = /^\*\*(.+?)\*\*/.exec(p)?.[1];
    if (bold && STATUS_WORD.test(bold)) return { status: word, statusNote: bold };
    const sentence = p.split(/(?<=\.)\s+/).find((s) => STATUS_WORD.test(s)) ?? p;
    return { status: word, statusNote: sentence };
  }
  throw new Error(`rune reference: section "${heading}" states no status (Decided, Proposed or Open)`);
}

/** "Blank (Jared's name, Decided Nov 5)" -> name "Blank", note "Jared's name, Decided Nov 5". */
function runeName(cell: string): { name: string; nameNote: string | null } {
  const m = /^([^(]+?)\s*\((.+)\)\s*$/.exec(cell);
  return m?.[1] && m[2] ? { name: m[1], nameNote: m[2] } : { name: cell, nameNote: null };
}

function readTable(heading: string, lines: string[], title: string): { table: RuneTable; names: string[] } {
  const { before, table, after } = blocks(lines);
  if (!table || table.length < 2) throw new Error(`rune reference: section "${heading}" has no table`);
  const [header, ...body] = table as [string[], ...string[][]];
  if (header[0] !== "Rune")
    throw new Error(`rune reference: the table in "${heading}" does not start with a Rune column`);
  const columns = header.slice(1);
  const rows: Record<string, Record<string, string>> = {};
  const names: string[] = [];
  for (const row of body) {
    if (row.length !== header.length) {
      throw new Error(`rune reference: a row in "${heading}" has ${row.length} cells, expected ${header.length}`);
    }
    const name = runeName(row[0] ?? "").name;
    names.push(row[0] ?? "");
    rows[slugify(name)] = Object.fromEntries(columns.map((c, i) => [c, row[i + 1] ?? ""]));
  }
  return {
    table: { id: slugify(title), heading, title, ...statusOf(heading, before), columns, rows, notes: after },
    names,
  };
}

function openList(lines: string[]): string[] {
  const items: string[] = [];
  for (const line of lines) {
    const item = /^- \[[ x]\]\s+(.*)$/.exec(line);
    if (item?.[1] !== undefined) items.push(item[1]);
    else if (/^\s+\S/.test(line) && items.length) items[items.length - 1] += ` ${line.trim()}`;
  }
  return items;
}

export function parseRuneReference(markdown: string): RuneReference {
  const all = sections(markdown);
  const centerSection = all.find((s) => s.heading === CENTER_HEADING);
  if (!centerSection) throw new Error(`rune reference: no "## ${CENTER_HEADING}" section`);
  const { table: center, names } = readTable(centerSection.heading, centerSection.lines, "Major output");
  const runes = names.map((cell) => {
    const { name, nameNote } = runeName(cell);
    return { slug: slugify(name), name, nameNote };
  });

  const minorEffects = all
    .filter((s) => s.heading.startsWith(MINOR_PREFIX))
    .map((s) => {
      const rest = s.heading.slice(MINOR_PREFIX.length).trim();
      const title = rest.charAt(0).toUpperCase() + rest.slice(1);
      const { table } = readTable(s.heading, s.lines, title);
      for (const slug of Object.keys(table.rows)) {
        if (!runes.some((r) => r.slug === slug)) {
          throw new Error(`rune reference: "${s.heading}" has a row for "${slug}", which is not in the center table`);
        }
      }
      return table;
    });
  if (minorEffects.length === 0) throw new Error(`rune reference: no "## ${MINOR_PREFIX} ..." sections`);

  const open = all.find((s) => s.heading === OPEN_HEADING);
  return { runes, center, minorEffects, openItems: open ? openList(open.lines) : [] };
}

/** True when the text names the rune as a word, capitalised as the doc writes rune names. */
export function mentions(text: string, rune: Rune): boolean {
  return new RegExp(`\\b${rune.name}\\b`).test(text);
}

/** A cell that starts with "Open" is Open whatever its table's status. */
export function cellStatus(table: RuneTable, text: string): Status {
  return /^Open\b/.test(text) ? "Open" : table.status;
}

/** The column that holds the minor rune effect itself; other columns are labels around it. */
export function mainColumn(table: RuneTable): string {
  return table.columns.find((c) => c === "Minor rune effect") ?? table.columns.at(-1) ?? "";
}

/** Inline Markdown as plain segments: links become their text, **bold** and `code` are kept as flags. */
export type Segment = { text: string; bold?: boolean; code?: boolean };

export function inline(text: string): Segment[] {
  const plain = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const out: Segment[] = [];
  const re = /\*\*(.+?)\*\*|`([^`]+)`/g;
  let last = 0;
  for (let m = re.exec(plain); m; m = re.exec(plain)) {
    if (m.index > last) out.push({ text: plain.slice(last, m.index) });
    out.push(m[1] !== undefined ? { text: m[1], bold: true } : { text: m[2] ?? "", code: true });
    last = m.index + m[0].length;
  }
  if (last < plain.length) out.push({ text: plain.slice(last) });
  return out;
}
