/**
 * Where a sigil lands on a 7x7 hex board, for the crafter's preview. A sketch
 * from the shape descriptions in docs/design/system-b.md ("Shapes"), with a
 * fixed caster and fixed targets; it is not the battle rules, which wait for
 * the engine (seed spellcrafter-0cbe).
 *
 * Hexes are flat-topped in "odd-q" offset columns; math is done in cube
 * coordinates.
 */
import type { Sigil } from "./sigil";
import { destinations as destinationCount, hasTether, shapeOf } from "./sigil";

export const COLS = 7;
export const ROWS = 7;

export interface Hex {
  col: number;
  row: number;
}
type Cube = [number, number, number];

export const key = (h: Hex) => `${h.col},${h.row}`;

function toCube({ col, row }: Hex): Cube {
  const q = col;
  const r = row - (col - (col & 1)) / 2;
  return [q, r, -q - r];
}

function toHex([q, r]: Cube): Hex {
  return { col: q, row: r + (q - (q & 1)) / 2 };
}

const add = (a: Cube, b: Cube, k = 1): Cube => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
const N: Cube = [0, -1, 1];
const NE: Cube = [1, -1, 0];
const SW: Cube = [-1, 1, 0];
const NW: Cube = [-1, 0, 1];

export function onBoard(h: Hex): boolean {
  return h.col >= 0 && h.col < COLS && h.row >= 0 && h.row < ROWS;
}

/** Board position of a hex's centre, with the board centred on the origin; x right, z toward the viewer. */
export function position(h: Hex): [number, number] {
  const [q, r] = toCube(h);
  const [cq, cr] = toCube({ col: 3, row: 3 });
  return [1.5 * (q - cq), Math.sqrt(3) * (r - cr + (q - cq) / 2)];
}

function around(center: Hex, radius: number, includeCenter = true): Hex[] {
  const c = toCube(center);
  const out: Hex[] = [];
  for (let dq = -radius; dq <= radius; dq++) {
    for (let dr = Math.max(-radius, -dq - radius); dr <= Math.min(radius, -dq + radius); dr++) {
      if (!includeCenter && dq === 0 && dr === 0) continue;
      out.push(toHex([c[0] + dq, c[1] + dr, c[2] - dq - dr]));
    }
  }
  return out;
}

/** The fixed scene: you at the bottom middle, targets ahead. */
export const CASTER: Hex = { col: 3, row: 6 };
const TARGETS: Hex[] = [
  { col: 3, row: 2 },
  { col: 5, row: 3 },
  { col: 1, row: 3 },
  { col: 3, row: 0 },
];

export interface BoardPlan {
  caster: Hex;
  /** Other units on the board (targets a unit shape picks). */
  units: Hex[];
  /** The spell's destinations, in order. Empty for the whole battlefield. */
  destinations: Hex[];
  /** Hexes the spell covers. */
  touched: Hex[];
  /** Hexes it travels through (a bolt's flight, a dash's path). */
  path: Hex[];
  /** Lines between two places: chain hops, tether ends, a gate's entrance and exit. */
  links: [Hex, Hex][];
}

export function planBoard(s: Sigil): BoardPlan {
  const shape = shapeOf(s);
  const count = destinationCount(s);
  const caster = CASTER;
  const c = toCube(caster);
  let destinations: Hex[] = [];
  let path: Hex[] = [];
  let touched: Hex[] = [];
  const links: [Hex, Hex][] = [];

  if (shape.id === "self") destinations = [caster, ...TARGETS.slice(1, count)];
  else if (shape.id === "dash" || shape.id === "leap") {
    const landing = toHex(add(c, N, 3));
    destinations = [caster, landing, ...TARGETS.slice(1, count - 1)];
    path = [1, 2].map((k) => toHex(add(c, N, k)));
  } else if (shape.id === "line" || shape.id === "cone")
    destinations = [toHex(add(c, N, 1)), ...TARGETS.slice(1, count)];
  else if (shape.id !== "global") destinations = TARGETS.slice(0, count);

  for (const d of destinations) {
    switch (shape.id) {
      case "global":
        break;
      case "burst":
        touched.push(...around(d, 1));
        break;
      case "ring":
        touched.push(...around(d, 1, false));
        break;
      case "large":
        touched.push(...around(d, 2));
        break;
      case "wall": {
        const dc = toCube(d);
        touched.push(toHex(add(dc, SW)), d, toHex(add(dc, NE)));
        break;
      }
      default:
        touched.push(d);
    }
  }
  if (shape.id === "global") touched = around({ col: 3, row: 3 }, 6);
  if (shape.id === "line") touched = [1, 2, 3].map((k) => toHex(add(c, N, k)));
  if (shape.id === "cone") {
    const f1 = add(c, N);
    touched = [f1, add(f1, NW), add(f1, NE), add(add(c, N, 2), NW), add(c, N, 3), add(add(c, N, 2), NE)].map(toHex);
  }
  if (shape.id === "bolt") {
    const [d] = destinations;
    if (d) path = lineBetween(caster, d).slice(1, -1);
  }
  if (shape.id === "chain" || s.center === "portal" || hasTether(s)) {
    for (let i = 0; i + 1 < destinations.length; i++) {
      const a = destinations[i];
      const b = destinations[i + 1];
      if (a && b) links.push([a, b]);
    }
    const first = destinations[0];
    if (shape.id !== "chain" && destinations.length === 1 && first && key(first) !== key(caster))
      links.push([first, caster]);
  }

  const seen = new Set<string>();
  touched = touched.filter((h) => onBoard(h) && !seen.has(key(h)) && seen.add(key(h)));
  const units = shape.aims === "unit" && shape.id !== "self" ? destinations : TARGETS.slice(0, 1);
  return { caster, units, destinations, touched, path: path.filter(onBoard), links };
}

/** The hexes on a straight line between two hexes, both ends included. */
export function lineBetween(a: Hex, b: Hex): Hex[] {
  const ac = toCube(a);
  const bc = toCube(b);
  const n = Math.max(Math.abs(ac[0] - bc[0]), Math.abs(ac[1] - bc[1]), Math.abs(ac[2] - bc[2]));
  const out: Hex[] = [];
  for (let i = 0; i <= n; i++) {
    const t = n === 0 ? 0 : i / n;
    const lerp = (k: 0 | 1 | 2) => ac[k] + (bc[k] - ac[k]) * t + 1e-6 * (k + 1);
    out.push(toHex(roundCube([lerp(0), lerp(1), lerp(2)])));
  }
  return out;
}

function roundCube([x, y, z]: Cube): Cube {
  let q = Math.round(x);
  let r = Math.round(y);
  let s = Math.round(z);
  const dq = Math.abs(q - x);
  const dr = Math.abs(r - y);
  const ds = Math.abs(s - z);
  if (dq > dr && dq > ds) q = -r - s;
  else if (dr > ds) r = -q - s;
  else s = -q - r;
  return [q, r, s];
}

export function allHexes(): Hex[] {
  const out: Hex[] = [];
  for (let row = 0; row < ROWS; row++) for (let col = 0; col < COLS; col++) out.push({ col, row });
  return out;
}
