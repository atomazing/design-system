import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Infrared Blueprint
 * Visual: drafting surfaces with restrained infrared accents.
 */

const FONT_DISPLAY =
  '"Space Grotesk","Plus Jakarta Sans","Sora","Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_TEXT = '"Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_MONO =
  '"IBM Plex Mono","JetBrains Mono","Roboto Mono","Menlo","Consolas",monospace';

const INFRA_RADIUS = 18;

interface InfraLandingControls {
  luxuryLevel: number;
  extravagance: number;
  heroDrama: number;
  ctaPower: number;
  motionPolish: number;
  blurBudget: number;
}

type BlueprintSurfaceLevel = "surface" | "elevated" | "overlay";

const clampUnit = (value: number): number => Math.min(1, Math.max(0, value));

const scale = (value: number, min: number, max: number): number =>
  min + (max - min) * clampUnit(value);

const createLandingControls = (
  controls: InfraLandingControls,
): InfraLandingControls => ({
  luxuryLevel: clampUnit(controls.luxuryLevel),
  extravagance: clampUnit(controls.extravagance),
  heroDrama: clampUnit(controls.heroDrama),
  ctaPower: clampUnit(controls.ctaPower),
  motionPolish: clampUnit(controls.motionPolish),
  blurBudget: clampUnit(controls.blurBudget),
});

const lightControls = createLandingControls({
  luxuryLevel: 0.9,
  extravagance: 0.84,
  heroDrama: 0.9,
  ctaPower: 0.93,
  motionPolish: 0.82,
  blurBudget: 0.66,
});

const darkControls = createLandingControls({
  luxuryLevel: 0.94,
  extravagance: 0.9,
  heroDrama: 0.95,
  ctaPower: 0.96,
  motionPolish: 0.86,
  blurBudget: 0.74,
});

const typography = {
  fontFamily: FONT_TEXT,

  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 900,
    fontSize: "clamp(2.7rem, 5.6vw, 4.8rem)",
    lineHeight: 0.94,
    letterSpacing: "-0.06em",
    textTransform: "uppercase",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 860,
    fontSize: "clamp(1.9rem, 3.6vw, 3rem)",
    lineHeight: 0.98,
    letterSpacing: "-0.04em",
    textTransform: "uppercase",
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

interface BlueprintPanelOptions {
  level?: BlueprintSurfaceLevel;
  radius?: number;
  accent?: string;
  paperTint?: string;
  paperAlpha?: number;
  borderAlpha?: number;
  notchAlpha?: number;
  measureAlpha?: number;
  shadowAlpha?: number;
  blurMin?: number;
  blurMax?: number;
  showNotches?: boolean;
  showMeasure?: boolean;
}

const blueprintInk = (theme: Theme): string =>
  theme.palette.mode === "dark" ? theme.palette.common.white : "#131722";

const motionDuration = (
  controls: InfraLandingControls,
  min: number,
  max: number,
): number => Math.round(scale(controls.motionPolish, min, max));

const blurStyle = (
  controls: InfraLandingControls,
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

const blueprintRail = (
  theme: Theme,
  controls: InfraLandingControls,
  opacity = 1,
  angle = 90,
): string =>
  `repeating-linear-gradient(${angle}deg,
    ${alpha(blueprintInk(theme), 0)} 0px,
    ${alpha(blueprintInk(theme), 0)} 10px,
    ${alpha(
      blueprintInk(theme),
      scale(controls.luxuryLevel, 0.08, 0.16) * opacity,
    )} 10px,
    ${alpha(
      blueprintInk(theme),
      scale(controls.luxuryLevel, 0.08, 0.16) * opacity,
    )} 16px,
    ${alpha(
      theme.palette.primary.main,
      scale(controls.ctaPower, 0.12, 0.22) * opacity,
    )} 16px,
    ${alpha(
      theme.palette.primary.main,
      scale(controls.ctaPower, 0.12, 0.22) * opacity,
    )} 19px,
    ${alpha(blueprintInk(theme), 0)} 19px,
    ${alpha(blueprintInk(theme), 0)} 28px)`;

const blueprintFocusRing = (
  theme: Theme,
  controls: InfraLandingControls,
  width = 4,
): string =>
  [
    `0 0 0 ${width}px ${alpha(
      theme.palette.primary.main,
      scale(controls.ctaPower, 0.14, 0.24),
    )}`,
    `0 0 ${Math.round(scale(controls.heroDrama, 18, 34))}px ${alpha(
      theme.palette.primary.main,
      scale(controls.extravagance, 0.12, 0.22),
    )}`,
  ].join(", ");

const blueprintShadow = (
  theme: Theme,
  controls: InfraLandingControls,
  level: BlueprintSurfaceLevel,
  accent = theme.palette.primary.main,
): string => {
  const isDark = theme.palette.mode === "dark";
  const lift =
    level === "overlay"
      ? scale(controls.luxuryLevel, 24, 36)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 18, 28)
        : scale(controls.luxuryLevel, 14, 22);
  const blur =
    level === "overlay"
      ? scale(controls.luxuryLevel, 54, 88)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 40, 68)
        : scale(controls.luxuryLevel, 28, 52);
  const baseAlpha =
    level === "overlay"
      ? isDark
        ? 0.58
        : 0.16
      : level === "elevated"
        ? isDark
          ? 0.48
          : 0.14
        : isDark
          ? 0.36
          : 0.1;

  return [
    `0 ${Math.round(lift)}px ${Math.round(blur)}px ${alpha("#000000", baseAlpha)}`,
    `0 0 ${Math.round(scale(controls.extravagance, 16, 32))}px ${alpha(
      accent,
      scale(controls.extravagance, 0.06, 0.14),
    )}`,
    `0 0 0 1px ${alpha(
      blueprintInk(theme),
      theme.palette.mode === "dark" ? 0.03 : 0.04,
    )} inset`,
  ].join(", ");
};

const blueprintPanel = (
  theme: Theme,
  controls: InfraLandingControls,
  opts?: BlueprintPanelOptions,
) => {
  const level = opts?.level ?? "surface";
  const radius =
    opts?.radius ??
    (level === "overlay"
      ? INFRA_RADIUS + 16
      : level === "elevated"
        ? INFRA_RADIUS + 12
        : INFRA_RADIUS + 8);
  const accent = opts?.accent ?? theme.palette.primary.main;
  const paperTint = opts?.paperTint ?? theme.palette.background.paper;
  const paperAlpha =
    opts?.paperAlpha ??
    (level === "overlay"
      ? theme.palette.mode === "dark"
        ? 0.86
        : 0.985
      : theme.palette.mode === "dark"
        ? 0.82
        : 0.97);
  const borderAlpha =
    opts?.borderAlpha ?? (theme.palette.mode === "dark" ? 0.12 : 0.08);
  const notchAlpha =
    opts?.notchAlpha ??
    scale(
      controls.extravagance,
      theme.palette.mode === "dark" ? 0.32 : 0.18,
      theme.palette.mode === "dark" ? 0.56 : 0.3,
    );
  const measureAlpha =
    opts?.measureAlpha ??
    scale(
      controls.luxuryLevel,
      theme.palette.mode === "dark" ? 0.18 : 0.1,
      theme.palette.mode === "dark" ? 0.34 : 0.18,
    );
  const shadowAlpha =
    opts?.shadowAlpha ??
    scale(
      controls.luxuryLevel,
      theme.palette.mode === "dark" ? 0.32 : 0.08,
      theme.palette.mode === "dark" ? 0.6 : 0.16,
    );
  const showNotches = opts?.showNotches ?? true;
  const showMeasure = opts?.showMeasure ?? true;

  const ink = blueprintInk(theme);

  return {
    position: "relative" as const,
    borderRadius: radius,
    overflow: "hidden" as const,
    isolation: "isolate" as const,
    backgroundColor: alpha(paperTint, paperAlpha),
    border: `1px solid transparent`,
    backgroundImage: [
      `linear-gradient(160deg,
        ${alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.06 : 0.22)} 0%,
        ${alpha(paperTint, Math.min(0.995, paperAlpha + 0.03))} 18%,
        ${alpha(paperTint, paperAlpha)} 62%,
        ${alpha(accent, scale(controls.extravagance, 0.03, 0.08))} 100%)`,
      `radial-gradient(420px 220px at 12% 0%, ${alpha(
        theme.palette.primary.main,
        scale(controls.heroDrama, 0.06, 0.14),
      )} 0%, transparent 68%)`,
      `radial-gradient(360px 180px at 88% 0%, ${alpha(
        theme.palette.secondary.main,
        scale(controls.extravagance, 0.04, 0.1),
      )} 0%, transparent 68%)`,
      showMeasure
        ? blueprintRail(theme, controls, measureAlpha * 2.2, 90)
        : `linear-gradient(${alpha(ink, 0)} 0 0)`,
      `linear-gradient(${alpha(ink, borderAlpha)} 0 0)`,
    ].join(", "),
    backgroundOrigin:
      "padding-box, padding-box, padding-box, padding-box, border-box",
    backgroundClip:
      "padding-box, padding-box, padding-box, padding-box, border-box",
    boxShadow: [
      blueprintShadow(theme, controls, level, accent),
      `0 ${Math.round(scale(controls.luxuryLevel, 10, 22))}px ${Math.round(
        scale(controls.luxuryLevel, 40, 72),
      )}px ${alpha("#000000", shadowAlpha)}`,
    ].join(", "),
    ...blurStyle(
      controls,
      opts?.blurMin ?? (level === "overlay" ? 12 : 8),
      opts?.blurMax ?? (level === "overlay" ? 20 : 14),
    ),

    "&::before": {
      content: '""',
      position: "absolute" as const,
      inset: 10,
      borderRadius: Math.max(12, radius - 10),
      pointerEvents: "none" as const,
      backgroundImage: [
        `linear-gradient(${alpha(accent, notchAlpha)} 0 0)`,
        `linear-gradient(${alpha(accent, notchAlpha)} 0 0)`,
        `linear-gradient(${alpha(accent, notchAlpha)} 0 0)`,
        `linear-gradient(${alpha(accent, notchAlpha)} 0 0)`,
        `linear-gradient(${alpha(accent, notchAlpha)} 0 0)`,
        `linear-gradient(${alpha(accent, notchAlpha)} 0 0)`,
        `linear-gradient(${alpha(accent, notchAlpha)} 0 0)`,
        `linear-gradient(${alpha(accent, notchAlpha)} 0 0)`,
      ].join(", "),
      backgroundRepeat: "no-repeat",
      backgroundSize: [
        `${Math.round(scale(controls.extravagance, 12, 20))}px 2px`,
        `2px ${Math.round(scale(controls.extravagance, 12, 20))}px`,
        `${Math.round(scale(controls.extravagance, 12, 20))}px 2px`,
        `2px ${Math.round(scale(controls.extravagance, 12, 20))}px`,
        `${Math.round(scale(controls.extravagance, 12, 20))}px 2px`,
        `2px ${Math.round(scale(controls.extravagance, 12, 20))}px`,
        `${Math.round(scale(controls.extravagance, 12, 20))}px 2px`,
        `2px ${Math.round(scale(controls.extravagance, 12, 20))}px`,
      ].join(", "),
      backgroundPosition: [
        "0 0",
        "0 0",
        "100% 0",
        "100% 0",
        "0 100%",
        "0 100%",
        "100% 100%",
        "100% 100%",
      ].join(", "),
      opacity: showNotches ? 0.72 : 0,
    },

    "&::after": {
      content: '""',
      position: "absolute" as const,
      left: 0,
      right: 0,
      top: 0,
      height: 2,
      pointerEvents: "none" as const,
      backgroundImage: blueprintRail(
        theme,
        controls,
        scale(controls.heroDrama, 0.44, 0.78),
        90,
      ),
      opacity: showMeasure ? 0.82 : 0,
    },
  };
};

const calmSurface = (
  theme: Theme,
  controls: InfraLandingControls,
  accent = theme.palette.info.main,
) => ({
  ...blueprintPanel(theme, controls, {
    level: "surface",
    radius: Number(theme.shape.borderRadius) + 18,
    accent,
    paperAlpha: theme.palette.mode === "dark" ? 0.9 : 0.98,
    borderAlpha: theme.palette.mode === "dark" ? 0.09 : 0.07,
    notchAlpha: theme.palette.mode === "dark" ? 0.14 : 0.08,
    measureAlpha: theme.palette.mode === "dark" ? 0.08 : 0.04,
    shadowAlpha: theme.palette.mode === "dark" ? 0.34 : 0.12,
    blurMin: 8,
    blurMax: 12,
    showNotches: false,
    showMeasure: false,
  }),
});

const createComponents = (
  controls: InfraLandingControls,
): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => {
      const isDark = theme.palette.mode === "dark";

      return {
        ":root": {
          "--ib-accent": theme.palette.primary.main,
          "--ib-ink": theme.palette.text.primary,
        },

        "@keyframes ibDash": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "120px 0" },
        },
        "@keyframes ibRise": {
          "0%": { transform: "translateY(8px)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },
        "@keyframes ibPulse": {
          "0%, 100%": { opacity: 0.76 },
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
            `radial-gradient(1040px 620px at 14% 8%, ${alpha(
              theme.palette.primary.main,
              scale(
                controls.heroDrama,
                isDark ? 0.1 : 0.06,
                isDark ? 0.18 : 0.1,
              ),
            )} 0%, transparent 62%)`,
            `radial-gradient(940px 560px at 86% 10%, ${alpha(
              theme.palette.secondary.main,
              scale(
                controls.extravagance,
                isDark ? 0.06 : 0.03,
                isDark ? 0.1 : 0.06,
              ),
            )} 0%, transparent 64%)`,
            `linear-gradient(180deg, ${alpha(
              theme.palette.background.default,
              isDark ? 0.08 : 0.86,
            )} 0%, transparent 18%, transparent 76%, ${alpha(
              theme.palette.background.default,
              isDark ? 0.8 : 0.98,
            )} 100%)`,
            `repeating-linear-gradient(0deg, ${alpha(
              blueprintInk(theme),
              isDark ? 0.036 : 0.018,
            )} 0px, ${alpha(
              blueprintInk(theme),
              isDark ? 0.036 : 0.018,
            )} 1px, transparent 1px, transparent 12px)`,
            `repeating-linear-gradient(90deg, ${alpha(
              blueprintInk(theme),
              isDark ? 0.028 : 0.014,
            )} 0px, ${alpha(
              blueprintInk(theme),
              isDark ? 0.028 : 0.014,
            )} 1px, transparent 1px, transparent 16px)`,
          ].join(", "),
          backgroundAttachment: "fixed",
        },

        "body::before": {
          content: '""',
          position: "fixed",
          insetInlineStart: 0,
          insetInlineEnd: 0,
          insetBlockStart: 0,
          height: 4,
          pointerEvents: "none",
          backgroundImage: blueprintRail(
            theme,
            controls,
            scale(controls.heroDrama, 0.72, 1),
            90,
          ),
          boxShadow: [
            `0 0 ${Math.round(scale(controls.heroDrama, 18, 34))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, 0.12, 0.24),
            )}`,
            `0 0 ${Math.round(scale(controls.extravagance, 22, 38))}px ${alpha(
              theme.palette.secondary.main,
              scale(controls.extravagance, 0.06, 0.12),
            )}`,
          ].join(", "),
          animation: `ibPulse ${motionDuration(controls, 3600, 2200)}ms ease-in-out infinite`,
        },

        "body::after": {
          content: '""',
          position: "fixed",
          insetInlineStart: "-10vw",
          insetBlockStart: "8vh",
          width: "48vw",
          maxWidth: 760,
          minWidth: 260,
          height: 124,
          borderRadius: 999,
          pointerEvents: "none",
          backgroundImage: [
            `radial-gradient(72% 100% at 50% 50%, ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, 0.16, 0.28),
            )} 0%, transparent 72%)`,
            blueprintRail(
              theme,
              controls,
              scale(controls.extravagance, 0.42, 0.7),
              112,
            ),
          ].join(", "),
          filter: `blur(${Math.round(scale(controls.blurBudget, 16, 28))}px)`,
          opacity: scale(controls.heroDrama, 0.82, 1),
          transform: "translate3d(0, 0, 0) rotate(-6deg)",
        },

        ".ib-dash": {
          height: 1,
          backgroundImage: blueprintRail(
            theme,
            controls,
            scale(controls.luxuryLevel, 0.56, 0.82),
            90,
          ),
          backgroundSize: "120px 1px",
          opacity: 0.88,
          animation: `ibDash ${motionDuration(controls, 7600, 5200)}ms linear infinite`,
        },

        ".ib-tag": {
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

        ".ib-metric": {
          fontFamily: FONT_MONO,
          letterSpacing: "-0.05em",
          textShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.12)}`,
          animation: "ibRise 380ms ease-out 1",
        },

        ".ib-surface-calm, [data-ib-surface='calm']": {
          ...calmSurface(theme, controls),
        },

        ".ib-panel-focus, [data-ib-surface='focus']": {
          ...blueprintPanel(theme, controls, {
            level: "elevated",
            radius: Number(theme.shape.borderRadius) + 22,
            paperAlpha: isDark ? 0.84 : 0.98,
            borderAlpha: isDark ? 0.14 : 0.09,
            notchAlpha: isDark ? 0.58 : 0.34,
            measureAlpha: isDark ? 0.42 : 0.22,
            shadowAlpha: isDark ? 0.52 : 0.16,
            showNotches: true,
            showMeasure: true,
          }),
        },

        ".ib-hero-panel, [data-ib-surface='hero']": {
          ...blueprintPanel(theme, controls, {
            level: "elevated",
            radius: Number(theme.shape.borderRadius) + 28,
            paperAlpha: isDark ? 0.86 : 0.99,
            notchAlpha: isDark ? 0.64 : 0.38,
            measureAlpha: isDark ? 0.44 : 0.24,
            blurMin: 12,
            blurMax: 18,
          }),
        },

        ".ib-showcase-card, [data-ib-card='showcase']": {
          ...blueprintPanel(theme, controls, {
            level: "overlay",
            radius: Number(theme.shape.borderRadius) + 34,
            paperAlpha: isDark ? 0.9 : 0.994,
            notchAlpha: isDark ? 0.8 : 0.5,
            measureAlpha: isDark ? 0.56 : 0.32,
            shadowAlpha: isDark ? 0.6 : 0.2,
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

        "body.ib-showcase-mode, body[data-ib-scene='showcase']": {
          backgroundImage: [
            `radial-gradient(1180px 720px at 12% 6%, ${alpha(
              theme.palette.primary.main,
              scale(
                controls.heroDrama,
                isDark ? 0.14 : 0.08,
                isDark ? 0.24 : 0.14,
              ),
            )} 0%, transparent 62%)`,
            `radial-gradient(1080px 660px at 88% 8%, ${alpha(
              theme.palette.secondary.main,
              scale(
                controls.extravagance,
                isDark ? 0.08 : 0.04,
                isDark ? 0.14 : 0.08,
              ),
            )} 0%, transparent 64%)`,
            `linear-gradient(180deg, ${alpha(
              theme.palette.background.default,
              isDark ? 0.04 : 0.82,
            )} 0%, transparent 18%, transparent 76%, ${alpha(
              theme.palette.background.default,
              isDark ? 0.76 : 0.98,
            )} 100%)`,
            `repeating-linear-gradient(0deg, ${alpha(
              blueprintInk(theme),
              isDark ? 0.042 : 0.022,
            )} 0px, ${alpha(
              blueprintInk(theme),
              isDark ? 0.042 : 0.022,
            )} 1px, transparent 1px, transparent 11px)`,
            `repeating-linear-gradient(90deg, ${alpha(
              blueprintInk(theme),
              isDark ? 0.03 : 0.016,
            )} 0px, ${alpha(
              blueprintInk(theme),
              isDark ? 0.03 : 0.016,
            )} 1px, transparent 1px, transparent 14px)`,
          ].join(", "),
        },

        "body.ib-showcase-mode::before, body[data-ib-scene='showcase']::before":
          {
            height: 5,
            backgroundImage: blueprintRail(theme, controls, 1, 90),
            boxShadow: [
              `0 0 ${Math.round(scale(controls.heroDrama, 24, 42))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.heroDrama, 0.16, 0.3),
              )}`,
              `0 0 ${Math.round(scale(controls.extravagance, 28, 46))}px ${alpha(
                theme.palette.secondary.main,
                scale(controls.extravagance, 0.08, 0.16),
              )}`,
            ].join(", "),
          },

        "body.ib-showcase-mode::after, body[data-ib-scene='showcase']::after": {
          width: "58vw",
          maxWidth: 920,
          height: 156,
          insetInlineStart: "-12vw",
          insetBlockStart: "6vh",
          filter: `blur(${Math.round(scale(controls.blurBudget, 22, 36))}px)`,
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
          ".ib-metric, .ib-dash": {
            animation: "none",
          },
        },

        "@media (hover: none), (max-width: 900px)": {
          body: {
            backgroundAttachment: "scroll",
          },
          "body::after": {
            width: "60vw",
            maxWidth: 520,
            filter: `blur(${Math.round(scale(controls.blurBudget, 8, 14))}px)`,
          },
        },
      };
    },
  },

  MuiContainer: {
    defaultProps: { maxWidth: "lg" },
    styleOverrides: {
      root: ({ theme }) => {
        const heroPad = Math.round(scale(controls.heroDrama, 24, 38));

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
          "&[data-ib-section='hero']": {
            minHeight: `calc(100svh - var(--starter-header-height, 0px))`,
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
            display: "grid",
            alignContent: "center",
            gap: theme.spacing(3),
          },
          "&[data-ib-section='hero']::before": {
            content: '""',
            position: "absolute",
            insetInline: 0,
            insetBlockStart: 0,
            height: 1,
            pointerEvents: "none",
            opacity: 0.84,
            backgroundImage: blueprintRail(
              theme,
              controls,
              scale(controls.heroDrama, 0.42, 0.72),
              90,
            ),
          },
          "&[data-ib-section='hero'] > *": {
            position: "relative",
            zIndex: 1,
          },
          "&[data-ib-density='wide']": {
            maxWidth: `${theme.breakpoints.values.xl}px`,
          },
          "&[data-ib-section='hero'][data-ib-density='wide']": {
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
          ...blueprintPanel(theme, controls, {
            level: "overlay",
            radius: Number(theme.shape.borderRadius) + 22,
            paperAlpha: isDark ? 0.62 : 0.95,
            borderAlpha: isDark ? 0.1 : 0.07,
            notchAlpha: isDark ? 0.22 : 0.12,
            measureAlpha: isDark ? 0.14 : 0.08,
            shadowAlpha: isDark ? 0.42 : 0.1,
            blurMin: 12,
            blurMax: 18,
            showNotches: false,
            showMeasure: false,
          }),
          borderRadius: Number(theme.shape.borderRadius) + 24,
          marginInline: theme.spacing(2),
          marginTop: theme.spacing(2),
          minHeight: 72,
          boxShadow: blueprintShadow(
            theme,
            controls,
            "overlay",
            theme.palette.primary.main,
          ),
          "&[data-ib-chrome='floating']": {
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
          "&.ib-hero-panel, &[data-ib-surface='hero']": {
            ...blueprintPanel(theme, controls, {
              level: "elevated",
              radius: Number(theme.shape.borderRadius) + 26,
              paperAlpha: isDark ? 0.86 : 0.99,
              notchAlpha: isDark ? 0.62 : 0.36,
              measureAlpha: isDark ? 0.42 : 0.22,
              blurMin: 12,
              blurMax: 18,
            }),
          },
          "&.ib-showcase-card, &[data-ib-surface='showcase']": {
            ...blueprintPanel(theme, controls, {
              level: "overlay",
              radius: Number(theme.shape.borderRadius) + 34,
              paperAlpha: isDark ? 0.9 : 0.994,
              notchAlpha: isDark ? 0.8 : 0.5,
              measureAlpha: isDark ? 0.56 : 0.32,
              shadowAlpha: isDark ? 0.6 : 0.2,
              blurMin: 18,
              blurMax: 28,
            }),
          },
          "&.ib-surface-calm, &[data-ib-surface='calm']": {
            ...calmSurface(theme, controls, theme.palette.info.main),
          },
          "&[data-ib-surface='overlay']": {
            ...blueprintPanel(theme, controls, {
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
          ...blueprintPanel(theme, controls, {
            level: "elevated",
            radius: Number(theme.shape.borderRadius) + 22,
            paperAlpha: isDark ? 0.82 : 0.98,
            borderAlpha: isDark ? 0.12 : 0.08,
            notchAlpha: isDark ? 0.18 : 0.1,
            measureAlpha: isDark ? 0.12 : 0.06,
            shadowAlpha: isDark ? 0.48 : 0.14,
            showNotches: false,
            showMeasure: false,
          }),
          transition: theme.transitions.create(
            ["transform", "box-shadow", "border-color"],
            { duration: motionDuration(controls, 180, 260) },
          ),
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: [
              blueprintShadow(
                theme,
                controls,
                "elevated",
                theme.palette.primary.main,
              ),
              `0 0 ${Math.round(scale(controls.heroDrama, 22, 42))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.heroDrama, 0.08, 0.14),
              )}`,
            ].join(", "),
          },
          "&.ib-showcase-card, &[data-ib-card='showcase']": {
            ...blueprintPanel(theme, controls, {
              level: "overlay",
              radius: Number(theme.shape.borderRadius) + 34,
              paperAlpha: isDark ? 0.9 : 0.994,
              notchAlpha: isDark ? 0.82 : 0.52,
              measureAlpha: isDark ? 0.58 : 0.34,
              shadowAlpha: isDark ? 0.62 : 0.22,
              blurMin: 18,
              blurMax: 28,
            }),
            boxShadow: [
              blueprintShadow(
                theme,
                controls,
                "overlay",
                theme.palette.primary.main,
              ),
              `0 0 ${Math.round(scale(controls.heroDrama, 30, 56))}px ${alpha(
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
              `0 0 ${Math.round(scale(controls.heroDrama, 18, 34))}px ${alpha(
                theme.palette.primary.main,
                isDark ? 0.14 : 0.07,
              )}`,
              `0 0 ${Math.round(scale(controls.extravagance, 14, 24))}px ${alpha(
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
          "&.ib-showcase-headline, &[data-ib-copy='showcase']": {
            fontSize: "clamp(3rem, 6.2vw, 5.6rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.078em",
            textShadow: [
              `0 0 ${Math.round(scale(controls.heroDrama, 30, 52))}px ${alpha(
                theme.palette.primary.main,
                isDark ? 0.22 : 0.12,
              )}`,
              `0 0 ${Math.round(scale(controls.extravagance, 22, 38))}px ${alpha(
                theme.palette.secondary.main,
                isDark ? 0.12 : 0.06,
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
        backgroundImage: blueprintRail(
          theme,
          controls,
          scale(controls.heroDrama, 0.64, 0.92),
          90,
        ),
        opacity: 0.88,
        "&::after": {
          content: '""',
          position: "absolute",
          insetInline: "18%",
          insetBlockStart: -1,
          height: 1,
          backgroundImage: blueprintRail(
            theme,
            controls,
            scale(controls.extravagance, 0.42, 0.68),
            90,
          ),
          filter: `blur(${Math.round(scale(controls.blurBudget, 2, 4))}px)`,
          opacity: 0.72,
          pointerEvents: "none",
        },
        "&.MuiDivider-vertical": {
          width: 1,
          height: "auto",
          backgroundImage: blueprintRail(
            theme,
            controls,
            scale(controls.heroDrama, 0.54, 0.8),
            180,
          ),
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
        borderRadius: Number(theme.shape.borderRadius) + 6,
        paddingInline: Math.round(scale(controls.ctaPower, 18, 28)),
        paddingBlock: Math.round(scale(controls.ctaPower, 12, 16)),
        minHeight: Math.round(scale(controls.ctaPower, 46, 58)),
        fontWeight: 860,
        position: "relative",
        overflow: "hidden",
        transform: "translateZ(0)",
        ...blurStyle(controls, 8, 12),
        transition: theme.transitions.create(
          [
            "transform",
            "box-shadow",
            "background-color",
            "border-color",
            "color",
          ],
          { duration: motionDuration(controls, 180, 280) },
        ),
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: blueprintRail(
            theme,
            controls,
            scale(controls.heroDrama, 0.18, 0.28),
            135,
          ),
          opacity: 0,
          transform: "translateX(-12%)",
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
        "&.ib-showcase-cta, &[data-ib-tone='showcase']": {
          minHeight: Math.round(scale(controls.ctaPower, 60, 68)),
          paddingInline: Math.round(scale(controls.ctaPower, 30, 38)),
          paddingBlock: Math.round(scale(controls.ctaPower, 15, 18)),
          letterSpacing: "0.14em",
        },
      }),

      sizeLarge: {
        minHeight: Math.round(scale(controls.ctaPower, 54, 62)),
        paddingInline: Math.round(scale(controls.ctaPower, 24, 32)),
        paddingBlock: Math.round(scale(controls.ctaPower, 14, 16)),
      },

      containedPrimary: ({ theme }) => {
        const isDark = theme.palette.mode === "dark";

        return {
          color: theme.palette.primary.contrastText,
          border: `1px solid ${alpha(
            theme.palette.primary.main,
            isDark ? 0.5 : 0.24,
          )}`,
          backgroundImage: [
            `linear-gradient(145deg,
              ${alpha(theme.palette.primary.light ?? theme.palette.primary.main, isDark ? 0.78 : 0.56)} 0%,
              ${alpha(theme.palette.primary.main, isDark ? 0.92 : 0.82)} 54%,
              ${alpha(theme.palette.secondary.main, isDark ? 0.34 : 0.16)} 100%)`,
            blueprintRail(
              theme,
              controls,
              scale(controls.ctaPower, 0.18, 0.28),
              135,
            ),
          ].join(", "),
          boxShadow: [
            `0 0 0 1px ${alpha(theme.palette.text.primary, 0.08)} inset`,
            `0 ${Math.round(scale(controls.ctaPower, 20, 30))}px ${Math.round(
              scale(controls.ctaPower, 52, 84),
            )}px ${alpha("#000000", isDark ? 0.58 : 0.2)}`,
            `0 0 ${Math.round(scale(controls.ctaPower, 22, 42))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.ctaPower, 0.14, 0.24),
            )}`,
          ].join(", "),
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: blueprintRail(
              theme,
              controls,
              scale(controls.heroDrama, 0.16, 0.26),
              135,
            ),
            opacity: 0.22,
            pointerEvents: "none",
          },
          "&:hover": {
            boxShadow: [
              `0 0 0 1px ${alpha(theme.palette.text.primary, 0.1)} inset`,
              `0 ${Math.round(scale(controls.ctaPower, 24, 34))}px ${Math.round(
                scale(controls.ctaPower, 64, 96),
              )}px ${alpha("#000000", isDark ? 0.68 : 0.24)}`,
              `0 0 ${Math.round(scale(controls.ctaPower, 28, 52))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.ctaPower, 0.18, 0.3),
              )}`,
            ].join(", "),
          },
          "&.Mui-focusVisible": {
            boxShadow: [
              blueprintFocusRing(theme, controls, 4),
              `0 ${Math.round(scale(controls.ctaPower, 22, 32))}px ${Math.round(
                scale(controls.ctaPower, 58, 88),
              )}px ${alpha("#000000", isDark ? 0.62 : 0.22)}`,
            ].join(", "),
          },
          "&.ib-showcase-cta, &[data-ib-tone='showcase']": {
            backgroundImage: [
              `linear-gradient(145deg,
                ${alpha(theme.palette.primary.light ?? theme.palette.primary.main, isDark ? 0.86 : 0.64)} 0%,
                ${alpha(theme.palette.primary.main, isDark ? 0.98 : 0.9)} 52%,
                ${alpha(theme.palette.secondary.main, isDark ? 0.42 : 0.22)} 100%)`,
              blueprintRail(theme, controls, 0.34, 135),
            ].join(", "),
            boxShadow: [
              `0 0 0 1px ${alpha(theme.palette.text.primary, 0.1)} inset`,
              `0 ${Math.round(scale(controls.ctaPower, 30, 40))}px ${Math.round(
                scale(controls.ctaPower, 84, 124),
              )}px ${alpha("#000000", isDark ? 0.72 : 0.26)}`,
              `0 0 ${Math.round(scale(controls.ctaPower, 40, 70))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.ctaPower, 0.24, 0.4),
              )}`,
              `0 0 ${Math.round(scale(controls.extravagance, 24, 42))}px ${alpha(
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
          borderColor: alpha(theme.palette.text.primary, isDark ? 0.18 : 0.12),
          backgroundColor: alpha(
            theme.palette.text.primary,
            isDark ? 0.04 : 0.03,
          ),
          boxShadow: `0 0 0 1px ${alpha(
            blueprintInk(theme),
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
            boxShadow: blueprintFocusRing(theme, controls, 3),
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
            boxShadow: blueprintFocusRing(theme, controls, 2),
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
            blueprintInk(theme),
            isDark ? 0.03 : 0.04,
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
            boxShadow: `0 0 ${Math.round(scale(controls.extravagance, 12, 24))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.extravagance, 0.08, 0.14),
            )}`,
          },
          "&.Mui-focusVisible": {
            boxShadow: blueprintFocusRing(theme, controls, 3),
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
            blueprintInk(theme),
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
            blueprintInk(theme),
            isDark ? 0.03 : 0.04,
          )} inset`,
          ...blurStyle(controls, 8, 12),
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(theme.palette.text.primary, isDark ? 0.2 : 0.14),
          },
          "&.Mui-focused": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.05,
            ),
            boxShadow: blueprintFocusRing(theme, controls, 3),
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
          blueprintRail(
            theme,
            controls,
            scale(controls.extravagance, 0.26, 0.42),
            90,
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
            backgroundImage: blueprintRail(
              theme,
              controls,
              scale(controls.ctaPower, 0.42, 0.66),
              90,
            ),
            opacity: 1,
            borderColor: alpha(theme.palette.primary.main, 0.34),
          },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
          boxShadow: blueprintFocusRing(theme, controls, 2),
        },
      }),
      thumb: ({ theme }) => ({
        width: 16,
        height: 16,
        borderRadius: 999,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 0 1px ${alpha(
          blueprintInk(theme),
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
        backgroundImage: blueprintRail(
          theme,
          controls,
          scale(controls.extravagance, 0.72, 1),
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
        backgroundImage: blueprintRail(
          theme,
          controls,
          scale(controls.ctaPower, 0.82, 1),
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
        transition: theme.transitions.create(
          ["background-color", "transform"],
          {
            duration: motionDuration(controls, 140, 220),
          },
        ),
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
        ...blueprintPanel(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 12,
          paperAlpha: theme.palette.mode === "dark" ? 0.9 : 0.98,
          notchAlpha: theme.palette.mode === "dark" ? 0.18 : 0.1,
          measureAlpha: theme.palette.mode === "dark" ? 0.12 : 0.06,
          shadowAlpha: theme.palette.mode === "dark" ? 0.42 : 0.14,
          blurMin: 10,
          blurMax: 14,
          showNotches: false,
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
        ...blueprintPanel(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 28,
          paperAlpha: theme.palette.mode === "dark" ? 0.86 : 0.988,
          notchAlpha: theme.palette.mode === "dark" ? 0.24 : 0.14,
          measureAlpha: theme.palette.mode === "dark" ? 0.18 : 0.1,
          shadowAlpha: theme.palette.mode === "dark" ? 0.52 : 0.16,
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
        ...blueprintPanel(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 16,
          paperAlpha: theme.palette.mode === "dark" ? 0.9 : 0.986,
          notchAlpha: theme.palette.mode === "dark" ? 0.16 : 0.1,
          measureAlpha: theme.palette.mode === "dark" ? 0.12 : 0.06,
          shadowAlpha: theme.palette.mode === "dark" ? 0.42 : 0.14,
          blurMin: 14,
          blurMax: 20,
          showNotches: false,
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
        ...blueprintPanel(theme, controls, {
          level: "overlay",
          radius: 0,
          paperAlpha: theme.palette.mode === "dark" ? 0.86 : 0.986,
          notchAlpha: theme.palette.mode === "dark" ? 0.18 : 0.1,
          measureAlpha: theme.palette.mode === "dark" ? 0.14 : 0.08,
          shadowAlpha: theme.palette.mode === "dark" ? 0.46 : 0.14,
          blurMin: 16,
          blurMax: 24,
          showNotches: false,
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
        transition: theme.transitions.create(
          ["color", "text-decoration-color"],
          {
            duration: motionDuration(controls, 140, 220),
          },
        ),
        "&:hover": {
          color: theme.palette.primary.main,
          textDecorationColor: alpha(theme.palette.primary.main, 0.34),
        },
      }),
    },
  },
});

export const infraredBlueprintLight = {
  name: "Infrared Blueprint Light",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#E75A49",
      dark: "#BF4030",
      light: "#F5A59A",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#7A63E8",
      dark: "#5A45C0",
      light: "#B5A9F4",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#39AFC8",
      dark: "#26879D",
      light: "#97DDEA",
      contrastText: "#082128",
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
      primary: "#192033",
      secondary: "#626C84",
      disabled: alpha("#192033", 0.42),
    },

    divider: alpha("#192033", 0.1),

    action: {
      hover: alpha("#192033", 0.04),
      selected: alpha("#E75A49", 0.08),
      focus: alpha("#E75A49", 0.16),
      active: alpha("#192033", 0.56),
      disabled: alpha("#192033", 0.26),
      disabledBackground: alpha("#192033", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 18 },
  spacing: 8,

  components: createComponents(lightControls),
} satisfies NamedThemeOptions;

export const infraredBlueprint = {
  name: "Infrared Blueprint",
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: "#FF4D3D",
      dark: "#E63A2A",
      light: "#FF8A80",
      contrastText: "#120605",
    },

    secondary: {
      main: "#8A5CFF",
      dark: "#6A3CFF",
      light: "#B7A0FF",
      contrastText: "#060812",
    },

    info: {
      main: "#66E6FF",
      dark: "#2FD1F2",
      light: "#B9F5FF",
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
      default: "#07070D",
      paper: "#0D0E18",
    },

    text: {
      primary: "#F4F6FF",
      secondary: "#B8BED2",
      disabled: alpha("#F4F6FF", 0.4),
    },

    divider: alpha("#F4F6FF", 0.1),

    action: {
      hover: alpha("#F4F6FF", 0.06),
      selected: alpha("#F4F6FF", 0.1),
      focus: alpha("#FF4D3D", 0.2),
      active: alpha("#F4F6FF", 0.62),
      disabled: alpha("#F4F6FF", 0.26),
      disabledBackground: alpha("#F4F6FF", 0.08),
    },
  },

  typography,

  shape: { borderRadius: 18 },
  spacing: 8,

  components: createComponents(darkControls),
} satisfies NamedThemeOptions;
