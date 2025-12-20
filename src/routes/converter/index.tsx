import { useState, useRef, useEffect, Suspense, lazy, Activity } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import CurrencyInput from "./-components/CurrencyInput";
import { getExchangeRate } from "@/apis";
import { FIATS, FIAT_NAMES } from "@/constants/fiat-currency-list";
import { CRYPTO_NAMES, CRYPTOS } from "@/constants/crypto-currency-list";
import type {
  Currency,
  ActiveCurrency,
  FiatName,
  CryptoName,
} from "@/constants/types";

const ConverterSearchSchema = z.object({
  from: z.enum([...FIAT_NAMES, ...CRYPTO_NAMES]).catch("USD"),
  to: z.enum([...FIAT_NAMES, ...CRYPTO_NAMES]).catch("EUR"),
  amount: z.number().nonnegative().catch(0).optional(),
});

export const Route = createFileRoute("/converter/")({
  component: ConverterPage,
  validateSearch: ConverterSearchSchema,
});

const CurrencyMenu = lazy(() => import("./-components/CurrencyMenu"));

export default function ConverterPage() {
  const { to, from, amount } = Route.useSearch();
  const fromCurrency = FIATS[from as FiatName] || CRYPTOS[from as CryptoName];
  const toCurrency = FIATS[to as FiatName] || CRYPTOS[to as CryptoName];
  const [currencies, setCurrencies] = useState<[Currency, Currency]>([
    fromCurrency,
    toCurrency,
  ]);
  const [activeCurrency, setActiveCurrency] = useState<ActiveCurrency | null>(
    null,
  );
  const [exchangeRateInfo, setExchangeRateInfo] = useState({
    exchangeRate: "",
    lastRefreshed: "",
  });
  const [amountNumerals, setAmountNumerals] = useState<[string, string]>([
    amount?.toString() || "0",
    "0",
  ]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate({ from: Route.fullPath });

  function swapCurrencies() {
    setCurrencies(([a, b]) => [b, a]);
    navigate({
      search: (prev) => ({ ...prev, to: prev.from, from: prev.to }),
    });
  }

  useEffect(() => {
    getExchangeRateFn();

    async function getExchangeRateFn() {
      try {
        const data = await getExchangeRate(from, to);
        const exchangeRate =
          data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        const lastRefreshed =
          data["Realtime Currency Exchange Rate"]["6. Last Refreshed"];
        setExchangeRateInfo({
          exchangeRate,
          lastRefreshed,
        });

        setAmountNumerals((prev) => [
          prev[0],
          (+prev[0] * +exchangeRate).toString(),
        ]);
      } catch (error: any) {
        console.error("[exchange rate]", error.toString());
      }
    }
  }, [from, to, amount]);

  return (
    <main>
      <p>
        Last update: <time>{exchangeRateInfo.lastRefreshed}</time>
      </p>

      <CurrencyInput
        isBaseCurrency={true}
        amountNumeral={amountNumerals[0]}
        exchangeRate={exchangeRateInfo.exchangeRate}
        dialogRef={dialogRef}
        setActiveCurrency={setActiveCurrency}
        currencyData={currencies[0]}
        setAmountNumerals={setAmountNumerals}
      />

      <SwitchButton onClick={swapCurrencies} />

      <CurrencyInput
        amountNumeral={amountNumerals[1]}
        exchangeRate={exchangeRateInfo.exchangeRate}
        dialogRef={dialogRef}
        setActiveCurrency={setActiveCurrency}
        currencyData={currencies[1]}
        setAmountNumerals={setAmountNumerals}
      />

      <Suspense>
        <Activity mode="visible">
          <CurrencyMenu
            ref={dialogRef}
            setCurrencies={setCurrencies}
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
