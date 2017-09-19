import React from 'react'
import './Layout.css'

const Layout = ({
  className,
  children,
  ...rest
}) => (
  <div className={`Layout-container ${className}`}>
  { children }
  </div>
)

export default Layout
