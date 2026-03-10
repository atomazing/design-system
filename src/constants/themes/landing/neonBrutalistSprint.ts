import { alpha } from "@mui/material/styles";

import { brutalistSprint } from "./brutalistSprint";
import { neonCompliance, neonComplianceLight } from "./neonCompliance";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

type Controls = {
  luxuryLevel: number;
  extravagance: number;
  heroDrama: number;
  ctaPower: number;
  motionPolish: number;
  blurBudget: number;
};

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
    fontWeight: 920,
    fontSize: "clamp(2.65rem, 5vw, 4.15rem)",
    lineHeight: 0.94,
    letterSpacing: "-0.06em",
    textTransform: "uppercase",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 910,
    fontSize: "clamp(1.9rem, 3.3vw, 2.95rem)",
    lineHeight: 1,
    letterSpacing: "-0.04em",
    textTransform: "uppercase",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 860,
    fontSize: "clamp(1.24rem, 2vw, 1.72rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 840,
    fontSize: "1.16rem",
    lineHeight: 1.2,
    letterSpacing: "-0.012em",
  },
  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 820,
    fontSize: "1.04rem",
    lineHeight: 1.5,
    letterSpacing: "-0.01em",
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 860,
    fontSize: "0.9rem",
    lineHeight: 1.36,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  body1: { fontSize: "1rem", lineHeight: 1.78 },
  body2: { fontSize: "0.92rem", lineHeight: 1.72 },
  button: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  caption: { fontSize: "0.82rem", lineHeight: 1.5, letterSpacing: "0.02em" },
  overline: {
    fontFamily: FONT_MONO,
    fontSize: "0.74rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    fontWeight: 800,
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
  luxuryLevel: 0.84,
  extravagance: 0.8,
  heroDrama: 0.82,
  ctaPower: 0.92,
  motionPolish: 0.74,
  blurBudget: 0.62,
});
const darkControls = createControls({
  luxuryLevel: 0.9,
  extravagance: 0.86,
  heroDrama: 0.9,
  ctaPower: 0.96,
  motionPolish: 0.78,
  blurBudget: 0.72,
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
  opacity = theme.palette.mode === "dark" ? 0.76 : 0.9,
) => `${size}px ${size}px 0 ${alpha(theme.palette.text.primary, opacity)}`;
const rail = (theme: Theme, controls: Controls, opacity = 1, angle = 112) =>
  `linear-gradient(${angle}deg, transparent 0%, transparent 30%, ${alpha(theme.palette.primary.main, scale(controls.heroDrama, 0.18, 0.34) * opacity)} 41%, ${alpha(theme.palette.secondary.main, scale(controls.extravagance, 0.22, 0.52) * opacity)} 50%, ${alpha(theme.palette.info.main, scale(controls.luxuryLevel, 0.18, 0.44) * opacity)} 59%, transparent 71%, transparent 100%)`;
const blurStyle = (controls: Controls, min: number, max: number) => {
  const blur = Math.round(scale(controls.blurBudget, min, max));
  const mobileBlur = Math.max(4, Math.round(blur * 0.58));
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
    `0 0 0 3px ${alpha(theme.palette.background.default, 0.94)}`,
    `0 0 0 6px ${alpha(theme.palette.primary.main, scale(controls.ctaPower, 0.28, 0.48))}`,
    `0 0 28px ${alpha(theme.palette.secondary.main, scale(controls.extravagance, 0.16, 0.28))}`,
  ].join(", ");
const stage = (theme: Theme, controls: Controls, isDark: boolean) =>
  (isDark
    ? [
        `radial-gradient(1200px 680px at 12% 0%, ${alpha(theme.palette.primary.main, scale(controls.heroDrama, 0.16, 0.24))} 0%, transparent 62%)`,
        `radial-gradient(980px 560px at 86% 12%, ${alpha(theme.palette.secondary.main, scale(controls.extravagance, 0.1, 0.18))} 0%, transparent 62%)`,
        `radial-gradient(1240px 760px at 50% 112%, ${alpha(theme.palette.info.main, scale(controls.luxuryLevel, 0.12, 0.18))} 0%, transparent 62%)`,
        `linear-gradient(180deg, ${alpha("#000", 0.72)} 0%, transparent 16%, transparent 82%, ${alpha("#000", 0.84)} 100%)`,
        `repeating-linear-gradient(0deg, ${alpha(theme.palette.text.primary, 0.045)} 0px, ${alpha(theme.palette.text.primary, 0.045)} 1px, transparent 1px, transparent 9px)`,
        `repeating-linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.032)} 0px, ${alpha(theme.palette.text.primary, 0.032)} 1px, transparent 1px, transparent 14px)`,
      ]
    : [
        `radial-gradient(1080px 620px at 12% 0%, ${alpha(theme.palette.primary.main, scale(controls.heroDrama, 0.08, 0.14))} 0%, transparent 62%)`,
        `radial-gradient(940px 520px at 88% 10%, ${alpha(theme.palette.secondary.main, scale(controls.extravagance, 0.06, 0.1))} 0%, transparent 64%)`,
        `radial-gradient(1180px 680px at 52% 112%, ${alpha(theme.palette.info.main, scale(controls.luxuryLevel, 0.05, 0.09))} 0%, transparent 62%)`,
        `linear-gradient(180deg, ${alpha("#FFFFFF", 0.9)} 0%, ${alpha(theme.palette.background.default, 0.9)} 22%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
        `repeating-linear-gradient(0deg, ${alpha(theme.palette.text.primary, 0.03)} 0px, ${alpha(theme.palette.text.primary, 0.03)} 1px, transparent 1px, transparent 10px)`,
        `repeating-linear-gradient(90deg, ${alpha(theme.palette.text.primary, 0.024)} 0px, ${alpha(theme.palette.text.primary, 0.024)} 1px, transparent 1px, transparent 14px)`,
      ]
  ).join(", ");

const surface = (theme: Theme, controls: Controls, level: SurfaceLevel) => {
  const isDark = theme.palette.mode === "dark";
  const radius =
    Number(theme.shape.borderRadius) +
    (level === "overlay" ? 22 : level === "elevated" ? 14 : 8);
  const hard = level === "surface" ? 6 : level === "elevated" ? 8 : 12;
  const tint = isDark
    ? level === "surface"
      ? 0.8
      : level === "elevated"
        ? 0.84
        : 0.9
    : level === "surface"
      ? 0.93
      : level === "elevated"
        ? 0.96
        : 0.98;
  return {
    position: "relative" as const,
    isolation: "isolate" as const,
    overflow: "hidden" as const,
    borderRadius: radius,
    backgroundColor: alpha(theme.palette.background.paper, tint),
    backgroundImage: [
      `linear-gradient(180deg, ${alpha(theme.palette.common.white, isDark ? 0.09 : 0.46)} 0%, transparent 22%)`,
      `radial-gradient(420px 180px at 16% 0%, ${alpha(theme.palette.primary.main, isDark ? 0.18 : 0.1)} 0%, transparent 62%)`,
      `radial-gradient(340px 160px at 84% 0%, ${alpha(theme.palette.info.main, isDark ? 0.14 : 0.08)} 0%, transparent 64%)`,
    ].join(", "),
    border: `2px solid ${alpha(theme.palette.text.primary, isDark ? 0.72 : 0.88)}`,
    boxShadow: [
      `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.06 : 0.44)} inset`,
      hardShadow(theme, hard),
      `0 ${level === "surface" ? 20 : level === "elevated" ? 28 : 40}px ${level === "surface" ? 46 : level === "elevated" ? 62 : 78}px ${alpha("#000", isDark ? 0.34 : 0.15)}`,
      `0 0 ${Math.round(scale(controls.extravagance, 18, 34))}px ${alpha(theme.palette.primary.main, isDark ? 0.18 : 0.08)}`,
    ].join(", "),
    ...blurStyle(
      controls,
      level === "overlay" ? 10 : level === "elevated" ? 7 : 5,
      level === "overlay" ? 18 : level === "elevated" ? 12 : 8,
    ),
    "&::before": {
      content: '""',
      position: "absolute" as const,
      insetInline: 0,
      top: 0,
      height: level === "overlay" ? 4 : 3,
      backgroundImage: rail(
        theme,
        controls,
        level === "overlay" ? 1 : level === "elevated" ? 0.84 : 0.6,
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
      "@keyframes nbsScene": {
        "0%, 100%": {
          opacity: isDark ? 0.76 : 0.62,
          transform: "translate3d(0,0,0) scale(1)",
        },
        "50%": {
          opacity: isDark ? 0.92 : 0.78,
          transform: "translate3d(-1%,1%,0) scale(1.03)",
        },
      },
      "@keyframes nbsRise": {
        "0%": { transform: "translateY(8px)", opacity: 0 },
        "100%": { transform: "translateY(0)", opacity: 1 },
      },
      "*, *::before, *::after": { boxSizing: "border-box" },
      html: { scrollBehavior: "smooth" },
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundImage: stage(theme, controls, isDark),
        backgroundAttachment: "fixed",
        backgroundSize: "auto, auto, auto, auto, 32px 32px, 42px 42px",
      },
      "body::before": {
        content: '""',
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: rail(theme, controls, isDark ? 0.82 : 0.64),
        filter: `blur(${Math.round(scale(controls.heroDrama, 18, 28))}px)`,
        opacity: isDark ? 0.88 : 0.74,
        animation: `nbsScene ${motion(theme, controls, 9000, 12000)}ms ease-in-out infinite`,
      },
      ".nbs-surface-hero, [data-nbs-surface='hero']": surface(
        theme,
        controls,
        "overlay",
      ),
      ".nbs-surface-calm, [data-nbs-surface='calm']": {
        ...surface(theme, controls, "surface"),
        borderRadius: Number(theme.shape.borderRadius) + 12,
      },
      ".nbs-metric, [data-nbs-type='metric']": {
        fontFamily: FONT_MONO,
        letterSpacing: "-0.05em",
        textShadow: `0 0 22px ${alpha(theme.palette.primary.main, isDark ? 0.16 : 0.08)}`,
        animation: `nbsRise ${motion(theme, controls, 340, 520)}ms ease-out 1`,
      },
      "*::selection": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          isDark ? 0.28 : 0.22,
        ),
        color: isDark
          ? theme.palette.background.default
          : theme.palette.text.primary,
      },
      a: {
        color: isDark ? theme.palette.primary.light : theme.palette.info.dark,
        textDecorationColor: alpha(
          theme.palette.info.main,
          isDark ? 0.42 : 0.3,
        ),
        textDecorationThickness: "2px",
        textUnderlineOffset: "3px",
      },
      code: { fontFamily: FONT_MONO },
      "@media (hover: none), (pointer: coarse), (max-width: 900px)": {
        body: { backgroundAttachment: "scroll" },
        "body::before": {
          filter: `blur(${Math.round(scale(controls.heroDrama, 10, 18))}px)`,
          opacity: isDark ? 0.72 : 0.58,
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
        "body::before": { animation: "none" },
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
        borderRadius: Number(theme.shape.borderRadius) + 20,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.74 : 0.92,
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
          { duration: motion(theme, controls, 180, 280) },
        ),
        "&:hover": {
          transform: "translate(-2px, -2px)",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.08 : 0.5)} inset`,
            hardShadow(theme, 10),
            `0 26px 72px ${alpha("#000", isDark ? 0.46 : 0.2)}`,
            `0 0 36px ${alpha(theme.palette.secondary.main, isDark ? 0.22 : 0.1)}`,
          ].join(", "),
        },
      }),
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiTypography-h1": {
          textShadow: `0 0 24px ${alpha(theme.palette.primary.main, isDark ? 0.2 : 0.08)}`,
        },
        "&.MuiTypography-h2": {
          textShadow: `0 0 16px ${alpha(theme.palette.info.main, isDark ? 0.16 : 0.06)}`,
        },
        "&.MuiTypography-overline": {
          color: alpha(theme.palette.secondary.main, isDark ? 0.94 : 0.88),
        },
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.95em",
          padding: "0.12em 0.4em",
          borderRadius: 999,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.78 : 0.92,
          ),
          border: `2px solid ${alpha(theme.palette.text.primary, isDark ? 0.56 : 0.78)}`,
          boxShadow: hardShadow(theme, 3, isDark ? 0.42 : 0.58),
        },
      }),
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 0,
        height: 4,
        borderRadius: 999,
        backgroundColor: alpha(
          theme.palette.text.primary,
          isDark ? 0.18 : 0.12,
        ),
        backgroundImage: rail(theme, controls, 0.96, 90),
        boxShadow: `0 0 18px ${alpha(theme.palette.primary.main, isDark ? 0.16 : 0.06)}`,
      }),
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 18,
        paddingInline: 20,
        paddingBlock: 12,
        minHeight: 46,
        position: "relative",
        overflow: "hidden",
        transform: "translateZ(0)",
        transition: theme.transitions.create(
          [
            "transform",
            "box-shadow",
            "background-position",
            "background-color",
          ],
          { duration: motion(theme, controls, 150, 240) },
        ),
        "&:active": { transform: "translate(0, 0)" },
        "&.Mui-focusVisible": {
          outline: "none",
          boxShadow: focusRing(theme, controls),
        },
      }),
      sizeLarge: { minHeight: 54, paddingInline: 26, paddingBlock: 15 },
      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        backgroundImage: [
          `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.98)} 0%, ${alpha(theme.palette.primary.main, 0.98)} 42%, ${alpha(theme.palette.secondary.main, isDark ? 0.48 : 0.22)} 74%, ${alpha(theme.palette.info.main, isDark ? 0.42 : 0.18)} 100%)`,
          `linear-gradient(180deg, ${alpha(theme.palette.common.white, isDark ? 0.18 : 0.42)} 0%, transparent 42%)`,
        ].join(", "),
        backgroundSize: "160% 160%, 100% 100%",
        backgroundPosition: "0% 0%, 0 0",
        border: `2px solid ${alpha(theme.palette.text.primary, isDark ? 0.72 : 0.88)}`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.12 : 0.42)} inset`,
          hardShadow(theme, 8, isDark ? 0.7 : 0.88),
          `0 18px 52px ${alpha("#000", isDark ? 0.42 : 0.18)}`,
          `0 0 28px ${alpha(theme.palette.primary.main, scale(controls.ctaPower, isDark ? 0.18 : 0.06, isDark ? 0.28 : 0.12))}`,
        ].join(", "),
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: rail(theme, controls, isDark ? 0.46 : 0.28),
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translate(-2px, -2px)",
          backgroundPosition: "100% 0%, 0 0",
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.14 : 0.48)} inset`,
            hardShadow(theme, 10, isDark ? 0.72 : 0.9),
            `0 24px 68px ${alpha("#000", isDark ? 0.5 : 0.22)}`,
            `0 0 34px ${alpha(theme.palette.secondary.main, scale(controls.ctaPower, isDark ? 0.2 : 0.08, isDark ? 0.34 : 0.16))}`,
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
          isDark ? 0.78 : 0.94,
        ),
        backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.common.white, isDark ? 0.1 : 0.36)} 0%, transparent 44%)`,
        border: `2px solid ${alpha(theme.palette.secondary.main, isDark ? 0.58 : 0.34)}`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.06 : 0.32)} inset`,
          hardShadow(theme, 6, isDark ? 0.54 : 0.76),
        ].join(", "),
        "&:hover": {
          transform: "translate(-1px, -1px)",
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.84 : 0.98,
          ),
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.08 : 0.36)} inset`,
            hardShadow(theme, 7, isDark ? 0.58 : 0.8),
            `0 0 24px ${alpha(theme.palette.info.main, isDark ? 0.14 : 0.06)}`,
          ].join(", "),
        },
      }),
      textPrimary: ({ theme }) => ({
        color: isDark ? theme.palette.primary.light : theme.palette.info.dark,
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            isDark ? 0.12 : 0.07,
          ),
        },
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: theme.palette.text.primary,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.82 : 0.96,
        ),
        backgroundImage: [
          `linear-gradient(180deg, ${alpha(theme.palette.common.white, isDark ? 0.1 : 0.34)} 0%, transparent 44%)`,
          `linear-gradient(96deg, ${alpha(theme.palette.primary.main, isDark ? 0.22 : 0.12)} 0%, ${alpha(theme.palette.secondary.main, isDark ? 0.18 : 0.08)} 52%, ${alpha(theme.palette.info.main, isDark ? 0.2 : 0.08)} 100%)`,
        ].join(", "),
        border: `2px solid ${alpha(theme.palette.text.primary, isDark ? 0.68 : 0.84)}`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.06 : 0.28)} inset`,
          hardShadow(theme, 4, isDark ? 0.48 : 0.68),
          `0 0 18px ${alpha(theme.palette.primary.main, isDark ? 0.12 : 0.05)}`,
        ].join(", "),
      }),
      label: { paddingInline: 12 },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 14,
        border: `2px solid ${alpha(theme.palette.text.primary, isDark ? 0.5 : 0.72)}`,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.8 : 0.94,
        ),
        boxShadow: hardShadow(theme, 4, isDark ? 0.44 : 0.64),
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.88 : 0.98,
          ),
          boxShadow: [
            hardShadow(theme, 5, isDark ? 0.48 : 0.7),
            `0 0 22px ${alpha(theme.palette.secondary.main, isDark ? 0.14 : 0.06)}`,
          ].join(", "),
          transform: "translate(-1px, -1px)",
        },
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 18,
        border: `2px solid ${alpha(theme.palette.text.primary, isDark ? 0.44 : 0.68)}`,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.78 : 0.94,
        ),
        color: alpha(theme.palette.text.primary, 0.88),
        boxShadow: hardShadow(theme, 4, isDark ? 0.42 : 0.6),
        "&.Mui-selected": {
          color: theme.palette.text.primary,
          backgroundColor: alpha(
            theme.palette.background.paper,
            isDark ? 0.88 : 0.98,
          ),
          backgroundImage: rail(theme, controls, isDark ? 0.26 : 0.14),
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 16,
        backgroundColor: alpha(
          theme.palette.background.paper,
          isDark ? 0.8 : 0.95,
        ),
        backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.common.white, isDark ? 0.08 : 0.28)} 0%, transparent 44%)`,
        boxShadow: hardShadow(theme, 4, isDark ? 0.42 : 0.6),
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(
            theme.palette.secondary.main,
            isDark ? 0.56 : 0.34,
          ),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.info.main,
          boxShadow: focusRing(theme, controls),
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(theme.palette.text.primary, isDark ? 0.42 : 0.62),
        borderWidth: 2,
      }),
      input: { paddingBlock: 12 },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
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

export const neonBrutalistSprint = createPreset(
  "Neon Brutalist Sprint",
  neonComplianceLight,
  false,
  lightControls,
);
export const neonBrutalistSprintNight = createPreset(
  "Neon Brutalist Sprint (Night)",
  neonCompliance,
  true,
  darkControls,
);
