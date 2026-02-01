import {
  retroTerminal as retroTerminalLight,
  retroTerminalDark,
} from "@/constants/themes/retroTerminal";

import type { ThemePreset } from "@/models";

export const retroTerminal: ThemePreset = {
  id: "Retro Terminal",
  label: "Retro Terminal",
  colorSchemes: {
    light: retroTerminalLight,
    dark: retroTerminalDark,
  },
};
