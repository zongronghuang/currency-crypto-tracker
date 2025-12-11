import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencyInput from ".";

test("currency input shows received data correctly", () => {
  const currencyData = {
    code: "USD",
    symbol: "$",
    name: "United States dollar",
    country: "United States of America",
    country_codes: ["US", "USA"],
  };

  render(
    <CurrencyInput
      type="currency"
      name={currencyData.name}
      countryCode={currencyData.country_codes[0]}
      code={currencyData.code}
      value=""
    />,
  );

  const label = screen.getByRole("button", { name: /usd/i });
  expect(label).toBeInTheDocument();

  const countryFlag = screen.getByRole("img", {
    name: /united states dollar/i,
  });
  expect(countryFlag).toBeInTheDocument();

  const input = screen.getByRole("textbox");
  expect(input).toHaveValue("");
});

test("opens and closes currency menu dialog via buttons", async () => {
  const currencyData = {
    code: "USD",
    symbol: "$",
    name: "United States dollar",
    country: "United States of America",
    country_codes: ["US", "USA"],
  };
  const user = userEvent.setup();

  render(
    <CurrencyInput
      type="currency"
      name={currencyData.name}
      countryCode={currencyData.country_codes[0]}
      code={currencyData.code}
      value=""
    />,
  );

  const currencyMenu = await screen.findByRole("dialog", {
    hidden: true,
  });
  const currencyButton = screen.getByRole("button", { name: /usd/i });
  await user.click(currencyButton);
  expect(currencyMenu).toBeInTheDocument();
  const confirmButton = screen.getByRole("button", { name: /confirm/i });
  await user.click(confirmButton);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
