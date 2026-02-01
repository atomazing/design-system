import type { ThemeOptions } from "@mui/material/styles";

export const validateSchemeTokens = (options: ThemeOptions): string[] => {
  const warnings: string[] = [];
  const { palette } = options;
  if (!palette) {
    warnings.push("palette is missing.");
    return warnings;
  }

  if (!palette.background?.default) {
    warnings.push("palette.background.default is missing.");
  }
  if (!palette.background?.paper) {
    warnings.push("palette.background.paper is missing.");
  }
  if (!palette.text?.primary) {
    warnings.push("palette.text.primary is missing.");
  }
  if (!palette.text?.secondary) {
    warnings.push("palette.text.secondary is missing.");
  }
  if (!palette.divider) {
    warnings.push("palette.divider is missing.");
  }

  return warnings;
};
