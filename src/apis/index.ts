import { request } from "./request";
import type { FiatName, CryptoName } from "@/constants/types";

// https://www.alphavantage.co/documentation/#currency-exchange
export const getExchangeRate = (
  fromCurrency: FiatName | CryptoName,
  toCurrency: FiatName | CryptoName,
) =>
  request.GET(
    `https://api.example.com/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=demo`,
  );
