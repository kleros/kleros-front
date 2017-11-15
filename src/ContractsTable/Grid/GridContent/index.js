import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import 'babel-polyfill'
import FontAwesome from 'react-fontawesome'
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
          {console.log(contracts)}
          {
            contracts.map(contract =>
              <Link key={contract.address} to={`contract-summary/${contract.address}`}>
                <div className='items-row'>
                  <div className='item-contract-hash'>{contract.address}</div>
                  <div className='item item-party-a'>{truncateAddress(contract.partyA, 10)}</div>
                  <div className='item item-party-b'>{truncateAddress(contract.partyB, 10)}</div>
                  <div className='item item-rule'>
                    <FontAwesome name='circle-thin' />
                  </div>
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
