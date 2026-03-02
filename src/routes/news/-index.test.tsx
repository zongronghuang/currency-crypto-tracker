import { screen, within, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import { renderWithFileRoutes } from "@/mocks/file-route-utils";

test("while loading news data, the app has three skeleton cards and the footer button is disabled", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });

  const links = await screen.findAllByText(/read more/i);
  expect(links).toHaveLength(3);
  links.forEach((link) => expect(link).toHaveClass("animate-pulse"));
  links.forEach((link) => expect(link).not.toHaveAttribute("href"));

  const footer = screen.getByRole("contentinfo");
  const footerButton = within(footer).getByRole("button");
  expect(footerButton).toBeDisabled();
});

test("when data is fully loaded and rendered into cards, no skeleton cards are present and the footer button is enabled", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });

  const links = await screen.findAllByText(/read more/i);
  expect(links).toHaveLength(3);
  links.forEach((link) =>
    waitFor(() => expect(link).not.toHaveClass("animate-pulse")),
  );
  links.forEach((link) => waitFor(() => expect(link).toHaveAttribute("href")));

  const footer = screen.getByRole("contentinfo");
  const footerButton = within(footer).getByRole("button");
  waitFor(() => expect(footerButton).toBeEnabled());
});

test("shows no-news alert when no news data is available based on current filters", async () => {
  server.resetHandlers(
    http.get("https://api.example.com/news", async () => {
      return HttpResponse.json({
        items: "",
        sentiment_score_definition: "",
        relevance_score_definition: "",
        feed: [],
      });
    }),
  );

  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });

  const newsCards = screen.queryAllByRole("article");
  expect(newsCards).toHaveLength(0);

  const noDataAlert = await screen.findByRole("alert");
  expect(noDataAlert).toBeVisible();
});

test.only("shows alert when server error occurs", async () => {
  server.resetHandlers(
    http.get("https://api.example.com/news", async () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });

  const newsCards = screen.queryAllByRole("article");
  expect(newsCards).toHaveLength(0);

  const noDataAlert = await screen.findByRole("alert");
  expect(noDataAlert).toBeVisible();
});
