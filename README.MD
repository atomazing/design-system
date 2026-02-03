# @atomazing-org/design-system

Modern MUI v7 + Emotion design system with strongly differentiated visual presets, scheme-based light/dark tokens, SSR-safe theming, and persistence.

## Preview
![Design system preview](https://raw.githubusercontent.com/atomazing/design-system/master/preview.gif)

## Why use it

- **True light/dark themes**: each preset ships **two curated schemes** (`light` + `dark`), so backgrounds, cards, and text actually change (not just `palette.mode`).
- **Works out of the box**: includes ready-made presets you can use immediately.
- **Easy to extend**: bring your own presets, or combine defaults + custom.
- **Consistent UI**: global styles + MUI component overrides for predictable visuals.
- **Safe persistence**: remembers selected theme + dark mode with SSR-safe guards.

---


## Installation

Install the library:

```bash
npm install @atomazing-org/design-system
```

Install required peer dependencies (MUI v7 + Emotion):

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

Optional (only if your project uses Emotion `css` helpers):

```bash
npm install @emotion/css
```

---

## Quick start

Use built-in presets (recommended starting point):

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

Notes:
- `themes` can be **default presets**, **your presets**, or **both**.
- Theme choice + dark mode are persisted (storage key: `appSettings`).

---

## Built-in presets

Built-in presets are **ready-made theme packs shipped with the library**.  
You can use them as-is, or add your own presets alongside them.

| Preset | Stable id | Best for |
|---|---|---|
| Warm Earth | `warm-earth` | Warm and friendly apps |
| Editorial Classic | `editorial-classic` | Content-heavy UIs |
| Modern Minimal | `modern-minimal` | Dashboards and tooling |
| Neo Glass | `neo-glass` | Modern “glass” style UIs |
| Retro Terminal | `retro-terminal` | Terminal-inspired branding |

Import them from:

```ts
import { defaultThemes } from "@atomazing-org/design-system/presets";
```

## Switching theme (UI)

Build a simple theme switcher using the library’s theme settings hook.

```tsx
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useThemeSettings } from "@atomazing-org/design-system";
import { defaultThemes } from "@atomazing-org/design-system/presets";

export function ThemeSwitcher() {
  const { themeId, setThemeId } = useThemeSettings();

  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      value={themeId}
      onChange={(_, next) => next && setThemeId(next)}
    >
      {defaultThemes.map((t) => (
        <ToggleButton key={t.id} value={t.id}>
          {t.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
```

---

## Dark mode

Dark mode switches the active **scheme** inside the current preset.

### Supported values

- `light` — always use the preset’s light scheme
- `dark` — always use the preset’s dark scheme
- `system` — follow OS/browser preference (`prefers-color-scheme`)

### Why `system` exists

It’s the most common UX: the app automatically follows the user’s OS preference without custom code in every project.

### What about `auto`?

`auto` is a **legacy alias** of `system` kept for backward compatibility (e.g., older stored settings).  
Recommendation: show **System** in UI, but accept `auto` as input and normalize it to `system`.

Example selector:

```tsx
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useThemeSettings } from "@atomazing-org/design-system";

export function DarkModeSelector() {
  const { darkMode, setDarkMode } = useThemeSettings();

  return (
    <RadioGroup row value={darkMode} onChange={(e) => setDarkMode(e.target.value as any)}>
      <FormControlLabel value="system" control={<Radio />} label="System" />
      <FormControlLabel value="light" control={<Radio />} label="Light" />
      <FormControlLabel value="dark" control={<Radio />} label="Dark" />
    </RadioGroup>
  );
}
```

---

## Custom themes

Provide your own preset(s) to the provider. A preset is one identifiable theme with **two schemes**: `light` and `dark`.

### API reference — `ThemePreset`

| Field | Type | What it means |
|---|---|---|
| `id` | `string` | Stable identifier used for persistence and deduplication. Must be unique. |
| `label` | `string` | Name shown in UI selectors. |
| `colorSchemes.light` | `ThemeOptions` | MUI ThemeOptions for light mode. |
| `colorSchemes.dark` | `ThemeOptions` | MUI ThemeOptions for dark mode. |

### Minimum required tokens per scheme

Each scheme must define:
- `palette.background.default` — page background
- `palette.background.paper` — Card/Paper background
- `palette.text.primary`
- `palette.text.secondary`
- `palette.divider`

Example:

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

### Using defaults + custom presets

```ts
import { defaultThemes } from "@atomazing-org/design-system/presets";

const themes = [...defaultThemes, myPreset];
```

Then pass `themes` into `ThemeProviderWrapper`.

---

## Typography variants

The library adds extra typography variants (beyond MUI defaults) so your text styles are consistent across the app.

```tsx
import { Typography } from "@mui/material";

export function TypographyDemo() {
  return (
    <>
      <Typography variant="header_lg_bold">Page title</Typography>
      <Typography variant="text_md_regular">Body text</Typography>
      <Typography variant="text_sm_bold">Caption / label</Typography>
    </>
  );
}
```

Notes:
- Typography sizing is expected to be **rem-based** (scales with the user’s browser font size settings).
- Variants are defined in the design system theme (no local “one-off” styles needed).

---

## Global styles

`ThemeProviderWrapper` applies global styles (via Emotion) and MUI component defaults, so the app looks consistent immediately.

Set a custom font stack:

```tsx
import { ThemeProviderWrapper } from "@atomazing-org/design-system";

export function App() {
  return (
    <ThemeProviderWrapper fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif">
      {/* your app */}
    </ThemeProviderWrapper>
  );
}
```

---

## Animations

The library exports reusable keyframes so you can keep motion consistent.

```tsx
import styled from "@emotion/styled";
import { fadeIn } from "@atomazing-org/design-system";

const Panel = styled.div`
  animation: ${fadeIn} 240ms ease-in both;
`;

export function AnimatedPanel() {
  return <Panel>Content</Panel>;
}
```

---

## SSR notes

- The library is written to be **SSR-safe**: no `window`/`document`/`localStorage` access at module scope.
- If you use **system** dark mode, the effective mode is derived from `prefers-color-scheme` on the client.
- In Next.js, place the provider inside a client boundary (e.g., a component with `"use client"`), then wrap your app with `ThemeProviderWrapper`.

## Consumer alias guidance (optional)

Aliases are **optional**. They help you avoid long relative imports **inside your app**.

---

## Local development (repo)

From the repository root:

```bash
pnpm lint
pnpm build
pnpm test
pnpm -C examples/repro dev
```

---

## Peer dependencies

Make sure your app installs these (MUI v7 + Emotion):

- `react`
- `react-dom`
- `@mui/material`
- `@mui/icons-material` (optional, only if you use icons from MUI)
- `@emotion/react`
- `@emotion/styled`
- `@emotion/css` (optional)

---

## Troubleshooting

### Dark mode switches, but background/cards do not change
- Ensure your preset provides **both schemes**:
  - `colorSchemes.light.palette.background.default/paper`
  - `colorSchemes.dark.palette.background.default/paper`
- Avoid hardcoded colors in overrides. Use `theme.palette.*` tokens.

### Text is hard to read in dark mode
- Do not reuse light “ink” constants in dark mode.
- Check:
  - `palette.text.primary` vs `palette.background.default`
  - `palette.text.secondary` vs `palette.background.paper`

### I want to add my own presets
- Create a `ThemePreset` with `colorSchemes.light` and `colorSchemes.dark`.
- Combine with defaults: `const themes = [...defaultThemes, myPreset];`

## Examples (examples/repro)

The repo includes a runnable example app that demonstrates:
- preset switching
- dark mode switching
- background + card surfaces changing correctly
- token/debug view (if enabled in the example)

Run it from the repository root:

```bash
pnpm -C examples/repro dev
```

What to check in the UI:
- switching to **dark** changes the **page background** and **Card/Paper** background
- text stays readable on both backgrounds
- inputs, buttons, menus, and dialogs remain usable

---

## API reference — `ThemeProviderWrapper`

`ThemeProviderWrapper` wires MUI ThemeProvider, global styles, and persisted settings.

| Prop | Type | Default | What it does |
|---|---|---|---|
| `themes` | `ThemePreset[]` (or built-in `defaultThemes`) | `defaultThemes` | List of presets available to the user. |
| `fontFamily` | `string` | (theme default) | Optional global font stack for the whole app. |
| `children` | `ReactNode` | — | Your application tree. |

Minimal usage:

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

---

## Public exports (recommended imports)

Use only these stable entry points:

### Core API
```ts
import { ThemeProviderWrapper, useThemeSettings } from "@atomazing-org/design-system";
```

### Built-in presets
```ts
import { defaultThemes } from "@atomazing-org/design-system/presets";
```

Tip:
- Avoid deep imports from internal folders. They may change during refactors.

---

## Migration notes (if upgrading)

If you previously passed a single theme object or a legacy “theme list”:
1) Move your theme into a preset shape with **two schemes**:
   - `colorSchemes.light`
   - `colorSchemes.dark`
2) Ensure each scheme defines the required tokens:
   - `background.default`, `background.paper`
   - `text.primary`, `text.secondary`
   - `divider`
3) Pass presets into the provider:
   - `themes={[...defaultThemes, myPreset]}` or only `[myPreset]`

Goal:
- dark mode changes **real palette tokens**, so backgrounds/cards/text update together.

---

## License

MIT


