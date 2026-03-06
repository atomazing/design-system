import {
  Golos_Text,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Source_Sans_3,
  Source_Serif_4,
} from "next/font/google";

const acidText = Golos_Text({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-acid-text",
  weight: ["400", "500", "600", "700"],
});

const acidDisplay = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-acid-display",
  weight: ["400", "500", "600", "700", "800"],
});

const acidEditorial = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-acid-editorial",
  weight: ["400", "600", "700", "800"],
});

const acidMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-acid-mono",
  weight: ["400", "500", "600", "700"],
});

const brandText = Golos_Text({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-brand-text",
  weight: ["400", "500", "600", "700"],
});

const brandDisplay = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-brand-display",
  weight: ["400", "500", "600", "700"],
});

const brandMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-brand-mono",
  weight: ["400", "500", "600", "700"],
});

const glassText = Golos_Text({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-glass-text",
  weight: ["400", "500", "600", "700"],
});

const glassDisplay = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-glass-display",
  weight: ["400", "500", "600", "700"],
});

const glassMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-glass-mono",
  weight: ["400", "500", "600", "700"],
});

export const starterFontVariables = [
  acidText.variable,
  acidDisplay.variable,
  acidEditorial.variable,
  acidMono.variable,
  brandText.variable,
  brandDisplay.variable,
  brandMono.variable,
  glassText.variable,
  glassDisplay.variable,
  glassMono.variable,
].join(" ");
