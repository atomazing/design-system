import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Ceramic Flux
 * Visual: polished ceramic surfaces with restrained spec lines and soft gloss.
 */

const FONT_DISPLAY =
  '"Plus Jakarta Sans","Space Grotesk","Sora","Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_TEXT = '"Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_MONO =
  '"JetBrains Mono","IBM Plex Mono","Roboto Mono","Menlo","Consolas",monospace';

const typography = {
  fontFamily: FONT_TEXT,

  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 830,
    fontSize: "clamp(2.25rem, 4.1vw, 3.45rem)",
    lineHeight: 1.06,
    letterSpacing: "-0.03em",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 810,
    fontSize: "clamp(1.6rem, 2.8vw, 2.3rem)",
    lineHeight: 1.12,
    letterSpacing: "-0.02em",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 770,
    fontSize: "clamp(1.22rem, 2vw, 1.6rem)",
    lineHeight: 1.18,
    letterSpacing: "-0.015em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 750,
    fontSize: "1.14rem",
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
  },

  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 730,
    fontSize: "1.02rem",
    lineHeight: 1.6,
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 720,
    fontSize: "0.92rem",
    lineHeight: 1.6,
    letterSpacing: "0.01em",
    textTransform: "none",
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

interface CeramicSurfaceOptions {
  radius?: number;
  tint?: string;
  shadowAlpha?: number;
  glossAlpha?: number;
  accentAlpha?: number;
  showSpecLine?: boolean;
}

const ceramicSurface = (theme: Theme, opts?: CeramicSurfaceOptions) => {
  const radius = opts?.radius ?? Number(theme.shape.borderRadius) + 22;
  const tint = opts?.tint ?? theme.palette.background.paper;
  const shadowAlpha =
    opts?.shadowAlpha ?? (theme.palette.mode === "dark" ? 0.56 : 0.14);
  const glossAlpha =
    opts?.glossAlpha ?? (theme.palette.mode === "dark" ? 0.42 : 0.22);
  const accentAlpha =
    opts?.accentAlpha ?? (theme.palette.mode === "dark" ? 0.12 : 0.06);
  const showSpecLine = opts?.showSpecLine ?? true;

  return {
    position: "relative" as const,
    borderRadius: radius,
    overflow: "hidden" as const,
    backgroundImage: `radial-gradient(520px 220px at 22% 0%,
      ${alpha(theme.palette.common.white, glossAlpha)} 0%,
      transparent 62%),
      radial-gradient(520px 220px at 78% 0%,
      ${alpha(theme.palette.primary.main, accentAlpha)} 0%,
      transparent 65%),
      linear-gradient(180deg,
      ${alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.08 : 0.12)} 0%,
      transparent 55%)`,
    backgroundColor: alpha(tint, theme.palette.mode === "dark" ? 0.92 : 0.97),
    border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.1 : 0.08)}`,
    boxShadow: [
      `0 0 0 1px ${alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.4 : 0.6)} inset`,
      `0 18px 76px ${alpha("#000", shadowAlpha)}`,
    ].join(", "),

    "&::after": {
      content: '""',
      position: "absolute" as const,
      left: 0,
      right: 0,
      top: 0,
      height: 2,
      backgroundImage: `linear-gradient(90deg,
        transparent 0%,
        ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.64 : 0.36)} 40%,
        transparent 80%)`,
      opacity: showSpecLine ? 0.8 : 0,
      pointerEvents: "none" as const,
    },
  };
};

const calmSurface = (theme: Theme) => ({
  position: "relative" as const,
  borderRadius: Number(theme.shape.borderRadius) + 20,
  backgroundColor: alpha(
    theme.palette.background.paper,
    theme.palette.mode === "dark" ? 0.9 : 0.98,
  ),
  border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.09 : 0.07)}`,
  boxShadow: [
    `0 0 0 1px ${alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.28 : 0.5)} inset`,
    `0 16px 56px ${alpha("#000", theme.palette.mode === "dark" ? 0.34 : 0.12)}`,
  ].join(", "),
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
});

const createComponents = (isDark: boolean): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      ":root": {
        "--cf-primary": theme.palette.primary.main,
        "--cf-cool": theme.palette.info.main,
      },

      "@keyframes cfRise": {
        "0%": { transform: "translateY(8px)", opacity: 0 },
        "100%": { transform: "translateY(0px)", opacity: 1 },
      },

      "*, *::before, *::after": { boxSizing: "border-box" },

      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundImage: isDark
          ? [
              `radial-gradient(980px 560px at 16% 10%, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 62%)`,
              `radial-gradient(880px 520px at 84% 12%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 66%)`,
              `radial-gradient(980px 560px at 52% 112%, ${alpha(theme.palette.info.main, 0.08)} 0%, transparent 62%)`,
              `linear-gradient(180deg, ${alpha("#000", 0.72)} 0%, transparent 22%, transparent 78%, ${alpha("#000", 0.84)} 100%)`,
            ].join(", ")
          : [
              `radial-gradient(940px 540px at 16% 8%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 62%)`,
              `radial-gradient(860px 500px at 84% 10%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 66%)`,
              `radial-gradient(920px 540px at 52% 110%, ${alpha(theme.palette.info.main, 0.05)} 0%, transparent 62%)`,
              `linear-gradient(180deg, ${alpha("#FFFFFF", 0.86)} 0%, ${alpha(theme.palette.background.default, 0.92)} 28%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
            ].join(", "),
        backgroundAttachment: "fixed",
      },

      ".cf-metric": {
        fontFamily: FONT_MONO,
        letterSpacing: "-0.05em",
        textShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.12)}`,
        animation: "cfRise 380ms ease-out 1",
      },

      ".cf-surface-calm, [data-cf-surface='calm']": {
        ...calmSurface(theme),
      },

      ".cf-panel-focus, [data-cf-surface='focus']": {
        ...ceramicSurface(theme, {
          radius: Number(theme.shape.borderRadius) + 26,
          tint: theme.palette.background.paper,
          shadowAlpha: isDark ? 0.5 : 0.16,
          glossAlpha: isDark ? 0.48 : 0.28,
          accentAlpha: isDark ? 0.16 : 0.08,
          showSpecLine: true,
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
        ...ceramicSurface(theme, {
          radius: Number(theme.shape.borderRadius) + 26,
          tint: theme.palette.background.paper,
          shadowAlpha: isDark ? 0.38 : 0.1,
          glossAlpha: isDark ? 0.32 : 0.18,
          accentAlpha: isDark ? 0.06 : 0.03,
          showSpecLine: false,
        }),
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.58 : 0.94,
        ),
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
        ...ceramicSurface(theme, {
          radius: Number(theme.shape.borderRadius) + 26,
          tint: theme.palette.background.paper,
          shadowAlpha: isDark ? 0.46 : 0.14,
          glossAlpha: isDark ? 0.38 : 0.22,
          accentAlpha: isDark ? 0.08 : 0.04,
          showSpecLine: false,
        }),
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.shorter,
        }),
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: `0 24px 82px ${alpha("#000", isDark ? 0.58 : 0.16)}`,
        },
      }),
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiTypography-h1, &.MuiTypography-h2": {
          textShadow: `0 0 24px ${alpha(theme.palette.primary.main, isDark ? 0.1 : 0.04)}`,
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
        border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.12 : 0.08)}`,
        backgroundImage: `linear-gradient(135deg,
          ${alpha(theme.palette.primary.main, isDark ? 0.58 : 0.38)} 0%,
          ${alpha(theme.palette.secondary.main, isDark ? 0.4 : 0.2)} 45%,
          ${alpha(theme.palette.info.main, isDark ? 0.32 : 0.16)} 100%)`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.36 : 0.5)} inset`,
          `0 20px 78px ${alpha("#000", isDark ? 0.64 : 0.2)}`,
          `0 0 30px ${alpha(theme.palette.primary.main, isDark ? 0.16 : 0.08)}`,
        ].join(", "),
        "&::after": {
          content: '""',
          position: "absolute",
          inset: -2,
          background: `radial-gradient(260px 120px at 30% 0%,
            ${alpha(theme.palette.common.white, isDark ? 0.2 : 0.16)} 0%,
            transparent 62%)`,
          opacity: 0.82,
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.48 : 0.58)} inset`,
            `0 26px 94px ${alpha("#000", isDark ? 0.74 : 0.24)}`,
            `0 0 38px ${alpha(theme.palette.primary.main, isDark ? 0.18 : 0.1)}`,
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
          boxShadow: `0 0 28px ${alpha(theme.palette.info.main, isDark ? 0.08 : 0.04)}`,
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

export const ceramicFluxLight = {
  name: "Ceramic Flux Light",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#38B7D5",
      dark: "#2390AC",
      light: "#97DDF0",
      contrastText: "#072028",
    },

    secondary: {
      main: "#DE72C8",
      dark: "#B953A3",
      light: "#F2B4E6",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#5878E8",
      dark: "#3F58C0",
      light: "#ACC0F7",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#2AA86A",
      dark: "#1E8453",
      light: "#8CDEB1",
      contrastText: "#FFFFFF",
    },

    warning: {
      main: "#D79A30",
      dark: "#AD7A1E",
      light: "#F1CA7D",
      contrastText: "#261A06",
    },

    error: {
      main: "#D95E74",
      dark: "#B7455A",
      light: "#F2A8B6",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F7F8FB",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1A2030",
      secondary: "#626B82",
      disabled: alpha("#1A2030", 0.42),
    },

    divider: alpha("#1A2030", 0.1),

    action: {
      hover: alpha("#1A2030", 0.04),
      selected: alpha("#38B7D5", 0.08),
      focus: alpha("#5878E8", 0.16),
      active: alpha("#1A2030", 0.56),
      disabled: alpha("#1A2030", 0.26),
      disabledBackground: alpha("#1A2030", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 20 },
  spacing: 8,

  components: createComponents(false),
} satisfies NamedThemeOptions;

export const ceramicFlux = {
  name: "Ceramic Flux",
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: "#7AF3FF",
      dark: "#2FD1F2",
      light: "#B9F5FF",
      contrastText: "#061019",
    },

    secondary: {
      main: "#FF7AF2",
      dark: "#E34DD6",
      light: "#FFC2FA",
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
      default: "#07070C",
      paper: "#0D0E16",
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
      focus: alpha("#7AF3FF", 0.2),
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
