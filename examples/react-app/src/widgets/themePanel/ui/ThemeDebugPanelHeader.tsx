import { Stack, Typography } from "@mui/material";

import { OverlineText } from "./ThemeDebugPanel.styles";

export const ThemeDebugPanelHeader = () => (
  <Stack spacing={0.5}>
    <OverlineText variant="overline">Theme Controls</OverlineText>
    <Typography variant="h5">Debug Panel</Typography>
  </Stack>
);
