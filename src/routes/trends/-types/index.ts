type FiatTimeSeriesName =
  | "Time Series FX (Daily)"
  | "Time Series FX (Weekly)"
  | "Time Series FX (Monthly)";

type FiatMetadata = Record<
  "Meta Data",
  {
    "1. Information": string;
    "2. From Symbol": string;
    "3. To Symbol": string;
    "4. Output Size": string;
    "5. Last Refreshed": string;
    "6. Time Zone": string;
  }
>;

export type FiatPrices = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
};

type FiatDataPoint = Record<string, FiatPrices>;

type FiatDataList = {
  [key in FiatTimeSeriesName]: FiatDataPoint;
};

type CryptTimeSeriesName =
  | "Time Series (Digital Currency Daily)"
  | "Time Series (Digital Currency Weekly)"
  | "Time Series (Digital Currency Monthly)";

type CryptoMetadata = Record<
  "Meta Data",
  {
    "1. Information": string;
    "2. Digital Currency Code": string;
    "3. Digital Currency Name": string;
    "4. Market Code": string;
    "5. Market Name": string;
    "6. Last Refreshed": string;
    "7. Time Zone": string;
  }
>;

export type CryptoPrices = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
};

type CryptoDataPoint = Record<string, CryptoPrices>;

type CryptoDataList = {
  [key in CryptTimeSeriesName]: CryptoDataPoint;
};

export type FiatItem = {
  time: string;
  open: string;
  high: string;
  low: string;
  close: string;
  prevClose: string;
};

export type CryptoItem = Record<keyof FiatItem | "volume", string>;

export type FiatTrends = FiatMetadata & FiatDataList;

export type CryptoTrends = CryptoMetadata & CryptoDataList;

export type Trends = FiatTrends | CryptoTrends;

export type CandlestickDataPoint = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type BarDataPoint = CandlestickDataPoint;
