import React from 'react'
import FontAwesome from 'react-fontawesome'
import './AccountLocked.css'

const AccountLocked = () => (
  <div className='account-locked-container'>
    <span> MetaMask Account Locked </span>
    <br />
    <FontAwesome
      name='lock'
      size='3x'
      style={{marginTop: '20px'}}
    />
  </div>
)

export default AccountLocked
