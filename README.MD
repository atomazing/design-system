# @atomazing-org/design-system

Modern MUI v7 + Emotion design system with strongly differentiated visual presets,
scheme-based light and dark tokens, SSR-safe theming, and persistence.

## Installation

```bash
npm install @atomazing-org/design-system
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

Optional peers:

- `@mui/icons-material`
- `@emotion/css`

## Package Format

- ESM-only package
- Public entrypoints:
  - `@atomazing-org/design-system`
  - `@atomazing-org/design-system/presets`

## Quick Start

```tsx
import { ThemeProviderWrapper } from "@atomazing-org/design-system";
import { defaultThemes } from "@atomazing-org/design-system/presets";

export function App() {
  return (
    <ThemeProviderWrapper themes={defaultThemes}>
      {/* your app */}
    </ThemeProviderWrapper>
  );
}
```

Use `useThemeSettings()` for runtime preset and dark-mode controls.

## Built-In Preset Packs

- `defaultThemes`: baseline application presets
- `landingPageThemes`: extended landing and marketing presets
- `allBuiltInThemes`: combined pack

## Custom Presets

Custom presets must follow the `ThemePreset` contract:

- stable `id`
- human-readable `label`
- `colorSchemes.light`
- `colorSchemes.dark`

Each scheme should define:

- `palette.background.default`
- `palette.background.paper`
- `palette.text.primary`
- `palette.text.secondary`
- `palette.divider`

## Persistence

Theme settings are stored in `localStorage` under `appSettings`.

Current JSON shape:

```json
{ "themeId": "editorial-classic", "darkMode": "system" }
```

## SSR Notes

- Keep `ThemeProviderWrapper` inside a client boundary for Next.js and other SSR apps.
- Do not access `window`, `document`, or `localStorage` at module scope.
- When dark mode uses `system`, the effective mode resolves on the client after hydration.

## Migration Docs

If you are migrating an app to this package, start with:

- `migrations/README.UPDATE.md`
- `migrations/docs/migrations/design-system/README.md`
- `migrations/docs/migrations/design-system/shared/WORKING-RULES.md`
- `migrations/skills/design-system-consumer-agent/SKILL.md`
- `migrations/skills/design-system-migration-agent/SKILL.md`

## Examples

- `examples/react-app`: canonical Vite smoke consumer for local package validation
- `examples/next-app-router`: canonical Next.js App Router starter reference

For starter-specific rules, runbooks, and customization guidance, use the local docs
pack under `examples/next-app-router/`.
