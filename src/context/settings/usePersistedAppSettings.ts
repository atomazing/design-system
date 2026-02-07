import { useMemo, useSyncExternalStore } from "react";

import { normalizeThemesInput } from "@/utils/normalizeThemes";
import { canUseDom } from "@/utils/ssr";
import {
  APP_SETTINGS_VERSION,
  readAppSettings,
  writeAppSettings,
} from "@/utils/storage";

import { resolveDarkMode, resolveThemeName } from "./helper";

import type { ThemesInput } from "./themeTypes";
import type { DarkModeOptions, NamedThemeOptions } from "@/models";
import type { NormalizedPreset } from "@/models/themePresets";

const APP_SETTINGS_CHANGE_EVENT = "appSettings:change";

interface Props {
  themes?: ThemesInput;
  defaultDarkMode?: DarkModeOptions;
}

interface ReturnValue {
  theme: string;
  setTheme: (theme: string) => void;
  darkMode: DarkModeOptions;
  setDarkMode: (mode: DarkModeOptions) => void;
  presetsSource: NormalizedPreset[];
  selectedPreset: NormalizedPreset;
  themesSource: NamedThemeOptions[];
  selectedTheme: NamedThemeOptions;
}

const getSettingsSnapshot = (): string => {
  const stored = readAppSettings();
  if (!stored) return "";

  const themeId = typeof stored.themeId === "string" ? stored.themeId : "";
  const darkMode = typeof stored.darkMode === "string" ? stored.darkMode : "";
  return `${themeId}::${darkMode}`;
};

const getServerSnapshot = (): string => "";

const subscribe = (onStoreChange: () => void): (() => void) => {
  if (
    !canUseDom() ||
    typeof globalThis.addEventListener !== "function" ||
    typeof globalThis.removeEventListener !== "function"
  ) {
    return () => {};
  }

  const onChange = () => {
    onStoreChange();
  };

  globalThis.addEventListener(APP_SETTINGS_CHANGE_EVENT, onChange);
  globalThis.addEventListener("storage", onChange);
  return () => {
    globalThis.removeEventListener(APP_SETTINGS_CHANGE_EVENT, onChange);
    globalThis.removeEventListener("storage", onChange);
  };
};

const notify = (): void => {
  if (
    !canUseDom() ||
    typeof globalThis.dispatchEvent !== "function" ||
    typeof globalThis.Event !== "function"
  ) {
    return;
  }

  globalThis.dispatchEvent(new Event(APP_SETTINGS_CHANGE_EVENT));
};

export const usePersistedAppSettings = ({
  themes,
  defaultDarkMode = "system",
}: Props): ReturnValue => {
  const presetsSource = useMemo(() => normalizeThemesInput(themes), [themes]);
  const themesSource = useMemo(
    () =>
      presetsSource.map((preset) => ({
        name: preset.id,
        ...preset.colorSchemes.light,
      })),
    [presetsSource],
  );

  const settingsSnapshot = useSyncExternalStore(
    subscribe,
    getSettingsSnapshot,
    getServerSnapshot,
  );
  const [storedThemeId = "", storedDarkMode = ""] =
    settingsSnapshot.split("::");

  const theme = resolveThemeName(storedThemeId || undefined, themesSource);
  const darkMode = resolveDarkMode(
    (storedDarkMode || undefined) as DarkModeOptions | undefined,
    defaultDarkMode,
  );

  const selectedPreset = useMemo(
    () =>
      presetsSource.find((preset) => preset.id === theme) || presetsSource[0],
    [theme, presetsSource],
  );
  const selectedTheme = useMemo(
    () => themesSource.find((t) => t.name === theme) || themesSource[0],
    [theme, themesSource],
  );

  const setTheme = (nextTheme: string) => {
    const resolvedThemeId = resolveThemeName(nextTheme, themesSource);
    writeAppSettings({
      version: APP_SETTINGS_VERSION,
      themeId: resolvedThemeId,
      darkMode,
    });
    notify();
  };

  const setDarkMode = (mode: DarkModeOptions) => {
    writeAppSettings({
      version: APP_SETTINGS_VERSION,
      themeId: theme,
      darkMode: mode,
    });
    notify();
  };

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
