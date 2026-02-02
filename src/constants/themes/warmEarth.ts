import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Warm Earth — soft organic palette (sand / terracotta / olive).
 * - Light: creamy surfaces, rounded "pill" controls, gentle shadows.
 * - Dark: warm clay night mode with the same soft geometry.
 */

const FONT_WARM =
  '"Tajawal","Cairo","Noto Naskh Arabic","Noto Sans Arabic","Inter","Roboto","Arial",sans-serif';

const TERRACOTTA = "#D08A6B";
const TERRACOTTA_DARK = "#B96F4F";
const TERRACOTTA_LIGHT = "#E8B8A1";

const OLIVE = "#8EA36A";
const OLIVE_DARK = "#738651";
const OLIVE_LIGHT = "#B9C89A";

const INK = "#3B2A1F";
const SOFT_RADIUS = 28;

const WARM_TYPOGRAPHY = {
  fontFamily: FONT_WARM,

  h1: {
    fontWeight: 800,
    fontSize: "2rem",
    lineHeight: 1.24,
    letterSpacing: "-0.01em",
  },
  h2: { fontWeight: 800, fontSize: "1.5rem", lineHeight: 1.3 },
  h3: { fontWeight: 700, fontSize: "1.24rem", lineHeight: 1.36 },
  h4: { fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.42 },

  subtitle1: { fontWeight: 600, fontSize: "0.95rem" },
  subtitle2: { fontWeight: 600, fontSize: "0.875rem" },

  body1: { fontSize: "0.95rem", lineHeight: 1.78 },
  body2: { fontSize: "0.875rem", lineHeight: 1.68 },

  button: { textTransform: "none", fontWeight: 700, letterSpacing: "0.01em" },
  caption: { fontSize: "0.75rem" },
  overline: { fontSize: "0.75rem", letterSpacing: "0.06em" },
} as const;

const createWarmEarthComponents = ({
  bodyGlowPrimary,
  bodyGlowSecondary,
  surfaceBorderAlpha,
  panelShadowAlpha,
  appBarAlpha,
}: {
  bodyGlowPrimary: number;
  bodyGlowSecondary: number;
  surfaceBorderAlpha: number;
  panelShadowAlpha: number;
  appBarAlpha: number;
}): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundImage: `radial-gradient(900px circle at 12% 6%, ${alpha(
          theme.palette.primary.main,
          bodyGlowPrimary,
        )}, transparent 50%), radial-gradient(800px circle at 90% 10%, ${alpha(
          theme.palette.secondary.main,
          bodyGlowSecondary,
        )}, transparent 48%)`,
      },
    }),
  },

  MuiAppBar: {
    defaultProps: { color: "inherit" as const, elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        marginInline: theme.spacing(1),
        marginTop: theme.spacing(1),
        paddingInline: theme.spacing(1),
        backgroundColor: alpha(theme.palette.background.paper, appBarAlpha),
        border: `1px solid ${alpha(theme.palette.text.primary, surfaceBorderAlpha)}`,
        boxShadow: `0 10px 30px ${alpha(theme.palette.text.primary, panelShadowAlpha)}`,
        backdropFilter: "blur(8px)",
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: SOFT_RADIUS + 2,
        backgroundImage: "none",
        backgroundColor: alpha(theme.palette.background.paper, 0.97),
        border: `1px solid ${alpha(theme.palette.text.primary, surfaceBorderAlpha)}`,
        boxShadow: `0 14px 36px ${alpha(theme.palette.text.primary, panelShadowAlpha)}`,
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: SOFT_RADIUS + 4,
        border: `1px solid ${alpha(theme.palette.text.primary, surfaceBorderAlpha)}`,
        boxShadow: `0 18px 40px ${alpha(theme.palette.text.primary, panelShadowAlpha)}`,
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        borderRadius: 999,
        paddingInline: 22,
        paddingBlock: 10,
        fontWeight: 700,
      },
      containedPrimary: ({ theme }) => ({
        backgroundImage: `linear-gradient(180deg, ${alpha(
          theme.palette.primary.light,
          0.88,
        )}, ${alpha(theme.palette.primary.main, 0.92)})`,
        boxShadow: `0 8px 18px ${alpha(theme.palette.primary.main, 0.28)}`,
        "&:hover": {
          boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.34)}`,
        },
      }),
      outlined: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, 0.18),
        backgroundColor: alpha(theme.palette.background.paper, 0.55),
      }),
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        fontWeight: 700,
        border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.86),
      }),
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        padding: theme.spacing(0.5),
      }),
      indicator: ({ theme }) => ({
        height: "calc(100% - 8px)",
        top: 4,
        borderRadius: 999,
        backgroundColor: alpha(theme.palette.background.paper, 0.96),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.26)}`,
        boxShadow: `0 6px 14px ${alpha(theme.palette.primary.main, 0.2)}`,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: {
        minHeight: 38,
        fontWeight: 700,
        borderRadius: 999,
        paddingInline: 14,
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 22,
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.primary.main, 0.52),
          borderWidth: 1,
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, 0.16),
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
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }) => ({
        fontWeight: 700,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
      }),
      body: ({ theme }) => ({
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.09)}`,
      }),
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, 0.12),
      }),
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 24,
        border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.92),
      }),
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        borderRadius: 14,
        fontSize: "0.8rem",
        border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.98),
        color: theme.palette.text.primary,
      }),
    },
  },

  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 24,
        border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
      }),
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: SOFT_RADIUS + 6,
        border: `1px solid ${alpha(theme.palette.text.primary, surfaceBorderAlpha)}`,
        boxShadow: `0 20px 44px ${alpha(theme.palette.text.primary, panelShadowAlpha)}`,
      }),
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: 22,
        border: `1px solid ${alpha(theme.palette.text.primary, surfaceBorderAlpha)}`,
      }),
    },
  },

  MuiPopover: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: 22,
        border: `1px solid ${alpha(theme.palette.text.primary, surfaceBorderAlpha)}`,
      }),
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: "24px 0 0 24px",
        borderInlineStart: `1px solid ${alpha(theme.palette.text.primary, surfaceBorderAlpha)}`,
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginInline: theme.spacing(0.5),
        borderRadius: 12,
      }),
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginInline: theme.spacing(0.5),
        borderRadius: 12,
      }),
    },
  },
});

export const warmEarth = {
  name: "Warm Earth",
  direction: "rtl",

  palette: {
    mode: "light",

    primary: {
      main: TERRACOTTA,
      dark: TERRACOTTA_DARK,
      light: TERRACOTTA_LIGHT,
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: OLIVE,
      dark: OLIVE_DARK,
      light: OLIVE_LIGHT,
      contrastText: "#1B2312",
    },

    info: {
      main: "#3B82F6",
      dark: "#2563EB",
      light: "#93C5FD",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#22A36A",
      dark: "#198D59",
      light: "#79D7AE",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#D68A30",
      dark: "#B9711F",
      light: "#EDB370",
      contrastText: "#2B1E10",
    },
    error: {
      main: "#D86060",
      dark: "#B94A4A",
      light: "#EEA0A0",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#FBF4EC",
      paper: "#FFFDF9",
    },

    text: {
      primary: INK,
      secondary: "#6B5341",
      disabled: alpha(INK, 0.44),
    },

    divider: alpha(INK, 0.12),

    grey: {
      50: "#FFFEFC",
      100: "#FFF9F1",
      200: "#F4E7D8",
      300: "#EAD6C1",
      400: "#D8BFA3",
      500: "#C0A180",
      600: "#8F735C",
      700: "#634E3F",
      800: "#3E3127",
      900: "#1F1712",
    },

    action: {
      hover: alpha(TERRACOTTA, 0.06),
      selected: alpha(TERRACOTTA, 0.12),
      focus: alpha("#3B82F6", 0.2),
      active: alpha(INK, 0.5),
      disabled: alpha(INK, 0.3),
      disabledBackground: alpha(INK, 0.08),
    },
  },

  typography: WARM_TYPOGRAPHY,

  shape: { borderRadius: SOFT_RADIUS },
  spacing: 8,

  components: createWarmEarthComponents({
    bodyGlowPrimary: 0.2,
    bodyGlowSecondary: 0.16,
    surfaceBorderAlpha: 0.1,
    panelShadowAlpha: 0.14,
    appBarAlpha: 0.88,
  }),
} satisfies NamedThemeOptions;

export const warmEarthDark = {
  name: "Warm Earth Dark",
  direction: "rtl",

  palette: {
    mode: "dark",

    primary: {
      main: "#E4B392",
      dark: "#CB9675",
      light: "#F0CBB4",
      contrastText: "#1D120B",
    },

    secondary: {
      main: "#B7CB97",
      dark: "#A1B67F",
      light: "#D4E2C0",
      contrastText: "#1B2312",
    },

    info: {
      main: "#93C5FD",
      dark: "#60A5FA",
      light: "#BFDBFE",
      contrastText: "#102033",
    },
    success: {
      main: "#79D7AE",
      dark: "#4BC48F",
      light: "#B1E9CD",
      contrastText: "#0D2A1D",
    },
    warning: {
      main: "#EDB370",
      dark: "#D68A30",
      light: "#F6CC99",
      contrastText: "#31200D",
    },
    error: {
      main: "#EEA0A0",
      dark: "#D86060",
      light: "#F5C4C4",
      contrastText: "#301414",
    },

    background: {
      default: "#18120E",
      paper: "#241C17",
    },

    text: {
      primary: "#F7EEE3",
      secondary: "#D1C1B2",
      disabled: alpha("#F7EEE3", 0.45),
    },

    divider: alpha("#F7EEE3", 0.14),

    grey: {
      50: "#18120E",
      100: "#241C17",
      200: "#302720",
      300: "#3E342A",
      400: "#56483A",
      500: "#776655",
      600: "#A18A73",
      700: "#D1C1B2",
      800: "#E9DFD3",
      900: "#F7EEE3",
    },

    action: {
      hover: alpha("#E4B392", 0.1),
      selected: alpha("#E4B392", 0.16),
      focus: alpha("#93C5FD", 0.24),
      active: alpha("#F7EEE3", 0.52),
      disabled: alpha("#F7EEE3", 0.32),
      disabledBackground: alpha("#F7EEE3", 0.08),
    },
  },

  typography: WARM_TYPOGRAPHY,

  shape: { borderRadius: SOFT_RADIUS },
  spacing: 8,

  components: createWarmEarthComponents({
    bodyGlowPrimary: 0.22,
    bodyGlowSecondary: 0.14,
    surfaceBorderAlpha: 0.18,
    panelShadowAlpha: 0.32,
    appBarAlpha: 0.78,
  }),
} satisfies NamedThemeOptions;
