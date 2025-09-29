export const ColorPalette = {
  fontDark: "#101727",
  fontLight: "#f0f0f0",
  purple: "#440850",
  lavender: "#9FA9EA",
  carrot: "#F3503A",
  pistachio: "#62ED97",
} as const;

export const themeConfig: Record<
  string,
  { primaryColor: string; secondaryColor?: string }
> = {
  Main: {
    primaryColor: "#9FA9EA",
    secondaryColor: "#f2f2f2",
  },
};
