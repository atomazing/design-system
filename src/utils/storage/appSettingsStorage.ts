import { canUseDom } from "@/utils/ssr";

import type { DarkModeOptions } from "@/models";

const APP_SETTINGS_KEY = "appSettings";
export const APP_SETTINGS_VERSION = 1;
const DARK_MODE_OPTIONS = new Set<DarkModeOptions>([
  "system",
  "auto",
  "light",
  "dark",
]);

const isDarkModeOption = (value: unknown): value is DarkModeOptions =>
  typeof value === "string" && DARK_MODE_OPTIONS.has(value as DarkModeOptions);

export interface StoredAppSettings {
  version: typeof APP_SETTINGS_VERSION;
  themeId: string;
  darkMode: DarkModeOptions;
}

export const readAppSettings = (): Partial<StoredAppSettings> | null => {
  if (!canUseDom() || globalThis.localStorage === undefined) return null;
  try {
    const storedRaw = globalThis.localStorage.getItem(APP_SETTINGS_KEY);
    if (!storedRaw) return null;
    const parsed = JSON.parse(storedRaw) as {
      version?: unknown;
      themeId?: unknown;
      theme?: unknown;
      darkMode?: unknown;
    };
    const darkMode = isDarkModeOption(parsed.darkMode)
      ? parsed.darkMode
      : undefined;
    if (parsed.version === APP_SETTINGS_VERSION) {
      const themeId =
        typeof parsed.themeId === "string" ? parsed.themeId : undefined;
      if (!themeId && !darkMode) return null;
      return { version: APP_SETTINGS_VERSION, themeId, darkMode };
    }

    const legacyTheme =
      typeof parsed.theme === "string" ? parsed.theme : undefined;
    if (!legacyTheme && !darkMode) return null;
    return { version: APP_SETTINGS_VERSION, themeId: legacyTheme, darkMode };
  } catch {
    return null;
  }
};

export const writeAppSettings = (settings: StoredAppSettings): void => {
  if (!canUseDom() || globalThis.localStorage === undefined) return;
  try {
    globalThis.localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* empty */
  }
};
