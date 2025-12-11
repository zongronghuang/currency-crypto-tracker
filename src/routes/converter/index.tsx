import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import CurrencyInput from "./-components/CurrencyInput";

export const Route = createFileRoute("/converter/")({
  component: ConverterPage,
});

const currencyData1 = {
  code: "USD",
  symbol: "$",
  name: "United States dollar",
  country: "United States of America",
  country_codes: ["US", "USA"],
};

const currencyData2 = {
  code: "GBP",
  symbol: "£",
  name: "British pound",
  country: "United Kingdom",
  country_codes: ["GB", "GBR"],
};

export default function ConverterPage() {
  const [currencies, setCurrencies] = useState([currencyData1, currencyData2]);

  return (
    <main>
      <p>
        Last update: <time>2025-11-29 11:22</time>
      </p>

      <CurrencyInput
        type="currency"
        name={currencies[0].name}
        countryCode={currencies[0].country_codes[0]}
        code={currencies[0].code}
      />

      <button
        className="mx-auto my-10 block w-fit text-2xl outline"
        title="switch"
        onClick={() => {
          setCurrencies((prev) => [prev[1], prev[0]]);
        }}
      >
        &#8645;
      </button>

      <CurrencyInput
        type="currency"
        name={currencies[1].name}
        countryCode={currencies[1].country_codes[0]}
        code={currencies[1].code}
      />
    </main>
  );
}
