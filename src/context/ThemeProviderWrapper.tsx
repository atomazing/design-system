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
}>;

export const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({
  children,
  fontFamily,
  primaryColor,
  themeConfigOverride,
  colorPaletteOverride,
}) => {
  const systemTheme = useSystemTheme();

  // Allow app to override system-wide color palette before theme creation
  setColorPaletteOverride(colorPaletteOverride);

  const [theme, setTheme] = useState<string>(() => {
    const stored = localStorage.getItem("appSettings");
    return stored ? JSON.parse(stored).theme || "system" : "system";
  });

  const [darkMode, setDarkMode] = useState<
    "light" | "dark" | "system" | "auto"
  >(() => {
    const stored = localStorage.getItem("appSettings");
    return stored ? JSON.parse(stored).darkMode || "auto" : "auto";
  });

  useEffect(() => {
    localStorage.setItem("appSettings", JSON.stringify({ theme, darkMode }));
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
    if (systemTheme === "unknown") return themesSource[0].MuiTheme;
    if (theme === "system") {
      return systemTheme === "dark"
        ? themesSource[0].MuiTheme
        : themesSource[0].MuiTheme;
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

  const muiTheme = useMemo(
    () => createCustomTheme(selectedTheme.palette.primary.main, mode),
    [selectedTheme, mode],
  );

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
