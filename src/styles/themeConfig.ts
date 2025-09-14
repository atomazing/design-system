export const ColorPalette = {
  fontDark: "#101727",
  fontLight: "#f0f0f0",
  darkMode: "#383838",
  lightMode: "#ffffff",
  purple: "#b624ff",
  red: "#ff3131",
  orange: "#ff9318",
  orangeDark: "#ff9500",
} as const;

export const themeConfig: Record<
  string,
  { primaryColor: string; secondaryColor?: string }
> = {
  "Dark Blue": {
    primaryColor: "#0C141C",
    secondaryColor: "#00D2FF",
  },
  Neon: {
    primaryColor: "#FFF",
    secondaryColor: "#00D2FF",
  },
  White: {
    primaryColor: "#00D2FF",
    secondaryColor: "#FFF",
  }
};
