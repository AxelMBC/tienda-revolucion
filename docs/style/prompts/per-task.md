# Per-task prompt template

Use this template for every follow-up task with Claude Code. The
structure is what makes the system stick — it forces the audit-before-
code step that catches the "let me just throw in a new color" reflex.

Copy, fill in, paste.

---

## Task

> *(One sentence: what are we doing?)*

## Reference

- `STYLE.md` § *(which section is the rule for this task?)*
- `docs/style/*.html` — *(which reference file applies?)*
- `docs/style/components/*.tsx` — *(which TSX reference applies?)*
- *(Any existing file in our repo you should read first)*

## Content

> *(Drop the actual copy, prices, product data here. Don't make Claude
> Code guess the wording — give it. Spanish copy only.)*

## Before you start

Audit and tell me, in three bullets:

1. Which existing tokens, type rules, and primitives from `STYLE.md`
   will you use?
2. What (if anything) do you need that isn't covered by `STYLE.md`?
   If non-empty, **stop and ask** before writing code.
3. Have you read the reference HTML file? Confirm with a one-line
   summary of its layout.

## Forbidden in this task

- Adding new colors, fonts, or font weights.
- Adding `border-radius` to anything structural.
- Box shadows.
- Marketing copy or English copy.
- Stock photos, AI illustrations, SVG drawings of products.
- *(Add task-specific forbids here.)*

## Done when

- *(Concrete, visual acceptance criteria. Match reference at 1440px and
  390px. No console errors. All copy in Spanish.)*

---

## Why this template works

- **Forcing the audit** before code-writing surfaces token violations
  early, when they're cheap to fix.
- **Linking to the reference file** gives Claude Code a concrete oracle
  instead of a vibes-based interpretation of `STYLE.md`.
- **Forbidden lists** are far more effective than positive guidance.
  "Don't add gradients" lands harder than "use solid backgrounds."
- **"Done when" with viewport widths** prevents the "looks good on my
  desktop" failure mode.
