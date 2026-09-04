import type { Metadata } from 'next'

import { draftMode } from 'next/headers'
import React from 'react'

import { LivePreviewListener } from '@/components/LivePreviewListener'

import { CallToActionSection } from '@/components/site/CallToActionSection'
import { ComplianceSection } from '@/components/site/ComplianceSection'
import {
  HomeCountries,
  HomeFaqs,
  HomeGlobalReach,
  HomeHero,
  HomeOrdering,
  HomeProductRange,
} from '@/components/site/HomeSections'
import { requireSitePage } from '@/utilities/sitePages'
import { buildFaqPageLd, JsonLd } from '@/utilities/structuredData'

export async function generateMetadata(): Promise<Metadata> {
  const page = await requireSitePage('home')

  return { alternates: { canonical: '/' }, description: page.description, title: page.title }
}

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const page = await requireSitePage('home', draft)
  const home = page.home

  if (!home) throw new Error('The Home Site Page is missing its content.')

  return (
    <main className="bg-background text-foreground">
      {draft ? <LivePreviewListener /> : null}
      {home.faqs.items?.length ? <JsonLd data={buildFaqPageLd(home.faqs.items)} /> : null}
      <HomeHero hero={home.hero} />
      <HomeProductRange productRange={home.productRange} />
      <HomeGlobalReach globalReach={home.globalReach} />
      <HomeOrdering ordering={home.ordering} />
      <ComplianceSection compliance={home.compliance} />
      <HomeCountries countries={home.countries} />
      <HomeFaqs faqs={home.faqs} />
      <CallToActionSection cta={home.cta} />
    </main>
  )
}
