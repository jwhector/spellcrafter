import { readFileSync } from "node:fs";
import { join } from "node:path";
import { runePageData } from "../runes/data";
import { parseGrounds } from "./grounds";

/** Everything the crafter page reads from the docs when it is built. */
export function crafterPageData() {
  const grounds = parseGrounds(readFileSync(join(process.cwd(), "docs/design/system-b.md"), "utf8"));
  return { ...runePageData(), grounds };
}
