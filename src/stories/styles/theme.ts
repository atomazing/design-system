import { createTheme } from "@mui/material";
import {
  typographyProps,
  typographyVariants,
  commonComponentProps,
} from "../../../index";

import type { Theme } from "@mui/material";

export const ColorPalette = {
  fontDark: "#101727",
  fontLight: "#f0f0f0",
  purple: "#b624ff",
  red: "#ff3131",
  orange: "#ff9318",
  green: "#00ff1e",
} as const;

export type AppTheme = string;

type ThemeConfig = {
  [key: AppTheme]: {
    primaryColor: string;
    secondaryColor?: string;
  };
};

const themeConfig: ThemeConfig = {
  Lanit: {
    primaryColor: "#33ccff",
    secondaryColor: "#f7f7f7",
  },
  BPM: {
    primaryColor: "#203959",
    secondaryColor: "#ffffff",
  },
  Pampa: {
    primaryColor: "#ffe22e",
    secondaryColor: "#fafafa",
  },
  Hurma: {
    primaryColor: "#f6883d",
    secondaryColor: "#ffffff",
  },
  Purple: {
    // Default dark theme
    primaryColor: ColorPalette.purple,
  },
  "Light Purple": {
    // Default light theme
    primaryColor: ColorPalette.purple,
    secondaryColor: "#edeef6",
  },
  Blue: {
    primaryColor: "#2a93d5",
  },
  Bluetone: {
    primaryColor: "#00246B",
    secondaryColor: "#CADCFC",
  },
  Pink: {
    primaryColor: "#e5369a",
  },
  "Ultra Pink": {
    primaryColor: "#ff0090",
    secondaryColor: "#ff94d1",
  },

  "Dark Orange": {
    primaryColor: "#FF5631",
    secondaryColor: "#0D0D0D",
  },
  "Light Orange": {
    primaryColor: "#F26E56",
    secondaryColor: "#F6F6F6",
  },
  Cheesecake: {
    primaryColor: "#E14C94",
    secondaryColor: "#FDF0D5",
  },
  Aurora: {
    primaryColor: "#00e952",
    secondaryColor: "#011926",
  },

  // Add new themes here
};

export const theme = createTheme({
  components: {
    ...commonComponentProps,
    ...typographyProps,
  },
  typography: {
    ...typographyVariants,
  },
});
