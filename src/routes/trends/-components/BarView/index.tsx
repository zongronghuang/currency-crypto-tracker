import { useState, useRef } from "react";
import {
  Chart,
  BarSeries,
  PriceLine,
  type PriceLineProps,
  type SeriesApiRef,
} from "lightweight-charts-react-components";
import { type DeepPartial, type TimeChartOptions } from "lightweight-charts";
import useTooltip from "@/hooks/useTooltip";
import OhlcvTooltip from "../OhlcvTooltip";
import { getRates, generateRateLines } from "../../-helpers";
import { type FiatItem, type CryptoItem } from "../../-types";

const maxRateLine: PriceLineProps = {
  price: 0,
  options: {
    title: "Max rate",
    color: "green",
    lineWidth: 2,
    axisLabelVisible: true,
    lineStyle: 0,
  },
};

const avgRateLine: PriceLineProps = {
  price: 0,
  options: {
    title: "Avg rate",
    color: "blue",
    lineWidth: 2,
    axisLabelVisible: true,
    lineStyle: 0,
  },
};

const minRateLine: PriceLineProps = {
  price: 0,
  options: {
    title: "Min rate",
    color: "orange",
    lineWidth: 2,
    axisLabelVisible: true,
    lineStyle: 0,
  },
};

export default function BarView({
  series,
  chartOptions,
}: {
  series: (FiatItem | CryptoItem)[];
  chartOptions: DeepPartial<TimeChartOptions>;
}) {
  const seriesRef = useRef<SeriesApiRef<"Bar">>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRateLines, setVisibleRateLines] = useState<
    Record<"min" | "max" | "avg", boolean>
  >({
    min: false,
    avg: false,
    max: false,
  });
  const { isTooltipVisible, turnOffTooltip, tooltipData, updateTooltip } =
    useTooltip("histogram", {
      seriesRef,
      tooltipRef,
      containerRef,
    });

  const high = "high" in tooltipData ? tooltipData.high : 0;
  const low = "low" in tooltipData ? tooltipData.low : 0;
  const open = "open" in tooltipData ? tooltipData.open : 0;
  const close = "close" in tooltipData ? tooltipData.close : 0;

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
    { max: maxRateLine, min: minRateLine, avg: avgRateLine },
  );

  return (
    <div aria-label="bar view">
      <p className="mb-2 text-sm text-slate-600 md:mb-4 md:text-lg lg:mb-6 lg:text-2xl xl:mb-10 xl:text-2xl">
        Check the open, close, high, and low exchange rates of the base currency
        against the quote currency.
      </p>

      <div className="mb-2 flex gap-2 text-sm font-semibold text-slate-900 md:mb-6 md:gap-4 md:text-lg lg:gap-6 lg:text-xl">
        <label htmlFor="max-rate" className="leading-0">
          <input
            type="checkbox"
            name="rate-lines"
            id="max-rate"
            className="mr-1 md:mr-2"
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
            className="mr-1 md:mr-2"
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
            className="mr-1 md:mr-2"
            checked={visibleRateLines.min}
            onChange={() =>
              setVisibleRateLines((prev) => ({ ...prev, min: !prev.min }))
            }
          />
          Min rate
        </label>
      </div>

      <div className="relative" onMouseLeave={turnOffTooltip}>
        <Chart
          ref={containerRef}
          options={chartOptions}
          onCrosshairMove={updateTooltip}
        >
          <BarSeries ref={seriesRef} data={barData}>
            {enabledRateLines.map(({ price, options }) => (
              <PriceLine
                key={`${options?.title}-${price}`}
                options={options}
                price={+price}
              />
            ))}
          </BarSeries>
          <OhlcvTooltip isVisible={isTooltipVisible} ref={tooltipRef}>
            <time
              dateTime={tooltipData.time.toString()}
              className="block text-center font-semibold"
            >
              {tooltipData.time.toString()}
            </time>
            <dl className="gap grid grid-cols-2">
              <dt>High</dt> <dd>{high}</dd>
              <dt>Low</dt> <dd>{low}</dd>
              <dt>Open</dt> <dd>{open}</dd>
              <dt>Close</dt> <dd>{close}</dd>
            </dl>
          </OhlcvTooltip>
        </Chart>
      </div>
    </div>
  );
}
