import type { ReactNode } from "react";
import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  children: ReactNode;
  bare?: boolean;
  className?: string;
}

export function Eyebrow({ children, bare = false, className }: EyebrowProps) {
  const cls = className ? `${styles.eyebrow} ${className}` : styles.eyebrow;
  return (
    <p className={cls}>
      {!bare && <span className={styles.dot} aria-hidden="true" />}
      <span>{children}</span>
    </p>
  );
}
