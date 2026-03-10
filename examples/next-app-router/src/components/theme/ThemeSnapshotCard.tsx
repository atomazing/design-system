"use client";

import {
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  resolveEffectiveMode,
  useSystemTheme,
  useThemeSettings,
} from "@atomazing-org/design-system";

export function ThemeSnapshotCard() {
  const muiTheme = useTheme();
  const systemTheme = useSystemTheme();
  const { theme, darkMode, defaultThemeName } = useThemeSettings();

  const effectiveMode = resolveEffectiveMode(darkMode, systemTheme);

  return (
    <Card elevation={0}>
      <CardContent>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <Typography variant="h6">Theme snapshot</Typography>
            <Chip
              label={`mui palette.mode = ${muiTheme.palette.mode}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Stack>

          <Divider />

          {systemTheme === "unknown" && (
            <Typography variant="body2" color="text.secondary">
              `systemTheme` is `unknown` on the server and resolves on the client after hydration.
            </Typography>
          )}

          <List dense disablePadding>
            <ListItem disableGutters>
              <ListItemText
                primary="Selected preset id"
                secondary={theme}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Configured darkMode"
                secondary={darkMode}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Detected systemTheme"
                secondary={systemTheme}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Effective palette mode"
                secondary={effectiveMode}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Default preset id"
                secondary={defaultThemeName}
              />
            </ListItem>
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}
