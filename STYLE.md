# Tienda de Ropa Revolución — Visual System

> This file is the source of truth for the visual language of the site.
> Read it before writing any UI code. If you need a pattern not described
> here, **ask** before inventing one.

---

## Brand

**Tienda de Ropa Revolución** — independent menswear shop in Tepic, Nayarit.
Short forms: "Revolución" (wordmark), "TRR" (favicon, internal only).

**Tone.** Quiet, considered, slightly editorial. We are a small shop, not a
fashion brand. Spanish is the primary language. No marketing voice. No
emojis. No exclamation marks. No words like "discover," "unlock," "elevate,"
"curated," "exclusive," "experience."

Good: _"Una tienda pequeña en el centro de Tepic. Ropa para hombre, escogida
una por una."_

Bad: _"Discover our curated collection of exclusive menswear!"_

---

## Palette (use ONLY these)

```
--onyx:    #0A0A0A   primary ink; dark rooms
--ivory:   #F5F1EA   default canvas
--bone:    #ECE7DD   alternate canvas (cooler)
--oxblood: #4A1419   accent rooms only — never type, never UI chrome
--bronze:  #B8893B   hairlines, numbers, single accents
--smoke:   #8A8782   secondary text on light backgrounds
```

**Forbidden:** blue, green, anything off-system. No gradients except a
single subtle hero veil for legibility. No semi-transparent color tints
except for hairlines and overlays on imagery.

**Pairing rules:**

- Bronze is an accent only. Never a button fill, never a body color. Use
  for hairlines, the dot in the wordmark, item numbers, single inline marks.
- Oxblood is a _room_ color, not a UI color. Whole sections may use it as
  background; never use it for type, borders, or buttons in light rooms.

---

## Type

Three families, loaded via `next/font/google`. See `fonts.md`.

```
--font-serif:  Newsreader      → headings, display, italic by default
--font-sans:   DM Sans         → body, UI labels
--font-mono:   DM Mono         → eyebrows, captions, numerals, tracking
```

### Scale

| Use                 | Family | Size                       | Weight | Style  | Notes                   |
| ------------------- | ------ | -------------------------- | ------ | ------ | ----------------------- |
| Hero display        | serif  | `clamp(64px, 11vw, 168px)` | 380    | italic | line-height 0.92        |
| Section head        | serif  | `clamp(28px, 3.6vw, 44px)` | 380    | italic | line-height 1.1         |
| Piece title         | serif  | `clamp(22px, 2.2vw, 30px)` | 380    | italic | letter-spacing -0.012em |
| Lede                | serif  | `clamp(22px, 2.4vw, 30px)` | 380    | italic | balance, max 36ch       |
| Body                | sans   | 15–17px                    | 300    | roman  | line-height 1.6–1.75    |
| UI label            | sans   | 13px                       | 400    | roman  | letter-spacing 0.04em   |
| Eyebrow / caption   | mono   | 10–11px                    | 400    | roman  | UPPERCASE 0.18–0.22em   |
| Number / coordinate | mono   | 10–12px                    | 400    | roman  | 0.14–0.22em tracking    |

Body weight is **300, not 400.** This is non-negotiable — heavier body type
breaks the editorial feel.

### Rules

- Newsreader headings are **italic by default**, roman only when called
  out (e.g. inside an italic block).
- Mono uppercase always has letter-spacing ≥ 0.14em. Never tight mono.
- `text-wrap: balance` on every heading. `text-wrap: pretty` on body.
- Hyphenation off. Use soft breaks (`<br>`) in headlines for shape control.

---

## Layout

### Rooms, not sections

Every major area is a full-bleed **room** with generous vertical padding:

```css
.room {
  padding-block: clamp(80px, 12vw, 180px);
  padding-inline: clamp(20px, 4vw, 56px);
}
```

Backgrounds change between rooms to feel like passing through doorways.
A canonical page rhythm: **ivory → onyx → oxblood → ivory.** Don't break
the rhythm without reason.

### Grid

12 columns inside a `max-width: 1180px` container. Galleries are
**asymmetric**: staggered top margins on alternating items, varied aspect
ratios. Never a uniform 3-up grid for product display unless explicitly
asked for the "strict" rhythm tweak.

### Spacing scale

```
--space-1:  4px
--space-2:  8px
--space-3:  14px
--space-4:  24px
--space-5:  36px
--space-6:  60px
--space-7:  clamp(48px, 7vw, 96px)
--space-8:  clamp(80px, 12vw, 180px)
```

Stick to these. Don't invent intermediate values.

### Hairlines over boxes

Separation is done with **1px hairlines** (`var(--rule)`), not borders on
boxes, not card shadows. Common patterns:

- 1px line at top of caption block, bronze 0.55 opacity for room dividers
- Hairline draws in on hover for interactive items (transform: scaleX)
- A single bronze hairline above the footer

### Corners

`border-radius: 0` on all structural elements. No rounded cards, no pill
buttons. Allowed exceptions: the dot in the wordmark (perfect circle),
input checkboxes from the system UA.

### Shadows

None. There are no drop shadows in this system. If you reach for one,
the layout is wrong.

---

## Components

### Eyebrow

The recurring small label above every section heading.

```html
<p class="eyebrow"><span class="dot"></span>Las piezas · Selección OI 26</p>
```

Mono, 11px, uppercase, tracking 0.22em, smoke color, bronze 4px dot prefix.

### Hero

Full-bleed photograph as atmosphere (not as content). Dark veil for
legibility. Wordmark or display title set in massive italic serif. Bronze
hairline above a footer row with tagline + coordinates + season.

Title pattern for this brand:

```
TIENDA · DE · ROPA
Revolución
```

The "Tienda · De · Ropa" line is mono kicker, ~11px, tracking 0.32em.
"Revolución" is the display, italic Newsreader, clamp(64px, 11vw, 168px).

### Piece (gallery item)

```
[ image ]
─────────────── ← 1px rule
Nº 01 · CAMISA · S–XL  ← mono caption
Morada, para la noche larga  ← italic serif title
Brief, one or two lines in sans 300.
$1,890 mxn  ← mono, bronze
```

Image hover: 1.6s ease scale to 1.03, saturation lifts slightly, bronze
hairline draws in across the bottom of the frame.

### Divider room

Oxblood background, single italic serif pull-quote (max 720px), mono
attribution, two short bronze hairlines flanking a "Sala N" mono mark.

### Visit / contact

Mono section headers in bronze. Address in serif 22px. Hours in a
two-column dl, sans 300. Map is a schematic SVG with bronze pin — not
a Google Maps embed unless asked.

---

## Motion

- Reveal on scroll: 1.4s ease, 28px translate, opacity 0 → 1.
- Image hover: 1.6s `cubic-bezier(.2,.7,.2,1)`.
- Hairline draw-in: 0.9s, transform-origin left.
- Nav background swap: 0.6s ease.
- No springs. No bounces. No scroll-jacking. No parallax stronger than 18%.

Respect `prefers-reduced-motion` — reveal fade-in only, no transform.

---

## Imagery

Real product photography, shot on plain or textured backgrounds (concrete,
linen, raw wood). Color: muted, slightly desaturated. Filter on display:
`saturate(0.92) contrast(1.02)` to unify mixed sources.

When a real photo is missing, use a **tonal placeholder** (a flat color
field in the palette with a mono caption overlay) — never a stock image,
never an AI-generated illustration, never an SVG of the product.

---

## Forbidden (quick reference)

- Gradients (except hero legibility veil)
- `border-radius` on structural elements
- Drop shadows
- Pill buttons
- Tailwind utility colors outside the palette (`slate-*`, `red-*`, etc.)
- Lucide icons, emoji, or any icon library for content
- Words: discover, unlock, elevate, curated, exclusive, experience, journey
- Marketing capitalization ("Premium Quality Menswear")
- More than two font weights in a single block
- More than one accent color in a single screen
- Hero CTAs ("Shop Now" buttons over the hero image)

---

## When in doubt

Hairline. Mono caption. Italic serif heading. Body in sans 300. Lots of
space. If the design feels too quiet, that probably means it's right.
