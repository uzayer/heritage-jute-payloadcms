import Image from 'next/image'
import React from 'react'

import type { Page } from '@/payload-types'

import { Reveal } from '@/components/motion/reveal'

type Compliance = NonNullable<Page['home']>['compliance']

/**
 * The certifications section. Buyers use it for due diligence, so the anchor is
 * stable where set: the header and footer both link to /about#certifications.
 */
export const ComplianceSection: React.FC<{ compliance: Compliance; sectionId?: string }> = ({
  compliance,
  sectionId,
}) => (
  <section className="py-32" id={sectionId}>
    <div className="container">
      <div className="relative grid lg:grid-cols-2">
        <div aria-hidden className="compliance7-dotline top-0" />
        <div aria-hidden className="compliance7-dotline bottom-0" />

        <div className="flex flex-col">
          <div className="border border-dashed bg-gradient-to-b from-foreground/10 to-background p-10 sm:p-20">
            <Reveal direction="none">
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">{compliance.heading}</h2>
                <p className="font-medium text-muted-foreground">{compliance.description}</p>
              </div>
            </Reveal>
          </div>
          <Reveal
            className="grid gap-10 border border-t-0 border-dashed p-10 sm:p-20 md:grid-cols-2"
            stagger={0.06}
          >
            {compliance.items?.map((item) => (
              <div className="flex flex-col gap-2" key={item.id ?? item.title}>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="font-medium text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="flex h-full flex-col items-center justify-center gap-20 border border-l-0 border-dashed bg-gradient-to-tr from-foreground/10 to-background to-30% p-10 sm:p-20 dark:from-foreground/20">
          <Reveal direction="none">
            <div className="flex items-center gap-4 sm:gap-10">
              <div className="flex items-center justify-center">
                <Image
                  alt="Illustrative Bangladesh emblem (fictional, not an official seal)"
                  className="size-36 object-contain sm:size-44"
                  height={176}
                  src="/images/bd-government-seal.svg"
                  width={176}
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex flex-col gap-2 text-center">
              <p className="text-4xl font-semibold">{compliance.credentialsHeading}</p>
              <p className="font-medium text-muted-foreground">{compliance.credentialsDescription}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
)
