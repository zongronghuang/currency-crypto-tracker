import { useState, useRef, type ChangeEvent } from "react";
import * as z from "zod";
import { MenuOption } from "../MenuOption";
import { CURRENCIES } from "@/constants/fiat-currency-list";
import { CRYPTOS } from "@/constants/crypto-currency-list";
import styles from "./index.module.css";

const optionList = {
  crypto: Object.values(CRYPTOS),
  currency: Object.values(CURRENCIES),
};

function sanitizeSearchValue(value: string) {
  const regex = /[^a-z0-9]/gi;
  return z
    .string()
    .transform((value) => value.replace(regex, ""))
    .parse(value);
}

function isSearchMatch(
  searchTerm: string,
  optionData: { code: string; name: string },
) {
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  const lowercaseCode = optionData.code.toLowerCase();
  const lowercaseName = optionData.name.toLowerCase();
  return (
    lowercaseCode.includes(lowercaseSearchTerm) ||
    lowercaseName.includes(lowercaseSearchTerm)
  );
}

const CurrencyMenuSchema = z.object({
  open: z.boolean().optional(),
});

type CurrencyMenuProps = z.infer<typeof CurrencyMenuSchema>;

export default function CurrencyMenu({ open = false }: CurrencyMenuProps) {
  const [currencyType, setCurrencyType] = useState<"currency" | "crypto">(
    "currency",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const options = optionList[currencyType];

  const result = CurrencyMenuSchema.safeParse({ open });
  if (!result.success) {
    console.error("[CurrencyMenu]", z.prettifyError(result.error));
    return null;
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const sanitizedValue = sanitizeSearchValue(event.target.value);
    setSearchTerm(sanitizedValue);
  }

  function handleTypeChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "currency" || event.target.value === "crypto") {
      setCurrencyType(event.target.value);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={`outline outline-amber-600 w-10/12 mx-auto max-h-screen p-2 z-10 translate-y-1/6 inset-0 rounded-lg`}
      open={open}
      closedby="any"
      aria-labelledby="currency-crypto"
    >
      <h2 id="currency-crypto">Currency-crypto list</h2>

      <div className="mb-4">
        <form method="dialog">
          <div className="mb-4 flex">
            <label htmlFor="currency" className="grow appearance-none">
              <span>Currency</span>
              <input
                id="currency"
                type="radio"
                value="currency"
                defaultChecked
                required
                name="options"
                onChange={handleTypeChange}
              />
            </label>

            <label htmlFor="crypto" className="grow">
              <span>Crypto</span>
              <input
                type="radio"
                id="crypto"
                value="crypto"
                required
                name="options"
                onChange={handleTypeChange}
              />
            </label>
          </div>

          <input
            className="rounded-lg w-full text-lg h-12 px-2 border border-solid border-gray-300"
            type="search"
            spellCheck={false}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Currency name"
          />
        </form>
      </div>

      <ul
        className={`${currencyType} ${styles.optionList}  h-[50vh] px-2 grid grid-cols-2 auto-rows-min items-start overflow-y-scroll no-scrollbar rounded-lg border border-gray-300 border-solid transition-all`}
      >
        {options.map((op) => (
          <MenuOption
            isMatch={isSearchMatch(searchTerm, op)}
            key={op.code}
            optionData={op}
            type={currencyType}
            onClick={() => {
              dialogRef.current!.close();
            }}
          />
        ))}

        <span
          role="alert"
          className="text-center col-span-2 h-[49vh] leading-[49vh]"
        >
          No Matches Found
        </span>
      </ul>
    </dialog>
  );
}
