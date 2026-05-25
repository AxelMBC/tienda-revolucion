### Mandatory pre-reads

@AGENTS.md
@STYLE.md

`STYLE.md` is the source of truth for the visual system. Before writing any UI
code, read it. The palette, type scale, spacing scale, and "forbidden" list
are all enforced — do not invent values, do not introduce Tailwind utility
colors outside the palette, do not add `border-radius` or drop shadows to
structural elements. When unsure, ask before inventing a pattern.

### Stack

Next.js **16.2.6** (App Router), React **19.2.4**, TypeScript strict, Tailwind
v4 via PostCSS, Zustand 5 for client state, `motion` for animation. Package
manager is **Yarn 1** (a `yarn.lock` is checked in alongside `package-lock.json`
— prefer `yarn`). The project predates much of the current Claude training
data on Next.js; if an API behaves unexpectedly, read the relevant guide in
`node_modules/next/dist/docs/` before guessing. Specifically:

- App Router page props (`params`, `searchParams`) are **Promises** in 16.x
  and must be awaited. See `app/catalogo/page.tsx` and
  `app/producto/[slug]/page.tsx` for the pattern.
- Fonts are loaded via `next/font/google` in `app/layout.tsx` and exposed as
  CSS variables (`--font-serif`, `--font-sans`, `--font-mono`). Do not import
  fonts any other way.

### Commands

```
yarn dev          # next dev — local server on :3000
yarn build        # next build
yarn start        # serve a production build
yarn lint         # eslint (flat config in eslint.config.mjs)
node scripts/generate-placeholders.mjs   # regenerate SVG placeholders in public/images/
```

There is no test runner configured. No type-check script — run `yarn build`
or `npx tsc --noEmit` if you need one.

### Architecture

This is a small storefront for a brick-and-mortar menswear shop in Tepic,
Nayarit. There is **no backend, no payments, no cart checkout**. The "buy"
flow ends by opening WhatsApp with a pre-filled order message (see
`lib/whatsapp.ts`). Everything is statically renderable.

- **`lib/products.ts`** is the product catalog — a hand-edited TypeScript
  array, not a CMS or DB. All product queries (`getBySlug`, `getByCategory`,
  `filterProducts`, `getRelatedPieces`, `deriveCardStatus`) live here. When
  adding fields, update `lib/types.ts` first.
- **`lib/cart-store.ts`** is the Zustand cart, persisted to `localStorage`
  under the key `revolucion-cart`. Only `items` are persisted; UI state
  (`isOpen`) is not. Marked `"use client"`.
- **`lib/whatsapp.ts`** builds the order message and the `wa.me` URL from
  `NEXT_PUBLIC_WHATSAPP_PHONE` (E.164 without `+`). Missing env var throws
  at message build time; the contact link silently falls back to `#`.
- **`app/`** uses the App Router. Routes: `/` (home), `/catalogo` (filterable
  grid, params: `category`, `size`, `sort`), `/producto/[slug]` (statically
  generated via `generateStaticParams` from `PRODUCTS`), `/ofertas`
  (editorial "picks", not literal discounts — see the comment on `getPicks`).
- **`components/ui/`** holds the design-system primitives: `Room`, `Eyebrow`,
  `Hairline`, `Piece`, `Reveal`, `Wordmark`, `Button`, `Container`, `Badge`.
  Most have a co-located `.module.css`. **`Room`** is the layout primitive —
  every full-bleed section should use it with a `tone` of `ivory`, `ink`, or
  `oxblood`. Tones swap CSS variables (`--canvas`, `--ink`, `--muted`,
  `--rule`) so child components inherit the correct palette.
- **`components/{home,layout,product,filters}/`** are page-section components,
  not primitives. Reach for a primitive from `components/ui/` first.

### Design tokens

`app/globals.css` defines the canonical CSS variables (palette, type, spacing,
motion). **Do not add Tailwind utility colors outside the palette** — colors
like `bg-red-500` violate the system. There is a legacy `@theme` block at the
bottom of `globals.css` keeping old utility names (`bg-obsidian`, `font-sora`,
etc.) alive while components are migrated; each alias retires when its last
consumer is rewritten. Don't add new consumers of the legacy names.

`docs/style/examples/` contains static HTML "visual oracle" files
(`hero.html`, `gallery.html`, `divider.html`) — read them to match a pattern
exactly before writing a new component.

### Conventions worth knowing

- Path alias: `@/*` → repo root (e.g. `@/components/ui/Room`, `@/lib/products`).
- CSS Modules co-located with components (`Foo.tsx` + `Foo.module.css`).
  Global styles live only in `app/globals.css`.
- Copy is **Spanish (es-MX)** and editorial — see the tone section of
  `STYLE.md` for forbidden words (`discover`, `unlock`, `curated`, …).
- `suppressHydrationWarning` on `<body>` is intentional (cart persistence).
- The `Pieza*` family of components (`PiezaMedia`, `PiezaInfo`, `PiezaStory`,
  `PiezaQuote`, `PiezaRelated`) compose the product detail page. The
  `CatalogCard` is for grid views; `ProductCard`/`Piece` are for editorial
  contexts on the home page.

### Environment

Copy `.env.example` to `.env.local`. Required for the WhatsApp link to work:
`NEXT_PUBLIC_WHATSAPP_PHONE` (E.164 without `+`). `NEXT_PUBLIC_SITE_URL` is
used for OpenGraph/canonical metadata; defaults to `http://localhost:3000`.
