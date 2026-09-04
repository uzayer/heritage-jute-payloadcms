import { test, expect } from '@playwright/test'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { importMarketingSite } from '@/importers/siteContent'
import { importProductCatalogue } from '@/importers/products'

const isMobile = () => test.info().project.name === 'webkit-mobile'

// The same import a deployment runs, against the same local database, so the suite
// exercises the real content rather than a fixture. Running it here at module scope
// (rather than in `beforeAll`) means the CMS data it produces is available before test
// registration too, so the assertions and the per-product test list below can be built
// from whatever the CMS currently holds instead of literals that drift as the site is
// edited. A remotely hosted image that cannot be fetched is warned about and skipped,
// so this works offline too.
const payload = await getPayload({ config })
await importProductCatalogue(payload)
await importMarketingSite(payload)

const { docs: products } = await payload.find({
  collection: 'products',
  draft: false,
  limit: 1000,
  pagination: false,
  sort: 'name',
})

const findPage = async (pageType: 'about' | 'home') => {
  const { docs } = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    pagination: false,
    where: { pageType: { equals: pageType } },
  })

  const page = docs[0]
  if (!page) throw new Error(`The ${pageType} Site Page is missing. Run the marketing-site importer.`)

  return page
}

const homePage = await findPage('home')
const aboutPage = await findPage('about')
const home = homePage.home!
const about = aboutPage.about!
const company = await payload.findGlobal({ slug: 'company' })
const footerGlobal = await payload.findGlobal({ slug: 'footer' })
const header = await payload.findGlobal({ slug: 'header' })

// The Products item is the one with a dropdown; the rest render as plain links. Neither
// the label nor the grouping is hardcoded here, so a nav edit in the CMS doesn't need a
// matching test edit.
const dropdownNavItem = header.navItems?.find((item) => item.links?.length)
const plainNavItems = header.navItems?.filter((item) => !item.links?.length) ?? []

test.describe('Frontend', () => {
  test('presents the branded Home page', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(homePage.title)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(home.hero.heading)
    await expect(page.getByRole('heading', { name: home.productRange.heading })).toBeVisible()
    await expect(page.getByRole('heading', { name: home.globalReach.heading })).toBeVisible()
    await expect(page.getByRole('heading', { name: home.compliance.heading })).toBeVisible()
    await expect(page.getByRole('heading', { name: home.countries.heading })).toBeVisible()
    await expect(page.getByRole('heading', { name: home.faqs.heading })).toBeVisible()
    await expect(page.getByRole('heading', { name: home.cta.heading })).toBeVisible()
  })

  test('presents the branded About page', async ({ page }) => {
    await page.goto('http://localhost:3000/about')

    await expect(page).toHaveTitle(aboutPage.title)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(about.intro.heading)
    await expect(page.getByRole('heading', { name: about.numbers.heading })).toBeVisible()
    await expect(page.getByRole('heading', { name: about.gallery.heading })).toBeVisible()
    await expect(page.getByRole('heading', { name: about.reasons.heading })).toBeVisible()

    // The header and footer both link buyers here for due diligence.
    await expect(page.locator('#certifications')).toBeVisible()
  })

  for (const path of ['/', '/about', '/products']) {
    test(`renders the shared navigation and footer on ${path}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${path}`)

      const navigation = page.getByRole('navigation', { name: 'Main navigation' })
      await expect(navigation).toBeVisible()

      // On mobile the links live behind the menu toggle rather than inline.
      let linkScope = navigation
      if (isMobile()) {
        await navigation.getByRole('button', { name: 'Menu' }).click()
        linkScope = page.getByRole('dialog')
      }
      if (dropdownNavItem) {
        await expect(linkScope.getByText(dropdownNavItem.label, { exact: true })).toBeVisible()
      }
      for (const item of plainNavItems) {
        await expect(linkScope.getByRole('link', { name: item.label, exact: true })).toBeVisible()
      }
      if (isMobile()) await page.getByRole('button', { name: 'Close' }).click()

      const footer = page.getByRole('contentinfo')
      await expect(footer.getByText(company.email)).toBeVisible()
      await expect(footer.getByText(company.phone)).toBeVisible()
      await expect(footer.getByText(footerGlobal.credentials)).toBeVisible()
      await expect(footer.getByRole('link', { name: 'Privacy' })).toBeVisible()
    })
  }

  test('adapts the header to the viewport it is delivered to', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const whatsApp = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: header.ctaLabel })

    // The header keeps its links at every width; the CTA button is desktop-only so a
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

  test('lets a visitor explicitly choose the site theme', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const toggle = page.getByRole('button', { name: /switch to (light|dark) mode/i })
    await expect(toggle).toBeVisible()

    const currentTheme = await page.locator('html').getAttribute('data-theme')
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'

    await toggle.click()

    await expect(page.locator('html')).toHaveAttribute('data-theme', nextTheme)
    await expect(toggle).toHaveAccessibleName(`Switch to ${currentTheme} mode`)
    await expect
      .poll(() => page.evaluate(() => window.localStorage.getItem('payload-theme')))
      .toBe(nextTheme)
  })

  test('opens the Products navigation dropdown', async ({ page }) => {
    test.skip(isMobile(), 'The desktop mega-menu is replaced by a flat mobile menu below the breakpoint.')
    test.skip(!dropdownNavItem?.links?.length, 'No dropdown-style navigation item is configured.')

    await page.goto('http://localhost:3000')

    const navigation = page.getByRole('navigation', { name: 'Main navigation' })
    await navigation.getByText(dropdownNavItem!.label, { exact: true }).click()

    for (const link of dropdownNavItem!.links!) {
      await expect(navigation.getByRole('link', { name: link.label })).toBeVisible()
    }
  })

  test('lets buyers discover a published Product and read its detail page', async ({ page }) => {
    test.skip(products.length === 0, 'No published Products are available to discover.')

    const categories = [...new Set(products.map((product) => product.category))]
    // Prefer a product with specification groups so the detail-page assertions below
    // exercise real specification rendering rather than skipping it.
    const featured = products.find((product) => product.specificationGroups?.length) ?? products[0]!

    await page.goto('http://localhost:3000/products')

    for (const category of categories) {
      await expect(page.getByRole('heading', { name: category, exact: true })).toBeVisible()
    }
    await page.getByRole('link', { name: `View ${featured.name}` }).click()

    await expect(page).toHaveURL(`http://localhost:3000/products/${featured.slug}`)
    await expect(page.getByRole('heading', { name: featured.name, exact: true })).toBeVisible()

    const group = featured.specificationGroups?.[0]
    if (group) {
      await expect(page.getByText(group.name).first()).toBeVisible()

      // A highlighted specification can also appear in the summary block above the
      // detailed groups, so this only needs to find the value somewhere on the page.
      const specification = group.specifications?.[0]
      if (specification) await expect(page.getByText(String(specification.value)).first()).toBeVisible()
    }
  })

  for (const product of products) {
    test(`resolves the preserved Product URL for ${product.name}`, async ({ page }) => {
      await page.goto(`http://localhost:3000/products/${product.slug}`)
      await expect(page.getByRole('heading', { name: product.name, exact: true })).toBeVisible()
    })
  }

  test('presents the Contact page with a product-aware inquiry form', async ({ page }) => {
    test.skip(products.length === 0, 'No published Products are available to populate the select.')

    await page.goto('http://localhost:3000/contact')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByLabel('Full name')).toBeVisible()
    await expect(page.getByLabel('Email address')).toBeVisible()

    // The product select is populated from the imported catalogue, not hardcoded.
    await page.getByRole('combobox', { name: 'Product of interest' }).click()
    await expect(page.getByRole('option', { name: products[0]!.name })).toBeVisible()
  })

  test('presents the Privacy and Terms Site Pages', async ({ page }) => {
    for (const path of ['/privacy', '/terms']) {
      await page.goto(`http://localhost:3000${path}`)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.getByText(/^Last updated:/)).toBeVisible()
    }
  })
})
