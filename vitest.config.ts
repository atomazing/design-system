import { resolve } from "path";
import { defineConfig } from "vitest/config";

const rootSrc = resolve(__dirname, "src");

export default defineConfig({
  resolve: {
    alias: {
      "@": rootSrc,
      "@components": resolve(rootSrc, "components"),
      "@context": resolve(rootSrc, "context"),
      "@styles": resolve(rootSrc, "styles"),
      "@utils": resolve(rootSrc, "utils"),
      "@models": resolve(rootSrc, "models"),
    },
  },
  test: {
    include: ["src/__tests__/**/*.test.ts"],
    exclude: ["examples/**", "node_modules/**"],
  },
});
