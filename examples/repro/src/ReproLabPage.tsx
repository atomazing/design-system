import { Container, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import { PreviewSurface } from "./widgets/PreviewSurface";
import { SurfaceGallery } from "./widgets/SurfaceGallery";
import { ThemeDebugPanel } from "./widgets/themePanel";

import type { ThemeOption } from "./widgets/themePanel";

interface ReproLabPageProps {
  defaultThemeId: string;
  presetOptions: ThemeOption[];
}

export const ReproLabPage = ({
  defaultThemeId,
  presetOptions,
}: ReproLabPageProps) => (
  <PageRoot>
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <OverlineText variant="overline">Design System</OverlineText>
          <TitleText variant="h3">Theme Repro Lab</TitleText>
          <DescriptionText variant="body1">
            Built to reproduce dark mode and typography issues with a focused,
            high-signal UI. Toggle themes, switch modes, and verify typography
            values in real time.
          </DescriptionText>
        </Stack>

        <ContentLayout>
          <TopRow>
            <PanelSlot>
              <ThemeDebugPanel
                defaultThemeId={defaultThemeId}
                presetOptions={presetOptions}
              />
            </PanelSlot>
            <PanelSlot>
              <PreviewSurface />
            </PanelSlot>
          </TopRow>
          <SurfaceGallery />
        </ContentLayout>
      </Stack>
    </Container>
  </PageRoot>
);

const PageRoot = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  backgroundImage: `radial-gradient(1200px circle at 10% 10%, ${alpha(
    theme.palette.primary.main,
    0.18,
  )}, transparent 45%), radial-gradient(900px circle at 90% 20%, ${alpha(
    theme.palette.secondary.main,
    0.14,
  )}, transparent 40%)`,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

const ContentLayout = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const TopRow = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
  },
}));

const PanelSlot = styled("div")({
  flex: 1,
  minWidth: 0,
});

const OverlineText = styled(Typography)({
  letterSpacing: 3,
});

const TitleText = styled(Typography)({
  fontWeight: 700,
});

const DescriptionText = styled(Typography)({
  maxWidth: 680,
});
