import { resolve } from "path";
import { defineConfig } from "tsup";

const withSourcemaps = process.env.SOURCEMAP === "1";

export default defineConfig({
  entry: ["src/index.ts", "src/presets/index.ts"], // Entry points
  outDir: "dist", // Output directory
  format: ["esm"], // ESM-only publish output (package exports only `import`)
  dts: true, // Generate TypeScript declarations
  minify: true, // Minify output bundles
  clean: true, // Clean outDir before build
  sourcemap: withSourcemaps, // Opt-in for local debugging: `SOURCEMAP=1 npm run build`
  target: "es2018", // JS target (supports async/await etc.)
  esbuildOptions(options) {
    options.alias = {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@context": resolve(__dirname, "src/context"),
      "@styles": resolve(__dirname, "src/styles"),
      "@utils": resolve(__dirname, "src/utils"),
      "@models": resolve(__dirname, "src/models"),
    };
  },
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@mui/material",
    "@mui/icons-material",
    "@emotion/react",
    "@emotion/styled",
  ], // Treat these as externals (peer deps)
});
