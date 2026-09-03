import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { importJuteRope } from '@/importers/juteRope'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

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

  it('imports one published Product with its Media Asset without duplicates', async () => {
    const firstImport = await importJuteRope(payload)
    const secondImport = await importJuteRope(payload)

    expect(secondImport.id).toBe(firstImport.id)
    expect(secondImport._status).toBe('published')
    expect(secondImport.image).toBeTruthy()
    expect(secondImport.specificationGroups).toHaveLength(2)
    expect(secondImport.variants ?? []).toHaveLength(0)
    expect(secondImport.specificationGroups?.[1]?.specifications).toHaveLength(11)

    const products = await payload.find({
      collection: 'products',
      overrideAccess: false,
      where: {
        slug: {
          equals: 'jute-rope',
        },
      },
    })

    expect(products.totalDocs).toBe(1)
  })
})
