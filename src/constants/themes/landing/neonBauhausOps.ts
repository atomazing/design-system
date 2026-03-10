import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

const FONT_DISPLAY =
  "\"Sora\",\"Space Grotesk\",\"Avenir Next Condensed\",\"Arial Black\",\"Inter\",\"Helvetica\",\"Arial\",sans-serif";
const FONT_TEXT =
  "\"IBM Plex Sans\",\"Inter\",\"Manrope\",\"Helvetica\",\"Arial\",sans-serif";
const FONT_MONO =
  "\"IBM Plex Mono\",\"JetBrains Mono\",\"Roboto Mono\",\"Menlo\",\"Consolas\",monospace";

const BAUHAUS_RADIUS = 20;

type BauhausLandingControls = {
  luxuryLevel: number;
  extravagance: number;
  heroDrama: number;
  ctaPower: number;
  motionPolish: number;
  blurBudget: number;
};

type SurfaceLevel = "surface" | "elevated" | "overlay";

const clampUnit = (value: number): number => Math.min(1, Math.max(0, value));

const scale = (value: number, min: number, max: number): number =>
  min + (max - min) * clampUnit(value);

const createLandingControls = (
  controls: BauhausLandingControls,
): BauhausLandingControls => ({
  luxuryLevel: clampUnit(controls.luxuryLevel),
  extravagance: clampUnit(controls.extravagance),
  heroDrama: clampUnit(controls.heroDrama),
  ctaPower: clampUnit(controls.ctaPower),
  motionPolish: clampUnit(controls.motionPolish),
  blurBudget: clampUnit(controls.blurBudget),
});

const lightControls = createLandingControls({
  luxuryLevel: 0.82,
  extravagance: 0.84,
  heroDrama: 0.9,
  ctaPower: 0.94,
  motionPolish: 0.78,
  blurBudget: 0.62,
});

const darkControls = createLandingControls({
  luxuryLevel: 0.86,
  extravagance: 0.9,
  heroDrama: 0.94,
  ctaPower: 0.96,
  motionPolish: 0.82,
  blurBudget: 0.68,
});

const typography = {
  fontFamily: FONT_TEXT,
  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    fontSize: "clamp(2.9rem, 5.5vw, 5rem)",
    lineHeight: 0.88,
    letterSpacing: "-0.065em",
    textTransform: "uppercase",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    fontSize: "clamp(2.1rem, 3.8vw, 3.4rem)",
    lineHeight: 0.92,
    letterSpacing: "-0.05em",
    textTransform: "uppercase",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 820,
    fontSize: "clamp(1.32rem, 2.2vw, 1.9rem)",
    lineHeight: 1.06,
    letterSpacing: "-0.024em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 780,
    fontSize: "1.18rem",
    lineHeight: 1.16,
    letterSpacing: "-0.012em",
  },
  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 760,
    fontSize: "1.04rem",
    lineHeight: 1.46,
    letterSpacing: "0.012em",
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 780,
    fontSize: "0.92rem",
    lineHeight: 1.4,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.72,
    letterSpacing: "0.008em",
  },
  body2: {
    fontSize: "0.92rem",
    lineHeight: 1.64,
    letterSpacing: "0.006em",
  },
  button: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  caption: {
    fontFamily: FONT_MONO,
    fontSize: "0.78rem",
    letterSpacing: "0.03em",
  },
  overline: {
    fontFamily: FONT_DISPLAY,
    fontSize: "0.72rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 900,
  },
} as const;

const bauhausInk = (theme: Theme): string =>
  theme.palette.mode === "dark" ? "#FFFFFF" : "#0C141C";

const bauhausRail = (
  theme: Theme,
  opacity = 0.92,
  angle = 90,
): string =>
  `linear-gradient(${angle}deg, ${alpha(theme.palette.primary.main, opacity)} 0%, ${alpha(
    theme.palette.primary.main,
    opacity,
  )} 56%, ${alpha(theme.palette.primary.main, opacity * 0.74)} 56%, ${alpha(
    theme.palette.primary.main,
    opacity * 0.74,
  )} 76%, ${alpha(theme.palette.secondary.main, opacity * 0.54)} 76%, ${alpha(
    theme.palette.secondary.main,
    opacity * 0.54,
  )} 88%, ${alpha(bauhausInk(theme), opacity * 0.72)} 88%, ${alpha(
    bauhausInk(theme),
    opacity * 0.72,
  )} 100%)`;

const bauhausFocusRing = (
  theme: Theme,
  controls: BauhausLandingControls,
  width = 4,
): string =>
  [
    `0 0 0 ${width}px ${alpha(
      theme.palette.info.main,
      scale(controls.ctaPower, 0.18, 0.3),
    )}`,
    `0 0 ${Math.round(scale(controls.ctaPower, 18, 34))}px ${alpha(
      theme.palette.secondary.main,
      scale(controls.extravagance, 0.18, 0.28),
    )}`,
  ].join(", ");

const bauhausShadow = (
  theme: Theme,
  controls: BauhausLandingControls,
  level: SurfaceLevel,
  accent = theme.palette.info.main,
): string => {
  const isDark = theme.palette.mode === "dark";
  const lift =
    level === "overlay"
      ? scale(controls.luxuryLevel, 24, 40)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 18, 30)
        : scale(controls.luxuryLevel, 12, 22);
  const blur =
    level === "overlay"
      ? scale(controls.luxuryLevel, 38, 72)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 28, 54)
        : scale(controls.luxuryLevel, 20, 40);
  const accentGlow =
    level === "overlay"
      ? scale(controls.extravagance, 0.14, 0.24)
      : level === "elevated"
        ? scale(controls.extravagance, 0.12, 0.2)
        : scale(controls.extravagance, 0.08, 0.16);

  return [
    `0 ${Math.round(lift * 0.6)}px ${Math.round(blur)}px ${alpha(
      bauhausInk(theme),
      isDark ? 0.4 : 0.12,
    )}`,
    `0 0 ${Math.round(scale(controls.extravagance, 18, 38))}px ${alpha(
      accent,
      accentGlow,
    )}`,
    `${Math.round(scale(controls.luxuryLevel, 8, 16))}px ${Math.round(
      scale(controls.luxuryLevel, 8, 16),
    )}px 0 ${alpha(
      accent,
      isDark
        ? scale(controls.luxuryLevel, 0.16, 0.24)
        : scale(controls.luxuryLevel, 0.22, 0.34),
    )}`,
  ].join(", ");
};

const bauhausSurface = (
  theme: Theme,
  controls: BauhausLandingControls,
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
      ? scale(controls.luxuryLevel, isDark ? 0.84 : 0.9, isDark ? 0.9 : 0.96)
      : level === "elevated"
        ? scale(controls.luxuryLevel, isDark ? 0.78 : 0.86, isDark ? 0.86 : 0.94)
        : scale(controls.luxuryLevel, isDark ? 0.7 : 0.82, isDark ? 0.8 : 0.9);
  const accentAlpha =
    level === "overlay"
      ? scale(controls.extravagance, 0.08, 0.16)
      : level === "elevated"
        ? scale(controls.extravagance, 0.06, 0.13)
        : scale(controls.extravagance, 0.05, 0.1);
  const blurPx =
    level === "overlay"
      ? scale(controls.blurBudget, 14, 22)
      : level === "elevated"
        ? scale(controls.blurBudget, 10, 16)
        : scale(controls.blurBudget, 8, 12);

  return {
    position: "relative" as const,
    overflow: "hidden" as const,
    border: "1px solid transparent",
    borderRadius: radius,
    backgroundColor: alpha(theme.palette.background.paper, fillAlpha),
    backgroundImage: [
      `linear-gradient(160deg, ${alpha(
        theme.palette.common.white,
        isDark
          ? scale(controls.luxuryLevel, 0.06, 0.12)
          : scale(controls.luxuryLevel, 0.48, 0.7),
      )} 0%, ${alpha(
        theme.palette.background.paper,
        Math.min(0.99, fillAlpha + 0.08),
      )} 18%, ${alpha(
        theme.palette.background.paper,
        fillAlpha,
      )} 64%, ${alpha(accent, accentAlpha)} 100%)`,
      `linear-gradient(135deg, ${alpha(
        theme.palette.primary.main,
        scale(controls.extravagance, 0.08, 0.16),
      )} 0%, ${alpha(
        theme.palette.primary.main,
        scale(controls.extravagance, 0.08, 0.16),
      )} 14%, transparent 14%, transparent 100%)`,
      `linear-gradient(90deg, transparent 0%, transparent 78%, ${alpha(
        theme.palette.secondary.main,
        scale(controls.extravagance, 0.08, 0.16),
      )} 78%, ${alpha(
        theme.palette.secondary.main,
        scale(controls.extravagance, 0.08, 0.16),
      )} 100%)`,
      bauhausRail(theme, scale(controls.extravagance, 0.18, 0.34), 135),
    ].join(", "),
    backgroundOrigin: "padding-box, padding-box, padding-box, border-box",
    backgroundClip: "padding-box, padding-box, padding-box, border-box",
    boxShadow: bauhausShadow(theme, controls, level, accent),
    backdropFilter: `blur(${Math.round(blurPx)}px) saturate(${Math.round(
      scale(controls.luxuryLevel, 110, 145),
    )}%)`,
    WebkitBackdropFilter: `blur(${Math.round(blurPx)}px) saturate(${Math.round(
      scale(controls.luxuryLevel, 110, 145),
    )}%)`,
    "@media (hover: none), (max-width: 900px)": {
      backdropFilter: `blur(${Math.max(6, Math.round(blurPx * 0.65))}px)`,
      WebkitBackdropFilter: `blur(${Math.max(6, Math.round(blurPx * 0.65))}px)`,
    },
  };
};

const bauhausHoverState = (
  theme: Theme,
  controls: BauhausLandingControls,
  {
    accent = theme.palette.primary.main,
    level = "elevated",
    translate = "translate(-2px, -2px)",
    glow = accent,
  }: {
    accent?: string;
    level?: SurfaceLevel;
    translate?: string;
    glow?: string;
  } = {},
) => ({
  transform: translate,
  borderColor: alpha(accent, theme.palette.mode === "dark" ? 0.38 : 0.3),
  boxShadow: [
    bauhausShadow(theme, controls, level, accent),
    `0 0 ${Math.round(scale(controls.ctaPower, 24, 44))}px ${alpha(
      glow,
      scale(controls.extravagance, 0.18, 0.3),
    )}`,
  ].join(", "),
});

const createComponents = (
  controls: BauhausLandingControls,
): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => {
      const isDark = theme.palette.mode === "dark";

      return {
        "@keyframes bauhausBeamFloat": {
          "0%": {
            transform: "translate3d(-4%, 0, 0) rotate(-16deg)",
            opacity: 0.62,
          },
          "50%": {
            transform: "translate3d(0, 2%, 0) rotate(-14deg)",
            opacity: 0.86,
          },
          "100%": {
            transform: "translate3d(5%, 0, 0) rotate(-16deg)",
            opacity: 0.66,
          },
        },
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          backgroundImage: [
            `radial-gradient(980px 620px at 12% 10%, ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, isDark ? 0.18 : 0.22, isDark ? 0.28 : 0.32),
            )} 0%, transparent 58%)`,
            `radial-gradient(840px 520px at 88% 14%, ${alpha(
              theme.palette.secondary.main,
              scale(controls.heroDrama, isDark ? 0.12 : 0.16, isDark ? 0.22 : 0.24),
            )} 0%, transparent 54%)`,
            `radial-gradient(920px 560px at 40% 108%, ${alpha(
              theme.palette.warning.main,
              scale(controls.heroDrama, isDark ? 0.14 : 0.16, isDark ? 0.24 : 0.26),
            )} 0%, transparent 56%)`,
            `linear-gradient(180deg, transparent 0%, transparent 58%, ${alpha(
              theme.palette.background.default,
              isDark ? 0.42 : 0.18,
            )} 100%)`,
            `linear-gradient(0deg, ${alpha(
              bauhausInk(theme),
              isDark ? 0.05 : 0.04,
            )} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${alpha(
              bauhausInk(theme),
              isDark ? 0.05 : 0.035,
            )} 1px, transparent 1px)`,
          ].join(", "),
          backgroundSize: "auto, auto, auto, auto, 42px 42px, 42px 42px",
          backgroundAttachment: "fixed",
        },
        "body::before": {
          content: "\"\"",
          position: "fixed",
          insetInlineStart: "-8vw",
          insetBlockStart: "8vh",
          width: "46vw",
          minWidth: 280,
          maxWidth: 620,
          height: 24,
          backgroundImage: bauhausRail(
            theme,
            scale(controls.heroDrama, 0.44, 0.72),
            90,
          ),
          filter: `blur(${Math.round(scale(controls.blurBudget, 10, 18))}px)`,
          pointerEvents: "none",
          opacity: 0.92,
          transform: "translate3d(-4%, 0, 0) rotate(-16deg)",
          animation: `bauhausBeamFloat ${Math.round(
            scale(controls.motionPolish, 14, 10),
          )}s cubic-bezier(0.22, 1, 0.36, 1) infinite alternate`,
        },
        "body::after": {
          content: "\"\"",
          position: "fixed",
          insetInline: 0,
          insetBlockStart: 0,
          height: 4,
          backgroundImage: bauhausRail(theme, 0.94, 90),
          boxShadow: `0 0 24px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.12, 0.22),
          )}`,
          pointerEvents: "none",
        },
        "@media (prefers-reduced-motion: reduce)": {
          "body::before": {
            animation: "none",
            transform: "translate3d(0, 0, 0) rotate(-16deg)",
            opacity: 0.72,
          },
        },
        "@media (hover: none), (max-width: 900px)": {
          body: {
            backgroundAttachment: "scroll",
          },
          "body::before": {
            filter: `blur(${Math.round(scale(controls.blurBudget, 6, 10))}px)`,
            width: "58vw",
          },
        },
        "*::selection": {
          backgroundColor: alpha(theme.palette.warning.main, 0.42),
          color: theme.palette.text.primary,
        },
        a: {
          color: theme.palette.primary.main,
          textDecorationColor: alpha(theme.palette.secondary.main, 0.52),
          textDecorationThickness: "3px",
          textUnderlineOffset: "4px",
        },
        code: {
          fontFamily: FONT_MONO,
        },
      };
    },
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
        ...bauhausSurface(theme, controls, {
          level: "surface",
          radius: "24px 12px 24px 12px",
          accent: theme.palette.primary.main,
        }),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 220, 320)),
          },
        ),
        marginInline: theme.spacing(1),
        marginTop: theme.spacing(1),
        "@media (hover: hover)": {
          "&:hover": bauhausHoverState(theme, controls, {
            accent: theme.palette.primary.main,
            level: "elevated",
            translate: "translate(-1px, -1px)",
          }),
        },
        "&::after": {
          content: "\"\"",
          position: "absolute",
          insetInline: 0,
          insetBlockEnd: 0,
          height: 4,
          backgroundImage: bauhausRail(theme, 0.92, 90),
        },
      }),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...bauhausSurface(theme, controls, {
          level: "surface",
          radius: "26px 12px 26px 12px",
          accent: theme.palette.secondary.main,
        }),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 220, 320)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": bauhausHoverState(theme, controls, {
            accent: theme.palette.secondary.main,
            level: "elevated",
            translate: "translate(-1px, -1px)",
          }),
        },
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...bauhausSurface(theme, controls, {
          level: "elevated",
          radius: "32px 14px 32px 14px",
          accent: theme.palette.warning.main,
        }),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background-position"],
          {
            duration: Math.round(scale(controls.motionPolish, 220, 320)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": {
            ...bauhausHoverState(theme, controls, {
              accent: theme.palette.secondary.main,
              level: "overlay",
            }),
          },
        },
      }),
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiTypography-h1, &.MuiTypography-h2": {
          display: "inline-block",
          backgroundImage: `linear-gradient(transparent 0%, transparent 68%, ${alpha(
            theme.palette.warning.main,
            theme.palette.mode === "dark" ? 0.22 : 0.34,
          )} 68%, ${alpha(
            theme.palette.warning.main,
            theme.palette.mode === "dark" ? 0.22 : 0.34,
          )} 100%)`,
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
          textShadow: `0 12px 28px ${alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.18 : 0.1,
          )}`,
        },
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.95em",
          padding: "0.12em 0.42em",
          borderRadius: 12,
          backgroundColor: alpha(
            theme.palette.warning.main,
            theme.palette.mode === "dark" ? 0.18 : 0.24,
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
        backgroundImage: bauhausRail(theme, 0.94, 90),
        boxShadow: `0 0 18px ${alpha(
          theme.palette.primary.main,
          scale(controls.extravagance, 0.08, 0.16),
        )}`,
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
        borderWidth: 1,
        borderStyle: "solid",
        fontWeight: 900,
        transition: theme.transitions.create(
          [
            "transform",
            "box-shadow",
            "background-position",
            "background-color",
            "filter",
            "border-color",
          ],
          {
            duration: Math.round(scale(controls.motionPolish, 200, 300)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": {
            filter: "brightness(1.1) saturate(1.14)",
          },
        },
        "&.Mui-focusVisible": {
          boxShadow: bauhausFocusRing(theme, controls, 4),
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
        minHeight: 56,
        paddingInline: 24,
        paddingBlock: 14,
      },
      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        borderColor: "transparent",
        backgroundColor: theme.palette.primary.main,
        backgroundImage: [
          `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.98,
          )} 0%, ${alpha(theme.palette.primary.main, 0.96)} 42%, ${alpha(
            theme.palette.primary.main,
            0.88,
          )} 64%, ${alpha(
            theme.palette.secondary.main,
            0.78,
          )} 100%)`,
          bauhausRail(theme, scale(controls.extravagance, 0.16, 0.3), 132),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        backgroundSize: `${Math.round(scale(controls.ctaPower, 170, 210))}% 170%, 100% 100%`,
        backgroundPosition: "0% 50%, 0 0",
        boxShadow: [
          bauhausShadow(theme, controls, "elevated", theme.palette.primary.main),
          `0 0 ${Math.round(scale(controls.ctaPower, 22, 38))}px ${alpha(
            theme.palette.primary.main,
            scale(controls.ctaPower, 0.14, 0.24),
          )}`,
          `inset 0 1px 0 ${alpha(theme.palette.common.white, 0.36)}`,
          `inset 0 -1px 0 ${alpha(theme.palette.primary.dark, 0.18)}`,
        ].join(", "),
        "@media (hover: hover)": {
          "&:hover": {
            ...bauhausHoverState(theme, controls, {
              accent: theme.palette.secondary.main,
              level: "overlay",
            }),
            backgroundPosition: "100% 50%, 0 0",
            boxShadow: [
              bauhausHoverState(theme, controls, {
                accent: theme.palette.secondary.main,
                level: "overlay",
              }).boxShadow,
              `0 0 ${Math.round(scale(controls.ctaPower, 30, 46))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.ctaPower, 0.16, 0.28),
              )}`,
            ].join(", "),
          },
        },
        "&.Mui-focusVisible": {
          boxShadow: [
            bauhausShadow(theme, controls, "overlay", theme.palette.primary.main),
            bauhausFocusRing(theme, controls, 4),
          ].join(", "),
        },
        "&.Mui-disabled": {
          color: alpha(theme.palette.primary.contrastText, 0.62),
          backgroundImage: [
            `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.28,
            )} 0%, ${alpha(theme.palette.primary.main, 0.22)} 56%, ${alpha(
              theme.palette.secondary.main,
              0.14,
            )} 100%)`,
            bauhausRail(theme, 0.12, 132),
          ].join(", "),
        },
      }),
      containedSecondary: ({ theme }) => ({
        color: theme.palette.secondary.contrastText,
        borderColor: "transparent",
        backgroundColor: theme.palette.secondary.main,
        backgroundImage: [
          `linear-gradient(135deg, ${alpha(
            theme.palette.secondary.main,
            0.96,
          )} 0%, ${alpha(theme.palette.secondary.main, 0.92)} 44%, ${alpha(
            theme.palette.secondary.main,
            0.84,
          )} 66%, ${alpha(
            theme.palette.primary.main,
            0.76,
          )} 100%)`,
          bauhausRail(theme, 0.14, 132),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        boxShadow: bauhausShadow(
          theme,
          controls,
          "surface",
          theme.palette.primary.main,
        ),
        "@media (hover: hover)": {
          "&:hover": {
            ...bauhausHoverState(theme, controls, {
              accent: theme.palette.primary.main,
              level: "elevated",
            }),
          },
        },
      }),
      outlinedPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderColor: "transparent",
        backgroundColor: alpha(theme.palette.background.paper, 0.78),
        backgroundImage: [
          `linear-gradient(160deg, ${alpha(
            theme.palette.background.paper,
            0.86,
          )} 0%, ${alpha(theme.palette.background.paper, 0.66)} 100%)`,
          bauhausRail(theme, scale(controls.extravagance, 0.08, 0.16), 132),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        "@media (hover: hover)": {
          "&:hover": {
            ...bauhausHoverState(theme, controls, {
              accent: theme.palette.warning.main,
              level: "elevated",
              translate: "translate(-1px, -1px)",
            }),
          },
        },
      }),
      textPrimary: ({ theme }) => ({
        color: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        border: "1px solid transparent",
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: theme.palette.text.primary,
        backgroundColor: alpha(theme.palette.background.paper, 0.86),
        backgroundImage: [
          `linear-gradient(150deg, ${alpha(
            theme.palette.background.paper,
            0.94,
          )} 0%, ${alpha(theme.palette.background.paper, 0.82)} 78%, ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.04, 0.08),
          )} 100%)`,
          bauhausRail(theme, scale(controls.extravagance, 0.08, 0.16), 132),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        boxShadow: [
          `inset 0 1px 0 ${alpha(theme.palette.common.white, 0.34)}`,
          `0 10px 22px ${alpha(
            bauhausInk(theme),
            theme.palette.mode === "dark" ? 0.2 : 0.08,
          )}`,
        ].join(", "),
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color", "background-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 180, 260)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": {
            ...bauhausHoverState(theme, controls, {
              accent: theme.palette.primary.main,
              level: "elevated",
              translate: "translate(-1px, -1px)",
            }),
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.14 : 0.08,
            ),
          },
        },
      }),
      label: {
        paddingInline: 12,
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: "50%",
        border: `2px solid ${alpha(bauhausInk(theme), 0.18)}`,
        backgroundImage: bauhausRail(theme, 0.9, 135),
        color: theme.palette.common.white,
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color", "filter"],
          {
            duration: Math.round(scale(controls.motionPolish, 180, 260)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": {
            ...bauhausHoverState(theme, controls, {
              accent: theme.palette.primary.main,
              level: "elevated",
              translate: "translate(-1px, -1px)",
            }),
            filter: "brightness(1.1) saturate(1.14)",
          },
        },
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 48,
        ...bauhausSurface(theme, controls, {
          level: "surface",
          radius: 999,
          accent: theme.palette.primary.main,
        }),
        padding: theme.spacing(0.5),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 220, 320)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": bauhausHoverState(theme, controls, {
            accent: theme.palette.primary.main,
            level: "elevated",
            translate: "translate(-1px, -1px)",
          }),
        },
      }),
      indicator: ({ theme }) => ({
        height: "calc(100% - 8px)",
        top: 4,
        borderRadius: 999,
        backgroundImage: bauhausRail(
          theme,
          scale(controls.extravagance, 0.3, 0.52),
          132,
        ),
        boxShadow: `0 0 20px ${alpha(
          theme.palette.primary.main,
          scale(controls.extravagance, 0.14, 0.24),
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
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: alpha(theme.palette.text.primary, 0.76),
        transition: theme.transitions.create(
          ["background-color", "color", "box-shadow"],
          {
            duration: Math.round(scale(controls.motionPolish, 160, 240)),
          },
        ),
        "&:hover": {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.primary.main, 0.18),
          boxShadow: `inset 0 -2px 0 ${alpha(theme.palette.primary.main, 0.26)}`,
        },
        "&.Mui-selected": {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.warning.main, 0.16),
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...bauhausSurface(theme, controls, {
          level: "surface",
          radius: BAUHAUS_RADIUS,
          accent: theme.palette.primary.main,
        }),
        transition: theme.transitions.create(
          ["box-shadow", "border-color", "background-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 180, 260)),
          },
        ),
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(bauhausInk(theme), 0.16),
          borderWidth: 2,
        },
        "&:hover": {
          ...bauhausHoverState(theme, controls, {
            accent: theme.palette.primary.main,
            level: "elevated",
            translate: "translate(0, 0)",
          }),
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.14 : 0.06,
          ),
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(bauhausInk(theme), 0.28),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.secondary.main,
          boxShadow: bauhausFocusRing(theme, controls, 4),
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
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: alpha(theme.palette.text.secondary, 0.92),
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
        borderRadius: "50%",
        boxShadow: `0 0 0 2px ${alpha(bauhausInk(theme), 0.18)}`,
        backgroundColor: theme.palette.background.paper,
      }),
      track: ({ theme }) => ({
        borderRadius: 999,
        border: `2px solid ${alpha(bauhausInk(theme), 0.18)}`,
        backgroundImage: bauhausRail(theme, 0.2, 90),
        opacity: 1,
        transition: theme.transitions.create(
          ["box-shadow", "border-color", "background-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 160, 240)),
          },
        ),
      }),
      switchBase: ({ theme }) => ({
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.14),
        },
        "&:hover + .MuiSwitch-track": {
          borderColor: alpha(theme.palette.primary.main, 0.3),
          boxShadow: `0 0 ${Math.round(scale(controls.ctaPower, 14, 24))}px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.16, 0.26),
          )}`,
        },
        "&.Mui-checked": {
          color: theme.palette.secondary.main,
          "& + .MuiSwitch-track": {
            backgroundImage: bauhausRail(theme, 0.42, 90),
            opacity: 1,
          },
          "&:hover + .MuiSwitch-track": {
            borderColor: alpha(theme.palette.secondary.main, 0.34),
            boxShadow: `0 0 ${Math.round(scale(controls.ctaPower, 16, 28))}px ${alpha(
              theme.palette.secondary.main,
              scale(controls.extravagance, 0.18, 0.28),
            )}`,
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
          duration: Math.round(scale(controls.motionPolish, 160, 240)),
        }),
        "&:hover": {
          filter: "brightness(1.1) saturate(1.14)",
        },
        "&:hover .MuiSlider-thumb": {
          borderColor: alpha(theme.palette.primary.main, 0.32),
          boxShadow: bauhausHoverState(theme, controls, {
            accent: theme.palette.primary.main,
            level: "elevated",
            translate: "translate(0, 0)",
          }).boxShadow,
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
        borderRadius: "50%",
        border: `2px solid ${alpha(bauhausInk(theme), 0.18)}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: bauhausShadow(
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
        ...bauhausSurface(theme, controls, {
          level: "surface",
          radius: "22px 12px 22px 12px",
          accent: theme.palette.secondary.main,
        }),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 220, 320)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": bauhausHoverState(theme, controls, {
            accent: theme.palette.secondary.main,
            level: "elevated",
            translate: "translate(-1px, -1px)",
          }),
        },
        "&::before": {
          content: "\"\"",
          position: "absolute",
          insetInlineStart: 0,
          insetBlockStart: 0,
          width: 10,
          height: "100%",
          backgroundImage: bauhausRail(theme, 0.94, 180),
        },
      }),
      standardInfo: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.info.main, 0.14),
      }),
      standardSuccess: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.success.main, 0.14),
      }),
      standardWarning: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.warning.main, 0.18),
      }),
      standardError: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.secondary.main, 0.14),
      }),
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...bauhausSurface(theme, controls, {
          level: "surface",
          radius: "26px 12px 26px 12px",
          accent: theme.palette.primary.main,
        }),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 220, 320)),
          },
        ),
        "&::before": {
          display: "none",
        },
        "@media (hover: hover)": {
          "&:hover": bauhausHoverState(theme, controls, {
            accent: theme.palette.primary.main,
            level: "elevated",
            translate: "translate(-1px, -1px)",
          }),
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
          backgroundColor: alpha(theme.palette.primary.main, 0.18),
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.18)}`,
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
        ...bauhausSurface(theme, controls, {
          level: "elevated",
          radius: "26px 12px 26px 12px",
          accent: theme.palette.warning.main,
        }),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 220, 320)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": bauhausHoverState(theme, controls, {
            accent: theme.palette.warning.main,
            level: "overlay",
            translate: "translate(-1px, -1px)",
          }),
        },
      }),
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiTableCell-head:nth-of-type(3n + 1)": {
          backgroundColor: alpha(theme.palette.primary.main, 0.18),
        },
        "& .MuiTableCell-head:nth-of-type(3n + 2)": {
          backgroundColor: alpha(theme.palette.warning.main, 0.22),
        },
        "& .MuiTableCell-head:nth-of-type(3n)": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.14),
        },
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }) => ({
        borderBottom: `2px solid ${alpha(bauhausInk(theme), 0.18)}`,
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }),
      body: ({ theme }) => ({
        borderBottom: `1px solid ${alpha(bauhausInk(theme), 0.1)}`,
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 999,
        border: `1px solid ${alpha(bauhausInk(theme), 0.16)}`,
        backgroundColor: alpha(bauhausInk(theme), 0.12),
      }),
      bar: ({ theme }) => ({
        borderRadius: 999,
        backgroundImage: bauhausRail(theme, 0.96, 90),
      }),
    },
  },
  MuiTooltip: {
    defaultProps: {
      arrow: true,
    },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...bauhausSurface(theme, controls, {
          level: "overlay",
          radius: "18px 10px 18px 10px",
          accent: theme.palette.secondary.main,
        }),
        color: theme.palette.text.primary,
        fontSize: "0.84rem",
      }),
      arrow: ({ theme }) => ({
        color: theme.palette.background.paper,
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...bauhausSurface(theme, controls, {
          level: "overlay",
          radius: "34px 14px 34px 14px",
          accent: theme.palette.warning.main,
        }),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color"],
          {
            duration: Math.round(scale(controls.motionPolish, 220, 320)),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": bauhausHoverState(theme, controls, {
            accent: theme.palette.warning.main,
            level: "overlay",
            translate: "translate(-1px, -1px)",
          }),
        },
      }),
    },
  },
});

export const neonBauhausOps = {
  name: "Neon Bauhaus Ops",
  direction: "ltr",
  palette: {
    mode: "light",
    primary: { main: "#00D2FF", dark: "#00D2FF", light: "#00D2FF", contrastText: "#0C141C" },
    secondary: { main: "#440850", dark: "#440850", light: "#440850", contrastText: "#FFFFFF" },
    warning: { main: "#F3503A", dark: "#F3503A", light: "#F3503A", contrastText: "#FFFFFF" },
    info: { main: "#9FA9EA", dark: "#9FA9EA", light: "#9FA9EA", contrastText: "#0C141C" },
    success: { main: "#00D2FF", dark: "#00D2FF", light: "#00D2FF", contrastText: "#0C141C" },
    error: { main: "#F3503A", dark: "#F3503A", light: "#F3503A", contrastText: "#FFFFFF" },
    background: { default: "#FFFFFF", paper: "#FFFFFF" },
    text: {
      primary: "#0C141C",
      secondary: alpha("#0C141C", 0.72),
      disabled: alpha("#0C141C", 0.44),
    },
    divider: alpha("#0C141C", 0.14),
    action: {
      hover: alpha("#00D2FF", 0.14),
      selected: alpha("#00D2FF", 0.2),
      focus: alpha("#00D2FF", 0.26),
      active: alpha("#0C141C", 0.54),
      disabled: alpha("#0C141C", 0.32),
      disabledBackground: alpha("#0C141C", 0.06),
    },
  },
  typography,
  shape: { borderRadius: 8 },
  spacing: 8,
  components: createComponents(lightControls),
} satisfies NamedThemeOptions;

export const neonBauhausOpsNight = {
  ...neonBauhausOps,
  name: "Neon Bauhaus Ops (Night)",
  palette: {
    ...neonBauhausOps.palette,
    mode: "dark",
    primary: { main: "#00D2FF", dark: "#00D2FF", light: "#00D2FF", contrastText: "#0C141C" },
    secondary: { main: "#440850", dark: "#440850", light: "#440850", contrastText: "#FFFFFF" },
    warning: { main: "#F3503A", dark: "#F3503A", light: "#F3503A", contrastText: "#FFFFFF" },
    info: { main: "#9FA9EA", dark: "#9FA9EA", light: "#9FA9EA", contrastText: "#0C141C" },
    success: { main: "#00D2FF", dark: "#00D2FF", light: "#00D2FF", contrastText: "#0C141C" },
    error: { main: "#F3503A", dark: "#F3503A", light: "#F3503A", contrastText: "#FFFFFF" },
    background: { default: "#0C141C", paper: "#0C141C" },
    text: {
      primary: "#FFFFFF",
      secondary: alpha("#FFFFFF", 0.72),
      disabled: alpha("#FFFFFF", 0.42),
    },
    divider: alpha("#FFFFFF", 0.14),
    action: {
      hover: alpha("#00D2FF", 0.18),
      selected: alpha("#00D2FF", 0.24),
      focus: alpha("#00D2FF", 0.3),
      active: alpha("#FFFFFF", 0.56),
      disabled: alpha("#FFFFFF", 0.3),
      disabledBackground: alpha("#FFFFFF", 0.08),
    },
  },
  components: createComponents(darkControls),
} satisfies NamedThemeOptions;
