import { ArrowRight } from 'lucide-react'
import React from 'react'

import type { Page } from '@/payload-types'

import { Action } from './Action'
import { MediaImage } from './MediaImage'
import { SectionIcon } from './SectionIcon'

type Home = NonNullable<Page['home']>

export const HomeHero: React.FC<{ hero: Home['hero'] }> = ({ hero }) => (
  <section className="relative overflow-hidden bg-emerald-950 px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-8">
    <div
      aria-hidden
      className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#3c6b52,_transparent_45%)] opacity-70"
    />
    <div className="relative mx-auto max-w-4xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200 sm:text-sm">
        {hero.eyebrow}
      </p>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
        {hero.heading}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-200">{hero.subtext}</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Action action={hero.primaryAction} variant="light">
          <ArrowRight aria-hidden className="size-4" />
        </Action>
        <Action action={hero.secondaryAction} variant="inverse" />
      </div>
    </div>
  </section>
)

export const HomeProductRange: React.FC<{ productRange: Home['productRange'] }> = ({
  productRange,
}) => (
  <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {productRange.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">{productRange.lede}</p>
      </div>
      {productRange.image ? (
        <div className="overflow-hidden rounded-2xl border border-stone-200">
          <MediaImage className="aspect-[4/3]" media={productRange.image} />
        </div>
      ) : null}
    </div>

    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {productRange.items?.map((item) => (
        <article
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
          key={item.id ?? item.title}
        >
          <SectionIcon className="size-6 text-emerald-800" name={item.icon} />
          <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
          <p className="mt-3 text-sm leading-6 text-stone-600">{item.description}</p>
        </article>
      ))}
    </div>
  </section>
)

export const HomeGlobalReach: React.FC<{ globalReach: Home['globalReach'] }> = ({
  globalReach,
}) => (
  <section className="border-y border-stone-200 bg-white">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
          {globalReach.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {globalReach.heading}
        </h2>
        <p className="mt-5 leading-7 text-stone-600">{globalReach.description}</p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {globalReach.stats?.map((stat) => (
            <div className="rounded-xl bg-stone-100 p-5" key={stat.id ?? stat.value}>
              <dt className="text-3xl font-semibold text-emerald-900">
                {stat.value}
                {stat.suffix ? (
                  <span className="ml-1 text-base font-medium text-stone-600">{stat.suffix}</span>
                ) : null}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-stone-600">
                <span className="font-medium text-stone-900">{stat.descriptionLead}</span>
                {stat.descriptionRest}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      {globalReach.mapImage ? (
        <MediaImage className="object-contain" media={globalReach.mapImage} />
      ) : null}
    </div>
  </section>
)

export const HomeOrdering: React.FC<{ ordering: Home['ordering'] }> = ({ ordering }) => (
  <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{ordering.heading}</h2>
    <p className="mt-6 leading-7 text-stone-600">{ordering.firstParagraph}</p>
    <p className="mt-4 leading-7 text-stone-600">
      {ordering.secondParagraphPrefix}
      <strong className="font-semibold text-stone-900">{ordering.secondParagraphEmphasis}</strong>
      {ordering.secondParagraphSuffix}
    </p>
    <div className="mt-8">
      <Action action={ordering.primaryAction} />
    </div>
  </section>
)

export const HomeCountries: React.FC<{ countries: Home['countries'] }> = ({ countries }) => (
  <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
      {countries.eyebrow}
    </p>
    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{countries.heading}</h2>
    <p className="mt-5 max-w-3xl leading-7 text-stone-600">{countries.description}</p>

    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {countries.regions?.map((region) => (
        <section
          aria-label={region.label}
          className="rounded-2xl border border-stone-200 bg-white p-6"
          key={region.id ?? region.label}
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
            {region.label}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-stone-700">
            {region.countries?.map((country) => (
              <li key={country.id ?? country.name}>
                <span aria-hidden className="mr-1">
                  {country.flag}
                </span>
                {country.name}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  </section>
)

export const HomeFaqs: React.FC<{ faqs: Home['faqs'] }> = ({ faqs }) => (
  <section className="border-t border-stone-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl">
      <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
        {faqs.heading}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center leading-7 text-stone-600">{faqs.intro}</p>

      <div className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
        {faqs.items?.map((item) => (
          <details className="group py-4" key={item.id ?? item.question}>
            <summary className="cursor-pointer list-none text-base font-medium marker:content-none">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-6 text-stone-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
)
