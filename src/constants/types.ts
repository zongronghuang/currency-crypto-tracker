import type { FiatName } from "./fiat-currency-list";
import type { CryptoName } from "./crypto-currency-list";

type Crypto = {
  type: "crypto";
  code: string;
  name: string;
};

type Fiat = {
  type: "fiat";
  code: string;
  symbol?: string;
  name: string;
  country?: string;
  country_codes?: string[];
};

type Currency = Fiat | Crypto;

type CurrencyType = "fiat" | "crypto";

type CurrencyName = FiatName | CryptoName;

type ActiveCurrency = Currency & {
  __memoCode?: FiatName | CryptoName;
};

export type {
  Currency,
  CurrencyType,
  CurrencyName,
  ActiveCurrency,
  Fiat,
  Crypto,
  FiatName,
  CryptoName,
};
