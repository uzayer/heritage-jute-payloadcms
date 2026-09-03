import type { Metadata } from 'next'
import Link from 'next/link'

import { getPublishedProducts } from '@/utilities/products'

export const metadata: Metadata = {
  description:
    'Export-ready jute fiber, rope, yarn, cloth, bag, and packaging products from Bangladesh.',
  title: 'Products | Heritage Jute Fibers',
}

export default async function ProductsPage() {
  const { docs: products } = await getPublishedProducts()
  const productsByCategory = new Map<string, typeof products>()

  for (const product of products) {
    productsByCategory.set(product.category, [
      ...(productsByCategory.get(product.category) ?? []),
      product,
    ])
  }

  return (
    <main className="bg-stone-50 px-4 py-16 text-stone-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
          Heritage Jute Fibers
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Export product catalogue
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
          Review buyer-facing product details, technical specifications, packing, and supply options
          before requesting a quote.
        </p>

        <div className="mt-10 space-y-12">
          {[...productsByCategory].map(([category, categoryProducts]) => (
            <section key={category}>
              <h2 className="text-2xl font-semibold tracking-tight">{category}</h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryProducts.map((product) => (
                  <article
                    className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
                    key={product.id}
                  >
                    <h3 className="text-2xl font-semibold tracking-tight">{product.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-stone-600">
                      {product.shortDescription}
                    </p>
                    <Link
                      className="mt-6 inline-flex rounded-full bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      href={`/products/${product.slug}`}
                    >
                      View {product.name}
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  )
}
