import { Quote } from 'lucide-react'
import React from 'react'

import type { Page } from '@/payload-types'

import { Action } from './Action'
import { MediaImage } from './MediaImage'
import { SectionIcon } from './SectionIcon'

type About = NonNullable<Page['about']>

export const AboutIntro: React.FC<{ intro: About['intro'] }> = ({ intro }) => (
  <>
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
        {intro.eyebrow}
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
        {intro.heading}
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">{intro.description}</p>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {intro.mainImage ? (
          <div className="overflow-hidden rounded-2xl border border-stone-200">
            <MediaImage className="aspect-[16/10]" loading="eager" media={intro.mainImage} />
          </div>
        ) : null}
        <div className="grid gap-6">
          {intro.secondaryImage ? (
            <div className="overflow-hidden rounded-2xl border border-stone-200">
              <MediaImage className="aspect-[4/3]" media={intro.secondaryImage} />
            </div>
          ) : null}
          <div className="rounded-2xl bg-emerald-950 p-6 text-white">
            <h2 className="text-lg font-semibold">{intro.breakout.title}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-300">{intro.breakout.description}</p>
            <Action action={intro.breakout.primaryAction} className="mt-5" variant="light" />
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {intro.achievementsHeading}
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-stone-600">{intro.achievementsDescription}</p>
        <dl className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4">
          {intro.achievements?.map((achievement) => (
            <div className="rounded-xl bg-stone-100 p-5" key={achievement.id ?? achievement.label}>
              <dt className="text-3xl font-semibold text-emerald-900">{achievement.value}</dt>
              <dd className="mt-2 text-sm text-stone-600">{achievement.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>

    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
      {intro.sections?.map((section) => (
        <article key={section.id ?? section.title}>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.title}</h2>
          <p className="mt-5 whitespace-pre-line leading-7 text-stone-600">{section.content}</p>
        </article>
      ))}
    </section>
  </>
)

export const AboutGallery: React.FC<{ gallery: About['gallery'] }> = ({ gallery }) => (
  <section className="border-y border-stone-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{gallery.heading}</h2>
        <Action action={gallery.primaryAction} className="px-0 py-0" variant="secondary" />
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.images?.map((entry, index) => (
          <li
            className="overflow-hidden rounded-xl border border-stone-200"
            key={entry.id ?? index}
          >
            <MediaImage className="aspect-square" media={entry.image} />
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export const AboutNumbers: React.FC<{ numbers: About['numbers'] }> = ({ numbers }) => (
  <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{numbers.heading}</h2>
        <p className="mt-5 leading-7 text-stone-600">
          {numbers.descriptionPrefix}
          <strong className="font-semibold text-stone-900">{numbers.descriptionEmphasis}</strong>
          {numbers.descriptionSuffix}
        </p>
        <p className="mt-4 leading-7 text-stone-600">{numbers.introText}</p>
        <dl className="mt-8 grid grid-cols-2 gap-4">
          {numbers.stats?.map((stat) => (
            <div className="rounded-xl bg-stone-100 p-5" key={stat.id ?? stat.label}>
              <dt className="text-3xl font-semibold text-emerald-900">{stat.value}</dt>
              <dd className="mt-2 text-sm text-stone-600">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <figure className="rounded-2xl border border-stone-200 bg-white p-6">
        <Quote aria-hidden className="size-6 text-emerald-800" />
        <blockquote className="mt-4 leading-7 text-stone-700">
          {numbers.testimonial.quote}
        </blockquote>
        <figcaption className="mt-5 text-sm text-stone-600">
          <span className="font-semibold text-stone-900">{numbers.testimonial.author}</span>
          <span className="block">{numbers.testimonial.role}</span>
        </figcaption>
      </figure>
    </div>
  </section>
)

export const AboutReasons: React.FC<{ reasons: About['reasons'] }> = ({ reasons }) => (
  <section className="bg-emerald-950 px-4 py-20 text-white sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{reasons.heading}</h2>
      <p className="mt-5 max-w-3xl leading-7 text-stone-300">{reasons.description}</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.items?.map((item) => (
          <article className="rounded-2xl border border-white/15 p-6" key={item.id ?? item.title}>
            <SectionIcon className="size-6 text-emerald-300" name={item.icon} />
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-300">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)
