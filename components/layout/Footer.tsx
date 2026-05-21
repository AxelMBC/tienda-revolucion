import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { getCategories } from "@/lib/products";
import { getWhatsAppContactUrl } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();
  const cats = getCategories();
  const whatsapp = getWhatsAppContactUrl();

  return (
    <footer className="mt-24 border-t border-[var(--color-border-soft)] bg-[var(--color-obsidian-2)]">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Wordmark size="md" />
            <p className="mt-4 text-sm text-[var(--color-muted)] max-w-xs leading-relaxed">
              Ropa urbana de lujo para hombre. Hecha para portarse con
              intención.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-2)] mb-4">
              Tienda
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-cream)]">
              <li>
                <Link
                  href="/catalogo"
                  className="hover:text-[var(--color-gold)] transition-colors"
                >
                  Catálogo completo
                </Link>
              </li>
              {cats.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/catalogo?category=${c.slug}`}
                    className="hover:text-[var(--color-gold)] transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-2)] mb-4">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-cream)]">
              <li>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-gold)] transition-colors"
                >
                  WhatsApp tienda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[var(--color-gold)] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li className="text-[var(--color-muted)] text-xs pt-3">
                Pedidos por WhatsApp. Recolección en tienda.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border-soft)] text-xs text-[var(--color-muted)] flex flex-col sm:flex-row sm:justify-between gap-2">
          <span>
            © {year} REVOLUCIÓN. Todos los derechos reservados.
          </span>
          <span className="tracking-[0.18em] uppercase text-[10px]">
            Hecho en México
          </span>
        </div>
      </Container>
    </footer>
  );
}
