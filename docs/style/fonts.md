# Fonts setup (Next.js App Router)

Use `next/font/google` so the fonts are self-hosted, preloaded, and have no
layout shift. Add the following to `app/layout.tsx`:

```tsx
import { Newsreader, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css'; // contains tokens.css

const serif = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500'],
  display: 'swap',
});

const mono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

After this, the CSS variables `--font-serif`, `--font-sans`, `--font-mono`
defined in `tokens.css` are automatically populated by Next.js. The
fallbacks in `tokens.css` are only used if the variables aren't set
(e.g. in a non-Next.js environment).

## Don't

- Don't load fonts via `<link>` tags in the head — bypasses Next's
  optimization.
- Don't add display swap text in middle of a page.
- Don't load extra weights "just in case." 300/400/500 covers the system.
- Don't load Newsreader without italic — half the type system is italic.
