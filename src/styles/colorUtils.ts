import { ColorPalette } from "./themeConfig";

/**
 * Validates whether a given string is a valid 3- or 6-digit hex color code (e.g., "#fff" or "#ffffff").
 *
 * @param value - The string to check.
 * @returns `true` if the string is a valid hex color; otherwise, `false`.
 */
export const isHexColor = (value: string): boolean =>
  /^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/.test(value);

/**
 * Determines the ideal font color (white or black) for contrast against a given background color.
 *
 * Uses luminance calculation (YIQ) to ensure accessibility and visual clarity.
 *
 * @param backgroundColor - A valid hex color (e.g., "#ffffff").
 * @returns A hex color string (`fontLight` or `fontDark`) suitable for overlay text.
 */
export const getFontColor = (backgroundColor: string): string => {
  if (!isHexColor(backgroundColor)) {
    // eslint-disable-next-line no-console -- Allow
    console.error("Invalid hex color provided:", backgroundColor);
    return ColorPalette.fontDark;
  }

  const hex = backgroundColor.slice(1);

  const fullHex =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;

  const r = Number.parseInt(fullHex.slice(0, 2), 16);
  const g = Number.parseInt(fullHex.slice(2, 4), 16);
  const b = Number.parseInt(fullHex.slice(4, 6), 16);

  const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);

  return brightness > 128 ? ColorPalette.fontDark : ColorPalette.fontLight;
};

/**
 * Determines whether the ideal font color for a background is light (i.e., white).
 *
 * @param color - The background color in hex.
 * @returns `true` if white text is recommended; otherwise, `false`.
 */
export const isFontLight = (color: string): boolean =>
  getFontColor(color) === ColorPalette.fontLight;
