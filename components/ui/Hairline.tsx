import styles from "./Hairline.module.css";

interface HairlineProps {
  bronze?: boolean;
  className?: string;
}

export function Hairline({ bronze = false, className }: HairlineProps) {
  const cls = [styles.hairline, bronze && styles.bronze, className]
    .filter(Boolean)
    .join(" ");
  return <hr className={cls} aria-hidden="true" />;
}
