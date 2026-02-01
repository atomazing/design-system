import { isDarkMode } from "@/utils";

import type { DarkModeOptions, SystemTheme } from "@/models";
import type { PaletteMode } from "@mui/material/styles";

export const resolveEffectiveMode = (
  darkMode: DarkModeOptions,
  systemTheme: SystemTheme,
): PaletteMode => (isDarkMode(darkMode, systemTheme) ? "dark" : "light");
