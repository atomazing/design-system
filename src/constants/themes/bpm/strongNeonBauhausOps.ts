import { alpha } from "@mui/material/styles";

import { neonBauhausOps, neonBauhausOpsNight } from "./neonBauhausOps";

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
  '"Sora","Space Grotesk","Avenir Next Condensed","Arial Black","Inter","Helvetica","Arial",sans-serif';
const FONT_TEXT =
  '"IBM Plex Sans","Inter","Manrope","Helvetica","Arial",sans-serif';
const FONT_MONO =
  '"IBM Plex Mono","JetBrains Mono","Roboto Mono","Menlo","Consolas",monospace';

const BAUHAUS_RADIUS = 18;

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
  luxuryLevel: 0.7,
  extravagance: 0.42,
  heroDrama: 0.5,
  ctaPower: 0.86,
  motionPolish: 0.62,
  blurBudget: 0.24,
});

const darkControls = createControls({
  luxuryLevel: 0.76,
  extravagance: 0.48,
  heroDrama: 0.56,
  ctaPower: 0.9,
  motionPolish: 0.66,
  blurBudget: 0.3,
});

const typography = {
  fontFamily: FONT_TEXT,
  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    fontSize: "clamp(2.65rem, 5vw, 4.4rem)",
    lineHeight: 0.92,
    letterSpacing: "-0.05em",
    textTransform: "uppercase",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 880,
    fontSize: "clamp(1.95rem, 3.4vw, 3rem)",
    lineHeight: 0.98,
    letterSpacing: "-0.035em",
    textTransform: "uppercase",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 820,
    fontSize: "clamp(1.28rem, 2vw, 1.82rem)",
    lineHeight: 1.12,
    letterSpacing: "-0.018em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 800,
    fontSize: "1.12rem",
    lineHeight: 1.2,
    letterSpacing: "-0.008em",
  },
  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 760,
    fontSize: "1rem",
    lineHeight: 1.5,
    letterSpacing: "0.008em",
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 780,
    fontSize: "0.88rem",
    lineHeight: 1.38,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.7,
    letterSpacing: "0.006em",
  },
  body2: {
    fontSize: "0.92rem",
    lineHeight: 1.62,
    letterSpacing: "0.004em",
  },
  button: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  caption: {
    fontFamily: FONT_MONO,
    fontSize: "0.76rem",
    letterSpacing: "0.02em",
  },
  overline: {
    fontFamily: FONT_MONO,
    fontSize: "0.72rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 800,
  },
} as const;

const strongInk = (theme: Theme): string =>
  theme.palette.mode === "dark" ? "#F7FAFF" : "#08111A";

const motion = (controls: Controls, min: number, max: number): number =>
  Math.round(scale(controls.motionPolish, min, max));

const rail = (
  theme: Theme,
  controls: Controls,
  opacity = 0.92,
  angle = 90,
): string =>
  `linear-gradient(${angle}deg, ${alpha(theme.palette.primary.main, opacity)} 0%, ${alpha(
    theme.palette.primary.main,
    opacity,
  )} 46%, ${alpha(theme.palette.warning.main, opacity * 0.74)} 46%, ${alpha(
    theme.palette.warning.main,
    opacity * 0.74,
  )} 68%, ${alpha(theme.palette.secondary.main, opacity * 0.6)} 68%, ${alpha(
    theme.palette.secondary.main,
    opacity * 0.6,
  )} 84%, ${alpha(strongInk(theme), opacity * 0.88)} 84%, ${alpha(
    strongInk(theme),
    opacity * 0.88,
  )} 100%)`;

const focusRing = (theme: Theme, controls: Controls, width = 3): string =>
  [
    `0 0 0 ${width}px ${alpha(
      theme.palette.background.default,
      theme.palette.mode === "dark" ? 0.94 : 0.98,
    )}`,
    `0 0 0 ${width + 3}px ${alpha(
      theme.palette.info.main,
      scale(controls.ctaPower, 0.22, 0.34),
    )}`,
    `0 0 ${Math.round(scale(controls.ctaPower, 14, 24))}px ${alpha(
      theme.palette.primary.main,
      scale(controls.extravagance, 0.08, 0.18),
    )}`,
  ].join(", ");

const shadow = (
  theme: Theme,
  controls: Controls,
  level: SurfaceLevel,
  accent = theme.palette.primary.main,
): string => {
  const isDark = theme.palette.mode === "dark";
  const y =
    level === "overlay"
      ? scale(controls.luxuryLevel, 14, 22)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 10, 16)
        : scale(controls.luxuryLevel, 6, 10);
  const blur =
    level === "overlay"
      ? scale(controls.luxuryLevel, 28, 42)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 18, 30)
        : scale(controls.luxuryLevel, 12, 22);
  const spread =
    level === "overlay"
      ? scale(controls.extravagance, 10, 18)
      : level === "elevated"
        ? scale(controls.extravagance, 8, 14)
        : scale(controls.extravagance, 6, 10);

  return [
    `0 ${Math.round(y)}px ${Math.round(blur)}px ${alpha(
      "#000000",
      isDark ? 0.38 : 0.14,
    )}`,
    `0 0 0 1px ${alpha(strongInk(theme), isDark ? 0.16 : 0.08)}`,
    `0 0 ${Math.round(spread)}px ${alpha(
      accent,
      isDark
        ? scale(controls.extravagance, 0.06, 0.1)
        : scale(controls.extravagance, 0.03, 0.06),
    )}`,
  ].join(", ");
};

const surface = (
  theme: Theme,
  controls: Controls,
  {
    level,
    radius,
    accent = theme.palette.primary.main,
  }: {
    level: SurfaceLevel;
    radius: number | string;
    accent?: string;
  },
) => {
  const isDark = theme.palette.mode === "dark";
  const fillAlpha =
    level === "overlay"
      ? isDark
        ? 0.9
        : 0.98
      : level === "elevated"
        ? isDark
          ? 0.86
          : 0.97
        : isDark
          ? 0.8
          : 0.95;
  const blur =
    level === "overlay"
      ? scale(controls.blurBudget, 6, 10)
      : level === "elevated"
        ? scale(controls.blurBudget, 4, 8)
        : scale(controls.blurBudget, 2, 6);

  return {
    position: "relative" as const,
    overflow: "hidden" as const,
    borderRadius: radius,
    border: `1px solid ${alpha(
      accent,
      isDark
        ? scale(controls.luxuryLevel, 0.18, 0.26)
        : scale(controls.luxuryLevel, 0.1, 0.16),
    )}`,
    backgroundColor: alpha(theme.palette.background.paper, fillAlpha),
    backgroundImage: [
      `linear-gradient(180deg, ${alpha(
        theme.palette.common.white,
        isDark ? 0.08 : 0.42,
      )} 0%, transparent 22%)`,
      `linear-gradient(150deg, ${alpha(
        accent,
        isDark ? 0.08 : 0.05,
      )} 0%, transparent 72%)`,
      `linear-gradient(90deg, transparent 0%, transparent 86%, ${alpha(
        theme.palette.secondary.main,
        isDark ? 0.22 : 0.14,
      )} 86%, ${alpha(theme.palette.secondary.main, isDark ? 0.22 : 0.14)} 100%)`,
    ].join(", "),
    boxShadow: shadow(theme, controls, level, accent),
    backdropFilter: `blur(${Math.round(blur)}px)`,
    WebkitBackdropFilter: `blur(${Math.round(blur)}px)`,
    "@media (hover: none), (max-width: 900px)": {
      backdropFilter: `blur(${Math.max(2, Math.round(blur * 0.6))}px)`,
      WebkitBackdropFilter: `blur(${Math.max(2, Math.round(blur * 0.6))}px)`,
    },
  };
};

const hoverState = (
  theme: Theme,
  controls: Controls,
  {
    accent = theme.palette.primary.main,
    level = "elevated",
    translate = "translate(-1px, -1px)",
  }: {
    accent?: string;
    level?: SurfaceLevel;
    translate?: string;
  } = {},
) => ({
  transform: translate,
  borderColor: alpha(accent, theme.palette.mode === "dark" ? 0.34 : 0.22),
  boxShadow: [
    shadow(theme, controls, level, accent),
    `0 0 ${Math.round(scale(controls.ctaPower, 12, 22))}px ${alpha(
      accent,
      scale(controls.extravagance, 0.06, 0.12),
    )}`,
  ].join(", "),
});

const stage = (theme: Theme, controls: Controls): string => {
  const isDark = theme.palette.mode === "dark";

  return [
    `radial-gradient(960px 580px at 12% 8%, ${alpha(
      theme.palette.primary.main,
      scale(controls.heroDrama, isDark ? 0.1 : 0.06, isDark ? 0.16 : 0.1),
    )} 0%, transparent 58%)`,
    `radial-gradient(860px 520px at 88% 14%, ${alpha(
      theme.palette.secondary.main,
      scale(controls.heroDrama, isDark ? 0.08 : 0.05, isDark ? 0.14 : 0.08),
    )} 0%, transparent 54%)`,
    `radial-gradient(900px 540px at 40% 108%, ${alpha(
      theme.palette.warning.main,
      scale(controls.heroDrama, isDark ? 0.08 : 0.05, isDark ? 0.14 : 0.08),
    )} 0%, transparent 56%)`,
    `linear-gradient(180deg, transparent 0%, transparent 62%, ${alpha(
      theme.palette.background.default,
      isDark ? 0.42 : 0.22,
    )} 100%)`,
    `linear-gradient(0deg, ${alpha(
      strongInk(theme),
      isDark ? 0.06 : 0.045,
    )} 1px, transparent 1px)`,
    `linear-gradient(90deg, ${alpha(
      strongInk(theme),
      isDark ? 0.06 : 0.04,
    )} 1px, transparent 1px)`,
  ].join(", ");
};

const createComponents = (controls: Controls): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      "*, *::before, *::after": {
        boxSizing: "border-box",
      },
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        backgroundImage: stage(theme, controls),
        backgroundSize: "auto, auto, auto, auto, 36px 36px, 36px 36px",
        backgroundAttachment: "scroll",
      },
      "body::before": {
        content: '""',
        position: "fixed",
        insetInline: 0,
        insetBlockStart: 0,
        height: 4,
        backgroundImage: rail(theme, controls, 0.9, 90),
        boxShadow: `0 0 16px ${alpha(
          theme.palette.primary.main,
          scale(controls.extravagance, 0.08, 0.16),
        )}`,
        pointerEvents: "none",
        zIndex: 1,
      },
      "@media (prefers-reduced-motion: reduce)": {
        "*, *::before, *::after": {
          scrollBehavior: "auto",
          transitionDuration: "0.01ms !important",
          animationDuration: "0.01ms !important",
          animationIterationCount: "1 !important",
        },
      },
      "*::selection": {
        backgroundColor: alpha(theme.palette.warning.main, 0.34),
        color: theme.palette.text.primary,
      },
      a: {
        color: theme.palette.primary.main,
        textDecorationColor: alpha(theme.palette.secondary.main, 0.46),
        textDecorationThickness: "2px",
        textUnderlineOffset: "3px",
      },
      code: {
        fontFamily: FONT_MONO,
      },
    }),
  },
  MuiContainer: {
    defaultProps: {
      maxWidth: "lg",
    },
    styleOverrides: {
      root: ({ theme }) => ({
        position: "relative",
        zIndex: 1,
        paddingInline: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
          paddingInline: theme.spacing(3),
        },
      }),
    },
  },
  MuiAppBar: {
    defaultProps: {
      color: "transparent" as const,
      elevation: 0,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        ...surface(theme, controls, {
          level: "surface",
          radius: "20px 10px 20px 10px",
          accent: theme.palette.primary.main,
        }),
        marginInline: theme.spacing(1),
        marginTop: theme.spacing(1),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          { duration: motion(controls, 180, 240) },
        ),
        "&::after": {
          content: '""',
          position: "absolute",
          insetInline: 0,
          insetBlockEnd: 0,
          height: 3,
          backgroundImage: rail(theme, controls, 0.88, 90),
        },
      }),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...surface(theme, controls, {
          level: "surface",
          radius: "24px 10px 24px 10px",
          accent: theme.palette.secondary.main,
        }),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          { duration: motion(controls, 160, 220) },
        ),
        "@media (hover: hover)": {
          "&:hover": hoverState(theme, controls, {
            accent: theme.palette.secondary.main,
            level: "elevated",
          }),
        },
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...surface(theme, controls, {
          level: "elevated",
          radius: "28px 12px 28px 12px",
          accent: theme.palette.warning.main,
        }),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          { duration: motion(controls, 180, 240) },
        ),
        "@media (hover: hover)": {
          "&:hover": hoverState(theme, controls, {
            accent: theme.palette.warning.main,
            level: "overlay",
          }),
        },
      }),
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiTypography-h1, &.MuiTypography-h2": {
          display: "inline-block",
          backgroundImage: `linear-gradient(transparent 0%, transparent 74%, ${alpha(
            theme.palette.warning.main,
            theme.palette.mode === "dark" ? 0.16 : 0.24,
          )} 74%, ${alpha(
            theme.palette.warning.main,
            theme.palette.mode === "dark" ? 0.16 : 0.24,
          )} 100%)`,
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
        },
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.94em",
          padding: "0.12em 0.42em",
          borderRadius: 10,
          backgroundColor: alpha(
            theme.palette.warning.main,
            theme.palette.mode === "dark" ? 0.14 : 0.18,
          ),
          border: `1px solid ${alpha(strongInk(theme), 0.14)}`,
        },
      }),
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 0,
        height: 2,
        backgroundImage: rail(theme, controls, 0.88, 90),
      }),
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 48,
        paddingInline: 20,
        paddingBlock: 12,
        borderRadius: BAUHAUS_RADIUS,
        borderWidth: 1,
        borderStyle: "solid",
        fontWeight: 900,
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background-position", "border-color"],
          { duration: motion(controls, 140, 220) },
        ),
        "&.Mui-focusVisible": {
          boxShadow: focusRing(theme, controls, 3),
        },
        "&:active": {
          transform: "translate(0, 0)",
        },
        "&.Mui-disabled": {
          boxShadow: "none",
          transform: "none",
        },
      }),
      sizeLarge: {
        minHeight: 54,
        paddingInline: 24,
        paddingBlock: 14,
      },
      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        borderColor: alpha(theme.palette.primary.main, 0.14),
        backgroundColor: theme.palette.primary.main,
        backgroundImage: [
          `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.96,
          )} 0%, ${alpha(theme.palette.primary.main, 0.9)} 50%, ${alpha(
            theme.palette.warning.main,
            0.78,
          )} 100%)`,
          rail(theme, controls, 0.22, 132),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        backgroundSize: `${Math.round(scale(controls.ctaPower, 140, 176))}% 150%, 100% 100%`,
        backgroundPosition: "0% 50%, 0 0",
        boxShadow: [
          shadow(theme, controls, "elevated", theme.palette.primary.main),
          `inset 0 1px 0 ${alpha(theme.palette.common.white, 0.28)}`,
        ].join(", "),
        "@media (hover: hover)": {
          "&:hover": {
            ...hoverState(theme, controls, {
              accent: theme.palette.primary.main,
              level: "overlay",
              translate: "translate(-1px, -1px)",
            }),
            backgroundPosition: "100% 50%, 0 0",
          },
        },
      }),
      containedSecondary: ({ theme }) => ({
        color: theme.palette.secondary.contrastText,
        borderColor: alpha(theme.palette.secondary.main, 0.2),
        backgroundColor: theme.palette.secondary.main,
        backgroundImage: [
          `linear-gradient(135deg, ${alpha(
            theme.palette.secondary.main,
            0.94,
          )} 0%, ${alpha(theme.palette.secondary.main, 0.88)} 64%, ${alpha(
            theme.palette.primary.main,
            0.68,
          )} 100%)`,
          rail(theme, controls, 0.18, 132),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        boxShadow: shadow(
          theme,
          controls,
          "surface",
          theme.palette.secondary.main,
        ),
        "@media (hover: hover)": {
          "&:hover": hoverState(theme, controls, {
            accent: theme.palette.secondary.main,
            level: "elevated",
          }),
        },
      }),
      outlinedPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderColor: alpha(
          strongInk(theme),
          theme.palette.mode === "dark" ? 0.3 : 0.18,
        ),
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.78 : 0.9,
        ),
        backgroundImage: [
          `linear-gradient(180deg, ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.06 : 0.26,
          )} 0%, transparent 48%)`,
          rail(theme, controls, 0.1, 132),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        boxShadow: shadow(
          theme,
          controls,
          "surface",
          theme.palette.warning.main,
        ),
        "@media (hover: hover)": {
          "&:hover": hoverState(theme, controls, {
            accent: theme.palette.warning.main,
            level: "elevated",
          }),
        },
      }),
      textPrimary: ({ theme }) => ({
        color: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        border: `1px solid ${alpha(
          strongInk(theme),
          theme.palette.mode === "dark" ? 0.26 : 0.14,
        )}`,
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: theme.palette.text.primary,
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.84 : 0.94,
        ),
        backgroundImage: [
          `linear-gradient(180deg, ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.08 : 0.24,
          )} 0%, transparent 44%)`,
          rail(theme, controls, 0.12, 132),
        ].join(", "),
        boxShadow: shadow(
          theme,
          controls,
          "surface",
          theme.palette.primary.main,
        ),
        "&.Mui-focusVisible": {
          boxShadow: [
            shadow(theme, controls, "surface", theme.palette.primary.main),
            focusRing(theme, controls, 2),
          ].join(", "),
        },
      }),
      label: {
        paddingInline: 12,
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 48,
        ...surface(theme, controls, {
          level: "surface",
          radius: 999,
          accent: theme.palette.primary.main,
        }),
        padding: theme.spacing(0.5),
      }),
      indicator: ({ theme }) => ({
        height: "calc(100% - 8px)",
        top: 4,
        borderRadius: 999,
        backgroundImage: rail(theme, controls, 0.8, 132),
        boxShadow: `0 0 14px ${alpha(
          theme.palette.primary.main,
          scale(controls.extravagance, 0.08, 0.16),
        )}`,
      }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 48,
        borderRadius: BAUHAUS_RADIUS,
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: alpha(theme.palette.text.primary, 0.74),
        transition: theme.transitions.create(
          ["background-color", "color", "box-shadow"],
          { duration: motion(controls, 120, 180) },
        ),
        "&:hover": {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          boxShadow: `inset 0 -2px 0 ${alpha(theme.palette.primary.main, 0.22)}`,
        },
        "&.Mui-selected": {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.warning.main, 0.12),
        },
        "&.Mui-focusVisible": {
          boxShadow: focusRing(theme, controls, 2),
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...surface(theme, controls, {
          level: "surface",
          radius: BAUHAUS_RADIUS,
          accent: theme.palette.primary.main,
        }),
        transition: theme.transitions.create(
          ["box-shadow", "border-color", "background-color"],
          { duration: motion(controls, 140, 220) },
        ),
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(
            strongInk(theme),
            theme.palette.mode === "dark" ? 0.26 : 0.14,
          ),
          borderWidth: 2,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(
            theme.palette.secondary.main,
            theme.palette.mode === "dark" ? 0.44 : 0.24,
          ),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.info.main,
          boxShadow: focusRing(theme, controls, 3),
        },
      }),
      input: {
        paddingBlock: 13,
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: alpha(theme.palette.text.secondary, 0.96),
        "&.Mui-focused": {
          color: theme.palette.info.main,
        },
      }),
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        padding: 10,
      },
      thumb: ({ theme }) => ({
        borderRadius: "50%",
        boxShadow: `0 0 0 2px ${alpha(strongInk(theme), 0.16)}`,
        backgroundColor: theme.palette.background.paper,
      }),
      track: ({ theme }) => ({
        borderRadius: 999,
        border: `2px solid ${alpha(
          strongInk(theme),
          theme.palette.mode === "dark" ? 0.24 : 0.14,
        )}`,
        backgroundImage: rail(theme, controls, 0.18, 90),
        opacity: 1,
      }),
      switchBase: ({ theme }) => ({
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
        "&.Mui-checked": {
          color: theme.palette.secondary.main,
          "& + .MuiSwitch-track": {
            backgroundImage: rail(theme, controls, 0.34, 90),
            opacity: 1,
          },
        },
        "&.Mui-focusVisible + .MuiSwitch-track": {
          boxShadow: focusRing(theme, controls, 2),
        },
      }),
    },
  },
  MuiSlider: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.primary.main,
        height: 8,
        "&:hover .MuiSlider-thumb": {
          boxShadow: focusRing(theme, controls, 2),
        },
      }),
      rail: ({ theme }) => ({
        height: 8,
        opacity: 1,
        backgroundColor: alpha(strongInk(theme), 0.12),
      }),
      track: ({ theme }) => ({
        height: 8,
        border: "none",
        backgroundImage: rail(theme, controls, 0.92, 90),
      }),
      thumb: ({ theme }) => ({
        width: 18,
        height: 18,
        borderRadius: "50%",
        border: `2px solid ${alpha(
          strongInk(theme),
          theme.palette.mode === "dark" ? 0.24 : 0.14,
        )}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: shadow(
          theme,
          controls,
          "surface",
          theme.palette.warning.main,
        ),
        "&.Mui-focusVisible": {
          boxShadow: [
            shadow(theme, controls, "surface", theme.palette.warning.main),
            focusRing(theme, controls, 2),
          ].join(", "),
        },
      }),
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...surface(theme, controls, {
          level: "surface",
          radius: "20px 10px 20px 10px",
          accent: theme.palette.secondary.main,
        }),
        "&::before": {
          content: '""',
          position: "absolute",
          insetInlineStart: 0,
          insetBlockStart: 0,
          width: 8,
          height: "100%",
          backgroundImage: rail(theme, controls, 0.88, 180),
        },
      }),
      standardInfo: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.info.main, 0.12),
      }),
      standardSuccess: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.success.main, 0.12),
      }),
      standardWarning: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.warning.main, 0.14),
      }),
      standardError: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.secondary.main, 0.12),
      }),
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...surface(theme, controls, {
          level: "surface",
          radius: "24px 10px 24px 10px",
          accent: theme.palette.primary.main,
        }),
        "&::before": {
          display: "none",
        },
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 58,
        paddingInline: theme.spacing(2.5),
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.14)}`,
        },
        "&.Mui-focusVisible": {
          boxShadow: focusRing(theme, controls, 2),
        },
      }),
      content: {
        margin: 0,
        "& .MuiTypography-root": {
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          textTransform: "uppercase",
        },
      },
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...surface(theme, controls, {
          level: "elevated",
          radius: "24px 10px 24px 10px",
          accent: theme.palette.warning.main,
        }),
      }),
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiTableCell-head:nth-of-type(3n + 1)": {
          backgroundColor: alpha(theme.palette.primary.main, 0.14),
        },
        "& .MuiTableCell-head:nth-of-type(3n + 2)": {
          backgroundColor: alpha(theme.palette.warning.main, 0.16),
        },
        "& .MuiTableCell-head:nth-of-type(3n)": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.12),
        },
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }) => ({
        borderBottom: `2px solid ${alpha(
          strongInk(theme),
          theme.palette.mode === "dark" ? 0.2 : 0.14,
        )}`,
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }),
      body: ({ theme }) => ({
        borderBottom: `1px solid ${alpha(strongInk(theme), 0.08)}`,
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 999,
        border: `1px solid ${alpha(strongInk(theme), 0.14)}`,
        backgroundColor: alpha(strongInk(theme), 0.08),
      }),
      bar: ({ theme }) => ({
        borderRadius: 999,
        backgroundImage: rail(theme, controls, 0.92, 90),
      }),
    },
  },
  MuiTooltip: {
    defaultProps: {
      arrow: true,
    },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...surface(theme, controls, {
          level: "overlay",
          radius: "16px 8px 16px 8px",
          accent: theme.palette.secondary.main,
        }),
        color: theme.palette.text.primary,
        fontSize: "0.82rem",
      }),
      arrow: ({ theme }) => ({
        color: theme.palette.background.paper,
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...surface(theme, controls, {
          level: "overlay",
          radius: "30px 12px 30px 12px",
          accent: theme.palette.warning.main,
        }),
      }),
    },
  },
});

const createPreset = (
  name: string,
  baseTheme: NamedThemeOptions,
  isDark: boolean,
  controls: Controls,
): NamedThemeOptions => ({
  ...baseTheme,
  name,
  direction: "ltr",
  palette: {
    ...baseTheme.palette,
    mode: isDark ? "dark" : "light",
    background: isDark
      ? {
          default: "#08111A",
          paper: "#101B28",
        }
      : {
          default: "#F4F8FC",
          paper: "#FFFFFF",
        },
    text: isDark
      ? {
          primary: "#F7FAFF",
          secondary: alpha("#F7FAFF", 0.78),
          disabled: alpha("#F7FAFF", 0.46),
        }
      : {
          primary: "#08111A",
          secondary: alpha("#08111A", 0.74),
          disabled: alpha("#08111A", 0.46),
        },
    divider: isDark ? alpha("#F7FAFF", 0.18) : alpha("#08111A", 0.18),
    action: {
      ...baseTheme.palette?.action,
      hover: alpha("#00D2FF", isDark ? 0.16 : 0.1),
      selected: alpha("#00D2FF", isDark ? 0.22 : 0.16),
      focus: alpha("#9FA9EA", isDark ? 0.3 : 0.22),
      active: alpha(isDark ? "#F7FAFF" : "#08111A", 0.6),
      disabled: alpha(isDark ? "#F7FAFF" : "#08111A", 0.34),
      disabledBackground: alpha(
        isDark ? "#F7FAFF" : "#08111A",
        isDark ? 0.08 : 0.06,
      ),
    },
  },
  typography,
  shape: baseTheme.shape ?? neonBauhausOps.shape ?? { borderRadius: 8 },
  spacing: baseTheme.spacing ?? neonBauhausOps.spacing ?? 8,
  components: createComponents(controls),
});

export const strongNeonBauhausOps = createPreset(
  "Strong Neon Bauhaus Ops",
  neonBauhausOps,
  false,
  lightControls,
) satisfies NamedThemeOptions;

export const strongNeonBauhausOpsNight = createPreset(
  "Strong Neon Bauhaus Ops (Night)",
  neonBauhausOpsNight,
  true,
  darkControls,
) satisfies NamedThemeOptions;
