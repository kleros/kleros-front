import React from 'react'
import './Parties.css'

// TODO make a icon generator component with different colors
const Parties = props => {
  return (
    <div className='parties'>
      <h2>Involved Parties</h2>
      {props.parties.map(party =>
        <div key={party.address} className='party'>
          <div className='party-icon' />
          <div className='party-address'>{party.address}</div>
        </div>
      ) }
    </div>
  )
}

export default Parties
