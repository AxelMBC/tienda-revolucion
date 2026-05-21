"use client";

import { Button } from "@/components/ui/Button";

interface AddToCartButtonProps {
  disabled?: boolean;
  onClick: () => void;
  label?: string;
}

export function AddToCartButton({
  disabled,
  onClick,
  label = "Agregar al carrito",
}: AddToCartButtonProps) {
  return (
    <Button
      variant="primary"
      size="lg"
      onClick={onClick}
      disabled={disabled}
      className="w-full"
    >
      {label}
    </Button>
  );
}
