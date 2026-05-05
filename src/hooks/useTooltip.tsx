import { useState, useCallback, type RefObject } from "react";
import { type SeriesApiRef } from "lightweight-charts-react-components";
import {
  type Time,
  type OhlcData,
  type MouseEventParams,
  type SingleValueData,
} from "lightweight-charts";
import { getTooltipPosition } from "@/routes/trends/-helpers";

type TooltipData = {
  candlestick: OhlcData<Time>;
  bar: OhlcData<Time>;
  histogram: SingleValueData<Time>;
  baseline: SingleValueData<Time>;
};

const defaultTooltipData = {
  candlestick: {
    time: "",
    open: 0,
    high: 0,
    low: 0,
    close: 0,
  },
  bar: {
    time: "",
    open: 0,
    high: 0,
    low: 0,
    close: 0,
  },
  baseline: {
    time: "",
    value: 0,
  },
  histogram: {
    time: "",
    value: 0,
  },
};

export default function useTooltip(
  seriesType: "bar" | "baseline" | "candlestick" | "histogram",
  refs: {
    seriesRef: RefObject<SeriesApiRef<Capitalize<typeof seriesType>> | null>;
    tooltipRef: RefObject<HTMLDivElement | null>;
    containerRef: RefObject<HTMLDivElement | null>;
  },
) {
  const { seriesRef, tooltipRef, containerRef } = refs;
  const [tooltipData, setTooltipData] = useState<
    TooltipData[typeof seriesType]
  >(defaultTooltipData[seriesType]);
  const [isTooltipVisible, setIsToolTipVisible] = useState(false);

  const turnOffTooltip = useCallback(
    () => requestAnimationFrame(() => setIsToolTipVisible(false)),
    [],
  );

  const updateTooltip = useCallback(
    (params: MouseEventParams<Time>) => {
      if (!seriesRef.current || !params.point) return;

      const seriesApi = seriesRef.current.api();
      if (!seriesApi) return;

      const data = params.seriesData.get(
        seriesApi,
      ) as TooltipData[typeof seriesType];
      if (!data) return;

      // 瀏覽器重繪時更新 tooltip
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
    },
    [containerRef, seriesRef, tooltipRef],
  );

  return {
    isTooltipVisible,
    turnOffTooltip,
    tooltipData,
    updateTooltip,
  };
}
