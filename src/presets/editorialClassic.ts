import {
  editorialClassic as editorialClassicLight,
  editorialClassicDark,
} from "@/constants/themes/editorialClassic";

import type { ThemePreset } from "@/models";

export const editorialClassic: ThemePreset = {
  id: "Editorial Classic",
  label: "Editorial Classic",
  colorSchemes: {
    light: editorialClassicLight,
    dark: editorialClassicDark,
  },
};
