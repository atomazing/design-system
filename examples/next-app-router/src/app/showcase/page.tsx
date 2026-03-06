import { Box, Container, Stack } from "@mui/material";

import { SurfaceCards } from "@/components/showcase/SurfaceCards";
import { FocusedPageHeader } from "@/components/ui/FocusedPageHeader";

export default function ShowcasePage() {
  return (
    <Box sx={{ minHeight: "calc(100svh - var(--starter-header-height))", py: { xs: 3, md: 4 } }}>
      <Container component="main" maxWidth="lg">
        <Stack spacing={4}>
          <FocusedPageHeader
            eyebrow="Обзор"
            title="Проверьте поверхности."
            description="Сравните ключевые поверхности интерфейса в активном пресете."
            primaryAction={{ href: "/ssr", label: "Статический вывод" }}
            secondaryAction={{ href: "/debug/state", label: "Состояние" }}
          />

          <SurfaceCards />
        </Stack>
      </Container>
    </Box>
  );
}
