# 02 — Refactor the home page hero

Run this *after* tokens are ported and the dev server is clean.

---

**Task:** Refactor our home page hero to match the new system.

**Reference:**

- `STYLE.md` § Hero — the rules.
- `docs/style/hero.html` — the markup and CSS pattern (visual oracle).
- `docs/style/components/Hero.tsx` — a reference TSX implementation.

**Brand-specific content:**

- Kicker: `Tienda · de · Ropa — desde 2019 · Tepic, Nay.`
- Title: `Revolución` (italic Newsreader, massive)
- Tagline: `Una tienda pequeña en el centro de Tepic. Ropa para hombre,
  escogida una por una.`
- Coordinates: `Lat 21.5041° N / Lon 104.8946° W`
- Season: `Otoño / Invierno MMXXVI`

**Steps:**

1. Read the reference files above.
2. Open our current home page (likely `app/page.tsx`).
3. Find the existing hero (or lack thereof).
4. Replace it with a Hero component:
   - Place the component file at the path that matches our existing
     component convention (`components/`, `app/_components/`, etc.).
   - Adapt the reference Hero — don't copy CSS Module conventions if we
     use Tailwind, and vice versa. Use semantic classes from `STYLE.md`.
5. Pick a hero image:
   - If we have product photography, use the most atmospheric piece.
   - Otherwise, use a tonal placeholder per `STYLE.md` § Imagery —
     **do not generate a stock photo or AI image.**
6. Run the dev server and verify against `docs/style/hero.html`:
   - Title is italic Newsreader, ~clamp(64px, 11vw, 168px).
   - Kicker is mono uppercase with bronze bar prefix.
   - Veil is in place, hero is legible at all viewport widths.
   - Foot row has the tagline + two meta blocks, divided by a hairline.

**Forbidden in this task:**

- Don't add a "Shop Now" button to the hero.
- Don't add a logo image — the wordmark is type-only.
- Don't change the brand name. It is "Tienda de Ropa Revolución" with
  "Revolución" as the display.
- Don't introduce a gradient beyond the legibility veil shown in
  `docs/style/hero.html`.

**Before you start:**

- Tell me where you plan to put the component file.
- Tell me which hero image you plan to use (and if it's a placeholder,
  why no real photo exists yet).

**Done when:**

- Home page hero matches the visual reference at 1440px and 390px.
- No console errors.
- All copy is in Spanish.
- No tokens added outside `STYLE.md`.
