import type { ReactNode } from "react";
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

import { APLAI_MESSAGE_MAP } from "./messageMap";
import type { SectionTone } from "./visualRhythm";

export type SectionProps = {
  id: string;
  title: string;
  question: string;
  artifact: string;
  tone: SectionTone;
  subtitle?: string;
  transition?: string;
  children: ReactNode;
};

const TIER_LABELS = {
  primary: "Primary",
  secondary: "Secondary",
  support: "Support",
} as const;

export function getSectionToneSx(tone: SectionTone) {
  if (tone === "pause") {
    return {
      px: { xs: 2, md: 3 },
      py: { xs: 3, md: 4 },
      bgcolor: "action.hover",
      border: 1,
      borderColor: "divider",
      borderRadius: 4,
    };
  }

  if (tone === "showcase") {
    return {
      px: { xs: 2, md: 3 },
      py: { xs: 3, md: 4 },
      border: 1,
      borderColor: "primary.light",
      borderRadius: 4,
      bgcolor: "background.paper",
      backgroundImage:
        "linear-gradient(135deg, rgba(25, 118, 210, 0.08) 0%, rgba(25, 118, 210, 0.18) 38%, rgba(255, 255, 255, 0.96) 100%)",
      boxShadow: 1,
    };
  }

  return {};
}

export function SectionMeta({
  question,
  artifact,
  tone,
  transition,
}: {
  question: string;
  artifact: string;
  tone: SectionTone;
  transition?: string;
}) {
  return (
    <Box
      data-section-question={question}
      data-section-artifact={artifact}
      data-section-transition={transition ?? ""}
      sx={{
        px: 1.5,
        py: 1.25,
        border: 1,
        borderColor: tone === "showcase" ? "primary.light" : "divider",
        bgcolor: tone === "showcase" ? "rgba(255, 255, 255, 0.7)" : "background.paper",
        borderRadius: 3,
      }}
    >
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip label="Question" size="small" variant="outlined" />
          <Typography variant="body2" color="text.secondary">
            {question}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip label="Artifact" size="small" variant="outlined" />
          <Typography variant="body2" color="text.secondary">
            {artifact}
          </Typography>
        </Stack>
        {transition ? (
          <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
            {transition}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  );
}

export function Section({
  id,
  title,
  question,
  artifact,
  tone,
  subtitle,
  transition,
  children,
}: SectionProps) {
  return (
    <Box
      id={id}
      component="section"
      data-rhythm-tone={tone}
      sx={{ py: { xs: 5, md: 8 }, scrollMarginTop: { xs: 88, md: 104 } }}
    >
      <Stack spacing={2}>
        <Box sx={getSectionToneSx(tone)}>
          <Stack spacing={2.5}>
            <Stack spacing={1}>
              <Typography variant="h4" component="h2">
                {title}
              </Typography>
              {subtitle ? (
                <Typography color="text.secondary" sx={{ maxWidth: 840 }}>
                  {subtitle}
                </Typography>
              ) : null}
            </Stack>
            <SectionMeta
              question={question}
              artifact={artifact}
              tone={tone}
              transition={transition}
            />
            {children}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export function TextCard({ children }: { children: ReactNode }) {
  return (
    <Card
      elevation={0}
      variant="outlined"
      sx={{
        height: "100%",
        borderRadius: 3,
      }}
    >
      <CardContent>
        {typeof children === "string" ? <Typography>{children}</Typography> : children}
      </CardContent>
    </Card>
  );
}

export function VendorLockNotice() {
  return (
    <Card elevation={0} variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="primary.main">
            {APLAI_MESSAGE_MAP.canonicalFacts.vendorLockLabel}
          </Typography>
          <Typography>{APLAI_MESSAGE_MAP.architecture.vendorLockStatement}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function IcpTierChip({ tier }: { tier: keyof typeof TIER_LABELS }) {
  return (
    <Chip
      label={TIER_LABELS[tier]}
      size="small"
      color={tier === "primary" ? "primary" : "default"}
      variant={tier === "primary" ? "filled" : "outlined"}
    />
  );
}
