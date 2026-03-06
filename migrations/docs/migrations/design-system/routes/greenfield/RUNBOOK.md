# Route: greenfield

Use this route when the target app is new and does not need a legacy theme or
token migration before adopting `@atomazing-org/design-system`.

## Use This Route When

- the project is new or lightly scaffolded
- there is no inherited token layer to normalize
- there is no legacy MUI v4 migration path to perform first

## Target Outcome

- `ThemeProviderWrapper` is connected at the app root
- preset choice lives in one explicit app-level theme module when the app exposes multiple presets
- theme switching, if added, uses `useThemeSettings()`
- the app boots cleanly with the new provider wiring

Use `../../shared/phases.md` as the canonical step-by-step phase checklist, then
apply the route-specific requirements below.

## Required Workflow (Phases)

1. Baseline the repo
   - confirm the repo installs and the normal validation commands can run
   - record any pre-existing setup failures separately from integration defects
2. Add dependencies
   - add `@atomazing-org/design-system`
   - add `@mui/material`, `@mui/icons-material`, `@emotion/react`, and `@emotion/styled` when the scaffold does not already include them
3. Connect the root provider
   - wrap the app root with `ThemeProviderWrapper`
   - do not add a competing root `ThemeProvider`
   - if the app will expose multiple presets, keep selection in one explicit app-level theme module
4. Add optional theme controls
   - if the app needs theme switching or dark-mode controls, wire them through `useThemeSettings()`
   - keep UI labels and visible text aligned with the typography contract from the start
5. Runtime-safe integration
   - if the app uses SSR or Next.js, keep provider wiring inside a client boundary
   - keep browser-only APIs out of module scope
   - start the app and verify the first route boots cleanly in a real browser
   - if the app shell exposes a dedicated workspace or content pane, verify the first route root actually fills that region instead of shrinking to intrinsic content width
   - if the app ships non-Latin copy or seeds localized mocks, keep files in UTF-8 and verify the first route does not render mojibake or replacement characters
6. Run quality gates
   - run the repo's validation commands
   - verify build, tests, and runtime startup are clean before closeout

## Common Failure Modes

- adding `ThemeProviderWrapper` while leaving a second competing root theme provider in place
- keeping preset choice scattered across constants passthrough files instead of one app theme module
- adding browser-only logic at module scope during initial provider setup
- first-route page roots or layout containers not stretching to fill the intended workspace
- localized starter copy or mock data landing in the repo with mojibake because file encoding was not validated
- declaring greenfield success on build output alone without an actual browser startup check

## Shared Gates

Use common gate definitions from:

- `../../shared/gates.md`
- `../../shared/acceptance.md`
