import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Brutalist Sprint — Landing preset
 * Visual: digital brutalism — rough blocks, poster typography, sharp dividers, intentionally “raw” UI.
 * Philosophy: «Мы не украшаем процесс — мы его ускоряем. Жёстко, быстро, по делу.»
 */

const FONT_DISPLAY =
  '"Sora","Space Grotesk","Arial Black","Inter","Helvetica","Arial",sans-serif';
const FONT_TEXT = '"Inter","Manrope","Helvetica","Arial",sans-serif';
const FONT_MONO =
  '"IBM Plex Mono","JetBrains Mono","Roboto Mono","Menlo","Consolas",monospace';

const typography = {
  fontFamily: FONT_TEXT,

  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    fontSize: "clamp(2.4rem, 4.6vw, 3.9rem)",
    lineHeight: 0.98,
    letterSpacing: "-0.045em",
    textTransform: "uppercase",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.035em",
    textTransform: "uppercase",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 850,
    fontSize: "clamp(1.2rem, 2vw, 1.65rem)",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 850,
    fontSize: "1.15rem",
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },

  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 800,
    fontSize: "1.05rem",
    letterSpacing: "-0.005em",
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 800,
    fontSize: "0.94rem",
    letterSpacing: "0.01em",
    textTransform: "uppercase",
  },

  body1: { fontSize: "1rem", lineHeight: 1.75 },
  body2: { fontSize: "0.92rem", lineHeight: 1.7 },

  button: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },

  caption: { fontSize: "0.82rem", letterSpacing: "0.02em" },
  overline: {
    fontFamily: FONT_DISPLAY,
    fontSize: "0.76rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: 900,
  },
} as const;

const brutalShadow = (theme: Theme, size = 8) => {
  // Hard “print” shadow: no blur, no softness.
  const ink = theme.palette.text.primary;
  return `${size}px ${size}px 0 ${alpha(ink, 0.92)}`;
};

const brutalFrame = (
  theme: Theme,
  opts?: { thick?: number; radius?: number },
) => {
  const thick = opts?.thick ?? 2;
  const radius = opts?.radius ?? Number(theme.shape.borderRadius);
  return {
    border: `${thick}px solid ${alpha(theme.palette.text.primary, 0.92)}`,
    borderRadius: radius,
  } as const;
};

const brutalPanel = (
  theme: Theme,
  opts?: {
    thick?: number;
    radius?: number;
    shadow?: number;
    cornerStamps?: boolean;
    cornerA?: string;
    cornerB?: string;
  },
) => ({
  position: "relative" as const,
  overflow: "hidden" as const,
  backgroundImage: "none",
  backgroundColor: theme.palette.background.paper,
  ...brutalFrame(theme, {
    thick: opts?.thick ?? 2,
    radius: opts?.radius ?? Number(theme.shape.borderRadius),
  }),
  boxShadow: brutalShadow(theme, opts?.shadow ?? 10),
  ...(opts?.cornerStamps
    ? {
        "&::before": {
          content: '""',
          position: "absolute" as const,
          insetInlineStart: 0,
          insetBlockStart: 0,
          width: 14,
          height: 14,
          backgroundColor: opts?.cornerA ?? theme.palette.secondary.main,
          pointerEvents: "none" as const,
        },
        "&::after": {
          content: '""',
          position: "absolute" as const,
          insetInlineEnd: 0,
          insetBlockEnd: 0,
          width: 14,
          height: 14,
          backgroundColor: opts?.cornerB ?? theme.palette.info.main,
          pointerEvents: "none" as const,
        },
      }
    : {}),
});

const createComponents = (): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      ":root": {
        "--bs-ink": theme.palette.text.primary,
        "--bs-paper": theme.palette.background.default,
        "--bs-hi": theme.palette.secondary.main,
      },

      "@keyframes bsStamp": {
        "0%": { transform: "translate(0,0)" },
        "50%": { transform: "translate(-1px,-1px)" },
        "100%": { transform: "translate(0,0)" },
      },
      "@keyframes bsBlinkSafe": {
        // “Monitoring vibe” but NOT flickering: subtle opacity drift.
        "0%, 100%": { opacity: 0.35 },
        "50%": { opacity: 0.55 },
      },

      "*, *::before, *::after": { boxSizing: "border-box" },

      html: {
        // Brutalist: sharper edges & “print” feel
        scrollBehavior: "smooth",
      },

      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,

        // Paper + blueprint micro texture (landing-friendly)
        backgroundImage: [
          `linear-gradient(0deg, ${alpha(theme.palette.text.primary, 0.04)} 1px, transparent 1px)`,
          `linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.03)} 1px, transparent 1px)`,
          `radial-gradient(1400px 520px at 10% 0%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 55%)`,
          `radial-gradient(1200px 520px at 90% 0%, ${alpha("#00A3FF", 0.06)} 0%, transparent 58%)`,
        ].join(", "),
        backgroundSize: "28px 28px, 34px 34px, auto, auto",
        backgroundAttachment: "fixed",
      },

      // Big “poster tape” stripe — good for hero or top-level emphasis
      "body::before": {
        content: '""',
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        background: `linear-gradient(120deg,
            transparent 0%,
            transparent 42%,
            ${alpha(theme.palette.secondary.main, 0.1)} 42%,
            ${alpha(theme.palette.secondary.main, 0.1)} 46%,
            transparent 46%,
            transparent 100%)`,
        opacity: 0.8,
        mixBlendMode: "multiply",
        animation: "bsBlinkSafe 9s ease-in-out infinite",
      },

      "*::selection": {
        backgroundColor: alpha(theme.palette.secondary.main, 0.7),
        color: theme.palette.text.primary,
      },

      a: {
        color: theme.palette.text.primary,
        textDecorationColor: alpha(theme.palette.text.primary, 0.9),
        textDecorationThickness: "3px",
        textUnderlineOffset: "3px",
      },

      code: {
        fontFamily: FONT_MONO,
      },
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
        backgroundColor: alpha(theme.palette.background.paper, 0.92),
        borderBottom: `3px solid ${alpha(theme.palette.text.primary, 0.9)}`,
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...brutalPanel(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
          shadow: 0,
          cornerStamps: false,
        }),
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...brutalPanel(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
          shadow: 10,
          cornerStamps: true,
        }),
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.shorter,
        }),
        "&:hover": {
          transform: "translate(-2px, -2px)",
          boxShadow: brutalShadow(theme, 12),
        },
      }),
    },
  },

  MuiCardHeader: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(2.25),
        paddingTop: theme.spacing(2.25),
        paddingBottom: theme.spacing(1.25),
      }),
      title: () => ({
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }),
      subheader: ({ theme }) => ({
        color: alpha(theme.palette.text.secondary, 0.96),
        fontFamily: FONT_MONO,
        letterSpacing: "0.02em",
      }),
    },
  },

  MuiCardContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(2.25),
        paddingBottom: theme.spacing(2.25),
      }),
    },
  },

  MuiCardActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(2.25),
        paddingBottom: theme.spacing(2.25),
        gap: theme.spacing(1),
      }),
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.95em",
          padding: "0.12em 0.38em",
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.secondary.main, 0.35),
          border: `2px solid ${alpha(theme.palette.text.primary, 0.9)}`,
        },
      }),
    },
  },

  MuiLink: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontWeight: 800,
        textDecorationThickness: "3px",
        textUnderlineOffset: "3px",
        transition: theme.transitions.create(
          ["background-color", "text-decoration-color", "color"],
          { duration: theme.transitions.duration.shorter },
        ),
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.35),
        },
      }),
    },
  },

  MuiBreadcrumbs: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiBreadcrumbs-separator": {
          color: alpha(theme.palette.text.primary, 0.6),
          fontWeight: 900,
        },
      }),
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 0,
        height: 3,
        backgroundImage: `repeating-linear-gradient(90deg,
          ${alpha(theme.palette.text.primary, 0.95)} 0px,
          ${alpha(theme.palette.text.primary, 0.95)} 14px,
          transparent 14px,
          transparent 22px)`,
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        paddingInline: 18,
        paddingBlock: 12,
        minHeight: 44,
        position: "relative",
        overflow: "hidden",
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.shorter,
        }),
        "&:active": { transform: "translate(0,0)" },
      }),

      sizeLarge: {
        minHeight: 52,
        paddingInline: 22,
        paddingBlock: 14,
      },

      containedPrimary: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        ...brutalFrame(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
        }),
        boxShadow: brutalShadow(theme, 8),

        // “Sprint stripe” (like hazard tape) — signature detail for this preset
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(135deg,
              ${alpha(theme.palette.secondary.main, 0.6)} 0px,
              ${alpha(theme.palette.secondary.main, 0.6)} 8px,
              transparent 8px,
              transparent 16px)`,
          opacity: 0.18,
          pointerEvents: "none",
        },

        "&:hover": {
          transform: "translate(-2px,-2px)",
          boxShadow: brutalShadow(theme, 10),
        },
      }),

      outlinedPrimary: ({ theme }) => ({
        backgroundColor: "transparent",
        color: theme.palette.text.primary,
        ...brutalFrame(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
        }),
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.35),
          transform: "translate(-1px,-1px)",
        },
      }),

      containedSecondary: ({ theme }) => ({
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.text.primary,
        ...brutalFrame(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
        }),
        boxShadow: brutalShadow(theme, 8),
        "&:hover": {
          transform: "translate(-2px,-2px)",
          boxShadow: brutalShadow(theme, 10),
        },
      }),
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...brutalFrame(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
        }),
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.35),
          transform: "translate(-1px,-1px)",
        },
      }),
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        backgroundColor: alpha(theme.palette.secondary.main, 0.65),
        color: theme.palette.text.primary,
        ...brutalFrame(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
        }),
      }),
      label: { paddingInline: 12 },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...brutalFrame(theme, { thick: 2, radius: 2 }),
        backgroundColor: alpha(theme.palette.secondary.main, 0.45),
        color: theme.palette.text.primary,
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
      }),
    },
  },

  MuiBadge: {
    styleOverrides: {
      badge: ({ theme }) => ({
        ...brutalFrame(theme, { thick: 2, radius: 2 }),
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
      }),
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 48,
        borderBottom: `3px solid ${alpha(theme.palette.text.primary, 0.9)}`,
      }),
      indicator: ({ theme }) => ({
        height: 6,
        borderRadius: 0,
        backgroundColor: theme.palette.secondary.main,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 48,
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: alpha(theme.palette.text.primary, 0.85),
        "&.Mui-selected": {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.secondary.main, 0.35),
        },
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.text.primary,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.secondary.main,
          borderWidth: 3,
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, 0.9),
        borderWidth: 2,
      }),
      input: {
        paddingBlock: 12,
      },
    },
  },

  MuiSelect: {
    styleOverrides: {
      icon: ({ theme }) => ({
        color: alpha(theme.palette.text.primary, 0.9),
      }),
      select: () => ({
        fontFamily: FONT_TEXT,
        fontWeight: 700,
      }),
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: alpha(theme.palette.text.secondary, 0.95),
        "&.Mui-focused": { color: theme.palette.text.primary },
      }),
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginTop: theme.spacing(0.75),
        color: alpha(theme.palette.text.secondary, 0.98),
        fontWeight: 700,
        fontFamily: FONT_MONO,
      }),
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...brutalFrame(theme, { thick: 2, radius: 2 }),
        color: alpha(theme.palette.text.primary, 0.75),
        "&.Mui-checked": {
          color: theme.palette.secondary.main,
        },
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.26),
        },
      }),
    },
  },

  MuiRadio: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: alpha(theme.palette.text.primary, 0.75),
        "&.Mui-checked": {
          color: theme.palette.secondary.main,
        },
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.26),
        },
      }),
    },
  },

  MuiSwitch: {
    styleOverrides: {
      root: {
        padding: 10,
      },
      thumb: ({ theme }) => ({
        ...brutalFrame(theme, { thick: 2, radius: 2 }),
        backgroundColor: theme.palette.background.paper,
      }),
      track: ({ theme }) => ({
        ...brutalFrame(theme, { thick: 2, radius: 0 }),
        backgroundColor: alpha(theme.palette.text.primary, 0.2),
        opacity: 1,
      }),
      switchBase: ({ theme }) => ({
        "&.Mui-checked": {
          color: theme.palette.secondary.main,
          "& + .MuiSwitch-track": {
            backgroundColor: alpha(theme.palette.secondary.main, 0.45),
            opacity: 1,
          },
        },
      }),
    },
  },

  MuiSlider: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.secondary.main,
        height: 8,
      }),
      rail: ({ theme }) => ({
        height: 8,
        opacity: 1,
        backgroundColor: alpha(theme.palette.text.primary, 0.22),
      }),
      track: {
        height: 8,
        border: "none",
      },
      thumb: ({ theme }) => ({
        width: 18,
        height: 18,
        ...brutalFrame(theme, { thick: 2, radius: 2 }),
        backgroundColor: theme.palette.background.paper,
      }),
      valueLabel: () => ({
        borderRadius: 2,
        fontFamily: FONT_MONO,
        fontWeight: 700,
      }),
    },
  },

  MuiTooltip: {
    defaultProps: { arrow: true },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        fontSize: "0.84rem",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        ...brutalFrame(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
        }),
        boxShadow: "none",
      }),
      arrow: ({ theme }) => ({
        color: theme.palette.background.paper,
        "&::before": {
          border: `2px solid ${alpha(theme.palette.text.primary, 0.9)}`,
        },
      }),
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...brutalPanel(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
          shadow: 0,
          cornerStamps: false,
        }),
      }),
      standardInfo: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.info.main, 0.12),
      }),
      standardSuccess: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.success.main, 0.14),
      }),
      standardWarning: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.warning.main, 0.16),
      }),
      standardError: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.error.main, 0.14),
      }),
    },
  },

  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        ...brutalFrame(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
        }),
        boxShadow: brutalShadow(theme, 8),
      }),
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...brutalFrame(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
        }),
        marginInline: theme.spacing(1),
        marginBlock: theme.spacing(0.5),
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.24),
        },
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.34),
        },
      }),
    },
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        minWidth: 36,
        color: alpha(theme.palette.text.primary, 0.9),
      }),
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...brutalPanel(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
          shadow: 10,
          cornerStamps: true,
        }),
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 42,
        marginInline: theme.spacing(0.5),
        marginBlock: theme.spacing(0.25),
        ...brutalFrame(theme, {
          thick: 1,
          radius: Number(theme.shape.borderRadius),
        }),
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.35),
        },
      }),
    },
  },

  MuiPopover: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...brutalPanel(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
          shadow: 8,
          cornerStamps: false,
        }),
      }),
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundImage: "none",
        backgroundColor: theme.palette.background.paper,
        borderInlineEnd: `3px solid ${alpha(theme.palette.text.primary, 0.9)}`,
      }),
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...brutalPanel(theme, {
          thick: 3,
          radius: Number(theme.shape.borderRadius),
          shadow: 12,
          cornerStamps: true,
        }),
      }),
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(2.5),
        paddingTop: theme.spacing(2.5),
        paddingBottom: theme.spacing(1.5),
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }),
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(2.5),
      }),
      dividers: ({ theme }) => ({
        borderTop: `2px solid ${alpha(theme.palette.text.primary, 0.9)}`,
        borderBottom: `2px solid ${alpha(theme.palette.text.primary, 0.9)}`,
      }),
    },
  },

  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(2.5),
        paddingBottom: theme.spacing(2.5),
        gap: theme.spacing(1),
      }),
    },
  },

  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...brutalPanel(theme, {
          thick: 2,
          radius: Number(theme.shape.borderRadius),
          shadow: 10,
          cornerStamps: true,
        }),
      }),
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: `repeating-linear-gradient(90deg, ${alpha(
          theme.palette.secondary.main,
          0.34,
        )} 0px, ${alpha(theme.palette.secondary.main, 0.34)} 18px, transparent 18px, transparent 30px)`,
      }),
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.16),
        },
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }) => ({
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        borderBottom: `3px solid ${alpha(theme.palette.text.primary, 0.92)}`,
      }),
      body: ({ theme }) => ({
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
      }),
    },
  },

  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        ...brutalFrame(theme, { thick: 2, radius: 0 }),
        backgroundColor: alpha(theme.palette.text.primary, 0.14),
      }),
      bar: ({ theme }) => ({
        borderRadius: 0,
        backgroundImage: `repeating-linear-gradient(135deg, ${theme.palette.secondary.main} 0px, ${theme.palette.secondary.main} 8px, ${alpha(
          theme.palette.secondary.main,
          0.7,
        )} 8px, ${alpha(theme.palette.secondary.main, 0.7)} 16px)`,
      }),
    },
  },

  MuiCircularProgress: {
    styleOverrides: {
      circle: {
        strokeLinecap: "butt",
      },
    },
  },

  MuiSkeleton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 0,
        backgroundColor: alpha(theme.palette.text.primary, 0.1),
      }),
    },
  },

  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...brutalFrame(theme, { thick: 2, radius: 0 }),
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.4),
        },
      }),
    },
  },

  MuiFab: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...brutalFrame(theme, { thick: 2, radius: 2 }),
        boxShadow: brutalShadow(theme, 10),
      }),
    },
  },
});

export const brutalistSprint = {
  name: "Brutalist Sprint",
  direction: "ltr",

  palette: {
    mode: "light",

    // “Ink” primary — brutalist default action color
    primary: {
      main: "#0B0B0C",
      dark: "#070708",
      light: "#2A2A2E",
      contrastText: "#FFFFFF",
    },

    // Highlighter accent (hazard-tape vibe)
    secondary: {
      main: "#FFDD00",
      dark: "#E6C600",
      light: "#FFE766",
      contrastText: "#0B0B0C",
    },

    info: {
      main: "#00A3FF",
      dark: "#0078D6",
      light: "#66C8FF",
      contrastText: "#061019",
    },

    success: {
      main: "#00C46A",
      dark: "#009E55",
      light: "#66E3A8",
      contrastText: "#05120C",
    },

    warning: {
      main: "#FF6A00",
      dark: "#D65400",
      light: "#FF9B57",
      contrastText: "#120B05",
    },

    error: {
      main: "#FF2D2D",
      dark: "#D61E1E",
      light: "#FF7A7A",
      contrastText: "#120505",
    },

    background: {
      default: "#F6F3EA", // warm paper
      paper: "#FFFFFF",
    },

    text: {
      primary: "#0B0B0C",
      secondary: "#2A2A2E",
      disabled: alpha("#0B0B0C", 0.38),
    },

    divider: alpha("#0B0B0C", 0.9),

    action: {
      hover: alpha("#FFDD00", 0.28),
      selected: alpha("#FFDD00", 0.38),
      focus: alpha("#FFDD00", 0.45),
      active: alpha("#0B0B0C", 0.78),
      disabled: alpha("#0B0B0C", 0.32),
      disabledBackground: alpha("#0B0B0C", 0.08),
    },
  },

  typography,

  shape: { borderRadius: 2 },
  spacing: 8,

  components: createComponents(),
} satisfies NamedThemeOptions;

// Optional inverted mode — same brutal identity, night-friendly landing.
// If you don’t need it — you can remove this export.
export const brutalistSprintNight = {
  ...brutalistSprint,
  name: "Brutalist Sprint (Night)",
  palette: {
    ...brutalistSprint.palette,
    mode: "dark",
    background: {
      default: "#0B0B0C",
      paper: "#111114",
    },
    text: {
      primary: "#F6F3EA",
      secondary: alpha("#F6F3EA", 0.78),
      disabled: alpha("#F6F3EA", 0.42),
    },
    divider: alpha("#F6F3EA", 0.9),
    primary: {
      main: "#F6F3EA",
      dark: "#DAD6CC",
      light: "#FFFFFF",
      contrastText: "#0B0B0C",
    },
    action: {
      hover: alpha("#FFDD00", 0.18),
      selected: alpha("#FFDD00", 0.26),
      focus: alpha("#FFDD00", 0.35),
      active: alpha("#F6F3EA", 0.8),
      disabled: alpha("#F6F3EA", 0.3),
      disabledBackground: alpha("#F6F3EA", 0.08),
    },
  },
} satisfies NamedThemeOptions;
