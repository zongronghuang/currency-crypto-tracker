import { type ChangeEvent, type RefObject } from "react";
import { z } from "zod";
import { FiatIcon, CryptoIcon } from "../CurrencyIcon";
import { validateComponentProps } from "@/utils";
import type { CurrencyType } from "@/constants/types";

const CurrencyInputSchema = z.object({
  isPivotal: z.boolean().optional(),
  currencyData: z.object({
    type: z.enum(["fiat", "crypto"]).optional(),
    code: z.string(),
    name: z.string(),
    country_codes: z.array(z.string()).optional(),
  }),
});

type CurrencyInputProps = z.infer<typeof CurrencyInputSchema> & {
  dialogRef: RefObject<HTMLDialogElement | null>;
  targetCurrencyRef: RefObject<{ code: string; type: CurrencyType }>;
};

export default function CurrencyInput({
  isPivotal = false,
  dialogRef,
  targetCurrencyRef,
  currencyData,
}: CurrencyInputProps) {
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

  validateComponentProps(CurrencyInputSchema, {
    isPivotal,
    currencyData,
  });

  return (
    <div className="flex flex-col items-center p-2 text-2xl outline outline-black">
      <label
        htmlFor={identifier}
        className="w-full items-center gap-2 font-bold outline"
      >
        <button
          className="flex w-full justify-start gap-4 p-2 outline"
          onClick={() => {
            targetCurrencyRef.current = {
              type: currencyData.type!,
              code: currencyData.code,
            };
            dialogRef.current?.showModal();
          }}
        >
          {IconImage}
          <span>{currencyData.code}</span>
        </button>
      </label>
      <input
        className="block w-full min-w-2/3 rounded-sm p-2 outline outline-gray-400 focus:outline-2 focus:outline-gray-500"
        id={identifier}
        type="text"
        inputMode="numeric"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          console.log("value", event.target.value)
        }
      />
    </div>
  );
}
