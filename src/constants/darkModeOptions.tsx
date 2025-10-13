import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import PersonalVideoRoundedIcon from "@mui/icons-material/PersonalVideoRounded";

import type { OptionItem } from "../models";

const OPTION_ICON_SIZE = 32;

export const darkModeOptions: OptionItem[] = [
  {
    label: "Auto",
    value: "auto",
    icon: (
      <BrightnessAutoRoundedIcon
        color="inherit"
        sx={{ fontSize: OPTION_ICON_SIZE }}
      />
    ),
  },
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
