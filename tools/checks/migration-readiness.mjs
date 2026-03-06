import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

const migrationDocsRoot = path.join(
  root,
  "migrations",
  "docs",
  "migrations",
  "design-system",
);

const routesRoot = path.join(migrationDocsRoot, "routes");
const expectedRoutes = ["greenfield", "adopt-existing", "mui4-to-latest"];

const requiredSharedFiles = [
  "README.md",
  path.join("shared", "WORKING-RULES.md"),
  path.join("shared", "FOUNDATION.md"),
  path.join("shared", "phases.md"),
  path.join("shared", "phase-exit-criteria.md"),
  path.join("shared", "common-regressions.md"),
  path.join("shared", "manual-qa-matrix.md"),
  path.join("shared", "gates.md"),
  path.join("shared", "acceptance.md"),
  path.join("shared", "rollback.md"),
  path.join("schema", "migration.spec.schema.json"),
];

const requiredTopLevelFiles = [
  path.join("migrations", "README.UPDATE.md"),
  path.join("migrations", "skills", "design-system-consumer-agent", "SKILL.md"),
  path.join(
    "migrations",
    "skills",
    "design-system-migration-agent",
    "SKILL.md",
  ),
];

const errors = [];
const warnings = [];

const toPosix = (value) => value.replaceAll("\\", "/");

const ensureFile = (absPath, label) => {
  if (!fs.existsSync(absPath)) {
    errors.push(`Missing file: ${label}`);
  }
};

const loadJson = (absPath, label) => {
  try {
    return JSON.parse(fs.readFileSync(absPath, "utf8"));
  } catch (error) {
    errors.push(`Invalid JSON in ${label}: ${error.message}`);
    return null;
  }
};

for (const relPath of requiredTopLevelFiles) {
  ensureFile(path.join(root, relPath), toPosix(relPath));
}

for (const relPath of requiredSharedFiles) {
  ensureFile(path.join(migrationDocsRoot, relPath), toPosix(relPath));
}

if (!fs.existsSync(routesRoot)) {
  errors.push("Missing routes directory: migrations/docs/migrations/design-system/routes");
} else {
  const routeDirs = fs
    .readdirSync(routesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const expectedRoute of expectedRoutes) {
    if (!routeDirs.includes(expectedRoute)) {
      errors.push(`Missing route directory: routes/${expectedRoute}`);
      continue;
    }

    const runbookPath = path.join(routesRoot, expectedRoute, "RUNBOOK.md");
    const specPath = path.join(routesRoot, expectedRoute, "migration.spec.json");

    ensureFile(runbookPath, `routes/${expectedRoute}/RUNBOOK.md`);
    ensureFile(specPath, `routes/${expectedRoute}/migration.spec.json`);

    if (!fs.existsSync(specPath)) continue;

    const spec = loadJson(specPath, `routes/${expectedRoute}/migration.spec.json`);
    if (!spec) continue;

    if (spec.id !== expectedRoute) {
      errors.push(
        `Route id mismatch in routes/${expectedRoute}/migration.spec.json: expected "${expectedRoute}", got "${String(spec.id)}"`,
      );
    }

    if (!Array.isArray(spec.steps) || spec.steps.length === 0) {
      errors.push(
        `Route spec routes/${expectedRoute}/migration.spec.json must include a non-empty "steps" array`,
      );
    } else {
      for (const step of spec.steps) {
        if (!step || typeof step !== "object") {
          errors.push(
            `Route spec routes/${expectedRoute}/migration.spec.json contains an invalid step entry`,
          );
          continue;
        }

        if (typeof step.name !== "string" || step.name.trim().length === 0) {
          errors.push(
            `Route spec routes/${expectedRoute}/migration.spec.json contains a step without a valid "name"`,
          );
        }

        if (!Array.isArray(step.run)) continue;

        for (const command of step.run) {
          if (typeof command !== "string") {
            errors.push(
              `Route spec routes/${expectedRoute}/migration.spec.json contains a non-string run command`,
            );
            continue;
          }

          if (command.includes("migrations/scripts/")) {
            errors.push(
              `Route spec routes/${expectedRoute}/migration.spec.json still references migrations/scripts: "${command}"`,
            );
          }
        }
      }
    }

    if (expectedRoute === "greenfield") {
      const detect = spec.detect;
      const allDependencies = detect?.packageJson?.allDependencies;
      if (
        Array.isArray(allDependencies) &&
        allDependencies.length === 0
      ) {
        errors.push(
          "greenfield migration.spec.json contains ambiguous detect.packageJson.allDependencies: []",
        );
      }
    }
  }

  const unexpectedRoutes = routeDirs.filter(
    (route) => !expectedRoutes.includes(route),
  );
  for (const route of unexpectedRoutes) {
    warnings.push(`Unexpected additional route directory found: routes/${route}`);
  }
}

const gitignorePath = path.join(root, ".gitignore");
if (!fs.existsSync(gitignorePath)) {
  errors.push("Missing .gitignore");
} else {
  const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
  const requiredGitignoreRules = ["!migrations/docs/", "!migrations/docs/**"];
  for (const rule of requiredGitignoreRules) {
    if (!gitignoreContent.includes(rule)) {
      errors.push(`.gitignore is missing required migrations docs rule: ${rule}`);
    }
  }
}

console.log("Migration readiness preflight summary:");
console.log(`- Checked routes: ${expectedRoutes.join(", ")}`);
console.log(`- Errors: ${errors.length}`);
console.log(`- Warnings: ${warnings.length}`);

if (warnings.length > 0) {
  console.log("\nWarnings:");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (errors.length > 0) {
  console.error("\nErrors:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("\nMigration readiness check passed.");
