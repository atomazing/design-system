import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { ThemeSnapshotCard } from "@/components/theme/ThemeSnapshotCard";

export default async function SsrDiagnosticsPage() {
  const renderedAt = new Date().toISOString();

  return (
    <Box sx={{ minHeight: "100vh", py: 2 }}>
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <Card elevation={0}>
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  <Chip label="Static export route" color="primary" />
                  <Chip label="App Router" variant="outlined" />
                </Stack>
                <Typography variant="h4" component="h1">
                  Static diagnostics
                </Typography>
                <Typography color="text.secondary">
                  This page is pre-rendered at build time and can be deployed as static files.
                </Typography>
                <Divider />
                <Typography variant="body2">
                  <strong>Built at:</strong> {renderedAt}
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          <ThemeSnapshotCard />
        </Stack>
      </Container>
    </Box>
  );
}
