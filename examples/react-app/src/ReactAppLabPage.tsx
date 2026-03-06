import { Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { CanonicalThemeProbe } from "./widgets/CanonicalThemeProbe";
import { PreviewSurface } from "./widgets/PreviewSurface";
import { SurfaceGallery } from "./widgets/SurfaceGallery";
import { ThemeDebugPanel } from "./widgets/themePanel";

import type { ThemeOption } from "./widgets/themePanel";

interface ReactAppLabPageProps {
  defaultThemeId: string;
  presetOptions: ThemeOption[];
}

export const ReactAppLabPage = ({
  defaultThemeId,
  presetOptions,
}: ReactAppLabPageProps) => (
  <PageRoot>
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="overline">Design System</Typography>
          <Typography variant="h3">Theme React App Lab</Typography>
          <Typography sx={{ maxWidth: 680 }} variant="body1">
            Built to reproduce dark mode and typography issues with a focused,
            high-signal UI. Toggle themes, switch modes, and verify typography
            values in real time.
          </Typography>
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
          <CanonicalThemeProbe />
        </ContentLayout>
      </Stack>
    </Container>
  </PageRoot>
);

const PageRoot = styled("div")(({ theme }) => ({
  minHeight: "100vh",
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
