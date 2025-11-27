import z from "zod";

export const calibrateCurrencyInput = (value: string) => {
  let valueInProcess = value;

  // 移除無效字元
  const invalidCharRegex = /[^0-9,.]/gi;
  if (hasInvalidChars(valueInProcess, invalidCharRegex)) {
    valueInProcess = removeInvalidChars(valueInProcess, invalidCharRegex);
  }

  // 取得最長的合法數字
  valueInProcess = getLongestNumber(valueInProcess);

  // 正整數 (例如 200.00)
  if (isNaturalNumber(valueInProcess)) {
    valueInProcess = formatToInteger(valueInProcess);
  }

  // 正小數 (例如 1.12) => 四捨五入至兩位小數
  if (isPositiveDecimal(valueInProcess)) {
    valueInProcess = formatToDecimal(valueInProcess);
  }

  // 移除 trailing zeros (例如 "100.20" => "100.2")
  valueInProcess = removeTrailingZeros(valueInProcess);

  // 轉換成美式寫法
  valueInProcess = formatToUsNumber(valueInProcess);

  return valueInProcess;
};

function hasInvalidChars(value: string, regex: RegExp) {
  const schema = z.string().regex(regex);
  const { success } = schema.safeParse(value);
  return success;
}

function removeInvalidChars(value: string, regex: RegExp) {
  const schema = z
    .string()
    .regex(regex)
    .transform((val) => val.replace(regex, ""));
  return schema.parse(value);
}

function getLongestNumber(value: string) {
  let longestNumber = "";

  for (let i = 0; i < value.length; i++) {
    // 允許小數點開頭數字，例如 '.25' 或 ',25'
    // 轉換為美式寫法
    const decimalSigns = [".", ","];
    const c = value[i];
    if (i === 0 && decimalSigns.includes(c)) {
      longestNumber = "0.";
      continue;
    }

    const nextNumber = longestNumber + c;
    const isValidNumber = !Number.isNaN(+nextNumber);
    if (!isValidNumber) break; // 無法再組成更長的合格數字

    longestNumber = nextNumber;
  }

  return longestNumber;
}

function isNaturalNumber(value: string) {
  const schema = z.coerce.number().nonnegative().int();
  const { success } = schema.safeParse(value);
  return success;
}

function isPositiveDecimal(value: string) {
  const schema = z.coerce.number().positive();
  const { success } = schema.safeParse(value);
  return success;
}

function formatToInteger(value: string) {
  const schema = z.coerce
    .number()
    .int()
    .transform((val) => val.toString());
  return schema.parse(value);
}

function formatToDecimal(value: string) {
  const schema = z.coerce.number().transform((val) => {
    const num = Math.round(val * 100) / 100;
    return num.toFixed(2);
  });
  return schema.parse(value);
}

function formatToUsNumber(value: string) {
  return new Intl.NumberFormat("en-US").format(+value);
}

function removeTrailingZeros(value: string) {
  const schema = z.coerce.number().transform((val) => val.toString());
  return schema.parse(value);
}
