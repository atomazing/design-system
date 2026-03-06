import { Box, Container, Stack } from "@mui/material";

import { FocusedPageHeader } from "@/components/ui/FocusedPageHeader";

export default function NotFoundPage() {
  return (
    <Box sx={{ minHeight: "calc(100svh - var(--starter-header-height))", py: { xs: 3, md: 4 } }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <FocusedPageHeader
            eyebrow="404"
            title="Страница не найдена"
            description="Открытая страница не существует."
            primaryAction={{ href: "/", label: "Главная" }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
