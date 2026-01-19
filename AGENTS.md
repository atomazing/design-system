# AGENTS.md - @atomazing-org/design-system

## Project Overview
- Purpose: reusable design system library with theme factory, global styles, MUI component overrides, typography variants, animations, and utilities.
- Stack: React + TypeScript, MUI v7, Emotion.
- Build output: `tsup` builds `dist/` (esm, cjs, d.ts). Do not edit `dist/` by hand.

## Repository Map
- `src/` library source code.
  - `src/index.ts` is the public entry point.
  - `src/components/` UI components (Emotion `styled` + MUI).
  - `src/constants/` static constants (e.g., palettes, dark mode options).
  - `src/context/` ThemeProvider and context hooks.
  - `src/models/` public types and MUI/typography augmentations.
  - `src/styles/` theme creation, global styles, component overrides, keyframes, MUI augmentations.
  - `src/utils/` helper functions and hooks.
- `dist/` build artifacts (generated).
- Config: `package.json`, `tsup.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `README.MD`.

## Public API & Export Rules
- Export wiring:
  - `src/index.ts` re-exports from folder `index.ts` files.
  - Each public folder has an `index.ts` that aggregates its exports.
- Adding a new public item:
  1) Add the file under the correct folder (component, util, style, etc.).
  2) Export it from that folder's `index.ts`.
  3) Export it from `src/index.ts`.
  4) Update `README.MD` if the public API changes.
  5) Run `npm run lint` and `npm run build`.
- Avoid breaking changes:
  - Do not rename or delete exports without a migration plan.
  - Prefer additive changes; if renaming, keep a deprecated re-export for a release.

## Theming Architecture
- `ThemeProviderWrapper` (`src/context/ThemeProviderWrapper.tsx`) responsibilities:
  - Maintains `theme` and `darkMode` state.
  - Loads and persists settings in `localStorage` key `appSettings` with `{ theme, darkMode }`.
  - Chooses a theme from `themes` prop or falls back to `Default` using `getColorPalette().brand`.
  - Resolves dark mode with `useSystemTheme` + `isDarkMode`.
  - Provides MUI ThemeProvider and Emotion ThemeProvider.
  - Injects `GlobalStyles` and optional `fontFamily`.
- Theme creation pipeline:
  - `createCustomTheme` (`src/styles/createTheme.ts`) builds a base MUI theme and overlays:
    - Palette tokens: `brand`, `neutral`, `accent`, `muted` plus MUI semantic colors.
    - Component overrides from `src/styles/commonComponents.ts`.
    - Typography variants and mappings from `src/styles/typography.ts`.
    - `themeOverrides` applied last (consumer overrides).
- Palette override flow:
  - `setColorPaletteOverride` merges overrides with `defaultColorPalette` (`src/constants/defaultColorPalette.ts`).
  - `getColorPalette` returns the active palette used by `createCustomTheme`.
- Emotion theme augmentation:
  - `src/styles/emotion.d.ts` adds `{ darkMode: boolean }` to Emotion theme.

## Typography System
- Variants and mapping:
  - Definitions live in `src/styles/typography.ts` (`typographyVariants`).
  - HTML mapping for MUI `Typography` is in `muiTypography.defaultProps.variantMapping`.
- Type augmentation:
  - `src/models/typography.ts` extends MUI `TypographyVariants` and `TypographyPropsVariantOverrides`.
- Adding a new variant checklist:
  1) Add the variant to `CustomTypographyVariants` in `src/models/typography.ts`.
  2) Define its `font` in `src/styles/typography.ts`.
  3) Add it to `muiTypography` variant mapping.
  4) Ensure `createCustomTheme` continues to include `muiTypography` and `typographyVariants`.

## Component Overrides & Styling
- Overrides location:
  - `src/styles/commonComponents.ts` provides default props and style overrides.
  - Applied via `createCustomTheme` in the `components` field.
- Global styles:
  - `src/styles/GlobalStyles.tsx` injects global CSS and sets `--app-font-family`.
  - `createCustomTheme` uses the same CSS variable in `typography.fontFamily`.
- Emotion conventions:
  - Internal components use Emotion `styled` template literals (see `src/components/*`).
  - Prefer `styled` for reusable styles, and `sx` on MUI components for local tweaks.
- Animations:
  - Reuse keyframes from `src/styles/keyframes.ts` instead of duplicating.

## SSR Safety Rules
- Forbidden at module scope:
  - `window`, `document`, `navigator`, `localStorage`, `matchMedia`.
- Allowed patterns:
  - `globalThis` guards before browser APIs.
  - Browser-only logic inside `useEffect`.
  - `typeof navigator === "undefined"` checks for utilities (`src/utils/timeAgo.ts`, `src/utils/getSystemInfo.ts`).
- Existing SSR-safe usage:
  - `ThemeProviderWrapper` guards `localStorage` with `globalThis.window`.
  - `useSystemTheme` uses `matchMedia` inside `useEffect`.
  - `useResponsiveDisplay` uses `window` inside `useEffect` (do not move it to module scope).

## Build / Test / Lint
- Commands:
  - `npm run build` -> `tsup` builds `dist/` (esm, cjs, d.ts).
  - `npm run dev` -> watch build with `tsup --watch`.
  - `npm run test` -> `vitest`.
  - `npm run lint` -> eslint + prettier check + `tsc --noEmit`.
  - `npm run format` -> eslint fix + prettier write.
- Troubleshooting:
  - MUI palette or typography type errors: check `src/styles/muiAugmentations.d.ts` and `src/models/typography.ts`.
  - Icon import lint errors: import from `@mui/icons-material/<Icon>` (not the package root).
  - Prettier failures: run `npm run format`.

## Dependency & Peer Dependency Policy
- Peer dependencies (must be satisfied by consumers):
  - `react`, `react-dom`, `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`, `@emotion/css`.
- Bundling policy:
  - `tsup.config.ts` lists externals; add new peer deps here to avoid bundling duplicates.
  - Avoid adding runtime deps unless necessary; prefer peer deps for framework-level packages.
- Package output:
  - Entry points are `dist/index.js`, `dist/index.mjs`, and `dist/index.d.ts`.
  - `package.json` `files` only publishes `dist/` and `README.MD`.

## Backlog-Driven Execution
- Source of work: all tasks must come from `backlog/`, and agents must read the relevant backlog item(s) before making any changes.
- Workflow:
  1) Locate the relevant task in `backlog/`.
  2) Read its scope rules, definition of done, and prompts.
  3) Execute only within that scope and allowed files.
  4) If it conflicts with `AGENTS.md`, the backlog item is authoritative for that task.
- Before starting checklist:
  - Identify the backlog item.
  - Confirm allowed files/scope.
  - Confirm required quality gates.

## Known Pitfalls
- Export drift: forgetting to update both folder `index.ts` and `src/index.ts`.
- Theme augmentation mismatch: adding palette fields without updating `src/styles/muiAugmentations.d.ts`, `ColorPaletteType`, and `defaultColorPalette`.
- Typography mismatch: adding variants without updating type augmentations and variant mapping.
- SSR breakage: accessing browser globals outside guarded `useEffect`.
- Icon import rule: avoid `@mui/icons-material` root imports.
- `darkMode: "auto"` currently resolves to light in `isDarkMode`; do not assume it switches based on background.
- Font handling: if you change font logic, keep `GlobalStyles` and `createCustomTheme` in sync.

## Agent Operating Rules
- Scope discipline:
  - Only change files required for the task. Do not edit `dist/` manually.
  - Avoid drive-by refactors or formatting sweeps.
- Formatting and style:
  - Match existing style (double quotes, trailing commas, existing indentation).
  - Keep comments minimal and factual.
- Validation checklist:
  1) `npm run lint`
  2) `npm run test` if logic changes or new utilities are added
  3) `npm run build`
  4) Ensure exports and type augmentations are consistent
