import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import {
  Provider,
  connect
} from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import RequiresMetaMask from './requiresMetaMask'
import { fetchAddress } from '../business/ethereum/action-creators'
import Disputes from '../Disputes'
import Contracts from '../Contracts'
import ContractsTable from '../ContractsTable'
import ContractSummary from '../Contracts/Summary'
import DisputeResolution from '../DisputeResolution'
import Settings from '../Settings'
import Jury from '../Jury'
import Decisions from '../Decisions'
import DecisionSummary from '../Decisions/Summary'
import Layout from '../Layout'
import './index.css'

class App extends Component {
  state = {
    appLoaded: false
  }

  componentWillMount () {
    // fetch address before rendering app to make sure web3 has been loaded and to avoid race conditions
    this.props.getAddress()
  }

  componentWillReceiveProps (nextProps) {
    // if address has loaded
    // FIXME handle error
    if (this.props.address === 0 && (nextProps.address || nextProps.address === null)) {
      this.setState({
        appLoaded: true
      })
    }
  }

  render () {
    // if no web3 show requires metamask page
    if (typeof window.web3 === 'undefined') {
      return (
        <RequiresMetaMask />
      )
    }

    // FIXME show a loading screen?
    if (!this.state.appLoaded) return false

    return (
      <Provider store={this.props.store}>
        <Router>
          <Switch>
            <Layout address={this.props.address}>
              <Route
                exact
                path='/disputes'
                component={Disputes}
              />
              <Route
                exact
                path='/contracts'
                component={ContractsTable}
              />
              <Route
                exact
                path='/contracts/new'
                component={Contracts}
              />
              <Route
                exact
                path='/contract-summary/:address'
                component={ContractSummary}
              />
              <Route
                exact
                path='/disputes/:disputeId'
                component={DisputeResolution}
              />
              <Route
                exact
                path='/settings'
                component={Settings}
              />
              <Route
                exact
                path='/jury'
                component={Jury}
              />
              <Route
                exact
                path='/decisions'
                component={Decisions}
              />
              <Route
                exact
                path='/decisions/:disputeId'
                component={DecisionSummary}
              />
            </Layout>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

registerServiceWorker()

const mapStateToProps = state => {
  return {
    address: state.ethereum.address,
    addressHasErrored: state.ethereum.failureAddress,
    addressIsFetching: state.ethereum.requestAddress
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAddress: () => dispatch(fetchAddress())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
