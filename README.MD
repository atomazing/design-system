@atomazing-org/design-system

Modern MUI + Emotion design system with a ready theme factory, extended typography, global styles, component overrides, animations, and handy utilities.

Contents
- Introduction
- Installation
- Quick Start
- Extended Palette (4 variants)
- Ad‑hoc Custom Colors
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

Extended Palette (4 variants)
The design system adds four typed colors to the MUI palette, available on common components via the `color` prop:

- brand: project brand color (independent from `primary`); defaults to the currently selected theme’s primary.
- neutral: neutral/gray scale color (from the design-system palette).
- accent: supporting accent color (from palette `accent`).
- muted: soft/desaturated color (based on neutral by default).

Supported components (out of the box): `Button`, `Chip`, `Badge`, `Alert`.

Examples
```tsx
import { Button, Chip, Alert } from '@mui/material';

<Button color="brand" variant="contained">Brand</Button>
<Button color="neutral" variant="outlined">Neutral</Button>
<Chip color="accent" label="Accent" />
<Alert color="muted" variant="filled">Muted Alert</Alert>
```

Ad‑hoc Custom Colors
If you need additional colors without extending types, use `customColors`. They will be available under `theme.palette.custom[<name>]` with generated light/dark/contrast shades.

```tsx
<ThemeProviderWrapper customColors={{ marketing: '#FF6A00', accent2: '#4ADE80' }}>
  {/* ... */}
</ThemeProviderWrapper>

// Usage
import { Box } from '@mui/material';

<Box sx={{ bgcolor: (t) => t.palette.custom?.marketing.main }} />
```

Notes
- To add more typed colors to the `color` prop, augment MUI types (see `src/styles/muiAugmentations.d.ts`).
- You can override the global color palette via `colorPaletteOverride` and theme map via `themeConfigOverride`.

SSR Notes
- The library guards `localStorage`/`navigator` usage. Wrap your app in `<ThemeProviderWrapper>` as usual in SSR frameworks; settings hydrate on the client.

Peer Dependencies
- `@mui/material` ^7
- `@mui/icons-material` ^7
- `@emotion/react` ^11
- `@emotion/styled` ^11
- `@emotion/css` ^11 (optional)
