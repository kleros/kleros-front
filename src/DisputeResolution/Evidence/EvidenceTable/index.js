import React from 'react'
import EvidenceRow from './EvidenceRow'
import './EvidenceTable.css'

// TODO show more feature
const EvidenceTable = (props) => {
  return (
    <div className="EvidenceTable">
      { props.evidence.map(document => (
        <div>
          <EvidenceRow key={ document.name } name={ document.name } description={ document.description } />
          <div className="divider"></div>
        </div>
      ))}
    </div>
  )
}

export default EvidenceTable
