import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { ThemeControls } from "@/components/theme/ThemeControls";
import { ThemeSnapshotCard } from "@/components/theme/ThemeSnapshotCard";
import { MuiNextLink } from "@/components/ui/MuiNextLink";

export default function ThemeDebugPage() {
  return (
    <Box sx={{ minHeight: "100vh", py: 2 }}>
      <Container maxWidth="lg">
        <Stack spacing={2.5}>
          <Card elevation={0}>
            <CardContent>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h4" component="h1">
                    Theme diagnostics
                  </Typography>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    <Button component={MuiNextLink} href="/showcase" variant="outlined">
                      Showcase
                    </Button>
                    <Button component={MuiNextLink} href="/ssr" variant="outlined">
                      SSR diagnostics
                    </Button>
                    <Button component={MuiNextLink} href="/" variant="outlined" color="primary">
                      Home
                    </Button>
                  </Stack>
                </Stack>
                <Typography color="text.secondary">
                  Dedicated debug route for theme switching, dark mode, system
                  detection, and persisted settings validation. Keep this out of
                  the starter home page to preserve product-like composition.
                </Typography>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  Styling rule: use app-level layout composition here, but let
                  the visual system come from the design-system provider and
                  preset themes.
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            alignItems="flex-start"
          >
            <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
              <ThemeControls />
            </Box>
            <Box sx={{ width: "100%", maxWidth: { xs: "100%", md: 420 } }}>
              <ThemeSnapshotCard />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
