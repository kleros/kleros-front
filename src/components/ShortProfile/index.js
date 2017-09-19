import React from 'react'
import './ShortProfile.css'

const ShortProfile = ({
  className,
  children,
  ...rest
}) => (
  <div className={`ShortProfile-container ${className}`}>
    { children }
  </div>
)

export default ShortProfile
