import { Box, Container, Divider, Stack, Typography } from "@mui/material";

import { FocusedPageHeader } from "@/components/ui/FocusedPageHeader";
import { exampleThemes } from "@/theme/exampleThemes";

export default function PresetsPage() {
  return (
    <Box sx={{ minHeight: "calc(100svh - var(--starter-header-height))", py: { xs: 3, md: 4 } }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <FocusedPageHeader
            eyebrow="Пресеты"
            title="Выберите визуальное направление."
            description="Просмотрите набор пресетов, используемый в стартовом шаблоне."
            primaryAction={{ href: "/debug/theme", label: "Настройки темы" }}
            secondaryAction={{ href: "/", label: "Главная" }}
          />

          <Stack divider={<Divider flexItem />} spacing={2.5}>
            {exampleThemes.map((preset) => (
              <Stack
                key={preset.id}
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "baseline" }}
              >
                <Typography variant="text_md_semibold">{preset.label}</Typography>
                <Typography variant="text_sm_regular" color="text.secondary">
                  {preset.id}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
