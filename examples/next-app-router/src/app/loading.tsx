import { Box, Card, CardContent, Container, LinearProgress, Stack, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ minHeight: "100vh", py: 2 }}>
      <Container maxWidth="lg">
        <Card elevation={0}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Loading reference page…</Typography>
              <Typography variant="body2" color="text.secondary">
                Next.js route loading state for the App Router example.
              </Typography>
              <LinearProgress />
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
