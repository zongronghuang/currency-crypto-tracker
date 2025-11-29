type LocaleOptions = {
  to: string; // source locale
  from: string; // target locale
};

export const calibrateNumeral = (
  numeral: string,
  locales: LocaleOptions = {
    to: "en-US",
    from: "en-US",
  },
) => {
  const { to: toLocale, from: fromLocale } = locales;
  const safeNumeral = sanitizeNumeral(numeral, fromLocale);

  const localizedNumeral = localizeNumeral(safeNumeral, toLocale);
  return localizedNumeral;
};

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
  safeNumeral = `${integer}.${float}`;

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
