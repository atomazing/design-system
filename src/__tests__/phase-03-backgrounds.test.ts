import { describe, expect, it } from "vitest";

import { buildMuiTheme } from "@/styles";

import type { ThemeOptions } from "@mui/material/styles";

describe("buildMuiTheme background mapping", () => {
  it("applies mode-aware background overrides", () => {
    const options: ThemeOptions & {
      background?: {
        light?: { default?: string; paper?: string };
        dark?: { default?: string; paper?: string };
      };
    } = {
      palette: {
        mode: "light",
        background: { default: "#f0f0f0", paper: "#fafafa" },
      },
      background: {
        light: { default: "#ffffff", paper: "#f8fafc" },
        dark: { default: "#0b1220", paper: "#111827" },
      },
    };

    const lightTheme = buildMuiTheme(options, "light");
    const darkTheme = buildMuiTheme(options, "dark");

    expect(lightTheme.palette.mode).toBe("light");
    expect(lightTheme.palette.background.default).toBe("#ffffff");
    expect(lightTheme.palette.background.paper).toBe("#f8fafc");

    expect(darkTheme.palette.mode).toBe("dark");
    expect(darkTheme.palette.background.default).toBe("#0b1220");
    expect(darkTheme.palette.background.paper).toBe("#111827");
  });
});
