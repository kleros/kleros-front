import React from 'react'
import './Sidebar.css'

const Sidebar = ({
  className,
  identicon,
  children,
  ...rest
}) => (
  <div className={`Sidebar-container ${className}`}>
    <div className='identicon'>
      { identicon }
    </div>
    <div className='divider' />
    { children }
  </div>
)

export default Sidebar
