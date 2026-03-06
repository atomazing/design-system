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
import { useTheme } from "@mui/material/styles";

export const CanonicalThemeProbe = () => {
  const theme = useTheme();
  const radius =
    typeof theme.shape.borderRadius === "number" ? theme.shape.borderRadius : 0;

  return (
    <Stack spacing={2}>
      <Paper elevation={0} sx={{ p: 2.5 }}>
        <Stack spacing={1.25}>
          <Stack
            alignItems={{ xs: "flex-start", sm: "center" }}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={1}
          >
            <Box>
              <Typography variant="h6">Canonical Theme Probe</Typography>
              <Typography color="text.secondary" variant="body2">
                Local probe for this react-app example.
              </Typography>
            </Box>
            <Chip
              color="primary"
              label={`mode: ${theme.palette.mode}`}
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
            <Typography color="text.secondary" variant="caption">
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
              {
                label: "default",
                bg: "background.default",
                fg: "text.primary",
              },
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
                <Typography sx={{ display: "block" }} variant="caption">
                  {swatch.label}
                </Typography>
                <Typography variant="body2">token</Typography>
              </Box>
            ))}
          </Box>

          <Tabs aria-label="canonical probe tabs" value={0}>
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
              <Typography color="text.secondary" variant="body2">
                Good for seeing input chrome, button shape, and typography.
              </Typography>
              <TextField
                defaultValue="Canonical probe"
                label="Project name"
                size="small"
                fullWidth
              />
              <TextField
                label="Notes"
                minRows={3}
                placeholder="Preset differences should be visible here"
                size="small"
                fullWidth
                multiline
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
              <Typography color="text.secondary" variant="body2">
                Makes `shape.borderRadius`, divider tone, and surface treatment
                easier to compare.
              </Typography>
              <Stack divider={<Divider flexItem />} spacing={1.5}>
                <Stack
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Box>
                    <Typography variant="subtitle2">Radius base</Typography>
                    <Typography color="text.secondary" variant="body2">
                      theme.shape.borderRadius ={" "}
                      {String(theme.shape.borderRadius)}
                    </Typography>
                  </Box>
                  <Chip
                    label={`radius ${String(radius)}`}
                    size="small"
                    variant="outlined"
                  />
                </Stack>

                <Stack
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Box>
                    <Typography variant="subtitle2">Radius x2</Typography>
                    <Typography color="text.secondary" variant="body2">
                      Compare the preset shape scale without adding nested probe
                      surfaces.
                    </Typography>
                  </Box>
                  <Chip
                    color="secondary"
                    label={`radius ${String(radius * 2)}`}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Card elevation={0}>
        <CardContent>
          <Stack spacing={1.5}>
            <Typography variant="h6">Table / border override probe</Typography>
            <Typography color="text.secondary" variant="body2">
              Preset `MuiTableHead` and `MuiTableCell` overrides are often
              easier to compare than plain white cards.
            </Typography>

            <Alert severity="info" variant="outlined">
              Compare the same preset here across routes to validate
              consistency.
            </Alert>

            <TableContainer>
              <Table aria-label="canonical theme probe table" size="small">
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
                      <Chip color="secondary" label="font stack" size="small" />
                    </TableCell>
                    <TableCell align="right">preset</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Card / Paper chrome</TableCell>
                    <TableCell>
                      <Chip label="border + shape" size="small" />
                    </TableCell>
                    <TableCell align="right">MUI overrides</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Input outline</TableCell>
                    <TableCell>
                      <Chip
                        label="divider/alpha"
                        size="small"
                        variant="outlined"
                      />
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
};
