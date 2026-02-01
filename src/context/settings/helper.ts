import { normalizeThemesInput } from "@/utils/normalizeThemes";

import type { ThemeN, ThemesInput } from "./themeTypes";
import type { DarkModeOptions } from "@/models";
import type { NormalizedPreset } from "@/models/themePresets";

const DEFAULT_THEME_NAME = "Default";

const presetToTheme = (preset: NormalizedPreset): ThemeN => ({
  name: preset.id,
  ...preset.colorSchemes.light,
});

/**
 * Normalizes theme input so the result always includes valid theme names.
 * - No input/empty: returns a single default theme.
 * - Single theme: fills a missing/blank name with the default.
 * - Multiple themes: requires each theme to have a non-empty name.
 */
export const normalizeThemes = (input?: ThemesInput | ThemeN[]): ThemeN[] => {
  const presets = normalizeThemesInput(input as ThemesInput);
  if (presets.length === 0) return [{ name: DEFAULT_THEME_NAME }];
  return presets.map((preset) => presetToTheme(preset));
};

export const mergeThemes = (
  presets?: ThemeN[],
  customThemes?: ThemeN[],
): ThemeN[] => {
  const merged = [...(presets ?? []), ...(customThemes ?? [])];
  return normalizeThemes(merged.length > 0 ? merged : undefined);
};

export const resolveDefaultThemeName = (themes: ThemeN[]): string =>
  themes[0]?.name ?? DEFAULT_THEME_NAME;

export const resolveThemeName = (
  themeName: string | undefined,
  themes: ThemeN[],
): string => {
  if (themeName && themes.some((theme) => theme.name === themeName)) {
    return themeName;
  }
  return resolveDefaultThemeName(themes);
};

export const resolveThemeById = (
  themes: ThemeN[],
  themeId: string,
): ThemeN | undefined => themes.find((theme) => theme.name === themeId);

export const resolveDarkMode = (
  darkMode: DarkModeOptions | undefined,
  defaultMode: DarkModeOptions = "system",
): DarkModeOptions => {
  if (!darkMode) return defaultMode;
  return darkMode;
};
