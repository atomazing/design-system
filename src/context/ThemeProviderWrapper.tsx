// src/context/ThemeProvider.tsx
import { useMemo, useState, useEffect } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { themes, createCustomTheme, isDarkMode, GlobalStyles } from "../styles";
import { useSystemTheme } from "../utils";

import { ThemeContext } from "./ThemeContext";

import type { FC, PropsWithChildren } from "react";

export const ThemeProviderWrapper: FC<PropsWithChildren> = ({ children }) => {
  const systemTheme = useSystemTheme();

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

  const selectedTheme = useMemo(() => {
    if (systemTheme === "unknown") return themes[0].MuiTheme;
    if (theme === "system") {
      return systemTheme === "dark" ? themes[0].MuiTheme : themes[0].MuiTheme;
    }
    return themes.find((t) => t.name === theme)?.MuiTheme || themes[0].MuiTheme;
  }, [systemTheme, theme]);

  const mode = useMemo(
    () => (isDarkMode(darkMode, systemTheme) ? "dark" : "light"),
    [darkMode, systemTheme, selectedTheme],
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
          <GlobalStyles />
          {children}
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
