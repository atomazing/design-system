import { useMemo } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import {
  ThemeContext,
  resolveDefaultThemeName,
  usePersistedAppSettings,
} from "@/context/settings";
import {
  GlobalStyles,
  buildMuiTheme,
  resolveEffectiveMode,
  selectThemeOptions,
} from "@/styles";
import { useSystemTheme } from "@/utils";

import type { ThemesInput } from "@/context/settings";
import type { FC, PropsWithChildren } from "react";

type ThemeProviderWrapperProps = PropsWithChildren<{
  /** Optional font stack to apply across the app. */
  fontFamily?: string;
  /**
   * Optional dynamic list of themes.
   * Each theme is a full ThemeOptions object.
   */
  themes?: ThemesInput;
}>;

export const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({
  children,
  fontFamily,
  themes,
}) => {
  const systemTheme = useSystemTheme();
  const {
    theme,
    setTheme,
    darkMode,
    setDarkMode,
    themesSource,
    selectedTheme,
    selectedPreset,
  } = usePersistedAppSettings({ themes });

  const effectiveMode = useMemo(
    () => resolveEffectiveMode(darkMode, systemTheme),
    [darkMode, systemTheme],
  );
  const selectedOptions = useMemo(
    () => selectThemeOptions(selectedPreset, effectiveMode),
    [selectedPreset, effectiveMode],
  );

  const muiTheme = useMemo(
    () => buildMuiTheme(selectedOptions, effectiveMode),
    [selectedOptions, effectiveMode],
  );

  const defaultThemeName = useMemo(
    () => resolveDefaultThemeName(themesSource),
    [themesSource],
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        darkMode,
        setTheme,
        setDarkMode,
        themes: themesSource,
        selectedTheme,
        defaultThemeName,
      }}
    >
      <MuiThemeProvider theme={muiTheme}>
        <GlobalStyles fontFamily={fontFamily} />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
