import { expect } from "@playwright/test";
import { test } from "../playwright.setup.ts";

test("Scrolling down to show back-to-top button, and clicking the button sends user back to the top of the news list", async ({
  network,
  page,
}) => {
  network.use();
  await page.goto("http://localhost:5173/news");
  await page.waitForLoadState("networkidle");

  const backToTop = page.getByRole("link", { name: /back to top/i });
  await expect(backToTop).toBeHidden();

  const scrollDistance = 100;

  await page.evaluate((distance) => {
    window.scrollTo({ top: distance });
  }, scrollDistance);

  await expect(backToTop).toBeVisible();

  await backToTop.click();

  await page.waitForFunction(() => window.scrollY === 0);

  const scrollY = await page.evaluate(() => window.scrollY);

  await expect(scrollY).toBe(0);
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
