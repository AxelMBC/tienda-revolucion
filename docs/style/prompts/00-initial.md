# 00 — Initial prompt for Claude Code

Paste this into Claude Code as your first message to start the refactor.
Adjust the paths in **bold** to match your project structure.

---

We're refactoring the visual system of this Next.js project. The store is
**Tienda de Ropa Revolución** — an independent menswear shop in Tepic,
Nayarit. The new direction is quiet, editorial, hairline-driven.

**Source of truth** (already in the repo):

- **`STYLE.md`** at the repo root — read this first, top to bottom. It
  defines the palette, type system, layout rules, motion, and a list of
  forbidden patterns. Treat it as a contract.
- **`CLAUDE.md`** at the repo root — project rules for every task.
- **`docs/style/*.html`** — three static HTML reference files (hero,
  gallery, divider). These are the visual oracle. When you implement a
  pattern, match these files' markup rhythm and class structure.
- **`docs/style/tokens.css`** — the design tokens, already imported into
  `app/globals.css`.
- **`docs/style/components/*.tsx`** — reference TSX implementations of
  the core primitives (Room, Hero, Piece, Divider, Eyebrow, Hairline).
  Adapt these to fit our component folder structure; don't copy them
  verbatim if our conventions differ.

**Before you write any code**, do a short audit:

1. List the existing tokens, type rules, and primitives from `STYLE.md`
   you'll use.
2. List anything new you think you need. If anything in (2) isn't covered
   by `STYLE.md` — **stop and ask** before writing code.
3. Confirm you've read `docs/style/hero.html` (or whichever reference
   file is relevant to the task).

**What I want you to do first:**

1. Read `STYLE.md`, `CLAUDE.md`, and all three files in `docs/style/`.
2. Read `app/globals.css` and the current `app/layout.tsx`.
3. List the routes/pages in the project (briefly — names only).
4. Tell me which existing components you think will need the deepest
   rewrites to land on the new system, and which can stay mostly as-is.
5. **Do not write code yet.** Wait for me to pick the first slice.

We'll move one component or one page at a time. No big-bang rewrites.

---

> *Tip: keep the chat window where you can see it and the dev server
> running side-by-side. Reject any change that introduces a color, font
> weight, or radius not in `STYLE.md` — even if it "looks fine." The
> system holds only if the rules hold.*
