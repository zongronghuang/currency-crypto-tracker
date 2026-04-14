import { expect, type Page } from "@playwright/test";
import { test } from "../playwright.setup.ts";

async function switchToCryptoBase(page: Page) {
  const footerButton = page.getByLabel(/open drawer button/i);
  await footerButton.click();
  const trendsMenu = page.getByRole("form");
  await expect(trendsMenu).toBeInViewport();

  const baseMenu = trendsMenu.locator("select[name=base]");
  await expect(baseMenu).toBeVisible();
  const quoteMenu = trendsMenu.locator("select[name=quote]");
  const applyButton = trendsMenu.getByRole("button", { name: /apply/i });

  await baseMenu.selectOption("BTC");
  await quoteMenu.selectOption("USD");
  await applyButton.click();
  await expect(trendsMenu).not.toBeInViewport();
}

test.describe("able to switch to 4 views (table/line/bar/candlestick) when the base is a fiat currency", () => {
  test("switch to line view", async ({ network, page }) => {
    network.use();
    await page.goto("http://localhost:5173/trends");
    await page.waitForLoadState("networkidle");

    const triggerButton = page.getByRole("button", { name: /table/i });
    await triggerButton.click();
    const tableView = page.getByLabel("table view");

    const lineViewButton = page.getByRole("button", { name: /line/i });
    await lineViewButton.click();
    await tableView.waitFor({ state: "detached" });
    const lineView = page.getByLabel(/line view/i);
    await lineView.waitFor({ state: "visible" });

    await expect(lineView).toBeVisible();
    await expect(tableView).not.toBeVisible();
  });

  test("switch to bar view", async ({ network, page }) => {
    network.use();
    await page.goto("http://localhost:5173/trends");
    await page.waitForLoadState("networkidle");

    const triggerButton = page.getByRole("button", { name: /table/i });
    await triggerButton.click();
    const tableView = page.getByLabel("table view");

    const barViewButton = page.getByRole("button", { name: /bar/i });
    await barViewButton.click();
    await tableView.waitFor({ state: "detached" });
    const barView = page.getByLabel(/bar view/i);
    await barView.waitFor({ state: "visible" });

    await expect(barView).toBeVisible();
    await expect(tableView).not.toBeVisible();
  });

  test("switch to candlestick view", async ({ network, page }) => {
    network.use();
    await page.goto("http://localhost:5173/trends");
    await page.waitForLoadState("networkidle");

    const triggerButton = page.getByRole("button", { name: /table/i });
    await triggerButton.click();
    const tableView = page.getByLabel("table view");

    const candlestickViewButton = page.getByRole("button", {
      name: /candlestick/i,
    });
    await candlestickViewButton.click();
    await tableView.waitFor({ state: "detached" });
    const candlestickView = page.getByLabel(/candlestick view/i);
    await candlestickView.waitFor({ state: "visible" });

    await expect(candlestickView).toBeVisible();
    await expect(tableView).not.toBeVisible();
  });

  test("switch to a non-table view and then back to table view", async ({
    network,
    page,
  }) => {
    network.use();
    await page.goto("http://localhost:5173/trends");
    await page.waitForLoadState("networkidle");

    const triggerButton = page.getByRole("button", { name: /table/i });
    await triggerButton.click();
    const tableView = page.getByLabel("table view");

    const candlestickViewButton = page.getByRole("button", {
      name: /candlestick/i,
    });
    await candlestickViewButton.click();
    await tableView.waitFor({ state: "detached" });
    const candlestickView = page.getByLabel(/candlestick view/i);
    await candlestickView.waitFor({ state: "visible" });

    await expect(candlestickView).toBeVisible();
    await expect(tableView).not.toBeVisible();

    await candlestickViewButton.click();
    const tableViewButton = page.getByRole("button", { name: /table/i });
    await tableViewButton.click();
    await candlestickView.waitFor({ state: "detached" });
    await tableView.waitFor({ state: "visible" });

    await expect(candlestickView).not.toBeVisible();
    await expect(tableView).toBeVisible();
  });
});

test.describe("able to switch to 5 views (table/line/bar/candlestick/histogram) when the base is a crypto currency", () => {
  test("switch to line view", async ({ page, network }) => {
    network.use();
    await page.goto("http://localhost:5173/trends");
    await page.waitForLoadState("networkidle");

    await switchToCryptoBase(page);

    const triggerButton = page.getByRole("button", { name: /table/i });
    await triggerButton.click();
    const tableView = page.getByLabel("table view");

    const lineViewButton = page.getByRole("button", { name: /line/i });
    await lineViewButton.click();
    await tableView.waitFor({ state: "detached" });
    const lineView = page.getByLabel(/line view/i);
    await lineView.waitFor({ state: "visible" });

    await expect(lineView).toBeVisible();
    await expect(tableView).not.toBeVisible();
  });

  test("switch to bar view", async ({ page, network }) => {
    network.use();
    await page.goto("http://localhost:5173/trends");
    await page.waitForLoadState("networkidle");

    await switchToCryptoBase(page);

    const triggerButton = page.getByRole("button", { name: /table/i });
    await triggerButton.click();
    const tableView = page.getByLabel("table view");

    const barViewButton = page.getByRole("button", { name: /bar/i });
    await barViewButton.click();
    await tableView.waitFor({ state: "detached" });
    const barView = page.getByLabel(/bar view/i);
    await barView.waitFor({ state: "visible" });

    await expect(barView).toBeVisible();
    await expect(tableView).not.toBeVisible();
  });

  test("switch to candlestick view", async ({ page, network }) => {
    network.use();
    await page.goto("http://localhost:5173/trends");
    await page.waitForLoadState("networkidle");

    await switchToCryptoBase(page);

    const triggerButton = page.getByRole("button", { name: /table/i });
    await triggerButton.click();
    const tableView = page.getByLabel("table view");

    const candlestickViewButton = page.getByRole("button", {
      name: /candlestick/i,
    });
    await candlestickViewButton.click();
    await tableView.waitFor({ state: "detached" });
    const candlestickView = page.getByLabel(/candlestick view/i);
    await candlestickView.waitFor({ state: "visible" });

    await expect(candlestickView).toBeVisible();
    await expect(tableView).not.toBeVisible();
  });

  test("switch to histogram view", async ({ page, network }) => {
    network.use();
    await page.goto("http://localhost:5173/trends");
    await page.waitForLoadState("networkidle");

    await switchToCryptoBase(page);

    const triggerButton = page.getByRole("button", { name: /table/i });
    await triggerButton.click();
    const tableView = page.getByLabel("table view");

    const histogramViewButton = page.getByRole("button", {
      name: /histogram/i,
    });
    await histogramViewButton.click();
    await tableView.waitFor({ state: "detached" });
    const histogramView = page.getByLabel(/histogram view/i);
    await histogramView.waitFor({ state: "visible" });

    await expect(histogramView).toBeVisible();
    await expect(tableView).not.toBeVisible();
  });

  test("switch to a non-table view and then back to table view", async ({
    page,
    network,
  }) => {
    network.use();
    await page.goto("http://localhost:5173/trends");
    await page.waitForLoadState("networkidle");

    await switchToCryptoBase(page);

    const triggerButton = page.getByRole("button", { name: /table/i });
    await triggerButton.click();
    const tableView = page.getByLabel("table view");

    const histogramViewButton = page.getByRole("button", {
      name: /histogram/i,
    });
    await histogramViewButton.click();
    await tableView.waitFor({ state: "detached" });
    const histogramView = page.getByLabel(/histogram view/i);
    await histogramView.waitFor({ state: "visible" });

    await expect(histogramView).toBeVisible();
    await expect(tableView).not.toBeVisible();

    await histogramViewButton.click();
    const tableViewButton = page.getByRole("button", { name: /table/i });
    await tableViewButton.click();
    await histogramView.waitFor({ state: "detached" });
    await tableView.waitFor({ state: "visible" });

    await expect(histogramView).not.toBeVisible();
    await expect(tableView).toBeVisible();
  });
});

test.describe("show and hide tooltip with corresponding data fields when the chart is hovered and unhovered", () => {
  test("show tooltip with close rate for the baseline view", async ({
    page,
    network,
  }) => {
    network.use();
    await page.goto("http://localhost:5173/trends");
    await page.waitForLoadState("networkidle");

    const tableView = page.getByLabel("table view");
    const baselineViewButton = page.getByRole("button", {
      name: /baseline/i,
    });

    await baselineViewButton.click();
    await tableView.waitFor({ state: "detached" });
    const baselineView = page.getByLabel(/baseline view/i);
    await baselineView.waitFor({ state: "visible" });

    const tooltip = page.getByRole("tooltip", { name: /tooltip/i });
    await expect(tooltip).not.toBeVisible();

    await baselineView.hover();
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText(/close/i);
    await expect(tooltip).not.toHaveText(/open/i);
    await expect(tooltip).not.toHaveText(/high/i);
    await expect(tooltip).not.toHaveText(/low/i);
    await expect(tooltip).not.toHaveText(/volume/i);

    await page.mouse.move(0, 0);
    await expect(tooltip).not.toBeVisible();
  });

  test("show tooltip with rates (open, close, high, low) for the bar view", async ({
    page,
    network,
  }) => {
    network.use();
    await page.goto("http://localhost:5173/trends");
    await page.waitForLoadState("networkidle");

    const tableView = page.getByLabel("table view");
    const barViewButton = page.getByRole("button", {
      name: /bar/i,
    });

    await barViewButton.click();
    await tableView.waitFor({ state: "detached" });
    const barView = page.getByLabel(/bar view/i);
    await barView.waitFor({ state: "visible" });

    const tooltip = page.getByRole("tooltip", { name: /tooltip/i });
    await expect(tooltip).not.toBeVisible();

    await barView.hover();
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText(/close/i);
    await expect(tooltip).toHaveText(/open/i);
    await expect(tooltip).toHaveText(/high/i);
    await expect(tooltip).toHaveText(/low/i);
    await expect(tooltip).not.toHaveText(/volume/i);

    await page.mouse.move(0, 0);
    await expect(tooltip).not.toBeVisible();
  });

  test("show tooltip with rates (open, close, high, low) for the candlestick view", async ({
    page,
    network,
  }) => {
    network.use();
    await page.goto("http://localhost:5173/trends");
    await page.waitForLoadState("networkidle");

    const tableView = page.getByLabel("table view");
    const candlestickViewButton = page.getByRole("button", {
      name: /candlestick/i,
    });

    await candlestickViewButton.click();
    await tableView.waitFor({ state: "detached" });
    const candlestickView = page.getByLabel(/candlestick view/i);
    await candlestickView.waitFor({ state: "visible" });

    const tooltip = page.getByRole("tooltip", { name: /tooltip/i });
    await expect(tooltip).not.toBeVisible();

    await candlestickView.hover();
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText(/close/i);
    await expect(tooltip).toHaveText(/open/i);
    await expect(tooltip).toHaveText(/high/i);
    await expect(tooltip).toHaveText(/low/i);
    await expect(tooltip).not.toHaveText(/volume/i);

    await page.mouse.move(0, 0);
    await expect(tooltip).not.toBeVisible();
  });

  test("show tooltip with volume info for the histogram view", async ({
    page,
    network,
  }) => {
    network.use();
    await page.goto("http://localhost:5173/trends");
    await page.waitForLoadState("networkidle");

    await switchToCryptoBase(page);

    const tableView = page.getByLabel("table view");
    const histogramViewButton = page.getByRole("button", {
      name: /histogram/i,
    });

    await histogramViewButton.click();
    await tableView.waitFor({ state: "detached" });
    const histogramView = page.getByLabel(/histogram view/i);
    await histogramView.waitFor({ state: "visible" });

    const tooltip = page.getByRole("tooltip", { name: /tooltip/i });
    await expect(tooltip).not.toBeVisible();

    await histogramView.hover();
    await expect(tooltip).toBeVisible();
    await expect(tooltip).not.toHaveText(/close/i);
    await expect(tooltip).not.toHaveText(/open/i);
    await expect(tooltip).not.toHaveText(/high/i);
    await expect(tooltip).not.toHaveText(/low/i);
    await expect(tooltip).toHaveText(/volume/i);

    await page.mouse.move(0, 0);
    await expect(tooltip).not.toBeVisible();
  });
});
