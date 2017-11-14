import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SearchBar from '../SearchBar'
import Banner from './Banner'
import Parties from './Parties'
import Information from './Information'
import Evidence from './Evidence'
import Decision from './Decision'
import { getDisputeById } from '../business/disputes/action-creators'
import Web3 from 'web3'
import './DisputeResolution.css'

class DisputeResolution extends Component {
  componentWillMount () {
    // fetch dispute
    this.props.getDisputeById(this.props.match.params.disputeId)
  }

  render () {
    if (this.props.isFetching) return false

    const dispute = this.props.caseData
    console.log(dispute)
    // FIXME show dispute not found message or a loading indicator
    if (!dispute) return false

    // FIXME only applies to twoParty contract. Generalize
    const parties = [{address: dispute.disputeData.partyA}, {address: dispute.disputeData.partyB}]

    // arbitration fee
    const web3 = new Web3()
    const arbitrationFee = web3.fromWei(dispute.disputeData.fee)

    // time remaining TODO use momentjs to calculate time difference between now and end time
    return (
      <div className='dispute-resolution'>
        <SearchBar />
        <Banner title={dispute.disputeData.title} />
        <div className='divider' />
        <Parties parties={parties} />
        <div className='divider' />
        <Information text={dispute.contractData.description} truncatedCharacters={50} arbitrationFee={arbitrationFee} timeRemaining={dispute.disputeData.deadline} />
        <div className='divider' />
        <Evidence evidence={dispute.contractData.evidencePartyA ? dispute.contractData.evidencePartyA.concat(dispute.contractData.evidencePartyB) : []} />
        <div className='divider' />
        <Decision
          resolutionOptions={dispute.disputeData.resolutionOptions}
          disputeId={dispute.disputeData.disputeId}
          votes={dispute.disputeData.votes}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    caseData: state.disputes.caseData,
    hasErrored: state.disputes.failureCaseData,
    isFetching: state.disputes.requestCaseData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDisputeById: disputeId => dispatch(getDisputeById(disputeId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisputeResolution))
