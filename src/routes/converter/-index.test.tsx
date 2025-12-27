import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { renderWithFileRoutes } from "@/mocks/file-route-utils";
import { calibrateNumeral, getComputableNumeral } from "@/utils";

test("clicking switch button changes currency input positions", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/converter?from=USD&to=EUR&amount=100",
  });
  const user = userEvent.setup();

  const switchButton = await screen.findByTitle(/switch/i);
  const usdFlagIcon = screen.getByTitle(/united states dollar/i);
  const eurFlagIcon = screen.getByTitle(/euro/i);
  expect(usdFlagIcon).toAppearBefore(eurFlagIcon);

  await user.click(switchButton);
  expect(screen.getByTitle(/united states dollar/i)).toAppearAfter(
    screen.getByTitle(/euro/i),
  );

  await user.click(switchButton);
  expect(screen.getByTitle(/euro/i)).toAppearAfter(
    screen.getByTitle(/united states dollar/i),
  );
});

test("amount data in the url passes to the top currency and gets converted in the bottom currency", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/converter?from=USD&to=EUR&amount=100",
  });

  const paragraphs = await screen.findAllByRole("paragraph");
  const exchangeRateInfo = paragraphs[0];
  const exchangeRate = exchangeRateInfo!
    .textContent!.replace(/1 USD = /, "")
    .replace(/EUR/, "");

  const currencyInputs = await screen.findAllByRole("textbox");
  const usdInput = currencyInputs[0];
  expect(usdInput).toHaveValue("100");

  const eurInput = currencyInputs[1] as HTMLInputElement;
  const expectedAmount = 100 * +getComputableNumeral(exchangeRate);
  const eurValue = getComputableNumeral(eurInput.value);
  expect(+eurValue).toBeCloseTo(+expectedAmount);
});

test("updated amount in the first currency gets converted in the other currency", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/converter?from=USD&to=EUR&amount=100",
  });
  const user = userEvent.setup();

  const paragraphs = await screen.findAllByRole("paragraph");
  const exchangeRateInfo = paragraphs[0];
  const exchangeRate = exchangeRateInfo!
    .textContent!.replace(/1 USD = /, "")
    .replace(/EUR/, "");

  const currencyInputs = await screen.findAllByRole("textbox");
  const usdInput = currencyInputs[0];
  await user.type(usdInput, "0");
  await user.tab(); // triggers input blur to update opposite currency
  expect(usdInput).toHaveValue("1,000");

  const eurInput = currencyInputs[1] as HTMLInputElement;
  const expectedAmount = 1000 * +getComputableNumeral(exchangeRate);
  const eurValue = getComputableNumeral(eurInput.value);
  expect(+eurValue).toBeCloseTo(+expectedAmount);
});

test("updated amount in second currency gets converted in the other currency", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/converter?from=USD&to=EUR&amount=100",
  });
  const user = userEvent.setup();

  const paragraphs = await screen.findAllByRole("paragraph");
  const exchangeRateInfo = paragraphs[0];
  const exchangeRate = exchangeRateInfo!
    .textContent!.replace(/1 USD = /, "")
    .replace(/EUR/, "");

  const currencyInputs = await screen.findAllByRole("textbox");

  const eurInput = currencyInputs[1] as HTMLInputElement;
  await user.type(eurInput, "0");
  await user.tab(); // triggers input blur to update opposite currency
  const eurValue = (+exchangeRate * 1000).toString();
  expect(eurInput).toHaveValue(calibrateNumeral(eurValue));

  const usdInput = currencyInputs[0] as HTMLInputElement;
  const usdValue = +getComputableNumeral(usdInput.value);
  const expectedAmount = +eurValue / +exchangeRate;
  expect(usdValue).toBeCloseTo(expectedAmount);
});
