import type {
  Components,
  Theme,
  TypographyVariantsOptions,
} from "@mui/material";

const BASE_FONT_SIZE = 16;
const pxToRem = (px: number) => `${px / BASE_FONT_SIZE}rem`;

/**
 * Mapping of custom typography variants to corresponding HTML elements.
 */
export const muiTypography: Components<Theme>["MuiTypography"] = {
  defaultProps: {
    variantMapping: {
      // TEXT REGULAR
      text_xl_regular: "p",
      text_lg_regular: "p",
      text_md_regular: "p",
      text_sm_regular: "p",
      text_xs_regular: "p",
      text_2xs_regular: "p",

      // TEXT BOLD
      text_xl_bold: "p",
      text_lg_bold: "p",
      text_md_bold: "p",
      text_sm_bold: "p",
      text_xs_bold: "p",
      text_2xs_bold: "p",

      // TEXT SEMIBOLD
      text_xl_semibold: "p",
      text_lg_semibold: "p",
      text_md_semibold: "p",
      text_sm_semibold: "p",
      text_xs_semibold: "p",
      text_2xs_semibold: "p",

      // TEXT THIN
      text_xl_thin: "p",
      text_lg_thin: "p",
      text_md_thin: "p",
      text_sm_thin: "p",
      text_xs_thin: "p",
      text_2xs_thin: "p",

      // HEADER REGULAR
      header_2xl_regular: "h1",
      header_xl_regular: "h2",
      header_lg_regular: "h3",
      header_md_regular: "h4",
      header_sm_regular: "h5",
      header_xs_regular: "h6",

      // DISPLAY BOLD
      header_2xl_bold: "h1",
      header_xl_bold: "h2",
      header_lg_bold: "h3",
      header_md_bold: "h4",
      header_sm_bold: "h5",
      header_xs_bold: "h6",

      // HEADER SEMIBOLD
      header_2xl_semibold: "h1",
      header_xl_semibold: "h2",
      header_lg_semibold: "h3",
      header_md_semibold: "h4",
      header_sm_semibold: "h5",
      header_xs_semibold: "h6",
    },
  },
};

/**
 * Custom typography variant definitions with adjusted display sizes.
 */
export const typographyVariants: TypographyVariantsOptions = {
  text_xl_regular: {
    fontWeight: 400,
    fontSize: pxToRem(20),
    lineHeight: pxToRem(30),
  },
  text_lg_regular: {
    fontWeight: 400,
    fontSize: pxToRem(18),
    lineHeight: pxToRem(28),
  },
  text_md_regular: {
    fontWeight: 400,
    fontSize: pxToRem(16),
    lineHeight: pxToRem(24),
  },
  text_sm_regular: {
    fontWeight: 400,
    fontSize: pxToRem(14),
    lineHeight: pxToRem(20),
  },
  text_xs_regular: {
    fontWeight: 400,
    fontSize: pxToRem(12),
    lineHeight: pxToRem(18),
  },
  text_2xs_regular: {
    fontWeight: 400,
    fontSize: pxToRem(10),
    lineHeight: pxToRem(14),
  },

  text_xl_bold: {
    fontWeight: 700,
    fontSize: pxToRem(20),
    lineHeight: pxToRem(30),
  },
  text_lg_bold: {
    fontWeight: 700,
    fontSize: pxToRem(18),
    lineHeight: pxToRem(28),
  },
  text_md_bold: {
    fontWeight: 700,
    fontSize: pxToRem(16),
    lineHeight: pxToRem(24),
  },
  text_sm_bold: {
    fontWeight: 700,
    fontSize: pxToRem(14),
    lineHeight: pxToRem(20),
  },
  text_xs_bold: {
    fontWeight: 700,
    fontSize: pxToRem(12),
    lineHeight: pxToRem(18),
  },
  text_2xs_bold: {
    fontWeight: 700,
    fontSize: pxToRem(10),
    lineHeight: pxToRem(14),
  },

  text_xl_semibold: {
    fontWeight: 600,
    fontSize: pxToRem(20),
    lineHeight: pxToRem(30),
  },
  text_lg_semibold: {
    fontWeight: 600,
    fontSize: pxToRem(18),
    lineHeight: pxToRem(28),
  },
  text_md_semibold: {
    fontWeight: 600,
    fontSize: pxToRem(16),
    lineHeight: pxToRem(24),
  },
  text_sm_semibold: {
    fontWeight: 600,
    fontSize: pxToRem(14),
    lineHeight: pxToRem(20),
  },
  text_xs_semibold: {
    fontWeight: 600,
    fontSize: pxToRem(12),
    lineHeight: pxToRem(18),
  },
  text_2xs_semibold: {
    fontWeight: 600,
    fontSize: pxToRem(10),
    lineHeight: pxToRem(14),
  },

  text_xl_thin: {
    fontWeight: 100,
    fontSize: pxToRem(20),
    lineHeight: pxToRem(30),
  },
  text_lg_thin: {
    fontWeight: 100,
    fontSize: pxToRem(18),
    lineHeight: pxToRem(28),
  },
  text_md_thin: {
    fontWeight: 100,
    fontSize: pxToRem(16),
    lineHeight: pxToRem(24),
  },
  text_sm_thin: {
    fontWeight: 100,
    fontSize: pxToRem(14),
    lineHeight: pxToRem(20),
  },
  text_xs_thin: {
    fontWeight: 100,
    fontSize: pxToRem(12),
    lineHeight: pxToRem(18),
  },
  text_2xs_thin: {
    fontWeight: 100,
    fontSize: pxToRem(10),
    lineHeight: pxToRem(14),
  },

  header_2xl_regular: {
    fontWeight: 400,
    fontSize: pxToRem(34),
    lineHeight: pxToRem(42),
  },
  header_xl_regular: {
    fontWeight: 400,
    fontSize: pxToRem(32),
    lineHeight: pxToRem(40),
  },
  header_lg_regular: {
    fontWeight: 400,
    fontSize: pxToRem(28),
    lineHeight: pxToRem(36),
  },
  header_md_regular: {
    fontWeight: 400,
    fontSize: pxToRem(24),
    lineHeight: pxToRem(32),
  },
  header_sm_regular: {
    fontWeight: 400,
    fontSize: pxToRem(20),
    lineHeight: pxToRem(28),
  },
  header_xs_regular: {
    fontWeight: 400,
    fontSize: pxToRem(18),
    lineHeight: pxToRem(26),
  },

  header_2xl_bold: {
    fontWeight: 700,
    fontSize: pxToRem(34),
    lineHeight: pxToRem(42),
  },
  header_xl_bold: {
    fontWeight: 700,
    fontSize: pxToRem(32),
    lineHeight: pxToRem(40),
  },
  header_lg_bold: {
    fontWeight: 700,
    fontSize: pxToRem(28),
    lineHeight: pxToRem(36),
  },
  header_md_bold: {
    fontWeight: 700,
    fontSize: pxToRem(24),
    lineHeight: pxToRem(32),
  },
  header_sm_bold: {
    fontWeight: 700,
    fontSize: pxToRem(20),
    lineHeight: pxToRem(28),
  },
  header_xs_bold: {
    fontWeight: 700,
    fontSize: pxToRem(18),
    lineHeight: pxToRem(26),
  },

  header_2xl_semibold: {
    fontWeight: 600,
    fontSize: pxToRem(34),
    lineHeight: pxToRem(42),
  },
  header_xl_semibold: {
    fontWeight: 600,
    fontSize: pxToRem(32),
    lineHeight: pxToRem(40),
  },
  header_lg_semibold: {
    fontWeight: 600,
    fontSize: pxToRem(28),
    lineHeight: pxToRem(36),
  },
  header_md_semibold: {
    fontWeight: 600,
    fontSize: pxToRem(24),
    lineHeight: pxToRem(32),
  },
  header_sm_semibold: {
    fontWeight: 600,
    fontSize: pxToRem(20),
    lineHeight: pxToRem(28),
  },
  header_xs_semibold: {
    fontWeight: 600,
    fontSize: pxToRem(18),
    lineHeight: pxToRem(26),
  },
};
