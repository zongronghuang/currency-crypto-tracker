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

export default function NewsCard({ feed }: { feed: Feed }) {
  return (
    <article className="overflow-clip rounded-lg shadow-md shadow-gray-400">
      <figure className="flex w-full flex-col outline-red-500">
        <div className="relative h-40">
          <img
            className="block h-full w-full object-cover"
            loading="lazy"
            src={feed.banner_image}
            alt=""
          />
          <aside className="absolute bottom-0 left-0 flex w-full flex-wrap justify-start gap-1 p-0.5">
            {feed.topics.map((t) => (
              <TopicTag key={t.topic} text={t.topic} />
            ))}
          </aside>
        </div>
        <figcaption className="grow p-2">
          <div className="text-xs font-bold text-gray-500">
            <time dateTime={feed.time_published}>
              {dayjs(feed.time_published).format("YYYY-MM-DD")}
            </time>{" "}
            | <span>{feed.source}</span>
          </div>

          <h1 className="mb-2 leading-snug font-semibold">{feed.title}</h1>

          <p className="relative max-h-24 overflow-hidden mask-b-from-50% text-sm leading-snug">
            {feed.summary}
          </p>

          <a
            className="ml-auto flex w-fit items-center gap-1 text-sm text-blue-500"
            href={feed.url}
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
      return "bg-green-600/80";

    case "financial_markets":
    case "economy_fiscal":
    case "economy_monetary":
    case "economy_macro":
    case "finance":
      return "bg-blue-600/80";

    case "mergers_and_acquisitions":
    case "manufacturing":
    case "retail_wholesale":
    case "real_estate":
      return "bg-red-600/80";

    case "earnings":
    case "ipo":
    case "blockchain":
      return "bg-[#b8860b]/80";
    default:
      return "text-neutral-600/80";
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
