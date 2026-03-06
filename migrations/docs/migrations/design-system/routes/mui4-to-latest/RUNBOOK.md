# Route: mui4-to-latest

Use this route when the target app still depends on Material-UI v4 and must land
on the `@atomazing-org/design-system` v2 contract with a MUI v7 baseline.

## Use This Route When

- `package.json` still contains `@material-ui/*`
- the app still uses legacy styling APIs such as `makeStyles`, `withStyles`, or `createMuiTheme`
- a piecemeal integration would otherwise leave the repo in a mixed MUI v4 and MUI v7 state

## Target Outcome

- the project runs on `@mui/material` v7 plus Emotion
- `ThemeProviderWrapper` is the only app-level theme root
- legacy MUI v4 imports and styling APIs are removed
- major UI surfaces and typography rely on modern MUI theme contracts instead of legacy local tokens
- the app boots cleanly after migration, not just after a codemod

Use `../../shared/phases.md` as the canonical step-by-step phase checklist, then
apply the route-specific requirements below.

## Large-Project Execution Model

- keep the app runnable at the end of every phase
- keep one main change class per phase:
  - dependency landing
  - mechanical codemod
  - legacy styling cleanup
  - root theme unification
  - runtime cleanup
  - shared infrastructure
  - domain waves
  - final token cleanup
- do not mix shell rewrites, broad token cleanup, and dependency upgrades in one unvalidated batch
- checkpoint each phase with a commit or equivalent rollback point before continuing

## Required Workflow (Phases)

1. Inventory and segmentation
   - map `@material-ui/*` dependencies and imports
   - map `makeStyles`, `withStyles`, `createStyles`, `StylesProvider`, `ServerStyleSheets`, and `createMuiTheme`
   - map local token modules, app shell entrypoints, shared overlays, auth-guarded routes, and build-system risks
   - split the migration into shared-infrastructure scope plus domain waves
2. Baseline and safety net
   - run the repo's normal validation commands
   - record pre-existing red checks separately from migration defects
   - add or tighten smoke coverage for:
     - the application shell
     - at least one protected content route when route guards exist
     - at least one stable overlay interaction when dialogs, drawers, or command surfaces are in scope
3. Dependency landing zone
   - remove `@material-ui/*`
   - add `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`, and `@atomazing-org/design-system`
   - separately align adjacent packages such as pickers, data-grid, lab, or other MUI ecosystem packages
4. Mechanical v4 to v5 migration
   - run the official MUI codemod
   - resolve compile failures and TODO markers left by the codemod
   - keep the output as a mechanical landing step, not a full visual cleanup
5. Legacy styling and theme API cleanup
   - replace `makeStyles`, `withStyles`, `createStyles`, and other JSS-specific patterns
   - replace `createMuiTheme`, legacy `overrides` or `props`, and deprecated spacing or theme API usage
   - remove legacy styling providers that no longer belong in the runtime
6. Stabilize on modern MUI before design-system adoption
   - get the app compiling and booting on modern MUI plus Emotion before changing the theme source of truth
   - resolve duplicate React or Emotion runtime loading
   - preserve the structural shell layout while removing legacy APIs
7. Root theme unification
   - connect `ThemeProviderWrapper` at the app root
   - remove competing root `ThemeProvider` instances unless they are thin wrappers around the design system
   - move preset selection into one explicit app-level theme module such as `src/theme/appThemes.ts`
8. Runtime boot cleanup
   - start the app with the repo's normal dev or start command
   - open the first route in a real browser
   - fix startup console errors before continuing
   - fix migration-caused startup warnings before continuing
   - remove module-scope code that depends on browser APIs, storage, or i18n locale activation
   - move browser listeners such as `beforeinstallprompt`, `matchMedia`, or resize subscriptions into effects with cleanup
   - if smoke mode disables auth redirects, seed a deterministic role-bearing user so protected routes can render real content
9. Shared infrastructure migration
   - stabilize the app shell, route wrappers, and shared layout containers first
   - migrate shared primitives that should now use MUI directly or thin MUI wrappers
   - restore shared dialogs, drawers, bottom sheets, and search overlays with stable semantics and layout contracts
   - explicitly preserve `display`, grid or flex templates, `min-width`, `min-height`, `overflow`, and scroll behavior when refactoring shell containers
   - if shell workspaces, route wrappers, or page roots were touched, verify the main content still fills the available content region instead of collapsing into partial-width cards or broken dashboard stacks
   - audit compact shared UI such as chart legends, chips, segmented filters, and metric badges for preset drift; if they now read as ad hoc chip chrome, rebuild them with neutral MUI composition
10. Token and consumer cleanup
   - apply token remaps in controlled batches instead of one repo-wide blind replace
   - replace hardcoded tokens with `theme.palette`, `theme.typography`, and MUI theme helpers
   - remove zero-value wrappers and zero-value surface wrappers
   - normalize visible text to `Typography` with explicit variants
   - replace palette alpha suffix hacks with `alpha()`
   - remove app-owned gradient or shadow chrome from normal consumer surfaces
   - if codemods, token remaps, or file rewrites touched localized copy, keep files in UTF-8, scan for mojibake or replacement characters, and verify at least one real localized route renders readable text
11. Domain waves
   - migrate feature areas in waves after shared infrastructure is stable
   - keep each wave small enough to validate independently
   - run smoke and visual checks after each wave before moving to the next domain
12. Final quality gates and closeout
   - re-run lint, tests, build, and route-specific gates
   - verify no `@material-ui/*` dependencies remain
   - verify no `@material-ui/*` imports remain in source
   - verify the app root uses `ThemeProviderWrapper`
   - verify the first route boots without browser console startup errors or migration-caused runtime warnings

## Common Failure Modes

- treating the codemod result as a finished migration instead of a mechanical landing step
- removing `@material-ui/*` but leaving JSS runtime or theme APIs in place
- adopting the design system before the app is stable on modern MUI plus Emotion
- mixing dependency upgrades, shell rewrites, and token cleanup into one giant diff that cannot be debugged safely
- module-scope `window`, `document`, `navigator`, or storage access that breaks startup once providers move
- module-scope i18n work that runs before locale activation
- duplicate React or Emotion runtimes after moving to modern MUI
- protected-route smoke checks that only render fallback pages instead of real product screens
- shared shell or overlay rewrites that accidentally drop layout constraints, semantics, or spacing
- route roots or page containers lose fill behavior, so the workspace shows partial-width cards, collapsed analytics grids, or unused content area
- compact legends, analytics chips, metric badges, or segmented filters drift into consumer-owned chip chrome that visibly fights the preset
- codemods or encoding fixes leave mojibake, replacement characters, or broken non-Latin text in screens, fixtures, or mock data
- repo-wide token replacements applied before shared infrastructure is stabilized

## Practical Fix Patterns

- land on modern MUI plus Emotion first, then adopt `ThemeProviderWrapper`
- keep a dedicated app theme module for preset selection
- treat shell wrappers and overlay wrappers as behavior, not decoration
- if a shell exposes a workspace pane, keep route roots and page containers on explicit flex growth with preserved `min-width`, `min-height`, and width constraints so the page actually fills the workspace
- add smoke coverage before broad shared-component rewrites
- migrate shared infrastructure before feature-specific pages
- batch token replacement by shared area or domain instead of by global search alone
- if compact legends, chips, or segmented filters drift away from the preset, rebuild them from `Stack`, markers, and `Typography` instead of preserving ad hoc chip styling
- after bulk replacements or encoding-sensitive edits, run a mojibake scan and verify one localized route in a real browser before closing the migration
- expand repo-local design and typography gates once the broad cleanup begins

## Shared Gates

Use common gate definitions from:

- `../../shared/gates.md`
- `../../shared/acceptance.md`
