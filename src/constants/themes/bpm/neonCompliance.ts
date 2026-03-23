import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Neon Compliance
 * Visual: cyber-neon discipline with restrained motion and selective glow.
 * The system should feel precise and controlled, not noisy.
 */

const FONT_DISPLAY =
  '"Space Grotesk","Sora","Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_TEXT = '"Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_MONO =
  '"JetBrains Mono","IBM Plex Mono","Roboto Mono","Menlo","Consolas",monospace';

const typography = {
  fontFamily: FONT_TEXT,

  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 800,
    fontSize: "clamp(2.2rem, 4.2vw, 3.4rem)",
    lineHeight: 1.06,
    letterSpacing: "-0.03em",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 800,
    fontSize: "clamp(1.6rem, 2.8vw, 2.3rem)",
    lineHeight: 1.12,
    letterSpacing: "-0.02em",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 780,
    fontSize: "clamp(1.2rem, 1.9vw, 1.55rem)",
    lineHeight: 1.18,
    letterSpacing: "-0.015em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 760,
    fontSize: "1.12rem",
    lineHeight: 1.28,
    letterSpacing: "-0.01em",
  },

  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    fontSize: "1.02rem",
    lineHeight: 1.45,
    letterSpacing: "0.005em",
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    fontSize: "0.92rem",
    lineHeight: 1.45,
    letterSpacing: "0.01em",
  },

  body1: { fontSize: "1rem", lineHeight: 1.8 },
  body2: { fontSize: "0.92rem", lineHeight: 1.7 },

  button: {
    fontFamily: FONT_DISPLAY,
    textTransform: "none",
    fontWeight: 820,
    letterSpacing: "0.02em",
  },

  caption: { fontSize: "0.82rem", letterSpacing: "0.02em" },
  overline: {
    fontFamily: FONT_DISPLAY,
    fontSize: "0.74rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 900,
  },
} as const;

interface NeonFrameOptions {
  radius?: number;
  strength?: number;
  accent?: string;
  secondaryAccent?: string;
  borderAlpha?: number;
  glowAlpha?: number;
}

const neonFrame = (theme: Theme, opts?: NeonFrameOptions) => {
  const radius = opts?.radius ?? Number(theme.shape.borderRadius) + 10;
  const strength = opts?.strength ?? 0.7;
  const accent = opts?.accent ?? theme.palette.primary.main;
  const secondaryAccent = opts?.secondaryAccent ?? theme.palette.info.main;
  const borderAlpha = opts?.borderAlpha ?? 0.72;
  const glowAlpha =
    opts?.glowAlpha ?? (theme.palette.mode === "dark" ? 0.18 : 0.08);

  return {
    position: "relative" as const,
    borderRadius: radius,
    isolation: "isolate" as const,
    overflow: "hidden" as const,

    "&::before": {
      content: '""',
      position: "absolute" as const,
      inset: 0,
      borderRadius: radius,
      padding: 1,
      background: `linear-gradient(135deg,
        ${alpha(accent, borderAlpha)} 0%,
        ${alpha(theme.palette.secondary.main, borderAlpha * 0.8)} 38%,
        ${alpha(secondaryAccent, borderAlpha * 0.72)} 82%)`,
      WebkitMask:
        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor" as const,
      maskComposite: "exclude" as const,
      opacity: theme.palette.mode === "dark" ? 0.72 : 0.58,
      pointerEvents: "none" as const,
    },

    "&::after": {
      content: '""',
      position: "absolute" as const,
      inset: -20,
      borderRadius: radius + 20,
      background: `radial-gradient(560px 240px at 18% 0%,
        ${alpha(accent, glowAlpha * strength)} 0%,
        transparent 62%),
        radial-gradient(480px 220px at 86% 0%,
        ${alpha(secondaryAccent, glowAlpha * 0.9 * strength)} 0%,
        transparent 60%)`,
      filter: `blur(${12 + 8 * strength}px)`,
      opacity: 0.9,
      zIndex: -1,
      pointerEvents: "none" as const,
    },
  };
};

const calmSurface = (theme: Theme) => ({
  position: "relative" as const,
  borderRadius: Number(theme.shape.borderRadius) + 12,
  backgroundColor: alpha(
    theme.palette.background.paper,
    theme.palette.mode === "dark" ? 0.9 : 0.96,
  ),
  border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.1 : 0.08)}`,
  boxShadow: [
    `0 0 0 1px ${alpha(theme.palette.text.primary, 0.04)} inset`,
    `0 16px 52px ${alpha("#000", theme.palette.mode === "dark" ? 0.34 : 0.12)}`,
  ].join(", "),
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
});

const createComponents = (
  isDark: boolean,
  opts?: { calmMode?: boolean },
): ThemeOptions["components"] => {
  const calmMode = opts?.calmMode ?? false;

  return {
    MuiCssBaseline: {
      styleOverrides: (theme: Theme) => ({
        ":root": {
          "--nc-cyan": theme.palette.primary.main,
          "--nc-magenta": theme.palette.secondary.main,
          "--nc-blue": theme.palette.info.main,
        },

        "@keyframes ncPulseRing": {
          "0%": { transform: "scale(0.98)", opacity: 0 },
          "15%": { opacity: calmMode ? 0.42 : 0.6 },
          "100%": { transform: "scale(1.1)", opacity: 0 },
        },
        "@keyframes ncRise": {
          "0%": { transform: "translateY(8px)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },

        "*, *::before, *::after": { boxSizing: "border-box" },

        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          backgroundImage: isDark
            ? [
                `radial-gradient(1000px 520px at 18% 8%, ${alpha(theme.palette.primary.main, calmMode ? 0.12 : 0.16)} 0%, transparent 60%)`,
                `radial-gradient(900px 480px at 88% 12%, ${alpha(theme.palette.secondary.main, calmMode ? 0.08 : 0.1)} 0%, transparent 62%)`,
                `radial-gradient(1200px 680px at 50% 110%, ${alpha(theme.palette.info.main, calmMode ? 0.08 : 0.1)} 0%, transparent 62%)`,
                `linear-gradient(180deg, ${alpha("#000", 0.55)} 0%, transparent 18%, transparent 82%, ${alpha("#000", 0.6)} 100%)`,
                `repeating-linear-gradient(0deg, ${alpha(theme.palette.text.primary, 0.04)} 0px, ${alpha(theme.palette.text.primary, 0.04)} 1px, transparent 1px, transparent 7px)`,
                `repeating-linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.03)} 0px, ${alpha(theme.palette.text.primary, 0.03)} 1px, transparent 1px, transparent 12px)`,
              ].join(", ")
            : [
                `radial-gradient(960px 500px at 18% 8%, ${alpha(theme.palette.primary.main, calmMode ? 0.08 : 0.11)} 0%, transparent 60%)`,
                `radial-gradient(880px 460px at 86% 12%, ${alpha(theme.palette.secondary.main, calmMode ? 0.06 : 0.08)} 0%, transparent 62%)`,
                `radial-gradient(1180px 640px at 50% 112%, ${alpha(theme.palette.info.main, calmMode ? 0.06 : 0.08)} 0%, transparent 60%)`,
                `linear-gradient(180deg, ${alpha("#FFFFFF", 0.82)} 0%, ${alpha(theme.palette.background.default, 0.9)} 24%, ${alpha(theme.palette.background.default, 0.96)} 100%)`,
                `repeating-linear-gradient(0deg, ${alpha(theme.palette.text.primary, 0.025)} 0px, ${alpha(theme.palette.text.primary, 0.025)} 1px, transparent 1px, transparent 8px)`,
                `repeating-linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.02)} 0px, ${alpha(theme.palette.text.primary, 0.02)} 1px, transparent 1px, transparent 12px)`,
              ].join(", "),
          backgroundAttachment: "fixed",
        },

        ".nc-number": {
          fontFamily: FONT_MONO,
          letterSpacing: "-0.05em",
          textShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.14)}`,
          animation: "ncRise 420ms ease-out 1",
        },

        ".nc-tag": {
          fontFamily: FONT_MONO,
          letterSpacing: "0.08em",
          padding: "0.16em 0.55em",
          borderRadius: 999,
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.08 : 0.06,
          ),
          border: `1px solid ${alpha(theme.palette.primary.main, isDark ? 0.22 : 0.16)}`,
          boxShadow: `0 0 18px ${alpha(theme.palette.primary.main, isDark ? 0.1 : 0.05)}`,
        },

        ".nc-surface-calm, [data-nc-surface='calm']": {
          ...calmSurface(theme),
        },

        ".nc-panel-focus, [data-nc-surface='focus']": {
          ...neonFrame(theme, {
            strength: isDark ? 0.9 : 0.55,
            radius: Number(theme.shape.borderRadius) + 12,
            borderAlpha: isDark ? 0.78 : 0.62,
            glowAlpha: isDark ? 0.16 : 0.08,
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
            isDark ? 0.42 : 0.3,
          ),
          textUnderlineOffset: "3px",
        },
      }),
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
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
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.64 : 0.9,
          ),
          borderBottom: `1px solid ${alpha(theme.palette.info.main, isDark ? 0.18 : 0.12)}`,
          boxShadow: `0 0 28px ${alpha(theme.palette.info.main, isDark ? 0.1 : 0.04)}`,
        }),
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.MuiTypography-h1": {
            textShadow: `0 0 18px ${alpha(theme.palette.info.main, isDark ? 0.1 : 0.04)}`,
          },
          "&.MuiTypography-h2": {
            textShadow: `0 0 14px ${alpha(theme.palette.info.main, isDark ? 0.06 : 0.03)}`,
          },
          "& code": {
            fontFamily: FONT_MONO,
            fontSize: "0.95em",
            padding: "0.1em 0.35em",
            borderRadius: 8,
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.05,
            ),
            border: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
          },
        }),
      },
    },

    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 700,
          textDecorationThickness: "2px",
          textDecorationColor: alpha(
            theme.palette.info.main,
            isDark ? 0.4 : 0.28,
          ),
          "&:hover": {
            textDecorationColor: alpha(
              theme.palette.info.main,
              isDark ? 0.82 : 0.56,
            ),
          },
        }),
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: "none",
          borderRadius: Number(theme.shape.borderRadius) + 10,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.9 : 0.96,
          ),
          border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.1 : 0.08)}`,
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.text.primary, 0.04)} inset`,
            `0 10px 44px ${alpha("#000", isDark ? 0.44 : 0.12)}`,
          ].join(", "),
        }),
      },
    },

    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...neonFrame(theme, {
            strength: isDark ? 0.92 : 0.5,
            borderAlpha: isDark ? 0.76 : 0.58,
            glowAlpha: isDark ? 0.16 : 0.07,
          }),
          backgroundImage: "none",
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.82 : 0.95,
          ),
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.text.primary, 0.04)} inset`,
            `0 18px 64px ${alpha("#000", isDark ? 0.46 : 0.14)}`,
          ].join(", "),
          transition: theme.transitions.create(
            ["transform", "box-shadow", "background-color"],
            { duration: theme.transitions.duration.shorter },
          ),
          "&:hover": {
            transform: "translateY(-1px)",
            backgroundColor: alpha(
              theme.palette.background.paper,
              isDark ? 0.86 : 0.97,
            ),
            boxShadow: [
              `0 0 0 1px ${alpha(theme.palette.text.primary, 0.05)} inset`,
              `0 24px 78px ${alpha("#000", isDark ? 0.54 : 0.18)}`,
            ].join(", "),
          },
        }),
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: alpha(theme.palette.info.main, isDark ? 0.16 : 0.1),
          backgroundImage: `linear-gradient(90deg,
            transparent 0%,
            ${alpha(theme.palette.info.main, isDark ? 0.4 : 0.22)} 35%,
            ${alpha(theme.palette.secondary.main, isDark ? 0.32 : 0.18)} 65%,
            transparent 100%)`,
          height: 1,
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
          fontWeight: 820,
          letterSpacing: "0.02em",
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
          minHeight: 50,
          paddingInline: 24,
          paddingBlock: 14,
        },

        containedPrimary: ({ theme }) => ({
          color: theme.palette.primary.contrastText,
          border: `1px solid ${alpha(theme.palette.primary.main, isDark ? 0.48 : 0.3)}`,
          backgroundImage: `linear-gradient(90deg,
            ${alpha(theme.palette.primary.main, isDark ? 0.62 : 0.84)} 0%,
            ${alpha(theme.palette.secondary.main, isDark ? 0.36 : 0.38)} 55%,
            ${alpha(theme.palette.info.main, isDark ? 0.34 : 0.36)} 100%)`,
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.text.primary, 0.08)} inset`,
            `0 0 26px ${alpha(theme.palette.primary.main, isDark ? 0.18 : 0.08)}`,
            `0 18px 58px ${alpha("#000", isDark ? 0.5 : 0.2)}`,
          ].join(", "),
          "&::before": {
            content: '""',
            position: "absolute",
            inset: -2,
            background: `radial-gradient(220px 90px at 30% 0%,
              ${alpha(theme.palette.primary.main, isDark ? 0.28 : 0.16)} 0%,
              transparent 62%),
             radial-gradient(240px 100px at 70% 0%,
              ${alpha(theme.palette.secondary.main, isDark ? 0.2 : 0.12)} 0%,
              transparent 65%)`,
            filter: "blur(10px)",
            opacity: 0.9,
            pointerEvents: "none",
          },
          "&:hover": {
            transform: "translateY(-1px)",
            borderColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.78 : 0.52,
            ),
            boxShadow: [
              `0 0 0 1px ${alpha(theme.palette.text.primary, 0.1)} inset`,
              `0 0 34px ${alpha(theme.palette.primary.main, isDark ? 0.24 : 0.12)}`,
              `0 24px 74px ${alpha("#000", isDark ? 0.58 : 0.24)}`,
            ].join(", "),
          },
          "&:hover::after": {
            content: '""',
            position: "absolute",
            inset: -10,
            borderRadius: 999,
            border: `1px solid ${alpha(theme.palette.primary.main, isDark ? 0.28 : 0.2)}`,
            animation: "ncPulseRing 1.1s ease-out 1",
            pointerEvents: "none",
          },
        }),

        outlinedPrimary: ({ theme }) => ({
          borderWidth: 1,
          borderColor: alpha(theme.palette.text.primary, isDark ? 0.18 : 0.14),
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.04 : 0.03,
          ),
          boxShadow: `0 0 0 1px ${alpha(theme.palette.text.primary, 0.04)} inset`,
          "&:hover": {
            transform: "translateY(-1px)",
            borderColor: alpha(theme.palette.info.main, isDark ? 0.52 : 0.34),
            backgroundColor: alpha(
              theme.palette.text.primary,
              isDark ? 0.06 : 0.05,
            ),
            boxShadow: `0 0 24px ${alpha(theme.palette.info.main, isDark ? 0.12 : 0.06)}`,
          },
        }),

        textPrimary: ({ theme }) => ({
          color: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.1 : 0.06,
            ),
          },
        }),
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 14,
          border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.12 : 0.08)}`,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.66 : 0.9,
          ),
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.background.paper,
              isDark ? 0.82 : 0.96,
            ),
            boxShadow: `0 0 20px ${alpha(theme.palette.info.main, isDark ? 0.12 : 0.05)}`,
          },
        }),
      },
    },

    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 999,
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          letterSpacing: "0.04em",
          textTransform: "none",
          border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.16 : 0.1)}`,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.72 : 0.92,
          ),
          boxShadow: `0 0 18px ${alpha(theme.palette.info.main, isDark ? 0.08 : 0.04)}`,
        }),
        label: { paddingInline: 12 },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: Number(theme.shape.borderRadius) + 10,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.74 : 0.92,
          ),
          transition: theme.transitions.create(["box-shadow", "border-color"], {
            duration: theme.transitions.duration.shorter,
          }),
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(theme.palette.info.main, isDark ? 0.52 : 0.32),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.info.main,
            boxShadow: `0 0 0 3px ${alpha(theme.palette.info.main, 0.12)}`,
          },
        }),
        notchedOutline: ({ theme }) => ({
          borderColor: alpha(theme.palette.text.primary, isDark ? 0.18 : 0.12),
        }),
        input: {
          paddingBlock: 12,
        },
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
            ${alpha(theme.palette.primary.main, 0.9)},
            ${alpha(theme.palette.info.main, 0.7)})`,
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

    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...neonFrame(theme, {
            strength: isDark ? 0.75 : 0.42,
            radius: Number(theme.shape.borderRadius) + 12,
            borderAlpha: isDark ? 0.72 : 0.54,
            glowAlpha: isDark ? 0.12 : 0.05,
          }),
          backgroundImage: "none",
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.8 : 0.94,
          ),
          border: "none",
          boxShadow: `0 18px 60px ${alpha("#000", isDark ? 0.44 : 0.14)}`,
          "&::before": { display: "none" },
        }),
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 58,
          paddingInline: theme.spacing(2.5),
        }),
        content: () => ({
          margin: 0,
          "& .MuiTypography-root": {
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            letterSpacing: "-0.01em",
          },
        }),
      },
    },

    MuiAccordionDetails: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingInline: theme.spacing(2.5),
          paddingBottom: theme.spacing(2.5),
          color: alpha(theme.palette.text.primary, 0.86),
        }),
      },
    },

    MuiTooltip: {
      defaultProps: { arrow: true },
      styleOverrides: {
        tooltip: ({ theme }) => ({
          borderRadius: Number(theme.shape.borderRadius) + 12,
          fontSize: "0.82rem",
          border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.16 : 0.1)}`,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.94 : 0.98,
          ),
          color: theme.palette.text.primary,
          boxShadow: `0 0 24px ${alpha(theme.palette.info.main, isDark ? 0.12 : 0.05)}`,
        }),
        arrow: ({ theme }) => ({
          color: alpha(theme.palette.background.paper, isDark ? 0.94 : 0.98),
        }),
      },
    },
  };
};

export const neonComplianceLight = {
  name: "Neon Compliance Light",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#00AFC7",
      dark: "#007E91",
      light: "#7FE5F2",
      contrastText: "#052129",
    },

    secondary: {
      main: "#E24AF6",
      dark: "#B92ED1",
      light: "#F2A7FF",
      contrastText: "#2A0A31",
    },

    info: {
      main: "#466BFF",
      dark: "#2E4ED8",
      light: "#9DB2FF",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#00B869",
      dark: "#008F50",
      light: "#80E9B8",
      contrastText: "#062318",
    },

    warning: {
      main: "#D7A400",
      dark: "#A87E00",
      light: "#F4D86F",
      contrastText: "#2A2105",
    },

    error: {
      main: "#E34D73",
      dark: "#BB2F55",
      light: "#F4A3B9",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F7FAFF",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#171C2B",
      secondary: "#5E6784",
      disabled: alpha("#171C2B", 0.42),
    },

    divider: alpha("#171C2B", 0.1),

    action: {
      hover: alpha("#466BFF", 0.05),
      selected: alpha("#00AFC7", 0.08),
      focus: alpha("#466BFF", 0.16),
      active: alpha("#171C2B", 0.56),
      disabled: alpha("#171C2B", 0.28),
      disabledBackground: alpha("#171C2B", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 18 },
  spacing: 8,

  components: createComponents(false),
} satisfies NamedThemeOptions;

export const neonCompliance = {
  name: "Neon Compliance",
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: "#00F5FF",
      dark: "#00C8D2",
      light: "#8BFBFF",
      contrastText: "#061019",
    },

    secondary: {
      main: "#FF3DFF",
      dark: "#C81FC8",
      light: "#FF9BFF",
      contrastText: "#120316",
    },

    info: {
      main: "#4D7CFE",
      dark: "#2B59F3",
      light: "#93B3FF",
      contrastText: "#040717",
    },

    success: {
      main: "#00FF8A",
      dark: "#00D874",
      light: "#87FFC6",
      contrastText: "#04110B",
    },

    warning: {
      main: "#FFE600",
      dark: "#D6C000",
      light: "#FFF27A",
      contrastText: "#120F03",
    },

    error: {
      main: "#FF2E6D",
      dark: "#D81B57",
      light: "#FF94B5",
      contrastText: "#12040A",
    },

    background: {
      default: "#060812",
      paper: "#0A1022",
    },

    text: {
      primary: "#EAF2FF",
      secondary: "#9FB1DA",
      disabled: alpha("#EAF2FF", 0.44),
    },

    divider: alpha("#EAF2FF", 0.12),

    action: {
      hover: alpha("#00F5FF", 0.12),
      selected: alpha("#00F5FF", 0.2),
      focus: alpha("#4D7CFE", 0.22),
      active: alpha("#EAF2FF", 0.56),
      disabled: alpha("#EAF2FF", 0.28),
      disabledBackground: alpha("#EAF2FF", 0.08),
    },
  },

  typography,

  shape: { borderRadius: 18 },
  spacing: 8,

  components: createComponents(true),
} satisfies NamedThemeOptions;

export const neonComplianceCalm = {
  ...neonCompliance,
  name: "Neon Compliance (Calm)",
  components: createComponents(true, { calmMode: true }),
} satisfies NamedThemeOptions;
