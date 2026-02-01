import { Stack } from "@mui/material";

import { OverlineText, TitleText } from "./ThemeDebugPanel.styles";

export const ThemeDebugPanelHeader = () => (
  <Stack spacing={0.5}>
    <OverlineText variant="overline">Theme Controls</OverlineText>
    <TitleText variant="h5">Debug Panel</TitleText>
  </Stack>
);
