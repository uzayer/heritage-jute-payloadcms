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

## Verification

Run `pnpm test:int` for the Payload Local API seam. Run `pnpm test:e2e` for the public browser seam; its desktop and mobile browser projects both use WebKit, our Safari baseline.
