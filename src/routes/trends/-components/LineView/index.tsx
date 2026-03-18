import { Chart, LineSeries } from "lightweight-charts-react-components";
import { type DeepPartial, type TimeChartOptions } from "lightweight-charts";
import { type FiatItem, type CryptoItem } from "../../-types";

export default function LineView({
  series,
  chartOptions,
}: {
  series: (FiatItem | CryptoItem)[];
  chartOptions: DeepPartial<TimeChartOptions>;
}) {
  const lineData = series.map((s) => ({
    time: s.time,
    value: +s.close,
  }));

  return (
    <div>
      <Chart options={chartOptions}>
        <LineSeries data={lineData} />
      </Chart>
    </div>
  );
}
