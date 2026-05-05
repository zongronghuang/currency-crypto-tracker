import { expect } from "@playwright/test";
import { test } from "../playwright.setup.ts";

/** Example
*  test('...', async ({network, page}) => {
   // 使用原有的 msw handler 回應
   network.use()  
 
   // 覆蓋原有的 msw handler 回應
   network.use (http.get("/query", () => {
      return HttpResponse.json({
         userData: {
           name: '...',
           age: 100,
         }
        },
      });
    }))

    await page.goto('...')
    expect(...)
  })
 */

test("opens and closes currency menu dialog via buttons", async ({
  network,
  page,
}) => {
  network.use();
  await page.goto("http://localhost:5173/converter");
  await page.waitForLoadState("networkidle");

  const dialog = page.getByRole("dialog");
  await expect(dialog).not.toBeVisible();

  await page.getByRole("button", { name: /usd/i }).click();
  await expect(dialog).toBeVisible();

  await page.getByRole("button", { name: /confirm/i }).click();
  await expect(dialog).not.toBeVisible();
});

test("change currency with another fiat currency from the menu", async ({
  network,
  page,
}) => {
  network.use();
  await page.goto("http://localhost:5173/converter");
  await page.waitForLoadState("networkidle");

  const dialog = page.getByRole("dialog");
  await expect(dialog).not.toBeVisible();

  await page.getByRole("button", { name: /usd/i }).click();
  await dialog.waitFor({ state: "visible" });
  await expect(dialog).toBeVisible();

  await dialog.getByRole("list").evaluate((e) => (e.scrollTop += 500));

  await dialog.getByRole("listitem").filter({ hasText: /amd/i }).click();

  await dialog.getByRole("button", { name: /confirm/i }).click();

  await expect(page.getByRole("button", { name: /usd/i })).not.toBeVisible();

  await expect(page.getByRole("button", { name: /amd/i })).toBeVisible();

  await expect(page.getByTitle(/Armenian dram/i)).toBeVisible();
});

test("change currency with another crypto currency from the menu", async ({
  network,
  page,
}) => {
  network.use();
  await page.goto("http://localhost:5173/converter");
  await page.waitForLoadState("networkidle");

  const dialog = page.getByRole("dialog");
  await expect(dialog).not.toBeVisible();

  await page.getByRole("button", { name: /usd/i }).click();
  await dialog.waitFor({ state: "visible" });
  await expect(dialog).toBeVisible();

  await dialog.getByRole("radio", { name: /crypto/i }).click();

  await dialog.getByRole("list").evaluate((e) => (e.scrollTop += 500));

  await dialog.getByRole("radio", { name: /aero/i }).check();

  await dialog.getByRole("button", { name: /confirm/i }).click();

  await expect(page.getByRole("button", { name: /usd/i })).not.toBeVisible();

  await expect(page.getByRole("button", { name: /aero/i })).toBeVisible();

  await expect(page.getByTitle(/aerodrome finance/i)).toBeVisible();
});

test("typing in search input returns partial fiat matches by country name or fiat name", async ({
  network,
  page,
}) => {
  network.use();
  await page.goto("http://localhost:5173/converter");
  await page.waitForLoadState("networkidle");

  const usdButton = page.getByRole("button", { name: /united states dollar/i });
  await usdButton.waitFor();
  await usdButton.click();

  const dialog = page.getByRole("dialog");
  await dialog.waitFor();
  await expect(dialog).toBeVisible();

  await dialog.getByRole("searchbox").fill("us");

  await expect(dialog.getByRole("listitem")).toHaveCount(4);

  await dialog.getByRole("searchbox").fill("usd");

  await expect(dialog.getByRole("listitem")).toHaveCount(1);

  await dialog.getByRole("searchbox").fill("usdx");

  await expect(dialog.getByRole("listitem")).toHaveCount(0);
});

test("typing in search input returns partial crypto matches by country name or crypto name", async ({
  network,
  page,
}) => {
  network.use();
  await page.goto("http://localhost:5173/converter");
  await page.waitForLoadState("networkidle");

  const dialog = page.getByRole("dialog");
  await expect(dialog).not.toBeVisible();

  await page.getByRole("button", { name: /usd/i }).click();
  await dialog.waitFor({ state: "visible" });
  await expect(dialog).toBeVisible();

  await dialog.getByRole("radio", { name: /crypto/i }).click();

  await dialog.getByRole("searchbox").fill("usd");

  await expect(dialog.getByRole("listitem")).toHaveCount(7);

  await dialog.getByRole("searchbox").fill("usdt");

  await expect(dialog.getByRole("listitem")).toHaveCount(1);

  await dialog.getByRole("searchbox").fill("usdtx");

  await expect(dialog.getByRole("listitem")).toHaveCount(0);
});

test("show full list of fiat options when search input gets cleared", async ({
  network,
  page,
}) => {
  network.use();
  await page.goto("http://localhost:5173/converter");
  await page.waitForLoadState("networkidle");

  const dialog = page.getByRole("dialog");
  await expect(dialog).not.toBeVisible();

  await page.getByRole("button", { name: /usd/i }).click();
  await dialog.waitFor({ state: "visible" });
  await expect(dialog).toBeVisible();

  const nonexistentFiat = "xxxxx";
  await dialog.getByRole("searchbox").fill(nonexistentFiat);

  const count1 = await dialog.getByRole("listitem").count();

  await dialog.getByRole("searchbox").clear();

  const count2 = await dialog.getByRole("listitem").count();

  expect(count1).toBeLessThan(count2);
});

test("show full list of crypto options when search input gets cleared", async ({
  network,
  page,
}) => {
  network.use();
  await page.goto("http://localhost:5173/converter");
  await page.waitForLoadState("networkidle");

  const dialog = page.getByRole("dialog");
  await expect(dialog).not.toBeVisible();

  await page.getByRole("button", { name: /usd/i }).click();
  await dialog.waitFor({ state: "visible" });
  await expect(dialog).toBeVisible();

  await dialog.getByRole("radio", { name: /crypto/i }).click();

  const nonexistentCrypto = "xxxxx";
  await dialog.getByRole("searchbox").fill(nonexistentCrypto);

  const count1 = await dialog.getByRole("listitem").count();

  await dialog.getByRole("searchbox").clear();

  const count2 = await dialog.getByRole("listitem").count();

  expect(count1).toBeLessThan(count2);
});

test.describe("keyboard navigation among radio inputs", () => {
  test("navigate fiat radio options", async ({ network, page }) => {
    network.use();
    await page.goto("http://localhost:5173/converter");
    await page.waitForLoadState("networkidle");

    const dialog = page.getByRole("dialog");
    await expect(dialog).not.toBeVisible();

    await page.getByRole("button", { name: /usd/i }).click();
    await dialog.waitFor({ state: "visible" });
    await expect(dialog).toBeVisible();

    await dialog.click();
    await dialog.press("Tab");
    await dialog.press("Tab");
    await dialog.press("Tab");

    await dialog.press("ArrowRight");
    const active1 = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.getAttribute("aria-label") || el?.textContent;
    });

    expect(active1).toContain("INR");

    await dialog.press("ArrowDown");
    const active2 = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.getAttribute("aria-label") || el?.textContent;
    });

    expect(active2).toContain("CAD");

    await dialog.press("ArrowUp");
    const active3 = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.getAttribute("aria-label") || el?.textContent;
    });

    expect(active3).toContain("INR");

    await dialog.press("ArrowLeft");
    const active4 = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.getAttribute("aria-label") || el?.textContent;
    });

    expect(active4).toContain("USD");
  });

  test("navigate crypto radio options", async ({ network, page }) => {
    network.use();
    await page.goto("http://localhost:5173/converter");
    await page.waitForLoadState("networkidle");

    const dialog = page.getByRole("dialog");
    await expect(dialog).not.toBeVisible();

    await page.getByRole("button", { name: /usd/i }).click();
    await dialog.waitFor({ state: "visible" });
    await expect(dialog).toBeVisible();

    await page.getByRole("radio", { name: /crypto/i }).check({ force: true });

    await dialog.click();
    await dialog.press("Tab");
    await dialog.press("Tab");

    await dialog.press("ArrowRight");
    const active1 = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.getAttribute("aria-label") || el?.textContent;
    });

    expect(active1).toContain("BTC");

    await dialog.press("ArrowDown");
    const active2 = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.getAttribute("aria-label") || el?.textContent;
    });
    expect(active2).toContain("ETH");

    await dialog.press("ArrowDown");

    await dialog.press("ArrowUp");
    const active3 = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.getAttribute("aria-label") || el?.textContent;
    });
    expect(active3).toContain("ETH");

    await dialog.press("ArrowLeft");
    const active4 = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.getAttribute("aria-label") || el?.textContent;
    });
    expect(active4).toContain("BTC");
  });
});
