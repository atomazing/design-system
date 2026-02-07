import { useSyncExternalStore } from "react";

import { canUseDom } from "@/utils/ssr";

import type { SystemTheme } from "@/models";

const getSnapshot = (): SystemTheme => {
  if (!canUseDom() || typeof globalThis.matchMedia !== "function") {
    return "unknown";
  }

  return globalThis.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getServerSnapshot = (): SystemTheme => "unknown";

const subscribe = (onStoreChange: () => void): (() => void) => {
  if (!canUseDom() || typeof globalThis.matchMedia !== "function") {
    return () => {};
  }

  const prefersDarkScheme = globalThis.matchMedia(
    "(prefers-color-scheme: dark)",
  );

  if (typeof prefersDarkScheme.addEventListener !== "function") {
    return () => {};
  }

  const onChange = () => {
    onStoreChange();
  };

  prefersDarkScheme.addEventListener("change", onChange);
  return () => {
    prefersDarkScheme.removeEventListener("change", onChange);
  };
};

/**
 * A React hook to detect the system theme preference.
 * @returns The current system theme ('light', 'dark', or 'unknown').
 */
export const useSystemTheme = (): SystemTheme =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
