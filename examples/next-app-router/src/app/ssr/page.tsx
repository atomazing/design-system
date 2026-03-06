import { Box, Container, Divider, Stack, Typography } from "@mui/material";

import { FocusedPageHeader } from "@/components/ui/FocusedPageHeader";

export default async function SsrDiagnosticsPage() {
  const renderedAt = new Date().toISOString();

  return (
    <Box sx={{ minHeight: "calc(100svh - var(--starter-header-height))", py: { xs: 3, md: 4 } }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <FocusedPageHeader
            eyebrow="Статический вывод"
            title="Проверьте результат сборки."
            description="Метка времени ниже должна оставаться неизменной до следующей сборки."
            primaryAction={{ href: "/", label: "Главная" }}
            secondaryAction={{ href: "/showcase", label: "Обзор" }}
          />

          <Divider />

          <Stack spacing={1}>
            <Typography variant="header_xs_semibold">Метка сборки</Typography>
            <Typography variant="text_md_regular">Собрано: {renderedAt}</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
