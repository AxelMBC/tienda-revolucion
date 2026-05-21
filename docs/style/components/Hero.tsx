// Hero.tsx
// Full-bleed hero. Photograph as atmosphere (filtered, veiled).
// Wordmark pattern for Tienda de Ropa Revolución:
//   kicker: "Tienda · de · Ropa" (mono)
//   title:  "Revolución"         (italic serif, massive)
//
// Usage:
//   <Hero
//     image="/img/hero.jpg"
//     kicker="Tienda · de · Ropa"
//     title="Revolución"
//     tagline="Una tienda pequeña en el centro de Tepic. Ropa para hombre, escogida una por una."
//     season="Otoño / Invierno MMXXVI"
//   />

import styles from './components.module.css';

type Props = {
  image: string;
  kicker: string;
  title: string;
  tagline: string;
  /** Coordinates line on the right side of the foot. Optional. */
  coordinates?: string;
  /** Season / issue line on the far right. Optional. */
  season?: string;
};

export function Hero({ image, kicker, title, tagline, coordinates, season }: Props) {
  return (
    <section className={styles.hero} id="top">
      <div
        className={styles.heroBg}
        style={{ backgroundImage: `url("${image}")` }}
        aria-hidden="true"
      />
      <div className={styles.heroVeil} aria-hidden="true" />

      <div className={styles.heroContent}>
        <p className={styles.heroKicker}>{kicker}</p>

        <h1 className={styles.heroTitle}>{title}</h1>

        <div className={styles.heroFoot}>
          <p className={styles.heroTagline}>{tagline}</p>
          {coordinates && <p className={styles.heroMeta}>{coordinates}</p>}
          {season && <p className={styles.heroMeta}>{season}</p>}
        </div>
      </div>
    </section>
  );
}
