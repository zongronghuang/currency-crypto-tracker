import { Chart, HistogramSeries } from "lightweight-charts-react-components";
import { type DeepPartial, type TimeChartOptions } from "lightweight-charts";
import { type CryptoItem } from "../../-types";

export default function HistogramView({
  series,
  chartOptions,
}: {
  series: CryptoItem[];
  chartOptions: DeepPartial<TimeChartOptions>;
}) {
  const histogramData = series.map((s) => ({
    time: s.time,
    value: +s.volume,
  }));

  return (
    <div>
      <p className="mb-2 text-sm text-gray-600">
        Check the trading volumes of the base currency in the quote currency.
        Trading volume data is only available for cryptocurrencies.
      </p>
      <Chart options={chartOptions}>
        <HistogramSeries data={histogramData} />
      </Chart>
    </div>
  );
}
