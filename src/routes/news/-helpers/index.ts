export function getTagBgColor(tag: string) {
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

export function getSentimentEmoji(
  sentiment:
    | undefined
    | "Bearish"
    | "Somewhat-Bearish"
    | "Neutral"
    | "Somewhat-Bullish"
    | "Bullish",
) {
  if (!sentiment) return "";

  const sentimentMap = {
    Bearish: String.fromCodePoint(0x1f641).repeat(2),
    "Somewhat-Bearish": String.fromCodePoint(0x1f641),
    Neutral: "",
    "Somewhat-Bullish": String.fromCodePoint(0x1f60a),
    Bullish: String.fromCodePoint(0x1f60a).repeat(2),
  };
  return sentimentMap[sentiment];
}
