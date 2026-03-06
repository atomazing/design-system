import { defaultThemes } from "@atomazing-org/design-system/presets";
import { CssBaseline } from "@mui/material";
import { ThemeProviderWrapper } from "@atomazing-org/design-system";

import { ReactAppLabPage } from "./ReactAppLabPage";

const appFont =
  '"Space Grotesk", "Segoe UI", system-ui, -apple-system, sans-serif';

export const App = () => {
  const defaultThemeId = defaultThemes[0]?.id ?? "default";

  return (
    <ThemeProviderWrapper fontFamily={appFont} themes={defaultThemes}>
      <CssBaseline />
      <ReactAppLabPage
        defaultThemeId={defaultThemeId}
        presetOptions={defaultThemes}
      />
    </ThemeProviderWrapper>
  );
};
