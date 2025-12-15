import type { ReactNode, RefObject } from "react";
import { z, type ZodType } from "zod";

export function isSearchMatch(
  searchTerm: string,
  optionData: { code: string; name: string },
) {
  return [optionData.code, optionData.name]
    .map((str) => str.toLowerCase())
    .some((str) => str.includes(searchTerm.toLowerCase()));
}

export function sanitizeSearchTerm(term: string) {
  const regex = /[^a-z0-9]/gi;
  return z
    .string()
    .transform((term) => term.replace(regex, ""))
    .parse(term);
}

export function scrollToTop(
  elementRef: RefObject<HTMLElement | null>,
  behavior: "auto" | "instant" | "smooth" = "smooth",
) {
  if (!elementRef.current) return;
  elementRef.current.scrollTo({ top: 0, behavior });
}

const SliceListByPageSchema = z.object({
  list: z.array(z.any()),
  pageSize: z.number().positive().optional(),
  pageNo: z.number().positive().optional(),
});

type SliceListByPageParams = z.infer<typeof SliceListByPageSchema>;

export function sliceListByPage({
  list,
  pageSize = 10,
  pageNo = 1,
}: SliceListByPageParams) {
  // validate params
  const result = SliceListByPageSchema.safeParse({
    list,
    pageSize,
    pageNo,
  });
  if (!result.success) {
    console.error(z.prettifyError(result.error));
    return { pageData: [], maxPageNo: 0, hasMore: false };
  }

  const hasMore = pageSize * pageNo < list.length;
  const maxPageNo =
    Math.floor(list.length / pageSize) + (list.length % pageSize ? 1 : 0);
  const pageData = list.slice((pageNo - 1) * pageSize, pageNo * pageSize);

  return { pageData, maxPageNo, hasMore };
}

/**
 * [NOTE]: It should always apply AFTER all React Hooks.
 * When validation fails, it returns the fallback. This makes any following Hooks conditional and is not allowed in React
 */
export function validateComponentProps(
  schema: ZodType,
  props: object,
  fallback: ReactNode = null,
) {
  const result = schema.safeParse(props);
  if (!result.success) {
    z.prettifyError(result.error);
    return fallback;
  }
}

type LocaleOption =
  | {
      to: string; // source locale
      from: string; // target locale 不同幣別間轉換
    }
  | string; // 'de-DE' 同幣別轉換

export function calibrateNumeral(
  numeral: string,
  localeOption: LocaleOption = "en-US",
) {
  if (typeof localeOption === "string") {
    const safeNumeral = sanitizeNumeral(numeral, localeOption);
    const localizedNumeral = localizeNumeral(safeNumeral, localeOption);

    return localizedNumeral;
  } else {
    const { to: toLocale, from: fromLocale } = localeOption;
    const safeNumeral = sanitizeNumeral(numeral, fromLocale);
    const localizedNumeral = localizeNumeral(safeNumeral, toLocale);

    return localizedNumeral;
  }
}

export const __private_fns__ = {
  sanitizeNumeral,
  getSeparators,
  localizeNumeral,
};
// 修改成程式能自由轉換成 number 型別的字串
function sanitizeNumeral(numeral: string, fromLocale: string) {
  // 去除不合法字元，只保留 0-9 和小數符號
  const { decimalSign } = getSeparators(fromLocale);
  const lastDecimalId = numeral.lastIndexOf(decimalSign);

  const invalidCharRegex = /[^0-9]/g;
  let safeNumeral = numeral.replace(invalidCharRegex, "");
  // 沒有小數點，代表為整數
  if (lastDecimalId === -1) return safeNumeral;

  const integer = numeral.slice(0, lastDecimalId).replace(invalidCharRegex, "");
  const float = numeral.slice(lastDecimalId).replace(invalidCharRegex, "");
  safeNumeral = Number(`${integer}.${float}`).toString();

  return safeNumeral;
}

function getSeparators(fromLocale: string) {
  const sample = 1234.5;
  const localized = sample.toLocaleString(fromLocale);
  const decimalSign = localized.at(-2)!;
  const separator = localized.at(1)!;
  return { decimalSign, separator };
}

function localizeNumeral(amount: string, toLocale: string) {
  return new Intl.NumberFormat(toLocale, {
    maximumFractionDigits: 2, // 最多兩位浮點數 (自動四捨五入進位)
    numberingSystem: "latn",
    // trailingZeroDisplay: 'auto' // (default) 自動移除 trailing zeros
  }).format(+amount);
}
