import { Reveal } from "@/components/ui/Reveal";
import { getWhatsAppContactUrl } from "@/lib/whatsapp";

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Centro+Hist%C3%B3rico+Tepic+Nayarit&z=15&output=embed";

export function Visit() {
  const whatsapp = getWhatsAppContactUrl();

  return (
    <section id="visita" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 py-28 sm:py-36">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-smoke)] mb-4">
            La visita
          </p>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-onyx mb-16 max-w-xl">
            Visítanos.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <dl className="space-y-10">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-smoke)] mb-3">
                  Dirección
                </dt>
                <dd className="text-onyx leading-relaxed">
                  Calle Hidalgo
                  <br />
                  Centro Histórico
                  <br />
                  Tepic, Nayarit
                </dd>
              </div>

              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-smoke)] mb-3">
                  Horario
                </dt>
                <dd className="text-onyx leading-relaxed">
                  Mar – Sáb · 11:00 – 20:00
                  <br />
                  Dom · 12:00 – 18:00
                  <br />
                  <span className="text-[var(--color-smoke)]">Lunes cerrado</span>
                </dd>
              </div>

              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-smoke)] mb-3">
                  Contacto
                </dt>
                <dd className="space-y-2">
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-block text-onyx"
                  >
                    <span className="relative pb-0.5">
                      WhatsApp
                      <span
                        aria-hidden
                        className="absolute left-0 right-0 -bottom-0 h-px bg-[var(--color-bronze)] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                      />
                    </span>
                  </a>
                  <br />
                  <a
                    href="https://instagram.com/revolucion.tepic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-block text-onyx"
                  >
                    <span className="relative pb-0.5">
                      @revolucion.tepic
                      <span
                        aria-hidden
                        className="absolute left-0 right-0 -bottom-0 h-px bg-[var(--color-bronze)] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                      />
                    </span>
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="relative aspect-[4/5] lg:aspect-square w-full border border-[var(--color-smoke)]/40 overflow-hidden">
              <iframe
                src={MAP_EMBED_SRC}
                title="Mapa de la tienda en Tepic"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale-[40%]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[var(--color-canvas)] mix-blend-multiply opacity-25"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
