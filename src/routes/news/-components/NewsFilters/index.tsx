import {
  useRef,
  useState,
  useEffect,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  type FormEvent,
} from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { FIAT_NAMES, FIATS } from "@/constants/fiat-currency-list";
import { CRYPTO_NAMES, CRYPTOS } from "@/constants/crypto-currency-list";
import { type GetNewsParams } from "@/apis";
import styles from "./index.module.css";

const topicList = [
  "life_sciences",
  "technology",
  "economy_fiscal",
  "economy_monetary",
  "economy_macro",
  "finance",
  "manufacturing",
  "retail_wholesale",
  "real_estate",
  "earnings",
  "ipo",
  "blockchain",
  "financial_markets",
  "energy_transportation",
  "mergers_and_acquisitions",
] as const;

const sortingStrategies = ["LATEST", "EARLIEST", "RELEVANCE"] as const;

const FILTERS_STORAGE_KEY = "applied_filters";

export default function NewsFilters({
  filters,
  setFilters,
}: {
  filters: GetNewsParams;
  setFilters: Dispatch<SetStateAction<GetNewsParams>>;
}) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const newFilters = {
      ...Object.fromEntries(formdata),
      topics: formdata.getAll("topics").sort(),
      tickers: formdata.getAll("tickers").sort(),
      limit: filters.limit,
    } as GetNewsParams;

    sessionStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(newFilters));
    setFilters(newFilters);
  };

  const revertForm = () => {
    const lastApplied = JSON.parse(
      sessionStorage.getItem(FILTERS_STORAGE_KEY)!,
    );

    setFilters(lastApplied);
  };

  useEffect(() => {
    // store first-time filters for use when user clicks cancel button
    sessionStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));

    return () => sessionStorage.removeItem(FILTERS_STORAGE_KEY);
  }, [filters]);

  return (
    <nav className="w-full overflow-y-scroll">
      <form
        action=""
        className={clsx(styles.newsFilters, "flex flex-col gap-4")}
        onSubmit={handleSubmit}
      >
        <DateRangeField dateRange={[filters.startDate, filters.endDate]} />
        <TickersField tickers={filters.tickers} />
        <TopicsField topics={filters.topics} />
        <SortByField sort={filters.sort} />

        <div className="flex justify-between">
          <button
            type="button"
            className="w-4/9 rounded-lg border border-gray-600/70 bg-white py-1 text-lg text-black"
            onClick={revertForm}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-4/9 rounded-lg bg-blue-600 py-1 text-lg text-white outline-blue-600"
          >
            Apply
          </button>
        </div>
      </form>
    </nav>
  );
}

function DateRangeField({
  dateRange,
}: {
  dateRange: [GetNewsParams["startDate"], GetNewsParams["endDate"]];
}) {
  const today = dayjs().format("YYYY-MM-DD");
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  return (
    <fieldset className="grid auto-rows-auto grid-cols-5 capitalize">
      <legend className="col-span-full mb-1 text-sm font-bold uppercase">
        Date Range
      </legend>
      <input
        ref={startDateRef}
        type="date"
        name="startDate"
        max={today}
        defaultValue={dateRange[0]}
        className="col-span-2"
        onChange={(event) => {
          const shouldSwitchDates =
            dayjs(event.target.value).unix() >
            dayjs(endDateRef.current!.value).unix();
          if (shouldSwitchDates) {
            startDateRef.current?.setCustomValidity(
              "Start date should be earlier or equal to end date",
            );
            startDateRef.current?.reportValidity();
          } else {
            startDateRef.current?.setCustomValidity("");
            endDateRef.current?.setCustomValidity("");
          }
        }}
      />
      <span className="col-span-1 text-center">&#8594;</span>
      <input
        ref={endDateRef}
        type="date"
        name="endDate"
        max={today}
        defaultValue={dateRange[1]}
        className="col-span-2"
        onChange={(event) => {
          const shouldSwitchDates =
            dayjs(startDateRef.current!.value).unix() >
            dayjs(event.target.value).unix();
          if (shouldSwitchDates) {
            endDateRef.current?.setCustomValidity(
              "End date should be later than or equal to start date",
            );
            endDateRef.current?.reportValidity();
          } else {
            startDateRef.current?.setCustomValidity("");
            endDateRef.current?.setCustomValidity("");
          }
        }}
      />
    </fieldset>
  );
}

function TickersField({ tickers }: { tickers: GetNewsParams["tickers"] }) {
  type Ticker = GetNewsParams["tickers"][number];
  const [internalTickers, setInternalTickers] = useState([...tickers]);
  const inputRef = useRef<HTMLInputElement>(null);
  const maxNumOfTickers = 3;

  const AddInternalTicker = () => {
    const ticker = inputRef.current!.value as Ticker;
    if (!ticker) return;

    const isValidTicker = ticker in FIATS || ticker in CRYPTOS;
    const isMaxReached = internalTickers.length >= maxNumOfTickers;
    const isAlreadySelected = internalTickers.includes(ticker);

    let message = "";
    if (isAlreadySelected) message = "This ticker is already selected";
    if (isMaxReached) message = `Max ${maxNumOfTickers} tickers are allowed`;
    if (!isValidTicker) message = "This is not a valid fiat or crypto ticker";

    if (message) {
      inputRef.current?.setCustomValidity(message);
      inputRef.current?.reportValidity();
      return;
    }

    setInternalTickers((prev) => [...prev, ticker]);
  };

  const removeInternalTicker = (t: Ticker) =>
    setInternalTickers((prev) => prev.filter((ticker) => ticker !== t));

  return (
    <fieldset>
      <legend className="col-span-full mb-1 text-sm font-bold uppercase">
        Tickers
        <strong className="text-xs font-normal normal-case">
          &nbsp; (max {maxNumOfTickers} tickers)
        </strong>
      </legend>
      <div className="mb-2 flex items-center justify-between leading-loose">
        <input
          ref={inputRef}
          list="currency-list"
          type="text"
          placeholder="Select or enter currency name"
          className="w-5/6 rounded-tl-sm rounded-bl-sm border border-gray-600/70 pl-1"
        />
        <datalist id="currency-list">
          {FIAT_NAMES.map((f) => (
            <option key={f} value={f} />
          ))}
          {CRYPTO_NAMES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <button
          type="button"
          className="ml-auto w-1/6 rounded-tr-sm rounded-br-sm border border-blue-600 bg-blue-600 text-white"
          onClick={AddInternalTicker}
        >
          Add
        </button>
      </div>

      <ul className="col-span-full flex gap-2">
        {internalTickers.map((t) => (
          <li
            key={t}
            className="w-fit rounded-md bg-green-600 px-2 leading-loose text-white"
          >
            {t}
            <input hidden type="text" name="tickers" defaultValue={t} />
            <button
              type="button"
              className="ml-2 transition-all"
              onClick={() => removeInternalTicker(t)}
            >
              &#10539;
            </button>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

function TopicsField({ topics }: { topics: GetNewsParams["topics"] }) {
  type Topic = (typeof topicList)[number];
  const [internalTopics, setInternalTopics] = useState([...topics]);
  const selectAllRef = useRef<HTMLInputElement>(null);
  const isAllSelected = internalTopics.length === topicList.length;

  const handleTopicSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const topic = event.target.value as Topic;
    const updatedInternalTopics = internalTopics.includes(topic)
      ? internalTopics.filter((v) => v !== topic)
      : [...internalTopics, topic];
    setInternalTopics(updatedInternalTopics);
  };

  const handleAllSelection = () =>
    setInternalTopics(isAllSelected ? [] : [...topicList]);

  useEffect(() => {
    setIndeterminate();
    function setIndeterminate() {
      const isIndeterminate =
        internalTopics.length > 0 && internalTopics.length < topicList.length;
      selectAllRef.current!.indeterminate = isIndeterminate;
    }
  }, [internalTopics.length]);

  return (
    <fieldset className="grid auto-rows-auto grid-cols-2 capitalize">
      <legend className="col-span-full mb-1 text-sm font-bold uppercase">
        Topics
      </legend>

      <label
        htmlFor="all"
        className="col-start-2 flex w-fit items-center justify-end gap-1 place-self-end indeterminate:bg-amber-400"
      >
        <input
          ref={selectAllRef}
          id="all"
          type="checkbox"
          checked={isAllSelected}
          onChange={handleAllSelection}
        />
        Select all
      </label>

      <div className="col-span-full max-h-32 overflow-scroll rounded-sm border border-gray-600/70">
        <ul>
          {topicList.map((t) => (
            <li key={t}>
              <label
                htmlFor={t}
                className="flex items-center justify-between p-1 checked:bg-blue-600 checked:text-white hover:bg-blue-200"
              >
                {t.replace(/_/g, " ")}
                <input
                  id={t}
                  type="checkbox"
                  value={t}
                  name="topics"
                  defaultChecked={topics.includes(t)}
                  checked={internalTopics.includes(t)}
                  onChange={handleTopicSelection}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </fieldset>
  );
}

function SortByField({ sort }: { sort: GetNewsParams["sort"] }) {
  return (
    <fieldset className="grid auto-rows-auto grid-cols-3 gap-2 capitalize">
      <legend className="col-span-full mb-1 text-sm font-bold uppercase">
        Sort by
      </legend>
      {sortingStrategies.map((s) => (
        <label key={s} htmlFor={s} className="col-span-1">
          <input
            id={s}
            type="radio"
            name="sort"
            value={s}
            defaultChecked={s === sort}
            className="mr-0.5"
          />
          {s.toLocaleLowerCase()}
        </label>
      ))}
    </fieldset>
  );
}
