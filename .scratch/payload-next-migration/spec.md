# Heritage Jute Payload and Next.js migration

**Status:** ready-for-agent

## Problem Statement

Heritage Jute's current Astro and CloudCannon site has the correct public appearance and content, but its editing and deployment setup is more complicated than the business needs. The Site Administrator needs a simpler, trusted CMS for Products, Media Assets, Site Pages, and Posts, while visitors must continue to receive the same B2B catalogue experience, public URLs, inquiry flow, and search-facing metadata.

## Solution

Create an independent Next.js and Payload application deployed on Vercel. Use Turso for managed SQLite data and Cloudflare R2, through its S3-compatible interface, for Media Assets. Preserve the current public site as the visual and behavior reference; migrate its content into fixed-purpose Payload structures, retain Payload's publishing features for Posts, and use WebKit browser tests to verify public-route parity.

## User Stories

1. As the Site Administrator, I want to sign in to one CMS, so that I can manage Heritage Jute's content without editing source files.
2. As the Site Administrator, I want to edit a Product's buyer-facing copy and technical specifications, so that the catalogue stays accurate.
3. As the Site Administrator, I want to add, remove, and reorder Product Variants and specification groups, so that each Product represents the options we actually export.
4. As the Site Administrator, I want to upload and reuse Media Assets, so that I can update product, gallery, and page images myself.
5. As the Site Administrator, I want fixed-purpose editing forms for Site Pages, so that I cannot accidentally break the public page structure.
6. As the Site Administrator, I want to draft and preview changes before publishing, so that I can review buyer-facing content safely.
7. As the Site Administrator, I want to publish Posts that become the canonical articles on heritagejute.com, so that LinkedIn updates can link to content the business owns.
8. As the Site Administrator, I want Categories, search, redirects, scheduling, and other retained Payload publishing features available, so that the site can grow beyond its initial catalogue.
9. As a prospective buyer, I want every existing public route and Product slug to continue working, so that saved links and search results remain valid.
10. As a prospective buyer, I want the catalogue, Product detail pages, navigation, responsive layout, gallery, and calls to action to look and behave like the current site, so that the migration does not change the buyer experience.
11. As a prospective buyer, I want the contact form to continue sending inquiries through Web3Forms, so that contacting Heritage Jute remains familiar and reliable.
12. As a search engine, I want the migrated site to retain page metadata, canonical URLs, structured data, robots directives, sitemap behavior, and redirects, so that search visibility is preserved.
13. As a developer, I want development and preview deployments isolated from production content, so that experiments cannot alter the Site Administrator's live Products, Posts, or Media Assets.
14. As a developer, I want current Astro content and images imported repeatably, so that migration can be re-run without duplicate or inconsistent CMS records.
15. As a developer, I want the Payload repository and its deployment to be independent from the retired Astro repository, so that obsolete CloudCannon and Astro concerns cannot affect future work.
16. As a developer, I want the public experience verified in WebKit at desktop and mobile widths, so that Safari-family rendering is actively protected during the port.

## Implementation Decisions

- The Payload application is an independent Git repository. The Astro repository and detached pre-Astro Next.js worktree are read-only implementation references.
- Next.js and Payload run together on Vercel.
- Turso supplies separate managed SQLite databases for development/preview and production.
- Cloudflare R2 supplies separate development and production Media Asset buckets through an S3-compatible storage integration.
- The CMS uses one Site Administrator account initially; role-specific editorial workflows are out of scope until a real business need exists.
- Products are a fixed-purpose collection retaining the current Product fields, nested specification groups, key facts, and Product Variants. Product slugs remain stable.
- Fixed-purpose Site Page content replaces the template's arbitrary page-builder requirement for the core marketing pages. Shared Site Content is managed as globals.
- The existing Posts, Categories, search, redirects, draft preview, live preview, and scheduled-publishing capabilities remain available. Posts are Canonical Articles; LinkedIn posts are adapted summaries linking back to them.
- Existing static product, page, legal, navigation, footer, gallery, site, and image content is migrated by a repeatable importer that can safely establish the initial CMS data.
- Public product and marketing routes query Payload through the server-side Local API and revalidate after published changes. Server-side calls acting on a user must enforce access control explicitly.
- The public contact form continues to use Web3Forms rather than creating an initial CMS-managed Inquiry store.
- CloudCannon configuration, inline-editing attributes, and Astro-specific runtime/build code do not move to the new project.

## Testing Decisions

- The highest data seam is Payload's Local API: integration tests verify fixed schemas, publication visibility, access behavior, and repeatable import outcomes rather than collection implementation details.
- The highest public UI seam is a browser: Playwright verifies routes, visible buyer-facing content, navigation, Product discovery, responsive layout, and form interaction rather than component internals.
- WebKit is the authoritative browser project for the initial suite, exercising desktop and mobile viewports. A passing WebKit suite is a Safari baseline, not proof of Chromium compatibility; Chromium coverage may be added later as a separate smoke matrix.
- Screenshot comparisons are used for representative high-value public routes at desktop and mobile widths, with semantic route assertions covering the complete public route matrix.
- Existing Payload integration and browser-test harnesses are extended where they provide the same seam; the port does not introduce lower-level tests merely to mirror implementation structure.

## Out of Scope

- Moving to PostgreSQL, MongoDB, Cloudflare Workers, or a Vercel-to-D1 workaround.
- A CRM, CMS-managed Inquiry collection, SMTP email delivery, or replacement of Web3Forms.
- Multiple editor roles or a custom approval workflow.
- Deleting Payload's retained publishing capabilities solely because they are not immediately used.
- Retiring the Astro deployment before the documented parity checks pass.
- A claim that WebKit coverage guarantees Chromium or Firefox compatibility.

## Further Notes

The platform, content ownership, publishing, environment, and repository decisions are recorded in ADRs 0001 through 0004. The project's canonical domain terms are defined in `CONTEXT.md`.
