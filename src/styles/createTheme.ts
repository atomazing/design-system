import { createTheme } from "@mui/material";

import type { PaletteMode, Theme, ThemeOptions } from "@mui/material";

export const createCustomTheme = (
  mode: PaletteMode = "light",
  customTheme?: ThemeOptions,
): Theme => {
  const base = createTheme({ palette: { mode } });

  return createTheme(base, customTheme ?? {});
};
