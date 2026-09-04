import type { Metadata } from 'next'

import RichText from '@/components/RichText'
import { requireSitePage } from '@/utilities/sitePages'

export async function generateMetadata(): Promise<Metadata> {
  const page = await requireSitePage('terms')

  return {
    alternates: { canonical: '/terms' },
    description: page.description,
    title: page.title,
  }
}

export default async function TermsPage() {
  const page = await requireSitePage('terms')
  const legal = page.legal

  if (!legal) throw new Error('The Terms Site Page is missing its content.')

  return (
    <main className="bg-background text-foreground">
      <div className="container max-w-3xl py-16 md:py-20">
        <h1 className="text-4xl font-semibold tracking-tight">{page.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated:{' '}
          {new Date(legal.updated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>

        <RichText className="mt-10" data={legal.content} enableGutter={false} />
      </div>
    </main>
  )
}
