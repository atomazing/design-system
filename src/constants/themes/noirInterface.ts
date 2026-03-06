import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Noir Interface
 * Visual: premium tech-noir with restrained accents, disciplined surfaces,
 * and a quieter default cadence than the more theatrical neon themes.
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
    fontWeight: 820,
    fontSize: "clamp(2.25rem, 4.1vw, 3.4rem)",
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
    fontWeight: 760,
    fontSize: "clamp(1.22rem, 2vw, 1.6rem)",
    lineHeight: 1.18,
    letterSpacing: "-0.015em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 740,
    fontSize: "1.14rem",
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
  },

  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 720,
    fontSize: "1.02rem",
    lineHeight: 1.55,
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 720,
    fontSize: "0.92rem",
    lineHeight: 1.55,
  },

  body1: { fontSize: "1rem", lineHeight: 1.85 },
  body2: { fontSize: "0.92rem", lineHeight: 1.72 },

  button: {
    fontFamily: FONT_DISPLAY,
    textTransform: "none",
    fontWeight: 820,
    letterSpacing: "0.02em",
  },

  caption: { fontSize: "0.82rem", letterSpacing: "0.01em" },
  overline: {
    fontFamily: FONT_DISPLAY,
    fontSize: "0.74rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 900,
  },
} as const;

interface NoirSurfaceOptions {
  radius?: number;
  borderAlpha?: number;
  paperAlpha?: number;
  accent?: string;
  shadowAlpha?: number;
  smokeAlpha?: number;
  showLine?: boolean;
}

const noirSurface = (theme: Theme, opts?: NoirSurfaceOptions) => {
  const radius = opts?.radius ?? Number(theme.shape.borderRadius) + 14;
  const borderAlpha = opts?.borderAlpha ?? 0.18;
  const paperAlpha = opts?.paperAlpha ?? 0.76;
  const accent = opts?.accent ?? theme.palette.info.main;
  const shadowAlpha =
    opts?.shadowAlpha ?? (theme.palette.mode === "dark" ? 0.58 : 0.14);
  const smokeAlpha =
    opts?.smokeAlpha ?? (theme.palette.mode === "dark" ? 0.1 : 0.05);
  const showLine = opts?.showLine ?? true;

  return {
    position: "relative" as const,
    borderRadius: radius,
    overflow: "hidden" as const,
    backgroundImage: "none",
    backgroundColor: alpha(theme.palette.background.paper, paperAlpha),
    border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
    boxShadow: [
      `0 0 0 1px ${alpha(theme.palette.text.primary, 0.04)} inset`,
      `0 20px 70px ${alpha("#000", shadowAlpha)}`,
    ].join(", "),

    "&::before": {
      content: '""',
      position: "absolute" as const,
      inset: -1,
      borderRadius: radius,
      background: `radial-gradient(700px 240px at 18% 0%,
        ${alpha(theme.palette.primary.main, smokeAlpha)} 0%,
        transparent 62%),
        radial-gradient(760px 260px at 86% 0%,
        ${alpha(accent, smokeAlpha * 0.9)} 0%,
        transparent 62%)`,
      opacity: 0.9,
      pointerEvents: "none" as const,
    },

    "&::after": {
      content: '""',
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      backgroundImage: `linear-gradient(90deg,
        transparent 0%,
        ${alpha(theme.palette.text.primary, 0.18)} 25%,
        ${alpha(accent, 0.18)} 50%,
        ${alpha(theme.palette.text.primary, 0.14)} 75%,
        transparent 100%)`,
      opacity: showLine ? 0.72 : 0,
      pointerEvents: "none" as const,
    },
  };
};

const calmSurface = (theme: Theme) => ({
  position: "relative" as const,
  borderRadius: Number(theme.shape.borderRadius) + 14,
  backgroundColor: alpha(
    theme.palette.background.paper,
    theme.palette.mode === "dark" ? 0.9 : 0.96,
  ),
  border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.1 : 0.08)}`,
  boxShadow: [
    `0 0 0 1px ${alpha(theme.palette.text.primary, 0.04)} inset`,
    `0 16px 56px ${alpha("#000", theme.palette.mode === "dark" ? 0.34 : 0.12)}`,
  ].join(", "),
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
});

const createComponents = (
  isDark: boolean,
  opts?: { deepMode?: boolean },
): ThemeOptions["components"] => {
  const deepMode = opts?.deepMode ?? false;

  return {
    MuiCssBaseline: {
      styleOverrides: (theme: Theme) => ({
        ":root": {
          "--noir-primary": theme.palette.primary.main,
          "--noir-cool": theme.palette.info.main,
        },

        "@keyframes noirRise": {
          "0%": { transform: "translateY(8px)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },

        "*, *::before, *::after": { boxSizing: "border-box" },

        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          backgroundImage: isDark
            ? [
                `radial-gradient(1100px 620px at 22% 10%, ${alpha(theme.palette.primary.main, deepMode ? 0.08 : 0.1)} 0%, transparent 62%)`,
                `radial-gradient(1000px 580px at 82% 14%, ${alpha(theme.palette.secondary.main, deepMode ? 0.06 : 0.08)} 0%, transparent 66%)`,
                `linear-gradient(180deg, ${alpha("#000", deepMode ? 0.78 : 0.7)} 0%, transparent 22%, transparent 78%, ${alpha("#000", deepMode ? 0.86 : 0.78)} 100%)`,
                `repeating-linear-gradient(0deg, ${alpha(theme.palette.common.white, 0.018)} 0px, transparent 1px, transparent 3px)`,
                `repeating-linear-gradient(90deg, ${alpha(theme.palette.common.white, 0.025)} 0px, transparent 1px, transparent 22px)`,
              ].join(", ")
            : [
                `radial-gradient(1040px 580px at 22% 8%, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 62%)`,
                `radial-gradient(980px 540px at 82% 12%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 66%)`,
                `linear-gradient(180deg, ${alpha("#FFFFFF", 0.82)} 0%, ${alpha(theme.palette.background.default, 0.9)} 24%, ${alpha(theme.palette.background.default, 0.96)} 100%)`,
                `repeating-linear-gradient(0deg, ${alpha(theme.palette.text.primary, 0.018)} 0px, transparent 1px, transparent 3px)`,
                `repeating-linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.02)} 0px, transparent 1px, transparent 22px)`,
              ].join(", "),
          backgroundAttachment: "fixed",
        },

        ".noir-number": {
          fontFamily: FONT_MONO,
          letterSpacing: "-0.05em",
          textShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.12)}`,
          animation: "noirRise 420ms ease-out 1",
        },

        ".noir-surface-calm, [data-noir-surface='calm']": {
          ...calmSurface(theme),
        },

        ".noir-panel-focus, [data-noir-surface='focus']": {
          ...noirSurface(theme, {
            radius: Number(theme.shape.borderRadius) + 18,
            paperAlpha: isDark ? 0.82 : 0.95,
            borderAlpha: isDark ? 0.16 : 0.1,
            accent: theme.palette.primary.main,
            shadowAlpha: isDark ? 0.5 : 0.16,
            smokeAlpha: isDark ? 0.14 : 0.07,
            showLine: true,
          }),
        },

        "*::selection": {
          backgroundColor: alpha(theme.palette.primary.main, 0.24),
          color: theme.palette.text.primary,
        },

        a: {
          color: isDark ? theme.palette.info.light : theme.palette.info.dark,
          textDecorationColor: alpha(
            theme.palette.info.main,
            isDark ? 0.38 : 0.26,
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
          ...noirSurface(theme, {
            radius: Number(theme.shape.borderRadius) + 18,
            paperAlpha: isDark ? 0.6 : 0.92,
            borderAlpha: isDark ? 0.14 : 0.08,
            accent: theme.palette.info.main,
            shadowAlpha: isDark ? 0.42 : 0.1,
            smokeAlpha: isDark ? 0.08 : 0.04,
            showLine: false,
          }),
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }),
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...noirSurface(theme, {
            radius: Number(theme.shape.borderRadius) + 14,
            paperAlpha: isDark ? 0.8 : 0.96,
            borderAlpha: isDark ? 0.14 : 0.08,
            accent: theme.palette.info.main,
            shadowAlpha: isDark ? 0.42 : 0.12,
            smokeAlpha: isDark ? 0.08 : 0.04,
          }),
        }),
      },
    },

    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...noirSurface(theme, {
            radius: Number(theme.shape.borderRadius) + 18,
            paperAlpha: isDark ? 0.78 : 0.95,
            borderAlpha: isDark ? 0.16 : 0.09,
            accent: theme.palette.info.main,
            shadowAlpha: isDark ? 0.48 : 0.14,
            smokeAlpha: isDark ? 0.09 : 0.05,
          }),
          transition: theme.transitions.create(["transform", "box-shadow"], {
            duration: theme.transitions.duration.shorter,
          }),
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: [
              `0 0 0 1px ${alpha(theme.palette.text.primary, 0.05)} inset`,
              `0 24px 82px ${alpha("#000", isDark ? 0.58 : 0.16)}`,
            ].join(", "),
          },
        }),
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.MuiTypography-h1": {
            textShadow: `0 0 20px ${alpha(theme.palette.primary.main, isDark ? 0.1 : 0.04)}`,
          },
          "&.MuiTypography-h2": {
            textShadow: `0 0 14px ${alpha(theme.palette.primary.main, isDark ? 0.06 : 0.03)}`,
          },
          "& code": {
            fontFamily: FONT_MONO,
            fontSize: "0.95em",
            padding: "0.12em 0.42em",
            borderRadius: 10,
            backgroundColor: alpha(
              theme.palette.text.primary,
              isDark ? 0.05 : 0.04,
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
            ${alpha(theme.palette.text.primary, 0.12)} 20%,
            ${alpha(theme.palette.info.main, isDark ? 0.16 : 0.12)} 50%,
            ${alpha(theme.palette.text.primary, 0.1)} 80%,
            transparent 100%)`,
          opacity: 0.72,
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
          position: "relative",
          overflow: "hidden",
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
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.95 : 0.88,
          ),
          border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.14 : 0.1)}`,
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.text.primary, 0.08)} inset`,
            `0 18px 70px ${alpha("#000", isDark ? 0.55 : 0.2)}`,
            `0 0 34px ${alpha(theme.palette.primary.main, isDark ? 0.16 : 0.08)}`,
          ].join(", "),
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `linear-gradient(120deg,
              transparent 0%,
              ${alpha(theme.palette.common.white, isDark ? 0.14 : 0.2)} 40%,
              transparent 70%)`,
            opacity: 0.75,
            pointerEvents: "none",
          },
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: [
              `0 0 0 1px ${alpha(theme.palette.text.primary, 0.1)} inset`,
              `0 24px 86px ${alpha("#000", isDark ? 0.68 : 0.24)}`,
              `0 0 36px ${alpha(theme.palette.primary.main, isDark ? 0.18 : 0.1)}`,
            ].join(", "),
          },
        }),

        outlinedPrimary: ({ theme }) => ({
          color: theme.palette.text.primary,
          borderWidth: 1,
          borderColor: alpha(theme.palette.text.primary, isDark ? 0.18 : 0.14),
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.04 : 0.03,
          ),
          "&:hover": {
            transform: "translateY(-1px)",
            backgroundColor: alpha(
              theme.palette.text.primary,
              isDark ? 0.06 : 0.05,
            ),
            borderColor: alpha(
              theme.palette.text.primary,
              isDark ? 0.26 : 0.18,
            ),
            boxShadow: `0 0 28px ${alpha(theme.palette.info.main, isDark ? 0.1 : 0.05)}`,
          },
        }),

        textPrimary: ({ theme }) => ({
          color: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.05,
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
            theme.palette.text.primary,
            isDark ? 0.04 : 0.03,
          ),
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.text.primary,
              isDark ? 0.06 : 0.05,
            ),
            boxShadow: `0 0 18px ${alpha(theme.palette.info.main, isDark ? 0.08 : 0.04)}`,
            transform: "translateY(-1px)",
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
          letterSpacing: "0.03em",
          textTransform: "none",
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.05 : 0.04,
          ),
          border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.12 : 0.08)}`,
        }),
        label: { paddingInline: 12 },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 46,
          borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        }),
        indicator: ({ theme }) => ({
          height: 2,
          borderRadius: 999,
          backgroundImage: `linear-gradient(90deg,
            ${alpha(theme.palette.primary.main, 0.9)},
            ${alpha(theme.palette.info.main, 0.7)})`,
          boxShadow: `0 0 16px ${alpha(theme.palette.primary.main, 0.12)}`,
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
            color: theme.palette.text.primary,
          },
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: Number(theme.shape.borderRadius) + 14,
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.04 : 0.03,
          ),
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(
              theme.palette.text.primary,
              isDark ? 0.22 : 0.16,
            ),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(theme.palette.info.main, 0.58),
            boxShadow: `0 0 0 3px ${alpha(theme.palette.info.main, 0.12)}`,
          },
        }),
        notchedOutline: ({ theme }) => ({
          borderColor: alpha(theme.palette.text.primary, isDark ? 0.14 : 0.1),
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

    MuiTooltip: {
      defaultProps: { arrow: true },
      styleOverrides: {
        tooltip: ({ theme }) => ({
          ...noirSurface(theme, {
            radius: Number(theme.shape.borderRadius) + 16,
            paperAlpha: isDark ? 0.82 : 0.97,
            borderAlpha: isDark ? 0.14 : 0.08,
            accent: theme.palette.info.main,
            shadowAlpha: isDark ? 0.36 : 0.12,
            smokeAlpha: isDark ? 0.06 : 0.03,
          }),
          fontSize: "0.84rem",
          padding: theme.spacing(1.25, 1.5),
        }),
        arrow: ({ theme }) => ({
          color: alpha(theme.palette.background.paper, isDark ? 0.82 : 0.97),
        }),
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...noirSurface(theme, {
            radius: Number(theme.shape.borderRadius) + 18,
            paperAlpha: isDark ? 0.76 : 0.95,
            borderAlpha: isDark ? 0.14 : 0.08,
            accent: theme.palette.info.main,
            shadowAlpha: isDark ? 0.42 : 0.14,
            smokeAlpha: isDark ? 0.08 : 0.04,
          }),
          "&::before": { display: "none" },
        }),
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 58,
          paddingInline: theme.spacing(2.5),
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.text.primary,
              isDark ? 0.03 : 0.02,
            ),
          },
        }),
        content: () => ({
          margin: 0,
          "& .MuiTypography-root": {
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
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

    MuiSnackbarContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...noirSurface(theme, {
            radius: Number(theme.shape.borderRadius) + 18,
            paperAlpha: isDark ? 0.82 : 0.96,
            borderAlpha: isDark ? 0.14 : 0.08,
            accent: theme.palette.info.main,
            shadowAlpha: isDark ? 0.36 : 0.12,
            smokeAlpha: isDark ? 0.06 : 0.03,
          }),
        }),
      },
    },
  };
};

export const noirInterfaceLight = {
  name: "Noir Interface Light",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#8F63E6",
      dark: "#7047C7",
      light: "#C7AEF7",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#43BED6",
      dark: "#2F9FB6",
      light: "#A3E4F0",
      contrastText: "#082129",
    },

    info: {
      main: "#5574E6",
      dark: "#3C58C2",
      light: "#A5B5F3",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#2AA86A",
      dark: "#1E8453",
      light: "#8BDEB0",
      contrastText: "#FFFFFF",
    },

    warning: {
      main: "#D4A038",
      dark: "#A77C22",
      light: "#F1D08A",
      contrastText: "#2A1E08",
    },

    error: {
      main: "#D85D74",
      dark: "#B6465B",
      light: "#F0A6B4",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F7F6FA",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1E2130",
      secondary: "#666B82",
      disabled: alpha("#1E2130", 0.42),
    },

    divider: alpha("#1E2130", 0.1),

    action: {
      hover: alpha("#1E2130", 0.04),
      selected: alpha("#8F63E6", 0.08),
      focus: alpha("#5574E6", 0.16),
      active: alpha("#1E2130", 0.56),
      disabled: alpha("#1E2130", 0.26),
      disabledBackground: alpha("#1E2130", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 18 },
  spacing: 8,

  components: createComponents(false),
} satisfies NamedThemeOptions;

export const noirInterface = {
  name: "Noir Interface",
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: "#D0A8FF",
      dark: "#B782FF",
      light: "#E7D1FF",
      contrastText: "#08070D",
    },

    secondary: {
      main: "#66E6FF",
      dark: "#2FD1F2",
      light: "#B9F5FF",
      contrastText: "#061019",
    },

    info: {
      main: "#7AA2FF",
      dark: "#4E7BFF",
      light: "#B8CBFF",
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
      default: "#06050A",
      paper: "#0C0B13",
    },

    text: {
      primary: "#F4F6FF",
      secondary: "#C3C7E6",
      disabled: alpha("#F4F6FF", 0.44),
    },

    divider: alpha("#F4F6FF", 0.1),

    action: {
      hover: alpha("#F4F6FF", 0.06),
      selected: alpha("#F4F6FF", 0.1),
      focus: alpha("#7AA2FF", 0.22),
      active: alpha("#F4F6FF", 0.62),
      disabled: alpha("#F4F6FF", 0.26),
      disabledBackground: alpha("#F4F6FF", 0.08),
    },
  },

  typography,

  shape: { borderRadius: 18 },
  spacing: 8,

  components: createComponents(true),
} satisfies NamedThemeOptions;

export const noirInterfaceDeep = {
  ...noirInterface,
  name: "Noir Interface (Deep)",
  palette: {
    ...noirInterface.palette,
    background: {
      default: "#040309",
      paper: "#090814",
    },
  },
  components: createComponents(true, { deepMode: true }),
} satisfies NamedThemeOptions;
