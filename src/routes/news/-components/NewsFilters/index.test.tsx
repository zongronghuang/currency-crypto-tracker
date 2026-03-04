import { screen, within, waitFor, fireEvent } from "@testing-library/react";
import { renderWithFileRoutes } from "@/mocks/file-route-utils";
import dayjs from "dayjs";
import userEvent from "@testing-library/user-event";

test("Initial state", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });
  const user = userEvent.setup();

  const footer = await screen.findByRole("contentinfo");
  const footerButton = within(footer).getByRole("button");

  await waitFor(() => expect(footerButton).toBeEnabled(), { timeout: 2000 });
  await user.click(footerButton);

  const footerDrawer = await screen.findByLabelText("footer drawer");
  await waitFor(() => expect(footerDrawer).toHaveClass("open"));

  // date range defaults to current dates
  const currentDate = dayjs().format("YYYY-MM-DD");
  const dates = within(footerDrawer).getAllByDisplayValue(currentDate);
  expect(dates).toHaveLength(2);

  // tickers default to BTC and USD
  const tickers = within(footerDrawer).getAllByRole("textbox", {
    hidden: true,
  });
  expect(tickers).toHaveLength(2);

  // no topics selected
  // select all checkbox is not selected
  const topics = within(footerDrawer).getAllByRole("checkbox");
  expect(topics).toHaveLength(16);

  // sort policy defaults to latest
  const latestSort = within(footerDrawer).getByRole("radio", {
    name: /latest/i,
  });
  expect(latestSort).toBeChecked();

  // limit field is hidden, not open for customization
  const limit = within(footerDrawer).getByRole("spinbutton", {
    hidden: true,
  });
  expect(limit).toHaveValue(50);

  // apply button is initially disabled
  const applyButton = within(footerDrawer).getByRole("button", {
    name: /apply/i,
  });
  expect(applyButton).toBeDisabled();
});

test("Any change in news filters enables apply button", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });
  const user = userEvent.setup();

  const footer = await screen.findByRole("contentinfo");
  const footerButton = within(footer).getByRole("button");

  await waitFor(() => expect(footerButton).toBeEnabled(), {
    timeout: 1000,
  });
  await user.click(footerButton);

  const footerDrawer = await screen.findByLabelText("footer drawer");
  await waitFor(() => expect(footerDrawer).toHaveClass("open"));

  const applyButton = within(footerDrawer).getByRole("button", {
    name: /apply/i,
  });
  expect(applyButton).toBeDisabled();

  const latestSort = within(footerDrawer).getByRole("radio", {
    name: /latest/i,
  });
  const relevanceSort = within(footerDrawer).getByRole("radio", {
    name: /relevance/i,
  });
  expect(latestSort).toBeChecked();
  expect(relevanceSort).not.toBeChecked();

  await user.click(relevanceSort);
  expect(latestSort).not.toBeChecked();
  expect(relevanceSort).toBeChecked();
  expect(applyButton).toBeEnabled();
});

test("Unapplied changes can be reverted to previous applied state, with the apply button disabled", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });
  const user = userEvent.setup();

  const footer = await screen.findByRole("contentinfo");
  const footerButton = within(footer).getByRole("button");

  await waitFor(() => expect(footerButton).toBeEnabled(), {
    timeout: 1000,
  });
  await user.click(footerButton);

  const footerDrawer = await screen.findByLabelText("footer drawer");
  await waitFor(() => expect(footerDrawer).toHaveClass("open"));
  const applyButton = within(footerDrawer).getByRole("button", {
    name: /apply/i,
  });
  expect(applyButton).toBeDisabled();

  const latestSort = within(footerDrawer).getByRole("radio", {
    name: /latest/i,
  });
  const relevanceSort = within(footerDrawer).getByRole("radio", {
    name: /relevance/i,
  });
  expect(latestSort).toBeChecked();
  expect(relevanceSort).not.toBeChecked();

  await user.click(relevanceSort);
  expect(latestSort).not.toBeChecked();
  expect(relevanceSort).toBeChecked();
  expect(applyButton).toBeEnabled();

  const cancelButton = within(footerDrawer).getByRole("button", {
    name: /cancel/i,
  });
  await user.click(cancelButton);
  expect(latestSort).toBeChecked();
  expect(relevanceSort).not.toBeChecked();
  expect(applyButton).toBeDisabled();
});

test("After changes are applied, the apply button is disabled", async () => {
  renderWithFileRoutes(<div />, {
    initialLocation: "/news",
  });
  const user = userEvent.setup();

  const footer = await screen.findByRole("contentinfo");
  const footerButton = within(footer).getByRole("button");

  await waitFor(() => expect(footerButton).toBeEnabled(), {
    timeout: 1000,
  });
  await user.click(footerButton);

  const footerDrawer = await screen.findByLabelText("footer drawer");
  await waitFor(() => expect(footerDrawer).toHaveClass("open"));
  const applyButton = within(footerDrawer).getByRole("button", {
    name: /apply/i,
  });
  expect(applyButton).toBeDisabled();

  const latestSort = within(footerDrawer).getByRole("radio", {
    name: /latest/i,
  });
  const relevanceSort = within(footerDrawer).getByRole("radio", {
    name: /relevance/i,
  });
  expect(latestSort).toBeChecked();
  expect(relevanceSort).not.toBeChecked();

  await user.click(relevanceSort);
  expect(latestSort).not.toBeChecked();
  expect(relevanceSort).toBeChecked();
  expect(applyButton).toBeEnabled();

  await user.click(applyButton);
  expect(applyButton).toBeDisabled();
});

describe("date range", () => {
  test("Start date cannot be later than end date, with validation alert", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/news",
    });
    const user = userEvent.setup();

    const footer = await screen.findByRole("contentinfo");
    const footerButton = within(footer).getByRole("button");

    await waitFor(() => expect(footerButton).toBeEnabled(), {
      timeout: 1000,
    });
    await user.click(footerButton);

    const footerDrawer = await screen.findByLabelText("footer drawer");
    await waitFor(() => expect(footerDrawer).toHaveClass("open"));

    const currentDate = dayjs().format("YYYY-MM-DD");
    const [startDate, endDate] = within(footerDrawer).getAllByDisplayValue(
      currentDate,
    ) as HTMLInputElement[];

    // incorrect end date
    const startDate1 = "2025-01-15";
    const endDate1 = "2025-01-10";
    fireEvent.change(startDate, { target: { value: startDate1 } });
    fireEvent.change(endDate, { target: { value: endDate1 } });
    expect(startDate).toHaveValue(startDate1);
    expect(endDate).not.toHaveValue(endDate1);
    expect(endDate).toHaveValue(currentDate);
    expect(endDate.validationMessage).toBe(
      "End date should be later than or equal to start date",
    );
  });

  test("end date cannot be earlier than start date, with validation alert", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/news",
    });
    const user = userEvent.setup();

    const footer = await screen.findByRole("contentinfo");
    const footerButton = within(footer).getByRole("button");

    await waitFor(() => expect(footerButton).toBeEnabled(), {
      timeout: 1000,
    });
    await user.click(footerButton);

    const footerDrawer = await screen.findByLabelText("footer drawer");
    await waitFor(() => expect(footerDrawer).toHaveClass("open"));

    const currentDate = dayjs().format("YYYY-MM-DD");
    const [startDate, endDate] = within(footerDrawer).getAllByDisplayValue(
      currentDate,
    ) as HTMLInputElement[];

    // incorrect start date
    const startDate1 = "2025-01-10";
    const startDate2 = "2025-01-20";
    const endDate1 = "2025-01-15";
    fireEvent.change(startDate, { target: { value: startDate1 } });
    fireEvent.change(endDate, { target: { value: endDate1 } });
    fireEvent.change(startDate, { target: { value: startDate2 } });
    expect(endDate).toHaveValue(endDate1);
    expect(startDate).not.toHaveValue(startDate2);
    expect(startDate).toHaveValue(startDate1);
    expect(startDate.validationMessage).toBe(
      "Start date should be earlier or equal to end date",
    );
  });
});

describe("tickers", () => {
  test("Up to 3 tickers are allowed", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/news",
    });
    const user = userEvent.setup();

    const footer = await screen.findByRole("contentinfo");
    const footerButton = within(footer).getByRole("button");

    await waitFor(() => expect(footerButton).toBeEnabled(), { timeout: 2000 });
    await user.click(footerButton);

    const footerDrawer = await screen.findByLabelText("footer drawer");
    await waitFor(() => expect(footerDrawer).toHaveClass("open"));

    // tickers default to BTC and USD
    const tickers = within(footerDrawer).getAllByRole("textbox", {
      hidden: true,
    });
    expect(tickers).toHaveLength(2);

    const tickerInput = within(footerDrawer).getByRole(
      "combobox",
    ) as HTMLInputElement;
    const addButton = within(footerDrawer).getByRole("button", {
      name: /add/i,
    });
    await user.type(tickerInput, "USDT");
    await user.click(addButton);

    await waitFor(() =>
      expect(
        within(footerDrawer).getAllByRole("textbox", {
          hidden: true,
        }),
      ).toHaveLength(3),
    );

    await user.clear(tickerInput);
    await user.type(tickerInput, "CAD");
    await user.click(addButton);
    expect(
      within(footerDrawer).getAllByRole("textbox", {
        hidden: true,
      }),
    ).toHaveLength(3);
    expect(tickerInput.validationMessage).toBe("Max 3 tickers are allowed");
  });

  test("No repeated tickers are allowed", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/news",
    });
    const user = userEvent.setup();

    const footer = await screen.findByRole("contentinfo");
    const footerButton = within(footer).getByRole("button");

    await waitFor(() => expect(footerButton).toBeEnabled(), { timeout: 2000 });
    await user.click(footerButton);

    const footerDrawer = await screen.findByLabelText("footer drawer");
    await waitFor(() => expect(footerDrawer).toHaveClass("open"));

    // tickers default to BTC and USD
    const tickers = within(footerDrawer).getAllByRole("textbox", {
      hidden: true,
    });
    expect(tickers).toHaveLength(2);

    const tickerInput = within(footerDrawer).getByRole(
      "combobox",
    ) as HTMLInputElement;
    const addButton = within(footerDrawer).getByRole("button", {
      name: /add/i,
    });
    await user.type(tickerInput, "BTC");
    await user.click(addButton);

    await waitFor(() =>
      expect(
        within(footerDrawer).getAllByRole("textbox", {
          hidden: true,
        }),
      ).toHaveLength(2),
    );
    expect(tickerInput.validationMessage).toBe(
      "This ticker is already selected",
    );
  });

  test("Custom tickers not in the list are not allowed", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/news",
    });
    const user = userEvent.setup();

    const footer = await screen.findByRole("contentinfo");
    const footerButton = within(footer).getByRole("button");

    await waitFor(() => expect(footerButton).toBeEnabled(), { timeout: 2000 });
    await user.click(footerButton);

    const footerDrawer = await screen.findByLabelText("footer drawer");
    await waitFor(() => expect(footerDrawer).toHaveClass("open"));

    // tickers default to BTC and USD
    const tickers = within(footerDrawer).getAllByRole("textbox", {
      hidden: true,
    });
    expect(tickers).toHaveLength(2);

    const tickerInput = within(footerDrawer).getByRole(
      "combobox",
    ) as HTMLInputElement;
    const addButton = within(footerDrawer).getByRole("button", {
      name: /add/i,
    });
    await user.type(tickerInput, "XXXXXXX");
    await user.click(addButton);

    await waitFor(() =>
      expect(
        within(footerDrawer).getAllByRole("textbox", {
          hidden: true,
        }),
      ).toHaveLength(2),
    );
    expect(tickerInput.validationMessage).toBe(
      "This is not a valid fiat or crypto ticker",
    );
  });
});

describe("topics", () => {
  test("Clicking select-all checkbox gets all topics selected", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/news",
    });
    const user = userEvent.setup();

    const footer = await screen.findByRole("contentinfo");
    const footerButton = within(footer).getByRole("button");

    await waitFor(() => expect(footerButton).toBeEnabled(), {
      timeout: 1000,
    });
    await user.click(footerButton);

    const footerDrawer = await screen.findByLabelText("footer drawer");
    await waitFor(() => expect(footerDrawer).toHaveClass("open"));

    const topicCheckboxes = within(footerDrawer).getAllByRole("checkbox");
    topicCheckboxes.forEach((t) => expect(t).not.toBeChecked());

    const selectAll = topicCheckboxes[0];
    expect(selectAll).not.toBeChecked();
    expect(selectAll).not.toBePartiallyChecked();

    await user.click(selectAll);
    topicCheckboxes.forEach((t) => expect(t).toBeChecked());
  });

  test("Selecting all topics also checks select-all checkbox", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/news",
    });
    const user = userEvent.setup();

    const footer = await screen.findByRole("contentinfo");
    const footerButton = within(footer).getByRole("button");

    await waitFor(() => expect(footerButton).toBeEnabled(), {
      timeout: 1000,
    });
    await user.click(footerButton);

    const footerDrawer = await screen.findByLabelText("footer drawer");
    await waitFor(() => expect(footerDrawer).toHaveClass("open"));

    const topicCheckboxes = within(footerDrawer).getAllByRole("checkbox");
    topicCheckboxes.forEach((t) => expect(t).not.toBeChecked());

    const selectAll = topicCheckboxes[0];
    expect(selectAll).not.toBeChecked();
    expect(selectAll).not.toBePartiallyChecked();
    for (let i = 1; i < topicCheckboxes.length; i++) {
      await user.click(topicCheckboxes[i]);
    }
    expect(selectAll).toBeChecked();
  });

  test("Selecting some of the topics makes select-all checkbox partially checked", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/news",
    });
    const user = userEvent.setup();

    const footer = await screen.findByRole("contentinfo");
    const footerButton = within(footer).getByRole("button");

    await waitFor(() => expect(footerButton).toBeEnabled(), {
      timeout: 1000,
    });
    await user.click(footerButton);

    const footerDrawer = await screen.findByLabelText("footer drawer");
    await waitFor(() => expect(footerDrawer).toHaveClass("open"));

    const topicCheckboxes = within(footerDrawer).getAllByRole("checkbox");
    topicCheckboxes.forEach((t) => expect(t).not.toBeChecked());

    const selectAll = topicCheckboxes[0];
    expect(selectAll).not.toBeChecked();
    expect(selectAll).not.toBePartiallyChecked();

    const firstTopic = topicCheckboxes[1];
    await user.click(firstTopic);
    expect(selectAll).toBePartiallyChecked();
  });

  test("When all topics are checked, unchecking some of the topics makes select-all checkbox partially checked", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/news",
    });
    const user = userEvent.setup();

    const footer = await screen.findByRole("contentinfo");
    const footerButton = within(footer).getByRole("button");

    await waitFor(() => expect(footerButton).toBeEnabled(), {
      timeout: 1000,
    });
    await user.click(footerButton);

    const footerDrawer = await screen.findByLabelText("footer drawer");
    await waitFor(() => expect(footerDrawer).toHaveClass("open"));

    const topicCheckboxes = within(footerDrawer).getAllByRole("checkbox");
    const selectAll = topicCheckboxes[0];
    await user.click(selectAll);
    expect(selectAll).toBeChecked();
    expect(selectAll).not.toBePartiallyChecked();

    await user.click(topicCheckboxes[2]);
    expect(selectAll).toBePartiallyChecked();
    expect(selectAll).not.toBeChecked();
  });
});
