# Plan: The System B crafter page of the design dashboard

Seed: spellcrafter-78be  ·  Date: 2026-11-05  ·  Status: done (as a design mock)

## Context

Jared asked on Nov 5 for the dashboard's second page: an interactive 3D System
B crafter, "like a mock prototype of the in-game version of the draft". You
add a rune to the sigil, move the minor runes around it, add inscriptions, and
the page says what the spell makes. Everything is clicked; nothing is a
dropdown.

His answers to the questions asked in the thread:

- The sigil size is configurable from 3 to 8.
- A 3D hex board under the sigil lights the hexes the spell touches, its
  destinations and the ground or gate it leaves, with a plain-text readout.
- The page gets its own PR, after PR #4 (the rune overview page).
- The rune mechanics were being changed in the rune review (PR #5). The page
  waits for that PR before relying on anything that defines how runes behave.

The rules it reads come from [system-b.md](../design/system-b.md) ("The major
output types", "Reading a sigil", "Inscriptions", "Ground", "Conflict and order
rules") and [rune-reference.md](../design/rune-reference.md). Each line of the
readout carries the status the doc gives it.

## Approach

The page is a design mock, not the engine. The seed first said it needed the
engine port, sigil reading, the budget model and a hex view. Jared asked for the
page now, so it reads the docs directly and leaves numbers (strength, budget,
cooldown) to the engine.

- **Data from the docs.** The minor rune effects and the center's major output
  come from the rune reference, parsed at build time by the rune page's parser.
  The ground each major rune makes is parsed from system-b.md's "Major rune |
  The ground it makes" table (`app/design/crafter/grounds.ts`). Both parsers
  throw when the doc's shape changes, so the build fails rather than the page
  going quiet.
- **A thin rule layer in code** (`app/design/crafter/sigil.ts`): slot counting,
  which major output type a sigil reads, sections per destination, and the
  notes on opposites, filters on ground and order. Each rule names the doc and
  status it comes from.
- **Inscription labels** are copied from system-b.md
  (`app/design/crafter/inscriptions.ts`), and a test checks each label still
  appears in the doc. The tether ids (copy, redirect, transfer, leash) are
  placeholder names. Slot costs the docs don't give count as 1, and the page
  says so.
- **3D**: the sigil and the hex board are two more drei `View`s on the shared
  canvas (decision 0004), reusing the rune page's stones.

## Steps

### 1. Rule layer and readout

- **Does:** `inscriptions.ts`, `sigil.ts`, `grounds.ts` and `Readout.tsx`.
- **Acceptance criteria:** `sigil.test.ts`, `inscriptions.test.ts` and
  `grounds.test.ts` pass; the readout names the table each sigil reads.

### 2. The 3D sigil and the clicking

- **Does:** `SigilScene.tsx` and `CrafterDashboard.tsx`: the rune tray, sockets
  as buttons over the 3D sigil, size chips, move, swap and remove, minor
  inscriptions, and the inscription chips.
- **Acceptance criteria:** every action works by clicking, with no dropdown,
  at desktop and phone widths.

### 3. The hex board

- **Does:** `board.ts` (a 7x7 hex grid and each shape's footprint) and
  `BoardScene.tsx`.
- **Acceptance criteria:** `board.test.ts` checks each shape's footprint; the
  board shows destinations, ground, gates, summons and shields.

### 4. Recheck against the rune review

- **Does:** follows PR #5: a tether reads "on a unit" at each end, Protect
  reads "on a shield", and ground shows the ground the major rune makes.
- **Acceptance criteria:** the shield, tether and ground flows read the right
  tables in the browser.

## Risks

- The docs change shape. The parsers throw, so the build says so.
- The rule layer drifts from the docs where it restates a rule in code. Each
  rule cites its doc section, and the readout shows its status, so a reader
  can check it.

## Left out

- Numbers: strength, budget and cooldown come with the engine (seed
  spellcrafter-f26e and the others the seed listed).
- Final rune symbols and colours (seed spellcrafter-ff39).
- System A.
