import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { contractFetchData } from '../../business/contract/action-creators'
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
        <div className='content'>
          <h1>Contract summary</h1>
          <p>
            Address: {contract.address}
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
