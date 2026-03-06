# Change Map

Use this map to find the file to edit for a specific outcome.

## Brand

- `src/app/icon.svg`: browser icon asset.
- `src/components/ui/StarterLogo.tsx`: reusable logo mark.
- `src/components/ui/StarterWordmark.tsx`: visible brand text and lockup.
- `src/app/layout.tsx`: metadata titles, descriptions, and application name.

## Theme

- `src/theme/exampleThemes.ts`: selects the current preset pack.
- `src/theme/themePreferenceCookies.ts`: starter-owned cookie hint logic.
- `src/components/providers/AppProviders.tsx`: passes themes into `ThemeProviderWrapper`.
- `src/components/theme/ThemeControls.tsx`: starter theme control UI.

## Content

- `src/content/starterFlow.ts`: navigation labels and section model.
- `src/components/home/GuidedStarterFlow.tsx`: landing hero copy and final CTA.
- `src/components/home/LandingHeroPreview.tsx`: hero proof copy.
- `src/components/home/LandingEditorialPanel.tsx`: shared editorial proof surface.
- `src/components/ui/FocusedPageHeader.tsx`: reusable page header structure.

## Routes

- `src/app/page.tsx`
- `src/app/presets/page.tsx`
- `src/app/debug/theme/page.tsx`
- `src/app/debug/state/page.tsx`
- `src/app/showcase/page.tsx`
- `src/app/ssr/page.tsx`
- `src/app/start/page.tsx`

## Tests

- `tests/starter-home.spec.ts`: landing layout and banned meta-copy protection.
- `tests/theme-and-ssr.spec.ts`: theme persistence and static diagnostics coverage.
