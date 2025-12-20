import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { renderWithFileRoutes } from "@/mocks/file-route-utils";

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

test("opens and closes currency menu dialog via buttons", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/converter?from=USD&to=EUR&amount=100",
  });
  const user = userEvent.setup();

  const usdButton = await screen.findByRole("button", { name: /usd/i });
  await user.click(usdButton);

  const dialog = await screen.findByRole("dialog", {
    hidden: true,
  });
  expect(dialog).toBeInTheDocument();
  dialog.setAttribute("open", "true");

  const confirmButton = screen.getByRole("button", { name: /confirm/i });
  await user.click(confirmButton);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

// IntersectionObserver is not implemented in RTL
test.skip("change currency icon and name when choosing a different icon", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/converter?from=USD&to=EUR&amount=100",
  });
  const user = userEvent.setup();

  const usdButton = await screen.findByRole("button", { name: /usd/i });
  await user.click(usdButton);

  const dialog = screen.getByRole("dialog", { hidden: true });
  expect(dialog).toBeInTheDocument();
  dialog.setAttribute("open", "true");

  const eurOption = screen.getByRole("radio", { name: /eur/i });
  await user.click(eurOption);

  const confirmButton = screen.getByRole("button", { name: /confirm/i });
  await user.click(confirmButton);

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  expect(screen.getByRole("button", { name: /eur/i })).toBeInTheDocument();
});
