import React from 'react'
import Sidebar from '../Sidebar'
import './Layout.css'

const Layout = ({
  className,
  address,
  children,
  ...rest
}) => (
  <div className={`Layout-container ${className}`}>
    <Sidebar
      items={[
        'disputes',
        'contracts',
        'jury',
        'decisions',
        'settings'
      ]}
      address={address}
      balancePNK={242}
    />
    { children }
  </div>
)

export default Layout
