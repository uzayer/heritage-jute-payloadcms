import { ArrowRight, MessageCircleMore } from 'lucide-react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CallToActionSection } from '@/components/site/CallToActionSection'
import { MediaImage } from '@/components/site/MediaImage'
import { ProductHeroSpecs, ProductSpecsSection } from '@/components/site/ProductSpecs'
import { buttonVariants } from '@/components/ui/button'
import { textLinkVariants } from '@/components/ui/interactive'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getProductBySlug, getPublishedProducts } from '@/utilities/products'
import { buildBreadcrumbListLd, buildProductLd, JsonLd } from '@/utilities/structuredData'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { docs: products } = await getPublishedProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const product = await getProductBySlug((await params).slug, draft)

  return product
    ? {
        alternates: { canonical: `/products/${product.slug}` },
        description: product.shortDescription,
        title: `${product.name} | Heritage Jute Fibers`,
      }
    : {}
}

export default async function ProductDetailPage({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const product = await getProductBySlug((await params).slug, draft)

  if (!product) notFound()

  const company = await getCachedGlobal('company')()
  const quoteHref = `/contact?product=${encodeURIComponent(product.name)}`
  const categoryTitle = typeof product.category === 'object' ? product.category.title : null

  return (
    <main className="bg-background text-foreground">
      <JsonLd
        data={buildBreadcrumbListLd([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />
      <JsonLd data={buildProductLd(product)} />

      <div className="border-muted-foreground/20">
        <div className="container max-w-6xl border-x border-muted-foreground/20 py-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-2 text-sm text-muted-foreground">
                <Link className={textLinkVariants({ tone: 'muted' })} href="/products">
                  <span data-slot="link-label">Products</span>
                </Link>{' '}
                {categoryTitle ? ` / ${categoryTitle}` : null}
              </div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{product.name}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{product.shortDescription}</p>

              <ProductHeroSpecs specificationGroups={product.specificationGroups} />

              <div className="mt-6 flex flex-wrap gap-3">
                <Link className={buttonVariants()} href={quoteHref}>
                  <span>Request a Quote</span>
                  <MessageCircleMore aria-hidden className="size-4" />
                </Link>
                <Link className={buttonVariants({ variant: 'outline' })} href="/contact">
                  <span>Contact Us</span>
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-border bg-muted">
              <MediaImage
                alt={product.name}
                className="absolute inset-0 size-full object-cover"
                loading="eager"
                media={product.image}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-muted-foreground/20">
        <div className="container max-w-6xl border-x border-muted-foreground/20 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Product Overview
              </p>
              <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">
                {product.overview?.map((paragraph) => (
                  <p key={paragraph.id ?? paragraph.paragraph}>{paragraph.paragraph}</p>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Buyer Checklist
              </p>
              <ul className="mt-4 space-y-3">
                {product.buyerChecklist?.map((note) => (
                  <li className="flex gap-2.5 text-sm leading-6 text-muted-foreground" key={note}>
                    <span aria-hidden className="mt-0.5 text-emerald-600">
                      ✓
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border p-6">
              <h2 className="text-xl font-semibold tracking-tight">Common Applications</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                {product.applications?.map((application) => (
                  <li key={application}>{application}</li>
                ))}
              </ul>
            </div>
            {product.customization && product.customization.length > 0 ? (
              <div className="rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold tracking-tight">
                  Customization &amp; Supply Options
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                  {product.customization.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <ProductSpecsSection
        specificationGroups={product.specificationGroups}
        tradeTerms={company.tradeTerms}
        variants={product.variants}
      />

      <CallToActionSection
        cta={{
          heading: `Need a quote for ${product.name}?`,
          description:
            "Send your required quantity, packing preference, destination port, and target Incoterm. We'll respond with the next sourcing step within one business day.",
          primaryAction: { label: 'Request a Quote', url: quoteHref },
          secondaryAction: { label: 'Send an Inquiry', url: '/contact' },
        }}
      />
    </main>
  )
}
