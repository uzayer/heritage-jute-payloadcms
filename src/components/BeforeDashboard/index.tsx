import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Heritage Jute Fibers</h4>
      </Banner>
      Everything the public site shows is edited here:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Products</strong> holds the export catalogue — buyer copy, specification groups,
          and variants.
        </li>
        <li>
          <strong>Pages</strong> holds the fixed Home, About, Contact, Privacy, and Terms pages.
          Each has its own form; there is no page builder to break.
        </li>
        <li>
          <strong>Site content</strong> holds the company details, header, and footer shared by
          every page.
        </li>
      </ul>
      Save a draft to review a change privately, then publish when it is ready.
    </div>
  )
}

export default BeforeDashboard
