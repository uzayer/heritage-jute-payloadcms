# 05: Deliver public utility pages and inquiries

**What to build:** The remaining buyer-facing utility experience: Contact and legal Site Pages, Web3Forms inquiries, product-aware inquiry selection, search metadata, structured data, robots behavior, sitemap output, and not-found handling.

**Blocked by:** 03: Deliver the editable marketing-site foundation; 04: Deliver the full Product catalogue and import.

**Status:** done

- [x] Buyers can submit a valid inquiry through Web3Forms and receive the expected visible feedback.
- [x] Contact and legal pages preserve their current public content and navigation.
- [x] Product-aware inquiry selection uses the published Product catalogue.
- [x] Public metadata, canonical URLs, structured data, robots, sitemap, and not-found behavior preserve current search-facing intent.
- [x] WebKit tests cover the delivered public utility routes and form behavior.

Delivered alongside ticket 07 in one pass rather than sequenced, since the missing routes and visual parity turned out to be the same underlying gap. See 07 for what else landed in that pass. Kept the WebKit coverage here light and structural (routes render, form fields present, product select is populated) rather than exhaustive — frontend visuals are being spot-checked by hand, not asserted pixel-by-pixel in WebKit.
