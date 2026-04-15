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
    <nav className="w-full overflow-y-scroll">
      <form
        action=""
        aria-label="news filters"
        className={clsx(styles.newsFilters, "flex flex-col gap-4")}
        onSubmit={handleSubmit}
        onChange={() => setIsEditing(true)}
      >
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

        <div className="flex justify-between">
          <button
            type="button"
            className="w-4/9 rounded-lg border border-gray-600/70 bg-white py-1 text-lg text-black"
            onClick={revertForm}
          >
            Cancel
          </button>

          <button
            disabled={!isEditing}
            type="submit"
            className="w-4/9 rounded-lg bg-blue-600 py-1 text-lg text-white outline-blue-600 disabled:opacity-50"
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
    <fieldset className="grid auto-rows-auto grid-cols-5 capitalize">
      <legend className="col-span-full mb-1 text-sm font-bold uppercase">
        Date Range
      </legend>
      <input
        ref={startDateRef}
        type="date"
        name="startDate"
        max={today}
        value={dateRange[0]}
        className="col-span-2"
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
      <span className="col-span-1 text-center">&#8594;</span>
      <input
        ref={endDateRef}
        type="date"
        name="endDate"
        max={today}
        value={dateRange[1]}
        className="col-span-2"
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
    <fieldset>
      <legend className="col-span-full mb-1 text-sm font-bold uppercase">
        Tickers
        <strong className="text-xs font-normal normal-case">
          &nbsp; (max {maxNumOfTickers} tickers)
        </strong>
      </legend>

      <p className="mb-1 text-xs text-gray-600">
        Find news matching all selected tickers at the same time.
      </p>

      <div className="mb-2 flex items-center justify-between leading-loose">
        <input
          ref={inputRef}
          list="currency-list"
          type="text"
          placeholder="Select or enter currency name"
          className="w-5/6 rounded-tl-sm rounded-bl-sm border border-gray-600/70 pl-1 uppercase placeholder:text-sm placeholder:normal-case"
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
    <fieldset className="grid auto-rows-auto grid-cols-2 capitalize">
      <legend className="col-span-full mb-1 text-sm font-bold uppercase">
        Topics
      </legend>

      <p className="col-span-full mb-1 text-xs text-gray-600 normal-case">
        Find news matching all selected topics at the same time.
      </p>

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

      <ul className="col-span-full max-h-32 overflow-scroll rounded-sm border border-gray-600/70">
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
