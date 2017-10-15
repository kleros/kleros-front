import React from 'react'
import './DropdownButton.css'

const DropdownButton = props => {
  return (
    <div className='dropdown-button'>
      <span>{ props.title }</span>
    </div>
  )
}

export default DropdownButton
