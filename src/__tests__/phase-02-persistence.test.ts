import { describe, expect, it } from "vitest";

import { resolveDarkMode, resolveThemeName } from "@/context/settings/helper";
import { isDarkMode } from "@/utils/isDarkMode";

import type { NamedThemeOptions } from "@/models";

const themes = [{ name: "Aurora" }, { name: "Saffron" }] as NamedThemeOptions[];

describe("resolveThemeName", () => {
  it("returns the first theme when no theme is provided", () => {
    expect(resolveThemeName(undefined, themes)).toBe("Aurora");
  });

  it("returns the provided theme when it exists", () => {
    expect(resolveThemeName("Saffron", themes)).toBe("Saffron");
  });

  it("falls back to the first theme when the name is invalid", () => {
    expect(resolveThemeName("Missing", themes)).toBe("Aurora");
  });
});

describe("resolveDarkMode", () => {
  it("falls back to the default when undefined", () => {
    expect(resolveDarkMode(undefined, "system")).toBe("system");
  });

  it("preserves auto as a valid value", () => {
    expect(resolveDarkMode("auto", "system")).toBe("auto");
  });

  it("returns explicit values as-is", () => {
    expect(resolveDarkMode("dark", "system")).toBe("dark");
  });
});

describe("isDarkMode", () => {
  it("treats auto as system preference", () => {
    expect(isDarkMode("auto", "dark")).toBe(true);
    expect(isDarkMode("auto", "light")).toBe(false);
  });
});
