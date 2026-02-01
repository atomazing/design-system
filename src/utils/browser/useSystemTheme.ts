import { useEffect, useState } from "react";

import { canUseDom } from "@/utils/ssr";

import type { SystemTheme } from "@/models";

/**
 * A React hook to detect the system theme preference.
 * @returns The current system theme ('light', 'dark', or 'unknown').
 */
export const useSystemTheme = (): SystemTheme => {
  const [theme, setTheme] = useState<SystemTheme>("unknown");
  useEffect(() => {
    if (!canUseDom() || typeof globalThis.matchMedia !== "function") {
      setTheme("unknown");
      return () => {};
    }

    const prefersDarkScheme = globalThis.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    const updateTheme = (event?: MediaQueryListEvent) => {
      const matches = event ? event.matches : prefersDarkScheme.matches;
      setTheme(matches ? "dark" : "light");
    };

    updateTheme();

    // Listen for changes in system theme (guard for legacy environments)
    if (typeof prefersDarkScheme.addEventListener !== "function") {
      return () => {};
    }

    prefersDarkScheme.addEventListener("change", updateTheme);
    return () => {
      prefersDarkScheme.removeEventListener("change", updateTheme);
    };
  }, []);

  return theme;
};
