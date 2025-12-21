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

export function calibrateNumeral(numeral: string, localeOption?: string) {
  const userLocale = localeOption || getUserLocale();
  const computableNumeral = getComputableNumeral(numeral, userLocale);
  const localizedNumeral = localizeNumeral(computableNumeral, userLocale);
  return localizedNumeral;
}

export const __private_fns__ = {
  getUserLocale,
  getComputableNumeral,
  getSeparators,
  localizeNumeral,
};
// 修改成程式能自由轉換成 number 型別的字串
export function getComputableNumeral(
  numeral: string,
  fromLocale: string = "en-US",
) {
  // 去除不合法字元，只保留 0-9 和小數符號
  const { decimalSign } = getSeparators(fromLocale);
  const invalidCharRegex = new RegExp(`[^0-9${decimalSign}]`, "g");
  let computableNumeral = numeral.replace(invalidCharRegex, "");
  const lastDecimalId = computableNumeral.lastIndexOf(decimalSign);
  // 沒有小數點，代表為整數
  if (lastDecimalId === -1) return computableNumeral;

  const integer = computableNumeral
    .slice(0, lastDecimalId)
    .replace(/[^0-9]/g, "");
  const float = computableNumeral
    .slice(lastDecimalId)
    .replace(decimalSign, ".");
  computableNumeral = `${integer}${float}`;
  return computableNumeral;
}

function getSeparators(fromLocale: string) {
  const sample = 1234.5;
  const localized = sample.toLocaleString(fromLocale);
  const decimalSign = localized.at(-2)!;
  const separator = localized.at(1)!;
  return { decimalSign, separator };
}

function localizeNumeral(amount: string, toLocale: string) {
  // 如果 amount 是 '0000', 仍要回傳 '0000'
  // 方便使用者補上開頭數字，不須從頭輸入所有數字
  if (+amount === 0) {
    const tempAmount = "1" + amount; // 開頭'1'會從回傳字串中移除
    const localizedTempAmount = new Intl.NumberFormat(toLocale, {
      maximumFractionDigits: 2,
      numberingSystem: "latn",
    }).format(+tempAmount);

    return localizedTempAmount.slice(1);
  }

  return new Intl.NumberFormat(toLocale, {
    maximumFractionDigits: 2, // 最多兩位浮點數 (自動四捨五入進位)
    numberingSystem: "latn",
    // trailingZeroDisplay: 'auto' // (default) 自動移除 trailing zeros
  }).format(+amount);
}

function getUserLocale() {
  const hasBrowserLocales =
    navigator.languages && navigator.languages.length > 0;

  if (hasBrowserLocales) return navigator.languages[0];
  return navigator.language || "en-US";
}
