import { type CandlestickDataPoint, type BarDataPoint } from "../-types";

export function getRates(data: (CandlestickDataPoint | BarDataPoint)[]) {
  let min = Infinity;
  let max = 0;
  let sumOfDataPointAverage = 0;

  data.forEach((d) => {
    min = Math.min(min, d.low);
    max = Math.max(max, d.high);
    sumOfDataPointAverage += (d.high + d.low + d.open + d.close) / 4;
  });

  return { min, max, avg: sumOfDataPointAverage / data.length };
}
