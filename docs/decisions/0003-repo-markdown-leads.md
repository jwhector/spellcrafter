# 0003. The repo's Markdown leads the design

Status: ratified when it lands
Date: 2026-11-05

## Context

The design was written in five Claude Docs during the Glizzybot phase. The
handoff exported each one to Markdown in `docs/design/` and left open which
copy leads from then on (seed `spellcrafter-da21`). Until that was settled,
the Claude Docs led and the Markdown files were snapshots.

Jared then asked for a pass over the docs to cut repetition, retire
superseded material and give each fact one home. That restructure has to
happen in one copy.

## Decision

The Markdown in `docs/design/` is the design. Changes to the design are made
there, in a pull request, and only once Jared has decided them (CLAUDE.md
golden rule 3). The Claude Docs are frozen at the revisions listed in
`docs/design/README.md` and are no longer edited.

When Jared works with Claude outside the repo, Claude mirrors each change
into an Artifact he can read there (Jared, 2026-11-05). The mirror is one
page with a tab per doc, rendered from the Markdown by a script in the repo,
so it is a mechanical copy and is never edited by hand. It is read-only and
never leads. Its link and the steps to refresh it are in
`docs/design/README.md`.

## Why

- A restructure this size is much easier to review as one diff than as a
  set of connector edits across five Docs.
- Agents can read, search and check the Markdown next to the engine, and
  the guards in `tests/guards/` can see it.
- One copy that leads means no second copy kept in sync by hand.

## Alternatives rejected

- **The Claude Docs lead, and the repo re-exports after each change.** This
  keeps the Docs' reading view and comments, but every change lands in two
  places, and the exports drift as soon as one is skipped.
- **The five Claude Docs kept as the mirror, updated through the connector.**
  Five copies kept in sync by hand is how drift starts.

## Consequences

- Editing a file in `docs/design/` changes the design, so it follows the
  same rules as any design change: Jared decides, then the file changes.
- Jared loses the Docs' reading view and comments in exchange for review on
  GitHub. The Artifact mirror is meant to give the reading view back.
- Revisit if Jared finds he needs to comment on the design in Claude rather
  than on GitHub.
