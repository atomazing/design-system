import {
  modernMinimal as modernMinimalLight,
  modernMinimalDark,
} from "@/constants/themes/modernMinimal";

import type { ThemePreset } from "@/models";

export const modernMinimal: ThemePreset = {
  id: "Modern Minimal",
  label: "Modern Minimal",
  colorSchemes: {
    light: modernMinimalLight,
    dark: modernMinimalDark,
  },
};
