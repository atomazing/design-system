import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 120_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    headless: true,
    viewport: { width: 1440, height: 900 },
  },
  webServer: {
    command:
      "pnpm build && pnpm preview -- --host 0.0.0.0 --port 4181 --strictPort",
    url: "http://localhost:4181",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
