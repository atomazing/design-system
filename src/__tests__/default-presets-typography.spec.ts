import { describe, expect, it } from "vitest";

import { defaultThemes } from "@/presets";
import type {
  ThemeOptions,
  TypographyVariantsOptions,
} from "@mui/material/styles";

const getPreset = (id: string) => {
  const preset = defaultThemes.find((item) => item.id === id);

  expect(preset, `${id} preset must exist in defaultThemes`).toBeDefined();

  return preset!;
};

const resolveTypography = (
  typography: ThemeOptions["typography"],
): TypographyVariantsOptions => {
  if (typeof typography === "function") {
    throw new TypeError("Typography function presets are not expected here.");
  }

  return typography ?? {};
};

describe("default preset typography for Cyrillic-first apps", () => {
  it("keeps Editorial Classic on a serif display plus sans UI pairing", () => {
    const preset = getPreset("editorial-classic");
    const typography = resolveTypography(preset.colorSchemes.light.typography);

    expect(typography.fontFamily).toContain('"Source Sans 3"');
    expect(typography.h1?.fontFamily).toContain('"Source Serif 4"');
    expect(typography.h2?.fontFamily).toContain('"Source Serif 4"');
    expect(typography.button?.fontFamily).toContain('"Source Sans 3"');
  });

  it("uses Cyrillic-safe base stacks for the default UI themes", () => {
    expect(
      resolveTypography(getPreset("airport-ops").colorSchemes.light.typography)
        .fontFamily,
    ).toContain('"IBM Plex Sans"');
    expect(
      resolveTypography(
        getPreset("modern-minimal").colorSchemes.light.typography,
      ).fontFamily,
    ).toContain('"IBM Plex Sans"');
    expect(
      resolveTypography(
        getPreset("brand-neon-admin").colorSchemes.light.typography,
      ).fontFamily,
    ).toContain('"Golos Text"');
    expect(
      resolveTypography(getPreset("neo-glass").colorSchemes.light.typography)
        .fontFamily,
    ).toContain('"Golos Text"');
    expect(
      resolveTypography(getPreset("warm-earth").colorSchemes.light.typography)
        .fontFamily,
    ).toContain('"Golos Text"');
  });

  it("keeps Retro Terminal on an explicit mono-first stack", () => {
    const preset = getPreset("retro-terminal");
    const typography = resolveTypography(preset.colorSchemes.light.typography);

    expect(typography.fontFamily).toContain('"IBM Plex Mono"');
    expect(typography.fontFamily).not.toContain('"Tajawal"');
    expect(typography.button?.letterSpacing).toBe("0.04em");
  });
});
