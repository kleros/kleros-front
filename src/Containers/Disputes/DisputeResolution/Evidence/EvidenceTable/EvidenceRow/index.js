import React from 'react'
import Icon from '../../../../../../Components/Icon'
import './EvidenceRow.css'

const EvidenceRow = props => {
  return (
    <div className='evidence-row'>
      <div className='row-container'>
        <a className='evidence-download' href={props.url}><Icon name={'download'} /></a>
        <div className='evidence-title'>
          <h2>{props.name}</h2>
          <p>{props.description}</p>
        </div>
        <div className='evidence-expand'>
          <div className='evidence-expand-container'>
            <p>Expand</p>
            <Icon name={'zoom'} theme={'zoom'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EvidenceRow
