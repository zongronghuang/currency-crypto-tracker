import { type ReactNode } from "react";
import { createPortal } from "react-dom";

export default function FooterBar({ children }: { children: ReactNode }) {
  return createPortal(
    <footer className="fixed bottom-0 left-0 z-5 min-h-12 w-full bg-white outline">
      <nav>{children}</nav>
    </footer>,
    document.querySelector("#root")!,
  );
}
