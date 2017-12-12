import React from 'react'
import TruncatedTextBox from '../../../../Components/TruncatedTextBox'
import './Information.css'

const Information = props => {
  return (
    <div className='information'>
      <div className='information-box'>
        <h2>Information</h2>
        <TruncatedTextBox
          text={props.text}
          truncatedCharacters={props.truncatedCharacters} />
      </div>
      <div className='dispute-information'>
        <h2>Dispute Information</h2>
        <div className='statistic'>
          <div className='title'>Arbitration Fee</div>
          <div className='value'>{props.arbitrationFee} ETH</div>
        </div>
        <div className='statistic'>
          <div className='title'>Time Remaining</div>
          <div className='value'>{props.timeRemaining}</div>
        </div>
      </div>
    </div>
  )
}

export default Information
