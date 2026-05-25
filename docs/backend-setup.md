# Backend setup — preparation steps

Goal: stand up the database, ORM, admin auth, and a thin API surface
**before** touching any page or component in `app/`. When this guide is
done, you should be able to run Prisma queries against a seeded local
Postgres and hit a couple of authenticated admin routes with `curl`. No
frontend wiring yet — that comes after.

## Decisions locked in

- **Scope: A — catalog-only.** Admin can CRUD products, sizes, and
  stock. The storefront will read from the DB instead of
  `lib/products.ts`. No order log, no reservations, no payments.
- **Managed prod: Supabase.** Local dev runs Postgres in Docker;
  production points at a Supabase project. Schema and migrations are
  identical across both.
- **Admin auth: password + signed cookie.** One owner account. No user
  table — the password hash and session secret live in env vars.

Stack: **Postgres + Prisma + Next.js Route Handlers / Server Actions**.
No separate Express service.

---

## Progress (as of 2026-05-24)

Working branch: `feat/backend-prep` (uncommitted).

| § | Section                          | Status        |
|---|----------------------------------|---------------|
| 1 | Local Postgres in Docker         | **DONE** (host port remapped to `5433` — see note) |
| 2 | Supabase project                 | **DONE** (project exists; URLs not yet in Vercel) |
| 3 | Install Prisma and friends       | **DONE** (on Prisma **v7.8** — see deviations) |
| 4 | Environment variables            | **PARTIAL** (DB URLs filled; `ADMIN_PASSWORD_HASH` / `ADMIN_SESSION_SECRET` still empty; `.env.example` not yet mirrored) |
| 5 | Schema + first migration         | **DONE** (`init` migration applied; `lib/generated/prisma/` client generated) |
| 6 | Prisma client singleton          | **DONE** (`lib/prisma.ts`; uses `@prisma/adapter-pg` — see deviation 5) |
| 7 | Seed from existing catalog       | **DONE** (15 products upserted; seed config in `prisma.config.ts` per v7 — see deviation 7) |
| 8 | Admin auth                       | TODO (Batch B) |
| 9 | Validation layer                 | **DONE** (`lib/schemas.ts`; adds `ProductListQuery` on top of doc's set) |
| 10| Minimal API surface              | **PARTIAL** (`GET /api/products`, `GET /api/products/[slug]` shipped + verified; admin login/logout + write routes still TODO in Batch B) |
| 11| Verification checklist           | partial — read-path boxes ticked; admin-path boxes still open |
| 12| Things deferred                  | reference only |

### What's left (Batch B)

- **§8** — `bcryptjs` + `jose` installed; `lib/auth.ts` with
  `verifyPassword` / `signSession` / `verifySession`; `middleware.ts`
  at repo root gating `/admin/*` and `/api/admin/*`; fill
  `ADMIN_PASSWORD_HASH` and `ADMIN_SESSION_SECRET` in `.env.local`
  (user-generated — see §8 prose).
- **§10 admin routes** — `POST /api/admin/login`, `POST /api/admin/logout`,
  `POST /api/admin/products`, `PATCH /api/admin/products/[slug]`,
  `DELETE /api/admin/products/[slug]`. Each write calls
  `revalidateTag("products")` / `revalidatePath("/catalogo")` on success.
- **Loose ends** — mirror all four backend keys (`DATABASE_URL`,
  `DIRECT_URL`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`) into
  `.env.example`. Run `migrate deploy` + seed once against Supabase
  with prod env vars loaded. Confirm `yarn build` still passes
  end-to-end with everything wired.

### Prisma v7 deviations from this doc (which was written v6-shaped)

The doc still reads as a guide, but these are the points where v7
forced us to do something different. Apply them when you tackle §6+.

1. **Generator** is `prisma-client` (not `prisma-client-js`) and writes
   to `lib/generated/prisma/`. All client imports must be from
   `@/lib/generated/prisma`, not `@prisma/client`. The `@prisma/client`
   package is still installed (peer of `prisma`) but no source code
   should import from it directly.
2. **Connection URLs are forbidden in `schema.prisma`.** No `url`, no
   `directUrl`. Both live in `prisma.config.ts`. The v7 `Datasource`
   type accepts `url` and `shadowDatabaseUrl` only — `directUrl` was
   dropped. For Supabase later, the workable pattern is to point
   `DATABASE_URL` at the **direct** URL during `migrate deploy`, and
   at the **pooled** URL at runtime.
3. **`prisma.config.ts` loads `.env.local` explicitly.** `dotenv/config`
   only reads `.env`; we use `dotenv.config({ path: ".env.local" })`
   so the Prisma CLI sees the same vars Next does.
4. **`prisma generate` is a separate step** after `migrate dev`. The v7
   generator does not auto-run on migrations the way `prisma-client-js`
   did. Add it to the seed and build scripts when wiring §7.
5. **`PrismaClient` requires a driver adapter at runtime.** v7 made
   `adapter` / `accelerateUrl` mutually-exclusive **required** options
   on the constructor — `new PrismaClient({ log })` alone no longer
   typechecks. We use `@prisma/adapter-pg` (installed alongside `pg` /
   `@types/pg`) and instantiate it from `DATABASE_URL`. See
   `lib/prisma.ts`. The pg adapter takes a connection string, a
   `pg.PoolConfig`, or an externally-managed `pg.Pool` — when we wire
   Supabase, we'll likely want a tuned `PoolConfig` for the pooled URL
   rather than a bare string.
6. **The generated client has no `index.ts`.** The doc shows
   `import { PrismaClient } from "@/lib/generated/prisma"`, but the v7
   generator writes `client.ts` / `browser.ts` / etc. with no barrel.
   Under bundler resolution, server code must import from
   `@/lib/generated/prisma/client` (server entry) — `browser.ts` is
   the client-safe variant we don't use server-side.
7. **Seed config moved to `prisma.config.ts`.** The v6-era pattern of
   `"prisma": { "seed": "..." }` in `package.json` is ignored in v7;
   `prisma db seed` exits with "No seed command configured" and points
   at `migrations.seed` in `prisma.config.ts`. The current config sets
   `migrations.seed = "tsx prisma/seed.ts"`. `dotenv` is now an
   explicit devDep (the seed loads `.env.local` directly, matching how
   `prisma.config.ts` does it).
8. **`Json` columns reject strictly-typed interfaces.** Prisma's
   `InputJsonValue` requires an index signature, so passing our
   `ProductSpecs` / `ProductShipping` / etc. directly is a TS2322. The
   seed widens them through an `asJson()` helper (cast via `unknown`).
   Apply the same pattern in admin write routes (§10) when accepting
   editorial blobs.

---

## 1. Local Postgres in Docker

Create `docker-compose.yml` at the repo root:

```yaml
services:
  db:
    image: postgres:16-alpine
    container_name: revolucion-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: revolucion
      POSTGRES_PASSWORD: revolucion_dev
      POSTGRES_DB: revolucion
    ports:
      - "5432:5432"
    volumes:
      - revolucion-db-data:/var/lib/postgresql/data

volumes:
  revolucion-db-data:
```

Bring it up:

```
docker compose up -d
docker compose ps        # confirm running
docker compose logs db   # sanity-check
```

Verify you can connect from the host:

```
docker exec -it revolucion-db psql -U revolucion -d revolucion -c "select version();"
```

If port 5432 is taken on Windows (common — pgAdmin, another Postgres
service), change the host-side port to `5433:5432` and update
`DATABASE_URL` accordingly.

> **This machine hit that case.** Windows service `postgresql-x64-17`
> is bound to `5432`, so Docker silently lost the bind even though
> `docker compose ps` showed the mapping. The current
> `docker-compose.yml` uses `"5433:5432"` and `.env.local` URLs point
> at `localhost:5433`. If you ever stop the Windows service and want
> the canonical port back, revert both files together.

---

## 2. Create the Supabase project (for prod)

You can do this in parallel with local setup; the connection strings
go into Vercel later, not into `.env.local`.

1. Create a new project at supabase.com. Pick the region closest to
   your users (`us-west-1` is a sensible default for Tepic).
2. Save the **database password** to a password manager — Supabase
   only shows it once.
3. In **Project Settings → Database → Connection string**, grab two
   URIs:
   - **Transaction pooler** (port `6543`, host
     `aws-0-<region>.pooler.supabase.com`) — this is what serverless
     runtimes use.
   - **Direct connection** (port `5432`) — this is what Prisma
     migrations use.
4. Don't paste these anywhere yet. Step 4 explains where they go.

Why two URLs: Supabase's transaction pooler (PgBouncer) is required
for serverless deployments so you don't exhaust connections, but
PgBouncer doesn't support the prepared statements Prisma uses for
migrations. Prisma's `directUrl` field handles this split cleanly.

---

## 3. Install Prisma and friends

```
yarn add @prisma/client zod
yarn add -D prisma tsx
```

- `@prisma/client` — runtime ORM client.
- `prisma` — CLI for migrations and generation.
- `zod` — input validation at the API boundary (non-negotiable; never
  trust request bodies).
- `tsx` — to run the seed script in TS without compiling.

Initialize:

```
npx prisma init --datasource-provider postgresql
```

This writes `prisma/schema.prisma` and adds `DATABASE_URL` to `.env`.
**Delete the `.env` it created** and move the variable into
`.env.local` instead — the project already uses `.env.local` for
secrets and that's what Next.js loads in dev.

> Done. Prisma v7.8 also writes a `prisma.config.ts` (not in v6); we
> edited it to load `.env.local`:
>
> ```ts
> import { config as loadEnv } from "dotenv";
> import { defineConfig } from "prisma/config";
> loadEnv({ path: ".env.local" });
> export default defineConfig({
>   schema: "prisma/schema.prisma",
>   migrations: { path: "prisma/migrations" },
>   datasource: { url: process.env["DATABASE_URL"] },
> });
> ```

---

## 4. Environment variables

Add to `.env.local` (local dev — points at Docker Postgres):

```
# --- backend ---
DATABASE_URL="postgresql://revolucion:revolucion_dev@localhost:5433/revolucion?schema=public"
DIRECT_URL="postgresql://revolucion:revolucion_dev@localhost:5433/revolucion?schema=public"

# admin auth
ADMIN_PASSWORD_HASH=""        # bcrypt hash, generated in step 8
ADMIN_SESSION_SECRET=""       # 32+ random bytes, used to sign the cookie
```

> Status: DB URLs filled (port `5433`, see §1 note). `ADMIN_*` still
> empty — fill during §8. `.env.example` has not yet been mirrored;
> do it when §8 lands so all four backend keys are added at once.

For local dev, `DATABASE_URL` and `DIRECT_URL` are the same (no
pooler in front of Docker Postgres). The variable still has to exist
so the Prisma schema in step 5 can reference it consistently across
environments.

For **production on Vercel**, set these in the Vercel env UI — not in
any file:

```
DATABASE_URL = "postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL   = "postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres"
ADMIN_PASSWORD_HASH = "<your bcrypt hash>"
ADMIN_SESSION_SECRET = "<your hex secret>"
```

Note the `?pgbouncer=true&connection_limit=1` query params on the
pooled `DATABASE_URL` — Prisma requires both when sitting behind
PgBouncer in transaction mode.

Mirror the keys (empty values) into `.env.example` so the next person
knows what's needed. **Never commit real secrets.** Confirm `.env.local`
is already gitignored (it is, by Next's default `.gitignore`).

---

## 5. Schema — mirror `lib/types.ts`

> **DONE.** Migration `20260525035611_init` applied locally; client
> generated to `lib/generated/prisma/`. The code block below has been
> updated to the v7-shaped version we actually use — kept here as the
> source-of-truth for future schema edits.

Translate the existing `Product` type into Prisma models.

`prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "postgresql"
  // url / directUrl live in prisma.config.ts — Prisma v7 forbids them here
}

enum Category {
  camisas
  playeras
  pantalones
  chaquetas
  accesorios
}

enum Size {
  S
  M
  L
  XL
  XXL
}

model Product {
  id           String   @id @default(cuid())
  slug         String   @unique
  name         String
  description  String
  price        Int                          // pesos, integer — no floats for money
  category     Category
  featured     Boolean  @default(false)
  status       String?
  edition      String?
  material     String?
  finish       String?
  lede         String?
  images       String[]                     // ordered array of paths
  imageLabels  String[]
  specs        Json?                        // ProductSpecs
  shipping     Json?                        // ProductShipping
  story        Json?                        // ProductStory
  quote        Json?                        // ProductQuote
  variants     ProductVariant[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([category])
  @@index([featured])
}

model ProductVariant {
  id        String  @id @default(cuid())
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  productId String
  size      Size
  stock     Int     @default(0)
  isDefault Boolean @default(false)

  @@unique([productId, size])
  @@index([productId])
}
```

Notes worth flagging:

- **Price is `Int`, in pesos.** Don't use `Decimal` here — the catalog
  already uses round-peso prices and integer math avoids a class of
  bugs. If you ever need fractional pesos, migrate to `Decimal` then.
- **Sizes become a relation, not an enum array.** The current
  `Product.sizes: Size[]` collapses two things into one — "which sizes
  exist" and "stock per size." Splitting them now means inventory just
  works later.
- **Editorial blobs (`specs`, `story`, `quote`) are `Json`.** They're
  read-mostly, shaped exactly like the TS types, and don't need to be
  queryable. Keep them denormalized.

Create the first migration against your local Docker DB:

```
npx prisma migrate dev --name init
npx prisma generate          # v7: separate step, no longer implicit
```

This creates `prisma/migrations/` (commit it) and applies the migration
to your local DB. Commit the migration folder — it is the source of
truth for schema history. The v6 doc claimed `migrate dev` also runs
`generate`; on v7 it does not, so run `generate` explicitly (or wire it
into the build / postinstall script later).

To apply the same migration to Supabase later:

```
# point a one-off shell at prod env, then:
npx prisma migrate deploy
```

Never run `migrate dev` against Supabase — it's an interactive
dev-only command. Production uses `migrate deploy` exclusively.

---

## 6. Prisma client singleton

> **DONE.** `lib/prisma.ts` exists; v7 forced two deviations from the
> code block below (deviations 5 and 6 in the §Prisma v7 deviations
> table). The block here is the **as-shipped** version.

Next.js dev mode hot-reloads modules, which leaks Prisma client
instances and eventually exhausts DB connections. `lib/prisma.ts`:

```ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  const adapter = new PrismaPg(url);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

Never import `PrismaClient` from `@/lib/generated/prisma/client`
anywhere else. Always import `{ prisma }` from `@/lib/prisma`. **Never
use this from a client component** — server-only.

---

## 7. Seed from the existing catalog

> **DONE.** `prisma/seed.ts` exists; 15 products upserted into local
> Docker Postgres on 2026-05-24. v7 forced three deviations from the
> doc's original code (driver adapter, `client` import path, `Json`
> cast — see deviations 5, 6, 8) plus the seed-config move (deviation
> 7). The code block below is the **as-shipped** version.

The hand-edited `PRODUCTS` array in `lib/products.ts` is the seed data.
`prisma/seed.ts`:

```ts
import { PrismaPg } from "@prisma/adapter-pg";
import { config as loadEnv } from "dotenv";
import { PrismaClient } from "../lib/generated/prisma/client";
import type { Prisma } from "../lib/generated/prisma/client";
import { PRODUCTS } from "../lib/products";

loadEnv({ path: ".env.local" });

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({ adapter: new PrismaPg(url) });

const asJson = <T,>(value: T | undefined): Prisma.InputJsonValue | undefined =>
  value === undefined ? undefined : (value as unknown as Prisma.InputJsonValue);

async function main() {
  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},                  // don't clobber edits made via admin
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        featured: p.featured,
        status: p.status,
        edition: p.edition,
        material: p.material,
        finish: p.finish,
        lede: p.lede,
        images: p.images,
        imageLabels: p.imageLabels ?? [],
        specs: asJson(p.specs),
        shipping: asJson(p.shipping),
        story: asJson(p.story),
        quote: asJson(p.quote),
        variants: {
          create: p.sizes.map((size) => ({
            size,
            stock: p.stock,                // current global stock — per-size editing comes via admin
            isDefault: size === p.defaultSize,
          })),
        },
      },
    });
  }
  console.log(`Seeded ${PRODUCTS.length} products.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    return prisma.$disconnect().then(() => process.exit(1));
  });
```

Wire it into `prisma.config.ts` (NOT `package.json` — see deviation 7):

```ts
migrations: {
  path: "prisma/migrations",
  seed: "tsx prisma/seed.ts",
},
```

Run it locally:

```
npx prisma db seed
npx prisma studio       # browse the data in a UI to confirm
```

`lib/products.ts` is still in place — keep it as a fallback / source of
truth until the storefront is fully wired to the DB. That swap happens
in the frontend-integration milestone, not here.

For Supabase, run the seed once against prod after `migrate deploy`
succeeds — same command, just with prod env vars loaded.

---

## 8. Admin auth

> **TODO (Batch B).** No `bcryptjs` / `jose` installed; no `lib/auth.ts`;
> no `middleware.ts` at repo root; `ADMIN_PASSWORD_HASH` and
> `ADMIN_SESSION_SECRET` still empty in `.env.local`. Secret generation
> is a manual step for the operator — see commands below.

Generate the hash and a session secret once, then paste into
`.env.local` (and into Vercel for prod):

```
# in a throwaway node REPL
node -e "import('bcryptjs').then(b => b.default.hash('your-real-password', 12).then(console.log))"
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

```
yarn add bcryptjs jose
yarn add -D @types/bcryptjs
```

- `bcryptjs` — password hashing.
- `jose` — sign/verify the session cookie (JWT-style, but small and
  edge-compatible, which matters because Next middleware runs on the
  edge runtime).

Create `lib/auth.ts` with three functions:

- `verifyPassword(plain: string): Promise<boolean>` — compares to
  `ADMIN_PASSWORD_HASH`.
- `signSession(): Promise<string>` — issues a 7-day signed token.
- `verifySession(token: string | undefined): Promise<boolean>` — used
  by middleware and admin route handlers.

Cookie shape: `revolucion-admin`, `httpOnly`, `secure` in prod,
`sameSite: "lax"`, 7-day expiry, `path: "/"`.

Add `middleware.ts` at the repo root to gate `/admin/*` and
`/api/admin/*`:

```ts
import { NextResponse, type NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("revolucion-admin")?.value;
  const ok = await verifySession(token);
  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/((?!login).*)", "/api/admin/:path*"],
};
```

Don't build the login UI yet — that's frontend work. For now, the
`POST /api/admin/login` route handler is enough to issue a cookie via
`curl`.

---

## 9. Validation layer

> **DONE.** `lib/schemas.ts` exists. As-shipped goes a bit beyond the
> doc: the editorial blobs (`specs`, `shipping`, `story`, `quote`) are
> typed sub-schemas mirroring `lib/types.ts`, and `ProductListQuery` is
> exported for the `GET /api/products` query string. Sketch below; see
> `lib/schemas.ts` for the full file.

Every write endpoint validates its input with Zod **before** touching
Prisma. Shape of `lib/schemas.ts`:

```ts
import { z } from "zod";

export const CategoryEnum = z.enum([
  "camisas", "playeras", "pantalones", "chaquetas", "accesorios",
]);
export const SizeEnum = z.enum(["S", "M", "L", "XL", "XXL"]);

// typed sub-schemas for the Json columns — keeps end-to-end safety
// const ProductSpecs / ProductShipping / ProductStory / ProductQuote = ...

export const ProductCreate = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().int().nonnegative(),
  category: CategoryEnum,
  featured: z.boolean().default(false),
  status: z.string().optional(),
  edition: z.string().optional(),
  material: z.string().optional(),
  finish: z.string().optional(),
  lede: z.string().optional(),
  images: z.array(z.string()).min(1),
  imageLabels: z.array(z.string()).default([]),
  specs: ProductSpecs.optional(),
  shipping: ProductShipping.optional(),
  story: ProductStory.optional(),
  quote: ProductQuote.optional(),
  variants: z.array(z.object({
    size: SizeEnum,
    stock: z.number().int().nonnegative(),
    isDefault: z.boolean().default(false),
  })).min(1),
});

export const ProductUpdate = ProductCreate.partial();

export const ProductListQuery = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(24),
  category: CategoryEnum.optional(),
});
```

Rule for every route handler: `const parsed = Schema.safeParse(body); if (!parsed.success) return 400;`. No exceptions. Already applied to `GET /api/products` (validates query string); apply to every admin write route in Batch B.

---

## 10. Minimal API surface to stand up first

> **PARTIAL.** Public read routes shipped in Batch A; admin auth +
> write routes still TODO in Batch B. **Do not build admin pages yet.**
> All routes live under `app/api/`.

| Method · Path                          | Status | Notes |
|----------------------------------------|--------|-------|
| `GET  /api/products`                   | **DONE** | `app/api/products/route.ts`; validates query via `ProductListQuery`; returns `{ items, page, pageSize, total, totalPages }`; includes `variants`. |
| `GET  /api/products/[slug]`            | **DONE** | `app/api/products/[slug]/route.ts`; 404 on miss; includes `variants`. |
| `POST /api/admin/login`                | TODO   | Accepts `{ password }`, sets `revolucion-admin` cookie. |
| `POST /api/admin/logout`               | TODO   | Clears cookie. |
| `POST /api/admin/products`             | TODO   | Create. Auth required. Validate with `ProductCreate`. |
| `PATCH /api/admin/products/[slug]`     | TODO   | Update. Auth required. Validate with `ProductUpdate`. |
| `DELETE /api/admin/products/[slug]`    | TODO   | Delete. Auth required. |

After each write, call `revalidateTag("products")` or
`revalidatePath("/catalogo")` on success so the static catalog stays
fresh once it reads from the DB.

No public write endpoints exist in scope A, so no rate-limiting is
required yet.

---

## 11. Verification checklist — "ready to connect"

You are done with preparation when **all** of these pass:

- [x] `docker compose up -d` brings up Postgres; `docker compose ps`
      shows it running. *(Host port `5433`, see §1 note.)*
- [x] `npx prisma migrate status` reports up to date locally.
- [x] `npx prisma db seed` populates the local DB without errors;
      `prisma studio` shows every product from `lib/products.ts`.
      *(15 products upserted on 2026-05-24.)*
- [x] `curl http://localhost:3000/api/products` returns JSON matching
      seeded data.
- [x] `curl http://localhost:3000/api/products/<known-slug>` returns
      one product with its variants.
- [ ] `curl -X POST .../api/admin/products` **without** a cookie
      returns 401/redirect.
- [ ] After `POST /api/admin/login` with the right password and reusing
      the cookie, the same `POST /api/admin/products` succeeds and the
      new product appears in `prisma studio`.
- [ ] Invalid input (missing `slug`, negative `price`) returns 400 with
      a Zod-formatted error, not a 500.
- [~] Supabase project exists; `npx prisma migrate deploy` with prod
      env vars succeeds; seed runs once against prod. *(Project exists;
      deploy + seed against it not yet run.)*
- [ ] `yarn build` still passes — no TS errors, no Prisma type drift.
- [ ] `.env.example` lists every new variable; `.env.local` is still
      gitignored. *(`.env.local` is gitignored; `.env.example` not yet
      updated.)*

When the checklist is green, the backend is ready. The next milestone
— replacing `lib/products.ts` reads with Prisma reads, building the
admin UI — is a frontend job and belongs in a separate doc.

---

## 12. Things explicitly deferred

Mentioned here so they don't get smuggled into v1:

- **Order log / WhatsApp click tracking.** Out of scope A. Add a
  separate doc and milestone if you ever want it.
- **Reservations / stock holds.** Out of scope A. WhatsApp confirms
  the sale; the owner decrements stock manually in the admin UI.
- **Image uploads.** For now, images are paths under `public/`. Don't
  add Supabase Storage / S3 until the admin UI demands it.
- **Multi-admin / roles.** One owner. No user table beyond the env
  password.
- **Search.** Postgres `LIKE` is fine until the catalog crosses a few
  hundred items. No Meilisearch / Algolia yet.
- **Background jobs.** None needed. If one ever is, add it as a
  Vercel Cron + Route Handler before reaching for a queue.
- **Supabase Auth / RLS / Realtime / Edge Functions.** We're using
  Supabase as plain managed Postgres. If you later want any of those,
  it's a separate decision — none are required to ship scope A.
