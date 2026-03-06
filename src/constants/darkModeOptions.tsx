import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import PersonalVideoRoundedIcon from "@mui/icons-material/PersonalVideoRounded";

import type { OptionItem } from "@/models";

// Keep `@mui/icons-material` as a peer dependency: this export is public.
const OPTION_ICON_SIZE = 32;

export const darkModeOptions: OptionItem[] = [
  {
    label: "System",
    value: "system",
    icon: (
      <PersonalVideoRoundedIcon
        color="inherit"
        sx={{ fontSize: OPTION_ICON_SIZE }}
      />
    ),
  },
  {
    label: "Light",
    value: "light",
    icon: (
      <LightModeRoundedIcon
        color="inherit"
        sx={{ fontSize: OPTION_ICON_SIZE }}
      />
    ),
  },
  {
    label: "Dark",
    value: "dark",
    icon: (
      <DarkModeRoundedIcon
        color="inherit"
        sx={{ fontSize: OPTION_ICON_SIZE }}
      />
    ),
  },
];
