import { describe, expect, it } from "vitest";
import { createTheme } from "@mui/material/styles";

import { allBuiltInThemes, defaultThemes, landingPageThemes } from "@/presets";

describe("Phase 01 baseline reproduction (code-level)", () => {
  it("preserves palette.mode even when a custom palette is provided", () => {
    const customTheme = {
      palette: {
        primary: { main: "#3B82F6" },
      },
    };

    const theme = createTheme({
      ...customTheme,
      palette: {
        ...customTheme.palette,
        mode: "dark",
      },
    });

    expect(theme.palette.mode).toBe("dark");
  });

  it("keeps landing presets separate from the default preset pack", () => {
    expect(defaultThemes.map((preset) => preset.id)).toEqual([
      "editorial-classic",
      "airport-ops",
      "modern-minimal",
      "brand-neon-admin",
      "neo-glass",
      "retro-terminal",
      "warm-earth",
    ]);
    expect(landingPageThemes).toHaveLength(28);
    expect(
      landingPageThemes.some((preset) => preset.id === "flow-editorial"),
    ).toBe(true);
    expect(
      landingPageThemes.some((preset) => preset.id === "brand-neon-motion"),
    ).toBe(true);
    expect(
      landingPageThemes.some(
        (preset) => preset.id === "strong-brand-neon-motion",
      ),
    ).toBe(true);
    expect(
      landingPageThemes.some((preset) => preset.id === "neon-brutalist-sprint"),
    ).toBe(true);
    expect(
      landingPageThemes.some(
        (preset) => preset.id === "strong-neon-brutalist-sprint",
      ),
    ).toBe(true);
    expect(
      landingPageThemes.some((preset) => preset.id === "neon-bauhaus-grid"),
    ).toBe(true);
    expect(
      landingPageThemes.some((preset) => preset.id === "neon-bauhaus-ops"),
    ).toBe(true);
    expect(
      landingPageThemes.some(
        (preset) => preset.id === "strong-neon-bauhaus-ops",
      ),
    ).toBe(true);
    expect(
      landingPageThemes.some(
        (preset) => preset.id === "strong-neon-compliance",
      ),
    ).toBe(true);
    expect(allBuiltInThemes).toHaveLength(
      defaultThemes.length + landingPageThemes.length,
    );
    expect(
      landingPageThemes.some((preset) =>
        defaultThemes.some((defaultPreset) => defaultPreset.id === preset.id),
      ),
    ).toBe(false);
  });

  it("keeps default application presets left-to-right in both color schemes", () => {
    for (const preset of defaultThemes) {
      expect(
        preset.colorSchemes.light.direction,
        `${preset.id} light direction must stay ltr`,
      ).toBe("ltr");
      expect(
        preset.colorSchemes.dark.direction,
        `${preset.id} dark direction must stay ltr`,
      ).toBe("ltr");
    }
  });
});
