import type { Metadata } from 'next'

import { draftMode } from 'next/headers'
import React from 'react'

import { LivePreviewListener } from '@/components/LivePreviewListener'

import {
  AboutGallery,
  AboutIntro,
  AboutNumbers,
  AboutReasons,
} from '@/components/site/AboutSections'
import { CallToActionSection } from '@/components/site/CallToActionSection'
import { ComplianceSection } from '@/components/site/ComplianceSection'
import { requireSitePage } from '@/utilities/sitePages'
import { buildAboutPageLd, JsonLd } from '@/utilities/structuredData'

export async function generateMetadata(): Promise<Metadata> {
  const page = await requireSitePage('about')

  return { alternates: { canonical: '/about' }, description: page.description, title: page.title }
}

export default async function AboutPage() {
  const { isEnabled: draft } = await draftMode()
  const page = await requireSitePage('about', draft)
  const about = page.about

  if (!about) throw new Error('The About Site Page is missing its content.')

  return (
    <main className="bg-background text-foreground">
      {draft ? <LivePreviewListener /> : null}
      <JsonLd data={buildAboutPageLd(page.title, page.description)} />
      <AboutIntro intro={about.intro} />
      <AboutGallery gallery={about.gallery} />
      <AboutNumbers numbers={about.numbers} />
      <AboutReasons reasons={about.reasons} />
      <ComplianceSection compliance={about.compliance} sectionId="certifications" />
      <CallToActionSection cta={about.cta} />
    </main>
  )
}
