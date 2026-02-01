import type { ThemeOptions, TypeBackground } from "@mui/material/styles";
import type { ReactNode } from "react";

/**
 * Available options for dark mode configuration.
 * - `system`: Follows the operating system preference.
 * - `auto`: Alias of `system` (no contrast-based detection in current contract).
 * - `light`: Forces light mode.
 * - `dark`: Forces dark mode.
 */
export type DarkModeOptions = "system" | "auto" | "light" | "dark";

export interface OptionItem {
  label: string;
  value: DarkModeOptions;
  icon: ReactNode;
}

export interface ThemeModeBackground {
  light?: Partial<TypeBackground>;
  dark?: Partial<TypeBackground>;
}

export type NamedThemeOptions = ThemeOptions & {
  name: string;
  background?: ThemeModeBackground;
};

/**
 * Represents user-specific theme preferences stored in the application.
 */
export interface AppSettings {
  /**
   * The selected theme name from the available themes list.
   * Invalid or missing values are normalized to the first available theme.
   */
  theme: string;

  /**
   * Controls how dark mode is applied in the app.
   */
  darkMode: DarkModeOptions;
}

export interface ThemeContextProps {
  theme: string;
  darkMode: DarkModeOptions;
  setTheme: (theme: string) => void;
  setDarkMode: (mode: DarkModeOptions) => void;
  themes: NamedThemeOptions[];
  selectedTheme: NamedThemeOptions;
  defaultThemeName: string;
}
