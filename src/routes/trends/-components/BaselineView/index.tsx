import { useState } from "react";
import { Chart, BaselineSeries } from "lightweight-charts-react-components";
import {
  type DeepPartial,
  type TimeChartOptions,
  type BaselineStyleOptions,
} from "lightweight-charts";
import { type FiatItem, type CryptoItem } from "../../-types";

export default function BaselineView({
  series,
  chartOptions,
}: {
  series: (FiatItem | CryptoItem)[];
  chartOptions: DeepPartial<TimeChartOptions>;
}) {
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
          onChange={(event) => setBaseRate(+event.currentTarget.value)}
        />
        <span>
          Max <br /> {maxRate}
        </span>
      </div>
      <Chart options={chartOptions}>
        <BaselineSeries data={baselineData} options={baselineStyleOptions} />
      </Chart>
    </div>
  );
}
