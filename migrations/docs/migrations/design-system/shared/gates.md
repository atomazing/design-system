# Shared migration gates (design-system v2)

Use this gate list as the common baseline for all routes under
`migrations/docs/migrations/design-system/routes/*`.

## Required commands

Run in the target app repository (adjust package manager as needed):

```bash
npm run lint
npm test
npm run build
```

If the target repo exposes repo-local contract gates such as
`npm run lint:style-contract`, `npm run lint:design-contract`, or
`npm run lint:typography-contract`, run them as part of the migration.

If the target repo exposes smoke or e2e coverage for shell, protected routes,
or overlays such as `npm run test:smoke`, run that as part of the migration too.

Also run the repo's normal dev or start command and open the app in a real browser.

## Phase gates for large projects

For large migrations, do not wait until the end of the route to validate.

- Re-run the relevant checks after each meaningful phase.
- Keep the app runnable at the end of every phase before moving to the next one.
- At minimum, re-run the repo's typecheck or lint-equivalent after broad mechanical edits and re-run build after dependency or bundler changes.
- Before broad shell, overlay, or shared-component rewrites, make sure smoke coverage exists for:
  - the application shell
  - at least one protected content route when route guards exist
  - at least one stable overlay interaction when overlays are in scope
  - at least one content-dense route such as a dashboard, analytics page, or workflow screen when shared charts, filters, or page-level layout containers are in scope
- Do not continue to the next phase when the current phase introduced startup console errors or route-blocking runtime warnings.

## Required checks

- `ThemeProviderWrapper` is wired at the app root (or an approved thin wrapper around it).
- No route-blocking dependency conflicts remain after dependency updates.
- The app reaches the v2 target state (MUI v7 plus design-system v2 contract).
- The app boots on the first route after migration.
- Browser console startup errors are fixed before closeout.
- Startup warnings introduced or exposed by the migration are fixed before closeout when they indicate broken runtime alignment.
- If the repo provides smoke or e2e checks for shell, protected routes, overlays, or other runtime-critical flows touched by the migration, those checks pass before closeout.
- If the repo provides a local style-contract or styleless-UI gate, keep that gate green during the migration.
- If the app reports duplicated runtime singleton warnings (`react`, `react-dom`, `@emotion/react`, `@emotion/styled`), fix bundler or runtime alignment with dedupe, aliasing, or the repo's equivalent singleton-sharing mechanism.
- The migration does not introduce local barrel-based chunk cycle warnings when direct app-local imports resolve them.
- Consumer-owned build warnings from stale asset globs or oversized local chunks are fixed before closeout.
- If shell workspaces or page-root containers were touched, verify the main content still fills the content region and that page grids did not collapse into partial-width stacks.
- If shell workspaces, shared cards, or page-root containers were touched, verify shared padded containers do not overflow horizontally because of `width: 100%` plus content-box sizing.
- If shared charts, legends, chips, segmented filters, or compact badges were touched, verify compact controls remain preset-aligned instead of drifting into ad hoc chip-like chrome.
- If analytics dashboards, metric cards, or dashboard grids were touched, verify labels and values still read as different hierarchy levels and desktop cards do not accidentally fall into full-width or broken-row spans.
- If bulk replacements or localized non-Latin copy were touched, scan for mojibake or replacement characters and verify readable text on at least one real route.

## Route-specific checks

- `mui4-to-latest`:
  - no `@material-ui/*` dependencies remain
  - no `@material-ui/*` imports remain in app source
- `adopt-existing` or `mui5-6-to-v7` coverage:
  - no forbidden hardcoded token imports remain (per route config)
- `greenfield`:
  - provider wiring compiles and basic theme switching works (if UI switcher is added)

## Notes

- Token hardcode detection is noisy by nature; keep route configs (`token-gate.config.json`) app-specific.
- Real app dry-runs can be deferred in this repo backlog flow (`docs/spec-first`) and executed later in app repos or optional closeout.
