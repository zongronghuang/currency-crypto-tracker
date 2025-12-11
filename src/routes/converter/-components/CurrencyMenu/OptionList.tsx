import { useState } from "react";
import { z } from "zod";
import clsx from "clsx";
import { CircleFlag } from "react-circle-flags";
import { CURRENCIES } from "@/constants/fiat-currency-list";
import { CRYPTOS } from "@/constants/crypto-currency-list";
import styles from "./OptionList.module.css";

const optionList = {
  crypto: Object.values(CRYPTOS),
  currency: Object.values(CURRENCIES),
};

const OptionListSchema = z.object({
  currencyType: z.enum(["currency", "crypto"]),
  searchTerm: z.string(),
  onChange: z.function(),
});

type OptionListProps = z.infer<typeof OptionListSchema>;

function isSearchMatch(
  searchTerm: string,
  optionData: { code: string; name: string },
) {
  const lowercaseSearchTerm = searchTerm.toLowerCase();

  return [optionData.code, optionData.name]
    .map((str) => str.toLowerCase())
    .some((str) => str.includes(lowercaseSearchTerm));
}

export default function OptionList({
  currencyType,
  searchTerm,
  onChange,
}: OptionListProps) {
  // props validation
  const result = OptionListSchema.safeParse({
    currencyType,
    searchTerm,
    onChange,
  });
  if (!result.success) {
    console.error(z.prettifyError(result.error));
    return null;
  }

  const options = optionList[currencyType];
  const MenuOption =
    currencyType === "currency" ? CurrencyOption : CryptoOption;

  return (
    <ul
      className={clsx(
        currencyType,
        styles.optionList,
        "no-scrollbar mb-4 grid h-[50vh] auto-rows-min grid-cols-2 items-start overflow-y-scroll rounded-lg border border-solid border-gray-300 px-2 focus-within:outline-2 focus-within:outline-blue-500",
      )}
    >
      {options.map((op) => (
        <MenuOption
          isMatch={isSearchMatch(searchTerm, op)}
          key={op.code}
          optionData={op}
          onChange={onChange}
        />
      ))}

      <NoMatchAlert />
    </ul>
  );
}

const OptionSchema = z.object({
  isMatch: z.boolean(),
  optionData: z.object({
    code: z.string(),
    name: z.string(),
    country_codes: z.array(z.string()).optional(),
  }),
  onChange: z.function(),
});

type MenuOptionProps = z.infer<typeof OptionSchema>;

function CurrencyOption({ isMatch, optionData, onChange }: MenuOptionProps) {
  // validate props
  const result = OptionSchema.safeParse({
    isMatch,
    optionData,
    onChange,
  });
  if (!result.success) {
    console.error(z.prettifyError(result.error));
    return null;
  }

  const lowercaseCountryCode = optionData.country_codes![0].toLowerCase();
  return (
    <li
      hidden={!isMatch}
      className={clsx(
        "py-4 transition-all focus-within:bg-blue-600 focus-within:text-white hover:bg-blue-300 hover:text-white has-checked:bg-blue-600 has-checked:text-white",
      )}
    >
      <label
        htmlFor={optionData.code}
        className="flex w-full items-center justify-start gap-4 px-1 text-lg font-semibold"
      >
        <CircleFlag
          fetchPriority="low"
          loading="lazy"
          className="block w-8 rounded-full in-focus-within:border in-focus-within:border-solid in-focus-within:border-white"
          countryCode={lowercaseCountryCode}
          alt={optionData.name}
          title={optionData.name}
        />
        {optionData.code}

        <input
          id={optionData.code}
          type="radio"
          value={optionData.code}
          name="currency-option"
          onChange={onChange}
          className="appearance-none"
        />
      </label>
    </li>
  );
}

function CryptoOption({ isMatch, optionData, onChange }: MenuOptionProps) {
  const FALLBACK_CRYPTO_ICON = "src/assets/fallback_crypto.svg";
  const [cryptoIcon, setCryptoIcon] = useState(
    `src/assets/color/${optionData.code.toLowerCase()}.svg`,
  );

  // validate props
  const result = OptionSchema.safeParse({
    isMatch,
    optionData,
    onChange,
  });
  if (!result.success) {
    console.error(z.prettifyError(result.error));
    return null;
  }

  return (
    <li
      hidden={!isMatch}
      className={clsx(
        "py-4 transition-all focus-within:bg-blue-600 focus-within:text-white hover:bg-blue-300 hover:text-white has-checked:bg-blue-600 has-checked:text-white",
      )}
    >
      <label
        htmlFor={optionData.code}
        className="text-md flex w-full items-center justify-start gap-2 px-1 font-semibold text-wrap"
      >
        <img
          fetchPriority="low"
          loading="lazy"
          src={cryptoIcon}
          alt={optionData.name}
          className="block w-8 rounded-full in-focus-within:border in-focus-within:border-solid in-focus-within:border-white"
          onError={() => setCryptoIcon(FALLBACK_CRYPTO_ICON)}
        />
        {optionData.code}
        <input
          type="radio"
          id={optionData.code}
          name="crypt-option"
          onChange={onChange}
          className="appearance-none"
        />
      </label>
    </li>
  );
}

function NoMatchAlert() {
  return (
    <span
      role="alert"
      className="col-span-2 h-[49vh] text-center leading-[49vh]"
    >
      No Matches Found
    </span>
  );
}
