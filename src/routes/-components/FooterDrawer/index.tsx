import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./index.module.css";

type FooterDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};
export default function FooterDrawer({
  open,
  onClose,
  children,
}: FooterDrawerProps) {
  useEffect(() => {
    if (open) document.body.style.overflowY = "clip";
    return () => {
      document.body.style.removeProperty("overflow-y");
    };
  }, [open]);

  return createPortal(
    <div className={clsx(open && "open", styles.footerDrawerBackdrop)}>
      <button
        className={styles.footerDrawerCloseBtn}
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      ></button>
      <div className={clsx(open && "open", styles.footerDrawerContainer)}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
