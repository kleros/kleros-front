import React from 'react'

import ItemMenuSidebar from './ItemMenuSidebar'

import './MenuSidebar.css'

const MenuSidebar = ({
  className,
  items = [],
  theme,
  children,
  ...rest
}) => (
  <div className={`MenuSidebar-container ${className} ${theme}`}>
    { items.map(item =>
      <div key={item} className='item'>
        <ItemMenuSidebar name={item} />
      </div>
    ) }
    { children }
  </div>
)

export default MenuSidebar
