import { Chart, BarSeries } from "lightweight-charts-react-components";
import { type DeepPartial, type TimeChartOptions } from "lightweight-charts";
import { type FiatItem, type CryptoItem } from "../../-types";

export default function BarView({
  series,
  chartOptions,
}: {
  series: (FiatItem | CryptoItem)[];
  chartOptions: DeepPartial<TimeChartOptions>;
}) {
  const barData = series.map((s) => ({
    time: s.time,
    open: +s.open,
    high: +s.high,
    low: +s.low,
    close: +s.close,
  }));

  return (
    <div>
      <p className="mb-2 text-sm text-gray-600">
        Check the open, close, high, and low prices of the base currency in the
        quote currency.
      </p>
      <Chart options={chartOptions}>
        <BarSeries data={barData} />
      </Chart>
    </div>
  );
}
