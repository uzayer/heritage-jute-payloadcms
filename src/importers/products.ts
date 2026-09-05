import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

import type { Payload } from 'payload'

import { importProductCategories } from './productCategories'
import {
  type ImageLoader,
  parseContentFile,
  readImageFile,
  resolveSourceDirectory,
  upsertMediaAsset,
} from './source'
import { SHARED_TRADE_TERM_LABELS } from './tradeTerms'

type Specification = {
  highlight?: boolean
  label: string
  value: boolean | string
}

type ProductSource = {
  applications: string[]
  buyerChecklist: string[]
  category: string
  customization: string[]
  image: { alt: string; src: string }
  name: string
  overview: string[]
  shortDescription: string
  specGroups: Array<{
    description?: string | null
    name: string
    specs: Specification[]
  }>
  variants?: Array<{
    description?: string | null
    name: string
    specs: Specification[]
  }> | null
}

type ImportOptions = {
  loadImage?: ImageLoader
  sourceDirectory?: string
}

const toSpecifications = (specifications: Specification[]) =>
  specifications.map((specification) => ({
    highlight: specification.highlight ?? false,
    label: specification.label,
    value: String(specification.value),
  }))

type ImportedSpecification = ReturnType<typeof toSpecifications>[number]

/**
 * Ten of the eleven source products list the same specification twice inside one group —
 * Jute Yarn carries "Count Range" twice in Product Identity, Jute Rope carries
 * "Thickness" as both "6-42 mm" and "6 mm to 42 mm". Anonymous collapsed rows in the
 * admin made that invisible, so the duplicates went unnoticed.
 *
 * Only duplicates *within* a group are collapsed. The same label appearing in two
 * different groups is deliberate: "Product Identity" is a summary card that restates the
 * headline figures, and it feeds the strip under the product name.
 *
 * Where the two wordings differ the longer one wins — it is the one carrying the extra
 * qualification ("25-100 kg depending on weave and size") — but it keeps the position of
 * the first, so the order feeding that summary strip is unchanged.
 */
const dedupeSpecifications = (specifications: ImportedSpecification[]) => {
  const byLabel = new Map<string, ImportedSpecification>()

  for (const specification of specifications) {
    const key = specification.label.trim().toLowerCase()
    const seen = byLabel.get(key)

    if (!seen) {
      byLabel.set(key, specification)
    } else if (specification.value.length > seen.value.length) {
      byLabel.set(key, { ...specification, highlight: seen.highlight })
    }
  }

  return [...byLabel.values()]
}

/** Drops the terms that are identical on every product and now live on the Company global. */
const withoutSharedTradeTerms = (specifications: ImportedSpecification[]) =>
  specifications.filter(
    (specification) => !SHARED_TRADE_TERM_LABELS.has(specification.label.trim().toLowerCase()),
  )

const toProductData = (source: ProductSource, image: number, slug: string, category: number) => ({
  _status: 'published' as const,
  applications: source.applications,
  buyerChecklist: source.buyerChecklist,
  category,
  customization: source.customization,
  image,
  name: source.name,
  overview: source.overview.map((paragraph) => ({ paragraph })),
  shortDescription: source.shortDescription,
  slug,
  specificationGroups: source.specGroups
    .map((group) => ({
      description: group.description ?? undefined,
      name: group.name,
      specifications: withoutSharedTradeTerms(dedupeSpecifications(toSpecifications(group.specs))),
    }))
    // A group made up entirely of shared trade terms has nothing product-specific left.
    .filter((group) => group.specifications.length > 0),
  variants: (source.variants ?? []).map((variant) => ({
    description: variant.description ?? undefined,
    name: variant.name,
    specifications: toSpecifications(variant.specs),
  })),
})

export async function importProductCatalogue(payload: Payload, options: ImportOptions = {}) {
  const sourceDirectory = resolveSourceDirectory(options.sourceDirectory)
  const productDirectory = path.join(sourceDirectory, 'src/content/products')
  const loadImage = options.loadImage ?? readImageFile
  const filenames = (await readdir(productDirectory))
    .filter((filename) => filename.endsWith('.md'))
    .sort()

  // The taxonomy has to exist before a product can point at it.
  const categories = await importProductCategories(payload, { sourceDirectory })
  const categoryIdsByTitle = new Map(
    categories.map((category) => [category.title.trim().toLowerCase(), category.id]),
  )

  const products = []

  for (const filename of filenames) {
    const slug = path.basename(filename, '.md')
    const { data: source } = parseContentFile<ProductSource>(
      await readFile(path.join(productDirectory, filename), 'utf8'),
    )
    const media = await upsertMediaAsset(payload, {
      alt: source.image.alt,
      file: await loadImage(sourceDirectory, source.image.src),
    })
    const category = categoryIdsByTitle.get(source.category.trim().toLowerCase())

    if (!category) {
      throw new Error(
        `${filename} has category "${source.category}", which is not in categories.json. ` +
          `Known categories: ${[...categoryIdsByTitle.keys()].join(', ')}.`,
      )
    }

    const data = toProductData(source, media, slug, category)
    const existingProduct = await payload.find({
      collection: 'products',
      limit: 1,
      pagination: false,
      where: { slug: { equals: slug } },
    })
    const product = existingProduct.docs[0]

    products.push(
      product
        ? await payload.update({
            collection: 'products',
            context: { disableRevalidate: true },
            data,
            id: product.id,
          })
        : await payload.create({
            collection: 'products',
            context: { disableRevalidate: true },
            data,
          }),
    )
  }

  return products
}
