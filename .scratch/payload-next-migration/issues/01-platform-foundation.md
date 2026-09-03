# 01: Establish the Vercel, Turso, and R2 Payload foundation

**What to build:** A runnable independent Heritage Jute Payload application that uses the approved Vercel, Turso, and R2 platform shape, keeps development/preview content separate from production, and can execute its WebKit test baseline.

**Blocked by:** None (can start immediately).

**Status:** complete

- [x] The application uses a supported managed SQLite connection and S3-compatible Media Asset storage rather than Cloudflare Worker-only bindings.
- [x] Development/preview and production configuration are distinct and documented without committing secrets.
- [x] The application and the initial WebKit test project run successfully against the configured development environment.
