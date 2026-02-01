import { editorialClassic } from "./editorialClassic";
import { modernMinimal } from "./modernMinimal";
import { neoGlass } from "./neoGlass";
import { retroTerminal } from "./retroTerminal";
import { warmEarth } from "./warmEarth";

import type { ThemePreset } from "@/models";

export type { ThemePreset } from "@/models";

export { editorialClassic } from "./editorialClassic";
export { modernMinimal } from "./modernMinimal";
export { neoGlass } from "./neoGlass";
export { retroTerminal } from "./retroTerminal";
export { warmEarth } from "./warmEarth";

export const defaultThemes: ThemePreset[] = [
  editorialClassic,
  modernMinimal,
  neoGlass,
  retroTerminal,
  warmEarth,
];
