import { Box, Container, Stack } from "@mui/material";

import { ThemeControls } from "@/components/theme/ThemeControls";
import { FocusedPageHeader } from "@/components/ui/FocusedPageHeader";

export default function ThemeDebugPage() {
  return (
    <Box sx={{ minHeight: "calc(100svh - var(--starter-header-height))", py: { xs: 3, md: 4 } }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <FocusedPageHeader
            eyebrow="Тема"
            title="Переключайте пресеты и режим."
            description="Здесь можно менять активный пресет и темный режим."
            primaryAction={{ href: "/debug/state", label: "Активное состояние" }}
            secondaryAction={{ href: "/presets", label: "Пресеты" }}
          />

          <Box sx={{ width: "100%" }}>
            <ThemeControls />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
