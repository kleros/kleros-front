import React from 'react'
import GridContent from './GridContent'
import './Grid.css'

const defaultFilterFunction = dispute => {
  return dispute
}

const DisputesTable = ({
  className,
  itemTitles = [],
  baseLink,
  filterFunction = defaultFilterFunction,
  ...rest
}) => (
  <div className={`Grid-container ${className}`}>
    <div className='grid'>
      <div className='header'>
        <div className='item header-project-item'>Project</div>
        <div className='item header-deadline-item'>Deadline</div>
        <div className='item header-case_id-item'>Case ID</div>
        <div className='item header-status-item'>Status</div>
      </div>
      <GridContent baseLink={baseLink} filterFunction={filterFunction} />
    </div>

  </div>
)

export default DisputesTable
