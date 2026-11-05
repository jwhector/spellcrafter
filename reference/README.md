# Reference tools

Snapshots of the two HTML tools from the design phase, copied from their
artifacts on 2026-11-05 (links in [docs/design/README.md](../docs/design/README.md)).
They are self-contained pages: open one in a browser to use it.

- `crafter.html`: Spell Circle Grammar v14. Its script is the reference for
  the engine port: `RUNES`, `SHAPES`, `TRIGGERS`, `TETHERS`, `HOOKS`, the
  canonical form and recipe id, and the compile-to-steps logic.
- `audit.html`: Hollow Spell Audit v4. It reuses the crafter's engine block
  and adds the price-list value model and the sweep.

**Out of date (as of Nov 5):** both still show the old ring entries and still
list Push and Pull as runes. Push and Pull became inscriptions on Nov 5, and
the ring review (step 3 of the plan) is changing ring entries column by
column. Where these tools and the design docs disagree, the docs win.

These files are not part of the build, are not formatted or linted, and are
not edited here. The engine port replaces them; once a view covers a tool,
the tool can be retired.

## The smoke tests and the BG3 data

Jared sent these on 2026-11-05, from the handoff folder. They are kept as
he sent them, except that the two tests are named `.cjs` instead of `.js`:
they use `require`, and this package is an ES module package, so Node would
refuse them as `.js`.

The tests need Playwright with Chromium, which this package does not
install. Cloud sessions have both preinstalled. Elsewhere, run
`npm install --no-save playwright && npx playwright install chromium` first.

- `crafter-test.cjs`: a Playwright smoke test for the crafter. It clicks
  every preset, prints the reading of preset 20 onward, sweeps every center
  and shape with the lingering toggle, prints any page errors, and saves
  `shot.png` in the current directory. Run it with
  `node reference/crafter-test.cjs "$PWD/reference/crafter.html"`.
- `audit-test.cjs`: a Playwright smoke test for the audit tool. It waits
  for the first sweep, runs the full sweep, clicks through each lens and the
  ground column, prints the summary and the problems, and saves `shot1.png`
  and `shot2.png` beside `audit.html` (ignored by git). Run it with
  `node reference/audit-test.cjs`. The full sweep takes a few minutes.
- `bg3-spells.py`: the BG3 coverage dataset behind the BG3 coverage audit
  doc. One row per spell: (level, name, circle, verdict, gap letters, note),
  with verdict E (easy), A (awkward) or X (needs an extension), plus the
  skipped spells. Run it with `python3 reference/bg3-spells.py` to print
  the counts: 176 spells, 88 E, 28 A, 60 X.
