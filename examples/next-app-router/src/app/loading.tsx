import { Box, Card, CardContent, Container, LinearProgress, Stack, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ minHeight: "calc(100svh - var(--starter-header-height))", py: 2 }}>
      <Container maxWidth="lg">
        <Card elevation={0}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="header_xs_semibold">Загрузка...</Typography>
              <LinearProgress />
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
