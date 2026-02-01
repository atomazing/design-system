import { alpha } from "@mui/material/styles";

import type { ThemesProp } from "@/context";

/**
 * Editorial Classic — magazine / editorial style.
 * - Light: warm paper background, strict typography, crisp hairline borders.
 * - Dark: ink-on-charcoal with softened borders and the same editorial rhythm.
 *
 * Dark mode note (for your current createCustomTheme implementation):
 * - In dark mode, surface overrides (palette.background, CssBaseline backgrounds)
 *   are applied only if the override explicitly sets `palette.mode: "dark"`.
 * - Therefore the Dark variant below sets `palette.mode: "dark"`.
 */

const FONT_EDITORIAL =
  '"Source Serif 4","Noto Naskh Arabic","Tajawal","Cairo","Georgia","Times New Roman",serif';

export const editorialClassic = {
  name: "Editorial Classic",
  direction: "rtl",

  palette: {
    mode: "light",

    primary: {
      // Deep editorial ink (links, focus)
      main: "#111827",
      dark: "#0B1220",
      light: "#374151",
      contrastText: "#FFFFFF",
    },

    secondary: {
      // Muted burgundy (accents, highlights)
      main: "#7F1D1D",
      dark: "#5B1414",
      light: "#B91C1C",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#1D4ED8",
      dark: "#1E40AF",
      light: "#60A5FA",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#166534",
      dark: "#14532D",
      light: "#4ADE80",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#B45309",
      dark: "#92400E",
      light: "#F59E0B",
      contrastText: "#0B1220",
    },
    error: {
      main: "#B91C1C",
      dark: "#991B1B",
      light: "#EF4444",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#FBF7F0", // warm paper
      paper: "#FFFFFF",
    },

    text: {
      primary: "#111827",
      secondary: "#4B5563",
      disabled: alpha("#111827", 0.45),
    },

    divider: alpha("#111827", 0.12),

    grey: {
      50: "#FFFEFC",
      100: "#FBF7F0",
      200: "#F1E8DD",
      300: "#E4D7C7",
      400: "#CBB9A4",
      500: "#9B8A78",
      600: "#6B5E52",
      700: "#4B3F37",
      800: "#2A2624",
      900: "#111827",
    },

    action: {
      hover: alpha("#111827", 0.06),
      selected: alpha("#111827", 0.12),
      focus: alpha("#1D4ED8", 0.18),
      active: alpha("#111827", 0.54),
      disabled: alpha("#111827", 0.32),
      disabledBackground: alpha("#111827", 0.08),
    },
  },

  typography: {
    fontFamily: FONT_EDITORIAL,

    // Editorial hierarchy (a little more "print" feel)
    h1: {
      fontWeight: 800,
      fontSize: "2.1rem",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 800,
      fontSize: "1.6rem",
      lineHeight: 1.25,
      letterSpacing: "-0.01em",
    },
    h3: { fontWeight: 800, fontSize: "1.3rem", lineHeight: 1.3 },
    h4: { fontWeight: 700, fontSize: "1.125rem", lineHeight: 1.4 },

    subtitle1: { fontWeight: 700, fontSize: "0.95rem" },
    subtitle2: { fontWeight: 700, fontSize: "0.875rem" },

    body1: { fontSize: "1rem", lineHeight: 1.85 },
    body2: { fontSize: "0.9rem", lineHeight: 1.75 },

    button: { textTransform: "none", fontWeight: 700 },
    caption: { fontSize: "0.78rem" },
    overline: { fontSize: "0.75rem", letterSpacing: "0.12em" },
  },

  shape: { borderRadius: 10 },
  spacing: 8,

  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      }),
    },

    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          backgroundImage: "none",
          border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`, // hairline
        }),
      },
    },

    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 14,
          border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        }),
      },
    },

    MuiAppBar: {
      defaultProps: { color: "inherit", elevation: 0 },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        }),
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 16,
          paddingBlock: 9,
        },
        outlined: {
          borderWidth: 1,
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          textDecorationThickness: "2px",
          textUnderlineOffset: "3px",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 10 },
        notchedOutline: ({ theme }) => ({
          borderColor: alpha(theme.palette.text.primary, 0.18),
        }),
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: { fontWeight: 700 },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: { minHeight: 44 },
        indicator: { height: 2, borderRadius: 2 },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: { minHeight: 44, fontWeight: 700, paddingInline: 14 },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.text.primary, 0.04),
        }),
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: ({ theme }) => ({
          fontWeight: 800,
          borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
        }),
        body: ({ theme }) => ({
          borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        }),
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({ borderColor: theme.palette.divider }),
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        }),
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: { borderRadius: 10, fontSize: "0.8rem" },
      },
    },

    MuiSnackbarContent: {
      styleOverrides: { root: { borderRadius: 12 } },
    },
  },
} satisfies ThemesProp[number];

export const editorialClassicDark = {
  name: "Editorial Classic Dark",
  direction: "rtl",

  palette: {
    mode: "dark",

    primary: {
      main: "#E5E7EB", // ink becomes light in dark mode
      dark: "#CBD5E1",
      light: "#F3F4F6",
      contrastText: "#0B1220",
    },

    secondary: {
      // Burgundy becomes a warm highlight
      main: "#FB7185",
      dark: "#EF4444",
      light: "#FDA4AF",
      contrastText: "#0B1220",
    },

    info: {
      main: "#60A5FA",
      dark: "#3B82F6",
      light: "#93C5FD",
      contrastText: "#0B1220",
    },
    success: {
      main: "#34D399",
      dark: "#10B981",
      light: "#A7F3D0",
      contrastText: "#0B1220",
    },
    warning: {
      main: "#FBBF24",
      dark: "#F59E0B",
      light: "#FDE68A",
      contrastText: "#0B1220",
    },
    error: {
      main: "#FB7185",
      dark: "#EF4444",
      light: "#FDA4AF",
      contrastText: "#0B1220",
    },

    background: {
      default: "#0E1116", // editorial charcoal
      paper: "#141A22",
    },

    text: {
      primary: "#F3F4F6",
      secondary: "#A8B0BC",
      disabled: alpha("#F3F4F6", 0.45),
    },

    divider: alpha("#F3F4F6", 0.14),

    grey: {
      50: "#0E1116",
      100: "#141A22",
      200: "#1B2431",
      300: "#243245",
      400: "#31435C",
      500: "#4A5A78",
      600: "#6B7A95",
      700: "#A8B0BC",
      800: "#E5E7EB",
      900: "#F3F4F6",
    },

    action: {
      hover: alpha("#F3F4F6", 0.08),
      selected: alpha("#F3F4F6", 0.12),
      focus: alpha("#60A5FA", 0.22),
      active: alpha("#F3F4F6", 0.54),
      disabled: alpha("#F3F4F6", 0.32),
      disabledBackground: alpha("#F3F4F6", 0.08),
    },
  },

  typography: {
    fontFamily: FONT_EDITORIAL,

    h1: {
      fontWeight: 800,
      fontSize: "2.1rem",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 800,
      fontSize: "1.6rem",
      lineHeight: 1.25,
      letterSpacing: "-0.01em",
    },
    h3: { fontWeight: 800, fontSize: "1.3rem", lineHeight: 1.3 },
    h4: { fontWeight: 700, fontSize: "1.125rem", lineHeight: 1.4 },

    subtitle1: { fontWeight: 700, fontSize: "0.95rem" },
    subtitle2: { fontWeight: 700, fontSize: "0.875rem" },

    body1: { fontSize: "1rem", lineHeight: 1.85 },
    body2: { fontSize: "0.9rem", lineHeight: 1.75 },

    button: { textTransform: "none", fontWeight: 700 },
    caption: { fontSize: "0.78rem" },
    overline: { fontSize: "0.75rem", letterSpacing: "0.12em" },
  },

  shape: { borderRadius: 10 },
  spacing: 8,

  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      }),
    },

    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          backgroundImage: "none",
          border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        }),
      },
    },

    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 14,
          border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        }),
      },
    },

    MuiAppBar: {
      defaultProps: { color: "inherit", elevation: 0 },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        }),
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10, paddingInline: 16, paddingBlock: 9 },
        outlined: { borderWidth: 1 },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          textDecorationThickness: "2px",
          textUnderlineOffset: "3px",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 10 },
        notchedOutline: ({ theme }) => ({
          borderColor: alpha(theme.palette.text.primary, 0.18),
        }),
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: { fontWeight: 700 },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: { minHeight: 44 },
        indicator: { height: 2, borderRadius: 2 },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: { minHeight: 44, fontWeight: 700, paddingInline: 14 },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.text.primary, 0.06),
        }),
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: ({ theme }) => ({
          fontWeight: 800,
          borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
        }),
        body: ({ theme }) => ({
          borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        }),
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({ borderColor: theme.palette.divider }),
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        }),
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: { borderRadius: 10, fontSize: "0.8rem" },
      },
    },

    MuiSnackbarContent: {
      styleOverrides: { root: { borderRadius: 12 } },
    },
  },
} satisfies ThemesProp[number];
