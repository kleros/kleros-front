import React from 'react'
import Grid from './Grid'
import GridContent from './Grid/GridContent'
import './Decisions.css'

const Decisions = props => {
  const itemsTitle = [
    'Project',
    'Deadline',
    'Case ID',
    'Status',
    'Evidence'
  ]

  return (
    <div className='Decisions-container'>
      <div className='content'>
        <h1>Open Cases</h1>
        <Grid itemTitles={itemsTitle}>
          <GridContent />
        </Grid>
      </div>
    </div>
  )
}

export default Decisions
