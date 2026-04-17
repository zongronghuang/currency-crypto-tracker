import dayjs from "dayjs";
import clsx from "clsx";
import { getTagBgColor, getSentimentEmoji } from "../../-helpers";

export type Feed = {
  title: string;
  url: string;
  time_published: string;
  authors: string[];
  summary: string;
  banner_image: string;
  source: string;
  topics: { topic: string }[];
  overall_sentiment_label:
    | "Bearish"
    | "Somewhat-Bearish"
    | "Neutral"
    | "Somewhat-Bullish"
    | "Bullish";
};

const skeletonStyles =
  "relative before:absolute before:content-[' '] before:inset-0 before:bg-gray-300 animate-pulse";

const fallbackBannerImage = "src/assets/news/banner_placeholder.svg";

export default function NewsCard({
  isSkeleton = false,
  feed,
}: {
  isSkeleton?: boolean;
  feed?: Feed;
}) {
  return (
    <article className="overflow-clip rounded-lg border border-solid border-slate-200 bg-white shadow-md shadow-slate-100">
      <figure className="flex w-full flex-col">
        <div className={clsx(isSkeleton && skeletonStyles, "relative h-40")}>
          <img
            className="block h-full w-full object-cover"
            loading="lazy"
            src={feed?.banner_image || fallbackBannerImage}
            alt=""
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = fallbackBannerImage;
            }}
          />
          <aside className="absolute bottom-0 left-0 flex w-full flex-wrap justify-start gap-1 p-0.5">
            {feed?.topics.map((t) => (
              <TopicTag key={t.topic} text={t.topic} />
            ))}
          </aside>
        </div>
        <figcaption className="grow p-2">
          <div
            className={clsx(
              isSkeleton && skeletonStyles,
              "text-xs font-semibold text-gray-500",
            )}
          >
            <time dateTime={feed?.time_published}>
              {dayjs(feed?.time_published).format("YYYY-MM-DD")}
            </time>{" "}
            | <span>{feed?.source}</span>
          </div>

          <h1
            className={clsx(
              isSkeleton && skeletonStyles,
              "mb-2 text-lg leading-snug font-semibold text-slate-900",
            )}
          >
            {feed?.title}
          </h1>

          <p
            className={clsx(
              isSkeleton && skeletonStyles,
              "mb-2 max-h-24 min-h-12 overflow-hidden mask-b-from-50% text-sm leading-snug text-slate-600",
            )}
          >
            {feed?.summary}
          </p>

          <span className="float-left w-fit text-right">
            {getSentimentEmoji(feed?.overall_sentiment_label)}
          </span>
          <a
            className={clsx(
              isSkeleton && skeletonStyles,
              "ml-auto flex w-fit items-center gap-1 text-sm text-blue-600 visited:text-indigo-600 hover:text-blue-700 active:text-blue-800",
            )}
            href={feed?.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            Read More
            <span className="text-lg">&#10162;</span>
          </a>
        </figcaption>
      </figure>
    </article>
  );
}

function TopicTag({ text }: { text: string }) {
  const bgColor = getTagBgColor(text);
  const formattedText = text.replace(/_/g, " ");

  return (
    <span
      className={clsx(
        bgColor,
        "rounded-xs p-0.5 text-xs text-white capitalize",
      )}
    >
      {formattedText}
    </span>
  );
}
