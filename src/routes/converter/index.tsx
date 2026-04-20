import { useState, useRef, useEffect, Suspense, lazy, Activity } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import CurrencyInput from "./-components/CurrencyInput";
import { getExchangeRate } from "@/apis";
import { getComputableNumeral, calibrateNumeral } from "@/utils";
import type { ActiveCurrency, FiatName, CryptoName } from "@/constants/types";

const CurrencyMenu = lazy(() => import("./-components/CurrencyMenu"));

const { FIATS, FIAT_NAMES } = await import(
  "@/constants/fiat-currency-list"
).then((mod) => mod);
const { CRYPTOS, CRYPTO_NAMES } = await import(
  "@/constants/crypto-currency-list"
).then((mod) => mod);

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
    <div>
      <BulletinBoard
        fromCurrencyCode={fromCurrency.code}
        toCurrencyCode={toCurrency.code}
        exchangeRate={exchangeRate}
        lastRefreshed={lastRefreshed}
      />

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
    </div>
  );
}

function BulletinBoard({
  fromCurrencyCode,
  toCurrencyCode,
  exchangeRate,
  lastRefreshed,
}: {
  fromCurrencyCode: string;
  toCurrencyCode: string;
  exchangeRate: string;
  lastRefreshed: string;
}) {
  return (
    <section
      aria-label="bulletin board"
      className="mb-2 rounded-lg border-4 border-double border-emerald-50 bg-emerald-200 p-2 text-sm text-slate-900"
    >
      <p className="font-semibold">
        1 {fromCurrencyCode} = {calibrateNumeral(exchangeRate)} {toCurrencyCode}
      </p>
      <p>
        Last update: <time>{lastRefreshed}</time>
      </p>
    </section>
  );
}

function SwitchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="mx-auto my-6 block h-14 w-14 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 text-3xl text-white"
      title="switch"
      aria-label="switch base and quote currencies"
      onClick={onClick}
    >
      &#8645;
    </button>
  );
}
