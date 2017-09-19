import React from 'react'
import './Grid.css'

const Grid = ({
  className,
  children,
  ...rest
}) => (
  <div className={`Grid-container ${className}`}>
  { children }
  </div>
)

export default Grid
