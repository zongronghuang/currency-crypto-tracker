import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencyMenu from ".";

describe("pop-up currency menu", () => {
  test("pop-up closes when user clicks the backdrop or outside the dialog", async () => {
    render(<CurrencyMenu />);

    const popup = screen.getByRole("dialog", { hidden: true });

    // 點擊 backdrop 或外部區域使得 dialog 關閉的行為，是瀏覽器設計的行為，理應已有瀏覽器廠商測試，不需要再撰寫測試，只需確認 dialog 有對應屬性值即可
    expect(popup).toHaveAttribute("closedby", "any");
  });

  test("pop-up closes when user selects a currency option", async () => {
    render(<CurrencyMenu open={true} />);
    const user = userEvent.setup();

    const popup = screen.queryByRole("dialog");
    expect(popup).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(0);

    await user.click(listItems[2]);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test(
    "has currency and crypto radio buttons and they are checked upon clicks",
    { timeout: 2000 },
    async () => {
      render(<CurrencyMenu open={true} />);
      const user = userEvent.setup();

      const radioGroup = screen.getAllByRole("radio");
      expect(radioGroup).toHaveLength(2);
      radioGroup.forEach((radio) => expect(radio).toBeRequired());

      const currencyOption = screen.getByRole("radio", { name: /currency/i });
      const cryptoOption = screen.getByRole("radio", { name: /crypto/i });

      expect(currencyOption).toBeChecked();
      expect(cryptoOption).not.toBeChecked();

      await user.click(cryptoOption);
      expect(currencyOption).not.toBeChecked();
      expect(cryptoOption).toBeChecked();

      await user.click(currencyOption);
      expect(currencyOption).toBeChecked();
      expect(cryptoOption).not.toBeChecked();
    },
  );

  test("currency list changes with selected radio button", async () => {
    render(<CurrencyMenu open={true} />);
    const user = userEvent.setup();

    const currencyOption = screen.getByRole("radio", { name: /currency/i });
    const cryptoOption = screen.getByRole("radio", { name: /crypto/i });

    const list = screen.getByRole("list");
    const listItem = screen.getAllByRole("listitem")[0];
    expect(list).toHaveClass(/currency/i);
    expect(listItem).toHaveTextContent(/eur/i);

    await user.click(cryptoOption);
    expect(list).toHaveClass(/crypto/i);
    expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(/btc/i);

    await user.click(currencyOption);
    expect(list).toHaveClass(/currency/i);
    expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(/eur/i);
  });

  test("search input accepts only digits and alphabet", async () => {
    render(<CurrencyMenu open={true} />);
    const user = userEvent.setup();

    const search = screen.getByRole("searchbox");
    expect(search).toBeEnabled();
    expect(search).toHaveValue("");

    await user.type(search, "abc");
    expect(search).toHaveValue("abc");

    await user.clear(search);
    await user.type(search, "ab#");
    expect(search).toHaveValue("ab");

    await user.clear(search);
    await user.type(search, "$ab0");
    expect(search).toHaveValue("ab0");
  });

  test("typing in search input returns partial matches by country name or currency name", async () => {
    render(<CurrencyMenu open={true} />);
    const user = userEvent.setup();

    // currency 選單
    const search = screen.getByRole("searchbox");
    const currencyOption = screen.getByRole("radio", { name: /currency/i });
    const cryptoOption = screen.getByRole("radio", { name: /crypto/i });

    expect(currencyOption).toBeChecked();
    expect(cryptoOption).not.toBeChecked();

    await user.clear(search);
    const initialListLength = screen.getAllByRole("listitem").length;

    await user.type(search, "U");
    const firstKeystrokeListLength = screen.getAllByRole("listitem").length;

    await user.type(search, "S");
    const secondkeystrokeListLength = screen.getAllByRole("listitem").length;

    await user.type(search, "D");
    const thirdKeystrokeListLength = screen.getAllByRole("listitem").length;

    expect(initialListLength).toBeGreaterThan(firstKeystrokeListLength);
    expect(firstKeystrokeListLength).toBeGreaterThanOrEqual(
      secondkeystrokeListLength,
    );
    expect(secondkeystrokeListLength).toBeGreaterThanOrEqual(
      thirdKeystrokeListLength,
    );

    // crypto 選單
  });

  test(
    "show full list of options when search input gets cleared",
    { timeout: 8000 },
    async () => {
      render(<CurrencyMenu open={true} />);
      const user = userEvent.setup();

      const search = screen.getByRole("searchbox");
      const currencyOption = screen.getByRole("radio", { name: /currency/i });
      const cryptoOption = screen.getByRole("radio", { name: /crypto/i });
      const currencyItems = screen.queryAllByRole("listitem");

      expect(search).toHaveValue("");
      expect(currencyOption).toBeChecked();
      expect(cryptoOption).not.toBeChecked();
      expect(currencyItems).toHaveLength(164);

      // currency 選單
      //// 清除 exact match 後，顯示完整選單
      await user.type(search, "USD");
      expect(screen.queryAllByRole("listitem")).toHaveLength(1);

      await user.clear(search);
      expect(screen.queryAllByRole("listitem")).toHaveLength(164);

      //// 清除無 match 字串後，顯示完整選單
      await user.type(search, "XXXXXX");
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);

      await user.clear(search);
      expect(screen.queryAllByRole("listitem")).toHaveLength(164);

      // crypto 選單
      await user.click(cryptoOption);
      expect(currencyOption).not.toBeChecked();
      expect(cryptoOption).toBeChecked();

      const cryptoItems = screen.queryAllByRole("listitem");
      expect(cryptoItems).toHaveLength(353);

      //// 清除 exact match 後，顯示完整選單
      await user.clear(search);
      await user.type(search, "USDC");
      expect(screen.queryAllByRole("listitem")).toHaveLength(1);

      await user.clear(search);
      expect(screen.queryAllByRole("listitem")).toHaveLength(353);

      //// 清除無 match 字串後，顯示完整選單
      await user.type(search, "XXXXXX");
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);

      await user.clear(search);
      expect(screen.queryAllByRole("listitem")).toHaveLength(353);
    },
  );
});
