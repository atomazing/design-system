"use client";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function CanonicalThemeProbe() {
  const theme = useTheme();
  const radius = typeof theme.shape.borderRadius === "number" ? theme.shape.borderRadius : 0;
  const modeLabel = theme.palette.mode === "dark" ? "темный" : "светлый";

  const swatches = [
    {
      label: "Основной",
      bg: theme.palette.primary.main,
      fg: theme.palette.primary.contrastText,
    },
    {
      label: "Дополнительный",
      bg: theme.palette.secondary.main,
      fg: theme.palette.secondary.contrastText,
    },
    {
      label: "Поверхность",
      bg: theme.palette.background.paper,
      fg: theme.palette.text.primary,
    },
    {
      label: "Фон",
      bg: theme.palette.background.default,
      fg: theme.palette.text.primary,
    },
  ] as const;

  return (
    <Stack spacing={2}>
      <Card elevation={0}>
        <CardContent>
          <Stack spacing={1.5}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              <Typography variant="header_xs_semibold">Обзор поверхностей</Typography>
              <Chip
                label={
                  <Typography component="span" variant="text_xs_semibold" color="inherit">
                    {`режим: ${modeLabel}`}
                  </Typography>
                }
                color="primary"
                size="small"
                variant="outlined"
              />
            </Stack>

            <Divider />

            <Stack spacing={0.5}>
              <Typography variant="header_sm_semibold">Типографика</Typography>
              <Typography variant="text_md_semibold">
                Пример подзаголовка в активном пресете
              </Typography>
              <Typography variant="text_md_regular">
                Пример текста для сравнения семейства шрифта, интервалов и насыщенности.
              </Typography>
              <Typography variant="text_xs_regular" color="text.secondary">
                {theme.typography.fontFamily}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={{ xs: 2, sm: 3 }} useFlexGap flexWrap="wrap">
              {swatches.map((swatch) => (
                <Stack key={swatch.label} spacing={1} alignItems="center">
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: swatch.bg,
                      color: swatch.fg,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="text_xs_semibold">
                      {swatch.label.slice(0, 1)}
                    </Typography>
                  </Avatar>
                  <Typography variant="text_xs_regular" color="text.secondary">
                    {swatch.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Card elevation={0} sx={{ flex: 1 }}>
          <CardContent>
            <Stack spacing={1.5}>
              <Typography variant="header_xs_semibold">Поля и кнопки</Typography>
              <TextField
                size="small"
                label="Название проекта"
                defaultValue="Каноническая проверка"
                fullWidth
              />
              <TextField
                size="small"
                label="Заметки"
                multiline
                minRows={3}
                placeholder="Здесь должны быть заметны различия между пресетами"
                fullWidth
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
            <Button variant="contained">
              <Typography component="span" variant="text_sm_semibold" color="inherit">
                Основная
              </Typography>
            </Button>
            <Button variant="outlined">
              <Typography component="span" variant="text_sm_semibold" color="inherit">
                Вторичная
              </Typography>
            </Button>
            <Button variant="text">
              <Typography component="span" variant="text_sm_semibold" color="inherit">
                Текст
              </Typography>
            </Button>
          </CardActions>
        </Card>

        <Card elevation={0} sx={{ flex: 1 }}>
          <CardContent>
            <Stack spacing={1.5}>
              <Typography variant="header_xs_semibold">Форма и поверхности</Typography>

              <List dense disablePadding>
                <ListItem disableGutters>
                  <ListItemText
                    primary="Базовый радиус"
                    secondary={`theme.shape.borderRadius = ${String(theme.shape.borderRadius)}`}
                    primaryTypographyProps={{ variant: "text_sm_semibold" }}
                    secondaryTypographyProps={{ variant: "text_sm_regular", color: "text.secondary" }}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    primary="Токен поверхности"
                    secondary={theme.palette.background.paper}
                    primaryTypographyProps={{ variant: "text_sm_semibold" }}
                    secondaryTypographyProps={{ variant: "text_sm_regular", color: "text.secondary" }}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    primary="Тон разделителя"
                    secondary={theme.palette.divider}
                    primaryTypographyProps={{ variant: "text_sm_semibold" }}
                    secondaryTypographyProps={{ variant: "text_sm_regular", color: "text.secondary" }}
                  />
                </ListItem>
              </List>

              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Chip
                  size="small"
                  variant="outlined"
                  label={
                    <Typography component="span" variant="text_xs_semibold" color="inherit">
                      {`радиус ${radius}`}
                    </Typography>
                  }
                />
                <Chip
                  size="small"
                  variant="outlined"
                  label={
                    <Typography component="span" variant="text_xs_semibold" color="inherit">
                      тон поверхности
                    </Typography>
                  }
                />
                <Chip
                  size="small"
                  variant="outlined"
                  label={
                    <Typography component="span" variant="text_xs_semibold" color="inherit">
                      разделитель
                    </Typography>
                  }
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack spacing={1.5}>
        <Stack spacing={0.5}>
          <Typography variant="header_xs_semibold">Таблицы</Typography>
          <Typography variant="text_sm_regular" color="text.secondary">
            Сравните границы, чипы и контраст в одном месте.
          </Typography>
        </Stack>

        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="таблица проверки темы">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography component="span" variant="text_sm_semibold">
                    Проверка
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component="span" variant="text_sm_semibold">
                    Статус
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="span" variant="text_sm_semibold">
                    Источник
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography component="span" variant="text_sm_regular">
                    Типографика
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={
                      <Typography component="span" variant="text_xs_semibold" color="inherit">
                        набор шрифтов
                      </Typography>
                    }
                    color="secondary"
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography component="span" variant="text_sm_regular">
                    пресет
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography component="span" variant="text_sm_regular">
                    Оформление Card / Paper
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={
                      <Typography component="span" variant="text_xs_semibold" color="inherit">
                        граница + форма
                      </Typography>
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography component="span" variant="text_sm_regular">
                    переопределения MUI
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography component="span" variant="text_sm_regular">
                    Обводка поля
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={
                      <Typography component="span" variant="text_xs_semibold" color="inherit">
                        divider / alpha
                      </Typography>
                    }
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography component="span" variant="text_sm_regular">
                    MuiOutlinedInput
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}
