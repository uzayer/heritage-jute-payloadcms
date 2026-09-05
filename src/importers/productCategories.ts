import type { Payload } from 'payload'

import type { ProductCategory } from '../payload-types'

import { readDataFile, resolveSourceDirectory } from './source'

type CategorySource = {
  description: string
  id: string
  name: string
}

/**
 * Astro's `categories.json` is the catalogue taxonomy. It used to be mirrored as a
 * hard-coded array inside `ProductCategoryGrid`; it now becomes real documents, so the
 * wording and the section order are editable and a product can only point at one that
 * exists. The source `id` becomes the slug because the header links to it as an anchor.
 */
export async function importProductCategories(
  payload: Payload,
  options: { sourceDirectory?: string } = {},
) {
  const sourceDirectory = resolveSourceDirectory(options.sourceDirectory)
  const sources = await readDataFile<CategorySource[]>(
    sourceDirectory,
    'src/data/categories.json',
  )

  const categories: ProductCategory[] = []

  for (const [index, source] of sources.entries()) {
    const data = {
      description: source.description,
      order: index,
      slug: source.id,
      title: source.name,
    }
    const existing = await payload.find({
      collection: 'product-categories',
      limit: 1,
      pagination: false,
      where: { slug: { equals: source.id } },
    })
    const category = existing.docs[0]

    categories.push(
      category
        ? await payload.update({
            collection: 'product-categories',
            context: { disableRevalidate: true },
            data,
            id: category.id,
          })
        : await payload.create({
            collection: 'product-categories',
            context: { disableRevalidate: true },
            data,
          }),
    )
  }

  return categories
}
