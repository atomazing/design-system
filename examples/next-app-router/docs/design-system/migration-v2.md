# Adapting This Starter

Use this guide when forking `examples/next-app-router` into a real product app.

## Replace Branding

Update these files together:

- `src/app/icon.svg`
- `src/components/ui/StarterLogo.tsx`
- `src/components/ui/StarterWordmark.tsx`
- metadata fields in `src/app/layout.tsx`

After a brand change, review the header, hero, and metadata so they still express
one consistent brand system.

## Replace The Preset Pack

1. Update `src/theme/exampleThemes.ts`.
2. Keep `ThemeProviderWrapper` in `src/components/providers/AppProviders.tsx`.
3. Keep `useThemeSettings()` as the runtime theme source of truth.
4. Verify that `src/theme/themePreferenceCookies.ts` still accepts the new preset ids.

## Remove Demo And Debug Routes

If you convert the starter into a production app, you can remove or reframe:

- `/debug/theme`
- `/debug/state`
- `/showcase`
- `/ssr`
- `/start`

When routes change, also update:

- `src/content/starterFlow.ts`
- `src/components/ui/AppHeader.tsx`
- any affected route tests in `tests/`

## Preserve The Starter Invariants

- Keep the active preset in charge of the page background.
- Do not introduce a second theme store.
- Do not add local decorative chrome to primary surfaces.
- Keep browser API usage client-safe.
