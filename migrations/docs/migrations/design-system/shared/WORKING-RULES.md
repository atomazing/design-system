# Working Rules For Consumer Repositories

Use this document when integrating or maintaining `@atomazing-org/design-system`
inside an application repository.

## Public Surface Only

- Import runtime APIs from `@atomazing-org/design-system`.
- Import shipped presets from `@atomazing-org/design-system/presets`.
- Do not import internal files from `src/*`, `dist/*`, or unpublished paths.

## Standard Integration Contract

- Wrap the app with `ThemeProviderWrapper`.
- Use `useThemeSettings()` for runtime theme selection and dark-mode changes.
- Treat the design system as the single source of truth for theme state.
- Do not keep a second app-level theme state store unless it only mirrors design-system state.
- Let the active preset own the application background.
- Do not set app-level background colors or fills on root shells, route wrappers, or page containers when that would override the preset background supplied by the design system.
- Treat `theme.palette.background.paper` and other surface tokens as component surfaces, not as a replacement for the preset-controlled page background.
- If the app shell exposes a dedicated workspace or content pane, route roots and page containers must stretch to fill that region instead of shrinking to intrinsic content width.

## Preset Selection Rules

- `defaultThemes`: baseline application presets.
- `landingPageThemes`: extended preset pack for landing pages and marketing surfaces.
- `allBuiltInThemes`: combined pack for showcases or apps that intentionally want both sets.
- Keep preset selection in one explicit app-owned theme module such as `src/theme/appThemes.ts`.
- Do not hide preset choice behind generic constants passthrough files such as `src/constants/themes/themes.ts`.

If the consumer app only needs one or two presets, prefer importing the named presets explicitly
instead of building a new parallel preset registry.
If the consumer needs a curated subset, export that subset from the app theme module instead of
rebuilding theme state or duplicating preset metadata elsewhere.

## Landing Composition Rules

When the consumer app uses landing or marketing surfaces:

- use `landingPageThemes` intentionally
- let the active preset own the page background
- let the active preset own the surface character of landing panels
- do not hand-style landing `Paper` or `Card` surfaces with local glow, bloom, blur, decorative borders, gradient washes, or pseudo-element chrome
- app code may control layout, spacing, sizing, and content hierarchy, but the visual treatment of surfaces must come from the preset/theme layer
- prefer standard MUI composition for previews and proof blocks
- avoid custom decorative shapes and pseudo-graphics when a simple MUI layout can express the same state
- avoid nested rectangular surface hierarchies such as `card inside card inside card`
- keep one primary outer surface and use lightweight MUI primitives inside it
- if a preview block becomes dense, remove secondary content before tightening spacing

## Surface Composition Rules

Across consumer components in general:

- one logical block should have one primary rectangular surface
- let the active preset own the visual treatment of `Paper`, `Card`, `Dialog`, `Drawer`, and similar surfaces
- do not hand-style consumer surfaces with local glow, halo, bloom, decorative borders, blur, gradient washes, or pseudo-element chrome
- do not keep zero-value surface wrappers such as a local `SurfaceCard` that only forwards props to MUI `Card` without adding real behavior
- do not keep large inline `sx` objects in JSX; if a component needs substantial styling, extract a local `styled(...)` component in the same file and keep those styled declarations near the bottom of the file
- keep app styling focused on layout, spacing, sizing, and content hierarchy; move distinct surface looks into presets or MUI theme overrides
- prefer `Stack`, `List`, `Divider`, `Typography`, `Chip`, and `Avatar` for internal composition
- do not add extra bordered or elevated rectangular layers unless they carry a separate semantic role
- do not restyle chart legends, compact filters, segmented controls, or status chips into ad hoc chip-like chrome that competes with the active preset; prefer neutral MUI composition and let the preset own the surface character

## Design Token Hardening Rules

- Use theme helpers such as `alpha()` instead of string-concatenated palette hacks like `${theme.palette.primary.main}1a`.
- Decorative gradients and shadow styling are forbidden in normal consumer UI, especially on shared surfaces and shell infrastructure.
- If a component must visually preview preset data, such as a theme swatch, document that exception inline and keep it on a small explicit allowlist in the repo-local design-contract check.
- Repo-local design-contract lint should protect against decorative gradients, direct shadow styling, theme shadow-token drift, and palette alpha suffix hacks in addition to raw colors and numeric visual tokens.

## MUI-First Component Rules

- Prefer direct MUI primitives for base UI elements such as buttons, icon buttons, labels, helper text, skeletons, lists, drawers, and dialog sections.
- Do not keep consumer-owned substitute atoms that merely recreate an existing MUI primitive with `div`, `label`, `span`, `Box`, or other generic wrappers.
- If a consumer abstraction is still useful, keep it as a thin wrapper around the MUI primitive rather than a parallel hand-rolled implementation.
- Remove zero-value wrappers that only rename a MUI primitive or surface without adding behavior, state policy, or accessibility value.
- Exceptions are allowed only when there is clear custom logic or a pattern MUI does not provide directly, such as drag-and-drop zones, app-specific charts, or brand artwork.
- Even when an exception is justified, compose it from MUI layout and surface primitives where possible.

## Typography Contract Rules

- Visible application text should be rendered through `Typography`, not left as raw JSX text inside layout wrappers.
- Every `Typography` must declare an explicit `variant`.
- Pick variants by semantics, not convenience:
  - headings and section titles: `h1` through `h6`
  - main body copy and helper text: `subtitle1`, `body1`, `body2`
  - button and action labels: compact standard variants such as `subtitle2` or `button`
  - chip, badge, and compact status labels: compact standard variants such as `caption`
- When MUI interactive components such as `Button`, `ToggleButton`, `MenuItem`, `Chip`, or `Alert` need visible text, wrap that text in `Typography component="span"` with an explicit variant.
- If the repo has a typography contract lint or script, keep it green as part of the migration gate.
- If bulk replacements or file rewrites touch localized copy, keep files in UTF-8 and scan touched files for mojibake or replacement characters before closeout.
- Validate at least one real route with non-Latin copy when the migration touched translated strings, mocks, or fixtures.

## Overlay And Semantic Contract Rules

- Dialogs, drawers, bottom sheets, and other overlay containers must expose stable `aria-labelledby` and `aria-describedby` semantics.
- Shared dialog-title abstractions should accept stable title and subtitle ids so the overlay can wire those semantics directly instead of relying on incidental text structure.
- Close buttons inside shared overlays must have explicit accessible labels.
- Command palettes, searchable pickers, and other overlay search surfaces should use `combobox` plus `listbox` semantics when they own filtered keyboard navigation.
- Decorative overlay chrome such as drag handles or visual grabbers should be hidden from assistive technology when it does not convey state.
- Prefer stable overlay test hooks or landmarks for smoke coverage, and avoid brittle tests that depend on incidental navigation paths just to reach a modal.

## Workflow Composition Rules

- If multiple pages share the same workflow shell, form layout, or section grid, extract one shared layout contract instead of duplicating the page structure per role or route.
- Keep role-specific behavior in headers, sections, and policy hooks; keep shared structure in a dedicated workflow layout component.
- Prefer direct local imports for chunk-sensitive app internals when a barrel re-export introduces circular chunk warnings in build output.
- Do not preserve convenience barrels for local app modules when they make execution order less reliable than direct feature-local imports.

## Custom Preset Rules

Custom presets must follow `ThemePreset` exactly:

- stable string `id`
- human-readable `label`
- `colorSchemes.light`
- `colorSchemes.dark`

Each scheme should define:

- `palette.background.default`
- `palette.background.paper`
- `palette.text.primary`
- `palette.text.secondary`
- `palette.divider`

## SSR And Next.js Rules

- Keep `ThemeProviderWrapper` inside a client boundary.
- Do not access `window`, `document`, `navigator`, or `localStorage` at module scope.
- If theme preference must be bridged through cookies or storage, keep the browser-specific logic client-safe.

## Runtime Startup Rules

- A green build is not enough to close a migration.
- After dependency, provider, or theme-state changes, start the app with the repo's normal dev/start command.
- Open the app in a real browser and fix startup console errors before closeout.
- Fix migration-caused startup warnings before closeout when they indicate broken runtime alignment.
- If runtime singleton warnings appear for `react`, `react-dom`, `@emotion/react`, or `@emotion/styled`, align the bundler config so only one runtime copy loads.
- Avoid module-scope calls that require browser APIs, storage, or an activated i18n locale.
- Register browser event listeners such as `beforeinstallprompt`, `matchMedia`, or other window-driven subscriptions inside effects with cleanup instead of render paths or module scope.
- Verify that the app background still comes from the active preset after migration.
- If the consumer uses root shells such as `AppShell`, `Layout`, `PageContainer`, or route wrappers, keep them transparent unless they intentionally represent a surface layer.
- If token drift is broad, add or tighten a repo-local design contract gate for hardcoded colors, raw numeric type scale, ad hoc radius/opacity values, decorative gradients, shadow styling, and palette alpha suffix hacks, and keep it green.

## Build Hygiene Rules

- Fix consumer-owned build warnings that come from the app's own config, imports, or chunking strategy.
- If PWA or Workbox config references asset names, keep those glob patterns aligned with the actual files emitted from `public/` or equivalent static assets.
- If Vite or Rollup reports oversized consumer-owned chunks, prefer targeted `manualChunks` or additional lazy boundaries over simply increasing `chunkSizeWarningLimit`.
- Do not silence a real warning when the app can fix the underlying config or bundling cause directly.
- If the only remaining warning comes from an upstream toolchain package outside the consumer app's control, record the exact package and file instead of misclassifying it as an app regression.

## Anti-Patterns

Avoid these patterns:

- deep imports from internal design-system files
- a second competing root `ThemeProvider`
- hardcoded theme colors when a theme token exists
- hardcoded root-level page backgrounds that override the active preset background
- hand-rolled substitute primitives for components MUI already provides
- zero-value wrapper components that only rename a stock MUI primitive or surface
- decorative gradients or shadow styling applied directly in consumer shells and shared surfaces
- string-concatenated palette alpha hacks instead of theme helpers such as `alpha()`
- local storage access outside SSR-safe guards
- dialogs, drawers, or bottom sheets without stable semantic labeling
- browser event listeners attached from render flow without cleanup
- maintaining a parallel dark-mode enum or persistence format
- role-based workflow pages that duplicate the same layout shell instead of sharing one structural contract
- local barrel re-exports that introduce circular chunk warnings for app internals

## When Migration Is Required

Do not treat these as small integration tasks. Use route-based migration instead:

- the app still uses `@material-ui/*`
- the app has a custom token layer that should be replaced or normalized
- the app mixes multiple theme providers or theme sources of truth
- the user asks to standardize the project on this library
- the migration touches a broad set of colors, typography, spacing, or component overrides

## Route Selection

- `mui4-to-latest`: legacy Material UI v4 imports or dependencies
- `greenfield`: new app, or no legacy theme/token migration required
- `adopt-existing`: app already uses modern MUI but needs theme/token adoption

## Recommended User Request

Use a request like this with an AI agent:

`Adopt @atomazing-org/design-system in this repo. If the current theme stack is legacy or custom, choose the correct migration route and execute the migration runbook.`
