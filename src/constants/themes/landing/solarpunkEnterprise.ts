import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Solarpunk Enterprise — Landing preset
 * Visual: optimistic “solarpunk” enterprise — bright airy base, sun gradients, soft organic shapes,
 * calm confidence. Not “eco” in messaging; more like stress-free maturity.
 * Philosophy: «Инженерия может быть доброй: предсказуемый процесс, меньше выгорания, больше ясности.»
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
    fontWeight: 820,
    fontSize: "clamp(2.25rem, 4.0vw, 3.35rem)",
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
    lineHeight: 1.6,
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 720,
    fontSize: "0.92rem",
    lineHeight: 1.6,
  },

  body1: { fontSize: "1rem", lineHeight: 1.9 },
  body2: { fontSize: "0.92rem", lineHeight: 1.75 },

  button: {
    fontFamily: FONT_DISPLAY,
    textTransform: "none",
    fontWeight: 800,
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

const softOrganic = (
  theme: Theme,
  opts?: { radius?: number; borderAlpha?: number; shadow?: number },
) => {
  const radius = opts?.radius ?? Number(theme.shape.borderRadius) + 18;
  const borderAlpha = opts?.borderAlpha ?? 0.12;
  const shadow = opts?.shadow ?? 1;

  return {
    position: "relative" as const,
    borderRadius: radius,
    overflow: "hidden" as const,
    backgroundImage: "none",
    backgroundColor: alpha(theme.palette.background.paper, 0.92),
    border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
    boxShadow: [
      `0 0 0 1px ${alpha(theme.palette.common.white, 0.45)} inset`,
      `0 18px ${70 * shadow}px ${alpha("#000", 0.1)}`,
    ].join(", "),

    // gentle “sun” highlight
    "&::before": {
      content: '""',
      position: "absolute" as const,
      inset: -1,
      borderRadius: radius,
      background: `radial-gradient(700px 240px at 18% 0%,
        ${alpha(theme.palette.warning.main, 0.2)} 0%,
        transparent 62%),
        radial-gradient(760px 260px at 86% 0%,
        ${alpha(theme.palette.info.main, 0.12)} 0%,
        transparent 62%)`,
      opacity: 0.9,
      pointerEvents: "none" as const,
    },

    // tiny organic wave line
    "&::after": {
      content: '""',
      position: "absolute" as const,
      left: 0,
      right: 0,
      top: 0,
      height: 2,
      backgroundImage: `linear-gradient(90deg,
        transparent 0%,
        ${alpha(theme.palette.warning.main, 0.55)} 35%,
        ${alpha(theme.palette.success.main, 0.42)} 60%,
        transparent 100%)`,
      opacity: 0.7,
      pointerEvents: "none" as const,
    },
  };
};

const createComponents = (): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      "@keyframes seDrift": {
        "0%": { transform: "translateX(-24%)", opacity: 0 },
        "15%": { opacity: 0.28 },
        "55%": { opacity: 0.12 },
        "100%": { transform: "translateX(24%)", opacity: 0 },
      },

      "*, *::before, *::after": { boxSizing: "border-box" },

      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,

        // Sun gradients + organic blobs + faint dot texture
        backgroundImage: [
          `radial-gradient(900px 520px at 14% 8%, ${alpha(
            theme.palette.warning.main,
            0.22,
          )} 0%, transparent 62%)`,
          `radial-gradient(900px 520px at 86% 10%, ${alpha(
            theme.palette.success.main,
            0.16,
          )} 0%, transparent 64%)`,
          `radial-gradient(900px 560px at 52% 112%, ${alpha(
            theme.palette.info.main,
            0.12,
          )} 0%, transparent 62%)`,
          `radial-gradient(${alpha(theme.palette.text.primary, 0.05)} 1px, transparent 1px)`,
        ].join(", "),
        backgroundSize: "auto, auto, auto, 34px 34px",
        backgroundAttachment: "fixed",
      },

      // Soft drift overlay (very subtle)
      "body::before": {
        content: '""',
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        background: `linear-gradient(90deg,
          transparent 0%,
          ${alpha(theme.palette.warning.main, 0.16)} 35%,
          transparent 70%)`,
        opacity: 0.3,
        transform: "translateX(-24%)",
        animation: "seDrift 22s ease-in-out infinite",
      },

      "*::selection": {
        backgroundColor: alpha(theme.palette.warning.main, 0.3),
        color: theme.palette.text.primary,
      },

      a: {
        color: theme.palette.info.main,
        textDecorationColor: alpha(theme.palette.info.main, 0.5),
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
        ...softOrganic(theme, {
          radius: Number(theme.shape.borderRadius) + 22,
          borderAlpha: 0.1,
          shadow: 0.7,
        }),
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        backgroundColor: alpha(theme.palette.background.paper, 0.7),
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...softOrganic(theme, {
          radius: Number(theme.shape.borderRadius) + 18,
          borderAlpha: 0.1,
          shadow: 0.9,
        }),
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...softOrganic(theme, {
          radius: Number(theme.shape.borderRadius) + 22,
          borderAlpha: 0.1,
          shadow: 1,
        }),
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.shorter,
        }),
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 26px 86px ${alpha("#000", 0.14)}`,
        },
      }),
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiTypography-h1, &.MuiTypography-h2": {
          textShadow: `0 10px 22px ${alpha(theme.palette.warning.main, 0.1)}`,
        },
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.95em",
          padding: "0.12em 0.42em",
          borderRadius: 10,
          backgroundColor: alpha(theme.palette.warning.main, 0.1),
          border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
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
          ${alpha(theme.palette.warning.main, 0.24)} 50%,
          ${alpha(theme.palette.text.primary, 0.12)} 80%,
          transparent 100%)`,
        opacity: 0.75,
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
        fontWeight: 900,
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
        backgroundImage: `linear-gradient(135deg,
          ${alpha(theme.palette.warning.main, 0.9)} 0%,
          ${alpha(theme.palette.success.main, 0.7)} 55%,
          ${alpha(theme.palette.info.main, 0.55)} 100%)`,
        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.common.white, 0.5)} inset`,
          `0 18px 70px ${alpha("#000", 0.1)}`,
        ].join(", "),
        "&::after": {
          content: '""',
          position: "absolute",
          inset: -2,
          background: `radial-gradient(260px 120px at 30% 0%,
              ${alpha(theme.palette.common.white, 0.28)} 0%,
              transparent 62%)`,
          opacity: 0.8,
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: `0 24px 86px ${alpha("#000", 0.14)}`,
        },
      }),

      outlinedPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderWidth: 1,
        borderColor: alpha(theme.palette.text.primary, 0.14),
        backgroundColor: alpha(theme.palette.background.paper, 0.65),
        "&:hover": {
          transform: "translateY(-1px)",
          backgroundColor: alpha(theme.palette.background.paper, 0.85),
          boxShadow: `0 20px 70px ${alpha("#000", 0.12)}`,
        },
      }),

      textPrimary: ({ theme }) => ({
        color: theme.palette.info.main,
        "&:hover": {
          backgroundColor: alpha(theme.palette.info.main, 0.08),
        },
      }),
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 14,
        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.7),
        "&:hover": {
          backgroundColor: alpha(theme.palette.background.paper, 0.86),
          boxShadow: `0 18px 54px ${alpha("#000", 0.12)}`,
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
        fontWeight: 850,
        letterSpacing: "0.06em",
        backgroundColor: alpha(theme.palette.warning.main, 0.12),
        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
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
          ${theme.palette.warning.main} 0%,
          ${theme.palette.success.main} 55%,
          ${theme.palette.info.main} 100%)`,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        fontFamily: FONT_DISPLAY,
        fontWeight: 850,
        letterSpacing: "0.02em",
        color: alpha(theme.palette.text.primary, 0.72),
        "&.Mui-selected": { color: theme.palette.text.primary },
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 18,
        backgroundColor: alpha(theme.palette.background.paper, 0.85),
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.text.primary, 0.16),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.info.main,
          boxShadow: `0 0 0 3px ${alpha(theme.palette.info.main, 0.14)}`,
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, 0.12),
      }),
      input: { paddingBlock: 12 },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_DISPLAY,
        fontWeight: 850,
        color: alpha(theme.palette.text.secondary, 0.9),
        "&.Mui-focused": { color: theme.palette.info.main },
      }),
    },
  },

  MuiTooltip: {
    defaultProps: { arrow: true },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...softOrganic(theme, {
          radius: Number(theme.shape.borderRadius) + 18,
          borderAlpha: 0.1,
          shadow: 0.8,
        }),
        fontSize: "0.84rem",
        padding: theme.spacing(1.25, 1.5),
      }),
      arrow: ({ theme }) => ({
        color: alpha(theme.palette.background.paper, 0.92),
      }),
    },
  },

  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...softOrganic(theme, {
          radius: Number(theme.shape.borderRadius) + 22,
          borderAlpha: 0.1,
          shadow: 1,
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
          backgroundColor: alpha(theme.palette.warning.main, 0.08),
        },
      }),
      content: () => ({
        margin: 0,
        "& .MuiTypography-root": {
          fontFamily: FONT_DISPLAY,
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
        ...softOrganic(theme, {
          radius: Number(theme.shape.borderRadius) + 22,
          borderAlpha: 0.1,
          shadow: 0.9,
        }),
      }),
    },
  },
});

export const solarpunkEnterprise = {
  name: "Solarpunk Enterprise",
  direction: "ltr",

  palette: {
    mode: "light",

    // Warm sun + fresh green + clear sky
    primary: {
      main: "#1C2A4A", // deep “trust” navy for text/CTA
      dark: "#0F1A33",
      light: "#3C4E7A",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#2DD6A7", // fresh mint/teal
      dark: "#16B58B",
      light: "#7BEACD",
      contrastText: "#061019",
    },

    info: {
      main: "#2B7CFF", // sky blue
      dark: "#1D5FE6",
      light: "#7FA8FF",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#2DD6A7",
      dark: "#16B58B",
      light: "#7BEACD",
      contrastText: "#061019",
    },

    warning: {
      main: "#FFB000", // sun amber
      dark: "#E69300",
      light: "#FFD37A",
      contrastText: "#1A1206",
    },

    error: {
      main: "#FF3B5C",
      dark: "#E62949",
      light: "#FF8FA3",
      contrastText: "#12060A",
    },

    background: {
      default: "#F7FBF7", // airy white-green
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1C2A4A",
      secondary: alpha("#1C2A4A", 0.72),
      disabled: alpha("#1C2A4A", 0.4),
    },

    divider: alpha("#1C2A4A", 0.1),

    action: {
      hover: alpha("#FFB000", 0.14),
      selected: alpha("#2DD6A7", 0.16),
      focus: alpha("#2B7CFF", 0.16),
      active: alpha("#1C2A4A", 0.72),
      disabled: alpha("#1C2A4A", 0.3),
      disabledBackground: alpha("#1C2A4A", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 20 },
  spacing: 8,

  components: createComponents(),
} satisfies NamedThemeOptions;

// Optional dusk mode — same optimistic identity on dark canvas.
// If you don’t need it — remove this export.
export const solarpunkEnterpriseDusk = {
  ...solarpunkEnterprise,
  name: "Solarpunk Enterprise (Dusk)",
  palette: {
    ...solarpunkEnterprise.palette,
    mode: "dark",
    background: {
      default: "#070A10",
      paper: "#0D1322",
    },
    text: {
      primary: "#F7FBF7",
      secondary: alpha("#F7FBF7", 0.78),
      disabled: alpha("#F7FBF7", 0.42),
    },
    divider: alpha("#F7FBF7", 0.14),
    primary: {
      main: "#F7FBF7",
      dark: "#DDE4DD",
      light: "#FFFFFF",
      contrastText: "#070A10",
    },
    action: {
      hover: alpha("#FFB000", 0.1),
      selected: alpha("#2DD6A7", 0.14),
      focus: alpha("#2B7CFF", 0.18),
      active: alpha("#F7FBF7", 0.72),
      disabled: alpha("#F7FBF7", 0.3),
      disabledBackground: alpha("#F7FBF7", 0.08),
    },
  },
} satisfies NamedThemeOptions;
