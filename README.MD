# @atomazing-org/design-system

Modern MUI v7 + Emotion design system built around visual presets, explicit
light and dark schemes, SSR-safe theming, and persisted runtime settings.

## Preview

![Design system preview](./preview.gif)

## At A Glance

- React 18 and 19 support
- MUI 7 + Emotion 11
- Preset-first theming via `ThemePreset`
- Runtime theme and dark-mode switching
- SSR-safe provider flow
- Curated root API plus `/presets` entrypoint

## Contents

- [Why This Library](#why-this-library)
- [Installation](#installation)
- [Package Format](#package-format)
- [Quick Start](#quick-start)
- [Built-In Presets](#built-in-presets)
- [Dark Mode](#dark-mode)
- [Custom Presets](#custom-presets)
- [Persistence](#persistence)
- [SSR Notes](#ssr-notes)
- [API Reference](#api-reference)
- [Migration Docs](#migration-docs)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Releases](#releases)
- [License](#license)

## Why This Library

- Preset-first theming built on `ThemePreset`, not ad hoc per-app theme files
- True light and dark schemes via `colorSchemes`, not only `palette.mode`
- Strong visual differentiation between presets instead of subtle palette swaps
- Runtime theme selection and dark-mode switching with persisted settings
- SSR-safe provider flow with no browser APIs touched at module scope
- Curated public API for app integrations and consumer documentation
- Test coverage for contrast, baseline preset shape, and SSR behavior

## Installation

### npm

```bash
npm install @atomazing-org/design-system react react-dom @mui/material @emotion/react @emotion/styled
```

### pnpm

```bash
pnpm add @atomazing-org/design-system react react-dom @mui/material @emotion/react @emotion/styled
```

Optional peer:

- `@mui/icons-material`

Expected ecosystem:

- React `^18 || ^19`
- React DOM `^18 || ^19`
- MUI `^7`
- Emotion `^11`

## Package Format

- ESM-only package
- Public entrypoints:
  - `@atomazing-org/design-system`
  - `@atomazing-org/design-system/presets`

The root entrypoint is intentionally curated. Preset registries and individual
presets live under the `/presets` subpath.

## Quick Start

```tsx
import ReactDOM from "react-dom/client";
import { ThemeProviderWrapper } from "@atomazing-org/design-system";
import { defaultThemes } from "@atomazing-org/design-system/presets";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProviderWrapper themes={defaultThemes}>
    <App />
  </ThemeProviderWrapper>,
);
```

Use `useThemeSettings()` when you need runtime access to:

- the selected preset id
- the current dark-mode setting
- setters for both

Example:

```tsx
import { useThemeSettings } from "@atomazing-org/design-system";

export function ThemeDebug() {
  const { theme, darkMode, setTheme, setDarkMode } = useThemeSettings();

  return (
    <>
      <button onClick={() => setTheme("modern-minimal")}>Modern Minimal</button>
      <button onClick={() => setDarkMode("dark")}>Dark</button>
      <pre>{JSON.stringify({ theme, darkMode }, null, 2)}</pre>
    </>
  );
}
```

## Built-In Presets

Ship-ready preset packs live under `@atomazing-org/design-system/presets`.

```ts
import {
  allBuiltInThemes,
  defaultThemes,
  landingPageThemes,
  modernMinimal,
} from "@atomazing-org/design-system/presets";
```

### `defaultThemes`

Baseline application presets:

- `Editorial Classic`
- `Airport Ops`
- `Modern Minimal`
- `Brand Neon Admin`
- `Neo Glass`
- `Retro Terminal`
- `Warm Earth`

### `landingPageThemes`

Extended pack for landing pages, brand-heavy surfaces, and more expressive
visual directions. Representative families include:

- `Flow Editorial`
- `Acid Editorial`
- `Bauhaus Ops`
- `Neon Bauhaus Grid`
- `Neon Bauhaus Ops`
- `Brutalist Sprint`
- `Brand Neon Motion`
- `Glass Reactor`
- `Holographic Ledger`
- `Kintsugi Protocol`
- `Solarpunk Enterprise`

### `allBuiltInThemes`

Combined pack of `defaultThemes` and `landingPageThemes`.

## Dark Mode

Supported dark-mode values:

- `light`
- `dark`
- `system`

`ThemeProviderWrapper` resolves the effective scheme from the selected dark-mode
value and the current system preference. The root export `darkModeOptions` is
available for building dark-mode UI controls.

```tsx
import { darkModeOptions, useThemeSettings } from "@atomazing-org/design-system";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export function DarkModeSelector() {
  const { darkMode, setDarkMode } = useThemeSettings();

  return (
    <RadioGroup
      row
      value={darkMode}
      onChange={(event) => setDarkMode(event.target.value as typeof darkMode)}
    >
      {darkModeOptions.map((option) => (
        <FormControlLabel
          key={option.value}
          control={<Radio />}
          label={option.label}
          value={option.value}
        />
      ))}
    </RadioGroup>
  );
}
```

## Custom Presets

Custom presets should follow the `ThemePreset` contract.

```ts
import type { ThemePreset } from "@atomazing-org/design-system/presets";

export const myPreset: ThemePreset = {
  id: "my-brand",
  label: "My Brand",
  colorSchemes: {
    light: {
      palette: {
        background: { default: "#ffffff", paper: "#ffffff" },
        text: { primary: "#111111", secondary: "#444444" },
        divider: "rgba(0, 0, 0, 0.12)",
      },
    },
    dark: {
      palette: {
        background: { default: "#0f1115", paper: "#151922" },
        text: { primary: "#f1f3f5", secondary: "#c6cbd1" },
        divider: "rgba(241, 243, 245, 0.16)",
      },
    },
  },
};
```

Merge custom presets with the built-ins:

```ts
const themes = [...defaultThemes, myPreset];
```

Rules worth keeping in mind:

- preset ids must be unique and non-empty
- duplicate ids are deduped by id with last-wins token resolution
- first occurrence order is preserved for the visible preset list

## Persistence

Theme settings are stored in `localStorage` under `appSettings` by default.

Current JSON shape:

```json
{ "themeId": "editorial-classic", "darkMode": "system" }
```

If multiple applications share the same origin, override the storage key with
`settingsStorageKey` on `ThemeProviderWrapper`.

```tsx
<ThemeProviderWrapper
  themes={defaultThemes}
  settingsStorageKey="pampaLegacyThemeSettings"
>
  <App />
</ThemeProviderWrapper>
```

## SSR Notes

- Keep `ThemeProviderWrapper` inside a client boundary for Next.js and other SSR
  apps.
- Do not access `window`, `document`, or `localStorage` at module scope.
- When dark mode uses `system`, the effective mode resolves on the client after
  hydration.

## API Reference

### `ThemeProviderWrapper`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `themes` | `ThemePreset[]` | `defaultThemes` | Preset list used by the provider. |
| `fontFamily` | `string` | `undefined` | Optional global font stack applied by `GlobalStyles`. |
| `darkMode` | `"light" \| "dark" \| "system"` | `undefined` | Optional hard override for dark mode. |
| `initialThemeId` | `string` | `undefined` | Fallback theme id when persisted settings are absent. |
| `initialDarkMode` | `"light" \| "dark" \| "system"` | `undefined` | Fallback dark mode when persisted settings are absent. |
| `settingsStorageKey` | `string` | `"appSettings"` | Optional localStorage key override. |
| `children` | `ReactNode` | required | Application content. |

If `darkMode` is passed as a prop, `setDarkMode()` becomes a no-op because the
provider is operating in controlled override mode.

### `useThemeSettings()`

Returns:

- `theme`
- `setTheme(themeId)`
- `darkMode`
- `setDarkMode(mode)`
- `themes`
- `selectedTheme`
- `defaultThemeName`

### Root Exports

The curated root entrypoint exports:

- `ThemeProviderWrapper`
- `useThemeSettings`
- `mergeThemes`
- `normalizeThemes`
- `resolveDefaultThemeName`
- `resolveThemeById`
- `GlobalStyles`
- `buildMuiTheme`
- `resolveEffectiveMode`
- `selectThemeOptions`
- `validateSchemeTokens`
- `darkModeOptions`
- `useSystemTheme`
- `readAppSettings`
- `writeAppSettings`

Preset registries and individual presets live under
`@atomazing-org/design-system/presets`.

## Migration Docs

If you are migrating an existing app to this package, start with:

- `migrations/README.UPDATE.md`
- `migrations/docs/migrations/design-system/README.md`
- `migrations/docs/migrations/design-system/shared/WORKING-RULES.md`
- `migrations/skills/design-system-consumer-agent/SKILL.md`
- `migrations/skills/design-system-migration-agent/SKILL.md`

## Examples

Run examples from the repository root after `pnpm install`.

### React App Smoke Consumer

Fastest local validation path for presets and runtime theme switching:

```bash
pnpm --dir examples/react-app dev
```

### Next.js App Router Reference

Starter reference for SSR-safe integration:

```bash
pnpm --dir examples/next-app-router dev
```

## Troubleshooting

- Dark mode does not visibly change the app:
  Ensure both `colorSchemes.light` and `colorSchemes.dark` define
  `palette.background.default`, `palette.background.paper`, and readable text
  colors.
- Preset switching appears stuck:
  Check for duplicate or empty preset ids and clear the relevant
  `localStorage` key if invalid persisted state exists.
- One app keeps overwriting another app's theme:
  Use a custom `settingsStorageKey` instead of the shared default key.
- SSR build or hydration warnings appear:
  Make sure the provider is mounted in a client boundary and that no browser API
  access happens at module scope.

## Contributing

```bash
pnpm lint
pnpm test
pnpm build
pnpm run smoke:esm
pnpm run smoke:react-app
pnpm run smoke:next
pnpm run check:migration-readiness
```

## Releases

This repo uses Changesets for package versioning and release automation.

Intended flow:

- run `pnpm changeset`
- merge changes into `master`
- GitHub Actions opens or updates a release PR
- merge the release PR to publish to npm

See:

- `RELEASING.md` for the release checklist and example changeset
- `RELEASE-STATUS.md` if automation is temporarily blocked by GitHub
  organization permissions

## License

MIT
