import type { ThemesInput } from "@/context/settings/themeTypes";
import type { NormalizedPreset, ThemePreset } from "@/models/themePresets";
import type { ThemeOptions } from "@mui/material/styles";

const DEFAULT_PRESET_ID = "Default";

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

const isThemePreset = (value: unknown): value is ThemePreset => {
  if (!isRecord(value)) return false;
  if (typeof value.id !== "string") return false;
  if (typeof value.label !== "string") return false;
  if (!("colorSchemes" in value)) return false;

  const { colorSchemes } = value;
  return isRecord(colorSchemes);
};

const normalizePresetLike = (
  input: unknown,
  index: number,
): NormalizedPreset => {
  if (!isThemePreset(input)) {
    throw new Error(
      `normalizeThemesInput: invalid ThemePreset shape at index ${index}.`,
    );
  }

  const id = normalizeId(input.id);
  const label = normalizeLabel(input.label, id);
  const { colorSchemes } = input;
  const { light, dark } = colorSchemes;

  if (!isRecord(light)) {
    throw new Error(
      "normalizeThemesInput: preset must include colorSchemes.light.",
    );
  }
  if (!isRecord(dark)) {
    throw new Error(
      "normalizeThemesInput: preset must include colorSchemes.dark.",
    );
  }

  return {
    ...input,
    id,
    label,
    colorSchemes: {
      light: light as ThemeOptions,
      dark: dark as ThemeOptions,
    },
    meta: { origin: "preset" },
  };
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

  const orderedIds = [...firstIndex.keys()];

  const deduped: NormalizedPreset[] = [];
  for (const id of orderedIds) {
    const preset = lastPreset.get(id);
    if (preset) deduped.push(preset);
  }

  return deduped;
};

const createDefaultPreset = (): NormalizedPreset => ({
  id: DEFAULT_PRESET_ID,
  label: DEFAULT_PRESET_ID,
  colorSchemes: { light: {}, dark: {} },
  meta: { origin: "custom" },
});

export const normalizeThemesInput = (
  input?: ThemesInput,
): NormalizedPreset[] => {
  if (!input || input.length === 0) return [createDefaultPreset()];

  const normalized = input.map((item, index) =>
    normalizePresetLike(item, index),
  );
  if (normalized.length === 0) return [createDefaultPreset()];

  return dedupePresets(normalized);
};
