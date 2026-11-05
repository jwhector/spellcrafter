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

**Missing from the handoff folder** (not yet in the repo): the Playwright
smoke tests `crafter-test.js` and `audit-test.js`, and `data/bg3-spells.py`.
Seed `spellcrafter-c5df` tracks them.
