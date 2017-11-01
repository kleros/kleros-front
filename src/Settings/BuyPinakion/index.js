import React, { Component } from 'react'
import BuyPinakionForm from './Form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { deployPinakion, deployRNG, deployKleros, configureKleros } from '../../business/contract/action-creators'

class BuyPinakion extends Component {
  launchRNG  = () => {
    this.props.deployRNG()
  }

  launchPinakion = () => {
    this.props.deployPinakion()
  }

  launchKleros = () => {
    this.props.deployKleros()
  }

  configureKleros = () => {
    this.props.configureKleros()
  }

  render () {
    return (
      <div className='BuyPinakion-container'>
        <div className='description'>
          <h1>Buy Pinakion</h1>
          <p>1 ETH = 1 PNK</p>
        </div>
        <BuyPinakionForm />
        <div className="launch-kleros-contract" onClick={this.launchRNG}>
          Launch RNG
        </div>
        <div className="launch-kleros-contract" onClick={this.launchPinakion}>
          Launch Pinakion
        </div>
        <div className="launch-kleros-contract" onClick={this.launchKleros}>
          Launch Kleros
        </div>
        <div className="launch-kleros-contract" onClick={this.configureKleros}>
          Configure Kleros
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deployRNG: () => dispatch(deployRNG()),
    deployPinakion: () => dispatch(deployPinakion()),
    deployKleros: () => dispatch(deployKleros()),
    configureKleros: () => dispatch(configureKleros())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuyPinakion))
