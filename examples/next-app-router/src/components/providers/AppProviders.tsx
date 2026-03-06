"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProviderWrapper } from "@atomazing-org/design-system";
import type { DarkModeOptions } from "@atomazing-org/design-system";

import type { PropsWithChildren } from "react";

import { exampleThemes } from "@/theme/exampleThemes";

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
      themes={exampleThemes}
      initialThemeId={initialThemeId}
      initialDarkMode={initialDarkMode}
    >
      <CssBaseline />
      {children}
    </ThemeProviderWrapper>
  );
}
