import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section
      className="relative bg-[var(--color-onyx)] text-[var(--color-canvas)] border-t border-[var(--color-oxblood-brief)]"
    >
      <div className="mx-auto max-w-2xl px-6 sm:px-10 lg:px-14 py-32 sm:py-44">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-bronze)] mb-10">
            La tienda
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="space-y-7 text-[var(--color-canvas)]/85 text-lg leading-relaxed">
            <p>
              Revolución abrió en una calle del centro de Tepic que no sale en
              las guías.
            </p>
            <p>
              La idea fue simple: una tienda chica, surtida sin prisa, donde
              uno entre por una camisa y se quede a hablar de cómo cambia la
              ciudad.
            </p>
            <p>
              Traemos piezas que aguantan. Algunas vienen de la sierra, otras
              de Italia, otras de un taller a tres cuadras. Las elegimos una
              por una.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 flex items-center gap-4">
            <span
              aria-hidden
              className="block h-px w-12 bg-[var(--color-bronze)]"
            />
            <span className="text-[var(--color-smoke)] text-sm">—</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
