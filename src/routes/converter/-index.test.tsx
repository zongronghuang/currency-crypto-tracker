import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ConverterPage from ".";

test("clicking switch button changes currency input positions", async () => {
  render(<ConverterPage />);
  const user = userEvent.setup();

  const switchButton = screen.getByTitle(/switch/i);
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

test.skip("opens and closes currency menu dialog via buttons", async () => {
  render(<ConverterPage />);

  const user = userEvent.setup();
  const currencyMenu = await screen.findByRole("dialog", {
    hidden: true,
  });

  const currencyButton = await screen.findByRole("button", { name: /usd/i });

  await user.click(currencyButton);
  expect(currencyMenu).toBeInTheDocument();
  const confirmButton = screen.getByRole("button", { name: /confirm/i });
  await user.click(confirmButton);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test.skip("change currency icon and name when choosing a different icon", async () => {
  render(<ConverterPage />);

  const user = userEvent.setup();
  const currencyButton = screen.getByRole("button", { name: /usd/i });
  await user.click(currencyButton);

  const currencyMenu = screen.getByRole("dialog");
  expect(currencyMenu).toBeInTheDocument();

  const eurOption = screen.getByRole("radio", { name: /eur/i });
  await user.click(eurOption);

  const confirmButton = screen.getByRole("button", { name: /confirm/i });
  await user.click(confirmButton);

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  expect(screen.getByRole("button", { name: /eur/i })).toBeInTheDocument();
});
