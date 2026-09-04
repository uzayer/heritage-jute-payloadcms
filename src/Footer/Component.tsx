import Link from 'next/link'
import React from 'react'

import { textLinkVariants } from '@/components/ui/interactive'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { cn } from '@/utilities/ui'

/** The shared public footer. Company details come from the Company global. */
export async function Footer() {
  const [footer, company] = await Promise.all([getCachedGlobal('footer')(), getCachedGlobal('company')()])

  return (
    <footer className="mt-auto border-t">
      <div className="container py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xs space-y-4">
            <p className="font-semibold tracking-tight">{company.name}</p>
            <p className="text-sm text-muted-foreground">{company.summary}</p>
            <address className="not-italic space-y-1 text-sm text-muted-foreground">
              <p>{company.address.line1}</p>
              <p>{company.address.line2}</p>
              <p>{company.phone}</p>
              <p>{company.email}</p>
            </address>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footer.columns?.map((column) => (
              <div key={column.id ?? column.heading}>
                <h3 className="mb-4 text-sm font-semibold">{column.heading}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {column.links?.map((link) => (
                    <li key={link.id ?? link.url}>
                      <Link className={textLinkVariants({ tone: 'muted' })} href={link.url}>
                        <span data-slot="link-label">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="mb-4 text-sm font-semibold">Inquiries</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    aria-label="WhatsApp (opens in new tab)"
                    className={textLinkVariants({ tone: 'muted' })}
                    href={company.whatsappUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span data-slot="link-label">WhatsApp</span>
                  </a>
                </li>
                <li>
                  <a className={textLinkVariants({ tone: 'muted' })} href={`mailto:${company.email}`}>
                    <span data-slot="link-label">Email</span>
                  </a>
                </li>
                <li>
                  <Link className={textLinkVariants({ tone: 'muted' })} href="/contact">
                    <span data-slot="link-label">Inquiry Form</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <p>{footer.credentials}</p>
            <div className="flex gap-4">
              <Link className={cn(textLinkVariants({ tone: 'muted' }))} href="/privacy">
                <span data-slot="link-label">Privacy Policy</span>
              </Link>
              <Link className={textLinkVariants({ tone: 'muted' })} href="/terms">
                <span data-slot="link-label">Terms of Service</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
