import { resolve } from "path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/presets/index.ts"], // Entry points
  outDir: "dist", // Output directory
  format: ["esm", "cjs"], // Module formats
  dts: true, // Generate TypeScript declarations
  minify: true, // Minify output bundles
  clean: true, // Clean outDir before build
  sourcemap: true, // Generate sourcemaps
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
    "@emotion/css",
    "@emotion/react",
    "@emotion/styled",
  ], // Treat these as externals (peer deps)
});
