import { z } from "zod";
import { request } from "./request";
import { FIATS, FIAT_NAMES } from "@/constants/fiat-currency-list";
import { CRYPTOS, CRYPTO_NAMES } from "@/constants/crypto-currency-list";
import { TRADABLE_CRYPTOS } from "@/constants/crypto-exchange-list";
import type { FiatName, CryptoName } from "@/constants/types";

// https://www.alphavantage.co/documentation/#currency-exchange
export const getExchangeRate = (
  fromCurrency: FiatName | CryptoName,
  toCurrency: FiatName | CryptoName,
) =>
  request.GET(
    `https://api.example.com/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=demo`,
  );

// https://www.alphavantage.co/documentation/#news-sentiment
const NewsFiltersSchema = z.object({
  tickers: z.array(z.enum([...FIAT_NAMES, ...CRYPTO_NAMES])),
  topics: z.array(
    z.enum([
      "blockchain",
      "earnings",
      "ipo",
      "mergers_and_acquisitions",
      "financial_markets",
      "economy_fiscal",
      "economy_monetary",
      "economy_macro",
      "energy_transportation",
      "finance",
      "life_sciences",
      "manufacturing",
      "real_estate",
      "retail_wholesale",
      "technology",
    ]),
  ),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  sort: z.enum(["LATEST", "EARLIEST", "RELEVANCE"]),
  limit: z.number().int().positive().min(1).max(1000),
});
export type NewsFilters = z.infer<typeof NewsFiltersSchema>;

export const getNews = ({
  tickers,
  topics,
  startDate,
  endDate,
  sort,
  limit,
}: NewsFilters) => {
  const result = NewsFiltersSchema.safeParse({
    tickers,
    topics,
    startDate,
    endDate,
    sort,
    limit,
  });
  if (!result.success) return console.error(z.prettifyError(result.error));

  const queries = {
    topics: topics.join(","),
    time_from: `${startDate.replace(/-/g, "")}T0000`,
    time_to: `${endDate.replace(/-/g, "")}T2359`,
    sort,
    limit,
    tickers: tickers.reduce((str, ticker: CryptoName | FiatName, i) => {
      if (i > 0) str += ",";
      if (ticker in FIATS) str += `FOREX:${ticker}`;
      if (ticker in CRYPTOS) str += `CRYPTO:${ticker}`;
      return str;
    }, ""),
  };

  const flattenedQueries = Object.entries(queries)
    .filter(([, value]) => value)
    .reduce((str, entry, i) => {
      const [key, value] = entry;
      if (i > 0) str += "&";
      str += `${key}=${value}`;
      return str;
    }, "");

  console.log({ flattenedQueries });

  return request.GET(
    `https://api.example.com/news?function=NEWS_SENTIMENT&${flattenedQueries}&apikey=demo`,
  );
};

// https://www.alphavantage.co/documentation/#fx-daily
// https://www.alphavantage.co/documentation/#fx-weekly
// https://www.alphavantage.co/documentation/#fx-monthly
// https://www.alphavantage.co/documentation/#currency-daily
// https://www.alphavantage.co/documentation/#currency-weekly
// https://www.alphavantage.co/documentation/#currency-monthly
const FiatTrendsParamsSchema = z.object({
  dataPoint: z.enum(["daily", "weekly", "monthly"]),
  base: z.enum([...FIAT_NAMES]),
  quote: z.enum([...FIAT_NAMES]),
});
const CryptoTrendsParamsSchema = z.object({
  dataPoint: z.enum(["daily", "weekly", "monthly"]),
  base: z.enum([...TRADABLE_CRYPTOS]),
  quote: z.enum(["USD", "BTC", "EUR", "GBP", "USDT", "ETH", "USDC", "DAI"]),
});
const TrendsParamsSchema = z.union([
  FiatTrendsParamsSchema,
  CryptoTrendsParamsSchema,
]);

export type TrendsParams = z.infer<typeof TrendsParamsSchema>;

export function getTrends({ dataPoint, base, quote }: TrendsParams) {
  const result = TrendsParamsSchema.safeParse({
    dataPoint,
    base,
    quote,
  });
  if (!result.success) return console.error(z.prettifyError(result.error));

  const formattedDataPoint = dataPoint.toUpperCase();

  const apiUrl =
    base in FIATS
      ? `https://api.example.com/fiat_trends?function=FX_${formattedDataPoint}&from_symbol=${base}&to_symbol=${quote}&apikey=demo`
      : `https://api.example.com/crypto_trends?function=DIGITAL_CURRENCY_${formattedDataPoint}&symbol=${base}&market=${quote}&apikey=demo`;

  return request.GET(apiUrl);
}
