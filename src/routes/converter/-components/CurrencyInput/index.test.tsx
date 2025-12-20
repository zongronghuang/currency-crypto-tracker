import { screen } from "@testing-library/react";
import { renderWithFileRoutes } from "@/mocks/file-route-utils";

test("currency input shows received data correctly", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/converter?from=USD&to=EUR&amount=100",
  });

  const label = await screen.findByRole("button", { name: /usd/i });
  expect(label).toBeInTheDocument();

  const countryFlag = screen.getByRole("img", {
    name: /united states dollar/i,
  });
  expect(countryFlag).toBeInTheDocument();

  const input = screen.getAllByRole("textbox")[0];
  expect(input).toHaveValue("100");
});
