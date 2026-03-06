import { describe, expect, it } from "vitest";
import { createTheme } from "@mui/material/styles";

import { allBuiltInThemes, defaultThemes, landingPageThemes } from "@/presets";
import { typographyVariants } from "@/styles/typography";

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

  it("uses rem-based fontSize/lineHeight in custom typography variants", () => {
    const textMd = typographyVariants.text_md_regular;
    const headerMd = typographyVariants.header_md_semibold;

    expect(String(textMd?.fontSize)).toContain("rem");
    expect(String(textMd?.lineHeight)).toContain("rem");
    expect(String(headerMd?.fontSize)).toContain("rem");
    expect(String(headerMd?.lineHeight)).toContain("rem");
  });

  it("keeps landing presets separate from the default preset pack", () => {
    expect(defaultThemes.map((preset) => preset.id)).toEqual([
      "editorial-classic",
      "airport-ops",
      "modern-minimal",
      "neo-glass",
      "retro-terminal",
      "warm-earth",
    ]);
    expect(landingPageThemes).toHaveLength(21);
    expect(landingPageThemes.some((preset) => preset.id === "brand-neon-motion")).toBe(true);
    expect(landingPageThemes.some((preset) => preset.id === "neon-bauhaus-grid")).toBe(true);
    expect(landingPageThemes.some((preset) => preset.id === "neon-bauhaus-ops")).toBe(true);
    expect(allBuiltInThemes).toHaveLength(
      defaultThemes.length + landingPageThemes.length,
    );
    expect(
      landingPageThemes.some((preset) =>
        defaultThemes.some((defaultPreset) => defaultPreset.id === preset.id),
      ),
    ).toBe(false);
  });
});
