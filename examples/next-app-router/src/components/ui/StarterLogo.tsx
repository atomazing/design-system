"use client";

import { useId } from "react";
import { SvgIcon } from "@mui/material";
import type { SvgIconProps } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export function StarterLogo(props: SvgIconProps) {
  const theme = useTheme();
  const gradientId = useId();
  const frameFill =
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.black, 0.82)
      : alpha(theme.palette.common.black, 0.92);
  const frameStroke =
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.08)
      : alpha(theme.palette.common.white, 0.14);

  return (
    <SvgIcon
      viewBox="0 0 64 64"
      sx={{ fontSize: 36 }}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.palette.primary.main} />
          <stop offset="100%" stopColor={theme.palette.secondary.main} />
        </linearGradient>
      </defs>
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="14"
        fill={frameFill}
        stroke={frameStroke}
        strokeWidth="1"
      />
      <path
        d="M18 32c0-7.732 6.268-14 14-14h14v8H32a6 6 0 0 0 0 12h6v8h-6c-7.732 0-14-6.268-14-14Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M30 18h4c6.627 0 12 5.373 12 12s-5.373 12-12 12h-4v-8h4a4 4 0 0 0 0-8h-4v-8Z"
        fill="#ffffff"
        fillOpacity="0.94"
      />
    </SvgIcon>
  );
}
