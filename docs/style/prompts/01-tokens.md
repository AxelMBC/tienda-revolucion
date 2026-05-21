# 01 — Port the design tokens

Use this prompt as the first concrete task, after Claude Code has read
`STYLE.md` and audited the project.

---

**Task:** Port the design tokens into our global stylesheet.

**Steps:**

1. Open `docs/style/tokens.css` and read it top to bottom.
2. Open our current `app/globals.css`.
3. Merge the tokens into `app/globals.css`:
   - Replace any existing color variables that collide.
   - Keep any tokens we have that aren't in the new file (e.g. layout
     primitives we use elsewhere), but flag them in your response so
     I can decide whether to retire them.
   - Preserve our existing CSS resets and base styles unless they
     conflict with the new tokens.
4. Wire up the fonts per `docs/style/fonts.md` — `next/font/google` for
   Newsreader, DM Sans, DM Mono. Set `--font-serif`, `--font-sans`,
   `--font-mono` on the `<html>` element via the font variables.
5. Remove any old Google Fonts `<link>` tags from `app/layout.tsx`
   or `<head>` — these get replaced by `next/font`.
6. Run the dev server and load the home page. The home page may look
   broken — that's fine, we'll fix it next. What we want to verify is
   that:
   - The new fonts load (check DevTools → Network → "Newsreader" appears).
   - `--onyx`, `--ivory`, etc. resolve when inspected in DevTools.
   - No console errors.

**Before you start:**

- Confirm what we currently have for tokens and where they live.
- Confirm whether we're using Tailwind. If yes, also update
  `tailwind.config.ts` to extend the theme with the new semantic colors
  (see `handoff/README.md` § Tailwind users).

**Done when:**

- `pnpm dev` (or `npm`/`yarn`) starts clean.
- DevTools shows the new font families loaded.
- `:root` shows the new color variables.
- No styling work yet on individual components — that's the next slice.
