// Divider.tsx
// The oxblood "room change" — a single italic pull-quote between rooms.
// Use sparingly. Never more than one per page.
//
// Usage:
//   <Divider
//     mark="Sala dos"
//     text="Una tienda no se mide por el surtido, sino por las piezas que decide no traer."
//     attribution="— Nota colgada en la pared del probador"
//   />

import { Room } from './Room';
import styles from './components.module.css';

type Props = {
  mark: string;
  text: string;
  attribution?: string;
};

export function Divider({ mark, text, attribution }: Props) {
  return (
    <Room tone="oxblood">
      <div className={styles.divider}>
        <p className={styles.dividerMark}><span>{mark}</span></p>
        <p className={styles.dividerText}>{text}</p>
        {attribution && <p className={styles.dividerSign}>{attribution}</p>}
      </div>
    </Room>
  );
}
