import { alpha } from "@mui/material/styles";

import { brandNeonMotion } from "./brandNeonMotion";

import type { ThemePreset } from "@/models/themePresets";
import type { Theme, ThemeOptions } from "@mui/material/styles";

type SurfaceLevel = "surface" | "elevated" | "overlay";

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const asObject = (value: unknown): Record<string, unknown> =>
  isPlainObject(value) ? value : {};

const mergeStyleOverrides = (base: unknown, next: unknown): unknown => {
  if (base == null) {
    return next;
  }
  if (next == null) {
    return base;
  }

  if (typeof base === "function" || typeof next === "function") {
    return (props: unknown) =>
      mergeStyleOverrides(
        typeof base === "function" ? base(props) : base,
        typeof next === "function" ? next(props) : next,
      );
  }

  if (isPlainObject(base) && isPlainObject(next)) {
    const merged: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(next)) {
      merged[key] = mergeStyleOverrides(base[key], value);
    }
    return merged;
  }

  return next;
};

const mergeComponentEntry = (
  base: Record<string, unknown> | undefined,
  next: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined => {
  if (!base) {
    return next;
  }
  if (!next) {
    return base;
  }

  const baseVariants = Array.isArray(base.variants) ? base.variants : [];
  const nextVariants = Array.isArray(next.variants) ? next.variants : [];

  return {
    ...base,
    ...next,
    defaultProps: {
      ...(isPlainObject(base.defaultProps) ? base.defaultProps : {}),
      ...(isPlainObject(next.defaultProps) ? next.defaultProps : {}),
    },
    styleOverrides: mergeStyleOverrides(
      base.styleOverrides,
      next.styleOverrides,
    ),
    variants: [...baseVariants, ...nextVariants],
  };
};

const mergeComponents = (
  base: ThemeOptions["components"],
  next: ThemeOptions["components"],
): ThemeOptions["components"] => {
  const baseMap = (base ?? {}) as Record<string, Record<string, unknown>>;
  const nextMap = (next ?? {}) as Record<string, Record<string, unknown>>;
  const merged: Record<string, Record<string, unknown>> = { ...baseMap };

  for (const [key, value] of Object.entries(nextMap)) {
    merged[key] = mergeComponentEntry(baseMap[key], value) ?? value;
  }

  return merged as ThemeOptions["components"];
};

const strongFocusRing = (theme: Theme, accent = theme.palette.primary.main) =>
  [
    `0 0 0 2px ${alpha(theme.palette.background.default, theme.palette.mode === "dark" ? 0.96 : 0.98)}`,
    `0 0 0 5px ${alpha(accent, theme.palette.mode === "dark" ? 0.26 : 0.18)}`,
  ].join(", ");

const strongShadow = (
  theme: Theme,
  level: SurfaceLevel,
  accent = theme.palette.primary.main,
) => {
  const isDark = theme.palette.mode === "dark";
  const y = level === "overlay" ? 24 : level === "elevated" ? 18 : 12;
  const blur = level === "overlay" ? 48 : level === "elevated" ? 34 : 24;

  return [
    `0 0 0 1px ${alpha(theme.palette.text.primary, isDark ? 0.14 : 0.08)} inset`,
    `0 ${y}px ${blur}px ${alpha("#000000", isDark ? 0.28 : 0.12)}`,
    `0 0 0 1px ${alpha(accent, isDark ? 0.12 : 0.08)}`,
  ].join(", ");
};

const strongSurface = (
  theme: Theme,
  level: SurfaceLevel,
  accent = theme.palette.primary.main,
  radiusOffset = 0,
) => {
  const isDark = theme.palette.mode === "dark";
  const radius = Number(theme.shape.borderRadius) + radiusOffset;
  const blur = level === "overlay" ? 10 : level === "elevated" ? 7 : 4;
  const fillAlpha =
    level === "overlay"
      ? isDark
        ? 0.94
        : 0.985
      : level === "elevated"
        ? isDark
          ? 0.9
          : 0.97
        : isDark
          ? 0.88
          : 0.95;

  return {
    position: "relative" as const,
    overflow: "hidden" as const,
    borderRadius: radius,
    border: `1px solid ${alpha(theme.palette.text.primary, isDark ? 0.18 : 0.12)}`,
    backgroundColor: alpha(theme.palette.background.paper, fillAlpha),
    backgroundImage: [
      `linear-gradient(180deg, ${alpha(theme.palette.common.white, isDark ? 0.05 : 0.22)} 0%, transparent 18%)`,
      `linear-gradient(120deg, ${alpha(accent, isDark ? 0.08 : 0.05)} 0%, transparent 48%, ${alpha(
        theme.palette.info.main,
        isDark ? 0.05 : 0.03,
      )} 100%)`,
    ].join(", "),
    backgroundSize: "100% 100%",
    backgroundPosition: "0 0",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "padding-box",
    backgroundClip: "padding-box",
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    boxShadow: strongShadow(theme, level, accent),
    "&::before": {
      content: '""',
      position: "absolute" as const,
      insetInline: 0,
      top: 0,
      height: level === "overlay" ? 2 : 1,
      backgroundImage: `linear-gradient(90deg, ${alpha(accent, 0.84)} 0%, ${alpha(
        theme.palette.info.main,
        0.48,
      )} 54%, transparent 100%)`,
      opacity: level === "surface" ? 0.6 : 0.8,
      pointerEvents: "none" as const,
    },
    "&::after": {
      display: "none",
    },
    "@media (hover: none), (pointer: coarse), (max-width: 900px)": {
      backdropFilter: `blur(${Math.max(2, Math.round(blur * 0.6))}px)`,
      WebkitBackdropFilter: `blur(${Math.max(2, Math.round(blur * 0.6))}px)`,
    },
  };
};

const createStrongTypography = (
  base: ThemeOptions["typography"],
): ThemeOptions["typography"] => {
  const current = (base ?? {}) as Record<string, Record<string, unknown>>;

  return {
    ...current,
    h1: {
      ...asObject(current.h1),
      fontSize: "clamp(2.8rem, 4.7vw, 4rem)",
      lineHeight: 1.02,
      letterSpacing: "-0.022em",
    },
    h2: {
      ...asObject(current.h2),
      fontSize: "clamp(1.9rem, 3vw, 2.85rem)",
      lineHeight: 1.06,
      letterSpacing: "-0.016em",
    },
    h3: {
      ...asObject(current.h3),
      fontSize: "clamp(1.22rem, 1.9vw, 1.68rem)",
      lineHeight: 1.16,
      letterSpacing: "-0.01em",
    },
    subtitle1: {
      ...asObject(current.subtitle1),
      fontWeight: 620,
      letterSpacing: "0.002em",
    },
    subtitle2: {
      ...asObject(current.subtitle2),
      fontWeight: 680,
      letterSpacing: "0.08em",
    },
    body1: {
      ...asObject(current.body1),
      lineHeight: 1.68,
    },
    body2: {
      ...asObject(current.body2),
      lineHeight: 1.6,
    },
    button: {
      ...asObject(current.button),
      fontWeight: 700,
      letterSpacing: "0.03em",
      textTransform: "none",
    },
    overline: {
      ...asObject(current.overline),
      fontWeight: 700,
      letterSpacing: "0.14em",
    },
  } as ThemeOptions["typography"];
};

const createStrongPalette = (
  base: ThemeOptions["palette"],
  scheme: "light" | "dark",
): ThemeOptions["palette"] => {
  const isDark = scheme === "dark";
  const primaryMain =
    (base?.primary as { main?: string } | undefined)?.main ?? "#00D2FF";
  const textPrimary = isDark ? "#FFFFFF" : "#0C141C";

  return {
    ...asObject(base),
    background: {
      ...asObject(base?.background),
      default: isDark ? "#050C13" : "#EDF4FB",
      paper: isDark ? "#0A1722" : "#F8FBFF",
    },
    text: {
      ...asObject(base?.text),
      primary: base?.text?.primary ?? textPrimary,
      secondary: alpha(textPrimary, isDark ? 0.78 : 0.76),
      disabled: alpha(textPrimary, isDark ? 0.42 : 0.4),
    },
    divider: alpha(textPrimary, isDark ? 0.18 : 0.16),
    action: {
      ...asObject(base?.action),
      hover: alpha(primaryMain, isDark ? 0.1 : 0.06),
      selected: alpha(primaryMain, isDark ? 0.16 : 0.11),
      focus: alpha(primaryMain, isDark ? 0.22 : 0.17),
      active: alpha(textPrimary, isDark ? 0.62 : 0.56),
      disabled: alpha(textPrimary, isDark ? 0.32 : 0.3),
      disabledBackground: alpha(textPrimary, isDark ? 0.08 : 0.05),
    },
  };
};

const createStrongComponents = (
  base: ThemeOptions["components"],
): ThemeOptions["components"] =>
  mergeComponents(base, {
    MuiCssBaseline: {
      styleOverrides: (theme: Theme) => ({
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          backgroundImage: [
            `radial-gradient(760px 420px at 12% 0%, ${alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.12 : 0.08,
            )} 0%, transparent 62%)`,
            `radial-gradient(620px 340px at 88% 8%, ${alpha(
              theme.palette.info.main,
              theme.palette.mode === "dark" ? 0.08 : 0.05,
            )} 0%, transparent 60%)`,
            `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.96)} 0%, ${theme.palette.background.default} 100%)`,
          ].join(", "),
          backgroundAttachment: "scroll",
        },
        "body::before": {
          width: "24vw",
          minWidth: 180,
          maxWidth: 360,
          height: 6,
          insetBlockStart: "8vh",
          opacity: 0.5,
          filter: "blur(4px)",
          transform: "none",
          animation: "none",
        },
        "body::after": {
          width: "26vw",
          height: "26vw",
          insetInlineEnd: "-6vw",
          insetBlockEnd: "-8vh",
          opacity: theme.palette.mode === "dark" ? 0.42 : 0.24,
          filter: "blur(36px)",
          animation: "none",
        },
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animation: "none !important",
            transitionDuration: "0.01ms !important",
            scrollBehavior: "auto !important",
          },
        },
      }),
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          "&.MuiTypography-h1, &.MuiTypography-h2": {
            backgroundImage: `linear-gradient(180deg, transparent 0%, transparent 76%, ${alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.14 : 0.1,
            )} 76%, ${alpha(theme.palette.info.main, theme.palette.mode === "dark" ? 0.12 : 0.08)} 100%)`,
            textShadow: "none",
          },
          "&.MuiTypography-h3": {
            textShadow: "none",
          },
          "&.MuiTypography-subtitle2, &.MuiTypography-overline": {
            textShadow: "none",
          },
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          ...strongSurface(theme, "elevated", theme.palette.primary.main, 10),
          borderRadius: Number(theme.shape.borderRadius) + 12,
          boxShadow: strongShadow(theme, "surface", theme.palette.primary.main),
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) =>
          strongSurface(theme, "surface", theme.palette.primary.main, 0),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          ...strongSurface(theme, "elevated", theme.palette.info.main, 12),
          transition: theme.transitions.create(["border-color", "box-shadow"], {
            duration: 160,
          }),
          "&:hover": {
            borderColor: alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.26 : 0.2,
            ),
            boxShadow: strongShadow(
              theme,
              "overlay",
              theme.palette.primary.main,
            ),
            transform: "none",
            backgroundPosition: "0 0",
          },
        }),
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderTop: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.12 : 0.08)}`,
          backgroundImage: `linear-gradient(90deg, transparent 0%, ${alpha(theme.palette.primary.main, 0.04)} 50%, transparent 100%)`,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          minHeight: 44,
          borderRadius: 18,
          transition: theme.transitions.create(
            ["transform", "box-shadow", "background-color", "border-color"],
            { duration: 140 },
          ),
          "&.Mui-focusVisible": {
            boxShadow: strongFocusRing(theme),
          },
        }),
        contained: ({ theme }: { theme: Theme }) => ({
          boxShadow: strongShadow(theme, "surface", theme.palette.primary.main),
          "@media (hover: hover)": {
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
        }),
        containedPrimary: ({ theme }: { theme: Theme }) => ({
          borderColor: alpha(
            theme.palette.text.primary,
            theme.palette.mode === "dark" ? 0.16 : 0.1,
          ),
          backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.98)} 0%, ${alpha(theme.palette.info.main, 0.9)} 100%)`,
          backgroundSize: "100% 100%",
          boxShadow: strongShadow(
            theme,
            "elevated",
            theme.palette.primary.main,
          ),
          textShadow: "none",
        }),
        containedSecondary: ({ theme }: { theme: Theme }) => ({
          backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.96)} 0%, ${alpha(theme.palette.warning.main, 0.88)} 100%)`,
          backgroundSize: "100% 100%",
          boxShadow: strongShadow(
            theme,
            "surface",
            theme.palette.secondary.main,
          ),
        }),
        outlined: ({ theme }: { theme: Theme }) => ({
          borderColor: alpha(
            theme.palette.text.primary,
            theme.palette.mode === "dark" ? 0.18 : 0.12,
          ),
          backgroundImage: "none",
          backgroundColor: alpha(
            theme.palette.background.paper,
            theme.palette.mode === "dark" ? 0.88 : 0.94,
          ),
          boxShadow: "none",
        }),
        outlinedPrimary: ({ theme }: { theme: Theme }) => ({
          borderColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === "dark" ? 0.34 : 0.26,
          ),
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.12 : 0.08)}`,
        }),
        text: ({ theme }: { theme: Theme }) => ({
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          ...strongSurface(theme, "surface", theme.palette.primary.main, 2),
          minHeight: 48,
          padding: theme.spacing(0.5),
          borderRadius: Number(theme.shape.borderRadius) + 4,
        }),
        indicator: ({ theme }: { theme: Theme }) => ({
          height: 3,
          top: "auto",
          bottom: 4,
          borderRadius: 999,
          backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
          boxShadow: "none",
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          minHeight: 40,
          borderRadius: 14,
          color: alpha(theme.palette.text.primary, 0.76),
          textShadow: "none",
          "&.Mui-selected": {
            color: theme.palette.text.primary,
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.16 : 0.12,
            ),
            boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.2 : 0.14)}`,
            textShadow: "none",
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderRadius: Number(theme.shape.borderRadius),
          backgroundImage: "none",
          backgroundColor: alpha(
            theme.palette.background.paper,
            theme.palette.mode === "dark" ? 0.88 : 0.96,
          ),
          boxShadow: `inset 0 1px 0 ${alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.04 : 0.24)}`,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(
              theme.palette.text.primary,
              theme.palette.mode === "dark" ? 0.22 : 0.16,
            ),
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.32 : 0.24,
            ),
          },
          "&.Mui-focused": {
            boxShadow: strongFocusRing(theme),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
          },
        }),
        input: ({ theme }: { theme: Theme }) => ({
          "::placeholder": {
            color: alpha(theme.palette.text.primary, 0.52),
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          color: alpha(theme.palette.text.secondary, 0.96),
        }),
      },
    },
    MuiSwitch: {
      styleOverrides: {
        thumb: ({ theme }: { theme: Theme }) => ({
          border: `2px solid ${alpha(theme.palette.primary.main, 0.24)}`,
          boxShadow: `0 4px 12px ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.18 : 0.1)}`,
        }),
        track: ({ theme }: { theme: Theme }) => ({
          borderColor: alpha(
            theme.palette.text.primary,
            theme.palette.mode === "dark" ? 0.18 : 0.12,
          ),
          backgroundImage: "none",
          backgroundColor: alpha(
            theme.palette.text.primary,
            theme.palette.mode === "dark" ? 0.18 : 0.12,
          ),
        }),
      },
    },
    MuiSlider: {
      styleOverrides: {
        rail: ({ theme }: { theme: Theme }) => ({
          opacity: 1,
          backgroundColor: alpha(
            theme.palette.text.primary,
            theme.palette.mode === "dark" ? 0.18 : 0.12,
          ),
        }),
        track: ({ theme }: { theme: Theme }) => ({
          border: "none",
          backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
        }),
        thumb: ({ theme }: { theme: Theme }) => ({
          boxShadow: `0 0 0 4px ${alpha(theme.palette.background.default, theme.palette.mode === "dark" ? 0.92 : 0.96)}, 0 0 0 6px ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.22 : 0.14)}`,
        }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          backgroundImage: `linear-gradient(90deg, transparent 0%, ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.36 : 0.22)} 50%, transparent 100%)`,
          boxShadow: "none",
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          transition: theme.transitions.create(
            ["background-color", "box-shadow", "border-color"],
            { duration: 120 },
          ),
          "@media (hover: hover)": {
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              transform: "none",
            },
          },
          "&.Mui-selected": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.18 : 0.12,
            ),
            boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.18 : 0.12)}`,
          },
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }: { theme: Theme }) =>
          strongSurface(theme, "overlay", theme.palette.primary.main, 16),
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderTop: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.12 : 0.08)}`,
          backgroundImage: "none",
        }),
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          backgroundColor: alpha(
            theme.palette.background.default,
            theme.palette.mode === "dark" ? 0.82 : 0.68,
          ),
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }: { theme: Theme }) =>
          strongSurface(theme, "overlay", theme.palette.info.main, 8),
      },
    },
  });

const createStrongScheme = (
  base: ThemeOptions,
  scheme: "light" | "dark",
): ThemeOptions => ({
  ...base,
  palette: createStrongPalette(base.palette, scheme),
  typography: createStrongTypography(base.typography),
  components: createStrongComponents(base.components),
});

export const strongBrandNeonMotion: ThemePreset = {
  id: "strong-brand-neon-motion",
  label: "Strong Brand Neon Motion",
  description:
    "Structured neon landing preset with restrained atmosphere, stronger surfaces, explicit states, and lower motion noise",
  tags: ["brand", "neon", "strong", "landing", "structured", "motion"],
  version: "1.0.0",
  colorSchemes: {
    light: createStrongScheme(brandNeonMotion.colorSchemes.light, "light"),
    dark: createStrongScheme(brandNeonMotion.colorSchemes.dark, "dark"),
  },
};
