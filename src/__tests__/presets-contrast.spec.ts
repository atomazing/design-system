import { describe, expect, it } from "vitest";

import { defaultThemes } from "@/presets";
import {
  contrastRatio,
  resolveColor,
  type Rgb,
  type Rgba,
} from "@/utils/contrast";

const THRESHOLDS = {
  primary: 4.5,
  secondary: 3.0,
  divider: 1.5,
};

const asOpaque = (rgb: Rgb): Rgba => ({ ...rgb, a: 1 });

const requireToken = (
  value: unknown,
  label: string,
  presetId: string,
  scheme: string,
): string => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${presetId} (${scheme}) missing token: ${label}`);
  }
  return value;
};

const assertRatio = (
  presetId: string,
  presetLabel: string,
  scheme: string,
  name: string,
  foregroundRaw: string,
  backgroundRaw: string,
  foreground: Rgb,
  background: Rgb,
  expected: number,
): void => {
  const ratio = contrastRatio(foreground, background);
  const ratioLabel = ratio.toFixed(2);
  const message = `${presetId} (${presetLabel}) [${scheme}] ${name}: ${foregroundRaw} on ${backgroundRaw} = ${ratioLabel} (expected >= ${expected})`;
  expect(ratio, message).toBeGreaterThanOrEqual(expected);
};

describe("contrast utilities", () => {
  it("computes the expected ratio for black on white", () => {
    const ratio = contrastRatio(
      resolveColor("#000000"),
      resolveColor("#ffffff"),
    );
    expect(ratio).toBeCloseTo(21, 2);
  });

  it("returns 1 for identical colors", () => {
    const ratio = contrastRatio(
      resolveColor("#123456"),
      resolveColor("#123456"),
    );
    expect(ratio).toBeCloseTo(1, 4);
  });
});

describe("preset contrast guardrails", () => {
  for (const preset of defaultThemes) {
    for (const scheme of ["light", "dark"] as const) {
      it(`${preset.id} ${scheme} meets baseline contrast thresholds`, () => {
        const options = preset.colorSchemes[scheme];
        const palette = options.palette ?? {};
        const background = palette.background ?? {};
        const text = palette.text ?? {};

        const backgroundDefaultRaw = requireToken(
          background.default,
          "palette.background.default",
          preset.id,
          scheme,
        );
        const backgroundPaperRaw = requireToken(
          background.paper,
          "palette.background.paper",
          preset.id,
          scheme,
        );
        const textPrimaryRaw = requireToken(
          text.primary,
          "palette.text.primary",
          preset.id,
          scheme,
        );
        const textSecondaryRaw = requireToken(
          text.secondary,
          "palette.text.secondary",
          preset.id,
          scheme,
        );
        const dividerRaw = requireToken(
          palette.divider,
          "palette.divider",
          preset.id,
          scheme,
        );

        const backgroundDefault = resolveColor(backgroundDefaultRaw);
        const backgroundDefaultOpaque = asOpaque(backgroundDefault);
        const backgroundPaper = resolveColor(
          backgroundPaperRaw,
          backgroundDefaultOpaque,
        );
        const backgroundPaperOpaque = asOpaque(backgroundPaper);

        const textPrimaryOnDefault = resolveColor(
          textPrimaryRaw,
          backgroundDefaultOpaque,
        );
        const textPrimaryOnPaper = resolveColor(
          textPrimaryRaw,
          backgroundPaperOpaque,
        );
        const textSecondaryOnDefault = resolveColor(
          textSecondaryRaw,
          backgroundDefaultOpaque,
        );
        const textSecondaryOnPaper = resolveColor(
          textSecondaryRaw,
          backgroundPaperOpaque,
        );
        const dividerOnDefault = resolveColor(
          dividerRaw,
          backgroundDefaultOpaque,
        );
        const dividerOnPaper = resolveColor(dividerRaw, backgroundPaperOpaque);

        assertRatio(
          preset.id,
          preset.label,
          scheme,
          "text.primary/background.default",
          textPrimaryRaw,
          backgroundDefaultRaw,
          textPrimaryOnDefault,
          backgroundDefault,
          THRESHOLDS.primary,
        );
        assertRatio(
          preset.id,
          preset.label,
          scheme,
          "text.primary/background.paper",
          textPrimaryRaw,
          backgroundPaperRaw,
          textPrimaryOnPaper,
          backgroundPaper,
          THRESHOLDS.primary,
        );
        assertRatio(
          preset.id,
          preset.label,
          scheme,
          "text.secondary/background.default",
          textSecondaryRaw,
          backgroundDefaultRaw,
          textSecondaryOnDefault,
          backgroundDefault,
          THRESHOLDS.secondary,
        );
        assertRatio(
          preset.id,
          preset.label,
          scheme,
          "text.secondary/background.paper",
          textSecondaryRaw,
          backgroundPaperRaw,
          textSecondaryOnPaper,
          backgroundPaper,
          THRESHOLDS.secondary,
        );
        assertRatio(
          preset.id,
          preset.label,
          scheme,
          "divider/background.default",
          dividerRaw,
          backgroundDefaultRaw,
          dividerOnDefault,
          backgroundDefault,
          THRESHOLDS.divider,
        );
        assertRatio(
          preset.id,
          preset.label,
          scheme,
          "divider/background.paper",
          dividerRaw,
          backgroundPaperRaw,
          dividerOnPaper,
          backgroundPaper,
          THRESHOLDS.divider,
        );
      });
    }
  }
});
