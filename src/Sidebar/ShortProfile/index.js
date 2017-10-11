import React from 'react'
import Icon from '../../Icon'
import Identicon from '../../Identicon'
import './ShortProfile.css'

<<<<<<< HEAD
=======
import notification from '../../assets/icons/notification.svg'

function truncateAddress(address, digits) {
  if (address.length <= digits)
    return address;

  return address.substring(0, digits) + '...';
}

>>>>>>> Truncate address field if greater than 10 characters. Use valid ETH addresses for storybook and layout
const ShortProfile = ({
  className,
  address = 0x0,
  balancePNK = 0,
  notificationIsActive = false,
  children,
  theme,
  ...rest
}) => (
  <div className={`ShortProfile-container ${className} ${theme}`}>
    <div className='icon'>
      <Identicon seed={ address } />
    </div>
    <div className='description'>
      <div className='address'>
        { truncateAddress(address,10) }
      </div>
      <div className='balancePNK'>
        { balancePNK } PNK
      </div>
    </div>
    <div className='notification'>
      <Icon name='notification' />
      { notificationIsActive && <div className='notificationIsActive' /> }
    </div>
    { children }
  </div>
)

export default ShortProfile
