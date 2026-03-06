import { Button, Stack, Typography } from "@mui/material";
import type { ButtonProps } from "@mui/material";

import { MuiNextLink } from "@/components/ui/MuiNextLink";

type PageAction = {
  href: string;
  label: string;
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
};

type FocusedPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction?: PageAction;
  secondaryAction?: PageAction;
};

const renderAction = (
  action: PageAction,
  fallbackVariant: ButtonProps["variant"],
  fallbackColor: ButtonProps["color"],
) => (
  <Button
    component={MuiNextLink}
    href={action.href}
    variant={action.variant ?? fallbackVariant}
    color={action.color ?? fallbackColor}
  >
    <Typography component="span" variant="text_sm_semibold" color="inherit">
      {action.label}
    </Typography>
  </Button>
);

export function FocusedPageHeader({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: FocusedPageHeaderProps) {
  return (
    <Stack spacing={2.5}>
      {eyebrow ? (
        <Typography variant="text_xs_semibold" color="text.secondary">
          {eyebrow}
        </Typography>
      ) : null}

      <Stack spacing={1.5}>
        <Typography
          variant="header_lg_semibold"
          component="h1"
          sx={{ textWrap: "balance", fontSize: { xs: "2rem", md: "2.5rem" } }}
        >
          {title}
        </Typography>
        <Typography variant="text_md_regular" color="text.secondary" sx={{ maxWidth: 620 }}>
          {description}
        </Typography>
      </Stack>

      {primaryAction || secondaryAction ? (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {primaryAction ? renderAction(primaryAction, "contained", "primary") : null}
          {secondaryAction ? renderAction(secondaryAction, "text", "inherit") : null}
        </Stack>
      ) : null}
    </Stack>
  );
}
