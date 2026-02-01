import { alpha } from "@mui/material/styles";

import type { ThemesProp } from "@/context";
import type { Theme, ThemeOptions } from "@mui/material/styles";

const FONT_MONO =
  '"IBM Plex Mono","JetBrains Mono","Tajawal","Cairo","Noto Sans Arabic","Roboto Mono","Consolas","Arial",monospace';

const TERMINAL_TYPOGRAPHY = {
  fontFamily: FONT_MONO,

  h1: {
    fontWeight: 800,
    fontSize: "1.85rem",
    lineHeight: 1.2,
    letterSpacing: "0.03em",
  },
  h2: {
    fontWeight: 800,
    fontSize: "1.42rem",
    lineHeight: 1.24,
    letterSpacing: "0.025em",
  },
  h3: {
    fontWeight: 800,
    fontSize: "1.14rem",
    lineHeight: 1.3,
    letterSpacing: "0.02em",
  },
  h4: {
    fontWeight: 700,
    fontSize: "1.02rem",
    lineHeight: 1.35,
    letterSpacing: "0.015em",
  },

  subtitle1: { fontWeight: 700, fontSize: "0.92rem", letterSpacing: "0.02em" },
  subtitle2: { fontWeight: 700, fontSize: "0.84rem", letterSpacing: "0.02em" },

  body1: { fontSize: "0.92rem", lineHeight: 1.72 },
  body2: { fontSize: "0.84rem", lineHeight: 1.62 },

  button: {
    textTransform: "uppercase",
    fontWeight: 800,
    letterSpacing: "0.08em",
  },
  caption: { fontSize: "0.73rem", letterSpacing: "0.03em" },
  overline: {
    fontSize: "0.7rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },
} as const;

const createTerminalComponents = ({
  scanlineAlpha,
  surfaceBorderAlpha,
  panelGlowAlpha,
}: {
  scanlineAlpha: number;
  surfaceBorderAlpha: number;
  panelGlowAlpha: number;
}): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      "*, *::before, *::after": {
        boxSizing: "border-box",
      },
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        textShadow: `0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`,
        backgroundImage: `repeating-linear-gradient(0deg, ${alpha(
          theme.palette.text.primary,
          scanlineAlpha,
        )} 0px, ${alpha(
          theme.palette.text.primary,
          scanlineAlpha,
        )} 1px, transparent 1px, transparent 4px)`,
        backgroundSize: "100% 4px",
      },
      "*::selection": {
        backgroundColor: alpha(theme.palette.primary.main, 0.34),
        color: theme.palette.background.default,
      },
    }),
  },

  MuiAppBar: {
    defaultProps: { color: "inherit" as const, elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 0,
        backgroundColor: alpha(theme.palette.background.paper, 0.96),
        borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.62)}`,
        boxShadow: `inset 0 -1px 0 ${alpha(theme.palette.primary.light, 0.24)}`,
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 0,
        backgroundImage: "none",
        backgroundColor: alpha(theme.palette.background.paper, 0.98),
        border: `2px solid ${alpha(theme.palette.primary.main, surfaceBorderAlpha)}`,
        boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.light, panelGlowAlpha)}`,
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 0,
        backgroundImage: "none",
        border: `2px solid ${alpha(theme.palette.primary.main, surfaceBorderAlpha)}`,
        boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.light, panelGlowAlpha)}`,
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        borderRadius: 0,
        paddingInline: 16,
        paddingBlock: 9,
        minHeight: 38,
        fontWeight: 800,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      },
      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.light,
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
        border: `2px solid ${alpha(theme.palette.primary.main, 0.72)}`,
        boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.light, 0.34)}`,
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.24),
          borderColor: theme.palette.primary.main,
        },
      }),
      outlined: {
        borderStyle: "dashed",
        borderWidth: 2,
      },
      outlinedPrimary: ({ theme }) => ({
        borderColor: alpha(theme.palette.primary.main, 0.7),
      }),
      textPrimary: ({ theme }) => ({
        color: theme.palette.primary.main,
        textDecoration: "underline",
        textUnderlineOffset: "2px",
      }),
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 0,
        fontWeight: 700,
        textTransform: "uppercase",
        border: `2px dashed ${alpha(theme.palette.primary.main, 0.68)}`,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
      }),
      label: {
        paddingInline: 8,
      },
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 40,
        borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
      }),
      indicator: ({ theme }) => ({
        height: "100%",
        borderRadius: 0,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.6)}`,
        backgroundColor: alpha(theme.palette.primary.main, 0.14),
        zIndex: 0,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        position: "relative",
        zIndex: 1,
        minHeight: 40,
        fontWeight: 700,
        paddingInline: 14,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        "&.Mui-selected": {
          color: theme.palette.primary.main,
        },
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 0,
        fontFamily: FONT_MONO,
        backgroundColor: alpha(theme.palette.background.paper, 0.96),
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.primary.main, 0.9),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.main,
          borderWidth: 2,
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(theme.palette.primary.main, 0.6),
        borderWidth: 2,
      }),
      input: {
        paddingBlock: 10,
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      },
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.primary.main, 0.14),
        backgroundImage: `repeating-linear-gradient(90deg, ${alpha(
          theme.palette.primary.main,
          0.2,
        )} 0px, ${alpha(theme.palette.primary.main, 0.2)} 2px, transparent 2px, transparent 8px)`,
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }) => ({
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        borderBottom: `2px dashed ${alpha(theme.palette.primary.main, 0.66)}`,
      }),
      body: ({ theme }) => ({
        fontFamily: FONT_MONO,
        borderBottom: `1px dashed ${alpha(theme.palette.text.primary, 0.25)}`,
      }),
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: alpha(theme.palette.primary.main, 0.56),
        borderStyle: "dashed",
      }),
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 0,
        border: `2px solid ${alpha(theme.palette.primary.main, 0.68)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.98),
      }),
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        borderRadius: 0,
        fontSize: "0.75rem",
        fontFamily: FONT_MONO,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.72)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.98),
        color: theme.palette.text.primary,
      }),
      arrow: ({ theme }) => ({
        color: alpha(theme.palette.background.paper, 0.98),
      }),
    },
  },

  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 0,
        border: `2px solid ${alpha(theme.palette.primary.main, 0.6)}`,
        boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.light, 0.24)}`,
      }),
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: 0,
        backgroundImage: "none",
        border: `2px solid ${alpha(theme.palette.primary.main, surfaceBorderAlpha)}`,
        boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.light, panelGlowAlpha)}`,
      }),
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: {
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: 0,
        border: `2px solid ${alpha(theme.palette.primary.main, surfaceBorderAlpha)}`,
        boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.light, panelGlowAlpha)}`,
      }),
    },
  },

  MuiPopover: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: 0,
        border: `2px solid ${alpha(theme.palette.primary.main, surfaceBorderAlpha)}`,
      }),
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: 0,
        borderInlineStart: `2px solid ${alpha(theme.palette.primary.main, surfaceBorderAlpha)}`,
        backgroundImage: "none",
        backgroundColor: alpha(theme.palette.background.paper, 0.98),
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_MONO,
        fontSize: "0.8rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        "& + &": {
          borderTop: `1px dashed ${alpha(theme.palette.primary.main, 0.5)}`,
        },
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
      }),
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 0,
        "& + &": {
          borderTop: `1px dashed ${alpha(theme.palette.primary.main, 0.42)}`,
        },
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
      }),
    },
  },
});

export const retroTerminal = {
  name: "Retro Terminal",
  direction: "rtl",

  palette: {
    mode: "light",

    primary: {
      main: "#00B84F",
      dark: "#008F3B",
      light: "#5BFFA0",
      contrastText: "#02180B",
    },

    secondary: {
      main: "#FF8A3D",
      dark: "#D56A24",
      light: "#FFB981",
      contrastText: "#1A1104",
    },

    info: {
      main: "#22D3EE",
      dark: "#0891B2",
      light: "#67E8F9",
      contrastText: "#03161A",
    },
    success: {
      main: "#00B84F",
      dark: "#008F3B",
      light: "#5BFFA0",
      contrastText: "#02180B",
    },
    warning: {
      main: "#FACC15",
      dark: "#D4A711",
      light: "#FDE047",
      contrastText: "#1C1503",
    },
    error: {
      main: "#F43F5E",
      dark: "#E11D48",
      light: "#FDA4AF",
      contrastText: "#20050B",
    },

    background: {
      default: "#E9FDEE",
      paper: "#F7FFF9",
    },

    text: {
      primary: "#03210E",
      secondary: "#14542C",
      disabled: alpha("#03210E", 0.46),
    },

    divider: alpha("#03210E", 0.26),

    grey: {
      50: "#F7FFF9",
      100: "#ECFFF1",
      200: "#D4F8DE",
      300: "#B5EEC6",
      400: "#87DFA1",
      500: "#56C97B",
      600: "#27A95A",
      700: "#15773D",
      800: "#0B4A24",
      900: "#03210E",
    },

    action: {
      hover: alpha("#00B84F", 0.14),
      selected: alpha("#00B84F", 0.22),
      focus: alpha("#FF8A3D", 0.26),
      active: alpha("#03210E", 0.56),
      disabled: alpha("#03210E", 0.34),
      disabledBackground: alpha("#03210E", 0.1),
    },
  },

  typography: TERMINAL_TYPOGRAPHY,

  shape: { borderRadius: 0 },
  spacing: 8,

  components: createTerminalComponents({
    scanlineAlpha: 0.08,
    surfaceBorderAlpha: 0.44,
    panelGlowAlpha: 0.2,
  }),
} satisfies ThemesProp[number];

export const retroTerminalDark = {
  name: "Retro Terminal Dark",
  direction: "rtl",

  palette: {
    mode: "dark",

    primary: {
      main: "#33FF85",
      dark: "#1FCB63",
      light: "#8CFFB4",
      contrastText: "#02150A",
    },

    secondary: {
      main: "#FF9D57",
      dark: "#FF7A1E",
      light: "#FFC896",
      contrastText: "#1A0F04",
    },

    info: {
      main: "#22D3EE",
      dark: "#0EA5E9",
      light: "#67E8F9",
      contrastText: "#03161A",
    },
    success: {
      main: "#33FF85",
      dark: "#1FCB63",
      light: "#8CFFB4",
      contrastText: "#02150A",
    },
    warning: {
      main: "#FDE047",
      dark: "#FACC15",
      light: "#FEF08A",
      contrastText: "#211901",
    },
    error: {
      main: "#FB7185",
      dark: "#F43F5E",
      light: "#FDA4AF",
      contrastText: "#1E0408",
    },

    background: {
      default: "#040805",
      paper: "#09110B",
    },

    text: {
      primary: "#9CFFB6",
      secondary: "#5FDB85",
      disabled: alpha("#9CFFB6", 0.46),
    },

    divider: alpha("#9CFFB6", 0.24),

    grey: {
      50: "#040805",
      100: "#09110B",
      200: "#0D1C12",
      300: "#13301E",
      400: "#1A4A2F",
      500: "#257347",
      600: "#2CA65F",
      700: "#5FDB85",
      800: "#8CFFB4",
      900: "#C6FFD9",
    },

    action: {
      hover: alpha("#33FF85", 0.18),
      selected: alpha("#33FF85", 0.28),
      focus: alpha("#FF9D57", 0.3),
      active: alpha("#9CFFB6", 0.58),
      disabled: alpha("#9CFFB6", 0.34),
      disabledBackground: alpha("#9CFFB6", 0.1),
    },
  },

  typography: TERMINAL_TYPOGRAPHY,

  shape: { borderRadius: 0 },
  spacing: 8,

  components: createTerminalComponents({
    scanlineAlpha: 0.12,
    surfaceBorderAlpha: 0.62,
    panelGlowAlpha: 0.32,
  }),
} satisfies ThemesProp[number];
