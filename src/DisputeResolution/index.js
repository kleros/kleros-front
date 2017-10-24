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
    const dispute = this.props.disputes[0]
    // FIXME show dispute not found message or a loading indicator
    if (!dispute) return false

    // FIXME only applies to twoParty contract. Generalize
    const parties = [{address: dispute.disputedContractData.partyA}, {address: dispute.disputedContractData.partyB}]

    const web3 = new Web3()
    const arbitrationFee = web3.fromWei(dispute.fee)

    return (
      <div className='dispute-resolution'>
        <SearchBar />
        <Banner title={dispute.title} />
        <div className='divider' />
        <Parties parties={parties} />
        <div className='divider' />
        <Information text={dispute.description} truncatedCharacters={50} arbitrationFee={arbitrationFee} timeRemaining={dispute.timeRemaining} />
        <div className='divider' />
        <Evidence evidence={dispute.evidence} />
        <div className='divider' />
        <Decision resolutionOptions={dispute.resolutionOptions} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    disputes: state.disputes.disputes,
    hasErrored: state.disputes.failureDisputes,
    isFetching: state.disputes.requestDisputes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDisputeById: disputeId => dispatch(getDisputeById(disputeId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisputeResolution))
