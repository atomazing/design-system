import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    text_xl_regular: React.CSSProperties;
    text_lg_regular: React.CSSProperties;
    text_md_regular: React.CSSProperties;
    text_sm_regular: React.CSSProperties;
    text_xs_regular: React.CSSProperties;
    text_2xs_regular: React.CSSProperties;

    text_xl_bold: React.CSSProperties;
    text_lg_bold: React.CSSProperties;
    text_md_bold: React.CSSProperties;
    text_sm_bold: React.CSSProperties;
    text_xs_bold: React.CSSProperties;
    text_2xs_bold: React.CSSProperties;

    text_xl_semibold: React.CSSProperties;
    text_lg_semibold: React.CSSProperties;
    text_md_semibold: React.CSSProperties;
    text_sm_semibold: React.CSSProperties;
    text_xs_semibold: React.CSSProperties;
    text_2xs_semibold: React.CSSProperties;

    text_xl_thin: React.CSSProperties;
    text_lg_thin: React.CSSProperties;
    text_md_thin: React.CSSProperties;
    text_sm_thin: React.CSSProperties;
    text_xs_thin: React.CSSProperties;
    text_2xs_thin: React.CSSProperties;

    display_2xl_regular: React.CSSProperties;
    display_xl_regular: React.CSSProperties;
    display_lg_regular: React.CSSProperties;
    display_md_regular: React.CSSProperties;
    display_sm_regular: React.CSSProperties;
    display_xs_regular: React.CSSProperties;

    display_2xl_bold: React.CSSProperties;
    display_xl_bold: React.CSSProperties;
    display_lg_bold: React.CSSProperties;
    display_md_bold: React.CSSProperties;
    display_sm_bold: React.CSSProperties;
    display_xs_bold: React.CSSProperties;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Allow configuration using `createTheme`
  interface TypographyVariantsOptions extends Partial<TypographyVariants> {}

  interface TypographyPropsVariantOverrides {
    text_xl_regular: true;
    text_lg_regular: true;
    text_md_regular: true;
    text_sm_regular: true;
    text_xs_regular: true;
    text_2xs_regular: true;

    text_xl_bold: true;
    text_lg_bold: true;
    text_md_bold: true;
    text_sm_bold: true;
    text_xs_bold: true;
    text_2xs_bold: true;

    text_xl_semibold: true;
    text_lg_semibold: true;
    text_md_semibold: true;
    text_sm_semibold: true;
    text_xs_semibold: true;
    text_2xs_semibold: true;

    text_xl_thin: true;
    text_lg_thin: true;
    text_md_thin: true;
    text_sm_thin: true;
    text_xs_thin: true;
    text_2xs_thin: true;

    display_2xl_regular: true;
    display_xl_regular: true;
    display_lg_regular: true;
    display_md_regular: true;
    display_sm_regular: true;
    display_xs_regular: true;

    display_2xl_bold: true;
    display_xl_bold: true;
    display_lg_bold: true;
    display_md_bold: true;
    display_sm_bold: true;
    display_xs_bold: true;
  }
}
