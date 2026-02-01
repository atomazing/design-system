import { alpha } from "@mui/material/styles";

import type { Theme } from "@mui/material/styles";

type ThemeWithPalette = Pick<Theme, "palette">;

export interface SurfaceTokens {
  pageBg: string;
  surfaceBg: string;
  textPrimary: string;
  textSecondary: string;
  divider: string;
}

export const getSurfaceTokens = (theme: ThemeWithPalette): SurfaceTokens => ({
  pageBg: theme.palette.background.default,
  surfaceBg: theme.palette.background.paper,
  textPrimary: theme.palette.text.primary,
  textSecondary: theme.palette.text.secondary,
  divider: theme.palette.divider,
});

export const alphaText = (theme: ThemeWithPalette, opacity: number): string =>
  alpha(theme.palette.text.primary, opacity);
