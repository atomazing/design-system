import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import { starterFlowSteps } from "@/content/starterFlow";
import { LandingEditorialPanel } from "@/components/home/LandingEditorialPanel";
import { LandingHeroPreview } from "@/components/home/LandingHeroPreview";
import { MuiNextLink } from "@/components/ui/MuiNextLink";
import { StarterWordmark } from "@/components/ui/StarterWordmark";

export function GuidedStarterFlow() {
  const sectionMinHeight = "calc(100svh - var(--starter-header-height))";

  return (
    <Box
      data-home-shell="starter"
      data-start-flow="paged"
    >
      <Box
        component="section"
        data-flow-section="true"
        data-flow-label="Hero"
        data-flow-action-href="/presets"
        data-flow-action-label="Open presets"
        sx={{
          minHeight: sectionMinHeight,
          display: "flex",
          alignItems: "center",
          py: { xs: 2, md: 3 },
        }}
      >
        <Container maxWidth="lg" sx={{ width: "100%" }}>
          <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ width: "100%" }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 1.25, md: 2 }}
              alignItems={{ xs: "flex-start", md: "center" }}
              justifyContent="space-between"
            >
              <StarterWordmark
                logoSize={{ xs: 40, md: 44 }}
                titleVariant="text_md_semibold"
                captionVariant="text_sm_regular"
                titleSx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
                captionSx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
              />
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Chip
                  size="small"
                  label={
                    <Typography component="span" variant="text_xs_semibold" color="inherit">
                      Маршрутизатор приложений Next.js
                    </Typography>
                  }
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  size="small"
                  label={
                    <Typography component="span" variant="text_xs_semibold" color="inherit">
                      MUI v7
                    </Typography>
                  }
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  size="small"
                  label={
                    <Typography component="span" variant="text_xs_semibold" color="inherit">
                      Готово к статическому экспорту
                    </Typography>
                  }
                  color="primary"
                  variant="outlined"
                />
              </Stack>
            </Stack>

            <Box
              sx={{
                display: "grid",
                gap: { xs: 2, md: 2 },
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "minmax(0, 1.06fr) minmax(320px, 0.94fr)",
                },
                alignItems: "center",
              }}
            >
              <Stack spacing={1.75} sx={{ animation: "starter-rise-in 520ms ease-out both" }}>
                <Typography
                  variant="header_2xl_semibold"
                  component="h1"
                  sx={{
                    maxWidth: 780,
                    textWrap: "balance",
                    fontSize: {
                      xs: "clamp(2.15rem, 7vw, 2.9rem)",
                      md: "clamp(2.8rem, 4vw, 4rem)",
                    },
                    lineHeight: 0.95,
                    "@media (max-height: 840px)": {
                      fontSize: { xs: "2rem", md: "3.2rem" },
                    },
                  }}
                >
                  Запустите фирменный интерфейс на Next.js до того, как шаблон станет безликим.
                </Typography>
                <Typography
                  variant="text_lg_regular"
                  color="text.secondary"
                  sx={{
                    maxWidth: 620,
                    fontSize: { xs: "1rem", md: "1.08rem" },
                    lineHeight: 1.35,
                    "@media (max-height: 840px)": {
                      fontSize: { xs: "0.95rem", md: "1rem" },
                    },
                  }}
                >
                  Выберите пресет, проверьте систему тем и переходите к продуктовой работе со
                  стартовым шаблоном, который уже выглядит фирменно.
                </Typography>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  <Chip
                    size="small"
                    label={
                      <Typography component="span" variant="text_xs_semibold" color="inherit">
                        На основе пресетов
                      </Typography>
                    }
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    size="small"
                    label={
                      <Typography component="span" variant="text_xs_semibold" color="inherit">
                        Безопасно в рантайме
                      </Typography>
                    }
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    size="small"
                    label={
                      <Typography component="span" variant="text_xs_semibold" color="inherit">
                        Готово к релизу
                      </Typography>
                    }
                    color="primary"
                    variant="outlined"
                    sx={{ display: { xs: "none", sm: "inline-flex" } }}
                  />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} useFlexGap>
                  <Button component="a" href="#step-presets" variant="contained" size="large">
                    <Typography component="span" variant="text_sm_semibold" color="inherit">
                      Сделать первый шаг
                    </Typography>
                  </Button>
                </Stack>
              </Stack>

              <LandingHeroPreview />
            </Box>
          </Stack>
        </Container>
      </Box>

      {starterFlowSteps.map((step) => (
        <Box
          key={step.route}
          id={step.id}
          component="section"
          data-flow-section="true"
          data-flow-label={step.navLabel}
          data-flow-action-href={step.route}
          data-flow-action-label={step.actionLabel}
          sx={{
            minHeight: sectionMinHeight,
            display: "flex",
            alignItems: "center",
            py: { xs: 4, md: 6 },
          }}
        >
          <Container maxWidth="lg" sx={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gap: 3,
                gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.12fr) minmax(320px, 0.88fr)" },
                alignItems: "center",
              }}
            >
              <Stack spacing={3}>
                <Typography variant="text_xs_semibold" color="text.secondary">
                  {step.eyebrow}
                </Typography>

                <Stack spacing={1.5}>
                  <Typography
                    variant="header_xl_semibold"
                    component="h2"
                    sx={{
                      maxWidth: 760,
                      textWrap: "balance",
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="text_lg_regular"
                    color="text.secondary"
                    sx={{
                      maxWidth: 640,
                      fontSize: { xs: "1rem", md: "1.0625rem" },
                    }}
                  >
                    {step.description}
                  </Typography>
                </Stack>

                <Stack spacing={1.5}>
                  <Button component={MuiNextLink} href={step.route} variant="contained" size="large">
                    <Typography component="span" variant="text_sm_semibold" color="inherit">
                      {step.actionLabel}
                    </Typography>
                  </Button>
                </Stack>
              </Stack>

              <LandingEditorialPanel
                title={step.outcome}
                lines={step.highlights}
              />
            </Box>
          </Container>
        </Box>
      ))}

      <Box
        component="section"
        data-flow-section="true"
        data-flow-label="Ready"
        data-flow-action-href="/presets"
        data-flow-action-label="Start from presets"
        sx={{
          minHeight: sectionMinHeight,
          display: "flex",
          alignItems: "center",
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg" sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gap: 3,
              gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.12fr) minmax(320px, 0.88fr)" },
              alignItems: "center",
            }}
            >
              <Stack spacing={3}>
              <Typography variant="text_xs_semibold" color="text.secondary">
                В работу
              </Typography>

              <Stack spacing={1.5}>
                <Typography
                  variant="header_xl_semibold"
                  component="h2"
                  sx={{ maxWidth: 760, textWrap: "balance" }}
                >
                  Переходите от стартового шаблона к продуктовому экрану с минимумом доработок.
                </Typography>
                <Typography
                  variant="text_lg_regular"
                  color="text.secondary"
                  sx={{ maxWidth: 640, fontSize: { xs: "1rem", md: "1.0625rem" } }}
                >
                  Визуальное направление, настройки, состояние рантайма и статический вывод уже
                  на месте. Используйте шаблон как основу, а не переделывайте его после первой
                  демонстрации.
                </Typography>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} useFlexGap>
                <Button component={MuiNextLink} href="/presets" variant="contained" size="large">
                  <Typography component="span" variant="text_sm_semibold" color="inherit">
                    Начать с пресетов
                  </Typography>
                </Button>
                <Button component={MuiNextLink} href="/showcase" variant="text" color="inherit">
                  <Typography component="span" variant="text_sm_semibold" color="inherit">
                    Еще раз открыть обзор
                  </Typography>
                </Button>
              </Stack>
            </Stack>

            <LandingEditorialPanel
              title="Стартовый шаблон выглядит осмысленно еще до начала продуктовой разработки."
              lines={[
                "Пресеты уже задают нужный тон.",
                "Экран настроек и состояние уже подтверждают поведение в рантайме.",
                "Обзор и статический маршрут уже закрывают финальные визуальные и выпускные проверки.",
              ]}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
