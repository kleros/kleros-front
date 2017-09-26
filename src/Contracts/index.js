import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { balanceFetchData } from '../business/ethereum/action-creators'
import './Contracts.css'

class Contracts extends Component {
  componentDidMount () {
    this.props.getBalance()
  }

  render () {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the balance</p>
    }

    if (this.props.isFetching) {
      return <p>Loading…</p>
    }

    return (
      <div className='Contracts-content'>
        <h1>Contracts</h1>
        <p>{this.props.balance}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    balance: state.balance,
    hasErrored: state.failureBalance,
    isFetching: state.requestBalance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBalance: url => dispatch(balanceFetchData())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contracts))
