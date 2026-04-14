import { screen, fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { type NewsFilters as NewsFiltersType } from "@/apis";
import NewsFilters from ".";

test("represents the default filters in form controls", async () => {
  const mockFilters = {
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    tickers: ["BTC", "USD"],
    topics: [],
    sort: "LATEST",
    limit: 50,
  } as NewsFiltersType;
  const mockSetFilters = vi.fn();
  const mockOnClose = vi.fn();

  render(
    <NewsFilters
      filters={mockFilters}
      setFilters={mockSetFilters}
      onClose={mockOnClose}
    />,
  );

  const form = screen.getByRole("form");
  const applyButton = screen.getByRole("button", {
    name: /apply/i,
  });
  const cancelButton = screen.getByRole("button", { name: /cancel/i });

  expect(form).toHaveFormValues(mockFilters);
  expect(applyButton).toBeDisabled();
  expect(cancelButton).toBeEnabled();
});

test("Any change in news filters enables apply button", async () => {
  const mockFilters = {
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    tickers: ["BTC", "USD"],
    topics: [],
    sort: "LATEST",
    limit: 50,
  } as NewsFiltersType;
  const mockSetFilters = vi.fn();
  const mockOnClose = vi.fn();

  render(
    <NewsFilters
      filters={mockFilters}
      setFilters={mockSetFilters}
      onClose={mockOnClose}
    />,
  );
  const user = userEvent.setup();

  const form = screen.getByRole("form") as HTMLFormElement;
  const applyButton = screen.getByRole("button", {
    name: /apply/i,
  });
  const relevanceSort = screen.getByRole("radio", {
    name: /relevance/i,
  });

  expect(applyButton).toBeDisabled();

  await user.click(relevanceSort);
  expect(form).toHaveFormValues({
    ...mockFilters,
    sort: "RELEVANCE",
  });
  expect(form.sort).not.toBe(mockFilters.sort);
  expect(applyButton).toBeEnabled();
});

test("Unapplied changes can be reverted to previous applied state, with the apply button disabled", async () => {
  const mockFilters = {
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    tickers: ["BTC", "USD"],
    topics: [],
    sort: "LATEST",
    limit: 50,
  } as NewsFiltersType;
  const mockSetFilters = vi.fn();
  const mockOnClose = vi.fn();

  render(
    <NewsFilters
      filters={mockFilters}
      setFilters={mockSetFilters}
      onClose={mockOnClose}
    />,
  );
  const user = userEvent.setup();

  const form = screen.getByRole("form");
  const applyButton = screen.getByRole("button", {
    name: /apply/i,
  });
  const relevanceSort = screen.getByRole("radio", {
    name: /relevance/i,
  });
  const cancelButton = screen.getByRole("button", {
    name: /cancel/i,
  });

  expect(applyButton).toBeDisabled();

  await user.click(relevanceSort);
  expect(form).toHaveFormValues({ ...mockFilters, sort: "RELEVANCE" });
  expect(applyButton).toBeEnabled();

  await user.click(cancelButton);
  expect(form).toHaveFormValues(mockFilters);
  expect(applyButton).toBeDisabled();
});

test("After changes are applied, the apply button is disabled", async () => {
  const mockFilters = {
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    tickers: ["BTC", "USD"],
    topics: [],
    sort: "LATEST",
    limit: 50,
  } as NewsFiltersType;
  const mockSetFilters = vi.fn();
  const mockOnClose = vi.fn();

  render(
    <NewsFilters
      filters={mockFilters}
      setFilters={mockSetFilters}
      onClose={mockOnClose}
    />,
  );
  const user = userEvent.setup();

  const applyButton = screen.getByRole("button", {
    name: /apply/i,
  });
  const relevanceSort = screen.getByRole("radio", {
    name: /relevance/i,
  });

  expect(applyButton).toBeDisabled();

  await user.click(relevanceSort);
  expect(relevanceSort).toBeChecked();
  expect(applyButton).toBeEnabled();

  await user.click(applyButton);
  expect(mockSetFilters).toHaveBeenCalled();
  expect(mockOnClose).toHaveBeenCalled();
  expect(applyButton).toBeDisabled();
});

describe("date range", () => {
  test("Start date cannot be later than end date, with validation alert", async () => {
    const mockFilters = {
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
      tickers: ["BTC", "USD"],
      topics: [],
      sort: "LATEST",
      limit: 50,
    } as NewsFiltersType;
    const mockSetFilters = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <NewsFilters
        filters={mockFilters}
        setFilters={mockSetFilters}
        onClose={mockOnClose}
      />,
    );

    const currentDate = dayjs().format("YYYY-MM-DD");
    const [startDate, endDate] = screen.getAllByDisplayValue(
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
    const mockFilters = {
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
      tickers: ["BTC", "USD"],
      topics: [],
      sort: "LATEST",
      limit: 50,
    } as NewsFiltersType;
    const mockSetFilters = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <NewsFilters
        filters={mockFilters}
        setFilters={mockSetFilters}
        onClose={mockOnClose}
      />,
    );

    const currentDate = dayjs().format("YYYY-MM-DD");
    const [startDate, endDate] = screen.getAllByDisplayValue(
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
    const mockFilters = {
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
      tickers: ["BTC", "USD"],
      topics: [],
      sort: "LATEST",
      limit: 50,
    } as NewsFiltersType;
    const mockSetFilters = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <NewsFilters
        filters={mockFilters}
        setFilters={mockSetFilters}
        onClose={mockOnClose}
      />,
    );
    const user = userEvent.setup();

    let tickers = screen.getAllByRole("textbox", { hidden: true });
    expect(tickers).toHaveLength(2);

    const tickerInput = screen.getByRole("combobox") as HTMLInputElement;
    const addButton = screen.getByRole("button", {
      name: /add/i,
    });

    await user.type(tickerInput, "USDT");
    await user.click(addButton);
    tickers = screen.getAllByRole("textbox", { hidden: true });
    expect(tickers).toHaveLength(3);

    await user.clear(tickerInput);
    await user.type(tickerInput, "CAD");
    await user.click(addButton);
    tickers = screen.getAllByRole("textbox", { hidden: true });
    expect(tickers).toHaveLength(3);
    expect(tickerInput.validationMessage).toBe("Max 3 tickers are allowed");
  });

  test("No repeated tickers are allowed", async () => {
    const mockFilters = {
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
      tickers: ["BTC", "USD"],
      topics: [],
      sort: "LATEST",
      limit: 50,
    } as NewsFiltersType;
    const mockSetFilters = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <NewsFilters
        filters={mockFilters}
        setFilters={mockSetFilters}
        onClose={mockOnClose}
      />,
    );
    const user = userEvent.setup();

    let tickers = screen.getAllByRole("textbox", {
      hidden: true,
    });
    expect(tickers).toHaveLength(2);

    const tickerInput = screen.getByRole("combobox") as HTMLInputElement;
    const addButton = screen.getByRole("button", {
      name: /add/i,
    });

    await user.type(tickerInput, "BTC");
    await user.click(addButton);
    tickers = screen.getAllByRole("textbox", {
      hidden: true,
    });
    expect(tickers).toHaveLength(2);
    expect(tickerInput.validationMessage).toBe(
      "This ticker is already selected",
    );
  });

  test("Custom tickers not in the list are not allowed", async () => {
    const mockFilters = {
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
      tickers: ["BTC", "USD"],
      topics: [],
      sort: "LATEST",
      limit: 50,
    } as NewsFiltersType;
    const mockSetFilters = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <NewsFilters
        filters={mockFilters}
        setFilters={mockSetFilters}
        onClose={mockOnClose}
      />,
    );
    const user = userEvent.setup();

    let tickers = screen.getAllByRole("textbox", {
      hidden: true,
    });
    expect(tickers).toHaveLength(2);

    const tickerInput = screen.getByRole("combobox") as HTMLInputElement;
    const addButton = screen.getByRole("button", {
      name: /add/i,
    });

    await user.type(tickerInput, "XXXXXXX");
    await user.click(addButton);
    tickers = screen.getAllByRole("textbox", {
      hidden: true,
    });
    expect(tickers).toHaveLength(2);
    expect(tickerInput.validationMessage).toBe(
      "This is not a valid fiat or crypto ticker",
    );
  });
});

describe("topics", () => {
  test("Clicking select-all checkbox gets all topics selected", async () => {
    const mockFilters = {
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
      tickers: ["BTC", "USD"],
      topics: [],
      sort: "LATEST",
      limit: 50,
    } as NewsFiltersType;
    const mockSetFilters = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <NewsFilters
        filters={mockFilters}
        setFilters={mockSetFilters}
        onClose={mockOnClose}
      />,
    );
    const user = userEvent.setup();

    const topicCheckboxes = screen.getAllByRole("checkbox");
    topicCheckboxes.forEach((t) => expect(t).not.toBeChecked());

    const selectAll = topicCheckboxes[0];
    expect(selectAll).not.toBeChecked();
    expect(selectAll).not.toBePartiallyChecked();

    await user.click(selectAll);
    topicCheckboxes.forEach((t) => expect(t).toBeChecked());
  });

  test("Selecting all topics also checks select-all checkbox", async () => {
    const mockFilters = {
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
      tickers: ["BTC", "USD"],
      topics: [],
      sort: "LATEST",
      limit: 50,
    } as NewsFiltersType;
    const mockSetFilters = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <NewsFilters
        filters={mockFilters}
        setFilters={mockSetFilters}
        onClose={mockOnClose}
      />,
    );
    const user = userEvent.setup();

    const topicCheckboxes = screen.getAllByRole("checkbox");
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
    const mockFilters = {
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
      tickers: ["BTC", "USD"],
      topics: [],
      sort: "LATEST",
      limit: 50,
    } as NewsFiltersType;
    const mockSetFilters = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <NewsFilters
        filters={mockFilters}
        setFilters={mockSetFilters}
        onClose={mockOnClose}
      />,
    );
    const user = userEvent.setup();

    const topicCheckboxes = screen.getAllByRole("checkbox");
    topicCheckboxes.forEach((t) => expect(t).not.toBeChecked());

    const selectAll = topicCheckboxes[0];
    expect(selectAll).not.toBeChecked();
    expect(selectAll).not.toBePartiallyChecked();

    const firstTopic = topicCheckboxes[1];
    await user.click(firstTopic);
    expect(selectAll).toBePartiallyChecked();
  });

  test("When all topics are checked, unchecking some of the topics makes select-all checkbox partially checked", async () => {
    const mockFilters = {
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
      tickers: ["BTC", "USD"],
      topics: [],
      sort: "LATEST",
      limit: 50,
    } as NewsFiltersType;
    const mockSetFilters = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <NewsFilters
        filters={mockFilters}
        setFilters={mockSetFilters}
        onClose={mockOnClose}
      />,
    );
    const user = userEvent.setup();

    const topicCheckboxes = screen.getAllByRole("checkbox");
    const selectAll = topicCheckboxes[0];
    await user.click(selectAll);
    expect(selectAll).toBeChecked();
    expect(selectAll).not.toBePartiallyChecked();

    await user.click(topicCheckboxes[2]);
    expect(selectAll).toBePartiallyChecked();
    expect(selectAll).not.toBeChecked();
  });
});
