import type { ThemesProp } from "./themeTypes";
import type { ThemeOptions } from "@mui/material/styles";

const DEFAULT_THEME_NAME = "Default";

/**
 * Normalizes theme input so the result always includes valid theme names.
 * - No input/empty: returns a single default theme.
 * - Single theme: fills a missing/blank name with the default.
 * - Multiple themes: requires each theme to have a non-empty name.
 */
export const normalizeThemes = (
  input?: ThemesProp,
): (ThemeOptions & { name: string })[] => {
  if (!input || input.length === 0) return [{ name: DEFAULT_THEME_NAME }];

  if (input.length === 1) {
    const theme = input[0];
    const themeName =
      theme.name && theme.name.trim().length > 0
        ? theme.name
        : DEFAULT_THEME_NAME;
    return [
      {
        ...theme,
        name: themeName,
      },
    ];
  }

  for (const theme of input) {
    if (!("name" in theme) || !theme.name || theme.name.trim().length === 0) {
      throw new Error(
        "ThemeProviderWrapper: when providing multiple themes, each theme must include a non-empty `name`.",
      );
    }
  }

  return input as (ThemeOptions & { name: string })[];
};
