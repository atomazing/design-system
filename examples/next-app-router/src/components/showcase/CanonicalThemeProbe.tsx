"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export function CanonicalThemeProbe() {
  const theme = useTheme();
  const radius =
    typeof theme.shape.borderRadius === "number" ? theme.shape.borderRadius : 0;

  return (
    <Stack spacing={2}>
      <Paper elevation={0} sx={{ p: 2.5 }}>
        <Stack spacing={1.25}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Box>
              <Typography variant="h6">Canonical Theme Probe</Typography>
              <Typography variant="body2" color="text.secondary">
                Local probe for this Next example.
              </Typography>
            </Box>
            <Chip
              label={`mode: ${theme.palette.mode}`}
              color="primary"
              size="small"
              variant="outlined"
            />
          </Stack>

          <Divider />

          <Stack spacing={0.5}>
            <Typography variant="h4">Aa - Typography probe</Typography>
            <Typography variant="subtitle1">
              Subtitle sample with active preset typography
            </Typography>
            <Typography variant="body1">
              Body sample sentence to compare font family, spacing, and weight
              across presets.
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {theme.typography.fontFamily}
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(4, minmax(0, 1fr))",
              },
            }}
          >
            {[
              {
                label: "primary",
                bg: "primary.main",
                fg: "primary.contrastText",
              },
              {
                label: "secondary",
                bg: "secondary.main",
                fg: "secondary.contrastText",
              },
              { label: "paper", bg: "background.paper", fg: "text.primary" },
              { label: "default", bg: "background.default", fg: "text.primary" },
            ].map((swatch) => (
              <Box
                key={swatch.label}
                sx={{
                  p: 1.25,
                  borderRadius: 1.5,
                  border: 1,
                  borderColor: "divider",
                  bgcolor: swatch.bg,
                  color: swatch.fg,
                }}
              >
                <Typography variant="caption" sx={{ display: "block" }}>
                  {swatch.label}
                </Typography>
                <Typography variant="body2">token</Typography>
              </Box>
            ))}
          </Box>

          <Tabs value={0} aria-label="canonical probe tabs">
            <Tab label="Overview" />
            <Tab label="Inputs" />
            <Tab label="Table" />
          </Tabs>
        </Stack>
      </Paper>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Card elevation={0} sx={{ flex: 1 }}>
          <CardContent>
            <Stack spacing={1.5}>
              <Typography variant="h6">Inputs and buttons</Typography>
              <Typography variant="body2" color="text.secondary">
                Good for seeing input chrome, button shape, and typography.
              </Typography>
              <TextField
                size="small"
                label="Project name"
                defaultValue="Canonical probe"
                fullWidth
              />
              <TextField
                size="small"
                label="Notes"
                multiline
                minRows={3}
                placeholder="Preset differences should be visible here"
                fullWidth
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
            <Button variant="contained">Primary</Button>
            <Button variant="outlined">Secondary</Button>
            <Button variant="text">Ghost</Button>
          </CardActions>
        </Card>

        <Card elevation={0} sx={{ flex: 1 }}>
          <CardContent>
            <Stack spacing={1.5}>
              <Typography variant="h6">Shape and surface probe</Typography>
              <Typography variant="body2" color="text.secondary">
                Makes `shape.borderRadius`, divider tone, and surface treatment
                easier to compare.
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: radius,
                }}
              >
                <Typography variant="subtitle2">Radius base</Typography>
                <Typography variant="body2" color="text.secondary">
                  theme.shape.borderRadius = {String(theme.shape.borderRadius)}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: radius * 2,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.primary.main,
                    0.12,
                  )}, ${alpha(theme.palette.secondary.main, 0.12)})`,
                }}
              >
                <Typography variant="subtitle2">Radius x2 + token blend</Typography>
                <Typography variant="body2" color="text.secondary">
                  Highlights shape and palette differences beyond page background.
                </Typography>
              </Paper>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Card elevation={0}>
        <CardContent>
          <Stack spacing={1.5}>
            <Typography variant="h6">Table / border override probe</Typography>
            <Typography variant="body2" color="text.secondary">
              Preset `MuiTableHead` and `MuiTableCell` overrides are often easier
              to compare than plain white cards.
            </Typography>

            <Alert severity="info" variant="outlined">
              Compare the same preset here across routes to validate consistency.
            </Alert>

            <TableContainer component={Paper} variant="outlined">
              <Table size="small" aria-label="canonical theme probe table">
                <TableHead>
                  <TableRow>
                    <TableCell>Probe</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Source</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Typography</TableCell>
                    <TableCell>
                      <Chip size="small" label="font stack" color="secondary" />
                    </TableCell>
                    <TableCell align="right">preset</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Card / Paper chrome</TableCell>
                    <TableCell>
                      <Chip size="small" label="border + shape" />
                    </TableCell>
                    <TableCell align="right">MUI overrides</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Input outline</TableCell>
                    <TableCell>
                      <Chip size="small" label="divider/alpha" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">MuiOutlinedInput</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
