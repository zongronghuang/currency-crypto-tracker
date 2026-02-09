import { screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithFileRoutes } from "@/mocks/file-route-utils";

test("footer drawer opens via a click on the button in the footer bar, and closes via a click on the backdrop button", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });
  const user = userEvent.setup();

  const footerDrawer = await screen.findByLabelText("footer drawer");
  expect(footerDrawer).not.toHaveClass("open");

  const footer = screen.getByRole("contentinfo");
  const openButton = within(footer).getByLabelText(/open drawer button/i);
  await user.click(openButton);
  waitFor(() => expect(footerDrawer).toHaveClass("open"));

  const closeButton = within(footerDrawer).getByLabelText(
    "close drawer button",
  );
  await user.click(closeButton);
  waitFor(() => expect(footerDrawer).not.toHaveClass("open"));
});
