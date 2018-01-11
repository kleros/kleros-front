import React from 'react'
import { NavLink } from 'react-router-dom'
import _ from 'lodash'
import Icon from '../../../Icon'
import './ItemMenuSidebar.css'

const ItemMenuSidebar = ({
  className,
  active,
  name,
  theme
}) => (
  <div>
    <NavLink
      to={`/${name}`}
      className={
        `ItemMenuSidebar-container
        ${className}
        ${theme}`}
      activeStyle={{ background: 'rgba(255,255,255,0.1)' }}
      replace
    >
      <div className={`activeDiv ${active}`} />
      <div className='icon'>
        <Icon name={name} />
      </div>
      <div className='name'>
        { _.capitalize(name) }
      </div>
    </NavLink>
  </div>
)

export default ItemMenuSidebar
