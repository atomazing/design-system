import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Strong Neon Compliance
 * Visual: operational cyber-neon with clearer structure, firmer surfaces,
 * and restrained effects. The theme should feel like a control plane,
 * not a showcase.
 */

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
    fontSize: "clamp(2.2rem, 4.1vw, 3.3rem)",
    lineHeight: 1.04,
    letterSpacing: "-0.028em",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 810,
    fontSize: "clamp(1.58rem, 2.75vw, 2.22rem)",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 790,
    fontSize: "clamp(1.18rem, 1.85vw, 1.5rem)",
    lineHeight: 1.16,
    letterSpacing: "-0.014em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 770,
    fontSize: "1.08rem",
    lineHeight: 1.24,
    letterSpacing: "-0.008em",
  },

  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 720,
    fontSize: "1rem",
    lineHeight: 1.42,
    letterSpacing: "0.004em",
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 720,
    fontSize: "0.9rem",
    lineHeight: 1.38,
    letterSpacing: "0.012em",
  },

  body1: { fontSize: "1rem", lineHeight: 1.72 },
  body2: { fontSize: "0.92rem", lineHeight: 1.66 },

  button: {
    fontFamily: FONT_DISPLAY,
    textTransform: "none",
    fontWeight: 820,
    letterSpacing: "0.03em",
  },

  caption: {
    fontFamily: FONT_MONO,
    fontSize: "0.8rem",
    lineHeight: 1.48,
    letterSpacing: "0.02em",
  },
  overline: {
    fontFamily: FONT_MONO,
    fontSize: "0.72rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    fontWeight: 800,
  },
} as const;

interface NeonFrameOptions {
  radius?: number;
  strength?: number;
  accent?: string;
  secondaryAccent?: string;
  borderAlpha?: number;
  glowAlpha?: number;
}

const surfaceShadow = (theme: Theme, elevated = false) =>
  [
    `0 0 0 1px ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.05 : 0.04)} inset`,
    `0 ${elevated ? 18 : 12}px ${elevated ? 44 : 28}px ${alpha(
      "#000",
      theme.palette.mode === "dark"
        ? elevated
          ? 0.4
          : 0.28
        : elevated
          ? 0.14
          : 0.1,
    )}`,
  ].join(", ");

const focusRing = (theme: Theme, opacity = 0.14) =>
  `0 0 0 3px ${alpha(theme.palette.info.main, opacity)}`;

const neonFrame = (theme: Theme, opts?: NeonFrameOptions) => {
  const radius = opts?.radius ?? Number(theme.shape.borderRadius) + 8;
  const strength = opts?.strength ?? 0.24;
  const accent = opts?.accent ?? theme.palette.primary.main;
  const secondaryAccent = opts?.secondaryAccent ?? theme.palette.info.main;
  const borderAlpha =
    opts?.borderAlpha ?? (theme.palette.mode === "dark" ? 0.76 : 0.58);
  const glowAlpha =
    opts?.glowAlpha ?? (theme.palette.mode === "dark" ? 0.05 : 0.025);

  return {
    position: "relative" as const,
    borderRadius: radius,
    isolation: "isolate" as const,
    overflow: "hidden" as const,

    "&::before": {
      content: '""',
      position: "absolute" as const,
      inset: 0,
      borderRadius: radius,
      padding: 1,
      background: `linear-gradient(135deg,
        ${alpha(accent, borderAlpha)} 0%,
        ${alpha(theme.palette.secondary.main, borderAlpha * 0.52)} 46%,
        ${alpha(secondaryAccent, borderAlpha * 0.68)} 100%)`,
      WebkitMask:
        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor" as const,
      maskComposite: "exclude" as const,
      opacity: theme.palette.mode === "dark" ? 0.82 : 0.72,
      pointerEvents: "none" as const,
    },

    "&::after": {
      content: '""',
      position: "absolute" as const,
      inset: -12,
      borderRadius: radius + 12,
      background: `radial-gradient(440px 180px at 18% 0%,
        ${alpha(accent, glowAlpha * strength)} 0%,
        transparent 66%),
        radial-gradient(360px 160px at 84% 0%,
        ${alpha(secondaryAccent, glowAlpha * 0.8 * strength)} 0%,
        transparent 64%)`,
      filter: `blur(${6 + 6 * strength}px)`,
      opacity: 0.55,
      zIndex: -1,
      pointerEvents: "none" as const,
    },
  };
};

const calmSurface = (
  theme: Theme,
  opts?: {
    elevated?: boolean;
    radiusOffset?: number;
    backgroundAlpha?: number;
  },
) => {
  const elevated = opts?.elevated ?? false;
  const radiusOffset = opts?.radiusOffset ?? (elevated ? 10 : 8);
  const backgroundAlpha =
    opts?.backgroundAlpha ??
    (theme.palette.mode === "dark"
      ? elevated
        ? 0.9
        : 0.94
      : elevated
        ? 0.975
        : 0.99);

  return {
    position: "relative" as const,
    borderRadius: Number(theme.shape.borderRadius) + radiusOffset,
    backgroundColor: alpha(theme.palette.background.paper, backgroundAlpha),
    backgroundImage: `linear-gradient(180deg,
      ${alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.06 : 0.42)} 0%,
      transparent 38%)`,
    border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.14 : 0.12)}`,
    boxShadow: surfaceShadow(theme, elevated),
  };
};

const createComponents = (
  isDark: boolean,
  opts?: { calmMode?: boolean },
): ThemeOptions["components"] => {
  const calmMode = opts?.calmMode ?? false;
  const hoverLift = calmMode ? "translateY(0px)" : "translateY(-1px)";

  return {
    MuiCssBaseline: {
      styleOverrides: (theme: Theme) => ({
        ":root": {
          "--nc-cyan": theme.palette.primary.main,
          "--nc-magenta": theme.palette.secondary.main,
          "--nc-blue": theme.palette.info.main,
        },

        "@keyframes ncRise": {
          "0%": { transform: "translateY(6px)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },

        "*, *::before, *::after": { boxSizing: "border-box" },

        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          backgroundImage: isDark
            ? [
                `radial-gradient(900px 420px at 16% 6%, ${alpha(theme.palette.primary.main, calmMode ? 0.08 : 0.12)} 0%, transparent 62%)`,
                `radial-gradient(760px 360px at 84% 10%, ${alpha(theme.palette.info.main, calmMode ? 0.06 : 0.09)} 0%, transparent 60%)`,
                `linear-gradient(180deg, ${alpha("#000", 0.46)} 0%, transparent 18%, transparent 82%, ${alpha("#000", 0.56)} 100%)`,
                `repeating-linear-gradient(0deg, ${alpha(theme.palette.text.primary, calmMode ? 0.026 : 0.032)} 0px, ${alpha(theme.palette.text.primary, calmMode ? 0.026 : 0.032)} 1px, transparent 1px, transparent 10px)`,
                `repeating-linear-gradient(90deg, ${alpha(theme.palette.text.primary, calmMode ? 0.016 : 0.022)} 0px, ${alpha(theme.palette.text.primary, calmMode ? 0.016 : 0.022)} 1px, transparent 1px, transparent 14px)`,
              ].join(", ")
            : [
                `radial-gradient(920px 420px at 18% 8%, ${alpha(theme.palette.primary.main, calmMode ? 0.05 : 0.08)} 0%, transparent 62%)`,
                `radial-gradient(780px 360px at 84% 10%, ${alpha(theme.palette.info.main, calmMode ? 0.04 : 0.06)} 0%, transparent 60%)`,
                `linear-gradient(180deg, ${alpha("#FFFFFF", 0.92)} 0%, ${alpha(theme.palette.background.default, 0.94)} 26%, ${alpha(theme.palette.background.default, 0.99)} 100%)`,
                `repeating-linear-gradient(0deg, ${alpha(theme.palette.text.primary, calmMode ? 0.018 : 0.024)} 0px, ${alpha(theme.palette.text.primary, calmMode ? 0.018 : 0.024)} 1px, transparent 1px, transparent 10px)`,
                `repeating-linear-gradient(90deg, ${alpha(theme.palette.text.primary, calmMode ? 0.014 : 0.018)} 0px, ${alpha(theme.palette.text.primary, calmMode ? 0.014 : 0.018)} 1px, transparent 1px, transparent 14px)`,
              ].join(", "),
          backgroundAttachment: "fixed",
        },

        ".nc-number, .snc-number": {
          fontFamily: FONT_MONO,
          letterSpacing: "-0.04em",
          textShadow: `0 0 10px ${alpha(theme.palette.primary.main, isDark ? 0.08 : 0.04)}`,
          animation: "ncRise 260ms ease-out 1",
        },

        ".nc-tag, .snc-tag": {
          fontFamily: FONT_MONO,
          letterSpacing: "0.08em",
          padding: "0.16em 0.55em",
          borderRadius: 999,
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.08 : 0.05,
          ),
          border: `1px solid ${alpha(theme.palette.primary.main, isDark ? 0.2 : 0.14)}`,
          boxShadow: `0 0 0 1px ${alpha(theme.palette.text.primary, 0.03)} inset`,
        },

        ".nc-surface-calm, .snc-surface-calm, [data-nc-surface='calm'], [data-snc-surface='calm']":
          {
            ...calmSurface(theme, { elevated: false }),
          },

        ".nc-panel-focus, .snc-panel-focus, [data-nc-surface='focus'], [data-snc-surface='focus']":
          {
            ...calmSurface(theme, { elevated: true }),
            ...neonFrame(theme, {
              strength: isDark ? 0.26 : 0.18,
              radius: Number(theme.shape.borderRadius) + 10,
              borderAlpha: isDark ? 0.78 : 0.6,
              glowAlpha: isDark ? 0.05 : 0.025,
            }),
          },

        "*::selection": {
          backgroundColor: alpha(theme.palette.primary.main, 0.22),
          color: isDark
            ? theme.palette.background.default
            : theme.palette.text.primary,
        },

        a: {
          color: isDark ? theme.palette.info.light : theme.palette.info.dark,
          textDecorationColor: alpha(
            theme.palette.info.main,
            isDark ? 0.34 : 0.24,
          ),
          textUnderlineOffset: "3px",
        },

        "@media (hover: none), (pointer: coarse), (max-width: 900px)": {
          body: {
            backgroundAttachment: "scroll",
          },
        },

        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
          },
          body: {
            backgroundAttachment: "scroll",
          },
        },
      }),
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
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
          backdropFilter: `blur(${isDark ? 8 : 6}px)`,
          WebkitBackdropFilter: `blur(${isDark ? 8 : 6}px)`,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.88 : 0.97,
          ),
          borderBottom: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.18 : 0.12)}`,
          boxShadow: surfaceShadow(theme, false),
        }),
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.MuiTypography-h1": {
            textShadow: `0 0 10px ${alpha(theme.palette.info.main, isDark ? 0.06 : 0.025)}`,
          },
          "&.MuiTypography-h2": {
            textShadow: `0 0 8px ${alpha(theme.palette.info.main, isDark ? 0.04 : 0.02)}`,
          },
          "& code": {
            fontFamily: FONT_MONO,
            fontSize: "0.95em",
            padding: "0.12em 0.36em",
            borderRadius: 6,
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.05,
            ),
            border: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
          },
        }),
      },
    },

    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 700,
          textDecorationThickness: "2px",
          textDecorationColor: alpha(
            theme.palette.info.main,
            isDark ? 0.34 : 0.24,
          ),
          "&:hover": {
            textDecorationColor: alpha(
              theme.palette.info.main,
              isDark ? 0.64 : 0.44,
            ),
          },
        }),
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...calmSurface(theme, { elevated: false }),
          borderRadius: Number(theme.shape.borderRadius) + 8,
        }),
      },
    },

    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...calmSurface(theme, {
            elevated: true,
            backgroundAlpha: isDark ? 0.9 : 0.98,
          }),
          ...neonFrame(theme, {
            strength: isDark
              ? calmMode
                ? 0.18
                : 0.26
              : calmMode
                ? 0.12
                : 0.18,
            borderAlpha: isDark ? 0.8 : 0.62,
            glowAlpha: isDark
              ? calmMode
                ? 0.04
                : 0.06
              : calmMode
                ? 0.02
                : 0.03,
          }),
          transition: theme.transitions.create(
            ["transform", "box-shadow", "background-color", "border-color"],
            { duration: theme.transitions.duration.shorter },
          ),
          "&:hover": {
            transform: hoverLift,
            backgroundColor: alpha(
              theme.palette.background.paper,
              isDark ? 0.93 : 0.995,
            ),
            boxShadow: surfaceShadow(theme, true),
          },
        }),
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: 0,
          height: 1,
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.18 : 0.12,
          ),
          backgroundImage: `linear-gradient(90deg,
            transparent 0%,
            ${alpha(theme.palette.info.main, isDark ? 0.24 : 0.12)} 36%,
            ${alpha(theme.palette.primary.main, isDark ? 0.28 : 0.14)} 64%,
            transparent 100%)`,
        }),
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 16,
          paddingInline: 20,
          paddingBlock: 12,
          minHeight: 44,
          fontWeight: 820,
          letterSpacing: "0.03em",
          position: "relative",
          overflow: "hidden",
          transform: "translateZ(0)",
          transition: theme.transitions.create(
            ["transform", "box-shadow", "background-color", "border-color"],
            { duration: theme.transitions.duration.shorter },
          ),
          "&.Mui-focusVisible": {
            outline: "none",
            boxShadow: focusRing(theme),
          },
          "&:active": { transform: "translateY(0px)" },
        }),

        sizeLarge: {
          minHeight: 50,
          paddingInline: 24,
          paddingBlock: 14,
        },

        containedPrimary: ({ theme }) => ({
          color: theme.palette.primary.contrastText,
          border: `1px solid ${alpha(theme.palette.primary.main, isDark ? 0.58 : 0.42)}`,
          backgroundColor: theme.palette.primary.main,
          backgroundImage: `linear-gradient(180deg,
            ${alpha(theme.palette.common.white, isDark ? 0.18 : 0.48)} 0%,
            transparent 54%),
            linear-gradient(135deg,
            ${alpha(theme.palette.primary.light, isDark ? 0.7 : 0.78)} 0%,
            ${alpha(theme.palette.primary.main, isDark ? 0.96 : 0.94)} 60%,
            ${alpha(theme.palette.info.main, isDark ? 0.2 : 0.12)} 100%)`,
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.text.primary, 0.08)} inset`,
            `0 14px 34px ${alpha("#000", isDark ? 0.34 : 0.16)}`,
          ].join(", "),
          "&:hover": {
            transform: hoverLift,
            borderColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.76 : 0.56,
            ),
            boxShadow: [
              `0 0 0 1px ${alpha(theme.palette.text.primary, 0.1)} inset`,
              `0 18px 40px ${alpha("#000", isDark ? 0.4 : 0.2)}`,
            ].join(", "),
          },
          "&.Mui-disabled": {
            color: alpha(theme.palette.text.primary, 0.46),
            backgroundColor: alpha(
              theme.palette.text.primary,
              isDark ? 0.14 : 0.08,
            ),
            backgroundImage: "none",
            borderColor: alpha(theme.palette.text.primary, 0.24),
            boxShadow: "none",
          },
        }),

        outlinedPrimary: ({ theme }) => ({
          borderWidth: 1,
          borderColor: alpha(theme.palette.text.primary, isDark ? 0.2 : 0.16),
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.74 : 0.94,
          ),
          boxShadow: `0 0 0 1px ${alpha(theme.palette.text.primary, 0.04)} inset`,
          "&:hover": {
            transform: hoverLift,
            borderColor: alpha(theme.palette.info.main, isDark ? 0.56 : 0.36),
            backgroundColor: alpha(
              theme.palette.background.paper,
              isDark ? 0.82 : 0.98,
            ),
            boxShadow: `0 0 0 1px ${alpha(theme.palette.info.main, isDark ? 0.14 : 0.08)} inset`,
          },
        }),

        textPrimary: ({ theme }) => ({
          color: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.05,
            ),
          },
        }),
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.14 : 0.1)}`,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.78 : 0.94,
          ),
          boxShadow: `0 8px 22px ${alpha("#000", isDark ? 0.18 : 0.08)}`,
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.background.paper,
              isDark ? 0.86 : 0.98,
            ),
            boxShadow: `0 10px 24px ${alpha("#000", isDark ? 0.22 : 0.1)}`,
          },
        }),
      },
    },

    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 999,
          fontFamily: FONT_DISPLAY,
          fontWeight: 780,
          letterSpacing: "0.03em",
          textTransform: "none",
          border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.16 : 0.1)}`,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.78 : 0.95,
          ),
          boxShadow: `0 0 0 1px ${alpha(theme.palette.text.primary, 0.03)} inset`,
        }),
        label: { paddingInline: 12 },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 14,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.8 : 0.96,
          ),
          transition: theme.transitions.create(
            ["box-shadow", "border-color", "background-color"],
            { duration: theme.transitions.duration.shorter },
          ),
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(theme.palette.info.main, isDark ? 0.5 : 0.32),
          },
          "&.Mui-focused": {
            boxShadow: focusRing(theme),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.info.main,
          },
        }),
        notchedOutline: ({ theme }) => ({
          borderColor: alpha(theme.palette.text.primary, isDark ? 0.22 : 0.14),
          borderWidth: 1.5,
        }),
        input: {
          paddingBlock: 12,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontFamily: FONT_DISPLAY,
          fontWeight: 720,
          letterSpacing: "0.015em",
          textTransform: "none",
          color: alpha(theme.palette.text.secondary, 0.94),
          "&.Mui-focused": {
            color: isDark ? theme.palette.info.light : theme.palette.info.dark,
          },
        }),
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 46,
          borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
        }),
        indicator: ({ theme }) => ({
          height: 3,
          borderRadius: 999,
          backgroundColor: theme.palette.primary.main,
          boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, isDark ? 0.14 : 0.06)}`,
        }),
      },
    },

    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 46,
          fontFamily: FONT_DISPLAY,
          fontWeight: 780,
          letterSpacing: "0.025em",
          textTransform: "none",
          color: alpha(theme.palette.text.primary, 0.76),
          "&.Mui-selected": {
            color: theme.palette.primary.main,
          },
        }),
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...calmSurface(theme, {
            elevated: true,
            backgroundAlpha: isDark ? 0.9 : 0.98,
          }),
          ...neonFrame(theme, {
            strength: isDark ? 0.18 : 0.12,
            borderAlpha: isDark ? 0.72 : 0.54,
            glowAlpha: isDark ? 0.035 : 0.02,
          }),
          border: "none",
          "&::before": { display: "none" },
        }),
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 56,
          paddingInline: theme.spacing(2.5),
        }),
        content: () => ({
          margin: 0,
          "& .MuiTypography-root": {
            fontFamily: FONT_DISPLAY,
            fontWeight: 780,
            letterSpacing: "-0.01em",
          },
        }),
      },
    },

    MuiAccordionDetails: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingInline: theme.spacing(2.5),
          paddingBottom: theme.spacing(2.5),
          color: alpha(theme.palette.text.primary, 0.88),
        }),
      },
    },

    MuiTooltip: {
      defaultProps: { arrow: true },
      styleOverrides: {
        tooltip: ({ theme }) => ({
          borderRadius: Number(theme.shape.borderRadius) + 8,
          fontSize: "0.82rem",
          border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.16 : 0.1)}`,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.96 : 0.99,
          ),
          color: theme.palette.text.primary,
          boxShadow: `0 10px 26px ${alpha("#000", isDark ? 0.24 : 0.1)}`,
        }),
        arrow: ({ theme }) => ({
          color: alpha(theme.palette.background.paper, isDark ? 0.96 : 0.99),
        }),
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          ...calmSurface(theme, {
            elevated: true,
            backgroundAlpha: isDark ? 0.94 : 0.99,
          }),
          ...neonFrame(theme, {
            strength: isDark ? 0.16 : 0.1,
            borderAlpha: isDark ? 0.7 : 0.5,
            glowAlpha: isDark ? 0.03 : 0.015,
          }),
        }),
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          ...calmSurface(theme, {
            elevated: true,
            backgroundAlpha: isDark ? 0.94 : 0.99,
          }),
          borderLeftColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.16 : 0.12,
          ),
          borderRightColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.16 : 0.12,
          ),
        }),
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: Number(theme.shape.borderRadius) + 6,
          border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.14 : 0.1)}`,
          boxShadow: `0 10px 24px ${alpha("#000", isDark ? 0.18 : 0.08)}`,
        }),
        standardInfo: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.info.main, isDark ? 0.14 : 0.08),
          color: theme.palette.text.primary,
          borderColor: alpha(theme.palette.info.main, isDark ? 0.3 : 0.18),
        }),
        standardSuccess: ({ theme }) => ({
          backgroundColor: alpha(
            theme.palette.success.main,
            isDark ? 0.14 : 0.08,
          ),
          color: theme.palette.text.primary,
          borderColor: alpha(theme.palette.success.main, isDark ? 0.3 : 0.18),
        }),
        standardWarning: ({ theme }) => ({
          backgroundColor: alpha(
            theme.palette.warning.main,
            isDark ? 0.16 : 0.1,
          ),
          color: theme.palette.text.primary,
          borderColor: alpha(theme.palette.warning.main, isDark ? 0.32 : 0.2),
        }),
        standardError: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.error.main, isDark ? 0.16 : 0.1),
          color: theme.palette.text.primary,
          borderColor: alpha(theme.palette.error.main, isDark ? 0.32 : 0.2),
        }),
      },
    },
  };
};

const strongNeonComplianceLightPalette = {
  mode: "light" as const,

  primary: {
    main: "#009CB2",
    dark: "#00788A",
    light: "#66D9E7",
    contrastText: "#041D24",
  },

  secondary: {
    main: "#C94AE4",
    dark: "#A234BF",
    light: "#E39DF2",
    contrastText: "#22092A",
  },

  info: {
    main: "#3F68F5",
    dark: "#2B4FD3",
    light: "#9BB2FF",
    contrastText: "#FFFFFF",
  },

  success: {
    main: "#00A96A",
    dark: "#008152",
    light: "#7DE2B6",
    contrastText: "#061D16",
  },

  warning: {
    main: "#B98B00",
    dark: "#8E6A00",
    light: "#E4C96B",
    contrastText: "#271F05",
  },

  error: {
    main: "#D84B67",
    dark: "#AE304B",
    light: "#F19CAF",
    contrastText: "#FFFFFF",
  },

  background: {
    default: "#F4F7FC",
    paper: "#FFFFFF",
  },

  text: {
    primary: "#121826",
    secondary: "#5B667D",
    disabled: alpha("#121826", 0.42),
  },

  divider: alpha("#121826", 0.16),

  action: {
    hover: alpha("#3F68F5", 0.05),
    selected: alpha("#009CB2", 0.1),
    focus: alpha("#3F68F5", 0.18),
    active: alpha("#121826", 0.62),
    disabled: alpha("#121826", 0.3),
    disabledBackground: alpha("#121826", 0.08),
  },
};

const strongNeonComplianceDarkPalette = {
  mode: "dark" as const,

  primary: {
    main: "#1AE6F3",
    dark: "#00BECB",
    light: "#8FF7FF",
    contrastText: "#051016",
  },

  secondary: {
    main: "#EA63F7",
    dark: "#BE41CC",
    light: "#F6AEFF",
    contrastText: "#17051A",
  },

  info: {
    main: "#6A8CFF",
    dark: "#4F6FE0",
    light: "#B1C2FF",
    contrastText: "#061024",
  },

  success: {
    main: "#17E28F",
    dark: "#08B56E",
    light: "#8BF0C1",
    contrastText: "#041109",
  },

  warning: {
    main: "#FFD54A",
    dark: "#D7AF1E",
    light: "#FFE897",
    contrastText: "#161003",
  },

  error: {
    main: "#FF617F",
    dark: "#D74763",
    light: "#FFABC0",
    contrastText: "#18050A",
  },

  background: {
    default: "#050912",
    paper: "#0C1322",
  },

  text: {
    primary: "#EDF4FF",
    secondary: "#A1B0D2",
    disabled: alpha("#EDF4FF", 0.44),
  },

  divider: alpha("#EDF4FF", 0.18),

  action: {
    hover: alpha("#1AE6F3", 0.1),
    selected: alpha("#1AE6F3", 0.18),
    focus: alpha("#6A8CFF", 0.24),
    active: alpha("#EDF4FF", 0.64),
    disabled: alpha("#EDF4FF", 0.32),
    disabledBackground: alpha("#EDF4FF", 0.1),
  },
};

export const strongNeonComplianceLight = {
  name: "Strong Neon Compliance Light",
  direction: "ltr",

  palette: strongNeonComplianceLightPalette,

  typography,

  shape: { borderRadius: 16 },
  spacing: 8,

  components: createComponents(false),
} satisfies NamedThemeOptions;

export const strongNeonCompliance = {
  name: "Strong Neon Compliance",
  direction: "ltr",

  palette: strongNeonComplianceDarkPalette,

  typography,

  shape: { borderRadius: 16 },
  spacing: 8,

  components: createComponents(true),
} satisfies NamedThemeOptions;

export const strongNeonComplianceCalm = {
  ...strongNeonCompliance,
  name: "Strong Neon Compliance (Calm)",
  components: createComponents(true, { calmMode: true }),
} satisfies NamedThemeOptions;
