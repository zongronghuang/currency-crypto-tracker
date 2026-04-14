import { screen, within, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TrendsMenu from ".";
import { CRYPTO_TRADING_PAIRS } from "@/constants/crypto-exchange-list";

test("by default, base currency (USD), quote currency (EUR), data point (daily); the apply button is disabled; the cancel button is enabled", async () => {
  const mockTrendsApiParams = {
    base: "USD",
    quote: "EUR",
    dataPoint: "daily",
  } as const;
  const mockSetTrendsApiParams = vi.fn();
  const mockOnClose = vi.fn();

  render(
    <TrendsMenu
      trendsApiParams={mockTrendsApiParams}
      setTrendsApiParams={mockSetTrendsApiParams}
      onClose={mockOnClose}
    />,
  );

  const form = screen.getByRole("form");
  expect(form).toHaveFormValues({
    base: "USD",
    quote: "EUR",
    dataPoint: "daily",
  });

  const applyButton = screen.getByRole("button", {
    name: /apply/i,
  });
  expect(applyButton).toBeDisabled();

  const cancelButton = screen.getByRole("button", {
    name: /cancel/i,
  });
  expect(cancelButton).toBeEnabled();
});

test("A fiat currency selected as base does not appear in the quote selection menu", async () => {
  const mockTrendsApiParams = {
    base: "USD",
    quote: "EUR",
    dataPoint: "daily",
  } as const;
  const mockSetTrendsApiParams = vi.fn();
  const mockOnClose = vi.fn();

  render(
    <TrendsMenu
      trendsApiParams={mockTrendsApiParams}
      setTrendsApiParams={mockSetTrendsApiParams}
      onClose={mockOnClose}
    />,
  );
  const user = userEvent.setup();

  const menus = screen.getAllByRole("listbox");
  const [baseMenu, quoteMenu] = menus;

  const baseValue1 = "USD";
  expect(baseMenu).toHaveValue(baseValue1);
  const USDQuote = within(quoteMenu).queryByRole("option", { name: /^usd$/i });
  const GBPQuote = within(quoteMenu).queryByRole("option", { name: /^gbp$/i });
  expect(USDQuote).not.toBeInTheDocument();
  expect(GBPQuote).toBeInTheDocument();

  const baseValue2 = "GBP";
  await user.selectOptions(baseMenu, baseValue2);
  expect(baseMenu).toHaveValue(baseValue2);
  expect(GBPQuote).not.toBeInTheDocument();
});

test("A crypto currency selected as base has its own quote options according to the crypto exchange list", async () => {
  const mockTrendsApiParams = {
    base: "USD",
    quote: "EUR",
    dataPoint: "daily",
  } as const;
  const mockSetTrendsApiParams = vi.fn();
  const mockOnClose = vi.fn();

  render(
    <TrendsMenu
      trendsApiParams={mockTrendsApiParams}
      setTrendsApiParams={mockSetTrendsApiParams}
      onClose={mockOnClose}
    />,
  );
  const user = userEvent.setup();

  const menus = screen.getAllByRole("listbox");
  const [baseMenu, quoteMenu] = menus;

  const cryptoBase = "AAVE";
  await user.selectOptions(baseMenu, cryptoBase);
  expect(baseMenu).toHaveValue(cryptoBase);

  const expectedQuoteOptions = CRYPTO_TRADING_PAIRS[cryptoBase];
  const quoteOptions = within(quoteMenu).getAllByRole(
    "option",
  ) as HTMLOptionElement[];
  expect(quoteOptions).toHaveLength(expectedQuoteOptions.length);
  quoteOptions.forEach((q) => expect(expectedQuoteOptions).toContain(q.value));
});

test("any menu change enables the apply button", async () => {
  const mockTrendsApiParams = {
    base: "USD",
    quote: "EUR",
    dataPoint: "daily",
  } as const;
  const mockSetTrendsApiParams = vi.fn();
  const mockOnClose = vi.fn();

  render(
    <TrendsMenu
      trendsApiParams={mockTrendsApiParams}
      setTrendsApiParams={mockSetTrendsApiParams}
      onClose={mockOnClose}
    />,
  );
  const user = userEvent.setup();

  const applyButton = screen.getByRole("button", { name: /apply/i });
  expect(applyButton).toBeDisabled();

  const weeklyRadio = screen.getByRole("radio", { name: /weekly/i });
  await user.click(weeklyRadio);
  expect(applyButton).toBeEnabled();
});

test("clicking the cancel button reverts the menu to the last applied state, with the apply button disabled", async () => {
  const mockTrendsApiParams = {
    base: "USD",
    quote: "EUR",
    dataPoint: "daily",
  } as const;
  const mockSetTrendsApiParams = vi.fn();
  const mockOnClose = vi.fn();

  render(
    <TrendsMenu
      trendsApiParams={mockTrendsApiParams}
      setTrendsApiParams={mockSetTrendsApiParams}
      onClose={mockOnClose}
    />,
  );
  const user = userEvent.setup();

  const menus = screen.getAllByRole("listbox");
  const [baseMenu, quoteMenu] = menus;
  await user.selectOptions(baseMenu, "GBP");
  await user.selectOptions(quoteMenu, "CAD");

  const weeklyRadio = screen.getByRole("radio", { name: /weekly/i });
  await user.click(weeklyRadio);

  const form = screen.getByRole("form");
  expect(form).toHaveFormValues({
    base: "GBP",
    quote: "CAD",
    dataPoint: "weekly",
  });

  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  await user.click(cancelButton);
  expect(form).toHaveFormValues(mockTrendsApiParams);

  const applyButton = screen.getByRole("button", { name: /apply/i });
  expect(applyButton).toBeDisabled();
});

test("applying changes updates the state and closes the menu", async () => {
  const mockTrendsApiParams = {
    base: "USD",
    quote: "EUR",
    dataPoint: "daily",
  } as const;
  const mockSetTrendsApiParams = vi.fn();
  const mockOnClose = vi.fn();

  render(
    <TrendsMenu
      trendsApiParams={mockTrendsApiParams}
      setTrendsApiParams={mockSetTrendsApiParams}
      onClose={mockOnClose}
    />,
  );
  const user = userEvent.setup();

  const applyButton = screen.getByRole("button", { name: /apply/i });
  expect(applyButton).toBeDisabled();

  const weeklyRadio = screen.getByRole("radio", { name: /weekly/i });
  await user.click(weeklyRadio);
  expect(applyButton).toBeEnabled();

  await user.click(applyButton);
  expect(mockSetTrendsApiParams).toHaveBeenCalled();
  expect(mockOnClose).toHaveBeenCalled();
});
