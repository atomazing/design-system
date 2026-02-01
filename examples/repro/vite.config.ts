import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const rootSrc = resolve(__dirname, "../../src");

export default defineConfig({
  plugins: [react()],
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
