"use client";

import { Stack, Typography } from "@mui/material";
import type { StackProps, SxProps, Theme, TypographyProps } from "@mui/material";

import { StarterLogo } from "@/components/ui/StarterLogo";

type StarterWordmarkProps = {
  logoSize?: number | { xs?: number | string; sm?: number | string; md?: number | string };
  titleVariant?: TypographyProps["variant"];
  captionVariant?: TypographyProps["variant"];
  titleSx?: SxProps<Theme>;
  captionSx?: SxProps<Theme>;
  showCaption?: boolean;
  stackProps?: Omit<StackProps, "direction" | "spacing" | "alignItems">;
};

export function StarterWordmark({
  logoSize = 36,
  titleVariant = "text_sm_semibold",
  captionVariant = "text_xs_regular",
  titleSx,
  captionSx,
  showCaption = true,
  stackProps,
}: StarterWordmarkProps) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center" {...stackProps}>
      <StarterLogo sx={{ fontSize: logoSize, flexShrink: 0 }} />
      <Stack spacing={0.125}>
        <Typography variant={titleVariant} sx={titleSx}>
          Стартовый шаблон дизайн-системы
        </Typography>
        {showCaption ? (
          <Typography variant={captionVariant} color="text.secondary" sx={captionSx}>
            Маршрутизатор приложений Next.js
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  );
}
