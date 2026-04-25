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
import { type NewsFilters } from "@/apis";
import styles from "./index.module.css";

const { FIATS, FIAT_NAMES } = await import(
  "@/constants/fiat-currency-list"
).then((mod) => mod);
const { CRYPTOS, CRYPTO_NAMES } = await import(
  "@/constants/crypto-currency-list"
).then((mod) => mod);

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

export default function NewsFilters({
  filters,
  setFilters,
  onClose,
}: {
  filters: NewsFilters;
  setFilters: Dispatch<SetStateAction<NewsFilters>>;
  onClose: () => void;
}) {
  const [internalFilters, setInternalFilters] = useState(filters);
  const [isEditing, setIsEditing] = useState(false);
  const cachedFiltersRef = useRef(JSON.parse(JSON.stringify(filters)));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const newFilters = {
      ...Object.fromEntries(formdata),
      topics: formdata.getAll("topics").sort(),
      tickers: formdata.getAll("tickers").sort(),
      limit: +formdata.get("limit")!,
    } as NewsFilters;

    setFilters(newFilters);
    setInternalFilters(newFilters);
    setIsEditing(false);
    cachedFiltersRef.current = newFilters;
    onClose();
  };

  const revertForm = () => {
    setFilters(cachedFiltersRef.current);
    setInternalFilters(cachedFiltersRef.current);
    setIsEditing(false);
  };

  useEffect(() => {
    cachedFiltersRef.current = JSON.parse(JSON.stringify(filters));
  }, [filters]);

  return (
    <nav className="w-full overflow-y-auto">
      <form
        action=""
        aria-label="news filters"
        className={clsx(
          styles.newsFilters,
          "flex flex-col gap-4 text-slate-800 md:mx-auto md:w-3/4 lg:grid lg:grid-cols-2 lg:grid-rows-[min-content_min-content_min-content_min-content_1fr] lg:gap-x-8",
        )}
        onSubmit={handleSubmit}
        onChange={() => setIsEditing(true)}
      >
        <h2 className="row-start-1 row-end-2 text-center text-lg font-semibold lg:col-span-full lg:text-2xl">
          Set News Filters
        </h2>

        <DateRangeField
          dateRange={[internalFilters.startDate, internalFilters.endDate]}
          setInternalFilters={setInternalFilters}
        />
        <TickersField
          tickers={internalFilters.tickers}
          setInternalFilters={setInternalFilters}
        />
        <TopicsField
          topics={internalFilters.topics}
          setInternalFilters={setInternalFilters}
        />
        <SortByField
          sort={internalFilters.sort}
          setInternalFilters={setInternalFilters}
        />
        <LimitField limit={internalFilters.limit} />

        <div className="col-span-full flex justify-between">
          <button
            type="button"
            className="w-4/9 rounded-lg border border-slate-300 bg-slate-100 py-1 text-lg text-slate-800 lg:py-2 lg:text-2xl"
            onClick={revertForm}
          >
            Cancel
          </button>

          <button
            disabled={!isEditing}
            type="submit"
            className="w-4/9 rounded-lg bg-blue-600 py-1 text-lg text-white hover:bg-blue-700 disabled:opacity-50 lg:py-2 lg:text-2xl"
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
  setInternalFilters,
}: {
  dateRange: [NewsFilters["startDate"], NewsFilters["endDate"]];
  setInternalFilters: Dispatch<SetStateAction<NewsFilters>>;
}) {
  const today = dayjs().format("YYYY-MM-DD");
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  return (
    <fieldset className="col-start-1 col-end-2 row-start-2 row-end-3 grid auto-rows-auto grid-cols-[1fr_min-content_1fr] self-start capitalize lg:text-lg">
      <legend className="col-span-full mb-1 text-sm font-bold text-slate-900 uppercase lg:mb-2 lg:text-xl">
        Date Range
      </legend>
      <input
        ref={startDateRef}
        type="date"
        name="startDate"
        max={today}
        value={dateRange[0]}
        className="rounded-sm border border-solid border-slate-300 p-1 lg:text-lg"
        onChange={(event) => {
          startDateRef.current?.setCustomValidity("");
          endDateRef.current?.setCustomValidity("");

          const isBadOrder =
            dayjs(event.target.value).unix() >
            dayjs(endDateRef.current!.value).unix();
          if (isBadOrder) {
            startDateRef.current?.setCustomValidity(
              "Start date should be earlier or equal to end date",
            );
            startDateRef.current?.reportValidity();
            return;
          }
          setInternalFilters((prev) => ({
            ...prev,
            startDate: event.target.value,
          }));
        }}
      />
      <span className="mx-2 place-self-center">&#8594;</span>
      <input
        ref={endDateRef}
        type="date"
        name="endDate"
        max={today}
        value={dateRange[1]}
        className="rounded-sm border border-solid border-slate-300 p-1"
        onChange={(event) => {
          startDateRef.current?.setCustomValidity("");
          endDateRef.current?.setCustomValidity("");

          const isBadOrder =
            dayjs(startDateRef.current!.value).unix() >
            dayjs(event.target.value).unix();
          if (isBadOrder) {
            endDateRef.current?.setCustomValidity(
              "End date should be later than or equal to start date",
            );
            endDateRef.current?.reportValidity();
            return;
          }
          setInternalFilters((prev) => ({
            ...prev,
            endDate: event.target.value,
          }));
        }}
      />
    </fieldset>
  );
}

function TickersField({
  tickers,
  setInternalFilters,
}: {
  tickers: NewsFilters["tickers"];
  setInternalFilters: Dispatch<SetStateAction<NewsFilters>>;
}) {
  type Ticker = NewsFilters["tickers"][number];
  const inputRef = useRef<HTMLInputElement>(null);
  const maxNumOfTickers = 3;

  const AddInternalTicker = () => {
    const ticker = inputRef.current!.value as Ticker;
    if (!ticker) return;

    const isValidTicker = ticker in FIATS || ticker in CRYPTOS;
    const isMaxReached = tickers.length >= maxNumOfTickers;
    const isAlreadySelected = tickers.includes(ticker);

    let message = "";
    if (isAlreadySelected) message = "This ticker is already selected";
    if (isMaxReached) message = `Max ${maxNumOfTickers} tickers are allowed`;
    if (!isValidTicker) message = "This is not a valid fiat or crypto ticker";

    if (message) {
      inputRef.current?.setCustomValidity(message);
      inputRef.current?.reportValidity();
      return;
    }

    setInternalFilters((prev) => ({
      ...prev,
      tickers: prev.tickers.concat(ticker),
    }));
  };

  const removeInternalTicker = (t: Ticker) =>
    setInternalFilters((prev) => ({
      ...prev,
      tickers: prev.tickers.filter((ticker) => ticker !== t),
    }));

  return (
    <fieldset className="col-start-1 col-end-2 row-start-3 row-end-4 lg:text-lg">
      <legend className="col-span-full mb-1 text-sm font-bold text-slate-900 uppercase lg:mb-2 lg:text-xl">
        Tickers
        <strong className="text-xs font-normal normal-case lg:text-base">
          &nbsp; (max {maxNumOfTickers} tickers)
        </strong>
      </legend>

      <p className="mb-1 text-sm text-slate-600 lg:mb-2 lg:text-base">
        Find news matching all the selected tickers.
      </p>

      <div className="mb-2 flex items-center justify-between leading-loose lg:mb-2">
        <input
          ref={inputRef}
          list="currency-list"
          type="text"
          placeholder="Select or enter currency name"
          className="w-5/6 rounded-tl-sm rounded-bl-sm border border-slate-300 pl-1 uppercase placeholder:text-sm placeholder:text-slate-400 placeholder:normal-case lg:placeholder:text-lg"
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
        {tickers.map((t) => (
          <li
            key={t}
            className="w-fit rounded-md bg-green-600 px-2 leading-loose text-white"
          >
            {t}
            <input
              hidden
              type="text"
              name="tickers"
              defaultValue={t}
              readOnly
            />
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

function TopicsField({
  topics,
  setInternalFilters,
}: {
  topics: NewsFilters["topics"];
  setInternalFilters: Dispatch<SetStateAction<NewsFilters>>;
}) {
  type Topic = (typeof topicList)[number];
  const selectAllRef = useRef<HTMLInputElement>(null);
  const isAllSelected = topics.length === topicList.length;

  const handleTopicSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const topic = event.target.value as Topic;
    const updatedTopics = topics.includes(topic)
      ? topics.filter((v) => v !== topic)
      : [...topics, topic];
    setInternalFilters((prev) => ({ ...prev, topics: updatedTopics }));
  };

  const handleAllSelection = () =>
    setInternalFilters((prev) => ({
      ...prev,
      topics: isAllSelected ? [] : [...topicList],
    }));

  useEffect(() => {
    setIndeterminate();
    function setIndeterminate() {
      const isIndeterminate =
        topics.length > 0 && topics.length < topicList.length;
      selectAllRef.current!.indeterminate = isIndeterminate;
    }
  }, [topics.length]);

  return (
    <fieldset className="row-span-3 grid auto-rows-auto grid-cols-2 capitalize lg:text-lg">
      <legend className="col-span-full mb-1 text-sm font-bold text-slate-900 uppercase lg:mb-4 lg:text-xl">
        Topics
      </legend>

      <p className="col-span-full mb-1 text-sm text-slate-600 normal-case lg:text-base">
        Find news matching all the selected topics.
      </p>

      <label
        htmlFor="all"
        className="col-start-2 flex w-fit items-center justify-end gap-1 place-self-end"
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

      <ul className="col-span-full max-h-32 overflow-y-auto rounded-sm border border-slate-300 lg:flex lg:h-auto lg:max-h-none lg:flex-wrap">
        {topicList.map((t) => (
          <li key={t} className="text-wrap lg:w-1/2">
            <label
              htmlFor={t}
              className="flex items-center justify-between gap-2 p-1 checked:bg-blue-600 checked:text-white hover:bg-blue-200 lg:justify-start"
            >
              {t.replace(/_/g, " ")}
              <input
                id={t}
                type="checkbox"
                value={t}
                name="topics"
                className="lg:-order-1"
                checked={topics.includes(t)}
                onChange={handleTopicSelection}
              />
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

function SortByField({
  sort,
  setInternalFilters,
}: {
  sort: NewsFilters["sort"];
  setInternalFilters: Dispatch<SetStateAction<NewsFilters>>;
}) {
  return (
    <fieldset className="col-start-1 col-end-2 row-start-4 row-end-5 grid auto-rows-auto grid-cols-3 gap-2 capitalize lg:text-lg">
      <legend className="col-span-full mb-1 text-sm font-bold text-slate-900 uppercase lg:mb-2 lg:text-xl">
        Sort by
      </legend>
      {sortingStrategies.map((s) => (
        <label key={s} htmlFor={s} className="col-span-1">
          <input
            id={s}
            type="radio"
            name="sort"
            value={s}
            checked={s === sort}
            className="mr-0.5"
            onChange={() =>
              setInternalFilters((prev) => ({ ...prev, sort: s }))
            }
          />
          {s.toLocaleLowerCase()}
        </label>
      ))}
    </fieldset>
  );
}

function LimitField({
  limit,
  hidden = true,
}: {
  limit: NewsFilters["limit"];
  hidden?: boolean;
}) {
  return (
    <fieldset hidden={hidden}>
      <legend>Limit</legend>
      <input type="number" name="limit" defaultValue={limit}></input>
    </fieldset>
  );
}
