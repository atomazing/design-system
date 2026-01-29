/**
 * Validates whether a given string is a valid 3- or 6-digit hex color code (e.g., "#fff" or "#ffffff").
 *
 * @param value - The string to check.
 * @returns `true` if the string is a valid hex color; otherwise, `false`.
 */
export const isHexColor = (value: string): boolean =>
  /^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/.test(value);
