import { useEffect, useMemo, useState } from "react";

import { normalizeThemesInput } from "@/utils/normalizeThemes";
import {
  APP_SETTINGS_VERSION,
  readAppSettings,
  writeAppSettings,
} from "@/utils/storage";

import { resolveDarkMode, resolveThemeName } from "./helper";

import type { ThemesInput } from "./themeTypes";
import type { DarkModeOptions, NamedThemeOptions } from "@/models";
import type { NormalizedPreset } from "@/models/themePresets";

const DEFAULT_DARK_MODE: DarkModeOptions = "system";

export const usePersistedAppSettings = ({
  themes,
}: {
  themes?: ThemesInput;
}): {
  theme: string;
  setTheme: (theme: string) => void;
  darkMode: DarkModeOptions;
  setDarkMode: (mode: DarkModeOptions) => void;
  presetsSource: NormalizedPreset[];
  selectedPreset: NormalizedPreset;
  themesSource: NamedThemeOptions[];
  selectedTheme: NamedThemeOptions;
} => {
  const presetsSource = useMemo(() => normalizeThemesInput(themes), [themes]);
  const themesSource = useMemo(
    () =>
      presetsSource.map((preset) => ({
        name: preset.id,
        ...preset.colorSchemes.light,
      })),
    [presetsSource],
  );
  const [theme, setTheme] = useState<string>(() =>
    resolveThemeName(undefined, themesSource),
  );
  const [darkMode, setDarkMode] = useState<DarkModeOptions>(DEFAULT_DARK_MODE);
  const [isHydrated, setIsHydrated] = useState(false);

  const selectedPreset = useMemo(
    () =>
      presetsSource.find((preset) => preset.id === theme) || presetsSource[0],
    [theme, presetsSource],
  );
  const selectedTheme = useMemo(
    () => themesSource.find((t) => t.name === theme) || themesSource[0],
    [theme, themesSource],
  );

  // Hydrate from localStorage on client
  useEffect(() => {
    if (isHydrated) return;
    const stored = readAppSettings();
    setTheme(resolveThemeName(stored?.themeId, themesSource));
    setDarkMode(resolveDarkMode(stored?.darkMode, DEFAULT_DARK_MODE));
    setIsHydrated(true);
  }, [isHydrated, themesSource]);

  useEffect(() => {
    const resolvedTheme = resolveThemeName(theme, themesSource);
    if (resolvedTheme !== theme) {
      setTheme(resolvedTheme);
    }
  }, [theme, themesSource]);

  // Persist settings
  useEffect(() => {
    if (!isHydrated) return;
    writeAppSettings({
      version: APP_SETTINGS_VERSION,
      themeId: theme,
      darkMode,
    });
  }, [isHydrated, theme, darkMode]);

  return {
    theme,
    setTheme,
    darkMode,
    setDarkMode,
    presetsSource,
    selectedPreset,
    themesSource,
    selectedTheme,
  };
};
