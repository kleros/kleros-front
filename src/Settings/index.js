import React from 'react'
import BuyPinakion from './BuyPinakion'
import PassPeriod from './PassPeriod'
import Deploy from './Deploy'
import './Settings.css'

const Settings = () => (
  <div className='Settings-container'>
    <div className='content'>
      <div className='buy-pnk-wrapper'>
        <BuyPinakion />
      </div>
      <div className='pass-period-wrapper'>
        <PassPeriod />
      </div>
      <div className='deploy-wrapper'>
        <Deploy />
      </div>
    </div>
  </div>
)

export default Settings
