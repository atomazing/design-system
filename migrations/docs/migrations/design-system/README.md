# design-system v2 migration routes (MUI v7 target)

This folder contains the migration router, runbooks, and route specs used to adopt
`@atomazing-org/design-system` v2.

Target baseline:
- design-system v2 contract
- MUI v7
- React 18 or 19

Repo route model (canonical):
- `mui4-to-latest` (backlog alias: `mui4-to-v7`)
- `greenfield`
- `adopt-existing` (covers backlog `mui5-6-to-v7` unless a dedicated split route is added later)

## Route selection (decision tree)

1. If `package.json` contains `@material-ui/*` dependencies:
   - use `routes/mui4-to-latest/`
2. Else if the app is new or no existing theme-token migration is needed:
   - use `routes/greenfield/`
3. Else:
   - use `routes/adopt-existing/`

## Agent workflow (scriptless default)

Use the AI skill or instructions as the primary execution method:

- `migrations/skills/design-system-consumer-agent/SKILL.md`
- `migrations/skills/design-system-migration-agent/SKILL.md`

Default flow:

1. Read `shared/WORKING-RULES.md`.
2. Read `shared/phases.md`.
3. Detect route manually (inspect `package.json`, imports, and current theme setup).
4. Read the selected route spec plus runbook:
   - `routes/<routeId>/migration.spec.json`
   - `routes/<routeId>/RUNBOOK.md`
5. Build a phased plan before editing the target repo.
6. Execute the route phase by phase instead of batching unrelated changes together.
7. Run quality gates and checks after each meaningful phase, including a real app boot check before closeout.

## Phase Discipline For Large Projects

For large repos, route execution must stay phase-gated:

- keep the app runnable at the end of every phase
- keep one main change class per phase:
  - dependency landing
  - mechanical migration
  - root theme unification
  - runtime cleanup
  - shared infrastructure
  - domain waves
  - final token and closeout cleanup
- do not combine dependency upgrades, shell rewrites, and broad token cleanup into one unvalidated batch
- add or tighten a smoke safety net before broad shell, overlay, or shared-component rewrites
- stabilize shared infrastructure before domain-by-domain feature waves
- checkpoint each phase with a commit or equivalent rollback point before continuing

Recommended manual gate equivalents:
- search for `@material-ui/*` in source and `package.json`
- search for legacy token imports or identifiers defined for the route or project
- start the app with the repo's normal dev or start command
- open the first route in a real browser and confirm there are no browser console startup errors
- fix migration-caused startup warnings before closeout, especially duplicate runtime singleton warnings (`react`, `react-dom`, `@emotion/react`, `@emotion/styled`)
- if route guards exist, verify at least one protected route as a real screen rather than a fallback page
- if overlays are in scope, verify at least one stable overlay interaction through smoke or manual QA
- if shell workspaces or page-root containers were touched, verify the main content fully occupies the workspace and dashboard or form grids do not collapse into partial-width stacks
- if shared charts, legends, chips, segmented filters, or metric badges were touched, verify compact controls still align with the active preset instead of drifting into ad hoc chip-like chrome
- if bulk replacements or non-Latin copy were touched, scan for mojibake or replacement characters and verify readable localized text on at least one real route

If normal integration would leave dual theme systems or a large unresolved token layer,
do not treat the task as a small refactor. Select a migration route instead.

## Route index

- `mui4-to-latest`: `./routes/mui4-to-latest/RUNBOOK.md`
- `greenfield`: `./routes/greenfield/RUNBOOK.md`
- `adopt-existing`: `./routes/adopt-existing/RUNBOOK.md`
- `adopt-existing` example: `./routes/adopt-existing/AEROCRM-EXAMPLE.md`

## Shared gates

Common migration gates are documented in:

- `./shared/phases.md`
- `./shared/phase-exit-criteria.md`
- `./shared/common-regressions.md`
- `./shared/manual-qa-matrix.md`
- `./shared/gates.md`
- `./shared/acceptance.md`

Routes should reference the shared gate docs instead of duplicating the full gate list.

## Notes

- Route phases in this repo backlog may be completed in `docs/spec-first` mode before real app dry-runs.
- A dedicated `mui5-6-to-v7` route split is a post-v2 option, not a blocker for the current repo route model.
