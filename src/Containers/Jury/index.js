import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ActivatePNK from './ActivatePNK'
import { getArbitratorData } from '../../redux/contracts/action-creators'
import { balanceFetchData } from '../../redux/ethereum/action-creators'
import { PERIOD_TO_STATE } from '../../constants'
import './Jury.css'

class Jury extends Component {
  componentWillMount () {
    this.props.getBalance()
    this.props.getArbitratorData()
  }

  render () {
    if (this.props.isFetching || this.props.balanceIsFetching) return false

    let period = -1
    let content
    period = this.props.arbitratorData.period

    if (this.props.balance.activatedTokens) {
      content = (
        <div>
          You have already activated PNK for this session
        </div>
      )
    } else {
      switch (period) {
        case 0:
          content = (
            <ActivatePNK maxTokens={this.props.balance.tokenBalance} />
          )
          break
        default:
          content = (
            <div>
              You can only activate PNK during {PERIOD_TO_STATE[0]} period
            </div>
          )
      }
    }

    return (
      <div className='Jury-container'>
        <div className='content'>
          { content }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    arbitratorData: state.contracts.contract,
    hasErrored: state.contracts.failureContract,
    isFetching: state.contracts.requestContract,
    balanceHasErrored: state.ethereum.failureBalance,
    balanceIsFetching: state.ethereum.requestBalance,
    balance: state.ethereum.balance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getArbitratorData: disputeId => dispatch(getArbitratorData(disputeId)),
    getBalance: () => dispatch(balanceFetchData())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Jury))
