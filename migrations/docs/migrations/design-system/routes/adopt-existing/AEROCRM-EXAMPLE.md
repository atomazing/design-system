# AeroCRM Frontend Example For `adopt-existing`

This example captures a full migration of
`C:\Users\Lenovo\Desktop\DEV_PRESALE\aerocrm\frontend` to
`@atomazing-org/design-system@2.0.1`.

## Why `adopt-existing`

The app already had:

- React 19
- MUI 7
- `@atomazing-org/design-system`
- an app-level wrapper around `ThemeProviderWrapper`

This was not a greenfield integration and not a Material UI v4 migration.

## Real Problems Found

1. A consumer component still imported `useResponsiveDisplay` from the old design-system root API.
2. The app crashed on startup because a Lingui translation was evaluated at module scope before locale activation.
3. After the crash was fixed, the app still warned that `@emotion/react` was loaded more than once in dev.
4. A shell refactor temporarily broke the desktop layout, so the original `sidebar + content` grid was lost.
5. The app had no automated shell smoke-check, so the layout regression was caught manually at first.
6. Several shared UI components were flattened into pass-through wrappers or empty placeholders, which degraded charts, drawers, segmented controls, cards, and toolbars across multiple screens.
7. Smoke mode disabled auth redirect, but without a seeded user it only exercised route fallbacks like `NotFound` instead of the protected pages that actually matter.
8. Some consumer-owned atoms still reimplemented stock MUI primitives with generic wrappers such as `Box`, raw `label`, or `div`, which made the shared layer inconsistent and easy to regress.
9. Text rendering was inconsistent across shared and page UI: raw text remained inside buttons, chips, alerts, and wrappers, and some `Typography` nodes had no explicit variant.
10. Preset selection lived behind a generic constants passthrough layer instead of one explicit app-owned theme module.
11. Role-based ticket workflows duplicated the same two-column form shell across `NewTicket`, `Responsible`, and `Approver`.
12. Local barrel re-exports produced chunk-cycle build warnings until workflow-local modules were imported directly.
13. Workbox still looked for `favicon.svg` even though the app emitted `logo192.png`, `logo256.png`, `logo384.png`, and `logo512.png`.
14. Build output contained oversized consumer-owned chunks until vendor splitting was configured explicitly.
15. Shared overlays had semantic drift: dialog and drawer wrappers no longer exposed stable label or description wiring, command palette search behaved like generic markup instead of combobox or listbox UI, and decorative bottom-sheet chrome remained visible to assistive technology.
16. `PwaInitializer` attached browser listeners from the render path, which risked duplicate `beforeinstallprompt` and display-mode handlers after rerenders.
17. The app still kept a zero-value `SurfaceCard` wrapper that only forwarded to MUI `Card`, which blurred ownership between app primitives and stock MUI surfaces.
18. Shared consumer styling still contained design-contract drift:
   - the PWA install banner injected its own gradient chrome
   - sidebar selection used palette-string alpha suffix hacks instead of theme helpers
   - the repo-local design-contract lint did not yet protect against those patterns
19. A later QA pass found compact analytics legend chips that no longer matched the active preset and read like ad hoc consumer chrome instead of neutral shared UI.
20. Some page roots stopped filling the workspace, so tickets and analytics could collapse into partial-width content with broken grids and unused work area.
21. A later text-integrity pass found mojibake and replacement characters in Cyrillic copy across screens, fixtures, and mock data.
22. A later shell-sizing pass found the shared workspace overflowing on the right edge across routes because some shared containers mixed `width: 100%` with internal padding under content-box sizing.
23. A later analytics QA pass found metric labels, values, and helper text collapsing into the same visual level, while the reasons card still carried an accidental full-width span and inconsistent gaps.

## Applied Fixes

1. Upgrade `@atomazing-org/design-system` from `1.2.9` to `2.0.1`.
2. Replace the outdated root import in `ResponsiveModal` with the app's local `@hooks` export.
3. Remove module-scope translation from the toast layer:
   - do not call translation helpers at module scope before `i18n.loadAndActivate()`
   - move the translated label into component render with `Trans`
4. Deduplicate singleton runtimes in Vite:
   - add `resolve.dedupe` for `react`, `react-dom`, `@emotion/react`, and `@emotion/styled`
5. Restore the app shell layout in `Harness.tsx`:
   - keep an explicit desktop grid for `sidebar + content`
   - preserve content scrolling and sizing with `minHeight`, `minWidth`, and `overflow`
6. Add an automated smoke-check:
   - run the app in mock mode
   - disable silent auth redirect only for smoke mode
   - seed a deterministic demo user with required roles in smoke mode
   - assert desktop and mobile shell layout with Playwright
   - assert role-protected pages render real content, not only shell plus fallback
7. Restore shared UI contracts when they were simplified into placeholders:
   - rebuild shared cards, overlays, radio groups, charts, and nav actions with explicit spacing, sizing, and interaction states
   - do not accept placeholder structures like empty `Box` tracks or pass-through wrappers as "good enough" migration output
8. Replace substitute shared primitives with MUI-based equivalents when no real custom behavior exists:
   - move atoms like `IconButton`, `FormLabel`, `FormError`, and `Skeleton` onto direct MUI primitives or thin wrappers
   - move picker clear affordances into MUI `InputAdornment` instead of keeping floating ad hoc controls
9. Normalize the text layer:
   - render visible text through `Typography` with explicit variants
   - wrap button, chip, alert, menu-item, and toggle labels in `Typography component="span"`
   - add a small typography contract lint so future refactors cannot silently reintroduce raw text nodes
10. Make preset policy explicit:
   - replace generic constants passthrough exports with one theme-owned `appThemes` module
   - keep the consumer's allowed preset pack visible near `AppThemeProvider`
11. Add a design-contract guard:
   - fail the migration on hardcoded colors, raw numeric type scale, and ad hoc radius or opacity values when those patterns are widespread
12. Collapse repeated workflow page shells into one layout contract:
   - extract a shared `TicketFormLayout` for the common two-column form shell
   - keep page-specific behavior in headers and sections
   - import workflow-local modules directly when barrel exports create chunk-cycle warnings
13. Align PWA asset config with real app assets:
   - replace the stale `favicon.svg` Workbox glob with the actual emitted logo files
14. Split oversized local bundles intentionally:
   - add targeted `manualChunks` groups for React, MUI, Emotion, forms, auth, i18n, design-system, and module-federation vendor code
   - remove chunk warnings by changing bundling strategy, not by inflating the warning threshold
15. Refresh the local browser-target database:
   - update `caniuse-lite` / Browserslist data so the build reflects the current target matrix
16. Restore overlay semantics and overlay-smoke coverage:
   - wire `ResponsiveModal`, shared dialog titles, and notification drawer through stable `aria-labelledby` and `aria-describedby` ids
   - add explicit accessible labels to shared close actions
   - hide decorative bottom-sheet handles from assistive technology
   - update smoke checks through stable overlay entrypoints such as notifications and command palette
17. Normalize command palette search semantics:
   - make the search field a real combobox
   - make the result list a real listbox with active option tracking and keyboard-help text
18. Move browser-only PWA listeners into effects with cleanup:
   - attach `beforeinstallprompt` and display-mode listeners from `useEffect`
   - remove duplicate subscriptions on rerender
19. Remove zero-value surface wrappers:
   - delete `SurfaceCard`
   - use direct MUI `Card` composition in analytics, profile, tickets, and metric surfaces
20. Harden the consumer visual-token contract:
   - simplify the PWA install banner to a standard MUI surface instead of a local gradient panel
   - replace palette alpha suffix hacks with `alpha()`
   - expand `lint:design-contract` to fail on decorative gradients, direct shadow styling, theme shadow-token drift, and palette suffix hacks
   - keep the theme swatch as the only documented exception because it intentionally previews preset colors
21. Rework preset-drifted analytics legends:
   - replace custom chip-like legend chrome with neutral marker plus `Typography` composition
   - keep compact analytic labels visually aligned with the preset instead of recreating local chip styling
22. Restore workspace fill behavior:
   - preserve flex growth and min-size constraints in the shell content area
   - make ticket and analytics page roots fill the available content pane instead of shrinking to content width
23. Normalize Cyrillic text integrity:
   - repair mojibake and replacement-character corruption in touched UI files and mocks
   - keep rewritten files in UTF-8
   - recheck smoke-visible strings after bulk fixes
24. Harden shared box sizing for shell-critical containers:
   - remove shell sizing that makes the main content column wider than the visible desktop workspace
   - apply `box-sizing: border-box` to shared padded containers such as app-owned cards and page roots when they are also expected to fill available width
   - add smoke assertions that fail on horizontal overflow in the shared content pane and routed page roots
25. Restore analytics dashboard hierarchy and grid discipline:
   - separate metric labels, values, and helper text into different text scales instead of relying on one blended default
   - emphasize numeric values in breakdown lists and timeline rows so they do not read like surrounding labels
   - remove the accidental full-width analytics-card span and keep one consistent desktop gap contract across the dashboard grid
   - add smoke assertions that fail if metric value emphasis disappears or if the desktop analytics cards stop sharing the intended row

## Resulting Validation

- `npm run lint` passed
- `npm run lint:style-contract` passed
- `npm run lint:design-contract` passed
- `npm run lint:typography-contract` passed
- `npm run lint:ts` passed
- `npm run build` passed
- `npm run test:smoke` passed
- the app started successfully in the browser
- first page load completed with `0` browser console errors
- first page load completed with `0` browser console warnings
- desktop layout again renders with the menu on the left and page content on the right
- ticket and analytics pages again occupy the full workspace instead of collapsing into partial-width stacks
- shared workspace content no longer protrudes past the visible right edge when routed pages render padded full-width surfaces
- analytics metrics again read as metrics instead of plain helper text, and the reasons card no longer drops onto its own desktop row
- `npm run test:smoke` now protects the shell layout, smoke auth bootstrapping, profile rendering, and analytics route against the same regression class
- `npm run test:smoke` now also protects notification drawer and command palette overlay behavior through stable entrypoints
- `npm run test:smoke` now also fails if the shared content pane or routed page roots overflow horizontally on desktop
- `npm run test:smoke` now also fails if analytics metric emphasis disappears or if the three desktop analytics cards stop aligning in the intended row
- preset selection is now explicit in a theme-owned `appThemes` module instead of a generic constants passthrough
- repeated ticket workflow pages now share a `TicketFormLayout` contract instead of duplicating the same shell three times
- build no longer reports the previous local chunk-cycle warning around `UploadedFiles`
- Workbox no longer warns about a missing `favicon.svg`
- local chunk-size warnings are gone after targeted vendor splitting
- the stale Browserslist database warning is gone after refreshing `caniuse-lite`
- shared overlays now expose stable dialog semantics instead of relying on incidental text structure
- command palette search now follows explicit combobox or listbox accessibility semantics
- browser-driven PWA listeners no longer attach during render
- analytics, profile, and ticket surfaces no longer depend on a zero-value `SurfaceCard` wrapper
- the PWA install banner no longer competes with preset styling through a local gradient surface
- sidebar state styling now uses theme helpers instead of palette-string alpha suffix hacks
- `lint:design-contract` now enforces decorative-token drift rules with a documented swatch exception
- analytics legends no longer use preset-breaking custom chip chrome
- the post-fix text scan no longer finds mojibake or replacement characters in the touched migration surface

## Lessons To Reuse

- A green build does not prove the app actually boots after migration.
- Startup console errors must be part of the migration gate, not an optional QA note.
- Module-scope i18n work is a migration risk in apps that initialize locale asynchronously.
- Duplicate React or Emotion runtime warnings should be fixed immediately with bundler dedupe or the repo's equivalent singleton-sharing mechanism.
- Layout wrappers are behavioral infrastructure. Replacing them with plain containers without porting grid or flex constraints can break the whole app shell even when TypeScript and build are green.
- Route roots need the same discipline as shell wrappers. If they stop stretching to fill the workspace, dashboards and work areas can look broken even though the route still technically renders.
- Width filling plus internal padding needs explicit box-sizing discipline in shared containers. A padded app-owned `Card` or page root with `width: 100%` can silently overflow the workspace by a few pixels on every route.
- Dashboard metrics need their own hierarchy gate. If labels, values, and helper text collapse to one scale, the screen still renders but stops communicating status.
- Desktop dashboard grids need explicit span discipline. A stale full-width card prop can silently break row alignment even when the page still compiles and passes a basic render check.
- Route-protected pages need a deterministic smoke user; otherwise automated checks may "pass" against `NotFound` or fail for the wrong reason.
- Shared UI regressions often show up as flattened pass-through wrappers or empty placeholder markup. Search for those patterns explicitly after migration.
- Compact shared UI can regress without turning into placeholders. Chart legends, chips, and segmented filters should be checked for preset drift, not only for presence.
- Shared UI layers can also hide substitute atoms that duplicate stock MUI controls. Replace them during migration instead of treating them as acceptable legacy structure.
- Overlay wrappers can silently lose semantic wiring even when the visual layout still looks acceptable. Keep stable title or description ids, labeled close actions, and combobox or listbox roles under test when overlays are touched.
- Decorative overlay chrome such as bottom-sheet grab handles should be hidden from assistive technology unless it conveys state.
- Browser event listeners belong in effects with cleanup. Render-path subscriptions can create duplicated runtime behavior without tripping TypeScript or build.
- Zero-value surface wrappers are not harmless convenience. If a wrapper only forwards MUI `Card` or `Paper`, delete it and keep the component tree honest.
- Design-contract lint should guard against decorative gradients, direct shadow styling, and palette alpha suffix hacks, not only raw hex colors.
- If a visual-preview component really needs gradient or shadow styling, document that exception inline and keep it on a tiny explicit allowlist instead of letting the pattern spread.
- Keep preset policy explicit in the theme layer. Generic constants passthrough files hide the real allowed preset pack and make later migration drift easier.
- If several role-based pages share the same shell, extract one layout contract before making further visual changes. Duplicated workflow shells drift quickly.
- Local app barrels are optional, not sacred. If a barrel creates chunk-cycle warnings, use direct imports for the affected workflow internals.
- A small design-contract lint is worth adding when raw colors, raw numeric font sizes, or ad hoc radius/opacity values are already spreading through the UI.
- Asset globs are part of migration correctness. If PWA config points at files the app does not emit, fix the config instead of carrying the warning forward.
- For chunk warnings, prefer targeted vendor splitting or new lazy boundaries. Raising the warning limit is not a migration fix.
- If one warning remains and it comes from an upstream toolchain package, record it precisely as external debt instead of treating it as unresolved app work.
- Text regressions deserve their own gate. If an app has broad UI churn, add a typography contract check so raw text nodes and variantless typography fail fast.
- Encoding regressions deserve their own gate too. After bulk rewrites, scan for mojibake or replacement characters and verify at least one real localized route before closing the migration.
- For important shell layouts and core pages, add a dedicated smoke-check instead of relying only on manual QA after migration.
- For overlay-heavy apps, prefer smoke coverage through stable entrypoints such as notification drawers or command palettes instead of brittle settings-modal paths that are not consistently reachable in the current route.
