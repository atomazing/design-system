export {
  systemInfo,
  timeAgo,
  timeAgoFromStart,
  displayGreeting,
  getDayIdentifier,
  useResponsiveDisplay,
} from "./build/utils";

export {
  fadeIn,
  fadeInLeft,
  pulseAnimation,
  ring,
  rotate,
  rotateSlideBarIcons,
  scale,
  slideIn,
  slideInBottom,
  typographyProps,
  typographyVariants,
  zoomIn,
  commonComponentProps,
} from "./build/styles";

export { DialogBtn, Loading, PathName } from "./build/components";

import "@emotion/react";
import "@mui/material/styles";
import "@mui/material/Typography";
import "react";

declare module "@emotion/react" {
  export interface Theme {
    /**
     * Emotion Primary color
     */
    primary: string;
    /**
     * Emotion Background color
     */
    secondary: string;
    /**
     * Emotion darkmode
     */
    darkmode: boolean;
  }
}

/// <reference types="@mui/types" />
declare module "@mui/material/styles" {
  export interface TypographyVariants {
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

  // allow configuration using `createTheme()`
  export interface TypographyVariantsOptions {
    text_xl_regular?: React.CSSProperties;
    text_lg_regular?: React.CSSProperties;
    text_md_regular?: React.CSSProperties;
    text_sm_regular?: React.CSSProperties;
    text_xs_regular?: React.CSSProperties;
    text_2xs_regular?: React.CSSProperties;

    text_xl_bold?: React.CSSProperties;
    text_lg_bold?: React.CSSProperties;
    text_md_bold?: React.CSSProperties;
    text_sm_bold?: React.CSSProperties;
    text_xs_bold?: React.CSSProperties;
    text_2xs_bold?: React.CSSProperties;

    text_xl_semibold?: React.CSSProperties;
    text_lg_semibold?: React.CSSProperties;
    text_md_semibold?: React.CSSProperties;
    text_sm_semibold?: React.CSSProperties;
    text_xs_semibold?: React.CSSProperties;
    text_2xs_semibold?: React.CSSProperties;

    text_xl_thin?: React.CSSProperties;
    text_lg_thin?: React.CSSProperties;
    text_md_thin?: React.CSSProperties;
    text_sm_thin?: React.CSSProperties;
    text_xs_thin?: React.CSSProperties;
    text_2xs_thin?: React.CSSProperties;

    display_2xl_regular?: React.CSSProperties;
    display_xl_regular?: React.CSSProperties;
    display_lg_regular?: React.CSSProperties;
    display_md_regular?: React.CSSProperties;
    display_sm_regular?: React.CSSProperties;
    display_xs_regular?: React.CSSProperties;

    display_2xl_bold?: React.CSSProperties;
    display_xl_bold?: React.CSSProperties;
    display_lg_bold?: React.CSSProperties;
    display_md_bold?: React.CSSProperties;
    display_sm_bold?: React.CSSProperties;
    display_xs_bold?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  export interface TypographyPropsVariantOverrides {
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
