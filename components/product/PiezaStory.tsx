import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { ProductStory } from "@/lib/types";
import styles from "./PiezaStory.module.css";

interface PiezaStoryProps {
  story: ProductStory;
}

export function PiezaStory({ story }: PiezaStoryProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal y={28} duration={1.2} className={styles.head}>
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <h2 className={styles.heading}>{story.heading}</h2>
        </Reveal>

        <Reveal y={28} duration={1.2} delay={0.1} className={styles.body}>
          <p className={styles.bodyLede}>{story.lede}</p>
          {story.paragraphs.map((p, i) => (
            <p key={i} className={styles.bodyPara}>
              {p}
            </p>
          ))}
          <p className={styles.signature}>{story.author}</p>
        </Reveal>
      </div>
    </section>
  );
}
