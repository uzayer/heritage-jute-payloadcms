import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Product, ProductCategory } from '@/payload-types'

import { Reveal } from '@/components/motion/reveal'
import { textLinkVariants, interactiveCardClassName } from '@/components/ui/interactive'
import { cn } from '@/utilities/ui'

import { MediaImage } from './MediaImage'

export const ProductCategoryGrid: React.FC<{
  heading: string
  intro: string
  catalogButtonLabel: string
  catalogButtonHref: string
  categories: ProductCategory[]
  products: Product[]
}> = ({ heading, intro, catalogButtonLabel, catalogButtonHref, categories, products }) => {
  // Products carry a relationship to a category document, so grouping keys off the
  // category's id rather than a string that has to match its name character for character.
  const productsByCategory = new Map<number, Product[]>()
  for (const product of products) {
    const categoryId = typeof product.category === 'object' ? product.category.id : product.category
    const existing = productsByCategory.get(categoryId)
    if (existing) {
      existing.push(product)
    } else {
      productsByCategory.set(categoryId, [product])
    }
  }

  const sections = categories.flatMap((category) => {
    const categoryProducts = productsByCategory.get(category.id)
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
              <div id={category.slug ?? undefined} key={category.id}>
                <div className="mb-6 max-w-2xl">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                    {category.title}
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
