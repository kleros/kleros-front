import React from 'react'
import Icon from '../../containers/Icon'

import './ShortProfile.css'

import notification from '../../assets/icons/notification.svg'

const ShortProfile = ({
  className,
  icon,
  username,
  balancePNK = 0,
  notificationIsActive = false,
  children,
  backgroundColor,
  ...rest
}) => (
  <div className={`ShortProfile-container ${className} ${backgroundColor}`}>
    <div className='icon'>
      { icon }
    </div>
    <div className='description'>
      <div className='username'>
        { username }
      </div>
      <div className='balancePNK'>
        { balancePNK } PNK
      </div>
    </div>
    <div className='notification'>
      <Icon name='notification' />
      {notificationIsActive && <div className='notificationIsActive' /> }
    </div>
    { children }
  </div>
)

export default ShortProfile
