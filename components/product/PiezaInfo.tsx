"use client";

import { useEffect, useRef, useState } from "react";
import type { Product, ProductSpecs, ProductShipping, Size } from "@/lib/types";
import { useCart } from "@/lib/cart-store";
import styles from "./PiezaInfo.module.css";

const SIZE_ORDER: Size[] = ["S", "M", "L", "XL", "XXL"];

function formatMxnInt(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

interface PiezaInfoProps {
  product: Product;
  number: string;
  categoryLabel: string;
  specs: ProductSpecs;
  shipping: ProductShipping;
  defaultSize: Size;
}

const SPEC_ROWS: { key: keyof ProductSpecs; label: string }[] = [
  { key: "material", label: "Material" },
  { key: "corte", label: "Corte" },
  { key: "hechura", label: "Hechura" },
  { key: "color", label: "Color" },
  { key: "cuidado", label: "Cuidado" },
  { key: "procedencia", label: "Procedencia" },
];

function renderSpecValue(value: string) {
  // Convert markdown-ish emphasis if present (none currently), else passthrough.
  // First "word group" can be wrapped in <em> by the data — here we leave raw.
  return value;
}

export function PiezaInfo({
  product,
  number,
  categoryLabel,
  specs,
  shipping,
  defaultSize,
}: PiezaInfoProps) {
  const initial = product.sizes.includes(defaultSize)
    ? defaultSize
    : product.sizes[0];
  const [size, setSize] = useState<Size>(initial);
  const [confirmed, setConfirmed] = useState(false);

  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);

  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const confirmTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(confirmTimer.current), []);

  const handleAdd = () => {
    if (confirmed) return;
    if ((["S", "M", "L", "XL"] as Size[]).includes(size)) {
      add({
        slug: product.slug,
        name: product.name,
        size: size as "S" | "M" | "L" | "XL",
        qty: 1,
        unitPrice: product.price,
        image: product.images[0],
      });
      openCart();
    }
    setConfirmed(true);
    confirmTimer.current = window.setTimeout(
      () => setConfirmed(false),
      1800,
    );
  };

  const onKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    for (let i = 1; i <= SIZE_ORDER.length; i++) {
      const nextIdx =
        (idx + dir * i + SIZE_ORDER.length) % SIZE_ORDER.length;
      const candidate = SIZE_ORDER[nextIdx];
      if (product.sizes.includes(candidate)) {
        setSize(candidate);
        radioRefs.current[nextIdx]?.focus();
        return;
      }
    }
  };

  return (
    <div className={styles.info}>
      <div className={styles.heading}>
        <p className={styles.eyebrowRow}>
          <span className={styles.eyebrowRule} aria-hidden="true" />
          <span className={styles.eyebrowCategory}>{categoryLabel}</span>
          <span className={styles.eyebrowNumber}>Nº {number}</span>
        </p>
        <h1 className={styles.title}>{product.name}</h1>
      </div>

      <p className={styles.lede}>{product.lede ?? product.description}</p>

      <hr className={styles.hr} aria-hidden="true" />

      <div className={styles.priceRow}>
        <p className={styles.price}>
          {formatMxnInt(product.price)}
          <span className={styles.priceCurrency}>mxn</span>
        </p>
        {product.status && (
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>{product.status}</span>
          </p>
        )}
      </div>

      <hr className={styles.hr} aria-hidden="true" />

      <div
        className={styles.sizesBlock}
        role="radiogroup"
        aria-label="Selecciona una talla"
      >
        <p className={styles.sizesLabel}>
          <span>
            Talla — <span className="picked">{size}</span>
          </span>
          <a href="#guia-tallas" className={styles.sizesGuide}>
            Guía de tallas →
          </a>
        </p>
        <div className={styles.sizes}>
          {SIZE_ORDER.map((s, idx) => {
            const available = product.sizes.includes(s);
            const isActive = size === s && available;
            const classes = [
              styles.sizeBtn,
              isActive && styles.sizeActive,
              !available && styles.sizeDisabled,
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={s}
                ref={(el) => {
                  radioRefs.current[idx] = el;
                }}
                type="button"
                role="radio"
                aria-checked={isActive}
                aria-disabled={!available}
                disabled={!available}
                tabIndex={isActive ? 0 : -1}
                className={classes}
                onClick={() => available && setSize(s)}
                onKeyDown={(e) => onKey(e, idx)}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={`${styles.cta} ${confirmed ? styles.ctaConfirmed : ""}`}
      >
        <span>{confirmed ? `Agregada · talla ${size}` : "Agregar a la bolsa"}</span>
        {!confirmed && (
          <span className={styles.ctaPrice}>
            {formatMxnInt(product.price)}
          </span>
        )}
      </button>

      <hr className={styles.hr} aria-hidden="true" />

      <div className={styles.shipping}>
        <div className={styles.shippingCol}>
          <p className={styles.shippingHead}>Envío</p>
          <p className={styles.shippingLine}>{shipping.local}</p>
          <p className={styles.shippingNote}>{shipping.localNote}</p>
        </div>
        <div className={styles.shippingCol}>
          <p className={styles.shippingHead}>Recoger</p>
          <p className={styles.shippingLine}>{shipping.pickup}</p>
          <p className={styles.shippingNote}>{shipping.pickupNote}</p>
        </div>
      </div>

      <hr className={styles.hr} aria-hidden="true" />

      <dl className={styles.specs}>
        {SPEC_ROWS.map(({ key, label }) => (
          <div key={key} className={styles.specRow}>
            <dt className={styles.specDt}>{label}</dt>
            <dd className={styles.specDd}>{renderSpecValue(specs[key])}</dd>
          </div>
        ))}
      </dl>

      <p className={styles.aftercare}>
        Cambios y ajustes dentro de los primeros 14 días. Escribe o llama al{" "}
        <a href="https://wa.me/523111234567">311 123 4567</a> y coordinamos por
        WhatsApp.
      </p>
    </div>
  );
}
