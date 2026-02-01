import type { NormalizedPreset } from "@/models/themePresets";
import type { PaletteMode, ThemeOptions } from "@mui/material/styles";

export const selectThemeOptions = (
  preset: NormalizedPreset,
  mode: PaletteMode,
): ThemeOptions => preset.colorSchemes[mode] ?? preset.colorSchemes.light;
