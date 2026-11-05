#!/usr/bin/env node
/**
 * Builds the read-only Artifact mirror of the design docs: one HTML page with
 * a tab for each file in docs/design/, rendered from the Markdown at build
 * time. The Markdown leads (docs/decisions/0003-repo-markdown-leads.md); this
 * page is a copy for reading in Claude and is never edited by hand.
 *
 * The tab order comes from the docs table in docs/design/README.md, so the
 * list of docs has one home. README itself is the last tab.
 *
 * Usage: node .github/scripts/design-mirror.mjs [out.html]
 * (default out/design-mirror.html, which git ignores).
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const DESIGN = "docs/design";

/** The files the README's docs table lists, in its order. */
export function docFiles(readme) {
  const start = readme.indexOf("## The docs");
  if (start < 0) throw new Error("docs/design/README.md has no '## The docs' section");
  const end = readme.indexOf("\n## ", start + 1);
  const section = readme.slice(start, end < 0 ? undefined : end);
  const files = [];
  for (const line of section.split("\n")) {
    if (!line.startsWith("|")) continue;
    const m = line.match(/\]\(([\w-]+\.md)\)/);
    if (m && !files.includes(m[1])) files.push(m[1]);
  }
  if (files.length === 0) throw new Error("the docs table in docs/design/README.md lists no files");
  return files;
}

/** A doc's tab id: its file name without .md; README becomes "sources". */
export function slugOf(file) {
  const base = file.replace(/\.md$/, "");
  return base === "README" ? "sources" : base;
}

/**
 * A heading's anchor as GitHub writes it (github-slugger): the plain text,
 * lowercased, with punctuation dropped and each space turned into a hyphen.
 * Nothing is collapsed, so "A - B" gives "a---b", as on GitHub.
 */
export function headingId(html) {
  const text = html
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, "")
    .replace(/ /g, "-");
}

const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Renders one doc. Links to another design doc switch tabs, and a link to a
 * heading (in this doc or another) also scrolls to it; other relative links
 * point at the file on GitHub's main branch. Heading ids follow GitHub's
 * anchors, prefixed with the doc's tab id, so the same link works in both.
 */
export function renderDoc(file, markdown, { files, repoUrl }) {
  const slug = slugOf(file);
  const headings = [];
  const ids = [];
  const links = [];
  const seen = new Map();
  const marked = new Marked({
    gfm: true,
    renderer: {
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        let out = href;
        let jump = "";
        if (href.startsWith("#")) {
          out = `#${slug}`;
          jump = `${slug}--${href.slice(1)}`;
        } else if (!/^[a-z]+:/i.test(href)) {
          const [path, anchor] = href.split("#");
          if (files.includes(path)) {
            out = `#${slugOf(path)}`;
            if (anchor) jump = `${slugOf(path)}--${anchor}`;
          } else {
            const target = posix.normalize(posix.join(DESIGN, path));
            out = `${repoUrl}/blob/main/${target}${anchor ? `#${anchor}` : ""}`;
          }
        }
        if (jump) links.push(jump);
        const attrs = `${jump ? ` data-jump="${escapeHtml(jump)}"` : ""}${title ? ` title="${escapeHtml(title)}"` : ""}`;
        return `<a href="${escapeHtml(out)}"${attrs}>${text}</a>`;
      },
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        const base = headingId(inner);
        const n = seen.get(base) ?? 0;
        seen.set(base, n + 1);
        const id = `${slug}--${n > 0 ? `${base}-${n}` : base}`;
        ids.push(id);
        if (depth === 2 || depth === 3) headings.push({ id, depth, html: inner });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
    },
  });
  let html = marked.parse(markdown);
  html = html
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>")
    .replace(
      /<strong>(Decided|Proposed|Open|Superseded)\b/g,
      (_, w) => `<strong class="mark mark-${w.toLowerCase()}">${w}`,
    );
  const title = (markdown.match(/^# (.+)$/m)?.[1] ?? file).trim();
  return { slug, file, title, html, headings, ids, links };
}

/** The page, from the rendered docs and where they came from. */
export function buildPage(docs, { commit, date, branch, repoUrl }) {
  const tabs = docs
    .map(
      (d, i) =>
        `<a class="tab" href="#${d.slug}" data-tab="${d.slug}"${i === 0 ? ' aria-current="page"' : ""}>${escapeHtml(shortTitle(d.title))}</a>`,
    )
    .join("");
  const panels = docs
    .map((d, i) => {
      const toc = d.headings
        .map((h) => `<li class="toc-${h.depth}"><a href="#${d.slug}" data-jump="${h.id}">${h.html}</a></li>`)
        .join("");
      return `<section class="panel" id="panel-${d.slug}" data-panel="${d.slug}"${i === 0 ? "" : " hidden"}>
<details class="toc" aria-label="Sections of ${escapeHtml(d.title)}"><summary class="toc-label">On this page</summary><ul>${toc}</ul>
<p class="toc-source"><a href="${repoUrl}/blob/main/${DESIGN}/${d.file}">${DESIGN}/${d.file}</a></p></details>
<article class="doc">${d.html}</article>
</section>`;
    })
    .join("\n");
  const shortSha = commit.slice(0, 7);
  // Replacer functions, so a "$&" in a doc is never read as a pattern.
  const values = {
    TABS: tabs,
    PANELS: panels,
    SOURCE: `${repoUrl}/tree/${encodeURIComponent(branch)}/${DESIGN}`,
    COMMIT_URL: `${repoUrl}/commit/${commit}`,
    SHA: shortSha,
    BRANCH: escapeHtml(branch),
    DATE: escapeHtml(date),
  };
  return TEMPLATE.replace(/\{\{([A-Z_]+)\}\}/g, (m, key) => values[key] ?? m);
}

/** "The Hollow: spell model" reads as "Spell model" on a tab. */
function shortTitle(title) {
  const t = title.replace(/^The Hollow:\s*/, "");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function main() {
  const out = resolve(process.argv[2] ?? join(ROOT, "out/design-mirror.html"));
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  const repoUrl = (typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url)?.replace(/\.git$/, "");
  if (!repoUrl) throw new Error("package.json has no repository url");
  const git = (...a) => execFileSync("git", a, { cwd: ROOT, encoding: "utf8" }).trim();
  const readme = readFileSync(join(ROOT, DESIGN, "README.md"), "utf8");
  const files = [...docFiles(readme), "README.md"];
  const docs = files.map((f) => renderDoc(f, readFileSync(join(ROOT, DESIGN, f), "utf8"), { files, repoUrl }));
  const page = buildPage(docs, {
    commit: git("rev-parse", "HEAD"),
    date: git("log", "-1", "--format=%cs"),
    branch: git("rev-parse", "--abbrev-ref", "HEAD"),
    repoUrl,
  });
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page);
  console.log(`wrote ${out} (${docs.length} docs)`);
}

const TEMPLATE = `<title>The Hollow design</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alegreya:wght@500;700&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400&display=swap">
<style>
/* Layout: a header band with the source line and tabs, then a section list beside one long reading column. */
:root {
  --bg: #f3f4f2;
  --surface: #ffffff;
  --ink: #1d2326;
  --muted: #5b6569;
  --rule: #d5dad8;
  --accent: #2f6f6a;
  --decided: #2f6f4a;
  --proposed: #8a6418;
  --open: #9a3d3d;
  --font-display: "Alegreya", Georgia, "Times New Roman", serif;
  --font-body: "Source Sans 3", "Segoe UI", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, Menlo, monospace;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #14191b; --surface: #1b2225; --ink: #e3e7e6; --muted: #9aa5a8; --rule: #2e383b;
    --accent: #7cc3ba; --decided: #7fc79c; --proposed: #e0b65e; --open: #e98f8f; color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --bg: #14191b; --surface: #1b2225; --ink: #e3e7e6; --muted: #9aa5a8; --rule: #2e383b;
  --accent: #7cc3ba; --decided: #7fc79c; --proposed: #e0b65e; --open: #e98f8f; color-scheme: dark;
}
[hidden] { display: none !important; }
body { background: var(--bg); color: var(--ink); font: 16px/1.6 var(--font-body); }
body::before { content: ""; position: fixed; inset: 0 0 auto; height: env(safe-area-inset-top, 0px); z-index: 10; background: var(--surface); }
a { color: var(--accent); }
a:focus-visible, .tab:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.wrap { max-width: 1180px; margin: 0 auto; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
header { background: var(--surface); border-bottom: 1px solid var(--rule); position: sticky; top: env(safe-area-inset-top, 0px); z-index: 5; }
.head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 16px; padding-block: 14px 6px; }
.head h1 { font: 700 1.5rem/1.2 var(--font-display); margin: 0; letter-spacing: 0.01em; }
.source { color: var(--muted); font-size: 0.85rem; margin: 0; }
.tabs { display: flex; gap: 4px; overflow-x: auto; scrollbar-width: thin; }
.tab { flex: none; padding: 8px 12px 10px; color: var(--muted); text-decoration: none; font-weight: 600; font-size: 0.92rem; border-bottom: 2px solid transparent; }
.tab:hover { color: var(--ink); }
.tab[aria-current="page"] { color: var(--ink); border-bottom-color: var(--accent); }
main { padding-block: 24px 64px; }
.panel { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 40px; align-items: start; }
.toc { position: sticky; top: calc(env(safe-area-inset-top, 0px) + 116px); max-height: calc(100vh - 140px); overflow-y: auto; font-size: 0.85rem; }
.toc-label { cursor: pointer; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.72rem; color: var(--muted); margin: 0 0 6px; }
.toc ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }
.toc a { color: var(--muted); text-decoration: none; display: block; line-height: 1.35; }
.toc a:hover { color: var(--ink); }
.toc .toc-3 { padding-left: 12px; }
.toc-source { margin-top: 16px; font-family: var(--font-mono); font-size: 0.72rem; overflow-wrap: anywhere; }
.doc { min-width: 0; max-width: 78ch; }
.doc h1 { font: 700 2rem/1.2 var(--font-display); margin: 0 0 8px; text-wrap: balance; }
.doc h2 { font: 700 1.45rem/1.25 var(--font-display); margin: 2.2em 0 0.5em; padding-top: 0.6em; border-top: 1px solid var(--rule); text-wrap: balance; }
.doc h3 { font: 700 1.15rem/1.3 var(--font-display); margin: 1.8em 0 0.4em; text-wrap: balance; }
.doc h4 { font-size: 1rem; margin: 1.5em 0 0.3em; }
.doc h2, .doc h3, .doc h4 { scroll-margin-top: calc(env(safe-area-inset-top, 0px) + 120px); }
.doc p, .doc li { max-width: 72ch; }
.doc ul, .doc ol { padding-left: 1.3em; }
.doc li + li { margin-top: 0.25em; }
.doc code { font-family: var(--font-mono); font-size: 0.85em; background: var(--surface); border: 1px solid var(--rule); border-radius: 3px; padding: 0 3px; }
.doc pre { background: var(--surface); border: 1px solid var(--rule); border-radius: 4px; padding: 12px 14px; overflow-x: auto; font-size: 0.85rem; line-height: 1.5; }
.doc pre code { border: 0; padding: 0; background: none; }
.table-wrap { overflow-x: auto; margin: 1em 0; border: 1px solid var(--rule); border-radius: 4px; background: var(--surface); }
.doc table { border-collapse: collapse; font-size: 0.88rem; line-height: 1.45; min-width: 100%; }
.doc th, .doc td { text-align: left; vertical-align: top; padding: 7px 10px; border-bottom: 1px solid var(--rule); }
.doc th { font-weight: 600; background: var(--bg); position: sticky; top: 0; }
.doc td { min-width: 9em; }
.doc td:first-child { min-width: 7em; font-weight: 600; }
.doc tr:last-child td { border-bottom: 0; }
.doc input[type="checkbox"] { margin-right: 6px; }
.mark { font-variant: small-caps; letter-spacing: 0.04em; }
.mark-decided { color: var(--decided); }
.mark-proposed { color: var(--proposed); }
.mark-open, .mark-superseded { color: var(--open); }
@media (max-width: 820px) {
  .panel { grid-template-columns: minmax(0, 1fr); gap: 16px; }
  .toc { position: static; max-height: none; border: 1px solid var(--rule); border-radius: 4px; padding: 10px 12px; background: var(--surface); }
  .head h1 { font-size: 1.25rem; }
  header { position: static; }
  .doc h2, .doc h3, .doc h4 { scroll-margin-top: 16px; }
}
@media (min-width: 821px) { .toc summary { pointer-events: none; list-style: none; } .toc summary::-webkit-details-marker { display: none; } }
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
</style>
<header>
  <div class="wrap">
    <div class="head">
      <h1>The Hollow design</h1>
      <p class="source">Read-only copy of <a href="{{SOURCE}}">docs/design</a> at <a href="{{COMMIT_URL}}">{{SHA}}</a> on {{BRANCH}}, {{DATE}}. The repo leads: change the design there.</p>
    </div>
    <nav class="tabs" aria-label="Design docs">{{TABS}}</nav>
  </div>
</header>
<main class="wrap">
{{PANELS}}
</main>
<script>
(function () {
  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".panel");
  var first = tabs[0].getAttribute("data-tab");
  if (window.matchMedia("(min-width: 821px)").matches) document.querySelectorAll(".toc").forEach(function (d) { d.open = true; });
  function show(slug, jump) {
    var found = false;
    panels.forEach(function (p) { if (p.getAttribute("data-panel") === slug) found = true; });
    if (!found) slug = first;
    panels.forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== slug; });
    tabs.forEach(function (t) {
      if (t.getAttribute("data-tab") === slug) t.setAttribute("aria-current", "page");
      else t.removeAttribute("aria-current");
    });
    var target = jump && document.getElementById(jump);
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }
  function fromHash() { show(location.hash.slice(1) || first); }
  window.addEventListener("hashchange", fromHash);
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-jump]");
    if (!a) return;
    e.preventDefault();
    var slug = a.getAttribute("href").slice(1);
    if (location.hash.slice(1) !== slug) history.replaceState(null, "", "#" + slug);
    show(slug, a.getAttribute("data-jump"));
  });
  fromHash();
})();
</script>
`;

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
