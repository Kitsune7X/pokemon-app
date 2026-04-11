import { test, expect } from "@playwright/test";

test.describe("Pokédex", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Has title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "POKÉDEX", exact: true }),
    ).toBeVisible();
  });

  test("Pokémon list is displayed after clicking 'GET STARTED'", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "GET STARTED" }).click();

    await expect(page.getByText(/bulbasaur/i)).toBeInViewport();

    await expect(
      page.locator("a").filter({ hasText: "Next" }).first(),
    ).toBeInViewport();
  });

  test("Pokemon detail is displayed after clicking on 'Display'", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "GET STARTED" }).click();
    await page.locator("a").filter({ hasText: "Details" }).first().click();

    await expect(page.getByText(/hp/i)).toBeInViewport();
    await expect(page.getByText("attack", { exact: true })).toBeInViewport();
    await expect(page.getByText(/abilities/i)).toBeInViewport();
  });
});
