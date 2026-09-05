# Platform environments

Heritage Jute runs Payload and Next.js on Vercel. Turso supplies managed libSQL/SQLite, and Cloudflare R2 stores Media Assets through its S3-compatible API.

## Local development

Copy `.env.example` to `.env`, choose strong local values for the Payload secrets, then run `pnpm dev`. Without a remote Turso URL, Payload uses the disposable database at `heritage-jute-development.db`. R2 is disabled locally, so Media Assets use Payload's local upload directory.

## Vercel environment scopes

Set the same variable names in Vercel, but never reuse their values between scopes:

| Vercel scope | Turso database | R2 bucket |
| --- | --- | --- |
| Preview | dedicated development/preview database and token | dedicated development/preview bucket and public URL |
| Production | production database and token | production bucket and public URL |

Every Vercel scope needs `PAYLOAD_SECRET`, `DATABASE_URL`, `DATABASE_AUTH_TOKEN`, `NEXT_PUBLIC_SERVER_URL`, `CRON_SECRET`, `PREVIEW_SECRET`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`, and `R2_PUBLIC_URL`. The application rejects a Vercel deployment missing its database or complete R2 configuration, preventing a deployment from silently using local storage.

`DATABASE_URL` is the Turso `libsql://` URL and `DATABASE_AUTH_TOKEN` is the corresponding Turso token. `R2_ENDPOINT` is the S3 API endpoint (`https://<account-id>.r2.cloudflarestorage.com`); it is for writes, while `R2_PUBLIC_URL` is the public custom domain used to serve Media Assets.

Set Vercel's Build Command to `pnpm migrate && pnpm build`. The migration step runs against the scope's Turso database before the Next.js build. This explicitly initializes a new Preview or Production database without letting a server startup or local production build mutate its schema.

## Schema migrations

Deployed databases only ever change through the migration files in `src/migrations`. Locally, `pnpm dev` still pushes the schema straight from the config, which is why a local database can drift from the migrations without anyone noticing.

Writing a migration:

1. Change the collections, globals, and fields first, then run `pnpm generate:types`.
2. Run `pnpm payload migrate:create <name>`. When the schema loses tables as well as gaining them — replacing a collection's shape rather than extending it — Drizzle asks, once per new table, whether it is a new table or a rename of a dropped one. The answer is almost always the default first option, `create table`; a rename is only correct when the same data really is moving. These prompts need a real terminal, so run this one by hand rather than from a script.
3. Read what it generated. Drizzle rebuilds a SQLite table by copying rows into a replacement, and it writes that copy from the *new* column list: if a table gained columns the old one never had, the generated `INSERT ... SELECT` names columns that do not exist and the migration fails on the first database that runs it. It also cannot add a `NOT NULL` column without a default to a table that already holds rows. Both cases need a hand-written rebuild, and the comment above it should say what happens to the existing rows.

Verifying a migration before it reaches Turso:

```bash
rm -f heritage-jute-development.db && pnpm migrate   # build the schema the deployed way
```

Then compare `sqlite_master` against a database Payload builds for itself from the same config — delete the file, let `pnpm dev` push, and diff the two. They should be identical apart from column ordering. Anything else is drift that production will get and local development will not.

A migration that has only ever run against an empty file proves very little, so also run it against a database holding rows in the tables it rewrites. Note that Payload runs each migration inside a transaction and SQLite ignores `PRAGMA foreign_keys` there: a `DROP TABLE` in a migration cascades whether or not the generated SQL says otherwise.

## Establishing content on a new database

Migrating only creates the schema. A Preview or Production database is not servable until its content exists, and the public routes fail loudly rather than showing an empty page if it does not:

```bash
pnpm import:products          # the 11-Product catalogue and its images
pnpm import:marketing-site    # company details, header, footer, and the five Site Pages
```

Both read the current Astro site from `HERITAGE_JUTE_SOURCE_DIR` (a sibling `heritage-jute` checkout by default) and can be re-run: they overwrite the same records and reuse the same Media Assets rather than duplicating them.

## Verification

This is a small single-client site with no automated test suite. Verify a change by running
`pnpm dev` and walking the affected pages, and `pnpm build` before deploying — the build is
what catches type errors and a route that fails to render.
