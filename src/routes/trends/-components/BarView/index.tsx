import { useState } from "react";
import {
  Chart,
  BarSeries,
  PriceLine,
} from "lightweight-charts-react-components";
import { type DeepPartial, type TimeChartOptions } from "lightweight-charts";
import { type FiatItem, type CryptoItem } from "../../-types";

type VisibleRateLines = {
  max: boolean;
  min: boolean;
  avg: boolean;
};

type CandlestickDataPoint = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
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

export default function BarView({
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

  const barData = series.map((s) => ({
    time: s.time,
    open: +s.open,
    high: +s.high,
    low: +s.low,
    close: +s.close,
  }));

  const enabledRateLines = generateRateLines(
    getRates(barData),
    visibleRateLines,
  );

  return (
    <div aria-label="bar view">
      <p className="mb-2 text-sm text-gray-600">
        Check the open, close, high, and low prices of the base currency in the
        quote currency.
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
        <BarSeries data={barData}>
          {enabledRateLines.map(({ price, options }) => (
            <PriceLine
              key={`${options?.title}-${price}`}
              options={options}
              price={+price}
            />
          ))}
        </BarSeries>
      </Chart>
    </div>
  );
}

function getRates(data: CandlestickDataPoint[]) {
  let min = Infinity;
  let max = 0;
  let sumOfDataPointAverage = 0;

  data.forEach((d) => {
    min = Math.min(min, d.low);
    max = Math.max(max, d.high);
    sumOfDataPointAverage += (d.high + d.low + d.open + d.close) / 4;
  });

  return { min, max, avg: sumOfDataPointAverage / data.length };
}

function generateRateLines(rates: Rates, visibleRateLines: VisibleRateLines) {
  const lines = [];
  if (visibleRateLines.min) lines.push({ ...minRateLine, price: rates.min });
  if (visibleRateLines.max) lines.push({ ...maxRateLine, price: rates.max });
  if (visibleRateLines.avg) lines.push({ ...avgRateLine, price: rates.avg });

  return lines;
}
