import { getPayload, type Payload } from 'payload'
import config from '@/payload.config'
import { importMarketingSite } from '@/importers/siteContent'
import { importProductCatalogue } from '@/importers/products'

import { describe, it, beforeAll, expect } from 'vitest'

import { loadTestImage } from '../helpers/testImage'

let payload: Payload

const importOptions = { loadImage: loadTestImage }

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
    const firstImport = await importProductCatalogue(payload, importOptions)
    const secondImport = await importProductCatalogue(payload, importOptions)

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

describe('Marketing site', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
    await importMarketingSite(payload, importOptions)
  })

  it('establishes the Shared Site Content the whole public shell renders', async () => {
    const [company, header, footer] = await Promise.all([
      payload.findGlobal({ slug: 'company', overrideAccess: false }),
      payload.findGlobal({ slug: 'header', depth: 0, overrideAccess: false }),
      payload.findGlobal({ slug: 'footer', overrideAccess: false }),
    ])

    expect(company.name).toBe('Heritage Jute Fibers')
    expect(company.address.locality).toBe('Dhaka')
    expect(company.phoneE164).toBe('+8801841111625')
    expect(company.whatsappUrl).toBe('https://wa.me/8801841111625')

    expect(header.logo).toEqual(expect.any(Number))
    expect(header.navItems?.map((item) => item.label)).toEqual(['Products', 'About', 'Contact'])
    expect(header.navItems?.[0]?.links?.map((link) => link.url)).toEqual([
      '/products#raw-materials',
      '/products#yarn',
      '/products#fabrics-cloth',
      '/products#bags-packaging',
      '/products#rope-twine',
    ])
    expect(header.ctaUrl).toBe(company.whatsappUrl)

    expect(footer.columns?.map((column) => column.heading)).toEqual(['Products', 'Company'])
    expect(footer.credentials).toContain('BJGEA')
  })

  it('establishes every fixed Site Page as published, at its own public path', async () => {
    const pages = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      pagination: false,
      sort: 'pageType',
    })

    expect(pages.totalDocs).toBe(5)
    expect(pages.docs.map((page) => `${page.pageType}:${page.slug}`).sort()).toEqual([
      'about:about',
      'contact:contact',
      'home:home',
      'privacy:privacy',
      'terms:terms',
    ])
    expect(pages.docs.every((page) => page._status === 'published')).toBe(true)
    expect(pages.docs.every((page) => Boolean(page.title && page.description))).toBe(true)
  })

  it('gives Home and About the full buyer-facing structure of the current site', async () => {
    const [home, about] = await Promise.all([
      payload.find({
        collection: 'pages',
        limit: 1,
        overrideAccess: false,
        where: { pageType: { equals: 'home' } },
      }),
      payload.find({
        collection: 'pages',
        limit: 1,
        overrideAccess: false,
        where: { pageType: { equals: 'about' } },
      }),
    ])

    const homeContent = home.docs[0]?.home
    const aboutContent = about.docs[0]?.about

    expect(homeContent?.hero.heading).toBe("Bangladesh's Trusted Jute Exporter")
    expect(homeContent?.productRange.items).toHaveLength(6)
    expect(homeContent?.globalReach.stats).toHaveLength(3)
    expect(homeContent?.ordering.secondParagraphEmphasis).toBe('3–6 weeks')
    expect(homeContent?.compliance.items).toHaveLength(4)
    expect(
      homeContent?.countries.regions?.reduce(
        (total, region) => total + (region.countries?.length ?? 0),
        0,
      ),
    ).toBe(31)
    expect(homeContent?.faqs.items).toHaveLength(8)
    expect(homeContent?.cta.primaryAction.url).toBe('https://wa.me/8801841111625')

    expect(aboutContent?.intro.heading).toBe('About Heritage Jute Fibers')
    expect(aboutContent?.intro.achievements).toHaveLength(4)
    expect(aboutContent?.intro.sections?.map((section) => section.title)).toEqual([
      'Our Company',
      'Our Approach',
    ])
    expect(aboutContent?.gallery.images?.length).toBeGreaterThan(0)
    expect(aboutContent?.numbers.testimonial.role).toBe('European packaging distributor')
    expect(aboutContent?.reasons.items).toHaveLength(6)
    expect(aboutContent?.compliance.items).toHaveLength(4)
  })

  it('carries the Contact and legal content across from the current site', async () => {
    const utility = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      pagination: false,
      where: { pageType: { in: ['contact', 'privacy', 'terms'] } },
    })

    const contact = utility.docs.find((page) => page.pageType === 'contact')?.contact
    const legal = utility.docs.filter((page) => page.pageType !== 'contact')

    expect(contact?.heading).toBe('Contact Heritage Jute Fibers')
    expect(contact?.form.submitLabel).toBe('Send Inquiry')
    expect(contact?.form.incoterms?.map((option) => option.value)).toEqual([
      'FOB',
      'CFR',
      'CIF',
      'EXW',
      'DDP',
      'unsure',
    ])

    expect(legal).toHaveLength(2)
    for (const page of legal) {
      expect(page.legal?.updated).toContain('2025-06-01')
      expect(JSON.stringify(page.legal?.content)).toContain('Heritage Jute Fibers')
    }
  })

  it('refuses a second Site Page of the same type', async () => {
    // The fixed model rests on there being exactly one page per type: the public routes
    // look a page up by `pageType` and take the first match.
    await expect(
      payload.create({
        collection: 'pages',
        data: {
          _status: 'draft',
          description: 'A duplicate of a page that already exists.',
          pageType: 'about',
          slug: 'about',
          title: 'Second About',
        },
      }),
    ).rejects.toThrow()
  })

  it('hides an unpublished Site Page from a buyer', async () => {
    const about = await payload.find({
      collection: 'pages',
      limit: 1,
      pagination: false,
      where: { pageType: { equals: 'about' } },
    })
    const id = about.docs[0]!.id

    // Unpublishing writes the live row back to draft; `draft: true` would instead add a
    // new draft version and leave the published one serving the public site.
    await payload.update({
      collection: 'pages',
      context: { disableRevalidate: true },
      data: { _status: 'draft' },
      id,
    })

    const asBuyer = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      pagination: false,
      where: { pageType: { equals: 'about' } },
    })
    const asAdministrator = await payload.find({
      collection: 'pages',
      draft: true,
      pagination: false,
      where: { pageType: { equals: 'about' } },
    })

    expect(asBuyer.totalDocs).toBe(0)
    expect(asAdministrator.totalDocs).toBe(1)

    await payload.update({
      collection: 'pages',
      context: { disableRevalidate: true },
      data: { _status: 'published' },
      id,
    })
  })

  it('can be re-run without duplicating Site Pages or Media Assets', async () => {
    const mediaBefore = await payload.count({ collection: 'media' })
    const before = await payload.find({ collection: 'pages', pagination: false, sort: 'pageType' })

    await importMarketingSite(payload, importOptions)

    const mediaAfter = await payload.count({ collection: 'media' })
    const after = await payload.find({ collection: 'pages', pagination: false, sort: 'pageType' })

    expect(after.totalDocs).toBe(5)
    expect(after.docs.map((page) => page.id)).toEqual(before.docs.map((page) => page.id))
    expect(mediaAfter.totalDocs).toBe(mediaBefore.totalDocs)
  })
})
