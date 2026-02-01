# @atomazing-org/design-system

Modern MUI v7 + Emotion design system with scheme-based presets, SSR-safe theming, and persistence.

## Contents
- Why this library
- Installation
- Quickstart
- Presets
- Dark mode
- Custom presets
- API reference
- Examples
- Troubleshooting
- Consumer alias guidance
- Contributing
- Release notes
- License

## Why this library
- True light/dark presets via colorSchemes (not just palette.mode)
- Persisted theme and darkMode with safe defaults
- SSR-safe (no module-scope browser APIs)
- MUI v7 + Emotion ready, with typography variants and component overrides
- Guardrails: contrast checks on preset tokens
- Easy to extend with custom presets

## Installation
```bash
npm install @atomazing-org/design-system
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled @emotion/css
```

## Quickstart
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProviderWrapper } from "@atomazing-org/design-system";
import { defaultThemes } from "@atomazing-org/design-system/presets";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProviderWrapper themes={defaultThemes}>
    <App />
  </ThemeProviderWrapper>
);
```

## Presets
Ship-ready presets live under the `/presets` subpath. `defaultThemes` contains all built-in presets.

```ts
import { defaultThemes, modernMinimal } from "@atomazing-org/design-system/presets";
```

Built-in presets:
- Warm Earth
- Editorial Classic
- Modern Minimal
- Neo Glass
- Retro Terminal

## Dark mode
`darkMode` controls which scheme is active. Supported values:
- `light`
- `dark`
- `system`
- `auto` (alias of `system`)

`effectiveMode` is derived from `darkMode` + the OS preference. If the system preference is unknown, the library falls back to `light`.

```tsx
import { useThemeSettings, darkModeOptions } from "@atomazing-org/design-system";
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

## Custom presets
Define a `ThemePreset` with `colorSchemes.light` and `colorSchemes.dark`.

```ts
import type { ThemePreset } from "@atomazing-org/design-system";

export const myPreset: ThemePreset = {
  id: "my-brand",
  label: "My Brand",
  colorSchemes: {
    light: {
      palette: {
        background: { default: "#ffffff", paper: "#ffffff" },
        text: { primary: "#111111", secondary: "#444444" },
        divider: "rgba(0,0,0,0.12)",
      },
    },
    dark: {
      palette: {
        background: { default: "#0f1115", paper: "#151922" },
        text: { primary: "#f1f3f5", secondary: "#c6cbd1" },
        divider: "rgba(241,243,245,0.16)",
      },
    },
  },
};
```

Merge with built-ins:
```ts
const themes = [...defaultThemes, myPreset];
```

Duplicate preset ids are resolved by last-wins while preserving the first-occurrence order.

## API reference

### ThemeProviderWrapper
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `themes` | `ThemesInput` | `Default` preset | `ThemePreset[]` (recommended) or legacy `ThemeOptions[]` with optional `name`. |
| `fontFamily` | `string` | `undefined` | Optional global font stack. |
| `children` | `ReactNode` | required | Application content. |

Legacy themes without an explicit dark scheme receive a safe dark fallback derived from the light scheme.

### ThemePreset
| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Stable preset identifier (used for selection + persistence). |
| `label` | `string` | Human-friendly preset name. |
| `colorSchemes.light` | `ThemeOptions` | Light scheme tokens. |
| `colorSchemes.dark` | `ThemeOptions` | Dark scheme tokens. |
| `description` | `string?` | Optional description. |
| `tags` | `string[]?` | Optional tags. |
| `version` | `string?` | Optional preset version. |

### DarkModeSetting
| Value | Meaning |
| --- | --- |
| `light` | Force light scheme |
| `dark` | Force dark scheme |
| `system` | Follow OS preference |
| `auto` | Alias of `system` |

### useThemeSettings
Returns:
- `theme`, `setTheme`
- `darkMode`, `setDarkMode`
- `themes`, `selectedTheme`, `defaultThemeName`

### Presets exports
`@atomazing-org/design-system/presets` exports:
- `defaultThemes`
- `editorialClassic`, `modernMinimal`, `neoGlass`, `retroTerminal`, `warmEarth`

## Examples
The repro app is the fastest way to validate presets and dark mode:

```bash
pnpm -C examples/repro install
pnpm -C examples/repro dev
```

Look for:
- Theme controls (preset + mode)
- Token Debug Panel (tokens + persistence)
- Smoke Gate checklist and overlay demos

## Troubleshooting
- Dark mode does not change background:
  - Ensure both `colorSchemes.light` and `colorSchemes.dark` set `palette.background.default` and `palette.background.paper`.
  - Remove hardcoded `#fff`/`#000` from layouts that override theme tokens.
- Text is unreadable in dark mode:
  - Verify `palette.text.primary`/`secondary` for dark schemes.
  - Check divider and surface contrast in the repro app.
- Preset switching does not update:
  - Ensure preset ids are unique and non-empty.
  - Clear `localStorage` key `appSettings` if persisted values are invalid.
- SSR warnings:
  - Ensure the provider is mounted inside a client boundary for SSR apps.

## Consumer alias guidance
These aliases are for your application code (not library internals).

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@features/*": ["src/features/*"]
    }
  }
}
```

`vite.config.ts`:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@features": resolve(__dirname, "src/features"),
    },
  },
});
```

## Contributing
```bash
pnpm lint
pnpm build
pnpm test
pnpm -C examples/repro dev
```

## Release notes
Current release highlights:
- Scheme-based presets with explicit light/dark schemes
- Improved dark mode and persistence alignment
- Stable `@atomazing-org/design-system/presets` subpath export

## License
MIT
