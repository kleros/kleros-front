import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { contractRaiseDispute, contractFetchData } from '../../business/contract/action-creators'
import EvidenceForm from './EvidenceForm'
import Banner from '../../Banner'
import './Summary.css'

class SummaryContract extends Component {
  componentDidMount () {
    this.props.getContract(this.props.match.params.address)
  }

  raiseDispute = e => this.props.raiseDisputeContract(
    this.props.contract,
    this.props.match.params.address
  )

  render () {
    const {isFetching, hasErrored, match, contract} = this.props

    if (hasErrored)
      return <p>Sorry! There was an error loading the contract</p>

    // TODO get address by the kleros store => Address: {contract.address}
    return (
      <div className={`SummaryContract-container`}>
        <Banner title='Contract summary' linkTo='/contracts' />
        <div className='divider' />
        <div className='content'>
          <div className='summary'>
            Address: {match.params.address}<br />
            Arbitrator: {contract.arbitrator}<br />
            Timeout: {contract.timeout}<br />
            PartyA: {contract.partyA}<br />
            PartyB: {contract.partyB}<br />
            Party A Fee Paid: {contract.partyAFee}<br />
            Party B Fee Paid: {contract.partyBFee}<br />
            Status: {contract.status}
          </div>
          <button onClick={this.raiseDispute} type='submit' className='submit'>
            {
              isFetching &&
              <FontAwesome
                name='circle-o-notch'
                spin
                style={{marginRight: '10px'}}
              />
            }
            Create dispute
          </button>
          <EvidenceForm />
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
    getContract: contractAddress =>
      dispatch(contractFetchData(contractAddress)),
    raiseDisputeContract: (contract, address) =>
      dispatch(contractRaiseDispute(contract, address))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SummaryContract)
)
