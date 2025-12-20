import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithFileRoutes } from "@/mocks/file-route-utils";

describe("pop-up currency menu", () => {
  test("pop-up closes when user clicks the backdrop or outside the dialog", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/converter?from=USD&to=EUR&amount=100",
    });
    const user = userEvent.setup();
    const usdButton = await screen.findByRole("button", { name: /usd/i });
    await user.click(usdButton);

    const dialog = await screen.findByRole("dialog", { hidden: true });
    expect(dialog).toBeInTheDocument();
    dialog.setAttribute("open", "true");

    // 點擊 backdrop 或外部區域使得 dialog 關閉的行為，是瀏覽器設計的行為，理應已有瀏覽器廠商測試，不需要再撰寫測試，只需確認 dialog 有對應屬性值即可
    expect(dialog).toHaveAttribute("closedby", "any");
  });

  test("pop-up closes when user clicks confirm button", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/converter?from=USD&to=EUR&amount=100",
    });
    const user = userEvent.setup();
    const usdButton = await screen.findByRole("button", { name: /usd/i });
    await user.click(usdButton);

    const dialog = await screen.findByRole("dialog", { hidden: true });
    expect(dialog).toBeInTheDocument();
    dialog.setAttribute("open", "true");

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    await user.click(confirmButton);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("has fiat and crypto radio buttons and they are checked upon clicks", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/converter?from=USD&to=EUR&amount=100",
    });
    const user = userEvent.setup();

    const usdButton = await screen.findByRole("button", { name: /usd/i });
    await user.click(usdButton);

    const dialog = await screen.findByRole("dialog", { hidden: true });
    expect(dialog).toBeInTheDocument();
    dialog.setAttribute("open", "true");

    const typeButtons = screen.getAllByRole("radio", {
      name: /fiat|crypto/i,
    });
    expect(typeButtons).toHaveLength(2);
    typeButtons.forEach((radio) => expect(radio).toBeRequired());

    const fiatOption = screen.getByRole("radio", { name: /fiat/i });
    const cryptoOption = screen.getByRole("radio", { name: /crypto/i });
    expect(fiatOption).toBeChecked();
    expect(cryptoOption).not.toBeChecked();

    await user.click(cryptoOption);
    expect(fiatOption).not.toBeChecked();
    expect(cryptoOption).toBeChecked();

    await user.click(fiatOption);
    expect(fiatOption).toBeChecked();
    expect(cryptoOption).not.toBeChecked();
  });

  // IntersectionObserver is not implemented in RTL
  test("currency list changes with selected radio button", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/converter?from=USD&to=EUR&amount=100",
    });
    const user = userEvent.setup();

    const usdButton = await screen.findByRole("button", { name: /usd/i });
    await user.click(usdButton);

    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog).toBeInTheDocument();
    dialog.setAttribute("open", "true");

    const fiatOption = screen.getByRole("radio", { name: /fiat/i });
    const cryptoOption = screen.getByRole("radio", { name: /crypto/i });

    const list = screen.getByRole("list");
    expect(list).toHaveClass(/fiat/i);

    await user.click(cryptoOption);
    expect(list).toHaveClass(/crypto/i);

    await user.click(fiatOption);
    expect(list).toHaveClass(/fiat/i);
  });

  test("search input accepts only digits and alphabet", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/converter?from=USD&to=EUR&amount=100",
    });
    const user = userEvent.setup();

    const usdButton = await screen.findByRole("button", { name: /usd/i });
    await user.click(usdButton);

    const dialog = await screen.findByRole("dialog", { hidden: true });
    expect(dialog).toBeInTheDocument();
    dialog.setAttribute("open", "true");

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

  // IntersectionObserver is not implemented in RTL
  test.skip("typing in search input returns partial fiat matches by country name or fiat name", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/converter?from=USD&to=EUR&amount=100",
    });
    const user = userEvent.setup();

    const search = screen.getByRole("searchbox");
    const fiatOption = screen.getByRole("radio", { name: /fiat/i });
    const cryptoOption = screen.getByRole("radio", { name: /crypto/i });

    expect(fiatOption).toBeChecked();
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

  // IntersectionObserver is not implemented in RTL
  test.skip("typing in search input returns partial crypto matches by crypto code or name", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/converter?from=USD&to=EUR&amount=100",
    });
    const user = userEvent.setup();

    const search = screen.getByRole("searchbox");
    const fiatOption = screen.getByRole("radio", { name: /fiat/i });
    const cryptoOption = screen.getByRole("radio", { name: /crypto/i });

    await user.click(cryptoOption);
    expect(cryptoOption).toBeChecked();
    expect(fiatOption).not.toBeChecked();

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

  // IntersectionObserver is not implemented in RTL
  test.skip("show full list of fiat options when search input gets cleared", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/converter?from=USD&to=EUR&amount=100",
    });
    const user = userEvent.setup();

    const search = screen.getByRole("searchbox");
    const fiatOption = screen.getByRole("radio", { name: /fiat/i });

    expect(search).toHaveValue("");
    expect(fiatOption).toBeChecked();

    // fiat 選單
    //// 清除 exact match 後，顯示完整選單
    await user.type(search, "USD");
    expect(screen.queryAllByRole("listitem")).toHaveLength(1);

    await user.clear(search);
    expect(screen.queryAllByRole("listitem")).toHaveLength(17);
  });

  // IntersectionObserver is not implemented in RTL
  test.skip("show full list of crypto options when search input gets cleared", async () => {
    renderWithFileRoutes(<div />, {
      initialLocation: "/converter?from=USD&to=EUR&amount=100",
    });
    const user = userEvent.setup();

    const search = screen.getByRole("searchbox");
    const fiatOption = screen.getByRole("radio", { name: /fiat/i });
    const cryptoOption = screen.getByRole("radio", { name: /crypto/i });

    await user.click(cryptoOption);
    expect(cryptoOption).toBeChecked();
    expect(fiatOption).not.toBeChecked();

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

  // IntersectionObserver is not implemented in RTL
  describe.skip("keyboard navigation among radio inputs", () => {
    test("tab-move to check fiat radio options", async () => {
      renderWithFileRoutes(<div />, {
        initialLocation: "/converter?from=USD&to=EUR&amount=100",
      });
      const user = userEvent.setup();

      const fiatOption = screen.getByRole("radio", { name: /fiat/i });
      const search = screen.getByRole("searchbox");
      const firstRadioInput = screen.getByLabelText(/eur/i);
      const secondRadioInput = screen.getByLabelText(/gbp/i);
      const thirdRadioInput = screen.getByLabelText(/usd/i);

      expect(fiatOption).toBeChecked();
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
      renderWithFileRoutes(<div />, {
        initialLocation: "/converter?from=USD&to=EUR&amount=100",
      });
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
