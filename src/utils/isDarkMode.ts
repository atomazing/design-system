import { AppSettings, SystemTheme } from "../models";

/**
 * Determines whether dark mode should be enabled based on user settings and system conditions.
 *
 * @param darkMode - User preference: 'light' | 'dark' | 'system' | 'auto'.
 * @param systemTheme - Detected OS-level theme: 'light' | 'dark'.
 * @param backgroundColor - The background color to assess contrast in 'auto' mode.
 * @returns True if dark mode should be used.
 */
export const isDarkMode = (
  darkMode: AppSettings["darkMode"],
  systemTheme: SystemTheme,
): boolean => {
  switch (darkMode) {
    case "light": {
      return false;
    }
    case "dark": {
      return true;
    }
    case "system": {
      return systemTheme === "dark";
    }
    default: {
      return false;
    }
  }
};
