import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'

import { Reveal } from '@/components/motion/reveal'
import { textLinkVariants, interactiveCardClassName } from '@/components/ui/interactive'
import { cn } from '@/utilities/ui'

import { MediaImage } from './MediaImage'

/**
 * The real product taxonomy. Astro's CloudCannon-editable `categories.json`
 * has no CMS equivalent yet — this mirrors that file's current content so
 * the catalogue groups and reads exactly as it does on the live site.
 */
const CATEGORIES: { id: string; name: string; description: string }[] = [
  {
    id: 'raw-materials',
    name: 'Raw Materials',
    description:
      'Raw jute, jute sliver (Tossa), and cut jute fiber. Multiple grades: BTD, BTC, BTR, BWD, BWC. Supplied in pressed bales, by the container load.',
  },
  {
    id: 'yarn',
    name: 'Yarn',
    description:
      'Jute yarn in 8–96 lbs count range, single or multi-ply. Qualities: Sacking, Hessian, CB, CRM, CTR, CRX, White (Mesta). Natural, bleached, or dyed.',
  },
  {
    id: 'fabrics-cloth',
    name: 'Fabrics & Cloth',
    description:
      'Hessian cloth (burlap) and sacking cloth in 24–52 inch widths, 200–305 GSM. Pressed bales of 500–2,000 yards. FOB Chittagong.',
  },
  {
    id: 'bags-packaging',
    name: 'Bags & Packaging',
    description:
      'Hessian bags, sacking sacks, and general jute bags for grain, coffee, cocoa, and agricultural storage. Custom dimensions and private labeling available.',
  },
  {
    id: 'rope-twine',
    name: 'Rope & Twine',
    description:
      'Jute rope in 6–42 mm diameter and jute twine for packaging, tying, and gardening. Packed 25 kg per roll, 4–6 rolls per unit.',
  },
]

export const ProductCategoryGrid: React.FC<{
  heading: string
  intro: string
  catalogButtonLabel: string
  catalogButtonHref: string
  products: Product[]
}> = ({ heading, intro, catalogButtonLabel, catalogButtonHref, products }) => {
  const productsByCategory = new Map<string, Product[]>()
  for (const product of products) {
    const existing = productsByCategory.get(product.category)
    if (existing) {
      existing.push(product)
    } else {
      productsByCategory.set(product.category, [product])
    }
  }

  const sections = CATEGORIES.flatMap((category) => {
    const categoryProducts = productsByCategory.get(category.name)
    return categoryProducts && categoryProducts.length > 0
      ? [{ category, products: categoryProducts }]
      : []
  })

  return (
    <section>
      <div className="border-muted-foreground/20">
        <div className="container mx-auto border-x border-muted-foreground/20 py-32">
          <Reveal className="mb-9 lg:mb-14 lg:max-w-3xl" direction="none" eager>
            <h2 className="mb-3 text-3xl font-semibold tracking-tight text-balance md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h2>
            <p className="mb-8 text-muted-foreground lg:text-lg">{intro}</p>
            <a
              className={cn(
                textLinkVariants({ tone: 'primary' }),
                'font-medium md:text-base lg:text-lg',
              )}
              href={catalogButtonHref}
            >
              <span data-slot="link-label">{catalogButtonLabel}</span>
              <ArrowRight data-slot="link-icon" />
            </a>
          </Reveal>

          <div className="flex flex-col gap-14">
            {sections.map(({ category, products: categoryProducts }) => (
              <div id={category.id} key={category.id}>
                <div className="mb-6 max-w-2xl">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base">
                    {category.description}
                  </p>
                </div>
                <Reveal
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                  stagger={0.05}
                >
                  {categoryProducts.map((product) => (
                    <Link
                      className={cn(interactiveCardClassName, 'flex flex-col overflow-clip')}
                      href={`/products/${product.slug}`}
                      key={product.id}
                    >
                      <div className="group relative aspect-4/3 overflow-hidden rounded-t-[1.25rem]">
                        <MediaImage
                          className="absolute inset-0 size-full object-cover object-top transition-[transform,opacity] duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03] [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-88 motion-reduce:transition-none motion-reduce:transform-none"
                          media={product.image}
                        />
                      </div>
                      <div className="flex flex-1 flex-col px-5 pt-6 pb-6 md:px-6 md:pb-7 lg:px-8 lg:pb-8">
                        <h4 className="mb-2 text-base font-semibold md:text-lg">{product.name}</h4>
                        <p className="text-sm text-muted-foreground md:text-base">
                          {product.shortDescription}
                        </p>
                      </div>
                    </Link>
                  ))}
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
