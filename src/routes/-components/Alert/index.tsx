import { useState, useEffect } from "react";
import clsx from "clsx";

export default function Alert({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  return (
    <figure
      role="alert"
      className={clsx(
        !isVisible && "invisible",
        "fixed top-1/2 left-1/2 w-max max-w-3/4 -translate-1/2 rounded-lg border border-solid border-red-600 px-4 py-2 text-center text-gray-600",
      )}
    >
      <div className="text-6xl font-bold">
        <span>&#8264;</span>
      </div>
      <figcaption>
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-left text-sm text-black">{description}</p>
      </figcaption>
    </figure>
  );
}
