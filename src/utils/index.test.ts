import { calibrateNumeral } from ".";

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
