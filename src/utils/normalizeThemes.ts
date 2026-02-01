import type { ThemesInput } from "@/context/settings/themeTypes";
import type { NormalizedPreset, ThemePreset } from "@/models/themePresets";
import type { ThemeOptions } from "@mui/material/styles";

const DEFAULT_PRESET_ID = "Default";
const DEFAULT_DARK_BACKGROUND_DEFAULT = "#121212";
const DEFAULT_DARK_BACKGROUND_PAPER = "#1e1e1e";
const DEFAULT_DARK_TEXT_PRIMARY = "#ffffff";
const DEFAULT_DARK_TEXT_SECONDARY = "rgba(255, 255, 255, 0.7)";
const DEFAULT_DARK_DIVIDER = "rgba(255, 255, 255, 0.12)";

type LegacyThemeInput = ThemeOptions & { name?: string };
interface LegacyThemeWrapper {
  name: string;
  theme: ThemeOptions;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const normalizeId = (id: string | undefined): string => {
  const normalized = id?.trim();
  if (!normalized) {
    throw new Error("normalizeThemesInput: preset `id` must be a non-empty.");
  }
  return normalized;
};

const normalizeLabel = (
  label: string | undefined,
  fallback: string,
): string => {
  const normalized = label?.trim();
  if (!normalized) {
    return fallback;
  }
  return normalized;
};

const normalizeLegacyName = (
  name: string | undefined,
  total: number,
): string => {
  const normalized = name?.trim();
  if (!normalized) {
    if (total === 1) return DEFAULT_PRESET_ID;
    throw new Error(
      "normalizeThemesInput: when providing multiple themes, each theme must include a non-empty `name`.",
    );
  }
  return normalized;
};

const isThemePreset = (value: unknown): value is ThemePreset => {
  if (!isRecord(value)) return false;
  if (!("colorSchemes" in value)) return false;
  const { colorSchemes } = value;
  const schemes = colorSchemes;
  if (!isRecord(schemes)) return false;
  return typeof value.id === "string" && typeof value.label === "string";
};

const isLegacyThemeWrapper = (value: unknown): value is LegacyThemeWrapper => {
  if (!isRecord(value)) return false;
  return typeof value.name === "string" && isRecord(value.theme);
};

const applyDarkFallback = (light: ThemeOptions): ThemeOptions => {
  const palette = light.palette ?? {};
  return {
    ...light,
    palette: {
      ...palette,
      mode: "dark",
      background: {
        ...palette.background,
        default: DEFAULT_DARK_BACKGROUND_DEFAULT,
        paper: DEFAULT_DARK_BACKGROUND_PAPER,
      },
      text: {
        ...palette.text,
        primary: DEFAULT_DARK_TEXT_PRIMARY,
        secondary: DEFAULT_DARK_TEXT_SECONDARY,
      },
      divider: DEFAULT_DARK_DIVIDER,
    },
  };
};

const normalizePresetLike = (
  input: unknown,
  index: number,
  total: number,
): NormalizedPreset => {
  if (isThemePreset(input)) {
    const id = normalizeId(input.id);
    const label = normalizeLabel(input.label, id);
    const { colorSchemes } = input;
    const { light, dark } = colorSchemes;
    if (!light) {
      throw new Error(
        "normalizeThemesInput: preset must include colorSchemes.light.",
      );
    }
    const resolvedDark = dark ?? applyDarkFallback(light);
    return {
      id,
      label,
      colorSchemes: { light, dark: resolvedDark },
      meta: { origin: "preset" },
    };
  }

  if (isLegacyThemeWrapper(input)) {
    const name = normalizeLegacyName(input.name, total);
    const light = input.theme;
    return {
      id: name,
      label: name,
      colorSchemes: { light, dark: applyDarkFallback(light) },
      meta: { origin: "legacy" },
    };
  }

  if (isRecord(input)) {
    const theme = input as LegacyThemeInput;
    const { name: legacyName, ...light } = theme;
    const name = normalizeLegacyName(legacyName, total);
    return {
      id: name,
      label: name,
      colorSchemes: { light, dark: applyDarkFallback(light) },
      meta: { origin: "legacy" },
    };
  }

  throw new Error(
    `normalizeThemesInput: invalid theme shape at index ${index}.`,
  );
};

const dedupePresets = (presets: NormalizedPreset[]): NormalizedPreset[] => {
  const firstIndex = new Map<string, number>();
  const lastPreset = new Map<string, NormalizedPreset>();

  for (const [index, preset] of presets.entries()) {
    if (!firstIndex.has(preset.id)) {
      firstIndex.set(preset.id, index);
    }
    lastPreset.set(preset.id, preset);
  }

  const orderedIds = [...firstIndex.entries()]
    .sort(([, a], [, b]) => a - b)
    .map(([id]) => id);

  const deduped: NormalizedPreset[] = [];
  for (const id of orderedIds) {
    const preset = lastPreset.get(id);
    if (preset) deduped.push(preset);
  }

  return deduped;
};

const createDefaultPreset = (): NormalizedPreset => {
  const light: ThemeOptions = {};
  return {
    id: DEFAULT_PRESET_ID,
    label: DEFAULT_PRESET_ID,
    colorSchemes: { light, dark: applyDarkFallback(light) },
    meta: { origin: "legacy" },
  };
};

export const normalizeThemesInput = (
  input?: ThemesInput,
): NormalizedPreset[] => {
  if (!input) return [createDefaultPreset()];
  const items = Array.isArray(input) ? input : [input];
  const filtered = items.filter(Boolean);
  if (filtered.length === 0) return [createDefaultPreset()];

  const normalized = filtered.map((item, index) =>
    normalizePresetLike(item, index, filtered.length),
  );

  return dedupePresets(normalized);
};
