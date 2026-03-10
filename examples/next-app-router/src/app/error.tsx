"use client";

import { useEffect } from "react";
import { Alert, Box, Button, Card, CardContent, Container, Stack, Typography } from "@mui/material";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box sx={{ minHeight: "100vh", py: 2 }}>
      <Container maxWidth="md">
        <Card elevation={0}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h5" component="h1">
                Something went wrong
              </Typography>
              <Alert severity="error" variant="outlined">
                This is the App Router route error boundary example.
              </Alert>
              <Typography variant="body2" color="text.secondary">
                {error.message || "Unknown error"}
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Button variant="contained" onClick={reset}>
                  Try again
                </Button>
                <Button href="/" variant="outlined">
                  Back home
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
