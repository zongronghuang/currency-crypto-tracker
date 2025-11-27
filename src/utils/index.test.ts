import { calibrateCurrencyInput } from ".";

describe("calibrateCurrencyInput()", () => {
  test("remove decimals from integers", () => {
    const integers = ["100", "100.0", "100.00", "100.000"];
    integers.forEach((integer) => {
      const result = calibrateCurrencyInput(integer);
      expect(result).toBe("100");
    });
  });

  test("round decimals to the second decimal place", () => {
    const decimal1 = "100.114";
    expect(calibrateCurrencyInput(decimal1)).toBe("100.11");

    const decimal2 = "100.115";
    expect(calibrateCurrencyInput(decimal2)).toBe("100.12");

    const decimal3 = "100.119";
    expect(calibrateCurrencyInput(decimal3)).toBe("100.12");
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
      expect(calibrateCurrencyInput(char + "100")).toBe("100");

      expect(calibrateCurrencyInput("100" + char)).toBe("100");

      expect(calibrateCurrencyInput(`1${char}00`)).toBe("100");

      expect(calibrateCurrencyInput(`100.${char}1`)).toBe("100.1");

      expect(calibrateCurrencyInput(`100.1${char}`)).toBe("100.1");
    });
  });

  test("remove alphabet from input", () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    alphabet.forEach((letter) => {
      expect(calibrateCurrencyInput(letter + "100")).toBe("100");

      expect(calibrateCurrencyInput("100" + letter)).toBe("100");

      expect(calibrateCurrencyInput(`1${letter}00`)).toBe("100");

      expect(calibrateCurrencyInput(`100.${letter}1`)).toBe("100.1");

      expect(calibrateCurrencyInput(`100.1${letter}`)).toBe("100.1");
    });

    const upperCaseAlphabet = alphabet.map((letter) => letter.toUpperCase());
    upperCaseAlphabet.forEach((letter) => {
      expect(calibrateCurrencyInput(letter + "100")).toBe("100");

      expect(calibrateCurrencyInput("100" + letter)).toBe("100");

      expect(calibrateCurrencyInput(`1${letter}00`)).toBe("100");

      expect(calibrateCurrencyInput(`100.${letter}1`)).toBe("100.1");

      expect(calibrateCurrencyInput(`100.1${letter}`)).toBe("100.1");
    });
  });

  test("accepts number inputs in the US format", () => {
    const validNumbers = ["0.2", "1,000.00", "1000", "1,000,000.00", "1000000"];

    validNumbers.forEach((num) => {
      const result = calibrateCurrencyInput(num);
      expect(result).toBeTypeOf("string");
      expect(result).not.toHaveLength(0);
    });
  });

  test("accepts number inputs in the EU format", () => {
    const validNumbers = ["0,2", "1.000,00", "1000", "1.000.000,00", "1000000"];

    validNumbers.forEach((num) => {
      const result = calibrateCurrencyInput(num);
      expect(result).toBeTypeOf("string");
      expect(result).not.toHaveLength(0);
    });
  });
});
