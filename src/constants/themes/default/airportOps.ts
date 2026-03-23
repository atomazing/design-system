import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Airport Ops - calm, high-clarity operational UI for daily dispatch work.
 * - Built for dense schedules, gate assignments, and status-heavy workflows.
 * - Keeps surfaces quiet so tables, alerts, and control states stay readable.
 */

const FONT_OPS_UI =
  'var(--font-airport-ui),"IBM Plex Sans","Golos Text","Inter","Segoe UI","Roboto","Arial",sans-serif';
const FONT_OPS_DISPLAY =
  'var(--font-airport-display),"Golos Text","IBM Plex Sans","Inter","Segoe UI","Roboto","Arial",sans-serif';
const FONT_OPS_MONO =
  'var(--font-airport-mono),"IBM Plex Mono","JetBrains Mono","Roboto Mono","Cascadia Mono","Consolas",monospace';

const OPS_RADIUS = 6;

const createOpsBodyBackground = (theme: Theme) => {
  const isDark = theme.palette.mode === "dark";
  const gridLine = alpha(theme.palette.text.primary, isDark ? 0.06 : 0.024);

  return {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    backgroundImage: [
      `radial-gradient(980px 440px at 8% -10%, ${alpha(
        theme.palette.primary.main,
        isDark ? 0.18 : 0.12,
      )}, transparent 60%)`,
      `radial-gradient(860px 420px at 104% 10%, ${alpha(
        theme.palette.info.main,
        isDark ? 0.14 : 0.1,
      )}, transparent 58%)`,
      `repeating-linear-gradient(90deg, ${gridLine} 0px, ${gridLine} 1px, transparent 1px, transparent 44px)`,
      `repeating-linear-gradient(0deg, ${gridLine} 0px, ${gridLine} 1px, transparent 1px, transparent 36px)`,
    ].join(", "),
    backgroundAttachment: "fixed",
    backgroundSize: "auto, auto, auto, auto",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    fontKerning: "normal",
  };
};

const OPS_TYPOGRAPHY = {
  fontFamily: FONT_OPS_UI,

  h1: {
    fontFamily: FONT_OPS_DISPLAY,
    fontWeight: 700,
    fontSize: "2rem",
    lineHeight: 1.24,
    letterSpacing: "-0.008em",
  },
  h2: {
    fontFamily: FONT_OPS_DISPLAY,
    fontWeight: 650,
    fontSize: "1.6rem",
    lineHeight: 1.3,
    letterSpacing: "-0.004em",
  },
  h3: {
    fontFamily: FONT_OPS_UI,
    fontWeight: 650,
    fontSize: "1.26rem",
    lineHeight: 1.36,
    letterSpacing: "0",
  },
  h4: {
    fontFamily: FONT_OPS_UI,
    fontWeight: 650,
    fontSize: "1.04rem",
    lineHeight: 1.44,
    letterSpacing: "0",
  },

  subtitle1: {
    fontFamily: FONT_OPS_UI,
    fontWeight: 600,
    fontSize: "0.94rem",
    lineHeight: 1.56,
    letterSpacing: "0",
  },
  subtitle2: {
    fontFamily: FONT_OPS_UI,
    fontWeight: 600,
    fontSize: "0.86rem",
    lineHeight: 1.52,
    letterSpacing: "0",
  },

  body1: {
    fontFamily: FONT_OPS_UI,
    fontSize: "0.95rem",
    lineHeight: 1.68,
    letterSpacing: "0",
  },
  body2: {
    fontFamily: FONT_OPS_UI,
    fontSize: "0.875rem",
    lineHeight: 1.62,
    letterSpacing: "0",
  },

  button: {
    fontFamily: FONT_OPS_UI,
    textTransform: "none",
    fontWeight: 600,
    letterSpacing: "0.01em",
  },
  caption: {
    fontFamily: FONT_OPS_UI,
    fontSize: "0.78rem",
    lineHeight: 1.44,
    letterSpacing: "0.01em",
  },
  overline: {
    fontFamily: FONT_OPS_UI,
    fontSize: "0.74rem",
    letterSpacing: "0.04em",
    textTransform: "none",
    fontWeight: 700,
  },
} as const;

const createOpsComponents = ({
  appBarAlpha,
  borderAlpha,
  surfaceShadowAlpha,
  tableHeadAlpha,
  chipFillAlpha,
}: {
  appBarAlpha: number;
  borderAlpha: number;
  surfaceShadowAlpha: number;
  tableHeadAlpha: number;
  chipFillAlpha: number;
}): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      body: createOpsBodyBackground(theme),
      "code, kbd, samp, pre, .ops-code, .ops-time, .ops-value": {
        fontFamily: FONT_OPS_MONO,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "0.01em",
      },
      ".ops-code": {
        fontWeight: 600,
        textTransform: "uppercase",
      },
      ".ops-time, .ops-value": {
        fontWeight: 600,
      },
    }),
  },

  MuiAppBar: {
    defaultProps: { color: "inherit" as const, elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.background.paper, appBarAlpha),
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
        boxShadow: `0 1px 0 ${alpha(theme.palette.text.primary, borderAlpha * 0.65)}`,
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: OPS_RADIUS + 2,
        backgroundImage: "none",
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
        boxShadow: `0 1px 2px ${alpha(theme.palette.text.primary, surfaceShadowAlpha)}`,
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: OPS_RADIUS + 4,
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
        boxShadow: `0 1px 2px ${alpha(theme.palette.text.primary, surfaceShadowAlpha)}`,
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        borderRadius: OPS_RADIUS,
        paddingInline: 16,
        paddingBlock: 9,
        minHeight: 36,
        fontFamily: FONT_OPS_UI,
        fontWeight: 700,
      },
      contained: {
        boxShadow: "none",
      },
      containedPrimary: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
          boxShadow: "none",
        },
      }),
      outlined: ({ theme }) => ({
        borderWidth: 1,
        borderColor: alpha(theme.palette.text.primary, borderAlpha + 0.05),
      }),
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: OPS_RADIUS,
        fontFamily: FONT_OPS_UI,
        fontWeight: 600,
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.04)}`,
        backgroundColor: alpha(theme.palette.primary.main, chipFillAlpha),
        color: theme.palette.text.primary,
      }),
      label: {
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "0.01em",
      },
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 42,
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.06)}`,
      }),
      indicator: ({ theme }) => ({
        height: 2,
        borderRadius: 1,
        backgroundColor: theme.palette.primary.main,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: {
        minHeight: 42,
        fontFamily: FONT_OPS_UI,
        fontWeight: 700,
        paddingInline: 14,
        textTransform: "none",
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: OPS_RADIUS,
      },
      input: {
        fontFamily: FONT_OPS_UI,
        fontVariantNumeric: "tabular-nums",
      },
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, borderAlpha + 0.08),
      }),
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontFamily: FONT_OPS_UI,
        fontWeight: 600,
      },
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.text.primary, tableHeadAlpha),
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }) => ({
        fontFamily: FONT_OPS_UI,
        fontWeight: 700,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
        fontVariantNumeric: "tabular-nums",
      }),
      body: ({ theme }) => ({
        fontFamily: FONT_OPS_UI,
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
        fontVariantNumeric: "tabular-nums",
      }),
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: theme.palette.divider,
      }),
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: OPS_RADIUS + 2,
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
      }),
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        borderRadius: OPS_RADIUS,
        fontFamily: FONT_OPS_UI,
        fontSize: "0.78rem",
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontVariantNumeric: "tabular-nums",
      }),
    },
  },

  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: OPS_RADIUS + 2,
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
      }),
    },
  },
});

export const airportOps = {
  name: "Airport Ops",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#005B96",
      dark: "#004876",
      light: "#1D7FBF",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#2B3A4A",
      dark: "#1E2935",
      light: "#516273",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#0284C7",
      dark: "#0369A1",
      light: "#38BDF8",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#0F766E",
      dark: "#115E59",
      light: "#2DD4BF",
      contrastText: "#FFFFFF",
    },

    warning: {
      main: "#B45309",
      dark: "#92400E",
      light: "#F59E0B",
      contrastText: "#FFFFFF",
    },

    error: {
      main: "#B91C1C",
      dark: "#991B1B",
      light: "#EF4444",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#E8EEF5",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#14202B",
      secondary: "#52606D",
      disabled: alpha("#14202B", 0.45),
    },

    divider: alpha("#14202B", 0.14),

    grey: {
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A",
    },

    action: {
      hover: alpha("#005B96", 0.05),
      selected: alpha("#005B96", 0.1),
      focus: alpha("#005B96", 0.2),
      active: alpha("#14202B", 0.54),
      disabled: alpha("#14202B", 0.32),
      disabledBackground: alpha("#14202B", 0.08),
    },
  },

  typography: OPS_TYPOGRAPHY,

  shape: { borderRadius: OPS_RADIUS },
  spacing: 8,

  components: createOpsComponents({
    appBarAlpha: 0.98,
    borderAlpha: 0.12,
    surfaceShadowAlpha: 0.08,
    tableHeadAlpha: 0.045,
    chipFillAlpha: 0.08,
  }),
} satisfies NamedThemeOptions;

export const airportOpsNight = {
  name: "Airport Ops Night",
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: "#7CC6FF",
      dark: "#4DAEEB",
      light: "#B4E0FF",
      contrastText: "#09131D",
    },

    secondary: {
      main: "#D6E2EE",
      dark: "#B9CBDD",
      light: "#EEF4FA",
      contrastText: "#09131D",
    },

    info: {
      main: "#7DD3FC",
      dark: "#38BDF8",
      light: "#BAE6FD",
      contrastText: "#09131D",
    },

    success: {
      main: "#5EEAD4",
      dark: "#2DD4BF",
      light: "#99F6E4",
      contrastText: "#09131D",
    },

    warning: {
      main: "#FCD34D",
      dark: "#FBBF24",
      light: "#FDE68A",
      contrastText: "#09131D",
    },

    error: {
      main: "#FDA4AF",
      dark: "#FB7185",
      light: "#FECACA",
      contrastText: "#09131D",
    },

    background: {
      default: "#06101A",
      paper: "#162230",
    },

    text: {
      primary: "#E7EEF6",
      secondary: "#9FB0C2",
      disabled: alpha("#E7EEF6", 0.45),
    },

    divider: alpha("#E7EEF6", 0.16),

    grey: {
      50: "#0A1118",
      100: "#111A24",
      200: "#17212D",
      300: "#223041",
      400: "#42546A",
      500: "#64748B",
      600: "#94A3B8",
      700: "#C7D2DE",
      800: "#DCE6F0",
      900: "#EEF4FA",
    },

    action: {
      hover: alpha("#7CC6FF", 0.08),
      selected: alpha("#7CC6FF", 0.16),
      focus: alpha("#7CC6FF", 0.24),
      active: alpha("#E7EEF6", 0.54),
      disabled: alpha("#E7EEF6", 0.32),
      disabledBackground: alpha("#E7EEF6", 0.08),
    },
  },

  typography: OPS_TYPOGRAPHY,

  shape: { borderRadius: OPS_RADIUS },
  spacing: 8,

  components: createOpsComponents({
    appBarAlpha: 0.95,
    borderAlpha: 0.2,
    surfaceShadowAlpha: 0.2,
    tableHeadAlpha: 0.08,
    chipFillAlpha: 0.14,
  }),
} satisfies NamedThemeOptions;
