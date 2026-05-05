import { screen, within } from "@testing-library/react";
import { renderWithFileRoutes } from "@/mocks/file-route-utils";

test("header bar contains a side menu button, a page title, and a user profile button", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });
  screen.debug();
  const headerBar = await screen.findByRole("banner");
  expect(headerBar).toBeVisible();

  const openMenuButton = within(headerBar).getByRole("button", {
    name: /open side menu/i,
  });
  const userButton = within(headerBar).getByRole("button", {
    name: /open user profile/i,
  });
  const pageTitle = within(headerBar).getByRole("heading", { name: /news/i });
  expect(headerBar).toContainElement(openMenuButton);
  expect(headerBar).toContainElement(userButton);
  expect(headerBar).toContainElement(pageTitle);
});

describe("header bar title changes with url", () => {
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

    const headerBar = await screen.findByRole("banner");
    const h1 = within(headerBar).getByRole("heading", { name: /news/i });
    expect(h1).toBeVisible();
    expect(h1).toHaveTextContent("news");
    expect(h1).toHaveClass("uppercase");
  });
});
