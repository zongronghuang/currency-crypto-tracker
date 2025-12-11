import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ConverterPage from ".";

describe("initial converter page", () => {
  test("clicking switch button changes currency input positions", async () => {
    render(<ConverterPage />);
    const user = userEvent.setup();

    const usaFlagIcon = screen.getByTitle(/^us$/i);
    const ukFlagIcon = screen.getByTitle(/^gb$/i);
    expect(usaFlagIcon).toAppearBefore(ukFlagIcon);

    const switchButton = screen.getByTitle(/switch/i);

    await user.click(switchButton);

    expect(screen.getByTitle(/^us$/i)).toAppearAfter(
      screen.getByTitle(/^gb$/i),
    );
  });
});
