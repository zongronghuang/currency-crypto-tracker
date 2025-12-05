import { useState, memo } from "react";
import * as z from "zod";
import { CircleFlag } from "react-circle-flags";

const FALLBACK_CRYPTO_ICON = "src/assets/fallback_crypto.svg";

const MenuOptionSchema = z.object({
  isMatch: z.boolean(),
  type: z.enum(["currency", "crypto"]),
  optionData: z.object({
    code: z.string(),
    name: z.string(),
    country_codes: z.array(z.string()).optional(),
  }),
  onClick: z.function(),
});

type MenuOptionProps = z.infer<typeof MenuOptionSchema>;

export const MenuOption = memo(function MenuOption({
  isMatch,
  type,
  optionData,
  onClick,
}: MenuOptionProps) {
  const [cryptoIcon, setCryptoIcon] = useState(
    `src/assets/color/${optionData.code.toLowerCase()}.svg`,
  );

  const result = MenuOptionSchema.safeParse({
    isMatch,
    type,
    optionData,
    onClick,
  });
  if (!result.success) {
    console.error("[MenuOption]", z.prettifyError(result.error));
    return null;
  }

  if (type === "crypto") {
    return (
      <li
        hidden={!isMatch}
        className="peer hover:text-white hover:bg-blue-300  flex justify-start gap-2 font-semibold text-md py-4 items-center"
      >
        <button onClick={onClick} onKeyDown={onClick}>
          <img
            fetchPriority="low"
            src={cryptoIcon}
            alt={optionData.name}
            width="32"
            onError={() => setCryptoIcon(FALLBACK_CRYPTO_ICON)}
          />
          {optionData.code}
        </button>
      </li>
    );
  }

  if (type === "currency") {
    const lowercaseCountryCode = optionData.country_codes![0].toLowerCase();
    return (
      <li
        hidden={!isMatch}
        className="hover:text-white hover:bg-blue-300  flex justify-start gap-4 font-semibold text-lg py-4 items-center"
      >
        <button onClick={onClick} onKeyDown={onClick}>
          <CircleFlag
            fetchPriority="low"
            className="block w-9"
            countryCode={lowercaseCountryCode}
            alt={optionData.name}
            title={optionData.name}
          />
          {optionData.code}
        </button>
      </li>
    );
  }
});
