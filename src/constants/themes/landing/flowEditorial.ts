import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

const FONT_STACK = '"Inter","Segoe UI","Helvetica Neue",Arial,sans-serif';

const TOKENS = {
  light: {
    page: "#F8F8F8",
    paper: "#FFFFFF",
    quiet: "#F3F4F6",
    primaryText: "#0F172A",
    secondaryText: "#6B7280",
    accent: "#FF0073",
  },
  dark: {
    page: "#0B0F17",
    paper: "#141A23",
    quiet: "#1B2330",
    primaryText: "#F5F7FA",
    secondaryText: "#C7D0DD",
    accent: "#FF4D9D",
  },
} as const;

type FlowEditorialMode = keyof typeof TOKENS;

const createSurface = (
  theme: Theme,
  options?: {
    radius?: number;
    quiet?: boolean;
    accent?: boolean;
  },
) => {
  const radius = options?.radius ?? 20;
  const accentStrength = theme.palette.mode === "dark" ? 0.26 : 0.18;
  const surfaceTone = options?.quiet
    ? theme.palette.action.hover
    : theme.palette.background.paper;

  return {
    borderRadius: radius,
    backgroundImage: "none",
    backgroundColor: surfaceTone,
    border: `1px solid ${alpha(
      options?.accent ? theme.palette.primary.main : theme.palette.text.primary,
      options?.accent
        ? accentStrength
        : theme.palette.mode === "dark"
          ? 0.12
          : 0.1,
    )}`,
    boxShadow:
      theme.palette.mode === "dark"
        ? `0 18px 48px ${alpha("#020617", 0.48)}`
        : `0 18px 44px ${alpha("#0F172A", 0.08)}`,
  };
};

const createTypography = (): ThemeOptions["typography"] => ({
  fontFamily: FONT_STACK,
  h1: {
    fontFamily: FONT_STACK,
    fontWeight: 700,
    fontSize: "clamp(2.45rem, 4.6vw, 4.2rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.045em",
  },
  h2: {
    fontFamily: FONT_STACK,
    fontWeight: 700,
    fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
    lineHeight: 1.06,
    letterSpacing: "-0.04em",
  },
  h3: {
    fontFamily: FONT_STACK,
    fontWeight: 700,
    fontSize: "clamp(1.45rem, 2.4vw, 2rem)",
    lineHeight: 1.12,
    letterSpacing: "-0.03em",
  },
  h4: {
    fontFamily: FONT_STACK,
    fontWeight: 650,
    fontSize: "1.2rem",
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
  },
  subtitle1: {
    fontFamily: FONT_STACK,
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  subtitle2: {
    fontFamily: FONT_STACK,
    fontWeight: 600,
    fontSize: "0.92rem",
    lineHeight: 1.55,
  },
  body1: {
    fontFamily: FONT_STACK,
    fontSize: "1rem",
    lineHeight: 1.75,
  },
  body2: {
    fontFamily: FONT_STACK,
    fontSize: "0.94rem",
    lineHeight: 1.7,
  },
  button: {
    fontFamily: FONT_STACK,
    textTransform: "none",
    fontWeight: 600,
    letterSpacing: "-0.01em",
  },
  caption: {
    fontFamily: FONT_STACK,
    fontSize: "0.8rem",
    lineHeight: 1.45,
  },
  overline: {
    fontFamily: FONT_STACK,
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
});

const createComponents = (): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      "*, *::before, *::after": {
        boxSizing: "border-box",
      },
      html: {
        backgroundColor: theme.palette.background.default,
      },
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundImage: [
          `radial-gradient(720px 420px at 12% 0%, ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.12 : 0.08)} 0%, transparent 72%)`,
          `radial-gradient(560px 320px at 88% 0%, ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.08 : 0.05)} 0%, transparent 74%)`,
        ].join(", "),
        backgroundAttachment: "fixed",
      },
      a: {
        color: theme.palette.primary.main,
        textDecorationColor: alpha(theme.palette.primary.main, 0.38),
        textUnderlineOffset: "3px",
      },
      "*::selection": {
        backgroundColor: alpha(theme.palette.primary.main, 0.18),
        color: theme.palette.text.primary,
      },
    }),
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurface(theme),
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurface(theme, { radius: 24 }),
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...createSurface(theme, { radius: 28 }),
        overflow: "hidden",
      }),
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurface(theme, { radius: 24 }),
        "&::before": {
          display: "none",
        },
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        minHeight: 68,
      },
      content: {
        margin: "18px 0",
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: theme.palette.divider,
      }),
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        paddingInline: 18,
        paddingBlock: 10,
        minHeight: 44,
        boxShadow: "none",
        ...(theme.palette.mode === "dark"
          ? {
              color: theme.palette.text.primary,
            }
          : null),
      }),
      containedPrimary: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#FF61A8" : "#E00065",
          boxShadow: "none",
        },
      }),
      outlined: ({ theme }) => ({
        borderColor: alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.16 : 0.12,
        ),
        "&:hover": {
          borderColor: alpha(theme.palette.primary.main, 0.38),
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.1 : 0.04,
          ),
        },
      }),
      text: ({ theme }) => ({
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.12 : 0.06,
          ),
        },
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: () => ({
        borderRadius: 999,
      }),
      outlined: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.mode === "dark" ? 0.12 : 0.06,
        ),
        borderColor: alpha(
          theme.palette.primary.main,
          theme.palette.mode === "dark" ? 0.24 : 0.16,
        ),
      }),
      label: {
        fontWeight: 600,
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.14 : 0.1)}`,
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.92 : 0.94,
        ),
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.14 : 0.06,
          ),
          borderColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.28 : 0.18,
          ),
        },
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 16,
        borderColor: alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.16 : 0.1,
        ),
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        "&.Mui-selected": {
          color: theme.palette.text.primary,
          borderColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.3 : 0.2,
          ),
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.16 : 0.08,
          ),
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 18,
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.94 : 0.9,
        ),
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.primary.main, 0.28),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.primary.main, 0.45),
          borderWidth: 1,
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.16 : 0.1,
        ),
      }),
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontWeight: 600,
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...createSurface(theme, { radius: 22 }),
      }),
      list: {
        padding: 8,
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 14,
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.12 : 0.06,
          ),
        },
        "&.Mui-selected": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.16 : 0.08,
          ),
        },
      }),
    },
  },
});

const createThemeOptions = (mode: FlowEditorialMode): NamedThemeOptions => {
  const tokens = TOKENS[mode];

  return {
    name: mode === "light" ? "Flow Editorial" : "Flow Editorial Night",
    palette: {
      mode,
      primary: {
        main: tokens.accent,
        dark: mode === "light" ? "#E00065" : "#FF2E8B",
        light: mode === "light" ? "#FF4D9D" : "#FF7DB7",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: tokens.primaryText,
        dark: mode === "light" ? "#020617" : "#E2E8F0",
        light: mode === "light" ? "#334155" : "#FFFFFF",
        contrastText: mode === "light" ? "#FFFFFF" : "#0B0F17",
      },
      info: {
        main: mode === "light" ? "#2563EB" : "#60A5FA",
        contrastText: "#FFFFFF",
      },
      success: {
        main: mode === "light" ? "#16A34A" : "#4ADE80",
        contrastText: mode === "light" ? "#FFFFFF" : "#0B0F17",
      },
      warning: {
        main: mode === "light" ? "#D97706" : "#FBBF24",
        contrastText: "#111827",
      },
      error: {
        main: mode === "light" ? "#DC2626" : "#F87171",
        contrastText: "#FFFFFF",
      },
      background: {
        default: tokens.page,
        paper: tokens.paper,
      },
      text: {
        primary: tokens.primaryText,
        secondary:
          mode === "light"
            ? tokens.secondaryText
            : alpha(tokens.primaryText, 0.78),
        disabled: alpha(tokens.primaryText, mode === "light" ? 0.42 : 0.46),
      },
      divider: alpha(tokens.primaryText, mode === "light" ? 0.1 : 0.14),
      action: {
        hover: mode === "light" ? tokens.quiet : alpha(tokens.paper, 0.82),
        selected: alpha(tokens.accent, mode === "light" ? 0.1 : 0.16),
        focus: alpha(tokens.accent, mode === "light" ? 0.18 : 0.24),
        active: alpha(tokens.primaryText, mode === "light" ? 0.68 : 0.76),
        disabled: alpha(tokens.primaryText, 0.3),
        disabledBackground: alpha(
          tokens.primaryText,
          mode === "light" ? 0.06 : 0.08,
        ),
      },
    },
    typography: createTypography(),
    shape: {
      borderRadius: 20,
    },
    spacing: 8,
    components: createComponents(),
  } satisfies NamedThemeOptions;
};

export const flowEditorial = createThemeOptions("light");
export const flowEditorialNight = createThemeOptions("dark");
