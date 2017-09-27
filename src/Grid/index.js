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
        <div className='header-item'>
          Project
        </div>
        <div className='header-item'>
          Deadline
        </div>
        <div className='header-item'>
          Case ID
        </div>
        <div className='header-item'>
          Status
        </div>
        <div className='header-item'>
          Evidence
        </div>
      </div>
      <div className='grid-content'>
        <div className='items'>
          <div className='item'>Project</div>
          <div className='item'>Deadline</div>
          <div className='item'>Case ID</div>
          <div className='item'>Status</div>
          <div className='item'>Evidence</div>
        </div>
        <div className='items'>
          <div className='item'>Project</div>
          <div className='item'>Deadline</div>
          <div className='item'>Case ID</div>
          <div className='item'>Status</div>
          <div className='item'>Evidence</div>
        </div>
      </div>
    </div>
    { children }
  </div>
)

export default Grid
