import { Chip, Stack, Typography } from "@mui/material";

import { ChipRow, Swatch, SwatchRow } from "./ThemeDebugPanel.styles";

import type { TokenSnapshotProps } from "../model/types";

export const ThemeDebugPanelTokenSnapshot = ({
  activeLabel,
  activeTheme,
  palette,
}: TokenSnapshotProps) => (
  <Stack spacing={1.5}>
    <Typography variant="subtitle2">Token Snapshot</Typography>
    <ChipRow>
      <Chip label={`theme: ${activeTheme}`} />
      <Chip label={`label: ${activeLabel}`} />
      <Chip label={`mode: ${palette.mode}`} />
      <Chip label={`primary: ${palette.primary.main}`} />
      <Chip label={`text: ${palette.text.primary}`} />
      <Chip label={`bg: ${palette.background.default}`} />
      <Chip label={`paper: ${palette.background.paper}`} />
      <Chip label={`divider: ${palette.divider}`} />
    </ChipRow>
    <SwatchRow>
      <Swatch swatchColor={palette.primary.main} />
      <Swatch swatchColor={palette.background.default} />
      <Swatch swatchColor={palette.background.paper} />
      <Swatch swatchColor={palette.text.primary} />
      <Swatch swatchColor={palette.divider} />
    </SwatchRow>
  </Stack>
);
