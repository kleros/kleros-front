import React from 'react'
import Icon from '../../containers/Icon'
import './ItemMenuSidebar.css'

const ItemMenuSidebar = ({
  className,
  name,
  theme,
  children,
  ...rest
}) => (
  <div className={`ItemMenuSidebar-container ${className} ${theme}`}>
    <div className='icon'>
      <Icon name={name} />
    </div>
    <div className='name'>
      { name }
    </div>
    { children }
  </div>
)

export default ItemMenuSidebar
