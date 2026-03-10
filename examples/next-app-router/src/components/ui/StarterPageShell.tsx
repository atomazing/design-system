import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import type { Breakpoint } from "@mui/material";

import type { PropsWithChildren, ReactNode } from "react";

type StarterPageShellProps = PropsWithChildren<{
  maxWidth?: Breakpoint;
}>;

type StarterIntroPanelProps = PropsWithChildren<{
  title: string;
  description: string;
  actions?: ReactNode;
}>;

export function StarterPageShell({
  children,
  maxWidth = "md",
}: StarterPageShellProps) {
  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container component="main" maxWidth={maxWidth}>
        <Stack spacing={2.5}>{children}</Stack>
      </Container>
    </Box>
  );
}

export function StarterIntroPanel({
  title,
  description,
  actions,
  children,
}: StarterIntroPanelProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography variant="h4" component="h1">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Stack>

        {children}

        {actions ? (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            useFlexGap
            flexWrap="wrap"
          >
            {actions}
          </Stack>
        ) : null}
      </Stack>
    </Paper>
  );
}
