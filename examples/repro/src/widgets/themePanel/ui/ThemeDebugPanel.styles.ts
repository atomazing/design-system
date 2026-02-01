import { Paper, RadioGroup, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const PanelRoot = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: `linear-gradient(160deg, ${alpha(
    theme.palette.background.paper,
    0.9,
  )}, ${alpha(theme.palette.background.paper, 0.75)})`,
}));

export const ControlGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
  },
}));

export const PresetGroup = styled(RadioGroup)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

export const ChipRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

export const ActionRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

export const SwatchRow = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1.5),
}));

export const Swatch = styled("span", {
  shouldForwardProp: (prop) => prop !== "swatchColor",
})<{ swatchColor: string }>(({ theme, swatchColor }) => ({
  width: 24,
  height: 24,
  backgroundColor: swatchColor,
  border: `1px solid ${theme.palette.divider}`,
}));

export const JsonBlock = styled("pre")(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  fontSize: "0.75rem",
  whiteSpace: "pre-wrap",
}));

export const OverlineText = styled(Typography)({
  letterSpacing: 2,
});

export const TitleText = styled(Typography)({
  fontWeight: 700,
});
