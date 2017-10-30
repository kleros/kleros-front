import React, { Component } from 'react'
import BuyPinakionForm from './Form'

class BuyPinakion extends Component {
  render () {
    return (
      <div className='BuyPinakion-container'>
        <div className='description'>
          <h1>Buy Pinakion</h1>
          <p>1 ETH = 1 PNK</p>
        </div>
        <BuyPinakionForm />
      </div>
    )
  }
}

export default BuyPinakion
