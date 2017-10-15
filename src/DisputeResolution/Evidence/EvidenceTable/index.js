import React from 'react'
import ExpandableTable from '../../../ExpandableTable'
import EvidenceRow from './EvidenceRow'
import { EVIDENCE_TABLE_TRUNCATED_ENTRIES } from '../../../constants'
import './EvidenceTable.css'

const EvidenceTable = (props) => {
  const evidence = props.evidence
  const rows = []

  for (let i = 0; i < evidence.length; i++) {
    rows.push(
      <div key={evidence[i].name}>
        <EvidenceRow name={evidence[i].name} description={evidence[i].description} />
        <div className='divider' />
      </div>
    )
  }

  return (
    <ExpandableTable rows={rows} rowLimit={EVIDENCE_TABLE_TRUNCATED_ENTRIES} moreMessage={'Show More'} lessMessage={'Show Less'} theme={'EvidenceTable'} />
  )
}

export default EvidenceTable
