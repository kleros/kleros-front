import React from 'react'
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import RequiresMetaMask from './requiresMetaMask'
import Web3 from 'web3'
import store from './store'
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

const App = () => {
  if (typeof window.web3 !== 'undefined') {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Layout>
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
  } else {
    return (
      <RequiresMetaMask />
    )
  }
}

registerServiceWorker()

export default App
