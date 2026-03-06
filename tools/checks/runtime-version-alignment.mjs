import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const contexts = [
  {
    name: "root-dist",
    basePath: path.resolve(process.cwd(), "dist"),
  },
  {
    name: "next-app",
    basePath: path.resolve(process.cwd(), "examples/next-app-router/src"),
  },
];

const packagesToCheck = ["@mui/material", "react"];

const resolved = new Map();

for (const pkg of packagesToCheck) {
  const entries = [];
  for (const context of contexts) {
    const packageJsonPath = require.resolve(`${pkg}/package.json`, {
      paths: [context.basePath],
    });
    const packageJson = require(packageJsonPath);
    entries.push({
      context: context.name,
      version: packageJson.version,
      path: packageJsonPath,
    });
  }
  resolved.set(pkg, entries);
}

const mismatches = [];

for (const [pkg, entries] of resolved.entries()) {
  const expected = entries[0]?.version;
  for (const entry of entries.slice(1)) {
    if (entry.version !== expected) {
      mismatches.push(
        `${pkg}: expected ${expected} (from ${entries[0].context}), got ${entry.version} (from ${entry.context})`,
      );
    }
  }
}

for (const [pkg, entries] of resolved.entries()) {
  console.log(`\n[${pkg}]`);
  for (const entry of entries) {
    console.log(`- ${entry.context}: ${entry.version}`);
    console.log(`  ${entry.path}`);
  }
}

if (mismatches.length > 0) {
  console.error("\nRuntime dependency alignment check failed:");
  for (const mismatch of mismatches) {
    console.error(`- ${mismatch}`);
  }
  process.exit(1);
}

console.log("\nRuntime dependency alignment check passed.");
