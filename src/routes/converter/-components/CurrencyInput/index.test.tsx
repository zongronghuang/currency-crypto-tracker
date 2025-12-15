import { screen, render } from "@testing-library/react";
import CurrencyInput from ".";
import type { RefObject } from "react";

test("currency input shows received data correctly", () => {
  const mockDialogRef = { current: {} } as RefObject<HTMLDialogElement | null>;
  const mockTargetCurrencyRef = { current: "USD" } as RefObject<string>;
  const mockCurrencyData = {
    type: "fiat" as const,
    code: "USD",
    symbol: "$",
    name: "United States dollar",
    country: "United States of America",
    country_codes: ["US", "USA"],
  };

  render(
    <CurrencyInput
      currencyData={mockCurrencyData}
      dialogRef={mockDialogRef}
      targetCurrencyRef={mockTargetCurrencyRef}
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
