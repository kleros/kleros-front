import React from 'react'
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Disputes from '../Disputes'
import Contracts from '../Contracts'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import Layout from '../Layout'
import './index.css'

const App = () => (
  <Provider store={ store }>
    <Router>
      <Switch>
        <Layout>
          <Route
            exact
            path='/disputes'
            component={ Disputes }
          />
          <Route
            exact
            path='/contracts'
            component={ Contracts }
          />
        </Layout>
      </Switch>
    </Router>
  </Provider>
)

registerServiceWorker()

export default App
