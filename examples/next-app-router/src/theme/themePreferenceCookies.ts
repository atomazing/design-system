import type { DarkModeOptions } from "@atomazing-org/design-system";
import { defaultThemes } from "@atomazing-org/design-system/presets";

export const THEME_ID_COOKIE = "ds_theme_id";
export const DARK_MODE_COOKIE = "ds_dark_mode";
export const THEME_PREFERENCES_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

const themeIds = new Set(defaultThemes.map((preset) => preset.id));
const darkModeValues = new Set<DarkModeOptions>(["light", "dark", "system"]);

const decodeCookieValue = (value: string): string => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const isHttps = (): boolean =>
  typeof globalThis.location !== "undefined" &&
  globalThis.location.protocol === "https:";

export const sanitizeThemeId = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  const decoded = decodeCookieValue(value).trim();
  return themeIds.has(decoded) ? decoded : undefined;
};

export const sanitizeDarkMode = (
  value: string | undefined,
): DarkModeOptions | undefined => {
  if (!value) return undefined;
  const decoded = decodeCookieValue(value).trim() as DarkModeOptions;
  return darkModeValues.has(decoded) ? decoded : undefined;
};

export const writeThemePreferenceCookies = (
  themeId: string,
  darkMode: DarkModeOptions,
): void => {
  if (typeof document === "undefined") return;
  if (!themeIds.has(themeId) || !darkModeValues.has(darkMode)) return;

  const secureAttr = isHttps() ? "; Secure" : "";
  const attrs = `Path=/; Max-Age=${THEME_PREFERENCES_MAX_AGE_SECONDS}; SameSite=Lax${secureAttr}`;
  document.cookie = `${THEME_ID_COOKIE}=${encodeURIComponent(themeId)}; ${attrs}`;
  document.cookie = `${DARK_MODE_COOKIE}=${darkMode}; ${attrs}`;
};
