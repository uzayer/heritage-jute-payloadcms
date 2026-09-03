import { PayloadRedirects } from '@/components/PayloadRedirects'

type Args = { params: Promise<{ slug: string }> }

/** Fixed Site Pages have explicit routes; unknown single-segment paths may still be CMS redirects. */
export default async function LegacyPage({ params }: Args) {
  return <PayloadRedirects url={`/${(await params).slug}`} />
}
