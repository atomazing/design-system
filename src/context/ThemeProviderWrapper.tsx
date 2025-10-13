import { useMemo, useState, useEffect } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import {
  createCustomTheme,
  GlobalStyles,
  setColorPaletteOverride,
  getColorPalette,
} from "../styles";
import { isDarkMode, useSystemTheme } from "../utils";

import { ThemeContext } from "./ThemeContext";

import type { ColorPaletteType } from "../models";
import type { FC, PropsWithChildren } from "react";

type ThemeProviderWrapperProps = PropsWithChildren<{
  /** Optional font stack to apply across the app. */
  fontFamily?: string;
  /**
   * Optional dynamic list of themes.
   * Takes precedence over static defaults when provided.
   */
  themes?: {
    name: string;
    primaryColor: string;
    secondaryColor?: string;
    background?: {
      light?: { default?: string; paper?: string };
      dark?: { default?: string; paper?: string };
    };
  }[];
  /** Optional color palette override (e.g., fontLight/fontDark/accent colors). */
  colorPaletteOverride?: Partial<ColorPaletteType>;
}>;

export const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({
  children,
  fontFamily,
  themes: themesInput,
  colorPaletteOverride,
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
    if (themesInput && themesInput.length > 0) {
      return themesInput;
    }
    // Fallback: single default theme based on palette brand
    const defaultPrimary = getColorPalette().brand;
    return [
      {
        name: "Default",
        primaryColor: defaultPrimary,
      },
    ];
  }, [themesInput]);

  const selectedTheme = useMemo(() => {
    if (theme === "system" || systemTheme === "unknown") {
      return themesSource[0];
    }
    return themesSource.find((t) => t.name === theme) || themesSource[0];
  }, [systemTheme, theme, themesSource]);

  const mode = useMemo(
    () => (isDarkMode(darkMode, systemTheme) ? "dark" : "light"),
    [darkMode, systemTheme],
  );

  const muiTheme = useMemo(() => {
    const bg = selectedTheme.background?.[mode];
    return createCustomTheme(
      selectedTheme.primaryColor,
      mode,
      selectedTheme.secondaryColor,
      bg,
    );
  }, [selectedTheme, mode]);

  const emotionTheme = useMemo(() => ({ darkMode: mode === "dark" }), [mode]);

  return (
    <ThemeContext.Provider value={{ theme, darkMode, setTheme, setDarkMode }}>
      <MuiThemeProvider theme={muiTheme}>
        <EmotionThemeProvider theme={emotionTheme}>
          <GlobalStyles fontFamily={fontFamily} />
          {children}
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
