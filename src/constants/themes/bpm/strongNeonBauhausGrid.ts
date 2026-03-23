import { alpha } from "@mui/material/styles";

import { neonBauhausGrid, neonBauhausGridNight } from "./neonBauhausGrid";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

const FONT_DISPLAY =
  '"Sora","Space Grotesk","Avenir Next Condensed","Arial Black","Inter","Helvetica","Arial",sans-serif';
const FONT_TEXT =
  '"IBM Plex Sans","Inter","Manrope","Helvetica","Arial",sans-serif';
const FONT_MONO =
  '"IBM Plex Mono","JetBrains Mono","Roboto Mono","Menlo","Consolas",monospace';

const BAUHAUS_RADIUS = 0;

interface BauhausStrongControls {
  luxuryLevel: number;
  extravagance: number;
  heroDrama: number;
  ctaPower: number;
  motionPolish: number;
  blurBudget: number;
}

type SurfaceLevel = "surface" | "elevated" | "overlay";

const clampUnit = (value: number): number => Math.min(1, Math.max(0, value));

const scale = (value: number, min: number, max: number): number =>
  min + (max - min) * clampUnit(value);

const createControls = (
  controls: BauhausStrongControls,
): BauhausStrongControls => ({
  luxuryLevel: clampUnit(controls.luxuryLevel),
  extravagance: clampUnit(controls.extravagance),
  heroDrama: clampUnit(controls.heroDrama),
  ctaPower: clampUnit(controls.ctaPower),
  motionPolish: clampUnit(controls.motionPolish),
  blurBudget: clampUnit(controls.blurBudget),
});

const lightControls = createControls({
  luxuryLevel: 0.62,
  extravagance: 0.28,
  heroDrama: 0.46,
  ctaPower: 0.82,
  motionPolish: 0.42,
  blurBudget: 0.1,
});

const darkControls = createControls({
  luxuryLevel: 0.66,
  extravagance: 0.32,
  heroDrama: 0.52,
  ctaPower: 0.84,
  motionPolish: 0.46,
  blurBudget: 0.12,
});

const typography = {
  fontFamily: FONT_TEXT,
  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    fontSize: "clamp(2.9rem, 5.2vw, 4.8rem)",
    lineHeight: 0.9,
    letterSpacing: "-0.055em",
    textTransform: "uppercase",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
    lineHeight: 0.94,
    letterSpacing: "-0.04em",
    textTransform: "uppercase",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 820,
    fontSize: "clamp(1.3rem, 2.1vw, 1.85rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.018em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 800,
    fontSize: "1.14rem",
    lineHeight: 1.18,
    letterSpacing: "-0.01em",
  },
  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 760,
    fontSize: "1rem",
    lineHeight: 1.42,
    letterSpacing: "0.01em",
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 820,
    fontSize: "0.88rem",
    lineHeight: 1.36,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.68,
    letterSpacing: "0.006em",
  },
  body2: {
    fontSize: "0.9rem",
    lineHeight: 1.58,
    letterSpacing: "0.005em",
  },
  button: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },
  caption: {
    fontFamily: FONT_MONO,
    fontSize: "0.76rem",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  overline: {
    fontFamily: FONT_DISPLAY,
    fontSize: "0.72rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    fontWeight: 900,
  },
} as const;

const bauhausInk = (theme: Theme): string =>
  theme.palette.mode === "dark" ? "#FFFFFF" : "#0C141C";

const bauhausRail = (theme: Theme, opacity = 0.86, angle = 90): string =>
  `linear-gradient(${angle}deg, ${alpha(theme.palette.primary.main, opacity)} 0%, ${alpha(
    theme.palette.primary.main,
    opacity,
  )} 62%, ${alpha(theme.palette.secondary.main, opacity * 0.48)} 62%, ${alpha(
    theme.palette.secondary.main,
    opacity * 0.48,
  )} 78%, ${alpha(theme.palette.warning.main, opacity * 0.3)} 78%, ${alpha(
    theme.palette.warning.main,
    opacity * 0.3,
  )} 88%, ${alpha(bauhausInk(theme), opacity * 0.62)} 88%, ${alpha(
    bauhausInk(theme),
    opacity * 0.62,
  )} 100%)`;

const focusRing = (
  theme: Theme,
  controls: BauhausStrongControls,
  width = 3,
): string =>
  [
    `0 0 0 ${width}px ${alpha(
      theme.palette.info.main,
      scale(controls.ctaPower, 0.18, 0.26),
    )}`,
    `0 0 0 ${width + 2}px ${alpha(
      bauhausInk(theme),
      theme.palette.mode === "dark" ? 0.12 : 0.08,
    )}`,
  ].join(", ");

const surfaceShadow = (
  theme: Theme,
  controls: BauhausStrongControls,
  level: SurfaceLevel,
  accent = theme.palette.primary.main,
): string => {
  const isDark = theme.palette.mode === "dark";
  const lift =
    level === "overlay"
      ? scale(controls.luxuryLevel, 10, 14)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 7, 10)
        : scale(controls.luxuryLevel, 4, 6);
  const blur =
    level === "overlay"
      ? scale(controls.luxuryLevel, 18, 24)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 12, 18)
        : scale(controls.luxuryLevel, 8, 12);
  const accentOutline =
    level === "overlay"
      ? scale(controls.extravagance, 0.12, 0.18)
      : level === "elevated"
        ? scale(controls.extravagance, 0.08, 0.14)
        : scale(controls.extravagance, 0.06, 0.1);

  return [
    `0 ${Math.round(lift)}px ${Math.round(blur)}px ${alpha(
      bauhausInk(theme),
      isDark ? 0.22 : 0.08,
    )}`,
    `0 0 0 1px ${alpha(bauhausInk(theme), isDark ? 0.28 : 0.16)}`,
    `0 0 0 3px ${alpha(accent, accentOutline)}`,
  ].join(", ");
};

const panelSurface = (
  theme: Theme,
  controls: BauhausStrongControls,
  level: SurfaceLevel,
  accent = theme.palette.primary.main,
  radius: number | string = 0,
) => {
  const isDark = theme.palette.mode === "dark";
  const fillAlpha =
    level === "overlay"
      ? scale(controls.luxuryLevel, isDark ? 0.94 : 0.96, isDark ? 0.97 : 0.99)
      : level === "elevated"
        ? scale(controls.luxuryLevel, isDark ? 0.9 : 0.94, isDark ? 0.95 : 0.98)
        : scale(
            controls.luxuryLevel,
            isDark ? 0.88 : 0.92,
            isDark ? 0.93 : 0.96,
          );

  return {
    position: "relative" as const,
    overflow: "hidden" as const,
    border: `2px solid ${alpha(bauhausInk(theme), isDark ? 0.22 : 0.14)}`,
    borderRadius: radius,
    backgroundColor: alpha(theme.palette.background.paper, fillAlpha),
    backgroundImage: [
      `linear-gradient(180deg, ${alpha(theme.palette.common.white, isDark ? 0.08 : 0.5)} 0 1px, transparent 1px 100%)`,
      `linear-gradient(90deg, ${alpha(
        accent,
        scale(controls.extravagance, 0.08, 0.14),
      )} 0 10px, transparent 10px 100%)`,
      `repeating-linear-gradient(0deg, transparent 0 24px, ${alpha(
        bauhausInk(theme),
        isDark ? 0.035 : 0.025,
      )} 24px 25px)`,
      `linear-gradient(180deg, ${alpha(
        theme.palette.background.paper,
        Math.min(0.99, fillAlpha + 0.03),
      )} 0%, ${alpha(theme.palette.background.paper, fillAlpha)} 100%)`,
      bauhausRail(theme, scale(controls.extravagance, 0.1, 0.18), 90),
    ].join(", "),
    backgroundOrigin:
      "padding-box, padding-box, padding-box, padding-box, border-box",
    backgroundClip:
      "padding-box, padding-box, padding-box, padding-box, border-box",
    boxShadow: surfaceShadow(theme, controls, level, accent),
  };
};

const hoverState = (
  theme: Theme,
  controls: BauhausStrongControls,
  accent = theme.palette.primary.main,
  level: SurfaceLevel = "elevated",
  translate = "translateY(-1px)",
) => ({
  transform: translate,
  borderColor: alpha(accent, theme.palette.mode === "dark" ? 0.38 : 0.28),
  boxShadow: [
    surfaceShadow(theme, controls, level, accent),
    `0 0 0 4px ${alpha(accent, scale(controls.extravagance, 0.06, 0.1))}`,
  ].join(", "),
});

const mergeComponents = (
  base: ThemeOptions["components"],
  next: ThemeOptions["components"],
): ThemeOptions["components"] => ({
  ...base,
  ...next,
});

const createComponents = (
  controls: BauhausStrongControls,
): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => {
      const isDark = theme.palette.mode === "dark";

      return {
        "@keyframes bauhausRailDrift": {
          "0%": {
            transform: "translate3d(-2%, 0, 0)",
            opacity: 0.7,
          },
          "50%": {
            transform: "translate3d(0, 0, 0)",
            opacity: 0.84,
          },
          "100%": {
            transform: "translate3d(2%, 0, 0)",
            opacity: 0.72,
          },
        },
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          backgroundImage: [
            `radial-gradient(720px 420px at 14% 10%, ${alpha(
              theme.palette.primary.main,
              scale(
                controls.heroDrama,
                isDark ? 0.12 : 0.14,
                isDark ? 0.18 : 0.2,
              ),
            )} 0%, transparent 62%)`,
            `radial-gradient(580px 340px at 86% 16%, ${alpha(
              theme.palette.secondary.main,
              scale(
                controls.heroDrama,
                isDark ? 0.08 : 0.1,
                isDark ? 0.14 : 0.16,
              ),
            )} 0%, transparent 58%)`,
            `linear-gradient(0deg, ${alpha(
              bauhausInk(theme),
              isDark ? 0.06 : 0.045,
            )} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${alpha(
              bauhausInk(theme),
              isDark ? 0.06 : 0.04,
            )} 1px, transparent 1px)`,
            `linear-gradient(180deg, transparent 0%, transparent 72%, ${alpha(
              theme.palette.background.default,
              isDark ? 0.22 : 0.12,
            )} 100%)`,
          ].join(", "),
          backgroundSize: "auto, auto, 40px 40px, 40px 40px, auto",
          backgroundAttachment: "fixed",
        },
        "body::before": {
          content: '""',
          position: "fixed",
          insetInlineStart: 0,
          insetBlockStart: "7vh",
          width: "34vw",
          minWidth: 240,
          maxWidth: 520,
          height: 10,
          backgroundImage: bauhausRail(
            theme,
            scale(controls.heroDrama, 0.28, 0.44),
            90,
          ),
          filter: `blur(${Math.round(scale(controls.blurBudget, 2, 6))}px)`,
          pointerEvents: "none",
          opacity: 0.8,
          transform: "translate3d(-2%, 0, 0)",
          animation: `bauhausRailDrift ${Math.round(
            scale(controls.motionPolish, 18, 14),
          )}s linear infinite alternate`,
        },
        "body::after": {
          content: '""',
          position: "fixed",
          insetInline: 0,
          insetBlockStart: 0,
          height: 3,
          backgroundImage: bauhausRail(theme, 0.92, 90),
          boxShadow: `0 0 0 1px ${alpha(
            bauhausInk(theme),
            isDark ? 0.12 : 0.08,
          )}`,
          pointerEvents: "none",
        },
        "@media (prefers-reduced-motion: reduce)": {
          "body::before": {
            animation: "none",
            transform: "translate3d(0, 0, 0)",
          },
        },
        "@media (hover: none), (max-width: 900px)": {
          body: {
            backgroundAttachment: "scroll",
          },
          "body::before": {
            width: "48vw",
            filter: "none",
          },
        },
        "*::selection": {
          backgroundColor: alpha(theme.palette.warning.main, 0.32),
          color: theme.palette.text.primary,
        },
        a: {
          color: theme.palette.primary.main,
          textDecorationColor: alpha(theme.palette.primary.main, 0.3),
          textDecorationThickness: "2px",
          textUnderlineOffset: "4px",
        },
        code: {
          fontFamily: FONT_MONO,
        },
      };
    },
  },
  MuiAppBar: {
    defaultProps: {
      color: "transparent" as const,
      elevation: 0,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        ...panelSurface(theme, controls, "surface", theme.palette.primary.main),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 140, 210)),
          },
        ),
        marginInline: theme.spacing(1),
        marginTop: theme.spacing(1),
        "@media (hover: hover)": {
          "&:hover": hoverState(
            theme,
            controls,
            theme.palette.primary.main,
            "elevated",
          ),
        },
        "&::after": {
          content: '""',
          position: "absolute",
          insetInline: 0,
          insetBlockEnd: 0,
          height: 3,
          backgroundImage: bauhausRail(theme, 0.92, 90),
        },
      }),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...panelSurface(
          theme,
          controls,
          "surface",
          theme.palette.secondary.main,
        ),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 140, 210)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": hoverState(
            theme,
            controls,
            theme.palette.secondary.main,
            "elevated",
          ),
        },
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...panelSurface(
          theme,
          controls,
          "elevated",
          theme.palette.warning.main,
        ),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 140, 210)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": hoverState(
            theme,
            controls,
            theme.palette.warning.main,
            "overlay",
          ),
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
            theme.palette.mode === "dark" ? 0.14 : 0.18,
          )} 74%, ${alpha(
            theme.palette.warning.main,
            theme.palette.mode === "dark" ? 0.14 : 0.18,
          )} 100%)`,
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
          textShadow: "none",
        },
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.95em",
          padding: "0.14em 0.42em",
          borderRadius: 0,
          backgroundColor: alpha(
            theme.palette.info.main,
            theme.palette.mode === "dark" ? 0.14 : 0.18,
          ),
          border: `1px solid ${alpha(bauhausInk(theme), 0.18)}`,
        },
      }),
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 0,
        height: 2,
        backgroundImage: `repeating-linear-gradient(90deg, ${alpha(
          theme.palette.primary.main,
          0.82,
        )} 0 16px, transparent 16px 32px)`,
        boxShadow: `0 0 0 1px ${alpha(bauhausInk(theme), 0.18)}`,
      }),
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        position: "relative",
        overflow: "hidden",
        minHeight: 48,
        paddingInline: 20,
        paddingBlock: 12,
        borderRadius: BAUHAUS_RADIUS,
        borderWidth: 2,
        borderStyle: "solid",
        fontWeight: 900,
        transition: theme.transitions.create(
          [
            "transform",
            "box-shadow",
            "background-color",
            "filter",
            "border-color",
          ],
          {
            duration: Math.round(scale(controls.motionPolish, 120, 190)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": {
            filter: "brightness(1.04) saturate(1.04)",
          },
        },
        "&.Mui-focusVisible": {
          boxShadow: focusRing(theme, controls, 3),
        },
        "&:active": {
          transform: "translate(0, 0)",
        },
        "&.Mui-disabled": {
          transform: "none",
          boxShadow: "none",
        },
      }),
      sizeLarge: {
        minHeight: 54,
        paddingInline: 24,
        paddingBlock: 14,
      },
      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        borderColor: alpha(bauhausInk(theme), 0.18),
        backgroundColor: theme.palette.primary.main,
        backgroundImage: [
          `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.98)} 0 72%, ${alpha(
            theme.palette.secondary.main,
            0.78,
          )} 72% 100%)`,
          `linear-gradient(180deg, ${alpha(theme.palette.common.white, 0.18)} 0 2px, transparent 2px calc(100% - 2px), ${alpha(
            bauhausInk(theme),
            0.18,
          )} calc(100% - 2px) 100%)`,
        ].join(", "),
        backgroundOrigin: "padding-box, padding-box",
        backgroundClip: "padding-box, padding-box",
        boxShadow: surfaceShadow(
          theme,
          controls,
          "elevated",
          theme.palette.primary.main,
        ),
        "@media (hover: hover)": {
          "&:hover": hoverState(
            theme,
            controls,
            theme.palette.primary.main,
            "overlay",
          ),
        },
        "&.Mui-disabled": {
          color: alpha(theme.palette.primary.contrastText, 0.56),
          borderColor: alpha(bauhausInk(theme), 0.12),
          backgroundImage: `linear-gradient(90deg, ${alpha(
            theme.palette.primary.main,
            0.28,
          )} 0 72%, ${alpha(theme.palette.secondary.main, 0.18)} 72% 100%)`,
        },
      }),
      containedSecondary: ({ theme }) => ({
        color: theme.palette.secondary.contrastText,
        borderColor: alpha(bauhausInk(theme), 0.18),
        backgroundColor: theme.palette.secondary.main,
        backgroundImage: [
          `linear-gradient(90deg, ${alpha(theme.palette.secondary.main, 0.96)} 0 70%, ${alpha(
            theme.palette.primary.main,
            0.74,
          )} 70% 100%)`,
          `linear-gradient(180deg, ${alpha(theme.palette.common.white, 0.14)} 0 2px, transparent 2px calc(100% - 2px), ${alpha(
            bauhausInk(theme),
            0.18,
          )} calc(100% - 2px) 100%)`,
        ].join(", "),
        backgroundOrigin: "padding-box, padding-box",
        backgroundClip: "padding-box, padding-box",
        boxShadow: surfaceShadow(
          theme,
          controls,
          "surface",
          theme.palette.secondary.main,
        ),
        "@media (hover: hover)": {
          "&:hover": hoverState(
            theme,
            controls,
            theme.palette.secondary.main,
            "elevated",
          ),
        },
      }),
      outlinedPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderColor: alpha(bauhausInk(theme), 0.18),
        backgroundColor: alpha(theme.palette.background.paper, 0.96),
        backgroundImage: [
          `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0 100%)`,
          `repeating-linear-gradient(90deg, ${alpha(
            theme.palette.primary.main,
            0.1,
          )} 0 14px, transparent 14px 38px)`,
        ].join(", "),
        backgroundOrigin: "padding-box, padding-box",
        backgroundClip: "padding-box, padding-box",
        boxShadow: `inset 0 1px 0 ${alpha(theme.palette.common.white, 0.2)}`,
        "@media (hover: hover)": {
          "&:hover": hoverState(
            theme,
            controls,
            theme.palette.warning.main,
            "surface",
          ),
        },
      }),
      textPrimary: ({ theme }) => ({
        color: theme.palette.primary.main,
        borderColor: "transparent",
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 0,
        border: `2px solid ${alpha(bauhausInk(theme), 0.16)}`,
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: theme.palette.text.primary,
        backgroundColor: alpha(theme.palette.background.paper, 0.96),
        backgroundImage: [
          `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0 100%)`,
          `repeating-linear-gradient(90deg, ${alpha(
            theme.palette.primary.main,
            0.08,
          )} 0 12px, transparent 12px 36px)`,
        ].join(", "),
        boxShadow: `0 0 0 1px ${alpha(theme.palette.secondary.main, 0.08)}`,
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color", "background-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 120, 180)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": {
            ...hoverState(
              theme,
              controls,
              theme.palette.primary.main,
              "surface",
            ),
            backgroundColor: alpha(theme.palette.primary.main, 0.06),
          },
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
        ...panelSurface(theme, controls, "surface", theme.palette.primary.main),
        padding: 0,
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 140, 200)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": hoverState(
            theme,
            controls,
            theme.palette.primary.main,
            "elevated",
          ),
        },
      }),
      indicator: ({ theme }) => ({
        height: 4,
        bottom: 0,
        top: "auto",
        borderRadius: 0,
        backgroundImage: bauhausRail(
          theme,
          scale(controls.extravagance, 0.42, 0.56),
          90,
        ),
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
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: alpha(theme.palette.text.primary, 0.76),
        transition: theme.transitions.create(
          ["background-color", "color", "box-shadow"],
          {
            duration: Math.round(scale(controls.motionPolish, 110, 160)),
          },
        ),
        "&:not(:last-of-type)": {
          borderInlineEnd: `1px solid ${alpha(bauhausInk(theme), 0.14)}`,
        },
        "&:hover": {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          boxShadow: `inset 0 -2px 0 ${alpha(theme.palette.primary.main, 0.22)}`,
        },
        "&.Mui-selected": {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.warning.main, 0.1),
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.warning.main, 0.18)}`,
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...panelSurface(theme, controls, "surface", theme.palette.primary.main),
        border: `2px solid ${alpha(bauhausInk(theme), 0.18)}`,
        backgroundImage: [
          `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0 100%)`,
          `repeating-linear-gradient(90deg, transparent 0 18px, ${alpha(
            theme.palette.primary.main,
            0.04,
          )} 18px 36px)`,
          bauhausRail(theme, scale(controls.extravagance, 0.12, 0.18), 90),
        ].join(", "),
        backgroundOrigin: "padding-box, padding-box, border-box",
        backgroundClip: "padding-box, padding-box, border-box",
        transition: theme.transitions.create(
          ["box-shadow", "border-color", "background-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 120, 180)),
          },
        ),
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
          borderWidth: 0,
        },
        "&:hover": {
          ...hoverState(
            theme,
            controls,
            theme.palette.primary.main,
            "elevated",
            "translateY(0)",
          ),
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.08 : 0.04,
          ),
        },
        "&.Mui-focused": {
          boxShadow: [
            focusRing(theme, controls, 3),
            `inset 0 0 0 2px ${alpha(theme.palette.secondary.main, 0.22)}`,
          ].join(", "),
        },
        "& .MuiInputAdornment-root": {
          minHeight: "100%",
          margin: 0,
          paddingInline: theme.spacing(1.5),
          borderInlineEnd: `2px solid ${alpha(bauhausInk(theme), 0.12)}`,
        },
      }),
      input: ({ theme }) => ({
        paddingBlock: 13,
        paddingInline: theme.spacing(1.75),
        letterSpacing: "0.01em",
      }),
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: alpha(theme.palette.text.secondary, 0.94),
        "&.Mui-focused": {
          color: theme.palette.primary.main,
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
        borderRadius: 0,
        boxShadow: `0 0 0 2px ${alpha(bauhausInk(theme), 0.18)}`,
        backgroundColor: theme.palette.background.paper,
      }),
      track: ({ theme }) => ({
        borderRadius: 0,
        border: `2px solid ${alpha(bauhausInk(theme), 0.18)}`,
        backgroundImage: bauhausRail(theme, 0.18, 90),
        opacity: 1,
        transition: theme.transitions.create(
          ["box-shadow", "border-color", "background-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 110, 160)),
          },
        ),
      }),
      switchBase: ({ theme }) => ({
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
        "&:hover + .MuiSwitch-track": {
          borderColor: alpha(theme.palette.primary.main, 0.28),
          boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.08)}`,
        },
        "&.Mui-checked": {
          color: theme.palette.secondary.main,
          "& + .MuiSwitch-track": {
            backgroundImage: bauhausRail(theme, 0.32, 90),
            opacity: 1,
          },
          "&:hover + .MuiSwitch-track": {
            borderColor: alpha(theme.palette.secondary.main, 0.3),
            boxShadow: `0 0 0 3px ${alpha(theme.palette.secondary.main, 0.08)}`,
          },
        },
      }),
    },
  },
  MuiSlider: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.primary.main,
        height: 8,
        transition: theme.transitions.create(["filter"], {
          duration: Math.round(scale(controls.motionPolish, 100, 140)),
        }),
        "&:hover": {
          filter: "brightness(1.04)",
        },
        "&:hover .MuiSlider-thumb": {
          borderColor: alpha(theme.palette.primary.main, 0.3),
          boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.08)}`,
        },
      }),
      rail: ({ theme }) => ({
        height: 8,
        opacity: 1,
        backgroundColor: alpha(bauhausInk(theme), 0.14),
      }),
      track: ({ theme }) => ({
        height: 8,
        border: "none",
        backgroundImage: bauhausRail(theme, 0.94, 90),
      }),
      thumb: ({ theme }) => ({
        width: 20,
        height: 20,
        borderRadius: 0,
        border: `2px solid ${alpha(bauhausInk(theme), 0.18)}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: surfaceShadow(
          theme,
          controls,
          "surface",
          theme.palette.warning.main,
        ),
      }),
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...panelSurface(
          theme,
          controls,
          "surface",
          theme.palette.secondary.main,
        ),
        border: `2px solid ${alpha(bauhausInk(theme), 0.18)}`,
        backgroundImage: [
          `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.96)} 0 100%)`,
          `repeating-linear-gradient(90deg, transparent 0 18px, ${alpha(
            theme.palette.info.main,
            0.04,
          )} 18px 36px, transparent 36px 54px)`,
          bauhausRail(theme, scale(controls.extravagance, 0.12, 0.18), 90),
        ].join(", "),
        backgroundOrigin: "padding-box, padding-box, border-box",
        backgroundClip: "padding-box, padding-box, border-box",
        "@media (hover: hover)": {
          "&:hover": hoverState(
            theme,
            controls,
            theme.palette.secondary.main,
            "elevated",
          ),
        },
        "&::before": {
          content: '""',
          position: "absolute",
          insetInlineStart: 0,
          insetBlockStart: 0,
          width: 8,
          height: "100%",
          backgroundImage: bauhausRail(theme, 0.9, 180),
        },
      }),
      icon: ({ theme }) => ({
        marginRight: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        borderInlineEnd: `2px solid ${alpha(bauhausInk(theme), 0.12)}`,
      }),
      message: ({ theme }) => ({
        width: "100%",
        paddingBlock: theme.spacing(0.5),
      }),
      action: ({ theme }) => ({
        marginRight: 0,
        marginLeft: theme.spacing(1.5),
        paddingLeft: theme.spacing(1.5),
        borderInlineStart: `2px solid ${alpha(bauhausInk(theme), 0.12)}`,
      }),
      standardInfo: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.info.main, 0.08),
      }),
      standardSuccess: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.success.main, 0.08),
      }),
      standardWarning: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.warning.main, 0.1),
      }),
      standardError: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.secondary.main, 0.08),
      }),
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...panelSurface(theme, controls, "surface", theme.palette.primary.main),
        boxShadow: [
          surfaceShadow(theme, controls, "surface", theme.palette.primary.main),
          `inset 0 -2px 0 ${alpha(bauhausInk(theme), 0.14)}`,
        ].join(", "),
        "& + &": {
          marginTop: theme.spacing(1),
        },
        "&::before": {
          display: "none",
        },
        "@media (hover: hover)": {
          "&:hover": hoverState(
            theme,
            controls,
            theme.palette.primary.main,
            "elevated",
          ),
        },
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 58,
        paddingInline: theme.spacing(2.5),
        borderBottom: `2px solid ${alpha(bauhausInk(theme), 0.14)}`,
        backgroundImage: `repeating-linear-gradient(90deg, transparent 0 18px, ${alpha(
          theme.palette.primary.main,
          0.06,
        )} 18px 36px, transparent 36px 54px)`,
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.14)}`,
        },
        "&.Mui-expanded": {
          minHeight: 58,
        },
      }),
      content: {
        margin: 0,
        width: "100%",
        "& .MuiTypography-root": {
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          textTransform: "uppercase",
        },
      },
      expandIconWrapper: ({ theme }) => ({
        borderInlineStart: `2px solid ${alpha(bauhausInk(theme), 0.14)}`,
        marginInlineStart: theme.spacing(2),
        paddingInlineStart: theme.spacing(1.5),
      }),
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(2.5),
        borderTop: 0,
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0 22px, ${alpha(
          theme.palette.info.main,
          0.035,
        )} 22px 23px)`,
      }),
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...panelSurface(
          theme,
          controls,
          "elevated",
          theme.palette.warning.main,
        ),
        "@media (hover: hover)": {
          "&:hover": hoverState(
            theme,
            controls,
            theme.palette.warning.main,
            "overlay",
          ),
        },
      }),
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: `repeating-linear-gradient(90deg, ${alpha(
          theme.palette.primary.main,
          0.1,
        )} 0 24px, transparent 24px 72px)`,
        boxShadow: `inset 0 -2px 0 ${alpha(bauhausInk(theme), 0.18)}`,
        "& .MuiTableCell-head:nth-of-type(3n + 1)": {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
        "& .MuiTableCell-head:nth-of-type(3n + 2)": {
          backgroundColor: alpha(theme.palette.primary.main, 0.06),
        },
        "& .MuiTableCell-head:nth-of-type(3n)": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.06),
        },
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }) => ({
        borderBottom: `2px solid ${alpha(bauhausInk(theme), 0.18)}`,
        borderInlineEnd: `1px solid ${alpha(bauhausInk(theme), 0.14)}`,
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        boxShadow: `inset 0 1px 0 ${alpha(theme.palette.common.white, 0.1)}`,
      }),
      body: ({ theme }) => ({
        borderBottom: `1px solid ${alpha(bauhausInk(theme), 0.1)}`,
        borderInlineEnd: `1px solid ${alpha(bauhausInk(theme), 0.08)}`,
        backgroundImage: `linear-gradient(90deg, ${alpha(
          theme.palette.primary.main,
          0.025,
        )} 0 2px, transparent 2px 100%)`,
      }),
    },
  },
  MuiTooltip: {
    defaultProps: {
      arrow: false,
    },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...panelSurface(
          theme,
          controls,
          "overlay",
          theme.palette.secondary.main,
        ),
        border: `2px solid ${alpha(bauhausInk(theme), 0.18)}`,
        padding: theme.spacing(1.2, 1.5),
        lineHeight: 1.45,
        backgroundImage: [
          `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0 100%)`,
          `repeating-linear-gradient(90deg, transparent 0 14px, ${alpha(
            theme.palette.secondary.main,
            0.05,
          )} 14px 28px)`,
          bauhausRail(theme, scale(controls.extravagance, 0.12, 0.18), 90),
        ].join(", "),
        backgroundOrigin: "padding-box, padding-box, border-box",
        backgroundClip: "padding-box, padding-box, border-box",
        color: theme.palette.text.primary,
        fontSize: "0.82rem",
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...panelSurface(
          theme,
          controls,
          "overlay",
          theme.palette.secondary.main,
        ),
        border: `2px solid ${alpha(bauhausInk(theme), 0.18)}`,
        marginTop: theme.spacing(1),
        minWidth: 220,
        backgroundImage: [
          `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0 100%)`,
          `repeating-linear-gradient(90deg, transparent 0 18px, ${alpha(
            theme.palette.primary.main,
            0.04,
          )} 18px 36px)`,
          bauhausRail(theme, scale(controls.extravagance, 0.12, 0.18), 90),
        ].join(", "),
        backgroundOrigin: "padding-box, padding-box, border-box",
        backgroundClip: "padding-box, padding-box, border-box",
      }),
      list: {
        padding: 0,
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 44,
        borderRadius: 0,
        borderBottom: `1px solid ${alpha(bauhausInk(theme), 0.12)}`,
        fontFamily: FONT_DISPLAY,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        transition: theme.transitions.create(
          ["background-color", "box-shadow", "border-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 100, 140)),
          },
        ),
        "&:last-of-type": {
          borderBottom: 0,
        },
        "& .MuiListItemIcon-root": {
          minWidth: 32,
          color: theme.palette.primary.main,
        },
        "&.Mui-selected": {
          backgroundImage: `repeating-linear-gradient(90deg, ${alpha(
            theme.palette.primary.main,
            0.1,
          )} 0 16px, transparent 16px 40px)`,
          backgroundColor: alpha(theme.palette.primary.main, 0.06),
        },
        "&.Mui-selected:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.14)}`,
        },
        "&:hover": {
          backgroundImage: `linear-gradient(90deg, ${alpha(
            theme.palette.primary.main,
            0.1,
          )} 0 12px, transparent 12px 100%)`,
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.14)}`,
        },
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...panelSurface(theme, controls, "overlay", theme.palette.warning.main),
        border: `2px solid ${alpha(bauhausInk(theme), 0.2)}`,
        backgroundImage: [
          `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0 100%)`,
          `repeating-linear-gradient(90deg, transparent 0 24px, ${alpha(
            theme.palette.primary.main,
            0.05,
          )} 24px 48px, transparent 48px 72px)`,
          bauhausRail(theme, scale(controls.extravagance, 0.14, 0.2), 90),
        ].join(", "),
        backgroundOrigin: "padding-box, padding-box, border-box",
        backgroundClip: "padding-box, padding-box, border-box",
        "@media (hover: hover)": {
          "&:hover": hoverState(
            theme,
            controls,
            theme.palette.warning.main,
            "overlay",
          ),
        },
      }),
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(2.5, 3),
        borderBottom: `2px solid ${alpha(bauhausInk(theme), 0.16)}`,
        backgroundImage: `repeating-linear-gradient(90deg, ${alpha(
          theme.palette.primary.main,
          0.06,
        )} 0 18px, transparent 18px 36px)`,
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }),
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(3),
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0 26px, ${alpha(
          theme.palette.info.main,
          0.03,
        )} 26px 27px)`,
      }),
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(2, 3, 3),
        gap: theme.spacing(1.5),
        borderTop: `2px solid ${alpha(bauhausInk(theme), 0.14)}`,
        backgroundImage: `repeating-linear-gradient(90deg, transparent 0 20px, ${alpha(
          theme.palette.secondary.main,
          0.04,
        )} 20px 40px)`,
      }),
    },
  },
});

export const strongNeonBauhausGrid = {
  ...neonBauhausGrid,
  name: "Strong Neon Bauhaus Grid",
  palette: {
    ...neonBauhausGrid.palette,
    text: {
      ...neonBauhausGrid.palette.text,
      primary: "#0C141C",
      secondary: alpha("#0C141C", 0.78),
      disabled: alpha("#0C141C", 0.48),
    },
    divider: alpha("#0C141C", 0.18),
    action: {
      ...neonBauhausGrid.palette.action,
      hover: alpha("#00D2FF", 0.08),
      selected: alpha("#00D2FF", 0.12),
      focus: alpha("#9FA9EA", 0.22),
      active: alpha("#0C141C", 0.62),
      disabled: alpha("#0C141C", 0.36),
      disabledBackground: alpha("#0C141C", 0.08),
    },
  },
  typography,
  shape: { borderRadius: 0 },
  spacing: 8,
  components: mergeComponents(
    neonBauhausGrid.components,
    createComponents(lightControls),
  ),
} satisfies NamedThemeOptions;

export const strongNeonBauhausGridNight = {
  ...neonBauhausGridNight,
  name: "Strong Neon Bauhaus Grid (Night)",
  palette: {
    ...neonBauhausGridNight.palette,
    text: {
      ...neonBauhausGridNight.palette.text,
      primary: "#FFFFFF",
      secondary: alpha("#FFFFFF", 0.78),
      disabled: alpha("#FFFFFF", 0.46),
    },
    divider: alpha("#FFFFFF", 0.18),
    action: {
      ...neonBauhausGridNight.palette.action,
      hover: alpha("#00D2FF", 0.1),
      selected: alpha("#00D2FF", 0.16),
      focus: alpha("#9FA9EA", 0.24),
      active: alpha("#FFFFFF", 0.62),
      disabled: alpha("#FFFFFF", 0.34),
      disabledBackground: alpha("#FFFFFF", 0.1),
    },
  },
  typography,
  shape: { borderRadius: 0 },
  spacing: 8,
  components: mergeComponents(
    neonBauhausGridNight.components,
    createComponents(darkControls),
  ),
} satisfies NamedThemeOptions;
