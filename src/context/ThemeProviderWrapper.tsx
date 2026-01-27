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

import type { ColorPaletteType } from "../models";
import type { ThemeOptions } from "@mui/material/styles";
import type { FC, PropsWithChildren } from "react";

export type Theme1 = ThemeOptions & { name?: string };
export type ThemeN = ThemeOptions & { name: string };

export type ThemesProp = [Theme1] | [ThemeN, ...ThemeN[]];

const DEFAULT_THEME_NAME = "Default";

const normalizeThemes = (
  input?: ThemesProp,
): (ThemeOptions & { name: string })[] => {
  if (!input || input.length === 0) return [{ name: DEFAULT_THEME_NAME }];

  if (input.length === 1) {
    const theme = input[0];
    const themeName =
      theme.name && theme.name.trim().length > 0
        ? theme.name
        : DEFAULT_THEME_NAME;
    return [
      {
        ...theme,
        name: themeName,
      },
    ];
  }

  for (const theme of input) {
    if (!("name" in theme) || !theme.name || theme.name.trim().length === 0) {
      throw new Error(
        "ThemeProviderWrapper: when providing multiple themes, each theme must include a non-empty `name`.",
      );
    }
  }

  return input as (ThemeOptions & { name: string })[];
};

type ThemeProviderWrapperProps = PropsWithChildren<{
  /** Optional font stack to apply across the app. */
  fontFamily?: string;
  /**
   * Optional dynamic list of themes.
   * Each theme is a full ThemeOptions object.
   */
  themes?: ThemesProp;
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

  const themesSource = useMemo(
    () => normalizeThemes(themesInput),
    [themesInput],
  );

  const selectedTheme = useMemo(
    () => themesSource.find((t) => t.name === theme) || themesSource[0],
    [theme, themesSource],
  );

  // Persist settings
  useEffect(() => {
    if (globalThis.window === undefined) return;
    try {
      globalThis.localStorage.setItem(
        "appSettings",
        JSON.stringify({ theme: selectedTheme.name, darkMode }),
      );
    } catch {
      /* empty */
    }
  }, [selectedTheme.name, darkMode]);

  const mode = useMemo(
    () => (isDarkMode(darkMode, systemTheme) ? "dark" : "light"),
    [darkMode, systemTheme],
  );

  const muiTheme = useMemo(() => {
    const { name, ...overrides } = selectedTheme;
    if (!name) {
      throw new Error(
        "ThemeProviderWrapper: selected theme must include a non-empty `name`.",
      );
    }
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
