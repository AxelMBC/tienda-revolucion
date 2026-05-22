import styles from "./components.module.css";
import { Eyebrow } from "./Eyebrow";

type Tone = "ivory" | "ink" | "oxblood";

type RoomProps = {
  tone?: Tone;
  id?: string;
  children: React.ReactNode;
  className?: string;
};

function toneClass(tone: Tone) {
  if (tone === "ink") return styles.roomInk;
  if (tone === "oxblood") return styles.roomOxblood;
  return "";
}

export function Room({
  tone = "ivory",
  id,
  children,
  className = "",
}: RoomProps) {
  const cls = [styles.room, toneClass(tone), className]
    .filter(Boolean)
    .join(" ");
  return (
    <section id={id} className={cls}>
      {children}
    </section>
  );
}

type HeadProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
};

Room.Head = function RoomHead({ eyebrow, title, lede }: HeadProps) {
  return (
    <header className={styles.roomHead}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={styles.roomTitle}>{title}</h2>
      {lede && <p className={styles.roomLede}>{lede}</p>}
    </header>
  );
};
