import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Heritage Jute Fibers is a government-certified jute exporter based in Dhaka, Bangladesh, supplying raw jute, yarn, cloth, bags, and rope to importers worldwide.',
  images: [
    {
      url: `${getServerSideURL()}/og.jpg`,
    },
  ],
  siteName: 'Heritage Jute Fibers',
  title: 'Heritage Jute Fibers',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
