import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Entry point
  outDir: "dist", // Output directory
  format: ["esm", "cjs"], // Module formats
  dts: true, // Generate TypeScript declarations
  minify: true, // Minify output bundles
  clean: true, // Clean outDir before build
  sourcemap: true, // Generate sourcemaps
  target: "es2018", // JS target (supports async/await etc.)
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
