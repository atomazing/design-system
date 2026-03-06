import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

const FONT_DISPLAY =
  '"Space Grotesk","Plus Jakarta Sans","Sora","Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_TEXT = '"Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_MONO =
  '"JetBrains Mono","IBM Plex Mono","Roboto Mono","Menlo","Consolas",monospace';

const HOLO_RADIUS = 18;

type HoloLandingControls = {
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
  controls: HoloLandingControls,
): HoloLandingControls => ({
  luxuryLevel: clampUnit(controls.luxuryLevel),
  extravagance: clampUnit(controls.extravagance),
  heroDrama: clampUnit(controls.heroDrama),
  ctaPower: clampUnit(controls.ctaPower),
  motionPolish: clampUnit(controls.motionPolish),
  blurBudget: clampUnit(controls.blurBudget),
});

const lightControls = createLandingControls({
  luxuryLevel: 0.92,
  extravagance: 0.88,
  heroDrama: 0.92,
  ctaPower: 0.95,
  motionPolish: 0.84,
  blurBudget: 0.74,
});

const darkControls = createLandingControls({
  luxuryLevel: 0.96,
  extravagance: 0.92,
  heroDrama: 0.96,
  ctaPower: 0.98,
  motionPolish: 0.88,
  blurBudget: 0.82,
});

const typography = {
  fontFamily: FONT_TEXT,

  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    fontSize: "clamp(2.9rem, 5.8vw, 5rem)",
    lineHeight: 0.9,
    letterSpacing: "-0.065em",
    textTransform: "uppercase",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 860,
    fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
    lineHeight: 0.94,
    letterSpacing: "-0.048em",
    textTransform: "uppercase",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 800,
    fontSize: "clamp(1.34rem, 2.25vw, 1.9rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.024em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 780,
    fontSize: "1.18rem",
    lineHeight: 1.18,
    letterSpacing: "-0.014em",
  },

  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 740,
    fontSize: "1.03rem",
    lineHeight: 1.54,
    letterSpacing: "0.01em",
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 780,
    fontSize: "0.92rem",
    lineHeight: 1.42,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },

  body1: { fontSize: "1rem", lineHeight: 1.76, letterSpacing: "0.008em" },
  body2: { fontSize: "0.92rem", lineHeight: 1.68, letterSpacing: "0.006em" },

  button: {
    fontFamily: FONT_DISPLAY,
    textTransform: "uppercase",
    fontWeight: 840,
    letterSpacing: "0.08em",
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

interface HoloFrameOptions {
  level?: SurfaceLevel;
  radius?: number;
  accent?: string;
  tint?: string;
  panelAlpha?: number;
  signatureAlpha?: number;
  blurMin?: number;
  blurMax?: number;
  showBorderSpin?: boolean;
}

const holoInk = (theme: Theme): string =>
  theme.palette.mode === "dark" ? theme.palette.common.white : "#151B2F";

const motionDuration = (
  controls: HoloLandingControls,
  min: number,
  max: number,
): number => Math.round(scale(controls.motionPolish, min, max));

const blurStyle = (
  controls: HoloLandingControls,
  min: number,
  max: number,
) => {
  const blur = Math.round(scale(controls.blurBudget, min, max));
  const mobileBlur = Math.max(6, Math.round(blur * 0.62));

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    "@media (hover: none), (max-width: 900px)": {
      backdropFilter: `blur(${mobileBlur}px)`,
      WebkitBackdropFilter: `blur(${mobileBlur}px)`,
    },
  };
};

const holoRail = (
  theme: Theme,
  controls: HoloLandingControls,
  opacity = 1,
  angle = 132,
): string =>
  `linear-gradient(${angle}deg, ${alpha(
    theme.palette.primary.light ?? theme.palette.primary.main,
    scale(controls.extravagance, 0.18, 0.28) * opacity,
  )} 0%, ${alpha(
    theme.palette.primary.main,
    scale(controls.ctaPower, 0.2, 0.34) * opacity,
  )} 24%, ${alpha(
    theme.palette.secondary.main,
    scale(controls.extravagance, 0.16, 0.26) * opacity,
  )} 48%, ${alpha(
    theme.palette.info.main,
    scale(controls.heroDrama, 0.16, 0.28) * opacity,
  )} 72%, ${alpha(
    theme.palette.warning.main,
    scale(controls.extravagance, 0.14, 0.22) * opacity,
  )} 100%)`;

const holoFocusRing = (
  theme: Theme,
  controls: HoloLandingControls,
  width = 4,
): string =>
  [
    `0 0 0 ${width}px ${alpha(
      theme.palette.primary.main,
      scale(controls.ctaPower, 0.16, 0.28),
    )}`,
    `0 0 ${Math.round(scale(controls.ctaPower, 20, 38))}px ${alpha(
      theme.palette.info.main,
      scale(controls.extravagance, 0.14, 0.24),
    )}`,
  ].join(", ");

const holoShadow = (
  theme: Theme,
  controls: HoloLandingControls,
  level: SurfaceLevel,
  accent = theme.palette.primary.main,
): string => {
  const isDark = theme.palette.mode === "dark";
  const lift =
    level === "overlay"
      ? scale(controls.luxuryLevel, 26, 42)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 18, 32)
        : scale(controls.luxuryLevel, 12, 22);
  const blur =
    level === "overlay"
      ? scale(controls.luxuryLevel, 56, 98)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 38, 72)
        : scale(controls.luxuryLevel, 24, 48);
  const baseAlpha =
    level === "overlay"
      ? isDark
        ? 0.56
        : 0.16
      : level === "elevated"
        ? isDark
          ? 0.46
          : 0.14
        : isDark
          ? 0.36
          : 0.1;

  return [
    `0 ${Math.round(lift * 0.72)}px ${Math.round(blur)}px ${alpha("#000000", baseAlpha)}`,
    `0 0 ${Math.round(scale(controls.extravagance, 20, 44))}px ${alpha(
      accent,
      scale(controls.extravagance, 0.08, 0.16),
    )}`,
    `0 0 0 1px ${alpha(
      theme.palette.common.white,
      isDark ? 0.08 : 0.46,
    )} inset`,
  ].join(", ");
};

const holoFrame = (
  theme: Theme,
  controls: HoloLandingControls,
  opts?: HoloFrameOptions,
) => {
  const level = opts?.level ?? "surface";
  const radius =
    opts?.radius ??
    (level === "overlay"
      ? HOLO_RADIUS + 16
      : level === "elevated"
        ? HOLO_RADIUS + 12
        : HOLO_RADIUS + 8);
  const accent = opts?.accent ?? theme.palette.primary.main;
  const tint = opts?.tint ?? theme.palette.background.paper;
  const panelAlpha =
    opts?.panelAlpha ?? (theme.palette.mode === "dark" ? 0.78 : 0.96);
  const signatureAlpha =
    opts?.signatureAlpha ?? (theme.palette.mode === "dark" ? 0.62 : 0.34);
  const showBorderSpin = opts?.showBorderSpin ?? true;
  const isDark = theme.palette.mode === "dark";

  return {
    position: "relative" as const,
    borderRadius: radius,
    overflow: "hidden" as const,
    isolation: "isolate" as const,
    backgroundColor: alpha(tint, panelAlpha),
    border: "1px solid transparent",
    backgroundImage: [
      `linear-gradient(160deg, ${alpha(
        theme.palette.common.white,
        isDark ? 0.1 : 0.48,
      )} 0%, ${alpha(
        tint,
        Math.min(0.99, panelAlpha + 0.06),
      )} 18%, ${alpha(tint, panelAlpha)} 62%, ${alpha(
        accent,
        scale(controls.extravagance, 0.05, 0.11),
      )} 100%)`,
      `radial-gradient(460px 220px at 12% 0%, ${alpha(
        theme.palette.primary.main,
        scale(controls.heroDrama, 0.08, 0.16),
      )} 0%, transparent 68%)`,
      `radial-gradient(420px 220px at 88% 0%, ${alpha(
        theme.palette.secondary.main,
        scale(controls.extravagance, 0.06, 0.14),
      )} 0%, transparent 68%)`,
      `radial-gradient(140% 90% at 50% 118%, ${alpha(
        theme.palette.info.main,
        scale(controls.extravagance, 0.04, 0.1),
      )} 0%, transparent 58%)`,
      showBorderSpin
        ? `conic-gradient(from 120deg, ${alpha(
            theme.palette.primary.main,
            signatureAlpha,
          )} 0%, ${alpha(
            theme.palette.secondary.main,
            signatureAlpha * 0.88,
          )} 24%, ${alpha(
            theme.palette.info.main,
            signatureAlpha * 0.76,
          )} 48%, ${alpha(
            theme.palette.common.white,
            isDark ? signatureAlpha * 0.22 : signatureAlpha * 0.28,
          )} 62%, ${alpha(
            theme.palette.primary.main,
            signatureAlpha * 0.88,
          )} 100%)`
        : holoRail(theme, controls, scale(controls.extravagance, 0.18, 0.3), 132),
    ].join(", "),
    backgroundOrigin:
      "padding-box, padding-box, padding-box, padding-box, border-box",
    backgroundClip:
      "padding-box, padding-box, padding-box, padding-box, border-box",
    boxShadow: holoShadow(theme, controls, level, accent),
    ...blurStyle(
      controls,
      opts?.blurMin ?? (level === "overlay" ? 14 : 10),
      opts?.blurMax ?? (level === "overlay" ? 22 : 16),
    ),
  };
};

const calmSurface = (
  theme: Theme,
  controls: HoloLandingControls,
  accent = theme.palette.info.main,
) => ({
  ...holoFrame(theme, controls, {
    level: "surface",
    radius: Number(theme.shape.borderRadius) + 18,
    accent,
    panelAlpha: theme.palette.mode === "dark" ? 0.9 : 0.98,
    signatureAlpha: theme.palette.mode === "dark" ? 0.18 : 0.12,
    blurMin: 8,
    blurMax: 12,
    showBorderSpin: false,
  }),
});

const createComponents = (
  controls: HoloLandingControls,
): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => {
      const isDark = theme.palette.mode === "dark";

      return {
        ":root": {
          "--hl-primary": theme.palette.primary.main,
          "--hl-secondary": theme.palette.secondary.main,
          "--hl-info": theme.palette.info.main,
        },
        "@keyframes hlRotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "@keyframes hlRise": {
          "0%": { transform: "translateY(8px)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },
        "@keyframes hlRailPulse": {
          "0%, 100%": { opacity: 0.72 },
          "50%": { opacity: 1 },
        },
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
        html: {
          backgroundColor: theme.palette.background.default,
        },
        body: {
          minHeight: "100vh",
          position: "relative",
          overflowX: "hidden",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          backgroundImage: [
            `radial-gradient(1080px 620px at 14% 8%, ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, isDark ? 0.12 : 0.08, isDark ? 0.24 : 0.14),
            )} 0%, transparent 60%)`,
            `radial-gradient(980px 560px at 86% 10%, ${alpha(
              theme.palette.secondary.main,
              scale(controls.extravagance, isDark ? 0.1 : 0.06, isDark ? 0.18 : 0.1),
            )} 0%, transparent 62%)`,
            `radial-gradient(980px 560px at 61.8% 112%, ${alpha(
              theme.palette.info.main,
              scale(controls.extravagance, isDark ? 0.08 : 0.04, isDark ? 0.16 : 0.08),
            )} 0%, transparent 60%)`,
            `linear-gradient(180deg, ${alpha(
              theme.palette.background.default,
              isDark ? 0.08 : 0.9,
            )} 0%, transparent 18%, transparent 72%, ${alpha(
              theme.palette.background.default,
              isDark ? 0.8 : 0.98,
            )} 100%)`,
            `repeating-linear-gradient(0deg, ${alpha(
              holoInk(theme),
              isDark ? 0.03 : 0.015,
            )} 0px, ${alpha(
              holoInk(theme),
              isDark ? 0.03 : 0.015,
            )} 1px, transparent 1px, transparent 26px)`,
            `repeating-linear-gradient(90deg, ${alpha(
              theme.palette.common.white,
              isDark ? 0.018 : 0.012,
            )} 0px, ${alpha(
              theme.palette.common.white,
              isDark ? 0.018 : 0.012,
            )} 1px, transparent 1px, transparent 30px)`,
          ].join(", "),
          backgroundSize: "auto, auto, auto, auto, 160px 160px, 160px 160px",
          backgroundAttachment: "fixed",
        },
        "body::before": {
          content: "\"\"",
          position: "fixed",
          insetInlineStart: "-12vw",
          insetBlockStart: "8vh",
          width: "44vw",
          minWidth: 280,
          maxWidth: 680,
          height: 112,
          borderRadius: 999,
          pointerEvents: "none",
          backgroundImage: [
            `radial-gradient(68% 100% at 50% 50%, ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, 0.16, 0.28),
            )} 0%, transparent 72%)`,
            `linear-gradient(180deg, ${alpha(
              theme.palette.common.white,
              isDark ? 0.08 : 0.18,
            )} 0%, transparent 100%)`,
            holoRail(theme, controls, scale(controls.heroDrama, 0.44, 0.72), 102),
          ].join(", "),
          filter: `blur(${Math.round(scale(controls.blurBudget, 16, 28))}px)`,
          opacity: scale(controls.heroDrama, 0.78, 0.96),
          transform: "translate3d(-2%, 0, 0) rotate(-5deg)",
          animation: `hlRotate ${motionDuration(controls, 22000, 15000)}ms linear infinite`,
        },
        "body::after": {
          content: "\"\"",
          position: "fixed",
          insetInline: 0,
          insetBlockStart: 0,
          height: 3,
          pointerEvents: "none",
          backgroundImage: holoRail(
            theme,
            controls,
            scale(controls.extravagance, 0.74, 1),
            90,
          ),
          boxShadow: [
            `0 0 22px ${alpha(
              theme.palette.primary.main,
              scale(controls.ctaPower, 0.12, 0.22),
            )}`,
            `0 0 32px ${alpha(
              theme.palette.info.main,
              scale(controls.heroDrama, 0.08, 0.14),
            )}`,
          ].join(", "),
          animation: `hlRailPulse ${motionDuration(controls, 4600, 2800)}ms ease-in-out infinite`,
        },
        ".hl-metric": {
          fontFamily: FONT_MONO,
          letterSpacing: "-0.05em",
          textShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.12)}`,
          animation: "hlRise 380ms ease-out 1",
        },
        ".hl-surface-calm, [data-hl-surface='calm']": {
          ...calmSurface(theme, controls),
        },
        ".hl-panel-focus, [data-hl-surface='focus']": {
          ...holoFrame(theme, controls, {
            level: "elevated",
            radius: Number(theme.shape.borderRadius) + 22,
            panelAlpha: isDark ? 0.82 : 0.98,
            signatureAlpha: isDark ? 0.72 : 0.42,
          }),
        },
        ".hl-hero-panel, [data-hl-surface='hero']": {
          ...holoFrame(theme, controls, {
            level: "elevated",
            radius: Number(theme.shape.borderRadius) + 28,
            panelAlpha: isDark ? 0.84 : 0.99,
            signatureAlpha: isDark ? 0.78 : 0.44,
            blurMin: 12,
            blurMax: 18,
          }),
        },
        ".hl-showcase-card, [data-hl-card='showcase']": {
          ...holoFrame(theme, controls, {
            level: "overlay",
            radius: Number(theme.shape.borderRadius) + 34,
            panelAlpha: isDark ? 0.9 : 0.996,
            signatureAlpha: isDark ? 0.88 : 0.56,
            blurMin: 18,
            blurMax: 28,
          }),
        },
        "*::selection": {
          backgroundColor: alpha(theme.palette.primary.main, 0.24),
          color: isDark
            ? theme.palette.background.default
            : theme.palette.text.primary,
        },
        ":focus-visible": {
          outline: `2px solid ${alpha(
            theme.palette.primary.main,
            scale(controls.ctaPower, 0.48, 0.74),
          )}`,
          outlineOffset: 2,
        },
        a: {
          color: isDark ? theme.palette.info.light : theme.palette.info.dark,
          textDecorationColor: alpha(
            theme.palette.info.main,
            isDark ? 0.38 : 0.24,
          ),
          textUnderlineOffset: "3px",
          textDecorationThickness: 2,
        },
        code: {
          fontFamily: FONT_MONO,
        },
        "body.hl-showcase-mode, body[data-hl-scene='showcase']": {
          backgroundImage: [
            `radial-gradient(1180px 760px at 12% 6%, ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, isDark ? 0.18 : 0.12, isDark ? 0.3 : 0.18),
            )} 0%, transparent 62%)`,
            `radial-gradient(1120px 720px at 88% 8%, ${alpha(
              theme.palette.secondary.main,
              scale(controls.extravagance, isDark ? 0.16 : 0.1, isDark ? 0.26 : 0.16),
            )} 0%, transparent 64%)`,
            `radial-gradient(1040px 660px at 61.8% 116%, ${alpha(
              theme.palette.info.main,
              scale(controls.heroDrama, isDark ? 0.12 : 0.08, isDark ? 0.22 : 0.12),
            )} 0%, transparent 62%)`,
            `linear-gradient(180deg, ${alpha(
              theme.palette.background.default,
              isDark ? 0.04 : 0.84,
            )} 0%, transparent 18%, transparent 74%, ${alpha(
              theme.palette.background.default,
              isDark ? 0.76 : 0.98,
            )} 100%)`,
            `repeating-linear-gradient(0deg, ${alpha(
              holoInk(theme),
              isDark ? 0.038 : 0.02,
            )} 0px, ${alpha(
              holoInk(theme),
              isDark ? 0.038 : 0.02,
            )} 1px, transparent 1px, transparent 22px)`,
            `repeating-linear-gradient(90deg, ${alpha(
              theme.palette.common.white,
              isDark ? 0.026 : 0.016,
            )} 0px, ${alpha(
              theme.palette.common.white,
              isDark ? 0.026 : 0.016,
            )} 1px, transparent 1px, transparent 26px)`,
          ].join(", "),
        },
        "body.hl-showcase-mode::before, body[data-hl-scene='showcase']::before": {
          width: "52vw",
          maxWidth: 860,
          height: 156,
          insetInlineStart: "-14vw",
          insetBlockStart: "5vh",
          filter: `blur(${Math.round(scale(controls.blurBudget, 24, 40))}px)`,
          opacity: 1,
        },
        "body.hl-showcase-mode::after, body[data-hl-scene='showcase']::after": {
          height: 5,
          boxShadow: [
            `0 0 32px ${alpha(
              theme.palette.primary.main,
              scale(controls.ctaPower, 0.2, 0.32),
            )}`,
            `0 0 48px ${alpha(
              theme.palette.secondary.main,
              scale(controls.extravagance, 0.14, 0.24),
            )}`,
          ].join(", "),
        },
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
            scrollBehavior: "auto !important",
          },
          body: {
            backgroundAttachment: "scroll",
          },
          "body::before, body::after": {
            animation: "none",
            transform: "none",
          },
          ".hl-metric": {
            animation: "none",
          },
        },
        "@media (hover: none), (max-width: 900px)": {
          body: {
            backgroundAttachment: "scroll",
          },
          "body::before": {
            width: "60vw",
            maxWidth: 560,
            filter: `blur(${Math.round(scale(controls.blurBudget, 10, 16))}px)`,
          },
        },
      };
    },
  },

  MuiContainer: {
    defaultProps: { maxWidth: "lg" },
    styleOverrides: {
      root: ({ theme }) => {
        const heroPad = Math.round(scale(controls.heroDrama, 24, 40));

        return {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          position: "relative",
          [theme.breakpoints.up("sm")]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
          },
          [theme.breakpoints.up("lg")]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
          },
          "&[data-hl-section='hero']": {
            minHeight: `calc(100svh - var(--starter-header-height, 0px))`,
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
            display: "grid",
            alignContent: "center",
            gap: theme.spacing(3),
          },
          "&[data-hl-section='hero']::before": {
            content: "\"\"",
            position: "absolute",
            insetInline: 0,
            insetBlockStart: 0,
            height: 1,
            opacity: 0.72,
            pointerEvents: "none",
            backgroundImage: holoRail(
              theme,
              controls,
              scale(controls.extravagance, 0.42, 0.68),
              90,
            ),
          },
          "&[data-hl-section='hero'] > *": {
            position: "relative",
            zIndex: 1,
          },
          "&[data-hl-density='wide']": {
            maxWidth: `${theme.breakpoints.values.xl}px`,
          },
          "&[data-hl-section='hero'][data-hl-density='wide']": {
            paddingTop: `${heroPad}px`,
            paddingBottom: `${heroPad}px`,
          },
        };
      },
    },
  },

  MuiAppBar: {
    defaultProps: { color: "transparent" as const, elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          ...holoFrame(theme, controls, {
            level: "overlay",
            radius: Number(theme.shape.borderRadius) + 22,
            panelAlpha: isDark ? 0.58 : 0.96,
            signatureAlpha: isDark ? 0.3 : 0.18,
            blurMin: 12,
            blurMax: 18,
            showBorderSpin: false,
          }),
          borderRadius: Number(theme.shape.borderRadius) + 24,
          marginInline: theme.spacing(2),
          marginTop: theme.spacing(2),
          minHeight: 72,
          transition: theme.transitions.create(
            ["box-shadow", "transform", "background-color"],
            { duration: motionDuration(controls, 220, 320) },
          ),
          boxShadow: [
            holoShadow(theme, controls, "overlay", theme.palette.info.main),
            `0 1px 0 ${alpha(
              theme.palette.common.white,
              isDark ? 0.08 : 0.52,
            )} inset`,
          ].join(", "),
          "&::after": {
            content: "\"\"",
            position: "absolute",
            insetInline: 0,
            insetBlockEnd: 0,
            height: 1,
            pointerEvents: "none",
            opacity: 0.82,
            backgroundImage: holoRail(
              theme,
              controls,
              scale(controls.extravagance, 0.36, 0.62),
              90,
            ),
          },
          "&[data-hl-chrome='floating']": {
            marginInline: theme.spacing(3),
            marginTop: theme.spacing(3),
            borderRadius: Number(theme.shape.borderRadius) + 28,
          },
        };
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          ...calmSurface(theme, controls),
          transition: theme.transitions.create(
            ["transform", "box-shadow", "border-color", "background-color"],
            { duration: motionDuration(controls, 180, 260) },
          ),
          "&.hl-hero-panel, &[data-hl-surface='hero']": {
            ...holoFrame(theme, controls, {
              level: "elevated",
              radius: Number(theme.shape.borderRadius) + 26,
              panelAlpha: isDark ? 0.84 : 0.99,
              signatureAlpha: isDark ? 0.74 : 0.42,
              blurMin: 12,
              blurMax: 18,
            }),
            boxShadow: holoShadow(
              theme,
              controls,
              "elevated",
              theme.palette.secondary.main,
            ),
          },
          "&.hl-showcase-card, &[data-hl-surface='showcase']": {
            ...holoFrame(theme, controls, {
              level: "overlay",
              radius: Number(theme.shape.borderRadius) + 30,
              panelAlpha: isDark ? 0.86 : 0.995,
              signatureAlpha: isDark ? 0.82 : 0.48,
              blurMin: 16,
              blurMax: 24,
            }),
          },
          "&.hl-surface-calm, &[data-hl-surface='calm']": {
            ...calmSurface(theme, controls, theme.palette.info.main),
          },
          "&[data-hl-surface='overlay']": {
            ...holoFrame(theme, controls, {
              level: "overlay",
              radius: Number(theme.shape.borderRadius) + 24,
              panelAlpha: isDark ? 0.82 : 0.98,
              signatureAlpha: isDark ? 0.58 : 0.32,
              blurMin: 14,
              blurMax: 22,
            }),
          },
        };
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          ...holoFrame(theme, controls, {
            level: "elevated",
            radius: Number(theme.shape.borderRadius) + 22,
            panelAlpha: isDark ? 0.82 : 0.98,
            signatureAlpha: isDark ? 0.34 : 0.2,
            blurMin: 10,
            blurMax: 16,
            showBorderSpin: false,
          }),
          transition: theme.transitions.create(
            ["transform", "box-shadow", "border-color"],
            { duration: motionDuration(controls, 180, 260) },
          ),
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: [
              holoShadow(theme, controls, "elevated", theme.palette.primary.main),
              `0 0 ${Math.round(scale(controls.heroDrama, 28, 52))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.heroDrama, 0.08, 0.16),
              )}`,
            ].join(", "),
          },
          "&.hl-showcase-card, &[data-hl-card='showcase']": {
            ...holoFrame(theme, controls, {
              level: "overlay",
              radius: Number(theme.shape.borderRadius) + 30,
              panelAlpha: isDark ? 0.86 : 0.995,
              signatureAlpha: isDark ? 0.84 : 0.5,
              blurMin: 16,
              blurMax: 24,
            }),
            boxShadow: holoShadow(
              theme,
              controls,
              "overlay",
              theme.palette.secondary.main,
            ),
          },
        };
      },
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          textWrap: "pretty",
          "&.MuiTypography-h1, &.MuiTypography-h2": {
            textShadow: [
              `0 0 ${Math.round(scale(controls.heroDrama, 26, 46))}px ${alpha(
                theme.palette.primary.main,
                isDark ? 0.14 : 0.07,
              )}`,
              `0 0 ${Math.round(scale(controls.extravagance, 20, 36))}px ${alpha(
                theme.palette.secondary.main,
                isDark ? 0.1 : 0.05,
              )}`,
            ].join(", "),
          },
          "&.MuiTypography-h1": {
            maxWidth: "12ch",
          },
          "&.MuiTypography-h2": {
            maxWidth: "14ch",
          },
          "&.MuiTypography-subtitle2, &.MuiTypography-overline": {
            color: alpha(theme.palette.text.secondary, 0.96),
          },
          "&.hl-showcase-headline, &[data-hl-copy='showcase']": {
            fontSize: "clamp(3.2rem, 6.3vw, 5.6rem)",
            lineHeight: 0.88,
            textShadow: [
              `0 0 ${Math.round(scale(controls.heroDrama, 40, 70))}px ${alpha(
                theme.palette.primary.main,
                isDark ? 0.22 : 0.12,
              )}`,
              `0 0 ${Math.round(scale(controls.extravagance, 32, 58))}px ${alpha(
                theme.palette.secondary.main,
                isDark ? 0.16 : 0.1,
              )}`,
            ].join(", "),
            letterSpacing: "-0.082em",
          },
          "&.hl-metric, &[data-hl-copy='metric']": {
            fontFamily: FONT_MONO,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
          },
          "& code": {
            fontFamily: FONT_MONO,
            fontSize: "0.95em",
            padding: "0.12em 0.42em",
            borderRadius: 10,
            backgroundColor: alpha(
              theme.palette.text.primary,
              isDark ? 0.05 : 0.04,
            ),
            border: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
          },
          "& strong": {
            color: theme.palette.text.primary,
            fontWeight: 780,
          },
        };
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          borderColor: "transparent",
          position: "relative",
          height: 1,
          backgroundImage: `linear-gradient(90deg,
            transparent 0%,
            ${alpha(theme.palette.text.primary, isDark ? 0.1 : 0.08)} 14%,
            ${alpha(theme.palette.primary.main, scale(controls.extravagance, 0.14, 0.24))} 38%,
            ${alpha(theme.palette.info.main, scale(controls.heroDrama, 0.18, 0.3))} 50%,
            ${alpha(theme.palette.secondary.main, scale(controls.extravagance, 0.14, 0.24))} 62%,
            ${alpha(theme.palette.text.primary, isDark ? 0.08 : 0.06)} 86%,
            transparent 100%)`,
          opacity: 0.88,
          "&::after": {
            content: "\"\"",
            position: "absolute",
            insetInline: "18%",
            insetBlockStart: -1,
            height: 1,
            backgroundImage: holoRail(
              theme,
              controls,
              scale(controls.heroDrama, 0.26, 0.42),
              90,
            ),
            filter: `blur(${Math.round(scale(controls.blurBudget, 3, 6))}px)`,
            opacity: 0.7,
            pointerEvents: "none",
          },
          "&.MuiDivider-vertical": {
            width: 1,
            height: "auto",
            backgroundImage: `linear-gradient(180deg,
              transparent 0%,
              ${alpha(theme.palette.info.main, 0.18)} 50%,
              transparent 100%)`,
          },
          "&.MuiDivider-vertical::after": {
            insetInlineStart: -1,
            insetInlineEnd: "auto",
            insetBlock: "18%",
            width: 1,
            height: "64%",
          },
        };
      },
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 8,
        paddingInline: Math.round(scale(controls.ctaPower, 20, 28)),
        paddingBlock: Math.round(scale(controls.ctaPower, 12, 16)),
        minHeight: Math.round(scale(controls.ctaPower, 46, 58)),
        fontWeight: 860,
        position: "relative",
        overflow: "hidden",
        transform: "translateZ(0)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background-color", "border-color", "color"],
          { duration: motionDuration(controls, 180, 280) },
        ),
        "&::before": {
          content: "\"\"",
          position: "absolute",
          inset: 0,
          opacity: 0,
          backgroundImage: `linear-gradient(120deg,
            transparent 0%,
            ${alpha(theme.palette.common.white, 0.16)} 48%,
            transparent 100%)`,
          transform: "translateX(-100%)",
          transition: theme.transitions.create(["opacity", "transform"], {
            duration: motionDuration(controls, 220, 360),
          }),
          pointerEvents: "none",
        },
        "&:hover::before": {
          opacity: 1,
          transform: "translateX(0%)",
        },
        "&:hover": {
          transform: "translateY(-2px)",
        },
        "&:active": {
          transform: "translateY(0px)",
        },
        "&.hl-showcase-cta, &[data-hl-tone='showcase']": {
          minHeight: Math.round(scale(controls.ctaPower, 60, 68)),
          paddingInline: Math.round(scale(controls.ctaPower, 30, 38)),
          paddingBlock: Math.round(scale(controls.ctaPower, 15, 18)),
          letterSpacing: "0.14em",
        },
      }),

      sizeLarge: {
        minHeight: Math.round(scale(controls.ctaPower, 54, 62)),
        paddingInline: Math.round(scale(controls.ctaPower, 26, 32)),
        paddingBlock: Math.round(scale(controls.ctaPower, 14, 16)),
      },

      containedPrimary: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          color: theme.palette.primary.contrastText,
          border: `1px solid ${alpha(
            theme.palette.common.white,
            isDark ? 0.14 : 0.52,
          )}`,
          backgroundImage: [
            `radial-gradient(160% 140% at 0% 0%, ${alpha(
              theme.palette.common.white,
              isDark ? 0.18 : 0.24,
            )} 0%, transparent 52%)`,
            holoRail(
              theme,
              controls,
              scale(controls.ctaPower, 0.9, 1),
              126,
            ),
          ].join(", "),
          boxShadow: [
            `0 0 0 1px ${alpha(
              theme.palette.common.white,
              isDark ? 0.08 : 0.44,
            )} inset`,
            `0 ${Math.round(scale(controls.ctaPower, 20, 30))}px ${Math.round(
              scale(controls.ctaPower, 52, 88),
            )}px ${alpha("#000000", isDark ? 0.56 : 0.2)}`,
            `0 0 ${Math.round(scale(controls.ctaPower, 28, 54))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.ctaPower, 0.14, 0.26),
            )}`,
          ].join(", "),
          "&::after": {
            content: "\"\"",
            position: "absolute",
            inset: 1,
            borderRadius: "inherit",
            border: `1px solid ${alpha(
              theme.palette.common.white,
              isDark ? 0.08 : 0.36,
            )}`,
            pointerEvents: "none",
          },
          "&:hover": {
            boxShadow: [
              `0 0 0 1px ${alpha(
                theme.palette.common.white,
                isDark ? 0.1 : 0.5,
              )} inset`,
              `0 ${Math.round(scale(controls.ctaPower, 24, 34))}px ${Math.round(
                scale(controls.ctaPower, 64, 104),
              )}px ${alpha("#000000", isDark ? 0.66 : 0.24)}`,
              `0 0 ${Math.round(scale(controls.ctaPower, 36, 64))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.ctaPower, 0.18, 0.32),
              )}`,
            ].join(", "),
          },
          "&.Mui-focusVisible": {
            boxShadow: [
              holoFocusRing(theme, controls, 4),
              `0 ${Math.round(scale(controls.ctaPower, 22, 30))}px ${Math.round(
                scale(controls.ctaPower, 58, 90),
              )}px ${alpha("#000000", isDark ? 0.62 : 0.22)}`,
            ].join(", "),
          },
          "&.hl-showcase-cta, &[data-hl-tone='showcase']": {
            backgroundImage: [
              `radial-gradient(180% 160% at 0% 0%, ${alpha(
                theme.palette.common.white,
                isDark ? 0.24 : 0.3,
              )} 0%, transparent 54%)`,
              holoRail(theme, controls, 1, 118),
            ].join(", "),
            boxShadow: [
              `0 0 0 1px ${alpha(
                theme.palette.common.white,
                isDark ? 0.12 : 0.52,
              )} inset`,
              `0 ${Math.round(scale(controls.ctaPower, 32, 40))}px ${Math.round(
                scale(controls.ctaPower, 90, 132),
              )}px ${alpha("#000000", isDark ? 0.7 : 0.26)}`,
              `0 0 ${Math.round(scale(controls.ctaPower, 48, 82))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.ctaPower, 0.26, 0.42),
              )}`,
              `0 0 ${Math.round(scale(controls.extravagance, 28, 46))}px ${alpha(
                theme.palette.secondary.main,
                scale(controls.extravagance, 0.08, 0.16),
              )}`,
            ].join(", "),
          },
        };
      },

      containedSecondary: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          color: theme.palette.secondary.contrastText,
          border: `1px solid ${alpha(
            theme.palette.common.white,
            isDark ? 0.12 : 0.48,
          )}`,
          backgroundImage: `linear-gradient(132deg,
            ${alpha(theme.palette.secondary.main, isDark ? 0.72 : 0.44)} 0%,
            ${alpha(theme.palette.info.main, isDark ? 0.58 : 0.3)} 100%)`,
          boxShadow: `0 0 ${Math.round(scale(controls.extravagance, 18, 34))}px ${alpha(
            theme.palette.secondary.main,
            scale(controls.extravagance, 0.12, 0.22),
          )}`,
        };
      },

      outlinedPrimary: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          color: theme.palette.text.primary,
          borderWidth: 1,
          borderColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.2 : 0.14,
          ),
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.045 : 0.03,
          ),
          boxShadow: `0 0 0 1px ${alpha(
            theme.palette.common.white,
            isDark ? 0.03 : 0.22,
          )} inset`,
          "&:hover": {
            borderColor: alpha(theme.palette.primary.main, 0.34),
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.06,
            ),
            boxShadow: `0 0 ${Math.round(scale(controls.heroDrama, 20, 36))}px ${alpha(
              theme.palette.info.main,
              scale(controls.heroDrama, 0.08, 0.14),
            )}`,
          },
          "&.Mui-focusVisible": {
            boxShadow: holoFocusRing(theme, controls, 3),
          },
        };
      },

      textPrimary: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          color: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.05,
            ),
          },
          "&.Mui-focusVisible": {
            boxShadow: holoFocusRing(theme, controls, 2),
          },
        };
      },
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          borderRadius: Number(theme.shape.borderRadius) + 8,
          border: `1px solid ${alpha(
            theme.palette.text.primary,
            isDark ? 0.16 : 0.1,
          )}`,
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.04 : 0.025,
          ),
          boxShadow: `0 0 0 1px ${alpha(
            theme.palette.common.white,
            isDark ? 0.03 : 0.2,
          )} inset`,
          transition: theme.transitions.create(
            ["transform", "box-shadow", "border-color", "background-color"],
            { duration: motionDuration(controls, 160, 240) },
          ),
          "&:hover": {
            transform: "translateY(-1px)",
            borderColor: alpha(theme.palette.primary.main, 0.26),
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.05,
            ),
            boxShadow: `0 0 ${Math.round(scale(controls.extravagance, 16, 30))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.extravagance, 0.1, 0.18),
            )}`,
          },
          "&.Mui-focusVisible": {
            boxShadow: holoFocusRing(theme, controls, 3),
          },
        };
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          borderRadius: Number(theme.shape.borderRadius) + 12,
          minHeight: 34,
          fontFamily: FONT_MONO,
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          border: `1px solid ${alpha(
            theme.palette.text.primary,
            isDark ? 0.16 : 0.1,
          )}`,
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.045 : 0.03,
          ),
          boxShadow: `0 0 0 1px ${alpha(
            theme.palette.common.white,
            isDark ? 0.03 : 0.18,
          )} inset`,
          "&.MuiChip-clickable:hover": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.05,
            ),
            borderColor: alpha(theme.palette.primary.main, 0.22),
          },
          "&.MuiChip-colorPrimary": {
            color: theme.palette.primary.main,
            borderColor: alpha(theme.palette.primary.main, 0.3),
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.12 : 0.08,
            ),
          },
          "&.MuiChip-colorSecondary": {
            color: theme.palette.secondary.main,
            borderColor: alpha(theme.palette.secondary.main, 0.28),
            backgroundColor: alpha(
              theme.palette.secondary.main,
              isDark ? 0.12 : 0.08,
            ),
          },
        };
      },
      label: {
        paddingInline: 12,
      },
      icon: ({ theme }) => ({
        color: alpha(theme.palette.text.primary, 0.78),
      }),
      deleteIcon: ({ theme }) => ({
        color: alpha(theme.palette.text.primary, 0.68),
      }),
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 10,
        backgroundImage: holoRail(
          theme,
          controls,
          scale(controls.extravagance, 0.26, 0.44),
          128,
        ),
        color: theme.palette.text.primary,
        boxShadow: `0 0 0 1px ${alpha(
          theme.palette.common.white,
          theme.palette.mode === "dark" ? 0.08 : 0.4,
        )} inset`,
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          borderRadius: Number(theme.shape.borderRadius) + 18,
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.045 : 0.03,
          ),
          boxShadow: `0 0 0 1px ${alpha(
            theme.palette.common.white,
            isDark ? 0.03 : 0.2,
          )} inset`,
          ...blurStyle(controls, 8, 12),
          transition: theme.transitions.create(
            ["box-shadow", "border-color", "background-color"],
            { duration: motionDuration(controls, 160, 220) },
          ),
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(
              theme.palette.text.primary,
              isDark ? 0.24 : 0.16,
            ),
          },
          "&.Mui-focused": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.05,
            ),
            boxShadow: holoFocusRing(theme, controls, 3),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(theme.palette.primary.main, 0.64),
          },
        };
      },
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.16 : 0.1,
        ),
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
        fontWeight: 800,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: alpha(theme.palette.text.secondary, 0.92),
        "&.Mui-focused": { color: theme.palette.primary.main },
        "&.MuiInputLabel-shrink": {
          letterSpacing: "0.1em",
        },
      }),
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginInline: 6,
        marginTop: 8,
        fontFamily: FONT_MONO,
        fontSize: "0.74rem",
        letterSpacing: "0.03em",
        color: alpha(theme.palette.text.secondary, 0.88),
      }),
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 52,
        borderRadius: Number(theme.shape.borderRadius) + 14,
        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        backgroundColor: alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.035 : 0.02,
        ),
        padding: 4,
        ...blurStyle(controls, 8, 12),
      }),
      scroller: {
        overflow: "visible !important",
      },
      indicator: ({ theme }) => ({
        height: "calc(100% - 8px)",
        top: 4,
        bottom: 4,
        borderRadius: Number(theme.shape.borderRadius) + 10,
        backgroundImage: [
          `radial-gradient(100% 100% at 0% 0%, ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.08 : 0.22,
          )} 0%, transparent 50%)`,
          holoRail(
            theme,
            controls,
            scale(controls.extravagance, 0.42, 0.66),
            126,
          ),
        ].join(", "),
        boxShadow: `0 0 ${Math.round(scale(controls.extravagance, 16, 30))}px ${alpha(
          theme.palette.primary.main,
          scale(controls.extravagance, 0.08, 0.16),
        )}`,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 44,
        borderRadius: Number(theme.shape.borderRadius) + 10,
        fontFamily: FONT_DISPLAY,
        fontWeight: 840,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: alpha(theme.palette.text.primary, 0.78),
        position: "relative",
        zIndex: 1,
        transition: theme.transitions.create(["color", "transform"], {
          duration: motionDuration(controls, 160, 220),
        }),
        "&:hover": {
          color: theme.palette.text.primary,
        },
        "&.Mui-selected": {
          color: theme.palette.text.primary,
          textShadow: `0 0 ${Math.round(scale(controls.heroDrama, 12, 22))}px ${alpha(
            theme.palette.primary.main,
            scale(controls.heroDrama, 0.08, 0.14),
          )}`,
        },
      }),
    },
  },

  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 54,
        height: 34,
        padding: 7,
      },
      switchBase: ({ theme }) => ({
        padding: 9,
        "&.Mui-checked": {
          transform: "translateX(20px)",
          color: theme.palette.primary.contrastText,
          "& + .MuiSwitch-track": {
            backgroundImage: holoRail(
              theme,
              controls,
              scale(controls.ctaPower, 0.42, 0.66),
              128,
            ),
            opacity: 1,
            borderColor: alpha(theme.palette.primary.main, 0.36),
          },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
          boxShadow: holoFocusRing(theme, controls, 2),
        },
      }),
      thumb: ({ theme }) => ({
        width: 16,
        height: 16,
        borderRadius: 999,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 0 1px ${alpha(
          theme.palette.common.white,
          theme.palette.mode === "dark" ? 0.08 : 0.34,
        )} inset`,
      }),
      track: ({ theme }) => ({
        borderRadius: 999,
        border: `1px solid ${alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.14 : 0.1,
        )}`,
        opacity: 1,
        backgroundColor: alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.08 : 0.05,
        ),
      }),
    },
  },

  MuiSlider: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.primary.main,
        height: 4,
        paddingBlock: 18,
      }),
      rail: ({ theme }) => ({
        height: 4,
        borderRadius: 999,
        opacity: 1,
        backgroundColor: alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.12 : 0.08,
        ),
      }),
      track: ({ theme }) => ({
        height: 4,
        border: "none",
        borderRadius: 999,
        backgroundImage: holoRail(
          theme,
          controls,
          scale(controls.extravagance, 0.52, 0.78),
          90,
        ),
        boxShadow: `0 0 ${Math.round(scale(controls.extravagance, 12, 24))}px ${alpha(
          theme.palette.primary.main,
          scale(controls.extravagance, 0.08, 0.16),
        )}`,
      }),
      thumb: ({ theme }) => ({
        width: 18,
        height: 18,
        border: `2px solid ${alpha(
          theme.palette.common.white,
          theme.palette.mode === "dark" ? 0.12 : 0.6,
        )}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 ${Math.round(scale(controls.heroDrama, 14, 28))}px ${alpha(
          theme.palette.primary.main,
          scale(controls.heroDrama, 0.12, 0.22),
        )}`,
      }),
      valueLabel: ({ theme }) => ({
        fontFamily: FONT_MONO,
        borderRadius: Number(theme.shape.borderRadius) + 6,
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.92 : 0.96,
        ),
        color: theme.palette.text.primary,
      }),
    },
  },

  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 999,
        overflow: "hidden",
        backgroundColor: alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.08 : 0.05,
        ),
      }),
      bar: ({ theme }) => ({
        borderRadius: 999,
        backgroundImage: holoRail(
          theme,
          controls,
          scale(controls.ctaPower, 0.62, 0.88),
          90,
        ),
        boxShadow: `0 0 ${Math.round(scale(controls.ctaPower, 16, 30))}px ${alpha(
          theme.palette.primary.main,
          scale(controls.ctaPower, 0.1, 0.18),
        )}`,
      }),
    },
  },

  MuiAccordion: {
    defaultProps: {
      disableGutters: true,
      elevation: 0,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        ...calmSurface(theme, controls, theme.palette.info.main),
        borderRadius: Number(theme.shape.borderRadius) + 20,
        "&::before": {
          display: "none",
        },
        "&.Mui-expanded": {
          margin: 0,
        },
      }),
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        minHeight: 64,
        paddingInline: 20,
        "&.Mui-expanded": {
          minHeight: 64,
        },
      },
      content: {
        marginBlock: 16,
        alignItems: "center",
        gap: 12,
        "&.Mui-expanded": {
          marginBlock: 16,
        },
      },
      expandIconWrapper: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 6,
        backgroundColor: alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.06 : 0.04,
        ),
        padding: 4,
      }),
    },
  },

  MuiAccordionDetails: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(0, 2.5, 2.5),
        color: alpha(theme.palette.text.secondary, 0.94),
      }),
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...calmSurface(theme, controls, theme.palette.info.main),
        alignItems: "flex-start",
        borderRadius: Number(theme.shape.borderRadius) + 18,
      }),
      icon: ({ theme }) => ({
        color: alpha(theme.palette.text.primary, 0.92),
      }),
      message: {
        paddingBlock: 2,
      },
      action: ({ theme }) => ({
        paddingTop: 2,
        color: alpha(theme.palette.text.secondary, 0.88),
      }),
    },
  },

  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...calmSurface(theme, controls, theme.palette.info.main),
        borderRadius: Number(theme.shape.borderRadius) + 22,
      }),
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.05 : 0.03,
        ),
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderBottom: `1px solid ${alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.08 : 0.06,
        )}`,
        paddingInline: 18,
      }),
      head: ({ theme }) => ({
        fontFamily: FONT_MONO,
        fontSize: "0.76rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: alpha(theme.palette.text.secondary, 0.94),
      }),
      body: ({ theme }) => ({
        color: alpha(theme.palette.text.primary, 0.92),
      }),
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create(["background-color", "transform"], {
          duration: motionDuration(controls, 140, 220),
        }),
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.05 : 0.035,
          ),
        },
      }),
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...holoFrame(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 12,
          panelAlpha: theme.palette.mode === "dark" ? 0.9 : 0.98,
          signatureAlpha: theme.palette.mode === "dark" ? 0.24 : 0.14,
          blurMin: 10,
          blurMax: 14,
          showBorderSpin: false,
        }),
        padding: theme.spacing(1, 1.25),
        color: theme.palette.text.primary,
        fontFamily: FONT_MONO,
        fontSize: "0.74rem",
        letterSpacing: "0.03em",
      }),
      arrow: ({ theme }) => ({
        color: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.88 : 0.96,
        ),
      }),
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...holoFrame(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 28,
          panelAlpha: theme.palette.mode === "dark" ? 0.84 : 0.985,
          signatureAlpha: theme.palette.mode === "dark" ? 0.46 : 0.28,
          blurMin: 16,
          blurMax: 24,
        }),
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.88 : 0.985,
        ),
      }),
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(2.5, 3, 1.5),
        fontFamily: FONT_DISPLAY,
        fontWeight: 840,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        borderBottom: `1px solid ${alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.08 : 0.06,
        )}`,
      }),
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(2.5, 3),
        color: alpha(theme.palette.text.secondary, 0.94),
      }),
    },
  },

  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(1.5, 3, 3),
        borderTop: `1px solid ${alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.08 : 0.06,
        )}`,
      }),
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...holoFrame(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 16,
          panelAlpha: theme.palette.mode === "dark" ? 0.9 : 0.985,
          signatureAlpha: theme.palette.mode === "dark" ? 0.28 : 0.16,
          blurMin: 14,
          blurMax: 20,
          showBorderSpin: false,
        }),
      }),
      list: {
        padding: 6,
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 8,
        minHeight: 40,
        marginBlock: 2,
        transition: theme.transitions.create(
          ["background-color", "transform", "color"],
          { duration: motionDuration(controls, 140, 220) },
        ),
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.08 : 0.05,
          ),
          transform: "translateX(2px)",
        },
        "&.Mui-selected": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.12 : 0.08,
          ),
        },
      }),
    },
  },

  MuiBackdrop: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.background.default,
          theme.palette.mode === "dark" ? 0.66 : 0.48,
        ),
        backdropFilter: `blur(${Math.round(scale(controls.blurBudget, 8, 14))}px)`,
        WebkitBackdropFilter: `blur(${Math.round(
          scale(controls.blurBudget, 8, 14),
        )}px)`,
      }),
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...holoFrame(theme, controls, {
          level: "overlay",
          radius: 0,
          panelAlpha: theme.palette.mode === "dark" ? 0.86 : 0.985,
          signatureAlpha: theme.palette.mode === "dark" ? 0.32 : 0.18,
          blurMin: 16,
          blurMax: 24,
          showBorderSpin: false,
        }),
        border: "none",
      }),
    },
  },

  MuiLink: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.info.main,
        fontWeight: 700,
        textDecorationColor: alpha(theme.palette.info.main, 0.26),
        textUnderlineOffset: "0.22em",
        transition: theme.transitions.create(["color", "text-decoration-color"], {
          duration: motionDuration(controls, 140, 220),
        }),
        "&:hover": {
          color: theme.palette.primary.main,
          textDecorationColor: alpha(theme.palette.primary.main, 0.36),
        },
      }),
    },
  },
});

export const holographicLedgerLight = {
  name: "Holographic Ledger Light",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#42C58A",
      dark: "#2B9B6A",
      light: "#9BE6C1",
      contrastText: "#082016",
    },

    secondary: {
      main: "#D86CD1",
      dark: "#B04CAC",
      light: "#F0B1EA",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#5D84EA",
      dark: "#4161C0",
      light: "#B0C3F8",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#42C58A",
      dark: "#2B9B6A",
      light: "#9BE6C1",
      contrastText: "#082016",
    },

    warning: {
      main: "#D79B31",
      dark: "#AD7A1F",
      light: "#F2CB7F",
      contrastText: "#281B06",
    },

    error: {
      main: "#D95F75",
      dark: "#B8465B",
      light: "#F2A8B6",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F6F8FC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#192137",
      secondary: "#636D88",
      disabled: alpha("#192137", 0.42),
    },

    divider: alpha("#192137", 0.1),

    action: {
      hover: alpha("#192137", 0.04),
      selected: alpha("#42C58A", 0.08),
      focus: alpha("#5D84EA", 0.16),
      active: alpha("#192137", 0.56),
      disabled: alpha("#192137", 0.26),
      disabledBackground: alpha("#192137", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 18 },
  spacing: 8,

  components: createComponents(lightControls),
} satisfies NamedThemeOptions;

export const holographicLedger = {
  name: "Holographic Ledger",
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: "#7CFFB2",
      dark: "#3FF08F",
      light: "#BFFFF0",
      contrastText: "#061019",
    },

    secondary: {
      main: "#FF7AF2",
      dark: "#E34DD6",
      light: "#FFC2FA",
      contrastText: "#09030B",
    },

    info: {
      main: "#6F9BFF",
      dark: "#3D78FF",
      light: "#AEC2FF",
      contrastText: "#061019",
    },

    success: {
      main: "#7CFFB2",
      dark: "#3FF08F",
      light: "#BFFFF0",
      contrastText: "#061019",
    },

    warning: {
      main: "#FFD36B",
      dark: "#FFBF3B",
      light: "#FFE3A5",
      contrastText: "#12100A",
    },

    error: {
      main: "#FF5C7A",
      dark: "#FF3158",
      light: "#FFB3C1",
      contrastText: "#12060A",
    },

    background: {
      default: "#060610",
      paper: "#0B1022",
    },

    text: {
      primary: "#F2F6FF",
      secondary: "#B9C3E6",
      disabled: alpha("#F2F6FF", 0.44),
    },

    divider: alpha("#F2F6FF", 0.1),

    action: {
      hover: alpha("#F2F6FF", 0.06),
      selected: alpha("#F2F6FF", 0.1),
      focus: alpha("#7CFFB2", 0.22),
      active: alpha("#F2F6FF", 0.62),
      disabled: alpha("#F2F6FF", 0.26),
      disabledBackground: alpha("#F2F6FF", 0.08),
    },
  },

  typography,

  shape: { borderRadius: 18 },
  spacing: 8,

  components: createComponents(darkControls),
} satisfies NamedThemeOptions;
