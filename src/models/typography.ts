import type { CSSProperties } from "react";
import "@mui/material/styles";
import "@mui/material/Typography";

export interface CustomTypographyVariants {
  text_xl_regular: CSSProperties;
  text_lg_regular: CSSProperties;
  text_md_regular: CSSProperties;
  text_sm_regular: CSSProperties;
  text_xs_regular: CSSProperties;
  text_2xs_regular: CSSProperties;

  text_xl_bold: CSSProperties;
  text_lg_bold: CSSProperties;
  text_md_bold: CSSProperties;
  text_sm_bold: CSSProperties;
  text_xs_bold: CSSProperties;
  text_2xs_bold: CSSProperties;

  text_xl_semibold: CSSProperties;
  text_lg_semibold: CSSProperties;
  text_md_semibold: CSSProperties;
  text_sm_semibold: CSSProperties;
  text_xs_semibold: CSSProperties;
  text_2xs_semibold: CSSProperties;

  text_xl_thin: CSSProperties;
  text_lg_thin: CSSProperties;
  text_md_thin: CSSProperties;
  text_sm_thin: CSSProperties;
  text_xs_thin: CSSProperties;
  text_2xs_thin: CSSProperties;

  header_2xl_regular: CSSProperties;
  header_xl_regular: CSSProperties;
  header_lg_regular: CSSProperties;
  header_md_regular: CSSProperties;
  header_sm_regular: CSSProperties;
  header_xs_regular: CSSProperties;

  header_2xl_bold: CSSProperties;
  header_xl_bold: CSSProperties;
  header_lg_bold: CSSProperties;
  header_md_bold: CSSProperties;
  header_sm_bold: CSSProperties;
  header_xs_bold: CSSProperties;

  // Added semibold header variants
  header_2xl_semibold: CSSProperties;
  header_xl_semibold: CSSProperties;
  header_lg_semibold: CSSProperties;
  header_md_semibold: CSSProperties;
  header_sm_semibold: CSSProperties;
  header_xs_semibold: CSSProperties;
}

// MUI extensions
declare module "@mui/material/styles" {
  interface TypographyVariants extends CustomTypographyVariants {}
  interface TypographyVariantsOptions
    extends Partial<CustomTypographyVariants> {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides
    extends Record<keyof CustomTypographyVariants, true> {}
}
