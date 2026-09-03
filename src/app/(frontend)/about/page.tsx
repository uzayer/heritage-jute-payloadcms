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

export async function generateMetadata(): Promise<Metadata> {
  const page = await requireSitePage('about')

  return { description: page.description, title: page.title }
}

export default async function AboutPage() {
  const { isEnabled: draft } = await draftMode()
  const page = await requireSitePage('about')
  const about = page.about

  if (!about) throw new Error('The About Site Page is missing its content.')

  return (
    <main className="bg-stone-50 text-stone-900">
      {draft ? <LivePreviewListener /> : null}
      <AboutIntro intro={about.intro} />
      <AboutGallery gallery={about.gallery} />
      <AboutNumbers numbers={about.numbers} />
      <AboutReasons reasons={about.reasons} />
      <ComplianceSection compliance={about.compliance} />
      <CallToActionSection cta={about.cta} />
    </main>
  )
}
