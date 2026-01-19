import { createTheme } from "@mui/material";

import { commonComponentProps } from "./commonComponents";
import { getColorPalette } from "./themeConfig";
import { muiTypography, typographyVariants } from "./typography";

import type { PaletteMode, Theme, ThemeOptions } from "@mui/material";

export const createCustomTheme = (
  mode: PaletteMode = "light",
  overrides?: ThemeOptions,
): Theme => {
  const isDark = mode === "dark";

  // 1) БАЗА MUI по выбранному режиму — даёт корректные text, action, grey и т.д.
  const base = createTheme({
    palette: { mode },
  });

  // 2) ТОЧЕЧНЫЕ ОВЕРРАЙДЫ поверх базы
  const paletteTokens = getColorPalette();
  const defaultPrimary = paletteTokens.brand;
  const designSystemTheme: ThemeOptions = {
    palette: {
      primary: { ...base.palette.primary, main: defaultPrimary },
      // Brand follows active theme primary
      brand: base.palette.augmentColor({ color: { main: defaultPrimary } }),
      neutral: base.palette.augmentColor({
        color: { main: paletteTokens.neutral },
      }),
      accent: base.palette.augmentColor({
        color: { main: paletteTokens.accent },
      }),
      muted: base.palette.augmentColor({
        color: { main: paletteTokens.muted },
      }),
      error: { ...base.palette.error, main: paletteTokens.error },
      warning: { ...base.palette.warning, main: paletteTokens.warning },
      success: { ...base.palette.success, main: paletteTokens.success },
      info: { ...base.palette.info, main: paletteTokens.info },

      background: (() => {
        const baseBg = isDark
          ? { default: "#1C1C1E", paper: "#2C2C2E" }
          : { default: "#F2F2F7", paper: "#FFFFFF" };
        return { ...base.palette.background, ...baseBg };
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
  const merged = createTheme(base, designSystemTheme, overrides ?? {});
  const primaryMain = merged.palette.primary.main;

  return createTheme(merged, {
    palette: {
      mode,
      brand: merged.palette.augmentColor({ color: { main: primaryMain } }),
    },
  });
};

/**
 * A predefined list of named themes based on the `themeConfig` definition.
 */
// No static theme list export — themes are provided dynamically via ThemeProviderWrapper.
