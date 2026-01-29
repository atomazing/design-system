import { useEffect, useMemo, useState } from "react";

import { normalizeThemes } from "./helper";

import type { DarkModeOptions } from "../models";
import type { ThemeN, ThemesProp } from "./themeTypes";

const APP_SETTINGS_KEY = "appSettings";

export const usePersistedAppSettings = ({
  themes,
}: {
  themes?: ThemesProp;
}): {
  theme: string;
  setTheme: (theme: string) => void;
  darkMode: DarkModeOptions;
  setDarkMode: (mode: DarkModeOptions) => void;
  themesSource: ThemeN[];
  selectedTheme: ThemeN;
} => {
  const [theme, setTheme] = useState<string>("system");
  const [darkMode, setDarkMode] = useState<DarkModeOptions>("auto");
  const [isHydrated, setIsHydrated] = useState(false);

  const themesSource = useMemo(() => normalizeThemes(themes), [themes]);

  const selectedTheme = useMemo(
    () => themesSource.find((t) => t.name === theme) || themesSource[0],
    [theme, themesSource],
  );

  // Hydrate from localStorage on client
  useEffect(() => {
    if (globalThis.window === undefined) return;
    try {
      const storedRaw = globalThis.localStorage.getItem(APP_SETTINGS_KEY);
      if (storedRaw) {
        const stored = JSON.parse(storedRaw) as Partial<{
          theme: string;
          darkMode: DarkModeOptions;
        }>;
        if (stored.theme) setTheme(stored.theme);
        if (stored.darkMode) setDarkMode(stored.darkMode);
      }
    } catch {
      /* empty */
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist settings
  useEffect(() => {
    if (globalThis.window === undefined) return;
    if (!isHydrated) return;
    try {
      globalThis.localStorage.setItem(
        APP_SETTINGS_KEY,
        JSON.stringify({ theme, darkMode }),
      );
    } catch {
      /* empty */
    }
  }, [isHydrated, theme, darkMode]);

  return {
    theme,
    setTheme,
    darkMode,
    setDarkMode,
    themesSource,
    selectedTheme,
  };
};
