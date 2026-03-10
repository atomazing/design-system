"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProviderWrapper } from "@atomazing-org/design-system";
import type { DarkModeOptions } from "@atomazing-org/design-system";
import { defaultThemes } from "@atomazing-org/design-system/presets";

import type { PropsWithChildren } from "react";

type AppProvidersProps = PropsWithChildren<{
  initialThemeId?: string;
  initialDarkMode?: DarkModeOptions;
}>;

export function AppProviders({
  children,
  initialThemeId,
  initialDarkMode,
}: AppProvidersProps) {
  return (
    <ThemeProviderWrapper
      themes={defaultThemes}
      initialThemeId={initialThemeId}
      initialDarkMode={initialDarkMode}
    >
      <CssBaseline />
      {children}
    </ThemeProviderWrapper>
  );
}
