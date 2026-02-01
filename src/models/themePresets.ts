import type { DarkModeOptions } from "./appSettings";
import type { ThemeOptions } from "@mui/material/styles";

export type ThemeId = string;
export type ThemeScheme = "light" | "dark";

export type DarkModeSetting = DarkModeOptions;

export interface ThemePreset {
  id: ThemeId;
  label: string;
  colorSchemes: {
    light: ThemeOptions;
    dark: ThemeOptions;
  };
  description?: string;
  tags?: string[];
  version?: string;
}

export type NormalizedPreset = ThemePreset & {
  meta?: {
    origin: "preset" | "legacy" | "custom";
  };
};
