import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const SKIP = new Set([".git", "node_modules", "dist", "coverage"]);

/** Every file under `root`, as a forward-slash path relative to it. */
export function walk(root: string, dir = root): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(root, full));
    else out.push(relative(root, full).split(sep).join("/"));
  }
  return out;
}

export function read(root: string, path: string): string {
  return readFileSync(join(root, path), "utf8");
}

/** The repository root, from this file's location (tests/guards/). */
export const ROOT = join(import.meta.dirname, "..", "..");
