# Theme Policy

## Current Starter Pack

- The starter currently uses `landingPageThemes`.
- Selection lives in `src/theme/exampleThemes.ts`.
- `src/components/providers/AppProviders.tsx` passes that pack into `ThemeProviderWrapper`.
- `src/components/theme/ThemeControls.tsx` provides the starter theme switcher UI.

## Visual Ownership Rules

- The active preset owns the page background.
- The active preset owns the primary surface character.
- App-level `sx` should focus on layout, spacing, and content flow, not replace preset styling.

## Safe Preset Swap Flow

1. Replace `landingPageThemes` with another explicit preset pack or app-owned array.
2. Confirm `src/theme/themePreferenceCookies.ts` still accepts the resulting preset ids.
3. Run `pnpm run lint`, `pnpm run build`, and `pnpm run test:e2e`.
4. Verify the background and surface behavior manually.
