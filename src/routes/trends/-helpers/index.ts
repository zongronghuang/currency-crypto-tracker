import {
  type CandlestickDataPoint,
  type BarDataPoint,
  type Trends,
  type FiatItem,
  type CryptoItem,
  type FiatPrices,
  type CryptoPrices,
} from "../-types";

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

type Entry = [string, FiatPrices | CryptoPrices];
export function extractTrendsData(trendsData: Trends) {
  if (!trendsData)
    return {
      metaData: {},
      timeSeriesArray: [],
      startDate: "",
      endDate: "",
    };

  const entries = Object.entries(trendsData);

  const metaData = entries.find(([key]) => key === "Meta Data")![1];

  const timeSeries = entries.find(([key]) => key.includes("Time Series"))![1];

  const dataEntries = Object.entries(timeSeries) as Entry[];
  const timeSeriesArray = dataEntries
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([time, data], i, arr) => {
      const prevData: Entry = arr[i - 1];
      const formattedData: { [key: string]: string } = {
        time,
        high: data["2. high"]!,
        low: data["3. low"],
        open: data["1. open"],
        close: data["4. close"],
        prevClose: prevData ? prevData[1]["4. close"] : "",
      };

      const hasVolume = "5. volume" in data;
      if (hasVolume) {
        formattedData.volume = data["5. volume"];
      }

      return formattedData as FiatItem | CryptoItem;
    });

  const endDate = timeSeriesArray.at(-1)!.time;
  const startDate = timeSeriesArray[0].time;

  return {
    metaData,
    timeSeriesArray,
    startDate,
    endDate,
  };
}
