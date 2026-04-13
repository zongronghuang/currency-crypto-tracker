import { useState, useRef } from "react";
import {
  Chart,
  CandlestickSeries,
  PriceLine,
  type PriceLineProps,
  type SeriesApiRef,
} from "lightweight-charts-react-components";
import {
  type DeepPartial,
  type Time,
  type TimeChartOptions,
  type OhlcData,
  type MouseEventParams,
} from "lightweight-charts";
import OhlcTooltip from "../OhlcTooltip";
import {
  getRates,
  getTooltipPosition,
  generateRateLines,
} from "../../-helpers";
import { type FiatItem, type CryptoItem } from "../../-types";

const maxRateLine: PriceLineProps = {
  price: 0,
  options: {
    title: "Max rate",
    color: "green",
    lineWidth: 2 as const,
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
    time: "",
    open: 0,
    high: 0,
    low: 0,
    close: 0,
  });
  const [isTooltipVisible, setIsToolTipVisible] = useState(false);
  const [visibleRateLines, setVisibleRateLines] = useState<
    Record<"min" | "max" | "avg", boolean>
  >({
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
    { max: maxRateLine, min: minRateLine, avg: avgRateLine },
  );

  const handleCrosshairMove = (params: MouseEventParams<Time>) => {
    if (!seriesRef.current || !params.point) return;

    const seriesApi = seriesRef.current.api();
    if (!seriesApi) return;

    const data = params.seriesData.get(seriesApi) as OhlcData<Time>;
    if (!data) return;

    // 更新 tooltip
    requestAnimationFrame(() => {
      setIsToolTipVisible(true);
      setTooltipData(data);

      const { x, y } = getTooltipPosition(
        containerRef,
        tooltipRef,
        params.point!,
      );
      tooltipRef.current!.style.left = `${x}px`;
      tooltipRef.current!.style.top = `${y}px`;
    });
  };

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
          onCrosshairMove={handleCrosshairMove}
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
          <OhlcTooltip
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
