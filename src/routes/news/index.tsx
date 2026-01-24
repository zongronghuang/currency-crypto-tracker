import { Activity, Suspense, useState, lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { z } from "zod";
import dayjs from "dayjs";
import { getNews, type GetNewsParams } from "@/apis";
import NewsCard, { type Feed } from "./-components/NewsCard";
import FooterBar from "../-components/FooterBar";
import FooterDrawer from "../-components/FooterDrawer";
import { FIAT_NAMES } from "@/constants/fiat-currency-list";
import { CRYPTO_NAMES } from "@/constants/crypto-currency-list";
import styles from "./index.module.css";

const NewsFilters = lazy(() => import("./-components/NewsFilters"));

const NewsSearchSchema = z.object({
  currency: z
    .array(z.enum([...FIAT_NAMES, ...CRYPTO_NAMES]))
    .min(2)
    .max(3)
    .or(z.enum([...FIAT_NAMES, ...CRYPTO_NAMES]).optional()),
});

export const Route = createFileRoute("/news/")({
  component: RouteComponent,
  validateSearch: NewsSearchSchema,
});

function RouteComponent() {
  const { currency } = Route.useSearch();

  const defaultFilters: GetNewsParams = {
    tickers: ["BTC", "USD"],
    sort: "LATEST",
    topics: [],
    limit: 50,
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  };
  if (typeof currency === "string") defaultFilters.tickers = [currency];
  if (Array.isArray(currency)) defaultFilters.tickers = currency;

  const [filters, setFilters] = useState({ ...defaultFilters });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data, isPending } = useQuery({
    queryKey: ["news", filters],
    queryFn: () => getNews(filters),
  });

  return (
    <div className={clsx(styles.list)}>
      {isPending && (
        <p className="absolute top-1/2 left-1/2 z-10 text-2xl">Pending</p>
      )}

      {!isPending &&
        data.feed
          .slice(0, 5)
          .map((f: Feed) => <NewsCard key={f.title} feed={f} />)}

      <FooterBar>
        <div className="text-center">
          <button
            onClick={(event) => {
              event.stopPropagation();
              setIsDrawerOpen(true);
            }}
          >
            Set News Filters
          </button>
        </div>
      </FooterBar>

      <FooterDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Suspense>
          <Activity mode="visible">
            <NewsFilters filters={filters} setFilters={setFilters} />
          </Activity>
        </Suspense>
      </FooterDrawer>
    </div>
  );
}
