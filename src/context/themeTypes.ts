import type { ThemeOptions } from "@mui/material/styles";

export type Theme1 = ThemeOptions & { name?: string };
export type ThemeN = ThemeOptions & { name: string };

export type ThemesProp = [Theme1] | [ThemeN, ...ThemeN[]];
