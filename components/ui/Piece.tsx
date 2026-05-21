import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Piece.module.css";

type Ratio = "tall" | "square" | "wide";

interface PieceProps {
  number: string;
  category: ReactNode;
  sizes: ReactNode;
  title: ReactNode;
  brief?: ReactNode;
  price?: ReactNode;
  image: string;
  alt: string;
  ratio?: Ratio;
  href?: string;
  sizesAttr?: string;
  className?: string;
}

function ratioClass(ratio: Ratio): string {
  if (ratio === "square") return styles.frameSquare;
  if (ratio === "wide") return styles.frameWide;
  return styles.frameTall;
}

export function Piece({
  number,
  category,
  sizes,
  title,
  brief,
  price,
  image,
  alt,
  ratio = "tall",
  href,
  sizesAttr = "(min-width: 600px) 42vw, 100vw",
  className,
}: PieceProps) {
  const wrapperCls = [styles.piece, className].filter(Boolean).join(" ");
  const inner = (
    <>
      <div className={`${styles.frame} ${ratioClass(ratio)}`}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizesAttr}
          className={styles.img}
        />
      </div>
      <p className={styles.caption}>
        <span className={styles.captionNum}>Nº {number}</span>
        <span>{category}</span>
        <span>{sizes}</span>
      </p>
      <h3 className={styles.title}>{title}</h3>
      {brief && <p className={styles.brief}>{brief}</p>}
      {price && <p className={styles.price}>{price}</p>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={wrapperCls}>
        {inner}
      </Link>
    );
  }
  return <article className={wrapperCls}>{inner}</article>;
}
