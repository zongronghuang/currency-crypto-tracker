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
      <p className="mb-2 text-sm text-slate-600">
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

          <OhlcvTooltip
            ref={tooltipRef}
            isVisible={isTooltipVisible}
            time={tooltipData.time}
            volume={volume}
          />
        </Chart>
      </div>
    </div>
  );
}
