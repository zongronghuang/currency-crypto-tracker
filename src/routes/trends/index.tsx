import {
  Activity,
  Suspense,
  useState,
  lazy,
  type Dispatch,
  type SetStateAction,
} from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { type DeepPartial, type TimeChartOptions } from "lightweight-charts";
import { type TrendsParams, getTrends } from "@/apis";
import FooterBar from "../-components/FooterBar";
import FooterDrawer from "../-components/FooterDrawer";
import Alert from "../-components/Alert";
import { extractTrendsData } from "./-helpers";
import { type CryptoItem, type FiatItem } from "./-types";
import BaselineIcon from "@/assets/trends/baseline.svg";
import BarIcon from "@/assets/trends/bar.svg";
import HistogramIcon from "@/assets/trends/histogram.svg";
import CandlestickIcon from "@/assets/trends/candlestick.svg";
import TableIcon from "@/assets/trends/table.svg";
import styles from "./index.module.css";

const TrendsMenu = lazy(() => import("./-components/TrendsMenu"));
const TableView = lazy(() => import("./-components/TableView"));
const BaselineView = lazy(() => import("./-components/BaselineView"));
const BarView = lazy(() => import("./-components/BarView"));
const CandlestickView = lazy(() => import("./-components/CandlestickView"));
const HistogramView = lazy(() => import("./-components/HistogramView"));

const CRYPTO_TRADING_PAIRS = await import(
  "@/constants/crypto-exchange-list"
).then((mod) => mod.CRYPTO_TRADING_PAIRS);
const views = ["table", "baseline", "bar", "candlestick", "histogram"] as const;

const viewIcon = {
  table: <TableIcon className="h-auto w-6" />,
  baseline: <BaselineIcon className="h-auto w-6" />,
  bar: <BarIcon className="h-auto w-6" />,
  histogram: <HistogramIcon className="h-auto w-6" />,
  candlestick: <CandlestickIcon className="h-auto w-6" />,
};

const chartOptions: DeepPartial<TimeChartOptions> = {
  height: 450,
  autoSize: true,
  timeScale: { fixLeftEdge: true, fixRightEdge: true },
  layout: {
    panes: { enableResize: true },
  },
};

const defaultTrendsApiParams: TrendsParams = {
  dataPoint: "daily",
  base: "USD",
  quote: "EUR",
};

type View = (typeof views)[number];

export const Route = createFileRoute("/trends/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [trendsApiParams, setTrendsApiParams] = useState<TrendsParams>({
    ...defaultTrendsApiParams,
  });
  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: ["trends", trendsApiParams],
    queryFn: () => getTrends(trendsApiParams),
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [view, setView] = useState<View>("table");
  const baseCategory =
    trendsApiParams.base in CRYPTO_TRADING_PAIRS ? "crypto" : "fiat";

  if (isError) return <Alert title="Oops" description={error.message} />;

  const { metaData, timeSeriesArray, startDate, endDate } =
    extractTrendsData(data);

  return (
    <div className={styles.trends}>
      {isPending && (
        <Alert title="Loading" description="Data is arriving now." />
      )}

      {isSuccess && (
        <>
          <BulletinBoard
            metaData={metaData}
            startDate={startDate}
            endDate={endDate}
          />

          <section className="mx-auto w-full">
            <ViewOptions
              view={view}
              setView={setView}
              baseCategory={baseCategory}
            />
            <Suspense
              fallback={<Alert title="Rendering" description="Ready soon!" />}
            >
              <DataView
                view={view}
                series={timeSeriesArray}
                chartOptions={chartOptions}
              />
            </Suspense>
          </section>
        </>
      )}

      <FooterBar>
        <div className="flex h-12 items-center justify-center text-center">
          <button
            aria-label="open drawer button"
            aria-expanded={isDrawerOpen}
            disabled={!isSuccess}
            className="text-4xl font-bold disabled:opacity-45"
            onClick={(event) => {
              event.stopPropagation();
              setIsDrawerOpen(true);
            }}
          >
            &#8943;
          </button>
        </div>
      </FooterBar>

      <FooterDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Suspense>
          <Activity mode="visible">
            <TrendsMenu
              trendsApiParams={trendsApiParams}
              setTrendsApiParams={setTrendsApiParams}
              onClose={() => setIsDrawerOpen(false)}
            />
          </Activity>
        </Suspense>
      </FooterDrawer>
    </div>
  );
}

function BulletinBoard({
  metaData,
  startDate,
  endDate,
}: {
  metaData: { [key: string]: string };
  startDate: string;
  endDate: string;
}) {
  const title = metaData["1. Information"];
  const baseCurrency =
    metaData["2. From Symbol"] || metaData["2. Digital Currency Code"];
  const quoteCurrency = metaData["3. To Symbol"] || metaData["4. Market Code"];
  const lastRefreshed =
    metaData["5. Last Refreshed"] || metaData["6. Last Refreshed"];
  const timeZone = metaData["6. Time Zone"] || metaData["7. Time Zone"];

  return (
    <section
      aria-label="bulletin board"
      className="mb-2 rounded-lg border-4 border-double border-emerald-50 bg-emerald-200 p-2 text-sm text-slate-900"
    >
      <h1 className="font-semibold">{title}</h1>
      <h2>
        Base/quote:{" "}
        <span className="font-semibold">
          {baseCurrency} &#8260; {quoteCurrency}{" "}
        </span>
      </h2>
      <p>
        Time:{" "}
        <time dateTime={startDate} className="font-semibold">
          {startDate}
        </time>{" "}
        &#8213;{" "}
        <time dateTime={endDate} className="font-semibold">
          {endDate}
        </time>
      </p>
      <p>
        Last refreshed:{" "}
        <time dateTime={lastRefreshed} className="font-semibold">
          {lastRefreshed} ({timeZone})
        </time>
      </p>
    </section>
  );
}

function ViewOptions({
  view,
  baseCategory,
  setView,
}: {
  view: View;
  baseCategory: "crypto" | "fiat";
  setView: Dispatch<SetStateAction<View>>;
}) {
  const availableViews = views.filter((v) =>
    baseCategory === "fiat" ? v !== "histogram" : v,
  );
  const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1);

  return (
    <div className="mb-2 flex gap-3 overflow-x-auto px-1 py-2 leading-none sm:justify-end">
      {availableViews.map((v) => (
        <button
          key={v}
          className={clsx(
            view === v && "bg-blue-600 fill-white stroke-white text-white",
            "flex w-max shrink-0 items-center justify-between gap-1 rounded-xs px-1 py-0.5 text-slate-900 transition-all hover:bg-blue-700 hover:text-white",
          )}
          onClick={() => setView(v)}
        >
          {viewIcon[v]}
          {capitalize(v)}
        </button>
      ))}
    </div>
  );
}

function DataView({
  view,
  series,
  chartOptions,
}: {
  view: View;
  series: (FiatItem | CryptoItem)[];
  chartOptions: DeepPartial<TimeChartOptions>;
}) {
  switch (view) {
    case "table":
      return <TableView series={series} />;
    case "baseline":
      return <BaselineView series={series} chartOptions={chartOptions} />;
    case "bar":
      return <BarView series={series} chartOptions={chartOptions} />;
    case "candlestick":
      return <CandlestickView series={series} chartOptions={chartOptions} />;
    case "histogram":
      return (
        <HistogramView
          series={series as CryptoItem[]}
          chartOptions={chartOptions}
        />
      );
    default:
      return (
        <Alert title="No Matching View" description="Check your view option." />
      );
  }
}
