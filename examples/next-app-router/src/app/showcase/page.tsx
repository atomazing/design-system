import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { SurfaceCards } from "@/components/showcase/SurfaceCards";
import { ShowcaseHeader } from "@/components/showcase/ShowcaseHeader";

export default function ShowcasePage() {
  return (
    <Box sx={{ minHeight: "100vh", py: 2 }}>
      <Container component="main" maxWidth="lg">
        <Stack spacing={2.5}>
          <Card elevation={0}>
            <CardContent>
              <Stack spacing={2}>
                <ShowcaseHeader />

                <Typography color="text.secondary">
                  Use the controls to switch preset and mode, then verify cards,
                  surfaces, and text remain readable in both light and dark
                  schemes.
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card elevation={0}>
            <CardContent>
              <Typography color="text.secondary">
                Theme controls are available on the dedicated diagnostics route:
                <Box component="span" sx={{ ml: 0.75, fontWeight: 600 }}>
                  /debug/theme
                </Box>
              </Typography>
            </CardContent>
          </Card>

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Surface and component matrix
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <SurfaceCards />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
