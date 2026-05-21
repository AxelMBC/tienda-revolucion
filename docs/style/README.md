# Tienda de Ropa Revolución — Style Handoff

Drop these files into your Next.js project so Claude Code can refactor toward
the new visual system without rebuilding from scratch.

## What's in here

```
handoff/
├── README.md                 ← you are here
├── STYLE.md                  → copy to repo root
├── CLAUDE.md                 → copy to repo root (or merge if you have one)
├── tokens.css                → copy to app/globals.css (or import)
├── fonts.md                  → instructions for next/font setup
├── components/               → reference TSX components — adapt to your structure
│   ├── Room.tsx
│   ├── Eyebrow.tsx
│   ├── Hairline.tsx
│   ├── Hero.tsx
│   ├── Piece.tsx
│   ├── Divider.tsx
│   └── components.module.css
├── examples/                 → static HTML reference — keep in repo as visual oracle
│   ├── hero.html
│   ├── gallery.html
│   └── divider.html
└── prompts/                  → ready-to-paste prompts for Claude Code
    ├── 00-initial.md         → first message to start the refactor
    ├── 01-tokens.md          → port the tokens
    ├── 02-hero.md            → first component
    └── per-task.md           → template for every follow-up task
```

## Recommended order of operations

1. **Drop `STYLE.md` and `CLAUDE.md` at the repo root.** These get read on every
   Claude Code task — they're how the rules persist.
2. **Port `tokens.css` into your global stylesheet** (or `app/globals.css`).
   This is the *concrete* source of truth Claude Code will reach for.
3. **Set up the fonts** per `fonts.md` — uses `next/font/google`, no FOUT.
4. **Drop the `examples/` folder somewhere in the repo** (e.g. `docs/style/`).
   These static HTML files are your visual oracle — Claude Code can read them
   to match patterns exactly.
5. **Use `prompts/00-initial.md` to kick off the refactor.** Then go
   one component at a time using `per-task.md` as a template.

## Tailwind users

The system is built on CSS variables, so Tailwind works fine. Add the tokens
to your `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      onyx: 'var(--onyx)',
      ivory: 'var(--ivory)',
      oxblood: 'var(--oxblood)',
      bronze: 'var(--bronze)',
      smoke: 'var(--smoke)',
    },
    fontFamily: {
      serif: 'var(--font-serif)',
      sans: 'var(--font-sans)',
      mono: 'var(--font-mono)',
    },
  },
},
```

Then everywhere you'd write `bg-stone-900`, write `bg-onyx`.

## Don't skip STYLE.md

The single most important file in this package is `STYLE.md`. Claude Code
holds the line on a system far better when the rules are written down than
when they live in chat. If you only do one thing: copy that file to your
repo root.
