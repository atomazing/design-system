import { expect, test } from "@playwright/test";

const readBuiltAt = async (page: import("@playwright/test").Page) => {
  const text = (await page.locator("body").innerText()).replace(/\r/g, "");
  const match = text.match(/Собрано:\s*([^\n]+)/i);
  return match?.[1]?.trim() ?? "";
};

test.describe("Next.js starter diagnostics", () => {
  test("persisted settings bootstrap the theme state route", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      globalThis.localStorage.setItem(
        "appSettings",
        JSON.stringify({ themeId: "spectral-origami", darkMode: "dark" }),
      );
    });

    await page.goto("/debug/state");

    await expect(
      page.getByRole("heading", { name: "Проверьте текущее состояние темы." }),
    ).toBeVisible();
    await expect(page.locator("body")).toContainText("Идентификатор выбранного пресета");
    await expect(page.locator("body")).toContainText("spectral-origami");
    await expect(page.locator("body")).toContainText("Заданный режим темы");
    await expect(page.locator("body")).toContainText("темный");
  });

  test("theme controls route renders controls only", async ({ page }) => {
    await page.goto("/debug/theme");

    await expect(page.getByRole("heading", { name: "Переключайте пресеты и режим." })).toBeVisible();
    await expect(page.getByText("Настройки темы")).toBeVisible();
    await expect(page.getByText("Theme snapshot")).toHaveCount(0);
  });

  test("theme settings persist after reload", async ({ page }) => {
    await page.goto("/debug/theme");

    const presetSelect = page.getByLabel("Пресет");
    await presetSelect.click();
    await page.getByRole("option", { name: "Spectral Origami" }).click();
    const darkButton = page.getByRole("button", { name: "Установить режим: Темный" });
    await darkButton.click();

    await expect(darkButton).toHaveAttribute("aria-pressed", "true");

    const storedBeforeReload = await page.evaluate(() =>
      globalThis.localStorage.getItem("appSettings"),
    );

    expect(storedBeforeReload).toContain('"themeId"');
    expect(storedBeforeReload).toContain('"darkMode":"dark"');

    await page.reload();

    const storedAfterReload = await page.evaluate(() =>
      globalThis.localStorage.getItem("appSettings"),
    );

    expect(storedAfterReload).toContain('"themeId"');
    expect(storedAfterReload).toContain('"darkMode":"dark"');
    expect(storedAfterReload).toBe(storedBeforeReload);
    await expect(
      page.getByRole("button", { name: "Установить режим: Темный" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  test("static diagnostics route stays pre-rendered across reload", async ({
    page,
  }) => {
    await page.goto("/ssr");
    await expect(page.getByRole("heading", { name: "Проверьте результат сборки." })).toBeVisible();

    const firstBuiltAt = await readBuiltAt(page);
    expect(firstBuiltAt).not.toBe("");

    await page.waitForTimeout(50);
    await page.reload();

    const secondBuiltAt = await readBuiltAt(page);
    expect(secondBuiltAt).not.toBe("");
    expect(secondBuiltAt).toBe(firstBuiltAt);
  });
});
