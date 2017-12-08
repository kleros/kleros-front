import React, { Component } from 'react'
import ShortProfile from './ShortProfile'
import MenuSidebar from './MenuSidebar'
import AccountLocked from './AccountLocked'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { balanceFetchData } from '../../redux/ethereum/action-creators'
import './Sidebar.css'

class Sidebar extends Component {
  componentWillMount () {
    this.props.getBalance()
  }

  render () {
    const {balanceIsFetching, balanceHasErrored, items, address} = this.props
    if (!address) {
      return (
        <div className='Sidebar-container'>
          <AccountLocked />
        </div>
      )
    }

    let balance = 0
    if (!balanceIsFetching) balance = (this.props.balance.tokenBalance - this.props.balance.activatedTokens)
    if (balanceHasErrored) balance = -1

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
    balanceIsFetching: state.ethereum.requestBalance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBalance: () => dispatch(balanceFetchData())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))
