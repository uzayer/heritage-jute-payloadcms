import { test, expect } from '@playwright/test'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { importMarketingSite } from '@/importers/siteContent'
import { importProductCatalogue } from '@/importers/products'

const productRoutes = [
  ['cut-jute-fiber', 'Cut Jute Fiber'],
  ['hessian-bag', 'Hessian Bag (Burlap Sack)'],
  ['hessian-cloth', 'Hessian Cloth (Burlap)'],
  ['jute-bag', 'Jute Bag'],
  ['jute-rope', 'Jute Rope'],
  ['jute-sliver', 'Jute Sliver (Tossa)'],
  ['jute-twine', 'Jute Twine'],
  ['jute-yarn', 'Jute Yarn'],
  ['raw-jute', 'Raw Jute'],
  ['sacking-cloth', 'Sacking Cloth'],
  ['sacking-sack', 'Sacking Sack'],
] as const

const isMobile = () => test.info().project.name === 'webkit-mobile'

test.describe('Frontend', () => {
  // The same import a deployment runs, against the same local database, so the suite
  // exercises the real content rather than a fixture. A remotely hosted image that
  // cannot be fetched is warned about and skipped, so this works offline too.
  test.beforeAll(async () => {
    const payload = await getPayload({ config })
    await importProductCatalogue(payload)
    await importMarketingSite(payload)
  })

  test('presents the branded Home page', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle('Heritage Jute Fibers — Bangladesh Jute Exporter')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      "Bangladesh's Trusted Jute Exporter",
    )
    await expect(page.getByRole('heading', { name: 'Our Jute Product Range' })).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Trusted by Importers Worldwide' }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Government Certified & Compliant' }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Trusted by importers in 31 countries' }),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Common Buyer Questions' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Ready to Source Jute?' })).toBeVisible()
  })

  test('presents the branded About page', async ({ page }) => {
    await page.goto('http://localhost:3000/about')

    await expect(page).toHaveTitle(
      'About Heritage Jute Fibers — Certified Jute Exporter, Bangladesh',
    )
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('About Heritage Jute Fibers')
    await expect(page.getByRole('heading', { name: 'Heritage Jute by the Numbers' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Product gallery' })).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Why Partner with Heritage Jute' }),
    ).toBeVisible()

    // The header and footer both link buyers here for due diligence.
    await expect(page.locator('#certifications')).toBeVisible()
  })

  for (const path of ['/', '/about', '/products']) {
    test(`renders the shared navigation and footer on ${path}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${path}`)

      const navigation = page.getByRole('navigation', { name: 'Main navigation' })
      await expect(navigation).toBeVisible()
      await expect(navigation.getByText('Products', { exact: true })).toBeVisible()
      await expect(navigation.getByRole('link', { name: 'About', exact: true })).toBeVisible()
      await expect(navigation.getByRole('link', { name: 'Contact', exact: true })).toBeVisible()

      const footer = page.getByRole('contentinfo')
      await expect(footer.getByText('info@heritagejute.com')).toBeVisible()
      await expect(footer.getByText('+880 1841-111625')).toBeVisible()
      await expect(
        footer.getByText('BJGEA Member · ERC Registered · Jute Ministry Approved'),
      ).toBeVisible()
      await expect(footer.getByRole('link', { name: 'Privacy' })).toBeVisible()
    })
  }

  test('adapts the header to the viewport it is delivered to', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const whatsApp = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'WhatsApp' })

    // The header keeps its links at every width; the WhatsApp button is desktop-only so a
    // phone-width header stays on one line.
    if (isMobile()) {
      await expect(whatsApp).toBeHidden()
    } else {
      await expect(whatsApp).toBeVisible()
    }

    // The page itself never scrolls sideways, at either width.
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    )
    expect(overflows).toBe(false)
  })

  test('opens the Products navigation dropdown', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const navigation = page.getByRole('navigation', { name: 'Main navigation' })
    await navigation.getByText('Products', { exact: true }).click()

    await expect(navigation.getByRole('link', { name: 'Raw Materials' })).toBeVisible()
    await expect(navigation.getByRole('link', { name: 'Rope & Twine' })).toBeVisible()
  })

  test('lets buyers discover a published Product and read its detail page', async ({ page }) => {
    await page.goto('http://localhost:3000/products')

    await expect(page.getByRole('heading', { name: 'Jute Rope' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Sacking Sack' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Bags & Packaging' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Fabrics & Cloth' })).toBeVisible()
    await page.getByRole('link', { name: 'View Jute Rope' }).click()

    await expect(page).toHaveURL('http://localhost:3000/products/jute-rope')
    await expect(page.getByRole('heading', { name: 'Jute Rope' })).toBeVisible()
    await expect(page.getByText('Packing & Trade')).toBeVisible()
    await expect(page.getByText('LC at Sight, T/T, CAD')).toBeVisible()
  })

  for (const [slug, name] of productRoutes) {
    test(`resolves the preserved Product URL for ${name}`, async ({ page }) => {
      await page.goto(`http://localhost:3000/products/${slug}`)
      await expect(page.getByRole('heading', { name })).toBeVisible()
    })
  }
})
