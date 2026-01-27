import dayjs from "dayjs";
import clsx from "clsx";

export type Feed = {
  title: string;
  url: string;
  time_published: string;
  authors: string[];
  summary: string;
  banner_image: string;
  source: string;
  topics: { topic: string }[];
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
    <article className="mx-auto w-11/12 overflow-clip rounded-lg shadow-md shadow-gray-400">
      <figure className="flex w-full flex-col">
        <div className={clsx(isSkeleton && skeletonStyles, "relative h-40")}>
          <img
            className="block h-full w-full object-cover"
            loading="lazy"
            src={feed?.banner_image || fallbackBannerImage}
            alt=""
            onError={(event) => {
              const image = event.target as HTMLImageElement;
              image.src = fallbackBannerImage;
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
              "text-xs font-bold text-gray-500",
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
              "mb-2 text-lg leading-snug font-semibold",
            )}
          >
            {feed?.title}
          </h1>

          <p
            className={clsx(
              isSkeleton && skeletonStyles,
              "relative max-h-24 min-h-12 overflow-hidden mask-b-from-50% text-sm leading-snug",
            )}
          >
            {feed?.summary}
          </p>

          <a
            className={clsx(
              isSkeleton && skeletonStyles,
              "ml-auto flex w-fit items-center gap-1 text-sm text-blue-500",
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

function getTagBgColor(tag: string) {
  switch (tag) {
    case "life_sciences":
    case "energy_transportation":
    case "technology":
      return "bg-green-600/90";

    case "financial_markets":
    case "economy_fiscal":
    case "economy_monetary":
    case "economy_macro":
    case "finance":
      return "bg-blue-600/90";

    case "mergers_and_acquisitions":
    case "manufacturing":
    case "retail_wholesale":
    case "real_estate":
      return "bg-stone-600/90";

    case "earnings":
    case "ipo":
    case "blockchain":
      return "bg-yellow-600/90";

    default:
      return "text-neutral-600/90";
  }
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
