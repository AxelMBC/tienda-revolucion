// Eyebrow.tsx
// The small uppercase mono label above every section heading.
//
// Usage:
//   <Eyebrow>Las piezas · Selección OI 26</Eyebrow>

import styles from './components.module.css';

type Props = {
  children: React.ReactNode;
  /** Hide the bronze dot prefix. Default false. */
  bare?: boolean;
};

export function Eyebrow({ children, bare = false }: Props) {
  return (
    <p className={styles.eyebrow}>
      {!bare && <span className={styles.eyebrowDot} aria-hidden="true" />}
      <span>{children}</span>
    </p>
  );
}
