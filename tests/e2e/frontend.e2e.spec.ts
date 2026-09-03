import { test, expect, Page } from '@playwright/test'
import { getPayload } from 'payload'

import config from '@/payload.config'
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

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const payload = await getPayload({ config })
    await importProductCatalogue(payload)

    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/Payload Website Template/)
    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Payload Website Template')
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
