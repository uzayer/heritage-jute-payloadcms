# 07: Reach complete current-site visual parity

**What to build:** The remaining public interactions and responsive presentation required to make the Payload site visually and behaviorally equivalent to the current Astro reference across all delivered routes.

**Blocked by:** 04: Deliver the full Product catalogue and import; 05: Deliver public utility pages and inquiries; 06: Deliver canonical Posts and retained publishing features.

**Status:** ready-for-agent

- [ ] Every existing public marketing, catalogue, Product, Contact, legal, and utility route matches the reference's intended buyer-facing presentation.
- [ ] Navigation, dropdowns, mobile navigation, gallery movement, FAQs, reveal behavior, and calls to action retain their expected behavior.
- [ ] Desktop and mobile WebKit assertions cover the resolved parity gaps.
- [ ] CloudCannon and Astro editing/build artifacts are absent from the new application.

## Carried over from ticket 03

Two pieces of the current site's navigation were not modelled when the branded shell was built, and will not appear from styling alone — the Header global needs the fields first:

- `navigation.json` gives every Products dropdown link an `image`; the Astro mega-menu shows them as thumbnails. `header.navItems[].links` has `label`, `description`, and `url` only.
- `navigation.json` also carries a separate `mobile_items` grouping, which puts About / Certifications / Contact under a "Company" heading on phones. The port renders the desktop item list at every width, so `/about#certifications` is reachable from the footer but not from the mobile menu.

Also deliberately left behind for this pass: `src/utilities/generateMeta.ts` and `src/plugins/index.ts` still append `| Payload Website Template` and default to `/website-template-OG.webp`, and `src/app/(frontend)/layout.tsx` still names `@payloadcms` as the Twitter creator. Ticket 05 rebrands the page-facing metadata; whatever it leaves is Posts-facing and belongs here.
