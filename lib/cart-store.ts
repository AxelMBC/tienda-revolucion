"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, Size } from "./types";

const MAX_QTY = 99;

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (item: CartItem) => void;
  remove: (slug: string, size: Size) => void;
  updateQty: (slug: string, size: Size, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.slug === item.slug && i.size === item.size,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === item.slug && i.size === item.size
                  ? { ...i, qty: Math.min(MAX_QTY, i.qty + item.qty) }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { ...item, qty: Math.min(MAX_QTY, item.qty) },
            ],
          };
        }),
      remove: (slug, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.slug === slug && i.size === size),
          ),
        })),
      updateQty: (slug, size, qty) =>
        set((state) => {
          const clamped = Math.max(1, Math.min(MAX_QTY, Math.floor(qty)));
          return {
            items: state.items.map((i) =>
              i.slug === slug && i.size === size ? { ...i, qty: clamped } : i,
            ),
          };
        }),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: "revolucion-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    },
  ),
);

export const useCartCount = () =>
  useCart((s) => s.items.reduce((acc, i) => acc + i.qty, 0));

export const useCartSubtotal = () =>
  useCart((s) => s.items.reduce((acc, i) => acc + i.qty * i.unitPrice, 0));
