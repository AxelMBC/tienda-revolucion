// Piece.tsx
// A single gallery item — the product card pattern for this site.
// Numbered, captioned in mono, titled in italic serif, brief in sans 300.
//
// Usage:
//   <Piece
//     number="01"
//     category="Camisa · Seda jacquard"
//     sizes="S — XL"
//     title="Morada, para la noche larga"
//     brief="Seda con relieve geométrico. Cae pesada, suelta bien."
//     price="$1,890 mxn"
//     image="/img/02-morada.png"
//     alt="Camisa de seda morada"
//     ratio="tall"
//   />

import styles from './components.module.css';

type Props = {
  number: string;
  category: string;
  sizes: string;
  title: string;
  brief?: string;
  price?: string;
  image: string;
  alt: string;
  ratio?: 'tall' | 'square' | 'wide';
  /** Optional href — wraps the piece in a link if set. */
  href?: string;
};

function ratioClass(r: Props['ratio']) {
  if (r === 'square') return styles.pieceFrameSquare;
  if (r === 'wide') return styles.pieceFrameWide;
  return styles.pieceFrameTall; // default
}

export function Piece({
  number, category, sizes, title, brief, price, image, alt, ratio = 'tall', href,
}: Props) {
  const inner = (
    <>
      <div className={`${styles.pieceFrame} ${ratioClass(ratio)}`}>
        {/* If you're using next/image, swap this for <Image> with fill */}
        <img className={styles.pieceImg} src={image} alt={alt} loading="lazy" />
      </div>
      <div className={styles.pieceCaption}>
        <span className={styles.pieceCaptionNum}>Nº {number}</span>
        <span>{category}</span>
        <span>{sizes}</span>
      </div>
      <h3 className={styles.pieceTitle}>{title}</h3>
      {brief && <p className={styles.pieceBrief}>{brief}</p>}
      {price && <p className={styles.piecePrice}>{price}</p>}
    </>
  );

  if (href) {
    return (
      <a className={styles.piece} href={href}>
        {inner}
      </a>
    );
  }
  return <article className={styles.piece}>{inner}</article>;
}
