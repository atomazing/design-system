import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import type { MouseEvent } from "react";

const tokenRows = [
  { label: "background.default", key: "backgroundDefault" },
  { label: "background.paper", key: "backgroundPaper" },
  { label: "divider", key: "divider" },
  { label: "action.hover", key: "actionHover" },
  { label: "action.selected", key: "actionSelected" },
] as const;

const smokeChecks = [
  "Page background changes in dark",
  "Card/Paper background changes in dark",
  "Primary + secondary text readable",
  "Inputs and labels readable",
  "Divider visible",
  "Menu/Dialog readable",
];

const elevations = [0, 2, 8];

export const SurfaceGallery = () => {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);

  const colorMap = {
    backgroundDefault: theme.palette.background.default,
    backgroundPaper: theme.palette.background.paper,
    divider: theme.palette.divider,
    actionHover: theme.palette.action.hover,
    actionSelected: theme.palette.action.selected,
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  return (
    <GalleryRoot elevation={6}>
      <Stack spacing={3}>
        <HeaderRow
          alignItems={{ xs: "flex-start", sm: "center" }}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <OverlineText variant="overline">Surface Gallery</OverlineText>
            <TitleText variant="h5">Surface Consistency Check</TitleText>
            <Typography color="text.secondary" variant="body2">
              Verify background tokens, elevation, and component surfaces across
              themes.
            </Typography>
          </Box>
          <Chip
            color="primary"
            label={`Mode: ${theme.palette.mode}`}
            variant="outlined"
          />
        </HeaderRow>

        <ElevationsGrid>
          {elevations.map((elevation) => (
            <ElevationCard
              key={elevation}
              elevation={elevation}
              variant={elevation === 0 ? "outlined" : undefined}
            >
              <Typography variant="subtitle2">
                Paper {elevation === 0 ? "outlined" : `elevation ${elevation}`}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Sample surface content
              </Typography>
            </ElevationCard>
          ))}
        </ElevationsGrid>

        <ContentGrid>
          <FullHeightCard>
            <CardHeader
              subheader="Header, content, actions"
              title="Card Surface"
            />
            <CardContent>
              <Typography color="text.secondary" variant="body2">
                Card content uses the same paper surface token with a clear
                border treatment.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained">
                Primary
              </Button>
              <Button size="small" variant="outlined">
                Secondary
              </Button>
            </CardActions>
          </FullHeightCard>

          <TokenCard variant="outlined">
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Token Snapshot</Typography>
              {tokenRows.map((token) => (
                <TokenRow key={token.key}>
                  <ColorSwatch swatchColor={colorMap[token.key]} />
                  <Box>
                    <Typography variant="caption">{token.label}</Typography>
                    <Typography color="text.secondary" variant="caption">
                      {colorMap[token.key]}
                    </Typography>
                  </Box>
                </TokenRow>
              ))}
            </Stack>
          </TokenCard>
        </ContentGrid>

        <Divider />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Smoke Gate</Typography>
          <RadioGroup value="">
            {smokeChecks.map((label) => (
              <FormControlLabel
                key={label}
                control={<Radio checked disabled />}
                label={label}
                value={label}
              />
            ))}
          </RadioGroup>
        </Stack>

        <Divider />

        <ActionRow>
          <Button variant="contained" onClick={handleDialogOpen}>
            Open Dialog
          </Button>
          <Button variant="outlined" onClick={handleMenuOpen}>
            Open Menu
          </Button>
          <Button variant="outlined" onClick={handlePopoverOpen}>
            Open Popover
          </Button>
          <Button variant="outlined" onClick={handleDrawerOpen}>
            Open Drawer
          </Button>
        </ActionRow>
      </Stack>

      <SurfaceOverlays
        dialogOpen={dialogOpen}
        drawerOpen={drawerOpen}
        menuAnchor={menuAnchor}
        popoverAnchor={popoverAnchor}
        onDialogClose={handleDialogClose}
        onDrawerClose={handleDrawerClose}
        onMenuClose={handleMenuClose}
        onPopoverClose={handlePopoverClose}
      />
    </GalleryRoot>
  );
};

interface SurfaceOverlaysProps {
  dialogOpen: boolean;
  menuAnchor: null | HTMLElement;
  popoverAnchor: null | HTMLElement;
  drawerOpen: boolean;
  onDialogClose: () => void;
  onMenuClose: () => void;
  onPopoverClose: () => void;
  onDrawerClose: () => void;
}

const SurfaceOverlays = ({
  dialogOpen,
  menuAnchor,
  popoverAnchor,
  drawerOpen,
  onDialogClose,
  onMenuClose,
  onPopoverClose,
  onDrawerClose,
}: SurfaceOverlaysProps) => {
  const handleDialogClose = onDialogClose;
  const handleMenuClose = onMenuClose;
  const handlePopoverClose = onPopoverClose;
  const handleDrawerClose = onDrawerClose;

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Dialog Surface</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Dialogs should inherit the paper surface background and readable
            overlay treatment.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogClose}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem>Menu action</MenuItem>
        <MenuItem>Secondary action</MenuItem>
        <MenuItem>Destructive action</MenuItem>
      </Menu>

      <Popover
        anchorEl={popoverAnchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={Boolean(popoverAnchor)}
        onClose={handlePopoverClose}
      >
        <PopoverContent>
          <Typography variant="subtitle2">Popover Surface</Typography>
          <Typography color="text.secondary" variant="body2">
            Popover content should use the same paper background token.
          </Typography>
        </PopoverContent>
      </Popover>

      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <DrawerContent>
          <DrawerTitle variant="h6">Drawer Surface</DrawerTitle>
          <List>
            {["Overview", "Details", "Settings"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Button variant="outlined" fullWidth onClick={handleDrawerClose}>
            Close drawer
          </Button>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const GalleryRoot = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
  },
}));

const HeaderRow = styled(Stack)({});

const ElevationsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

const ContentGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "7fr 5fr",
  },
}));

const ElevationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: 120,
}));

const FullHeightCard = styled(Card)({
  height: "100%",
});

const TokenCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const TokenRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
}));

const ColorSwatch = styled("span", {
  shouldForwardProp: (prop) => prop !== "swatchColor",
})<{ swatchColor: string }>(({ theme, swatchColor }) => ({
  width: 20,
  height: 20,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: swatchColor,
}));

const ActionRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
}));

const PopoverContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 220,
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  width: 280,
  padding: theme.spacing(2),
}));

const DrawerTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const OverlineText = styled(Typography)({
  letterSpacing: 2,
});

const TitleText = styled(Typography)({
  fontWeight: 700,
});
