import type { Metadata } from 'next'

import { ContactForm } from '@/components/site/ContactForm'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { requireSitePage } from '@/utilities/sitePages'
import { getPublishedProducts } from '@/utilities/products'
import { buildLocalBusinessLd, JsonLd } from '@/utilities/structuredData'

export async function generateMetadata(): Promise<Metadata> {
  const page = await requireSitePage('contact')

  return {
    alternates: { canonical: '/contact' },
    description: page.description,
    title: page.title,
  }
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>
}) {
  const [page, company, products, { product: defaultProduct }] = await Promise.all([
    requireSitePage('contact'),
    getCachedGlobal('company')(),
    getPublishedProducts(),
    searchParams,
  ])
  const contact = page.contact

  if (!contact) throw new Error('The Contact Site Page is missing its content.')

  return (
    <main className="bg-background text-foreground">
      <JsonLd data={buildLocalBusinessLd(company)} />
      <ContactForm
        title={contact.heading}
        description={contact.intro}
        corporateHeading={contact.officeHeading}
        addressLine1={company.address.line1}
        addressLine2={company.address.line2}
        contactHeading={contact.contactHeading}
        phone={company.phone}
        phoneE164={company.phoneE164}
        email={company.email}
        web={company.website}
        socialHeading={contact.socialHeading}
        socialLinks={(company.socialLinks ?? []).map(({ network, url }) => ({ network, url }))}
        formHeading={contact.form.heading}
        formIntro={contact.form.intro}
        successMessage={contact.form.successMessage}
        errorMessage={contact.form.errorMessage}
        submitLabel={contact.form.submitLabel}
        submittingLabel={contact.form.submittingLabel}
        incoterms={contact.form.incoterms ?? []}
        products={products.docs.map((product) => ({ name: product.name, slug: product.slug }))}
        defaultProduct={defaultProduct}
      />
    </main>
  )
}
