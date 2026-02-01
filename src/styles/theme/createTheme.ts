import { createTheme } from "@mui/material/styles";

import type { ThemeModeBackground } from "@/models";
import type { PaletteMode, Theme, ThemeOptions } from "@mui/material/styles";

type ThemeInput = ThemeOptions & {
  background?: ThemeModeBackground;
};

export const buildMuiTheme = (
  options: ThemeInput,
  mode: PaletteMode,
): Theme => {
  const { background, palette, ...rest } = options;
  const resolvedBackground = background?.[mode];

  const paletteWithMode: ThemeOptions["palette"] = {
    ...palette,
    mode,
  };

  if (resolvedBackground || palette?.background) {
    paletteWithMode.background = {
      ...palette?.background,
      ...resolvedBackground,
    };
  }

  return createTheme({
    ...rest,
    palette: paletteWithMode,
  });
};
