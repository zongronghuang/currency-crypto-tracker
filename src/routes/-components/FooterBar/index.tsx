import { type ReactNode } from "react";
import { createPortal } from "react-dom";

export default function FooterBar({ children }: { children: ReactNode }) {
  return createPortal(
    <footer className="fixed bottom-0 left-0 z-10 min-h-12 w-full bg-white shadow-[0_3px_5px_5px_rgba(100,100,100,0.25)]">
      <nav>{children}</nav>
    </footer>,
    document.body,
  );
}
