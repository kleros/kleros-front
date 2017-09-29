import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import 'babel-polyfill'
import {Kleros} from 'kleros-api'
import { balanceFetchData } from '../business/ethereum/action-creators'
import SearchBar from '../SearchBar'
import Grid from '../Grid'
import './Disputes.css'

class Disputes extends Component {
  state = {
    address: 0x0,
    disputes: []
  }

  componentDidMount () {
    this.props.getBalance()
  }

  async componentWillMount () {
    // FIXME move to bootstrap/initWeb3.js
    // FIXME add constant http://localhost:8545
    // FIXME use metamask
    let web3 = await window.web3

    let provider = await web3.currentProvider

    let address = await web3.eth.accounts[0]

    let KlerosInstance = await new Kleros(provider)

    let court = await KlerosInstance.court

    let disputes = await court.getDisputes()

    this.setState({ disputes })
    this.setState({ address })
  }

  render () {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the balance</p>
    }

    if (this.props.isFetching) {
      return <p>Loading…</p>
    }

    const itemsTitle = [
      'Project',
      'Deadline',
      'Case ID',
      'Status',
      'Evidence'
    ]

    return (
      <div className='Disputes-container'>
        <SearchBar />
        <div className='content'>
          <h1>Open Disputes</h1>
          <Grid itemTitles={ itemsTitle } items={ this.state.disputes }/>
          <p><br/>{this.props.balance}</p>
          <p><br/>{this.state.address}</p>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Disputes))
