import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

const FONT_DISPLAY =
  'var(--font-glass-display),"IBM Plex Sans","Source Sans 3","Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_TEXT =
  'var(--font-glass-text),"Golos Text","IBM Plex Sans","Inter","Manrope","Roboto","Helvetica","Arial",sans-serif';
const FONT_MONO =
  'var(--font-glass-mono),"IBM Plex Mono","JetBrains Mono","Roboto Mono","Menlo","Consolas",monospace';

interface GlassLandingControls {
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

const createLandingControls = (
  controls: GlassLandingControls,
): GlassLandingControls => ({
  luxuryLevel: clampUnit(controls.luxuryLevel),
  extravagance: clampUnit(controls.extravagance),
  heroDrama: clampUnit(controls.heroDrama),
  ctaPower: clampUnit(controls.ctaPower),
  motionPolish: clampUnit(controls.motionPolish),
  blurBudget: clampUnit(controls.blurBudget),
});

const lightControls = createLandingControls({
  luxuryLevel: 0.94,
  extravagance: 0.92,
  heroDrama: 0.95,
  ctaPower: 0.98,
  motionPolish: 0.88,
  blurBudget: 0.9,
});

const darkControls = createLandingControls({
  luxuryLevel: 0.98,
  extravagance: 0.96,
  heroDrama: 0.98,
  ctaPower: 0.99,
  motionPolish: 0.9,
  blurBudget: 0.94,
});

const typography = {
  fontFamily: FONT_TEXT,
  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 720,
    fontSize: "clamp(3.2rem, 6.4vw, 5.9rem)",
    lineHeight: 0.98,
    letterSpacing: "-0.028em",
    textTransform: "none",
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    fontSize: "clamp(2.25rem, 4.2vw, 3.8rem)",
    lineHeight: 1.04,
    letterSpacing: "-0.02em",
    textTransform: "none",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 680,
    fontSize: "clamp(1.38rem, 2.35vw, 1.98rem)",
    lineHeight: 1.12,
    letterSpacing: "-0.012em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 650,
    fontSize: "1.18rem",
    lineHeight: 1.24,
    letterSpacing: "-0.006em",
  },
  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 620,
    fontSize: "1.04rem",
    lineHeight: 1.56,
    letterSpacing: "0.004em",
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 620,
    fontSize: "0.92rem",
    lineHeight: 1.48,
    letterSpacing: "0.018em",
  },
  body1: {
    fontFamily: FONT_TEXT,
    fontSize: "1rem",
    lineHeight: 1.74,
    letterSpacing: "0.002em",
  },
  body2: {
    fontFamily: FONT_TEXT,
    fontSize: "0.94rem",
    lineHeight: 1.66,
    letterSpacing: "0.002em",
  },
  button: {
    fontFamily: FONT_DISPLAY,
    textTransform: "none",
    fontWeight: 650,
    letterSpacing: "0.012em",
  },
  caption: {
    fontFamily: FONT_MONO,
    fontSize: "0.8rem",
    letterSpacing: "0.014em",
  },
  overline: {
    fontFamily: FONT_MONO,
    fontSize: "0.74rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 700,
  },
} as const;

const reactorInk = (theme: Theme): string =>
  theme.palette.mode === "dark" ? theme.palette.common.white : "#061019";

const reactorRail = (theme: Theme, opacity = 0.28, angle = 135): string =>
  `linear-gradient(${angle}deg, ${alpha(theme.palette.primary.main, opacity)} 0%, ${alpha(
    theme.palette.info.main,
    opacity * 0.94,
  )} 38%, ${alpha(theme.palette.secondary.main, opacity * 0.92)} 76%, ${alpha(
    reactorInk(theme),
    theme.palette.mode === "dark" ? opacity * 0.42 : opacity * 0.24,
  )} 100%)`;

const reactorFocusRing = (
  theme: Theme,
  controls: GlassLandingControls,
  width = 4,
): string =>
  [
    `0 0 0 ${width}px ${alpha(
      theme.palette.primary.main,
      scale(controls.ctaPower, 0.18, 0.3),
    )}`,
    `0 0 ${Math.round(scale(controls.ctaPower, 18, 34))}px ${alpha(
      theme.palette.info.main,
      scale(controls.extravagance, 0.18, 0.3),
    )}`,
  ].join(", ");

const reactorHeadlineTreatment = (
  theme: Theme,
  controls: GlassLandingControls,
  tone: "hero" | "showcase" = "hero",
) => {
  const isDark = theme.palette.mode === "dark";
  const seamOpacity =
    tone === "showcase"
      ? scale(controls.extravagance, 0.34, 0.56)
      : scale(controls.extravagance, 0.22, 0.38);
  const glazeOpacity =
    tone === "showcase" ? (isDark ? 0.18 : 0.28) : isDark ? 0.12 : 0.2;

  return {
    paddingInline: tone === "showcase" ? "0.08em" : "0.05em",
    paddingBlockStart: "0.02em",
    paddingBlockEnd: tone === "showcase" ? "0.14em" : "0.1em",
    borderRadius: "0.22em",
    backgroundImage: [
      `linear-gradient(180deg, ${alpha(
        theme.palette.common.white,
        glazeOpacity,
      )} 0%, ${alpha(
        theme.palette.common.white,
        isDark ? glazeOpacity * 0.38 : glazeOpacity * 0.5,
      )} 16%, transparent 42%)`,
      `radial-gradient(140% 92% at 18% 0%, ${alpha(
        theme.palette.info.main,
        tone === "showcase"
          ? scale(controls.heroDrama, 0.16, 0.26)
          : scale(controls.heroDrama, 0.1, 0.18),
      )} 0%, transparent 62%)`,
      `linear-gradient(90deg, transparent 0%, ${alpha(
        theme.palette.primary.main,
        seamOpacity * 0.72,
      )} 14%, ${alpha(theme.palette.info.main, seamOpacity)} 52%, ${alpha(
        theme.palette.secondary.main,
        seamOpacity * 0.82,
      )} 86%, transparent 100%)`,
      `linear-gradient(90deg, transparent 0%, ${alpha(
        theme.palette.common.white,
        isDark ? 0.16 : 0.24,
      )} 50%, transparent 100%)`,
    ].join(", "),
    backgroundSize: "100% 100%, 100% 100%, 100% 2px, 100% 1px",
    backgroundPosition: "0 0, 0 0, 0 calc(100% - 1px), 0 0",
    backgroundRepeat: "no-repeat",
    boxDecorationBreak: "clone" as const,
    WebkitBoxDecorationBreak: "clone" as const,
  };
};

const reactorShadow = (
  theme: Theme,
  controls: GlassLandingControls,
  level: SurfaceLevel,
  accent = theme.palette.primary.main,
): string => {
  const isDark = theme.palette.mode === "dark";
  const lift =
    level === "overlay"
      ? scale(controls.luxuryLevel, 30, 52)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 18, 34)
        : scale(controls.luxuryLevel, 10, 18);
  const blur =
    level === "overlay"
      ? scale(controls.luxuryLevel, 58, 104)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 34, 68)
        : scale(controls.luxuryLevel, 20, 40);
  const glowBlur =
    level === "overlay"
      ? scale(controls.extravagance, 34, 72)
      : level === "elevated"
        ? scale(controls.extravagance, 22, 46)
        : scale(controls.extravagance, 12, 28);
  const shadowAlpha =
    level === "overlay"
      ? isDark
        ? 0.54
        : 0.18
      : level === "elevated"
        ? isDark
          ? 0.4
          : 0.12
        : isDark
          ? 0.28
          : 0.08;
  const ringAlpha =
    level === "overlay"
      ? isDark
        ? 0.22
        : 0.5
      : level === "elevated"
        ? isDark
          ? 0.16
          : 0.38
        : isDark
          ? 0.11
          : 0.24;
  const topInsetAlpha =
    level === "overlay"
      ? isDark
        ? 0.2
        : 0.32
      : level === "elevated"
        ? isDark
          ? 0.14
          : 0.24
        : isDark
          ? 0.08
          : 0.16;
  const bottomInsetAlpha =
    level === "overlay"
      ? scale(controls.extravagance, 0.08, 0.18)
      : level === "elevated"
        ? scale(controls.extravagance, 0.05, 0.12)
        : scale(controls.extravagance, 0.03, 0.08);

  return [
    `0 ${Math.round(lift * 0.75)}px ${Math.round(blur)}px ${alpha("#000000", shadowAlpha)}`,
    `0 0 ${Math.round(glowBlur)}px ${alpha(
      accent,
      level === "overlay"
        ? scale(controls.extravagance, 0.12, 0.24)
        : level === "elevated"
          ? scale(controls.extravagance, 0.08, 0.16)
          : scale(controls.extravagance, 0.04, 0.1),
    )}`,
    `0 0 0 1px ${alpha(theme.palette.common.white, ringAlpha)} inset`,
    `inset 0 1px 0 ${alpha(theme.palette.common.white, topInsetAlpha)}`,
    `inset 0 -1px 0 ${alpha(accent, bottomInsetAlpha)}`,
  ].join(", ");
};

const reactorSurface = (
  theme: Theme,
  controls: GlassLandingControls,
  {
    level,
    radius,
    tint = theme.palette.background.paper,
    accent = theme.palette.primary.main,
    fillAlpha,
  }: {
    level: SurfaceLevel;
    radius: number;
    tint?: string;
    accent?: string;
    fillAlpha?: number;
  },
) => {
  const isDark = theme.palette.mode === "dark";
  const resolvedFill =
    fillAlpha ??
    (level === "overlay"
      ? scale(controls.luxuryLevel, isDark ? 0.8 : 0.93, isDark ? 0.9 : 0.98)
      : level === "elevated"
        ? scale(controls.luxuryLevel, isDark ? 0.68 : 0.84, isDark ? 0.8 : 0.92)
        : scale(
            controls.luxuryLevel,
            isDark ? 0.58 : 0.76,
            isDark ? 0.68 : 0.88,
          ));
  const blurPx =
    level === "overlay"
      ? scale(controls.blurBudget, 22, 30)
      : level === "elevated"
        ? scale(controls.blurBudget, 15, 22)
        : scale(controls.blurBudget, 8, 14);
  const prismAlpha =
    level === "overlay"
      ? scale(controls.extravagance, isDark ? 0.16 : 0.12, isDark ? 0.26 : 0.22)
      : level === "elevated"
        ? scale(
            controls.extravagance,
            isDark ? 0.1 : 0.07,
            isDark ? 0.18 : 0.14,
          )
        : scale(
            controls.extravagance,
            isDark ? 0.05 : 0.04,
            isDark ? 0.11 : 0.08,
          );
  const topSheenAlpha =
    level === "overlay"
      ? isDark
        ? 0.18
        : 0.32
      : level === "elevated"
        ? isDark
          ? 0.14
          : 0.24
        : isDark
          ? 0.08
          : 0.16;
  const accentHaloAlpha =
    level === "overlay"
      ? prismAlpha
      : level === "elevated"
        ? prismAlpha * 0.82
        : prismAlpha * 0.62;
  const bottomHaloAlpha =
    level === "overlay"
      ? prismAlpha * 0.96
      : level === "elevated"
        ? prismAlpha * 0.8
        : prismAlpha * 0.6;
  const railOpacity =
    level === "overlay"
      ? scale(controls.extravagance, 0.28, 0.46)
      : level === "elevated"
        ? scale(controls.extravagance, 0.2, 0.34)
        : scale(controls.extravagance, 0.12, 0.22);
  const saturation =
    level === "overlay"
      ? scale(controls.luxuryLevel, 134, 170)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 122, 150)
        : scale(controls.luxuryLevel, 112, 132);

  return {
    position: "relative" as const,
    overflow: "hidden" as const,
    isolation: "isolate" as const,
    borderRadius: radius,
    border: "1px solid transparent",
    backgroundColor: alpha(tint, resolvedFill),
    backgroundImage: [
      `radial-gradient(520px 220px at 16% 0%, ${alpha(
        theme.palette.common.white,
        topSheenAlpha,
      )} 0%, transparent 62%)`,
      `radial-gradient(560px 240px at 82% 0%, ${alpha(
        accent,
        accentHaloAlpha,
      )} 0%, transparent 68%)`,
      `radial-gradient(140% 90% at 50% 118%, ${alpha(
        theme.palette.info.main,
        bottomHaloAlpha,
      )} 0%, transparent 58%)`,
      `linear-gradient(160deg, ${alpha(
        theme.palette.common.white,
        isDark ? topSheenAlpha * 0.72 : topSheenAlpha * 1.14,
      )} 0%, ${alpha(
        tint,
        Math.min(
          0.99,
          resolvedFill +
            (level === "overlay" ? 0.1 : level === "elevated" ? 0.08 : 0.06),
        ),
      )} 22%, ${alpha(
        tint,
        resolvedFill,
      )} 66%, ${alpha(accent, prismAlpha * 0.96)} 100%)`,
      reactorRail(theme, railOpacity, 135),
    ].join(", "),
    backgroundOrigin:
      "padding-box, padding-box, padding-box, padding-box, border-box",
    backgroundClip:
      "padding-box, padding-box, padding-box, padding-box, border-box",
    backgroundBlendMode: "screen, screen, screen, normal, normal",
    boxShadow: reactorShadow(theme, controls, level, accent),
    backdropFilter: `blur(${Math.round(blurPx)}px) saturate(${Math.round(saturation)}%)`,
    WebkitBackdropFilter: `blur(${Math.round(blurPx)}px) saturate(${Math.round(saturation)}%)`,
    "@media (hover: none), (max-width: 900px)": {
      backdropFilter: `blur(${Math.max(8, Math.round(blurPx * 0.65))}px)`,
      WebkitBackdropFilter: `blur(${Math.max(8, Math.round(blurPx * 0.65))}px)`,
    },
  };
};

const createComponents = (
  controls: GlassLandingControls,
): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => {
      const isDark = theme.palette.mode === "dark";

      return {
        ":root": {
          "--gr-primary": theme.palette.primary.main,
          "--gr-cool": theme.palette.info.main,
          "--gr-ink": reactorInk(theme),
        },
        "@keyframes grAuroraDrift": {
          "0%": {
            transform: "translate3d(-3%, 0, 0)",
            opacity: 0.54,
          },
          "50%": {
            transform: "translate3d(0, 1.5%, 0)",
            opacity: 0.86,
          },
          "100%": {
            transform: "translate3d(3%, 0, 0)",
            opacity: 0.58,
          },
        },
        "@keyframes grRise": {
          "0%": { transform: "translateY(8px)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },
        "@keyframes grRailPulse": {
          "0%, 100%": { opacity: 0.74, transform: "scaleX(1)" },
          "50%": { opacity: 1, transform: "scaleX(1.01)" },
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
            `linear-gradient(102deg, transparent 0%, ${alpha(
              theme.palette.primary.main,
              scale(
                controls.heroDrama,
                isDark ? 0.1 : 0.06,
                isDark ? 0.16 : 0.12,
              ),
            )} 24%, ${alpha(
              theme.palette.info.main,
              scale(
                controls.heroDrama,
                isDark ? 0.12 : 0.08,
                isDark ? 0.18 : 0.14,
              ),
            )} 48%, ${alpha(
              theme.palette.secondary.main,
              scale(
                controls.extravagance,
                isDark ? 0.08 : 0.05,
                isDark ? 0.14 : 0.1,
              ),
            )} 70%, transparent 92%)`,
            `radial-gradient(1040px 620px at 14% 8%, ${alpha(
              theme.palette.info.main,
              scale(
                controls.heroDrama,
                isDark ? 0.18 : 0.1,
                isDark ? 0.3 : 0.2,
              ),
            )} 0%, transparent 60%)`,
            `radial-gradient(980px 580px at 86% 10%, ${alpha(
              theme.palette.secondary.main,
              scale(
                controls.heroDrama,
                isDark ? 0.14 : 0.08,
                isDark ? 0.22 : 0.16,
              ),
            )} 0%, transparent 62%)`,
            `radial-gradient(980px 540px at 76.4% 112%, ${alpha(
              theme.palette.primary.main,
              scale(
                controls.heroDrama,
                isDark ? 0.16 : 0.08,
                isDark ? 0.26 : 0.16,
              ),
            )} 0%, transparent 58%)`,
            `radial-gradient(720px 420px at 61.8% 0%, ${alpha(
              theme.palette.common.white,
              isDark ? 0.06 : 0.12,
            )} 0%, transparent 72%)`,
            `linear-gradient(180deg, ${alpha(
              theme.palette.background.default,
              isDark ? 0.04 : 0.82,
            )} 0%, transparent 20%, transparent 70%, ${alpha(
              theme.palette.background.default,
              isDark ? 0.76 : 0.96,
            )} 100%)`,
            `repeating-linear-gradient(0deg, ${alpha(
              reactorInk(theme),
              isDark ? 0.035 : 0.016,
            )} 0px, ${alpha(
              reactorInk(theme),
              isDark ? 0.035 : 0.016,
            )} 1px, transparent 1px, transparent 26px)`,
            `repeating-linear-gradient(90deg, ${alpha(
              theme.palette.common.white,
              isDark ? 0.02 : 0.014,
            )} 0px, ${alpha(
              theme.palette.common.white,
              isDark ? 0.02 : 0.014,
            )} 1px, transparent 1px, transparent 32px)`,
          ].join(", "),
          backgroundSize:
            "100% 240px, auto, auto, auto, auto, auto, 160px 160px, 160px 160px",
          backgroundAttachment: "fixed",
        },
        "body::after": {
          content: '""',
          position: "fixed",
          insetInline: "clamp(20px, 6vw, 92px)",
          insetBlockStart: "clamp(82px, 15vh, 146px)",
          height: 14,
          borderRadius: 999,
          backgroundImage: [
            `linear-gradient(180deg, ${alpha(
              theme.palette.common.white,
              isDark ? 0.18 : 0.32,
            )} 0%, transparent 100%)`,
            reactorRail(theme, 0.92, 90),
          ].join(", "),
          backgroundSize: "100% 100%, 100% 100%",
          boxShadow: [
            `0 0 26px ${alpha(
              theme.palette.primary.main,
              scale(controls.extravagance, 0.16, 0.28),
            )}`,
            `0 0 38px ${alpha(
              theme.palette.info.main,
              scale(controls.heroDrama, 0.12, 0.22),
            )}`,
          ].join(", "),
          pointerEvents: "none",
          transformOrigin: "center center",
          animation: `grRailPulse ${Math.round(
            scale(controls.motionPolish, 4200, 2600),
          )}ms ease-in-out infinite`,
        },
        "body.gr-showcase-mode, body[data-gr-scene='showcase']": {
          backgroundImage: [
            `linear-gradient(102deg, transparent 0%, ${alpha(
              theme.palette.primary.main,
              scale(
                controls.heroDrama,
                isDark ? 0.14 : 0.09,
                isDark ? 0.22 : 0.16,
              ),
            )} 22%, ${alpha(
              theme.palette.info.main,
              scale(
                controls.heroDrama,
                isDark ? 0.16 : 0.1,
                isDark ? 0.24 : 0.18,
              ),
            )} 50%, ${alpha(
              theme.palette.secondary.main,
              scale(
                controls.extravagance,
                isDark ? 0.1 : 0.07,
                isDark ? 0.16 : 0.12,
              ),
            )} 72%, transparent 94%)`,
            `radial-gradient(1180px 680px at 16% 6%, ${alpha(
              theme.palette.info.main,
              scale(
                controls.heroDrama,
                isDark ? 0.24 : 0.14,
                isDark ? 0.38 : 0.24,
              ),
            )} 0%, transparent 60%)`,
            `radial-gradient(1080px 640px at 86% 8%, ${alpha(
              theme.palette.secondary.main,
              scale(
                controls.heroDrama,
                isDark ? 0.18 : 0.1,
                isDark ? 0.3 : 0.2,
              ),
            )} 0%, transparent 62%)`,
            `radial-gradient(1120px 620px at 76.4% 110%, ${alpha(
              theme.palette.primary.main,
              scale(
                controls.heroDrama,
                isDark ? 0.22 : 0.12,
                isDark ? 0.34 : 0.22,
              ),
            )} 0%, transparent 58%)`,
            `radial-gradient(840px 480px at 61.8% 0%, ${alpha(
              theme.palette.common.white,
              isDark ? 0.08 : 0.16,
            )} 0%, transparent 72%)`,
            `linear-gradient(180deg, ${alpha(
              theme.palette.background.default,
              isDark ? 0.03 : 0.74,
            )} 0%, transparent 18%, transparent 68%, ${alpha(
              theme.palette.background.default,
              isDark ? 0.8 : 0.98,
            )} 100%)`,
            `repeating-linear-gradient(0deg, ${alpha(
              reactorInk(theme),
              isDark ? 0.04 : 0.018,
            )} 0px, ${alpha(
              reactorInk(theme),
              isDark ? 0.04 : 0.018,
            )} 1px, transparent 1px, transparent 24px)`,
            `repeating-linear-gradient(90deg, ${alpha(
              theme.palette.common.white,
              isDark ? 0.024 : 0.016,
            )} 0px, ${alpha(
              theme.palette.common.white,
              isDark ? 0.024 : 0.016,
            )} 1px, transparent 1px, transparent 30px)`,
          ].join(", "),
        },
        "body.gr-showcase-mode::after, body[data-gr-scene='showcase']::after": {
          insetInline: "clamp(20px, 5vw, 80px)",
          insetBlockStart: "clamp(74px, 13vh, 124px)",
          height: 16,
          backgroundImage: [
            `linear-gradient(180deg, ${alpha(
              theme.palette.common.white,
              isDark ? 0.22 : 0.36,
            )} 0%, transparent 100%)`,
            reactorRail(theme, 0.98, 90),
          ].join(", "),
          boxShadow: [
            `0 0 34px ${alpha(
              theme.palette.primary.main,
              scale(controls.extravagance, 0.18, 0.28),
            )}`,
            `0 0 48px ${alpha(
              theme.palette.info.main,
              scale(controls.heroDrama, 0.12, 0.2),
            )}`,
          ].join(", "),
        },
        ".gr-metric": {
          fontFamily: FONT_MONO,
          letterSpacing: "-0.05em",
          textShadow: `0 0 18px ${alpha(theme.palette.primary.main, 0.12)}`,
          animation: "grRise 380ms ease-out 1",
        },
        ".gr-surface-calm, [data-gr-surface='calm']": {
          ...reactorSurface(theme, controls, {
            level: "surface",
            radius: Number(theme.shape.borderRadius) + 20,
            tint: theme.palette.background.paper,
            accent: theme.palette.info.main,
            fillAlpha: isDark ? 0.72 : 0.88,
          }),
        },
        ".gr-panel-focus, [data-gr-surface='focus']": {
          ...reactorSurface(theme, controls, {
            level: "elevated",
            radius: Number(theme.shape.borderRadius) + 24,
            tint: theme.palette.background.paper,
            accent: theme.palette.primary.main,
            fillAlpha: isDark ? 0.78 : 0.92,
          }),
          boxShadow: [
            reactorShadow(
              theme,
              controls,
              "elevated",
              theme.palette.primary.main,
            ),
            `0 0 ${Math.round(scale(controls.heroDrama, 26, 44))}px ${alpha(
              theme.palette.info.main,
              scale(controls.heroDrama, 0.08, 0.14),
            )}`,
          ].join(", "),
        },
        ".gr-panel-hero, [data-gr-surface='hero']": {
          ...reactorSurface(theme, controls, {
            level: "overlay",
            radius: Number(theme.shape.borderRadius) + 30,
            tint: theme.palette.background.paper,
            accent: theme.palette.primary.main,
            fillAlpha: isDark ? 0.86 : 0.97,
          }),
          backgroundSize:
            "100% 100%, 100% 100%, 100% 100%, 100% 100%, 220% 220%",
          boxShadow: [
            reactorShadow(
              theme,
              controls,
              "overlay",
              theme.palette.primary.main,
            ),
            `0 0 ${Math.round(scale(controls.heroDrama, 48, 84))}px ${alpha(
              theme.palette.info.main,
              scale(controls.heroDrama, 0.12, 0.22),
            )}`,
          ].join(", "),
        },
        ".gr-panel-showcase, [data-gr-surface='showcase']": {
          ...reactorSurface(theme, controls, {
            level: "overlay",
            radius: Number(theme.shape.borderRadius) + 36,
            tint: theme.palette.background.paper,
            accent: theme.palette.primary.main,
            fillAlpha: isDark ? 0.9 : 0.985,
          }),
          backgroundSize:
            "100% 100%, 100% 100%, 100% 100%, 100% 100%, 260% 260%",
          boxShadow: [
            reactorShadow(
              theme,
              controls,
              "overlay",
              theme.palette.primary.main,
            ),
            `0 0 ${Math.round(scale(controls.heroDrama, 64, 112))}px ${alpha(
              theme.palette.info.main,
              scale(controls.heroDrama, 0.16, 0.28),
            )}`,
            `0 0 ${Math.round(scale(controls.extravagance, 42, 78))}px ${alpha(
              theme.palette.secondary.main,
              scale(controls.extravagance, 0.1, 0.18),
            )}`,
          ].join(", "),
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
            scale(controls.ctaPower, 0.52, 0.76),
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
        },
        code: {
          fontFamily: FONT_MONO,
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
          "body::after": {
            animation: "none",
            transform: "none",
            opacity: 0.88,
          },
          ".gr-metric": {
            animation: "none",
          },
        },
        "@media (hover: none), (max-width: 900px)": {
          body: {
            backgroundAttachment: "scroll",
          },
          "body::after": {
            insetInline: "18px",
            insetBlockStart: "104px",
            height: 10,
            opacity: 0.82,
          },
        },
      };
    },
  },

  MuiAppBar: {
    defaultProps: { color: "transparent" as const, elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        ...reactorSurface(theme, controls, {
          level: "elevated",
          radius: Number(theme.shape.borderRadius) + 18,
          tint: theme.palette.background.paper,
          accent: theme.palette.info.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.76 : 0.92,
        }),
        marginInline: theme.spacing(1),
        marginTop: theme.spacing(1),
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%",
        boxShadow: [
          reactorShadow(theme, controls, "elevated", theme.palette.info.main),
          `0 0 42px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.08, 0.16),
          )}`,
        ].join(", "),
        "&::after": {
          content: '""',
          position: "absolute",
          insetInline: 0,
          insetBlockEnd: 0,
          height: 3,
          backgroundImage: reactorRail(
            theme,
            scale(controls.extravagance, 0.48, 0.78),
            90,
          ),
          opacity: 0.92,
          boxShadow: `0 0 22px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.08, 0.14),
          )}`,
        },
      }),
    },
  },

  MuiContainer: {
    defaultProps: { maxWidth: "lg" },
    styleOverrides: {
      root: ({ theme }) => ({
        position: "relative",
        zIndex: 1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
        },
        "&[data-gr-section='hero']": {
          paddingTop: theme.spacing(5),
          paddingBottom: theme.spacing(7),
          display: "grid",
          alignItems: "end",
          [theme.breakpoints.up("md")]: {
            paddingTop: theme.spacing(7),
            paddingBottom: theme.spacing(9),
          },
          "& .MuiTypography-h1, & .MuiTypography-h2, & .gr-showcase-headline, & [data-gr-copy='showcase']":
            {
              marginBottom: theme.spacing(1.25),
            },
          "& .MuiTypography-subtitle1, & .MuiTypography-subtitle2": {
            maxWidth: "60ch",
          },
        },
        "&[data-gr-section='feature'], &[data-gr-section='proof']": {
          paddingTop: theme.spacing(3),
          paddingBottom: theme.spacing(4),
          [theme.breakpoints.up("md")]: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(5),
          },
        },
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...reactorSurface(theme, controls, {
          level: "surface",
          radius: Number(theme.shape.borderRadius) + 16,
          tint: theme.palette.background.paper,
          accent: theme.palette.secondary.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.66 : 0.84,
        }),
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: Math.round(scale(controls.motionPolish, 220, 320)),
        }),
        "&.gr-hero-card, &[data-gr-card='hero'], &[data-gr-surface='hero']": {
          ...reactorSurface(theme, controls, {
            level: "overlay",
            radius: Number(theme.shape.borderRadius) + 26,
            tint: theme.palette.background.paper,
            accent: theme.palette.primary.main,
            fillAlpha: theme.palette.mode === "dark" ? 0.82 : 0.96,
          }),
          backgroundSize:
            "100% 100%, 100% 100%, 100% 100%, 100% 100%, 220% 220%",
          boxShadow: [
            reactorShadow(
              theme,
              controls,
              "overlay",
              theme.palette.primary.main,
            ),
            `0 0 ${Math.round(scale(controls.heroDrama, 44, 80))}px ${alpha(
              theme.palette.info.main,
              scale(controls.heroDrama, 0.12, 0.22),
            )}`,
          ].join(", "),
        },
        "&.gr-showcase-card, &[data-gr-card='showcase'], &[data-gr-surface='showcase']":
          {
            ...reactorSurface(theme, controls, {
              level: "overlay",
              radius: Number(theme.shape.borderRadius) + 34,
              tint: theme.palette.background.paper,
              accent: theme.palette.primary.main,
              fillAlpha: theme.palette.mode === "dark" ? 0.88 : 0.98,
            }),
            backgroundSize:
              "100% 100%, 100% 100%, 100% 100%, 100% 100%, 260% 260%",
            boxShadow: [
              reactorShadow(
                theme,
                controls,
                "overlay",
                theme.palette.primary.main,
              ),
              `0 0 ${Math.round(scale(controls.heroDrama, 60, 104))}px ${alpha(
                theme.palette.info.main,
                scale(controls.heroDrama, 0.16, 0.28),
              )}`,
            ].join(", "),
          },
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: reactorShadow(
              theme,
              controls,
              "elevated",
              theme.palette.secondary.main,
            ),
          },
        },
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...reactorSurface(theme, controls, {
          level: "elevated",
          radius: Number(theme.shape.borderRadius) + 22,
          tint: theme.palette.background.paper,
          accent: theme.palette.primary.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.76 : 0.9,
        }),
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%, 180% 180%",
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background-position"],
          {
            duration: Math.round(scale(controls.motionPolish, 220, 320)),
          },
        ),
        "&.gr-hero-card, &[data-gr-card='hero'], &[data-gr-surface='hero']": {
          ...reactorSurface(theme, controls, {
            level: "overlay",
            radius: Number(theme.shape.borderRadius) + 28,
            tint: theme.palette.background.paper,
            accent: theme.palette.primary.main,
            fillAlpha: theme.palette.mode === "dark" ? 0.84 : 0.96,
          }),
          backgroundSize:
            "100% 100%, 100% 100%, 100% 100%, 100% 100%, 220% 220%",
        },
        "&.gr-showcase-card, &[data-gr-card='showcase'], &[data-gr-surface='showcase']":
          {
            ...reactorSurface(theme, controls, {
              level: "overlay",
              radius: Number(theme.shape.borderRadius) + 36,
              tint: theme.palette.background.paper,
              accent: theme.palette.primary.main,
              fillAlpha: theme.palette.mode === "dark" ? 0.9 : 0.98,
            }),
            backgroundSize:
              "100% 100%, 100% 100%, 100% 100%, 100% 100%, 260% 260%",
            boxShadow: [
              reactorShadow(
                theme,
                controls,
                "overlay",
                theme.palette.primary.main,
              ),
              `0 0 ${Math.round(scale(controls.heroDrama, 64, 116))}px ${alpha(
                theme.palette.info.main,
                scale(controls.heroDrama, 0.18, 0.3),
              )}`,
            ].join(", "),
          },
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-2px)",
            backgroundPosition: "0 0, 0 0, 0 0, 0 0, 100% 0",
            boxShadow: reactorShadow(
              theme,
              controls,
              "overlay",
              theme.palette.info.main,
            ),
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
          position: "relative",
          maxInlineSize: "14ch",
          ...reactorHeadlineTreatment(theme, controls, "hero"),
          textShadow: [
            `0 0 20px ${alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.18 : 0.08,
            )}`,
            `0 14px 32px ${alpha(
              theme.palette.info.main,
              theme.palette.mode === "dark" ? 0.14 : 0.06,
            )}`,
          ].join(", "),
          filter: `drop-shadow(0 0 14px ${alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.1 : 0.04,
          )})`,
          textWrap: "balance",
          overflowWrap: "break-word",
          hyphens: "auto",
          "html[lang='ru'] &": {
            maxInlineSize: "16ch",
            lineHeight: 1.04,
            letterSpacing: "-0.018em",
          },
        },
        "&.gr-showcase-headline, &[data-gr-copy='showcase']": {
          maxInlineSize: "13ch",
          ...reactorHeadlineTreatment(theme, controls, "showcase"),
          textShadow: [
            `0 0 26px ${alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.24 : 0.1,
            )}`,
            `0 18px 38px ${alpha(
              theme.palette.info.main,
              theme.palette.mode === "dark" ? 0.18 : 0.08,
            )}`,
            `0 0 24px ${alpha(
              theme.palette.secondary.main,
              theme.palette.mode === "dark" ? 0.12 : 0.06,
            )}`,
          ].join(", "),
          filter: `drop-shadow(0 0 18px ${alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.14 : 0.06,
          )})`,
          overflowWrap: "break-word",
          hyphens: "auto",
          "html[lang='ru'] &": {
            maxInlineSize: "15ch",
          },
        },
        "&.MuiTypography-h5, &.MuiTypography-h6": {
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          letterSpacing: "-0.014em",
          textWrap: "balance",
          maxInlineSize: "20ch",
          overflowWrap: "break-word",
          hyphens: "auto",
          textShadow: `0 10px 24px ${alpha(
            theme.palette.info.main,
            theme.palette.mode === "dark" ? 0.16 : 0.08,
          )}`,
          "html[lang='ru'] &": {
            maxInlineSize: "24ch",
            lineHeight: 1.18,
            letterSpacing: "-0.008em",
          },
        },
        "&.MuiTypography-h3, &.MuiTypography-h4": {
          textWrap: "balance",
          maxInlineSize: "18ch",
          overflowWrap: "break-word",
          hyphens: "auto",
          textShadow: `0 10px 28px ${alpha(
            theme.palette.info.main,
            theme.palette.mode === "dark" ? 0.14 : 0.06,
          )}`,
          "html[lang='ru'] &": {
            maxInlineSize: "21ch",
            lineHeight: 1.16,
            letterSpacing: "-0.006em",
          },
        },
        "&.MuiTypography-subtitle1": {
          color: alpha(theme.palette.text.primary, 0.92),
          textWrap: "balance",
          maxInlineSize: "58ch",
          overflowWrap: "break-word",
          hyphens: "auto",
          "html[lang='ru'] &": {
            maxInlineSize: "62ch",
            lineHeight: 1.62,
          },
        },
        "&.MuiTypography-subtitle2": {
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          width: "fit-content",
          color: alpha(theme.palette.info.main, 0.94),
          letterSpacing: "0.03em",
          textTransform: "none",
          textShadow: `0 0 18px ${alpha(
            theme.palette.info.main,
            theme.palette.mode === "dark" ? 0.14 : 0.08,
          )}`,
          "html[lang='ru'] &": {
            letterSpacing: "0.018em",
          },
        },
        "&.MuiTypography-overline": {
          display: "inline-flex",
          alignItems: "center",
          width: "fit-content",
          minHeight: 28,
          paddingInline: "0.78rem",
          paddingBlock: "0.32rem",
          borderRadius: 999,
          backgroundColor: alpha(
            theme.palette.background.paper,
            theme.palette.mode === "dark" ? 0.34 : 0.72,
          ),
          backgroundImage: [
            `linear-gradient(145deg, ${alpha(
              theme.palette.background.paper,
              theme.palette.mode === "dark" ? 0.42 : 0.82,
            )} 0%, ${alpha(
              theme.palette.background.paper,
              theme.palette.mode === "dark" ? 0.22 : 0.64,
            )} 100%)`,
            reactorRail(theme, scale(controls.extravagance, 0.16, 0.28), 132),
          ].join(", "),
          backgroundOrigin: "padding-box, border-box",
          backgroundClip: "padding-box, border-box",
          boxShadow: `inset 0 1px 0 ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.14 : 0.3,
          )}`,
          textTransform: "none",
          letterSpacing: "0.05em",
          "html[lang='ru'] &": {
            letterSpacing: "0.028em",
          },
        },
        "&.MuiTypography-body1, &.MuiTypography-body2": {
          maxInlineSize: "68ch",
          overflowWrap: "break-word",
          hyphens: "auto",
          "html[lang='ru'] &": {
            maxInlineSize: "72ch",
          },
        },
        "&.MuiTypography-body2": {
          lineHeight: 1.72,
          letterSpacing: "0.003em",
        },
        "&.MuiTypography-caption": {
          color: alpha(theme.palette.text.secondary, 0.86),
        },
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.95em",
          padding: "0.12em 0.42em",
          borderRadius: 12,
          backgroundColor: alpha(
            theme.palette.background.paper,
            theme.palette.mode === "dark" ? 0.58 : 0.8,
          ),
          border: `1px solid ${alpha(
            theme.palette.text.primary,
            theme.palette.mode === "dark" ? 0.14 : 0.08,
          )}`,
        },
      }),
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: "transparent",
        height: 4,
        borderRadius: 999,
        backgroundImage: [
          `linear-gradient(90deg, transparent 0%, ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.12 : 0.44,
          )} 18%, ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.2 : 0.62,
          )} 50%, transparent 100%)`,
          `linear-gradient(90deg, transparent 0%, ${alpha(
            theme.palette.info.main,
            scale(controls.extravagance, 0.12, 0.2),
          )} 18%, ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.28, 0.42),
          )} 50%, ${alpha(
            theme.palette.secondary.main,
            scale(controls.extravagance, 0.16, 0.26),
          )} 82%, transparent 100%)`,
        ].join(", "),
        boxShadow: [
          `0 0 16px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.08, 0.14),
          )}`,
          `0 0 24px ${alpha(
            theme.palette.info.main,
            scale(controls.heroDrama, 0.06, 0.1),
          )}`,
        ].join(", "),
        opacity: 0.94,
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        paddingInline: 24,
        paddingBlock: 13,
        minHeight: 50,
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        letterSpacing: "0.018em",
        lineHeight: 1.2,
        textAlign: "center",
        textWrap: "balance",
        overflowWrap: "break-word",
        hyphens: "auto",
        position: "relative",
        overflow: "hidden",
        transform: "translateZ(0)",
        borderStyle: "solid",
        borderWidth: 1,
        backgroundRepeat: "no-repeat",
        transition: theme.transitions.create(
          [
            "transform",
            "box-shadow",
            "background-color",
            "border-color",
            "background-position",
          ],
          { duration: Math.round(scale(controls.motionPolish, 220, 320)) },
        ),
        "& .MuiButton-startIcon, & .MuiButton-endIcon": {
          transition: theme.transitions.create(["transform", "opacity"], {
            duration: theme.transitions.duration.shorter,
          }),
        },
        "&.Mui-focusVisible": {
          boxShadow: reactorFocusRing(theme, controls, 5),
        },
        "&:active": { transform: "translateY(0px)" },
        "&.Mui-disabled": {
          transform: "none",
          boxShadow: "none",
          textShadow: "none",
        },
        "&.gr-showcase-cta, &[data-gr-tone='showcase']": {
          minHeight: 66,
          paddingInline: 36,
          paddingBlock: 18,
          fontWeight: 760,
          letterSpacing: "0.028em",
          maxInlineSize: "18ch",
          "html[lang='ru'] &": {
            maxInlineSize: "20ch",
            letterSpacing: "0.018em",
          },
        },
      }),

      sizeLarge: {
        minHeight: 58,
        paddingInline: 30,
        paddingBlock: 15,
      },

      contained: ({ theme }) => ({
        boxShadow: reactorShadow(
          theme,
          controls,
          "elevated",
          theme.palette.primary.main,
        ),
        "@media (hover: hover)": {
          "&:hover": {
            "& .MuiButton-startIcon, & .MuiButton-endIcon": {
              transform: "translateY(-1px)",
            },
          },
        },
      }),

      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        borderColor: "transparent",
        backgroundColor: theme.palette.primary.main,
        backgroundImage: [
          `linear-gradient(135deg, ${alpha(
            theme.palette.primary.light,
            0.99,
          )} 0%, ${alpha(theme.palette.primary.main, 0.99)} 28%, ${alpha(
            theme.palette.info.main,
            0.96,
          )} 58%, ${alpha(theme.palette.secondary.main, 0.9)} 82%, ${alpha(
            theme.palette.warning.main,
            0.9,
          )} 100%)`,
          reactorRail(theme, scale(controls.extravagance, 0.52, 0.82), 132),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        backgroundBlendMode: "normal, normal",
        backgroundSize: `${Math.round(scale(controls.ctaPower, 210, 260))}% 190%, 100% 100%`,
        backgroundPosition: "0% 50%, 0 0",
        textShadow: [
          `0 1px 0 ${alpha(theme.palette.common.black, 0.18)}`,
          `0 0 16px ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.08 : 0.18,
          )}`,
        ].join(", "),
        boxShadow: [
          reactorShadow(
            theme,
            controls,
            "elevated",
            theme.palette.primary.main,
          ),
          `0 0 ${Math.round(scale(controls.ctaPower, 34, 64))}px ${alpha(
            theme.palette.primary.main,
            scale(controls.ctaPower, 0.24, 0.42),
          )}`,
          `0 0 ${Math.round(scale(controls.ctaPower, 22, 42))}px ${alpha(
            theme.palette.info.main,
            scale(controls.ctaPower, 0.18, 0.3),
          )}`,
          `inset 0 1px 0 ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.28 : 0.46,
          )}`,
          `inset 0 -1px 0 ${alpha(theme.palette.primary.dark, 0.16)}`,
        ].join(", "),
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-3px)",
            backgroundPosition: "100% 50%, 0 0",
            boxShadow: [
              reactorShadow(
                theme,
                controls,
                "overlay",
                theme.palette.info.main,
              ),
              `0 0 ${Math.round(scale(controls.ctaPower, 44, 72))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.ctaPower, 0.28, 0.46),
              )}`,
              `0 0 ${Math.round(scale(controls.ctaPower, 30, 52))}px ${alpha(
                theme.palette.info.main,
                scale(controls.ctaPower, 0.2, 0.34),
              )}`,
            ].join(", "),
            "& .MuiButton-startIcon": {
              transform: "translateX(-1px)",
            },
            "& .MuiButton-endIcon": {
              transform: "translateX(1px)",
            },
          },
        },
        "&.Mui-focusVisible": {
          boxShadow: [
            reactorShadow(
              theme,
              controls,
              "overlay",
              theme.palette.primary.main,
            ),
            reactorFocusRing(theme, controls, 5),
          ].join(", "),
        },
        "&.gr-showcase-cta, &[data-gr-tone='showcase']": {
          backgroundImage: [
            `linear-gradient(135deg, ${alpha(
              theme.palette.primary.light,
              1,
            )} 0%, ${alpha(theme.palette.primary.main, 1)} 24%, ${alpha(
              theme.palette.info.main,
              0.98,
            )} 52%, ${alpha(theme.palette.secondary.main, 0.96)} 78%, ${alpha(
              theme.palette.warning.main,
              0.94,
            )} 100%)`,
            reactorRail(theme, scale(controls.extravagance, 0.66, 0.94), 132),
          ].join(", "),
          backgroundSize: `${Math.round(scale(controls.ctaPower, 250, 320))}% 210%, 100% 100%`,
          boxShadow: [
            reactorShadow(
              theme,
              controls,
              "overlay",
              theme.palette.primary.main,
            ),
            `0 0 ${Math.round(scale(controls.ctaPower, 56, 90))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.ctaPower, 0.32, 0.52),
            )}`,
            `0 0 ${Math.round(scale(controls.ctaPower, 38, 68))}px ${alpha(
              theme.palette.info.main,
              scale(controls.ctaPower, 0.24, 0.4),
            )}`,
          ].join(", "),
          "@media (hover: hover)": {
            "&:hover": {
              transform: "translateY(-4px)",
              backgroundPosition: "100% 50%, 0 0",
              boxShadow: [
                reactorShadow(
                  theme,
                  controls,
                  "overlay",
                  theme.palette.info.main,
                ),
                `0 0 ${Math.round(scale(controls.ctaPower, 72, 110))}px ${alpha(
                  theme.palette.primary.main,
                  scale(controls.ctaPower, 0.36, 0.58),
                )}`,
                `0 0 ${Math.round(scale(controls.ctaPower, 48, 82))}px ${alpha(
                  theme.palette.secondary.main,
                  scale(controls.extravagance, 0.18, 0.28),
                )}`,
              ].join(", "),
            },
          },
          "&.Mui-focusVisible": {
            boxShadow: [
              reactorShadow(
                theme,
                controls,
                "overlay",
                theme.palette.primary.main,
              ),
              reactorFocusRing(theme, controls, 6),
              `0 0 ${Math.round(scale(controls.ctaPower, 54, 88))}px ${alpha(
                theme.palette.info.main,
                scale(controls.ctaPower, 0.24, 0.42),
              )}`,
            ].join(", "),
          },
        },
        "&.Mui-disabled": {
          color: alpha(theme.palette.primary.contrastText, 0.64),
          backgroundImage: [
            `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.3,
            )} 0%, ${alpha(theme.palette.info.main, 0.2)} 100%)`,
            reactorRail(theme, 0.18, 132),
          ].join(", "),
          boxShadow: `inset 0 1px 0 ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.08 : 0.18,
          )}`,
        },
      }),

      containedSecondary: ({ theme }) => ({
        color: theme.palette.secondary.contrastText,
        borderColor: "transparent",
        backgroundColor: theme.palette.secondary.main,
        backgroundImage: [
          `linear-gradient(135deg, ${alpha(
            theme.palette.secondary.light,
            0.96,
          )} 0%, ${alpha(theme.palette.secondary.main, 0.96)} 58%, ${alpha(
            theme.palette.info.main,
            0.9,
          )} 100%)`,
          reactorRail(theme, 0.28, 132),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        boxShadow: reactorShadow(
          theme,
          controls,
          "surface",
          theme.palette.secondary.main,
        ),
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: reactorShadow(
              theme,
              controls,
              "elevated",
              theme.palette.primary.main,
            ),
          },
        },
        "&.Mui-focusVisible": {
          boxShadow: [
            reactorShadow(
              theme,
              controls,
              "elevated",
              theme.palette.secondary.main,
            ),
            reactorFocusRing(theme, controls, 3),
          ].join(", "),
        },
        "&.Mui-disabled": {
          color: alpha(theme.palette.secondary.contrastText, 0.6),
          backgroundImage: [
            `linear-gradient(135deg, ${alpha(
              theme.palette.secondary.main,
              0.24,
            )} 0%, ${alpha(theme.palette.info.main, 0.16)} 100%)`,
            reactorRail(theme, 0.16, 132),
          ].join(", "),
        },
      }),

      outlined: ({ theme }) => ({
        boxShadow: `0 14px 32px ${alpha(
          reactorInk(theme),
          theme.palette.mode === "dark" ? 0.2 : 0.08,
        )}`,
        "@media (hover: hover)": {
          "&:hover": {
            "& .MuiButton-startIcon, & .MuiButton-endIcon": {
              transform: "translateY(-1px)",
            },
          },
        },
      }),

      outlinedPrimary: ({ theme }) => ({
        borderColor: "transparent",
        color: theme.palette.text.primary,
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.32 : 0.72,
        ),
        backgroundImage: [
          `linear-gradient(160deg, ${alpha(
            theme.palette.background.paper,
            theme.palette.mode === "dark" ? 0.42 : 0.82,
          )} 0%, ${alpha(
            theme.palette.background.paper,
            theme.palette.mode === "dark" ? 0.28 : 0.64,
          )} 100%)`,
          reactorRail(theme, scale(controls.extravagance, 0.22, 0.36), 132),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: [
          `0 14px 28px ${alpha(
            reactorInk(theme),
            theme.palette.mode === "dark" ? 0.22 : 0.08,
          )}`,
          `inset 0 1px 0 ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.12 : 0.24,
          )}`,
        ].join(", "),
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: reactorShadow(
              theme,
              controls,
              "surface",
              theme.palette.info.main,
            ),
          },
        },
        "&.Mui-focusVisible": {
          boxShadow: [
            reactorShadow(theme, controls, "surface", theme.palette.info.main),
            reactorFocusRing(theme, controls, 3),
          ].join(", "),
        },
        "&.Mui-disabled": {
          color: alpha(theme.palette.text.primary, 0.46),
          backgroundImage: [
            `linear-gradient(160deg, ${alpha(
              theme.palette.background.paper,
              theme.palette.mode === "dark" ? 0.2 : 0.54,
            )} 0%, ${alpha(
              theme.palette.background.paper,
              theme.palette.mode === "dark" ? 0.14 : 0.42,
            )} 100%)`,
            reactorRail(theme, 0.1, 132),
          ].join(", "),
        },
      }),

      text: ({ theme }) => ({
        "&.Mui-focusVisible": {
          boxShadow: reactorFocusRing(theme, controls, 3),
        },
      }),

      textPrimary: ({ theme }) => ({
        color: theme.palette.info.main,
        textShadow: `0 0 14px ${alpha(
          theme.palette.info.main,
          theme.palette.mode === "dark" ? 0.12 : 0.06,
        )}`,
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.info.main,
            theme.palette.mode === "dark" ? 0.08 : 0.06,
          ),
          "& .MuiButton-startIcon": {
            transform: "translateX(-1px)",
          },
          "& .MuiButton-endIcon": {
            transform: "translateX(1px)",
          },
        },
      }),
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...reactorSurface(theme, controls, {
          level: "surface",
          radius: 16,
          tint: theme.palette.background.paper,
          accent: theme.palette.info.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.36 : 0.78,
        }),
        padding: 10,
        "& .MuiSvgIcon-root": {
          transition: theme.transitions.create(["transform", "color"], {
            duration: theme.transitions.duration.shorter,
          }),
        },
        "&.Mui-focusVisible": {
          boxShadow: [
            reactorShadow(theme, controls, "surface", theme.palette.info.main),
            reactorFocusRing(theme, controls, 3),
          ].join(", "),
        },
        "@media (hover: hover)": {
          "&:hover": {
            boxShadow: reactorShadow(
              theme,
              controls,
              "surface",
              theme.palette.info.main,
            ),
            "& .MuiSvgIcon-root": {
              transform: "translateY(-1px)",
            },
          },
        },
      }),
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 36,
        borderRadius: 999,
        border: "1px solid transparent",
        fontFamily: FONT_DISPLAY,
        fontWeight: 650,
        letterSpacing: "0.022em",
        textTransform: "none",
        lineHeight: 1.1,
        color: theme.palette.text.primary,
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.4 : 0.8,
        ),
        backgroundImage: [
          `linear-gradient(150deg, ${alpha(
            theme.palette.background.paper,
            theme.palette.mode === "dark" ? 0.42 : 0.88,
          )} 0%, ${alpha(
            theme.palette.background.paper,
            theme.palette.mode === "dark" ? 0.28 : 0.72,
          )} 78%, ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.06, 0.12),
          )} 100%)`,
          reactorRail(theme, scale(controls.extravagance, 0.14, 0.24), 132),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        boxShadow: [
          `inset 0 1px 0 ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.12 : 0.24,
          )}`,
          `0 10px 22px ${alpha(
            reactorInk(theme),
            theme.palette.mode === "dark" ? 0.2 : 0.06,
          )}`,
        ].join(", "),
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: theme.transitions.create(["transform", "box-shadow"], {
          duration: theme.transitions.duration.shorter,
        }),
        "& .MuiChip-icon, & .MuiChip-deleteIcon": {
          color: theme.palette.info.main,
          transition: theme.transitions.create(["transform", "opacity"], {
            duration: theme.transitions.duration.shorter,
          }),
        },
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: reactorShadow(
              theme,
              controls,
              "surface",
              theme.palette.secondary.main,
            ),
            "& .MuiChip-deleteIcon": {
              transform: "translateY(-1px)",
            },
          },
        },
      }),
      outlined: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.24 : 0.62,
        ),
      }),
      label: {
        paddingInline: 12,
        textWrap: "balance",
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: "50%",
        border: `2px solid ${alpha(
          reactorInk(theme),
          theme.palette.mode === "dark" ? 0.16 : 0.12,
        )}`,
        backgroundImage: [
          `linear-gradient(145deg, ${alpha(
            theme.palette.primary.main,
            0.98,
          )} 0%, ${alpha(theme.palette.info.main, 0.9)} 52%, ${alpha(
            theme.palette.secondary.main,
            0.86,
          )} 100%)`,
          reactorRail(theme, 0.28, 135),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        color: theme.palette.primary.contrastText,
        fontFamily: FONT_DISPLAY,
        fontWeight: 800,
        letterSpacing: "0.04em",
        textShadow: `0 1px 0 ${alpha(theme.palette.common.black, 0.16)}`,
        boxShadow: [
          reactorShadow(
            theme,
            controls,
            "surface",
            theme.palette.secondary.main,
          ),
          `0 0 26px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.08, 0.16),
          )}`,
        ].join(", "),
      }),
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 48,
        ...reactorSurface(theme, controls, {
          level: "surface",
          radius: 999,
          tint: theme.palette.background.paper,
          accent: theme.palette.info.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.34 : 0.78,
        }),
        padding: theme.spacing(0.5),
        boxShadow: reactorShadow(
          theme,
          controls,
          "surface",
          theme.palette.info.main,
        ),
        transition: theme.transitions.create(["box-shadow", "transform"], {
          duration: theme.transitions.duration.shorter,
        }),
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: [
              reactorShadow(
                theme,
                controls,
                "elevated",
                theme.palette.info.main,
              ),
              `0 0 30px ${alpha(
                theme.palette.primary.main,
                scale(controls.extravagance, 0.08, 0.16),
              )}`,
            ].join(", "),
          },
        },
      }),
      indicator: ({ theme }) => ({
        height: "calc(100% - 8px)",
        top: 4,
        borderRadius: 999,
        backgroundImage: reactorRail(
          theme,
          scale(controls.extravagance, 0.34, 0.58),
          132,
        ),
        boxShadow: `0 0 18px ${alpha(
          theme.palette.primary.main,
          scale(controls.extravagance, 0.12, 0.24),
        )}`,
        transition: theme.transitions.create(["box-shadow"], {
          duration: theme.transitions.duration.shorter,
        }),
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        borderRadius: 999,
        fontFamily: FONT_DISPLAY,
        fontWeight: 650,
        letterSpacing: "0.024em",
        color: alpha(theme.palette.text.primary, 0.74),
        textTransform: "none",
        lineHeight: 1.15,
        transition: theme.transitions.create(
          ["background-color", "box-shadow", "color", "transform"],
          { duration: theme.transitions.duration.shorter },
        ),
        "@media (hover: hover)": {
          "&:hover": {
            color: theme.palette.text.primary,
            backgroundColor: alpha(
              theme.palette.info.main,
              theme.palette.mode === "dark" ? 0.08 : 0.05,
            ),
          },
        },
        "&.Mui-focusVisible": {
          boxShadow: reactorFocusRing(theme, controls, 3),
        },
        "&.Mui-selected": {
          color: theme.palette.text.primary,
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.14 : 0.08,
          ),
          boxShadow: `0 0 0 1px ${alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.18 : 0.1,
          )} inset`,
          textShadow: `0 0 18px ${alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.1 : 0.06,
          )}`,
        },
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...reactorSurface(theme, controls, {
          level: "surface",
          radius: Number(theme.shape.borderRadius) + 12,
          tint: theme.palette.background.paper,
          accent: theme.palette.primary.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.36 : 0.78,
        }),
        transition: theme.transitions.create(["box-shadow", "border-color"], {
          duration: theme.transitions.duration.shorter,
        }),
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(
            theme.palette.text.primary,
            theme.palette.mode === "dark" ? 0.12 : 0.08,
          ),
          borderWidth: 1.5,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(
            theme.palette.info.main,
            theme.palette.mode === "dark" ? 0.22 : 0.18,
          ),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(theme.palette.primary.main, 0.58),
        },
        "&.Mui-focused": {
          boxShadow: [
            reactorShadow(
              theme,
              controls,
              "surface",
              theme.palette.primary.main,
            ),
            reactorFocusRing(theme, controls, 3),
          ].join(", "),
        },
        "&.Mui-error": {
          boxShadow: `0 0 0 1px ${alpha(theme.palette.error.main, 0.28)}`,
        },
      }),
      input: ({ theme }) => ({
        paddingBlock: 12,
        "&::placeholder": {
          color: alpha(theme.palette.text.secondary, 0.72),
          opacity: 1,
        },
      }),
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_DISPLAY,
        fontWeight: 650,
        letterSpacing: "0.028em",
        textTransform: "none",
        color: alpha(theme.palette.text.secondary, 0.92),
        "&.MuiInputLabel-shrink": {
          color: alpha(theme.palette.info.main, 0.9),
        },
        "&.Mui-focused": { color: theme.palette.info.main },
      }),
    },
  },

  MuiSwitch: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 10,
        "& .MuiSwitch-switchBase.Mui-focusVisible + .MuiSwitch-track": {
          boxShadow: reactorFocusRing(theme, controls, 3),
        },
      }),
      thumb: ({ theme }) => ({
        borderRadius: "50%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: [
          `0 0 0 2px ${alpha(
            reactorInk(theme),
            theme.palette.mode === "dark" ? 0.12 : 0.08,
          )}`,
          `0 10px 22px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.08, 0.14),
          )}`,
        ].join(", "),
      }),
      track: ({ theme }) => ({
        borderRadius: 999,
        border: `1px solid ${alpha(
          reactorInk(theme),
          theme.palette.mode === "dark" ? 0.14 : 0.1,
        )}`,
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.24 : 0.5,
        ),
        backgroundImage: reactorRail(theme, 0.18, 90),
        opacity: 1,
        boxShadow: `inset 0 1px 0 ${alpha(
          theme.palette.common.white,
          theme.palette.mode === "dark" ? 0.1 : 0.22,
        )}`,
      }),
      switchBase: ({ theme }) => ({
        "&.Mui-checked": {
          color: theme.palette.secondary.main,
          "& .MuiSwitch-thumb": {
            boxShadow: [
              `0 0 0 2px ${alpha(theme.palette.secondary.main, 0.26)}`,
              `0 0 20px ${alpha(
                theme.palette.primary.main,
                scale(controls.extravagance, 0.1, 0.18),
              )}`,
            ].join(", "),
          },
          "& + .MuiSwitch-track": {
            backgroundImage: reactorRail(theme, 0.42, 90),
            opacity: 1,
            boxShadow: `0 0 18px ${alpha(
              theme.palette.primary.main,
              scale(controls.extravagance, 0.08, 0.14),
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
        padding: "14px 0",
        "& .MuiSlider-thumb": {
          transition: theme.transitions.create(["transform", "box-shadow"], {
            duration: theme.transitions.duration.shorter,
          }),
        },
      }),
      rail: ({ theme }) => ({
        height: 8,
        opacity: 1,
        backgroundColor: alpha(
          reactorInk(theme),
          theme.palette.mode === "dark" ? 0.14 : 0.1,
        ),
      }),
      track: ({ theme }) => ({
        height: 8,
        border: "none",
        backgroundImage: reactorRail(theme, 0.94, 90),
        boxShadow: `0 0 18px ${alpha(
          theme.palette.primary.main,
          scale(controls.extravagance, 0.08, 0.16),
        )}`,
      }),
      thumb: ({ theme }) => ({
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: `2px solid ${alpha(
          reactorInk(theme),
          theme.palette.mode === "dark" ? 0.14 : 0.1,
        )}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: reactorShadow(
          theme,
          controls,
          "surface",
          theme.palette.secondary.main,
        ),
        "&:hover, &.Mui-focusVisible": {
          transform: "scale(1.04)",
          boxShadow: [
            reactorShadow(
              theme,
              controls,
              "surface",
              theme.palette.primary.main,
            ),
            reactorFocusRing(theme, controls, 3),
          ].join(", "),
        },
      }),
    },
  },

  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 10,
        borderRadius: 999,
        overflow: "hidden",
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.28 : 0.54,
        ),
        border: `1px solid ${alpha(
          reactorInk(theme),
          theme.palette.mode === "dark" ? 0.12 : 0.08,
        )}`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: [
          `inset 0 1px 0 ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.08 : 0.18,
          )}`,
          `0 10px 24px ${alpha(
            reactorInk(theme),
            theme.palette.mode === "dark" ? 0.2 : 0.06,
          )}`,
        ].join(", "),
      }),
      bar: ({ theme }) => ({
        borderRadius: 999,
        backgroundImage: reactorRail(theme, 0.94, 90),
        boxShadow: `0 0 18px ${alpha(
          theme.palette.primary.main,
          scale(controls.extravagance, 0.08, 0.16),
        )}`,
      }),
    },
  },

  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...reactorSurface(theme, controls, {
          level: "surface",
          radius: Number(theme.shape.borderRadius) + 20,
          tint: theme.palette.background.paper,
          accent: theme.palette.info.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.7 : 0.88,
        }),
        transition: theme.transitions.create(["box-shadow", "transform"], {
          duration: theme.transitions.duration.shorter,
        }),
        "&::before": { display: "none" },
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: reactorShadow(
              theme,
              controls,
              "elevated",
              theme.palette.info.main,
            ),
          },
        },
      }),
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 58,
        paddingInline: theme.spacing(2.5),
        transition: theme.transitions.create(
          ["background-color", "box-shadow"],
          {
            duration: theme.transitions.duration.shorter,
          },
        ),
        "& .MuiAccordionSummary-expandIconWrapper": {
          borderRadius: 999,
          padding: 2,
          color: theme.palette.info.main,
          transition: theme.transitions.create(["transform", "box-shadow"], {
            duration: theme.transitions.duration.shorter,
          }),
        },
        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
          boxShadow: `0 0 16px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.08, 0.14),
          )}`,
        },
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.background.paper,
            theme.palette.mode === "dark" ? 0.18 : 0.32,
          ),
        },
      }),
      content: () => ({
        margin: 0,
        "& .MuiTypography-root": {
          fontFamily: FONT_DISPLAY,
          fontWeight: 680,
          letterSpacing: "0.01em",
          textWrap: "balance",
          overflowWrap: "break-word",
          hyphens: "auto",
        },
      }),
    },
  },

  MuiAccordionDetails: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(2.5),
        paddingBottom: theme.spacing(2.5),
        paddingTop: theme.spacing(1.5),
        borderTop: `1px solid ${alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.12 : 0.08,
        )}`,
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.06 : 0.28,
        ),
        color: alpha(theme.palette.text.primary, 0.84),
      }),
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...reactorSurface(theme, controls, {
          level: "surface",
          radius: Number(theme.shape.borderRadius) + 14,
          tint: theme.palette.background.paper,
          accent: theme.palette.info.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.54 : 0.86,
        }),
        "&::before": {
          content: '""',
          position: "absolute",
          insetInlineStart: 0,
          insetBlockStart: 0,
          width: 8,
          height: "100%",
          backgroundImage: reactorRail(theme, 0.92, 180),
        },
      }),
      icon: ({ theme }) => ({
        color: theme.palette.primary.main,
      }),
      message: ({ theme }) => ({
        paddingBlock: theme.spacing(0.25),
      }),
      action: ({ theme }) => ({
        alignItems: "center",
        color: alpha(theme.palette.text.primary, 0.72),
      }),
      standardInfo: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.info.main,
          theme.palette.mode === "dark" ? 0.18 : 0.12,
        ),
      }),
      standardSuccess: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.success.main,
          theme.palette.mode === "dark" ? 0.18 : 0.12,
        ),
      }),
      standardWarning: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.warning.main,
          theme.palette.mode === "dark" ? 0.2 : 0.14,
        ),
      }),
      standardError: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.error.main,
          theme.palette.mode === "dark" ? 0.18 : 0.12,
        ),
      }),
    },
  },

  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...reactorSurface(theme, controls, {
          level: "surface",
          radius: Number(theme.shape.borderRadius) + 16,
          tint: theme.palette.background.paper,
          accent: theme.palette.secondary.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.64 : 0.82,
        }),
      }),
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.16 : 0.48,
        ),
        "& .MuiTableCell-head:nth-of-type(3n + 1)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.12 : 0.08,
          ),
        },
        "& .MuiTableCell-head:nth-of-type(3n + 2)": {
          backgroundColor: alpha(
            theme.palette.info.main,
            theme.palette.mode === "dark" ? 0.12 : 0.08,
          ),
        },
        "& .MuiTableCell-head:nth-of-type(3n)": {
          backgroundColor: alpha(
            theme.palette.secondary.main,
            theme.palette.mode === "dark" ? 0.12 : 0.08,
          ),
        },
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: alpha(
          reactorInk(theme),
          theme.palette.mode === "dark" ? 0.12 : 0.08,
        ),
      }),
      head: ({ theme }) => ({
        borderBottom: `1px solid ${alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.14 : 0.08,
        )}`,
        fontFamily: FONT_DISPLAY,
        fontWeight: 650,
        letterSpacing: "0.03em",
        textTransform: "none",
        color: alpha(theme.palette.text.secondary, 0.94),
      }),
      body: ({ theme }) => ({
        borderBottom: `1px solid ${alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.08 : 0.06,
        )}`,
        color: alpha(theme.palette.text.primary, 0.86),
      }),
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create(
          ["background-color", "transform"],
          {
            duration: theme.transitions.duration.shorter,
          },
        ),
        "&:nth-of-type(even)": {
          backgroundColor: alpha(
            theme.palette.background.paper,
            theme.palette.mode === "dark" ? 0.04 : 0.32,
          ),
        },
        "@media (hover: hover)": {
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.08 : 0.04,
            ),
          },
        },
      }),
    },
  },

  MuiTooltip: {
    defaultProps: { arrow: true },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...reactorSurface(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 14,
          tint: theme.palette.background.paper,
          accent: theme.palette.info.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.78 : 0.94,
        }),
        fontSize: "0.84rem",
        padding: theme.spacing(1.25, 1.5),
        boxShadow: [
          reactorShadow(theme, controls, "overlay", theme.palette.info.main),
          `0 0 24px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.08, 0.14),
          )}`,
        ].join(", "),
      }),
      arrow: ({ theme }) => ({
        color: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.78 : 0.94,
        ),
        "&::before": {
          boxShadow: `0 0 14px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.06, 0.12),
          )}`,
        },
      }),
    },
  },

  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...reactorSurface(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 16,
          tint: theme.palette.background.paper,
          accent: theme.palette.primary.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.76 : 0.92,
        }),
        paddingInline: theme.spacing(1.5),
        "& .MuiSnackbarContent-message": {
          fontWeight: 600,
          letterSpacing: "0.02em",
        },
        "& .MuiSnackbarContent-action": {
          marginRight: 0,
          color: theme.palette.info.main,
        },
      }),
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...reactorSurface(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 18,
          tint: theme.palette.background.paper,
          accent: theme.palette.info.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.84 : 0.96,
        }),
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%, 200% 200%",
        boxShadow: [
          reactorShadow(theme, controls, "overlay", theme.palette.info.main),
          `0 0 ${Math.round(scale(controls.heroDrama, 44, 72))}px ${alpha(
            theme.palette.primary.main,
            scale(controls.heroDrama, 0.1, 0.18),
          )}`,
        ].join(", "),
      }),
      container: ({ theme }) => ({
        padding: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
          padding: theme.spacing(3),
        },
      }),
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(2.5, 2.5, 1.5),
        fontFamily: FONT_DISPLAY,
        fontWeight: 720,
        letterSpacing: "-0.012em",
        lineHeight: 1.16,
        textWrap: "balance",
        maxInlineSize: "26ch",
        overflowWrap: "break-word",
        hyphens: "auto",
        borderBottom: `1px solid ${alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.1 : 0.06,
        )}`,
        backgroundImage: `linear-gradient(180deg, ${alpha(
          theme.palette.primary.main,
          theme.palette.mode === "dark" ? 0.08 : 0.05,
        )} 0%, transparent 100%)`,
        textShadow: `0 10px 22px ${alpha(
          theme.palette.primary.main,
          theme.palette.mode === "dark" ? 0.12 : 0.05,
        )}`,
      }),
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(1, 2.5, 2),
        borderTop: "none",
        color: alpha(theme.palette.text.primary, 0.88),
        backgroundImage: `linear-gradient(180deg, ${alpha(
          theme.palette.common.white,
          theme.palette.mode === "dark" ? 0.02 : 0.06,
        )} 0%, transparent 100%)`,
      }),
    },
  },

  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(0, 2.5, 2.5),
        gap: theme.spacing(1),
        borderTop: `1px solid ${alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.08 : 0.05,
        )}`,
      }),
    },
  },

  MuiLink: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.info.main,
        textDecorationColor: alpha(
          theme.palette.primary.main,
          theme.palette.mode === "dark" ? 0.42 : 0.22,
        ),
        textDecorationThickness: 2,
        textUnderlineOffset: 4,
        transition: theme.transitions.create(
          ["color", "text-decoration-color", "text-shadow"],
          { duration: theme.transitions.duration.shorter },
        ),
        "@media (hover: hover)": {
          "&:hover": {
            color: theme.palette.primary.main,
            textDecorationColor: alpha(theme.palette.primary.main, 0.58),
            textShadow: `0 0 18px ${alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.14 : 0.06,
            )}`,
          },
        },
      }),
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...reactorSurface(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 16,
          tint: theme.palette.background.paper,
          accent: theme.palette.secondary.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.82 : 0.96,
        }),
        boxShadow: [
          reactorShadow(
            theme,
            controls,
            "overlay",
            theme.palette.secondary.main,
          ),
          `0 0 28px ${alpha(
            theme.palette.info.main,
            scale(controls.extravagance, 0.08, 0.14),
          )}`,
        ].join(", "),
      }),
      list: ({ theme }) => ({
        padding: theme.spacing(0.75),
        display: "grid",
        gap: theme.spacing(0.5),
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 8,
        fontWeight: 700,
        transition: theme.transitions.create(
          ["background-color", "box-shadow", "transform"],
          { duration: theme.transitions.duration.shorter },
        ),
        "& .MuiListItemIcon-root": {
          minWidth: 34,
          color: alpha(theme.palette.info.main, 0.9),
        },
        "& .MuiTypography-root": {
          fontWeight: 600,
        },
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.primary.main, 0.14),
          boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.12)} inset`,
        },
        "&.Mui-selected:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.18),
        },
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          transform: "translateY(-1px)",
        },
        "&.Mui-focusVisible": {
          boxShadow: reactorFocusRing(theme, controls, 3),
        },
      }),
    },
  },

  MuiBackdrop: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.background.default, 0.72),
        backgroundImage: `radial-gradient(880px 480px at 50% 12%, ${alpha(
          theme.palette.primary.main,
          scale(controls.heroDrama, 0.08, 0.14),
        )} 0%, transparent 62%)`,
        backdropFilter: `blur(${Math.round(scale(controls.blurBudget, 6, 10))}px)`,
        WebkitBackdropFilter: `blur(${Math.round(scale(controls.blurBudget, 6, 10))}px)`,
        "@media (hover: none), (max-width: 900px)": {
          backdropFilter: `blur(${Math.round(scale(controls.blurBudget, 4, 6))}px)`,
          WebkitBackdropFilter: `blur(${Math.round(scale(controls.blurBudget, 4, 6))}px)`,
        },
      }),
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...reactorSurface(theme, controls, {
          level: "overlay",
          radius: Number(theme.shape.borderRadius) + 16,
          tint: theme.palette.background.paper,
          accent: theme.palette.secondary.main,
          fillAlpha: theme.palette.mode === "dark" ? 0.86 : 0.96,
        }),
        boxShadow: [
          reactorShadow(
            theme,
            controls,
            "overlay",
            theme.palette.secondary.main,
          ),
          `0 0 32px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.08, 0.14),
          )}`,
        ].join(", "),
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%, 200% 200%",
      }),
    },
  },
});

export const glassReactorLight = {
  name: "Glass Reactor Light",
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#4BCFC3",
      dark: "#2AA79B",
      light: "#A4F3EC",
      contrastText: "#061019",
    },

    secondary: {
      main: "#B693FF",
      dark: "#8E67FF",
      light: "#DAC9FF",
      contrastText: "#110B1D",
    },

    info: {
      main: "#4B8DFF",
      dark: "#296BDB",
      light: "#B5D0FF",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#32B97A",
      dark: "#228E5C",
      light: "#9BE3BE",
      contrastText: "#FFFFFF",
    },

    warning: {
      main: "#D79A30",
      dark: "#AD7A1E",
      light: "#F1CA7D",
      contrastText: "#261A06",
    },

    error: {
      main: "#D95E74",
      dark: "#B7455A",
      light: "#F2A8B6",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F4F7FD",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#0C1020",
      secondary: "#5E6882",
      disabled: alpha("#0C1020", 0.38),
    },

    divider: alpha("#0C1020", 0.1),

    action: {
      hover: alpha("#0C1020", 0.05),
      selected: alpha("#4BCFC3", 0.08),
      focus: alpha("#4B8DFF", 0.16),
      active: alpha("#0C1020", 0.6),
      disabled: alpha("#0C1020", 0.28),
      disabledBackground: alpha("#0C1020", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 20 },
  spacing: 8,

  components: createComponents(lightControls),
} satisfies NamedThemeOptions;

export const glassReactor = {
  name: "Glass Reactor",
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: "#6FFFE9",
      dark: "#3BE9D1",
      light: "#B7FFF5",
      contrastText: "#061019",
    },

    secondary: {
      main: "#B693FF",
      dark: "#8E67FF",
      light: "#D7C6FF",
      contrastText: "#070A12",
    },

    info: {
      main: "#6BA8FF",
      dark: "#3D83FF",
      light: "#A9CBFF",
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
      default: "#050612",
      paper: "#0A1022",
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
      focus: alpha("#6FFFE9", 0.22),
      active: alpha("#F2F6FF", 0.62),
      disabled: alpha("#F2F6FF", 0.26),
      disabledBackground: alpha("#F2F6FF", 0.08),
    },
  },

  typography,

  shape: { borderRadius: 20 },
  spacing: 8,

  components: createComponents(darkControls),
} satisfies NamedThemeOptions;
