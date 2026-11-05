/**
 * One fact, one home: the links to the design sources (the Claude Docs and
 * artifacts) live in docs/design/README.md. Code, config and agent
 * instructions link to that file instead of copying an artifact URL, so a
 * moved or replaced doc is fixed in one place.
 *
 * docs/ is exempt because the exported design docs and the handoff quote
 * the links as written; reference/ is exempt because it holds the tools as
 * exported.
 */
const LINK = /claude\.ai\/(?:code\/)?artifact\//;
const EXEMPT = /^(docs|reference)\//;

export function misplacedDesignLinks(files: { path: string; text: string }[]): string[] {
  return files.filter((f) => !EXEMPT.test(f.path) && LINK.test(f.text)).map((f) => f.path);
}
