import React from 'react'
import DropdownButton from './DropdownButton'
import EvidenceRow from './EvidenceRow'
import './Evidence.css'

const Evidence = (props) => {
  return (
    <div className="evidence">
      <div className="top-bar">
        <h2>Evidence</h2>
        <div className="dropdowns">
          <DropdownButton title={"Filter"} />
          <DropdownButton title={"Sort By"} />
        </div>
      </div>
      <div className="divider"></div>
      { props.evidence.map(document => (
        <div>
          <EvidenceRow key={ document.name } name={ document.name } description={ document.description } />
          <div className="divider"></div>
        </div>
      ))}
    </div>
  )
}

export default Evidence
