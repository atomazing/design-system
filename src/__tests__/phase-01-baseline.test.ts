import { describe, expect, it } from "vitest";
import { createTheme } from "@mui/material/styles";

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
});
