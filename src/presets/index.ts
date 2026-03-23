import {
  airportOps as airportOpsLight,
  airportOpsNight as airportOpsDark,
  acidEditorial as acidEditorialLight,
  acidEditorialNight as acidEditorialDark,
  bauhausOps as bauhausOpsLight,
  bauhausOpsNight as bauhausOpsDark,
  brandNeonAdmin as brandNeonAdminLight,
  brandNeonAdminDark,
  neonBauhausGrid as neonBauhausGridLight,
  neonBauhausGridNight as neonBauhausGridDark,
  strongNeonBauhausGrid as strongNeonBauhausGridLight,
  strongNeonBauhausGridNight as strongNeonBauhausGridDark,
  neonBauhausOps as neonBauhausOpsLight,
  neonBauhausOpsNight as neonBauhausOpsDark,
  strongNeonBauhausOps as strongNeonBauhausOpsLight,
  strongNeonBauhausOpsNight as strongNeonBauhausOpsDark,
  brutalistSprint as brutalistSprintLight,
  brutalistSprintNight as brutalistSprintDark,
  neonBrutalistSprint as neonBrutalistSprintLight,
  neonBrutalistSprintNight as neonBrutalistSprintDark,
  strongNeonBrutalistSprint as strongNeonBrutalistSprintLight,
  strongNeonBrutalistSprintNight as strongNeonBrutalistSprintDark,
  ceramicFluxLight,
  ceramicFlux as ceramicFluxDark,
  chromaticWireframeLight,
  chromaticWireframe as chromaticWireframeDark,
  editorialClassic as editorialClassicLight,
  brandNeonMotion as brandNeonMotionTheme,
  flowEditorial as flowEditorialLight,
  flowEditorialNight as flowEditorialDark,
  strongBrandNeonMotion as strongBrandNeonMotionTheme,
  editorialClassicDark,
  holographicLedgerLight,
  glassReactor as glassReactorDark,
  glassReactorLight,
  holographicLedger as holographicLedgerDark,
  infraredBlueprintLight,
  infraredBlueprint as infraredBlueprintDark,
  kintsugiProtocolLight,
  kintsugiProtocol as kintsugiProtocolDark,
  modernMinimal as modernMinimalLight,
  modernMinimalDark,
  monochromeKinetics as monochromeKineticsDark,
  monochromeKineticsLight,
  neoGlass as neoGlassLight,
  neoGlassDark,
  neoMemphisMetrics as neoMemphisMetricsLight,
  neoMemphisMetricsNight as neoMemphisMetricsDark,
  neonComplianceLight,
  neonCompliance as neonComplianceDark,
  strongNeonComplianceLight,
  strongNeonCompliance as strongNeonComplianceDark,
  noirInterfaceLight,
  noirInterface as noirInterfaceDark,
  quantizedHeatmapLight,
  quantizedHeatmap as quantizedHeatmapDark,
  retroFutureTerminalLight,
  retroFutureTerminal as retroFutureTerminalDark,
  retroTerminal as retroTerminalLight,
  retroTerminalDark,
  solarpunkEnterprise as solarpunkEnterpriseLight,
  solarpunkEnterpriseDusk as solarpunkEnterpriseDark,
  spectralOrigami as spectralOrigamiLight,
  spectralOrigamiNight as spectralOrigamiDark,
  vaporMonolithLight,
  vaporMonolith as vaporMonolithDark,
  warmEarth as warmEarthLight,
  warmEarthDark,
} from "@/constants/themes";

import type { ThemePreset } from "@/models";

const createPreset = (
  id: string,
  label: string,
  light: ThemePreset["colorSchemes"]["light"],
  dark: ThemePreset["colorSchemes"]["dark"] = light,
): ThemePreset => ({
  id,
  label,
  colorSchemes: {
    light,
    dark,
  },
});

export type { ThemePreset } from "@/models";

export const editorialClassic = createPreset(
  "editorial-classic",
  "Editorial Classic",
  editorialClassicLight,
  editorialClassicDark,
);

export const airportOps = createPreset(
  "airport-ops",
  "Airport Ops",
  airportOpsLight,
  airportOpsDark,
);

export const modernMinimal = createPreset(
  "modern-minimal",
  "Modern Minimal",
  modernMinimalLight,
  modernMinimalDark,
);

export const brandNeonAdmin = createPreset(
  "brand-neon-admin",
  "Brand Neon Admin",
  brandNeonAdminLight,
  brandNeonAdminDark,
);

export const neoGlass = createPreset(
  "neo-glass",
  "Neo Glass",
  neoGlassLight,
  neoGlassDark,
);

export const retroTerminal = createPreset(
  "retro-terminal",
  "Retro Terminal",
  retroTerminalLight,
  retroTerminalDark,
);

export const warmEarth = createPreset(
  "warm-earth",
  "Warm Earth",
  warmEarthLight,
  warmEarthDark,
);

export const acidEditorial = createPreset(
  "acid-editorial",
  "Acid Editorial",
  acidEditorialLight,
  acidEditorialDark,
);

export const flowEditorial = createPreset(
  "flow-editorial",
  "Flow Editorial",
  flowEditorialLight,
  flowEditorialDark,
);

export const bauhausOps = createPreset(
  "bauhaus-ops",
  "Bauhaus Ops",
  bauhausOpsLight,
  bauhausOpsDark,
);

export const neonBauhausOps = createPreset(
  "neon-bauhaus-ops",
  "Neon Bauhaus Ops",
  neonBauhausOpsLight,
  neonBauhausOpsDark,
);

export const strongNeonBauhausOps = createPreset(
  "strong-neon-bauhaus-ops",
  "Strong Neon Bauhaus Ops",
  strongNeonBauhausOpsLight,
  strongNeonBauhausOpsDark,
);

export const neonBauhausGrid = createPreset(
  "neon-bauhaus-grid",
  "Neon Bauhaus Grid",
  neonBauhausGridLight,
  neonBauhausGridDark,
);

export const strongNeonBauhausGrid = createPreset(
  "strong-neon-bauhaus-grid",
  "Strong Neon Bauhaus Grid",
  strongNeonBauhausGridLight,
  strongNeonBauhausGridDark,
);

export const brutalistSprint = createPreset(
  "brutalist-sprint",
  "Brutalist Sprint",
  brutalistSprintLight,
  brutalistSprintDark,
);

export const neonBrutalistSprint = createPreset(
  "neon-brutalist-sprint",
  "Neon Brutalist Sprint",
  neonBrutalistSprintLight,
  neonBrutalistSprintDark,
);

export const strongNeonBrutalistSprint = createPreset(
  "strong-neon-brutalist-sprint",
  "Strong Neon Brutalist Sprint",
  strongNeonBrutalistSprintLight,
  strongNeonBrutalistSprintDark,
);

export const brandNeonMotion = createPreset(
  "brand-neon-motion",
  "Brand Neon Motion",
  brandNeonMotionTheme.colorSchemes.light,
  brandNeonMotionTheme.colorSchemes.dark,
);

export const strongBrandNeonMotion = createPreset(
  "strong-brand-neon-motion",
  "Strong Brand Neon Motion",
  strongBrandNeonMotionTheme.colorSchemes.light,
  strongBrandNeonMotionTheme.colorSchemes.dark,
);

export const ceramicFlux = createPreset(
  "ceramic-flux",
  "Ceramic Flux",
  ceramicFluxLight,
  ceramicFluxDark,
);

export const chromaticWireframe = createPreset(
  "chromatic-wireframe",
  "Chromatic Wireframe",
  chromaticWireframeLight,
  chromaticWireframeDark,
);

export const glassReactor = createPreset(
  "glass-reactor",
  "Glass Reactor",
  glassReactorLight,
  glassReactorDark,
);

export const holographicLedger = createPreset(
  "holographic-ledger",
  "Holographic Ledger",
  holographicLedgerLight,
  holographicLedgerDark,
);

export const infraredBlueprint = createPreset(
  "infrared-blueprint",
  "Infrared Blueprint",
  infraredBlueprintLight,
  infraredBlueprintDark,
);

export const kintsugiProtocol = createPreset(
  "kintsugi-protocol",
  "Kintsugi Protocol",
  kintsugiProtocolLight,
  kintsugiProtocolDark,
);

export const monochromeKinetics = createPreset(
  "monochrome-kinetics",
  "Monochrome Kinetics",
  monochromeKineticsLight,
  monochromeKineticsDark,
);

export const neoMemphisMetrics = createPreset(
  "neo-memphis-metrics",
  "Neo Memphis Metrics",
  neoMemphisMetricsLight,
  neoMemphisMetricsDark,
);

export const neonCompliance = createPreset(
  "neon-compliance",
  "Neon Compliance",
  neonComplianceLight,
  neonComplianceDark,
);

export const strongNeonCompliance = createPreset(
  "strong-neon-compliance",
  "Strong Neon Compliance",
  strongNeonComplianceLight,
  strongNeonComplianceDark,
);

export const noirInterface = createPreset(
  "noir-interface",
  "Noir Interface",
  noirInterfaceLight,
  noirInterfaceDark,
);

export const quantizedHeatmap = createPreset(
  "quantized-heatmap",
  "Quantized Heatmap",
  quantizedHeatmapLight,
  quantizedHeatmapDark,
);

export const retroFutureTerminal = createPreset(
  "retro-future-terminal",
  "Retro Future Terminal",
  retroFutureTerminalLight,
  retroFutureTerminalDark,
);

export const solarpunkEnterprise = createPreset(
  "solarpunk-enterprise",
  "Solarpunk Enterprise",
  solarpunkEnterpriseLight,
  solarpunkEnterpriseDark,
);

export const spectralOrigami = createPreset(
  "spectral-origami",
  "Spectral Origami",
  spectralOrigamiLight,
  spectralOrigamiDark,
);

export const vaporMonolith = createPreset(
  "vapor-monolith",
  "Vapor Monolith",
  vaporMonolithLight,
  vaporMonolithDark,
);

export const defaultThemes: ThemePreset[] = [
  editorialClassic,
  airportOps,
  modernMinimal,
  brandNeonAdmin,
  neoGlass,
  retroTerminal,
  warmEarth,
];

// Extended visual pack intended for marketing and landing page surfaces.
export const landingPageThemes: ThemePreset[] = [
  flowEditorial,
  acidEditorial,
  bauhausOps,
  neonBauhausGrid,
  strongNeonBauhausGrid,
  neonBauhausOps,
  strongNeonBauhausOps,
  brutalistSprint,
  neonBrutalistSprint,
  strongNeonBrutalistSprint,
  brandNeonMotion,
  strongBrandNeonMotion,
  ceramicFlux,
  chromaticWireframe,
  glassReactor,
  holographicLedger,
  infraredBlueprint,
  kintsugiProtocol,
  monochromeKinetics,
  neoMemphisMetrics,
  neonCompliance,
  strongNeonCompliance,
  noirInterface,
  quantizedHeatmap,
  retroFutureTerminal,
  solarpunkEnterprise,
  spectralOrigami,
  vaporMonolith,
];

export const allBuiltInThemes: ThemePreset[] = [
  ...defaultThemes,
  ...landingPageThemes,
];
