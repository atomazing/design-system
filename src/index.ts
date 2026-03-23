// Curated root API (v3): keep design-system core exports only.

// Context / provider API
export {
  ThemeProviderWrapper,
  useThemeSettings,
  mergeThemes,
  normalizeThemes,
  resolveDefaultThemeName,
  resolveThemeById,
} from "./context";
export type { ThemesInput } from "./context";

// Styles / theming API
export { GlobalStyles } from "./styles/global";
export { commonComponentProps } from "./styles/overrides";
export {
  buildMuiTheme,
  resolveEffectiveMode,
  selectThemeOptions,
} from "./styles/theme";
export { alphaText, getSurfaceTokens } from "./styles/tokens";
export type { SurfaceTokens } from "./styles/tokens";
export { validateSchemeTokens } from "./styles/validateSchemeTokens";
export {
  fadeIn,
  fadeInLeft,
  slideIn,
  slideInBottom,
  scale,
  pulseAnimation,
  progressPulse,
} from "./styles/keyframes";

// Public root constant kept intentionally for examples and app integrations.
export { darkModeOptions } from "./constants/darkModeOptions";

// Runtime utilities used by the core theming integration surface
export { useSystemTheme } from "./utils/browser/useSystemTheme";
export { canUseDom } from "./utils/ssr";
export { readAppSettings, writeAppSettings } from "./utils/storage";
export type { StoredAppSettings } from "./utils/storage";
export { isDarkMode } from "./utils/isDarkMode";

// Public type surface
export type * from "./models";
