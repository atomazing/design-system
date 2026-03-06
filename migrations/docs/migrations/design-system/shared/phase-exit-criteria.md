# Phase Exit Criteria

Use this document with `shared/phases.md`.

Do not move to the next migration phase until the current phase satisfies its
exit criteria.

## Phase 1: Route Selection And Scope

Exit when:

- the route is explicit
- the app root, theme source, shell, overlays, and protected routes are identified
- required validation commands are listed

Do not proceed if:

- route choice is still ambiguous
- the migration boundary is undefined

## Phase 2: Baseline And Safety Net

Exit when:

- baseline lint, test, and build state is recorded
- pre-existing failures are separated from migration failures
- shell or route smoke coverage exists when broad shared rewrites are planned

Do not proceed if:

- you cannot distinguish old failures from new ones
- broad shell or overlay changes would be untested

## Phase 3: Dependency Landing

Exit when:

- dependency changes install successfully
- route-incompatible packages are removed or isolated
- dependency conflicts are not blocking compile or startup work

Do not proceed if:

- install is still broken
- dependency state is half-migrated and unstable

## Phase 4: Mechanical Migration Or Provider Landing

Exit when:

- the route-specific mechanical landing is complete
- the app compiles after the structural change
- the theme-root direction is clear and not duplicated

Do not proceed if:

- competing root providers still exist
- codemod or provider landing left the app uncompilable

## Phase 5: Runtime Startup Cleanup

Exit when:

- the first route opens in a real browser
- startup console errors are fixed
- migration-caused startup warnings are fixed
- protected routes can render real content when they are in scope

Do not proceed if:

- the app is only build-green but not browser-runnable
- duplicate runtime warnings still remain unresolved

## Phase 6: Shared Infrastructure Stabilization

Exit when:

- desktop and mobile shell layout behaves as intended
- page roots still fill the workspace
- shared padded containers do not overflow horizontally
- overlays keep stable semantics
- shared dashboards or compact controls do not show preset drift

Do not proceed if:

- the shell still has layout regressions
- shared dashboards, overlays, or route roots are visually or semantically broken

## Phase 7: Token, Typography, And Primitive Cleanup

Exit when:

- visible text uses `Typography` with explicit variants
- zero-value primitive and surface wrappers are removed or collapsed
- token drift is reduced through `theme.*` usage and helpers
- localized copy remains readable if touched

Do not proceed if:

- raw text nodes, variantless typography, or visual-token drift are still spreading
- decorative consumer chrome is still replacing preset-owned surface behavior

## Phase 8: Domain Migration Waves

Exit when:

- the current feature wave is validated independently
- route-specific smoke or lint checks are green again
- the app remains runnable before the next feature wave starts

Do not proceed if:

- the current wave reintroduced shared regressions
- multiple unfinished feature waves are open at once

## Phase 9: Final Gates And Closeout

Exit when:

- shared gates and route-specific exit conditions are satisfied
- lint, build, tests, and smoke gates are green when available
- remaining warnings are either fixed or recorded as upstream-only by exact package
- manual QA follow-up is documented

Do not close the migration if:

- runtime startup still depends on manual excuses
- unresolved warnings are consumer-owned
- the app is not verified on a real route in a browser
