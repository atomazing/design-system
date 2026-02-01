import { Stack, Typography } from "@mui/material";

import { JsonBlock } from "./ThemeDebugPanel.styles";

import type { PersistencePanelProps } from "../model/types";

export const ThemeDebugPanelPersistencePanel = ({
  storedSettingsJson,
}: PersistencePanelProps) => (
  <Stack spacing={1}>
    <Typography variant="subtitle2">Persistence</Typography>
    <Typography color="text.secondary" variant="caption">
      appSettings (sanitized)
    </Typography>
    <JsonBlock>{storedSettingsJson}</JsonBlock>
  </Stack>
);
