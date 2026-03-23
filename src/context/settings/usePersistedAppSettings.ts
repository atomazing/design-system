import { useMemo, useSyncExternalStore } from "react";

import { normalizeThemesInput } from "@/utils/normalizeThemes";
import { canUseDom } from "@/utils/ssr";
import { readAppSettings, writeAppSettings } from "@/utils/storage";

import { resolveDarkMode, resolveThemeName } from "./helper";

import type { ThemesInput } from "./themeTypes";
import type {
  DarkModeOptions,
  NamedThemeOptions,
  NormalizedPreset,
} from "@/models";

const APP_SETTINGS_CHANGE_EVENT = "appSettings:change";

interface Props {
  themes?: ThemesInput;
  defaultDarkMode?: DarkModeOptions;
  initialThemeId?: string;
  initialDarkMode?: DarkModeOptions;
  storageKey?: string;
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

const darkModeValues = new Set<DarkModeOptions>(["system", "light", "dark"]);

const serializeSnapshot = (
  themeId: string | undefined,
  darkMode: DarkModeOptions | undefined,
): string =>
  JSON.stringify({
    themeId: themeId ?? "",
    darkMode: darkMode ?? "",
  });

const parseSnapshot = (
  snapshot: string,
): {
  themeId: string | undefined;
  darkMode: DarkModeOptions | undefined;
} => {
  try {
    const parsed = JSON.parse(snapshot) as {
      themeId?: unknown;
      darkMode?: unknown;
    };

    const themeId =
      typeof parsed.themeId === "string" && parsed.themeId.trim().length > 0
        ? parsed.themeId
        : undefined;

    const darkMode =
      typeof parsed.darkMode === "string" &&
      darkModeValues.has(parsed.darkMode as DarkModeOptions)
        ? (parsed.darkMode as DarkModeOptions)
        : undefined;

    return { themeId, darkMode };
  } catch {
    return {
      themeId: undefined,
      darkMode: undefined,
    };
  }
};

const getSettingsSnapshot = (
  initialThemeId?: string,
  initialDarkMode?: DarkModeOptions,
  storageKey?: string,
): string => {
  const stored = readAppSettings(storageKey);
  if (!stored) return serializeSnapshot(initialThemeId, initialDarkMode);

  const { themeId, darkMode } = stored;
  return serializeSnapshot(themeId, darkMode);
};

const getServerSnapshot = (
  initialThemeId?: string,
  initialDarkMode?: DarkModeOptions,
): string => serializeSnapshot(initialThemeId, initialDarkMode);

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
  return () => {
    globalThis.removeEventListener(APP_SETTINGS_CHANGE_EVENT, onChange);
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
  defaultDarkMode,
  initialThemeId,
  initialDarkMode,
  storageKey,
}: Props): ReturnValue => {
  const fallbackDarkMode = defaultDarkMode ?? initialDarkMode ?? "system";
  const presetsSource = useMemo(() => normalizeThemesInput(themes), [themes]);
  const themesSource = useMemo(
    () =>
      presetsSource.map((preset) => ({
        ...preset.colorSchemes.light,
        // Keep preset `id` as the canonical runtime key used by persistence/UI controls.
        name: preset.id,
      })),
    [presetsSource],
  );

  const settingsSnapshot = useSyncExternalStore(
    subscribe,
    () => getSettingsSnapshot(initialThemeId, initialDarkMode, storageKey),
    () => getServerSnapshot(initialThemeId, initialDarkMode),
  );
  const { themeId: snapshotThemeId, darkMode: snapshotDarkMode } = useMemo(
    () => parseSnapshot(settingsSnapshot),
    [settingsSnapshot],
  );

  const theme = resolveThemeName(snapshotThemeId, themesSource);
  const darkMode = resolveDarkMode(snapshotDarkMode, fallbackDarkMode);

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
    writeAppSettings(
      {
        themeId: resolvedThemeId,
        darkMode,
      },
      storageKey,
    );
    notify();
  };

  const setDarkMode = (mode: DarkModeOptions) => {
    writeAppSettings(
      {
        themeId: theme,
        darkMode: mode,
      },
      storageKey,
    );
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
