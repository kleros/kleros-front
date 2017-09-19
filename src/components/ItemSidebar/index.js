import React from 'react'
import './ItemSidebar.css'

const ItemSidebar = ({
  className,
  children,
  ...rest
}) => (
  <div className={`ItemSidebar-container ${className}`}>
    { children }
  </div>
)

export default ItemSidebar
