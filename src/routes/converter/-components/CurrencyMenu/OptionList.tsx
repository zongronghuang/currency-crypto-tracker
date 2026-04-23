import { useRef, useEffect } from "react";
import { z } from "zod";
import clsx from "clsx";
import { FiatIcon, CryptoIcon } from "../CurrencyIcon";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { validateComponentProps, scrollToTop } from "@/utils";
import { type Currency } from "@/constants/types";
import styles from "./OptionList.module.css";

const OptionListSchema = z.object({
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
  activeCurrency: Currency;
};

export default function OptionList({
  searchTerm,
  activeCurrency,
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

  const CurrencyOption =
    activeCurrency?.type === "fiat" ? FiatOption : CryptoOption;

  useEffect(() => {
    scrollToTop(listRef, "instant");
  }, [activeCurrency?.type]);

  // props validation
  validateComponentProps(OptionListSchema, {
    searchTerm,
    data,
    onChange,
  });

  return (
    <ul
      ref={listRef}
      className={clsx(
        activeCurrency?.type,
        styles.optionList,
        "no-scrollbar relative mb-4 h-[40vh] auto-rows-min items-start overflow-y-scroll rounded-lg border border-solid border-slate-300 md:mb-6 md:border-2",
      )}
    >
      {data.map((op) => (
        <CurrencyOption
          isActive={activeCurrency?.code === op.code}
          key={op.code}
          optionData={op}
          onChange={onChange}
        />
      ))}

      <div ref={targetRef} className="h-0.5 bg-transparent"></div>
      <NoMatchAlert />
    </ul>
  );
}

const OptionSchema = z.object({
  isActive: z.boolean(),
  optionData: z.object({
    code: z.string(),
    name: z.string(),
    country_codes: z.array(z.string()).optional(),
  }),
  onChange: z.function(),
});

type CurrencyOptionProps = z.infer<typeof OptionSchema>;

function FiatOption({ isActive, optionData, onChange }: CurrencyOptionProps) {
  validateComponentProps(OptionSchema, { isActive, optionData, onChange });

  return (
    <li
      className={clsx(
        "py-3 transition-all focus-within:bg-blue-700 focus-within:text-white hover:bg-blue-700 hover:text-white has-checked:bg-blue-600 has-checked:text-white md:py-4 xl:py-2",
      )}
    >
      <label
        htmlFor={optionData.code}
        className="flex w-full items-center justify-start px-2 text-lg font-semibold md:px-4"
      >
        <FiatIcon
          className="mr-4 block w-8 rounded-full in-focus-within:ring-2 in-focus-within:ring-white md:w-12 md:in-focus-within:ring-4 xl:w-10"
          alt={optionData.name}
          title={optionData.name}
          code={optionData.country_codes![0]}
        />
        <span className="mr-4 md:text-2xl">{optionData.code}</span>

        <span className="ml-auto text-right text-sm font-normal text-pretty text-current md:text-xl">
          {optionData.name}
        </span>
        <input
          id={optionData.code}
          type="radio"
          value={optionData.code}
          name="fiat-option"
          onChange={onChange}
          checked={isActive}
          className="w-0 opacity-0"
        />
      </label>
    </li>
  );
}

function CryptoOption({ isActive, optionData, onChange }: CurrencyOptionProps) {
  validateComponentProps(OptionSchema, { isActive, optionData, onChange });

  return (
    <li
      className={clsx(
        "py-4 transition-all focus-within:bg-blue-600 focus-within:text-white hover:bg-blue-300 hover:text-white has-checked:bg-blue-600 has-checked:text-white",
      )}
    >
      <label
        htmlFor={optionData.code}
        className="text-md flex w-full items-center justify-start gap-2 px-1 font-semibold text-wrap md:px-4"
      >
        <CryptoIcon
          title={optionData.name}
          alt={optionData.name}
          code={optionData.code}
          className="mr-4 block w-8 rounded-full in-focus-within:ring-2 in-focus-within:ring-white md:w-12 md:in-focus-within:ring-4 xl:w-10"
        />
        <span className="mr-4 md:text-2xl">{optionData.code}</span>

        <span className="ml-auto text-right text-sm font-normal text-pretty text-current md:text-xl">
          {optionData.name}
        </span>

        <input
          type="radio"
          id={optionData.code}
          value={optionData.code}
          name="crypto-option"
          onChange={onChange}
          checked={isActive}
          className="opacity-0"
        />
      </label>
    </li>
  );
}

function NoMatchAlert() {
  return (
    <span
      role="alert"
      className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-lg md:text-2xl"
    >
      No Matches Found
    </span>
  );
}
