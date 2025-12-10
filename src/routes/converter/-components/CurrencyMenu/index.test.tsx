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

  test("pop-up closes when user clicks confirm button", async () => {
    render(<CurrencyMenu open={true} />);
    const user = userEvent.setup();

    const popup = screen.queryByRole("dialog");
    expect(popup).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    await user.click(confirmButton);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("has currency and crypto radio buttons and they are checked upon clicks", async () => {
    render(<CurrencyMenu open={true} />);
    const user = userEvent.setup();

    const typeButtons = screen.getAllByRole("radio", {
      name: /currency|crypto/i,
    });
    expect(typeButtons).toHaveLength(2);
    typeButtons.forEach((radio) => expect(radio).toBeRequired());

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
  });

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

  test("typing in search input returns partial currency matches by country name or currency name", async () => {
    render(<CurrencyMenu open={true} />);
    const user = userEvent.setup();

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

    // 輸入愈少字母時的符合項目數量應會大於等於愈多字母時的數量
    expect(initialListLength).toBeGreaterThan(firstKeystrokeListLength);
    expect(firstKeystrokeListLength).toBeGreaterThanOrEqual(
      secondkeystrokeListLength,
    );
    expect(secondkeystrokeListLength).toBeGreaterThanOrEqual(
      thirdKeystrokeListLength,
    );
  });

  test("typing in search input returns partial crypto matches by crypto code or name", async () => {
    render(<CurrencyMenu open={true} />);
    const user = userEvent.setup();

    const search = screen.getByRole("searchbox");
    const currencyOption = screen.getByRole("radio", { name: /currency/i });
    const cryptoOption = screen.getByRole("radio", { name: /crypto/i });

    await user.click(cryptoOption);
    expect(cryptoOption).toBeChecked();
    expect(currencyOption).not.toBeChecked();

    await user.clear(search);
    const initialListLength = screen.getAllByRole("listitem").length;

    await user.type(search, "B");
    const firstKeystrokeListLength = screen.getAllByRole("listitem").length;

    await user.type(search, "T");
    const secondkeystrokeListLength = screen.getAllByRole("listitem").length;

    await user.type(search, "C");
    const thirdKeystrokeListLength = screen.getAllByRole("listitem").length;

    // 輸入愈少字母時的符合項目數量應會大於等於愈多字母時的數量
    expect(initialListLength).toBeGreaterThan(firstKeystrokeListLength);
    expect(firstKeystrokeListLength).toBeGreaterThanOrEqual(
      secondkeystrokeListLength,
    );
    expect(secondkeystrokeListLength).toBeGreaterThanOrEqual(
      thirdKeystrokeListLength,
    );
  });

  test("show full list of currency options when search input gets cleared", async () => {
    render(<CurrencyMenu open={true} />);
    const user = userEvent.setup();

    const search = screen.getByRole("searchbox");
    const currencyOption = screen.getByRole("radio", { name: /currency/i });

    expect(search).toHaveValue("");
    expect(currencyOption).toBeChecked();

    // currency 選單
    //// 清除 exact match 後，顯示完整選單
    await user.type(search, "USD");
    expect(screen.queryAllByRole("listitem")).toHaveLength(1);

    await user.clear(search);
    expect(screen.queryAllByRole("listitem")).toHaveLength(17);
  });

  test("show full list of crypto options when search input gets cleared", async () => {
    render(<CurrencyMenu open={true} />);
    const user = userEvent.setup();

    const search = screen.getByRole("searchbox");
    const currencyOption = screen.getByRole("radio", { name: /currency/i });
    const cryptoOption = screen.getByRole("radio", { name: /crypto/i });

    await user.click(cryptoOption);
    expect(cryptoOption).toBeChecked();
    expect(currencyOption).not.toBeChecked();

    // crypto 選單
    const cryptoItems = screen.queryAllByRole("listitem");
    expect(cryptoItems).toHaveLength(13);

    //// 清除 exact match 後，顯示完整選單
    await user.clear(search);
    await user.type(search, "USDC");
    expect(screen.queryAllByRole("listitem")).toHaveLength(1);

    await user.clear(search);
    expect(screen.queryAllByRole("listitem")).toHaveLength(13);
  });

  describe("keyboard navigation among radio inputs", () => {
    test("tab-move to check currency radio options", async () => {
      render(<CurrencyMenu open={true} />);
      const user = userEvent.setup();

      const currencyOption = screen.getByRole("radio", { name: /currency/i });
      const search = screen.getByRole("searchbox");
      const firstRadioInput = screen.getByLabelText(/eur/i);
      const secondRadioInput = screen.getByLabelText(/gbp/i);
      const thirdRadioInput = screen.getByLabelText(/usd/i);

      expect(currencyOption).toBeChecked();
      expect(search).toHaveValue("");

      // tab focus 移動到第一個 currency 選項; 有 focus 但不選取
      await user.keyboard("{Tab}");
      await user.keyboard("{Tab}");
      await user.keyboard("{Tab}");
      expect(firstRadioInput).toHaveFocus();
      expect(firstRadioInput).not.toBeChecked();

      // 箭頭移動會 focus 並選取選項
      //// 下箭頭和右箭頭都是前往下一個選項
      await user.keyboard("{ArrowRight}");
      expect(secondRadioInput).toHaveFocus();
      expect(secondRadioInput).toBeChecked();

      await user.keyboard("{ArrowDown}");
      expect(thirdRadioInput).toHaveFocus();
      expect(thirdRadioInput).toBeChecked();

      //// 上箭頭和左箭頭都是回到上一個選項
      await user.keyboard("{ArrowUp}");
      await user.keyboard("{ArrowLeft}");
      expect(firstRadioInput).toHaveFocus();
      expect(firstRadioInput).toBeChecked();
    });

    test("tab-move to check crypto radio options", async () => {
      render(<CurrencyMenu open={true} />);
      const user = userEvent.setup();

      const cryptoOption = screen.getByRole("radio", { name: /crypto/i });
      const search = screen.getByRole("searchbox");

      await user.click(cryptoOption);
      expect(cryptoOption).toBeChecked();
      expect(search).toHaveValue("");

      // tab focus 移動到第一個 currency 選項; 有 focus 但不選取
      await user.keyboard("{Tab}");
      await user.keyboard("{Tab}");

      const firstRadioInput = screen.getByLabelText(/^btc$/i);
      const secondRadioInput = screen.getByLabelText(/^eth$/i);
      const thirdRadioInput = screen.getByLabelText(/^usdt$/i);
      expect(firstRadioInput).toHaveFocus();
      expect(firstRadioInput).not.toBeChecked();

      // 箭頭移動會 focus 並選取選項
      //// 下箭頭和右箭頭都是前往下一個選項
      await user.keyboard("{ArrowRight}");
      expect(secondRadioInput).toHaveFocus();
      expect(secondRadioInput).toBeChecked();

      await user.keyboard("{ArrowDown}");
      expect(thirdRadioInput).toHaveFocus();
      expect(thirdRadioInput).toBeChecked();

      //// 上箭頭和左箭頭都是回到上一個選項
      await user.keyboard("{ArrowUp}");
      await user.keyboard("{ArrowLeft}");
      expect(firstRadioInput).toHaveFocus();
      expect(firstRadioInput).toBeChecked();
    });
  });
});
