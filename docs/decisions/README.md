# Decision records

One file per ratified choice about how The Hollow is built: the choice, why,
and the alternatives rejected. The rule itself lives in `CLAUDE.md` and links
here; this folder holds the reasoning, and is read when changing a decision.
Game design decisions are not recorded here: they live in the design docs
(`docs/design/`), marked Decided, Proposed or Open.

## Taking a number

Take the next number above every record on `main`, on any remote branch
(`git ls-remote --heads origin` and look), and in the reserved list below.
Two parallel branches will otherwise take the same one. Add your number to
the reserved list in your branch, and remove it when the record lands on main.

**Reserved by open pull requests:** none.

## Status lines

A status line is a fact, true the moment the record lands on main:

- `ratified when it lands`: the pull request that carries the record also
  carries what it decides.
- `pending <who> on <which point>`: a point is not built yet, or a question
  is with a person. Change the line in the change that settles it.
- `superseded by NNNN`: never delete a record; supersede it, and say so in both.

## Records

| # | Title | Status |
| --- | --- | --- |
| 0001 | [Scaffold the agentic workflow](0001-agentic-workflow-scaffold.md) | ratified when it lands |
| 0002 | [TypeScript and Vite, one package](0002-typescript-vite.md) | pending Jared on the stack |
