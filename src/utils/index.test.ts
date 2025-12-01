import { calibrateNumeral, __private_fns__ } from ".";

describe("calibrateNumeral()", () => {
  test("remove decimals from integers", () => {
    const integers = ["100", "100.0", "100.00", "100.000"];
    integers.forEach((integer) => {
      const result = calibrateNumeral(integer);
      expect(result).toBe("100");
    });
  });

  test("round decimals to the second decimal place", () => {
    const decimal1 = "100.114";
    expect(calibrateNumeral(decimal1)).toBe("100.11");

    const decimal2 = "100.115";
    expect(calibrateNumeral(decimal2)).toBe("100.12");

    const decimal3 = "100.119";
    expect(calibrateNumeral(decimal3)).toBe("100.12");
  });

  test("remove invalid special characters from input", () => {
    const invalidSpecialChars = [
      "!",
      '"',
      "#",
      "$",
      "%",
      "&",
      "'",
      "(",
      ")",
      "*",
      "+",
      "-",
      "/",
      ":",
      ";",
      "<",
      "=",
      ">",
      "?",
      "@",
      "[",
      "\\",
      "]",
      "^",
      "_",
      "`",
      "{",
      "|",
      "}",
      "~",
    ];

    invalidSpecialChars.forEach((char) => {
      expect(calibrateNumeral(char + "100")).toBe("100");

      expect(calibrateNumeral("100" + char)).toBe("100");

      expect(calibrateNumeral(`1${char}00`)).toBe("100");

      expect(calibrateNumeral(`100.${char}1`)).toBe("100.1");

      expect(calibrateNumeral(`100.1${char}`)).toBe("100.1");
    });
  });

  test("remove alphabet from input", () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    alphabet.forEach((letter) => {
      expect(calibrateNumeral(letter + "100")).toBe("100");

      expect(calibrateNumeral("100" + letter)).toBe("100");

      expect(calibrateNumeral(`1${letter}00`)).toBe("100");

      expect(calibrateNumeral(`100.${letter}1`)).toBe("100.1");

      expect(calibrateNumeral(`100.1${letter}`)).toBe("100.1");
    });

    const upperCaseAlphabet = alphabet.map((letter) => letter.toUpperCase());
    upperCaseAlphabet.forEach((letter) => {
      expect(calibrateNumeral(letter + "100")).toBe("100");

      expect(calibrateNumeral("100" + letter)).toBe("100");

      expect(calibrateNumeral(`1${letter}00`)).toBe("100");

      expect(calibrateNumeral(`100.${letter}1`)).toBe("100.1");

      expect(calibrateNumeral(`100.1${letter}`)).toBe("100.1");
    });
  });

  test("convert US numbers to US numbers with locale option string", () => {
    const locale = "en-US";

    const validNumber1 = "0.2";
    expect(calibrateNumeral(validNumber1, locale)).toBe("0.2");

    const validNumber2 = "1,000.00";
    expect(calibrateNumeral(validNumber2, locale)).toBe("1,000");

    const validNumber3 = "1000";
    expect(calibrateNumeral(validNumber3, locale)).toBe("1,000");

    const validNumber4 = "1,000,000.00";
    expect(calibrateNumeral(validNumber4, locale)).toBe("1,000,000");

    const validNumber5 = "1000000";
    expect(calibrateNumeral(validNumber5, locale)).toBe("1,000,000");
  });

  test("convert US numbers to US numbers without locale option", () => {
    const validNumber1 = "0.2";
    expect(calibrateNumeral(validNumber1)).toBe("0.2");

    const validNumber2 = "1,000.00";
    expect(calibrateNumeral(validNumber2)).toBe("1,000");

    const validNumber3 = "1000";
    expect(calibrateNumeral(validNumber3)).toBe("1,000");

    const validNumber4 = "1,000,000.00";
    expect(calibrateNumeral(validNumber4)).toBe("1,000,000");

    const validNumber5 = "1000000";
    expect(calibrateNumeral(validNumber5)).toBe("1,000,000");
  });

  test("convert EU numbers to EU numbers with locale option string", () => {
    const locale = "de-DE";

    const validNumber1 = "0,2";
    expect(calibrateNumeral(validNumber1, locale)).toBe("0,2");

    const validNumber2 = "1.000,00";
    expect(calibrateNumeral(validNumber2, locale)).toBe("1.000");

    const validNumber3 = "1000";
    expect(calibrateNumeral(validNumber3, locale)).toBe("1.000");

    const validNumber4 = "1.000.000,00";
    expect(calibrateNumeral(validNumber4, locale)).toBe("1.000.000");

    const validNumber5 = "1000000";
    expect(calibrateNumeral(validNumber5, locale)).toBe("1.000.000");
  });

  test("convert US numbers to US numbers with locale option object", () => {
    const validNumber1 = "0.2";
    const locales = {
      to: "en-US",
      from: "en-US",
    };

    expect(calibrateNumeral(validNumber1, locales)).toBe("0.2");

    const validNumber2 = "1,000.00";
    expect(calibrateNumeral(validNumber2, locales)).toBe("1,000");

    const validNumber3 = "1000";
    expect(calibrateNumeral(validNumber3, locales)).toBe("1,000");

    const validNumber4 = "1,000,000.00";
    expect(calibrateNumeral(validNumber4, locales)).toBe("1,000,000");

    const validNumber5 = "1000000";
    expect(calibrateNumeral(validNumber5, locales)).toBe("1,000,000");
  });

  test("convert EU numbers to EU numbers with locale option object", () => {
    const locales = {
      to: "de-DE",
      from: "de-DE",
    };

    const validNumber1 = "0,2";
    expect(calibrateNumeral(validNumber1, locales)).toBe("0,2");

    const validNumber2 = "1.000,00";
    expect(calibrateNumeral(validNumber2, locales)).toBe("1.000");

    const validNumber3 = "1000";
    expect(calibrateNumeral(validNumber3, locales)).toBe("1.000");

    const validNumber4 = "1.000.000,00";
    expect(calibrateNumeral(validNumber4, locales)).toBe("1.000.000");

    const validNumber5 = "1000000";
    expect(calibrateNumeral(validNumber5, locales)).toBe("1.000.000");
  });

  test("convert US numbers to EU numbers with locale option object", () => {
    const locales = {
      from: "en-US",
      to: "de-DE",
    };

    const validNumber1 = "0.2";
    expect(calibrateNumeral(validNumber1, locales)).toBe("0,2");

    const validNumber2 = "1,000.00";
    expect(calibrateNumeral(validNumber2, locales)).toBe("1.000");

    const validNumber3 = "1000";
    expect(calibrateNumeral(validNumber3, locales)).toBe("1.000");

    const validNumber4 = "1,000,000.00";
    expect(calibrateNumeral(validNumber4, locales)).toBe("1.000.000");

    const validNumber5 = "1000000";
    expect(calibrateNumeral(validNumber5, locales)).toBe("1.000.000");
  });

  test("convert EU numbers to US numbers with local option object", () => {
    const locales = {
      from: "de-DE",
      to: "en-US",
    };

    const validNumber1 = "0,2";
    expect(calibrateNumeral(validNumber1, locales)).toBe("0.2");

    const validNumber2 = "1.000,00";
    expect(calibrateNumeral(validNumber2, locales)).toBe("1,000");

    const validNumber3 = "1000";
    expect(calibrateNumeral(validNumber3, locales)).toBe("1,000");

    const validNumber4 = "1.000.000,00";
    expect(calibrateNumeral(validNumber4, locales)).toBe("1,000,000");

    const validNumber5 = "1000000";
    expect(calibrateNumeral(validNumber5, locales)).toBe("1,000,000");
  });
});

describe("__private_fns__", () => {
  test("sanitizeNumeral()", () => {
    const { sanitizeNumeral } = __private_fns__;
    const usLocale = "en-US";
    const euLocale = "de-DE";

    // 正常數字轉換
    const numeral1 = "1,234.567";
    expect(sanitizeNumeral(numeral1, usLocale)).toBe("1234.567");

    const numeral2 = "1.234,567";
    expect(sanitizeNumeral(numeral2, euLocale)).toBe("1234.567");

    // 移除不同位數的不合法字元
    const numeral3 = "@,2!4.a-&";
    expect(sanitizeNumeral(numeral3, usLocale)).toBe("24");

    const numeral4 = "@.2!4,a-&";
    expect(sanitizeNumeral(numeral4, euLocale)).toBe("24");

    const numeral5 = "@,2!4.a-7";
    expect(sanitizeNumeral(numeral5, usLocale)).toBe("24.7");

    const numeral6 = "@.2!4,a-7";
    expect(sanitizeNumeral(numeral6, euLocale)).toBe("24.7");

    const numeral7 = "@,=!#.a-7";
    expect(sanitizeNumeral(numeral7, usLocale)).toBe("0.7");

    const numeral8 = "@.=!#,a-7";
    expect(sanitizeNumeral(numeral8, euLocale)).toBe("0.7");
  });

  test("getSeparators()", () => {
    const { getSeparators } = __private_fns__;

    const usLocale = "en-US";
    expect(getSeparators(usLocale)).toEqual({
      decimalSign: ".",
      separator: ",",
    });

    const deLocale = "de-DE";
    expect(getSeparators(deLocale)).toEqual({
      decimalSign: ",",
      separator: ".",
    });

    const chLocale = "de-CH"; // 瑞士
    expect(getSeparators(chLocale)).toEqual({
      decimalSign: ".",
      separator: "\u2019", // "’"
    });

    const uaeLocale = "ar-AE";
    expect(getSeparators(uaeLocale)).toEqual({
      decimalSign: ".",
      separator: ",",
    });
  });

  test("localizeNumeral()", () => {
    const { localizeNumeral } = __private_fns__;
    const usLocale = "en-US";
    const euLocale = "de-DE";

    // 同一數字轉換成不同格式
    const numeral1 = "1234.56";
    expect(localizeNumeral(numeral1, usLocale)).toBe("1,234.56");
    expect(localizeNumeral(numeral1, euLocale)).toBe("1.234,56");

    // 四捨五入至小數點第二位
    const numeral2 = "1234.567";
    expect(localizeNumeral(numeral2, usLocale)).toBe("1,234.57");
    expect(localizeNumeral(numeral2, euLocale)).toBe("1.234,57");

    // 小數點後 0 移除
    const numeral3 = "1234.599";
    expect(localizeNumeral(numeral3, usLocale)).toBe("1,234.6");
    expect(localizeNumeral(numeral3, euLocale)).toBe("1.234,6");

    const numeral4 = "1234.999";
    expect(localizeNumeral(numeral4, usLocale)).toBe("1,235");
    expect(localizeNumeral(numeral4, euLocale)).toBe("1.235");
  });
});
