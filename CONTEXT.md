# Heritage Jute Content

The content model for Heritage Jute's B2B marketing site. It distinguishes the
company's managed catalogue and marketing content from an online store.

## Language

**Site Administrator**:
The single trusted business owner who maintains published site content in the CMS.
_Avoid_: Editor, customer, user

**Product**:
A B2B jute offering with buyer-facing marketing copy, specifications, applications, and optional variants; it is not a purchasable catalogue item.
_Avoid_: SKU, listing, item

**Product Variant**:
A named, product-specific specification option shown as part of one Product.
_Avoid_: Product, SKU, inventory variant

**Site Page**:
A fixed-purpose marketing page with a predefined content structure, rather than an arbitrary page-builder composition.
_Avoid_: Block page, landing-page builder

**Shared Site Content**:
Business information or navigation displayed across multiple Site Pages, such as the header, footer, company details, or gallery images.
_Avoid_: Page content, global copy

**Media Asset**:
An image or downloadable file managed in Payload and reusable by Products, Site Pages, or Posts.
_Avoid_: Static image, public asset

**Inquiry**:
A contact-form submission sent to Heritage Jute through Web3Forms; it is not a CMS record in the initial migration.
_Avoid_: Lead, form entry

**Post**:
A dated business update adapted from Heritage Jute's LinkedIn publishing and presented in the site's blog.
_Avoid_: Site Page, product update

**Canonical Article**:
The complete published Post on heritagejute.com; LinkedIn content is an adapted summary that points to it.
_Avoid_: LinkedIn mirror, syndicated source
