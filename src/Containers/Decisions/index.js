import React from 'react'
import _ from 'lodash'
import DisputesTable from '../../Components/DisputesTable'
import './Decisions.css'

const filterFunction = disputes => _.filter(disputes, dispute => (
  ((dispute.isJuror && dispute.hasRuled) || !dispute.isJuror) && dispute)
)

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
        <DisputesTable itemTitles={itemsTitle} baseLink={'decisions'} filterFunction={filterFunction} />
      </div>
    </div>
  )
}

export default Decisions
