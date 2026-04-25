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
        "fixed top-1/2 left-1/2 w-max max-w-3/4 -translate-1/2 rounded-lg border border-solid border-slate-300 bg-rose-50 px-4 py-2 text-center text-rose-600",
      )}
    >
      <div className="text-6xl font-bold">
        <span>&#8264;</span>
      </div>
      <figcaption>
        <h1 className="text-lg font-semibold lg:text-2xl">{title}</h1>
        <p className="text-left text-sm lg:text-xl">{description}</p>
      </figcaption>
    </figure>
  );
}
