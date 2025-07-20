import type {
  Components,
  Theme,
  TypographyVariantsOptions,
} from "@mui/material";

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

      // DISPLAY REGULAR
      display_2xl_regular: "h1",
      display_xl_regular: "h2",
      display_lg_regular: "h3",
      display_md_regular: "h4",
      display_sm_regular: "h5",
      display_xs_regular: "h6",

      // DISPLAY BOLD
      display_2xl_bold: "h1",
      display_xl_bold: "h2",
      display_lg_bold: "h3",
      display_md_bold: "h4",
      display_sm_bold: "h5",
      display_xs_bold: "h6",
    },
  },
};

/**
 * Custom typography variant definitions.
 */
export const typographyVariants: TypographyVariantsOptions = {
  text_xl_regular: { font: "400 20px/30px inherit inherit" },
  text_lg_regular: { font: "400 18px/28px inherit inherit" },
  text_md_regular: { font: "400 16px/24px inherit inherit" },
  text_sm_regular: { font: "400 14px/20px inherit inherit" },
  text_xs_regular: { font: "400 12px/18px inherit inherit" },
  text_2xs_regular: { font: "400 10px/14px inherit inherit" },

  text_xl_bold: { font: "700 20px/30px inherit inherit" },
  text_lg_bold: { font: "700 18px/28px inherit inherit" },
  text_md_bold: { font: "700 16px/24px inherit inherit" },
  text_sm_bold: { font: "700 14px/20px inherit inherit" },
  text_xs_bold: { font: "700 12px/18px inherit inherit" },
  text_2xs_bold: { font: "700 10px/14px inherit inherit" },

  text_xl_semibold: { font: "600 20px/30px inherit inherit" },
  text_lg_semibold: { font: "600 18px/28px inherit inherit" },
  text_md_semibold: { font: "600 16px/24px inherit inherit" },
  text_sm_semibold: { font: "600 14px/20px inherit inherit" },
  text_xs_semibold: { font: "600 12px/18px inherit inherit" },
  text_2xs_semibold: { font: "600 10px/14px inherit inherit" },

  text_xl_thin: { font: "100 20px/30px inherit inherit" },
  text_lg_thin: { font: "100 18px/28px inherit inherit" },
  text_md_thin: { font: "100 16px/24px inherit inherit" },
  text_sm_thin: { font: "100 14px/20px inherit inherit" },
  text_xs_thin: { font: "100 12px/18px inherit inherit" },
  text_2xs_thin: { font: "100 10px/14px inherit inherit" },

  display_2xl_regular: { font: "400 72px/90px inherit inherit" },
  display_xl_regular: { font: "400 60px/72px inherit inherit" },
  display_lg_regular: { font: "400 48px/60px inherit inherit" },
  display_md_regular: { font: "400 36px/44px inherit inherit" },
  display_sm_regular: { font: "400 30px/38px inherit inherit" },
  display_xs_regular: { font: "400 24px/32px inherit inherit" },

  display_2xl_bold: { font: "700 72px/90px inherit inherit" },
  display_xl_bold: { font: "700 60px/72px inherit inherit" },
  display_lg_bold: { font: "700 48px/60px inherit inherit" },
  display_md_bold: { font: "700 36px/44px inherit inherit" },
  display_sm_bold: { font: "700 30px/38px inherit inherit" },
  display_xs_bold: { font: "700 24px/32px inherit inherit" },
};
