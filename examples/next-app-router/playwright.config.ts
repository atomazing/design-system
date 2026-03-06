import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 120_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: "http://127.0.0.1:4310",
    headless: true,
    viewport: { width: 1440, height: 900 },
  },
  webServer: {
    command: "pnpm run build && pnpm run start -- --port 4310",
    url: "http://127.0.0.1:4310",
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
