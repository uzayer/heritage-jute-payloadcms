import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPublishedProductBySlug, getPublishedProducts } from '@/utilities/products'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { docs: products } = await getPublishedProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const product = await getPublishedProductBySlug((await params).slug)

  if (!product) return {}

  return {
    description: product.shortDescription,
    title: `${product.name} | Heritage Jute Fibers`,
  }
}

export default async function ProductDetailPage({ params }: Args) {
  const product = await getPublishedProductBySlug((await params).slug)

  if (!product) notFound()

  const image = typeof product.image === 'object' ? product.image : null
  const highlightedSpecifications = product.specificationGroups
    ?.flatMap((group) => group.specifications ?? [])
    .filter((specification) => specification.highlight)
    .slice(0, 4)

  return (
    <main className="bg-stone-50 text-stone-900">
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <Link className="text-sm font-medium text-emerald-800 underline" href="/products">
            Products
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
            {product.category}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">{product.shortDescription}</p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200 sm:grid-cols-2">
            {highlightedSpecifications?.map((specification) => (
              <div className="bg-white p-4" key={specification.id}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                  {specification.label}
                </p>
                <p className="mt-2 font-semibold">{specification.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-stone-200 shadow-sm">
          {image?.url ? (
            // This is intentionally a plain image: R2 serves the public Media Asset URL directly.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={image.alt ?? product.name}
              className="aspect-[4/3] h-full w-full object-cover"
              src={image.url}
            />
          ) : (
            <div
              aria-label={`${product.name} image`}
              className="aspect-[4/3] bg-stone-200"
              role="img"
            />
          )}
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Product overview</h2>
            <div className="mt-5 space-y-4 leading-7 text-stone-600">
              {product.overview?.map((paragraph) => (
                <p key={paragraph.id}>{paragraph.paragraph}</p>
              ))}
            </div>
          </div>
          <aside className="rounded-2xl bg-stone-100 p-6">
            <h2 className="text-xl font-semibold">Buyer checklist</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
              {product.buyerChecklist?.map((item) => (
                <li key={item.id}>✓ {item.item}</li>
              ))}
            </ul>
          </aside>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:px-6 md:grid-cols-2 lg:px-8">
          <section className="rounded-2xl border border-stone-200 p-6">
            <h2 className="text-xl font-semibold">Common applications</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
              {product.applications?.map((application) => (
                <li key={application.id}>{application.item}</li>
              ))}
            </ul>
          </section>
          {product.customization && product.customization.length > 0 && (
            <section className="rounded-2xl border border-stone-200 p-6">
              <h2 className="text-xl font-semibold">Customization &amp; supply options</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
                {product.customization.map((option) => (
                  <li key={option.id}>{option.item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </section>

      <section className="border-t border-stone-200 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
            Export sheet
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Technical specifications</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {product.specificationGroups?.map((group) => (
              <section className="rounded-2xl border border-stone-200 bg-white p-6" key={group.id}>
                <h3 className="text-xl font-semibold">{group.name}</h3>
                {group.description && (
                  <p className="mt-2 text-sm text-stone-600">{group.description}</p>
                )}
                <dl className="mt-5 divide-y divide-stone-100 text-sm">
                  {group.specifications?.map((specification) => (
                    <div className="flex justify-between gap-4 py-3" key={specification.id}>
                      <dt className="text-stone-500">{specification.label}</dt>
                      <dd className="text-right font-medium">{specification.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">Product variants</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {product.variants.map((variant) => (
                  <section
                    className="rounded-2xl border border-stone-200 bg-white p-6"
                    key={variant.id}
                  >
                    <h3 className="font-semibold">{variant.name}</h3>
                    {variant.description && (
                      <p className="mt-2 text-sm text-stone-600">{variant.description}</p>
                    )}
                    <dl className="mt-4 divide-y divide-stone-100 text-sm">
                      {variant.specifications?.map((specification) => (
                        <div className="flex justify-between gap-4 py-3" key={specification.id}>
                          <dt className="text-stone-500">{specification.label}</dt>
                          <dd className="text-right font-medium">{specification.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
