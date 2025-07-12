/**
 * Available options for dark mode configuration.
 * - `system`: Follows the operating system preference.
 * - `auto`: Uses contrast-based detection (e.g., based on background color).
 * - `light`: Forces light mode.
 * - `dark`: Forces dark mode.
 */
export type DarkModeOptions = "system" | "auto" | "light" | "dark";

/**
 * Represents user-specific theme preferences stored in the application.
 */
export interface AppSettings {
  /**
   * The selected theme name. `"system"` indicates the app should follow system preference.
   * Other values are custom theme names defined by the application.
   */
  theme: "system" | (string & {});

  /**
   * Controls how dark mode is applied in the app.
   */
  darkMode: DarkModeOptions;
}
