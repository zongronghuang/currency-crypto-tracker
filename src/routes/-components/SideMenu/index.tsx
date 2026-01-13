import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import styles from "./index.module.css";

const pageLinks = [
  { to: "/converter", label: "Converter" },
  { to: "/trends", label: "Trends" },
  { to: "/news", label: "News" },
  { to: "/chat", label: "Chat" },
];

type SideMenuProps = {
  isSwipeable?: boolean;
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SideMenu({
  isSwipeable = false,
  isSideMenuOpen,
  setIsSideMenuOpen,
}: SideMenuProps) {
  const sideMenuRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSideMenuOpen) backdropRef.current?.focus();
    else backdropRef.current?.blur();
  }, [isSideMenuOpen]);

  useEffect(() => {
    if (!isSwipeable) return;

    const sideMenuWidth = Number(
      getComputedStyle(sideMenuRef.current!).width.replace("px", ""),
    ); // px
    const minSwipeDistance = 30; // px (touch gesture criterion)
    let touchStartX: number | null = null;
    let touchMoveX = 0;

    function handleTouchStart(event: TouchEvent) {
      const currentX = event.changedTouches[0].clientX;
      const triggerArea = 40; // px
      const isWithinTriggerArea =
        currentX <= triggerArea || currentX >= sideMenuWidth;
      if (!isWithinTriggerArea) return;

      touchStartX = Math.min(currentX, sideMenuWidth);
    }

    function handleTouchMove(event: TouchEvent) {
      if (touchStartX === null) return;

      const currentX = event.changedTouches[0].clientX;
      touchMoveX = currentX;
      const isSwipeGesture =
        Math.abs(currentX - touchStartX) >= minSwipeDistance;
      if (!isSwipeGesture) return;

      let rafId: number | null = null;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updateView();
          rafId = null;
        });
      }

      function updateView() {
        // backdrop alpha
        const maxAlpha = 0.5;
        const currentAlpha = (currentX / sideMenuWidth) * maxAlpha;
        const alpha = Math.min(currentAlpha, maxAlpha);
        backdropRef.current!.style.backgroundColor = `rgb(0 0 0 / ${alpha})`;

        // backdrop z-index
        backdropRef.current!.style.zIndex = "10";

        // side menu transition
        sideMenuRef.current!.style.transitionDuration = "0s";

        // side menu translation
        const isExpanding = currentX - touchStartX! >= 0;
        const xTranslation = isExpanding
          ? Math.min(-1 * sideMenuWidth + currentX, 0)
          : Math.max(currentX - sideMenuWidth, sideMenuWidth * -1);
        sideMenuRef.current!.style.transform = `translateX(${xTranslation}px)`;
      }
    }

    function handleTouchEnd(event: TouchEvent) {
      if (touchStartX === null) return;

      const currentX = Math.min(event.changedTouches[0].clientX, sideMenuWidth);
      const isExpanding = currentX > touchMoveX;
      const swipeDistance = isExpanding ? minSwipeDistance : 0;
      const isSwipeGesture = Math.abs(currentX - touchStartX) >= swipeDistance;
      if (!isSwipeGesture) return;

      sideMenuRef.current!.style = "";
      backdropRef.current!.style = "";
      touchStartX = null;
      const shouldExpand =
        sideMenuWidth / 2 <= currentX && currentX <= sideMenuWidth;
      setIsSideMenuOpen(shouldExpand);
    }

    document.body.addEventListener("touchstart", handleTouchStart);
    document.body.addEventListener("touchmove", handleTouchMove);
    document.body.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.body.removeEventListener("touchstart", handleTouchStart);
      document.body.removeEventListener("touchmove", handleTouchMove);
      document.body.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isSwipeable, setIsSideMenuOpen]);

  return createPortal(
    <div
      tabIndex={0}
      ref={backdropRef}
      role="menu"
      className={clsx(isSideMenuOpen && "open", styles.backdrop)}
    >
      <nav
        ref={sideMenuRef}
        className={clsx(isSideMenuOpen && "open", styles.sideMenu)}
      >
        <ul>
          {pageLinks.map((link) => (
            <li key={link.label}>
              <Link
                className="block p-3 text-2xl font-bold outline"
                to={link.to}
                preload="intent"
                onClick={(event) => event.stopPropagation()}
                activeProps={{ className: "font-bold bg-blue-600" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="h-full grow bg-transparent"
        onClick={() => setIsSideMenuOpen(false)}
      />
    </div>,
    document.body,
  );
}
