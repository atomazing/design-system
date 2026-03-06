import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Spectral Origami — Extra Landing preset (bonus)
 * Visual: ultra-clean paper base + spectral folds. Sharp creases, diagonal “origami” lines,
 * prismatic edges on key surfaces. Feels like premium documentation turned into a modern landing.
 * Philosophy: «Структура складывается в скорость. Чёткие “сгибы” процесса дают чистый результат.»
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
    fontWeight: 850,
    fontSize: "clamp(2.3rem, 4.3vw, 3.75rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.04em",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 830,
    fontSize: "clamp(1.65rem, 3.0vw, 2.55rem)",
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 790,
    fontSize: "clamp(1.22rem, 2.0vw, 1.62rem)",
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
    fontWeight: 730,
    fontSize: "1.02rem",
    lineHeight: 1.6,
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 730,
    fontSize: "0.92rem",
    lineHeight: 1.6,
  },

  body1: { fontSize: "1rem", lineHeight: 1.9 },
  body2: { fontSize: "0.92rem", lineHeight: 1.75 },

  button: {
    fontFamily: FONT_DISPLAY,
    textTransform: "uppercase",
    fontWeight: 900,
    letterSpacing: "0.12em",
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

const origamiSurface = (
  theme: Theme,
  opts?: {
    radius?: number;
    paperAlpha?: number;
    borderAlpha?: number;
    prism?: number;
  },
) => {
  const radius = opts?.radius ?? Number(theme.shape.borderRadius) + 20;
  const paperAlpha = opts?.paperAlpha ?? 0.96;
  const borderAlpha = opts?.borderAlpha ?? 0.1;
  const prism = opts?.prism ?? 1;

  const ink = theme.palette.text.primary;
  const a = theme.palette.primary.main;
  const b = theme.palette.secondary.main;
  const c = theme.palette.info.main;

  return {
    position: "relative" as const,
    borderRadius: radius,
    overflow: "hidden" as const,
    isolation: "isolate" as const,

    backgroundImage: "none",
    backgroundColor: alpha(theme.palette.background.paper, paperAlpha),
    border: `1px solid ${alpha(ink, borderAlpha)}`,
    boxShadow: [
      `0 0 0 1px ${alpha(theme.palette.common.white, 0.7)} inset`,
      `0 18px 64px ${alpha("#000", 0.12)}`,
    ].join(", "),

    // Prism edge (very subtle)
    "&::before": {
      content: '""',
      position: "absolute" as const,
      inset: 0,
      borderRadius: radius,
      padding: 1,
      background: `linear-gradient(135deg,
        ${alpha(a, 0.45 * prism)} 0%,
        ${alpha(b, 0.38 * prism)} 40%,
        ${alpha(c, 0.34 * prism)} 80%,
        ${alpha(theme.palette.common.black, 0.06)} 100%)`,
      WebkitMask:
        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor" as const,
      maskComposite: "exclude" as const,
      opacity: 0.55,
      pointerEvents: "none" as const,
    },

    // Origami crease line (signature)
    "&::after": {
      content: '""',
      position: "absolute" as const,
      inset: 0,
      pointerEvents: "none" as const,
      backgroundImage: `linear-gradient(135deg,
        transparent 0%,
        transparent 48%,
        ${alpha(ink, 0.1)} 49%,
        ${alpha(ink, 0.1)} 50%,
        transparent 51%,
        transparent 100%)`,
      opacity: 0.85,
    },
  };
};

const createComponents = (): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      "@keyframes soPrismSweep": {
        "0%": { transform: "translateX(-26%)", opacity: 0 },
        "16%": { opacity: 0.18 },
        "55%": { opacity: 0.08 },
        "100%": { transform: "translateX(26%)", opacity: 0 },
      },
      "@keyframes soSheen": {
        "0%, 100%": { opacity: 0.18 },
        "50%": { opacity: 0.3 },
      },

      "*, *::before, *::after": { boxSizing: "border-box" },

      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,

        // Paper base + subtle fibers + spectral blobs (landing-friendly)
        backgroundImage: [
          `radial-gradient(900px 520px at 12% 10%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 62%)`,
          `radial-gradient(860px 500px at 88% 12%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 66%)`,
          `radial-gradient(920px 560px at 52% 112%, ${alpha(theme.palette.info.main, 0.07)} 0%, transparent 62%)`,
          // paper fibers
          `repeating-linear-gradient(0deg, ${alpha(theme.palette.common.black, 0.03)} 0px, transparent 1px, transparent 4px)`,
          `repeating-linear-gradient(90deg, ${alpha(theme.palette.common.black, 0.02)} 0px, transparent 1px, transparent 28px)`,
        ].join(", "),
        backgroundAttachment: "fixed",
      },

      // Soft prism sweep overlay
      "body::before": {
        content: '""',
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        background: `linear-gradient(90deg,
          transparent 0%,
          ${alpha(theme.palette.primary.main, 0.1)} 35%,
          ${alpha(theme.palette.secondary.main, 0.07)} 55%,
          transparent 75%)`,
        mixBlendMode: "multiply",
        opacity: 0.22,
        transform: "translateX(-26%)",
        animation: "soPrismSweep 22s ease-in-out infinite",
      },

      // Utility: “fold underline” for key phrases
      ".so-fold": {
        position: "relative",
        display: "inline-block",
      },
      ".so-fold::after": {
        content: '""',
        position: "absolute",
        left: "-2%",
        right: "-2%",
        bottom: "0.10em",
        height: "0.30em",
        background: `linear-gradient(90deg,
          transparent 0%,
          ${alpha(theme.palette.primary.main, 0.28)} 40%,
          transparent 85%)`,
        borderRadius: 999,
        opacity: 0.8,
        zIndex: -1,
        animation: "soSheen 5.6s ease-in-out infinite",
        pointerEvents: "none",
      },

      // Utility: mono “spec” badge (for 1/5/60)
      ".so-badge": {
        fontFamily: FONT_MONO,
        letterSpacing: "0.08em",
        padding: "0.16em 0.55em",
        borderRadius: 12,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        boxShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.08)}`,
      },

      "*::selection": {
        backgroundColor: alpha(theme.palette.primary.main, 0.22),
        color: theme.palette.text.primary,
      },

      a: {
        color: theme.palette.primary.main,
        textDecorationColor: alpha(theme.palette.primary.main, 0.5),
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
        ...origamiSurface(theme, {
          radius: Number(theme.shape.borderRadius) + 22,
          paperAlpha: 0.72,
          borderAlpha: 0.1,
          prism: 0.8,
        }),
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...origamiSurface(theme, {
          radius: Number(theme.shape.borderRadius) + 20,
          paperAlpha: 0.96,
          borderAlpha: 0.1,
          prism: 0.7,
        }),
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...origamiSurface(theme, {
          radius: Number(theme.shape.borderRadius) + 24,
          paperAlpha: 0.96,
          borderAlpha: 0.1,
          prism: 1,
        }),
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.shorter,
        }),
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 26px 86px ${alpha("#000", 0.16)}`,
        },
      }),
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiTypography-h1, &.MuiTypography-h2": {
          textShadow: `0 16px 0 ${alpha(theme.palette.common.black, 0.06)}`,
        },
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.95em",
          padding: "0.12em 0.42em",
          borderRadius: 10,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
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
          ${alpha(theme.palette.primary.main, 0.18)} 50%,
          ${alpha(theme.palette.text.primary, 0.12)} 80%,
          transparent 100%)`,
        opacity: 0.85,
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
        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        backgroundImage: `linear-gradient(135deg,
          ${alpha(theme.palette.primary.main, 0.9)} 0%,
          ${alpha(theme.palette.info.main, 0.7)} 55%,
          ${alpha(theme.palette.secondary.main, 0.55)} 100%)`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.common.white, 0.7)} inset`,
          `0 18px 70px ${alpha("#000", 0.14)}`,
        ].join(", "),
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `linear-gradient(120deg,
            transparent 0%,
            ${alpha(theme.palette.common.white, 0.22)} 42%,
            transparent 78%)`,
          opacity: 0.75,
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: `0 24px 86px ${alpha("#000", 0.18)}`,
        },
      }),

      outlinedPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderWidth: 1,
        borderColor: alpha(theme.palette.text.primary, 0.16),
        backgroundColor: alpha(theme.palette.background.paper, 0.75),
        "&:hover": {
          transform: "translateY(-1px)",
          backgroundColor: alpha(theme.palette.background.paper, 0.92),
          boxShadow: `0 20px 70px ${alpha("#000", 0.14)}`,
        },
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 18,
        backgroundColor: alpha(theme.palette.common.black, 0.02),
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.text.primary, 0.18),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.primary.main, 0.65),
          boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.12)}`,
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
        fontFamily: FONT_MONO,
        fontWeight: 900,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: alpha(theme.palette.text.secondary, 0.88),
        "&.Mui-focused": { color: theme.palette.primary.main },
      }),
    },
  },
});

export const spectralOrigami = {
  name: "Spectral Origami",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#2B7CFF", // clear blue accent
      dark: "#1D5FE6",
      light: "#7FA8FF",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#FF3FB4", // editorial magenta
      dark: "#E01F94",
      light: "#FF86D0",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#00C2A8", // teal prism
      dark: "#009F8A",
      light: "#66E6DA",
      contrastText: "#061019",
    },

    success: {
      main: "#00C46A",
      dark: "#009E55",
      light: "#66E3A8",
      contrastText: "#05120C",
    },

    warning: {
      main: "#FFB000",
      dark: "#E69300",
      light: "#FFD37A",
      contrastText: "#1A1206",
    },

    error: {
      main: "#FF2D2D",
      dark: "#D61E1E",
      light: "#FF7A7A",
      contrastText: "#120505",
    },

    background: {
      default: "#FAFBFF",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#0B1020",
      secondary: alpha("#0B1020", 0.72),
      disabled: alpha("#0B1020", 0.4),
    },

    divider: alpha("#0B1020", 0.12),

    action: {
      hover: alpha("#2B7CFF", 0.1),
      selected: alpha("#FF3FB4", 0.12),
      focus: alpha("#00C2A8", 0.14),
      active: alpha("#0B1020", 0.7),
      disabled: alpha("#0B1020", 0.3),
      disabledBackground: alpha("#0B1020", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 18 },
  spacing: 8,

  components: createComponents(),
} satisfies NamedThemeOptions;

// Optional night version — paper folds on a dark canvas.
// If you don’t need it — remove this export.
export const spectralOrigamiNight = {
  ...spectralOrigami,
  name: "Spectral Origami (Night)",
  palette: {
    ...spectralOrigami.palette,
    mode: "dark",
    background: {
      default: "#07080E",
      paper: "#0E1222",
    },
    text: {
      primary: "#F2F6FF",
      secondary: alpha("#F2F6FF", 0.78),
      disabled: alpha("#F2F6FF", 0.42),
    },
    divider: alpha("#F2F6FF", 0.14),
    action: {
      hover: alpha("#2B7CFF", 0.14),
      selected: alpha("#FF3FB4", 0.16),
      focus: alpha("#00C2A8", 0.18),
      active: alpha("#F2F6FF", 0.72),
      disabled: alpha("#F2F6FF", 0.3),
      disabledBackground: alpha("#F2F6FF", 0.08),
    },
  },
} satisfies NamedThemeOptions;
