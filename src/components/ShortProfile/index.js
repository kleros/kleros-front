import React from 'react'
import './ShortProfile.css'
import notification from './notification.svg'

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
       <img src={notification} alt='notification' />
       {notificationIsActive && <div className='notificationIsActive' /> }
    </div>
    { children }
  </div>
)

export default ShortProfile
