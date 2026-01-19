import { useMemo, useState, useEffect } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import {
  createCustomTheme,
  GlobalStyles,
  setColorPaletteOverride,
} from "../styles";
import { isDarkMode, useSystemTheme } from "../utils";

import { ThemeContext } from "./ThemeContext";

import type { ColorPaletteType, NamedThemeOptions } from "../models";
import type { ThemeOptions } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

type ThemeProviderWrapperProps = PropsWithChildren<{
  /** Optional font stack to apply across the app. */
  fontFamily?: string;
  /**
   * Optional dynamic list of themes.
   * Each theme is a full ThemeOptions object with a required name.
   */
  themes?: NamedThemeOptions[];
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
    return [{ name: "Default" }];
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
    const overrides: ThemeOptions = { ...selectedTheme };
    delete (overrides as { name?: string }).name;
    return createCustomTheme(mode, overrides);
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
