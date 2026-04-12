import { useState, useRef, type RefObject } from "react";
import {
  Chart,
  CandlestickSeries,
  PriceLine,
  type SeriesApiRef,
} from "lightweight-charts-react-components";
import {
  type DeepPartial,
  type Time,
  type TimeChartOptions,
  type OhlcData,
  type Point,
} from "lightweight-charts";
import clsx from "clsx";
import { getRates } from "../../-helpers";
import { type FiatItem, type CryptoItem } from "../../-types";

type VisibleRateLines = {
  max: boolean;
  min: boolean;
  avg: boolean;
};

type Rates = Record<"min" | "max" | "avg", number | string>;

const maxRateLine = {
  price: "0",
  options: {
    title: "Max rate",
    color: "green",
    lineWidth: 2,
    axisLabelVisible: true,
    lineStyle: 0,
  },
} as const;

const avgRateLine = {
  price: "0",
  options: {
    title: "Avg rate",
    color: "blue",
    lineWidth: 2,
    axisLabelVisible: true,
    lineStyle: 0,
  },
} as const;

const minRateLine = {
  price: "0",
  options: {
    title: "Min rate",
    color: "orange",
    lineWidth: 2,
    axisLabelVisible: true,
    lineStyle: 0,
  },
} as const;

export default function CandlestickView({
  series,
  chartOptions,
}: {
  series: (FiatItem | CryptoItem)[];
  chartOptions: DeepPartial<TimeChartOptions>;
}) {
  const seriesRef = useRef<SeriesApiRef<"Candlestick">>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<OhlcData<Time>>({
    time: "2000-01-01",
    open: 0,
    high: 0,
    low: 0,
    close: 0,
  });
  const [isTooltipVisible, setIsToolTipVisible] = useState(false);
  const [visibleRateLines, setVisibleRateLines] = useState<VisibleRateLines>({
    min: false,
    avg: false,
    max: false,
  });

  const candlestickData = series.map((s) => ({
    time: s.time,
    open: +s.open,
    high: +s.high,
    low: +s.low,
    close: +s.close,
  }));

  const enabledRateLines = generateRateLines(
    getRates(candlestickData),
    visibleRateLines,
  );

  return (
    <div aria-label="candlestick view">
      <p className="mb-2 text-sm text-gray-600">
        Check exchange rates of the open, close, high, and low prices of the
        base currency to the quote currency.
      </p>

      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <label htmlFor="max-rate" className="leading-0">
          <input
            type="checkbox"
            name="rate-lines"
            id="max-rate"
            className="mr-1"
            checked={visibleRateLines.max}
            onChange={() =>
              setVisibleRateLines((prev) => ({ ...prev, max: !prev.max }))
            }
          />
          Max rate
        </label>
        <label htmlFor="avg-rate" className="leading-0">
          <input
            type="checkbox"
            name="rate-lines"
            id="avg-rate"
            className="mr-1"
            checked={visibleRateLines.avg}
            onChange={() =>
              setVisibleRateLines((prev) => ({ ...prev, avg: !prev.avg }))
            }
          />
          Avg rate
        </label>
        <label htmlFor="min-rate" className="leading-0">
          <input
            type="checkbox"
            name="rate-lines"
            id="min-rate"
            className="mr-1"
            checked={visibleRateLines.min}
            onChange={() =>
              setVisibleRateLines((prev) => ({ ...prev, min: !prev.min }))
            }
          />
          Min rate
        </label>
      </div>

      <div className="relative">
        <Chart
          ref={containerRef}
          options={chartOptions}
          onCrosshairMove={(params) => {
            console.log({ point: params.point });
            if (!seriesRef.current || !params.point) return;

            const seriesApi = seriesRef.current.api();
            if (!seriesApi) return;

            const data = params.seriesData.get(seriesApi) as OhlcData<Time>;
            if (!data) return;

            setIsToolTipVisible(true);
            setTooltipData(data);

            requestAnimationFrame(() => {
              const { x, y } = getTooltipPosition(
                containerRef,
                tooltipRef,
                params.point!,
              );
              tooltipRef.current!.style.left = `${x}px`;
              tooltipRef.current!.style.top = `${y}px`;
            });
          }}
        >
          <CandlestickSeries data={candlestickData} ref={seriesRef}>
            {enabledRateLines.map(({ price, options }) => (
              <PriceLine
                key={`${options?.title}-${price}`}
                options={options}
                price={+price}
              />
            ))}
          </CandlestickSeries>
          <Tooltip
            isVisible={isTooltipVisible}
            ref={tooltipRef}
            time={tooltipData.time}
            high={tooltipData.high}
            low={tooltipData.low}
            open={tooltipData.open}
            close={tooltipData.close}
          />
        </Chart>
      </div>
    </div>
  );
}

function generateRateLines(rates: Rates, visibleRateLines: VisibleRateLines) {
  const lines = [];
  if (visibleRateLines.min) lines.push({ ...minRateLine, price: rates.min });
  if (visibleRateLines.max) lines.push({ ...maxRateLine, price: rates.max });
  if (visibleRateLines.avg) lines.push({ ...avgRateLine, price: rates.avg });

  return lines;
}

function Tooltip({
  ref,
  isVisible,
  time,
  high,
  low,
  open,
  close,
}: {
  ref: RefObject<HTMLDivElement | null>;
  isVisible: boolean;
  time: Time;
  high?: number;
  low?: number;
  open?: number;
  close?: number;
}) {
  return (
    <div
      ref={ref}
      className={clsx(
        isVisible ? "visible" : "invisible",
        "absolute z-5 w-fit rounded-lg bg-blue-600 p-2 text-xs font-light text-white shadow-sm",
      )}
    >
      <h3>{time.toString()}</h3>
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
      </dl>
    </div>
  );
}

function getTooltipPosition(
  containerRef: RefObject<HTMLDivElement | null>,
  tooltipRef: RefObject<HTMLDivElement | null>,
  crosshairPosition: Point,
) {
  const containerWidth = containerRef.current!.clientWidth;
  const tooltipWidth = tooltipRef.current!.clientWidth;
  const tooltipHeight = tooltipRef.current!.clientHeight;

  const defaultX = crosshairPosition.x - tooltipWidth / 2;
  const defaultY = crosshairPosition.y - tooltipHeight * 1.2;

  let x = defaultX;
  let y = defaultY;

  const isNearLeftEdge = defaultX <= 0;
  const isNearRightEdge = defaultX + tooltipWidth >= containerWidth;
  if (isNearLeftEdge) x = defaultX + tooltipWidth / 2;
  if (isNearRightEdge) x = defaultX - tooltipWidth / 2;

  const isNearTopEdge = defaultY <= 0;
  const minDistanceY = 30;
  if (isNearTopEdge) y = crosshairPosition.y + minDistanceY;

  return { x, y };
}
