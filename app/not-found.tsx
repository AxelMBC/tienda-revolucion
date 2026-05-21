import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-display text-[10rem] sm:text-[14rem] text-[var(--color-oxblood-2)] leading-none">
        404
      </p>
      <h1 className="font-display text-4xl sm:text-5xl text-bone mt-4 mb-6">
        Esta pieza no existe.
      </h1>
      <p className="text-[var(--color-cream)] max-w-md mx-auto mb-10">
        La página que buscas se descosió en el camino. Vuelve al inicio y
        encuentra algo que valga la pena portarse.
      </p>
      <Link
        href="/"
        className="inline-flex h-14 px-8 items-center justify-center bg-[var(--color-oxblood)] hover:bg-[var(--color-oxblood-2)] text-bone text-[13px] font-medium uppercase tracking-[0.18em] rounded-sm transition-colors"
      >
        Volver al inicio
      </Link>
    </Container>
  );
}
