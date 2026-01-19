@atomazing-org/design-system

Modern MUI + Emotion design system with a ready theme factory, extended typography, global styles, component overrides, animations, and handy utilities.

Contents
- Introduction
- Installation
- Quick Start
- Provider Props
- Dynamic Themes (array)
- Theme Switching (UI)
- Dark Mode Control
- Extended Palette (4 variants)
- Palette Overrides
- Using Palette In SX
- Typography Variants
- Global Styles
- Animations
- Components
- Utilities
- SSR Notes
- Peer Dependencies

Introduction
The package streamlines consistent theming across apps: dark/light mode, typography variants, global styles, and component defaults. Built on MUI v7 + Emotion.

Installation
```bash
npm install @atomazing-org/design-system
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled @emotion/css
```

Quick Start
```tsx
import { ThemeProviderWrapper } from '@atomazing-org/design-system';

export function App() {
  return (
    <ThemeProviderWrapper>
      {/* your app */}
    </ThemeProviderWrapper>
  );
}
```

If `themes` is not provided, the provider falls back to a single "Default" theme using the current palette brand color.

Provider Props
- `themes?: ThemesProp` (single theme may omit `name`, multiple themes require `name`)
- `fontFamily?: string`
- `colorPaletteOverride?: Partial<ColorPaletteType>`
`ThemeOptions` is the MUI theme options type from `@mui/material/styles`.

Theme Names
Single theme can omit `name` (defaults to `"Default"`). Multiple themes require a non-empty `name` for each theme.

Before (single theme required a name):
```tsx
<ThemeProviderWrapper
  themes={[
    {
      name: 'Blue',
      palette: { primary: { main: '#3B82F6' } },
    },
  ]}
/>
```

After (single theme name omitted):
```tsx
<ThemeProviderWrapper
  themes={[
    {
      palette: { primary: { main: '#3B82F6' } },
    },
  ]}
/>
```

Multiple themes (name required):
```tsx
<ThemeProviderWrapper
  themes={[
    {
      name: 'BrandA',
      palette: { primary: { main: '#00A3FF' } },
    },
    {
      name: 'BrandB',
      palette: { primary: { main: '#10B981' } },
    },
  ]}
/>
```

Dynamic Themes (array)
Provide a fully dynamic list of `ThemeOptions` overrides. Names are required when supplying multiple themes. Provider-controlled `palette.mode` always wins.

Minimal example (primary color only):
```tsx
<ThemeProviderWrapper
  themes={[
    {
      name: 'Blue',
      palette: {
        primary: { main: '#3B82F6' },
      },
    },
  ]}
>
  {/* ... */}
</ThemeProviderWrapper>
```

Advanced example (palette + components overrides):
```tsx
<ThemeProviderWrapper
  themes={[
    {
      name: 'BrandA',
      palette: {
        primary: { main: '#00A3FF' },
        background: { default: '#F7FAFF', paper: '#FFFFFF' },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: { textTransform: 'none' },
          },
        },
      },
    },
  ]}
>
  {/* ... */}
</ThemeProviderWrapper>
```

Migration Notes (breaking)
- Legacy `themes` shape (`primaryColor`, `secondaryColor`, `background`) removed.
- `themeOverrides` prop removed.
- Use `themes: ThemesProp` for customization (single theme may omit `name`, multiple themes require `name`).

Theme Switching (UI)
Use the theme context to read and change the active theme.

```tsx
import { useThemeSettings } from '@atomazing-org/design-system';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export function ThemeToggle() {
  const { theme, setTheme } = useThemeSettings();
  const options = ['Blue', 'Green', 'Gray'];

  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      color="brand"
      value={theme}
      onChange={(_, v) => v && setTheme(v)}
    >
      {options.map((o) => (
        <ToggleButton key={o} value={o}>{o}</ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
```

Dark Mode Control
Use `useThemeSettings()` to read and set dark mode. Modes: `light | dark | system | auto`.

```tsx
import { useThemeSettings, darkModeOptions } from '@atomazing-org/design-system';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

export function DarkModeSelector() {
  const { darkMode, setDarkMode } = useThemeSettings();
  const options = darkModeOptions; // label + icon

  return (
    <RadioGroup
      row
      value={darkMode}
      onChange={(e) => setDarkMode(e.target.value as any)}
    >
      {options.map((o) => (
        <FormControlLabel key={o.value} value={o.value} control={<Radio />} label={o.label} />
      ))}
    </RadioGroup>
  );
}
```

Extended Palette (4 variants)
The design system adds four typed colors to the MUI palette, available on common components via the `color` prop:

- brand: project brand color (uses the active theme `primary`).
- neutral: neutral/gray scale color (from the design-system palette).
- accent: supporting accent color (from palette `accent`).
- muted: soft/desaturated color (based on neutral by default).

Supported components: `Button`, `Chip`, `Badge`, `Alert`.

```tsx
import { Button, Chip, Alert } from '@mui/material';

<Button color="brand" variant="contained">Brand</Button>
<Button color="neutral" variant="outlined">Neutral</Button>
<Chip color="accent" label="Accent" />
<Alert color="muted" variant="filled">Muted Alert</Alert>
```

Palette Overrides
Override base palette tokens for the whole app.

```tsx
<ThemeProviderWrapper
  colorPaletteOverride={{
    brand: '#4F46E5',
    accent: '#F59E0B',
    muted: '#94A3B8',
    neutral: '#64748B',
    success: '#16A34A',
    warning: '#D97706',
    error: '#DC2626',
    info: '#0284C7',
  }}
>
  {/* ... */}
</ThemeProviderWrapper>
```

Using Palette In SX
```tsx
import { Box } from '@mui/material';

<Box sx={{ bgcolor: (t) => t.palette.accent.main, color: (t) => t.palette.getContrastText(t.palette.accent.main) }}>
  Accent surface
</Box>
```

Typography Variants
Extra variants are available (mapping to `<p>`/headers). Examples:

```tsx
import { Typography } from '@mui/material';

<Typography variant="text_md_regular">Body text</Typography>
<Typography variant="text_sm_bold">Strong caption</Typography>
<Typography variant="header_lg_bold">Section Title</Typography>
<Typography variant="header_md_semibold">Semibold Heading</Typography>
```

Global Styles
`ThemeProviderWrapper` injects global styles via Emotion. You can also set a custom font family:

```tsx
<ThemeProviderWrapper fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif">
  {/* ... */}
</ThemeProviderWrapper>
```

Animations
Keyframes ready for use in Emotion/MUI `sx`:

```tsx
import { keyframes } from '@emotion/react';
import { fadeIn, slideIn, scale, pulseAnimation, progressPulse } from '@atomazing-org/design-system';
import styled from '@emotion/styled';

const Card = styled.div`
  animation: ${fadeIn} 300ms ease-in both;
`;

const Glowing = styled.div`
  animation: ${progressPulse('#9FA9EA')} 2s ease-in-out infinite;
`;
```

Components
- ErrorBoundary
```tsx
import { ErrorBoundary } from '@atomazing-org/design-system';

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

- Loading
```tsx
import { Loading } from '@atomazing-org/design-system';

<Loading />
```

- PathName / DialogBtn
```tsx
import { PathName, DialogBtn } from '@atomazing-org/design-system';

<PathName>/settings/profile</PathName>
<DialogBtn variant="contained" color="brand">OK</DialogBtn>
```

Utilities
```tsx
import {
  getFontColor, isFontLight, isHexColor,
  timeAgo, timeAgoFromStart,
  useResponsiveDisplay, useSystemTheme,
  displayGreeting, getDayIdentifier,
  systemInfo,
} from '@atomazing-org/design-system';

// Colors
getFontColor('#ffffff'); // '#101727' | '#f0f0f0'
isFontLight('#222');
isHexColor('#abc');

// Time
timeAgo(new Date(Date.now() - 3600_000));
timeAgoFromStart(new Date(Date.now() + 90_000));

// Device
const isMobile = useResponsiveDisplay(768);
const sysTheme = useSystemTheme(); // 'light' | 'dark' | 'unknown'

// Misc
displayGreeting(); // Good morning / afternoon / evening
getDayIdentifier(new Date()); // 'YYYY-MM-DD'
console.log(systemInfo.os, systemInfo.browser);
```

SSR Notes
- The library guards `localStorage`/`navigator`. Use normally in SSR apps; hydration updates settings on client.
- For Next.js, place the provider in a client boundary (e.g., `layout.tsx` with `"use client"`).

Peer Dependencies
- `@mui/material` ^7
- `@mui/icons-material` ^7
- `@emotion/react` ^11
- `@emotion/styled` ^11
- `@emotion/css` ^11 (optional)
