# Heritage Jute — Deployment Handoff

**Repo:** `/Users/uzayermasud/Developer/web/heritage-jute-payloadcms` (public: https://github.com/uzayer/heritage-jute-payloadcms)
**Written:** 2026-09-05
**Focus of the next session:** Cloudflare R2 → seed Turso → Vercel setup → Astro cutover.

> **How to use this document.** Hand it to Claude at the start of a session. It is a
> runbook for a *pair*, not a script for an autonomous agent. Every step is marked
> **[YOU]** or **[CLAUDE]**. The **[YOU]** steps are account, dashboard, credential, and
> interactive-terminal work that Claude cannot and should not do — Claude is not permitted
> to enter credentials into any form, and interactive prompts need a real TTY that Claude's
> shell does not have. Claude should stop and ask at each **[YOU]** step rather than
> attempting a workaround.

---

## Read these first — do not re-derive

| Path | What it settles |
|---|---|
| `docs/adr/0001-vercel-turso-r2-platform.md` | Why Vercel + Turso + R2; what was rejected |
| `docs/platform-environments.md` | Env var list, build command, migration policy, seeding |
| `AGENTS.md` | Push mode vs migrations, importer/dev-server DB lock, TTY prompts, `.next` cache |

## Stack

Next.js 16 (App Router) + Payload CMS 3.88 as one app. `@payloadcms/db-sqlite` over libSQL
(Turso). Media through `@payloadcms/storage-s3` to Cloudflare R2. Hosted on Vercel.

---

## Current state

### Done and pushed to `main`

Reference the commits rather than re-reading diffs:

| Commit | What |
|---|---|
| `6d579a1` | Removed all automated tests (Playwright + Vitest, configs, scripts, 4 devDeps) |
| `8ecd893` | Product catalogue rework — category is now a relationship to a new `product-categories` collection; admin form rebuilt into tabs with RowLabels; shared trade terms moved to the Company global |
| `9289505` | Header simplified to flat nav links, light theme only |
| `1b830ff` | Squashed six migrations into one: `src/migrations/20260905_094737_initial_schema.ts` |
| `1c76324` | `.gitignore` broadened from `.env` to `.env.*` with a `!.env.example` exception |

**Test removal was a deliberate decision by the user for a small client site. Do not
reintroduce tests.**

**On the migration squash:** no database had ever run the old six. drizzle's
`ALTER TABLE ADD COLUMN` path emits `REFERENCES` without an `ON DELETE` action, so four
foreign keys were `NO ACTION` where the config wants `SET NULL`/`CASCADE`. libsql enables
`foreign_keys` by default, so deleting a product category would have failed outright in
production. The squash regenerated everything through the `CREATE TABLE` path, which emits
the actions correctly. Verified by building the schema both ways on scratch databases and
diffing `sqlite_master` column/FK/index facts — 1274 on each side, identical.

### Turso — done

- CLI installed and authenticated. Free **starter** plan (5 GB storage, 500M row reads/mo).
- Database **`heritage-jute-prod`**, group `default`, region **`aws-ap-south-1` (Mumbai)**.
  Mumbai was chosen deliberately over the CLI's Tokyo default because the client's admin
  users are in Bangladesh.
- The single migration is applied: **387 schema objects**, exactly matching the local
  push-built reference. `payload_migrations` has one row, batch 1.
- **All content tables are empty.** Nothing has been seeded yet.
- Credentials are in **`./.env.turso-prod`** (mode 600, gitignored). `cat` it when you need
  the URL and token. Never print the token into chat, never commit it.

### Not started

Cloudflare R2 · seeding · Vercel project · Astro cutover · backups.

---

## Remaining work, in order

### 1. Cloudflare R2 — **must come before seeding**

The importers upload the 129 images currently in `public/media` through Payload as they
write rows. With R2 configured they land in R2 automatically and nothing is copied off the
laptop by hand. Seed first and you'd have to redo it.

- **[YOU]** Create a Cloudflare account if needed; create an R2 bucket.
- **[YOU]** R2 → Manage API Tokens → create a token scoped to that bucket. Gives
  `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`.
- **[YOU]** Decide the public URL: the bucket's free `r2.dev` URL (fine to start; Cloudflare
  advises against relying on it for production traffic) or a custom domain you control.
- **[CLAUDE]** Once you paste the values, write them into a gitignored local file
  alongside `.env.turso-prod`, and sanity-check them with a test upload.

Needed: `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`,
`R2_ENDPOINT` (`https://<account-id>.r2.cloudflarestorage.com`), `R2_PUBLIC_URL`.

### 2. Seed the Turso database

- **[CLAUDE]** With the Turso and R2 vars exported in the shell, run
  `pnpm import:products && pnpm import:marketing-site`, then verify row counts and that
  media URLs point at R2.
- Stop any dev server first — importers share the SQLite file and block on the lock with no
  output, which looks like a hang.
- `rm -rf .next` afterwards.

### 3. Vercel

- **[YOU]** Create the project and point it at the GitHub repo.
- **[YOU]** Set the env vars (Claude cannot enter credentials into a dashboard).
- **[YOU]** Set **Build Command** to `pnpm migrate && pnpm build`.
- **[YOU]** Set the **function region to Mumbai (`bom1`)**. ⚠️ Not in the docs, and it
  matters: Vercel defaults to `iad1` (Virginia), which would put ~200 ms on every query and
  make the Payload admin sluggish. Public pages are static/SSG and serve from the edge
  regardless — this only affects the admin panel and the dynamic sitemap/search routes.
- **[CLAUDE]** Verify the deployed site and admin panel afterwards.

Variables per `docs/platform-environments.md`, **plus one that doc omits**:

⚠️ **`WEB3FORMS_ACCESS_KEY`** is absent from that list, but
`src/app/(frontend)/contact/actions.ts` throws `"Contact form is not configured"` without
it. The contact form breaks in production if unset. The user does not currently have this
value in their local `.env` — it needs obtaining from Web3Forms.

`src/payload.config.ts` hard-fails the build when `VERCEL` is set and `DATABASE_URL` or any
R2 var is missing, so a misconfiguration surfaces at build time rather than silently
falling back to local storage.

### 4. Verify, then cut over from Astro

`../heritage-jute` (an Astro site) is currently the content source of truth, read by
`src/importers/` via `HERITAGE_JUTE_SOURCE_DIR`. Once prod is seeded and verified the user
intends to delete it.

- **[YOU]** Confirm you're happy with the deployed content before deleting anything.
- **[CLAUDE]** At that point also delete `src/importers/` and the three `import:*` scripts,
  and rewrite the **Content** section of `AGENTS.md` plus the **Establishing content on a
  new database** section of `docs/platform-environments.md` — both become false.

After cutover the direction of truth flips: Turso prod is canonical, content changes happen
in the admin panel, and the local dev DB becomes a disposable copy you pull down.

### 5. Backups

- **[YOU]** Enable Turso point-in-time restore. After cutover, prod is the only copy of the
  content — right now the laptop is an accidental backup.

---

## Gotchas

- **Push never touches Turso.** Schema push runs only when `NODE_ENV !== 'production'`
  (`@payloadcms/db-sqlite/dist/connect.js`). Migrations are the only mechanism for remote
  schema.
- **Do not run `pnpm migrate` against the local dev database.** Its `payload_migrations`
  still names the six deleted migrations, so it would try to create tables that already
  exist. Local dev is push-driven and disposable — delete the `.db` file and re-import for a
  clean local.
- **Interactive prompts need a real TTY.** `payload migrate:create` and push's data-loss
  confirmation both use `prompts`. Piping into them hangs indefinitely and writes an empty
  file. These are **[YOU]** commands.
- **Stop the dev server before running an importer.** Shared SQLite file, silent lock
  contention, looks like a hang rather than an error.
- **`rm -rf .next` after an importer.** Clearing `.next/cache` alone is not enough because
  importers pass `context: { disableRevalidate: true }`, so cache tags are never
  invalidated.
- **Verification is manual.** There is no test suite by design. `pnpm build` is what catches
  type errors and routes that fail to render.

## Useful verification commands

```bash
# Schema object count on Turso (compare against 387)
turso db shell heritage-jute-prod \
  "select count(*) from sqlite_master where name not like 'sqlite_%' and name!='payload_migrations'"

# What migrations Turso thinks it has applied
turso db shell heritage-jute-prod "select name, batch from payload_migrations"

# Content row counts
turso db shell heritage-jute-prod \
  "select (select count(*) from products) p, (select count(*) from product_categories) c"
```

---

## How the user works

Keeps things simple and pushes back on unnecessary ceremony. Has stressed more than once
that this is a **greenfield project with no deployed database** — do not treat migration
history or existing local data as sacred. Prefers claims backed by actually running a
command over assertions; verify before stating. Wants to be consulted on account/dashboard
steps rather than having work done autonomously.

## Suggested skills

Call the Skill tool for:

- **`payload`** — before touching collection config, fields, hooks, or access control.
- **`vercel-react-best-practices`** — for Next.js-on-Vercel work.
