import { FormControlLabel, Radio, Stack, Typography } from "@mui/material";

import { PresetGroup } from "./ThemeDebugPanel.styles";

import type { PresetSectionProps } from "../model/types";

export const ThemeDebugPanelPresetSection = ({
  activeTheme,
  presetOptions,
  onPresetChange: handlePresetChange,
}: PresetSectionProps) => (
  <Stack spacing={1}>
    <Typography variant="subtitle2">Preset</Typography>
    <PresetGroup value={activeTheme} onChange={handlePresetChange}>
      {presetOptions.map((option) => (
        <FormControlLabel
          key={option.id}
          control={<Radio />}
          label={option.label}
          value={option.id}
        />
      ))}
    </PresetGroup>
  </Stack>
);
