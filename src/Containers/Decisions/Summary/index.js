import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getDisputeForContract,
  appealDispute,
  executeRuling,
  repartitionJurorTokens
} from '../../../redux/disputes/action-creators'
import { getArbitratorData } from '../../../redux/contracts/action-creators'
import { STATUS_TO_STATE, RULINGS, RESOLVED_STATUS, DISPUTE_EXECUTABLE } from '../../../constants'
import Banner from '../../../Components/Banner'

import './Summary.css'

class DecisionSummary extends Component {
  componentWillMount () {
    this.loadDispute()
    this.props.getArbitratorData()
  }

  componentWillReceiveProps (nextProps) {
    // reload dispute if we are done submitting redistibute or execute
    if ((this.props.isSubmittingRedistribute && !nextProps.isSubmittingRedistribute) ||
    (this.props.isSubmittingExecute && !nextProps.isSubmittingExecute)) {
      this.loadDispute()
    }
  }

  loadDispute = () => {
    this.props.getDisputeForContract(this.props.match.params.address)
  }

  appealDispute = () => {
    const disputeId = this.props.caseData.disputeId
    const extraData = this.props.caseData.extraData
    this.props.appealDispute(disputeId, extraData)
  }

  repartitionJurorTokens = () => {
    const disputeId = this.props.caseData.disputeId
    this.props.repartitionJurorTokens(disputeId)
  }

  executeRuling = () => {
    const disputeId = this.props.caseData.disputeId
    this.props.executeRuling(disputeId)
  }

  render () {
    if (this.props.isFetchingCase) return false
    const dispute = this.props.caseData

    let period = -1
    if (!this.props.isFetchingArbitrator) period = this.props.arbitratorData.period

    let action = <div />
    // only allow actions if dispute is not resolved
    if (this.props.caseData.status !== RESOLVED_STATUS) {
      switch (period) {
        case 3:
          action = (
            <div className='action-btn' onClick={this.appealDispute}>
              Appeal Ruling
            </div>
          )
          break
        case 4:
          // we still need to repartition tokens
          if (dispute.state < DISPUTE_EXECUTABLE) {
            action = (
              <div>
                <p>In order to Execute your ruling you must first reallocate tokens for the jurors</p>
                <div className='action-btn' onClick={this.repartitionJurorTokens}>
                  Redistribute Tokens
                </div>
              </div>
            )
          } else if (dispute.state === DISPUTE_EXECUTABLE) {
            action = (
              <div className='action-btn' onClick={this.executeRuling}>
                Execute Ruling
              </div>
            )
          }
          break
        default:
          action = (
            <div />
          )
      }
    }

    const summary = (
      <div>
        Arbitrator: {dispute.arbitratorAddress}<br />
        Timeout: {dispute.timeout}<br />
        PartyA: {dispute.partyA}<br />
        PartyB: {dispute.partyB}<br />
      Status: {STATUS_TO_STATE[dispute.status]}<br />
      Ruling: {RULINGS[dispute.ruling]}
      </div>
    )

    return (
      <div className='DecisionSummary-container'>
        <Banner title='Decision Summary' linkTo='/decisions' />
        <div className='content'>
          <div className='action'>
            <span className='pull-right'>
              { action }
            </span>
          </div>
          <div className='summary'>
            { summary }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    caseData: state.disputes.caseData,
    hasErroredCase: state.disputes.failureCaseData,
    isFetchingCase: state.disputes.requestCaseData,
    arbitratorData: state.contracts.contract,
    hasErroredArbitrator: state.contracts.failureContract,
    isFetchingArbitrator: state.contracts.requestContract,
    isSubmittingRedistribute: state.disputes.redistibuteJurorTokensSubmitted,
    isSubmittingExecute: state.disputes.executeSubmitted
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDisputeForContract: contractAddress => dispatch(getDisputeForContract(contractAddress)),
    getArbitratorData: disputeId => dispatch(getArbitratorData(disputeId)),
    appealDispute: (disputeId, extraData) => dispatch(appealDispute(disputeId, extraData)),
    executeRuling: disputeId => dispatch(executeRuling(disputeId)),
    repartitionJurorTokens: disputeId => dispatch(repartitionJurorTokens(disputeId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DecisionSummary))
