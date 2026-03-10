"use client";

import { Button, Stack } from "@mui/material";

import { MuiNextLink } from "@/components/ui/MuiNextLink";

export function HomeHeroActions() {
  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
      <Button component={MuiNextLink} href="/showcase" variant="contained" color="primary">
        Open showcase
      </Button>
      <Button component={MuiNextLink} href="/ssr" variant="outlined">
        Open SSR diagnostics
      </Button>
      <Button component={MuiNextLink} href="/debug/theme" variant="outlined">
        Open theme diagnostics
      </Button>
      <Button
        href="https://mui.com/material-ui/integrations/nextjs/"
        target="_blank"
        rel="noreferrer"
        variant="outlined"
      >
        MUI Next.js docs
      </Button>
    </Stack>
  );
}
