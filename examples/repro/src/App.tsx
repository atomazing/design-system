import { defaultThemes } from "@atomazing-org/design-system/presets";
import { CssBaseline } from "@mui/material";
import { ThemeProviderWrapper } from "@atomazing-org/design-system";

import { ReproLabPage } from "./ReproLabPage";

const appFont =
  '"Space Grotesk", "Segoe UI", system-ui, -apple-system, sans-serif';

export const App = () => {
  const defaultThemeId = defaultThemes[0]?.id ?? "Default";

  return (
    <ThemeProviderWrapper fontFamily={appFont} themes={defaultThemes}>
      <CssBaseline />
      <ReproLabPage
        defaultThemeId={defaultThemeId}
        presetOptions={defaultThemes}
      />
    </ThemeProviderWrapper>
  );
};
