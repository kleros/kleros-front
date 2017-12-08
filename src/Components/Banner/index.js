import React from 'react'
import { Link } from 'react-router-dom'
import './Banner.css'

const Banner = ({
  className,
  title,
  linkTo,
  children,
  ...rest
}) => (
  <div className='dispute-resolution-banner'>
    <div className='banner-container'>
      <Link to={linkTo}>&#x2190; Go back to the list</Link>
      <div className='dispute-title'>
        {title}
        {children}
      </div>
    </div>
  </div>
)

export default Banner
