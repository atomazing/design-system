import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const distDir = resolve("dist");
const importPattern = /from\s+["'](\.{1,2}\/[^"']+\.js)["']/g;

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const entryPath = join(dir, entry);
    const stats = statSync(entryPath);

    if (stats.isDirectory()) {
      walk(entryPath);
      continue;
    }

    if (!entryPath.endsWith(".d.ts")) continue;

    const source = readFileSync(entryPath, "utf8");
    for (const match of source.matchAll(importPattern)) {
      const relativeImport = match[1];
      const runtimePath = resolve(dir, relativeImport);

      if (existsSync(runtimePath)) continue;
      writeFileSync(runtimePath, "export {};\n", "utf8");
    }
  }
}

walk(distDir);
