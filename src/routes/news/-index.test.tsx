import { screen, within, waitFor } from "@testing-library/react";
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
