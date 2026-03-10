import { landingPageThemes } from "@atomazing-org/design-system/presets";

const defaultThemeId = "neon-brutalist-sprint";

export const exampleThemes = [
  ...landingPageThemes.filter((preset) => preset.id === defaultThemeId),
  ...landingPageThemes.filter((preset) => preset.id !== defaultThemeId),
];
export const defaultExampleThemeId = exampleThemes[0]?.id ?? defaultThemeId;
