import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { balanceFetchData } from '../../business/ethereum/action-creators'
import Layout from '../../components/Layout'
import Sidebar from '../../components/Sidebar'
import ShortProfile from '../../components/ShortProfile'
import Identicon from '../Identicon'
import Icon from '../Icon'
import './Dashboard.css'

class Dashboard extends Component {
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
      <Layout>
        <Sidebar>
          <ShortProfile icon={ <Identicon className='dark' balancePNK={42} /> } />
        </Sidebar>
        <div className='Dashboard'>
          <h1>Dashboard</h1>
          <p>{this.props.balance}</p>
        </div>
      </Layout>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
