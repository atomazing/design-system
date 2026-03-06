import { Box, Container, Stack } from "@mui/material";

import { ThemeSnapshotCard } from "@/components/theme/ThemeSnapshotCard";
import { FocusedPageHeader } from "@/components/ui/FocusedPageHeader";

export default function ThemeStatePage() {
  return (
    <Box sx={{ minHeight: "calc(100svh - var(--starter-header-height))", py: { xs: 3, md: 4 } }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <FocusedPageHeader
            eyebrow="Состояние"
            title="Проверьте текущее состояние темы."
            description="Посмотрите пресет, режим и итоговую палитру в одном месте."
            primaryAction={{ href: "/showcase", label: "Обзор" }}
            secondaryAction={{ href: "/debug/theme", label: "Тема" }}
          />

          <ThemeSnapshotCard />
        </Stack>
      </Container>
    </Box>
  );
}
