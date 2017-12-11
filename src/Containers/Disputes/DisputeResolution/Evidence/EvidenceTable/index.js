import React from 'react'
import ExpandableTable from '../../../../../Components/ExpandableTable'
import EvidenceRow from './EvidenceRow'
import { EVIDENCE_TABLE_TRUNCATED_ENTRIES } from '../../../../../constants'
import './EvidenceTable.css'

const EvidenceTable = (props) => {
  const {evidence = []} = props
  const rows = evidence.map(document => (
    <div key={document.url}>
      <EvidenceRow name={document.name} description={document.description} url={document.url} />
      <div className='divider' />
    </div>
  ))

  return (
    <ExpandableTable rows={rows} rowLimit={EVIDENCE_TABLE_TRUNCATED_ENTRIES} moreMessage={'Show More'} lessMessage={'Show Less'} theme={'EvidenceTable'} />
  )
}

export default EvidenceTable
