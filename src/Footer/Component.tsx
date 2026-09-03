import Link from 'next/link'
import React from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'

/** The shared public footer. Company details come from the Company global. */
export async function Footer() {
  const [footer, company] = await Promise.all([
    getCachedGlobal('footer')(),
    getCachedGlobal('company')(),
  ])

  return (
    <footer className="mt-auto border-t border-stone-200 bg-emerald-950 text-stone-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold">{company.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-stone-300">{company.summary}</p>
          <address className="mt-5 text-sm not-italic leading-6 text-stone-300">
            {company.address.line1}
            <br />
            {company.address.line2}
            <br />
            <a className="hover:text-white" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <br />
            <a className="hover:text-white" href={`tel:${company.phoneE164}`}>
              {company.phone}
            </a>
          </address>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {footer.columns?.map((column) => (
            <section aria-label={column.heading} key={column.id ?? column.heading}>
              <h2 className="text-sm font-semibold">{column.heading}</h2>
              <ul className="mt-4 space-y-2 text-sm text-stone-300">
                {column.links?.map((link) => (
                  <li key={link.id ?? link.url}>
                    <Link className="hover:text-white" href={link.url}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-stone-400 sm:px-6 md:flex-row md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>{footer.credentials}</p>
          <p className="flex gap-2">
            <Link className="hover:text-white" href="/privacy">
              Privacy
            </Link>
            <span aria-hidden>·</span>
            <Link className="hover:text-white" href="/terms">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
