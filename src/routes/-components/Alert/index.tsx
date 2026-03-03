import clsx from "clsx";
import styles from "./index.module.css";

export default function Alert({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <figure
      role="alert"
      className={clsx(
        styles.alert,
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
