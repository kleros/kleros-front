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
import { fetchAddress } from '../redux/ethereum/action-creators'
import Disputes from '../Containers/Disputes'
import Contracts from '../Containers/Contracts'
import Home from '../Components/Home'
import ContractsTable from '../Components/ContractsTable'
import ContractSummary from '../Containers/Contracts/Summary'
import DisputeResolution from '../Containers/Disputes/DisputeResolution'
import Settings from '../Containers/Settings'
import Jury from '../Containers/Jury'
import Decisions from '../Containers/Decisions'
import DecisionSummary from '../Containers/Decisions/Summary'
import Layout from '../Components/Layout'
import { watchDisputes } from '../helpers/watchDisputes'
import { APP_VIEWS, KLEROS_VIEW_KEY } from '../constants'
import './index.css'

/**
 * class App
 * @extends React.Component
 */
class App extends Component {
  /**
   * Set initial state
   * @param {boolean} appLoaded - param for hide/showing page loader
   */
  state = {
    appLoaded: false
  }

  /**
   * run fn getAddress before render
   */
  componentWillMount () {
    // fetch address before rendering app to make sure web3 has been loaded and to avoid race conditions
    this.props.getAddress()
  }

  /**
   * change state param appLoaded to true if no address
   * @param nextProps
   */
  componentWillReceiveProps (nextProps) {
    // if address has loaded
    // FIXME handle error
    if (this.props.address === 0 && (nextProps.address || nextProps.address === null)) {
      this.setState({
        appLoaded: true
      })
    }
  }

  /**
   * render App content
   */
  render () {
    /**
     * if no web3 show requires metamask page
     */
    if (typeof window.web3 === 'undefined') {
      return (
        <RequiresMetaMask />
      )
    }

    // FIXME show a loading screen?
    if (!this.state.appLoaded) return false

    // get which view user is in
    let appView = window.localStorage.getItem(KLEROS_VIEW_KEY)
    if (!appView || appView === 'undefined') {
      appView = process.env.REACT_APP_DEFAULT_VIEW
      window.localStorage.setItem(KLEROS_VIEW_KEY, appView)
    }

    let routesData = {
      juror: [
        {path: '/', component: Home},
        {path: '/disputes', component: Disputes},
        {path: '/disputes/:arbitratorAddress/:disputeId', component: DisputeResolution},
        {path: '/settings', component: Settings},
        {path: '/jury', component: Jury},
        {path: '/decisions', component: Decisions},
        {path: '/decisions/:arbitratorAddress/:disputeId', component: DecisionSummary}
      ],
      party: [
        {path: '/', component: Home},
        {path: '/contracts', component: ContractsTable},
        {path: '/contracts/new', component: Contracts},
        {path: '/contract-summary/:address', component: ContractSummary},
        {path: '/settings', component: Settings},
        {path: '/decisions', component: Decisions},
        {path: '/decisions/:arbitratorAddress/:disputeId', component: DecisionSummary}
      ]
    }

    let routes
    if (appView === APP_VIEWS.JUROR) {
      routes = routesData.juror
    } else if (appView === APP_VIEWS.PARTY) {
      routes = routesData.party
    }

    let layout = (
      <Layout address={this.props.address} view={appView}>
        {routes.map((item, i) =>
          <Route
            key={i}
            exact
            path={item.path}
            component={item.component}
          />
        )}
      </Layout>
    )

    // start event listeners
    watchDisputes()

    return (
      <Provider store={this.props.store}>
        <Router>
          <Switch>
            {layout}
          </Switch>
        </Router>
      </Provider>
    )
  }
}

registerServiceWorker()

/**
 * add Redux state to component props
 * @param state
 * @returns {{address, addressHasErrored: *, addressIsFetching: *}}
 */
const mapStateToProps = state => {
  return {
    address: state.ethereum.address,
    addressHasErrored: state.ethereum.failureAddress,
    addressIsFetching: state.ethereum.requestAddress
  }
}

/**
 * dispatch changes to Redux state
 * @param dispatch
 * @returns {{getAddress: (function(): *)}}
 */
const mapDispatchToProps = dispatch => {
  return {
    getAddress: () => dispatch(fetchAddress())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
