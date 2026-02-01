import {
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { darkModeOptions } from "@atomazing-org/design-system";

import { ChipRow } from "./ThemeDebugPanel.styles";

import type { ModeSectionProps } from "../model/types";
import type { DarkModeOptions } from "@atomazing-org/design-system";

export const ThemeDebugPanelModeSection = ({
  darkMode,
  systemTheme,
  effectiveMode,
  onModeChange,
}: ModeSectionProps) => (
  <Stack spacing={1}>
    <Typography variant="subtitle2">Dark Mode</Typography>
    <RadioGroup
      value={darkMode}
      row
      onChange={(event) => onModeChange(event.target.value as DarkModeOptions)}
    >
      {darkModeOptions.map((option) => (
        <FormControlLabel
          key={option.value}
          control={<Radio />}
          label={option.label}
          value={option.value}
        />
      ))}
    </RadioGroup>
    <ChipRow>
      <Chip label={`os: ${systemTheme}`} />
      <Chip label={`darkMode: ${darkMode}`} />
      <Chip label={`effective: ${effectiveMode}`} />
    </ChipRow>
  </Stack>
);
