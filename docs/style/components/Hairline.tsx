// Hairline.tsx
// A 1px rule used everywhere separation is needed. Two variants:
// - default: var(--rule), reads as a quiet divider
// - bronze:  var(--bronze) at 0.55 opacity, reads as an accent

import styles from './components.module.css';

type Props = {
  variant?: 'default' | 'bronze';
  className?: string;
};

export function Hairline({ variant = 'default', className = '' }: Props) {
  const cls = [
    styles.hairline,
    variant === 'bronze' ? styles.hairlineBronze : '',
    className,
  ].filter(Boolean).join(' ');
  return <hr className={cls} />;
}
