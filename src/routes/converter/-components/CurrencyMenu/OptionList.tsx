import { useRef, useEffect } from "react";
import { z } from "zod";
import clsx from "clsx";
import { FiatIcon, CryptoIcon } from "../CurrencyIcon";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { validateComponentProps, scrollToTop } from "@/utils";
import styles from "./OptionList.module.css";

const OptionListSchema = z.object({
  currencyType: z.enum(["fiat", "crypto"]),
  searchTerm: z.string(),
  data: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      country_codes: z.array(z.string()).optional(),
    }),
  ),
  onChange: z.function(),
});

type OptionListProps = z.infer<typeof OptionListSchema> & {
  onIntersect: IntersectionObserverCallback;
};

export default function OptionList({
  currencyType,
  searchTerm,
  data,
  onChange,
  onIntersect,
}: OptionListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver({
    rootRef: listRef,
    targetRef,
    onIntersect,
  });

  const CurrencyOption = currencyType === "fiat" ? FiatOption : CryptoOption;

  useEffect(() => {
    scrollToTop(listRef, "instant");
  }, [currencyType]);

  // props validation
  validateComponentProps(OptionListSchema, {
    currencyType,
    searchTerm,
    data,
    onChange,
  });

  return (
    <ul
      ref={listRef}
      className={clsx(
        currencyType,
        styles.optionList,
        "no-scrollbar mb-4 grid h-[40vh] auto-rows-min grid-cols-2 items-start overflow-y-scroll rounded-lg border border-solid border-gray-300 px-2 focus-within:outline-2 focus-within:outline-blue-500",
      )}
    >
      {data.map((op) => (
        <CurrencyOption key={op.code} optionData={op} onChange={onChange} />
      ))}

      <div ref={targetRef} className="h-0.5 bg-transparent"></div>
      <NoMatchAlert />
    </ul>
  );
}

const OptionSchema = z.object({
  optionData: z.object({
    code: z.string(),
    name: z.string(),
    country_codes: z.array(z.string()).optional(),
  }),
  onChange: z.function(),
});

type CurrencyOptionProps = z.infer<typeof OptionSchema>;

function FiatOption({ optionData, onChange }: CurrencyOptionProps) {
  validateComponentProps(OptionSchema, { optionData, onChange });

  return (
    <li
      className={clsx(
        "py-4 transition-all focus-within:bg-blue-600 focus-within:text-white hover:bg-blue-300 hover:text-white has-checked:bg-blue-600 has-checked:text-white",
      )}
    >
      <label
        htmlFor={optionData.code}
        className="flex w-full items-center justify-start gap-4 px-1 text-lg font-semibold"
      >
        <FiatIcon
          className="block w-8 rounded-full in-focus-within:border in-focus-within:border-solid in-focus-within:border-white"
          alt={optionData.name}
          title={optionData.name}
          code={optionData.country_codes![0]}
        />
        {optionData.code}
        <input
          id={optionData.code}
          type="radio"
          value={optionData.code}
          name="fiat-option"
          onChange={onChange}
          className="appearance-none"
        />
      </label>
    </li>
  );
}

function CryptoOption({ optionData, onChange }: CurrencyOptionProps) {
  validateComponentProps(OptionSchema, { optionData, onChange });

  return (
    <li
      className={clsx(
        "py-4 transition-all focus-within:bg-blue-600 focus-within:text-white hover:bg-blue-300 hover:text-white has-checked:bg-blue-600 has-checked:text-white",
      )}
    >
      <label
        htmlFor={optionData.code}
        className="text-md flex w-full items-center justify-start gap-2 px-1 font-semibold text-wrap"
      >
        <CryptoIcon
          title={optionData.name}
          alt={optionData.name}
          code={optionData.code}
          className="block w-8 rounded-full in-focus-within:border in-focus-within:border-solid in-focus-within:border-white"
        />
        {optionData.code}
        <input
          type="radio"
          id={optionData.code}
          value={optionData.code}
          name="crypto-option"
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
