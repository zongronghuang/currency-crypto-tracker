import "@testing-library/jest-dom/vitest";
import { beforeAll, afterEach, afterAll } from "vitest";

import { server } from "./mocks/server";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/*
JS-DOM 並未完全實現 <dialog> 的所有方法，因此需要額外 mock 方法，確認測試順利執行
*/
declare global {
  interface HTMLDialogElement {
    show(): void;
    showModal(): void;
    close(returnValue?: string): void;
  }
}

// Provide mock implementations
HTMLDialogElement.prototype.show = function () {
  this.setAttribute("open", "true");
};

HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "true");
  this.setAttribute("data-modal", ""); // helpful for tests if needed
};

HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
  this.removeAttribute("data-modal");
};

HTMLElement.prototype.scrollTo = vi.fn();

const IntersectionObserverMock = vi.fn(function () {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };
});

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
