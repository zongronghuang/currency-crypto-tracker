import { expect } from "@playwright/test";
import { test } from "../playwright.setup.ts";

test("The back-to-top button appears when user scrolls down the news list", async ({
  network,
  page,
}) => {
  network.use();
  await page.goto("http://localhost:5173/news");
  await page.waitForLoadState("networkidle");

  await expect(
    page.getByRole("button", { name: /back to top/i }),
  ).not.toBeVisible();

  await page.getByLabel(/news list/i).evaluate((e) => (e.scrollTop += 1000));

  await expect(
    page.getByRole("button", { name: /back to top/i }),
  ).toBeVisible();
});

test("Clicking the back-to-top button sends user back to the top of the news list", async ({
  network,
  page,
}) => {
  network.use();
  await page.goto("http://localhost:5173/news");
  await page.waitForLoadState("networkidle");

  await expect(
    page.getByRole("link", { name: /back to top/i }),
  ).not.toBeVisible();

  await page.locator(":root").evaluate((e) => e.scrollTo({ top: 10 }));

  await expect(page.getByRole("link", { name: /back to top/i })).toBeVisible();

  await page
    .getByRole("link", { name: /back to top/i })
    .click({ timeout: 2000 });

  const scrollY = await page.locator(":root").evaluate((e) => {
    console.log(e.scrollTop);
    return e.scrollTop;
  });
  await expect(scrollY).toBeCloseTo(0);
});

test("scrolls down news cards and shows an alert text when it reaches the end", async ({
  network,
  page,
}) => {
  network.use();
  await page.goto("http://localhost:5173/news");
  await page.waitForLoadState("networkidle");

  const container = await page.getByLabel(/news list/i);
  const cards = await page.getByRole("article");
  while ((await cards.count()) < 50) {
    await container.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });

    // Wait for more cards to render
    await page.waitForTimeout(50); // optional micro-wait
  }

  await expect(cards).toHaveCount(50);
  await expect(page.getByText(/no more results/i)).toBeVisible();
});
