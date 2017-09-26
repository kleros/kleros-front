import React from 'react'
import Icon from '../../Icon'
import Identicon from '../../Identicon'

import './ShortProfile.css'

import notification from '../../assets/icons/notification.svg'

const ShortProfile = ({
  className,
  address,
  balancePNK = 0,
  notificationIsActive = false,
  children,
  theme,
  ...rest
}) => (
  <div className={`ShortProfile-container ${className} ${theme}`}>
    <div className='icon'>
      <Identicon seed={address} />
    </div>
    <div className='description'>
      <div className='address'>
        { address }
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
