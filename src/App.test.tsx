import { screen, render } from "@testing-library/react";
import App from "./App";

test("tttttt", () => {
  console.log("????", import.meta.env.VITE_TITLE);
  render(<App />);
  const title = screen.getByRole("heading", { name: /vite/i });
  expect(title).toBeInTheDocument();
});
