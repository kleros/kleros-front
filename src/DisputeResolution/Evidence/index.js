import React from 'react'
import DropdownButton from './DropdownButton'
import EvidenceTable from './EvidenceTable'
import './Evidence.css'

const Evidence = props => {
  return (
    <div className='evidence'>
      <div className='top-bar'>
        <h2>Evidence</h2>
        <div className='dropdowns'>
          <DropdownButton title={'Filter'} />
          <DropdownButton title={'Sort By'} />
        </div>
      </div>
      <div className='divider' />
      <EvidenceTable evidence={props.evidence} />
    </div>
  )
}

export default Evidence
