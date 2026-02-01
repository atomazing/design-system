import { describe, expect, it } from "vitest";

import { mergeThemes, normalizeThemes } from "@/context/settings/helper";

import type { ThemePreset } from "@/models";

const createPreset = (
  id: string,
  lightPrimary: string,
  darkPrimary: string,
): ThemePreset => ({
  id,
  label: id,
  colorSchemes: {
    light: { palette: { primary: { main: lightPrimary } } },
    dark: { palette: { primary: { main: darkPrimary } } },
  },
});

describe("normalizeThemes", () => {
  it("returns a single default theme when input is empty", () => {
    const result = normalizeThemes();
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Default");
  });

  it("dedupes by preset id while preserving first occurrence order", () => {
    const result = normalizeThemes([
      createPreset("Alpha", "#111111", "#f0f0f0"),
      createPreset("Beta", "#333333", "#d0d0d0"),
      createPreset("Alpha", "#222222", "#c0c0c0"),
    ]);

    expect(result.map((theme) => theme.name)).toEqual(["Alpha", "Beta"]);
    expect(result[0]?.palette?.primary?.main).toBe("#222222");
  });

  it("throws when a preset id is empty", () => {
    expect(() =>
      normalizeThemes([
        {
          id: "   ",
          label: "Broken",
          colorSchemes: { light: {}, dark: {} },
        },
      ]),
    ).toThrow();
  });
});

describe("mergeThemes", () => {
  it("returns a default theme when both lists are empty", () => {
    const result = mergeThemes([], []);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Default");
  });

  it("uses last-wins for duplicate theme names", () => {
    const presets = [createPreset("Modern Minimal", "#111111", "#f0f0f0")];
    const custom = [createPreset("Modern Minimal", "#222222", "#d0d0d0")];
    const result = mergeThemes(presets, custom);

    expect(result).toHaveLength(1);
    expect(result[0]?.palette?.primary?.main).toBe("#222222");
  });
});
