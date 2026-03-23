import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Modern Minimal — purpose-driven, disciplined product UI.
 * - Strong hierarchy, low-ornament components, restrained contrast system.
 * - Designed to stay clear under dense dashboard content.
 */

const FONT_MINIMAL =
  '"IBM Plex Sans","Golos Text","Inter","Segoe UI","Roboto","Arial",sans-serif';

const MINIMAL_RADIUS = 6;

const createMinimalBodyBackground = (theme: Theme) => {
  const isDark = theme.palette.mode === "dark";
  const dotColor = alpha(theme.palette.primary.main, isDark ? 0.14 : 0.08);

  return {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    backgroundImage: [
      `radial-gradient(920px 420px at 12% -10%, ${alpha(
        theme.palette.primary.main,
        isDark ? 0.16 : 0.1,
      )}, transparent 60%)`,
      `linear-gradient(180deg, ${alpha(
        isDark ? theme.palette.common.black : theme.palette.common.white,
        isDark ? 0.12 : 0.54,
      )} 0%, transparent 32%)`,
      `radial-gradient(${dotColor} 1px, transparent 1px)`,
    ].join(", "),
    backgroundAttachment: "fixed",
    backgroundSize: "auto, auto, 26px 26px",
    backgroundPosition: "0 0, 0 0, -13px -13px",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };
};

const MINIMAL_TYPOGRAPHY = {
  fontFamily: FONT_MINIMAL,

  h1: {
    fontWeight: 800,
    fontSize: "2.04rem",
    lineHeight: 1.18,
    letterSpacing: "-0.018em",
  },
  h2: {
    fontWeight: 700,
    fontSize: "1.64rem",
    lineHeight: 1.26,
    letterSpacing: "-0.012em",
  },
  h3: {
    fontWeight: 700,
    fontSize: "1.32rem",
    lineHeight: 1.34,
    letterSpacing: "-0.006em",
  },
  h4: { fontWeight: 600, fontSize: "1.08rem", lineHeight: 1.44 },

  subtitle1: { fontWeight: 600, fontSize: "0.94rem", lineHeight: 1.56 },
  subtitle2: { fontWeight: 600, fontSize: "0.86rem", lineHeight: 1.5 },

  body1: { fontSize: "0.94rem", lineHeight: 1.68 },
  body2: { fontSize: "0.86rem", lineHeight: 1.62 },

  button: {
    textTransform: "none",
    fontWeight: 600,
    letterSpacing: "0.01em",
  },
  caption: { fontSize: "0.74rem" },
  overline: {
    fontSize: "0.72rem",
    letterSpacing: "0.05em",
    textTransform: "none",
  },
} as const;

const createMinimalComponents = ({
  appBarAlpha,
  borderAlpha,
  surfaceShadowAlpha,
  tableHeadAlpha,
}: {
  appBarAlpha: number;
  borderAlpha: number;
  surfaceShadowAlpha: number;
  tableHeadAlpha: number;
}): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      body: createMinimalBodyBackground(theme),
    }),
  },

  MuiAppBar: {
    defaultProps: { color: "inherit" as const, elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.background.paper, appBarAlpha),
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
        boxShadow: `0 1px 0 ${alpha(theme.palette.text.primary, borderAlpha * 0.7)}`,
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: MINIMAL_RADIUS + 2,
        backgroundImage: "none",
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
        boxShadow: `0 1px 2px ${alpha(theme.palette.text.primary, surfaceShadowAlpha)}`,
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: MINIMAL_RADIUS + 4,
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
        boxShadow: `0 1px 2px ${alpha(theme.palette.text.primary, surfaceShadowAlpha)}`,
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        borderRadius: MINIMAL_RADIUS,
        paddingInline: 16,
        paddingBlock: 9,
        minHeight: 36,
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
        borderRadius: MINIMAL_RADIUS,
        fontWeight: 600,
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.04)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
      }),
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
        fontWeight: 700,
        paddingInline: 14,
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: MINIMAL_RADIUS,
      },
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, borderAlpha + 0.08),
      }),
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: { fontWeight: 600 },
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
        fontWeight: 700,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
      }),
      body: ({ theme }) => ({
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
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
        borderRadius: MINIMAL_RADIUS + 2,
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
      }),
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        borderRadius: MINIMAL_RADIUS,
        fontSize: "0.78rem",
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }),
    },
  },

  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: MINIMAL_RADIUS + 2,
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
      }),
    },
  },
});

export const modernMinimal = {
  name: "Modern Minimal",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#1E40AF",
      dark: "#1E3A8A",
      light: "#3B82F6",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#111827",
      dark: "#030712",
      light: "#374151",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#2563EB",
      dark: "#1D4ED8",
      light: "#60A5FA",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#15803D",
      dark: "#166534",
      light: "#4ADE80",
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
      default: "#EAEEF3",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#111827",
      secondary: "#4B5563",
      disabled: alpha("#111827", 0.45),
    },

    divider: alpha("#111827", 0.14),

    grey: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },

    action: {
      hover: alpha("#1E40AF", 0.04),
      selected: alpha("#1E40AF", 0.1),
      focus: alpha("#1E40AF", 0.2),
      active: alpha("#111827", 0.54),
      disabled: alpha("#111827", 0.32),
      disabledBackground: alpha("#111827", 0.08),
    },
  },

  typography: MINIMAL_TYPOGRAPHY,

  shape: { borderRadius: MINIMAL_RADIUS },
  spacing: 8,

  components: createMinimalComponents({
    appBarAlpha: 0.98,
    borderAlpha: 0.12,
    surfaceShadowAlpha: 0.08,
    tableHeadAlpha: 0.04,
  }),
} satisfies NamedThemeOptions;

export const modernMinimalDark = {
  name: "Modern Minimal Dark",
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: "#93C5FD",
      dark: "#60A5FA",
      light: "#BFDBFE",
      contrastText: "#0B1220",
    },

    secondary: {
      main: "#E5E7EB",
      dark: "#D1D5DB",
      light: "#F3F4F6",
      contrastText: "#0B1220",
    },

    info: {
      main: "#7DD3FC",
      dark: "#38BDF8",
      light: "#BAE6FD",
      contrastText: "#0B1220",
    },

    success: {
      main: "#6EE7B7",
      dark: "#34D399",
      light: "#A7F3D0",
      contrastText: "#0B1220",
    },

    warning: {
      main: "#FCD34D",
      dark: "#FBBF24",
      light: "#FDE68A",
      contrastText: "#0B1220",
    },

    error: {
      main: "#FDA4AF",
      dark: "#FB7185",
      light: "#FECACA",
      contrastText: "#0B1220",
    },

    background: {
      default: "#080D13",
      paper: "#18212E",
    },

    text: {
      primary: "#F3F4F6",
      secondary: "#9CA3AF",
      disabled: alpha("#F3F4F6", 0.45),
    },

    divider: alpha("#F3F4F6", 0.16),

    grey: {
      50: "#0B0F14",
      100: "#111827",
      200: "#1F2937",
      300: "#374151",
      400: "#4B5563",
      500: "#6B7280",
      600: "#9CA3AF",
      700: "#D1D5DB",
      800: "#E5E7EB",
      900: "#F3F4F6",
    },

    action: {
      hover: alpha("#93C5FD", 0.08),
      selected: alpha("#93C5FD", 0.16),
      focus: alpha("#93C5FD", 0.24),
      active: alpha("#F3F4F6", 0.54),
      disabled: alpha("#F3F4F6", 0.32),
      disabledBackground: alpha("#F3F4F6", 0.08),
    },
  },

  typography: MINIMAL_TYPOGRAPHY,

  shape: { borderRadius: MINIMAL_RADIUS },
  spacing: 8,

  components: createMinimalComponents({
    appBarAlpha: 0.94,
    borderAlpha: 0.2,
    surfaceShadowAlpha: 0.2,
    tableHeadAlpha: 0.08,
  }),
} satisfies NamedThemeOptions;
