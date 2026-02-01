import type { ThemeModeBackground, ThemePreset } from "@/models";
import type { ThemeOptions } from "@mui/material/styles";

export type ThemeWithModeBackground = ThemeOptions & {
  background?: ThemeModeBackground;
};

export type Theme1 = ThemeWithModeBackground & { name?: string };
export type ThemeN = ThemeWithModeBackground & { name: string };

export type ThemesProp = [Theme1] | [ThemeN, ...ThemeN[]];
export type ThemesInput = ThemesProp | ThemePreset[];
