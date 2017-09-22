import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { balanceFetchData } from '../../business/ethereum/action-creators'
import Layout from '../../components/Layout'
import Sidebar from '../../components/Sidebar'
import ShortProfile from '../../components/ShortProfile'
import MenuSidebar from '../../components/MenuSidebar'
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

    // TODO move to Layout component
    // TODO add item constants
    const items = [
      'Disputes',
      'Contracts',
      'Jury',
      'Decisions',
      'Settings'
    ]

    return (
      <Layout>
        <Sidebar identicon={
          <ShortProfile
            backgroundColor='dark'
            username='John'
            balancePNK={242}
            notificationIsActive
            icon={<Identicon seed='0xA1E4380A3B1f749673E270229993eE55F35663b4' />} />
          }
        >
          <MenuSidebar items={items} />
        </Sidebar>
        <div className='Dashboard-content'>
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
