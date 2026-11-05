---
name: verify
description: Observe a change working in The Hollow before calling it done, beyond passing checks. Use after changing engine rules, a view, or the build, and before writing the Proof paragraph the review loop asks for.
---

# Skill: verify

Checks prove the code is consistent. They do not prove it does what Jared
asked. Before you call a change done, watch it work, then write what you ran
and saw as a `Proof:` paragraph in a commit message.

## By kind of change

- **Engine rules** (`engine/`). Run the rule on the cases the design docs
  give, and compare with what the doc says, line by line. The worked
  examples in `docs/design/engine-model.md` and the recipes in
  `docs/design/budget-model.md` are the reference cases. Where the
  reference crafter (`reference/crafter.html`) still matches the design,
  compare its output for the same circle too; where it is out of date (see
  `reference/README.md`), the docs win. A test that encodes a doc's example
  is the best proof: cite the doc and section in the test name.
- **Views** (`app/`). Run `npm run dev`, open the page, and drive the flow
  you changed: build the circle, run the round, read the readout. In a cloud
  session, use the preinstalled Playwright: `require('playwright')` works
  from any directory and `chromium.launch()` needs no options. Take a
  screenshot of the changed view and look at it. Check a phone width
  (about 390px) as well, since the end target is a Discord Activity.
- **The build or tooling.** Run `npm run check` from a clean `npm ci`, and
  `npm run build && npm start` to see the built page load.
- **The gates** (`.github/scripts/`, `.githooks/`). Run the script against a
  real repository the way git calls it. The tests in `.github/scripts/` show
  how.

## Design words

When a view shows a mechanic, use the words in the design docs. Jared names
mechanics; a placeholder is a plain description, never a new name. If a
label is missing, write a plain description and ask him.

## When you cannot observe it

Say so in the `Proof:` paragraph, and say what a person would need to do to
see it. That is a question for Jared, not something to paper over.
