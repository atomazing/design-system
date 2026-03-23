import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

const FONT_DISPLAY =
  '"IBM Plex Sans","Inter","Manrope","Helvetica","Arial",sans-serif';
const FONT_TEXT =
  '"IBM Plex Sans","Inter","Manrope","Helvetica","Arial",sans-serif';
const FONT_MONO =
  '"IBM Plex Mono","JetBrains Mono","Roboto Mono","Menlo","Consolas",monospace';

const BAUHAUS_RADIUS = 20;

interface BauhausScriptProfile {
  displayWeight: number;
  secondaryWeight: number;
  labelWeight: number;
  heroCaps: boolean;
  compactCaps: boolean;
}

interface BauhausLandingControls {
  luxuryLevel: number;
  extravagance: number;
  heroDrama: number;
  ctaPower: number;
  motionPolish: number;
  blurBudget: number;
}

type SurfaceLevel = "surface" | "elevated" | "overlay";

const BAUHAUS_CYRILLIC_PROFILE: BauhausScriptProfile = {
  displayWeight: 700,
  secondaryWeight: 500,
  labelWeight: 700,
  heroCaps: true,
  compactCaps: false,
};

const withOptionalUppercase = (enabled: boolean) =>
  enabled ? { textTransform: "uppercase" as const } : {};

const createDisplayTypeStyle = ({
  fontSize,
  lineHeight,
  letterSpacing,
  caps = false,
  weight = BAUHAUS_CYRILLIC_PROFILE.displayWeight,
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
  letterSpacing,
  fontSize,
  weight = BAUHAUS_CYRILLIC_PROFILE.labelWeight,
}: {
  letterSpacing: string;
  fontSize?: string;
  weight?: number;
}) => ({
  fontFamily: FONT_DISPLAY,
  fontWeight: weight,
  letterSpacing,
  ...(fontSize ? { fontSize } : {}),
  ...withOptionalUppercase(BAUHAUS_CYRILLIC_PROFILE.compactCaps),
});

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
  luxuryLevel: 0.86,
  extravagance: 0.84,
  heroDrama: 0.92,
  ctaPower: 0.95,
  motionPolish: 0.82,
  blurBudget: 0.66,
});

const darkControls = createLandingControls({
  luxuryLevel: 0.9,
  extravagance: 0.9,
  heroDrama: 0.96,
  ctaPower: 0.98,
  motionPolish: 0.88,
  blurBudget: 0.74,
});

const typography = {
  fontFamily: FONT_TEXT,
  h1: {
    ...createDisplayTypeStyle({
      fontSize: "clamp(2.9rem, 5.5vw, 5rem)",
      lineHeight: 0.96,
      letterSpacing: "-0.028em",
      caps: BAUHAUS_CYRILLIC_PROFILE.heroCaps,
    }),
  },
  h2: {
    ...createDisplayTypeStyle({
      fontSize: "clamp(2.1rem, 3.8vw, 3.4rem)",
      lineHeight: 1,
      letterSpacing: "-0.02em",
      caps: BAUHAUS_CYRILLIC_PROFILE.heroCaps,
    }),
  },
  h3: {
    ...createDisplayTypeStyle({
      fontSize: "clamp(1.32rem, 2.2vw, 1.9rem)",
      lineHeight: 1.12,
      letterSpacing: "-0.01em",
    }),
  },
  h4: {
    ...createDisplayTypeStyle({
      fontSize: "1.18rem",
      lineHeight: 1.22,
      letterSpacing: "-0.004em",
    }),
  },
  subtitle1: {
    ...createDisplayTypeStyle({
      fontSize: "1.04rem",
      lineHeight: 1.52,
      letterSpacing: "0.008em",
      weight: BAUHAUS_CYRILLIC_PROFILE.secondaryWeight,
    }),
  },
  subtitle2: {
    ...createCompactLabelStyle({
      fontSize: "0.92rem",
      letterSpacing: "0.04em",
    }),
    lineHeight: 1.46,
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
    ...createCompactLabelStyle({
      letterSpacing: "0.04em",
    }),
  },
  caption: {
    fontFamily: FONT_MONO,
    fontSize: "0.78rem",
    letterSpacing: "0.03em",
  },
  overline: {
    ...createCompactLabelStyle({
      fontSize: "0.72rem",
      letterSpacing: "0.08em",
    }),
  },
} as const;

const bauhausInk = (theme: Theme): string =>
  theme.palette.mode === "dark" ? theme.palette.common.white : "#111114";

const bauhausRail = (theme: Theme, opacity = 0.92, angle = 90): string =>
  `linear-gradient(${angle}deg, ${alpha(theme.palette.primary.main, opacity)} 0%, ${alpha(
    theme.palette.primary.main,
    opacity,
  )} 28%, ${alpha(theme.palette.warning.main, opacity)} 28%, ${alpha(
    theme.palette.warning.main,
    opacity,
  )} 58%, ${alpha(theme.palette.secondary.main, opacity)} 58%, ${alpha(
    theme.palette.secondary.main,
    opacity,
  )} 84%, ${alpha(bauhausInk(theme), opacity)} 84%, ${alpha(
    bauhausInk(theme),
    opacity,
  )} 100%)`;

const bauhausFocusRing = (
  theme: Theme,
  controls: BauhausLandingControls,
  width = 4,
): string =>
  [
    `0 0 0 ${width}px ${alpha(
      theme.palette.warning.main,
      scale(controls.ctaPower, 0.18, 0.3),
    )}`,
    `0 0 ${Math.round(scale(controls.ctaPower, 18, 34))}px ${alpha(
      theme.palette.primary.main,
      scale(controls.extravagance, 0.18, 0.28),
    )}`,
  ].join(", ");

const bauhausShadow = (
  theme: Theme,
  controls: BauhausLandingControls,
  level: SurfaceLevel,
  accent = theme.palette.warning.main,
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
        ? scale(
            controls.luxuryLevel,
            isDark ? 0.78 : 0.86,
            isDark ? 0.86 : 0.94,
          )
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
              scale(
                controls.heroDrama,
                isDark ? 0.18 : 0.22,
                isDark ? 0.28 : 0.32,
              ),
            )} 0%, transparent 58%)`,
            `radial-gradient(840px 520px at 88% 14%, ${alpha(
              theme.palette.secondary.main,
              scale(
                controls.heroDrama,
                isDark ? 0.12 : 0.16,
                isDark ? 0.22 : 0.24,
              ),
            )} 0%, transparent 54%)`,
            `radial-gradient(920px 560px at 38.2% 108%, ${alpha(
              theme.palette.warning.main,
              scale(
                controls.heroDrama,
                isDark ? 0.14 : 0.16,
                isDark ? 0.24 : 0.26,
              ),
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
          content: '""',
          position: "fixed",
          insetInlineStart: "-12vw",
          insetBlockStart: "8vh",
          width: "42vw",
          minWidth: 280,
          maxWidth: 580,
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
          content: '""',
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
        ".bh-hero-panel, [data-bh-surface='hero']": {
          ...bauhausSurface(theme, controls, {
            level: "elevated",
            radius: "38px 16px 38px 16px",
            accent: theme.palette.warning.main,
          }),
        },
        ".bh-showcase-card, [data-bh-card='showcase']": {
          ...bauhausSurface(theme, controls, {
            level: "overlay",
            radius: "42px 18px 42px 18px",
            accent: theme.palette.secondary.main,
          }),
          boxShadow: [
            bauhausShadow(
              theme,
              controls,
              "overlay",
              theme.palette.secondary.main,
            ),
            `0 0 ${Math.round(scale(controls.heroDrama, 28, 52))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, 0.12, 0.22),
            )}`,
          ].join(", "),
        },
        "body.bh-showcase-mode, body[data-bh-scene='showcase']": {
          backgroundImage: [
            `radial-gradient(1160px 720px at 10% 8%, ${alpha(
              theme.palette.primary.main,
              scale(
                controls.heroDrama,
                isDark ? 0.24 : 0.28,
                isDark ? 0.34 : 0.38,
              ),
            )} 0%, transparent 58%)`,
            `radial-gradient(980px 620px at 88% 12%, ${alpha(
              theme.palette.secondary.main,
              scale(
                controls.heroDrama,
                isDark ? 0.18 : 0.2,
                isDark ? 0.28 : 0.3,
              ),
            )} 0%, transparent 54%)`,
            `radial-gradient(1040px 640px at 38.2% 112%, ${alpha(
              theme.palette.warning.main,
              scale(
                controls.heroDrama,
                isDark ? 0.18 : 0.22,
                isDark ? 0.3 : 0.34,
              ),
            )} 0%, transparent 56%)`,
            `linear-gradient(180deg, transparent 0%, transparent 58%, ${alpha(
              theme.palette.background.default,
              isDark ? 0.36 : 0.14,
            )} 100%)`,
            `linear-gradient(0deg, ${alpha(
              bauhausInk(theme),
              isDark ? 0.06 : 0.05,
            )} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${alpha(
              bauhausInk(theme),
              isDark ? 0.06 : 0.045,
            )} 1px, transparent 1px)`,
          ].join(", "),
          backgroundSize: "auto, auto, auto, auto, 36px 36px, 36px 36px",
        },
        "body.bh-showcase-mode::before, body[data-bh-scene='showcase']::before":
          {
            insetInlineStart: "-14vw",
            width: "50vw",
            maxWidth: 780,
            height: 34,
            filter: `blur(${Math.round(scale(controls.blurBudget, 16, 28))}px)`,
            opacity: 1,
          },
        "body.bh-showcase-mode::after, body[data-bh-scene='showcase']::after": {
          height: 5,
          boxShadow: [
            `0 0 28px ${alpha(
              theme.palette.primary.main,
              scale(controls.extravagance, 0.16, 0.28),
            )}`,
            `0 0 40px ${alpha(
              theme.palette.secondary.main,
              scale(controls.extravagance, 0.1, 0.18),
            )}`,
          ].join(", "),
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
        "&[data-bh-section='hero']": {
          minHeight: `calc(100svh - var(--starter-header-height, 0px))`,
          paddingBlock: theme.spacing(6),
          display: "grid",
          alignContent: "center",
          gap: theme.spacing(3),
        },
        "&[data-bh-section='hero']::before": {
          content: '""',
          position: "absolute",
          insetInline: 0,
          insetBlockStart: 0,
          height: 2,
          pointerEvents: "none",
          opacity: 0.84,
          backgroundImage: bauhausRail(
            theme,
            scale(controls.heroDrama, 0.42, 0.72),
            90,
          ),
        },
        "&[data-bh-section='hero'] > *": {
          position: "relative",
          zIndex: 1,
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
        marginInline: theme.spacing(1),
        marginTop: theme.spacing(1),
        "&::after": {
          content: '""',
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
        "&.bh-hero-panel, &[data-bh-surface='hero']": {
          ...bauhausSurface(theme, controls, {
            level: "elevated",
            radius: "38px 16px 38px 16px",
            accent: theme.palette.warning.main,
          }),
        },
        "&.bh-showcase-card, &[data-bh-surface='showcase']": {
          ...bauhausSurface(theme, controls, {
            level: "overlay",
            radius: "42px 18px 42px 18px",
            accent: theme.palette.secondary.main,
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
            transform: "translate(-2px, -2px)",
            boxShadow: bauhausShadow(
              theme,
              controls,
              "overlay",
              theme.palette.secondary.main,
            ),
          },
        },
        "&.bh-showcase-card, &[data-bh-card='showcase']": {
          ...bauhausSurface(theme, controls, {
            level: "overlay",
            radius: "44px 18px 44px 18px",
            accent: theme.palette.secondary.main,
          }),
          boxShadow: [
            bauhausShadow(
              theme,
              controls,
              "overlay",
              theme.palette.secondary.main,
            ),
            `0 0 ${Math.round(scale(controls.heroDrama, 30, 56))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.heroDrama, 0.14, 0.24),
            )}`,
          ].join(", "),
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
        "&.bh-showcase-headline, &[data-bh-copy='showcase']": {
          fontSize: "clamp(3.2rem, 6.4vw, 5.8rem)",
          lineHeight: 0.86,
          letterSpacing: "-0.078em",
          textShadow: [
            `0 14px 34px ${alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.22 : 0.12,
            )}`,
            `0 0 36px ${alpha(
              theme.palette.secondary.main,
              theme.palette.mode === "dark" ? 0.14 : 0.08,
            )}`,
          ].join(", "),
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
        fontWeight: 700,
        transition: theme.transitions.create(
          [
            "transform",
            "box-shadow",
            "background-position",
            "background-color",
          ],
          {
            duration: Math.round(scale(controls.motionPolish, 200, 300)),
          },
        ),
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
        "&.bh-showcase-cta, &[data-bh-tone='showcase']": {
          minHeight: 62,
          paddingInline: 30,
          paddingBlock: 16,
          letterSpacing: "0.18em",
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
            theme.palette.primary.light,
            0.98,
          )} 0%, ${alpha(theme.palette.primary.main, 0.98)} 34%, ${alpha(
            theme.palette.warning.main,
            0.92,
          )} 68%, ${alpha(theme.palette.secondary.main, 0.9)} 100%)`,
          bauhausRail(theme, scale(controls.extravagance, 0.42, 0.72), 132),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        backgroundSize: `${Math.round(scale(controls.ctaPower, 170, 210))}% 170%, 100% 100%`,
        backgroundPosition: "0% 50%, 0 0",
        boxShadow: [
          bauhausShadow(
            theme,
            controls,
            "elevated",
            theme.palette.warning.main,
          ),
          `0 0 ${Math.round(scale(controls.ctaPower, 22, 38))}px ${alpha(
            theme.palette.primary.main,
            scale(controls.ctaPower, 0.22, 0.36),
          )}`,
          `inset 0 1px 0 ${alpha(theme.palette.common.white, 0.36)}`,
          `inset 0 -1px 0 ${alpha(theme.palette.primary.dark, 0.18)}`,
        ].join(", "),
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translate(-2px, -2px)",
            backgroundPosition: "100% 50%, 0 0",
            boxShadow: [
              bauhausShadow(
                theme,
                controls,
                "overlay",
                theme.palette.secondary.main,
              ),
              `0 0 ${Math.round(scale(controls.ctaPower, 30, 46))}px ${alpha(
                theme.palette.primary.main,
                scale(controls.ctaPower, 0.24, 0.42),
              )}`,
            ].join(", "),
          },
        },
        "&.Mui-focusVisible": {
          boxShadow: [
            bauhausShadow(
              theme,
              controls,
              "overlay",
              theme.palette.warning.main,
            ),
            bauhausFocusRing(theme, controls, 4),
          ].join(", "),
        },
        "&.bh-showcase-cta, &[data-bh-tone='showcase']": {
          backgroundSize: `${Math.round(scale(controls.ctaPower, 210, 250))}% 180%, 100% 100%`,
          boxShadow: [
            bauhausShadow(
              theme,
              controls,
              "overlay",
              theme.palette.secondary.main,
            ),
            `0 0 ${Math.round(scale(controls.ctaPower, 36, 56))}px ${alpha(
              theme.palette.primary.main,
              scale(controls.ctaPower, 0.28, 0.44),
            )}`,
            `0 0 ${Math.round(scale(controls.extravagance, 20, 36))}px ${alpha(
              theme.palette.secondary.main,
              scale(controls.extravagance, 0.12, 0.22),
            )}`,
          ].join(", "),
        },
        "&.Mui-disabled": {
          color: alpha(theme.palette.primary.contrastText, 0.62),
          backgroundImage: [
            `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.28,
            )} 0%, ${alpha(theme.palette.warning.main, 0.22)} 100%)`,
            bauhausRail(theme, 0.18, 132),
          ].join(", "),
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
          )} 0%, ${alpha(theme.palette.secondary.main, 0.96)} 60%, ${alpha(
            theme.palette.warning.main,
            0.88,
          )} 100%)`,
          bauhausRail(theme, 0.26, 132),
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
            transform: "translate(-2px, -2px)",
            boxShadow: bauhausShadow(
              theme,
              controls,
              "elevated",
              theme.palette.warning.main,
            ),
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
          bauhausRail(theme, scale(controls.extravagance, 0.22, 0.36), 132),
        ].join(", "),
        backgroundOrigin: "padding-box, border-box",
        backgroundClip: "padding-box, border-box",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        "@media (hover: hover)": {
          "&:hover": {
            transform: "translate(-1px, -1px)",
            boxShadow: bauhausShadow(
              theme,
              controls,
              "surface",
              theme.palette.warning.main,
            ),
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
        ...createCompactLabelStyle({
          letterSpacing: "0.03em",
        }),
        color: theme.palette.text.primary,
        backgroundColor: alpha(theme.palette.background.paper, 0.86),
        backgroundImage: [
          `linear-gradient(150deg, ${alpha(
            theme.palette.background.paper,
            0.94,
          )} 0%, ${alpha(theme.palette.background.paper, 0.78)} 74%, ${alpha(
            theme.palette.warning.main,
            scale(controls.extravagance, 0.08, 0.14),
          )} 100%)`,
          bauhausRail(theme, scale(controls.extravagance, 0.2, 0.34), 132),
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
        fontWeight: 700,
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
        ...createCompactLabelStyle({
          letterSpacing: "0.03em",
        }),
        color: alpha(theme.palette.text.primary, 0.76),
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
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(bauhausInk(theme), 0.16),
          borderWidth: 2,
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
        ...createCompactLabelStyle({
          letterSpacing: "0.04em",
        }),
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
      }),
      switchBase: ({ theme }) => ({
        "&.Mui-checked": {
          color: theme.palette.secondary.main,
          "& + .MuiSwitch-track": {
            backgroundImage: bauhausRail(theme, 0.42, 90),
            opacity: 1,
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
        "&::before": {
          content: '""',
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
          backgroundColor: alpha(theme.palette.warning.main, 0.12),
        },
      }),
      content: {
        margin: 0,
        "& .MuiTypography-root": {
          ...createCompactLabelStyle({
            letterSpacing: "0.04em",
          }),
        },
      },
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) =>
        bauhausSurface(theme, controls, {
          level: "elevated",
          radius: "26px 12px 26px 12px",
          accent: theme.palette.warning.main,
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
        ...createCompactLabelStyle({
          letterSpacing: "0.03em",
        }),
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
      paper: ({ theme }) =>
        bauhausSurface(theme, controls, {
          level: "overlay",
          radius: "34px 14px 34px 14px",
          accent: theme.palette.warning.main,
        }),
    },
  },
});

export const bauhausOps = {
  name: "Bauhaus Ops",
  direction: "ltr",
  palette: {
    mode: "light",
    primary: {
      main: "#0057FF",
      dark: "#003FDB",
      light: "#6D92FF",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF4A1C",
      dark: "#DA3310",
      light: "#FF8A6A",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFD500",
      dark: "#D9B500",
      light: "#FFE56B",
      contrastText: "#111114",
    },
    info: {
      main: "#00B7C3",
      dark: "#008C97",
      light: "#63D6DE",
      contrastText: "#081112",
    },
    success: {
      main: "#00C16A",
      dark: "#009A53",
      light: "#63DEA1",
      contrastText: "#06110A",
    },
    error: {
      main: "#111114",
      dark: "#09090B",
      light: "#2B2B32",
      contrastText: "#FFFFFF",
    },
    background: { default: "#F3ECDD", paper: "#FFFDF8" },
    text: {
      primary: "#111114",
      secondary: alpha("#111114", 0.74),
      disabled: alpha("#111114", 0.4),
    },
    divider: alpha("#111114", 0.18),
    action: {
      hover: alpha("#0057FF", 0.08),
      selected: alpha("#FF4A1C", 0.12),
      focus: alpha("#FFD500", 0.22),
      active: alpha("#111114", 0.74),
      disabled: alpha("#111114", 0.3),
      disabledBackground: alpha("#111114", 0.08),
    },
  },
  typography,
  shape: { borderRadius: 8 },
  spacing: 8,
  components: createComponents(lightControls),
} satisfies NamedThemeOptions;

export const bauhausOpsNight = {
  ...bauhausOps,
  name: "Bauhaus Ops (Night)",
  palette: {
    ...bauhausOps.palette,
    mode: "dark",
    primary: {
      main: "#7A97FF",
      dark: "#5473F5",
      light: "#AEBEFF",
      contrastText: "#09101D",
    },
    secondary: {
      main: "#FF7B57",
      dark: "#EB5D35",
      light: "#FFB19B",
      contrastText: "#130B08",
    },
    warning: {
      main: "#FFD86A",
      dark: "#E0B94B",
      light: "#FFE7A2",
      contrastText: "#130F07",
    },
    info: {
      main: "#4FD9D4",
      dark: "#27B9B3",
      light: "#8BEDEA",
      contrastText: "#061112",
    },
    background: { default: "#08101B", paper: "#101A2A" },
    text: {
      primary: "#F8F1E5",
      secondary: alpha("#F8F1E5", 0.8),
      disabled: alpha("#F8F1E5", 0.42),
    },
    divider: alpha("#F8F1E5", 0.2),
    action: {
      hover: alpha("#7A97FF", 0.14),
      selected: alpha("#FF7B57", 0.16),
      focus: alpha("#FFD86A", 0.24),
      active: alpha("#F8F1E5", 0.74),
      disabled: alpha("#F8F1E5", 0.32),
      disabledBackground: alpha("#F8F1E5", 0.08),
    },
  },
  components: createComponents(darkControls),
} satisfies NamedThemeOptions;
