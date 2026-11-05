import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { buildPage, docFiles, renderDoc, slugOf } from "./design-mirror.mjs";

const README = `# Design sources

## The docs

| Doc | Claude Doc (frozen) | File |
| --- | --- | --- |
| Master | https://example.com/a | [game-design.md](game-design.md) |
| Model | https://example.com/b | [spell-model.md](spell-model.md) |

## The tools

| Tool | Copy |
| --- | --- |
| Crafter | [crafter.html](../../reference/crafter.html) |
`;

const OPTS = { files: ["game-design.md", "spell-model.md", "README.md"], repoUrl: "https://github.com/o/r" };

test("the tab order comes from the README's docs table only", () => {
  assert.deepEqual(docFiles(README), ["game-design.md", "spell-model.md"]);
});

test("the repo's README lists files that exist", () => {
  const readme = readFileSync(new URL("../../docs/design/README.md", import.meta.url), "utf8");
  for (const f of docFiles(readme)) readFileSync(new URL(`../../docs/design/${f}`, import.meta.url));
});

test("README becomes the sources tab", () => {
  assert.equal(slugOf("README.md"), "sources");
  assert.equal(slugOf("spell-model.md"), "spell-model");
});

test("links between docs switch tabs, and other relative links go to GitHub", () => {
  const md = "# T\n\nSee [model](spell-model.md), [0003](../decisions/0003-x.md) and [web](https://a.b/c).";
  const { html } = renderDoc("game-design.md", md, OPTS);
  assert.match(html, /href="#spell-model"/);
  assert.match(html, /href="https:\/\/github.com\/o\/r\/blob\/main\/docs\/decisions\/0003-x.md"/);
  assert.match(html, /href="https:\/\/a.b\/c"/);
});

test("headings get unique ids and status words are marked", () => {
  const md = "# T\n\n## Open\n\n**Decided Nov 5:** x\n\n## Open\n";
  const doc = renderDoc("game-design.md", md, OPTS);
  assert.deepEqual(
    doc.headings.map((h) => h.id),
    ["game-design--open", "game-design--open-2"],
  );
  assert.match(doc.html, /<strong class="mark mark-decided">Decided/);
});

test("tables scroll inside their own box", () => {
  const { html } = renderDoc("game-design.md", "| a |\n| --- |\n| b |\n", OPTS);
  assert.match(html, /<div class="table-wrap"><table>/);
});

test("the page names its source commit and shows the first tab", () => {
  const docs = [renderDoc("game-design.md", "# The Hollow: game design\n\nx", OPTS)];
  const page = buildPage(docs, { commit: "abcdef1234", date: "2026-11-05", branch: "main", repoUrl: OPTS.repoUrl });
  assert.match(page, /<title>The Hollow design<\/title>/);
  assert.match(page, />abcdef1<\/a> on main, 2026-11-05/);
  assert.match(page, />Game design<\/a>/);
  assert.doesNotMatch(page, /\{\{[A-Z_]+\}\}/);
});
