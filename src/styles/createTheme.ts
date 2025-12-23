import { createTheme } from "@mui/material";

import { commonComponentProps } from "./commonComponents";
import { getColorPalette } from "./themeConfig";
import { muiTypography, typographyVariants } from "./typography";

import type { PaletteMode, Theme, ThemeOptions } from "@mui/material";


export const createCustomTheme = (
  primaryColor: string,
  mode: PaletteMode = "light",
  secondaryColor?: string,
  background?: { default?: string; paper?: string },
  themeOverrides?: ThemeOptions,
): Theme => {
  const isDark = mode === "dark";

  // 1) БАЗА MUI по выбранному режиму — даёт корректные text, action, grey и т.д.
  const base = createTheme({
    palette: { mode },
  });

  // 2) ТОЧЕЧНЫЕ ОВЕРРАЙДЫ поверх базы
  const designSystemTheme: ThemeOptions = {
    palette: {
      primary: { ...base.palette.primary, main: primaryColor },
      // Brand follows active theme primary
      brand: base.palette.augmentColor({ color: { main: primaryColor } }),
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

      background: (() => {
        const baseBg = isDark
          ? { default: "#1C1C1E", paper: "#2C2C2E" }
          : { default: "#F2F2F7", paper: "#FFFFFF" };
        return { ...base.palette.background, ...baseBg, ...background };
      })(),

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
  };

  // 3) ПРИМЕНЕНИЕ ПЕРЕОПРЕДЕЛЕНИЙ ОТ ВНЕШНИХ ПОТРЕБИТЕЛЕЙ
  // Переопределения применяются поверх дизайн-системы, позволяя полностью перезаписать любые стили
  return createTheme(base, designSystemTheme, themeOverrides ?? {});
};

/**
 * A predefined list of named themes based on the `themeConfig` definition.
 */
// No static theme list export — themes are provided dynamically via ThemeProviderWrapper.
