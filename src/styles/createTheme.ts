import { createTheme } from "@mui/material";

import { commonComponentProps } from "./commonComponents";
import { getColorPalette, themeConfig } from "./themeConfig";
import { muiTypography, typographyVariants } from "./typography";

import type { PaletteMode, Theme } from "@mui/material";

export const createCustomTheme = (
  primaryColor: string,
  mode: PaletteMode = "light",
  secondaryColor?: string,
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
      brand: base.palette.augmentColor({
        color: { main: getColorPalette().brand },
      }),
      neutral: base.palette.augmentColor({
        color: { main: getColorPalette().neutral },
      }),
      accent: base.palette.augmentColor({
        color: { main: getColorPalette().accent },
      }),
      muted: base.palette.augmentColor({
        color: { main: getColorPalette().muted },
      }),
      ...(secondaryColor
        ? { secondary: { ...base.palette.secondary, main: secondaryColor } }
        : {}),
      error: { ...base.palette.error, main: getColorPalette().error },
      warning: { ...base.palette.warning, main: getColorPalette().warning },
      success: { ...base.palette.success, main: getColorPalette().success },
      info: { ...base.palette.info, main: getColorPalette().info },

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
    typography: {
      ...typographyVariants,
      // Let application control font via CSS variable; default to Mulish stack
      fontFamily:
        'var(--app-font-family, "Mulish", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif)',
    } as any,
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
  MuiTheme: createCustomTheme(
    config.primaryColor,
    "light",
    config.secondaryColor,
  ),
}));
