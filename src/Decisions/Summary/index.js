import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getDisputeById } from '../../business/disputes/action-creators'
import { getArbitratorData } from '../../business/contract/action-creators'
import { STATUS_TO_STATE, RULINGS } from '../../constants'
import Banner from '../../Banner'

import './Summary.css'

class DecisionSummary extends Component {
  componentDidMount () {
    this.props.getDisputeById(this.props.match.params.disputeId)
    this.props.getArbitratorData()
  }

  render () {
    let period = -1
    if (!this.props.isFetchingArbitrator) period = this.props.arbitratorData.period

    let action
    switch (period) {
      case 3: // appeal stage TODO
        action = (
          <div>
            Appeal Ruling
          </div>
        )
        break
      case 4: // execution phase TODO
        action = (
          <div>
            Execute Ruling
          </div>
        )
        break
      default:
        action = (
          <div />
        )
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
          Status: {STATUS_TO_STATE[dispute.disputeData.status]}<br />
        Ruling: {RULINGS[dispute.disputeData.ruling]}
        </div>
      )
    }

    return (
      <div className='DecisionSummary-container'>
        <Banner title='Decision Summary' linkTo='/decisions' />
        <div className='content'>
          <div className='action'>
            { action }
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
    getArbitratorData: disputeId => dispatch(getArbitratorData(disputeId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DecisionSummary))
