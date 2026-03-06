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

const toModeLabel = (value: string) => {
  switch (value) {
    case "dark":
      return "темный";
    case "light":
      return "светлый";
    case "system":
      return "системный";
    case "unknown":
      return "недоступно";
    default:
      return value;
  }
};

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
            <Typography variant="header_xs_semibold">Активное состояние темы</Typography>
            <Chip
              label={
                <Typography component="span" variant="text_xs_semibold" color="inherit">
                  {`Режим палитры: ${toModeLabel(muiTheme.palette.mode)}`}
                </Typography>
              }
              size="small"
              color="primary"
              variant="outlined"
            />
          </Stack>

          <Divider />

          {systemTheme === "unknown" && (
            <Typography variant="text_sm_regular" color="text.secondary">
              Системная тема недоступна на сервере и определяется после гидрации.
            </Typography>
          )}

          <List dense disablePadding>
            <ListItem disableGutters>
              <ListItemText
                primary="Идентификатор выбранного пресета"
                secondary={theme}
                primaryTypographyProps={{ variant: "text_sm_semibold" }}
                secondaryTypographyProps={{ variant: "text_sm_regular", color: "text.secondary" }}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Заданный режим темы"
                secondary={toModeLabel(darkMode)}
                primaryTypographyProps={{ variant: "text_sm_semibold" }}
                secondaryTypographyProps={{ variant: "text_sm_regular", color: "text.secondary" }}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Определенная системная тема"
                secondary={toModeLabel(systemTheme)}
                primaryTypographyProps={{ variant: "text_sm_semibold" }}
                secondaryTypographyProps={{ variant: "text_sm_regular", color: "text.secondary" }}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Итоговый режим палитры"
                secondary={toModeLabel(effectiveMode)}
                primaryTypographyProps={{ variant: "text_sm_semibold" }}
                secondaryTypographyProps={{ variant: "text_sm_regular", color: "text.secondary" }}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Идентификатор пресета по умолчанию"
                secondary={defaultThemeName}
                primaryTypographyProps={{ variant: "text_sm_semibold" }}
                secondaryTypographyProps={{ variant: "text_sm_regular", color: "text.secondary" }}
              />
            </ListItem>
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}
