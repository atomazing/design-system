import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

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
    fontSize: "clamp(2.25rem, 4.2vw, 3.55rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.035em",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 790,
    fontSize: "clamp(1.6rem, 2.9vw, 2.45rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.025em",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 760,
    fontSize: "clamp(1.22rem, 2vw, 1.62rem)",
    lineHeight: 1.15,
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
    fontWeight: 710,
    fontSize: "1.02rem",
    lineHeight: 1.58,
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    fontSize: "0.92rem",
    lineHeight: 1.58,
    letterSpacing: "0.01em",
    textTransform: "none",
  },

  body1: { fontSize: "1rem", lineHeight: 1.82 },
  body2: { fontSize: "0.92rem", lineHeight: 1.72 },

  button: {
    fontFamily: FONT_DISPLAY,
    textTransform: "none",
    fontWeight: 760,
    letterSpacing: "0.03em",
  },

  caption: { fontSize: "0.82rem", letterSpacing: "0.01em" },
  overline: {
    fontFamily: FONT_MONO,
    fontSize: "0.74rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 800,
  },
} as const;

interface PanelOptions {
  radius?: number;
  borderAlpha?: number;
  panelAlpha?: number;
  shadowAlpha?: number;
  accentAlpha?: number;
  showPulse?: boolean;
}

const mkPanel = (theme: Theme, opts?: PanelOptions) => {
  const isDark = theme.palette.mode === "dark";
  const radius = opts?.radius ?? Number(theme.shape.borderRadius) + 18;
  const borderAlpha = opts?.borderAlpha ?? (isDark ? 0.1 : 0.08);
  const panelAlpha = opts?.panelAlpha ?? (isDark ? 0.86 : 0.96);
  const shadowAlpha = opts?.shadowAlpha ?? (isDark ? 0.42 : 0.12);
  const accentAlpha = opts?.accentAlpha ?? (isDark ? 0.18 : 0.1);
  const showPulse = opts?.showPulse ?? true;

  return {
    position: "relative" as const,
    borderRadius: radius,
    overflow: "hidden" as const,
    isolation: "isolate" as const,
    backgroundImage: `linear-gradient(180deg,
      ${alpha(theme.palette.common.white, isDark ? 0.06 : 0.1)} 0%,
      transparent 55%)`,
    backgroundColor: alpha(theme.palette.background.paper, panelAlpha),
    border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
    boxShadow: [
      `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.12 : 0.5)} inset`,
      `0 18px 72px ${alpha("#000", shadowAlpha)}`,
    ].join(", "),
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",

    "&::after": {
      content: '""',
      position: "absolute" as const,
      left: 0,
      right: 0,
      top: 0,
      height: 2,
      backgroundImage: `linear-gradient(90deg,
        transparent 0%,
        ${alpha(theme.palette.primary.main, accentAlpha)} 36%,
        ${alpha(theme.palette.primary.main, accentAlpha * 1.25)} 52%,
        transparent 84%)`,
      opacity: showPulse ? 0.95 : 0,
      pointerEvents: "none" as const,
    },
  };
};

const calmSurface = (theme: Theme) => {
  const isDark = theme.palette.mode === "dark";

  return {
    position: "relative" as const,
    borderRadius: Number(theme.shape.borderRadius) + 20,
    backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.9 : 0.98),
    border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.08 : 0.07)}`,
    boxShadow: [
      `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.08 : 0.5)} inset`,
      `0 16px 52px ${alpha("#000", isDark ? 0.24 : 0.1)}`,
    ].join(", "),
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  };
};

const createComponents = (isDark: boolean): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      ":root": {
        "--mk-accent": theme.palette.primary.main,
        "--mk-bg": theme.palette.background.default,
        "--mk-ink": theme.palette.text.primary,
      },

      "@keyframes mkPulse": {
        "0%, 100%": { opacity: 0.3, transform: "scaleX(0.94)" },
        "50%": { opacity: 0.56, transform: "scaleX(1)" },
      },
      "@keyframes mkNumberTick": {
        "0%": { transform: "translateY(8px)", opacity: 0 },
        "100%": { transform: "translateY(0px)", opacity: 1 },
      },

      "*, *::before, *::after": { boxSizing: "border-box" },

      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundImage: isDark
          ? [
              `radial-gradient(980px 540px at 18% 10%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 60%)`,
              `radial-gradient(820px 480px at 82% 12%, ${alpha(theme.palette.info.main, 0.05)} 0%, transparent 64%)`,
              `linear-gradient(180deg, ${alpha("#000", 0.72)} 0%, transparent 24%, transparent 80%, ${alpha("#000", 0.84)} 100%)`,
              `repeating-linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.018)} 0px, transparent 1px, transparent 28px)`,
            ].join(", ")
          : [
              `radial-gradient(920px 520px at 18% 8%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 60%)`,
              `radial-gradient(780px 460px at 82% 10%, ${alpha(theme.palette.info.main, 0.035)} 0%, transparent 64%)`,
              `linear-gradient(180deg, ${alpha("#FFFFFF", 0.9)} 0%, ${alpha(theme.palette.background.default, 0.95)} 30%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
              `repeating-linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.014)} 0px, transparent 1px, transparent 32px)`,
            ].join(", "),
        backgroundAttachment: "fixed",
      },

      ".mk-pulse": {
        position: "relative",
      },
      ".mk-pulse::after": {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -8,
        height: 2,
        backgroundImage: `linear-gradient(90deg,
          transparent 0%,
          ${alpha(theme.palette.primary.main, 0.68)} 45%,
          transparent 90%)`,
        opacity: 0.4,
        animation: "mkPulse 2.8s ease-in-out infinite",
        pointerEvents: "none",
      },

      ".mk-number": {
        fontFamily: FONT_MONO,
        letterSpacing: "-0.04em",
        textShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.12)}`,
        animation: "mkNumberTick 420ms ease-out 1",
      },

      ".mk-surface-calm, [data-mk-surface='calm']": {
        ...calmSurface(theme),
      },

      ".mk-panel-focus, [data-mk-surface='focus']": {
        ...mkPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 24,
          panelAlpha: isDark ? 0.82 : 0.95,
          shadowAlpha: isDark ? 0.36 : 0.14,
          accentAlpha: isDark ? 0.28 : 0.16,
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
          isDark ? 0.34 : 0.2,
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
        ...mkPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 20,
          panelAlpha: isDark ? 0.72 : 0.94,
          borderAlpha: isDark ? 0.09 : 0.08,
          shadowAlpha: isDark ? 0.22 : 0.08,
          accentAlpha: isDark ? 0.12 : 0.08,
          showPulse: false,
        }),
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...mkPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 16,
          panelAlpha: isDark ? 0.84 : 0.97,
          shadowAlpha: isDark ? 0.26 : 0.08,
          accentAlpha: isDark ? 0.12 : 0.08,
          showPulse: false,
        }),
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...mkPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 20,
          panelAlpha: isDark ? 0.82 : 0.96,
          shadowAlpha: isDark ? 0.32 : 0.1,
          accentAlpha: isDark ? 0.18 : 0.12,
          showPulse: true,
        }),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          { duration: theme.transitions.duration.shorter },
        ),
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.12 : 0.5)} inset`,
            `0 20px 68px ${alpha("#000", isDark ? 0.38 : 0.14)}`,
            `0 0 26px ${alpha(theme.palette.primary.main, isDark ? 0.1 : 0.06)}`,
          ].join(", "),
        },
      }),
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiTypography-h1, &.MuiTypography-h2": {
          textShadow: `0 0 18px ${alpha(theme.palette.primary.main, isDark ? 0.08 : 0.04)}`,
        },
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.95em",
          padding: "0.12em 0.42em",
          borderRadius: 10,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.5 : 0.78,
          ),
          border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.1 : 0.08)}`,
        },
      }),
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: "transparent",
        backgroundImage: `linear-gradient(90deg,
          transparent 0%,
          ${alpha(theme.palette.text.primary, isDark ? 0.08 : 0.06)} 20%,
          ${alpha(theme.palette.primary.main, isDark ? 0.16 : 0.1)} 50%,
          ${alpha(theme.palette.text.primary, isDark ? 0.08 : 0.06)} 80%,
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
        fontWeight: 760,
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background-color", "border-color"],
          { duration: theme.transitions.duration.shorter },
        ),
        "&:active": { transform: "translateY(0)" },
      }),

      sizeLarge: {
        minHeight: 52,
        paddingInline: 26,
        paddingBlock: 14,
      },

      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        border: `1px solid ${alpha(theme.palette.common.white, isDark ? 0.14 : 0.24)}`,
        backgroundImage: `linear-gradient(135deg,
          ${alpha(theme.palette.primary.main, isDark ? 0.92 : 0.9)} 0%,
          ${alpha(theme.palette.primary.dark, isDark ? 0.88 : 0.84)} 100%)`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.06 : 0.18)} inset`,
          `0 16px 44px ${alpha("#000", isDark ? 0.38 : 0.18)}`,
          `0 0 28px ${alpha(theme.palette.primary.main, isDark ? 0.22 : 0.14)}`,
        ].join(", "),
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.08 : 0.22)} inset`,
            `0 20px 58px ${alpha("#000", isDark ? 0.48 : 0.22)}`,
            `0 0 34px ${alpha(theme.palette.primary.main, isDark ? 0.28 : 0.16)}`,
          ].join(", "),
        },
      }),

      outlinedPrimary: ({ theme }) => ({
        borderWidth: 1,
        borderColor: alpha(theme.palette.text.primary, isDark ? 0.16 : 0.14),
        color: theme.palette.text.primary,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.34 : 0.82,
        ),
        "&:hover": {
          transform: "translateY(-1px)",
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.42 : 0.9,
          ),
          borderColor: alpha(theme.palette.primary.main, isDark ? 0.22 : 0.18),
          boxShadow: `0 0 22px ${alpha(theme.palette.primary.main, isDark ? 0.08 : 0.05)}`,
        },
      }),

      textPrimary: ({ theme }) => ({
        color: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.08 : 0.06,
          ),
        },
      }),
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 14,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.3 : 0.82,
        ),
        border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.1 : 0.08)}`,
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.4 : 0.9,
          ),
          boxShadow: `0 0 18px ${alpha(theme.palette.primary.main, isDark ? 0.08 : 0.04)}`,
        },
      }),
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        fontFamily: FONT_DISPLAY,
        fontWeight: 730,
        letterSpacing: "0.03em",
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.4 : 0.88,
        ),
        border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.1 : 0.08)}`,
      }),
      label: { paddingInline: 12 },
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.1 : 0.08)}`,
      }),
      indicator: ({ theme }) => ({
        height: 2,
        borderRadius: 999,
        backgroundImage: `linear-gradient(90deg,
          ${alpha(theme.palette.primary.main, 0.96)},
          ${alpha(theme.palette.primary.light, 0.72)})`,
        boxShadow: `0 0 18px ${alpha(theme.palette.primary.main, isDark ? 0.18 : 0.1)}`,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        fontFamily: FONT_DISPLAY,
        fontWeight: 740,
        letterSpacing: "0.03em",
        textTransform: "none",
        color: alpha(theme.palette.text.primary, 0.74),
        "&.Mui-selected": {
          color: theme.palette.primary.main,
          textShadow: `0 0 16px ${alpha(theme.palette.primary.main, isDark ? 0.14 : 0.08)}`,
        },
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 18,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.34 : 0.84,
        ),
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.text.primary, isDark ? 0.18 : 0.14),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.primary.main, 0.62),
          boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, isDark ? 0.14 : 0.1)}`,
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, isDark ? 0.1 : 0.08),
      }),
      input: { paddingBlock: 12 },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_DISPLAY,
        fontWeight: 720,
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
        ...mkPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 18,
          panelAlpha: isDark ? 0.88 : 0.98,
          borderAlpha: isDark ? 0.1 : 0.08,
          shadowAlpha: isDark ? 0.24 : 0.08,
          accentAlpha: isDark ? 0.1 : 0.06,
          showPulse: false,
        }),
        fontSize: "0.84rem",
        padding: theme.spacing(1.25, 1.5),
      }),
      arrow: ({ theme }) => ({
        color: alpha(theme.palette.background.paper, isDark ? 0.88 : 0.98),
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
            theme.palette.background.paper,
            isDark ? 0.14 : 0.28,
          ),
        },
      }),
      content: () => ({
        margin: 0,
        "& .MuiTypography-root": {
          fontFamily: FONT_DISPLAY,
          fontWeight: 760,
        },
      }),
    },
  },

  MuiAccordionDetails: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(2.5),
        paddingBottom: theme.spacing(2.5),
        color: alpha(theme.palette.text.primary, 0.84),
      }),
    },
  },

  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...mkPanel(theme, {
          radius: Number(theme.shape.borderRadius) + 20,
          panelAlpha: isDark ? 0.88 : 0.98,
          borderAlpha: isDark ? 0.1 : 0.08,
          shadowAlpha: isDark ? 0.24 : 0.08,
          accentAlpha: isDark ? 0.1 : 0.06,
          showPulse: false,
        }),
      }),
    },
  },
});

export const monochromeKineticsLight = {
  name: "Monochrome Kinetics Light",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#13C8DB",
      dark: "#0B9EAE",
      light: "#92ECF4",
      contrastText: "#061019",
    },

    secondary: {
      main: "#E7EAF3",
      dark: "#C9CFDE",
      light: "#FFFFFF",
      contrastText: "#0A0A10",
    },

    info: {
      main: "#6F7D9B",
      dark: "#55627E",
      light: "#B9C2D8",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#D9DEE9",
      dark: "#BBC4D7",
      light: "#FFFFFF",
      contrastText: "#0A0A10",
    },

    warning: {
      main: "#D9DEE9",
      dark: "#BBC4D7",
      light: "#FFFFFF",
      contrastText: "#0A0A10",
    },

    error: {
      main: "#D95E74",
      dark: "#B7455A",
      light: "#F2A8B6",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F6F7FB",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#0A0A10",
      secondary: "#616879",
      disabled: alpha("#0A0A10", 0.4),
    },

    divider: alpha("#0A0A10", 0.1),

    action: {
      hover: alpha("#0A0A10", 0.05),
      selected: alpha("#13C8DB", 0.08),
      focus: alpha("#13C8DB", 0.16),
      active: alpha("#0A0A10", 0.64),
      disabled: alpha("#0A0A10", 0.3),
      disabledBackground: alpha("#0A0A10", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 18 },
  spacing: 8,

  components: createComponents(false),
} satisfies NamedThemeOptions;

export const monochromeKinetics = {
  name: "Monochrome Kinetics",
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
      main: "#EDEFF6",
      dark: "#C8CEDD",
      light: "#FFFFFF",
      contrastText: "#0A0A10",
    },

    info: {
      main: "#AEB8D6",
      dark: "#8E99BC",
      light: "#CFD7EE",
      contrastText: "#0A0A10",
    },

    success: {
      main: "#EDEFF6",
      dark: "#C8CEDD",
      light: "#FFFFFF",
      contrastText: "#0A0A10",
    },

    warning: {
      main: "#EDEFF6",
      dark: "#C8CEDD",
      light: "#FFFFFF",
      contrastText: "#0A0A10",
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
      selected: alpha("#00E5FF", 0.1),
      focus: alpha("#00E5FF", 0.2),
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
