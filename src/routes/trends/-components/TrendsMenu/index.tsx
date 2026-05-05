import {
  useEffect,
  useState,
  useRef,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import clsx from "clsx";
import { type TrendsParams } from "@/apis";
import { type TradableCrypto } from "@/constants/crypto-exchange-list";
import styles from "./index.module.css";

const FIAT_NAMES = await import("@/constants/fiat-currency-list").then(
  (mod) => mod.FIAT_NAMES,
);
const { CRYPTO_TRADING_PAIRS, TRADABLE_CRYPTOS } = await import(
  "@/constants/crypto-exchange-list"
).then((mod) => mod);

export default function TrendsMenu({
  trendsApiParams,
  setTrendsApiParams,
  onClose,
}: {
  trendsApiParams: TrendsParams;
  setTrendsApiParams: Dispatch<SetStateAction<TrendsParams>>;
  onClose: () => void;
}) {
  const [internalParams, setInternalParams] = useState<TrendsParams>({
    ...trendsApiParams,
  });
  const [isEditing, setIsEditing] = useState(false);
  const cachedTrendsConfigs = useRef(
    JSON.parse(JSON.stringify({ ...trendsApiParams })),
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = Object.fromEntries(formData);
    setTrendsApiParams(params as TrendsParams);
    setInternalParams(params as TrendsParams);
    setIsEditing(false);
    cachedTrendsConfigs.current = params;
    onClose();
  };

  const revertForm = () => {
    const params = cachedTrendsConfigs.current;
    setTrendsApiParams(params);
    setInternalParams(params);
    setIsEditing(false);
  };

  useEffect(() => {
    cachedTrendsConfigs.current = JSON.parse(
      JSON.stringify({ ...trendsApiParams }),
    );
  }, [trendsApiParams]);

  return (
    <nav className="w-full overflow-y-auto">
      <form
        action=""
        aria-label="trends menu"
        className={clsx(
          styles.trendsMenu,
          "flex flex-col gap-4 text-slate-900 md:mx-auto md:w-3/4 lg:gap-8",
        )}
        onSubmit={handleSubmit}
        onChange={() => setIsEditing(true)}
      >
        <h2 className="row-start-1 row-end-2 text-center text-lg font-semibold lg:col-span-full lg:text-2xl">
          Set Trends Settings
        </h2>

        <CurrenciesField
          base={internalParams.base}
          quote={internalParams.quote}
          setInternalParams={setInternalParams}
        />
        <DataPointField
          dataPoint={internalParams.dataPoint}
          setInternalParams={setInternalParams}
        />

        <div className="flex justify-between">
          <button
            type="button"
            className="w-4/9 rounded-lg border border-slate-300 bg-slate-100 py-1 text-lg text-slate-800 lg:py-2 lg:text-2xl"
            onClick={revertForm}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isEditing}
            className="w-4/9 rounded-lg bg-blue-600 py-1 text-lg text-white hover:bg-blue-700 disabled:opacity-50 lg:py-2 lg:text-2xl"
          >
            Apply
          </button>
        </div>
      </form>
    </nav>
  );
}

function CurrenciesField({
  base,
  quote,
  setInternalParams,
}: {
  base: TrendsParams["base"];
  quote: TrendsParams["quote"];
  setInternalParams: Dispatch<SetStateAction<TrendsParams>>;
}) {
  const baseRef = useRef<HTMLSelectElement>(null);
  const quoteRef = useRef<HTMLSelectElement>(null);
  const quotes =
    base in CRYPTO_TRADING_PAIRS
      ? CRYPTO_TRADING_PAIRS[base as TradableCrypto]
      : FIAT_NAMES.filter((f) => f !== base);

  return (
    <fieldset className="grid auto-rows-auto grid-cols-5 lg:text-lg">
      <legend className="col-span-full mb-1 text-sm font-bold uppercase lg:mb-2 lg:text-xl">
        Currencies
        <strong className="text-xs font-normal normal-case lg:text-base">
          &nbsp; (base &#8260; quote)
        </strong>
      </legend>
      <p className="col-span-full mb-1 text-sm text-slate-600 lg:mb-2 lg:text-base">
        Choose a base currency and a quote currency to see their exchange
        trends.
      </p>
      <select
        ref={baseRef}
        name="base"
        required
        size={5}
        value={base}
        className="col-span-2 rounded border border-solid border-slate-300"
        onChange={(event) =>
          setInternalParams(
            (prev) =>
              ({
                ...prev,
                base: event.target.value,
              }) as TrendsParams,
          )
        }
      >
        <optgroup label="-- Fiats --" className="bg-amber-100">
          {FIAT_NAMES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </optgroup>
        <optgroup label="-- Cryptos --" className="bg-purple-100">
          {TRADABLE_CRYPTOS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </optgroup>
      </select>

      <span className="col-span-1 m-auto flex text-xl">&#8260;</span>

      <select
        ref={quoteRef}
        name="quote"
        value={quote}
        required
        size={5}
        className="col-span-2 rounded border border-solid border-slate-300"
        onChange={(event) =>
          setInternalParams(
            (prev) =>
              ({
                ...prev,
                quote: event.target.value,
              }) as TrendsParams,
          )
        }
      >
        {quotes.map((q) => (
          <option key={q} value={q} className="p-1">
            {q}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

function DataPointField({
  dataPoint,
  setInternalParams,
}: {
  dataPoint: TrendsParams["dataPoint"];
  setInternalParams: Dispatch<SetStateAction<TrendsParams>>;
}) {
  const sizes = ["daily", "weekly", "monthly"];

  return (
    <fieldset className="grid auto-rows-auto grid-cols-3 lg:text-lg">
      <legend className="col-span-full mb-1 text-sm font-bold uppercase lg:mb-2 lg:text-xl">
        Data Point
      </legend>
      <p className="col-span-full mb-1 text-sm text-slate-600 lg:mb-2 lg:text-base">
        Choose a data point size to generalize the exchange trends.
      </p>
      {sizes.map((s) => (
        <label key={s} className="col-span-1 capitalize">
          <input
            name="dataPoint"
            type="radio"
            value={s}
            checked={s === dataPoint}
            className="mr-0.5"
            onChange={() =>
              setInternalParams(
                (prev) => ({ ...prev, dataPoint: s }) as TrendsParams,
              )
            }
          />
          {s}
        </label>
      ))}
    </fieldset>
  );
}
