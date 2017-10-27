import React, { Component } from 'react'
import ShortProfile from './ShortProfile'
import MenuSidebar from './MenuSidebar'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { balanceFetchData, fetchAddress } from '../business/ethereum/action-creators'
import './Sidebar.css'

class Sidebar extends Component {
  componentWillMount () {
    this.props.getBalance()
    this.props.getAddress()
  }

  render () {
    let balance = 0
    let address = 'loading...'

    if (!this.props.balanceIsFetching) balance = this.props.balance
    if (!this.props.addressIsFetching) address = this.props.address

    if (this.props.balanceHasErrored) balance = -1
    if (this.props.addressHasErrored) balance = '-error-'

    return (
      <div className={`Sidebar-container ${this.props.className}`}>
        <ShortProfile address={address} balancePNK={balance} />
        <div className='divider' />
        <MenuSidebar items={this.props.items} />
        <div className='emptybar' />
        { this.props.children }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    balance: state.ethereum.balance,
    balanceHasErrored: state.ethereum.failureBalance,
    balanceIsFetching: state.ethereum.requestBalance,
    address: state.ethereum.address,
    addressHasErrored: state.ethereum.failureAddress,
    addressIsFetching: state.ethereum.requestAddress
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBalance: url => dispatch(balanceFetchData()),
    getAddress: url => dispatch(fetchAddress())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))
