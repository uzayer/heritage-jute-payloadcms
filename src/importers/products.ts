import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

import type { File, Payload } from 'payload'
import YAML from 'yaml'

const defaultSourceDirectory = path.resolve(process.cwd(), '../heritage-jute')

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
  loadImage?: (source: ProductSource, sourceDirectory: string) => Promise<File>
  sourceDirectory?: string
}

const parseProduct = (raw: string): ProductSource => {
  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---/)

  if (!frontmatter) throw new Error('Product source is missing YAML frontmatter.')

  return YAML.parse(frontmatter[1]) as ProductSource
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

const getImageFile = async (source: ProductSource, sourceDirectory: string): Promise<File> => {
  const imagePath = path.join(sourceDirectory, 'public', source.image.src.replace(/^\//, ''))
  const data = Buffer.from(await readFile(imagePath))

  return {
    data,
    mimetype: `image/${path.extname(imagePath).slice(1)}`,
    name: path.basename(imagePath),
    size: data.byteLength,
  }
}

export async function importProductCatalogue(payload: Payload, options: ImportOptions = {}) {
  const sourceDirectory =
    options.sourceDirectory ?? process.env.HERITAGE_JUTE_SOURCE_DIR ?? defaultSourceDirectory
  const productDirectory = path.join(sourceDirectory, 'src/content/products')
  const loadImage = options.loadImage ?? getImageFile
  const filenames = (await readdir(productDirectory))
    .filter((filename) => filename.endsWith('.md'))
    .sort()

  const products = []

  for (const filename of filenames) {
    const slug = path.basename(filename, '.md')
    const source = parseProduct(await readFile(path.join(productDirectory, filename), 'utf8'))
    const imageFile = await loadImage(source, sourceDirectory)
    const existingMedia = await payload.find({
      collection: 'media',
      limit: 1,
      pagination: false,
      where: { filename: { equals: imageFile.name } },
    })
    const media =
      existingMedia.docs[0] ??
      (await payload.create({
        collection: 'media',
        context: { disableRevalidate: true },
        data: { alt: source.image.alt },
        file: imageFile,
      }))
    const data = toProductData(source, media.id, slug)
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
