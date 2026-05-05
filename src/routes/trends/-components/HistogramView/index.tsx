import { useRef } from "react";
import {
  Chart,
  HistogramSeries,
  type SeriesApiRef,
} from "lightweight-charts-react-components";
import { type DeepPartial, type TimeChartOptions } from "lightweight-charts";
import useTooltip from "@/hooks/useTooltip";
import OhlcvTooltip from "../OhlcvTooltip";
import { type CryptoItem } from "../../-types";

export default function HistogramView({
  series,
  chartOptions,
}: {
  series: CryptoItem[];
  chartOptions: DeepPartial<TimeChartOptions>;
}) {
  const seriesRef = useRef<SeriesApiRef<"Histogram">>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isTooltipVisible, turnOffTooltip, tooltipData, updateTooltip } =
    useTooltip("histogram", {
      seriesRef,
      tooltipRef,
      containerRef,
    });
  const volume = "value" in tooltipData ? tooltipData.value : 0;

  const histogramData = series.map((s) => ({
    time: s.time,
    value: +s.volume,
  }));

  return (
    <div aria-label="histogram view">
      <p className="mb-2 text-sm text-slate-600 md:mb-4 md:text-lg lg:mb-6 lg:text-2xl xl:mb-10 xl:text-2xl">
        Check traded volumes of the base currency to the quote currency. Traded
        volume data is only available for cryptocurrencies as the base.
      </p>
      <div className="relative" onMouseLeave={turnOffTooltip}>
        <Chart
          ref={containerRef}
          options={chartOptions}
          onCrosshairMove={updateTooltip}
        >
          <HistogramSeries ref={seriesRef} data={histogramData} />

          <OhlcvTooltip isVisible={isTooltipVisible} ref={tooltipRef}>
            <time
              dateTime={tooltipData.time.toString()}
              className="block text-center font-semibold"
            >
              {tooltipData.time.toString()}
            </time>
            <dl className="gap grid grid-cols-2">
              <dt>Volume</dt> <dd>{volume}</dd>
            </dl>
          </OhlcvTooltip>
        </Chart>
      </div>
    </div>
  );
}
