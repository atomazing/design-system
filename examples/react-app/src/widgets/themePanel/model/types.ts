import type { DarkModeOptions } from "@atomazing-org/design-system";
import type { ChangeEvent } from "react";

export interface ThemeOption {
  id: string;
  label: string;
}

export interface PresetSectionProps {
  activeTheme: string;
  presetOptions: ThemeOption[];
  onPresetChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ModeSectionProps {
  darkMode: DarkModeOptions;
  systemTheme: string;
  effectiveMode: string;
  onModeChange: (mode: DarkModeOptions) => void;
}

export interface PaletteSnapshot {
  mode: string;
  primary: { main: string };
  text: { primary: string };
  background: { default: string; paper: string };
  divider: string;
}

export interface TokenSnapshotProps {
  activeLabel: string;
  activeTheme: string;
  palette: PaletteSnapshot;
}

export interface PersistencePanelProps {
  storedSettingsJson: string;
}
