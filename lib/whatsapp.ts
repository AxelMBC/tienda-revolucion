import type { CartItem } from "./types";
import { formatMXN } from "./utils";

export function buildOrderMessage(items: CartItem[]): string {
  if (items.length === 0) {
    return "*Nuevo pedido — REVOLUCIÓN*\n\nHola, me gustaría hacer un pedido.";
  }

  const lines = items.map((i) => {
    const lineTotal = formatMXN(i.unitPrice * i.qty);
    return `• ${i.name} — Talla ${i.size} × ${i.qty} — ${lineTotal}`;
  });

  const subtotal = items.reduce((a, i) => a + i.qty * i.unitPrice, 0);

  return [
    "*Nuevo pedido — REVOLUCIÓN*",
    "",
    ...lines,
    "",
    `*Total estimado:* ${formatMXN(subtotal)}`,
    "",
    "¿Cómo procedemos con la confirmación y la recolección?",
  ].join("\n");
}

export function buildWhatsAppUrl(items: CartItem[]): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;
  if (!phone) {
    throw new Error(
      "NEXT_PUBLIC_WHATSAPP_PHONE no está configurado. Define el número en .env.local",
    );
  }
  const text = encodeURIComponent(buildOrderMessage(items));
  return `https://wa.me/${phone}?text=${text}`;
}

export function getWhatsAppContactUrl(): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;
  if (!phone) return "#";
  return `https://wa.me/${phone}`;
}
