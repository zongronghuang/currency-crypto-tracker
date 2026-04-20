import {
  useState,
  useEffect,
  type ChangeEvent,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import { z } from "zod";
import { FiatIcon, CryptoIcon } from "../CurrencyIcon";
import {
  validateComponentProps,
  calibrateNumeral,
  getComputableNumeral,
} from "@/utils";
import type { ActiveCurrency, CurrencyName } from "@/constants/types";

const CurrencyInputSchema = z.object({
  isBaseCurrency: z.boolean().optional(),
  amountNumeral: z.string(),
  exchangeRate: z.string(),
  currencyData: z.object({
    type: z.enum(["fiat", "crypto"]),
    code: z.string(),
    name: z.string(),
    country_codes: z.array(z.string()).optional(),
  }),
});

type CurrencyInputProps = z.infer<typeof CurrencyInputSchema> & {
  dialogRef: RefObject<HTMLDialogElement | null>;
  setActiveCurrency: Dispatch<SetStateAction<ActiveCurrency | null>>;
  setAmountNumerals: Dispatch<SetStateAction<[string, string]>>;
};

export default function CurrencyInput({
  isBaseCurrency = false,
  amountNumeral,
  exchangeRate,
  dialogRef,
  currencyData,
  setActiveCurrency,
  setAmountNumerals,
}: CurrencyInputProps) {
  const [localAmountNumeral, setLocalAmountNumeral] = useState(amountNumeral);
  const identifier = `${currencyData.type}-${currencyData.name}`;

  const IconImage =
    currencyData.type === "fiat" ? (
      <FiatIcon
        className="w-8"
        alt={currencyData.name}
        title={currencyData.name}
        code={currencyData.country_codes![0]}
      />
    ) : (
      <CryptoIcon
        className="w-8"
        alt={currencyData.name}
        title={currencyData.name}
        code={currencyData.code}
      />
    );

  useEffect(() => {
    setLocalAmountNumeral(calibrateNumeral(amountNumeral));
  }, [amountNumeral]);

  validateComponentProps(CurrencyInputSchema, {
    amountNumeral,
    currencyData,
    exchangeRate,
  });

  return (
    <div className="round flex flex-col items-center p-2 text-2xl">
      <label htmlFor={identifier} className="w-full font-bold">
        <button
          className="flex w-full items-center justify-start gap-4 p-2"
          onClick={() => {
            setActiveCurrency({
              ...currencyData,
              __memoCode: currencyData.code as CurrencyName,
            });
            dialogRef.current?.showModal();
          }}
        >
          {IconImage}
          <span className="text-slate-900">{currencyData.code}</span>
          <span className="ml-auto text-base font-normal">
            {currencyData.name}
          </span>
        </button>
      </label>
      <input
        className="block w-full min-w-2/3 rounded-lg border border-slate-300 p-2 text-slate-900 shadow-md shadow-slate-300"
        id={identifier}
        type="text"
        inputMode="numeric"
        value={localAmountNumeral}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setLocalAmountNumeral(getComputableNumeral(event.target.value));
        }}
        onBlur={() => {
          const newAmount = getComputableNumeral(localAmountNumeral);
          const oppositeAmount = isBaseCurrency
            ? (+newAmount * +exchangeRate).toString()
            : (+newAmount / +exchangeRate).toString();
          const updatedAmounts: [string, string] = isBaseCurrency
            ? [calibrateNumeral(newAmount), calibrateNumeral(oppositeAmount)]
            : [calibrateNumeral(oppositeAmount), calibrateNumeral(newAmount)];
          setAmountNumerals(updatedAmounts);
        }}
      />
    </div>
  );
}
