import { type RefObject } from "react";
import { type Time } from "lightweight-charts";
import clsx from "clsx";

export default function OhlcvTooltip({
  ref,
  isVisible,
  time,
  high,
  low,
  open,
  close,
  volume,
}: {
  ref: RefObject<HTMLDivElement | null>;
  isVisible: boolean;
  time: Time;
  high?: number;
  low?: number;
  open?: number;
  close?: number;
  volume?: number;
}) {
  return (
    <div
      ref={ref}
      aria-label="ohlcv-tooltip"
      role="tooltip"
      className={clsx(
        isVisible ? "visible" : "invisible",
        "absolute z-5 w-fit rounded bg-blue-600 p-1 text-xs font-light text-white shadow-sm",
      )}
    >
      <time
        dateTime={time.toString()}
        className="block text-center font-semibold"
      >
        {time.toString()}
      </time>
      <dl className="grid grid-cols-2">
        {open && (
          <>
            <dt>Open</dt> <dd>{open}</dd>
          </>
        )}
        {high && (
          <>
            <dt>High</dt> <dd>{high}</dd>
          </>
        )}
        {low && (
          <>
            <dt>Low</dt> <dd>{low}</dd>
          </>
        )}
        {close && (
          <>
            <dt>Close</dt> <dd>{close}</dd>
          </>
        )}
        {volume && (
          <>
            <dt>Volume</dt> <dd>{volume}</dd>
          </>
        )}
      </dl>
    </div>
  );
}
