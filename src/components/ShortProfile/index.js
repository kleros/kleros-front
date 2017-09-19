import React from 'react'
import './ShortProfile.css'

const ShortProfile = ({
  className,
  icon,
  username,
  balancePNK = 0,
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
    { children }
  </div>
)

export default ShortProfile
