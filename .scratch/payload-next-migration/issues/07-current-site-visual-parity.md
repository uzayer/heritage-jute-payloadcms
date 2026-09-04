# 07: Reach complete current-site visual parity

**What to build:** The remaining public interactions and responsive presentation required to make the Payload site visually and behaviorally equivalent to the current Astro reference across all delivered routes.

**Blocked by:** 04: Deliver the full Product catalogue and import; 05: Deliver public utility pages and inquiries; 06: Deliver canonical Posts and retained publishing features.

**Status:** done for delivered routes — still blocked by 06 for Posts

- [x] Every existing public marketing, catalogue, Product, Contact, legal, and utility route matches the reference's intended buyer-facing presentation.
- [x] Navigation, dropdowns, mobile navigation, gallery movement, FAQs, reveal behavior, and calls to action retain their expected behavior.
- [x] Desktop and mobile WebKit assertions cover the resolved parity gaps.
- [x] CloudCannon and Astro editing/build artifacts are absent from the new application.

**06 is still open.** This ticket is formally blocked by 06 (canonical Posts and retained publishing), which has not been started — Posts/blog parity is out of scope for what was delivered here. Leaving 06 alone for now; revisit this ticket's status once it lands.

WebKit coverage above is structural (nav landmark, dropdown open, viewport adaptation) rather than a motion/behavior assertion for the gallery marquee or scroll-reveal — those are being verified by eye rather than in WebKit, by design.

## Carried over from ticket 03 — resolved in this pass

Two pieces of the current site's navigation were not modelled when the branded shell was built, and will not appear from styling alone — the Header global needs the fields first:

- `navigation.json` gives every Products dropdown link an `image`; the Astro mega-menu shows them as thumbnails. `header.navItems[].links` has `label`, `description`, and `url` only.
- `navigation.json` also carries a separate `mobile_items` grouping, which puts About / Certifications / Contact under a "Company" heading on phones. The port renders the desktop item list at every width, so `/about#certifications` is reachable from the footer but not from the mobile menu.

Also deliberately left behind for this pass: `src/utilities/generateMeta.ts` and `src/plugins/index.ts` still append `| Payload Website Template` and default to `/website-template-OG.webp`, and `src/app/(frontend)/layout.tsx` still names `@payloadcms` as the Twitter creator. Ticket 05 rebrands the page-facing metadata; whatever it leaves is Posts-facing and belongs here.
