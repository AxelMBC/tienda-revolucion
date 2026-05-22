import { Room } from "./Room";
import styles from "./components.module.css";

type Props = {
  mark: string;
  text: string;
  attribution?: string;
};

export function Divider({ mark, text, attribution }: Props) {
  return (
    <Room tone="oxblood">
      <div className={styles.divider}>
        <p className={styles.dividerMark}>
          <span>{mark}</span>
        </p>
        <p className={styles.dividerText}>{text}</p>
        {attribution && <p className={styles.dividerSign}>{attribution}</p>}
      </div>
    </Room>
  );
}
