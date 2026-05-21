// Generates branded SVG placeholders for the iteration-1 storefront.
// Replace these with real product photography in a later sprint.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const PALETTE = {
  obsidian: "#0b0b0c",
  obsidian2: "#141416",
  espresso: "#3a2418",
  espresso2: "#5a3a28",
  oxblood: "#6b0f17",
  oxbloodLight: "#8a1a23",
  gold: "#b8893b",
  goldLight: "#d4a64f",
  bone: "#f3ece1",
  muted: "#8a8278",
};

// One palette pair per product slug (background gradient + accent).
const PRODUCT_THEMES = {
  "camisa-lino-obsidiana": [PALETTE.obsidian, PALETTE.espresso, PALETTE.gold],
  "camisa-seda-oxblood": [PALETTE.oxblood, PALETTE.obsidian, PALETTE.gold],
  "camisa-oxford-espresso": [PALETTE.espresso, PALETTE.obsidian2, PALETTE.bone],
  "pantalon-sastre-noche": [PALETTE.obsidian, PALETTE.obsidian2, PALETTE.gold],
  "pantalon-cargo-utility": [PALETTE.espresso2, PALETTE.obsidian, PALETTE.bone],
  "pantalon-lino-bone": [PALETTE.bone, PALETTE.muted, PALETTE.espresso],
  "chaqueta-cuero-corsario": [PALETTE.obsidian, PALETTE.oxblood, PALETTE.gold],
  "chaqueta-bomber-dorado": [PALETTE.gold, PALETTE.espresso, PALETTE.obsidian],
  "cinturon-piel-hardware": [PALETTE.espresso, PALETTE.espresso2, PALETTE.gold],
  "gorra-revolucion": [PALETTE.obsidian2, PALETTE.obsidian, PALETTE.gold],
};

const PRODUCT_LABELS = {
  "camisa-lino-obsidiana": "Camisa Lino Obsidiana",
  "camisa-seda-oxblood": "Camisa Seda Oxblood",
  "camisa-oxford-espresso": "Camisa Oxford Espresso",
  "pantalon-sastre-noche": "Pantalón Sastre Noche",
  "pantalon-cargo-utility": "Pantalón Cargo Utility",
  "pantalon-lino-bone": "Pantalón Lino Hueso",
  "chaqueta-cuero-corsario": "Chaqueta Cuero Corsario",
  "chaqueta-bomber-dorado": "Chaqueta Bomber Dorado",
  "cinturon-piel-hardware": "Cinturón Piel Hardware",
  "gorra-revolucion": "Gorra Revolución",
};

function esc(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function productSvg({ slug, label, variant, theme }) {
  const [c1, c2, accent] = theme;
  const w = 1200;
  const h = 1500;
  const gradId = `g-${slug}-${variant}`;
  const rotation = variant === 1 ? -8 : 8;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(label)}">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${gradId})"/>
  <g transform="translate(${w / 2} ${h / 2}) rotate(${rotation})" opacity="0.18">
    <rect x="-360" y="-540" width="720" height="1080" fill="${accent}"/>
  </g>
  <g transform="translate(${w / 2} ${h / 2})">
    <line x1="-160" y1="0" x2="160" y2="0" stroke="${accent}" stroke-width="2"/>
  </g>
  <g fill="${PALETTE.bone}" font-family="Georgia, 'Times New Roman', serif">
    <text x="80" y="140" font-size="38" letter-spacing="14" font-weight="600" opacity="0.85">REVOLUCIÓN</text>
  </g>
  <g fill="${PALETTE.bone}" font-family="Georgia, 'Times New Roman', serif" text-anchor="middle">
    <text x="${w / 2}" y="${h / 2 + 40}" font-size="72" font-weight="600">${esc(label)}</text>
    <text x="${w / 2}" y="${h / 2 + 110}" font-size="22" letter-spacing="10" opacity="0.7">VISTA ${variant}</text>
  </g>
  <g fill="${accent}" font-family="Georgia, 'Times New Roman', serif">
    <text x="80" y="${h - 80}" font-size="20" letter-spacing="6" opacity="0.7">CATÁLOGO · 2026</text>
  </g>
</svg>
`;
}

function categorySvg({ label, theme }) {
  const [c1, c2, accent] = theme;
  const w = 1200;
  const h = 800;
  const gradId = `gc-${label}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(label)}">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${gradId})"/>
  <rect x="60" y="60" width="${w - 120}" height="${h - 120}" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.4"/>
  <g fill="${PALETTE.bone}" font-family="Georgia, 'Times New Roman', serif" text-anchor="middle">
    <text x="${w / 2}" y="${h / 2 + 30}" font-size="120" font-weight="600">${esc(label)}</text>
  </g>
  <g fill="${accent}" font-family="Georgia, 'Times New Roman', serif" text-anchor="middle">
    <text x="${w / 2}" y="${h / 2 + 90}" font-size="20" letter-spacing="10">REVOLUCIÓN</text>
  </g>
</svg>
`;
}

function ogSvg() {
  const w = 1200;
  const h = 630;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="og-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PALETTE.obsidian}"/>
      <stop offset="100%" stop-color="${PALETTE.espresso}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#og-grad)"/>
  <line x1="100" y1="${h / 2 + 60}" x2="${w - 100}" y2="${h / 2 + 60}" stroke="${PALETTE.gold}" stroke-width="2" opacity="0.6"/>
  <g fill="${PALETTE.bone}" font-family="Georgia, 'Times New Roman', serif" text-anchor="middle">
    <text x="${w / 2}" y="${h / 2}" font-size="120" font-weight="600">REVOLUCIÓN</text>
    <text x="${w / 2}" y="${h / 2 + 120}" font-size="28" letter-spacing="8" fill="${PALETTE.goldLight}">ROPA DE HOMBRE</text>
  </g>
</svg>
`;
}

function write(rel, content) {
  const full = resolve(ROOT, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, "utf8");
  console.log("wrote", rel);
}

for (const slug of Object.keys(PRODUCT_THEMES)) {
  const theme = PRODUCT_THEMES[slug];
  const label = PRODUCT_LABELS[slug];
  for (const v of [1, 2]) {
    write(
      `public/images/products/${slug}-${v}.svg`,
      productSvg({ slug, label, variant: v, theme }),
    );
  }
}

const CATEGORY_THEMES = {
  Camisas: [PALETTE.obsidian, PALETTE.espresso, PALETTE.gold],
  Pantalones: [PALETTE.espresso, PALETTE.obsidian2, PALETTE.gold],
  Chaquetas: [PALETTE.oxblood, PALETTE.obsidian, PALETTE.gold],
  Accesorios: [PALETTE.gold, PALETTE.espresso, PALETTE.bone],
};

for (const [label, theme] of Object.entries(CATEGORY_THEMES)) {
  write(
    `public/images/categories/${label.toLowerCase()}.svg`,
    categorySvg({ label, theme }),
  );
}

write(`public/og-home.svg`, ogSvg());

console.log("Done.");
