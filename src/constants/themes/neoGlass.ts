import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Neo Glass — liquid-glass direction.
 * - Light: iridescent liquid surfaces over luminous sky gradients.
 * - Dark: deep night glass with neon edges and stronger depth.
 */

const FONT_LIQUID =
  '"Space Grotesk","Tajawal","Cairo","Noto Sans Arabic","Inter","Roboto","Arial",sans-serif';

const LIQUID_RADIUS = 26;
const LIQUID_BLUR = "blur(18px) saturate(165%)";
const LIQUID_BLUR_STRONG = "blur(24px) saturate(180%)";

const LIQUID_TYPOGRAPHY = {
  fontFamily: FONT_LIQUID,

  h1: {
    fontWeight: 800,
    fontSize: "2.08rem",
    lineHeight: 1.2,
    letterSpacing: "-0.025em",
  },
  h2: {
    fontWeight: 800,
    fontSize: "1.56rem",
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
  },
  h3: { fontWeight: 700, fontSize: "1.28rem", lineHeight: 1.32 },
  h4: { fontWeight: 700, fontSize: "1.13rem", lineHeight: 1.4 },

  subtitle1: { fontWeight: 700, fontSize: "0.95rem" },
  subtitle2: { fontWeight: 700, fontSize: "0.875rem" },

  body1: { fontSize: "0.95rem", lineHeight: 1.64 },
  body2: { fontSize: "0.875rem", lineHeight: 1.58 },

  button: { textTransform: "none", fontWeight: 700, letterSpacing: "0.01em" },
  caption: { fontSize: "0.75rem" },
  overline: { fontSize: "0.75rem", letterSpacing: "0.08em" },
} as const;

const createLiquidGlassComponents = ({
  bodyPrimaryGlowAlpha,
  bodySecondaryGlowAlpha,
  bodyTertiaryGlowAlpha,
  paperAlpha,
  borderAlpha,
  shadowAlpha,
  isDark,
}: {
  bodyPrimaryGlowAlpha: number;
  bodySecondaryGlowAlpha: number;
  bodyTertiaryGlowAlpha: number;
  paperAlpha: number;
  borderAlpha: number;
  shadowAlpha: number;
  isDark: boolean;
}): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundImage: `radial-gradient(1200px 620px at 8% -10%, ${alpha(
          theme.palette.primary.main,
          bodyPrimaryGlowAlpha,
        )}, transparent 52%), radial-gradient(1000px 540px at 96% 4%, ${alpha(
          theme.palette.secondary.main,
          bodySecondaryGlowAlpha,
        )}, transparent 50%), radial-gradient(900px 460px at 50% 100%, ${alpha(
          theme.palette.info.main,
          bodyTertiaryGlowAlpha,
        )}, transparent 58%)`,
        backgroundAttachment: "fixed",
      },
      "body::before": {
        content: '""',
        position: "fixed",
        inset: "-24% auto auto -16%",
        width: "52vw",
        height: "52vw",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: -1,
        background: `radial-gradient(circle, ${alpha(
          theme.palette.primary.light,
          isDark ? 0.2 : 0.26,
        )} 0%, transparent 72%)`,
        filter: "blur(16px)",
      },
      "body::after": {
        content: '""',
        position: "fixed",
        inset: "auto -18% -28% auto",
        width: "56vw",
        height: "56vw",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: -1,
        background: `radial-gradient(circle, ${alpha(
          theme.palette.secondary.light,
          isDark ? 0.18 : 0.24,
        )} 0%, transparent 74%)`,
        filter: "blur(18px)",
      },
      "*::selection": {
        backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.4 : 0.28),
        color: theme.palette.background.default,
      },
    }),
  },

  MuiBackdrop: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.background.default,
          isDark ? 0.54 : 0.32,
        ),
        backdropFilter: "blur(6px)",
      }),
    },
  },

  MuiAppBar: {
    defaultProps: { color: "inherit" as const, elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        marginInline: theme.spacing(1),
        marginTop: theme.spacing(1),
        paddingInline: theme.spacing(1),
        backgroundColor: alpha(
          theme.palette.background.paper,
          paperAlpha + 0.12,
        ),
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
        boxShadow: `0 12px 36px ${alpha(theme.palette.primary.dark, shadowAlpha)}`,
        backdropFilter: LIQUID_BLUR,
        WebkitBackdropFilter: LIQUID_BLUR,
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: LIQUID_RADIUS + 6,
        backgroundImage: `linear-gradient(150deg, ${alpha(
          "#FFFFFF",
          isDark ? 0.1 : 0.62,
        )} 0%, ${alpha("#FFFFFF", isDark ? 0.04 : 0.18)} 42%, ${alpha(
          theme.palette.primary.light,
          isDark ? 0.12 : 0.18,
        )} 100%)`,
        backgroundColor: alpha(theme.palette.background.paper, paperAlpha),
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
        boxShadow: `0 18px 44px ${alpha(theme.palette.primary.dark, shadowAlpha)}`,
        backdropFilter: LIQUID_BLUR,
        WebkitBackdropFilter: LIQUID_BLUR,
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: LIQUID_RADIUS + 8,
        backgroundImage: `linear-gradient(165deg, ${alpha(
          "#FFFFFF",
          isDark ? 0.08 : 0.6,
        )}, ${alpha(theme.palette.secondary.light, isDark ? 0.08 : 0.18)} 120%)`,
        backgroundColor: alpha(theme.palette.background.paper, paperAlpha),
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
        boxShadow: `0 22px 48px ${alpha(theme.palette.primary.dark, shadowAlpha + 0.04)}`,
        backdropFilter: LIQUID_BLUR_STRONG,
        WebkitBackdropFilter: LIQUID_BLUR_STRONG,
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        borderRadius: 999,
        paddingInline: 20,
        paddingBlock: 10,
        fontWeight: 700,
      },
      containedPrimary: ({ theme }) => ({
        backgroundImage: `linear-gradient(130deg, ${alpha(
          theme.palette.primary.light,
          0.98,
        )}, ${alpha(theme.palette.primary.main, 0.94)} 45%, ${alpha(
          theme.palette.secondary.main,
          0.9,
        )} 100%)`,
        boxShadow: `0 10px 26px ${alpha(theme.palette.primary.main, 0.36)}`,
        "&:hover": {
          boxShadow: `0 14px 30px ${alpha(theme.palette.primary.main, 0.44)}`,
          transform: "translateY(-1px)",
        },
      }),
      outlined: ({ theme }) => ({
        borderWidth: 1,
        borderColor: alpha(theme.palette.text.primary, 0.22),
        backgroundColor: alpha(
          theme.palette.background.paper,
          paperAlpha - 0.04,
        ),
        backdropFilter: LIQUID_BLUR,
        WebkitBackdropFilter: LIQUID_BLUR,
      }),
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        fontWeight: 700,
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
        backgroundColor: alpha(
          theme.palette.background.paper,
          paperAlpha - 0.02,
        ),
        backdropFilter: LIQUID_BLUR,
        WebkitBackdropFilter: LIQUID_BLUR,
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 20,
        backgroundColor: alpha(
          theme.palette.background.paper,
          paperAlpha - 0.02,
        ),
        backdropFilter: LIQUID_BLUR,
        WebkitBackdropFilter: LIQUID_BLUR,
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.primary.main, 0.62),
          borderWidth: 1,
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, borderAlpha),
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
      root: ({ theme }) => ({
        minHeight: 46,
        padding: theme.spacing(0.5),
      }),
      indicator: ({ theme }) => ({
        height: "calc(100% - 8px)",
        top: 4,
        borderRadius: 999,
        backgroundImage: `linear-gradient(150deg, ${alpha(
          "#FFFFFF",
          isDark ? 0.14 : 0.8,
        )}, ${alpha(theme.palette.primary.light, isDark ? 0.18 : 0.42)})`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.36)}`,
        boxShadow: `0 8px 18px ${alpha(theme.palette.primary.main, 0.24)}`,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: {
        minHeight: 38,
        borderRadius: 999,
        fontWeight: 700,
        paddingInline: 14,
      },
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: `linear-gradient(90deg, ${alpha(
          theme.palette.primary.main,
          0.16,
        )}, ${alpha(theme.palette.secondary.main, 0.14)})`,
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }) => ({
        fontWeight: 800,
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
      }),
      body: ({ theme }) => ({
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, borderAlpha - 0.02)}`,
      }),
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, borderAlpha),
      }),
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: LIQUID_RADIUS,
        backgroundColor: alpha(
          theme.palette.background.paper,
          paperAlpha + 0.06,
        ),
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
        backdropFilter: LIQUID_BLUR,
        WebkitBackdropFilter: LIQUID_BLUR,
      }),
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        borderRadius: 14,
        fontSize: "0.8rem",
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
        backgroundColor: alpha(
          theme.palette.background.paper,
          paperAlpha + 0.12,
        ),
        color: theme.palette.text.primary,
        backdropFilter: LIQUID_BLUR,
        WebkitBackdropFilter: LIQUID_BLUR,
      }),
    },
  },

  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 22,
        backgroundColor: alpha(
          theme.palette.background.paper,
          paperAlpha + 0.1,
        ),
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
        boxShadow: `0 14px 34px ${alpha(theme.palette.primary.dark, shadowAlpha)}`,
        backdropFilter: LIQUID_BLUR,
        WebkitBackdropFilter: LIQUID_BLUR,
      }),
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: LIQUID_RADIUS + 10,
        backgroundColor: alpha(
          theme.palette.background.paper,
          paperAlpha + 0.08,
        ),
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.1)}`,
        boxShadow: `0 26px 56px ${alpha(theme.palette.primary.dark, shadowAlpha + 0.08)}`,
        backdropFilter: LIQUID_BLUR_STRONG,
        WebkitBackdropFilter: LIQUID_BLUR_STRONG,
      }),
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: 20,
        backgroundColor: alpha(
          theme.palette.background.paper,
          paperAlpha + 0.1,
        ),
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
        backdropFilter: LIQUID_BLUR,
        WebkitBackdropFilter: LIQUID_BLUR,
      }),
    },
  },

  MuiPopover: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: 20,
        backgroundColor: alpha(
          theme.palette.background.paper,
          paperAlpha + 0.08,
        ),
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
        backdropFilter: LIQUID_BLUR,
        WebkitBackdropFilter: LIQUID_BLUR,
      }),
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: "24px 0 0 24px",
        backgroundColor: alpha(
          theme.palette.background.paper,
          paperAlpha + 0.06,
        ),
        borderInlineStart: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
        backdropFilter: LIQUID_BLUR_STRONG,
        WebkitBackdropFilter: LIQUID_BLUR_STRONG,
      }),
    },
  },
});

export const neoGlass = {
  name: "Neo Glass",
  direction: "rtl",

  palette: {
    mode: "light",

    primary: {
      main: "#43B5FF",
      dark: "#1F96EF",
      light: "#8DD6FF",
      contrastText: "#04203A",
    },

    secondary: {
      main: "#A86CFF",
      dark: "#8D4CFA",
      light: "#C7A4FF",
      contrastText: "#1D1133",
    },

    info: {
      main: "#39D7FF",
      dark: "#0EB4E0",
      light: "#9DEBFF",
      contrastText: "#032533",
    },
    success: {
      main: "#49CFA0",
      dark: "#2FAE82",
      light: "#94E5C8",
      contrastText: "#053226",
    },
    warning: {
      main: "#F2B366",
      dark: "#D38F42",
      light: "#F8D2A3",
      contrastText: "#392008",
    },
    error: {
      main: "#FF6F96",
      dark: "#F34978",
      light: "#FFAAC1",
      contrastText: "#3A0B1A",
    },

    background: {
      default: "#EAF4FF",
      paper: "#F7FBFF",
    },

    text: {
      primary: "#0D1C33",
      secondary: "#3B4E6D",
      disabled: alpha("#0D1C33", 0.45),
    },

    divider: alpha("#0D1C33", 0.15),

    grey: {
      50: "#F8FBFF",
      100: "#EEF5FF",
      200: "#DEEBFF",
      300: "#C7DBFA",
      400: "#A3C0E8",
      500: "#7D98BE",
      600: "#5B7497",
      700: "#435877",
      800: "#2A3D58",
      900: "#0D1C33",
    },

    action: {
      hover: alpha("#43B5FF", 0.14),
      selected: alpha("#43B5FF", 0.22),
      focus: alpha("#A86CFF", 0.24),
      active: alpha("#0D1C33", 0.54),
      disabled: alpha("#0D1C33", 0.32),
      disabledBackground: alpha("#0D1C33", 0.08),
    },
  },

  typography: LIQUID_TYPOGRAPHY,

  shape: { borderRadius: LIQUID_RADIUS },
  spacing: 8,

  components: createLiquidGlassComponents({
    bodyPrimaryGlowAlpha: 0.32,
    bodySecondaryGlowAlpha: 0.24,
    bodyTertiaryGlowAlpha: 0.2,
    paperAlpha: 0.64,
    borderAlpha: 0.2,
    shadowAlpha: 0.18,
    isDark: false,
  }),
} satisfies NamedThemeOptions;

export const neoGlassDark = {
  name: "Neo Glass Dark",
  direction: "rtl",

  palette: {
    mode: "dark",

    primary: {
      main: "#7DCCFF",
      dark: "#4FB6FF",
      light: "#B9E6FF",
      contrastText: "#021524",
    },

    secondary: {
      main: "#C59BFF",
      dark: "#A86CFF",
      light: "#E0C7FF",
      contrastText: "#140C24",
    },

    info: {
      main: "#7EE6FF",
      dark: "#39D7FF",
      light: "#C0F5FF",
      contrastText: "#022130",
    },
    success: {
      main: "#89E8C4",
      dark: "#49CFA0",
      light: "#BDF2DC",
      contrastText: "#06261B",
    },
    warning: {
      main: "#F8D2A3",
      dark: "#F2B366",
      light: "#FDE8CA",
      contrastText: "#2F1A08",
    },
    error: {
      main: "#FFAAC1",
      dark: "#FF6F96",
      light: "#FFD0DD",
      contrastText: "#2F101A",
    },

    background: {
      default: "#040918",
      paper: "#0E1630",
    },

    text: {
      primary: "#E8F2FF",
      secondary: "#A5BCD9",
      disabled: alpha("#E8F2FF", 0.45),
    },

    divider: alpha("#E8F2FF", 0.16),

    grey: {
      50: "#040918",
      100: "#0B1126",
      200: "#131D3A",
      300: "#1E2B4E",
      400: "#2E4370",
      500: "#48639A",
      600: "#6E8BBA",
      700: "#A5BCD9",
      800: "#D3E2F3",
      900: "#E8F2FF",
    },

    action: {
      hover: alpha("#7DCCFF", 0.18),
      selected: alpha("#7DCCFF", 0.28),
      focus: alpha("#C59BFF", 0.28),
      active: alpha("#E8F2FF", 0.58),
      disabled: alpha("#E8F2FF", 0.34),
      disabledBackground: alpha("#E8F2FF", 0.08),
    },
  },

  typography: LIQUID_TYPOGRAPHY,

  shape: { borderRadius: LIQUID_RADIUS },
  spacing: 8,

  components: createLiquidGlassComponents({
    bodyPrimaryGlowAlpha: 0.28,
    bodySecondaryGlowAlpha: 0.22,
    bodyTertiaryGlowAlpha: 0.18,
    paperAlpha: 0.46,
    borderAlpha: 0.32,
    shadowAlpha: 0.42,
    isDark: true,
  }),
} satisfies NamedThemeOptions;
