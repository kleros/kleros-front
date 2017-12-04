import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getDisputeById,
  appealDispute,
  executeRuling,
  repartitionJurorTokens
} from '../../business/disputes/action-creators'
import { getArbitratorData } from '../../business/contract/action-creators'
import { STATUS_TO_STATE, RULINGS, RESOLVED_STATUS, DISPUTE_EXECUTABLE } from '../../constants'
import Banner from '../../Banner'

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
    this.props.getDisputeById(this.props.match.params.disputeId)
  }

  appealDispute = () => {
    const disputeId = this.props.caseData.disputeData.disputeId
    const extraData = this.props.caseData.contractData.extraData
    this.props.appealDispute(disputeId, extraData)
  }

  repartitionJurorTokens = () => {
    const disputeId = this.props.caseData.disputeData.disputeId
    this.props.repartitionJurorTokens(disputeId)
  }

  executeRuling = () => {
    const disputeId = this.props.caseData.disputeData.disputeId
    this.props.executeRuling(disputeId)
  }

  render () {
    if (this.props.isFetchingCase) return false
    const dispute = this.props.caseData

    let period = -1
    if (!this.props.isFetchingArbitrator) period = this.props.arbitratorData.period

    let action = <div />
    // only allow actions if dispute is not resolved
    if (this.props.caseData.contractData.status !== RESOLVED_STATUS) {
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
          if (dispute.disputeData.state < DISPUTE_EXECUTABLE) {
            action = (
              <div>
                <p>In order to Execute your ruling you must first reallocate tokens for the jurors</p>
                <div className='action-btn' onClick={this.repartitionJurorTokens}>
                  Redistribute Tokens
                </div>
              </div>
            )
          } else if (dispute.disputeData.state === DISPUTE_EXECUTABLE) {
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
        Arbitrator: {dispute.contractData.arbitrator}<br />
        Timeout: {dispute.contractData.timeout}<br />
        PartyA: {dispute.contractData.partyA}<br />
        PartyB: {dispute.contractData.partyB}<br />
      Status: {STATUS_TO_STATE[dispute.contractData.status]}<br />
      Ruling: {RULINGS[dispute.disputeData.ruling]}
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
    arbitratorData: state.contract.contract,
    hasErroredArbitrator: state.contract.failureContract,
    isFetchingArbitrator: state.contract.requestContract,
    isSubmittingRedistribute: state.disputes.redistibuteJurorTokensSubmitted,
    isSubmittingExecute: state.disputes.executeSubmitted
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDisputeById: disputeId => dispatch(getDisputeById(disputeId)),
    getArbitratorData: disputeId => dispatch(getArbitratorData(disputeId)),
    appealDispute: (disputeId, extraData) => dispatch(appealDispute(disputeId, extraData)),
    executeRuling: disputeId => dispatch(executeRuling(disputeId)),
    repartitionJurorTokens: disputeId => dispatch(repartitionJurorTokens(disputeId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DecisionSummary))
