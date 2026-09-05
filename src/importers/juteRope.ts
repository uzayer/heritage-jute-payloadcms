import type { Payload } from 'payload'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import 'dotenv/config'

import config from '@payload-config'
import { importProductCategories } from './productCategories'

const juteRopeImage = {
  alt: 'Coiled jute ropes',
  filename: 'jute-rope-placeholder.png',
}

const onePixelPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScL6MwAAAABJRU5ErkJggg==',
  'base64',
)

const juteRopeCategoryTitle = 'Rope & Twine'

const juteRope = {
  _status: 'published' as const,
  shortDescription:
    'Natural jute rope from 6 mm to 42 mm for packaging, tying, gardening, bundling, and industrial utility use.',
  name: 'Jute Rope',
  slug: 'jute-rope',
  overview: [
    {
      paragraph:
        'Jute rope is a utility product where diameter, roll weight, cover packing, and container tonnage are the main buying filters.',
    },
    {
      paragraph:
        'The page now makes those operational details visible before the buyer reaches out.',
    },
  ],
  applications: [
    'Packaging and bundling',
    'Agricultural tying',
    'Gardening and nursery use',
    'Warehouse and industrial utility binding',
  ],
  buyerChecklist: [
    'Select required diameter in millimeters.',
    'Confirm roll weight and cover packing.',
    "Match tonnage to 20' or 40' container program.",
  ],
  customization: [
    '6 mm to 42 mm thickness',
    '25 kg roll or buyer-specified roll weight',
    'Jute-fabric covered bundle packing',
  ],
  specificationGroups: [
    {
      name: 'Product Identity',
      specifications: [
        { label: 'Thickness', value: '6 mm to 42 mm', highlight: true },
        { label: 'Package', value: '25 kg roll', highlight: true },
        { label: "20' FCL", value: '13 MT', highlight: true },
        { label: "40' FCL", value: '24-26 MT', highlight: true },
        { label: 'Product Type', value: 'Jute rope', highlight: true },
        { label: 'Material', value: 'Twisted natural jute fiber', highlight: false },
        { label: 'Qualities', value: 'Sacking, Hessian, CB', highlight: false },
        { label: 'HS Code', value: '5607.90.90', highlight: false },
      ],
    },
    {
      name: 'Packing & Trade',
      specifications: [
        { label: 'Package', value: '25 kg per roll or as demanded', highlight: false },
        { label: 'Packing', value: '4-6 rolls covered with jute fabric', highlight: true },
        { label: "20' FCL", value: '13 MT', highlight: false },
        { label: "40' FCL", value: '24-26 MT', highlight: false },
      ],
    },
  ],
  variants: [],
}

export async function importJuteRope(payload: Payload) {
  const existingMedia = await payload.find({
    collection: 'media',
    limit: 1,
    pagination: false,
    where: { filename: { equals: juteRopeImage.filename } },
  })

  const media =
    existingMedia.docs[0] ??
    (await payload.create({
      collection: 'media',
      context: { disableRevalidate: true },
      data: { alt: juteRopeImage.alt },
      file: {
        data: onePixelPng,
        mimetype: 'image/png',
        name: juteRopeImage.filename,
        size: onePixelPng.byteLength,
      },
    }))

  const existingProduct = await payload.find({
    collection: 'products',
    limit: 1,
    pagination: false,
    where: { slug: { equals: juteRope.slug } },
  })

  const categories = await importProductCategories(payload)
  const category = categories.find((each) => each.title === juteRopeCategoryTitle)

  if (!category) throw new Error(`categories.json has no "${juteRopeCategoryTitle}" category.`)

  const data = { ...juteRope, category: category.id, image: media.id }
  const product = existingProduct.docs[0]

  if (product) {
    return payload.update({
      collection: 'products',
      context: { disableRevalidate: true },
      id: product.id,
      data,
    })
  }

  return payload.create({ collection: 'products', context: { disableRevalidate: true }, data })
}

async function runImport(): Promise<void> {
  const payload = await getPayload({ config })
  const product = await importJuteRope(payload)
  payload.logger.info(`Imported Product: ${juteRope.name} (${juteRope.slug}) as #${product.id}`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  void runImport().catch((error: unknown) => {
    console.error(error)
    process.exitCode = 1
  })
}
