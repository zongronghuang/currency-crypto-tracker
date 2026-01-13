import { screen } from "@testing-library/react";
import { renderWithFileRoutes } from "@/mocks/file-route-utils";

test("toolbar contains a side menu button, a page title, and a user profile button", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });

  const navs = await screen.findAllByRole("navigation");
  const toolbar = navs[0];
  expect(toolbar).toBeVisible();

  const openMenuButton = screen.getByRole("button", { name: /open/i });
  const userButton = screen.getByRole("button", { name: /user/i });
  const pageTitle = screen.getByRole("heading", { name: /news/i });
  expect(toolbar).toContainElement(openMenuButton);
  expect(toolbar).toContainElement(userButton);
  expect(toolbar).toContainElement(pageTitle);
});

describe("toolbar title changes with url", () => {
  test("show all-cap convert title for converter page", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/converter?from=USD&to=EUR&amount=100",
    });

    const h1 = await screen.findByRole("heading", { name: /converter/i });
    expect(h1).toBeVisible();
    expect(h1).toHaveTextContent("converter");
    expect(h1).toHaveClass("uppercase");
  });

  test("show all-cap news title for news page", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/news",
    });

    const h1 = await screen.findByRole("heading", { name: /news/i });
    expect(h1).toBeVisible();
    expect(h1).toHaveTextContent("news");
    expect(h1).toHaveClass("uppercase");
  });
});
