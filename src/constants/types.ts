export type Crypto = {
  type?: "crypto";
  code: string;
  name: string;
};

export type Fiat = {
  type?: "fiat";
  code: string;
  symbol: string;
  name: string;
  country: string;
  country_codes: string[];
};

export type Currency = Fiat | Crypto;

export type CurrencyType = "fiat" | "crypto";
