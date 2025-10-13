import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    brand: Palette["primary"];
    neutral: Palette["primary"];
    accent: Palette["primary"];
    muted: Palette["primary"];
  }
  interface PaletteOptions {
    brand?: PaletteOptions["primary"];
    neutral?: PaletteOptions["primary"];
    accent?: PaletteOptions["primary"];
    muted?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    brand: true;
    neutral: true;
    accent: true;
    muted: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    brand: true;
    neutral: true;
    accent: true;
    muted: true;
  }
}

declare module "@mui/material/Badge" {
  interface BadgePropsColorOverrides {
    brand: true;
    neutral: true;
    accent: true;
    muted: true;
  }
}

declare module "@mui/material/Alert" {
  interface AlertPropsColorOverrides {
    brand: true;
    neutral: true;
    accent: true;
    muted: true;
  }
}
