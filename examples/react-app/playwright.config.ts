import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 120_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: "http://localhost:4191",
    headless: true,
    viewport: { width: 1440, height: 900 },
  },
  webServer: {
    command:
      "pnpm run build && pnpm exec vite preview --host 0.0.0.0 --port 4191 --strictPort",
    url: "http://localhost:4191",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
