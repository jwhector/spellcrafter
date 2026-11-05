/**
 * How each rune looks on the rune overview page: a colour and a symbol.
 *
 * PLACEHOLDERS. Every colour and symbol here is a draft for Jared to approve
 * or replace; none is a design decision (CLAUDE.md golden rules 1 to 3). The
 * page says so beside the runes. The symbols are plain, abstract strokes:
 * RuneScape is a style reference for the feel only, and nothing here copies
 * its symbols.
 *
 * A symbol is a list of strokes; each stroke is a list of points on a square
 * from -1 to 1, with +y up. The stone's face draws them as raised, glowing
 * lines.
 */

export type Point = readonly [number, number];
export type Stroke = readonly Point[];

export interface RuneLook {
  /** The symbol's glow colour. */
  color: string;
  strokes: readonly Stroke[];
}

function ring(radius: number, from = 0, to = Math.PI * 2, steps = 24, cx = 0, cy = 0): Stroke {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const a = from + ((to - from) * i) / steps;
    return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)] as const;
  });
}

function spokes(count: number, radius: number, turn = Math.PI / 2): Stroke[] {
  return Array.from({ length: count }, (_, i) => {
    const a = turn + (Math.PI * i) / count;
    return [
      [radius * Math.cos(a), radius * Math.sin(a)],
      [-radius * Math.cos(a), -radius * Math.sin(a)],
    ] as const;
  });
}

function dashes(radius: number, count: number): Stroke[] {
  const step = (Math.PI * 2) / count;
  return Array.from({ length: count }, (_, i) => ring(radius, i * step, i * step + step * 0.55, 4));
}

/** Placeholder looks, by rune slug (see the note at the top of this file). */
export const RUNE_LOOKS: Readonly<Record<string, RuneLook>> = {
  fire: {
    color: "#ff7a2f",
    strokes: [
      [
        [-0.6, -0.7],
        [0, 0.8],
        [0.6, -0.7],
      ],
      [
        [-0.25, -0.7],
        [0, -0.1],
        [0.25, -0.7],
      ],
    ],
  },
  frost: { color: "#8fdcff", strokes: spokes(3, 0.75) },
  mend: {
    color: "#72e09a",
    strokes: [
      [
        [0, -0.75],
        [0, 0.75],
      ],
      [
        [-0.5, 0.2],
        [0.5, 0.2],
      ],
    ],
  },
  wound: {
    color: "#e0384f",
    strokes: [
      [
        [-0.55, 0.7],
        [0.25, -0.7],
      ],
      [
        [-0.15, 0.7],
        [0.6, -0.6],
      ],
    ],
  },
  protect: {
    color: "#f2c94c",
    strokes: [
      [
        [-0.6, 0.6],
        [0.6, 0.6],
        [0.6, 0],
        [0, -0.75],
        [-0.6, 0],
        [-0.6, 0.6],
      ],
    ],
  },
  expose: {
    color: "#c77dff",
    strokes: [
      [
        [0, 0.65],
        [0.7, 0],
        [0, -0.65],
        [-0.7, 0],
        [0, 0.65],
      ],
      [
        [0, 0.12],
        [0, -0.12],
      ],
    ],
  },
  portal: { color: "#8b74ff", strokes: [ring(0.7, 0.35, Math.PI * 2 - 0.35), ring(0.28)] },
  summon: {
    color: "#4fd1c5",
    strokes: [
      [
        [-0.6, -0.7],
        [0.6, -0.7],
      ],
      [
        [0, -0.7],
        [0, 0.65],
      ],
      [
        [-0.4, 0.25],
        [0, 0.65],
        [0.4, 0.25],
      ],
    ],
  },
  dispel: {
    color: "#e6e9ff",
    strokes: [
      ring(0.68),
      [
        [-0.48, -0.48],
        [0.48, 0.48],
      ],
    ],
  },
  stone: {
    color: "#c9a26b",
    strokes: [
      [
        [-0.55, -0.55],
        [0.55, -0.55],
        [0.55, 0.55],
        [-0.55, 0.55],
        [-0.55, -0.55],
      ],
      [
        [-0.55, 0],
        [0.55, 0],
      ],
    ],
  },
  amplification: {
    color: "#ff9f43",
    strokes: [
      [
        [-0.55, -0.05],
        [0, 0.55],
        [0.55, -0.05],
      ],
      [
        [-0.55, -0.6],
        [0, 0],
        [0.55, -0.6],
      ],
    ],
  },
  diminishing: {
    color: "#6f86e0",
    strokes: [
      [
        [-0.55, 0.05],
        [0, -0.55],
        [0.55, 0.05],
      ],
      [
        [-0.55, 0.6],
        [0, 0],
        [0.55, 0.6],
      ],
    ],
  },
  haste: {
    color: "#ffe066",
    strokes: [
      [
        [-0.6, 0.55],
        [0, 0],
        [-0.6, -0.55],
      ],
      [
        [0, 0.55],
        [0.6, 0],
        [0, -0.55],
      ],
    ],
  },
  slow: {
    color: "#5fa3bf",
    strokes: [
      [
        [-0.5, 0.7],
        [0.5, 0.7],
        [-0.5, -0.7],
        [0.5, -0.7],
        [-0.5, 0.7],
      ],
    ],
  },
  invisibility: { color: "#a9b4c2", strokes: dashes(0.65, 8) },
  revelation: {
    color: "#fff1b0",
    strokes: [
      ring(0.95, Math.PI * 0.2, Math.PI * 0.8, 12, 0, -0.62),
      ring(0.95, Math.PI * 1.2, Math.PI * 1.8, 12, 0, 0.62),
      ring(0.16),
    ],
  },
  // Blank shows a bare face: it has no symbol of its own yet (its mechanics are Open).
  blank: { color: "#d8d0c0", strokes: [] },
};

/** For a rune the doc gains before it gets a look here: a bare grey face. */
export const FALLBACK_LOOK: RuneLook = { color: "#b8b0a2", strokes: [] };

export function lookFor(slug: string): RuneLook {
  return RUNE_LOOKS[slug] ?? FALLBACK_LOOK;
}
