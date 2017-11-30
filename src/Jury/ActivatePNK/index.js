import React from 'react'
import Form from './Form'

const ActivatePNK = (props) => {
  return (
    <div className='ActivatePNK-container'>
      <h1>Activate PNK</h1>
      <Form maxTokens={props.maxTokens} />
    </div>
  )
}

export default ActivatePNK
