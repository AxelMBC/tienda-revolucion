"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./PiezaMedia.module.css";

interface PiezaMediaProps {
  number: string;
  numberCaption: string;
  edition?: string;
  images: string[];
  imageLabels: string[];
  alt: string;
}

export function PiezaMedia({
  number,
  numberCaption,
  edition,
  images,
  imageLabels,
  alt,
}: PiezaMediaProps) {
  const [active, setActive] = useState(0);

  const slots = Array.from({ length: 4 }, (_, i) => ({
    src: images[i],
    label: imageLabels[i] ?? `Vista ${i + 1}`,
    filled: Boolean(images[i]),
  }));

  const activeLabel = slots[active]?.label ?? imageLabels[0] ?? "Vista frontal";

  return (
    <div className={styles.media}>
      <div className={styles.frame}>
        <Image
          src={images[active] ?? images[0]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1100px) 50vw, 100vw"
          className={styles.img}
        />
        <p className={styles.numberOverlay}>{number}</p>
        {edition && <p className={styles.editionOverlay}>{edition}</p>}
      </div>

      <p className={styles.caption}>
        <span>
          {numberCaption} · {activeLabel.toLowerCase()}
        </span>
        <span className={styles.captionCount}>
          <em>{active + 1}</em> de 4
        </span>
      </p>

      <div className={styles.thumbs}>
        {slots.map((slot, i) =>
          slot.filled ? (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ""}`}
              aria-label={`Ver ${slot.label.toLowerCase()}`}
              aria-current={i === active}
            >
              <Image
                src={slot.src!}
                alt=""
                fill
                sizes="120px"
                className={styles.thumbImg}
              />
            </button>
          ) : (
            <div
              key={i}
              className={styles.thumbEmpty}
              role="img"
              aria-label={`${slot.label} — fotografía pendiente`}
            >
              <p className={styles.thumbEmptyLabel}>{slot.label}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
