import { expect } from "@playwright/test";
import { test } from "../playwright.setup.ts";

test.describe("mobile touch events", () => {
  test.skip(({ isMobile }) => !isMobile, "Mobile only!");

  test("swipe side menu open and closed", async ({ page }) => {
    await page.goto("http://localhost:5173/news");
    await page.waitForLoadState("networkidle");

    const startX = 0;
    const coordY = 100;
    const distance = 200;

    const swipeMenu = page.getByRole("menu");
    await expect(swipeMenu).not.toHaveClass(/open/i);

    const start0 = [{ clientX: startX, clientY: coordY, identifier: 0 }];
    await page.locator("body").dispatchEvent("touchstart", {
      touches: start0,
      changedTouches: start0,
      targetTouches: start0,
    });

    const move0 = [
      { clientX: startX + distance, clientY: coordY, identifier: 0 },
    ];
    await page.locator("body").dispatchEvent("touchmove", {
      touches: move0,
      changedTouches: move0,
      targetTouches: move0,
    });

    const end0 = [
      { clientX: startX + distance, clientY: coordY, identifier: 0 },
    ];
    await page.locator("body").dispatchEvent("touchend", {
      touches: [],
      changedTouches: end0,
      targetTouches: [],
    });
    await expect(swipeMenu).toHaveClass(/open/i);

    // swipe back the menu
    const start1 = [
      {
        clientX: startX + distance,
        clientY: coordY,
        identifier: 1,
      },
    ];
    await page.locator("body").dispatchEvent("touchstart", {
      touches: start1,
      changedTouches: start1,
      targetTouches: start1,
    });

    const move1 = [
      {
        clientX: startX + distance / 2,
        clientY: coordY,
        identifier: 1,
      },
    ];
    await page.locator("body").dispatchEvent("touchmove", {
      touches: move1,
      changedTouches: move1,
      targetTouches: move1,
    });

    const end1 = [{ clientX: startX, clientY: coordY, identifier: 1 }];
    await page.locator("body").dispatchEvent("touchend", {
      touches: [],
      changedTouches: end1,
      targetTouches: [],
    });
    await expect(swipeMenu).not.toHaveClass(/open/i);
  });

  test("side menu collapses if swiped open less than 50% of nav width", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/news");
    await page.waitForLoadState("networkidle");

    const swipeMenu = page.getByRole("menu");
    const swipeNav = swipeMenu.getByRole("navigation");
    await expect(swipeMenu).not.toHaveClass(/open/i);

    const startX = 0;
    const startY = 100;
    const halfNavWidth = await swipeNav.evaluate((target) => {
      const bounds = target.getBoundingClientRect();
      return bounds.width / 2;
    });

    const startTouches = [{ clientX: startX, clientY: startY, identifier: 1 }];
    await page.locator("body").dispatchEvent("touchstart", {
      touches: startTouches,
      changedTouches: startTouches,
      targetTouches: startTouches,
    });

    const moveTouches = [
      { clientX: startX + halfNavWidth - 50, clientY: startY, identifier: 1 },
    ];
    await page.locator("body").dispatchEvent("touchmove", {
      touches: moveTouches,
      changedTouches: moveTouches,
      targetTouches: moveTouches,
    });

    const endTouches = [
      { clientX: startX + halfNavWidth - 50, clientY: startY, identifier: 1 },
    ];
    await page.locator("body").dispatchEvent("touchend", {
      touches: endTouches,
      changedTouches: endTouches,
      targetTouches: endTouches,
    });
    await expect(swipeMenu).not.toHaveClass(/open/i);
  });

  test("side menu expands if swiped open more than 50% of nav width", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/news");
    await page.waitForLoadState("networkidle");

    const swipeMenu = page.getByRole("menu");
    const swipeNav = swipeMenu.getByRole("navigation");
    await expect(swipeMenu).not.toHaveClass(/open/i);

    const startX = 0;
    const startY = 100;
    const halfNavWidth = await swipeNav.evaluate((target) => {
      const bounds = target.getBoundingClientRect();
      return bounds.width / 2;
    });

    const startTouches = [{ clientX: startX, clientY: startY, identifier: 1 }];
    await page.locator("body").dispatchEvent("touchstart", {
      touches: startTouches,
      changedTouches: startTouches,
      targetTouches: startTouches,
    });

    const moveTouches = [
      { clientX: startX + halfNavWidth + 50, clientY: startY, identifier: 1 },
    ];
    await page.locator("body").dispatchEvent("touchmove", {
      touches: moveTouches,
      changedTouches: moveTouches,
      targetTouches: moveTouches,
    });

    const endTouches = [
      { clientX: startX + halfNavWidth + 50, clientY: startY, identifier: 1 },
    ];
    await page.locator("body").dispatchEvent("touchend", {
      touches: endTouches,
      changedTouches: endTouches,
      targetTouches: endTouches,
    });
    await expect(swipeMenu).toHaveClass(/open/i);
  });
});
