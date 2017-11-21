import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getDisputeById, appealDispute, executeRuling } from '../../business/disputes/action-creators'
import { getArbitratorData } from '../../business/contract/action-creators'
import { STATUS_TO_STATE, RULINGS } from '../../constants'
import Banner from '../../Banner'

import './Summary.css'

class DecisionSummary extends Component {
  componentDidMount () {
    this.props.getDisputeById(this.props.match.params.disputeId)
    this.props.getArbitratorData()
  }

  appealDispute = () => {
    const disputeId = this.props.caseData.disputeData.disputeId
    const extraData = this.props.caseData.contractData.extraData
    this.props.appealDispute(disputeId, extraData)
  }

  executeRuling = () => {
    const disputeId = this.props.caseData.disputeData.disputeId
    this.props.executeRuling(disputeId)
  }

  render () {
    if (this.props.isFetchingCase) return false

    let period = -1
    if (!this.props.isFetchingArbitrator) period = this.props.arbitratorData.period

    let action = <div />
    // only allow actions if dispute is not resolved
    if (this.props.caseData.contractData.status !== 4) {
      switch (period) {
        case 3:
          action = (
            <div className='action-btn' onClick={this.appealDispute}>
              Appeal Ruling
            </div>
          )
          break
        case 4:
          action = (
            <div className='action-btn' onClick={this.executeRuling}>
              Execute Ruling
            </div>
          )
          break
        default:
          action = (
            <div />
          )
      }
    }

    let summary
    if (!this.props.isFetchingCase) {
      const dispute = this.props.caseData
      summary = (
        <div>
          Arbitrator: {dispute.contractData.arbitrator}<br />
          Timeout: {dispute.contractData.timeout}<br />
          PartyA: {dispute.contractData.partyA}<br />
          PartyB: {dispute.contractData.partyB}<br />
        Status: {STATUS_TO_STATE[dispute.contractData.status]}<br />
        Ruling: {RULINGS[dispute.disputeData.ruling]}
        </div>
      )
    }

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
    isFetchingArbitrator: state.contract.requestContract
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDisputeById: disputeId => dispatch(getDisputeById(disputeId)),
    getArbitratorData: disputeId => dispatch(getArbitratorData(disputeId)),
    appealDispute: (disputeId, extraData) => dispatch(appealDispute(disputeId, extraData)),
    executeRuling: disputeId => dispatch(executeRuling(disputeId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DecisionSummary))
