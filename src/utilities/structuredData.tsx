import type React from 'react'

import type { Company, Media, Product } from '@/payload-types'

import { getServerSideURL } from './getURL'

/** JSON-LD requires absolute URLs; Media Assets can carry a relative local path. */
const absoluteMediaUrl = (media: (number | null) | Media | undefined) => {
  const resource = typeof media === 'object' ? media : null
  if (!resource?.url) return undefined

  return resource.url.startsWith('http') ? resource.url : `${getServerSideURL()}${resource.url}`
}

const toPostalAddress = (company: Company) => ({
  '@type': 'PostalAddress',
  addressCountry: company.address.countryCode,
  addressLocality: company.address.locality,
  postalCode: company.address.postalCode,
  streetAddress: [company.address.line1, company.address.line2].filter(Boolean).join(', '),
})

export const buildOrganizationLd = (company: Company, logo?: (number | null) | Media) => {
  const siteUrl = getServerSideURL()

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    address: toPostalAddress(company),
    contactPoint: {
      '@type': 'ContactPoint',
      availableLanguage: ['English', 'Bengali'],
      contactType: 'sales',
      telephone: company.phoneE164,
    },
    description: company.summary,
    logo: absoluteMediaUrl(logo),
    name: company.name,
    url: siteUrl,
  }
}

export const buildLocalBusinessLd = (company: Company) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  address: toPostalAddress(company),
  email: company.email,
  name: company.name,
  telephone: company.phoneE164,
  url: getServerSideURL(),
})

export const buildAboutPageLd = (name: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  description,
  name,
  url: `${getServerSideURL()}/about`,
})

export const buildFaqPageLd = (items: { answer: string; question: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ answer, question }) => ({
    '@type': 'Question',
    acceptedAnswer: { '@type': 'Answer', text: answer },
    name: question,
  })),
})

export const buildItemListLd = (name: string, products: Product[]) => {
  const siteUrl = getServerSideURL()

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      name: product.name,
      position: index + 1,
      url: `${siteUrl}/products/${product.slug}`,
    })),
    name,
    numberOfItems: products.length,
    url: `${siteUrl}/products`,
  }
}

export const buildProductLd = (product: Product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  brand: { '@type': 'Brand', name: 'Heritage Jute Fibers' },
  category: product.category,
  description: product.shortDescription,
  image: absoluteMediaUrl(product.image),
  name: product.name,
})

export const buildBreadcrumbListLd = (crumbs: { name: string; path: string }[]) => {
  const siteUrl = getServerSideURL()

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(({ name, path }, index) => ({
      '@type': 'ListItem',
      item: `${siteUrl}${path}`,
      name,
      position: index + 1,
    })),
  }
}

/** Renders a JSON-LD object as the inline script tag search engines expect. */
export const JsonLd: React.FC<{ data: object }> = ({ data }) => (
  // eslint-disable-next-line react/no-danger
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
)
