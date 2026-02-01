import type { AppSettings, SystemTheme } from "@/models";

/**
 * Determines whether dark mode should be enabled based on user settings and system conditions.
 *
 * @param darkMode - User preference: 'light' | 'dark' | 'system' | 'auto'.
 * @param systemTheme - Detected OS-level theme: 'light' | 'dark'.
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
    case "system":
    case "auto": {
      return systemTheme === "dark";
    }
    default: {
      return false;
    }
  }
};
