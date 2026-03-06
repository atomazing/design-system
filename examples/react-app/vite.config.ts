import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const rootSrc = resolve(__dirname, "../../src");

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replaceAll("\\", "/");

          if (
            normalizedId.includes("/node_modules/react/") ||
            normalizedId.includes("/node_modules/react-dom/") ||
            normalizedId.includes("/node_modules/scheduler/")
          ) {
            return "react-vendor";
          }

          if (normalizedId.includes("/node_modules/@mui/icons-material/")) {
            return "mui-icons";
          }

          if (
            normalizedId.includes("/node_modules/@mui/") ||
            normalizedId.includes("/node_modules/@emotion/")
          ) {
            return "mui-vendor";
          }

          return undefined;
        },
      },
    },
  },
  resolve: {
    alias: {
      "@atomazing-org/design-system/presets": resolve(
        rootSrc,
        "presets/index.ts",
      ),
      "@atomazing-org/design-system": resolve(rootSrc, "index.ts"),
      "@": rootSrc,
      "@components": resolve(rootSrc, "components"),
      "@context": resolve(rootSrc, "context"),
      "@styles": resolve(rootSrc, "styles"),
      "@utils": resolve(rootSrc, "utils"),
      "@models": resolve(rootSrc, "models"),
    },
  },
});
