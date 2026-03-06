import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Quantized Heatmap — Extra Landing preset (bonus)
 * Visual: data-monitoring vibe with “heatmap” accents — graphite dark, pixel grid, heat gradients,
 * crisp blocks, soft glow only on key actions. Designed for landing rhythm (hero metrics, steps, risks).
 * Philosophy: «Скорость — это измеримость. Если метрики видны, процесс становится управляемым.»
 */

const FONT_DISPLAY =
  '"Space Grotesk","Sora","Plus Jakarta Sans","Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_TEXT = '"Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_MONO =
  '"JetBrains Mono","IBM Plex Mono","Roboto Mono","Menlo","Consolas",monospace';

const typography = {
  fontFamily: FONT_TEXT,

  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 860,
    fontSize: "clamp(2.25rem, 4.25vw, 3.65rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.035em",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 840,
    fontSize: "clamp(1.6rem, 2.95vw, 2.45rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.025em",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 800,
    fontSize: "clamp(1.22rem, 2vw, 1.62rem)",
    lineHeight: 1.16,
    letterSpacing: "-0.015em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 770,
    fontSize: "1.14rem",
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
  },

  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 740,
    fontSize: "1.02rem",
    lineHeight: 1.6,
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 740,
    fontSize: "0.92rem",
    lineHeight: 1.6,
  },

  body1: { fontSize: "1rem", lineHeight: 1.85 },
  body2: { fontSize: "0.92rem", lineHeight: 1.72 },

  button: {
    fontFamily: FONT_DISPLAY,
    textTransform: "none",
    fontWeight: 850,
    letterSpacing: "0.02em",
  },

  caption: { fontSize: "0.82rem", letterSpacing: "0.01em" },
  overline: {
    fontFamily: FONT_MONO,
    fontSize: "0.74rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: 900,
  },
} as const;

interface HeatPanelOptions {
  radius?: number;
  borderAlpha?: number;
  paperAlpha?: number;
  glow?: number;
  gridOpacity?: number;
  gridBlendMode?: "screen" | "multiply";
  accent?: string;
  notchAlpha?: number;
  showNotch?: boolean;
  shadowAlpha?: number;
}

const heatPanel = (theme: Theme, opts?: HeatPanelOptions) => {
  const radius = opts?.radius ?? Number(theme.shape.borderRadius) + 18;
  const borderAlpha = opts?.borderAlpha ?? 0.18;
  const paperAlpha = opts?.paperAlpha ?? 0.74;
  const glow = opts?.glow ?? 1;
  const gridOpacity = opts?.gridOpacity ?? 0.22;
  const gridBlendMode =
    opts?.gridBlendMode ??
    (theme.palette.mode === "dark" ? "screen" : "multiply");
  const accent = opts?.accent ?? theme.palette.info.main;
  const notchAlpha = opts?.notchAlpha ?? 0.6;
  const showNotch = opts?.showNotch ?? true;
  const shadowAlpha = opts?.shadowAlpha ?? 0.7;

  const ink = theme.palette.text.primary;

  return {
    position: "relative" as const,
    borderRadius: radius,
    overflow: "hidden" as const,
    isolation: "isolate" as const,

    backgroundImage: "none",
    backgroundColor: alpha(theme.palette.background.paper, paperAlpha),
    border: `1px solid ${alpha(ink, borderAlpha)}`,
    boxShadow: [
      `0 0 0 1px ${alpha(ink, 0.06)} inset`,
      `0 18px 76px ${alpha("#000", shadowAlpha)}`,
      `0 0 ${28 * glow}px ${alpha(accent, 0.1 * glow)}`,
    ].join(", "),

    // Pixel grid overlay (subtle)
    "&::before": {
      content: '""',
      position: "absolute" as const,
      inset: 0,
      pointerEvents: "none" as const,
      backgroundImage: [
        `linear-gradient(0deg, ${alpha(ink, 0.06)} 1px, transparent 1px)`,
        `linear-gradient(90deg, ${alpha(ink, 0.05)} 1px, transparent 1px)`,
      ].join(", "),
      backgroundSize: "18px 18px, 18px 18px",
      opacity: gridOpacity,
      mixBlendMode: gridBlendMode,
    },

    // Heat “notch” line (signature)
    "&::after": {
      content: '""',
      position: "absolute" as const,
      left: 0,
      right: 0,
      top: 0,
      height: 2,
      pointerEvents: "none" as const,
      backgroundImage: `linear-gradient(90deg,
        transparent 0%,
        ${alpha(accent, notchAlpha)} 40%,
        ${alpha(theme.palette.warning.main, notchAlpha * 0.86)} 60%,
        transparent 100%)`,
      opacity: showNotch ? 0.75 : 0,
    },
  };
};

const calmSurface = (theme: Theme) => ({
  position: "relative" as const,
  borderRadius: Number(theme.shape.borderRadius) + 16,
  backgroundColor: alpha(
    theme.palette.background.paper,
    theme.palette.mode === "dark" ? 0.9 : 0.96,
  ),
  border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.1 : 0.08)}`,
  boxShadow: [
    `0 0 0 1px ${alpha(theme.palette.text.primary, 0.04)} inset`,
    `0 16px 48px ${alpha("#000", theme.palette.mode === "dark" ? 0.38 : 0.14)}`,
  ].join(", "),
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
});

const createComponents = (isDark: boolean): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      ":root": {
        "--qh-hot": theme.palette.primary.main,
        "--qh-cool": theme.palette.info.main,
        "--qh-warm": theme.palette.warning.main,
        "--qh-ink": theme.palette.text.primary,
      },

      "@keyframes qhTick": {
        "0%": { transform: "translateY(8px)", opacity: 0 },
        "100%": { transform: "translateY(0px)", opacity: 1 },
      },

      "*, *::before, *::after": { boxSizing: "border-box" },

      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,

        // Heatmap ambience: graphite + measured color fields + pixel grid
        backgroundImage: isDark
          ? [
              `radial-gradient(820px 480px at 18% 12%, ${alpha(theme.palette.warning.main, 0.12)} 0%, transparent 64%)`,
              `radial-gradient(980px 560px at 54% 112%, ${alpha(theme.palette.info.main, 0.12)} 0%, transparent 62%)`,
              `linear-gradient(180deg, ${alpha("#000", 0.78)} 0%, transparent 22%, transparent 78%, ${alpha("#000", 0.88)} 100%)`,
              // pixel grid:
              `repeating-linear-gradient(0deg, ${alpha(theme.palette.text.primary, 0.05)} 0px, ${alpha(theme.palette.text.primary, 0.05)} 1px, transparent 1px, transparent 10px)`,
              `repeating-linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.04)} 0px, ${alpha(theme.palette.text.primary, 0.04)} 1px, transparent 1px, transparent 14px)`,
            ].join(", ")
          : [
              `radial-gradient(760px 420px at 16% 10%, ${alpha(theme.palette.warning.main, 0.16)} 0%, transparent 62%)`,
              `radial-gradient(980px 560px at 54% 112%, ${alpha(theme.palette.info.main, 0.12)} 0%, transparent 62%)`,
              `linear-gradient(180deg, ${alpha("#FFFFFF", 0.78)} 0%, ${alpha(theme.palette.background.default, 0.86)} 26%, ${alpha(theme.palette.background.default, 0.92)} 100%)`,
              // pixel grid:
              `repeating-linear-gradient(0deg, ${alpha(theme.palette.text.primary, 0.035)} 0px, ${alpha(theme.palette.text.primary, 0.035)} 1px, transparent 1px, transparent 10px)`,
              `repeating-linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.028)} 0px, ${alpha(theme.palette.text.primary, 0.028)} 1px, transparent 1px, transparent 14px)`,
            ].join(", "),
        backgroundAttachment: "fixed",
      },

      // Utility: animated metric number (use for 1 / 5 / 60)
      ".qh-number": {
        fontFamily: FONT_MONO,
        letterSpacing: "-0.05em",
        textShadow: `0 0 26px ${alpha(theme.palette.primary.main, 0.14)}`,
        animation: "qhTick 420ms ease-out 1",
      },

      // Utility: small “heat label” tag
      ".qh-tag": {
        fontFamily: FONT_MONO,
        letterSpacing: "0.08em",
        padding: "0.16em 0.55em",
        borderRadius: 12,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.26)}`,
        boxShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.1)}`,
      },

      ".qh-surface-calm, [data-qh-surface='calm']": {
        ...calmSurface(theme),
      },

      ".qh-panel-hot, [data-qh-surface='hot']": {
        ...heatPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 20,
          paperAlpha: isDark ? 0.8 : 0.94,
          borderAlpha: 0.18,
          glow: isDark ? 0.72 : 0.24,
          gridOpacity: isDark ? 0.14 : 0.1,
          gridBlendMode: isDark ? "screen" : "multiply",
          accent: theme.palette.primary.main,
          notchAlpha: 0.82,
          showNotch: true,
          shadowAlpha: isDark ? 0.62 : 0.18,
        }),
      },

      "*::selection": {
        backgroundColor: alpha(theme.palette.primary.main, 0.26),
        color: theme.palette.background.default,
      },

      a: {
        color: isDark ? theme.palette.info.light : theme.palette.info.dark,
        textDecorationColor: alpha(
          theme.palette.info.main,
          isDark ? 0.45 : 0.36,
        ),
        textUnderlineOffset: "3px",
      },

      code: { fontFamily: FONT_MONO },
    }),
  },

  MuiContainer: {
    defaultProps: { maxWidth: "lg" },
    styleOverrides: {
      root: ({ theme }) => ({
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
        },
      }),
    },
  },

  MuiAppBar: {
    defaultProps: { color: "transparent" as const, elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        ...heatPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 22,
          paperAlpha: isDark ? 0.68 : 0.9,
          borderAlpha: isDark ? 0.12 : 0.08,
          glow: isDark ? 0.12 : 0.06,
          gridOpacity: isDark ? 0.08 : 0.04,
          gridBlendMode: isDark ? "screen" : "multiply",
          accent: theme.palette.info.main,
          showNotch: false,
          shadowAlpha: isDark ? 0.4 : 0.12,
        }),
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...heatPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 18,
          paperAlpha: isDark ? 0.84 : 0.95,
          borderAlpha: isDark ? 0.14 : 0.08,
          glow: isDark ? 0.12 : 0.05,
          gridOpacity: isDark ? 0.08 : 0.04,
          gridBlendMode: isDark ? "screen" : "multiply",
          accent: theme.palette.info.main,
          showNotch: false,
          shadowAlpha: isDark ? 0.42 : 0.12,
        }),
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...heatPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 22,
          paperAlpha: isDark ? 0.82 : 0.95,
          borderAlpha: isDark ? 0.15 : 0.09,
          glow: isDark ? 0.18 : 0.08,
          gridOpacity: isDark ? 0.1 : 0.05,
          gridBlendMode: isDark ? "screen" : "multiply",
          accent: theme.palette.info.main,
          showNotch: false,
          shadowAlpha: isDark ? 0.46 : 0.14,
        }),
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.shorter,
        }),
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.text.primary, 0.07)} inset`,
            `0 24px 72px ${alpha("#000", isDark ? 0.58 : 0.14)}`,
            `0 0 28px ${alpha(theme.palette.info.main, isDark ? 0.12 : 0.06)}`,
          ].join(", "),
        },
      }),
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiTypography-h1": {
          textShadow: `0 0 22px ${alpha(theme.palette.info.main, isDark ? 0.1 : 0.05)}`,
        },
        "&.MuiTypography-h2": {
          textShadow: `0 0 18px ${alpha(theme.palette.info.main, isDark ? 0.06 : 0.03)}`,
        },
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.95em",
          padding: "0.12em 0.42em",
          borderRadius: 10,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
        },
      }),
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: "transparent",
        height: 1,
        backgroundImage: `repeating-linear-gradient(90deg,
          ${alpha(theme.palette.text.primary, 0)} 0px,
          ${alpha(theme.palette.text.primary, 0)} 10px,
          ${alpha(theme.palette.text.primary, 0.22)} 10px,
          ${alpha(theme.palette.text.primary, 0.22)} 16px,
          ${alpha(theme.palette.info.main, 0.18)} 16px,
          ${alpha(theme.palette.info.main, 0.18)} 18px,
          ${alpha(theme.palette.text.primary, 0)} 18px,
          ${alpha(theme.palette.text.primary, 0)} 26px)`,
        opacity: 0.9,
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 14,
        paddingInline: 18,
        paddingBlock: 12,
        minHeight: 44,
        fontWeight: 900,
        position: "relative",
        overflow: "hidden",
        transform: "translateZ(0)",
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background-color", "border-color"],
          { duration: theme.transitions.duration.shorter },
        ),
        "&:active": { transform: "translateY(0px)" },
      }),

      sizeLarge: {
        minHeight: 52,
        paddingInline: 24,
        paddingBlock: 14,
      },

      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
        backgroundImage: `linear-gradient(90deg,
          ${alpha(theme.palette.primary.main, 0.7)} 0%,
          ${alpha(theme.palette.warning.main, 0.55)} 55%,
          ${alpha(theme.palette.info.main, 0.38)} 100%)`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.text.primary, 0.1)} inset`,
          `0 20px 78px ${alpha("#000", 0.68)}`,
          `0 0 38px ${alpha(theme.palette.primary.main, 0.18)}`,
        ].join(", "),
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg,
            transparent 0%,
            ${alpha(theme.palette.common.white, 0.16)} 42%,
            transparent 78%)`,
          opacity: 0.7,
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.text.primary, 0.12)} inset`,
            `0 26px 94px ${alpha("#000", 0.78)}`,
            `0 0 48px ${alpha(theme.palette.primary.main, 0.22)}`,
          ].join(", "),
        },
      }),

      outlinedPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderWidth: 1,
        borderColor: alpha(theme.palette.text.primary, 0.18),
        backgroundColor: alpha(theme.palette.text.primary, 0.04),
        "&:hover": {
          transform: "translateY(-1px)",
          borderColor: alpha(theme.palette.text.primary, 0.26),
          backgroundColor: alpha(theme.palette.text.primary, 0.06),
          boxShadow: `0 0 32px ${alpha(theme.palette.info.main, 0.08)}`,
        },
      }),

      textPrimary: ({ theme }) => ({
        color: theme.palette.primary.main,
        "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.1) },
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 18,
        backgroundColor: alpha(theme.palette.text.primary, 0.04),
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.text.primary, 0.22),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.info.main, 0.6),
          boxShadow: `0 0 0 3px ${alpha(theme.palette.info.main, 0.12)}`,
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, 0.14),
      }),
      input: { paddingBlock: 12 },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_DISPLAY,
        fontWeight: 760,
        letterSpacing: "0.02em",
        textTransform: "none",
        color: alpha(theme.palette.text.secondary, 0.92),
        "&.Mui-focused": {
          color: isDark ? theme.palette.info.light : theme.palette.info.dark,
        },
      }),
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
      }),
      indicator: ({ theme }) => ({
        height: 2,
        borderRadius: 999,
        backgroundImage: `linear-gradient(90deg,
          ${alpha(theme.palette.primary.main, 0.95)},
          ${alpha(theme.palette.warning.main, 0.75)},
          ${alpha(theme.palette.info.main, 0.65)})`,
        boxShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.18)}`,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        fontFamily: FONT_DISPLAY,
        fontWeight: 800,
        letterSpacing: "0.03em",
        textTransform: "none",
        color: alpha(theme.palette.text.primary, 0.78),
        "&.Mui-selected": {
          color: theme.palette.primary.main,
          textShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.14)}`,
        },
      }),
    },
  },
});

export const quantizedHeatmapLight = {
  name: "Quantized Heatmap Light",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#D92B69",
      dark: "#B61F54",
      light: "#F0729C",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#D79B29",
      dark: "#B67C11",
      light: "#F0C96A",
      contrastText: "#221806",
    },

    warning: {
      main: "#D79B29",
      dark: "#B67C11",
      light: "#F0C96A",
      contrastText: "#221806",
    },

    info: {
      main: "#316CFF",
      dark: "#1F4FD6",
      light: "#7FA5FF",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#189B5B",
      dark: "#127947",
      light: "#6AD89D",
      contrastText: "#FFFFFF",
    },

    error: {
      main: "#D94A68",
      dark: "#B8324D",
      light: "#F197AB",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F5F7FB",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#121826",
      secondary: "#586178",
      disabled: alpha("#121826", 0.42),
    },

    divider: alpha("#121826", 0.1),

    action: {
      hover: alpha("#316CFF", 0.05),
      selected: alpha("#D92B69", 0.08),
      focus: alpha("#316CFF", 0.16),
      active: alpha("#121826", 0.58),
      disabled: alpha("#121826", 0.28),
      disabledBackground: alpha("#121826", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 16 },
  spacing: 8,

  components: createComponents(false),
} satisfies NamedThemeOptions;

export const quantizedHeatmap = {
  name: "Quantized Heatmap",
  direction: "ltr",

  palette: {
    mode: "dark",

    // Heatmap accent set
    primary: {
      main: "#FF3D7F", // hot pink
      dark: "#E62666",
      light: "#FF8FB1",
      contrastText: "#12060A",
    },

    secondary: {
      main: "#FFD36B", // warm amber
      dark: "#FFBF3B",
      light: "#FFE3A5",
      contrastText: "#12100A",
    },

    warning: {
      main: "#FFB000",
      dark: "#E69300",
      light: "#FFD37A",
      contrastText: "#1A1206",
    },

    info: {
      main: "#5C9DFF",
      dark: "#2F76FF",
      light: "#A6C4FF",
      contrastText: "#061019",
    },

    success: {
      main: "#5CFF9E",
      dark: "#2EEA7F",
      light: "#B6FFD2",
      contrastText: "#061019",
    },

    error: {
      main: "#FF5C7A",
      dark: "#FF3158",
      light: "#FFB3C1",
      contrastText: "#12060A",
    },

    background: {
      default: "#07080B",
      paper: "#0C1017",
    },

    text: {
      primary: "#F2F4FF",
      secondary: "#B1B7D1",
      disabled: alpha("#F2F4FF", 0.4),
    },

    divider: alpha("#F2F4FF", 0.1),

    action: {
      hover: alpha("#F2F4FF", 0.06),
      selected: alpha("#F2F4FF", 0.1),
      focus: alpha("#5C9DFF", 0.2),
      active: alpha("#F2F4FF", 0.62),
      disabled: alpha("#F2F4FF", 0.26),
      disabledBackground: alpha("#F2F4FF", 0.08),
    },
  },

  typography,

  shape: { borderRadius: 16 },
  spacing: 8,

  components: createComponents(true),
} satisfies NamedThemeOptions;
