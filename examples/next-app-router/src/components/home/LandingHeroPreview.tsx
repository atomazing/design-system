"use client";

import {
  resolveEffectiveMode,
  useSystemTheme,
  useThemeSettings,
} from "@atomazing-org/design-system";

import { exampleThemes } from "@/theme/exampleThemes";
import { LandingEditorialPanel } from "@/components/home/LandingEditorialPanel";

export function LandingHeroPreview() {
  const systemTheme = useSystemTheme();
  const { theme, darkMode } = useThemeSettings();
  const effectiveMode = resolveEffectiveMode(darkMode, systemTheme);
  const activePreset = exampleThemes.find((preset) => preset.id === theme);
  const modeLabel = effectiveMode === "dark" ? "Темный" : "Светлый";

  return (
    <LandingEditorialPanel
      title={`${activePreset?.label ?? theme} задает визуальный тон для первого экрана.`}
      lines={[
        `Текущий пресет: ${activePreset?.label ?? theme}.`,
        `Активный режим: ${modeLabel}.`,
        "Фон, поверхности и элементы управления наследуют пресет без дополнительной стилизации страницы.",
      ]}
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", md: 560 },
        justifySelf: { md: "end" },
      }}
    />
  );
}
