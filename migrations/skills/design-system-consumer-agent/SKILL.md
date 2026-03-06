---
name: design-system-consumer-agent
description: Rules for integrating and maintaining @atomazing-org/design-system in application repos. Use when an AI agent needs to add the library, wire it into an app, or decide whether the request should become a route-based migration.
---

# Design System Consumer Agent

Use this skill whenever the task is about adopting, integrating, or maintaining
`@atomazing-org/design-system` in an application repository.

## Source Of Truth

1. Read `../../docs/migrations/design-system/shared/WORKING-RULES.md`.
2. Use `../../docs/migrations/design-system/README.md` for route selection context.
3. If migration is needed, switch to `../design-system-migration-agent/SKILL.md`.

## Default Workflow

1. Inspect the target app:
   - current dependencies
   - current theme provider setup
   - theme or token modules
   - SSR or Next.js usage
2. Apply the working rules from `WORKING-RULES.md`.
3. Decide whether the task is:
   - a normal integration task
   - or a route-based migration

## Escalate To Migration

Escalate to the migration workflow if any of these are true:

- `@material-ui/*` exists
- the app already has a substantial theme/token system
- the request would leave dual theme providers or dual sources of truth
- the user asks to standardize or replace the design foundation
- changes affect a large set of colors, typography, or component overrides

When escalation is needed:

1. State that route-based migration is recommended.
2. Select the route:
   - `mui4-to-latest`
   - `greenfield`
   - `adopt-existing`
3. Load `../design-system-migration-agent/SKILL.md`.
4. For large repos, execute the selected route phase by phase instead of batching broad edits into one pass.

## Normal Integration Expectations

When migration is not needed:

- use public imports only
- prefer `ThemeProviderWrapper`
- prefer `useThemeSettings()`
- use `defaultThemes`, `landingPageThemes`, or `allBuiltInThemes` intentionally
- keep preset choice in one explicit app-owned theme module instead of generic constants passthrough files
- let the active preset own the visual treatment of `Paper`, `Card`, `Dialog`, `Drawer`, and similar surfaces across the app
- do not hand-style consumer surfaces with app-local glow, bloom, blur, decorative borders, gradient washes, or pseudo-element chrome; those belong in presets/theme overrides
- keep app styling focused on layout, spacing, sizing, and content hierarchy
- if the app shell exposes a dedicated workspace or content pane, keep route roots and page containers stretched to fill it instead of shrinking to intrinsic content width
- for landing and marketing surfaces, prefer MUI-native preview composition over custom decorative UI logic
- do not hand-style landing surfaces with app-local glow, bloom, blur, decorative borders, gradient washes, or pseudo-element chrome; those belong in presets/theme overrides
- do not build nested rectangular surface hierarchies such as `card inside card inside card`
- keep one primary surface per logical block and use `Stack`, `List`, `Divider`, `Typography`, `Chip`, and `Avatar` before introducing another bordered layer
- keep landing preview blocks spacious and reduce content before compressing spacing
- remove zero-value wrappers that only rename MUI primitives or surfaces
- do not leave large inline `sx` objects in JSX; if a component needs substantial styling, extract a local `styled(...)` component in the same file and keep those styled declarations near the bottom
- if multiple role pages share the same shell, extract a shared workflow layout before changing visuals independently
- if a local barrel creates chunk-cycle warnings, prefer direct local imports for the affected workflow internals
- fix consumer-owned build warnings such as stale PWA asset globs or oversized local chunks instead of silencing them
- if a remaining warning belongs to an upstream toolchain package, record it precisely as external debt
- keep visible text on `Typography` with explicit semantic variants instead of raw JSX text nodes
- when buttons, chips, alerts, menu items, or toggle buttons show text, wrap that label in `Typography component="span"`
- keep compact legends, chips, segmented filters, and metric badges visually aligned with the active preset instead of restyling them into ad hoc chip-like chrome
- when shared dialogs, drawers, or bottom sheets are touched, keep stable `aria-labelledby` and `aria-describedby` wiring plus labeled close actions
- when an overlay owns filtered keyboard navigation, use `combobox` and `listbox` semantics instead of generic wrapper markup
- keep browser event listeners such as `beforeinstallprompt` or `matchMedia` subscriptions inside effects with cleanup
- remove zero-value surface wrappers that only forward to MUI `Card` or `Paper`
- use `alpha()` or equivalent theme helpers instead of palette-string alpha suffix hacks
- treat decorative gradients and shadow styling as migration defects unless the component is an explicit preview exception documented in the repo-local design-contract gate
- keep browser-only APIs out of module scope
- after dependency or provider wiring changes, start the app and verify the first route boots without browser console startup errors
- if bulk rewrites or localized copy changes were part of the work, keep files in UTF-8, scan for mojibake or replacement characters, and verify readable text on a real route
