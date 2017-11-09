import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { passPeriod, getArbitratorData } from '../../business/contract/action-creators'
import './PassPeriod.css'

class PassPeriod extends Component {
  componentDidMount () {
    this.props.getArbitratorData()
  }

  render () {
    let currentPeriod = 'loading...'
    let currentSession = 'loading...'
    if (!this.props.isFetching) {
      currentPeriod = this.props.contract.period
      currentSession = this.props.contract.session
    }

    return (
      <div className='PassPeriod-container'>
        <h1>Move to Next Period</h1>
        <h2>Current Period: {currentPeriod}</h2>
        <h2>Current Session: {currentSession}</h2>
        <div className='PassPeriod-btn' onClick={this.props.passPeriod}>
          <p>Next Period</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contract: state.contract.contract,
    hasErrored: state.contract.failureContract,
    isFetching: state.contract.requestContract
  }
}

const mapDispatchToProps = dispatch => {
  return {
    passPeriod: () => dispatch(passPeriod()),
    getArbitratorData: () => dispatch(getArbitratorData())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PassPeriod))
