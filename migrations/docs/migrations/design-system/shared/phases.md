# Shared Migration Phases

Use this document as the canonical step-by-step execution checklist for future
consumer app migrations to `@atomazing-org/design-system`.

Read this after route selection and before editing the target app.
Then combine it with:

- the selected route runbook
- the selected route `migration.spec.json`
- `shared/common-regressions.md`
- `shared/phase-exit-criteria.md`
- `shared/manual-qa-matrix.md`
- `shared/gates.md`
- `shared/acceptance.md`

## How To Use This Playbook

1. Detect the route first:
   - `greenfield`
   - `adopt-existing`
   - `mui4-to-latest`
2. Build the migration plan from the phases below.
3. Keep the app runnable at the end of each phase.
4. Run the relevant checks before moving to the next phase.
5. Do not merge unrelated change classes into one unvalidated batch.

## Phase Map

1. Route selection and scope
2. Baseline and safety net
3. Dependency landing
4. Mechanical migration or provider landing
5. Runtime startup cleanup
6. Shared infrastructure stabilization
7. Token, typography, and primitive cleanup
8. Domain migration waves
9. Final gates and closeout

## Phase 1: Route Selection And Scope

Goal:
Select the correct route and define the migration boundary before code changes.

Do:

- inspect `package.json`, imports, theme entrypoints, and current design-system usage
- choose the route:
  - `mui4-to-latest` if `@material-ui/*` is present
  - `greenfield` if the app is new and has no legacy theme or token layer
  - `adopt-existing` otherwise
- identify:
  - app root and provider wiring
  - theme state source of truth
  - shared shell and layout containers
  - shared overlays
  - protected routes
  - token modules and hardcoded visual drift
  - repo-local gates such as style, design, or typography contract scripts

Output:

- selected route and why
- initial migration scope
- list of required validation commands

Stop gate:

- the route is explicit
- the app areas at highest regression risk are named

Route notes:

- `greenfield`: scope is usually limited to provider wiring, app theme module, and startup safety
- `adopt-existing`: include provider, tokens, shared shell, shared overlays, and consumer primitives
- `mui4-to-latest`: also inventory legacy styling APIs, MUI v4 imports, and codemod impact zones

## Phase 2: Baseline And Safety Net

Goal:
Capture the repo state before migration and make regressions visible early.

Do:

- run the repo's normal commands:
  - `npm run lint` when present
  - `npm test` when present
  - `npm run build`
- run repo-local contract gates when present:
  - `npm run lint:style-contract`
  - `npm run lint:design-contract`
  - `npm run lint:typography-contract`
- record pre-existing red checks separately from migration defects
- add or tighten smoke coverage before broad rewrites when the app has:
  - a shared shell
  - protected routes
  - shared overlays
  - dashboards, analytics, or dense workflow screens

Output:

- baseline check matrix
- known pre-existing failures
- smoke coverage plan

Stop gate:

- you can tell whether a later failure is new or pre-existing
- shell-critical or overlay-critical changes are covered by at least one route check

Route notes:

- `greenfield`: a simple startup check may be enough
- `adopt-existing`: shell and at least one real content route should be covered
- `mui4-to-latest`: add smoke coverage before codemod fallout reaches shared UI

## Phase 3: Dependency Landing

Goal:
Land the dependency set needed for the target route without mixing in broad UI cleanup.

Do:

- update `package.json` directly
- add or align:
  - `@atomazing-org/design-system`
  - `@mui/material`
  - `@mui/icons-material` when needed
  - `@emotion/react`
  - `@emotion/styled`
- remove route-incompatible packages such as `@material-ui/*`
- install dependencies with the repo's package manager
- if install scripts fail because of local tooling, retry with the package manager's `--ignore-scripts` equivalent only as recovery

Output:

- dependency set aligned with the chosen route
- install completed

Stop gate:

- the repo installs successfully
- dependency conflicts do not block the next phase

Route notes:

- `greenfield`: this is usually the main dependency phase
- `adopt-existing`: keep adjacent runtime alignment small and controlled
- `mui4-to-latest`: remove legacy Material-UI packages before broad theme unification

## Phase 4: Mechanical Migration Or Provider Landing

Goal:
Reach the route-specific structural landing point before visual cleanup.

Do:

- `greenfield`:
  - connect `ThemeProviderWrapper` at the app root
  - create one explicit app theme module for preset choice when needed
  - add theme controls only through `useThemeSettings()`
- `adopt-existing`:
  - connect or normalize `ThemeProviderWrapper`
  - remove competing root theme providers
  - replace outdated design-system imports with public APIs or local app abstractions
  - move preset selection into one app-owned theme module
- `mui4-to-latest`:
  - run the official MUI codemod
  - resolve compile breaks from the codemod
  - replace JSS-only APIs and legacy theme APIs
  - get the app stable on modern MUI plus Emotion before provider unification

Output:

- route-specific mechanical landing completed

Stop gate:

- the app compiles after the structural change
- there is one clear theme-root direction

## Phase 5: Runtime Startup Cleanup

Goal:
Prove the app actually boots in a browser and remove startup defects before deeper cleanup.

Do:

- start the app with the normal dev or start command
- open the first route in a real browser
- fix:
  - browser console startup errors
  - migration-caused startup warnings
  - duplicate runtime singleton loading for `react`, `react-dom`, `@emotion/react`, `@emotion/styled`
- remove module-scope code that depends on:
  - `window`
  - `document`
  - `navigator`
  - storage
  - i18n locale activation
- move browser listeners into effects with cleanup
- if smoke mode bypasses auth, seed a deterministic role-bearing user for protected routes

Output:

- startup-clean browser boot

Stop gate:

- first route loads successfully
- migration-caused startup errors are gone

## Phase 6: Shared Infrastructure Stabilization

Goal:
Stabilize the app shell and shared UI contracts before domain-by-domain feature work.

Do:

- preserve shell layout behavior:
  - display mode
  - grid or flex template
  - `min-width`
  - `min-height`
  - `overflow`
  - scroll behavior
- keep route roots and page containers filling the intended workspace
- if shared padded containers also fill width, normalize with `box-sizing: border-box` or remove forced width
- restore overlay semantics:
  - stable `aria-labelledby`
  - stable `aria-describedby`
  - labeled close actions
  - `combobox` and `listbox` semantics for searchable overlays
- audit shared charts, legends, chips, metric badges, and segmented filters for preset drift
- remove placeholder regressions and low-fidelity pass-through wrappers
- if analytics dashboards or metric cards are touched:
  - keep labels and values on different hierarchy levels
  - keep one explicit grid gap contract
  - remove accidental full-width spans that break desktop rows

Output:

- stable shared shell
- stable shared overlays
- stable shared dashboard or compact-control contracts

Stop gate:

- desktop and mobile shell behavior matches the intended layout
- shared UI is usable and semantically wired

## Phase 7: Token, Typography, And Primitive Cleanup

Goal:
Move the consumer toward the design-system contract instead of preserving legacy local drift.

Do:

- replace legacy tokens with `theme.palette`, `theme.typography`, and helpers such as `alpha()`
- normalize visible text:
  - `Typography`
  - explicit semantic `variant`
  - `Typography component="span"` for visible text inside interactive controls
- remove zero-value wrappers:
  - primitive wrappers
  - surface wrappers
- simplify decorative consumer chrome that fights the preset:
  - gradients
  - direct shadow styling
  - palette alpha suffix hacks
- if the repo needs guardrails, add or tighten:
  - design-contract lint
  - typography-contract lint
- if localized copy was touched, scan for mojibake or replacement characters and verify a real localized route

Output:

- token and text layer aligned with the design-system contract

Stop gate:

- typography and design drift are reduced, not just moved around
- the repo has enough local gates to keep the fix from regressing

## Phase 8: Domain Migration Waves

Goal:
Migrate feature areas in controlled batches after shared infrastructure is stable.

Do:

- move feature areas one wave at a time
- keep each wave small enough to validate independently
- after each wave, re-run the relevant checks:
  - smoke
  - lint
  - route checks
  - build when the wave changes bundling or shared runtime behavior
- stop if a wave reintroduces shell, overlay, typography, or token regressions

Output:

- migrated domains with isolated validation history

Stop gate:

- each wave ends in a runnable, validated state

## Phase 9: Final Gates And Closeout

Goal:
Close the migration only after runtime, route, and contract checks are all green.

Do:

- re-run:
  - `npm run lint`
  - `npm test`
  - `npm run build`
  - `npm run test:smoke` when present
  - repo-local contract gates when present
- verify route-specific exit conditions:
  - no `@material-ui/*` left for `mui4-to-latest`
  - provider wiring and preset ownership are correct
  - no migration-caused startup warnings remain
- record any remaining upstream-only warnings precisely by package and file
- write the migration summary:
  - route used
  - commands run
  - startup issues fixed
  - remaining manual QA
  - rollback guidance if partial

Output:

- migration report suitable for future reuse

Stop gate:

- shared acceptance is satisfied
- the app is browser-runnable, not only build-green

## Recommended Phase Splits By Route

`greenfield`:

1. Route selection and baseline
2. Dependency landing
3. Provider landing
4. Runtime startup cleanup
5. Final gates

`adopt-existing`:

1. Route selection and baseline
2. Safety net
3. Dependency landing
4. Provider and theme unification
5. Runtime cleanup
6. Shared infrastructure stabilization
7. Token and typography cleanup
8. Domain waves
9. Final gates

`mui4-to-latest`:

1. Route selection and baseline
2. Safety net
3. Dependency landing
4. Mechanical MUI migration
5. Legacy styling cleanup
6. Provider and theme unification
7. Runtime cleanup
8. Shared infrastructure stabilization
9. Token and typography cleanup
10. Domain waves
11. Final gates
