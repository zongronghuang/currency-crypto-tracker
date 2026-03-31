import { useState } from "react";
import {
  Chart,
  CandlestickSeries,
  PriceLine,
} from "lightweight-charts-react-components";
import { type DeepPartial, type TimeChartOptions } from "lightweight-charts";
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

      <Chart options={chartOptions}>
        <CandlestickSeries data={candlestickData}>
          {enabledRateLines.map(({ price, options }) => (
            <PriceLine
              key={`${options?.title}-${price}`}
              options={options}
              price={+price}
            />
          ))}
        </CandlestickSeries>
      </Chart>
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
