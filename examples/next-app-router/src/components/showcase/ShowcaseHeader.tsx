"use client";

import { Button, Stack, Typography } from "@mui/material";

import { MuiNextLink } from "@/components/ui/MuiNextLink";

export function ShowcaseHeader() {
  return (
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h4" component="h1">
        Theme showcase
      </Typography>
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        <Button component={MuiNextLink} href="/debug/theme" variant="outlined">
          Theme diagnostics
        </Button>
        <Button component={MuiNextLink} href="/ssr" variant="outlined">
          SSR diagnostics
        </Button>
        <Button component={MuiNextLink} href="/" variant="outlined" color="primary">
          Back to diagnostics
        </Button>
      </Stack>
    </Stack>
  );
}
