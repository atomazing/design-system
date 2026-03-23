import { describe, expect, it } from "vitest";

import { defaultThemes } from "@/presets";
import { buildMuiTheme } from "@/styles";

const resolveBodyBackgroundImage = (
  presetId: string,
  scheme: "light" | "dark",
) => {
  const preset = defaultThemes.find((item) => item.id === presetId);

  expect(
    preset,
    `${presetId} preset must exist in defaultThemes`,
  ).toBeDefined();

  const theme = buildMuiTheme(preset!.colorSchemes[scheme], scheme);
  const cssBaseline = theme.components?.MuiCssBaseline?.styleOverrides;
  const styles = (
    typeof cssBaseline === "function" ? cssBaseline(theme) : cssBaseline
  ) as
    | {
        body?: {
          backgroundImage?: string;
        };
      }
    | undefined;

  expect(styles?.body).toBeDefined();

  return styles?.body?.backgroundImage;
};

describe("default preset backgrounds", () => {
  it("gives every default light preset its own body background", () => {
    const backgrounds = defaultThemes.map((preset) =>
      resolveBodyBackgroundImage(preset.id, "light"),
    );

    expect(backgrounds).not.toContain("none");
    expect(new Set(backgrounds).size).toBe(defaultThemes.length);
  });

  it("gives every default dark preset its own body background", () => {
    const backgrounds = defaultThemes.map((preset) =>
      resolveBodyBackgroundImage(preset.id, "dark"),
    );

    expect(backgrounds).not.toContain("none");
    expect(new Set(backgrounds).size).toBe(defaultThemes.length);
  });
});
