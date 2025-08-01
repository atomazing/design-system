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
  Future: {
    primaryColor: "#203959",
    secondaryColor: "#ffffff",
  },
  Orange: {
    primaryColor: "#f6883d",
    secondaryColor: "#ffffff",
  },
  "Neo Mint": {
    primaryColor: "#00f5d4",
    secondaryColor: "#e4fff8",
  },
  "Cyber Grape": {
    primaryColor: "#4b0082",
    secondaryColor: "#f4f0fa",
  },
  "Coral Glass": {
    primaryColor: "#ff6f61",
    secondaryColor: "#fef2f2",
  },
  "Blueberry Ice": {
    primaryColor: "#3f51b5",
    secondaryColor: "#e8eaf6",
  },
  "Dark Purple": {
    // Default dark theme
    primaryColor: ColorPalette.purple,
  },
  "Light Purple": {
    // Default light theme
    primaryColor: ColorPalette.purple,
    secondaryColor: "#edeef6",
  },
  "Dark Blue": {
    primaryColor: "#106cff",
    secondaryColor: "#090815",
  },
  "Light Blue": {
    primaryColor: "#278ad2",
    secondaryColor: "#dddaf6",
  },
  "Dark Pink": {
    primaryColor: "#f2369d",
    secondaryColor: "#191218",
  },
  "Light Pink": {
    primaryColor: "#e5369a",
    secondaryColor: "#ffe3ff",
  },
  "Blush Blossom": {
    primaryColor: "#EC407A",
    secondaryColor: "#FCE4EC",
  },
  Cheesecake: {
    primaryColor: "#E14C94",
    secondaryColor: "#FDF0D5",
  },
  "Mystic Coral": {
    primaryColor: "#ff7b9c",
    secondaryColor: "#4a2333",
  },
  "Dark Orange": {
    primaryColor: "#FF5631",
    secondaryColor: "#0D0D0D",
  },
  "Light Orange": {
    primaryColor: "#F26E56",
    secondaryColor: "#F6F6F6",
  },
  Aurora: {
    primaryColor: "#00e952",
    secondaryColor: "#011926",
  },
};
