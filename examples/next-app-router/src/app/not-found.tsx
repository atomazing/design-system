import { Box, Button, Card, CardContent, Container, Stack, Typography } from "@mui/material";

export default function NotFoundPage() {
  return (
    <Box sx={{ minHeight: "100vh", py: 2 }}>
      <Container maxWidth="md">
        <Card elevation={0}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h4" component="h1">
                Page not found
              </Typography>
              <Typography color="text.secondary">
                This route does not exist in the Next.js SSR reference example.
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button href="/" variant="contained">
                  Go to home
                </Button>
                <Button href="/showcase" variant="outlined">
                  Open showcase
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
