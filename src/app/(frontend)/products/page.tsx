import type { Metadata } from 'next'

import { CallToActionSection } from '@/components/site/CallToActionSection'
import { ProductCategoryGrid } from '@/components/site/ProductCategoryGrid'
import { getPublishedProducts } from '@/utilities/products'
import { buildItemListLd, JsonLd } from '@/utilities/structuredData'

/**
 * The listing page has no CMS-editable Site Page group yet (Astro's real
 * `pages/products.md` content entry, mirrored here as static copy so the
 * page reads exactly as the live site does).
 */
const PAGE = {
  title: 'Jute Products — Heritage Jute Fibers',
  description:
    "Browse Heritage Jute's product catalog: raw jute, jute yarn, hessian cloth, sacking cloth, jute bags, sacking sacks, jute rope, and twine.",
  heading: 'Our Jute Product Catalog',
  intro:
    '11 product lines across 5 categories — from raw fibre to finished bags. Container-load quantities, government-certified quality.',
  catalogButtonLabel: 'Request a Quote',
  catalogButtonHref: 'https://wa.me/8801841111625',
  cta: {
    heading: 'Need a Quote?',
    description: "Tell us the product, quantity, and destination — we'll get back to you within one business day.",
    primaryAction: { label: 'WhatsApp', url: 'https://wa.me/8801841111625' },
    secondaryAction: { label: 'Send an Inquiry', url: '/contact' },
  },
}

export const metadata: Metadata = {
  alternates: { canonical: '/products' },
  description: PAGE.description,
  title: PAGE.title,
}

export default async function ProductsPage() {
  const { docs: products } = await getPublishedProducts()

  return (
    <main className="bg-background text-foreground">
      <JsonLd data={buildItemListLd(PAGE.title, products)} />
      <ProductCategoryGrid
        catalogButtonHref={PAGE.catalogButtonHref}
        catalogButtonLabel={PAGE.catalogButtonLabel}
        heading={PAGE.heading}
        intro={PAGE.intro}
        products={products}
      />
      <CallToActionSection cta={PAGE.cta} />
    </main>
  )
}
