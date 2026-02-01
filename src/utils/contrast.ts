export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface Rgba extends Rgb {
  a: number;
}

const HEX_COLOR = /^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/;
const RGB_COLOR =
  /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const normalizeHex = (hex: string): string => {
  if (!HEX_COLOR.test(hex)) {
    throw new Error(`Unsupported hex color: ${hex}`);
  }
  const raw = hex.slice(1);
  if (raw.length === 3) {
    const [r, g, b] = raw.split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return `#${raw}`.toLowerCase();
};

export const parseColor = (input: string): Rgba => {
  if (HEX_COLOR.test(input)) {
    const normalized = normalizeHex(input);
    const r = Number.parseInt(normalized.slice(1, 3), 16);
    const g = Number.parseInt(normalized.slice(3, 5), 16);
    const b = Number.parseInt(normalized.slice(5, 7), 16);
    return { r, g, b, a: 1 };
  }

  if (input.toLowerCase() === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0 };
  }

  const rgbMatch = input.match(RGB_COLOR);
  if (rgbMatch) {
    const r = clamp(Number.parseFloat(rgbMatch[1]), 0, 255);
    const g = clamp(Number.parseFloat(rgbMatch[2]), 0, 255);
    const b = clamp(Number.parseFloat(rgbMatch[3]), 0, 255);
    const a =
      rgbMatch[4] === undefined
        ? 1
        : clamp(Number.parseFloat(rgbMatch[4]), 0, 1);
    return { r, g, b, a };
  }

  throw new Error(`Unsupported color format: ${input}`);
};

export const composite = (foreground: Rgba, background: Rgba): Rgb => {
  const outAlpha = foreground.a + background.a * (1 - foreground.a);
  if (outAlpha === 0) {
    return { r: 0, g: 0, b: 0 };
  }

  const blend = (fg: number, bg: number): number =>
    (fg * foreground.a + bg * background.a * (1 - foreground.a)) / outAlpha;

  return {
    r: Math.round(blend(foreground.r, background.r)),
    g: Math.round(blend(foreground.g, background.g)),
    b: Math.round(blend(foreground.b, background.b)),
  };
};

export const resolveColor = (
  color: string,
  background?: Rgba | string,
): Rgb => {
  const foreground = parseColor(color);
  if (!background || foreground.a >= 1) {
    return { r: foreground.r, g: foreground.g, b: foreground.b };
  }
  const bg =
    typeof background === "string" ? parseColor(background) : background;
  return composite(foreground, bg);
};

const toLinear = (channel: number): number => {
  const normalized = channel / 255;
  return normalized <= 3.928e-2
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
};

export const relativeLuminance = (rgb: Rgb): number =>
  0.2126 * toLinear(rgb.r) +
  0.7152 * toLinear(rgb.g) +
  0.0722 * toLinear(rgb.b);

export const contrastRatio = (foreground: Rgb, background: Rgb): number => {
  const lum1 = relativeLuminance(foreground);
  const lum2 = relativeLuminance(background);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
};
