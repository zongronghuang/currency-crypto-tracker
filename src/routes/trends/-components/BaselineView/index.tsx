import { useState, useRef, type ChangeEvent } from "react";
import {
  Chart,
  BaselineSeries,
  type SeriesApiRef,
} from "lightweight-charts-react-components";
import {
  type DeepPartial,
  type TimeChartOptions,
  type BaselineStyleOptions,
} from "lightweight-charts";
import useTooltip from "@/hooks/useTooltip";
import OhlcvTooltip from "../OhlcvTooltip";
import { type FiatItem, type CryptoItem } from "../../-types";

export default function BaselineView({
  series,
  chartOptions,
}: {
  series: (FiatItem | CryptoItem)[];
  chartOptions: DeepPartial<TimeChartOptions>;
}) {
  const seriesRef = useRef<SeriesApiRef<"Baseline">>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isTooltipVisible, tooltipData, updateTooltip, turnOffTooltip } =
    useTooltip("histogram", {
      seriesRef,
      tooltipRef,
      containerRef,
    });

  const close = "value" in tooltipData ? tooltipData.value : 0;

  const baselineData = series.map((s) => ({
    time: s.time,
    value: +s.close, // close exchange rate 之意
  }));
  const rates = baselineData.map((s) => s.value).sort((a, b) => a - b);
  const minRate = rates[0];
  const maxRate = rates.at(-1)!;
  const defaultRate = (maxRate + minRate) / 2;

  const [baseRate, setBaseRate] = useState(defaultRate);

  const baselineStyleOptions: DeepPartial<BaselineStyleOptions> = {
    baseValue: { type: "price", price: baseRate },
  };

  const updateBaseRate = (event: ChangeEvent<HTMLInputElement>) => {
    const newBaseRate = +event.currentTarget.value;
    requestAnimationFrame(() => setBaseRate(newBaseRate));
  };

  return (
    <div aria-label="baseline view">
      <p className="mb-2 text-sm text-gray-600">
        The baseline chart displays the close exchange rate of the base currency
        to the quote currency.
      </p>
      <p className="mb-2 text-sm text-gray-600">
        Set a base rate to profile overall rate trends.
      </p>
      <div className="text-semibold mb-4 flex items-center justify-between text-center text-sm">
        <span>
          Min <br />
          {minRate}
        </span>
        <input
          id="base-rate"
          type="range"
          min={minRate}
          max={maxRate}
          step="0.0001"
          value={baseRate}
          data-base-rate={baseRate}
          className="relative grow self-start after:absolute after:-bottom-6 after:left-1/2 after:-translate-x-1/2 after:content-[attr(data-base-rate)]"
          onChange={updateBaseRate}
        />
        <span>
          Max <br /> {maxRate}
        </span>
      </div>

      <div className="relative" onMouseLeave={turnOffTooltip}>
        <Chart
          ref={containerRef}
          options={chartOptions}
          onCrosshairMove={updateTooltip}
        >
          <BaselineSeries
            ref={seriesRef}
            data={baselineData}
            options={baselineStyleOptions}
          />

          <OhlcvTooltip
            ref={tooltipRef}
            isVisible={isTooltipVisible}
            time={tooltipData.time}
            close={close}
          />
        </Chart>
      </div>
    </div>
  );
}
