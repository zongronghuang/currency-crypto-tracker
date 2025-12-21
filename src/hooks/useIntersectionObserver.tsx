import { useEffect, type RefObject } from "react";

type IntersectionObserverHookParams = {
  rootRef?: RefObject<Element | null>;
  targetRef: RefObject<Element | null>;
  options?: IntersectionObserverInit;
  onIntersect?: IntersectionObserverCallback;
};

export default function useIntersectionObserver({
  rootRef,
  targetRef,
  options = {},
  onIntersect,
}: IntersectionObserverHookParams) {
  useEffect(() => {
    if (!rootRef || !rootRef.current || !targetRef.current || !onIntersect)
      return;

    const configOptions = {
      root: rootRef.current || document.querySelector("body"),
      rootMargin: "0px",
      scrollMargin: "0px",
      threshold: 0.1,
      ...options,
    };
    const observer = new IntersectionObserver(onIntersect, configOptions);

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [options, targetRef, rootRef, onIntersect]);
}
