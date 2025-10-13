import { defaultColorPalette } from "../constants";

import type { ColorPaletteType } from "../models";

let currentColorPalette: ColorPaletteType = { ...defaultColorPalette };

/** Returns the active color palette, allowing app-level overrides. */
export const getColorPalette = (): ColorPaletteType => currentColorPalette;

/**
 * Overrides the active color palette with app-provided values.
 * Pass `undefined` or empty to reset to defaults.
 */
export const setColorPaletteOverride = (
  override?: Partial<ColorPaletteType>,
): void => {
  currentColorPalette = { ...defaultColorPalette, ...override };
};

export const themeConfig: Record<
  string,
  { primaryColor: string; secondaryColor?: string }
> = {
  Main: {
    primaryColor: "#9FA9EA",
    secondaryColor: "#f2f2f2",
  },
};

/** Backward-compatible live view of the active palette. */
export const ColorPalette: Readonly<ColorPaletteType> = {
  get fontDark() {
    return currentColorPalette.fontDark;
  },
  get fontLight() {
    return currentColorPalette.fontLight;
  },
  get purple() {
    return currentColorPalette.purple;
  },
  get lavender() {
    return currentColorPalette.lavender;
  },
  get carrot() {
    return currentColorPalette.carrot;
  },
  get pistachio() {
    return currentColorPalette.pistachio;
  },
  get success() {
    return currentColorPalette.success;
  },
  get info() {
    return currentColorPalette.info;
  },
  get warning() {
    return currentColorPalette.warning;
  },
  get error() {
    return currentColorPalette.error;
  },
  get neutral() {
    return currentColorPalette.neutral;
  },
};
