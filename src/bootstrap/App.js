import React from 'react'
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import Disputes from '../Disputes'
import Contracts from '../Contracts'
import ContractSummary from '../Contracts/Summary'
import DisputeResolution from '../DisputeResolution'
import Settings from '../Settings'
import Jury from '../Jury'
import Layout from '../Layout'
import './index.css'

const App = () => (
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
        </Layout>
      </Switch>
    </Router>
  </Provider>
)

registerServiceWorker()

export default App
