import { expect, test } from "@playwright/test";

test.describe("Next.js starter home", () => {
  test("home page opens directly into the landing", async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto("/");

    await expect(page.locator("[data-home-shell='starter']").first()).toBeVisible();
    await expect(page.locator("[data-start-flow='paged']").first()).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Запустите фирменный интерфейс на Next.js до того, как шаблон станет безликим.",
      }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Сделать первый шаг" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Выбрать пресет" })).toBeVisible();
    await expect(page.getByText("Guided landing flow")).toHaveCount(0);
    await expect(page.getByText("5 focused screens. 1 clean story.")).toHaveCount(0);
    await expect(page.getByText("Scroll to move through the full-screen steps.")).toHaveCount(0);
    await expect(page.getByText("Story progress")).toHaveCount(0);

    const heroMetrics = await page.locator("[data-flow-label='Hero']").first().evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return {
        top: rect.top,
        bottom: rect.bottom,
        clientHeight: node.clientHeight,
        scrollHeight: node.scrollHeight,
        viewportHeight: window.innerHeight,
      };
    });

    expect(heroMetrics.top).toBeGreaterThanOrEqual(0);
    expect(heroMetrics.bottom).toBeLessThanOrEqual(heroMetrics.viewportHeight + 1);
    expect(heroMetrics.scrollHeight).toBeLessThanOrEqual(heroMetrics.clientHeight + 1);
  });

  test("hero section expands instead of clipping content on low-height viewports", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 620 });
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "Запустите фирменный интерфейс на Next.js до того, как шаблон станет безликим.",
      }),
    ).toBeVisible();

    const metrics = await page.locator("[data-flow-label='Hero']").first().evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return {
        top: rect.top,
        clientHeight: node.clientHeight,
        scrollHeight: node.scrollHeight,
        viewportHeight: window.innerHeight,
        documentHeight: document.documentElement.scrollHeight,
      };
    });

    expect(metrics.top).toBeGreaterThanOrEqual(0);
    expect(metrics.scrollHeight).toBeLessThanOrEqual(metrics.clientHeight + 1);
    expect(metrics.documentHeight).toBeGreaterThan(metrics.viewportHeight);
  });
});
