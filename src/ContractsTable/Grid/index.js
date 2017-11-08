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
        <div className='item header-arbitrator'>Arbitrator</div>
        <div className='item header-contract-hash'>Contract Hash</div>
        <div className='item header-party-a'>Party A</div>
        <div className='item header-party-b'>Party B</div>
        <div className='item header-status'>Status</div>
      </div>
      { children }
    </div>

  </div>
)

export default Grid
