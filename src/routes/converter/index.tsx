import { useState, useRef, Suspense, lazy, Activity } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import CurrencyInput from "./-components/CurrencyInput";
import { getExchangeRate } from "@/apis";
import { calibrateNumeral } from "@/utils";
import { FIATS, FIAT_NAMES } from "@/constants/fiat-currency-list";
import { CRYPTO_NAMES, CRYPTOS } from "@/constants/crypto-currency-list";
import type {
  ActiveCurrency,
  FiatName,
  CryptoName,
  CurrencyName,
} from "@/constants/types";

const CurrencyMenu = lazy(() => import("./-components/CurrencyMenu"));

const ConverterSearchSchema = z.object({
  from: z.enum([...FIAT_NAMES, ...CRYPTO_NAMES]).catch("USD"),
  to: z.enum([...FIAT_NAMES, ...CRYPTO_NAMES]).catch("EUR"),
  amount: z.number().nonnegative().catch(0).optional(),
});

export const Route = createFileRoute("/converter/")({
  component: ConverterPage,
  validateSearch: ConverterSearchSchema,
});

export default function ConverterPage() {
  const { to, from, amount } = Route.useSearch();
  const [activeCurrency, setActiveCurrency] = useState<ActiveCurrency | null>(
    null,
  );
  const [amountNumerals, setAmountNumerals] = useState<[string, string]>([
    amount?.toString() || "0",
    "0",
  ]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate({ from: Route.fullPath });
  const fromCurrency = FIATS[from as FiatName] || CRYPTOS[from as CryptoName];
  const toCurrency = FIATS[to as FiatName] || CRYPTOS[to as CryptoName];
  console.log("from", fromCurrency.code, "to", toCurrency.code);

  const { data, isPending } = useQuery({
    queryKey: [fromCurrency.code, toCurrency.code],
    queryFn: () =>
      getExchangeRate(
        fromCurrency.code as CurrencyName,
        toCurrency.code as CurrencyName,
      ),
  });
  const exchangeRate = isPending
    ? "0"
    : calibrateNumeral(
        data["Realtime Currency Exchange Rate"]["5. Exchange Rate"],
      );
  const lastRefreshed = isPending
    ? ""
    : data["Realtime Currency Exchange Rate"]["6. Last Refreshed"];

  function swapCurrencies() {
    navigate({
      search: (prev) => ({ ...prev, to: prev.from, from: prev.to }),
    });
  }

  return (
    <main>
      <p>
        1 {fromCurrency.code} = {exchangeRate}
        {toCurrency.code}
      </p>
      <p>
        Last update: <time>{lastRefreshed}</time>
      </p>

      <CurrencyInput
        isBaseCurrency={true}
        amountNumeral={amountNumerals[0]}
        exchangeRate={exchangeRate}
        dialogRef={dialogRef}
        setActiveCurrency={setActiveCurrency}
        currencyData={fromCurrency}
        setAmountNumerals={setAmountNumerals}
      />

      <SwitchButton onClick={swapCurrencies} />

      <CurrencyInput
        amountNumeral={amountNumerals[1]}
        exchangeRate={exchangeRate}
        dialogRef={dialogRef}
        setActiveCurrency={setActiveCurrency}
        currencyData={toCurrency}
        setAmountNumerals={setAmountNumerals}
      />

      <Suspense>
        <Activity mode="visible">
          <CurrencyMenu
            ref={dialogRef}
            activeCurrency={activeCurrency}
            setActiveCurrency={setActiveCurrency}
          />
        </Activity>
      </Suspense>
    </main>
  );
}

function SwitchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="mx-auto my-10 block w-fit text-2xl outline"
      title="switch"
      onClick={onClick}
    >
      &#8645;
    </button>
  );
}
