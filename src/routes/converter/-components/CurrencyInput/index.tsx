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
        className="w-8 md:w-20 lg:row-span-full lg:w-20 lg:self-center xl:w-16"
        alt={currencyData.name}
        title={currencyData.name}
        code={currencyData.country_codes![0]}
      />
    ) : (
      <CryptoIcon
        className="w-8 md:w-20 lg:row-span-full lg:w-14 lg:self-center xl:w-16"
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
    <div className="round flex flex-col items-center p-2 text-2xl lg:col-span-3">
      <label
        htmlFor={identifier}
        className="w-full font-bold md:mb-4 lg:mb-8 xl:mb-2"
      >
        <button
          className="flex w-full items-center justify-start gap-4 p-2 hover:cursor-pointer md:gap-8 lg:grid lg:grid-cols-[fit-content_1fr] lg:grid-rows-2 lg:gap-2 lg:p-0 xl:gap-x-5"
          onClick={() => {
            setActiveCurrency({
              ...currencyData,
              __memoCode: currencyData.code as CurrencyName,
            });
            dialogRef.current?.showModal();
          }}
        >
          {IconImage}
          <span className="text-left text-slate-900 md:text-4xl xl:text-3xl">
            {currencyData.code}
          </span>
          <span className="ml-auto text-base font-normal text-pretty md:text-2xl lg:col-start-2 lg:col-end-3 lg:h-12 lg:w-full lg:text-left lg:text-3xl xl:text-xl">
            {currencyData.name}
          </span>
        </button>
      </label>
      <input
        className="block w-full min-w-2/3 rounded-lg border border-slate-300 p-2 text-slate-900 shadow-md shadow-slate-300 md:h-20 md:border-2 md:p-6 md:text-4xl md:shadow-lg xl:h-16 xl:p-4 xl:text-3xl"
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
