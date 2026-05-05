import {
  screen,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse, delay } from "msw";
import { server } from "@/mocks/server";
import { renderWithFileRoutes, queryClient } from "@/mocks/file-route-utils";
import { mockFiatTrends } from "@/mocks/mockTrends";

describe("default state", () => {
  test("shows USD/EUR trends data in a 7-column table", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/trends",
    });

    const alert = await screen.findByRole("alert");
    await waitForElementToBeRemoved(alert, { timeout: 1500 });

    const bulletinBoard = await screen.findByRole("region", {
      name: /bulletin Board/i,
    });
    const currencyPair = within(bulletinBoard).getByRole("heading", {
      level: 2,
    });
    expect(currencyPair).toHaveTextContent("Base/quote: USD ⁄ EUR");

    const table = await screen.findByRole("table");
    const headers = within(table).getAllByRole("columnheader");
    expect(headers).toHaveLength(7);
  });

  test("has 4 view buttons: table, line chart, bar chart, and candlestick chart", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/trends",
    });

    const tableViewButton = await screen.findByRole("button", {
      name: /table/i,
    });
    const baselineViewButton = screen.getByRole("button", {
      name: /baseline/i,
    });
    const candlestickViewButton = screen.getByRole("button", {
      name: /candlestick/i,
    });
    const barViewButton = screen.getByRole("button", { name: /bar/i });
    const histogramViewButton = screen.queryByRole("button", {
      name: /histogram/i,
    });

    expect(tableViewButton).toBeVisible();
    expect(baselineViewButton).toBeVisible();
    expect(candlestickViewButton).toBeVisible();
    expect(barViewButton).toBeVisible();
    expect(histogramViewButton).not.toBeInTheDocument();
  });

  test("trends menu is set to USD/EUR currency pair and daily data point", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/trends",
    });
    const user = userEvent.setup();

    const footerButton = await screen.findByRole("button", {
      name: /open drawer button/i,
    });
    await user.click(footerButton);

    const trendsMenu = await screen.findByRole("form", {
      name: /trends menu/i,
    });
    expect(trendsMenu).toHaveFormValues({
      base: "USD",
      quote: "EUR",
      dataPoint: "daily",
    });
  });
});

describe("fiat base currency", () => {
  test("[First Page] prev button (disabled), next button (enabled), current page (1), maxPage( > 1); [Middle Pages] prev button (enabled), next button (enabled), current page (incremented by 1); [Last Page] prev button (enabled), next button (disabled), current page (=== max page)", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/trends",
    });
    const user = userEvent.setup();

    const pagination = await screen.findByRole("navigation", {
      name: /table pagination/i,
    });
    const prevButton = within(pagination).getByRole("button", {
      name: /go to previous page/i,
    });
    const nextButton = within(pagination).getByRole("button", {
      name: /go to next page/i,
    });
    const currentPage =
      within(pagination).getByLabelText(/current page number/i);
    const maxPage = within(pagination).getByLabelText(/max page number/i);
    const currentPageNumber = +currentPage.textContent;
    const maxPageNumber = +maxPage.textContent;

    // first page
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
    expect(currentPage).toHaveTextContent("1");
    expect(+maxPage.textContent).toBeGreaterThan(1);

    // middle pages
    for (let i = currentPageNumber; i < maxPageNumber - 1; i++) {
      await user.click(nextButton);
      expect(prevButton).toBeEnabled();
      expect(+currentPage.textContent).toBe(i + 1);
      expect(nextButton).toBeEnabled();
    }

    // last page
    await user.click(nextButton);
    expect(+currentPage.textContent).toBe(maxPageNumber);
    expect(prevButton).toBeEnabled();
    expect(nextButton).toBeDisabled();

    // backward to first page
    for (let j = maxPageNumber; j > 2; j--) {
      await user.click(prevButton);
      expect(+currentPage.textContent).toBe(j - 1);
      expect(prevButton).toBeEnabled();
      expect(nextButton).toBeEnabled();
    }

    // first page
    await user.click(prevButton);
    expect(+currentPage.textContent).toBe(1);
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
  });

  test("has table view, line view, candlestick view, and bar view buttons", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/trends",
    });
    const tableViewButton = await screen.findByRole("button", {
      name: /table/i,
    });
    const baselineViewButton = screen.getByRole("button", {
      name: /baseline/i,
    });
    const candlestickViewButton = screen.getByRole("button", {
      name: /candlestick/i,
    });
    const barViewButton = screen.getByRole("button", { name: /bar/i });
    const histogramViewButton = screen.queryByRole("button", {
      name: /histogram/i,
    });

    expect(tableViewButton).toBeVisible();
    expect(baselineViewButton).toBeVisible();
    expect(candlestickViewButton).toBeVisible();
    expect(barViewButton).toBeVisible();
    expect(histogramViewButton).not.toBeInTheDocument();
  });
});

describe("crypto base currency", () => {
  async function switchToCryptoBase() {
    renderWithFileRoutes(<div />, {
      initialLocation: "/trends",
    });
    const user = userEvent.setup();

    const footerButton = await screen.findByRole("button", {
      name: /open drawer button/i,
    });

    await user.click(footerButton);

    const form = await screen.findByRole("form", { name: /trends menu/i });
    const [baseMenu, quoteMenu] = within(form).getAllByRole("listbox");
    const applyButton = within(form).getByRole("button", { name: /apply/i });

    await user.selectOptions(baseMenu, "BTC");
    await user.selectOptions(quoteMenu, "EUR");
    await user.click(applyButton);
    await waitFor(() => expect(form).not.toBeVisible());
  }

  test("shows trends data in an 8-column table", async () => {
    await switchToCryptoBase();

    const bulletinBoard = await screen.findByRole("region", {
      name: /bulletin Board/i,
    });
    const currencyPair = within(bulletinBoard).getByRole("heading", {
      level: 2,
    });
    await waitFor(() =>
      expect(currencyPair).toHaveTextContent("Base/quote: BTC ⁄ EUR"),
    );

    const table = await screen.findByRole("table");
    const headers = within(table).getAllByRole("columnheader");
    expect(headers).toHaveLength(8);
  });

  test("has 5 view buttons: table, line, bar, candlestick, and histogram buttons", async () => {
    await switchToCryptoBase();

    const tableViewButton = await screen.findByRole("button", {
      name: /table/i,
    });
    const baselineViewButton = screen.getByRole("button", {
      name: /baseline/i,
    });
    const candlestickViewButton = screen.getByRole("button", {
      name: /candlestick/i,
    });
    const barViewButton = screen.getByRole("button", { name: /bar/i });
    const histogramViewButton = screen.getByRole("button", {
      name: /histogram/i,
    });

    expect(tableViewButton).toBeVisible();
    expect(baselineViewButton).toBeVisible();
    expect(candlestickViewButton).toBeVisible();
    expect(barViewButton).toBeVisible();
    expect(histogramViewButton).toBeVisible();
  });
});

describe("handles network errors and response delays", () => {
  test("an oops-titled alert shows up when network errors happens", async () => {
    // 清除其他測試留下的 query cache
    // 以免 TanStack Query 直接回傳過去的成功資料，而忽略模擬的網路錯誤
    queryClient.clear();

    server.use(
      http.get("https://api.example.com/fiat_trends", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithFileRoutes(<div />, {
      initialLocation: "/trends",
    });

    const loadingAlert = await screen.findByRole("alert");
    await waitForElementToBeRemoved(loadingAlert);

    const errorAlert = await screen.findByRole("alert", { hidden: true });
    const title = within(errorAlert).getByRole("heading");
    await waitFor(() => expect(title).toHaveTextContent(/oops/i));
  });

  test("a loading alert shows up when network response is slow", async () => {
    // 清除其他測試留下的 query cache
    // 以免 TanStack Query 直接回傳過去的成功資料，而忽略模擬的網路延遲
    queryClient.clear();

    server.use(
      http.get("https://api.example.com/fiat_trends", async () => {
        await delay(2000);
        return HttpResponse.json(mockFiatTrends);
      }),
    );

    renderWithFileRoutes(<div />, {
      initialLocation: "/trends",
    });

    const alert = await screen.findByRole("alert");
    const title = within(alert).getByRole("heading");
    await waitFor(() => expect(title).toHaveTextContent(/loading/i));
  });
});
