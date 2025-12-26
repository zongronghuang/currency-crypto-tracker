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
