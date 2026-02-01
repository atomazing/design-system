import { describe, expect, it } from "vitest";

import { mergeThemes, normalizeThemes } from "@/context/settings/helper";

describe("normalizeThemes", () => {
  it("returns a single default theme when input is empty", () => {
    const result = normalizeThemes();
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Default");
  });

  it("dedupes by name while preserving first occurrence order", () => {
    const result = normalizeThemes([
      { name: "Alpha", palette: { primary: { main: "#111111" } } },
      { name: "Beta" },
      { name: "Alpha", palette: { primary: { main: "#222222" } } },
    ]);

    expect(result.map((theme) => theme.name)).toEqual(["Alpha", "Beta"]);
    expect(result[0]?.palette?.primary?.main).toBe("#222222");
  });

  it("throws when multiple themes include an empty name", () => {
    expect(() => normalizeThemes([{ name: "Alpha" }, { name: "" }])).toThrow();
  });
});

describe("mergeThemes", () => {
  it("returns a default theme when both lists are empty", () => {
    const result = mergeThemes([], []);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Default");
  });

  it("uses last-wins for duplicate theme names", () => {
    const presets = [
      { name: "Modern Minimal", palette: { primary: { main: "#111111" } } },
    ];
    const custom = [
      { name: "Modern Minimal", palette: { primary: { main: "#222222" } } },
    ];
    const result = mergeThemes(presets, custom);

    expect(result).toHaveLength(1);
    expect(result[0]?.palette?.primary?.main).toBe("#222222");
  });
});
