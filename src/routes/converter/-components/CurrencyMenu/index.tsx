import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import * as z from "zod";
import clsx from "clsx";
import OptionList from "./OptionList";

function sanitizeSearchValue(value: string) {
  const regex = /[^a-z0-9]/gi;
  return z
    .string()
    .transform((value) => value.replace(regex, ""))
    .parse(value);
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

  // props validation
  const result = CurrencyMenuSchema.safeParse({ open });
  if (!result.success) {
    console.error(z.prettifyError(result.error));
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
      className={clsx(
        "inset-0 z-10 mx-auto max-h-screen w-10/12 translate-y-1/12 rounded-lg p-2 outline outline-amber-600",
      )}
      open={open}
      closedby="any"
      aria-labelledby="currency-crypto"
    >
      <h2 id="currency-crypto" className="mb-4 text-center text-lg">
        Currency-crypto list
      </h2>

      <div>
        <form
          method="dialog"
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            console.log("submit");
            dialogRef.current!.close();
          }}
        >
          <div className="mb-4 flex">
            <label
              htmlFor="currency"
              className="grow text-center text-lg leading-loose outline focus:bg-indigo-400 focus:text-amber-200"
            >
              <span>Currency</span>
              <input
                id="currency"
                type="radio"
                value="currency"
                defaultChecked
                required
                name="currency-type"
                onChange={handleTypeChange}
                className="appearance-none"
              />
            </label>

            <label
              htmlFor="crypto"
              className="grow text-center text-lg leading-loose"
            >
              <span>Crypto</span>
              <input
                type="radio"
                id="crypto"
                value="crypto"
                required
                name="currency-type"
                onChange={handleTypeChange}
                className="appearance-none"
              />
            </label>
          </div>

          <input
            className="mb-4 block h-12 w-full rounded-lg border border-solid border-gray-300 px-2 text-lg"
            type="search"
            spellCheck={false}
            value={searchTerm}
            name="search-term"
            onChange={handleSearchChange}
            placeholder="Currency name"
          />

          <OptionList
            currencyType={currencyType}
            searchTerm={searchTerm}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              console.log("change", event.target.value);
            }}
          />

          <button
            type="submit"
            className="mb-0 h-10 w-full rounded-lg bg-blue-500 text-center text-xl font-semibold text-white"
          >
            Confirm
          </button>
        </form>
      </div>
    </dialog>
  );
}
