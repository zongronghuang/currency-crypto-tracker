import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type RefObject,
  type Dispatch,
  type SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import clsx from "clsx";
import OptionList from "./OptionList";
import {
  sliceListByPage,
  sanitizeSearchTerm,
  isSearchMatch,
  validateComponentProps,
} from "@/utils";
import type {
  Currency,
  CurrencyType,
  ActiveCurrency,
  CurrencyName,
} from "@/constants/types";

const FIATS = await import("@/constants/fiat-currency-list").then(
  (mod) => mod.FIATS,
);
const CRYPTOS = await import("@/constants/crypto-currency-list").then(
  (mod) => mod.CRYPTOS,
);

const dataSources = {
  fiat: Object.values(FIATS),
  crypto: Object.values(CRYPTOS),
};

const CurrencyMenuSchema = z.object({
  open: z.boolean().optional(),
});

type CurrencyMenuProps = z.infer<typeof CurrencyMenuSchema> & {
  ref: RefObject<HTMLDialogElement | null>;
  activeCurrency?: ActiveCurrency | null;
  setActiveCurrency: Dispatch<SetStateAction<ActiveCurrency | null>>;
};

type PageCollection = {
  data: Currency[];
  pageNo: number;
  hasMore: boolean;
};

type SearchMatches = {
  term: string;
  matches: Currency[];
};

export default function CurrencyMenu({
  ref,
  // setCurrencies,
  activeCurrency,
  setActiveCurrency,
  // updateSearchCurrency,
  open = false,
}: CurrencyMenuProps) {
  const navigate = useNavigate({ from: "/converter" });
  const [pageCollection, setPageCollection] = useState<PageCollection>({
    data: [],
    pageNo: 1,
    hasMore: true,
  });
  const [searchMatches, setSearchMatches] = useState<SearchMatches>({
    term: "",
    matches: [],
  });
  const isSearchMode = searchMatches.term.length > 0;

  // handlers
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const sanitizedTerm = sanitizeSearchTerm(event.target.value);
    const dataSource = dataSources[activeCurrency!.type];
    const filteredData = dataSource.filter((data) =>
      isSearchMatch(sanitizedTerm, data),
    );
    setSearchMatches({ term: sanitizedTerm, matches: filteredData });
  }

  function handleTypeChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "fiat" || event.target.value === "crypto") {
      console.log("type change");
      setActiveCurrency((prev) => ({
        ...prev!,
        type: event.target.value as CurrencyType,
      }));
      setPageCollection({
        pageNo: 1,
        data: [],
        hasMore: true,
      });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const currencyType = formData.get("currency-type") as CurrencyType;
    const currencyOption =
      formData.get("fiat-option") || formData.get("crypto-option");

    // Get new currency data
    const dataSource = currencyType === "fiat" ? FIATS : CRYPTOS;
    const currencyData = dataSource[
      currencyOption! as keyof typeof dataSource
    ] as Currency;

    updateSearchCurrency(
      currencyData.code as CurrencyName,
      activeCurrency!.__memoCode!,
    );

    ref.current!.close();
  }

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    console.log("intersecting", entry.isIntersecting);
    if (!entry.isIntersecting || !pageCollection.hasMore) return;

    const { pageData, hasMore } = sliceListByPage({
      list: dataSources[activeCurrency!.type],
      pageNo: pageCollection.pageNo,
    });

    console.log("intersection", activeCurrency?.type);

    setPageCollection((prev) => ({
      pageNo: prev.pageNo + 1,
      data: [...prev.data, ...pageData],
      hasMore,
    }));
  }

  function resetDialog() {
    console.log("dialog close");
    setPageCollection({
      pageNo: 1,
      data: [],
      hasMore: true,
    });
    setActiveCurrency(null);
  }

  function updateSearchCurrency(
    newCurrencyCode: CurrencyName,
    activeCurrencyMemoCode: CurrencyName,
  ) {
    navigate({
      search: (prev: {
        from: CurrencyName;
        to: CurrencyName;
        amount?: number;
      }) =>
        prev.from === activeCurrencyMemoCode
          ? { ...prev, from: newCurrencyCode }
          : { ...prev, to: newCurrencyCode },
    });
  }

  validateComponentProps(CurrencyMenuSchema, { open });

  return createPortal(
    <dialog
      ref={ref}
      className={clsx(
        "inset-0 top-1/2 z-10 mx-auto w-2/3 -translate-y-1/2 rounded-lg border border-slate-300 p-4 text-slate-900 md:w-1/2 md:p-6 xl:w-1/3",
      )}
      open={open}
      closedby="any"
      aria-labelledby="currency-crypto"
      onClose={resetDialog}
    >
      <h2
        id="currency-crypto"
        className="mb-4 text-center text-xl font-bold md:mb-8 md:text-3xl xl:mb-4 xl:text-2xl"
      >
        Choose Currency
      </h2>

      <div>
        <form method="dialog" onSubmit={handleSubmit}>
          <div className="mb-4 flex overflow-clip rounded-lg border border-slate-300 md:mb-6 md:border-2 xl:mb-4">
            {Object.keys(dataSources).map((category) => (
              <label
                key={category}
                htmlFor={category}
                className="grow text-center text-lg leading-loose hover:bg-blue-700 hover:text-white has-checked:bg-blue-600 has-checked:text-white md:py-2 xl:py-1"
              >
                <span className="uppercase md:text-2xl xl:text-xl">
                  {category}
                </span>
                <input
                  id={category}
                  type="radio"
                  value={category}
                  required
                  name="currency-type"
                  checked={activeCurrency?.type === category}
                  onChange={handleTypeChange}
                  className="opacity-0"
                />
              </label>
            ))}
          </div>

          <input
            className="mb-4 block h-12 w-full rounded-lg border border-solid border-slate-300 bg-white px-2 text-lg placeholder:text-slate-400 md:mb-6 md:h-16 md:border-2 md:px-4 md:text-2xl xl:h-12"
            type="search"
            spellCheck={false}
            value={searchMatches.term}
            name="search-term"
            onChange={handleSearchChange}
            placeholder="Currency name"
          />

          <OptionList
            activeCurrency={activeCurrency!}
            searchTerm={searchMatches.term}
            data={isSearchMode ? searchMatches.matches : pageCollection.data}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setActiveCurrency((prev) => ({
                ...prev!,
                code: event.target.value,
              }));
            }}
            onIntersect={handleIntersection}
          />

          <button
            type="submit"
            className="mb-0 w-full rounded-lg bg-blue-600 py-2 text-center text-xl font-semibold text-white hover:bg-blue-700 md:py-4 md:text-3xl xl:py-2 xl:text-2xl"
          >
            Confirm
          </button>
        </form>
      </div>
    </dialog>,
    document.body,
  );
}
