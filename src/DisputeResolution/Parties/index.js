import React from 'react'
import './Parties.css'

// TODO make a icon generator component with different colors
const Parties = (props) => {
  return (
    <div className="parties">
      <h2>Involved Parties</h2>
      {props.parties.map(name =>
        <div className="party">
          <div className="party-icon"></div>
          <div className="party-name">{name}</div>
        </div>
      )}
    </div>
  )
}

export default Parties
