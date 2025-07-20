import { createTheme } from "@mui/material";

import { getFontColor } from "./colorUtils";
import { commonComponentProps } from "./commonComponents";
import { ColorPalette, themeConfig } from "./themeConfig";
import { muiTypography, typographyVariants } from "./typography";

import type { AppSettings, SystemTheme } from "../models";
import type { PaletteMode, Theme } from "@mui/material";

export const createCustomTheme = (
  primaryColor: string,
  backgroundColor = "#232e58",
  mode: PaletteMode = "dark",
): Theme =>
  createTheme({
    palette: {
      primary: { main: primaryColor },
      secondary: { main: backgroundColor },
      warning: {
        main: mode === "dark" ? ColorPalette.orange : ColorPalette.orangeDark,
      },
      error: { main: ColorPalette.red },
      mode,
    },
    components: {
      ...commonComponentProps,
      MuiTypography: muiTypography,
    },
    typography: typographyVariants,
    shape: { borderRadius: 24 },
  });

/**
 * A predefined list of named themes based on the `themeConfig` definition.
 */
export const themes: { name: string; MuiTheme: Theme }[] = Object.entries(
  themeConfig,
).map(([name, config]) => ({
  name,
  MuiTheme: createCustomTheme(config.primaryColor, config.secondaryColor),
}));

/**
 * Determines whether dark mode should be enabled based on user settings and system conditions.
 *
 * @param darkMode - User preference: 'light' | 'dark' | 'system' | 'auto'.
 * @param systemTheme - Detected OS-level theme: 'light' | 'dark'.
 * @param backgroundColor - The background color to assess contrast in 'auto' mode.
 * @returns True if dark mode should be used.
 */
export const isDarkMode = (
  darkMode: AppSettings["darkMode"],
  systemTheme: SystemTheme,
  backgroundColor: string,
): boolean => {
  switch (darkMode) {
    case "light": {
      return false;
    }
    case "dark": {
      return true;
    }
    case "system": {
      return systemTheme === "dark";
    }
    case "auto": {
      return getFontColor(backgroundColor) === ColorPalette.fontLight;
    }
    default: {
      return false;
    }
  }
};
