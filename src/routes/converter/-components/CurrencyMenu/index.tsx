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
import { FIATS } from "@/constants/fiat-currency-list";
import { CRYPTOS } from "@/constants/crypto-currency-list";
import type {
  Currency,
  CurrencyType,
  ActiveCurrency,
  CurrencyName,
} from "@/constants/types";

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
        "inset-0 z-10 mx-auto max-h-screen w-10/12 translate-y-1/12 rounded-lg p-2 outline outline-amber-600",
      )}
      open={open}
      closedby="any"
      aria-labelledby="currency-crypto"
      onClose={resetDialog}
    >
      <h2 id="currency-crypto" className="mb-4 text-center text-lg">
        Currency-crypto list
      </h2>

      <div>
        <form method="dialog" onSubmit={handleSubmit}>
          <div className="mb-4 flex">
            <label
              htmlFor="fiat"
              className="grow text-center text-lg leading-loose hover:bg-blue-300 hover:text-white focus:bg-indigo-400 focus:text-amber-200 has-checked:bg-blue-600 has-checked:text-white"
            >
              <span>Fiat</span>
              <input
                id="fiat"
                type="radio"
                value="fiat"
                required
                name="currency-type"
                checked={activeCurrency?.type === "fiat"}
                onChange={handleTypeChange}
                className="appearance-none"
              />
            </label>

            <label
              htmlFor="crypto"
              className="grow text-center text-lg leading-loose hover:bg-blue-300 hover:text-white has-checked:bg-blue-600 has-checked:text-white"
            >
              <span>Crypto</span>
              <input
                type="radio"
                id="crypto"
                value="crypto"
                required
                name="currency-type"
                checked={activeCurrency?.type === "crypto"}
                onChange={handleTypeChange}
                className="appearance-none"
              />
            </label>
          </div>

          <input
            className="mb-4 block h-12 w-full rounded-lg border border-solid border-gray-300 px-2 text-lg"
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
            className="mb-0 h-10 w-full rounded-lg bg-blue-500 text-center text-xl font-semibold text-white"
          >
            Confirm
          </button>
        </form>
      </div>
    </dialog>,
    document.body,
  );
}
