import { useMemo } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { createCustomTheme, GlobalStyles } from "../styles";
import { isDarkMode, useSystemTheme } from "../utils";

import { ThemeContext } from "./ThemeContext";
import { usePersistedAppSettings } from "./usePersistedAppSettings";

import type { ThemesProp } from "./themeTypes";
import type { FC, PropsWithChildren } from "react";

type ThemeProviderWrapperProps = PropsWithChildren<{
  /** Optional font stack to apply across the app. */
  fontFamily?: string;
  /**
   * Optional dynamic list of themes.
   * Each theme is a full ThemeOptions object.
   */
  themes?: ThemesProp;
}>;

export const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({
  children,
  fontFamily,
  themes,
}) => {
  const systemTheme = useSystemTheme();
  const { theme, setTheme, darkMode, setDarkMode, selectedTheme } =
    usePersistedAppSettings({ themes });

  const mode = useMemo(
    () => (isDarkMode(darkMode, systemTheme) ? "dark" : "light"),
    [darkMode, systemTheme],
  );

  const muiTheme = useMemo(() => {
    const { name, ...customTheme } = selectedTheme;
    if (!name) {
      throw new Error(
        "ThemeProviderWrapper: selected theme must include a non-empty `name`.",
      );
    }
    return createCustomTheme(mode, customTheme);
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
