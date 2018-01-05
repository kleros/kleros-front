import React from 'react'

import Sidebar from '../Sidebar'
import { APP_VIEWS } from '../../constants'

import './Layout.css'

const Layout = ({ className, address, view, children }) => {
  let items = []
  if (view === APP_VIEWS.JUROR) {
    items = ['disputes', 'jury', 'decisions', 'settings']
  } else if (view === APP_VIEWS.PARTY) {
    items = ['disputes', 'contracts', 'decisions', 'settings']
  }

  return (
    <div className={`Layout-container ${className}`}>
      <Sidebar items={items} address={address} balancePNK={242} />
      {children}
    </div>
  )
}

export default Layout
