import React from 'react'
import Form from './Form'
import './Decision.css'

const Decision = props => {
  return (
    <div className='Decision-container'>
      <div className='decision-header'>
        <h2>Your Decision</h2>
        <p>You have the following options:</p>
      </div>
      <div className='divider' />
      <Form resolutionOptions={ props.resolutionOptions } />
    </div>
  )
}

export default Decision
