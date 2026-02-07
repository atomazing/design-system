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
import type { DarkModeOptions } from "@/models";
import type { FC, PropsWithChildren } from "react";

type ThemeProviderWrapperProps = PropsWithChildren<{
  /** Optional font stack to apply across the app. */
  fontFamily?: string;
  /**
   * Optional list of theme presets.
   * Accepts only `ThemePreset[]`.
   */
  themes?: ThemesInput;
  /**
   * Forces dark mode regardless of persisted settings and system preference.
   * When set, `setDarkMode` becomes a no-op.
   */
  darkMode?: DarkModeOptions;
}>;

export const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({
  children,
  fontFamily,
  themes,
  darkMode: darkModeProp,
}) => {
  const systemTheme = useSystemTheme();
  const {
    theme,
    setTheme,
    darkMode: persistedDarkMode,
    setDarkMode: setPersistedDarkMode,
    themesSource,
    selectedTheme,
    selectedPreset,
  } = usePersistedAppSettings({ themes, defaultDarkMode: darkModeProp });

  const darkMode = darkModeProp ?? persistedDarkMode;
  const setDarkMode = useMemo(
    () => (darkModeProp ? () => {} : setPersistedDarkMode),
    [darkModeProp, setPersistedDarkMode],
  );

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
