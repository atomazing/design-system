import {
  neoGlass as neoGlassLight,
  neoGlassDark,
} from "@/constants/themes/neoGlass";

import type { ThemePreset } from "@/models";

export const neoGlass: ThemePreset = {
  id: "Neo Glass",
  label: "Neo Glass",
  colorSchemes: {
    light: neoGlassLight,
    dark: neoGlassDark,
  },
};
