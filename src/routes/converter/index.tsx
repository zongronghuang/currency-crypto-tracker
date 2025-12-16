import { useState, useRef, Suspense, lazy, Activity } from "react";
import { createFileRoute } from "@tanstack/react-router";
import CurrencyInput from "./-components/CurrencyInput";
import { FIATS } from "@/constants/fiat-currency-list";
import type { Currency, ActiveCurrency } from "@/constants/types";

export const Route = createFileRoute("/converter/")({
  component: ConverterPage,
});

const CurrencyMenu = lazy(() => import("./-components/CurrencyMenu"));

export default function ConverterPage() {
  const [currencies, setCurrencies] = useState<[Currency, Currency]>([
    FIATS.USD,
    FIATS.EUR,
  ]);
  const [activeCurrency, setActiveCurrency] = useState<ActiveCurrency | null>(
    null,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <main>
      <p>
        Last update: <time>2025-11-29 11:22</time>
      </p>

      <CurrencyInput
        isPivotal={true}
        dialogRef={dialogRef}
        setActiveCurrency={setActiveCurrency}
        currencyData={currencies[0]}
      />

      <SwitchButton onClick={() => setCurrencies(([a, b]) => [b, a])} />

      <CurrencyInput
        dialogRef={dialogRef}
        setActiveCurrency={setActiveCurrency}
        currencyData={currencies[1]}
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
