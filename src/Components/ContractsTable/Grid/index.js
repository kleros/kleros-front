import React from 'react'
import './Grid.css'

const Grid = ({
  className,
  children,
  ...rest
}) => (
  <div className={`Grid-container ${className}`}>
    <div className='grid'>
      <div className='header'>
        <div className='item header-contract-hash'>Address</div>
        <div className='item header-party-a'>Address Party A</div>
        <div className='item header-party-b'>Address Party B</div>
        <div className='item header-rule'>Rule</div>
      </div>
      { children }
    </div>

  </div>
)

export default Grid
