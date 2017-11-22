import React from 'react'
import './requiresMetaMask.css'

const RequiresMetaMask = () => (
  <div className='requires-metamask-container'>
    <div className='message'>
      <span>This is a decentralized application. In order to use this site please </span>
      <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'>download MetaMask</a>
    </div>
  </div>
)

export default RequiresMetaMask
