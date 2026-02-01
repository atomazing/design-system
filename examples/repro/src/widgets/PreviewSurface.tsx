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
import { alpha, styled } from "@mui/material/styles";

export const PreviewSurface = () => {
  const [status, setStatus] = useState("active");

  return (
    <PreviewCard elevation={8}>
      <Stack spacing={2.5}>
        <Stack spacing={0.5}>
          <OverlineText variant="overline">Typography</OverlineText>
          <TitleText variant="h5">Variants</TitleText>
        </Stack>
        <Stack spacing={1.25}>
          <Typography variant="h3">Heading H3</Typography>
          <Typography variant="h4">Heading H4</Typography>
          <Typography variant="subtitle1">Subtitle 1</Typography>
          <Typography variant="body1">Body 1 sample sentence.</Typography>
          <Typography variant="body2">Body 2 sample sentence.</Typography>
          <Typography variant="caption">Caption text sample.</Typography>
          <Typography variant="overline">Overline sample</Typography>
          <Typography variant="text_md_regular">
            Custom text_md_regular sample.
          </Typography>
          <Typography variant="header_md_semibold">
            Custom header_md_semibold sample.
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
          <StatusControl size="small">
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
          </StatusControl>
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
    </PreviewCard>
  );
};

const PreviewCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  background: `linear-gradient(180deg, ${alpha(
    theme.palette.background.paper,
    0.96,
  )}, ${alpha(theme.palette.background.paper, 0.86)})`,
}));

const OverlineText = styled(Typography)({
  letterSpacing: 2,
});

const StatusControl = styled(FormControl)({
  minWidth: 160,
});

const TitleText = styled(Typography)({
  fontWeight: 700,
});
