import { useMemo, useState, useEffect } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import {
  themes,
  createCustomTheme,
  GlobalStyles,
  setColorPaletteOverride,
} from "../styles";
import { isDarkMode, useSystemTheme } from "../utils";

import { ThemeContext } from "./ThemeContext";

import type { ColorPaletteType } from "../models";
import type { FC, PropsWithChildren } from "react";

type ThemeProviderWrapperProps = PropsWithChildren<{
  /** Optional font stack to apply across the app. */
  fontFamily?: string;
  /** Optional direct override for a single theme primary color. */
  primaryColor?: string;
  /** Optional map to override default themeConfig with custom themes. */
  themeConfigOverride?: Record<
    string,
    { primaryColor: string; secondaryColor?: string }
  >;
  /** Optional color palette override (e.g., fontLight/fontDark/accent colors). */
  colorPaletteOverride?: Partial<ColorPaletteType>;
  /** Optional registry of ad-hoc colors to inject into theme.palette.custom */
  customColors?: Record<string, string>;
}>;

export const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({
  children,
  fontFamily,
  primaryColor,
  themeConfigOverride,
  colorPaletteOverride,
  customColors,
}) => {
  const systemTheme = useSystemTheme();

  // Apply palette overrides when provided (no-op otherwise)
  useEffect(() => {
    setColorPaletteOverride(colorPaletteOverride);
  }, [colorPaletteOverride]);

  // SSR-safe initial settings
  const [theme, setTheme] = useState<string>("system");
  const [darkMode, setDarkMode] = useState<
    "light" | "dark" | "system" | "auto"
  >("auto");

  // Hydrate from localStorage on client
  useEffect(() => {
    if (globalThis.window === undefined) return;
    try {
      const storedRaw = globalThis.localStorage.getItem("appSettings");
      if (storedRaw) {
        const stored = JSON.parse(storedRaw);
        if (stored.theme) setTheme(stored.theme);
        if (stored.darkMode) setDarkMode(stored.darkMode);
      }
    } catch {
      /* empty */
    }
  }, []);

  // Persist settings
  useEffect(() => {
    if (globalThis.window === undefined) return;
    try {
      globalThis.localStorage.setItem(
        "appSettings",
        JSON.stringify({ theme, darkMode }),
      );
    } catch {
      /* empty */
    }
  }, [theme, darkMode]);

  const themesSource = useMemo(() => {
    if (themeConfigOverride && Object.keys(themeConfigOverride).length > 0) {
      return Object.entries(themeConfigOverride).map(([name, cfg]) => ({
        name,
        MuiTheme: createCustomTheme(cfg.primaryColor),
      }));
    }
    if (primaryColor) {
      return [
        {
          name: "Custom",
          MuiTheme: createCustomTheme(primaryColor),
        },
      ];
    }
    return themes;
  }, [themeConfigOverride, primaryColor]);

  const selectedTheme = useMemo(() => {
    if (theme === "system" || systemTheme === "unknown") {
      return themesSource[0].MuiTheme;
    }
    return (
      themesSource.find((t) => t.name === theme)?.MuiTheme ||
      themesSource[0].MuiTheme
    );
  }, [systemTheme, theme, themesSource]);

  const mode = useMemo(
    () => (isDarkMode(darkMode, systemTheme) ? "dark" : "light"),
    [darkMode, systemTheme],
  );

  const muiTheme = useMemo(() => {
    const secondary = (selectedTheme.palette as any)?.secondary?.main as
      | string
      | undefined;
    return createCustomTheme(
      selectedTheme.palette.primary.main,
      mode,
      secondary,
    );
  }, [selectedTheme, mode]);

  const finalMuiTheme = useMemo(() => {
    if (!customColors || Object.keys(customColors).length === 0)
      return muiTheme;
    const cloned = {
      ...muiTheme,
      palette: { ...muiTheme.palette },
    } as typeof muiTheme;
    const custom: Record<string, any> = {};
    for (const [name, main] of Object.entries(customColors)) {
      custom[name] = cloned.palette.augmentColor({ color: { main } });
    }
    cloned.palette.custom = custom;
    return cloned;
  }, [muiTheme, customColors]);

  const emotionTheme = useMemo(() => ({ darkMode: mode === "dark" }), [mode]);

  return (
    <ThemeContext.Provider value={{ theme, darkMode, setTheme, setDarkMode }}>
      <MuiThemeProvider theme={finalMuiTheme}>
        <EmotionThemeProvider theme={emotionTheme}>
          <GlobalStyles fontFamily={fontFamily} />
          {children}
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
