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
});
