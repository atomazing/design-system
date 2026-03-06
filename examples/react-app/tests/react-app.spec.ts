import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const testFilePath = fileURLToPath(import.meta.url);
const testDir = path.dirname(testFilePath);

const reportsDir = path.resolve(
  testDir,
  "../../../backlog/01_design-system-theme-hardening/reports",
);

const ensureReportsDir = () => {
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
};

test("Phase 01 react-app: dark mode + typography evidence", async ({
  page,
}) => {
  ensureReportsDir();

  await page.goto("/");
  await page.getByText("Theme React App Lab").waitFor();

  const modeChip = page.getByTestId("theme-mode-chip");
  await expect(modeChip).toContainText("mode:");

  await page.screenshot({
    path: path.join(reportsDir, "phase-01-dark-mode-light.png"),
    fullPage: true,
  });

  await page.getByLabel("Dark").check();
  await expect(modeChip).toContainText("mode: dark");

  await page.screenshot({
    path: path.join(reportsDir, "phase-01-dark-mode-dark.png"),
    fullPage: true,
  });

  const typographyText = page.getByTestId("typography-text-md");
  const typographyHeader = page.getByTestId("typography-header-md");

  const textMd = await typographyText.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return { fontSize: style.fontSize, lineHeight: style.lineHeight };
  });

  const headerMd = await typographyHeader.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return { fontSize: style.fontSize, lineHeight: style.lineHeight };
  });

  const typographyReport = [
    "Typography runtime values:",
    `text_md_regular.fontSize: ${textMd.fontSize}`,
    `text_md_regular.lineHeight: ${textMd.lineHeight}`,
    `header_md_semibold.fontSize: ${headerMd.fontSize}`,
    `header_md_semibold.lineHeight: ${headerMd.lineHeight}`,
    "",
  ].join("\n");

  fs.writeFileSync(
    path.join(reportsDir, "phase-01-typography-runtime.txt"),
    typographyReport,
    "utf8",
  );
});
