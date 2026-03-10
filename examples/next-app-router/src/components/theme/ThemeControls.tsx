"use client";

import { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import type { ToggleButtonGroupProps } from "@mui/material";
import {
  darkModeOptions,
  useThemeSettings,
  type DarkModeOptions,
} from "@atomazing-org/design-system";
import { defaultThemes } from "@atomazing-org/design-system/presets";

import { writeThemePreferenceCookies } from "@/theme/themePreferenceCookies";

const darkModeValues = new Set<DarkModeOptions>(
  darkModeOptions.map((option) => option.value),
);

const isDarkModeOption = (value: unknown): value is DarkModeOptions =>
  typeof value === "string" && darkModeValues.has(value as DarkModeOptions);

export function ThemeControls() {
  const { theme, setTheme, darkMode, setDarkMode } = useThemeSettings();

  useEffect(() => {
    writeThemePreferenceCookies(theme, darkMode);
  }, [theme, darkMode]);

  const handleDarkModeChange: NonNullable<ToggleButtonGroupProps["onChange"]> = (
    _,
    nextValue,
  ) => {
    if (!isDarkModeOption(nextValue)) return;
    setDarkMode(nextValue);
  };

  return (
    <Card elevation={0}>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6">Theme controls</Typography>
            <Typography variant="body2" color="text.secondary">
              Root import for controls, presets subpath for built-in themes.
            </Typography>
          </Box>

          <FormControl fullWidth size="small">
            <InputLabel id="preset-select-label">Preset</InputLabel>
            <Select
              labelId="preset-select-label"
              value={theme}
              label="Preset"
              onChange={(event) => setTheme(event.target.value)}
            >
              {defaultThemes.map((preset) => (
                <MenuItem key={preset.id} value={preset.id}>
                  {preset.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ToggleButtonGroup
            exclusive
            fullWidth
            value={darkMode}
            onChange={handleDarkModeChange}
            aria-label="dark mode selection"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              "& .MuiToggleButton-root": {
                minHeight: 72,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              },
            }}
          >
            {darkModeOptions.map((option) => (
              <ToggleButton
                key={option.value}
                value={option.value}
                aria-label={`Set dark mode: ${option.label}`}
              >
                <Box component="span" aria-hidden="true" sx={{ display: "inline-flex" }}>
                  {option.icon}
                </Box>
                <span>{option.label}</span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
      </CardContent>
    </Card>
  );
}
