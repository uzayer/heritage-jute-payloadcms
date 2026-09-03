import type { Payload } from 'payload'

import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'

import type { Page } from '@/payload-types'

import {
  type ImageLoader,
  readContentFile,
  readDataFile,
  readImageFile,
  resolveSourceDirectory,
  upsertMediaAsset,
} from './source'

/**
 * Imports the Shared Site Content and the fixed Site Pages from the current Astro
 * site. Re-running it overwrites the same records and reuses the same Media Assets,
 * so the CMS can be reset to the live wording at any point during the migration.
 */

type Image = { alt: string; src: string }
type Labelled = { description: string; title: string }
type IconItem<TIcon extends string> = Labelled & { icon: TIcon }
type ComplianceSource = {
  complianceDescription: string
  complianceHeading: string
  description: string
  features: Labelled[]
  heading: string
}
type CtaSource = {
  description: string
  heading: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
}

/** The icon names the Home and About Site Page fields accept. */
type HomeIcon = NonNullable<NonNullable<Page['home']>['productRange']['items']>[number]['icon']
type AboutIcon = NonNullable<NonNullable<Page['about']>['reasons']['items']>[number]['icon']

type SiteSource = {
  address: {
    country_code: string
    line1: string
    line2: string
    locality: string
    postal_code: string
  }
  email: string
  established_year: string
  name: string
  phone: string
  phone_e164: string
  social_links: { network: string; url: string }[]
  web: { label: string; url: string }
  whatsapp_url: string
}

type NavigationSource = {
  buttons: { label: string; url: string }[]
  items: {
    links?: { description?: string; label: string; url: string }[]
    title: string
    url?: string
  }[]
  logo: { alt: string; src: string }
}

type FooterSource = { columns: { heading: string; links: { label: string; url: string }[] }[] }
type FaqSource = { answer: string; question: string }
type GallerySource = Image

type HomeSource = {
  compliance: ComplianceSource
  content: {
    ctaHref: string
    ctaLabel: string
    heading: string
    paragraph1: string
    paragraph2Bold: string
    paragraph2Prefix: string
    paragraph2Suffix: string
  }
  countries: {
    description: string
    eyebrow: string
    heading: string
    regions: { countries: { flag: string; name: string }[]; label: string }[]
  }
  cta: CtaSource
  description: string
  featureRange: {
    heading: string
    image: Image
    lede: string
    reasons: IconItem<HomeIcon>[]
  }
  hero: {
    heading: string
    primaryHref: string
    primaryLabel: string
    secondaryHref: string
    secondaryLabel: string
    subtext: string
  }
  stats: {
    description: string
    heading: string
    mapImageAlt: string
    mapImageSrc: string
    stats: { descriptionLead: string; descriptionRest?: string; suffix?: string; value: string }[]
  }
  title: string
}

type AboutSource = {
  compliance: ComplianceSource
  cta: CtaSource
  description: string
  features: { description: string; heading: string; items: IconItem<AboutIcon>[] }
  intro: {
    achievements: { label: string; value: string }[]
    achievementsDescription: string
    achievementsTitle: string
    breakout: { buttonText: string; buttonUrl: string; description: string; title: string }
    contentSections: { content: string; title: string }[]
    description: string
    mainImage: Image
    secondaryImage: Image
    title: string
  }
  stats: {
    descriptionBold: string
    descriptionPrefix: string
    descriptionSuffix: string
    heading: string
    introText: string
    stats: { label: string; value: string }[]
    testimonialAuthor: string
    testimonialQuote: string
    testimonialRole: string
  }
  title: string
}

type ContactSource = {
  contactHeading: string
  corporateHeading: string
  description: string
  formHeading: string
  heading: string
  intro: string
  socialHeading: string
  submitLabel: string
  successMessage: string
  title: string
}

type LegalSource = { description: string; title: string; updated: string }

/**
 * Wording with no home in the Astro content files: some of it is held inline in an
 * Astro component, the rest is chrome this port introduces. Either way it lands in the
 * CMS here so the Site Administrator can edit it, and it is the one part of the import
 * that will not follow a change made to the Astro site.
 */
const componentCopy = {
  contactFormError: 'We could not send your inquiry. Please try again, or email us directly.',
  contactFormIntro:
    'Share the product, quantity, destination port, and target Incoterm. We use those details to reply with a more accurate export quote.',
  contactSubmittingLabel: 'Sending…',
  faqHeading: 'Common Buyer Questions',
  globalReachEyebrow: 'Global reach',
  heroEyebrow: 'Heritage Jute Fibers · Bangladesh',
  faqIntro:
    'Answers to the most common questions from importers about ordering, payment, shipping, and customisation.',
  footerCredentials: 'BJGEA Member · ERC Registered · Jute Ministry Approved',
  galleryHeading: 'Product gallery',
  galleryLinkLabel: 'Browse our catalog',
  galleryLinkURL: '/products',
}

const incoterms = [
  { label: 'FOB - Free on Board', value: 'FOB' },
  { label: 'CFR - Cost & Freight', value: 'CFR' },
  { label: 'CIF - Cost, Insurance & Freight', value: 'CIF' },
  { label: 'EXW - Ex Works', value: 'EXW' },
  { label: 'DDP - Delivered Duty Paid', value: 'DDP' },
  { label: 'Not sure', value: 'unsure' },
]

const socialNetworks = ['facebook', 'linkedin', 'twitter'] as const
type SocialNetwork = (typeof socialNetworks)[number]

/** Fails in the importer, naming the offending value, rather than deep in Payload. */
const toSocialNetwork = (network: string): SocialNetwork => {
  const match = socialNetworks.find((candidate) => candidate === network)

  if (!match) throw new Error(`site.json has an unsupported social network: ${network}.`)

  return match
}

const toAction = (label: string, url: string) => ({ label, url })

const toCompliance = (source: ComplianceSource) => ({
  credentialsDescription: source.complianceDescription,
  credentialsHeading: source.complianceHeading,
  description: source.description,
  heading: source.heading,
  items: source.features.map(({ description, title }) => ({ description, title })),
})

const toCta = (source: CtaSource) => ({
  description: source.description,
  heading: source.heading,
  primaryAction: toAction(source.primaryLabel, source.primaryHref),
  secondaryAction: toAction(source.secondaryLabel, source.secondaryHref),
})

type ImportOptions = { loadImage?: ImageLoader; sourceDirectory?: string }

/**
 * Exactly what a fixed Site Page is written with: every field except the ones Payload
 * generates. Imported pages are always published, so the status is fixed rather than
 * optional — that also keeps `create` off its draft-only overload.
 */
type SitePageData = Omit<Page, '_status' | 'createdAt' | 'id' | 'slug' | 'updatedAt'> & {
  _status: 'published'
}

export async function importMarketingSite(payload: Payload, options: ImportOptions = {}) {
  const sourceDirectory = resolveSourceDirectory(options.sourceDirectory)
  const loadImage = options.loadImage ?? readImageFile
  const upload = async ({ alt, src }: Image) => {
    try {
      return await upsertMediaAsset(payload, { alt, file: await loadImage(sourceDirectory, src) })
    } catch (error) {
      // A handful of marketing photographs are hosted remotely rather than served from
      // the Astro site. Losing one to an unreachable network should leave a gap on the
      // page and a warning in the log, not abandon the whole import; a missing local
      // file means the source directory is wrong, which should still stop everything.
      if (!/^https?:\/\//.test(src)) throw error

      payload.logger.warn(`Could not import the remote image ${src}: ${String(error)}`)

      return undefined
    }
  }

  const [site, navigation, footer, faqs, gallery] = await Promise.all([
    readDataFile<SiteSource>(sourceDirectory, 'src/data/site.json'),
    readDataFile<NavigationSource>(sourceDirectory, 'src/data/navigation.json'),
    readDataFile<FooterSource>(sourceDirectory, 'src/data/footer.json'),
    readDataFile<FaqSource[]>(sourceDirectory, 'src/data/faqs.json'),
    readDataFile<GallerySource[]>(sourceDirectory, 'src/data/gallery.json'),
  ])

  const [homeSource, aboutSource, contactSource, privacySource, termsSource] = await Promise.all([
    readContentFile<HomeSource>(sourceDirectory, 'src/content/pages/index.md'),
    readContentFile<AboutSource>(sourceDirectory, 'src/content/pages/about.md'),
    readContentFile<ContactSource>(sourceDirectory, 'src/content/pages/contact.md'),
    readContentFile<LegalSource>(sourceDirectory, 'src/content/legal/privacy.md'),
    readContentFile<LegalSource>(sourceDirectory, 'src/content/legal/terms.md'),
  ])

  await payload.updateGlobal({
    slug: 'company',
    context: { disableRevalidate: true },
    data: {
      address: {
        countryCode: site.address.country_code,
        line1: site.address.line1,
        line2: site.address.line2,
        locality: site.address.locality,
        postalCode: site.address.postal_code,
      },
      email: site.email,
      name: site.name,
      phone: site.phone,
      phoneE164: site.phone_e164,
      socialLinks: site.social_links.map((link) => ({
        network: toSocialNetwork(link.network),
        url: link.url,
      })),
      summary: homeSource.data.description,
      website: site.web,
      whatsappUrl: site.whatsapp_url,
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: {
      ctaLabel: navigation.buttons[0]?.label ?? 'WhatsApp',
      ctaUrl: navigation.buttons[0]?.url ?? site.whatsapp_url,
      logo: await upload(navigation.logo),
      navItems: navigation.items.map((item) => ({
        label: item.title,
        links: (item.links ?? []).map((link) => ({
          description: link.description,
          label: link.label,
          url: link.url,
        })),
        url: item.url ?? '/',
      })),
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: { columns: footer.columns, credentials: componentCopy.footerCredentials },
  })

  // SQLite takes one write transaction at a time, so Media Assets are uploaded in
  // sequence rather than concurrently.
  const galleryImages = []

  for (const image of gallery) {
    galleryImages.push({ image: await upload(image) })
  }

  const home = homeSource.data
  const about = aboutSource.data
  const contact = contactSource.data
  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const toRichText = (markdown: string) =>
    convertMarkdownToLexical({ editorConfig, markdown }) as NonNullable<
      NonNullable<Page['legal']>['content']
    >

  const pages: SitePageData[] = [
    {
      _status: 'published',
      description: home.description,
      home: {
        compliance: toCompliance(home.compliance),
        countries: home.countries,
        cta: toCta(home.cta),
        faqs: {
          heading: componentCopy.faqHeading,
          intro: componentCopy.faqIntro,
          items: faqs.map(({ answer, question }) => ({ answer, question })),
        },
        globalReach: {
          description: home.stats.description,
          eyebrow: componentCopy.globalReachEyebrow,
          heading: home.stats.heading,
          mapImage: await upload({ alt: home.stats.mapImageAlt, src: home.stats.mapImageSrc }),
          stats: home.stats.stats,
        },
        hero: {
          eyebrow: componentCopy.heroEyebrow,
          heading: home.hero.heading,
          primaryAction: toAction(home.hero.primaryLabel, home.hero.primaryHref),
          secondaryAction: toAction(home.hero.secondaryLabel, home.hero.secondaryHref),
          subtext: home.hero.subtext,
        },
        ordering: {
          firstParagraph: home.content.paragraph1,
          heading: home.content.heading,
          primaryAction: toAction(home.content.ctaLabel, home.content.ctaHref),
          secondParagraphEmphasis: home.content.paragraph2Bold,
          secondParagraphPrefix: home.content.paragraph2Prefix,
          secondParagraphSuffix: home.content.paragraph2Suffix,
        },
        productRange: {
          heading: home.featureRange.heading,
          image: await upload(home.featureRange.image),
          items: home.featureRange.reasons,
          lede: home.featureRange.lede,
        },
      },
      pageType: 'home',
      title: home.title,
    },
    {
      _status: 'published',
      about: {
        compliance: toCompliance(about.compliance),
        cta: toCta(about.cta),
        gallery: {
          heading: componentCopy.galleryHeading,
          images: galleryImages,
          primaryAction: toAction(componentCopy.galleryLinkLabel, componentCopy.galleryLinkURL),
        },
        intro: {
          achievements: about.intro.achievements,
          achievementsDescription: about.intro.achievementsDescription,
          achievementsHeading: about.intro.achievementsTitle,
          breakout: {
            description: about.intro.breakout.description,
            primaryAction: toAction(
              about.intro.breakout.buttonText,
              about.intro.breakout.buttonUrl,
            ),
            title: about.intro.breakout.title,
          },
          description: about.intro.description,
          eyebrow: `Established ${site.established_year} · ${site.address.locality}, Bangladesh`,
          heading: about.intro.title,
          mainImage: await upload(about.intro.mainImage),
          secondaryImage: await upload(about.intro.secondaryImage),
          sections: about.intro.contentSections,
        },
        numbers: {
          descriptionEmphasis: about.stats.descriptionBold,
          descriptionPrefix: about.stats.descriptionPrefix,
          descriptionSuffix: about.stats.descriptionSuffix,
          heading: about.stats.heading,
          introText: about.stats.introText,
          stats: about.stats.stats,
          testimonial: {
            author: about.stats.testimonialAuthor,
            quote: about.stats.testimonialQuote,
            role: about.stats.testimonialRole,
          },
        },
        reasons: {
          description: about.features.description,
          heading: about.features.heading,
          items: about.features.items,
        },
      },
      description: about.description,
      pageType: 'about',
      title: about.title,
    },
    {
      _status: 'published',
      contact: {
        contactHeading: contact.contactHeading,
        form: {
          errorMessage: componentCopy.contactFormError,
          heading: contact.formHeading,
          incoterms,
          intro: componentCopy.contactFormIntro,
          submitLabel: contact.submitLabel,
          submittingLabel: componentCopy.contactSubmittingLabel,
          successMessage: contact.successMessage,
        },
        heading: contact.heading,
        intro: contact.intro,
        officeHeading: contact.corporateHeading,
        socialHeading: contact.socialHeading,
      },
      description: contact.description,
      pageType: 'contact',
      title: contact.title,
    },
    {
      _status: 'published',
      description: privacySource.data.description,
      legal: {
        content: toRichText(privacySource.body),
        updated: new Date(privacySource.data.updated).toISOString(),
      },
      pageType: 'privacy',
      title: privacySource.data.title,
    },
    {
      _status: 'published',
      description: termsSource.data.description,
      legal: {
        content: toRichText(termsSource.body),
        updated: new Date(termsSource.data.updated).toISOString(),
      },
      pageType: 'terms',
      title: termsSource.data.title,
    },
  ]

  const imported = []

  for (const page of pages) {
    // The public path of a fixed Site Page is its page type, and the collection keeps
    // it that way; writing it here as well keeps the import a complete record.
    const data = { ...page, slug: page.pageType }
    const existing = await payload.find({
      collection: 'pages',
      limit: 1,
      pagination: false,
      where: { pageType: { equals: page.pageType } },
    })

    imported.push(
      existing.docs[0]
        ? await payload.update({
            collection: 'pages',
            context: { disableRevalidate: true },
            data,
            id: existing.docs[0].id,
          })
        : await payload.create({
            collection: 'pages',
            context: { disableRevalidate: true },
            data,
          }),
    )
  }

  return imported
}
