# Use Vercel, Turso, and Cloudflare R2 for the Payload site

The Next.js and Payload application will run on Vercel, with Turso providing the managed libSQL/SQLite database and Cloudflare R2 storing Media Assets through its S3-compatible API. This preserves a simple SQLite-scale data model while avoiding the unsupported Vercel-to-D1 binding combination; PostgreSQL, MongoDB, and a Cloudflare Workers deployment were considered.
