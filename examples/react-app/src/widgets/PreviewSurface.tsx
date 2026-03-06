import { useState } from "react";
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

export const PreviewSurface = () => {
  const [status, setStatus] = useState("active");

  return (
    <Paper elevation={8} sx={{ p: { xs: 3, md: 6 } }}>
      <Stack spacing={2.5}>
        <Stack spacing={0.5}>
          <Typography variant="overline">Typography</Typography>
          <Typography variant="h5">Variants</Typography>
        </Stack>
        <Stack spacing={1.25}>
          <Typography variant="h3">Heading H3</Typography>
          <Typography variant="h4">Heading H4</Typography>
          <Typography variant="subtitle1">Subtitle 1</Typography>
          <Typography variant="body1">Body 1 sample sentence.</Typography>
          <Typography variant="body2">Body 2 sample sentence.</Typography>
          <Typography variant="caption">Caption text sample.</Typography>
          <Typography variant="overline">Overline sample</Typography>
          <Typography variant="body1">
            Custom typography token sample (consumer fallback variant).
          </Typography>
          <Typography variant="h6">
            Custom header token sample (consumer fallback variant).
          </Typography>
          <Typography color="text.secondary" variant="caption">
            Increase browser font size / OS text scaling to verify rem-based
            scaling.
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" flexWrap="wrap" spacing={1}>
          <Button variant="contained">Primary Action</Button>
          <Button variant="outlined">Secondary</Button>
          <Button variant="text">Ghost</Button>
          <Chip color="primary" label="Status: Live" />
          <Chip label="Tag" variant="outlined" />
          <Tooltip title="Quick action">
            <IconButton aria-label="quick action">+</IconButton>
          </Tooltip>
        </Stack>

        <Divider />

        <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={2}>
          <TextField label="Search" size="small" />
          <TextField
            helperText="Helper text"
            label="Email"
            size="small"
            type="email"
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              label="Status"
              labelId="status-label"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="paused">Paused</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Opt-in"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Alerts"
          />
        </Stack>
      </Stack>
    </Paper>
  );
};
