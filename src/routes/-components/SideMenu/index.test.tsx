import { screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { renderWithFileRoutes } from "@/mocks/file-route-utils";

test("side menu contains multiple page links and highlights matched link", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });

  const sideMenu = await screen.findByRole("menu");

  const pageLinks = within(sideMenu).getAllByRole("link");
  expect(pageLinks.length).toBeGreaterThanOrEqual(3);

  const matchedLink = screen.getByRole("link", { name: /news/i });
  expect(sideMenu).toContainElement(matchedLink);
  expect(matchedLink).toHaveAttribute("data-status", "active");
});

test("side menu button on topbar opens side menu", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });
  const user = userEvent.setup();

  const openMenuButton = await screen.findByRole("button", {
    name: /open side menu/i,
  });
  const sideMenu = screen.getByRole("menu");
  expect(sideMenu).not.toHaveFocus();
  expect(sideMenu).not.toHaveClass("open");

  await user.click(openMenuButton);
  expect(sideMenu).toBeVisible();
  expect(sideMenu).toHaveClass("open");
  expect(sideMenu).toHaveFocus();
});

test("side menu closes with a click on the backdrop", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });
  const user = userEvent.setup();

  const backdrop = await screen.findByRole("menu");
  expect(backdrop).not.toHaveClass("open");

  const openMenuButton = screen.getByRole("button", {
    name: /open side menu/i,
  });
  await user.click(openMenuButton);
  expect(backdrop).toHaveClass("open");

  const closeMenuButton = within(backdrop).getByRole("button");
  await user.click(closeMenuButton);
  expect(backdrop).not.toHaveClass("open");
});

test("clicking non-active page link on side menu changes router url and page content", async () => {
  const { router } = renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });
  const user = userEvent.setup();

  const openMenuButton = await screen.findByRole("button", {
    name: /open side menu/i,
  });
  await user.click(openMenuButton);

  const newsLink = screen.getByRole("link", { name: /news/i });
  expect(newsLink).toHaveAttribute("data-status", "active");
  expect(screen.getByRole("heading", { name: /^news$/i })).toBeInTheDocument();

  const trendsLink = screen.getByRole("link", { name: /trends/i });
  await user.click(trendsLink);
  expect(trendsLink).toHaveAttribute("data-status", "active");
  expect(newsLink).not.toHaveAttribute("data-status", "active");
  expect(router.state.location.pathname).toBe("/trends");
  expect(screen.getByRole("heading", { name: /trends/i })).toBeInTheDocument();
});
