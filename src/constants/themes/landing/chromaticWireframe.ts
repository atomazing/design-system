import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Chromatic Wireframe
 * Visual: structured drafting surfaces with restrained RGB edge split.
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
    fontWeight: 850,
    fontSize: "clamp(2.25rem, 4.2vw, 3.55rem)",
    lineHeight: 1.04,
    letterSpacing: "-0.035em",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 830,
    fontSize: "clamp(1.6rem, 2.9vw, 2.4rem)",
    lineHeight: 1.1,
    letterSpacing: "-0.025em",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 780,
    fontSize: "clamp(1.22rem, 2vw, 1.62rem)",
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
    fontWeight: 820,
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

interface WireframePanelOptions {
  radius?: number;
  paperAlpha?: number;
  borderAlpha?: number;
  gridOpacity?: number;
  accent?: string;
  notchAlpha?: number;
  showNotch?: boolean;
  shadowAlpha?: number;
}

const wireframePanel = (theme: Theme, opts?: WireframePanelOptions) => {
  const radius = opts?.radius ?? Number(theme.shape.borderRadius) + 18;
  const paperAlpha =
    opts?.paperAlpha ?? (theme.palette.mode === "dark" ? 0.76 : 0.95);
  const borderAlpha =
    opts?.borderAlpha ?? (theme.palette.mode === "dark" ? 0.12 : 0.08);
  const gridOpacity =
    opts?.gridOpacity ?? (theme.palette.mode === "dark" ? 0.18 : 0.08);
  const accent = opts?.accent ?? theme.palette.info.main;
  const notchAlpha =
    opts?.notchAlpha ?? (theme.palette.mode === "dark" ? 0.6 : 0.38);
  const showNotch = opts?.showNotch ?? true;
  const shadowAlpha =
    opts?.shadowAlpha ?? (theme.palette.mode === "dark" ? 0.64 : 0.14);

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
      `0 0 0 1px ${alpha(ink, 0.04)} inset`,
      `0 18px 76px ${alpha("#000", shadowAlpha)}`,
    ].join(", "),

    "&::before": {
      content: '""',
      position: "absolute" as const,
      inset: 0,
      pointerEvents: "none" as const,
      backgroundImage: [
        `linear-gradient(0deg, ${alpha(ink, gridOpacity)} 1px, transparent 1px)`,
        `linear-gradient(90deg, ${alpha(ink, gridOpacity * 0.8)} 1px, transparent 1px)`,
        `linear-gradient(90deg, transparent 49.5%, ${alpha(theme.palette.primary.main, gridOpacity * 1.6)} 50%, transparent 50.5%)`,
        `linear-gradient(0deg, transparent 49.5%, ${alpha(accent, gridOpacity * 1.4)} 50%, transparent 50.5%)`,
      ].join(", "),
      backgroundSize: "28px 28px, 36px 36px, 100% 100%, 100% 100%",
      opacity: 0.92,
    },

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
        ${alpha(theme.palette.primary.main, notchAlpha)} 42%,
        ${alpha(accent, notchAlpha * 0.85)} 58%,
        transparent 100%)`,
      opacity: showNotch ? 0.92 : 0,
    },
  };
};

const calmSurface = (theme: Theme) => ({
  position: "relative" as const,
  borderRadius: Number(theme.shape.borderRadius) + 18,
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
        "--cw-a": theme.palette.primary.main,
        "--cw-b": theme.palette.secondary.main,
        "--cw-ink": theme.palette.text.primary,
      },

      "@keyframes cwRise": {
        "0%": { transform: "translateY(8px)", opacity: 0 },
        "100%": { transform: "translateY(0px)", opacity: 1 },
      },

      "*, *::before, *::after": { boxSizing: "border-box" },

      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundImage: isDark
          ? [
              `radial-gradient(900px 520px at 14% 10%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 62%)`,
              `radial-gradient(820px 480px at 86% 12%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 66%)`,
              `linear-gradient(180deg, ${alpha("#000", 0.76)} 0%, transparent 22%, transparent 78%, ${alpha("#000", 0.86)} 100%)`,
              `repeating-linear-gradient(60deg, ${alpha(theme.palette.text.primary, 0.025)} 0px, ${alpha(theme.palette.text.primary, 0.025)} 1px, transparent 1px, transparent 20px)`,
              `repeating-linear-gradient(-60deg, ${alpha(theme.palette.text.primary, 0.02)} 0px, ${alpha(theme.palette.text.primary, 0.02)} 1px, transparent 1px, transparent 20px)`,
            ].join(", ")
          : [
              `radial-gradient(860px 500px at 14% 8%, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 62%)`,
              `radial-gradient(800px 460px at 86% 10%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 66%)`,
              `linear-gradient(180deg, ${alpha("#FFFFFF", 0.84)} 0%, ${alpha(theme.palette.background.default, 0.92)} 28%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
              `repeating-linear-gradient(60deg, ${alpha(theme.palette.text.primary, 0.018)} 0px, ${alpha(theme.palette.text.primary, 0.018)} 1px, transparent 1px, transparent 20px)`,
              `repeating-linear-gradient(-60deg, ${alpha(theme.palette.text.primary, 0.015)} 0px, ${alpha(theme.palette.text.primary, 0.015)} 1px, transparent 1px, transparent 20px)`,
            ].join(", "),
        backgroundAttachment: "fixed",
      },

      ".cw-tag": {
        fontFamily: FONT_MONO,
        letterSpacing: "0.04em",
        padding: "0.16em 0.55em",
        borderRadius: 12,
        backgroundColor: alpha(
          theme.palette.text.primary,
          isDark ? 0.05 : 0.04,
        ),
        border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.12 : 0.08)}`,
        boxShadow: [
          `-1px 0 0 ${alpha(theme.palette.primary.main, 0.25)}`,
          `1px 0 0 ${alpha(theme.palette.secondary.main, 0.22)}`,
        ].join(", "),
      },

      ".cw-metric": {
        fontFamily: FONT_MONO,
        letterSpacing: "-0.05em",
        textShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.12)}`,
        animation: "cwRise 380ms ease-out 1",
      },

      ".cw-surface-calm, [data-cw-surface='calm']": {
        ...calmSurface(theme),
      },

      ".cw-panel-focus, [data-cw-surface='focus']": {
        ...wireframePanel(theme, {
          radius: Number(theme.shape.borderRadius) + 22,
          paperAlpha: isDark ? 0.82 : 0.97,
          borderAlpha: isDark ? 0.14 : 0.09,
          gridOpacity: isDark ? 0.22 : 0.1,
          accent: theme.palette.secondary.main,
          notchAlpha: isDark ? 0.72 : 0.46,
          shadowAlpha: isDark ? 0.56 : 0.16,
        }),
      },

      "*::selection": {
        backgroundColor: alpha(theme.palette.primary.main, 0.24),
        color: isDark
          ? theme.palette.background.default
          : theme.palette.text.primary,
      },

      a: {
        color: isDark ? theme.palette.info.light : theme.palette.info.dark,
        textDecorationColor: alpha(
          theme.palette.info.main,
          isDark ? 0.38 : 0.24,
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
        ...wireframePanel(theme, {
          radius: Number(theme.shape.borderRadius) + 22,
          paperAlpha: isDark ? 0.62 : 0.92,
          borderAlpha: isDark ? 0.1 : 0.07,
          gridOpacity: isDark ? 0.12 : 0.05,
          accent: theme.palette.info.main,
          notchAlpha: isDark ? 0.4 : 0.22,
          showNotch: false,
          shadowAlpha: isDark ? 0.42 : 0.1,
        }),
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
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
        ...wireframePanel(theme, {
          radius: Number(theme.shape.borderRadius) + 22,
          paperAlpha: isDark ? 0.78 : 0.96,
          borderAlpha: isDark ? 0.12 : 0.08,
          gridOpacity: isDark ? 0.16 : 0.07,
          accent: theme.palette.info.main,
          notchAlpha: isDark ? 0.38 : 0.2,
          showNotch: false,
          shadowAlpha: isDark ? 0.48 : 0.14,
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
          textShadow: [
            `0 0 24px ${alpha(theme.palette.primary.main, isDark ? 0.08 : 0.04)}`,
            `-1px 0 0 ${alpha(theme.palette.primary.main, isDark ? 0.16 : 0.08)}`,
            `1px 0 0 ${alpha(theme.palette.secondary.main, isDark ? 0.12 : 0.06)}`,
          ].join(", "),
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
        borderRadius: 999,
        paddingInline: 20,
        paddingBlock: 12,
        minHeight: 44,
        fontWeight: 820,
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
        border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.14 : 0.1)}`,
        backgroundImage: `linear-gradient(135deg,
          ${alpha(theme.palette.primary.main, isDark ? 0.62 : 0.42)} 0%,
          ${alpha(theme.palette.secondary.main, isDark ? 0.42 : 0.24)} 55%,
          ${alpha(theme.palette.info.main, isDark ? 0.34 : 0.18)} 100%)`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.text.primary, 0.08)} inset`,
          `0 20px 78px ${alpha("#000", isDark ? 0.64 : 0.2)}`,
          `0 0 34px ${alpha(theme.palette.primary.main, isDark ? 0.14 : 0.08)}`,
        ].join(", "),
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(135deg,
            ${alpha(theme.palette.background.default, 0)} 0px,
            ${alpha(theme.palette.background.default, 0)} 10px,
            ${alpha(theme.palette.background.default, isDark ? 0.18 : 0.1)} 10px,
            ${alpha(theme.palette.background.default, isDark ? 0.18 : 0.1)} 14px)`,
          opacity: 0.16,
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.text.primary, 0.1)} inset`,
            `0 26px 94px ${alpha("#000", isDark ? 0.74 : 0.24)}`,
            `0 0 40px ${alpha(theme.palette.primary.main, isDark ? 0.18 : 0.1)}`,
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
          borderColor: alpha(theme.palette.text.primary, isDark ? 0.24 : 0.16),
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.06 : 0.05,
          ),
          boxShadow: `0 0 30px ${alpha(theme.palette.info.main, isDark ? 0.08 : 0.04)}`,
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

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 18,
        backgroundColor: alpha(
          theme.palette.text.primary,
          isDark ? 0.04 : 0.03,
        ),
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.text.primary, isDark ? 0.2 : 0.14),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.primary.main, 0.62),
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
});

export const chromaticWireframeLight = {
  name: "Chromatic Wireframe Light",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#2D7CFF",
      dark: "#1E5CC5",
      light: "#8FB6FF",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#E055C8",
      dark: "#B73BA1",
      light: "#F2A8E7",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#00A5C7",
      dark: "#007B96",
      light: "#7BDBEF",
      contrastText: "#082028",
    },

    success: {
      main: "#2DA86A",
      dark: "#1F8452",
      light: "#84DEAD",
      contrastText: "#FFFFFF",
    },

    warning: {
      main: "#D59A2E",
      dark: "#AC7A1C",
      light: "#F1CA7D",
      contrastText: "#261A06",
    },

    error: {
      main: "#D85E74",
      dark: "#B6465B",
      light: "#F2A8B6",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F6F8FC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#182034",
      secondary: "#626B86",
      disabled: alpha("#182034", 0.42),
    },

    divider: alpha("#182034", 0.1),

    action: {
      hover: alpha("#182034", 0.04),
      selected: alpha("#2D7CFF", 0.08),
      focus: alpha("#00A5C7", 0.16),
      active: alpha("#182034", 0.56),
      disabled: alpha("#182034", 0.26),
      disabledBackground: alpha("#182034", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 18 },
  spacing: 8,

  components: createComponents(false),
} satisfies NamedThemeOptions;

export const chromaticWireframe = {
  name: "Chromatic Wireframe",
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: "#00E5FF",
      dark: "#00BBD6",
      light: "#7AF3FF",
      contrastText: "#061019",
    },

    secondary: {
      main: "#FF3DFF",
      dark: "#C81FC8",
      light: "#FF9BFF",
      contrastText: "#09030B",
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
      default: "#060610",
      paper: "#0B1022",
    },

    text: {
      primary: "#F2F6FF",
      secondary: "#B9C3E6",
      disabled: alpha("#F2F6FF", 0.44),
    },

    divider: alpha("#F2F6FF", 0.1),

    action: {
      hover: alpha("#F2F6FF", 0.06),
      selected: alpha("#F2F6FF", 0.1),
      focus: alpha("#00E5FF", 0.2),
      active: alpha("#F2F6FF", 0.62),
      disabled: alpha("#F2F6FF", 0.26),
      disabledBackground: alpha("#F2F6FF", 0.08),
    },
  },

  typography,

  shape: { borderRadius: 18 },
  spacing: 8,

  components: createComponents(true),
} satisfies NamedThemeOptions;
