import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import styles from "./Room.module.css";

type Tone = "ivory" | "ink" | "oxblood";

interface RoomProps {
  tone?: Tone;
  id?: string;
  className?: string;
  compactTop?: boolean;
  children: ReactNode;
}

function toneClass(tone: Tone): string {
  if (tone === "ink") return "room--ink";
  if (tone === "oxblood") return "room--oxblood";
  return "";
}

export function Room({
  tone = "ivory",
  id,
  className,
  compactTop = false,
  children,
}: RoomProps) {
  const cls = [
    styles.room,
    compactTop && styles.compactTop,
    toneClass(tone),
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <section id={id} className={cls}>
      <div className={styles.container}>{children}</div>
    </section>
  );
}

interface HeadProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
}

function Head({ eyebrow, title, lede }: HeadProps) {
  return (
    <header className={styles.head}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={styles.title}>{title}</h2>
      {lede && <p className={styles.lede}>{lede}</p>}
    </header>
  );
}

Room.Head = Head;
