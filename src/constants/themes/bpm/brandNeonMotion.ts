import { alpha } from "@mui/material/styles";

import type { ThemePreset } from "@/models/themePresets";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Brand theme philosophy
 * - Partnership & team intelligence: calm, structured, highly readable layout
 * - Sustainability: restrained use of accents, balanced neutrals, long-form readability
 * - Power in forward motion: soft "light streak" gradients, subtle glass surfaces, neon focus/glow states
 *
 * Core brand colors
 * - Neon:     #00D2FF
 * - Dark navy:#0C141C
 * - White:    #FFFFFF
 *
 * Accent colors (use as accents, not dominant)
 * - Purple:     #440850
 * - Periwinkle: #9FA9EA
 * - Coral:      #F3503A
 * - Mint:       #62ED97
 */

const BRAND_NEON = "#00D2FF";
const BRAND_NAVY = "#0C141C";
const BRAND_WHITE = "#FFFFFF";
const BRAND_NAVY_SOFT = "#101C28";

const ACCENT_PURPLE = "#440850";
const ACCENT_PERIWINKLE = "#9FA9EA";
const ACCENT_CORAL = "#F3503A";
const ACCENT_MINT = "#62ED97";

const NEON_SOFT = "#66E7FF";
const CORAL_SOFT = "#FF7A66";
const PURPLE_SOFT = "#6A1B7A";
const PERIWINKLE_SOFT = "#C2C9F4";
const MINT_SOFT = "#8AF4B6";

const FONT_DISPLAY =
  'var(--font-brand-display),"IBM Plex Sans","Inter","Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif';
const FONT_TEXT =
  'var(--font-brand-text),"Golos Text","IBM Plex Sans","Inter","Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif';
const FONT_MONO =
  'var(--font-brand-mono),"IBM Plex Mono","JetBrains Mono","Roboto Mono","Menlo","Consolas",monospace';

const BRAND_RADIUS = 20;

interface BrandScriptProfile {
  heroWeight: number;
  displayWeight: number;
  secondaryWeight: number;
  labelWeight: number;
  strongLabelWeight: number;
  heroCaps: boolean;
  compactCaps: boolean;
}

interface BrandLocaleProfile {
  button: {
    letterSpacing: string;
    lineHeight: number;
  };
  typography: {
    h1: {
      maxInlineSize: string;
      lineHeight: number;
      letterSpacing: string;
    };
    h2: {
      maxInlineSize: string;
      lineHeight: number;
      letterSpacing: string;
    };
    h3: {
      maxInlineSize: string;
      lineHeight: number;
      letterSpacing: string;
    };
    flowingText: {
      hyphens: "auto";
      textWrap: "pretty";
    };
  };
}

interface BrandLandingControls {
  luxuryLevel: number;
  extravagance: number;
  heroDrama: number;
  ctaPower: number;
  motionPolish: number;
  blurBudget: number;
}

type SurfaceLevel = "surface" | "elevated" | "overlay";

const BRAND_CYRILLIC_PROFILE: BrandScriptProfile = {
  heroWeight: 680,
  displayWeight: 650,
  secondaryWeight: 500,
  labelWeight: 650,
  strongLabelWeight: 700,
  heroCaps: false,
  compactCaps: false,
};

const BRAND_RU_LOCALE_PROFILE: BrandLocaleProfile = {
  button: {
    letterSpacing: "0.01em",
    lineHeight: 1.12,
  },
  typography: {
    h1: {
      maxInlineSize: "18ch",
      lineHeight: 1.06,
      letterSpacing: "-0.016em",
    },
    h2: {
      maxInlineSize: "20ch",
      lineHeight: 1.1,
      letterSpacing: "-0.012em",
    },
    h3: {
      maxInlineSize: "26ch",
      lineHeight: 1.22,
      letterSpacing: "-0.006em",
    },
    flowingText: {
      hyphens: "auto",
      textWrap: "pretty",
    },
  },
};

const withOptionalUppercase = (enabled: boolean) =>
  enabled
    ? { textTransform: "uppercase" as const }
    : { textTransform: "none" as const };

const withLangSelector = (
  lang: string,
  selector: string,
  styles: Record<string, string | number>,
) => withLangSelectors(lang, [selector], styles);

const withLangSelectors = (
  lang: string,
  selectors: string[],
  styles: Record<string, string | number>,
) => ({
  [selectors.map((selector) => `html[lang='${lang}'] ${selector}`).join(", ")]:
    styles,
});

const createDisplayTypeStyle = ({
  fontSize,
  lineHeight,
  letterSpacing,
  caps = false,
  weight = BRAND_CYRILLIC_PROFILE.displayWeight,
}: {
  fontSize: string;
  lineHeight: number;
  letterSpacing: string;
  caps?: boolean;
  weight?: number;
}) => ({
  fontFamily: FONT_DISPLAY,
  fontWeight: weight,
  fontSize,
  lineHeight,
  letterSpacing,
  ...withOptionalUppercase(caps),
});

const createCompactLabelStyle = ({
  fontSize,
  lineHeight,
  letterSpacing,
  weight = BRAND_CYRILLIC_PROFILE.labelWeight,
}: {
  fontSize?: string;
  lineHeight?: number;
  letterSpacing?: string;
  weight?: number;
}) => ({
  fontFamily: FONT_DISPLAY,
  fontWeight: weight,
  ...(fontSize ? { fontSize } : {}),
  ...(typeof lineHeight === "number" ? { lineHeight } : {}),
  ...(letterSpacing ? { letterSpacing } : {}),
  ...withOptionalUppercase(BRAND_CYRILLIC_PROFILE.compactCaps),
});

const clampUnit = (value: number): number => Math.min(1, Math.max(0, value));

const scale = (value: number, min: number, max: number): number =>
  min + (max - min) * clampUnit(value);

const createLandingControls = (
  controls: BrandLandingControls,
): BrandLandingControls => ({
  luxuryLevel: clampUnit(controls.luxuryLevel),
  extravagance: clampUnit(controls.extravagance),
  heroDrama: clampUnit(controls.heroDrama),
  ctaPower: clampUnit(controls.ctaPower),
  motionPolish: clampUnit(controls.motionPolish),
  blurBudget: clampUnit(controls.blurBudget),
});

const brandNeonMotionLightControls = createLandingControls({
  luxuryLevel: 0.82,
  extravagance: 0.78,
  heroDrama: 0.84,
  ctaPower: 0.9,
  motionPolish: 0.76,
  blurBudget: 0.72,
});

const brandNeonMotionDarkControls = createLandingControls({
  luxuryLevel: 0.88,
  extravagance: 0.84,
  heroDrama: 0.9,
  ctaPower: 0.94,
  motionPolish: 0.8,
  blurBudget: 0.82,
});

const motionDuration = (
  theme: Theme,
  controls: BrandLandingControls,
  min: number,
  max: number,
): number =>
  Math.round(scale(controls.motionPolish, min, Math.max(min + 1, max)));

const blurStyle = (
  controls: BrandLandingControls,
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

const prismRail = (
  theme: Theme,
  controls: BrandLandingControls,
  opacity = 1,
  angle = 128,
): string =>
  `linear-gradient(${angle}deg, ${alpha(
    theme.palette.primary.light ?? theme.palette.primary.main,
    scale(controls.extravagance, 0.22, 0.34) * opacity,
  )} 0%, ${alpha(
    theme.palette.primary.main,
    scale(controls.ctaPower, 0.28, 0.42) * opacity,
  )} 24%, ${alpha(
    theme.palette.info.main,
    scale(controls.heroDrama, 0.24, 0.38) * opacity,
  )} 48%, ${alpha(
    theme.palette.warning.main,
    scale(controls.extravagance, 0.2, 0.3) * opacity,
  )} 72%, ${alpha(
    theme.palette.secondary.main,
    scale(controls.extravagance, 0.2, 0.32) * opacity,
  )} 100%)`;

const materialShadow = (
  theme: Theme,
  controls: BrandLandingControls,
  level: SurfaceLevel,
): string => {
  const isDark = theme.palette.mode === "dark";
  const depthStrength =
    level === "overlay"
      ? scale(controls.luxuryLevel, 0.26, 0.38)
      : level === "elevated"
        ? scale(controls.luxuryLevel, 0.18, 0.28)
        : scale(controls.luxuryLevel, 0.1, 0.16);
  const glowStrength =
    level === "overlay"
      ? scale(controls.extravagance, 0.16, 0.24)
      : level === "elevated"
        ? scale(controls.extravagance, 0.12, 0.2)
        : scale(controls.extravagance, 0.08, 0.14);

  return [
    `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.08 : 0.54)} inset`,
    `0 ${level === "overlay" ? 30 : level === "elevated" ? 24 : 18}px ${
      level === "overlay" ? 90 : level === "elevated" ? 68 : 48
    }px ${alpha(theme.palette.text.primary, isDark ? depthStrength : depthStrength * 0.58)}`,
    `0 0 ${level === "overlay" ? 42 : level === "elevated" ? 34 : 24}px ${alpha(theme.palette.primary.main, glowStrength)}`,
  ].join(", ");
};

const createPrismFrame = (
  theme: Theme,
  controls: BrandLandingControls,
  options?: {
    fillAlpha?: number;
    signatureOpacity?: number;
    angle?: number;
  },
) => {
  const isDark = theme.palette.mode === "dark";
  const fillAlpha = options?.fillAlpha ?? (isDark ? 0.72 : 0.9);
  const signatureOpacity = options?.signatureOpacity ?? 1;
  const angle = options?.angle ?? 128;

  return {
    border: "1px solid transparent",
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, padding-box, padding-box, border-box",
    backgroundImage: [
      `linear-gradient(180deg, ${alpha(
        theme.palette.common.white,
        isDark ? 0.08 : scale(controls.luxuryLevel, 0.16, 0.3),
      )} 0%, ${alpha(theme.palette.background.paper, fillAlpha)} 26%, ${alpha(
        theme.palette.background.paper,
        isDark
          ? Math.min(0.92, fillAlpha + 0.08)
          : Math.max(0.72, fillAlpha - 0.08),
      )} 100%)`,
      `radial-gradient(480px 200px at 0% 0%, ${alpha(
        theme.palette.primary.main,
        scale(controls.heroDrama, 0.08, 0.18) * signatureOpacity,
      )} 0%, transparent 72%)`,
      `radial-gradient(360px 180px at 100% 0%, ${alpha(
        theme.palette.info.main,
        scale(controls.extravagance, 0.07, 0.16) * signatureOpacity,
      )} 0%, transparent 72%)`,
      prismRail(theme, controls, signatureOpacity, angle),
    ].join(", "),
  };
};

const createSurface = (
  theme: Theme,
  controls: BrandLandingControls,
  level: SurfaceLevel,
  options?: {
    radius?: number;
    fillAlpha?: number;
    signatureOpacity?: number;
    angle?: number;
    blurMin?: number;
    blurMax?: number;
  },
) => ({
  position: "relative" as const,
  overflow: "hidden" as const,
  borderRadius:
    options?.radius ??
    (level === "overlay"
      ? BRAND_RADIUS + 14
      : level === "elevated"
        ? BRAND_RADIUS + 10
        : BRAND_RADIUS + 6),
  ...createPrismFrame(theme, controls, {
    fillAlpha: options?.fillAlpha,
    signatureOpacity: options?.signatureOpacity,
    angle: options?.angle,
  }),
  boxShadow: materialShadow(theme, controls, level),
  ...blurStyle(
    controls,
    options?.blurMin ?? (level === "overlay" ? 14 : 10),
    options?.blurMax ?? (level === "overlay" ? 24 : 16),
  ),
});

const createButtonGlow = (
  theme: Theme,
  controls: BrandLandingControls,
  emphasis = 1,
): string => {
  const isDark = theme.palette.mode === "dark";
  const depth = scale(controls.ctaPower, 0.22, 0.34) * emphasis;
  const ring = scale(controls.ctaPower, 0.18, 0.26);
  const glow = scale(controls.ctaPower, 0.18, 0.28) * emphasis;

  return [
    `0 16px 38px ${alpha(theme.palette.primary.main, isDark ? depth : depth * 0.74)}`,
    `0 0 0 1px ${alpha(theme.palette.common.white, isDark ? 0.16 : 0.42)} inset`,
    `0 0 0 1px ${alpha(theme.palette.primary.main, ring)}`,
    `0 0 36px ${alpha(theme.palette.info.main, glow)}`,
  ].join(", ");
};

const createFocusHalo = (
  theme: Theme,
  controls: BrandLandingControls,
  accent = theme.palette.primary.main,
  innerWidth = 3,
  outerWidth = 7,
): string => {
  const isDark = theme.palette.mode === "dark";

  return [
    `0 0 0 ${innerWidth}px ${alpha(
      theme.palette.background.default,
      isDark ? 0.8 : 0.72,
    )}`,
    `0 0 0 ${outerWidth}px ${alpha(
      accent,
      scale(controls.ctaPower, 0.18, 0.3),
    )}`,
    `0 0 ${Math.round(scale(controls.extravagance, 20, 34))}px ${alpha(
      accent,
      scale(controls.extravagance, 0.12, 0.22),
    )}`,
  ].join(", ");
};

const BRAND_TYPOGRAPHY = {
  fontFamily: FONT_TEXT,
  h1: {
    ...createDisplayTypeStyle({
      fontSize: "clamp(3.25rem, 6.2vw, 5.9rem)",
      lineHeight: 1.02,
      letterSpacing: "-0.022em",
      caps: BRAND_CYRILLIC_PROFILE.heroCaps,
      weight: BRAND_CYRILLIC_PROFILE.heroWeight,
    }),
  },
  h2: {
    ...createDisplayTypeStyle({
      fontSize: "clamp(2.2rem, 4.2vw, 3.75rem)",
      lineHeight: 1.06,
      letterSpacing: "-0.016em",
      caps: BRAND_CYRILLIC_PROFILE.heroCaps,
      weight: BRAND_CYRILLIC_PROFILE.heroWeight,
    }),
  },
  h3: {
    ...createDisplayTypeStyle({
      fontSize: "clamp(1.4rem, 2.2vw, 1.88rem)",
      lineHeight: 1.18,
      letterSpacing: "-0.008em",
    }),
  },
  h4: {
    ...createDisplayTypeStyle({
      fontSize: "1.24rem",
      lineHeight: 1.3,
      letterSpacing: "-0.004em",
    }),
  },
  subtitle1: {
    ...createDisplayTypeStyle({
      fontSize: "1.05rem",
      lineHeight: 1.6,
      letterSpacing: "0.004em",
      weight: BRAND_CYRILLIC_PROFILE.secondaryWeight,
    }),
  },
  subtitle2: {
    ...createCompactLabelStyle({
      fontSize: "0.92rem",
      lineHeight: 1.5,
      letterSpacing: "0.016em",
    }),
  },
  body1: {
    fontFamily: FONT_TEXT,
    fontSize: "1rem",
    lineHeight: 1.76,
    letterSpacing: "0.002em",
  },
  body2: {
    fontFamily: FONT_TEXT,
    fontSize: "0.94rem",
    lineHeight: 1.68,
    letterSpacing: "0.002em",
  },
  button: {
    ...createCompactLabelStyle({
      letterSpacing: "0.015em",
    }),
  },
  caption: {
    fontFamily: FONT_MONO,
    fontSize: "0.77rem",
    letterSpacing: "0.02em",
  },
  overline: {
    ...createCompactLabelStyle({
      fontSize: "0.72rem",
      letterSpacing: "0.05em",
    }),
  },
} satisfies ThemeOptions["typography"];

const createBrandComponents = (
  controls: BrandLandingControls,
): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => {
      const isDark = theme.palette.mode === "dark";

      return {
        "@keyframes brandNeonAuroraDrift": {
          "0%, 100%": { transform: "translate3d(-2%, 0%, 0) scale(1)" },
          "50%": { transform: "translate3d(2%, 2%, 0) scale(1.04)" },
        },
        "@keyframes brandNeonRailPulse": {
          "0%, 100%": { opacity: 0.66 },
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
            `radial-gradient(1200px 620px at 12% -2%, ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, 0.14, 0.28),
            )} 0%, transparent 62%)`,
            `radial-gradient(960px 540px at 92% 10%, ${alpha(
              theme.palette.info.main,
              scale(controls.extravagance, 0.12, 0.22),
            )} 0%, transparent 60%)`,
            `radial-gradient(980px 560px at 56% 112%, ${alpha(
              theme.palette.secondary.main,
              scale(controls.extravagance, 0.12, 0.22),
            )} 0%, transparent 62%)`,
            `linear-gradient(180deg, ${alpha(
              theme.palette.background.default,
              isDark ? 0.16 : 0.02,
            )} 0%, ${alpha(theme.palette.background.default, 0.86)} 38%, ${theme.palette.background.default} 100%)`,
            `repeating-linear-gradient(0deg, ${alpha(
              theme.palette.text.primary,
              isDark ? 0.028 : 0.018,
            )} 0px, transparent 1px, transparent 7px)`,
          ].join(", "),
          backgroundAttachment: "fixed",
          backgroundSize: "auto, auto, auto, auto, 100% 100%",
        },
        "body::before": {
          content: '""',
          position: "fixed",
          inset: "-14svh -8vw auto -8vw",
          height: "72svh",
          pointerEvents: "none",
          backgroundImage: [
            prismRail(theme, controls, scale(controls.heroDrama, 0.72, 1), 122),
            `radial-gradient(780px 260px at 50% 22%, ${alpha(
              theme.palette.common.white,
              isDark ? 0.08 : 0.18,
            )} 0%, transparent 72%)`,
          ].join(", "),
          opacity: scale(controls.heroDrama, 0.72, 0.96),
          filter: `blur(${Math.round(scale(controls.blurBudget, 44, 76))}px)`,
          transformOrigin: "center top",
          animation: `brandNeonAuroraDrift ${motionDuration(theme, controls, 16_000, 22_000)}ms ease-in-out infinite`,
        },
        "body::after": {
          content: '""',
          position: "fixed",
          inset: "0 0 auto 0",
          height: 2,
          pointerEvents: "none",
          backgroundImage: prismRail(
            theme,
            controls,
            scale(controls.extravagance, 0.82, 1),
            90,
          ),
          boxShadow: `0 0 26px ${alpha(
            theme.palette.primary.main,
            scale(controls.ctaPower, 0.18, 0.3),
          )}`,
          animation: `brandNeonRailPulse ${motionDuration(theme, controls, 2800, 4600)}ms ease-in-out infinite`,
        },
        "::selection": {
          backgroundColor: alpha(theme.palette.primary.main, 0.34),
          color: isDark
            ? theme.palette.background.default
            : theme.palette.text.primary,
        },
        ":focus-visible": {
          outline: `2px solid ${alpha(theme.palette.primary.main, 0.92)}`,
          outlineOffset: 2,
        },
        a: {
          color: theme.palette.primary.main,
          textUnderlineOffset: 4,
          textDecorationThickness: 2,
          textDecorationColor: alpha(theme.palette.primary.main, 0.46),
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
          "body::before, body::after": {
            animation: "none",
            transform: "none",
          },
        },
        "@media (hover: none), (max-width: 900px)": {
          body: {
            backgroundAttachment: "scroll",
          },
          "body::before": {
            inset: "-10svh -12vw auto -12vw",
            opacity: scale(controls.heroDrama, 0.5, 0.72),
            filter: `blur(${Math.round(scale(controls.blurBudget, 28, 42))}px)`,
          },
          "body::after": {
            opacity: 0.72,
          },
        },
      };
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
      }),
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiTypography-h1, &.MuiTypography-h2": {
          display: "inline-block",
          maxInlineSize: "15ch",
          textWrap: "balance",
          overflowWrap: "break-word",
          backgroundImage: `linear-gradient(180deg, transparent 0%, transparent 66%, ${alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.16 : 0.12,
          )} 66%, ${alpha(
            theme.palette.info.main,
            theme.palette.mode === "dark" ? 0.18 : 0.14,
          )} 100%)`,
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
          textShadow: `0 10px 24px ${alpha(
            theme.palette.background.default,
            theme.palette.mode === "dark" ? 0.28 : 0.12,
          )}`,
        },
        "&.MuiTypography-h3": {
          maxInlineSize: "24ch",
          textWrap: "balance",
          color: alpha(theme.palette.text.primary, 0.96),
          textShadow: `0 6px 16px ${alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.1 : 0.05,
          )}`,
        },
        "&.MuiTypography-subtitle2, &.MuiTypography-overline": {
          color: alpha(theme.palette.text.secondary, 0.94),
          textShadow: `0 0 10px ${alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.1 : 0.04,
          )}`,
        },
        "&.MuiTypography-subtitle1, &.MuiTypography-subtitle2": {
          maxInlineSize: "58ch",
          textWrap: "pretty",
          overflowWrap: "break-word",
        },
        "&.MuiTypography-body1, &.MuiTypography-body2": {
          maxInlineSize: "68ch",
          textWrap: "pretty",
          overflowWrap: "break-word",
        },
        ...withLangSelector(
          "ru",
          "&.MuiTypography-h1",
          BRAND_RU_LOCALE_PROFILE.typography.h1,
        ),
        ...withLangSelector(
          "ru",
          "&.MuiTypography-h2",
          BRAND_RU_LOCALE_PROFILE.typography.h2,
        ),
        ...withLangSelector(
          "ru",
          "&.MuiTypography-h3",
          BRAND_RU_LOCALE_PROFILE.typography.h3,
        ),
        ...withLangSelectors(
          "ru",
          [
            "&.MuiTypography-subtitle1",
            "&.MuiTypography-subtitle2",
            "&.MuiTypography-body1",
            "&.MuiTypography-body2",
          ],
          BRAND_RU_LOCALE_PROFILE.typography.flowingText,
        ),
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.94em",
          padding: "0.12em 0.4em",
          borderRadius: 10,
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
        },
      }),
    },
  },

  MuiAppBar: {
    defaultProps: { color: "transparent" as const, elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurface(theme, controls, "elevated", {
          radius: BRAND_RADIUS + 14,
          fillAlpha: theme.palette.mode === "dark" ? 0.66 : 0.88,
          signatureOpacity: 0.88,
          blurMin: 12,
          blurMax: 20,
        }),
        "&::after": {
          content: '""',
          position: "absolute",
          insetInline: 0,
          insetBlockEnd: 0,
          height: 2,
          backgroundImage: prismRail(theme, controls, 0.84, 90),
          boxShadow: `0 0 18px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.08, 0.14),
          )}`,
          pointerEvents: "none",
        },
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurface(theme, controls, "surface", {
          fillAlpha: theme.palette.mode === "dark" ? 0.7 : 0.9,
          signatureOpacity: 0.72,
        }),
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurface(theme, controls, "elevated", {
          radius: BRAND_RADIUS + 14,
          fillAlpha: theme.palette.mode === "dark" ? 0.74 : 0.92,
          signatureOpacity: 0.96,
          blurMin: 12,
          blurMax: 20,
        }),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background-position"],
          {
            duration: motionDuration(theme, controls, 180, 280),
          },
        ),
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 200% 200%",
        "&:hover": {
          transform: "translateY(-3px)",
          backgroundPosition: "0 0, 0 0, 0 0, 100% 0",
          boxShadow: [
            materialShadow(theme, controls, "overlay"),
            `0 0 52px ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, 0.1, 0.18),
            )}`,
          ].join(", "),
        },
      }),
    },
  },

  MuiCardContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(3),
        [theme.breakpoints.up("sm")]: {
          padding: theme.spacing(3.5),
        },
        "&:last-child": {
          paddingBottom: theme.spacing(3.5),
        },
      }),
    },
  },

  MuiCardActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(2),
        gap: theme.spacing(1.25),
        borderTop: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.08 : 0.56)}`,
        backgroundImage: `linear-gradient(90deg, ${alpha(
          theme.palette.primary.main,
          0.06,
        )} 0%, ${alpha(theme.palette.info.main, 0.04)} 50%, transparent 100%)`,
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        paddingInline: 22,
        paddingBlock: 12,
        gap: theme.spacing(1),
        borderRadius: 999,
        border: "1px solid transparent",
        ...createCompactLabelStyle({
          letterSpacing: "0.015em",
        }),
        lineHeight: 1.15,
        textAlign: "center",
        whiteSpace: "normal",
        textWrap: "balance",
        overflowWrap: "anywhere",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background-position", "border-color"],
          {
            duration: motionDuration(theme, controls, 180, 280),
          },
        ),
        "&.Mui-focusVisible": {
          boxShadow: createFocusHalo(theme, controls),
        },
        ...withLangSelector("ru", "&", BRAND_RU_LOCALE_PROFILE.button),
        "&:active": {
          transform: "translateY(0)",
        },
        "&.Mui-disabled": {
          opacity: 0.76,
          transform: "none",
        },
      }),
      sizeLarge: {
        minHeight: 54,
        paddingInline: 28,
        paddingBlock: 14,
        fontSize: "1rem",
      },

      contained: ({ theme }) => ({
        boxShadow: createButtonGlow(theme, controls, 0.92),
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-2px)",
          },
        },
      }),

      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        border: "1px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage: [
          `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.98,
          )} 0%, ${alpha(theme.palette.info.main, 0.92)} 38%, ${alpha(
            theme.palette.secondary.main,
            0.84,
          )} 72%, ${alpha(theme.palette.warning.main, 0.9)} 100%)`,
          prismRail(theme, controls, 0.9, 132),
        ].join(", "),
        backgroundSize: "200% 200%, 100% 100%",
        backgroundPosition: "0% 50%, 0 0",
        textShadow: `0 1px 0 ${alpha(theme.palette.common.black, 0.18)}`,
        boxShadow: [
          createButtonGlow(theme, controls, 1.08),
          `0 1px 0 ${alpha(theme.palette.common.white, 0.22)} inset`,
        ].join(", "),
        "@media (hover: hover)": {
          "&:hover": {
            backgroundPosition: "100% 50%, 0 0",
            boxShadow: createButtonGlow(theme, controls, 1.26),
          },
        },
        "&.Mui-focusVisible": {
          boxShadow: [
            createButtonGlow(theme, controls, 1.16),
            createFocusHalo(theme, controls, theme.palette.primary.main),
          ].join(", "),
        },
        "&.Mui-disabled": {
          color: alpha(theme.palette.primary.contrastText, 0.62),
          backgroundImage: [
            `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.42,
            )} 0%, ${alpha(theme.palette.info.main, 0.34)} 100%)`,
            prismRail(theme, controls, 0.3, 132),
          ].join(", "),
          boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.12)}`,
        },
      }),

      containedSecondary: ({ theme }) => ({
        color: theme.palette.secondary.contrastText,
        borderColor: "transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        backgroundImage: [
          `linear-gradient(135deg, ${alpha(
            theme.palette.secondary.light ?? theme.palette.secondary.main,
            0.98,
          )} 0%, ${alpha(theme.palette.secondary.main, 0.94)} 42%, ${alpha(
            theme.palette.warning.main,
            0.9,
          )} 100%)`,
          prismRail(theme, controls, 0.68, 132),
        ].join(", "),
        boxShadow: [
          `0 14px 34px ${alpha(
            theme.palette.secondary.main,
            scale(controls.ctaPower, 0.16, 0.26),
          )}`,
          `0 0 0 1px ${alpha(theme.palette.common.white, 0.18)} inset`,
        ].join(", "),
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: [
              `0 18px 42px ${alpha(
                theme.palette.secondary.main,
                scale(controls.ctaPower, 0.2, 0.32),
              )}`,
              `0 0 28px ${alpha(
                theme.palette.warning.main,
                scale(controls.extravagance, 0.12, 0.2),
              )}`,
            ].join(", "),
          },
        },
        "&.Mui-focusVisible": {
          boxShadow: [
            `0 16px 38px ${alpha(
              theme.palette.secondary.main,
              scale(controls.ctaPower, 0.18, 0.3),
            )}`,
            createFocusHalo(theme, controls, theme.palette.warning.main),
          ].join(", "),
        },
      }),

      outlined: ({ theme }) => ({
        color: theme.palette.text.primary,
        ...createPrismFrame(theme, controls, {
          fillAlpha: theme.palette.mode === "dark" ? 0.3 : 0.7,
          signatureOpacity: 0.78,
          angle: 134,
        }),
        boxShadow: [
          `0 10px 24px ${alpha(
            theme.palette.text.primary,
            theme.palette.mode === "dark" ? 0.18 : 0.08,
          )}`,
          `0 0 0 1px ${alpha(theme.palette.common.white, 0.08)} inset`,
        ].join(", "),
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: [
              `0 16px 34px ${alpha(
                theme.palette.text.primary,
                theme.palette.mode === "dark" ? 0.22 : 0.1,
              )}`,
              `0 0 24px ${alpha(
                theme.palette.primary.main,
                scale(controls.ctaPower, 0.1, 0.18),
              )}`,
            ].join(", "),
          },
        },
      }),

      outlinedPrimary: ({ theme }) => ({
        color: theme.palette.primary.main,
        ...createPrismFrame(theme, controls, {
          fillAlpha: theme.palette.mode === "dark" ? 0.28 : 0.66,
          signatureOpacity: 0.9,
          angle: 132,
        }),
        boxShadow: [
          `0 12px 28px ${alpha(
            theme.palette.text.primary,
            theme.palette.mode === "dark" ? 0.18 : 0.08,
          )}`,
          `0 0 0 1px ${alpha(theme.palette.primary.main, 0.18)}`,
        ].join(", "),
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: [
              `0 16px 34px ${alpha(
                theme.palette.text.primary,
                theme.palette.mode === "dark" ? 0.22 : 0.1,
              )}`,
              `0 0 28px ${alpha(
                theme.palette.primary.main,
                scale(controls.ctaPower, 0.12, 0.22),
              )}`,
            ].join(", "),
          },
        },
      }),

      text: ({ theme }) => ({
        borderColor: "transparent",
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
      }),

      textPrimary: ({ theme }) => ({
        color: theme.palette.primary.main,
        textShadow: `0 0 8px ${alpha(
          theme.palette.primary.main,
          scale(controls.extravagance, 0.04, 0.08),
        )}`,
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.12)} inset`,
        },
      }),
      startIcon: ({ theme }) => ({
        marginInlineEnd: theme.spacing(1),
        "& > *:nth-of-type(1)": {
          fontSize: "1.08em",
        },
      }),
      endIcon: ({ theme }) => ({
        marginInlineStart: theme.spacing(1),
        "& > *:nth-of-type(1)": {
          fontSize: "1.08em",
        },
      }),
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        minWidth: 42,
        minHeight: 42,
        borderRadius: 16,
        ...createPrismFrame(theme, controls, {
          fillAlpha: theme.palette.mode === "dark" ? 0.34 : 0.74,
          signatureOpacity: 0.5,
        }),
        boxShadow: `0 10px 24px ${alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.18 : 0.08,
        )}`,
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background-position"],
          {
            duration: motionDuration(theme, controls, 150, 220),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: [
              `0 12px 28px ${alpha(
                theme.palette.text.primary,
                theme.palette.mode === "dark" ? 0.22 : 0.1,
              )}`,
              `0 0 24px ${alpha(
                theme.palette.info.main,
                scale(controls.extravagance, 0.08, 0.14),
              )}`,
            ].join(", "),
          },
        },
        "&.Mui-focusVisible": {
          boxShadow: [
            `0 12px 28px ${alpha(
              theme.palette.text.primary,
              theme.palette.mode === "dark" ? 0.22 : 0.1,
            )}`,
            createFocusHalo(theme, controls, theme.palette.info.main, 2, 5),
          ].join(", "),
        },
        "&.Mui-disabled": {
          opacity: 0.56,
        },
      }),
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 34,
        borderRadius: 999,
        ...createCompactLabelStyle({
          letterSpacing: "0.015em",
        }),
        ...createPrismFrame(theme, controls, {
          fillAlpha: theme.palette.mode === "dark" ? 0.38 : 0.82,
          signatureOpacity: 0.74,
          angle: 118,
        }),
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.common.white, 0.08)} inset`,
          `0 12px 28px ${alpha(
            theme.palette.text.primary,
            theme.palette.mode === "dark" ? 0.18 : 0.08,
          )}`,
        ].join(", "),
        ...blurStyle(controls, 6, 10),
        transition: theme.transitions.create(
          ["transform", "box-shadow", "border-color", "background-position"],
          {
            duration: motionDuration(theme, controls, 150, 220),
          },
        ),
        "@media (hover: hover)": {
          "&.MuiChip-clickable:hover": {
            transform: "translateY(-1px)",
            boxShadow: [
              `0 14px 32px ${alpha(
                theme.palette.text.primary,
                theme.palette.mode === "dark" ? 0.2 : 0.1,
              )}`,
              `0 0 22px ${alpha(
                theme.palette.primary.main,
                scale(controls.extravagance, 0.08, 0.14),
              )}`,
            ].join(", "),
          },
        },
        "&.MuiChip-clickable.Mui-focusVisible": {
          boxShadow: [
            `0 12px 28px ${alpha(
              theme.palette.text.primary,
              theme.palette.mode === "dark" ? 0.18 : 0.08,
            )}`,
            createFocusHalo(theme, controls, theme.palette.primary.main, 2, 5),
          ].join(", "),
        },
      }),
      label: {
        paddingInline: 12,
      },
      icon: ({ theme }) => ({
        color: alpha(theme.palette.primary.main, 0.92),
        marginInlineStart: 10,
      }),
      deleteIcon: ({ theme }) => ({
        color: alpha(theme.palette.text.secondary, 0.9),
        "&:hover": {
          color: theme.palette.primary.main,
        },
      }),
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: "50%",
        color:
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : theme.palette.primary.contrastText,
        ...createCompactLabelStyle({
          letterSpacing: "0.04em",
          weight: BRAND_CYRILLIC_PROFILE.strongLabelWeight,
        }),
        backgroundImage: prismRail(theme, controls, 0.92, 135),
        border: `2px solid ${alpha(
          theme.palette.common.white,
          theme.palette.mode === "dark" ? 0.18 : 0.68,
        )}`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`,
          `0 12px 26px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.08, 0.14),
          )}`,
        ].join(", "),
      }),
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 50,
        padding: theme.spacing(0.5),
        ...createSurface(theme, controls, "surface", {
          radius: 999,
          fillAlpha: theme.palette.mode === "dark" ? 0.3 : 0.72,
          signatureOpacity: 0.44,
          blurMin: 8,
          blurMax: 12,
        }),
      }),
      scroller: ({ theme }) => ({
        paddingInline: theme.spacing(0.25),
      }),
      flexContainer: ({ theme }) => ({
        gap: theme.spacing(0.5),
      }),
      indicator: ({ theme }) => ({
        height: "calc(100% - 8px)",
        top: 4,
        borderRadius: 999,
        backgroundImage: prismRail(theme, controls, 0.72, 135),
        boxShadow: `0 10px 28px ${alpha(
          theme.palette.primary.main,
          scale(controls.extravagance, 0.12, 0.2),
        )}`,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 40,
        borderRadius: 999,
        ...createCompactLabelStyle({
          letterSpacing: "0.01em",
        }),
        paddingInline: 14,
        color: alpha(theme.palette.text.primary, 0.78),
        transition: theme.transitions.create(
          ["color", "background-color", "box-shadow"],
          {
            duration: motionDuration(theme, controls, 140, 210),
          },
        ),
        "@media (hover: hover)": {
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            color: theme.palette.text.primary,
          },
        },
        "&.Mui-focusVisible": {
          boxShadow: createFocusHalo(
            theme,
            controls,
            theme.palette.primary.main,
            2,
            4,
          ),
        },
        "&.Mui-selected": {
          color: theme.palette.primary.main,
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.14 : 0.1,
          ),
          textShadow: `0 0 10px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.06, 0.1),
          )}`,
        },
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: BRAND_RADIUS,
        ...createPrismFrame(theme, controls, {
          fillAlpha: theme.palette.mode === "dark" ? 0.34 : 0.76,
          signatureOpacity: 0.44,
          angle: 130,
        }),
        ...blurStyle(controls, 8, 12),
        transition: theme.transitions.create(
          ["box-shadow", "background-position", "border-color"],
          {
            duration: motionDuration(theme, controls, 140, 220),
          },
        ),
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        "&.Mui-focused": {
          boxShadow: createFocusHalo(
            theme,
            controls,
            theme.palette.primary.main,
            1,
            4,
          ),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        "&.Mui-disabled": {
          opacity: 0.72,
          boxShadow: `0 0 0 1px ${alpha(theme.palette.text.primary, 0.08)} inset`,
        },
        "& .MuiInputAdornment-root": {
          color: alpha(theme.palette.text.secondary, 0.92),
        },
      }),
      input: ({ theme }) => ({
        paddingBlock: 12,
        paddingInline: 14,
        "::placeholder": {
          color: alpha(theme.palette.text.primary, 0.46),
        },
      }),
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...createCompactLabelStyle({
          fontSize: "0.82rem",
          letterSpacing: "0.012em",
        }),
        color: alpha(theme.palette.text.secondary, 0.92),
        "&.Mui-focused": {
          color: alpha(theme.palette.primary.main, 0.96),
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
        backgroundColor: theme.palette.background.paper,
        border: `2px solid ${alpha(theme.palette.primary.main, 0.18)}`,
        boxShadow: [
          `0 0 0 1px ${alpha(theme.palette.common.white, 0.16)} inset`,
          `0 8px 18px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.08, 0.14),
          )}`,
        ].join(", "),
      }),
      track: ({ theme }) => ({
        borderRadius: 999,
        opacity: 1,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
        backgroundColor: alpha(theme.palette.text.primary, 0.12),
        backgroundImage: prismRail(theme, controls, 0.22, 90),
      }),
      switchBase: ({ theme }) => ({
        transitionDuration: `${motionDuration(theme, controls, 140, 220)}ms`,
        "&.Mui-focusVisible .MuiSwitch-thumb": {
          boxShadow: [
            `0 8px 18px ${alpha(
              theme.palette.primary.main,
              scale(controls.extravagance, 0.1, 0.16),
            )}`,
            createFocusHalo(theme, controls, theme.palette.primary.main, 2, 4),
          ].join(", "),
        },
        "&.Mui-checked": {
          color: theme.palette.primary.main,
          "& .MuiSwitch-thumb": {
            boxShadow: [
              `0 0 0 1px ${alpha(theme.palette.common.white, 0.18)} inset`,
              `0 10px 22px ${alpha(
                theme.palette.primary.main,
                scale(controls.ctaPower, 0.14, 0.22),
              )}`,
            ].join(", "),
          },
          "& + .MuiSwitch-track": {
            opacity: 1,
            backgroundImage: prismRail(
              theme,
              controls,
              scale(controls.ctaPower, 0.34, 0.54),
              90,
            ),
            boxShadow: `0 0 18px ${alpha(
              theme.palette.primary.main,
              scale(controls.extravagance, 0.1, 0.16),
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
      }),
      rail: ({ theme }) => ({
        height: 8,
        opacity: 1,
        backgroundColor: alpha(theme.palette.text.primary, 0.12),
      }),
      track: ({ theme }) => ({
        height: 8,
        border: "none",
        backgroundImage: prismRail(theme, controls, 0.92, 90),
        boxShadow: `0 0 16px ${alpha(
          theme.palette.primary.main,
          scale(controls.ctaPower, 0.08, 0.16),
        )}`,
      }),
      thumb: ({ theme }) => ({
        width: 20,
        height: 20,
        borderRadius: "50%",
        ...createPrismFrame(theme, controls, {
          fillAlpha: theme.palette.mode === "dark" ? 0.42 : 0.88,
          signatureOpacity: 0.58,
          angle: 135,
        }),
        boxShadow: [
          materialShadow(theme, controls, "surface"),
          `0 0 0 2px ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.18 : 0.62,
          )}`,
          `0 0 0 4px ${alpha(
            theme.palette.primary.main,
            scale(controls.ctaPower, 0.08, 0.14),
          )}`,
        ].join(", "),
        "@media (hover: hover)": {
          "&:hover": {
            boxShadow: [
              materialShadow(theme, controls, "elevated"),
              `0 0 0 6px ${alpha(
                theme.palette.primary.main,
                scale(controls.ctaPower, 0.1, 0.16),
              )}`,
            ].join(", "),
          },
        },
        "&.Mui-focusVisible, &.Mui-active": {
          boxShadow: [
            materialShadow(theme, controls, "elevated"),
            createFocusHalo(theme, controls, theme.palette.primary.main, 2, 5),
          ].join(", "),
        },
      }),
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: "transparent",
        height: 1,
        backgroundImage: [
          `linear-gradient(90deg, transparent 0%, ${alpha(
            theme.palette.common.white,
            theme.palette.mode === "dark" ? 0.18 : 0.62,
          )} 50%, transparent 100%)`,
          prismRail(theme, controls, 0.72, 90),
        ].join(", "),
        boxShadow: `0 0 16px ${alpha(
          theme.palette.primary.main,
          scale(controls.extravagance, 0.06, 0.12),
        )}`,
        "&.MuiDivider-vertical": {
          width: 1,
          height: "auto",
          minHeight: 24,
          backgroundImage: [
            `linear-gradient(180deg, transparent 0%, ${alpha(
              theme.palette.common.white,
              theme.palette.mode === "dark" ? 0.18 : 0.62,
            )} 50%, transparent 100%)`,
            prismRail(theme, controls, 0.68, 180),
          ].join(", "),
        },
      }),
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: `linear-gradient(90deg, ${alpha(
          theme.palette.primary.main,
          0.08,
        )} 0%, ${alpha(theme.palette.info.main, 0.08)} 42%, ${alpha(
          theme.palette.secondary.main,
          0.06,
        )} 100%)`,
      }),
    },
  },

  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurface(theme, controls, "elevated", {
          radius: BRAND_RADIUS + 12,
          fillAlpha: theme.palette.mode === "dark" ? 0.68 : 0.9,
          signatureOpacity: 0.62,
        }),
        "& .MuiTable-root": {
          borderCollapse: "separate",
          borderSpacing: 0,
        },
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }) => ({
        ...createCompactLabelStyle({
          letterSpacing: "0.012em",
        }),
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.14)}`,
        color: alpha(theme.palette.text.primary, 0.94),
      }),
      body: ({ theme }) => ({
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
        color: alpha(theme.palette.text.primary, 0.84),
      }),
    },
  },

  MuiTooltip: {
    defaultProps: { arrow: true },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...createSurface(theme, controls, "overlay", {
          radius: BRAND_RADIUS + 8,
          fillAlpha: theme.palette.mode === "dark" ? 0.82 : 0.94,
          signatureOpacity: 0.84,
        }),
        maxWidth: 280,
        color: theme.palette.text.primary,
        fontSize: "0.82rem",
        lineHeight: 1.5,
        padding: "10px 12px",
      }),
      arrow: ({ theme }) => ({
        color: alpha(
          theme.palette.background.paper,
          theme.palette.mode === "dark" ? 0.82 : 0.94,
        ),
      }),
    },
  },

  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurface(theme, controls, "overlay", {
          radius: BRAND_RADIUS + 8,
          fillAlpha: theme.palette.mode === "dark" ? 0.82 : 0.94,
          signatureOpacity: 0.74,
        }),
        color: theme.palette.text.primary,
        paddingInline: theme.spacing(2),
        gap: theme.spacing(1.5),
        "& .MuiButton-root": {
          minHeight: 38,
          paddingInline: theme.spacing(1.75),
        },
      }),
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurface(theme, controls, "overlay", {
          radius: BRAND_RADIUS + 8,
          fillAlpha: theme.palette.mode === "dark" ? 0.78 : 0.92,
          signatureOpacity: 0.8,
        }),
        "&::before": {
          content: '""',
          position: "absolute",
          insetInlineStart: 0,
          insetBlockStart: 0,
          width: 8,
          height: "100%",
          backgroundImage: prismRail(theme, controls, 0.9, 180),
          pointerEvents: "none",
        },
      }),
      icon: ({ theme }) => ({
        color: theme.palette.primary.main,
      }),
      message: ({ theme }) => ({
        paddingBlock: theme.spacing(0.5),
      }),
      action: ({ theme }) => ({
        alignItems: "center",
        marginRight: theme.spacing(0.5),
      }),
      standardInfo: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.info.main,
          theme.palette.mode === "dark" ? 0.14 : 0.1,
        ),
      }),
      standardSuccess: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.success.main,
          theme.palette.mode === "dark" ? 0.14 : 0.1,
        ),
      }),
      standardWarning: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.warning.main,
          theme.palette.mode === "dark" ? 0.16 : 0.12,
        ),
      }),
      standardError: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.error.main,
          theme.palette.mode === "dark" ? 0.16 : 0.1,
        ),
      }),
    },
  },

  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...createSurface(theme, controls, "surface", {
          radius: BRAND_RADIUS + 10,
          fillAlpha: theme.palette.mode === "dark" ? 0.64 : 0.86,
          signatureOpacity: 0.58,
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
        transition: theme.transitions.create(
          ["background-color", "box-shadow"],
          {
            duration: motionDuration(theme, controls, 140, 220),
          },
        ),
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.07 : 0.05,
          ),
        },
        "&.Mui-focusVisible": {
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.14)}`,
        },
      }),
      content: {
        margin: 0,
        "& .MuiTypography-root": {
          ...createCompactLabelStyle({}),
        },
      },
      expandIconWrapper: ({ theme }) => ({
        color: alpha(theme.palette.primary.main, 0.92),
        "&.Mui-expanded": {
          color: theme.palette.info.main,
        },
      }),
    },
  },

  MuiAccordionDetails: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(2.5),
        paddingBottom: theme.spacing(2.5),
        borderTop: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.06 : 0.54)}`,
        color: alpha(theme.palette.text.primary, 0.82),
      }),
    },
  },

  MuiLink: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.primary.main,
        textUnderlineOffset: 4,
        textDecorationThickness: 2,
        textDecorationColor: alpha(theme.palette.primary.main, 0.46),
        "&:hover": {
          textDecorationColor: alpha(theme.palette.primary.main, 0.82),
          textShadow: `0 0 10px ${alpha(
            theme.palette.primary.main,
            scale(controls.extravagance, 0.05, 0.09),
          )}`,
        },
        "&:focus-visible": {
          outline: "none",
          boxShadow: createFocusHalo(
            theme,
            controls,
            theme.palette.primary.main,
            1,
            3,
          ),
        },
      }),
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...createSurface(theme, controls, "overlay", {
          radius: BRAND_RADIUS + 12,
          fillAlpha: theme.palette.mode === "dark" ? 0.8 : 0.92,
          signatureOpacity: 0.72,
        }),
        marginTop: theme.spacing(1),
        minWidth: 220,
      }),
      list: ({ theme }) => ({
        padding: theme.spacing(0.75),
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: BRAND_RADIUS,
        ...createCompactLabelStyle({}),
        transition: theme.transitions.create(
          ["background-color", "box-shadow", "transform"],
          {
            duration: motionDuration(theme, controls, 120, 180),
          },
        ),
        "& .MuiListItemIcon-root": {
          minWidth: 34,
          color: alpha(theme.palette.primary.main, 0.9),
        },
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.primary.main, 0.14),
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.12)}`,
        },
        "&.Mui-selected:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.18),
        },
        "@media (hover: hover)": {
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            transform: "translateX(2px)",
          },
        },
        "&.Mui-focusVisible": {
          boxShadow: createFocusHalo(
            theme,
            controls,
            theme.palette.primary.main,
            1,
            3,
          ),
        },
      }),
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...createSurface(theme, controls, "overlay", {
          radius: BRAND_RADIUS + 18,
          fillAlpha: theme.palette.mode === "dark" ? 0.84 : 0.94,
          signatureOpacity: 0.76,
          blurMin: 14,
          blurMax: 22,
        }),
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 180% 180%",
        maxWidth: "min(720px, calc(100% - 32px))",
      }),
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(3, 3, 1.5),
        ...createCompactLabelStyle({
          letterSpacing: "-0.008em",
          weight: BRAND_CYRILLIC_PROFILE.strongLabelWeight,
        }),
      }),
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(1, 3, 2.5),
        color: alpha(theme.palette.text.primary, 0.84),
      }),
    },
  },

  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(0, 3, 3),
        gap: theme.spacing(1.25),
        borderTop: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.06 : 0.54)}`,
        backgroundImage: `linear-gradient(90deg, transparent 0%, ${alpha(
          theme.palette.primary.main,
          0.05,
        )} 50%, transparent 100%)`,
      }),
    },
  },

  MuiBackdrop: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(
          theme.palette.background.default,
          theme.palette.mode === "dark" ? 0.76 : 0.62,
        ),
        ...blurStyle(controls, 4, 8),
      }),
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...createSurface(theme, controls, "overlay", {
          radius: BRAND_RADIUS + 10,
          fillAlpha: theme.palette.mode === "dark" ? 0.88 : 0.96,
          signatureOpacity: 0.86,
        }),
        padding: theme.spacing(1),
      }),
    },
  },

  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        height: 8,
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
        backgroundColor: alpha(theme.palette.text.primary, 0.12),
      }),
      bar: ({ theme }) => ({
        borderRadius: 999,
        backgroundImage: prismRail(theme, controls, 0.9, 90),
        backgroundSize: "160% 100%",
        boxShadow: `0 10px 28px ${alpha(
          theme.palette.primary.main,
          scale(controls.ctaPower, 0.16, 0.24),
        )}`,
      }),
    },
  },
});

const brandNeonMotionLightOptions: ThemeOptions = {
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: BRAND_NEON,
      light: NEON_SOFT,
      dark: BRAND_NEON,
      contrastText: BRAND_NAVY,
    },

    // Deep purple is used as a secondary accent (sparingly).
    secondary: {
      main: ACCENT_PURPLE,
      light: PURPLE_SOFT,
      dark: "#2E0536",
      contrastText: BRAND_WHITE,
    },

    // Periwinkle is used for informational accents / charts / secondary highlights.
    info: {
      main: ACCENT_PERIWINKLE,
      light: PERIWINKLE_SOFT,
      dark: "#7D88D8",
      contrastText: BRAND_NAVY,
    },

    success: {
      main: ACCENT_MINT,
      light: MINT_SOFT,
      dark: "#34C874",
      contrastText: BRAND_NAVY,
    },

    warning: {
      main: CORAL_SOFT,
      light: "#FFB0A6",
      dark: "#E85B4C",
      contrastText: BRAND_NAVY,
    },

    error: {
      main: ACCENT_CORAL,
      light: "#FF8B7A",
      dark: "#D33E2A",
      contrastText: BRAND_WHITE,
    },

    background: {
      default: "#F3F6FF",
      paper: "#F9FCFF",
    },

    text: {
      primary: BRAND_NAVY,
      secondary: alpha(BRAND_NAVY, 0.72),
      disabled: alpha(BRAND_NAVY, 0.44),
    },

    divider: alpha(BRAND_NAVY, 0.14),

    grey: {
      50: "#F7FBFF",
      100: "#EFF6FF",
      200: "#DDEBFF",
      300: "#C4D8F5",
      400: "#99B3D6",
      500: "#6D88A6",
      600: "#4E637A",
      700: "#334252",
      800: "#1F2B36",
      900: BRAND_NAVY,
    },

    action: {
      hover: alpha(BRAND_NEON, 0.08),
      selected: alpha(BRAND_NEON, 0.14),
      focus: alpha(BRAND_NEON, 0.2),
      active: alpha(BRAND_NAVY, 0.54),
      disabled: alpha(BRAND_NAVY, 0.32),
      disabledBackground: alpha(BRAND_NAVY, 0.06),
    },
  },

  typography: BRAND_TYPOGRAPHY,
  shape: { borderRadius: BRAND_RADIUS },
  spacing: 8,

  transitions: {
    duration: {
      shortest: 130,
      shorter: 180,
      short: 220,
      standard: 280,
      complex: 360,
      enteringScreen: 210,
      leavingScreen: 170,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0.0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0.0, 1, 1)",
      sharp: "cubic-bezier(0.2, 0.0, 0, 1)",
    },
  },

  components: createBrandComponents(brandNeonMotionLightControls),
};

const brandNeonMotionDarkOptions: ThemeOptions = {
  direction: "ltr",

  palette: {
    mode: "dark",

    primary: {
      main: BRAND_NEON,
      light: NEON_SOFT,
      dark: "#00A9CC",
      contrastText: BRAND_NAVY,
    },

    secondary: {
      main: ACCENT_PURPLE,
      light: "#6C2D7B",
      dark: "#2A0431",
      contrastText: BRAND_WHITE,
    },

    info: {
      main: ACCENT_PERIWINKLE,
      light: PERIWINKLE_SOFT,
      dark: "#6E79C9",
      contrastText: BRAND_NAVY,
    },

    success: {
      main: ACCENT_MINT,
      light: MINT_SOFT,
      dark: "#2FBF6E",
      contrastText: BRAND_NAVY,
    },

    warning: {
      main: CORAL_SOFT,
      light: "#FFB0A6",
      dark: "#D14E41",
      contrastText: BRAND_NAVY,
    },

    error: {
      main: ACCENT_CORAL,
      light: "#FF8B7A",
      dark: "#C73827",
      contrastText: BRAND_WHITE,
    },

    background: {
      default: "#07101A",
      paper: BRAND_NAVY_SOFT,
    },

    text: {
      primary: BRAND_WHITE,
      secondary: alpha(BRAND_WHITE, 0.72),
      disabled: alpha(BRAND_WHITE, 0.42),
    },

    divider: alpha(BRAND_WHITE, 0.14),

    grey: {
      50: BRAND_NAVY_SOFT,
      100: "#152434",
      200: "#1B2F45",
      300: "#223A55",
      400: "#2D4868",
      500: "#3B5C7E",
      600: "#54759C",
      700: "#7E9CBD",
      800: "#BCCEE1",
      900: BRAND_WHITE,
    },

    action: {
      hover: alpha(BRAND_NEON, 0.12),
      selected: alpha(BRAND_NEON, 0.18),
      focus: alpha(BRAND_NEON, 0.24),
      active: alpha(BRAND_WHITE, 0.56),
      disabled: alpha(BRAND_WHITE, 0.3),
      disabledBackground: alpha(BRAND_WHITE, 0.08),
    },
  },

  typography: BRAND_TYPOGRAPHY,
  shape: { borderRadius: BRAND_RADIUS },
  spacing: 8,

  transitions: {
    duration: {
      shortest: 130,
      shorter: 180,
      short: 220,
      standard: 280,
      complex: 360,
      enteringScreen: 210,
      leavingScreen: 170,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0.0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0.0, 1, 1)",
      sharp: "cubic-bezier(0.2, 0.0, 0, 1)",
    },
  },

  components: createBrandComponents(brandNeonMotionDarkControls),
};

export const brandNeonMotion: ThemePreset = {
  id: "brand-neon-motion",
  label: "Brand Neon Motion",
  description:
    "Exclusive neon landing preset with aurora hero scene, prism rail signature, premium glass surfaces, and dominant kinetic CTA styling",
  tags: ["brand", "neon", "motion", "prism", "landing", "glass"],
  version: "1.0.0",
  colorSchemes: {
    light: brandNeonMotionLightOptions,
    dark: brandNeonMotionDarkOptions,
  },
};
