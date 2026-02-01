import { normalizeThemesInput } from "@/utils/normalizeThemes";

import type { ThemesInput } from "./themeTypes";
import type { DarkModeOptions, NamedThemeOptions } from "@/models";
import type { NormalizedPreset } from "@/models/themePresets";

const DEFAULT_THEME_NAME = "Default";

const presetToTheme = (preset: NormalizedPreset): NamedThemeOptions => ({
  name: preset.id,
  ...preset.colorSchemes.light,
});

/**
 * Normalizes preset input so the result always includes valid theme names.
 * - No input/empty: returns a single default theme.
 * - Duplicate preset ids: resolved with last-wins while keeping first-order.
 */
export const normalizeThemes = (input?: ThemesInput): NamedThemeOptions[] => {
  const presets = normalizeThemesInput(input);
  if (presets.length === 0) return [{ name: DEFAULT_THEME_NAME }];
  return presets.map((preset) => presetToTheme(preset));
};

export const mergeThemes = (
  presets?: ThemesInput,
  customThemes?: ThemesInput,
): NamedThemeOptions[] => {
  const merged = [...(presets ?? []), ...(customThemes ?? [])];
  return normalizeThemes(merged.length > 0 ? merged : undefined);
};

export const resolveDefaultThemeName = (themes: NamedThemeOptions[]): string =>
  themes[0]?.name ?? DEFAULT_THEME_NAME;

export const resolveThemeName = (
  themeName: string | undefined,
  themes: NamedThemeOptions[],
): string => {
  if (themeName && themes.some((theme) => theme.name === themeName)) {
    return themeName;
  }
  return resolveDefaultThemeName(themes);
};

export const resolveThemeById = (
  themes: NamedThemeOptions[],
  themeId: string,
): NamedThemeOptions | undefined =>
  themes.find((theme) => theme.name === themeId);

export const resolveDarkMode = (
  darkMode: DarkModeOptions | undefined,
  defaultMode: DarkModeOptions = "system",
): DarkModeOptions => {
  if (!darkMode) return defaultMode;
  return darkMode;
};
