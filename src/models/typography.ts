import "@mui/material/styles";
import "@mui/material/Typography";

export interface CustomTypographyVariants {
  text_xl_regular: { font: string };
  text_lg_regular: { font: string };
  text_md_regular: { font: string };
  text_sm_regular: { font: string };
  text_xs_regular: { font: string };
  text_2xs_regular: { font: string };

  text_xl_bold: { font: string };
  text_lg_bold: { font: string };
  text_md_bold: { font: string };
  text_sm_bold: { font: string };
  text_xs_bold: { font: string };
  text_2xs_bold: { font: string };

  text_xl_semibold: { font: string };
  text_lg_semibold: { font: string };
  text_md_semibold: { font: string };
  text_sm_semibold: { font: string };
  text_xs_semibold: { font: string };
  text_2xs_semibold: { font: string };

  text_xl_thin: { font: string };
  text_lg_thin: { font: string };
  text_md_thin: { font: string };
  text_sm_thin: { font: string };
  text_xs_thin: { font: string };
  text_2xs_thin: { font: string };

  header_2xl_regular: { font: string };
  header_xl_regular: { font: string };
  header_lg_regular: { font: string };
  header_md_regular: { font: string };
  header_sm_regular: { font: string };
  header_xs_regular: { font: string };

  header_2xl_bold: { font: string };
  header_xl_bold: { font: string };
  header_lg_bold: { font: string };
  header_md_bold: { font: string };
  header_sm_bold: { font: string };
  header_xs_bold: { font: string };
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
