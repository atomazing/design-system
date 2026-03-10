import { alpha } from "@mui/material/styles";

import type { NamedThemeOptions } from "@/models/appSettings";
import type { Theme, ThemeOptions } from "@mui/material/styles";

/**
 * Acid Editorial — Landing preset
 * Visual: editorial “gloss” + acid inserts. Big poster headlines, magazine whitespace,
 * marker highlights, collage accents. Bold but readable for B2B.
 * Philosophy: «Платформа — это манифест подхода. Мы продаём не фичи, а новый стандарт разработки.»
 */

const FONT_DISPLAY =
  'var(--font-acid-display),"Source Sans 3","IBM Plex Sans","Inter","Roboto","Helvetica","Arial",sans-serif';
const FONT_EDITORIAL =
  'var(--font-acid-editorial),"Source Serif 4","Literata","Noto Serif","Georgia","Times New Roman",serif';
const FONT_TEXT =
  'var(--font-acid-text),"Golos Text","Source Sans 3","IBM Plex Sans","Inter","Roboto","Helvetica","Arial",sans-serif';
const FONT_MONO =
  'var(--font-acid-mono),"IBM Plex Mono","JetBrains Mono","Roboto Mono","Menlo","Consolas",monospace';

const ACID_CONTROLS = {
  luxuryLevel: 0.82,
  extravagance: 0.68,
  heroDrama: 0.72,
  ctaPower: 0.84,
  motionPolish: 0.62,
  blurBudget: 0.38,
} as const;

const mix = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

const typography = {
  fontFamily: FONT_TEXT,

  // Editorial scale (landing): dramatic but still comfortable for Cyrillic.
  h1: {
    fontFamily: FONT_EDITORIAL,
    fontWeight: 800,
    fontSize: "clamp(2.5rem, 4.9vw, 4.2rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.025em",
  },
  h2: {
    fontFamily: FONT_EDITORIAL,
    fontWeight: 780,
    fontSize: "clamp(1.8rem, 3.3vw, 2.75rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.018em",
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    fontSize: "clamp(1.28rem, 2.1vw, 1.75rem)",
    lineHeight: 1.18,
    letterSpacing: "-0.012em",
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 700,
    fontSize: "1.16rem",
    lineHeight: 1.3,
    letterSpacing: "-0.006em",
  },

  subtitle1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 650,
    fontSize: "1.05rem",
    lineHeight: 1.62,
    letterSpacing: "-0.004em",
  },
  subtitle2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 650,
    fontSize: "0.95rem",
    lineHeight: 1.58,
    letterSpacing: "0",
  },

  body1: {
    fontFamily: FONT_TEXT,
    fontWeight: 400,
    fontSize: "1.02rem",
    lineHeight: 1.82,
    letterSpacing: "0",
  },
  body2: {
    fontFamily: FONT_TEXT,
    fontWeight: 400,
    fontSize: "0.94rem",
    lineHeight: 1.72,
    letterSpacing: "0",
  },

  button: {
    fontFamily: FONT_DISPLAY,
    textTransform: "none",
    fontWeight: 700,
    letterSpacing: "0.02em",
  },

  caption: {
    fontFamily: FONT_TEXT,
    fontSize: "0.84rem",
    lineHeight: 1.55,
    letterSpacing: "0.005em",
  },
  overline: {
    fontFamily: FONT_DISPLAY,
    fontSize: "0.76rem",
    lineHeight: 1.4,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 700,
  },
} as const;

const ink = (theme: Theme): string =>
  theme.palette.mode === "dark"
    ? theme.palette.common.white
    : theme.palette.common.black;

const printShadow = (theme: Theme, dx = 10, dy = 10) =>
  `${dx}px ${dy}px 0 ${alpha(
    ink(theme),
    theme.palette.mode === "dark"
      ? mix(0.28, 0.4, ACID_CONTROLS.luxuryLevel)
      : mix(0.14, 0.22, ACID_CONTROLS.luxuryLevel),
  )}`;

const printStroke = (theme: Theme, opacity = 0.14, width = 2) =>
  `${width}px solid ${alpha(ink(theme), opacity)}`;

const acidRail = (
  theme: Theme,
  opts?: {
    primaryOpacity?: number;
    secondaryOpacity?: number;
    infoOpacity?: number;
  },
) =>
  `linear-gradient(90deg,
    ${alpha(theme.palette.primary.main, opts?.primaryOpacity ?? 0.88)} 0%,
    ${alpha(theme.palette.primary.main, opts?.primaryOpacity ?? 0.88)} 42%,
    ${alpha(theme.palette.secondary.main, opts?.secondaryOpacity ?? 0.92)} 42%,
    ${alpha(theme.palette.secondary.main, opts?.secondaryOpacity ?? 0.92)} 76%,
    ${alpha(theme.palette.info.main, opts?.infoOpacity ?? 0.82)} 76%,
    ${alpha(theme.palette.info.main, opts?.infoOpacity ?? 0.82)} 100%)`;

const editorialCard = (theme: Theme, opts?: { radius?: number }) => {
  const radius = opts?.radius ?? Number(theme.shape.borderRadius) + 16;

  return {
    position: "relative" as const,
    borderRadius: radius,
    overflow: "hidden" as const,
    backgroundImage: "none",
    backgroundColor: theme.palette.background.paper,
    border: printStroke(theme, 0.14, 2),
    boxShadow: `${printShadow(theme, 12, 12)}, inset 0 1px 0 ${alpha(
      theme.palette.common.white,
      theme.palette.mode === "dark" ? 0.08 : 0.42,
    )}`,
    transition: theme.transitions.create(["transform", "box-shadow"], {
      duration: theme.transitions.duration.shorter,
    }),

    // Acid rail: the recurring signature motif across landing surfaces.
    "&::before": {
      content: '""',
      position: "absolute" as const,
      insetInline: 20,
      insetBlockStart: 14,
      height: 4,
      borderRadius: 999,
      background: acidRail(theme),
      boxShadow: `0 0 0 1px ${alpha(ink(theme), 0.08)}`,
      opacity: mix(0.72, 0.92, ACID_CONTROLS.extravagance),
      pointerEvents: "none" as const,
    },

    "&:hover": {
      transform: "translate(-2px, -2px)",
      boxShadow: `${printShadow(theme, 14, 14)}, inset 0 1px 0 ${alpha(
        theme.palette.common.white,
        theme.palette.mode === "dark" ? 0.1 : 0.5,
      )}`,
    },
  };
};

const createComponents = (): ThemeOptions["components"] => ({
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      "@keyframes aeDrift": {
        "0%": {
          transform: "translate3d(0, 0, 0) rotate(-12deg)",
          opacity: 0.16,
        },
        "50%": {
          transform: "translate3d(2%, -2%, 0) rotate(-10deg)",
          opacity: 0.22,
        },
        "100%": {
          transform: "translate3d(0, 0, 0) rotate(-12deg)",
          opacity: 0.16,
        },
      },

      "*, *::before, *::after": { boxSizing: "border-box" },

      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontKerning: "normal",
        overflowX: "clip",

        // Editorial paper + collage accents (CSS-only)
        backgroundImage: [
          `radial-gradient(900px 520px at 14% 8%, ${alpha(
            theme.palette.secondary.main,
            mix(0.1, 0.16, ACID_CONTROLS.heroDrama),
          )} 0%, transparent 62%)`,
          `radial-gradient(900px 520px at 86% 12%, ${alpha(
            theme.palette.info.main,
            mix(0.08, 0.14, ACID_CONTROLS.heroDrama),
          )} 0%, transparent 64%)`,
          // “newsprint” micro texture
          `repeating-linear-gradient(0deg, ${alpha(
            theme.palette.common.black,
            0.02,
          )} 0px, transparent 1px, transparent 4px)`,
          // Single off-axis collage band on the right side.
          `linear-gradient(118deg,
            transparent 0%,
            transparent 73.6%,
            ${alpha(theme.palette.info.main, 0.04)} 73.6%,
            ${alpha(theme.palette.info.main, 0.04)} 76.4%,
            transparent 76.4%,
            transparent 100%)`,
        ].join(", "),
        backgroundAttachment: "fixed",
        backgroundBlendMode: "normal, normal, multiply, normal",
      },

      // Slow “acidity” sweep (subtle, no flicker)
      "body::before": {
        content: '""',
        position: "fixed",
        left: "-6vw",
        top: "12vh",
        width: "30vw",
        maxWidth: 460,
        minWidth: 220,
        height: 128,
        borderRadius: 999,
        pointerEvents: "none",
        background: `linear-gradient(90deg,
          transparent 0%,
          ${alpha(theme.palette.secondary.main, 0.1)} 38.2%,
          ${alpha(theme.palette.secondary.main, 0.15)} 50%,
          transparent 61.8%)`,
        opacity: 0.14,
        mixBlendMode: "multiply",
        filter: `blur(${Math.round(mix(12, 22, ACID_CONTROLS.blurBudget))}px)`,
        transform: "translate3d(0, 0, 0) rotate(-12deg)",
        animation: "aeDrift 22s ease-in-out infinite",
      },

      "*::selection": {
        backgroundColor: alpha(theme.palette.secondary.main, 0.55),
        color: theme.palette.common.black,
      },

      a: {
        color: theme.palette.text.primary,
        textDecorationColor: alpha(theme.palette.text.primary, 0.85),
        textDecorationThickness: "3px",
        textUnderlineOffset: "3px",
      },

      code: { fontFamily: FONT_MONO },

      "@media (prefers-reduced-motion: reduce)": {
        "body::before": {
          animation: "none",
          transform: "none",
          filter: "blur(10px)",
        },
      },

      "@media (hover: none), (pointer: coarse), (max-width: 900px)": {
        body: {
          backgroundAttachment: "scroll",
          backgroundImage: [
            `radial-gradient(760px 420px at 18% 10%, ${alpha(
              theme.palette.secondary.main,
              0.1,
            )} 0%, transparent 62%)`,
            `radial-gradient(760px 420px at 82% 12%, ${alpha(
              theme.palette.info.main,
              0.08,
            )} 0%, transparent 64%)`,
          ].join(", "),
        },
        "body::before": {
          opacity: 0.1,
          width: "34vw",
          filter: "blur(12px)",
        },
      },
    }),
  },

  MuiContainer: {
    defaultProps: { maxWidth: "lg" },
    styleOverrides: {
      root: ({ theme }) => ({
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
        },
      }),
    },
  },

  MuiAppBar: {
    defaultProps: { color: "transparent" as const, elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        position: "relative",
        overflow: "hidden",
        backgroundColor: alpha(theme.palette.background.paper, 0.92),
        borderBottom: `2px solid ${alpha(theme.palette.common.black, 0.12)}`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        "&::before": {
          content: '""',
          position: "absolute",
          insetInline: theme.spacing(2.5),
          insetBlockEnd: 0,
          height: 3,
          borderRadius: 999,
          background: acidRail(theme, {
            primaryOpacity: 0.86,
            secondaryOpacity: 0.9,
            infoOpacity: 0.78,
          }),
          pointerEvents: "none",
        },
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: `linear-gradient(180deg,
          ${alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.98 : 0.99)} 0%,
          ${alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.94 : 0.96)} 100%)`,
        backgroundColor: alpha(theme.palette.background.paper, 0.96),
        borderRadius: Number(theme.shape.borderRadius) + 14,
        border: printStroke(theme, 0.12, 2),
        boxShadow: `${printShadow(theme, 10, 10)}, inset 0 1px 0 ${alpha(
          theme.palette.common.white,
          theme.palette.mode === "dark" ? 0.08 : 0.38,
        )}`,
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...editorialCard(theme, {
          radius: Number(theme.shape.borderRadius) + 18,
        }),
      }),
    },
  },

  MuiCardHeader: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(2.5),
        paddingTop: theme.spacing(2.5),
        paddingBottom: theme.spacing(1.5),
      }),
      title: () => ({
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        letterSpacing: "-0.01em",
        lineHeight: 1.18,
        textWrap: "balance",
      }),
      subheader: ({ theme }) => ({
        fontFamily: FONT_TEXT,
        color: alpha(theme.palette.text.secondary, 0.9),
        fontWeight: 600,
        maxInlineSize: "54ch",
        textWrap: "pretty",
      }),
      action: ({ theme }) => ({
        marginTop: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
      }),
    },
  },

  MuiCardContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(2.5),
        paddingBottom: theme.spacing(2.5),
      }),
    },
  },

  MuiCardActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(2.5),
        paddingTop: 0,
        paddingBottom: theme.spacing(2.5),
        gap: theme.spacing(1.25),
      }),
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Headline “marker highlight” (applies only to big headings)
        "&.MuiTypography-h1, &.MuiTypography-h2": {
          position: "relative",
          maxInlineSize: "15ch",
          textWrap: "balance",
          wordBreak: "normal",
          overflowWrap: "break-word",
          textShadow: `0 1px 0 ${alpha(theme.palette.background.default, 0.52)}`,
        },
        "&.MuiTypography-h1::after, &.MuiTypography-h2::after": {
          content: '""',
          position: "absolute",
          left: "-1%",
          right: "4%",
          bottom: "0.14em",
          height: "0.3em",
          background: `linear-gradient(90deg,
            ${alpha(theme.palette.secondary.main, 0.22)} 0%,
            ${alpha(theme.palette.secondary.main, 0.34)} 52%,
            ${alpha(theme.palette.info.main, 0.18)} 100%)`,
          zIndex: -1,
          transform: "skewX(-8deg)",
          borderRadius: 10,
          boxShadow: `0 0 0 2px ${alpha(ink(theme), 0.06)}`,
        },
        "&.MuiTypography-h3, &.MuiTypography-h4": {
          maxInlineSize: "24ch",
          textWrap: "balance",
        },
        "&.MuiTypography-subtitle1, &.MuiTypography-subtitle2": {
          maxInlineSize: "60ch",
          overflowWrap: "break-word",
        },
        "&.MuiTypography-body1, &.MuiTypography-body2": {
          maxInlineSize: "68ch",
          overflowWrap: "break-word",
        },
        "html[lang='ru'] &.MuiTypography-h1": {
          maxInlineSize: "18ch",
          lineHeight: 1.06,
          letterSpacing: "-0.018em",
        },
        "html[lang='ru'] &.MuiTypography-h2": {
          maxInlineSize: "20ch",
          lineHeight: 1.1,
          letterSpacing: "-0.014em",
        },
        "html[lang='ru'] &.MuiTypography-h3": {
          maxInlineSize: "26ch",
          lineHeight: 1.22,
        },
        "html[lang='ru'] &.MuiTypography-h1::after, html[lang='ru'] &.MuiTypography-h2::after": {
          left: 0,
          right: "8%",
          bottom: "0.1em",
          height: "0.24em",
          background: `linear-gradient(90deg,
            ${alpha(theme.palette.secondary.main, 0.18)} 0%,
            ${alpha(theme.palette.secondary.main, 0.28)} 58%,
            ${alpha(theme.palette.info.main, 0.14)} 100%)`,
        },
        "html[lang='ru'] &.MuiTypography-subtitle1, html[lang='ru'] &.MuiTypography-subtitle2, html[lang='ru'] &.MuiTypography-body1, html[lang='ru'] &.MuiTypography-body2": {
          hyphens: "auto",
          textWrap: "pretty",
        },

        // Inline code = editorial tag
        "& code": {
          fontFamily: FONT_MONO,
          fontSize: "0.95em",
          padding: "0.12em 0.42em",
          borderRadius: 12,
          backgroundColor: alpha(theme.palette.primary.main, 0.06),
          border: printStroke(theme, 0.12, 2),
        },
      }),
    },
  },

  MuiLink: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.primary,
        textDecorationColor: alpha(theme.palette.text.primary, 0.8),
        textDecorationThickness: "2px",
        textUnderlineOffset: "4px",
        transition: theme.transitions.create(
          ["color", "text-decoration-color", "background-color"],
          { duration: theme.transitions.duration.shorter },
        ),
        "&:hover": {
          color: theme.palette.primary.main,
          textDecorationColor: theme.palette.secondary.main,
          backgroundColor: alpha(theme.palette.secondary.main, 0.2),
        },
      }),
    },
  },

  MuiBreadcrumbs: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiBreadcrumbs-separator": {
          color: alpha(theme.palette.text.primary, 0.5),
          fontWeight: 800,
        },
        "& .MuiLink-root": {
          textDecoration: "none",
          borderBottom: `2px solid ${alpha(theme.palette.text.primary, 0.2)}`,
          "&:hover": {
            borderBottomColor: alpha(theme.palette.secondary.main, 0.9),
          },
        },
      }),
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 0,
        height: 3,
        backgroundImage: acidRail(theme, {
          primaryOpacity: 0.88,
          secondaryOpacity: 0.88,
          infoOpacity: 0.78,
        }),
        opacity: 0.75,
      }),
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 18,
        paddingInline: 24,
        paddingBlock: 13,
        minHeight: 50,
        minWidth: 0,
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        lineHeight: 1.15,
        textAlign: "center",
        whiteSpace: "normal",
        textWrap: "balance",
        overflowWrap: "anywhere",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        transition: theme.transitions.create(
          ["transform", "box-shadow", "background-color", "border-color", "background-position"],
          {
            duration: Math.round(
              mix(
                theme.transitions.duration.shorter,
                theme.transitions.duration.standard,
                ACID_CONTROLS.motionPolish,
              ),
            ),
          },
        ),
        "&.Mui-focusVisible": {
          boxShadow: `0 0 0 4px ${alpha(
            theme.palette.info.main,
            mix(0.18, 0.28, ACID_CONTROLS.ctaPower),
          )}`,
        },
        "html[lang='ru'] &": {
          fontWeight: 650,
          letterSpacing: "0.01em",
          lineHeight: 1.12,
        },
        "&:active": { transform: "translate(0,0)" },
      }),

      sizeLarge: {
        minHeight: 58,
        paddingInline: 28,
        paddingBlock: 15,
        fontSize: "1rem",
      },

      // Primary CTA: premium material with acid rail signature and restrained glow.
      containedPrimary: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        border: printStroke(theme, 0.14, 2),
        backgroundImage: `linear-gradient(135deg,
          ${theme.palette.primary.main} 0%,
          ${alpha(theme.palette.primary.main, 0.94)} 58%,
          ${alpha(
            theme.palette.secondary.main,
            mix(0.18, 0.32, ACID_CONTROLS.ctaPower),
          )} 100%)`,
        backgroundSize: `${Math.round(mix(160, 220, ACID_CONTROLS.ctaPower))}% 100%`,
        backgroundPosition: "0% 50%",
        boxShadow: `${printShadow(theme, 10, 10)}, 0 18px 44px ${alpha(
          theme.palette.secondary.main,
          mix(0.12, 0.22, ACID_CONTROLS.ctaPower),
        )}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.16)}`,

        "&::after": {
          content: '""',
          position: "absolute",
          insetInline: 14,
          insetBlockStart: 5,
          height: 1,
          background: `linear-gradient(90deg,
            ${alpha(theme.palette.common.white, 0.08)} 0%,
            ${alpha(theme.palette.common.white, 0.36)} 48%,
            ${alpha(theme.palette.info.main, 0.18)} 100%)`,
          borderRadius: 999,
          opacity: 0.95,
          pointerEvents: "none",
        },

        "&:hover": {
          transform: "translate(-2px,-2px)",
          backgroundPosition: "100% 50%",
          boxShadow: `${printShadow(theme, 12, 12)}, 0 22px 52px ${alpha(
            theme.palette.secondary.main,
            mix(0.16, 0.28, ACID_CONTROLS.ctaPower),
          )}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.2)}`,
        },
      }),

      // Secondary CTA: acid fill, black text
      containedSecondary: ({ theme }) => ({
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
        border: printStroke(theme, 0.14, 2),
        backgroundImage: `linear-gradient(135deg,
          ${alpha(theme.palette.secondary.light, 0.98)} 0%,
          ${alpha(theme.palette.secondary.main, 0.96)} 64%,
          ${alpha(theme.palette.info.light, 0.28)} 100%)`,
        boxShadow: `${printShadow(theme, 10, 10)}, 0 14px 34px ${alpha(
          theme.palette.secondary.main,
          0.18,
        )}`,
        "&:hover": {
          transform: "translate(-2px,-2px)",
          boxShadow: `${printShadow(theme, 12, 12)}, 0 18px 40px ${alpha(
            theme.palette.secondary.main,
            0.22,
          )}`,
        },
      }),

      // Outline: quiet material surface with acid response.
      outlinedPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderWidth: 2,
        borderColor: alpha(ink(theme), 0.18),
        backgroundColor: alpha(theme.palette.background.paper, 0.82),
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: `inset 0 1px 0 ${alpha(theme.palette.common.white, 0.32)}`,
        "&:hover": {
          transform: "translate(-1px,-1px)",
          backgroundColor: alpha(theme.palette.secondary.main, 0.12),
          borderColor: alpha(theme.palette.secondary.main, 0.46),
          boxShadow: `0 18px 54px ${alpha("#000", 0.14)}, inset 0 1px 0 ${alpha(
            theme.palette.common.white,
            0.38,
          )}`,
        },
      }),
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 12,
        backgroundColor: alpha(theme.palette.common.white, 0.7),
        border: printStroke(theme, 0.12, 2),
        boxShadow: `6px 6px 0 ${alpha(ink(theme), 0.12)}`,
        "&:hover": {
          transform: "translate(-1px,-1px)",
          backgroundColor: alpha(theme.palette.secondary.main, 0.16),
        },
      }),
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 16,
        fontFamily: FONT_DISPLAY,
        fontWeight: 650,
        letterSpacing: "0.015em",
        textTransform: "none",
        backgroundImage: `linear-gradient(135deg,
          ${alpha(theme.palette.background.paper, 0.88)} 0%,
          ${alpha(theme.palette.background.paper, 0.76)} 100%)`,
        backgroundColor: alpha(theme.palette.secondary.main, 0.12),
        color: theme.palette.text.primary,
        border: printStroke(theme, 0.12, 2),
        boxShadow: `${printShadow(theme, 6, 6)}, inset 0 1px 0 ${alpha(
          theme.palette.common.white,
          0.32,
        )}`,
      }),
      label: {
        paddingInline: 14,
        paddingBlock: 1,
        lineHeight: 1.25,
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: printStroke(theme, 0.2, 2),
        backgroundColor: alpha(theme.palette.secondary.main, 0.26),
        color: theme.palette.text.primary,
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
      }),
    },
  },

  MuiBadge: {
    styleOverrides: {
      badge: ({ theme }) => ({
        border: printStroke(theme, 0.14, 2),
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        fontFamily: FONT_DISPLAY,
        fontWeight: 650,
        letterSpacing: "0.02em",
        boxShadow: `4px 4px 0 ${alpha(ink(theme), 0.16)}`,
      }),
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        borderBottom: `2px solid ${alpha(theme.palette.common.black, 0.12)}`,
      }),
      indicator: ({ theme }) => ({
        height: 4,
        borderRadius: 999,
        backgroundColor: theme.palette.secondary.main,
      }),
    },
  },

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 46,
        fontFamily: FONT_DISPLAY,
        fontWeight: 650,
        letterSpacing: "0.01em",
        textTransform: "none",
        color: alpha(theme.palette.text.primary, 0.75),
        "&.Mui-selected": { color: theme.palette.text.primary },
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 14,
        color: theme.palette.text.primary,
        backgroundColor:
          theme.palette.mode === "dark"
            ? alpha(theme.palette.background.paper, 0.96)
            : alpha(theme.palette.common.white, 0.82),
        boxShadow: `0 8px 20px ${alpha(ink(theme), 0.05)}`,
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: alpha(ink(theme), 0.22),
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.secondary.main,
          boxShadow: `0 0 0 4px ${alpha(theme.palette.secondary.main, 0.18)}`,
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: alpha(ink(theme), 0.14),
        borderWidth: 2,
      }),
      input: { paddingBlock: 12 },
    },
  },

  MuiSelect: {
    styleOverrides: {
      icon: ({ theme }) => ({
        color: alpha(theme.palette.text.primary, 0.82),
      }),
      select: ({ theme }) => ({
        fontFamily: FONT_TEXT,
        fontWeight: 600,
        color: theme.palette.text.primary,
        backgroundColor: "transparent",
        WebkitTextFillColor: theme.palette.text.primary,
      }),
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontFamily: FONT_DISPLAY,
        fontWeight: 650,
        letterSpacing: "0.01em",
        textTransform: "none",
        color: alpha(theme.palette.text.secondary, 0.9),
        "&.Mui-focused": { color: theme.palette.text.primary },
      }),
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginTop: theme.spacing(0.75),
        color: alpha(theme.palette.text.secondary, 0.95),
        fontWeight: 600,
      }),
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,
        color: alpha(theme.palette.text.primary, 0.7),
        "&.Mui-checked": {
          color: theme.palette.primary.main,
        },
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.16),
        },
      }),
    },
  },

  MuiRadio: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: alpha(theme.palette.text.primary, 0.7),
        "&.Mui-checked": {
          color: theme.palette.primary.main,
        },
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.16),
        },
      }),
    },
  },

  MuiSwitch: {
    styleOverrides: {
      root: () => ({
        padding: 10,
      }),
      thumb: ({ theme }) => ({
        boxShadow: `0 0 0 2px ${alpha(ink(theme), 0.16)}`,
      }),
      track: ({ theme }) => ({
        borderRadius: 999,
        border: printStroke(theme, 0.2, 1),
        backgroundColor: alpha(ink(theme), 0.2),
        opacity: 1,
      }),
      switchBase: ({ theme }) => ({
        "&.Mui-checked": {
          color: theme.palette.secondary.main,
          "& + .MuiSwitch-track": {
            backgroundColor: alpha(theme.palette.secondary.main, 0.45),
            opacity: 1,
          },
        },
      }),
    },
  },

  MuiSlider: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.secondary.main,
        height: 8,
      }),
      rail: ({ theme }) => ({
        height: 8,
        opacity: 1,
        backgroundColor: alpha(ink(theme), 0.16),
      }),
      track: ({ theme }) => ({
        height: 8,
        border: "none",
        backgroundColor: theme.palette.secondary.main,
      }),
      thumb: ({ theme }) => ({
        width: 20,
        height: 20,
        borderRadius: 8,
        backgroundColor: theme.palette.background.paper,
        border: printStroke(theme, 0.18, 2),
        boxShadow: printShadow(theme, 4, 4),
      }),
      valueLabel: ({ theme }) => ({
        fontFamily: FONT_MONO,
        fontWeight: 700,
        backgroundColor: theme.palette.primary.main,
      }),
    },
  },

  MuiList: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingBlock: theme.spacing(1),
      }),
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderRadius: Number(theme.shape.borderRadius) + 10,
        marginInline: theme.spacing(1),
        marginBlock: theme.spacing(0.5),
        border: `1px solid ${alpha(ink(theme), 0.1)}`,
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.12),
        },
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.18),
          borderColor: alpha(theme.palette.secondary.main, 0.36),
        },
      }),
    },
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        minWidth: 36,
        color: alpha(theme.palette.text.primary, 0.75),
      }),
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        color: theme.palette.text.primary,
        isolation: "isolate",
        borderRadius: Number(theme.shape.borderRadius) + 14,
        backgroundImage: "none",
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : alpha(theme.palette.background.paper, 0.995),
        border: printStroke(theme, 0.14, 2),
        boxShadow: printShadow(theme, 12, 12),
        "&::before": {
          content: '""',
          position: "absolute",
          insetInline: 0,
          insetBlockStart: 0,
          height: 4,
          background: `linear-gradient(90deg,
            ${alpha(theme.palette.primary.main, 0.9)} 0%,
            ${alpha(theme.palette.primary.main, 0.9)} 52%,
            ${alpha(theme.palette.secondary.main, 0.9)} 52%,
            ${alpha(theme.palette.secondary.main, 0.9)} 100%)`,
          pointerEvents: "none",
        },
      }),
      list: ({ theme }) => ({
        padding: theme.spacing(1),
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderRadius: Number(theme.shape.borderRadius) + 10,
        marginInline: theme.spacing(0.75),
        marginBlock: theme.spacing(0.25),
        minHeight: 42,
        fontWeight: 700,
        transition: theme.transitions.create(
          ["background-color", "color", "box-shadow"],
          { duration: theme.transitions.duration.shorter },
        ),
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.14),
        },
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.22),
          color: theme.palette.text.primary,
          boxShadow: `0 0 0 1px ${alpha(theme.palette.secondary.main, 0.24)} inset`,
        },
        "&.Mui-selected:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.28),
        },
      }),
    },
  },

  MuiPopover: {
    styleOverrides: {
      paper: ({ theme }) => ({
        color: theme.palette.text.primary,
        isolation: "isolate",
        borderRadius: Number(theme.shape.borderRadius) + 14,
        backgroundImage: "none",
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : alpha(theme.palette.background.paper, 0.995),
        border: printStroke(theme, 0.14, 2),
        boxShadow: printShadow(theme, 12, 12),
      }),
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: 0,
        backgroundImage: "none",
        backgroundColor: alpha(theme.palette.background.paper, 0.98),
        borderRight: printStroke(theme, 0.14, 2),
      }),
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        ...editorialCard(theme, {
          radius: Number(theme.shape.borderRadius) + 22,
        }),
      }),
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(3),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(1.5),
        fontFamily: FONT_EDITORIAL,
        fontWeight: 780,
        letterSpacing: "-0.014em",
        lineHeight: 1.12,
        textWrap: "balance",
        maxInlineSize: "24ch",
      }),
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(3),
        paddingBottom: theme.spacing(2),
      }),
      dividers: ({ theme }) => ({
        borderTop: printStroke(theme, 0.1, 1),
        borderBottom: printStroke(theme, 0.1, 1),
      }),
    },
  },

  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        gap: theme.spacing(1.25),
      }),
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 12,
        border: printStroke(theme, 0.14, 2),
        boxShadow: printShadow(theme, 8, 8),
      }),
      standardSuccess: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.success.main, 0.14),
      }),
      standardWarning: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.warning.main, 0.16),
      }),
      standardError: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.error.main, 0.14),
      }),
      standardInfo: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.info.main, 0.14),
      }),
    },
  },

  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...editorialCard(theme, {
          radius: Number(theme.shape.borderRadius) + 16,
        }),
      }),
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: `linear-gradient(90deg, ${alpha(
          theme.palette.secondary.main,
          0.25,
        )}, ${alpha(theme.palette.info.main, 0.16)})`,
      }),
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.08),
        },
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }) => ({
        borderBottom: printStroke(theme, 0.14, 2),
        fontFamily: FONT_DISPLAY,
        fontWeight: 650,
        letterSpacing: "0.01em",
        textTransform: "none",
      }),
      body: ({ theme }) => ({
        borderBottom: `1px solid ${alpha(ink(theme), 0.08)}`,
      }),
    },
  },

  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 999,
        backgroundColor: alpha(ink(theme), 0.12),
      }),
      bar: ({ theme }) => ({
        borderRadius: 999,
        backgroundColor: theme.palette.secondary.main,
      }),
    },
  },

  MuiCircularProgress: {
    styleOverrides: {
      circle: () => ({
        strokeLinecap: "round",
      }),
    },
  },

  MuiSkeleton: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: alpha(ink(theme), 0.08),
      }),
    },
  },

  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 10,
        border: `1px solid ${alpha(ink(theme), 0.14)}`,
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.36),
          borderColor: alpha(theme.palette.secondary.main, 0.8),
        },
      }),
    },
  },

  MuiFab: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 14,
        border: printStroke(theme, 0.14, 2),
        boxShadow: printShadow(theme, 10, 10),
      }),
    },
  },

  MuiTooltip: {
    defaultProps: { arrow: true },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 14,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: printStroke(theme, 0.12, 2),
        boxShadow: printShadow(theme, 10, 10),
        fontSize: "0.84rem",
      }),
      arrow: ({ theme }) => ({
        color: theme.palette.background.paper,
      }),
    },
  },

  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...editorialCard(theme, {
          radius: Number(theme.shape.borderRadius) + 18,
        }),
        "&::before": { display: "none" },
      }),
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 58,
        paddingInline: theme.spacing(2.5),
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.12),
        },
      }),
      content: () => ({
        margin: 0,
        "& .MuiTypography-root": {
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          letterSpacing: "-0.006em",
        },
      }),
    },
  },

  MuiAccordionDetails: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingInline: theme.spacing(2.5),
        paddingBottom: theme.spacing(2.5),
        color: alpha(theme.palette.text.primary, 0.86),
      }),
    },
  },

  MuiSnackbarContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) + 16,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `2px solid ${alpha(theme.palette.common.black, 0.12)}`,
        boxShadow: printShadow(theme, 12, 12),
      }),
    },
  },
});

export const acidEditorial = {
  name: "Acid Editorial",
  direction: "ltr",

  palette: {
    mode: "light",

    // Ink primary (for CTAs, headings, etc.)
    primary: {
      main: "#0B0B0C",
      dark: "#070708",
      light: "#2A2A2E",
      contrastText: "#FFFFFF",
    },

    // Acid highlighter (signature)
    secondary: {
      main: "#B6FF00",
      dark: "#9FE600",
      light: "#D1FF66",
      contrastText: "#0B0B0C",
    },

    info: {
      main: "#00D1FF",
      dark: "#00A7CC",
      light: "#66E8FF",
      contrastText: "#061019",
    },

    success: {
      main: "#00C46A",
      dark: "#009E55",
      light: "#66E3A8",
      contrastText: "#05120C",
    },

    warning: {
      main: "#FF6A00",
      dark: "#D65400",
      light: "#FF9B57",
      contrastText: "#120B05",
    },

    error: {
      main: "#FF2D2D",
      dark: "#D61E1E",
      light: "#FF7A7A",
      contrastText: "#120505",
    },

    background: {
      default: "#F7F5EF", // warm paper
      paper: "#FFFFFF",
    },

    text: {
      primary: "#0B0B0C",
      secondary: alpha("#0B0B0C", 0.72),
      disabled: alpha("#0B0B0C", 0.38),
    },

    divider: alpha("#0B0B0C", 0.12),

    action: {
      hover: alpha("#B6FF00", 0.16),
      selected: alpha("#B6FF00", 0.22),
      focus: alpha("#00D1FF", 0.16),
      active: alpha("#0B0B0C", 0.72),
      disabled: alpha("#0B0B0C", 0.3),
      disabledBackground: alpha("#0B0B0C", 0.06),
    },
  },

  typography,

  shape: { borderRadius: 10 },
  spacing: 8,

  components: createComponents(),
} satisfies NamedThemeOptions;

// Optional night mode — editorial on dark paper (still “acid”).
// If you don’t need it — remove this export.
export const acidEditorialNight = {
  ...acidEditorial,
  name: "Acid Editorial (Night)",
  palette: {
    ...acidEditorial.palette,
    mode: "dark",
    background: {
      default: "#07070A",
      paper: "#0E0E12",
    },
    text: {
      primary: "#F7F5EF",
      secondary: alpha("#F7F5EF", 0.78),
      disabled: alpha("#F7F5EF", 0.42),
    },
    divider: alpha("#F7F5EF", 0.14),
    primary: {
      main: "#F7F5EF",
      dark: "#DAD6CC",
      light: "#FFFFFF",
      contrastText: "#0B0B0C",
    },
    action: {
      hover: alpha("#B6FF00", 0.12),
      selected: alpha("#B6FF00", 0.18),
      focus: alpha("#00D1FF", 0.18),
      active: alpha("#F7F5EF", 0.72),
      disabled: alpha("#F7F5EF", 0.3),
      disabledBackground: alpha("#F7F5EF", 0.08),
    },
  },
} satisfies NamedThemeOptions;
