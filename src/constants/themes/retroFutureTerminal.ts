import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Retro-Future Terminal
 * Visual: terminal-inspired landing preset with restrained scanlines,
 * disciplined panels, and reserved neon intensity.
 */

const FONT_MONO =
  '"JetBrains Mono","IBM Plex Mono","Roboto Mono","Menlo","Consolas",monospace';
const FONT_SANS =
  '"Space Grotesk","Sora","Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';

const typography = {
  fontFamily: FONT_MONO,

  h1: {
    fontFamily: FONT_MONO,
    fontWeight: 900,
    fontSize: "clamp(2.3rem, 4.4vw, 3.7rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.03em",
  },
  h2: {
    fontFamily: FONT_MONO,
    fontWeight: 900,
    fontSize: "clamp(1.7rem, 3.1vw, 2.55rem)",
    lineHeight: 1.06,
    letterSpacing: "-0.02em",
  },
  h3: {
    fontFamily: FONT_MONO,
    fontWeight: 850,
    fontSize: "clamp(1.25rem, 2.1vw, 1.7rem)",
    lineHeight: 1.14,
  },
  h4: {
    fontFamily: FONT_MONO,
    fontWeight: 850,
    fontSize: "1.16rem",
    lineHeight: 1.22,
  },

  subtitle1: {
    fontFamily: FONT_SANS,
    fontWeight: 780,
    fontSize: "1.04rem",
    lineHeight: 1.55,
    letterSpacing: "0.01em",
  },
  subtitle2: {
    fontFamily: FONT_SANS,
    fontWeight: 760,
    fontSize: "0.92rem",
    lineHeight: 1.55,
    letterSpacing: "0.03em",
    textTransform: "none",
  },

  body1: { fontFamily: FONT_SANS, fontSize: "1rem", lineHeight: 1.85 },
  body2: { fontFamily: FONT_SANS, fontSize: "0.92rem", lineHeight: 1.72 },

  button: {
    fontFamily: FONT_MONO,
    textTransform: "none",
    fontWeight: 850,
    letterSpacing: "0.03em",
  },

  caption: { fontFamily: FONT_SANS, fontSize: "0.82rem" },
  overline: {
    fontFamily: FONT_MONO,
    fontSize: "0.74rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 900,
  },
} as const;

interface TerminalPanelOptions {
  radius?: number;
  borderAlpha?: number;
  bgAlpha?: number;
  accent?: string;
  shadowAlpha?: number;
  headerAlpha?: number;
  glowAlpha?: number;
  showHeader?: boolean;
  showDots?: boolean;
}

const terminalPanel = (theme: Theme, opts?: TerminalPanelOptions) => {
  const radius = opts?.radius ?? Number(theme.shape.borderRadius) + 14;
  const borderAlpha =
    opts?.borderAlpha ?? (theme.palette.mode === "dark" ? 0.18 : 0.09);
  const bgAlpha =
    opts?.bgAlpha ?? (theme.palette.mode === "dark" ? 0.82 : 0.95);
  const accent = opts?.accent ?? theme.palette.info.main;
  const shadowAlpha =
    opts?.shadowAlpha ?? (theme.palette.mode === "dark" ? 0.56 : 0.14);
  const headerAlpha =
    opts?.headerAlpha ?? (theme.palette.mode === "dark" ? 0.1 : 0.06);
  const glowAlpha =
    opts?.glowAlpha ?? (theme.palette.mode === "dark" ? 0.1 : 0.04);
  const showHeader = opts?.showHeader ?? true;
  const showDots = opts?.showDots ?? showHeader;

  return {
    position: "relative" as const,
    borderRadius: radius,
    overflow: "hidden" as const,
    backgroundImage: "none",
    backgroundColor: alpha(theme.palette.background.paper, bgAlpha),
    border: `1px solid ${alpha(accent, borderAlpha)}`,
    boxShadow: [
      `0 0 0 1px ${alpha(theme.palette.text.primary, 0.04)} inset`,
      `0 18px 70px ${alpha("#000", shadowAlpha)}`,
      `0 0 28px ${alpha(accent, glowAlpha)}`,
    ].join(", "),

    "&::before": {
      content: '""',
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
      height: 30,
      backgroundImage: `linear-gradient(90deg,
        ${alpha(accent, headerAlpha)} 0%,
        ${alpha(accent, headerAlpha * 0.4)} 65%,
        transparent 100%)`,
      borderBottom: `1px solid ${alpha(accent, headerAlpha * 1.8)}`,
      opacity: showHeader ? 0.96 : 0,
      pointerEvents: "none" as const,
    },

    "&::after": {
      content: '""',
      position: "absolute" as const,
      top: 10,
      left: 12,
      width: 46,
      height: 10,
      backgroundImage: `radial-gradient(${alpha(theme.palette.error.main, 0.82)} 4px, transparent 5px),
        radial-gradient(${alpha(theme.palette.warning.main, 0.82)} 4px, transparent 5px),
        radial-gradient(${alpha(theme.palette.success.main, 0.82)} 4px, transparent 5px)`,
      backgroundPosition: "0 0, 18px 0, 36px 0",
      backgroundRepeat: "no-repeat",
      opacity: showDots ? 0.8 : 0,
      pointerEvents: "none" as const,
    },
  };
};

const calmSurface = (theme: Theme) => ({
  position: "relative" as const,
  borderRadius: Number(theme.shape.borderRadius) + 14,
  backgroundColor: alpha(
    theme.palette.background.paper,
    theme.palette.mode === "dark" ? 0.9 : 0.97,
  ),
  border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.09 : 0.07)}`,
  boxShadow: [
    `0 0 0 1px ${alpha(theme.palette.text.primary, 0.04)} inset`,
    `0 16px 56px ${alpha("#000", theme.palette.mode === "dark" ? 0.34 : 0.12)}`,
  ].join(", "),
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
});

const createComponents = (isDark: boolean): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      ":root": {
        "--rft-primary": theme.palette.primary.main,
        "--rft-cool": theme.palette.info.main,
      },

      "@keyframes rftCursor": {
        "0%, 45%": { opacity: 1 },
        "46%, 100%": { opacity: 0 },
      },
      "@keyframes rftRise": {
        "0%": { transform: "translateY(8px)", opacity: 0 },
        "100%": { transform: "translateY(0px)", opacity: 1 },
      },

      "*, *::before, *::after": { boxSizing: "border-box" },

      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundImage: isDark
          ? [
              `radial-gradient(1000px 580px at 18% 12%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 62%)`,
              `radial-gradient(920px 540px at 82% 12%, ${alpha(theme.palette.info.main, 0.08)} 0%, transparent 66%)`,
              `linear-gradient(180deg, ${alpha("#000", 0.7)} 0%, transparent 22%, transparent 78%, ${alpha("#000", 0.78)} 100%)`,
              `repeating-linear-gradient(180deg, ${alpha("#000", 0)} 0px, ${alpha("#000", 0)} 3px, ${alpha("#000", 0.18)} 4px)`,
            ].join(", ")
          : [
              `radial-gradient(980px 560px at 18% 10%, ${alpha(theme.palette.primary.main, 0.07)} 0%, transparent 62%)`,
              `radial-gradient(900px 520px at 82% 10%, ${alpha(theme.palette.info.main, 0.06)} 0%, transparent 66%)`,
              `linear-gradient(180deg, ${alpha("#FFFFFF", 0.84)} 0%, ${alpha(theme.palette.background.default, 0.92)} 28%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
              `repeating-linear-gradient(180deg, ${alpha(theme.palette.text.primary, 0)} 0px, ${alpha(theme.palette.text.primary, 0)} 3px, ${alpha(theme.palette.text.primary, 0.05)} 4px)`,
            ].join(", "),
        backgroundAttachment: "fixed",
      },

      "*::selection": {
        backgroundColor: alpha(theme.palette.primary.main, 0.24),
        color: theme.palette.text.primary,
      },

      a: {
        color: isDark ? theme.palette.info.light : theme.palette.info.dark,
        textDecorationColor: alpha(
          theme.palette.info.main,
          isDark ? 0.38 : 0.24,
        ),
        textUnderlineOffset: "3px",
      },

      ".rft-number": {
        fontFamily: FONT_MONO,
        letterSpacing: "-0.05em",
        textShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.12)}`,
        animation: "rftRise 380ms ease-out 1",
      },

      ".rft-surface-calm, [data-rft-surface='calm']": {
        ...calmSurface(theme),
      },

      ".rft-panel-focus, [data-rft-surface='focus']": {
        ...terminalPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 18,
          bgAlpha: isDark ? 0.84 : 0.97,
          borderAlpha: isDark ? 0.2 : 0.11,
          accent: theme.palette.primary.main,
          shadowAlpha: isDark ? 0.5 : 0.16,
          headerAlpha: isDark ? 0.14 : 0.08,
          glowAlpha: isDark ? 0.16 : 0.07,
          showHeader: true,
          showDots: true,
        }),
      },

      ".rft-cursor::after": {
        content: '"_"',
        marginLeft: "0.25em",
        opacity: 1,
        animation: "rftCursor 1.05s steps(2, end) infinite",
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
        ...terminalPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 18,
          bgAlpha: isDark ? 0.64 : 0.92,
          borderAlpha: isDark ? 0.14 : 0.08,
          accent: theme.palette.info.main,
          shadowAlpha: isDark ? 0.4 : 0.1,
          headerAlpha: isDark ? 0.06 : 0.04,
          glowAlpha: isDark ? 0.06 : 0.02,
          showHeader: false,
          showDots: false,
        }),
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...calmSurface(theme),
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...terminalPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 18,
          bgAlpha: isDark ? 0.8 : 0.96,
          borderAlpha: isDark ? 0.14 : 0.08,
          accent: theme.palette.info.main,
          shadowAlpha: isDark ? 0.46 : 0.14,
          headerAlpha: isDark ? 0.05 : 0.03,
          glowAlpha: isDark ? 0.06 : 0.03,
          showHeader: false,
          showDots: false,
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
        "&.MuiTypography-h1, &.MuiTypography-h2": {
          textShadow: `0 0 18px ${alpha(theme.palette.primary.main, isDark ? 0.1 : 0.04)}`,
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
          ${alpha(theme.palette.info.main, isDark ? 0.16 : 0.1)} 50%,
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
        borderRadius: 14,
        paddingInline: 18,
        paddingBlock: 12,
        minHeight: 44,
        fontWeight: 850,
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
        paddingInline: 22,
        paddingBlock: 14,
      },

      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        backgroundColor: alpha(
          theme.palette.primary.main,
          isDark ? 0.94 : 0.88,
        ),
        border: `1px solid ${alpha(theme.palette.primary.main, isDark ? 0.28 : 0.16)}`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.primary.main, 0.12)} inset`,
          `0 18px 70px ${alpha("#000", isDark ? 0.55 : 0.2)}`,
          `0 0 22px ${alpha(theme.palette.primary.main, isDark ? 0.16 : 0.08)}`,
        ].join(", "),
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(135deg,
            ${alpha(theme.palette.background.default, 0)} 0px,
            ${alpha(theme.palette.background.default, 0)} 8px,
            ${alpha(theme.palette.background.default, isDark ? 0.2 : 0.12)} 8px,
            ${alpha(theme.palette.background.default, isDark ? 0.2 : 0.12)} 12px)`,
          opacity: 0.22,
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.primary.main, 0.16)} inset`,
            `0 24px 86px ${alpha("#000", isDark ? 0.68 : 0.24)}`,
            `0 0 30px ${alpha(theme.palette.primary.main, isDark ? 0.2 : 0.1)}`,
          ].join(", "),
        },
      }),

      outlinedPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderWidth: 1,
        borderColor: alpha(theme.palette.text.primary, isDark ? 0.18 : 0.12),
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
          boxShadow: `0 0 26px ${alpha(theme.palette.info.main, isDark ? 0.08 : 0.04)}`,
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
        borderRadius: 12,
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
        borderRadius: 12,
        fontFamily: FONT_MONO,
        fontWeight: 850,
        letterSpacing: "0.03em",
        textTransform: "none",
        border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.12 : 0.08)}`,
        backgroundColor: alpha(
          theme.palette.text.primary,
          isDark ? 0.05 : 0.04,
        ),
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
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.16)}`,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        fontFamily: FONT_MONO,
        fontWeight: 850,
        letterSpacing: "0.03em",
        textTransform: "none",
        color: alpha(theme.palette.text.primary, 0.8),
        "&.Mui-selected": {
          color: theme.palette.primary.main,
          textShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.14)}`,
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
          borderColor: alpha(theme.palette.text.primary, isDark ? 0.2 : 0.14),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.primary.main, 0.55),
          boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.12)}`,
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, isDark ? 0.14 : 0.09),
      }),
      input: { paddingBlock: 12 },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_MONO,
        fontWeight: 800,
        letterSpacing: "0.02em",
        textTransform: "none",
        color: alpha(theme.palette.text.secondary, 0.92),
        "&.Mui-focused": { color: theme.palette.primary.main },
      }),
    },
  },

  MuiTooltip: {
    defaultProps: { arrow: true },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...terminalPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 16,
          bgAlpha: isDark ? 0.86 : 0.97,
          borderAlpha: isDark ? 0.14 : 0.08,
          accent: theme.palette.info.main,
          shadowAlpha: isDark ? 0.34 : 0.12,
          headerAlpha: isDark ? 0.05 : 0.03,
          glowAlpha: isDark ? 0.05 : 0.02,
          showHeader: false,
          showDots: false,
        }),
        fontSize: "0.84rem",
        padding: theme.spacing(1.25, 1.5),
      }),
      arrow: ({ theme }) => ({
        color: alpha(theme.palette.background.paper, isDark ? 0.86 : 0.97),
      }),
    },
  },

  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...calmSurface(theme),
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
          fontFamily: FONT_MONO,
          fontWeight: 850,
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
        ...terminalPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 18,
          bgAlpha: isDark ? 0.86 : 0.97,
          borderAlpha: isDark ? 0.14 : 0.08,
          accent: theme.palette.info.main,
          shadowAlpha: isDark ? 0.34 : 0.12,
          headerAlpha: isDark ? 0.05 : 0.03,
          glowAlpha: isDark ? 0.05 : 0.02,
          showHeader: false,
          showDots: false,
        }),
      }),
    },
  },
});

export const retroFutureTerminalLight = {
  name: "Retro-Future Terminal Light",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#1FA45A",
      dark: "#177C44",
      light: "#73D79D",
      contrastText: "#05130A",
    },

    secondary: {
      main: "#1CA4C8",
      dark: "#127F9B",
      light: "#7BD8EC",
      contrastText: "#041A20",
    },

    info: {
      main: "#3D6FE6",
      dark: "#294FBA",
      light: "#A6BDFC",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#1FA45A",
      dark: "#177C44",
      light: "#73D79D",
      contrastText: "#05130A",
    },

    warning: {
      main: "#D3942B",
      dark: "#A9751A",
      light: "#F1C97B",
      contrastText: "#241806",
    },

    error: {
      main: "#D85D72",
      dark: "#B64458",
      light: "#F1A5B2",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F4F8F4",
      paper: "#FBFEFB",
    },

    text: {
      primary: "#102118",
      secondary: "#4E675A",
      disabled: alpha("#102118", 0.42),
    },

    divider: alpha("#102118", 0.1),

    action: {
      hover: alpha("#102118", 0.04),
      selected: alpha("#1FA45A", 0.08),
      focus: alpha("#3D6FE6", 0.16),
      active: alpha("#102118", 0.56),
      disabled: alpha("#102118", 0.26),
      disabledBackground: alpha("#102118", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 14 },
  spacing: 8,

  components: createComponents(false),
} satisfies NamedThemeOptions;

export const retroFutureTerminal = {
  name: "Retro-Future Terminal",
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: "#32FF7E",
      dark: "#20D963",
      light: "#86FFB1",
      contrastText: "#06120A",
    },

    secondary: {
      main: "#00E5FF",
      dark: "#00BBD6",
      light: "#7AF3FF",
      contrastText: "#061019",
    },

    info: {
      main: "#7AA2FF",
      dark: "#4E7BFF",
      light: "#B8CBFF",
      contrastText: "#061019",
    },

    success: {
      main: "#32FF7E",
      dark: "#20D963",
      light: "#86FFB1",
      contrastText: "#06120A",
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
      default: "#050A06",
      paper: "#08140C",
    },

    text: {
      primary: "#E9FFF1",
      secondary: "#A7E8BE",
      disabled: alpha("#E9FFF1", 0.44),
    },

    divider: alpha("#32FF7E", 0.16),

    action: {
      hover: alpha("#32FF7E", 0.1),
      selected: alpha("#32FF7E", 0.16),
      focus: alpha("#00E5FF", 0.18),
      active: alpha("#E9FFF1", 0.62),
      disabled: alpha("#E9FFF1", 0.26),
      disabledBackground: alpha("#E9FFF1", 0.08),
    },
  },

  typography,

  shape: { borderRadius: 14 },
  spacing: 8,

  components: createComponents(true),
} satisfies NamedThemeOptions;

export const retroFutureTerminalAmber = {
  ...retroFutureTerminal,
  name: "Retro-Future Terminal (Amber)",
  palette: {
    ...retroFutureTerminal.palette,
    primary: {
      main: "#FFB000",
      dark: "#E69300",
      light: "#FFD37A",
      contrastText: "#120B05",
    },
    divider: alpha("#FFB000", 0.18),
    action: {
      ...retroFutureTerminal.palette.action,
      hover: alpha("#FFB000", 0.1),
      selected: alpha("#FFB000", 0.16),
      focus: alpha("#FFB000", 0.18),
    },
  },
} satisfies NamedThemeOptions;
