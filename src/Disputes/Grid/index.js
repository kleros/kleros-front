import React from 'react'
import './Grid.css'

const Grid = ({
  className,
  itemTitles = [],
  children,
  ...rest
}) => (
  <div className={`Grid-container ${className}`}>
    <div className='grid'>
      <div className='header'>
        <div className='item header-project-item'>Project</div>
        <div className='item header-deadline-item'>Deadline</div>
        <div className='item header-case_id-item'>Case ID</div>
        <div className='item header-status-item'>Status</div>
        <div className='item header-download-item'>Evidence</div>
      </div>
      { children }
    </div>

  </div>
)

export default Grid
