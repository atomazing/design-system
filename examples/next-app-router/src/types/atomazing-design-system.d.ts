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

type DsThemeModeBackground = Partial<
  Record<
    "light" | "dark",
    Partial<import("@mui/material/styles").TypeBackground>
  >
>;

type DsNamedThemeOptions = import("@mui/material/styles").ThemeOptions & {
  name: string;
  background?: DsThemeModeBackground;
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
  themes: DsNamedThemeOptions[];
  selectedTheme: DsNamedThemeOptions;
  defaultThemeName: string;
}

type DsStoredAppSettings = {
  themeId: string;
  darkMode: DsDarkModeOptions;
};

declare module "@atomazing-org/design-system" {
  export type DarkModeOptions = DsDarkModeOptions;
  export type ThemePreset = DsThemePreset;
  export type OptionItem = DsOptionItem;
  export type ThemeContextProps = DsThemeContextProps;
  export type StoredAppSettings = DsStoredAppSettings;

  export const ThemeProviderWrapper: import("react").FC<
    import("react").PropsWithChildren<{
      themes?: DsThemePreset[];
      darkMode?: DsDarkModeOptions;
      initialThemeId?: string;
      initialDarkMode?: DsDarkModeOptions;
      fontFamily?: string;
      settingsStorageKey?: string;
    }>
  >;

  export const darkModeOptions: DsOptionItem[];
  export const useThemeSettings: () => DsThemeContextProps;
  export const useSystemTheme: () => "light" | "dark" | "unknown";
  export const resolveEffectiveMode: (
    darkMode: DsDarkModeOptions,
    systemTheme: "light" | "dark" | "unknown",
  ) => import("@mui/material/styles").PaletteMode;
  export const readAppSettings: (
    storageKey?: string,
  ) => DsStoredAppSettings | null;
  export const writeAppSettings: (
    settings: DsStoredAppSettings,
    storageKey?: string,
  ) => void;
  export const canUseDom: () => boolean;
  export const isDarkMode: (
    darkMode: DsDarkModeOptions,
    systemTheme: "light" | "dark" | "unknown",
  ) => boolean;
}

declare module "@atomazing-org/design-system/presets" {
  export const defaultThemes: DsThemePreset[];
  export const landingPageThemes: DsThemePreset[];
  export const allBuiltInThemes: DsThemePreset[];
}

export {};
