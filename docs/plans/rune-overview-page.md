# Plan: the rune overview page of the design dashboard

Seed: spellcrafter-3a0e  ·  Date: 2026-11-05  ·  Status: done

## Context

Jared asked (project thread, Nov 5) for a design dashboard. Its first page is
a rune overview: a hotbar of small 3D runes across the top; clicking one
summons it, with an animation, to a large view; and a panel gives everything
about how the rune behaves: its major output, and its minor rune effect in
each major output type. A second page that re-implements the System B
crafter comes later (seed spellcrafter-78be).

He chose, in the same thread, to make the 3D runes in code for now, with a
slot for model files, because he will soon model the runes with AI in
Blender. The runes should feel like RuneScape's (a small flat stone with a
glowing symbol) but be our own: style reference only.

The page shows the rune reference doc, `docs/design/rune-reference.md`, as
it stands: the center table is Proposed (crafter v14) except where marked;
the minor rune effect tables at a destination or on a unit, and through a
gate, are Decided; the other five are Proposed and in the ring review. The
page carries each table's status and never changes it.

## Approach

The page reads the doc when the site is built, so the doc stays the one home
for what each rune does (decision 0003) and the page follows the ring review
with no edits. All the 3D draws on one canvas with drei's View, because
browsers allow only about 16 live WebGL canvases. The summon is a CSS
transition on the stage's tracked div, which the View follows. Choosing a
rune changes the address with `history.pushState`, so the canvas stays
mounted and each rune still has its own link.

## Steps

### 1. Read the doc into typed data

- **Does:** `app/design/runes/reference.ts` parses the center table, every
  `## Minor rune effect: …` table, the notes after each table and the Open
  list. It throws on a table it cannot read.
- **Acceptance criteria:** `reference.test.ts` passes on a fixture and on the
  real doc: 17 runes, Blank included; seven or more minor rune effect tables
  of 16 or more rows, each naming only runes from the center table.
- **Early exit:** the doc's tables stop being one table per section.

### 2. The coded stones and the model file slot

- **Does:** `stone.ts` builds a flattened, worn pebble per rune and lays the
  rune's symbol on its face; `look.ts` holds placeholder symbols and colours.
  A file at `public/models/runes/<rune>.glb` replaces the coded stone,
  scaled and centred to the same space. The folder's README is the contract
  for Blender exports.
- **Acceptance criteria:** `stone.test.ts` passes; a test model file placed
  for one rune shows on the page in place of its stone, centred and sized.
- **Early exit:** model files need more than a scale and a move to fit.

### 3. The page

- **Does:** `/design` (the dashboard's home), `/design/runes` and
  `/design/runes/<rune>`: hotbar grouped in opposite pairs, summon
  animation, drag to turn, the panel for one rune, and a switch to show one
  table for every rune. Reduced motion fades instead of flying.
- **Acceptance criteria:** seen working in a browser at desktop and phone
  widths, with reduced motion, and an unknown rune gives a 404.
- **Early exit:** a mechanic on the page would need a name Jared has not
  given.

## Risks

- The doc's table shape changes in a design thread: the parser test fails
  and the build stops, rather than the page showing half a table.
- 3D is heavy on older phones and inside Discord: one canvas, small stones,
  no textures to download.

## Left out

- Final symbols and colours (seed spellcrafter-ff39, with Jared).
- Real models: the slot is ready; the files come from Jared's Blender work.
- The System B crafter page (seed spellcrafter-78be).
- Drawing only on demand: the stage rune sways all the time, so the canvas
  draws every frame while the page is open.
