import { type ReactNode, type RefObject } from "react";
import clsx from "clsx";

export default function OhlcvTooltip({
  ref,
  isVisible,
  children,
}: {
  ref: RefObject<HTMLDivElement | null>;
  isVisible: boolean;
  children: ReactNode;
}) {
  return (
    <div
      ref={ref}
      aria-label="ohlcv-tooltip"
      role="tooltip"
      className={clsx(
        isVisible ? "visible" : "invisible",
        "absolute z-5 w-fit rounded bg-blue-600 p-1 font-light text-white shadow-sm lg:p-2 lg:text-lg",
      )}
    >
      {children}
    </div>
  );
}
