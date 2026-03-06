import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Kintsugi Protocol
 * Visual: calm ceramic surfaces with restrained metallic seams.
 */

const FONT_DISPLAY =
  '"Plus Jakarta Sans","Space Grotesk","Sora","Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_TEXT = '"Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_MONO =
  '"JetBrains Mono","IBM Plex Mono","Roboto Mono","Menlo","Consolas",monospace';

const KINTSUGI_RADIUS = 20;

type KintsugiLandingControls = {
  luxuryLevel: number;
  extravagance: number;
  heroDrama: number;
  ctaPower: number;
  motionPolish: number;
  blurBudget: number;
};

type KintsugiSurfaceLevel = "surface" | "elevated" | "overlay";

const clampUnit = (value: number): number => Math.min(1, Math.max(0, value));

const scale = (value: number, min: number, max: number): number =>
  min + (max - min) * clampUnit(value);

const createLandingControls = (
  controls: KintsugiLandingControls,
): KintsugiLandingControls => ({
  luxuryLevel: clampUnit(controls.luxuryLevel),
  extravagance: clampUnit(controls.extravagance),
  heroDrama: clampUnit(controls.heroDrama),
  ctaPower: clampUnit(controls.ctaPower),
  motionPolish: clampUnit(controls.motionPolish),
  blurBudget: clampUnit(controls.blurBudget),
});

const lightControls = createLandingControls({
  luxuryLevel: 0.92,
  extravagance: 0.84,
  heroDrama: 0.9,
  ctaPower: 0.94,
  motionPolish: 0.84,
  blurBudget: 0.7,
});

const darkControls = createLandingControls({
  luxuryLevel: 0.96,
  extravagance: 0.9,
  heroDrama: 0.96,
  ctaPower: 0.98,
  motionPolish: 0.88,
  blurBudget: 0.78,
});

const typography = {
  fontFamily: FONT_TEXT,

  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    fontSize: "clamp(2.8rem, 5.6vw, 4.8rem)",
    lineHeight: 0.94,
    letterSpacing: "-0.06em",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 860,
    fontSize: "clamp(1.95rem, 3.7vw, 3rem)",
    lineHeight: 0.98,
    letterSpacing: "-0.04em",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 820,
    fontSize: "clamp(1.28rem, 2.2vw, 1.9rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.022em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 790,
    fontSize: "1.18rem",
    lineHeight: 1.18,
    letterSpacing: "-0.014em",
  },

  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 760,
    fontSize: "1.04rem",
    lineHeight: 1.54,
    letterSpacing: "0.008em",
  },
  subtitle2: {
    fontFamily: FONT_MONO,
    fontWeight: 760,
    fontSize: "0.92rem",
    lineHeight: 1.44,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },

  body1: { fontSize: "1rem", lineHeight: 1.78, letterSpacing: "0.006em" },
  body2: { fontSize: "0.92rem", lineHeight: 1.68, letterSpacing: "0.005em" },

  button: {
    fontFamily: FONT_MONO,
    textTransform: "uppercase",
    fontWeight: 860,
    letterSpacing: "0.08em",
  },

  caption: {
    fontFamily: FONT_MONO,
    fontSize: "0.8rem",
    letterSpacing: "0.03em",
  },
  overline: {
    fontFamily: FONT_MONO,
    fontSize: "0.74rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: 900,
  },
} as const;

interface KintsugiSurfaceOptions {
  level?: KintsugiSurfaceLevel;
  radius?: number;
  accent?: string;
  paperTint?: string;
  paperAlpha?: number;
  borderAlpha?: number;
  seamAlpha?: number;
  sheenAlpha?: number;
  blurMin?: number;
  blurMax?: number;
  showSeam?: boolean;
}

const kintsugiInk = (theme: Theme): string =>
  theme.palette.mode === "dark" ? theme.palette.common.white : "#1A1C28";

const motionDuration = (
  controls: KintsugiLandingControls,
  min: number,
  max: number,
): number => Math.round(scale(controls.motionPolish, min, max));

const blurStyle = (
  controls: KintsugiLandingControls,
  min: number,
  max: number,
) => {
  const blur = Math.round(scale(controls.blurBudget, min, max));
  const mobileBlur = Math.max(4, Math.round(blur * 0.62));

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    "@media (hover: none), (max-width: 900px)": {
      backdropFilter: `blur(${mobileBlur}px)`,
      WebkitBackdropFilter: `blur(${mobileBlur}px)`,
    },
  };
};

const kintsugiSeam = (
  theme: Theme,
  controls: KintsugiLandingControls,
  opacity = 1,
  angle = 118,
): string =>
  `linear-gradient(${angle}deg,
    transparent 0%,
    transparent 38%,
    ${alpha(
      theme.palette.primary.main,
      scale(controls.extravagance, 0.08, 0.18) * opacity,
    )} 41%,
    ${alpha(
      theme.palette.primary.light ?? theme.palette.primary.main,
      scale(controls.ctaPower, 0.16, 0.28) * opacity,
    )} 43%,
    ${alpha(
      theme.palette.primary.main,
      scale(controls.extravagance, 0.08, 0.18) * opacity,
    )} 45%,
    transparent 48%,
    transparent 100%)`;

const kintsugiFocusRing = (
  theme: Theme,
  controls: KintsugiLandingControls,
  width = 4,
): string =>
  [
    `0 0 0 ${width}px ${alpha(
      theme.palette.primary.main,
      scale(controls.ctaPower, 0.14, 0.24),
    )}`,
    `0 0 ${Math.round(scale(controls.heroDrama, 18, 34))}px ${alpha(
      theme.palette.primary.main,
      scale(controls.extravagance, 0.1, 0.2),
    )}`,
  ].join(", ");

const kintsugiShadow = (
  theme: Theme,
  controls: KintsugiLandingControls,
  level: KintsugiSurfaceLevel,
  accent = theme.palette.primary.main,
): string => {
  const isDark = theme.palette.mode === "dark";
  const lift =
    level === "overlay"
      ? scale(controls.luxuryLevel, 24, 38)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 18, 30)
        : scale(controls.luxuryLevel, 14, 22);
  const blur =
    level === "overlay"
      ? scale(controls.luxuryLevel, 56, 92)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 40, 72)
        : scale(controls.luxuryLevel, 28, 54);
  const baseAlpha =
    level === "overlay"
      ? isDark
        ? 0.6
        : 0.18
      : level === "elevated"
        ? isDark
          ? 0.5
          : 0.15
        : isDark
          ? 0.38
          : 0.12;

  return [
    `0 ${Math.round(lift)}px ${Math.round(blur)}px ${alpha("#000000", baseAlpha)}`,
    `0 0 ${Math.round(scale(controls.extravagance, 18, 36))}px ${alpha(
      accent,
      scale(controls.extravagance, 0.06, 0.14),
    )}`,
    `0 0 0 1px ${alpha(
      kintsugiInk(theme),
      isDark ? 0.03 : 0.04,
    )} inset`,
  ].join(", ");
};

const kintsugiSurface = (
  theme: Theme,
  controls: KintsugiLandingControls,
  opts?: KintsugiSurfaceOptions,
) => {
  const level = opts?.level ?? "surface";
  const radius =
    opts?.radius ??
    (level === "overlay"
      ? KINTSUGI_RADIUS + 16
      : level === "elevated"
        ? KINTSUGI_RADIUS + 12
        : KINTSUGI_RADIUS + 8);
  const accent = opts?.accent ?? theme.palette.primary.main;
  const paperTint = opts?.paperTint ?? theme.palette.background.paper;
  const paperAlpha =
    opts?.paperAlpha ??
    (level === "overlay"
      ? theme.palette.mode === "dark"
        ? 0.86
        : 0.99
      : theme.palette.mode === "dark"
        ? 0.8
        : 0.975);
  const borderAlpha =
    opts?.borderAlpha ?? (theme.palette.mode === "dark" ? 0.12 : 0.08);
  const seamAlpha =
    opts?.seamAlpha ??
    scale(
      controls.extravagance,
      theme.palette.mode === "dark" ? 0.08 : 0.04,
      theme.palette.mode === "dark" ? 0.16 : 0.08,
    );
  const sheenAlpha =
    opts?.sheenAlpha ??
    scale(
      controls.luxuryLevel,
      theme.palette.mode === "dark" ? 0.12 : 0.08,
      theme.palette.mode === "dark" ? 0.2 : 0.14,
    );
  const showSeam = opts?.showSeam ?? true;

  const ink = kintsugiInk(theme);
  const gold = accent;

  return {
    position: "relative" as const,
    borderRadius: radius,
    overflow: "hidden" as const,
    isolation: "isolate" as const,
    backgroundColor: alpha(paperTint, paperAlpha),
    border: `1px solid transparent`,
    backgroundImage: [
      `linear-gradient(160deg,
        ${alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.08 : 0.24)} 0%,
        ${alpha(paperTint, Math.min(0.995, paperAlpha + 0.03))} 18%,
        ${alpha(paperTint, paperAlpha)} 62%,
        ${alpha(gold, scale(controls.extravagance, 0.03, 0.08))} 100%)`,
      `radial-gradient(380px 180px at 12% 0%, ${alpha(
        theme.palette.primary.main,
        scale(controls.heroDrama, 0.06, 0.14),
      )} 0%, transparent 68%)`,
      `radial-gradient(340px 160px at 88% 0%, ${alpha(
        theme.palette.secondary.main,
        scale(controls.extravagance, 0.04, 0.1),
      )} 0%, transparent 68%)`,
      `radial-gradient(140% 90% at 50% 118%, ${alpha(
        theme.palette.info.main,
        scale(controls.luxuryLevel, 0.03, 0.08),
      )} 0%, transparent 58%)`,
      `linear-gradient(${alpha(ink, borderAlpha)} 0 0)`,
    ].join(", "),
    backgroundOrigin:
      "padding-box, padding-box, padding-box, padding-box, border-box",
    backgroundClip:
      "padding-box, padding-box, padding-box, padding-box, border-box",
    boxShadow: kintsugiShadow(theme, controls, level, gold),
    ...blurStyle(
      controls,
      opts?.blurMin ?? (level === "overlay" ? 12 : 8),
      opts?.blurMax ?? (level === "overlay" ? 20 : 14),
    ),

    "&::before": {
      content: '""',
      position: "absolute" as const,
      inset: 0,
      pointerEvents: "none" as const,
      backgroundImage: [
        kintsugiSeam(theme, controls, seamAlpha * 4, 115),
        kintsugiSeam(theme, controls, seamAlpha * 4.8, 130),
        `radial-gradient(200px 90px at 54% 46%,
          ${alpha(gold, seamAlpha * 1.6)} 0%,
          transparent 62%)`,
      ].join(", "),
      mixBlendMode: "screen" as const,
      opacity: showSeam ? 0.9 : 0,
    },

    "&::after": {
      content: '""',
      position: "absolute" as const,
      left: -1,
      right: -1,
      top: -1,
      height: 110,
      background: `linear-gradient(180deg,
        ${alpha(theme.palette.common.white, sheenAlpha)} 0%,
        ${alpha(theme.palette.common.white, sheenAlpha * 0.34)} 45%,
        transparent 100%)`,
      opacity: 0.72,
      pointerEvents: "none" as const,
      mixBlendMode: "screen" as const,
    },
  };
};

const calmSurface = (
  theme: Theme,
  controls: KintsugiLandingControls,
  accent = theme.palette.info.main,
) => ({
  ...kintsugiSurface(theme, controls, {
    level: "surface",
    radius: Number(theme.shape.borderRadius) + 20,
    accent,
    paperAlpha: theme.palette.mode === "dark" ? 0.9 : 0.98,
    borderAlpha: theme.palette.mode === "dark" ? 0.09 : 0.07,
    seamAlpha: theme.palette.mode === "dark" ? 0.04 : 0.02,
    sheenAlpha: theme.palette.mode === "dark" ? 0.12 : 0.08,
    blurMin: 8,
    blurMax: 12,
    showSeam: false,
  }),
});

const createComponents = (
  controls: KintsugiLandingControls,
): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => {
      const isDark = theme.palette.mode === "dark";

      return {
        ":root": {
          "--kp-gold": theme.palette.primary.main,
          "--kp-ink": theme.palette.text.primary,
        },

        "@keyframes kpRise": {
          "0%": { transform: "translateY(8px)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },
        "@keyframes kpGlowPulse": {
          "0%, 100%": { opacity: 0.74 },
          "50%": { opacity: 1 },
        },

        "*, *::before, *::after": { boxSizing: "border-box" },

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
            `radial-gradient(1020px 620px at 14% 8%, ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, isDark ? 0.12 : 0.07, isDark ? 0.22 : 0.12),
            )} 0%, transparent 62%)`,
            `radial-gradient(920px 540px at 86% 10%, ${alpha(
              theme.palette.secondary.main,
              scale(controls.extravagance, isDark ? 0.08 : 0.04, isDark ? 0.14 : 0.08),
            )} 0%, transparent 64%)`,
            `radial-gradient(940px 560px at 61.8% 112%, ${alpha(
              theme.palette.info.main,
              scale(controls.luxuryLevel, isDark ? 0.05 : 0.03, isDark ? 0.1 : 0.06),
            )} 0%, transparent 62%)`,
            `linear-gradient(180deg, ${alpha(
              theme.palette.background.default,
              isDark ? 0.08 : 0.86,
            )} 0%, transparent 18%, transparent 76%, ${alpha(
              theme.palette.background.default,
              isDark ? 0.8 : 0.98,
            )} 100%)`,
          ].join(", "),
          backgroundAttachment: "fixed",
        },

        "body::before": {
          content: "\"\"",
          position: "fixed",
          insetInline: 0,
          insetBlockStart: 0,
          height: 5,
          pointerEvents: "none",
          backgroundImage: kintsugiSeam(
            theme,
            controls,
            scale(controls.heroDrama, 3.2, 4.8),
            90,
          ),
          boxShadow: [
            `0 0 ${Math.round(scale(controls.heroDrama, 22, 40))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, 0.14, 0.28),
            )}`,
            `0 0 ${Math.round(scale(controls.extravagance, 18, 32))}px ${alpha(
              theme.palette.secondary.main,
              scale(controls.extravagance, 0.06, 0.12),
            )}`,
          ].join(", "),
          animation: `kpGlowPulse ${motionDuration(controls, 3600, 2200)}ms ease-in-out infinite`,
        },

        "body::after": {
          content: "\"\"",
          position: "fixed",
          insetInlineStart: "-14vw",
          insetBlockStart: "6vh",
          width: "44vw",
          minWidth: 260,
          maxWidth: 820,
          height: 148,
          borderRadius: 999,
          pointerEvents: "none",
          backgroundImage: [
            `radial-gradient(72% 100% at 50% 50%, ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, 0.18, 0.32),
            )} 0%, transparent 72%)`,
            kintsugiSeam(
              theme,
              controls,
              scale(controls.extravagance, 2.8, 4.2),
              112,
            ),
          ].join(", "),
          filter: `blur(${Math.round(scale(controls.blurBudget, 18, 32))}px)`,
          opacity: scale(controls.heroDrama, 0.86, 1),
          transform: "translate3d(0, 0, 0) rotate(-6deg)",
        },

        ".kp-seam": {
          position: "relative",
          display: "inline-block",
        },
        ".kp-seam::after": {
          content: '""',
          position: "absolute",
          left: "-2%",
          right: "-2%",
          bottom: "0.12em",
          height: "0.28em",
          background: `linear-gradient(90deg,
            transparent 0%,
            ${alpha(theme.palette.primary.main, isDark ? 0.46 : 0.28)} 35%,
            ${alpha(theme.palette.primary.main, isDark ? 0.18 : 0.1)} 65%,
            transparent 100%)`,
          borderRadius: 999,
          opacity: 0.8,
          zIndex: -1,
        },

        ".kp-badge": {
          fontFamily: FONT_MONO,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "0.2em 0.65em",
          borderRadius: 12,
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.05 : 0.04,
          ),
          border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.12 : 0.08)}`,
          boxShadow: `0 0 18px ${alpha(theme.palette.primary.main, isDark ? 0.08 : 0.04)}`,
        },

        ".kp-metric": {
          fontFamily: FONT_MONO,
          letterSpacing: "-0.05em",
          textShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.12)}`,
          animation: "kpRise 380ms ease-out 1",
        },

        ".kp-surface-calm, [data-kp-surface='calm']": {
          ...calmSurface(theme, controls),
        },

        ".kp-panel-focus, [data-kp-surface='focus']": {
          ...kintsugiSurface(theme, controls, {
            level: "elevated",
            radius: Number(theme.shape.borderRadius) + 24,
            paperAlpha: isDark ? 0.84 : 0.98,
            borderAlpha: isDark ? 0.14 : 0.09,
            seamAlpha: isDark ? 0.18 : 0.09,
            sheenAlpha: isDark ? 0.22 : 0.14,
            showSeam: true,
          }),
        },

        ".kp-hero-panel, [data-kp-surface='hero']": {
          ...kintsugiSurface(theme, controls, {
            level: "elevated",
            radius: Number(theme.shape.borderRadius) + 28,
            paperAlpha: isDark ? 0.86 : 0.99,
            seamAlpha: isDark ? 0.22 : 0.12,
            sheenAlpha: isDark ? 0.24 : 0.16,
            blurMin: 12,
            blurMax: 18,
          }),
        },

        ".kp-showcase-card, [data-kp-card='showcase']": {
          ...kintsugiSurface(theme, controls, {
            level: "overlay",
            radius: Number(theme.shape.borderRadius) + 36,
            paperAlpha: isDark ? 0.9 : 0.994,
            seamAlpha: isDark ? 0.34 : 0.2,
            sheenAlpha: isDark ? 0.3 : 0.22,
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
            scale(controls.ctaPower, 0.46, 0.72),
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

        code: { fontFamily: FONT_MONO },

        "body.kp-showcase-mode, body[data-kp-scene='showcase']": {
          backgroundImage: [
            `radial-gradient(1180px 760px at 12% 6%, ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, isDark ? 0.16 : 0.1, isDark ? 0.28 : 0.16),
            )} 0%, transparent 62%)`,
            `radial-gradient(1080px 700px at 88% 8%, ${alpha(
              theme.palette.secondary.main,
              scale(controls.extravagance, isDark ? 0.1 : 0.06, isDark ? 0.18 : 0.1),
            )} 0%, transparent 64%)`,
            `radial-gradient(1060px 680px at 61.8% 116%, ${alpha(
              theme.palette.info.main,
              scale(controls.luxuryLevel, isDark ? 0.08 : 0.04, isDark ? 0.14 : 0.08),
            )} 0%, transparent 62%)`,
            `linear-gradient(180deg, ${alpha(
              theme.palette.background.default,
              isDark ? 0.04 : 0.82,
            )} 0%, transparent 18%, transparent 76%, ${alpha(
              theme.palette.background.default,
              isDark ? 0.76 : 0.98,
            )} 100%)`,
          ].join(", "),
        },

        "body.kp-showcase-mode::before, body[data-kp-scene='showcase']::before": {
          height: 6,
          backgroundImage: kintsugiSeam(theme, controls, 5, 90),
          boxShadow: [
            `0 0 ${Math.round(scale(controls.heroDrama, 30, 50))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, 0.18, 0.32),
            )}`,
            `0 0 ${Math.round(scale(controls.extravagance, 22, 38))}px ${alpha(
              theme.palette.secondary.main,
              scale(controls.extravagance, 0.08, 0.14),
            )}`,
          ].join(", "),
        },

        "body.kp-showcase-mode::after, body[data-kp-scene='showcase']::after": {
          width: "54vw",
          maxWidth: 960,
          height: 176,
          insetInlineStart: "-16vw",
          insetBlockStart: "5vh",
          filter: `blur(${Math.round(scale(controls.blurBudget, 24, 40))}px)`,
          opacity: 1,
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
          ".kp-metric": {
            animation: "none",
          },
        },

        "@media (hover: none), (max-width: 900px)": {
          body: {
            backgroundAttachment: "scroll",
          },
          "body::after": {
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
          "&[data-kp-section='hero']": {
            minHeight: `calc(100svh - var(--starter-header-height, 0px))`,
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
            display: "grid",
            alignContent: "center",
            gap: theme.spacing(3),
          },
          "&[data-kp-section='hero']::before": {
            content: "\"\"",
            position: "absolute",
            insetInline: 0,
            insetBlockStart: 0,
            height: 1,
            pointerEvents: "none",
            opacity: 0.84,
            backgroundImage: kintsugiSeam(
              theme,
              controls,
              scale(controls.heroDrama, 1.8, 2.8),
              90,
            ),
          },
          "&[data-kp-section='hero'] > *": {
            position: "relative",
            zIndex: 1,
          },
          "&[data-kp-density='wide']": {
            maxWidth: `${theme.breakpoints.values.xl}px`,
          },
          "&[data-kp-section='hero'][data-kp-density='wide']": {
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
          ...kintsugiSurface(theme, controls, {
            level: "overlay",
            radius: Number(theme.shape.borderRadius) + 24,
            paperAlpha: isDark ? 0.6 : 0.95,
            borderAlpha: isDark ? 0.1 : 0.07,
            seamAlpha: isDark ? 0.04 : 0.02,
            sheenAlpha: isDark ? 0.14 : 0.1,
            blurMin: 12,
            blurMax: 18,
            showSeam: false,
          }),
          borderRadius: Number(theme.shape.borderRadius) + 26,
          marginInline: theme.spacing(2),
          marginTop: theme.spacing(2),
          minHeight: 72,
          boxShadow: kintsugiShadow(
            theme,
            controls,
            "overlay",
            theme.palette.primary.main,
          ),
          "&[data-kp-chrome='floating']": {
            marginInline: theme.spacing(3),
            marginTop: theme.spacing(3),
            borderRadius: Number(theme.shape.borderRadius) + 30,
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
          "&.kp-hero-panel, &[data-kp-surface='hero']": {
            ...kintsugiSurface(theme, controls, {
              level: "elevated",
              radius: Number(theme.shape.borderRadius) + 28,
              paperAlpha: isDark ? 0.86 : 0.99,
              seamAlpha: isDark ? 0.2 : 0.1,
              sheenAlpha: isDark ? 0.24 : 0.16,
              blurMin: 12,
              blurMax: 18,
            }),
          },
          "&.kp-showcase-card, &[data-kp-surface='showcase']": {
            ...kintsugiSurface(theme, controls, {
              level: "overlay",
              radius: Number(theme.shape.borderRadius) + 36,
              paperAlpha: isDark ? 0.9 : 0.994,
              seamAlpha: isDark ? 0.34 : 0.2,
              sheenAlpha: isDark ? 0.3 : 0.22,
              blurMin: 18,
              blurMax: 28,
            }),
          },
          "&.kp-surface-calm, &[data-kp-surface='calm']": {
            ...calmSurface(theme, controls, theme.palette.info.main),
          },
          "&[data-kp-surface='overlay']": {
            ...kintsugiSurface(theme, controls, {
              level: "overlay",
              radius: Number(theme.shape.borderRadius) + 24,
              paperAlpha: isDark ? 0.84 : 0.985,
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
          ...kintsugiSurface(theme, controls, {
            level: "elevated",
            radius: Number(theme.shape.borderRadius) + 24,
            paperAlpha: isDark ? 0.82 : 0.98,
            borderAlpha: isDark ? 0.12 : 0.08,
            seamAlpha: isDark ? 0.04 : 0.02,
            sheenAlpha: isDark ? 0.16 : 0.1,
            showSeam: false,
          }),
          transition: theme.transitions.create(
            ["transform", "box-shadow", "border-color"],
            { duration: motionDuration(controls, 180, 260) },
          ),
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: [
              kintsugiShadow(theme, controls, "elevated", theme.palette.primary.main),
              `0 0 ${Math.round(scale(controls.heroDrama, 22, 42))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.heroDrama, 0.08, 0.14),
              )}`,
            ].join(", "),
          },
          "&.kp-showcase-card, &[data-kp-card='showcase']": {
            ...kintsugiSurface(theme, controls, {
              level: "overlay",
              radius: Number(theme.shape.borderRadius) + 34,
              paperAlpha: isDark ? 0.92 : 0.995,
              seamAlpha: isDark ? 0.36 : 0.22,
              sheenAlpha: isDark ? 0.32 : 0.24,
              blurMin: 20,
              blurMax: 30,
            }),
            boxShadow: [
              kintsugiShadow(theme, controls, "overlay", theme.palette.primary.main),
              `0 0 ${Math.round(scale(controls.heroDrama, 28, 52))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.heroDrama, 0.12, 0.22),
              )}`,
            ].join(", "),
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
              `0 0 ${Math.round(scale(controls.heroDrama, 20, 36))}px ${alpha(
                theme.palette.primary.main,
                isDark ? 0.14 : 0.07,
              )}`,
              `0 0 ${Math.round(scale(controls.extravagance, 16, 28))}px ${alpha(
                theme.palette.secondary.main,
                isDark ? 0.08 : 0.04,
              )}`,
            ].join(", "),
          },
          "&.MuiTypography-h1": {
            maxWidth: "12ch",
          },
          "&.MuiTypography-h2": {
            maxWidth: "14ch",
          },
          "&.kp-showcase-headline, &[data-kp-copy='showcase']": {
            fontSize: "clamp(3.2rem, 6.4vw, 5.8rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.084em",
            textShadow: [
              `0 0 ${Math.round(scale(controls.heroDrama, 34, 58))}px ${alpha(
                theme.palette.primary.main,
                isDark ? 0.24 : 0.14,
              )}`,
              `0 0 ${Math.round(scale(controls.extravagance, 24, 40))}px ${alpha(
                theme.palette.secondary.main,
                isDark ? 0.14 : 0.08,
              )}`,
            ].join(", "),
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
      root: ({ theme }) => ({
        borderColor: "transparent",
        position: "relative",
        height: 1,
        backgroundImage: `linear-gradient(90deg,
          transparent 0%,
          ${alpha(theme.palette.text.primary, 0.08)} 18%,
          ${alpha(theme.palette.primary.main, scale(controls.heroDrama, 0.16, 0.28))} 50%,
          ${alpha(theme.palette.text.primary, 0.08)} 82%,
          transparent 100%)`,
        opacity: 0.88,
        "&::after": {
          content: "\"\"",
          position: "absolute",
          insetInline: "22%",
          insetBlockStart: -1,
          height: 1,
          backgroundImage: kintsugiSeam(
            theme,
            controls,
            scale(controls.extravagance, 1.6, 2.6),
            90,
          ),
          filter: `blur(${Math.round(scale(controls.blurBudget, 2, 4))}px)`,
          opacity: 0.72,
          pointerEvents: "none",
        },
        "&.MuiDivider-vertical": {
          width: 1,
          height: "auto",
          backgroundImage: `linear-gradient(180deg,
            transparent 0%,
            ${alpha(theme.palette.primary.main, scale(controls.heroDrama, 0.14, 0.24))} 50%,
            transparent 100%)`,
        },
        "&.MuiDivider-vertical::after": {
          insetInlineStart: -1,
          insetInlineEnd: "auto",
          insetBlock: "18%",
          width: 1,
          height: "64%",
        },
      }),
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
        ...blurStyle(controls, 8, 12),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background-color", "border-color", "color"],
          { duration: motionDuration(controls, 180, 280) },
        ),
        "&::before": {
          content: "\"\"",
          position: "absolute",
          inset: 0,
          background: kintsugiSeam(
            theme,
            controls,
            scale(controls.heroDrama, 2, 3),
            135,
          ),
          opacity: 0,
          transform: "translateX(-10%)",
          transition: theme.transitions.create(["opacity", "transform"], {
            duration: motionDuration(controls, 220, 340),
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
        "&.kp-showcase-cta, &[data-kp-tone='showcase']": {
          minHeight: Math.round(scale(controls.ctaPower, 62, 70)),
          paddingInline: Math.round(scale(controls.ctaPower, 32, 40)),
          paddingBlock: Math.round(scale(controls.ctaPower, 16, 19)),
          letterSpacing: "0.14em",
        },
      }),

      sizeLarge: {
        minHeight: Math.round(scale(controls.ctaPower, 54, 62)),
        paddingInline: Math.round(scale(controls.ctaPower, 26, 34)),
        paddingBlock: Math.round(scale(controls.ctaPower, 14, 16)),
      },

      containedPrimary: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          color: theme.palette.primary.contrastText,
          border: `1px solid ${alpha(
            theme.palette.text.primary,
            isDark ? 0.14 : 0.1,
          )}`,
          backgroundImage: [
            `linear-gradient(135deg,
              ${alpha(theme.palette.primary.main, isDark ? 0.78 : 0.52)} 0%,
              ${alpha(theme.palette.primary.main, isDark ? 0.58 : 0.34)} 40%,
              ${alpha(theme.palette.secondary.main, isDark ? 0.34 : 0.18)} 100%)`,
            `linear-gradient(90deg,
              transparent 0%,
              ${alpha(theme.palette.common.white, isDark ? 0.14 : 0.12)} 42%,
              transparent 78%)`,
          ].join(", "),
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.text.primary, 0.08)} inset`,
            `0 ${Math.round(scale(controls.ctaPower, 20, 30))}px ${Math.round(
              scale(controls.ctaPower, 52, 88),
            )}px ${alpha("#000000", isDark ? 0.66 : 0.2)}`,
            `0 0 ${Math.round(scale(controls.ctaPower, 24, 44))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.ctaPower, 0.14, 0.24),
            )}`,
          ].join(", "),
          "&::after": {
            content: "\"\"",
            position: "absolute",
            inset: 0,
            background: kintsugiSeam(
              theme,
              controls,
              scale(controls.heroDrama, 1.8, 2.8),
              135,
            ),
            opacity: 0.24,
            pointerEvents: "none",
          },
          "&:hover": {
            boxShadow: [
              `0 0 0 1px ${alpha(theme.palette.text.primary, 0.1)} inset`,
              `0 ${Math.round(scale(controls.ctaPower, 24, 34))}px ${Math.round(
                scale(controls.ctaPower, 64, 100),
              )}px ${alpha("#000000", isDark ? 0.76 : 0.24)}`,
              `0 0 ${Math.round(scale(controls.ctaPower, 30, 54))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.ctaPower, 0.18, 0.3),
              )}`,
            ].join(", "),
          },
          "&.Mui-focusVisible": {
            boxShadow: [
              kintsugiFocusRing(theme, controls, 4),
              `0 ${Math.round(scale(controls.ctaPower, 22, 32))}px ${Math.round(
                scale(controls.ctaPower, 58, 90),
              )}px ${alpha("#000000", isDark ? 0.68 : 0.22)}`,
            ].join(", "),
          },
          "&.kp-showcase-cta, &[data-kp-tone='showcase']": {
            backgroundImage: [
              `linear-gradient(135deg,
                ${alpha(theme.palette.primary.main, isDark ? 0.86 : 0.6)} 0%,
                ${alpha(theme.palette.primary.main, isDark ? 0.66 : 0.42)} 40%,
                ${alpha(theme.palette.secondary.main, isDark ? 0.4 : 0.22)} 100%)`,
              `linear-gradient(90deg,
                transparent 0%,
                ${alpha(theme.palette.common.white, isDark ? 0.18 : 0.14)} 42%,
                transparent 78%)`,
            ].join(", "),
            boxShadow: [
              `0 0 0 1px ${alpha(theme.palette.text.primary, 0.1)} inset`,
              `0 ${Math.round(scale(controls.ctaPower, 32, 42))}px ${Math.round(
                scale(controls.ctaPower, 88, 130),
              )}px ${alpha("#000000", isDark ? 0.8 : 0.26)}`,
              `0 0 ${Math.round(scale(controls.ctaPower, 44, 74))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.ctaPower, 0.26, 0.42),
              )}`,
              `0 0 ${Math.round(scale(controls.extravagance, 26, 44))}px ${alpha(
                theme.palette.secondary.main,
                scale(controls.extravagance, 0.08, 0.16),
              )}`,
            ].join(", "),
          },
        };
      },

      outlinedPrimary: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          color: theme.palette.text.primary,
          borderWidth: 1,
          borderColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.18 : 0.12,
          ),
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.04 : 0.03,
          ),
          boxShadow: `0 0 0 1px ${alpha(
            kintsugiInk(theme),
            isDark ? 0.03 : 0.04,
          )} inset`,
          "&:hover": {
            borderColor: alpha(theme.palette.primary.main, 0.28),
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.05,
            ),
            boxShadow: `0 0 ${Math.round(scale(controls.heroDrama, 16, 30))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, 0.08, 0.14),
            )}`,
          },
          "&.Mui-focusVisible": {
            boxShadow: kintsugiFocusRing(theme, controls, 3),
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
            boxShadow: kintsugiFocusRing(theme, controls, 2),
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
            kintsugiInk(theme),
            isDark ? 0.03 : 0.04,
          )} inset`,
          transition: theme.transitions.create(
            ["transform", "box-shadow", "border-color", "background-color"],
            { duration: motionDuration(controls, 160, 240) },
          ),
          "&:hover": {
            transform: "translateY(-1px)",
            borderColor: alpha(theme.palette.primary.main, 0.24),
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.05,
            ),
            boxShadow: `0 0 ${Math.round(scale(controls.extravagance, 14, 28))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.extravagance, 0.08, 0.16),
            )}`,
          },
          "&.Mui-focusVisible": {
            boxShadow: kintsugiFocusRing(theme, controls, 3),
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
          borderRadius: Number(theme.shape.borderRadius) + 10,
          minHeight: 34,
          fontFamily: FONT_MONO,
          fontWeight: 760,
          letterSpacing: "0.06em",
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
            kintsugiInk(theme),
            isDark ? 0.03 : 0.04,
          )} inset`,
          "&.MuiChip-clickable:hover": {
            borderColor: alpha(theme.palette.primary.main, 0.22),
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.05,
            ),
          },
          "&.MuiChip-colorPrimary": {
            color: theme.palette.primary.main,
            borderColor: alpha(theme.palette.primary.main, 0.28),
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.12 : 0.08,
            ),
          },
          "&.MuiChip-colorSecondary": {
            color: theme.palette.secondary.main,
            borderColor: alpha(theme.palette.secondary.main, 0.26),
            backgroundColor: alpha(
              theme.palette.secondary.main,
              isDark ? 0.1 : 0.06,
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
        borderRadius: Number(theme.shape.borderRadius) + 8,
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.mode === "dark" ? 0.18 : 0.12,
        ),
        color: theme.palette.text.primary,
        boxShadow: `0 0 0 1px ${alpha(
          theme.palette.primary.main,
          theme.palette.mode === "dark" ? 0.22 : 0.16,
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
            isDark ? 0.04 : 0.03,
          ),
          boxShadow: `0 0 0 1px ${alpha(
            kintsugiInk(theme),
            isDark ? 0.03 : 0.04,
          )} inset`,
          ...blurStyle(controls, 8, 12),
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(
              theme.palette.text.primary,
              isDark ? 0.2 : 0.14,
            ),
          },
          "&.Mui-focused": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.05,
            ),
            boxShadow: kintsugiFocusRing(theme, controls, 3),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(theme.palette.primary.main, 0.62),
          },
        };
      },
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.14 : 0.09,
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
        fontFamily: FONT_MONO,
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
        borderRadius: Number(theme.shape.borderRadius) + 12,
        border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        backgroundColor: alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.03 : 0.02,
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
        borderRadius: Number(theme.shape.borderRadius) + 8,
        backgroundImage: [
          `linear-gradient(145deg,
            ${alpha(theme.palette.primary.main, 0.18)} 0%,
            ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
          kintsugiSeam(
            theme,
            controls,
            scale(controls.extravagance, 1.6, 2.4),
            135,
          ),
        ].join(", "),
        boxShadow: `0 0 16px ${alpha(
          theme.palette.primary.main,
          scale(controls.extravagance, 0.08, 0.14),
        )}`,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 44,
        borderRadius: Number(theme.shape.borderRadius) + 8,
        fontFamily: FONT_MONO,
        fontWeight: 840,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: alpha(theme.palette.text.primary, 0.78),
        position: "relative",
        zIndex: 1,
        "&.Mui-selected": {
          color: theme.palette.primary.main,
          textShadow: `0 0 ${Math.round(scale(controls.heroDrama, 10, 18))}px ${alpha(
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
            backgroundImage: kintsugiSeam(
              theme,
              controls,
              scale(controls.ctaPower, 2.2, 3.2),
              90,
            ),
            opacity: 1,
            borderColor: alpha(theme.palette.primary.main, 0.34),
          },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
          boxShadow: kintsugiFocusRing(theme, controls, 2),
        },
      }),
      thumb: ({ theme }) => ({
        width: 16,
        height: 16,
        borderRadius: 999,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 0 1px ${alpha(
          kintsugiInk(theme),
          theme.palette.mode === "dark" ? 0.04 : 0.06,
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
        backgroundImage: kintsugiSeam(
          theme,
          controls,
          scale(controls.extravagance, 2.2, 3.2),
          90,
        ),
      }),
      thumb: ({ theme }) => ({
        width: 18,
        height: 18,
        border: `2px solid ${alpha(
          theme.palette.primary.main,
          theme.palette.mode === "dark" ? 0.48 : 0.28,
        )}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 14px ${alpha(
          theme.palette.primary.main,
          scale(controls.heroDrama, 0.1, 0.18),
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
        backgroundImage: kintsugiSeam(
          theme,
          controls,
          scale(controls.ctaPower, 2.4, 3.4),
          90,
        ),
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
            theme.palette.mode === "dark" ? 0.05 : 0.03,
          ),
        },
      }),
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...kintsugiSurface(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 12,
          paperAlpha: theme.palette.mode === "dark" ? 0.9 : 0.98,
          seamAlpha: theme.palette.mode === "dark" ? 0.06 : 0.03,
          sheenAlpha: theme.palette.mode === "dark" ? 0.14 : 0.1,
          blurMin: 10,
          blurMax: 14,
          showSeam: false,
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
        ...kintsugiSurface(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 28,
          paperAlpha: theme.palette.mode === "dark" ? 0.86 : 0.988,
          seamAlpha: theme.palette.mode === "dark" ? 0.08 : 0.04,
          sheenAlpha: theme.palette.mode === "dark" ? 0.18 : 0.12,
          blurMin: 16,
          blurMax: 24,
        }),
      }),
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(2.5, 3, 1.5),
        fontFamily: FONT_MONO,
        fontWeight: 840,
        letterSpacing: "0.1em",
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
        ...kintsugiSurface(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 16,
          paperAlpha: theme.palette.mode === "dark" ? 0.9 : 0.986,
          seamAlpha: theme.palette.mode === "dark" ? 0.06 : 0.03,
          sheenAlpha: theme.palette.mode === "dark" ? 0.14 : 0.1,
          blurMin: 14,
          blurMax: 20,
          showSeam: false,
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
          theme.palette.mode === "dark" ? 0.68 : 0.48,
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
        ...kintsugiSurface(theme, controls, {
          level: "overlay",
          radius: 0,
          paperAlpha: theme.palette.mode === "dark" ? 0.86 : 0.986,
          seamAlpha: theme.palette.mode === "dark" ? 0.06 : 0.03,
          sheenAlpha: theme.palette.mode === "dark" ? 0.16 : 0.1,
          blurMin: 16,
          blurMax: 24,
          showSeam: false,
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
          textDecorationColor: alpha(theme.palette.primary.main, 0.34),
        },
      }),
    },
  },
});

export const kintsugiProtocolLight = {
  name: "Kintsugi Protocol Light",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#D1A23C",
      dark: "#AC8228",
      light: "#EACB7C",
      contrastText: "#231804",
    },

    secondary: {
      main: "#25B88C",
      dark: "#198D6B",
      light: "#8DE2C6",
      contrastText: "#082118",
    },

    info: {
      main: "#5D84EA",
      dark: "#4161C0",
      light: "#B0C3F8",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#2AA86A",
      dark: "#1E8453",
      light: "#8CDEB1",
      contrastText: "#FFFFFF",
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
      default: "#F7F8FB",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1D2130",
      secondary: "#666D81",
      disabled: alpha("#1D2130", 0.42),
    },

    divider: alpha("#1D2130", 0.1),

    action: {
      hover: alpha("#1D2130", 0.04),
      selected: alpha("#D1A23C", 0.08),
      focus: alpha("#D1A23C", 0.16),
      active: alpha("#1D2130", 0.56),
      disabled: alpha("#1D2130", 0.26),
      disabledBackground: alpha("#1D2130", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 20 },
  spacing: 8,

  components: createComponents(lightControls),
} satisfies NamedThemeOptions;

export const kintsugiProtocol = {
  name: "Kintsugi Protocol",
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: "#F6C453",
      dark: "#D9A83E",
      light: "#FFD98A",
      contrastText: "#1A1206",
    },

    secondary: {
      main: "#2EE6A6",
      dark: "#16B58B",
      light: "#7BEACD",
      contrastText: "#061019",
    },

    info: {
      main: "#6F9BFF",
      dark: "#3D78FF",
      light: "#AEC2FF",
      contrastText: "#061019",
    },

    success: {
      main: "#5CFF9E",
      dark: "#2EEA7F",
      light: "#B6FFD2",
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
      default: "#06050A",
      paper: "#0C0B13",
    },

    text: {
      primary: "#F4F6FF",
      secondary: "#C3C7E6",
      disabled: alpha("#F4F6FF", 0.44),
    },

    divider: alpha("#F4F6FF", 0.1),

    action: {
      hover: alpha("#F4F6FF", 0.06),
      selected: alpha("#F4F6FF", 0.1),
      focus: alpha("#F6C453", 0.2),
      active: alpha("#F4F6FF", 0.62),
      disabled: alpha("#F4F6FF", 0.26),
      disabledBackground: alpha("#F4F6FF", 0.08),
    },
  },

  typography,

  shape: { borderRadius: 20 },
  spacing: 8,

  components: createComponents(darkControls),
} satisfies NamedThemeOptions;
