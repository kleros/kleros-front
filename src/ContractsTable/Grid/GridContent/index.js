import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import 'babel-polyfill'
import { getContracts } from '../../../business/contract/action-creators'
import { truncateAddress } from '../../../helpers/truncateAddress'
import './GridContent.css'

class GridContent extends Component {
  componentWillMount () {
    this.props.getDataContracts()
  }

  render () {
    const { hasErrored, isFetching, contracts = [] } = this.props
    if (hasErrored) {
      return <p>Sorry! There was an error loading the balance</p>
    }

    if (isFetching) {
      return (
        <div className='GridContent-container'>
          <div className='items loader'>
            <div className='linear-background-100' />
            <div className='linear-background-90' />
            <div className='linear-background-90' />
          </div>
        </div>
      )
    }

    return (
      <div className='GridContent-container'>
        <div className='items'>
          {
            contracts.map(contract =>
              <Link key={contract.hash} to={`contracts/${contract.hash}`}>
                <div className='items-row'>
                  <div className='item-arbitrator'>{ truncateAddress(contract.arbitrator, 10) }</div>
                  <div className='item-contract-hash'>{ truncateAddress(contract.hash, 10) }</div>
                  <div className='item item-party-a'>{ truncateAddress(contract.partyA, 10) }</div>
                  <div className='item item-party-b'>{ truncateAddress(contract.partyB, 10) }</div>
                  <div className='item item-status'>{ (contract.status === 3) ? "Dispute Raised" : "No Dispute" }</div>
                </div>
              </Link>
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contracts: state.contract.contracts,
    hasErrored: state.contract.failureDisputes,
    isFetching: state.contract.requestDisputes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDataContracts: () => dispatch(getContracts())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GridContent))
