import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import 'babel-polyfill'
import {Kleros} from 'kleros-api'
import { balanceFetchData } from '../business/ethereum/action-creators'
import GridContent from './GridContent'
import Grid from '../Grid'
import SearchBar from '../SearchBar'
import './Disputes.css'

class Disputes extends Component {
  state = {
    address: 0x0,
  }

  componentDidMount () {
    this.props.getBalance()
  }

  async componentWillMount () {
    // FIXME move to bootstrap/initWeb3.js
    // let address = web3.eth.accounts[0]
  }

  render () {
    const { balance } = this.props

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
          <Grid itemTitles={ itemsTitle }>
            <GridContent />
          </Grid>
          <p><br/>{ balance }</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    balance: state.balance.balance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBalance: url => dispatch(balanceFetchData())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Disputes))
