import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { deployRNG, deployPinakion, deployKleros, configureKleros } from '../../business/contract/action-creators'
import './Deploy.css'

const Deploy = (props) => {
  return (
    <div className="Deploy-container">
      <div className="Deploy-btn" onClick={props.deployRNG}>
        Deploy RNG
      </div>
      <div className="Deploy-btn" onClick={props.deployPinakion}>
        Deploy PNK
      </div>
      <div className="Deploy-btn" onClick={props.deployKleros.bind(this, '0x90EDa4a1504547Bd4Ace4eA62659283cdCAdfD2B', '0xe13535B17c7e46Bb13D3f9e5518537C1Ab4A4cF9')}>
        Deploy Kleros
      </div>
      <div className="Deploy-btn" onClick={props.configureKleros.bind(this, '0xB9152415DAF04ca38D9ab5EaA23451Cca2fFAa45', '0x90EDa4a1504547Bd4Ace4eA62659283cdCAdfD2B')}>
        Configure Kleros
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    deployRNG: () => dispatch(deployRNG()),
    deployPinakion: () => dispatch(deployPinakion()),
    deployKleros: (pnk, rng) => dispatch(deployKleros(pnk, rng)),
    configureKleros: (kleros, pnk) => dispatch(configureKleros(kleros, pnk)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Deploy))
