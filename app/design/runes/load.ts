/**
 * Server-side loading for the rune page: reads the rune reference doc, and
 * lists which runes have a model file. Runs when the page is built.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseRuneReference, type RuneReference } from "./reference";

const DOC = join(process.cwd(), "docs/design/rune-reference.md");
/** Where a rune's model file goes; public/models/runes/README.md says what the file must be. */
export const MODEL_DIR = "models/runes";

export function loadRuneReference(): RuneReference {
  return parseRuneReference(readFileSync(DOC, "utf8"));
}

/** The slugs of runes that have public/models/runes/<slug>.glb. */
export function runesWithModels(reference: RuneReference): string[] {
  return reference.runes
    .map((r) => r.slug)
    .filter((slug) => existsSync(join(process.cwd(), "public", MODEL_DIR, `${slug}.glb`)));
}
