/* eslint-disable @typescript-eslint/no-empty-object-type */

type DsDarkModeOptions = "system" | "light" | "dark";

type DsThemePreset = {
  id: string;
  label: string;
  colorSchemes: {
    light: import("@mui/material/styles").ThemeOptions;
    dark: import("@mui/material/styles").ThemeOptions;
  };
  description?: string;
  tags?: string[];
  version?: string;
};

type DsOptionItem = {
  label: string;
  value: DsDarkModeOptions;
  icon: import("react").ReactNode;
};

interface DsThemeContextProps {
  theme: string;
  darkMode: DsDarkModeOptions;
  setTheme: (theme: string) => void;
  setDarkMode: (mode: DsDarkModeOptions) => void;
  themes: DsThemePreset[];
  selectedTheme: DsThemePreset;
  defaultThemeName: string;
}

declare module "@atomazing-org/design-system" {
  export type DarkModeOptions = DsDarkModeOptions;
  export type ThemePreset = DsThemePreset;
  export type OptionItem = DsOptionItem;
  export type ThemeContextProps = DsThemeContextProps;

  export const ThemeProviderWrapper: import("react").FC<
    import("react").PropsWithChildren<{
      themes?: DsThemePreset[];
      darkMode?: DsDarkModeOptions;
      initialThemeId?: string;
      initialDarkMode?: DsDarkModeOptions;
      fontFamily?: string;
    }>
  >;

  export const darkModeOptions: DsOptionItem[];
  export const useThemeSettings: () => DsThemeContextProps;
  export const useSystemTheme: () => "light" | "dark" | "unknown";
  export const resolveEffectiveMode: (
    darkMode: DsDarkModeOptions,
    systemTheme: "light" | "dark" | "unknown",
  ) => import("@mui/material/styles").PaletteMode;
}

declare module "@atomazing-org/design-system/presets" {
  export const defaultThemes: DsThemePreset[];
  export const landingPageThemes: DsThemePreset[];
  export const allBuiltInThemes: DsThemePreset[];
}

interface CustomTypographyVariants {
  text_xl_regular: import("react").CSSProperties;
  text_lg_regular: import("react").CSSProperties;
  text_md_regular: import("react").CSSProperties;
  text_sm_regular: import("react").CSSProperties;
  text_xs_regular: import("react").CSSProperties;
  text_2xs_regular: import("react").CSSProperties;
  text_xl_bold: import("react").CSSProperties;
  text_lg_bold: import("react").CSSProperties;
  text_md_bold: import("react").CSSProperties;
  text_sm_bold: import("react").CSSProperties;
  text_xs_bold: import("react").CSSProperties;
  text_2xs_bold: import("react").CSSProperties;
  text_xl_semibold: import("react").CSSProperties;
  text_lg_semibold: import("react").CSSProperties;
  text_md_semibold: import("react").CSSProperties;
  text_sm_semibold: import("react").CSSProperties;
  text_xs_semibold: import("react").CSSProperties;
  text_2xs_semibold: import("react").CSSProperties;
  text_xl_thin: import("react").CSSProperties;
  text_lg_thin: import("react").CSSProperties;
  text_md_thin: import("react").CSSProperties;
  text_sm_thin: import("react").CSSProperties;
  text_xs_thin: import("react").CSSProperties;
  text_2xs_thin: import("react").CSSProperties;
  header_2xl_regular: import("react").CSSProperties;
  header_xl_regular: import("react").CSSProperties;
  header_lg_regular: import("react").CSSProperties;
  header_md_regular: import("react").CSSProperties;
  header_sm_regular: import("react").CSSProperties;
  header_xs_regular: import("react").CSSProperties;
  header_2xl_bold: import("react").CSSProperties;
  header_xl_bold: import("react").CSSProperties;
  header_lg_bold: import("react").CSSProperties;
  header_md_bold: import("react").CSSProperties;
  header_sm_bold: import("react").CSSProperties;
  header_xs_bold: import("react").CSSProperties;
  header_2xl_semibold: import("react").CSSProperties;
  header_xl_semibold: import("react").CSSProperties;
  header_lg_semibold: import("react").CSSProperties;
  header_md_semibold: import("react").CSSProperties;
  header_sm_semibold: import("react").CSSProperties;
  header_xs_semibold: import("react").CSSProperties;
}

type CustomTypographyVariantOverrides = {
  [K in keyof CustomTypographyVariants]: true;
};

declare module "@mui/material/styles" {
  interface TypographyVariants extends CustomTypographyVariants {}
  interface TypographyVariantsOptions extends Partial<CustomTypographyVariants> {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides extends CustomTypographyVariantOverrides {}
}

export {};
