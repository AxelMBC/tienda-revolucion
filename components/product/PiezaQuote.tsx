import { Reveal } from "@/components/ui/Reveal";
import type { ProductQuote } from "@/lib/types";
import styles from "./PiezaQuote.module.css";

interface PiezaQuoteProps {
  quote: ProductQuote;
}

export function PiezaQuote({ quote }: PiezaQuoteProps) {
  return (
    <section className={`${styles.room} room--oxblood`}>
      <Reveal y={28} duration={1.2} className={styles.inner}>
        <p className={styles.mark}>
          <span>{quote.mark}</span>
        </p>
        <p className={styles.text}>{quote.text}</p>
        <p className={styles.attribution}>{quote.attribution}</p>
      </Reveal>
    </section>
  );
}
