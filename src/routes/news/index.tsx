import { Activity, Suspense, useState, useRef, lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { z } from "zod";
import dayjs from "dayjs";
import { getNews, type NewsFilters } from "@/apis";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import NewsCard, { type Feed } from "./-components/NewsCard";
import FooterBar from "../-components/FooterBar";
import FooterDrawer from "../-components/FooterDrawer";
import { FIAT_NAMES } from "@/constants/fiat-currency-list";
import { CRYPTO_NAMES } from "@/constants/crypto-currency-list";
import { sliceListByPage } from "@/utils";
import styles from "./index.module.css";

const NewsFilters = lazy(() => import("./-components/NewsFilters"));

const NewsSearchSchema = z.object({
  currency: z
    .array(z.enum([...FIAT_NAMES, ...CRYPTO_NAMES]))
    .min(2)
    .max(3)
    .or(z.enum([...FIAT_NAMES, ...CRYPTO_NAMES]).optional()),
});

type NewsCollection = {
  news: Feed[];
  pageNo: number;
  hasMore: boolean;
};

export const Route = createFileRoute("/news/")({
  component: RouteComponent,
  validateSearch: NewsSearchSchema,
});

function RouteComponent() {
  const { currency } = Route.useSearch();

  const defaultFilters: NewsFilters = {
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    tickers: ["BTC", "USD"],
    topics: [],
    sort: "LATEST",
    limit: 50,
  };
  if (typeof currency === "string") defaultFilters.tickers = [currency];
  if (Array.isArray(currency)) defaultFilters.tickers = currency;

  const [filters, setFilters] = useState({ ...defaultFilters });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["news", filters],
    queryFn: () => getNews(filters),
  });

  const [newsCollection, setNewsCollection] = useState<NewsCollection>({
    news: [],
    pageNo: 1,
    hasMore: true,
  });
  const targetRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver({
    rootRef,
    targetRef,
    onIntersect: ([entry]) => {
      if (!entry.isIntersecting || !newsCollection.hasMore || !isSuccess)
        return;

      const { pageData, hasMore } = sliceListByPage({
        list: data.feed,
        pageNo: newsCollection.pageNo,
      });

      setNewsCollection((prev) => ({
        pageNo: prev.pageNo + 1,
        news: [...prev.news, ...pageData],
        hasMore,
      }));

      if (!hasMore) targetRef.current?.classList.remove("invisible");
    },
  });

  return (
    <div
      aria-label="news list"
      ref={rootRef}
      onScroll={(event) => {
        const list = event.target as HTMLDivElement;
        const isScrolling = list.scrollTop! > 0;
        setIsBackButtonVisible(isScrolling);
      }}
      className={clsx(styles.list, "no-scrollbar h-dvh overflow-y-scroll pt-5")}
    >
      {isLoading ? (
        <>
          <NewsCard isSkeleton={true} />
          <NewsCard isSkeleton={true} />
          <NewsCard isSkeleton={true} />
        </>
      ) : (
        newsCollection.news.map((f: Feed) => (
          <NewsCard key={f.title} feed={f} />
        ))
      )}

      <div ref={targetRef} className="invisible mt-1 text-center opacity-50">
        <small>No more results</small>
      </div>

      <button
        aria-label="back to top"
        hidden={!isBackButtonVisible}
        onClick={() =>
          rootRef.current?.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="fixed right-2 bottom-15 z-15 h-10 w-10 -rotate-90 rounded-full bg-blue-500 text-3xl font-bold text-white shadow-[0_0_3px_2px_rgba(200,200,200,0.5)]"
      >
        &#10132;
      </button>

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
            <NewsFilters
              filters={filters}
              setFilters={setFilters}
              onClose={() => setIsDrawerOpen(false)}
            />
          </Activity>
        </Suspense>
      </FooterDrawer>
    </div>
  );
}
