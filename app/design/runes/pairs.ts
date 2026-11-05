import type { Rune, RuneReference } from "./reference";

/** Runes in the doc's order, with each opposite pair (the center table's Opposite column) kept together in one group. */
export function pairs(reference: RuneReference): Rune[][] {
  const groups: Rune[][] = [];
  for (const rune of reference.runes) {
    const last = groups.at(-1);
    const first = last?.[0];
    if (last?.length === 1 && first && reference.center.rows[first.slug]?.Opposite === rune.name) last.push(rune);
    else groups.push([rune]);
  }
  return groups;
}
