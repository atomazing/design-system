import { canUseDom } from "@/utils/ssr";

import type { DarkModeOptions } from "@/models/appSettings";

const APP_SETTINGS_KEY = "appSettings";
const DARK_MODE_OPTIONS = new Set<DarkModeOptions>(["system", "light", "dark"]);

const isDarkModeOption = (value: unknown): value is DarkModeOptions =>
  typeof value === "string" && DARK_MODE_OPTIONS.has(value as DarkModeOptions);

export interface StoredAppSettings {
  themeId: string;
  darkMode: DarkModeOptions;
}

const isStoredAppSettings = (value: unknown): value is StoredAppSettings => {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);
  if (keys.length !== 2) return false;
  if (!keys.includes("themeId") || !keys.includes("darkMode")) return false;

  return (
    typeof record.themeId === "string" &&
    record.themeId.trim().length > 0 &&
    isDarkModeOption(record.darkMode)
  );
};

export const readAppSettings = (): StoredAppSettings | null => {
  if (!canUseDom() || globalThis.localStorage === undefined) return null;
  try {
    const storedRaw = globalThis.localStorage.getItem(APP_SETTINGS_KEY);
    if (!storedRaw) return null;
    const parsed = JSON.parse(storedRaw) as unknown;
    return isStoredAppSettings(parsed) ? parsed : null;
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
