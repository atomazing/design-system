import { afterEach, describe, expect, it } from "vitest";

import {
  APP_SETTINGS_VERSION,
  readAppSettings,
  writeAppSettings,
} from "@/utils/storage/appSettingsStorage";

import type { StoredAppSettings } from "@/utils/storage/appSettingsStorage";

const globalAny = globalThis as typeof globalThis & {
  window?: unknown;
  document?: unknown;
  localStorage?: Storage;
};

const originalEnv = {
  window: globalAny.window,
  document: globalAny.document,
  localStorage: globalAny.localStorage,
};

const clearBrowserEnv = () => {
  delete globalAny.window;
  delete globalAny.document;
  delete globalAny.localStorage;
};

const setBrowserEnv = () => {
  Object.defineProperty(globalAny, "window", {
    value: {},
    configurable: true,
  });
  Object.defineProperty(globalAny, "document", {
    value: {},
    configurable: true,
  });

  const store = new Map<string, string>();
  const localStorage: Storage = {
    getItem: (key) => (store.has(key) ? store.get(key)! : null),
    setItem: (key, value) => {
      store.set(key, value);
    },
    removeItem: (key) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
    key: (index) => Array.from(store.keys())[index] ?? null,
    get length() {
      return store.size;
    },
  };

  Object.defineProperty(globalAny, "localStorage", {
    value: localStorage,
    configurable: true,
  });

  return store;
};

const restoreEnv = () => {
  if (typeof originalEnv.window === "undefined") {
    delete globalAny.window;
  } else {
    Object.defineProperty(globalAny, "window", {
      value: originalEnv.window,
      configurable: true,
    });
  }

  if (typeof originalEnv.document === "undefined") {
    delete globalAny.document;
  } else {
    Object.defineProperty(globalAny, "document", {
      value: originalEnv.document,
      configurable: true,
    });
  }

  if (typeof originalEnv.localStorage === "undefined") {
    delete globalAny.localStorage;
  } else {
    Object.defineProperty(globalAny, "localStorage", {
      value: originalEnv.localStorage,
      configurable: true,
    });
  }
};

afterEach(() => {
  restoreEnv();
});

describe("Phase 06 SSR safety helpers", () => {
  it("returns null when DOM is unavailable", () => {
    clearBrowserEnv();
    expect(readAppSettings()).toBeNull();
  });

  it("imports theming modules without DOM access", async () => {
    clearBrowserEnv();
    await expect(
      import("@/context/ThemeProviderWrapper"),
    ).resolves.toBeTruthy();
  });

  it("reads valid values and ignores invalid payloads", () => {
    setBrowserEnv();
    globalAny.localStorage?.setItem("appSettings", "{bad json");
    expect(readAppSettings()).toBeNull();

    const payload: StoredAppSettings = {
      version: APP_SETTINGS_VERSION,
      themeId: "default",
      darkMode: "dark",
    };
    globalAny.localStorage?.setItem("appSettings", JSON.stringify(payload));
    expect(readAppSettings()).toEqual(payload);

    const legacyPayload = { theme: "legacy", darkMode: "light" };
    globalAny.localStorage?.setItem(
      "appSettings",
      JSON.stringify(legacyPayload),
    );
    expect(readAppSettings()).toEqual({
      version: APP_SETTINGS_VERSION,
      themeId: "legacy",
      darkMode: "light",
    });
  });

  it("returns null when localStorage throws", () => {
    setBrowserEnv();
    if (globalAny.localStorage) {
      globalAny.localStorage.getItem = () => {
        throw new Error("Storage error");
      };
    }
    expect(readAppSettings()).toBeNull();
  });

  it("writes only when DOM is available", () => {
    clearBrowserEnv();
    expect(() =>
      writeAppSettings({
        version: APP_SETTINGS_VERSION,
        themeId: "default",
        darkMode: "light",
      }),
    ).not.toThrow();

    setBrowserEnv();
    writeAppSettings({
      version: APP_SETTINGS_VERSION,
      themeId: "custom",
      darkMode: "dark",
    });
    expect(globalAny.localStorage?.getItem("appSettings")).toContain(
      '"custom"',
    );
  });
});
