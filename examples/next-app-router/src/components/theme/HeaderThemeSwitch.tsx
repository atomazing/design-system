"use client";

import { useEffect, useState, type ReactElement } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import type {
  SelectChangeEvent,
  ToggleButtonGroupProps,
} from "@mui/material";
import {
  BrightnessAutoRounded,
  DarkModeRounded,
  LightModeRounded,
  PaletteOutlined,
} from "@mui/icons-material";
import {
  useThemeSettings,
  type DarkModeOptions,
} from "@atomazing-org/design-system";
import { defaultThemes } from "@atomazing-org/design-system/presets";

import { writeThemePreferenceCookies } from "@/theme/themePreferenceCookies";

type ThemeModeOption = {
  value: DarkModeOptions;
  label: string;
  shortLabel: string;
  icon: ReactElement;
};

const THEME_MODE_OPTIONS: ThemeModeOption[] = [
  {
    value: "light",
    label: "Светлая тема",
    shortLabel: "Свет",
    icon: <LightModeRounded fontSize="small" />,
  },
  {
    value: "system",
    label: "Системная тема",
    shortLabel: "Система",
    icon: <BrightnessAutoRounded fontSize="small" />,
  },
  {
    value: "dark",
    label: "Тёмная тема",
    shortLabel: "Тьма",
    icon: <DarkModeRounded fontSize="small" />,
  },
];

const darkModeValues = new Set<DarkModeOptions>(
  THEME_MODE_OPTIONS.map((option) => option.value),
);

const isDarkModeOption = (value: unknown): value is DarkModeOptions =>
  typeof value === "string" && darkModeValues.has(value as DarkModeOptions);

export function HeaderThemeSwitch() {
  const { theme, darkMode, setTheme, setDarkMode } = useThemeSettings();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobileDialog = useMediaQuery("(max-width:600px)");
  const activeOption =
    THEME_MODE_OPTIONS.find((option) => option.value === darkMode) ??
    THEME_MODE_OPTIONS[1];
  const activePreset =
    defaultThemes.find((preset) => preset.id === theme) ?? defaultThemes[0];

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

  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    setTheme(event.target.value);
  };

  return (
    <>
      <Tooltip title={`Оформление: ${activePreset.label}, ${activeOption.shortLabel}`}>
        <IconButton
          color="inherit"
          aria-label="Открыть настройки темы"
          aria-haspopup="dialog"
          onClick={() => setIsDialogOpen(true)}
          sx={{
            width: 40,
            height: 40,
            border: 1,
            borderColor: "divider",
            borderRadius: 999,
          }}
        >
          <PaletteOutlined fontSize="small" />
        </IconButton>
      </Tooltip>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        fullScreen={isMobileDialog}
        aria-label="Оформление страницы"
      >
        <DialogTitle
          sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}
        >
          <Stack spacing={0.75}>
            <Typography component="span" variant="h5">
              Оформление страницы
            </Typography>
            <Typography component="span" variant="body2" color="text.secondary">
              Выберите системный пресет и режим отображения. Изменения применяются сразу.
            </Typography>
          </Stack>
          <Button size="small" onClick={() => setIsDialogOpen(false)}>
            Закрыть
          </Button>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Chip
                label={`Пресет: ${activePreset.label}`}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip
                label={`Режим: ${activeOption.shortLabel}`}
                size="small"
                variant="outlined"
              />
            </Stack>

            <FormControl fullWidth size="small">
              <InputLabel id="header-theme-preset-label">Пресет</InputLabel>
              <Select
                labelId="header-theme-preset-label"
                value={theme}
                label="Пресет"
                onChange={handleThemeChange}
              >
                {defaultThemes.map((preset) => (
                  <MenuItem key={preset.id} value={preset.id}>
                    {preset.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Режим
              </Typography>
              <ToggleButtonGroup
                exclusive
                fullWidth
                value={darkMode}
                onChange={handleDarkModeChange}
                aria-label="Переключатель темы"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  "& .MuiToggleButton-root": {
                    minHeight: 64,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    textTransform: "none",
                  },
                }}
              >
                {THEME_MODE_OPTIONS.map((option) => (
                  <ToggleButton
                    key={option.value}
                    value={option.value}
                    aria-label={option.label}
                  >
                    <Box component="span" aria-hidden="true" sx={{ display: "inline-flex" }}>
                      {option.icon}
                    </Box>
                    <span>{option.label}</span>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
