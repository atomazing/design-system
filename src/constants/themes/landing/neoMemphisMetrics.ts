import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Neo‑Memphis Metrics — Landing preset
 * Visual: modern neo‑Memphis — bold geometric patterns, playful contrasts, “sticker” accents,
 * while keeping a strict grid and clear hierarchy for B2B conversion.
 * Philosophy: «Сложное можно сделать лёгким. Мы снимаем напряжение старта и превращаем его в игру с правилами.»
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
    fontWeight: 850,
    fontSize: "clamp(2.3rem, 4.3vw, 3.6rem)",
    lineHeight: 1.03,
    letterSpacing: "-0.03em",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 840,
    fontSize: "clamp(1.65rem, 3vw, 2.45rem)",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
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
    fontWeight: 780,
    fontSize: "1.14rem",
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
  },

  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 750,
    fontSize: "1.03rem",
    lineHeight: 1.5,
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 750,
    fontSize: "0.92rem",
    lineHeight: 1.5,
  },

  body1: { fontSize: "1rem", lineHeight: 1.85 },
  body2: { fontSize: "0.92rem", lineHeight: 1.72 },

  button: {
    fontFamily: FONT_DISPLAY,
    textTransform: "none",
    fontWeight: 850,
    letterSpacing: "0.03em",
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

const sticker = (theme: Theme, opts?: { radius?: number }) => {
  const radius = opts?.radius ?? Number(theme.shape.borderRadius) + 14;

  return {
    position: "relative" as const,
    borderRadius: radius,
    overflow: "hidden" as const,
    backgroundImage: "none",
    boxShadow: [
      `0 0 0 1px ${alpha(theme.palette.common.black, 0.12)} inset`,
      `0 14px 44px ${alpha("#000", 0.22)}`,
    ].join(", "),
  };
};

const memphisPattern = (theme: Theme) => {
  // CSS-only pattern: dots + stripes + squiggle-like impression via gradients
  const ink = alpha(theme.palette.common.black, 0.14);
  const ink2 = alpha(theme.palette.common.black, 0.1);

  return [
    `radial-gradient(${ink} 1px, transparent 1px)`,
    `repeating-linear-gradient(45deg, ${ink2} 0px, ${ink2} 2px, transparent 2px, transparent 10px)`,
    `repeating-linear-gradient(-45deg, ${alpha(theme.palette.common.black, 0.06)} 0px, ${alpha(
      theme.palette.common.black,
      0.06,
    )} 1px, transparent 1px, transparent 8px)`,
  ].join(", ");
};

const createComponents = (): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      "@keyframes nmmFloat": {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-3px)" },
      },
      "@keyframes nmmWiggle": {
        "0%": { transform: "rotate(-0.6deg)" },
        "50%": { transform: "rotate(0.6deg)" },
        "100%": { transform: "rotate(-0.6deg)" },
      },

      "*, *::before, *::after": { boxSizing: "border-box" },

      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,

        // Memphis: bright base + playful pattern + big color blobs
        backgroundImage: [
          `radial-gradient(900px 520px at 14% 10%, ${alpha(
            theme.palette.primary.main,
            0.18,
          )} 0%, transparent 62%)`,
          `radial-gradient(820px 480px at 86% 12%, ${alpha(
            theme.palette.secondary.main,
            0.16,
          )} 0%, transparent 64%)`,
          `radial-gradient(900px 520px at 52% 112%, ${alpha(
            theme.palette.info.main,
            0.12,
          )} 0%, transparent 62%)`,
          memphisPattern(theme),
        ].join(", "),
        backgroundSize: "auto, auto, auto, 220px 220px",
        backgroundAttachment: "fixed",
      },

      "*::selection": {
        backgroundColor: alpha(theme.palette.secondary.main, 0.42),
        color: theme.palette.text.primary,
      },

      a: {
        color: theme.palette.text.primary,
        textDecorationColor: alpha(theme.palette.text.primary, 0.65),
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
        backgroundColor: alpha(theme.palette.background.paper, 0.86),
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
        boxShadow: `0 10px 30px ${alpha("#000", 0.12)}`,
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: "none",
        borderRadius: Number(theme.shape.borderRadius) + 14,
        backgroundColor: alpha(theme.palette.background.paper, 0.92),
        border: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
        boxShadow: `0 18px 54px ${alpha("#000", 0.16)}`,
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...sticker(theme, { radius: Number(theme.shape.borderRadius) + 18 }),
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.shorter,
        }),

        // “Sticker edge” (white border + tiny offset shadow)
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: Number(theme.shape.borderRadius) + 18,
          boxShadow: `0 0 0 2px ${alpha(theme.palette.common.white, 0.92)} inset`,
          pointerEvents: "none",
          opacity: 0.75,
        },

        // small playful corner mark
        "&::after": {
          content: '""',
          position: "absolute",
          right: 14,
          top: 14,
          width: 14,
          height: 14,
          borderRadius: 999,
          backgroundColor: theme.palette.secondary.main,
          boxShadow: `0 0 0 2px ${alpha(theme.palette.common.black, 0.12)}`,
          opacity: 0.9,
        },

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.common.black, 0.1)} inset`,
            `0 22px 70px ${alpha("#000", 0.18)}`,
          ].join(", "),
        },
      }),
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiTypography-h1, &.MuiTypography-h2": {
          textShadow: `0 12px 0 ${alpha(theme.palette.common.black, 0.08)}`,
        },
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.95em",
          padding: "0.12em 0.42em",
          borderRadius: 12,
          backgroundColor: alpha(theme.palette.primary.main, 0.14),
          border: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
        },
      }),
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: "transparent",
        height: 2,
        backgroundImage: `repeating-linear-gradient(90deg,
          ${alpha(theme.palette.common.black, 0.55)} 0px,
          ${alpha(theme.palette.common.black, 0.55)} 10px,
          transparent 10px,
          transparent 18px)`,
        opacity: 0.55,
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
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.shorter,
        }),
        "&:active": { transform: "translateY(0px)" },
      }),

      sizeLarge: {
        minHeight: 52,
        paddingInline: 26,
        paddingBlock: 14,
      },

      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        boxShadow: [
          `0 0 0 2px ${alpha(theme.palette.common.black, 0.12)} inset`,
          `0 16px 54px ${alpha("#000", 0.18)}`,
        ].join(", "),
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `radial-gradient(240px 120px at 30% 0%,
            ${alpha(theme.palette.common.white, 0.26)} 0%,
            transparent 60%)`,
          opacity: 0.85,
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: [
            `0 0 0 2px ${alpha(theme.palette.common.black, 0.14)} inset`,
            `0 22px 68px ${alpha("#000", 0.22)}`,
          ].join(", "),
        },
      }),

      containedSecondary: ({ theme }) => ({
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
        boxShadow: [
          `0 0 0 2px ${alpha(theme.palette.common.black, 0.12)} inset`,
          `0 16px 54px ${alpha("#000", 0.18)}`,
        ].join(", "),
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: [
            `0 0 0 2px ${alpha(theme.palette.common.black, 0.14)} inset`,
            `0 22px 68px ${alpha("#000", 0.22)}`,
          ].join(", "),
        },
      }),

      outlinedPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderColor: alpha(theme.palette.common.black, 0.18),
        borderWidth: 2,
        backgroundColor: alpha(theme.palette.common.white, 0.6),
        "&:hover": {
          transform: "translateY(-1px)",
          backgroundColor: alpha(theme.palette.common.white, 0.8),
          boxShadow: `0 18px 54px ${alpha("#000", 0.16)}`,
        },
      }),
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 14,
        backgroundColor: alpha(theme.palette.common.white, 0.66),
        border: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.white, 0.86),
          boxShadow: `0 16px 44px ${alpha("#000", 0.14)}`,
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
        backgroundColor: alpha(theme.palette.common.white, 0.72),
        border: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
        boxShadow: `0 12px 34px ${alpha("#000", 0.12)}`,
        "& .MuiChip-icon": {
          filter: `drop-shadow(0 2px 0 ${alpha(theme.palette.common.black, 0.12)})`,
        },
      }),
      label: { paddingInline: 12 },
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
      }),
      indicator: ({ theme }) => ({
        height: 4,
        borderRadius: 999,
        backgroundColor: theme.palette.secondary.main,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        fontFamily: FONT_DISPLAY,
        fontWeight: 850,
        letterSpacing: "0.03em",
        color: alpha(theme.palette.text.primary, 0.72),
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
        backgroundColor: alpha(theme.palette.common.white, 0.7),
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.common.black, 0.22),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.secondary.main,
          boxShadow: `0 0 0 3px ${alpha(theme.palette.secondary.main, 0.2)}`,
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(theme.palette.common.black, 0.14),
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
        "&.Mui-focused": { color: theme.palette.secondary.main },
      }),
    },
  },

  MuiTooltip: {
    defaultProps: { arrow: true },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 14,
        backgroundColor: alpha(theme.palette.common.white, 0.92),
        color: theme.palette.text.primary,
        border: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
        boxShadow: `0 18px 54px ${alpha("#000", 0.16)}`,
        fontSize: "0.84rem",
      }),
      arrow: ({ theme }) => ({
        color: alpha(theme.palette.common.white, 0.92),
      }),
    },
  },

  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...sticker(theme, { radius: Number(theme.shape.borderRadius) + 18 }),
        backgroundColor: alpha(theme.palette.common.white, 0.86),
        border: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
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
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
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
});

export const neoMemphisMetrics = {
  name: "Neo‑Memphis Metrics",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#3C7CFF", // bright blue
      dark: "#235FE6",
      light: "#8AB1FF",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#FF3FB4", // hot pink
      dark: "#E01F94",
      light: "#FF86D0",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#00C2A8", // teal
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
      main: "#FFB000", // warm amber
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
      default: "#FAF7FF", // warm-lilac paper
      paper: "#FFFFFF",
    },

    text: {
      primary: "#0B1020",
      secondary: alpha("#0B1020", 0.72),
      disabled: alpha("#0B1020", 0.38),
    },

    divider: alpha("#0B1020", 0.12),

    action: {
      hover: alpha("#FF3FB4", 0.14),
      selected: alpha("#FF3FB4", 0.2),
      focus: alpha("#3C7CFF", 0.18),
      active: alpha("#0B1020", 0.7),
      disabled: alpha("#0B1020", 0.28),
      disabledBackground: alpha("#0B1020", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 18 },
  spacing: 8,

  components: createComponents(),
} satisfies NamedThemeOptions;

// Optional “Night” mode — keeps Memphis personality but with dark base.
// If you don’t need it — remove this export.
export const neoMemphisMetricsNight = {
  ...neoMemphisMetrics,
  name: "Neo‑Memphis Metrics (Night)",
  palette: {
    ...neoMemphisMetrics.palette,
    mode: "dark",
    background: {
      default: "#090B14",
      paper: "#0F1428",
    },
    text: {
      primary: "#F2F6FF",
      secondary: alpha("#F2F6FF", 0.78),
      disabled: alpha("#F2F6FF", 0.42),
    },
    divider: alpha("#F2F6FF", 0.14),
    action: {
      hover: alpha("#FF3FB4", 0.12),
      selected: alpha("#FF3FB4", 0.18),
      focus: alpha("#3C7CFF", 0.2),
      active: alpha("#F2F6FF", 0.7),
      disabled: alpha("#F2F6FF", 0.3),
      disabledBackground: alpha("#F2F6FF", 0.08),
    },
  },
} satisfies NamedThemeOptions;
