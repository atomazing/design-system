# Design-System Contract For This Starter

This file describes the current integration contract used by
`examples/next-app-router`.

## Supported Stack

- `next@16.1.6`
- `react@19.2.4`
- `react-dom@19.2.4`
- `@mui/material@7.3.8`
- `@mui/material-nextjs@7.3.8`
- `@emotion/react@11.14.0`
- `@emotion/styled@11.14.1`
- `@atomazing-org/design-system` via `workspace:*`

## Wiring

- `src/app/layout.tsx` owns `AppRouterCacheProvider`, metadata, and the root shell.
- `src/components/providers/AppProviders.tsx` is the client boundary and wraps the
  app in `ThemeProviderWrapper`.
- `src/theme/exampleThemes.ts` selects the preset pack. The current starter uses
  `landingPageThemes`.
- Runtime theme state comes from `useThemeSettings()` and the library-managed
  `appSettings` storage payload.
- `src/theme/themePreferenceCookies.ts` is starter-owned. It writes client-side
  cookies for theme hints, but the current starter does not bootstrap from those
  cookies on the server.

## Allowed Customization

- content and route copy
- metadata and brand strings
- route list and route availability
- switching to another explicit preset pack or app-owned preset array

## Forbidden Customization

- deep imports from library internals
- a competing root `ThemeProvider`
- page-level background overrides that fight the active preset
- app-owned glow, blur, or gradient chrome on primary `Paper` and `Card` surfaces

## SSR And Static Export Boundaries

- The provider is client-safe and stays behind a client boundary.
- Browser APIs must stay out of module scope.
- When dark mode uses `system`, the effective mode resolves on the client after hydration.
- The current `/ssr` route is a static diagnostics route, not a server-data SSR screen.
- Starter build output is exported as static files in `dist/`.
