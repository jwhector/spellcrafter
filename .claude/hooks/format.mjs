#!/usr/bin/env node
// PostToolUse: format and lint-fix the file an agent just wrote or edited.
// Best-effort by design: it never blocks an edit, so every failure (Biome not
// installed yet, a file Biome does not handle) exits 0.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

try {
  let input = "";
  for await (const chunk of process.stdin) input += chunk;
  const path = JSON.parse(input)?.tool_input?.file_path;
  const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
  const biome = join(root, "node_modules", ".bin", "biome");
  if (path && existsSync(biome)) {
    execFileSync(biome, ["check", "--write", "--no-errors-on-unmatched", "--files-ignore-unknown=true", path], {
      cwd: root,
      stdio: "ignore",
    });
  }
} catch {
  // never block
}
process.exit(0);
