import { Suspense, lazy, useRef, Activity } from "react";
import { CircleFlag } from "react-circle-flags";

const CurrencyMenu = lazy(() => import("../CurrencyMenu"));

type CurrencyInputProps = {
  type: "currency" | "crypto";
  name: string;
  countryCode: string;
  code: string;
  value?: string;
};

export default function CurrencyInput({
  type,
  name,
  code,
  countryCode,
  value = "0.00",
}: CurrencyInputProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const identifier = `${type}-${name}`;

  return (
    <div className="flex flex-col items-center p-2 text-2xl outline outline-black">
      <label
        htmlFor={identifier}
        className="w-full items-center gap-2 font-bold outline"
      >
        <button
          className="flex w-full justify-start gap-4 p-2 outline"
          onClick={() => dialogRef.current?.showModal()}
        >
          <CircleFlag
            className="w-8"
            alt={name}
            countryCode={countryCode.toLowerCase()}
          />
          <span>{code}</span>
        </button>
      </label>
      <input
        className="block w-full min-w-2/3 rounded-sm p-2 outline outline-gray-400 focus:outline-2 focus:outline-gray-500"
        id={identifier}
        type="text"
        inputMode="numeric"
        value={value}
        onChange={() => {}}
      />

      <Suspense fallback="">
        <Activity mode="visible">
          <CurrencyMenu ref={dialogRef} />
        </Activity>
      </Suspense>
    </div>
  );
}
