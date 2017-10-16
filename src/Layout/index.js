import React from 'react'
import Sidebar from '../Sidebar'
import './Layout.css'

const Layout = ({
  className,
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
      address={'0xA1E4380A3B1f749673E270229993eE55F35663b4'}
      balancePNK={242}
    />
    { children }
  </div>
)

export default Layout
