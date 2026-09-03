import React from 'react'

import type { Page } from '@/payload-types'

type Compliance = NonNullable<Page['home']>['compliance']

/**
 * The certifications section. Buyers use it for due diligence, so the anchor is
 * stable: the header and footer both link to /about#certifications.
 */
export const ComplianceSection: React.FC<{ compliance: Compliance }> = ({ compliance }) => (
  <section className="border-y border-stone-200 bg-white" id="certifications">
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {compliance.heading}
          </h2>
          <p className="mt-5 leading-7 text-stone-600">{compliance.description}</p>
          <div className="mt-8 rounded-2xl bg-emerald-950 p-6 text-white">
            <p className="text-lg font-semibold">{compliance.credentialsHeading}</p>
            <p className="mt-2 text-sm leading-6 text-stone-300">
              {compliance.credentialsDescription}
            </p>
          </div>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {compliance.items?.map((item) => (
            <li
              className="rounded-2xl border border-stone-200 bg-stone-50 p-6"
              key={item.id ?? item.title}
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
)
