import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const PROPS = [
  {
    title: "Pedido por WhatsApp",
    body:
      "Sin checkout, sin cuentas. Coordinamos directo contigo desde tu chat.",
  },
  {
    title: "Recolección en tienda",
    body:
      "Pasa a probarte la pieza y pagar en el momento. Sin sorpresas en la talla.",
  },
  {
    title: "Edición limitada",
    body:
      "Producimos lotes cortos. Lo que ves hoy puede no estar mañana.",
  },
];

export function ValueProps() {
  return (
    <section className="py-20 border-b border-[var(--color-border-soft)]">
      <Container>
        <div className="grid gap-10 sm:grid-cols-3">
          {PROPS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="relative">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-gold-2)] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-2xl text-bone mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--color-cream)] leading-relaxed max-w-xs">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
