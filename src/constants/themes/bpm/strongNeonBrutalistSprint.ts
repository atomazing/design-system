import { alpha } from "@mui/material/styles";

import { brutalistSprint } from "../landing/brutalistSprint";

import { neonCompliance, neonComplianceLight } from "./neonCompliance";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

interface Controls {
  luxuryLevel: number;
  extravagance: number;
  heroDrama: number;
  ctaPower: number;
  motionPolish: number;
  blurBudget: number;
}

type SurfaceLevel = "surface" | "elevated" | "overlay";

const FONT_DISPLAY =
  '"Sora","Space Grotesk","Arial Black","Inter","Helvetica","Arial",sans-serif';
const FONT_TEXT = '"Inter","Manrope","Helvetica","Arial",sans-serif';
const FONT_MONO =
  '"IBM Plex Mono","JetBrains Mono","Roboto Mono","Menlo","Consolas",monospace';

const typography = {
  fontFamily: FONT_TEXT,
  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    fontSize: "clamp(2.55rem, 4.7vw, 3.92rem)",
    lineHeight: 0.96,
    letterSpacing: "-0.05em",
    textTransform: "uppercase",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    fontSize: "clamp(1.82rem, 3.1vw, 2.72rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.032em",
    textTransform: "uppercase",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 840,
    fontSize: "clamp(1.18rem, 1.9vw, 1.64rem)",
    lineHeight: 1.12,
    letterSpacing: "-0.016em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 820,
    fontSize: "1.12rem",
    lineHeight: 1.24,
    letterSpacing: "-0.01em",
  },
  subtitle1: {
    fontFamily: FONT_TEXT,
    fontWeight: 760,
    fontSize: "1.02rem",
    lineHeight: 1.52,
    letterSpacing: "-0.01em",
  },
  subtitle2: {
    fontFamily: FONT_TEXT,
    fontWeight: 760,
    fontSize: "0.88rem",
    lineHeight: 1.4,
    letterSpacing: "0.03em",
  },
  body1: { fontSize: "1rem", lineHeight: 1.72 },
  body2: { fontSize: "0.92rem", lineHeight: 1.66 },
  button: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  caption: { fontSize: "0.82rem", lineHeight: 1.45, letterSpacing: "0.02em" },
  overline: {
    fontFamily: FONT_MONO,
    fontSize: "0.74rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 780,
  },
} as const;

const clampUnit = (value: number): number => Math.min(1, Math.max(0, value));
const scale = (value: number, min: number, max: number): number =>
  min + (max - min) * clampUnit(value);
const createControls = (controls: Controls): Controls => ({
  luxuryLevel: clampUnit(controls.luxuryLevel),
  extravagance: clampUnit(controls.extravagance),
  heroDrama: clampUnit(controls.heroDrama),
  ctaPower: clampUnit(controls.ctaPower),
  motionPolish: clampUnit(controls.motionPolish),
  blurBudget: clampUnit(controls.blurBudget),
});

const lightControls = createControls({
  luxuryLevel: 0.76,
  extravagance: 0.42,
  heroDrama: 0.34,
  ctaPower: 0.9,
  motionPolish: 0.42,
  blurBudget: 0.22,
});
const darkControls = createControls({
  luxuryLevel: 0.8,
  extravagance: 0.5,
  heroDrama: 0.4,
  ctaPower: 0.94,
  motionPolish: 0.46,
  blurBudget: 0.28,
});

const motion = (
  theme: Theme,
  controls: Controls,
  min: number,
  max: number,
): number =>
  Math.round(scale(controls.motionPolish, min, Math.max(min + 1, max)));
const hardShadow = (
  theme: Theme,
  size: number,
  opacity = theme.palette.mode === "dark" ? 0.7 : 0.82,
) => `${size}px ${size}px 0 ${alpha(theme.palette.text.primary, opacity)}`;
const rail = (theme: Theme, controls: Controls, opacity = 1, angle = 108) =>
  `linear-gradient(${angle}deg, transparent 0%, transparent 36%, ${alpha(theme.palette.primary.main, scale(controls.heroDrama, 0.12, 0.22) * opacity)} 45%, ${alpha(theme.palette.secondary.main, scale(controls.extravagance, 0.12, 0.28) * opacity)} 50%, ${alpha(theme.palette.info.main, scale(controls.luxuryLevel, 0.1, 0.24) * opacity)} 55%, transparent 64%, transparent 100%)`;
const blurStyle = (controls: Controls, min: number, max: number) => {
  const blur = Math.round(scale(controls.blurBudget, min, max));
  const mobileBlur = Math.max(3, Math.round(blur * 0.6));
  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    "@media (hover: none), (pointer: coarse), (max-width: 900px)": {
      backdropFilter: `blur(${mobileBlur}px)`,
      WebkitBackdropFilter: `blur(${mobileBlur}px)`,
    },
  };
};
const focusRing = (theme: Theme, controls: Controls) =>
  [
    `0 0 0 2px ${alpha(theme.palette.background.default, 0.96)}`,
    `0 0 0 5px ${alpha(theme.palette.primary.main, scale(controls.ctaPower, 0.24, 0.38))}`,
    `0 0 0 7px ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.22 : 0.14)}`,
  ].join(", ");
const stage = (theme: Theme, controls: Controls, isDark: boolean) =>
  (isDark
    ? [
        `radial-gradient(900px 500px at 10% 0%, ${alpha(theme.palette.primary.main, scale(controls.heroDrama, 0.07, 0.12))} 0%, transparent 60%)`,
        `radial-gradient(760px 420px at 88% 10%, ${alpha(theme.palette.info.main, scale(controls.luxuryLevel, 0.04, 0.08))} 0%, transparent 62%)`,
        `linear-gradient(180deg, ${alpha("#000", 0.8)} 0%, ${alpha("#000", 0.48)} 20%, transparent 58%, ${alpha("#000", 0.84)} 100%)`,
        `repeating-linear-gradient(0deg, ${alpha(theme.palette.text.primary, 0.03)} 0px, ${alpha(theme.palette.text.primary, 0.03)} 1px, transparent 1px, transparent 10px)`,
        `repeating-linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.02)} 0px, ${alpha(theme.palette.text.primary, 0.02)} 1px, transparent 1px, transparent 16px)`,
      ]
    : [
        `radial-gradient(900px 480px at 10% 0%, ${alpha(theme.palette.primary.main, scale(controls.heroDrama, 0.03, 0.06))} 0%, transparent 62%)`,
        `radial-gradient(720px 400px at 88% 10%, ${alpha(theme.palette.info.main, scale(controls.luxuryLevel, 0.02, 0.04))} 0%, transparent 64%)`,
        `linear-gradient(180deg, ${alpha("#FFFFFF", 0.92)} 0%, ${alpha(theme.palette.background.default, 0.94)} 26%, ${alpha(theme.palette.background.default, 0.99)} 100%)`,
        `repeating-linear-gradient(0deg, ${alpha(theme.palette.text.primary, 0.022)} 0px, ${alpha(theme.palette.text.primary, 0.022)} 1px, transparent 1px, transparent 10px)`,
        `repeating-linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.016)} 0px, ${alpha(theme.palette.text.primary, 0.016)} 1px, transparent 1px, transparent 16px)`,
      ]
  ).join(", ");

const surface = (theme: Theme, controls: Controls, level: SurfaceLevel) => {
  const isDark = theme.palette.mode === "dark";
  const radius =
    Number(theme.shape.borderRadius) +
    (level === "overlay" ? 16 : level === "elevated" ? 10 : 6);
  const hard = level === "surface" ? 5 : level === "elevated" ? 7 : 9;
  const tint = isDark
    ? level === "surface"
      ? 0.88
      : level === "elevated"
        ? 0.9
        : 0.94
    : level === "surface"
      ? 0.96
      : level === "elevated"
        ? 0.98
        : 0.99;
  const backdrop =
    level === "overlay"
      ? blurStyle(controls, 5, 9)
      : level === "elevated"
        ? {}
        : {};
  return {
    position: "relative" as const,
    isolation: "isolate" as const,
    overflow: "hidden" as const,
    borderRadius: radius,
    backgroundColor: alpha(theme.palette.background.paper, tint),
    backgroundImage: [
      `linear-gradient(180deg, ${alpha(theme.palette.common.white, level === "overlay" ? (isDark ? 0.08 : 0.3) : isDark ? 0.05 : 0.18)} 0%, transparent 22%)`,
      `linear-gradient(112deg, ${alpha(theme.palette.primary.main, level === "overlay" ? (isDark ? 0.1 : 0.05) : level === "elevated" ? (isDark ? 0.06 : 0.03) : 0)} 0%, transparent 42%, ${alpha(theme.palette.info.main, level === "overlay" ? (isDark ? 0.08 : 0.04) : level === "elevated" ? (isDark ? 0.04 : 0.02) : 0)} 100%)`,
    ].join(", "),
    border: `${level === "overlay" ? 3 : 2}px solid ${alpha(theme.palette.text.primary, level === "overlay" ? (isDark ? 0.72 : 0.82) : level === "elevated" ? (isDark ? 0.58 : 0.7) : isDark ? 0.5 : 0.64)}`,
    boxShadow: [
      `0 0 0 1px ${alpha(theme.palette.common.white, level === "overlay" ? (isDark ? 0.06 : 0.22) : isDark ? 0.03 : 0.12)} inset`,
      hardShadow(theme, hard),
      `0 ${level === "surface" ? 16 : level === "elevated" ? 20 : 28}px ${level === "surface" ? 32 : level === "elevated" ? 42 : 56}px ${alpha("#000", isDark ? 0.28 : 0.12)}`,
    ].join(", "),
    ...backdrop,
    "&::before": {
      content: '""',
      position: "absolute" as const,
      insetInline: 0,
      top: 0,
      height: level === "overlay" ? 4 : level === "elevated" ? 3 : 2,
      backgroundImage: rail(
        theme,
        controls,
        level === "overlay" ? 0.5 : level === "elevated" ? 0.26 : 0.14,
      ),
      pointerEvents: "none" as const,
    },
  };
};

const createComponents = (
  isDark: boolean,
  controls: Controls,
): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      ":root": {
        "--nbs-primary": theme.palette.primary.main,
        "--nbs-secondary": theme.palette.secondary.main,
        "--nbs-info": theme.palette.info.main,
        "--nbs-ink": theme.palette.text.primary,
      },
      "@keyframes nbsRise": {
        "0%": { transform: "translateY(6px)", opacity: 0 },
        "100%": { transform: "translateY(0)", opacity: 1 },
      },
      "*, *::before, *::after": { boxSizing: "border-box" },
      html: { scrollBehavior: "smooth" },
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundImage: stage(theme, controls, isDark),
        backgroundAttachment: "fixed",
        backgroundSize: "auto, auto, auto, 32px 32px, 44px 44px",
      },
      "body::before": {
        content: '""',
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: rail(theme, controls, isDark ? 0.3 : 0.22),
        filter: `blur(${Math.round(scale(controls.heroDrama, 5, 9))}px)`,
        opacity: isDark ? 0.24 : 0.14,
      },
      ".nbs-surface-hero, [data-nbs-surface='hero']": surface(
        theme,
        controls,
        "overlay",
      ),
      ".nbs-surface-calm, [data-nbs-surface='calm']": {
        ...surface(theme, controls, "surface"),
        borderRadius: Number(theme.shape.borderRadius) + 10,
      },
      ".nbs-metric, [data-nbs-type='metric']": {
        fontFamily: FONT_MONO,
        letterSpacing: "-0.04em",
        textShadow: `0 0 10px ${alpha(theme.palette.primary.main, isDark ? 0.1 : 0.04)}`,
        animation: `nbsRise ${motion(theme, controls, 220, 320)}ms ease-out 1`,
      },
      "*::selection": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          isDark ? 0.24 : 0.18,
        ),
        color: isDark
          ? theme.palette.background.default
          : theme.palette.text.primary,
      },
      a: {
        color: isDark ? theme.palette.primary.light : theme.palette.info.dark,
        textDecorationColor: alpha(
          theme.palette.info.main,
          isDark ? 0.34 : 0.24,
        ),
        textDecorationThickness: "2px",
        textUnderlineOffset: "3px",
      },
      code: { fontFamily: FONT_MONO },
      "@media (hover: none), (pointer: coarse), (max-width: 900px)": {
        body: { backgroundAttachment: "scroll" },
        "body::before": {
          filter: `blur(${Math.round(scale(controls.heroDrama, 3, 5))}px)`,
          opacity: isDark ? 0.18 : 0.1,
        },
      },
      "@media (prefers-reduced-motion: reduce)": {
        html: { scrollBehavior: "auto" },
        "*, *::before, *::after": {
          animationDuration: "0.01ms !important",
          animationIterationCount: "1 !important",
          transitionDuration: "0.01ms !important",
        },
        body: { backgroundAttachment: "scroll" },
      },
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
        [theme.breakpoints.up("lg")]: {
          paddingLeft: theme.spacing(4),
          paddingRight: theme.spacing(4),
        },
      }),
    },
  },
  MuiAppBar: {
    defaultProps: { color: "transparent" as const, elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        ...surface(theme, controls, "surface"),
        borderRadius: Number(theme.shape.borderRadius) + 16,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.86 : 0.96,
        ),
      }),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => surface(theme, controls, "surface"),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...surface(theme, controls, "elevated"),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background-color"],
          { duration: motion(theme, controls, 150, 220) },
        ),
        "&:hover": {
          transform: "translate(-1px, -1px)",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.06 : 0.22)} inset`,
            hardShadow(theme, 8),
            `0 22px 52px ${alpha("#000", isDark ? 0.34 : 0.16)}`,
          ].join(", "),
        },
      }),
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiTypography-h1": {
          textShadow: `0 0 12px ${alpha(theme.palette.primary.main, isDark ? 0.12 : 0.04)}`,
        },
        "&.MuiTypography-h2": {
          textShadow: `0 0 8px ${alpha(theme.palette.info.main, isDark ? 0.1 : 0.03)}`,
        },
        "&.MuiTypography-overline": {
          color: alpha(theme.palette.secondary.main, isDark ? 0.82 : 0.76),
        },
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.95em",
          padding: "0.1em 0.35em",
          borderRadius: 8,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.88 : 0.96,
          ),
          border: `2px solid ${alpha(theme.palette.text.primary, isDark ? 0.42 : 0.54)}`,
          boxShadow: hardShadow(theme, 2, isDark ? 0.32 : 0.42),
        },
      }),
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 0,
        height: 3,
        borderRadius: 999,
        backgroundColor: alpha(theme.palette.text.primary, isDark ? 0.16 : 0.1),
        backgroundImage: rail(theme, controls, 0.54, 90),
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
        minHeight: 46,
        position: "relative",
        overflow: "hidden",
        transform: "translateZ(0)",
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background-color", "border-color"],
          { duration: motion(theme, controls, 120, 180) },
        ),
        "&:active": { transform: "translate(0, 0)" },
        "&.Mui-focusVisible": {
          outline: "none",
          boxShadow: focusRing(theme, controls),
        },
      }),
      sizeLarge: { minHeight: 52, paddingInline: 24, paddingBlock: 14 },
      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        backgroundImage: [
          `linear-gradient(135deg, ${alpha(theme.palette.primary.light, isDark ? 0.82 : 0.94)} 0%, ${alpha(theme.palette.primary.main, 0.98)} 58%, ${alpha(theme.palette.info.main, isDark ? 0.22 : 0.12)} 100%)`,
          `linear-gradient(180deg, ${alpha(theme.palette.common.white, isDark ? 0.1 : 0.28)} 0%, transparent 44%)`,
        ].join(", "),
        border: `2px solid ${alpha(theme.palette.text.primary, isDark ? 0.7 : 0.84)}`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.08 : 0.26)} inset`,
          hardShadow(theme, 7, isDark ? 0.68 : 0.82),
          `0 16px 40px ${alpha("#000", isDark ? 0.34 : 0.16)}`,
          `0 0 18px ${alpha(theme.palette.primary.main, scale(controls.ctaPower, isDark ? 0.08 : 0.03, isDark ? 0.14 : 0.07))}`,
        ].join(", "),
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: rail(theme, controls, isDark ? 0.18 : 0.12),
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translate(-1px, -1px)",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.1 : 0.3)} inset`,
            hardShadow(theme, 8, isDark ? 0.7 : 0.84),
            `0 20px 48px ${alpha("#000", isDark ? 0.4 : 0.18)}`,
            `0 0 22px ${alpha(theme.palette.primary.main, scale(controls.ctaPower, isDark ? 0.1 : 0.04, isDark ? 0.16 : 0.08))}`,
          ].join(", "),
        },
        "&.Mui-disabled": {
          color: alpha(theme.palette.text.primary, 0.46),
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.18 : 0.08,
          ),
          backgroundImage: "none",
          borderColor: alpha(theme.palette.text.primary, 0.3),
          boxShadow: `0 0 0 1px ${alpha(theme.palette.text.primary, 0.08)} inset`,
        },
      }),
      outlinedPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.84 : 0.96,
        ),
        border: `2px solid ${alpha(theme.palette.text.primary, isDark ? 0.5 : 0.64)}`,
        boxShadow: `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.04 : 0.14)} inset`,
        "&:hover": {
          transform: "translate(-1px, -1px)",
          borderColor: alpha(theme.palette.info.main, isDark ? 0.52 : 0.34),
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.88 : 0.99,
          ),
          boxShadow: [
            hardShadow(theme, 6, isDark ? 0.5 : 0.68),
            `0 0 14px ${alpha(theme.palette.info.main, isDark ? 0.08 : 0.04)}`,
          ].join(", "),
        },
      }),
      textPrimary: ({ theme }) => ({
        color: isDark ? theme.palette.primary.light : theme.palette.info.dark,
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.08 : 0.05,
          ),
        },
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        fontFamily: FONT_TEXT,
        fontWeight: 760,
        letterSpacing: "0.03em",
        color: theme.palette.text.primary,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.86 : 0.94,
        ),
        border: `2px solid ${alpha(theme.palette.text.primary, isDark ? 0.46 : 0.64)}`,
        boxShadow: hardShadow(theme, 3, isDark ? 0.34 : 0.5),
      }),
      label: { paddingInline: 12 },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 12,
        border: `2px solid ${alpha(theme.palette.text.primary, isDark ? 0.44 : 0.6)}`,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.84 : 0.96,
        ),
        boxShadow: hardShadow(theme, 3, isDark ? 0.34 : 0.5),
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.9 : 1,
          ),
          boxShadow: hardShadow(theme, 4, isDark ? 0.38 : 0.56),
          transform: "translate(-1px, -1px)",
        },
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 16,
        border: `2px solid ${alpha(theme.palette.text.primary, isDark ? 0.4 : 0.58)}`,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.84 : 0.96,
        ),
        color: alpha(theme.palette.text.primary, 0.88),
        boxShadow: hardShadow(theme, 3, isDark ? 0.32 : 0.48),
        "&.Mui-selected": {
          color: theme.palette.text.primary,
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.14 : 0.08,
          ),
          backgroundImage: rail(theme, controls, isDark ? 0.16 : 0.1),
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 14,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.86 : 0.97,
        ),
        boxShadow: `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.04 : 0.14)} inset`,
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.text.primary, isDark ? 0.56 : 0.68),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.info.main,
          boxShadow: focusRing(theme, controls),
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, isDark ? 0.34 : 0.5),
        borderWidth: 2,
      }),
      input: { paddingBlock: 12 },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_TEXT,
        fontWeight: 760,
        letterSpacing: "0.02em",
        color: alpha(theme.palette.text.secondary, 0.94),
        "&.Mui-focused": {
          color: isDark ? theme.palette.primary.light : theme.palette.info.dark,
        },
      }),
    },
  },
  MuiSelect: {
    styleOverrides: {
      icon: ({ theme }) => ({ color: alpha(theme.palette.text.primary, 0.9) }),
      select: () => ({ fontFamily: FONT_TEXT, fontWeight: 700 }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => surface(theme, controls, "overlay"),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 10,
        margin: theme.spacing(0.5),
        paddingBlock: 10,
        transition: theme.transitions.create(
          ["background-color", "transform"],
          { duration: motion(theme, controls, 100, 150) },
        ),
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.12 : 0.06,
          ),
          transform: "translateX(1px)",
        },
        "&.Mui-selected": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.16 : 0.08,
          ),
        },
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...surface(theme, controls, "overlay"),
        borderRadius: 0,
        borderInlineStart: 0,
        borderBlockEnd: 0,
        borderBlockStart: 0,
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        borderBottom: `2px solid ${alpha(theme.palette.text.primary, isDark ? 0.26 : 0.18)}`,
      }),
      indicator: ({ theme }) => ({
        height: 4,
        borderRadius: 999,
        backgroundImage: rail(theme, controls, 0.82, 90),
      }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        paddingInline: 16,
        fontFamily: FONT_TEXT,
        fontWeight: 760,
        letterSpacing: "0.03em",
        textTransform: "none",
        color: alpha(theme.palette.text.secondary, 0.94),
        "&.Mui-selected": {
          color: theme.palette.text.primary,
        },
      }),
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...surface(theme, controls, "overlay"),
        padding: theme.spacing(1, 1.25),
        fontFamily: FONT_TEXT,
        fontSize: "0.82rem",
        fontWeight: 600,
        lineHeight: 1.45,
        color: theme.palette.text.primary,
      }),
      arrow: ({ theme }) => ({
        color: alpha(theme.palette.background.paper, isDark ? 0.96 : 0.99),
      }),
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...surface(theme, controls, "elevated"),
        alignItems: "flex-start",
        paddingBlock: theme.spacing(1.25),
      }),
      standardInfo: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.info.main, isDark ? 0.12 : 0.08),
      }),
      standardWarning: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.warning.main, isDark ? 0.14 : 0.1),
      }),
      standardError: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.error.main, isDark ? 0.14 : 0.1),
      }),
      icon: ({ theme }) => ({
        opacity: 0.92,
        color: theme.palette.text.primary,
      }),
      message: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => surface(theme, controls, "overlay"),
    },
  },
});

const createPreset = (
  name: string,
  paletteSource: NamedThemeOptions,
  isDark: boolean,
  controls: Controls,
): NamedThemeOptions => ({
  name,
  direction: "ltr",
  palette: { ...paletteSource.palette, mode: isDark ? "dark" : "light" },
  typography,
  shape: brutalistSprint.shape,
  spacing: brutalistSprint.spacing,
  components: createComponents(isDark, controls),
});

export const strongNeonBrutalistSprint = createPreset(
  "Strong Neon Brutalist Sprint",
  neonComplianceLight,
  false,
  lightControls,
);
export const strongNeonBrutalistSprintNight = createPreset(
  "Strong Neon Brutalist Sprint (Night)",
  neonCompliance,
  true,
  darkControls,
);
