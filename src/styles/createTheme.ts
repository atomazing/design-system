import { createTheme } from "@mui/material";

import { commonComponentProps } from "./commonComponents";
import { ColorPalette, themeConfig } from "./themeConfig";
import { muiTypography, typographyVariants } from "./typography";

import type { AppSettings, SystemTheme } from "../models";
import type { PaletteMode, Theme } from "@mui/material";

export const createCustomTheme = (
  primaryColor: string,
  mode: PaletteMode = "dark",
): Theme => {
  const isDark = mode === "dark";

  // 1) БАЗА MUI по выбранному режиму — даёт корректные text, action, grey и т.д.
  const base = createTheme({
    palette: { mode },
  });

  // 2) ТОЧЕЧНЫЕ ОВЕРРАЙДЫ поверх базы
  return createTheme(base, {
    palette: {
      primary: { ...base.palette.primary, main: primaryColor },
      error: { ...base.palette.error, main: ColorPalette.carrot },
      warning: { ...base.palette.warning, main: ColorPalette.carrot },

      background: isDark
        ? { ...base.palette.background, default: "#1C1C1E", paper: "#2C2C2E" }
        : { ...base.palette.background, default: "#F2F2F7", paper: "#FFFFFF" },

      divider: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
    },

    // Остальные ваши настройки — без изменений
    components: {
      ...commonComponentProps,
      MuiTypography: muiTypography,
    },
    typography: typographyVariants,
    shape: { borderRadius: 24 },
  });
};

/**
 * A predefined list of named themes based on the `themeConfig` definition.
 */
export const themes: { name: string; MuiTheme: Theme }[] = Object.entries(
  themeConfig,
).map(([name, config]) => ({
  name,
  MuiTheme: createCustomTheme(config.primaryColor),
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
    default: {
      return false;
    }
  }
};
