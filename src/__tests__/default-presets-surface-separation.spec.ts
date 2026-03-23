import { describe, expect, it } from "vitest";

import { defaultThemes } from "@/presets";
import { buildMuiTheme } from "@/styles";
import { contrastRatio, resolveColor } from "@/utils/contrast";

const MIN_SURFACE_SEPARATION = 1.12;

const resolvePaperBackground = (presetId: string, scheme: "light" | "dark") => {
  const preset = defaultThemes.find((item) => item.id === presetId);

  expect(
    preset,
    `${presetId} preset must exist in defaultThemes`,
  ).toBeDefined();

  const theme = buildMuiTheme(preset!.colorSchemes[scheme], scheme);
  const backgroundDefault = theme.palette.background.default;
  const palettePaper = theme.palette.background.paper;
  const paperRoot = theme.components?.MuiPaper?.styleOverrides?.root;
  const paperStyles = (
    typeof paperRoot === "function"
      ? paperRoot({ theme, ownerState: {} })
      : paperRoot
  ) as
    | {
        backgroundColor?: string;
      }
    | undefined;
  const paperBackground = paperStyles?.backgroundColor ?? palettePaper;

  return {
    appBackground: resolveColor(backgroundDefault),
    paperSurface: resolveColor(paperBackground, backgroundDefault),
    paperBackground,
    backgroundDefault,
  };
};

describe("default preset surface separation", () => {
  for (const preset of defaultThemes) {
    for (const scheme of ["light", "dark"] as const) {
      it(`${preset.id} ${scheme} keeps Paper visually distinct from the app background`, () => {
        const {
          appBackground,
          paperSurface,
          backgroundDefault,
          paperBackground,
        } = resolvePaperBackground(preset.id, scheme);
        const ratio = contrastRatio(paperSurface, appBackground);

        expect(
          ratio,
          `${preset.id} [${scheme}] Paper contrast should stay >= ${MIN_SURFACE_SEPARATION}; got ${ratio.toFixed(2)} for ${paperBackground} on ${backgroundDefault}`,
        ).toBeGreaterThanOrEqual(MIN_SURFACE_SEPARATION);
      });
    }
  }
});
