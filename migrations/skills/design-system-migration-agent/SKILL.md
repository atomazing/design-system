---
name: design-system-migration-agent
description: Route-based migration instructions for adopting @atomazing-org/design-system (v2 target, MUI v7 baseline) in application repos. Use when Codex/AI needs to plan and execute a migration path (greenfield, adopt-existing, or MUI v4 to latest) by reading runbooks/specs in migrations/docs instead of relying on local automation scripts.
---

# Design System Migration Agent

Use this skill to run a design-system migration as an AI-guided workflow.

Treat `migrations/docs/migrations/design-system/` as the source of truth.
Treat `migrations/scripts/` as optional legacy automation/reference, not a requirement.
Read `../../docs/migrations/design-system/shared/WORKING-RULES.md` before selecting the route.

## Quick start

1. Read `../../docs/migrations/design-system/README.md`.
2. Read `../../docs/migrations/design-system/shared/WORKING-RULES.md`.
3. Read `../../docs/migrations/design-system/shared/phases.md`.
4. Detect the route from the target app (`package.json`, imports, current theme setup).
5. Read only the selected route files:
   - `../../docs/migrations/design-system/routes/<route>/RUNBOOK.md`
   - `../../docs/migrations/design-system/routes/<route>/migration.spec.json`
6. Read shared checks:
   - `../../docs/migrations/design-system/shared/FOUNDATION.md`
   - `../../docs/migrations/design-system/shared/WORKING-RULES.md`
   - `../../docs/migrations/design-system/shared/phases.md`
   - `../../docs/migrations/design-system/shared/phase-exit-criteria.md`
   - `../../docs/migrations/design-system/shared/common-regressions.md`
   - `../../docs/migrations/design-system/shared/manual-qa-matrix.md`
   - `../../docs/migrations/design-system/shared/gates.md`
   - `../../docs/migrations/design-system/shared/acceptance.md`
   - `../../docs/migrations/design-system/shared/rollback.md` (before risky edits)
7. Execute the migration in small commits, validating after each major step.
8. For large repos, keep the migration phase-gated:
   - keep the app runnable at the end of each phase
   - keep one main change class per phase
   - stabilize shared infrastructure before domain-by-domain waves

## Select route

Inspect the target app repository:

- If `package.json` has `@material-ui/*` dependencies or source imports `@material-ui/*`:
  - use `mui4-to-latest`
- Else if the app is new or there is no legacy theme/token layer to migrate:
  - use `greenfield`
- Else:
  - use `adopt-existing`

Use migration instead of ad hoc integration if the request would otherwise leave
multiple theme providers, multiple theme state stores, or a large unresolved token layer.

If detection is ambiguous, stop and ask the user which route to prefer.

## Execute workflow (AI-driven, no local migration scripts required)

1. Create a phased plan and name the selected route.
   - use `shared/phases.md` as the default step-by-step scaffold for the plan
   - For large repos, define explicit stop-gates between dependency landing, mechanical migration, root theme unification, runtime cleanup, shared infrastructure, domain waves, and final closeout.
2. Run baseline checks (`npm test`, `npm run build`, and `npm run lint` when available).
   - If the repo exposes contract gates such as `npm run lint:style-contract`,
     `npm run lint:design-contract`, or `npm run lint:typography-contract`,
     include them in the baseline and closeout pass.
   - If the repo exposes smoke or e2e coverage for shell, protected routes, or
     overlays such as `npm run test:smoke`, include that in the migration gate.
3. Run the repo's normal dev/start command and verify the app reaches the first route in a real browser before and after migration work.
4. Parse `migration.spec.json` and convert each step into concrete actions:
   - execute `run` commands when they are generic and safe;
   - if a `run` command references `migrations/scripts/*`, perform the intent manually:
     - dependency updates: edit `package.json` directly;
     - route detection: inspect `package.json` and imports directly;
     - token replacements: use CSV mapping + targeted search/replace + manual review;
     - gates: use `rg` searches and test/build commands.
5. Execute `manualReview` items as explicit subtasks and record what was changed.
   - Do not batch dependency upgrades, shell rewrites, and broad token cleanup into one unvalidated change set.
   - If shell, overlays, or shared primitives are in scope, add or tighten smoke coverage before broad refactors.
6. If install scripts fail because of repo tooling such as Husky, retry with the package manager's `--ignore-scripts` equivalent only as a recovery path, then continue with the intended validation commands.
7. Re-run route gates and shared acceptance checks, including runtime startup verification in a real browser.
8. Summarize:
   - selected route;
   - files changed;
   - remaining manual follow-up (visual QA, edge screens, regressions).

## Replace script intents manually

Use these substitutions when specs mention local `.mjs` helpers:

- `actions/update-package-json.mjs`
  - edit `package.json` directly
  - preserve existing package manager conventions and lockfile
- `preflight/detect-route.mjs`
  - inspect dependencies/imports directly
- `shared/apply-replacements-from-csv.mjs`
  - read `token-map.csv`
  - apply only safe textual replacements first
  - review diffs file-by-file
- `gates/no-legacy-material-ui.mjs`
  - search for `@material-ui/` in source and `package.json`
- `gates/no-hardcoded-tokens.mjs`
  - search for project-specific token modules/identifiers from route config or user-provided list

Prefer `rg` for all searches.

## Runtime Startup Gate

Do not close a migration on the basis of build success alone.

- Start the app with the repo's normal dev/start command.
- Open the first route in a real browser.
- Fix startup console errors before closeout.
- Fix migration-caused startup warnings before closeout when they indicate broken runtime alignment.
- If `react`, `react-dom`, `@emotion/react`, or `@emotion/styled` are loaded more than once, align bundler/runtime configuration with dedupe, aliasing, or singleton-sharing.
- Remove module-scope code that depends on browser APIs, storage, or i18n locale activation.
- Verify that the active preset still owns the application background after migration.
- If root shells, layouts, or page wrappers set page-level `background` or `backgroundColor`, remove those overrides unless they are intentional component surfaces.
- If shell workspaces or route-level content panes were touched, verify the main page root still fills the available content region instead of collapsing to content width or leaving empty workspace.
- If shared charts, legends, chips, segmented filters, or compact status controls were touched, verify they still read as preset-aligned UI instead of ad hoc chip-like chrome.
- Keep preset selection explicit in one app-owned theme module instead of generic constants passthrough files.
- If several role-based pages share the same structural shell, extract a shared workflow layout contract before continuing with visual cleanup.
- If a local barrel re-export introduces circular chunk warnings, switch the affected app internals to direct local imports.
- Fix consumer-owned build warnings such as stale asset globs or oversized local chunks with config and bundling changes.
- If a remaining build warning is emitted by an upstream toolchain package, record the exact package and file rather than pretending the app owns it.
- Audit visible text when UI components are touched:
  - use `Typography` with explicit `variant`
  - wrap visible text in `Button`, `ToggleButton`, `MenuItem`, `Chip`, and `Alert` with `Typography component="span"`
  - if typography regressions are broad, add or update a repo-local typography contract check and keep it green
- If raw token drift is broad, add or update a repo-local design-contract check for hardcoded colors, raw numeric font sizes, or ad hoc radius/opacity values and keep it green
- Expand the design-contract check when needed so it also catches decorative gradients, direct shadow styling, theme shadow-token drift, palette alpha suffix hacks, and unapproved visual-preview exceptions
- If the consumer repo already enforces a style-contract or styleless-UI rule, keep that gate green during the migration instead of treating it as unrelated local debt
- If a migrated consumer component still carries a large inline `sx` object, extract that styling into a local `styled(...)` component in the same file and keep the styled declarations near the bottom of the file
- If bulk replacements, codemods, or encoding-sensitive file rewrites touched localized copy, scan for mojibake or replacement characters and verify at least one real localized route renders readable text
- Remove zero-value surface wrappers that only forward to MUI `Card` or `Paper`
- Replace palette-string alpha hacks with theme helpers such as `alpha()`
- Treat consumer-owned gradient or shadow chrome on normal surfaces as a migration defect unless it is an explicitly documented preview exception
- When shared overlays are touched:
  - keep `aria-labelledby` and `aria-describedby` wired through stable ids
  - label close actions explicitly
  - hide decorative bottom-sheet chrome from assistive tech when it carries no state
  - use `combobox` and `listbox` semantics for overlay search UIs with keyboard filtering
- Keep browser event listeners such as `beforeinstallprompt` or `matchMedia` subscriptions inside effects with cleanup instead of render paths or module scope
- Prefer smoke checks through stable overlay entrypoints if overlay infrastructure changes during migration

## Required outputs

Produce all of the following in the final response/work log:

- selected route and why
- completed steps vs skipped steps
- exact commands run
- startup issues found and how they were fixed
- unresolved warnings / manual QA checklist
- rollback guidance if migration is partial

## Notes

- Replace `<SET_VERSION>` placeholders in route specs with the user-provided `@atomazing-org/design-system` version.
- Adapt commands to the repo package manager (`npm`, `pnpm`, `yarn`, `bun`) instead of forcing `npm`.
- For Next.js / SSR apps, apply the client-boundary guidance from `FOUNDATION.md`.
