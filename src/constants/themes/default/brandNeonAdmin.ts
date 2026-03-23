import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Brand Neon Admin - calmer admin/product preset derived from Brand Neon Motion.
 * - Keeps the cyan brand accent, but moves it into restrained controls and focus states.
 * - Reduces glow, blur, and decorative intensity so the preset stays usable every day.
 */

const BRAND_NEON = "#00D2FF";
const BRAND_NEON_DARK = "#00A9CC";
const BRAND_NEON_SOFT = "#66E7FF";
const BRAND_NAVY = "#0C141C";
const BRAND_NAVY_SOFT = "#142231";
const BRAND_SLATE = "#24384B";
const BRAND_SLATE_LIGHT = "#597088";
const BRAND_PERIWINKLE = "#90A1E8";
const BRAND_PERIWINKLE_SOFT = "#C2C9F4";
const BRAND_MINT = "#62ED97";
const BRAND_MINT_SOFT = "#8AF4B6";
const BRAND_CORAL = "#F3503A";
const BRAND_CORAL_SOFT = "#FF8B7A";

const FONT_BRAND_DISPLAY =
  'var(--font-brand-display),"IBM Plex Sans","Inter","Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif';
const FONT_BRAND_TEXT =
  'var(--font-brand-text),"Golos Text","IBM Plex Sans","Inter","Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif';
const FONT_BRAND_MONO =
  'var(--font-brand-mono),"IBM Plex Mono","JetBrains Mono","Roboto Mono","Menlo","Consolas",monospace';

const BRAND_ADMIN_RADIUS = 12;
const SURFACE_BLUR = "blur(10px)";

const createAdminBodyBackground = (theme: Theme) => {
  const isDark = theme.palette.mode === "dark";
  const gridLine = alpha(theme.palette.text.primary, isDark ? 0.04 : 0.022);
  const topWash = alpha(
    isDark ? theme.palette.common.black : theme.palette.common.white,
    isDark ? 0.22 : 0.62,
  );

  return {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    backgroundImage: [
      `radial-gradient(960px 520px at 10% -12%, ${alpha(
        theme.palette.primary.main,
        isDark ? 0.18 : 0.12,
      )}, transparent 58%)`,
      `radial-gradient(880px 420px at 102% 4%, ${alpha(
        theme.palette.info.main,
        isDark ? 0.14 : 0.08,
      )}, transparent 56%)`,
      `linear-gradient(180deg, ${topWash} 0%, transparent 34%)`,
      `repeating-linear-gradient(90deg, ${gridLine} 0px, ${gridLine} 1px, transparent 1px, transparent 56px)`,
      `linear-gradient(135deg, ${alpha(
        theme.palette.primary.main,
        isDark ? 0.05 : 0.03,
      )} 0%, transparent 28%, transparent 72%, ${alpha(
        theme.palette.info.main,
        isDark ? 0.04 : 0.02,
      )} 100%)`,
    ].join(", "),
    backgroundAttachment: "fixed",
    backgroundSize: "auto, auto, auto, auto, auto",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };
};

const BRAND_ADMIN_TYPOGRAPHY = {
  fontFamily: FONT_BRAND_TEXT,

  h1: {
    fontFamily: FONT_BRAND_DISPLAY,
    fontWeight: 700,
    fontSize: "2.08rem",
    lineHeight: 1.18,
    letterSpacing: "-0.018em",
  },
  h2: {
    fontFamily: FONT_BRAND_DISPLAY,
    fontWeight: 700,
    fontSize: "1.62rem",
    lineHeight: 1.26,
    letterSpacing: "-0.012em",
  },
  h3: {
    fontFamily: FONT_BRAND_DISPLAY,
    fontWeight: 650,
    fontSize: "1.3rem",
    lineHeight: 1.34,
    letterSpacing: "-0.008em",
  },
  h4: {
    fontFamily: FONT_BRAND_DISPLAY,
    fontWeight: 650,
    fontSize: "1.08rem",
    lineHeight: 1.42,
  },

  subtitle1: {
    fontFamily: FONT_BRAND_TEXT,
    fontWeight: 600,
    fontSize: "0.96rem",
    lineHeight: 1.58,
    letterSpacing: "0.002em",
  },
  subtitle2: {
    fontFamily: FONT_BRAND_DISPLAY,
    fontWeight: 600,
    fontSize: "0.88rem",
    lineHeight: 1.52,
    letterSpacing: "0.012em",
  },

  body1: {
    fontFamily: FONT_BRAND_TEXT,
    fontSize: "0.95rem",
    lineHeight: 1.72,
    letterSpacing: "0.002em",
  },
  body2: {
    fontFamily: FONT_BRAND_TEXT,
    fontSize: "0.88rem",
    lineHeight: 1.64,
    letterSpacing: "0.002em",
  },

  button: {
    fontFamily: FONT_BRAND_DISPLAY,
    textTransform: "none",
    fontWeight: 650,
    letterSpacing: "0.012em",
  },
  caption: {
    fontFamily: FONT_BRAND_MONO,
    fontSize: "0.76rem",
    lineHeight: 1.5,
    letterSpacing: "0.02em",
  },
  overline: {
    fontFamily: FONT_BRAND_DISPLAY,
    fontSize: "0.72rem",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    textTransform: "none",
  },
} as const;

const createSurfaceStyle = (
  theme: Theme,
  {
    radius,
    borderAlpha,
    shadowAlpha,
    paperAlpha,
    accentAlpha,
    blur = false,
  }: {
    radius: number | string;
    borderAlpha: number;
    shadowAlpha: number;
    paperAlpha: number;
    accentAlpha: number;
    blur?: boolean;
  },
) => {
  const isDark = theme.palette.mode === "dark";

  return {
    borderRadius: radius,
    backgroundImage: `linear-gradient(180deg, ${alpha(
      "#FFFFFF",
      isDark ? 0.06 : 0.72,
    )} 0%, ${alpha(theme.palette.background.paper, paperAlpha)} 100%)`,
    backgroundColor: alpha(theme.palette.background.paper, paperAlpha),
    border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha)}`,
    boxShadow: [
      `0 14px 32px ${alpha(theme.palette.text.primary, shadowAlpha)}`,
      `inset 0 1px 0 ${alpha(theme.palette.primary.main, accentAlpha)}`,
    ].join(", "),
    ...(blur
      ? {
          backdropFilter: SURFACE_BLUR,
          WebkitBackdropFilter: SURFACE_BLUR,
        }
      : {}),
  };
};

const createBrandAdminComponents = ({
  appBarAlpha,
  paperAlpha,
  borderAlpha,
  shadowAlpha,
  tableHeadAlpha,
  chipAlpha,
  overlayAlpha,
  isDark,
}: {
  appBarAlpha: number;
  paperAlpha: number;
  borderAlpha: number;
  shadowAlpha: number;
  tableHeadAlpha: number;
  chipAlpha: number;
  overlayAlpha: number;
  isDark: boolean;
}): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      body: createAdminBodyBackground(theme),
      "code, kbd, samp, pre, .brand-admin-mono, .brand-admin-metric": {
        fontFamily: FONT_BRAND_MONO,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "0.01em",
      },
      ".brand-admin-metric": {
        fontWeight: 700,
      },
      "*::selection": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          isDark ? 0.32 : 0.22,
        ),
        color: theme.palette.background.default,
      },
    }),
  },

  MuiBackdrop: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.background.default,
          isDark ? 0.54 : 0.24,
        ),
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }),
    },
  },

  MuiAppBar: {
    defaultProps: { color: "inherit" as const, elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurfaceStyle(theme, {
          radius: 18,
          borderAlpha: borderAlpha + 0.04,
          shadowAlpha,
          paperAlpha: appBarAlpha,
          accentAlpha: isDark ? 0.1 : 0.08,
          blur: true,
        }),
        marginInline: theme.spacing(1),
        marginTop: theme.spacing(1),
        paddingInline: theme.spacing(1),
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurfaceStyle(theme, {
          radius: BRAND_ADMIN_RADIUS + 4,
          borderAlpha,
          shadowAlpha,
          paperAlpha,
          accentAlpha: isDark ? 0.08 : 0.06,
        }),
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurfaceStyle(theme, {
          radius: BRAND_ADMIN_RADIUS + 6,
          borderAlpha,
          shadowAlpha: shadowAlpha + 0.02,
          paperAlpha,
          accentAlpha: isDark ? 0.1 : 0.08,
        }),
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        borderRadius: BRAND_ADMIN_RADIUS,
        minHeight: 38,
        paddingInline: 18,
        paddingBlock: 10,
        fontFamily: FONT_BRAND_DISPLAY,
        fontWeight: 650,
      },
      containedPrimary: ({ theme }) => ({
        backgroundImage: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.light,
          0.98,
        )}, ${alpha(theme.palette.primary.main, 0.92)} 60%, ${alpha(
          theme.palette.info.main,
          0.86,
        )} 100%)`,
        color: theme.palette.primary.contrastText,
        boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, isDark ? 0.24 : 0.16)}`,
        "&:hover": {
          boxShadow: `0 14px 30px ${alpha(theme.palette.primary.main, isDark ? 0.3 : 0.2)}`,
          transform: "translateY(-1px)",
        },
      }),
      outlined: ({ theme }) => ({
        borderWidth: 1,
        borderColor: alpha(theme.palette.text.primary, borderAlpha + 0.08),
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.24 : 0.72,
        ),
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.12 : 0.06,
          ),
        },
      }),
      text: ({ theme }) => ({
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.1 : 0.06,
          ),
        },
      }),
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        fontFamily: FONT_BRAND_TEXT,
        fontWeight: 700,
        border: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
        backgroundColor: alpha(theme.palette.primary.main, chipAlpha),
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
        minHeight: 44,
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
      }),
      indicator: ({ theme }) => ({
        height: 3,
        borderRadius: 999,
        backgroundColor: theme.palette.primary.main,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: {
        minHeight: 44,
        paddingInline: 14,
        fontFamily: FONT_BRAND_DISPLAY,
        fontWeight: 650,
        textTransform: "none",
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: BRAND_ADMIN_RADIUS,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.42 : 0.86,
        ),
        transition: theme.transitions.create([
          "box-shadow",
          "background-color",
        ]),
        "&.Mui-focused": {
          boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, isDark ? 0.18 : 0.12)}`,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.primary.main, 0.68),
          borderWidth: 1,
        },
      }),
      input: {
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
        fontFamily: FONT_BRAND_TEXT,
        fontWeight: 600,
      },
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.primary.main, tableHeadAlpha),
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }) => ({
        fontFamily: FONT_BRAND_DISPLAY,
        fontWeight: 700,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.08)}`,
        fontVariantNumeric: "tabular-nums",
      }),
      body: ({ theme }) => ({
        fontFamily: FONT_BRAND_TEXT,
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
        ...createSurfaceStyle(theme, {
          radius: BRAND_ADMIN_RADIUS + 2,
          borderAlpha: borderAlpha + 0.08,
          shadowAlpha: shadowAlpha + 0.01,
          paperAlpha: overlayAlpha,
          accentAlpha: isDark ? 0.1 : 0.08,
        }),
      }),
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...createSurfaceStyle(theme, {
          radius: BRAND_ADMIN_RADIUS,
          borderAlpha: borderAlpha + 0.08,
          shadowAlpha: shadowAlpha + 0.02,
          paperAlpha: isDark ? 0.96 : 0.98,
          accentAlpha: isDark ? 0.08 : 0.06,
          blur: true,
        }),
        fontFamily: FONT_BRAND_TEXT,
        fontSize: "0.78rem",
        color: theme.palette.text.primary,
      }),
    },
  },

  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurfaceStyle(theme, {
          radius: BRAND_ADMIN_RADIUS + 2,
          borderAlpha: borderAlpha + 0.08,
          shadowAlpha: shadowAlpha + 0.02,
          paperAlpha: overlayAlpha,
          accentAlpha: isDark ? 0.08 : 0.06,
        }),
      }),
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...createSurfaceStyle(theme, {
          radius: BRAND_ADMIN_RADIUS + 8,
          borderAlpha: borderAlpha + 0.08,
          shadowAlpha: shadowAlpha + 0.08,
          paperAlpha: overlayAlpha,
          accentAlpha: isDark ? 0.1 : 0.08,
          blur: true,
        }),
      }),
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_BRAND_DISPLAY,
        fontWeight: 700,
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, borderAlpha + 0.06)}`,
      }),
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...createSurfaceStyle(theme, {
          radius: BRAND_ADMIN_RADIUS + 4,
          borderAlpha: borderAlpha + 0.08,
          shadowAlpha: shadowAlpha + 0.08,
          paperAlpha: overlayAlpha,
          accentAlpha: isDark ? 0.1 : 0.08,
          blur: true,
        }),
      }),
    },
  },

  MuiPopover: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...createSurfaceStyle(theme, {
          radius: BRAND_ADMIN_RADIUS + 4,
          borderAlpha: borderAlpha + 0.08,
          shadowAlpha: shadowAlpha + 0.08,
          paperAlpha: overlayAlpha,
          accentAlpha: isDark ? 0.1 : 0.08,
          blur: true,
        }),
      }),
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...createSurfaceStyle(theme, {
          radius: 0,
          borderAlpha: borderAlpha + 0.08,
          shadowAlpha: shadowAlpha + 0.08,
          paperAlpha: overlayAlpha,
          accentAlpha: isDark ? 0.1 : 0.08,
          blur: true,
        }),
        borderRadius: 0,
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginInline: theme.spacing(0.5),
        borderRadius: BRAND_ADMIN_RADIUS - 2,
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.12 : 0.06,
          ),
        },
        "&.Mui-selected": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.18 : 0.1,
          ),
        },
      }),
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginInline: theme.spacing(0.5),
        borderRadius: BRAND_ADMIN_RADIUS - 2,
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.12 : 0.06,
          ),
        },
        "&.Mui-selected": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.18 : 0.1,
          ),
        },
      }),
    },
  },
});

export const brandNeonAdmin = {
  name: "Brand Neon Admin",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: BRAND_NEON_DARK,
      dark: "#008AA7",
      light: BRAND_NEON_SOFT,
      contrastText: "#05222B",
    },

    secondary: {
      main: BRAND_SLATE,
      dark: BRAND_NAVY,
      light: BRAND_SLATE_LIGHT,
      contrastText: "#FFFFFF",
    },

    info: {
      main: BRAND_PERIWINKLE,
      dark: "#7283D1",
      light: BRAND_PERIWINKLE_SOFT,
      contrastText: "#10182B",
    },
    success: {
      main: "#35C989",
      dark: "#259A67",
      light: BRAND_MINT_SOFT,
      contrastText: "#072118",
    },
    warning: {
      main: "#D58B52",
      dark: "#B36D38",
      light: "#EDB384",
      contrastText: "#2C1808",
    },
    error: {
      main: "#D55E58",
      dark: "#B64641",
      light: "#F0A29C",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#EAF0F6",
      paper: "#FCFEFF",
    },

    text: {
      primary: BRAND_NAVY,
      secondary: alpha(BRAND_NAVY, 0.72),
      disabled: alpha(BRAND_NAVY, 0.44),
    },

    divider: alpha(BRAND_NAVY, 0.14),

    grey: {
      50: "#F7FBFF",
      100: "#EEF5FB",
      200: "#DCE8F3",
      300: "#C5D4E2",
      400: "#9BB0C4",
      500: "#7089A2",
      600: "#506479",
      700: "#364657",
      800: "#233140",
      900: BRAND_NAVY,
    },

    action: {
      hover: alpha(BRAND_NEON_DARK, 0.04),
      selected: alpha(BRAND_NEON_DARK, 0.1),
      focus: alpha(BRAND_NEON_DARK, 0.18),
      active: alpha(BRAND_NAVY, 0.54),
      disabled: alpha(BRAND_NAVY, 0.32),
      disabledBackground: alpha(BRAND_NAVY, 0.06),
    },
  },

  typography: BRAND_ADMIN_TYPOGRAPHY,

  shape: { borderRadius: BRAND_ADMIN_RADIUS },
  spacing: 8,

  components: createBrandAdminComponents({
    appBarAlpha: 0.88,
    paperAlpha: 0.98,
    borderAlpha: 0.12,
    shadowAlpha: 0.1,
    tableHeadAlpha: 0.08,
    chipAlpha: 0.1,
    overlayAlpha: 0.97,
    isDark: false,
  }),
} satisfies NamedThemeOptions;

export const brandNeonAdminDark = {
  name: "Brand Neon Admin Dark",
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: BRAND_NEON_SOFT,
      dark: BRAND_NEON,
      light: "#B0F2FF",
      contrastText: "#04161B",
    },

    secondary: {
      main: "#C0D0E2",
      dark: "#92A7BF",
      light: "#E5EDF6",
      contrastText: "#0B141C",
    },

    info: {
      main: "#A6B4F4",
      dark: BRAND_PERIWINKLE,
      light: "#D5DCFA",
      contrastText: "#0F1726",
    },
    success: {
      main: BRAND_MINT,
      dark: "#43BF7E",
      light: "#B6F8D0",
      contrastText: "#081D15",
    },
    warning: {
      main: "#F0B06F",
      dark: "#D58B52",
      light: "#F6CE9F",
      contrastText: "#2C1808",
    },
    error: {
      main: BRAND_CORAL_SOFT,
      dark: BRAND_CORAL,
      light: "#FFC0B8",
      contrastText: "#2B1110",
    },

    background: {
      default: "#07101A",
      paper: BRAND_NAVY_SOFT,
    },

    text: {
      primary: "#E7F0FA",
      secondary: "#A9B9CC",
      disabled: alpha("#E7F0FA", 0.44),
    },

    divider: alpha("#E7F0FA", 0.14),

    grey: {
      50: "#09111A",
      100: "#0F1823",
      200: "#172434",
      300: "#223245",
      400: "#31485E",
      500: "#446078",
      600: "#6484A1",
      700: "#90A9C3",
      800: "#C2D1E0",
      900: "#E7F0FA",
    },

    action: {
      hover: alpha(BRAND_NEON_SOFT, 0.1),
      selected: alpha(BRAND_NEON_SOFT, 0.16),
      focus: alpha(BRAND_NEON_SOFT, 0.22),
      active: alpha("#E7F0FA", 0.56),
      disabled: alpha("#E7F0FA", 0.32),
      disabledBackground: alpha("#E7F0FA", 0.08),
    },
  },

  typography: BRAND_ADMIN_TYPOGRAPHY,

  shape: { borderRadius: BRAND_ADMIN_RADIUS },
  spacing: 8,

  components: createBrandAdminComponents({
    appBarAlpha: 0.76,
    paperAlpha: 0.86,
    borderAlpha: 0.18,
    shadowAlpha: 0.24,
    tableHeadAlpha: 0.14,
    chipAlpha: 0.16,
    overlayAlpha: 0.9,
    isDark: true,
  }),
} satisfies NamedThemeOptions;
