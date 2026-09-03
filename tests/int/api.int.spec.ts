import { getPayload, type File, Payload } from 'payload'
import config from '@/payload.config'
import { importProductCatalogue } from '@/importers/products'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

const testImage: File = {
  data: Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScL6MwAAAABJRU5ErkJggg==',
    'base64',
  ),
  mimetype: 'image/png',
  name: 'catalogue-test-image.png',
  size: 67,
}

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  it('imports the complete published Product catalogue without duplicates', async () => {
    const options = { loadImage: async () => testImage }
    const firstImport = await importProductCatalogue(payload, options)
    const secondImport = await importProductCatalogue(payload, options)

    expect(secondImport).toHaveLength(11)
    expect(secondImport.map((product) => product.id)).toEqual(
      firstImport.map((product) => product.id),
    )
    expect(secondImport.every((product) => product._status === 'published')).toBe(true)
    expect(secondImport.find((product) => product.slug === 'jute-yarn')?.variants).toHaveLength(19)
    expect(secondImport.find((product) => product.slug === 'sacking-sack')?.variants).toHaveLength(
      8,
    )

    const products = await payload.find({
      collection: 'products',
      overrideAccess: false,
      where: {
        slug: {
          in: [
            'cut-jute-fiber',
            'hessian-bag',
            'hessian-cloth',
            'jute-bag',
            'jute-rope',
            'jute-sliver',
            'jute-twine',
            'jute-yarn',
            'raw-jute',
            'sacking-cloth',
            'sacking-sack',
          ],
        },
      },
    })

    expect(products.totalDocs).toBe(11)
  })
})
