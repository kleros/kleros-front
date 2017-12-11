import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { contractRaiseDispute, contractFetchData } from '../../business/contract/action-creators'
import { STATUS_TO_STATE } from '../../constants'
import EvidenceForm from './EvidenceForm'
import Banner from '../../../Components/Banner'
import './Summary.css'

class SummaryContract extends Component {
  componentDidMount () {
    this.props.getContract(this.props.match.params.address)
  }

  componentWillReceiveProps (nextProps) {
    // if raising dispute was successful refresh contract data
    if (this.props.isRaisingDispute && !nextProps.isRaisingDispute) {
      this.props.getContract(this.props.match.params.address)
    }
  }

  raiseDispute = e => this.props.raiseDisputeContract(
    this.props.contract,
    this.props.match.params.address
  )

  render () {
    const {hasErrored, match, contract, isRaisingDispute} = this.props

    if (hasErrored) {
      return <p>Sorry! There was an error loading the contract</p>
    }

    // TODO get address by the kleros store => Address: {contract.address}
    return (
      <div className={`SummaryContract-container`}>
        <Banner title='Contract summary' linkTo='/contracts' />
        <div className='divider' />
        <div className='content'>
          <h1>
            {match.params.address}
          </h1>
          <div className='summary'>
            Address: {match.params.address}<br />
            Arbitrator: {contract.arbitrator}<br />
            Timeout: {contract.timeout}<br />
            PartyA: {contract.partyA}<br />
            PartyB: {contract.partyB}<br />
            Party A Fee Paid: {contract.partyAFee}<br />
            Party B Fee Paid: {contract.partyBFee}<br />
            Status: {STATUS_TO_STATE[contract.status] || '?'}<br />
          </div>
          {
            (contract.partyAFee && contract.partyBFee)
              ? <EvidenceForm />
              : <button onClick={this.raiseDispute} type='submit' className='submit'>
                {
                  isRaisingDispute &&
                  <FontAwesome
                    name='circle-o-notch'
                    spin
                    style={{marginRight: '10px'}}
                  />
                }
                  Create dispute
              </button>
          }
          {
            contract.evidences !== undefined &&
            contract.evidences.length > 0 &&
            <h2>Evidences</h2>
          }
          <ul>
            {
              contract.evidences !== undefined &&
              contract.evidences.map(evidence => (
                <li key={evidence._id}>{`${evidence.name}: ${evidence.description} - ${evidence.url}`}</li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contract: state.contracts.contract,
    hasErrored: state.contracts.failureContract,
    isRaisingDispute: state.contracts.requestRaiseDispute
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
