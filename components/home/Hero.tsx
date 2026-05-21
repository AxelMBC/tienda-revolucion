import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <Image
        src="/Products/camisa-morada.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.heroBg}
      />
      <div className={styles.heroVeil} aria-hidden />

      <div className={styles.heroContent}>
        <Reveal y={12} duration={0.9}>
          <p className={styles.heroKicker}>
            Tienda · de · Ropa — desde 2019 · Tepic, Nay.
          </p>
        </Reveal>

        <Reveal y={20} duration={1.1} delay={0.08}>
          <h1 className={styles.heroTitle}>Revolución</h1>
        </Reveal>

        <Reveal y={16} duration={0.9} delay={0.18}>
          <div className={styles.heroFoot}>
            <p className={styles.heroTagline}>
              Una tienda pequeña en el centro de Tepic.
              <br />
              Ropa para hombre, escogida una por una.
            </p>
            <p className={styles.heroMeta}>
              Lat 21.5041° N
              <br />
              Lon 104.8946° W
            </p>
            <p className={styles.heroMeta}>
              Otoño / Invierno
              <br />
              MMXXVI
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
