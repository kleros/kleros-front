import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { contractFetchData } from '../../business/contract/action-creators'
import Banner from '../../Banner'
import './Summary.css'

class SummaryContract extends Component {
  componentDidMount () {
    this.props.getContract(this.props.contract.address)
  }

  render () {
    const {contract} = this.props

    if (contract.hasErrored) {
      return <p>Sorry! There was an error loading the contract</p>
    }

    if (contract.isFetching) {
      return <p>Loading…</p>
    }

    return (
      <div className={`SummaryContract-container`}>
        <Banner title='Contract summary' linkTo='/contracts' />
        <div className='divider' />
        <div className='content'>
          <p>
            Address: {contract.address}<br></br>
            Arbitrator: {contract.arbitrator}<br></br>
            Timeout: {contract.timeout}<br></br>
            PartyA: {contract.partyA}<br></br>
            PartyB: {contract.partyB}
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contract: state.contract,
    hasErrored: state.contract.failureContract,
    isFetching: state.contract.requestContract
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getContract: url => dispatch(contractFetchData())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SummaryContract)
)
