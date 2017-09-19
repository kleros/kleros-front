import React from 'react'
import './Sidebar.css'

const Sidebar = ({
  className,
  children,
  ...rest
}) => (
  <div className={`Sidebar-container ${className}`}>
    { children }
  </div>
)

export default Sidebar
