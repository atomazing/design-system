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

import { exampleThemes } from "@/theme/exampleThemes";
import { writeThemePreferenceCookies } from "@/theme/themePreferenceCookies";

const darkModeValues = new Set<DarkModeOptions>(
  darkModeOptions.map((option) => option.value),
);

const isDarkModeOption = (value: unknown): value is DarkModeOptions =>
  typeof value === "string" && darkModeValues.has(value as DarkModeOptions);

const darkModeLabels: Record<DarkModeOptions, string> = {
  system: "Системный",
  light: "Светлый",
  dark: "Темный",
};

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
            <Typography variant="header_xs_semibold">Настройки темы</Typography>
          </Box>

          <FormControl fullWidth size="small">
            <InputLabel id="preset-select-label">Пресет</InputLabel>
            <Select
              labelId="preset-select-label"
              value={theme}
              label="Пресет"
              onChange={(event) => setTheme(event.target.value)}
            >
              {exampleThemes.map((preset) => (
                <MenuItem key={preset.id} value={preset.id}>
                  <Typography component="span" variant="text_sm_regular">
                    {preset.label}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ToggleButtonGroup
            exclusive
            fullWidth
            value={darkMode}
            onChange={handleDarkModeChange}
            aria-label="выбор режима темы"
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
                aria-label={`Установить режим: ${darkModeLabels[option.value]}`}
              >
                <Box component="span" aria-hidden="true" sx={{ display: "inline-flex" }}>
                  {option.icon}
                </Box>
                <Typography component="span" variant="text_sm_semibold" color="inherit">
                  {darkModeLabels[option.value]}
                </Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
      </CardContent>
    </Card>
  );
}
