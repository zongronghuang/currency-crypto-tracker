import { useState, useRef, Suspense, lazy, Activity } from "react";
import { createFileRoute } from "@tanstack/react-router";
import CurrencyInput from "./-components/CurrencyInput";
import { FIATS } from "@/constants/fiat-currency-list";
import type { Currency, CurrencyType } from "@/constants/types";

export const Route = createFileRoute("/converter/")({
  component: ConverterPage,
});

const CurrencyMenu = lazy(() => import("./-components/CurrencyMenu"));

const currencyData1 = { type: "fiat" as const, ...FIATS.USD };
const currencyData2 = { type: "fiat" as const, ...FIATS.EUR };

type TargetCurrency = {
  code: string;
  type: CurrencyType;
};

export default function ConverterPage() {
  const [currencies, setCurrencies] = useState<[Currency, Currency]>([
    currencyData1,
    currencyData2,
  ]);
  const targetCurrencyRef = useRef<TargetCurrency>({ code: "", type: "fiat" });
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <main>
      <p>
        Last update: <time>2025-11-29 11:22</time>
      </p>

      <CurrencyInput
        isPivotal={true}
        dialogRef={dialogRef}
        targetCurrencyRef={targetCurrencyRef}
        currencyData={currencies[0]}
      />

      <SwitchButton onClick={() => setCurrencies(([a, b]) => [b, a])} />

      <CurrencyInput
        dialogRef={dialogRef}
        targetCurrencyRef={targetCurrencyRef}
        currencyData={currencies[1]}
      />

      <Suspense>
        <Activity mode="visible">
          <CurrencyMenu
            ref={dialogRef}
            setCurrencies={setCurrencies}
            targetCurrencyRef={targetCurrencyRef}
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
