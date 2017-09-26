import React from 'react'
import Sidebar from '../Sidebar'
import './Layout.css'

const Layout = ({
  className,
  children,
  ...rest
}) => (
  <div className={`Layout-container ${className}`}>
    <Sidebar items={[
      'Disputes',
      'Contracts',
      'Jury',
      'Decisions',
      'Settings'
    ]}
    address='John'
    balancePNK={242}
    />
    { children }
  </div>
)

export default Layout
