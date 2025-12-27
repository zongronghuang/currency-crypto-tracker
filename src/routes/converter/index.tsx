import { useState, useRef, useEffect, Suspense, lazy, Activity } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import CurrencyInput from "./-components/CurrencyInput";
import { getExchangeRate } from "@/apis";
import { getComputableNumeral } from "@/utils";
import { FIATS, FIAT_NAMES } from "@/constants/fiat-currency-list";
import { CRYPTO_NAMES, CRYPTOS } from "@/constants/crypto-currency-list";
import type { ActiveCurrency, FiatName, CryptoName } from "@/constants/types";

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
  const navigate = useNavigate({ from: Route.fullPath });
  const [amountNumerals, setAmountNumerals] = useState<[string, string]>([
    amount?.toString() || "0",
    "0",
  ]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { data, isPending } = useQuery({
    queryKey: [from, to],
    queryFn: () => getExchangeRate(from, to),
  });
  const exchangeRate = isPending
    ? "0"
    : getComputableNumeral(
        data["Realtime Currency Exchange Rate"]["5. Exchange Rate"],
      );
  const lastRefreshed = isPending
    ? ""
    : data["Realtime Currency Exchange Rate"]["6. Last Refreshed"];
  const [activeCurrency, setActiveCurrency] = useState<ActiveCurrency | null>(
    null,
  );
  const fromCurrency = FIATS[from as FiatName] || CRYPTOS[from as CryptoName];
  const toCurrency = FIATS[to as FiatName] || CRYPTOS[to as CryptoName];

  function swapCurrencies() {
    navigate({
      search: (prev) => ({ ...prev, to: prev.from, from: prev.to }),
    });
  }

  useEffect(() => {
    updateOppositeNumeral();

    function updateOppositeNumeral() {
      const oppositeAmountNumeral = amount
        ? (amount * +exchangeRate).toString()
        : "0";
      setAmountNumerals((prev) => [prev[0], oppositeAmountNumeral]);
    }
  }, [amount, exchangeRate]);

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
        // amountNumeral={amountNumerals[1]}
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
