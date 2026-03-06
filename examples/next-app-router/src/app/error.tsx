"use client";

import { useEffect } from "react";
import { Alert, Box, Button, Container, Stack, Typography } from "@mui/material";

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
        <Stack spacing={2}>
          <Typography variant="header_sm_semibold" component="h1">
            Что-то пошло не так
          </Typography>
          <Alert severity="error" variant="outlined">
            <Typography component="span" variant="text_sm_semibold" color="inherit">
              Страницу не удалось отрисовать.
            </Typography>
          </Alert>
          <Typography variant="text_sm_regular" color="text.secondary">
            {error.message || "Неизвестная ошибка"}
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Button variant="contained" onClick={reset}>
              <Typography component="span" variant="text_sm_semibold" color="inherit">
                Повторить
              </Typography>
            </Button>
            <Button href="/" variant="outlined">
              <Typography component="span" variant="text_sm_semibold" color="inherit">
                На главную
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
