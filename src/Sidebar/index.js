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
    const {balanceIsFetching, addressIsFetching, balanceHasErrored, addressHasErrored, items} = this.props
    let balance = 0
    let address = 'loading...'

    if (!balanceIsFetching) balance = (this.props.balance.tokenBalance - this.props.balance.activatedTokens)
    if (!addressIsFetching) address = this.props.address

    if (balanceHasErrored) balance = -1
    if (addressHasErrored) balance = '-error-'

    return (
      <div className={'Sidebar-container'}>
        <ShortProfile address={address} balancePNK={balance} />
        <div className='divider' />
        <MenuSidebar items={items} />
        <div className='emptybar' />
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
    getBalance: () => dispatch(balanceFetchData()),
    getAddress: () => dispatch(fetchAddress())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))
