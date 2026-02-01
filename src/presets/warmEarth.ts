import {
  warmEarth as warmEarthLight,
  warmEarthDark,
} from "@/constants/themes/warmEarth";

import type { ThemePreset } from "@/models";

export const warmEarth: ThemePreset = {
  id: "Warm Earth",
  label: "Warm Earth",
  colorSchemes: {
    light: warmEarthLight,
    dark: warmEarthDark,
  },
};
