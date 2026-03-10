import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Vapor Monolith
 * Visual: luxury-tech monolith surfaces with rare vapor accents and large
 * breathing room. The default expression stays quiet; the emphasis lives in
 * hero moments, selected state, and primary actions.
 */

const FONT_DISPLAY =
  '"Space Grotesk","Plus Jakarta Sans","Sora","Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_TEXT = '"Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_MONO =
  '"JetBrains Mono","IBM Plex Mono","Roboto Mono","Menlo","Consolas",monospace';

const typography = {
  fontFamily: FONT_TEXT,

  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 840,
    fontSize: "clamp(2.35rem, 4.4vw, 3.8rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.04em",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 820,
    fontSize: "clamp(1.7rem, 3.1vw, 2.55rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.03em",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 780,
    fontSize: "clamp(1.24rem, 2vw, 1.64rem)",
    lineHeight: 1.16,
    letterSpacing: "-0.015em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 760,
    fontSize: "1.14rem",
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
  },

  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 720,
    fontSize: "1.02rem",
    lineHeight: 1.6,
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 720,
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
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 900,
  },
} as const;

interface MonolithOptions {
  radius?: number;
  paperAlpha?: number;
  borderAlpha?: number;
  glow?: number;
  accent?: string;
  shadowAlpha?: number;
  sheenOpacity?: number;
}

const monolithSurface = (theme: Theme, opts?: MonolithOptions) => {
  const radius = opts?.radius ?? Number(theme.shape.borderRadius) + 20;
  const paperAlpha = opts?.paperAlpha ?? 0.72;
  const borderAlpha = opts?.borderAlpha ?? 0.14;
  const glow = opts?.glow ?? 0.18;
  const accent = opts?.accent ?? theme.palette.info.main;
  const shadowAlpha =
    opts?.shadowAlpha ?? (theme.palette.mode === "dark" ? 0.72 : 0.14);
  const sheenOpacity =
    opts?.sheenOpacity ?? (theme.palette.mode === "dark" ? 0.52 : 0.22);

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
      `0 0 0 1px ${alpha(ink, 0.05)} inset`,
      `0 18px 86px ${alpha("#000", shadowAlpha)}`,
      `0 0 ${32 * glow}px ${alpha(accent, 0.08 * glow)}`,
    ].join(", "),

    "&::after": {
      content: '""',
      position: "absolute" as const,
      left: -1,
      right: -1,
      top: -1,
      height: 110,
      background: `linear-gradient(180deg,
        ${alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.14 : 0.22)} 0%,
        ${alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.05 : 0.08)} 45%,
        transparent 100%)`,
      opacity: sheenOpacity,
      pointerEvents: "none" as const,
      mixBlendMode:
        theme.palette.mode === "dark"
          ? ("screen" as const)
          : ("normal" as const),
    },
  };
};

const calmSurface = (theme: Theme) => ({
  position: "relative" as const,
  borderRadius: Number(theme.shape.borderRadius) + 18,
  backgroundColor: alpha(
    theme.palette.background.paper,
    theme.palette.mode === "dark" ? 0.88 : 0.96,
  ),
  border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.1 : 0.08)}`,
  boxShadow: [
    `0 0 0 1px ${alpha(theme.palette.text.primary, 0.04)} inset`,
    `0 16px 54px ${alpha("#000", theme.palette.mode === "dark" ? 0.34 : 0.12)}`,
  ].join(", "),
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
});

const createComponents = (isDark: boolean): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      ":root": {
        "--vm-primary": theme.palette.primary.main,
        "--vm-cool": theme.palette.info.main,
        "--vm-secondary": theme.palette.secondary.main,
      },

      "@keyframes vmRise": {
        "0%": { transform: "translateY(8px)", opacity: 0 },
        "100%": { transform: "translateY(0px)", opacity: 1 },
      },

      "*, *::before, *::after": { boxSizing: "border-box" },

      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundImage: isDark
          ? [
              `radial-gradient(960px 560px at 14% 10%, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 62%)`,
              `radial-gradient(860px 520px at 82% 12%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 66%)`,
              `radial-gradient(980px 560px at 52% 112%, ${alpha(theme.palette.info.main, 0.1)} 0%, transparent 62%)`,
              `linear-gradient(180deg, ${alpha("#000", 0.8)} 0%, transparent 22%, transparent 78%, ${alpha("#000", 0.9)} 100%)`,
            ].join(", ")
          : [
              `radial-gradient(900px 520px at 14% 8%, ${alpha(theme.palette.primary.main, 0.11)} 0%, transparent 60%)`,
              `radial-gradient(860px 520px at 84% 12%, ${alpha(theme.palette.secondary.main, 0.09)} 0%, transparent 64%)`,
              `radial-gradient(980px 560px at 50% 112%, ${alpha(theme.palette.info.main, 0.09)} 0%, transparent 60%)`,
              `linear-gradient(180deg, ${alpha("#FFFFFF", 0.8)} 0%, ${alpha(theme.palette.background.default, 0.9)} 26%, ${alpha(theme.palette.background.default, 0.96)} 100%)`,
            ].join(", "),
        backgroundAttachment: "fixed",
      },

      ".vm-number": {
        fontFamily: FONT_MONO,
        letterSpacing: "-0.05em",
        textShadow: `0 0 22px ${alpha(theme.palette.primary.main, 0.14)}`,
        animation: "vmRise 420ms ease-out 1",
      },

      ".vm-tag": {
        fontFamily: FONT_MONO,
        letterSpacing: "0.08em",
        padding: "0.16em 0.55em",
        borderRadius: 999,
        backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.1 : 0.08),
        border: `1px solid ${alpha(theme.palette.primary.main, isDark ? 0.24 : 0.18)}`,
        boxShadow: `0 0 18px ${alpha(theme.palette.primary.main, isDark ? 0.1 : 0.06)}`,
      },

      ".vm-surface-calm, [data-vm-surface='calm']": {
        ...calmSurface(theme),
      },

      ".vm-panel-focus, [data-vm-surface='focus']": {
        ...monolithSurface(theme, {
          radius: Number(theme.shape.borderRadius) + 24,
          paperAlpha: isDark ? 0.8 : 0.94,
          borderAlpha: 0.16,
          glow: isDark ? 0.9 : 0.34,
          accent: theme.palette.primary.main,
          shadowAlpha: isDark ? 0.58 : 0.18,
          sheenOpacity: isDark ? 0.56 : 0.26,
        }),
      },

      "*::selection": {
        backgroundColor: alpha(theme.palette.primary.main, 0.22),
        color: theme.palette.background.default,
      },

      a: {
        color: isDark ? theme.palette.info.light : theme.palette.info.dark,
        textDecorationColor: alpha(
          theme.palette.info.main,
          isDark ? 0.42 : 0.32,
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
        ...monolithSurface(theme, {
          radius: Number(theme.shape.borderRadius) + 24,
          paperAlpha: isDark ? 0.58 : 0.9,
          borderAlpha: isDark ? 0.12 : 0.08,
          glow: isDark ? 0.14 : 0.06,
          accent: theme.palette.info.main,
          shadowAlpha: isDark ? 0.38 : 0.1,
          sheenOpacity: isDark ? 0.38 : 0.16,
        }),
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...monolithSurface(theme, {
          radius: Number(theme.shape.borderRadius) + 20,
          paperAlpha: isDark ? 0.76 : 0.96,
          borderAlpha: isDark ? 0.14 : 0.08,
          glow: isDark ? 0.14 : 0.06,
          accent: theme.palette.info.main,
          shadowAlpha: isDark ? 0.42 : 0.12,
          sheenOpacity: isDark ? 0.44 : 0.18,
        }),
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...monolithSurface(theme, {
          radius: Number(theme.shape.borderRadius) + 24,
          paperAlpha: isDark ? 0.72 : 0.95,
          borderAlpha: isDark ? 0.14 : 0.09,
          glow: isDark ? 0.18 : 0.08,
          accent: theme.palette.info.main,
          shadowAlpha: isDark ? 0.46 : 0.14,
          sheenOpacity: isDark ? 0.48 : 0.2,
        }),
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.shorter,
        }),
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.text.primary, 0.07)} inset`,
            `0 24px 82px ${alpha("#000", isDark ? 0.62 : 0.15)}`,
            `0 0 30px ${alpha(theme.palette.info.main, isDark ? 0.12 : 0.06)}`,
          ].join(", "),
        },
      }),
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiTypography-h1": {
          textShadow: `0 0 22px ${alpha(theme.palette.info.main, isDark ? 0.1 : 0.04)}`,
        },
        "&.MuiTypography-h2": {
          textShadow: `0 0 18px ${alpha(theme.palette.info.main, isDark ? 0.06 : 0.03)}`,
        },
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.95em",
          padding: "0.12em 0.42em",
          borderRadius: 10,
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.08 : 0.06,
          ),
          border: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
        },
      }),
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: "transparent",
        height: 1,
        backgroundImage: `linear-gradient(90deg,
          transparent 0%,
          ${alpha(theme.palette.text.primary, 0.14)} 20%,
          ${alpha(theme.palette.info.main, isDark ? 0.18 : 0.12)} 50%,
          ${alpha(theme.palette.text.primary, 0.1)} 80%,
          transparent 100%)`,
        opacity: 0.82,
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        paddingInline: 20,
        paddingBlock: 12,
        minHeight: 44,
        fontWeight: 850,
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
        paddingInline: 26,
        paddingBlock: 14,
      },

      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
        backgroundImage: `linear-gradient(135deg,
          ${alpha(theme.palette.primary.main, isDark ? 0.62 : 0.84)} 0%,
          ${alpha(theme.palette.secondary.main, isDark ? 0.42 : 0.44)} 55%,
          ${alpha(theme.palette.info.main, isDark ? 0.34 : 0.4)} 100%)`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.text.primary, 0.08)} inset`,
          `0 20px 78px ${alpha("#000", isDark ? 0.74 : 0.2)}`,
          `0 0 34px ${alpha(theme.palette.primary.main, isDark ? 0.16 : 0.12)}`,
        ].join(", "),
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg,
            transparent 0%,
            ${alpha(theme.palette.common.white, isDark ? 0.16 : 0.24)} 42%,
            transparent 78%)`,
          opacity: 0.7,
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.text.primary, 0.12)} inset`,
            `0 26px 94px ${alpha("#000", isDark ? 0.82 : 0.24)}`,
            `0 0 44px ${alpha(theme.palette.primary.main, isDark ? 0.2 : 0.14)}`,
          ].join(", "),
        },
      }),

      outlinedPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderWidth: 1,
        borderColor: alpha(theme.palette.text.primary, 0.18),
        backgroundColor: alpha(
          theme.palette.text.primary,
          isDark ? 0.04 : 0.03,
        ),
        "&:hover": {
          transform: "translateY(-1px)",
          borderColor: alpha(theme.palette.text.primary, 0.26),
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.06 : 0.05,
          ),
          boxShadow: `0 0 32px ${alpha(theme.palette.info.main, isDark ? 0.08 : 0.05)}`,
        },
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 18,
        backgroundColor: alpha(
          theme.palette.text.primary,
          isDark ? 0.04 : 0.03,
        ),
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.text.primary, 0.22),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.info.main, 0.58),
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
          ${alpha(theme.palette.secondary.main, 0.75)},
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

export const vaporMonolithLight = {
  name: "Vapor Monolith Light",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#7A63F6",
      dark: "#5E47DA",
      light: "#B5A8FF",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#2BC7C4",
      dark: "#179F9D",
      light: "#87E7E4",
      contrastText: "#072020",
    },

    info: {
      main: "#466BFF",
      dark: "#2F4FD5",
      light: "#9DB2FF",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#21A768",
      dark: "#158352",
      light: "#7BDBAA",
      contrastText: "#FFFFFF",
    },

    warning: {
      main: "#D4942C",
      dark: "#AB7416",
      light: "#F1C87A",
      contrastText: "#221706",
    },

    error: {
      main: "#D7546E",
      dark: "#B73C55",
      light: "#F2A0B0",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F7F5FB",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#191826",
      secondary: "#625F77",
      disabled: alpha("#191826", 0.42),
    },

    divider: alpha("#191826", 0.1),

    action: {
      hover: alpha("#466BFF", 0.05),
      selected: alpha("#7A63F6", 0.08),
      focus: alpha("#466BFF", 0.16),
      active: alpha("#191826", 0.58),
      disabled: alpha("#191826", 0.28),
      disabledBackground: alpha("#191826", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 20 },
  spacing: 8,

  components: createComponents(false),
} satisfies NamedThemeOptions;

export const vaporMonolith = {
  name: "Vapor Monolith",
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: "#B693FF",
      dark: "#8E67FF",
      light: "#D7C6FF",
      contrastText: "#070A12",
    },

    secondary: {
      main: "#6FFFE9",
      dark: "#3BE9D1",
      light: "#B7FFF5",
      contrastText: "#061019",
    },

    info: {
      main: "#6F9BFF",
      dark: "#3D78FF",
      light: "#AEC2FF",
      contrastText: "#061019",
    },

    success: {
      main: "#5CFF9E",
      dark: "#2EEA7F",
      light: "#B6FFD2",
      contrastText: "#061019",
    },

    warning: {
      main: "#FFD36B",
      dark: "#FFBF3B",
      light: "#FFE3A5",
      contrastText: "#12100A",
    },

    error: {
      main: "#FF5C7A",
      dark: "#FF3158",
      light: "#FFB3C1",
      contrastText: "#12060A",
    },

    background: {
      default: "#05050B",
      paper: "#0B0C16",
    },

    text: {
      primary: "#F4F6FF",
      secondary: "#B8BED2",
      disabled: alpha("#F4F6FF", 0.4),
    },

    divider: alpha("#F4F6FF", 0.1),

    action: {
      hover: alpha("#F4F6FF", 0.06),
      selected: alpha("#F4F6FF", 0.1),
      focus: alpha("#6F9BFF", 0.2),
      active: alpha("#F4F6FF", 0.62),
      disabled: alpha("#F4F6FF", 0.26),
      disabledBackground: alpha("#F4F6FF", 0.08),
    },
  },

  typography,

  shape: { borderRadius: 20 },
  spacing: 8,

  components: createComponents(true),
} satisfies NamedThemeOptions;
