import { useEffect, useMemo, useState } from "react";
import { Button, Divider, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  readAppSettings,
  useSystemTheme,
  useThemeSettings,
} from "@atomazing-org/design-system";

import { ActionRow, ControlGrid, PanelRoot } from "./ThemeDebugPanel.styles";
import { ThemeDebugPanelHeader } from "./ThemeDebugPanelHeader";
import { ThemeDebugPanelModeSection } from "./ThemeDebugPanelModeSection";
import { ThemeDebugPanelPersistencePanel } from "./ThemeDebugPanelPersistencePanel";
import { ThemeDebugPanelPresetSection } from "./ThemeDebugPanelPresetSection";
import { ThemeDebugPanelTokenSnapshot } from "./ThemeDebugPanelTokenSnapshot";

import type { ThemeOption } from "../model/types";
import type {
  DarkModeOptions,
  StoredAppSettings,
} from "@atomazing-org/design-system";
import type { ChangeEvent } from "react";

interface ThemeDebugPanelProps {
  presetOptions: ThemeOption[];
  defaultThemeId: string;
}

export const ThemeDebugPanel = ({
  presetOptions,
  defaultThemeId,
}: ThemeDebugPanelProps) => {
  const theme = useTheme();
  const systemTheme = useSystemTheme();
  const {
    theme: activeTheme,
    setTheme,
    darkMode,
    setDarkMode,
  } = useThemeSettings();
  const [storedSettings, setStoredSettings] =
    useState<Partial<StoredAppSettings> | null>(null);

  useEffect(() => {
    setStoredSettings(readAppSettings());
  }, [activeTheme, darkMode]);

  const labelMap = useMemo(() => {
    const map = new Map<string, string>();

    for (const option of presetOptions) {
      map.set(option.id, option.label);
    }

    return map;
  }, [presetOptions]);

  const activeLabel = labelMap.get(activeTheme) ?? activeTheme;

  const storedSettingsJson = useMemo(
    () => JSON.stringify(storedSettings ?? null, null, 2),
    [storedSettings],
  );

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  const handleModeChange = (value: DarkModeOptions) => {
    setDarkMode(value);
  };

  const handleReset = () => {
    if (globalThis.window === undefined) {
      return;
    }

    try {
      globalThis.localStorage.removeItem("appSettings");
    } catch {
      /* empty */
    }

    setTheme(defaultThemeId);
    setDarkMode("system");
    setStoredSettings(readAppSettings());
  };

  const handleCorruptStorage = () => {
    if (globalThis.window === undefined) {
      return;
    }

    try {
      globalThis.localStorage.setItem("appSettings", "{bad json");
    } catch {
      /* empty */
    }

    setStoredSettings(readAppSettings());
  };

  const handlePresetChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleThemeChange(event.target.value);
  };

  return (
    <PanelRoot elevation={6}>
      <Stack spacing={2}>
        <ThemeDebugPanelHeader />

        <ControlGrid>
          <ThemeDebugPanelPresetSection
            activeTheme={activeTheme}
            presetOptions={presetOptions}
            onPresetChange={handlePresetChange}
          />

          <ThemeDebugPanelModeSection
            darkMode={darkMode}
            effectiveMode={theme.palette.mode}
            systemTheme={systemTheme}
            onModeChange={handleModeChange}
          />
        </ControlGrid>

        <ActionRow>
          <Button size="small" variant="outlined" onClick={handleReset}>
            Reset to defaults
          </Button>
          <Button
            color="warning"
            size="small"
            variant="outlined"
            onClick={handleCorruptStorage}
          >
            Corrupt storage
          </Button>
        </ActionRow>

        <Divider />

        <ThemeDebugPanelTokenSnapshot
          activeLabel={activeLabel}
          activeTheme={activeTheme}
          palette={theme.palette}
        />

        <Divider />

        <ThemeDebugPanelPersistencePanel
          storedSettingsJson={storedSettingsJson}
        />
      </Stack>
    </PanelRoot>
  );
};
