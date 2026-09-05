# Agents

This project uses the Payload CMS skill at `.agents/skills/payload/`.
Start with `.agents/skills/payload/SKILL.md` for a quick reference, then see `.agents/skills/payload/reference/` for detailed docs.

## Agent skills

### Issue tracker

Issues and specs live as local Markdown under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

The default canonical triage labels are used. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repository. See `docs/agents/domain.md`.

## Database and schema changes

- **Don't write migrations while developing.** The SQLite adapter runs schema push on
  connect whenever `NODE_ENV !== 'production'` (see `@payloadcms/db-sqlite/dist/connect.js`).
  Edit the collection config, restart the dev server, done. Generate a migration only when
  preparing a deploy — once, from the settled schema, not one per iteration.
- **Never apply DDL to the `.db` file by hand.** It desyncs drizzle's snapshot, after which
  push re-emits `CREATE INDEX` for indexes that already exist and fails one table at a time.
  If it happens: save the index SQL from `sqlite_master`, drop every index, let push rebuild
  them, then diff the before/after lists to prove nothing was lost — especially a UNIQUE one.
- **Stop the dev server before running an importer.** Both write to the same SQLite file
  and the importer blocks on the lock with no output and no timeout. It looks like a hang
  rather than an error, and costs minutes before you suspect it.
- **Interactive prompts need a real TTY.** `payload migrate:create` (its table
  rename-or-create question) and push's data-loss confirmation both use `prompts`. Piping
  newlines into them hangs indefinitely and writes an empty log. Ask the user to run these
  in their own terminal instead.

## Content

- **The Astro site at `../heritage-jute` is the source of truth for content**, read by
  `src/importers/` (`HERITAGE_JUTE_SOURCE_DIR` overrides the path). A re-import overwrites
  CMS edits, so treat the importers as the way to change seeded content.
- **Run `rm -rf .next` after any importer.** Importers pass
  `context: { disableRevalidate: true }`, so cache tags are never invalidated. Clearing
  `.next/cache` alone is not enough — pages still serve stale `unstable_cache` entries.
- **Trade terms shared by every product live on the Company global**, not on products:
  Incoterms, payment terms, port of loading, lead times, origin, export basis. The list is
  `src/importers/tradeTerms.ts`, and the product importer strips those labels. They were
  duplicated across all eleven products once; don't reintroduce them per product.

## Admin UX

- **Give every repeating array a `RowLabel`** (`src/components/admin/RowLabels/`). Payload's
  default positional labels ("Product Variant 01" nineteen times) make a collapsed list
  unreadable and hide mistakes — ten of eleven products had the same specification entered
  twice before row labels exposed it.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
