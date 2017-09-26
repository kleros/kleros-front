import React from 'react'
import ShortProfile from './ShortProfile'
import MenuSidebar from './MenuSidebar'
import './Sidebar.css'

const Sidebar = ({
  className,
  address,
  balancePNK=0,
  items=[],
  children,
  ...rest
}) => (
  <div className={`Sidebar-container ${className}`}>
    <ShortProfile address={address} balancePNK={balancePNK} />
    <div className='divider' />
      <MenuSidebar items={items} />
    <div className='emptybar' />
    {children}
  </div>
)

export default Sidebar
