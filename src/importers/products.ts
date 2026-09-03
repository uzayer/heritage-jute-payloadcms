import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

import type { Payload } from 'payload'

import {
  type ImageLoader,
  parseContentFile,
  readImageFile,
  resolveSourceDirectory,
  upsertMediaAsset,
} from './source'

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

const toProductData = (source: ProductSource, image: number, slug: string) => ({
  _status: 'published' as const,
  applications: source.applications.map((item) => ({ item })),
  buyerChecklist: source.buyerChecklist.map((item) => ({ item })),
  category: source.category,
  customization: source.customization.map((item) => ({ item })),
  image,
  name: source.name,
  overview: source.overview.map((paragraph) => ({ paragraph })),
  shortDescription: source.shortDescription,
  slug,
  specificationGroups: source.specGroups.map((group) => ({
    description: group.description ?? undefined,
    name: group.name,
    specifications: toSpecifications(group.specs),
  })),
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
    const data = toProductData(source, media, slug)
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
